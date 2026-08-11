import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
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
  const [hero, image] = await Promise.all([readFile('src/components/Hero.astro', 'utf8'), readFile('public/me/1757515565808.jpeg')]);
  assert.match(hero, /\/me\/1757515565808\.jpeg/);
  assert.equal(image[0], 0xff);
  assert.equal(image[1], 0xd8);
  assert.ok(image.length > 10_000);
});

test('portfolio is componentized and supports persistent light and dark themes', async () => {
  const [page, header, themeInit, client, styles] = await Promise.all([
    readFile('src/pages/index.astro', 'utf8'),
    readFile('src/components/SiteHeader.astro', 'utf8'),
    readFile('src/components/ThemeInit.astro', 'utf8'),
    readFile('src/scripts/site.ts', 'utf8'),
    readFile('src/styles/global.css', 'utf8'),
  ]);
  assert.match(page, /<SiteHeader/);
  assert.match(page, /<WorkSections/);
  assert.match(page, /<CertificatesSection/);
  assert.match(header, /data-theme-toggle/);
  assert.match(themeInit, /portfolio-theme/);
  assert.match(client, /prefers-color-scheme/);
  assert.match(styles, /html\[data-theme="light"\]/);
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
  const [page, manifest, robots, worker, ogImage, icon192, icon512, appleIcon] = await Promise.all([
    readFile('src/pages/index.astro', 'utf8'),
    JSON.parse(await readFile('public/manifest.webmanifest', 'utf8')),
    readFile('public/robots.txt', 'utf8'),
    readFile('public/sw.js', 'utf8'),
    readFile('public/og-image.png'),
    readFile('public/icons/icon-192.png'),
    readFile('public/icons/icon-512.png'),
    readFile('public/icons/apple-touch-icon.png'),
  ]);
  assert.match(page, /application\/ld\+json/);
  assert.match(page, /rel="canonical"/);
  assert.match(page, /og-image\.png/);
  assert.match(page, /apple-touch-icon/);
  assert.equal(manifest.display, 'standalone');
  assert.equal(manifest.icons.length, 3);
  assert.match(robots, /sitemap\.xml/);
  assert.match(worker, /addEventListener\('fetch'/);
  const pngSize = (buffer) => [buffer.readUInt32BE(16), buffer.readUInt32BE(20)];
  assert.deepEqual(pngSize(ogImage), [1200, 630]);
  assert.deepEqual(pngSize(icon192), [192, 192]);
  assert.deepEqual(pngSize(icon512), [512, 512]);
  assert.deepEqual(pngSize(appleIcon), [180, 180]);
});

test('production configuration is reproducible and hardened', async () => {
  const [packageJson, vercel] = await Promise.all([
    JSON.parse(await readFile('package.json', 'utf8')),
    JSON.parse(await readFile('vercel.json', 'utf8')),
  ]);
  assert.equal(packageJson.engines.node, '24.x');
  assert.equal(vercel.installCommand, 'npm ci');
  for (const version of Object.values(packageJson.dependencies)) {
    assert.doesNotMatch(version, /^(latest|[~^*])/);
  }
  const headerNames = new Set(vercel.headers[0].headers.map(({ key }) => key));
  for (const name of ['Content-Security-Policy', 'Referrer-Policy', 'X-Content-Type-Options', 'X-Frame-Options', 'Permissions-Policy']) {
    assert.ok(headerNames.has(name), `${name} header is missing`);
  }
});

test('contact flow and privacy-friendly monitoring are wired', async () => {
  const [contact, client] = await Promise.all([
    readFile('src/components/ContactSection.astro', 'utf8'),
    readFile('src/scripts/site.ts', 'utf8'),
  ]);
  for (const field of ['name', 'email', 'message', 'timeline']) assert.match(contact, new RegExp(`name="${field}"`));
  assert.match(contact, /aria-live="polite"/);
  assert.match(client, /@vercel\/analytics/);
  assert.match(client, /@vercel\/speed-insights/);
  assert.match(client, /data-contact-form/);
});

test('guided portfolio tour is accessible and uses Anime.js', async () => {
  const [page, header, tour, client, packageJson] = await Promise.all([
    readFile('src/pages/index.astro', 'utf8'),
    readFile('src/components/SiteHeader.astro', 'utf8'),
    readFile('src/components/GuidedTour.astro', 'utf8'),
    readFile('src/scripts/site.ts', 'utf8'),
    JSON.parse(await readFile('package.json', 'utf8')),
  ]);
  assert.equal(packageJson.dependencies.animejs, '4.5.0');
  assert.match(page, /<GuidedTour/);
  assert.match(header, /data-tour-launch/);
  assert.match(tour, /role="dialog"/);
  assert.match(tour, /aria-live="polite"/);
  assert.match(client, /animejs\/animation/);
  assert.match(client, /prefers-reduced-motion/);
  assert.match(client, /event\.key === 'Escape'/);
  assert.equal((client.match(/target: '/g) ?? []).length, 6);
});

test('internal navigation targets exist and deprecated icon aliases are gone', async () => {
  const sourceFiles = (await walk('src')).filter((path) => ['.astro', '.ts'].includes(extname(path)));
  const source = (await Promise.all(sourceFiles.map((path) => readFile(path, 'utf8')))).join('\n');
  const ids = new Set([...source.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]));
  const targets = [...source.matchAll(/href="#([^"]+)"/g)].map((match) => match[1]);
  for (const target of targets) assert.ok(ids.has(target), `Missing target for #${target}`);
  assert.doesNotMatch(source, /\b(Code2|BarChart3|Layers3)\b/);
});

test('certificates start with four highlights and can reveal the full collection', async () => {
  const [section, client] = await Promise.all([
    readFile('src/components/CertificatesSection.astro', 'utf8'),
    readFile('src/scripts/site.ts', 'utf8'),
  ]);
  assert.match(section, /certificates\.filter\(\(certificate\) => certificate\.featured\)\.slice\(0, 4\)/);
  assert.match(section, /data-certificate-toggle/);
  assert.match(section, /Ver todas las credenciales/);
  assert.match(section, /data-certificate-featured/);
  assert.match(client, /stagger\(/);
});

test('animated counters and the interactive skills architecture are wired', async () => {
  const [signals, about, skills, capabilities, client] = await Promise.all([
    readFile('src/components/SignalStrip.astro', 'utf8'),
    readFile('src/components/AboutSection.astro', 'utf8'),
    readFile('src/components/SkillsMap.astro', 'utf8'),
    readFile('src/components/CapabilitiesSection.astro', 'utf8'),
    readFile('src/scripts/site.ts', 'utf8'),
  ]);
  assert.match(signals, /data-counter/);
  assert.match(about, /data-tech-stack/);
  for (const area of ['Frontend', 'Backend', 'Mobile', 'Cloud', 'Producto']) assert.match(skills, new RegExp(area));
  assert.match(skills, /data-skill-node/);
  assert.match(capabilities, /<SkillsMap/);
  assert.match(client, /IntersectionObserver/);
});

test('custom 404 and downloadable CV preserve the portfolio identity', async () => {
  const [page404, header, contact, outputCv, publicCv] = await Promise.all([
    readFile('src/pages/404.astro', 'utf8'),
    readFile('src/components/SiteHeader.astro', 'utf8'),
    readFile('src/components/ContactSection.astro', 'utf8'),
    readFile('output/pdf/Roger-Cedeno-CV.pdf'),
    readFile('public/Roger-Cedeno-CV.pdf'),
  ]);
  assert.match(page404, /name="robots" content="noindex, follow"/);
  assert.match(page404, /data-not-found/);
  assert.match(header, /Roger-Cedeno-CV\.pdf/);
  assert.match(contact, /Roger-Cedeno-CV\.pdf/);
  assert.equal(outputCv.subarray(0, 4).toString(), '%PDF');
  assert.equal(createHash('sha256').update(outputCv).digest('hex'), createHash('sha256').update(publicCv).digest('hex'));
});
