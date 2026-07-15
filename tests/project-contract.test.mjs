import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { extname, join } from 'node:path';
import test from 'node:test';

const textExtensions = new Set(['.astro', '.css', '.js', '.json', '.md', '.mjs', '.ts', '.tsx', '.txt', '.yml', '.yaml']);

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (['node_modules', '.git', 'dist', '.astro'].includes(entry.name)) continue;
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(path));
    else if (textExtensions.has(extname(entry.name)) || ['astro.config.mjs', 'vercel.json'].includes(entry.name)) files.push(path);
  }
  return files;
}

test('repository has no unresolved merge markers', async () => {
  const conflicts = [];
  for (const path of await walk('.')) {
    const text = await readFile(path, 'utf8');
    if (/^(<<<<<<<|=======|>>>>>>>)/m.test(text)) conflicts.push(path);
  }
  assert.deepEqual(conflicts, []);
});

test('portfolio uses the uploaded JPEG', async () => {
  const [page, image] = await Promise.all([readFile('src/pages/index.astro', 'utf8'), readFile('public/me/1757515565808.jpeg')]);
  assert.match(page, /\/me\/1757515565808\.jpeg/);
  assert.equal(image[0], 0xff);
  assert.equal(image[1], 0xd8);
  assert.ok(image.length > 10_000);
});

test('deployment is static and does not use Astro DB', async () => {
  const [config, packageJson, vercel] = await Promise.all([
    readFile('astro.config.mjs', 'utf8'),
    JSON.parse(await readFile('package.json', 'utf8')),
    JSON.parse(await readFile('vercel.json', 'utf8')),
  ]);
  assert.match(config, /output: 'static'/);
  assert.equal(packageJson.dependencies['@astrojs/db'], undefined);
  assert.equal(vercel.buildCommand, 'npm run quality');
});

test('SEO and PWA essentials are present', async () => {
  const [page, manifest, robots, worker] = await Promise.all([
    readFile('src/pages/index.astro', 'utf8'),
    JSON.parse(await readFile('public/manifest.webmanifest', 'utf8')),
    readFile('public/robots.txt', 'utf8'),
    readFile('public/sw.js', 'utf8'),
  ]);
  assert.match(page, /application\/ld\+json/);
  assert.match(page, /rel="canonical"/);
  assert.equal(manifest.display, 'standalone');
  assert.match(robots, /sitemap\.xml/);
  assert.match(worker, /addEventListener\('fetch'/);
});
