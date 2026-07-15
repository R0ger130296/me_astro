import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const readJson = async (path) => JSON.parse(await readFile(path, 'utf8'));
const readText = async (path) => readFile(path, 'utf8');

test('package exposes the required quality scripts', async () => {
  const packageJson = await readJson('package.json');
  const requiredScripts = ['build', 'typecheck', 'lint', 'format:check', 'test', 'quality'];

  for (const script of requiredScripts) {
    assert.equal(typeof packageJson.scripts?.[script], 'string', `Missing script: ${script}`);
    assert.ok(packageJson.scripts[script].trim().length > 0, `Empty script: ${script}`);
  }
});

test('project keeps strict TypeScript enabled', async () => {
  const tsconfig = await readJson('tsconfig.json');

  assert.equal(tsconfig.extends, 'astro/tsconfigs/strict');
  assert.equal(tsconfig.compilerOptions?.strict, true);
  assert.equal(tsconfig.compilerOptions?.forceConsistentCasingInFileNames, true);
});

test('supported Node runtime is explicitly documented', async () => {
  const packageJson = await readJson('package.json');

  assert.match(packageJson.engines?.node ?? '', />=20/);
});

test('SEO component contains canonical, social and structured metadata', async () => {
  const seo = await readText('src/components/SEO.astro');

  assert.match(seo, /rel="canonical"/);
  assert.match(seo, /property="og:title"/);
  assert.match(seo, /name="twitter:card"/);
  assert.match(seo, /application\/ld\+json/);
});

test('crawler files reference the canonical domain', async () => {
  const [robots, sitemap] = await Promise.all([
    readText('public/robots.txt'),
    readText('public/sitemap.xml'),
  ]);

  assert.match(robots, /https:\/\/rogercedeno\.dev\/sitemap\.xml/);
  assert.match(sitemap, /https:\/\/rogercedeno\.dev\//);
});

test('PWA assets and registration remain configured', async () => {
  const [manifest, serviceWorker, offlinePage, layout] = await Promise.all([
    readJson('public/manifest.webmanifest'),
    readText('public/sw.js'),
    readText('public/offline.html'),
    readText('src/layouts/Layout.astro'),
  ]);

  assert.equal(manifest.display, 'standalone');
  assert.equal(manifest.start_url, '/');
  assert.ok(Array.isArray(manifest.icons) && manifest.icons.length > 0);
  assert.match(serviceWorker, /offline\.html/);
  assert.match(serviceWorker, /addEventListener\('fetch'/);
  assert.match(offlinePage, /Modo offline/);
  assert.match(layout, /rel="manifest"/);
  assert.match(layout, /serviceWorker\.register\('\/sw\.js'\)/);
});
