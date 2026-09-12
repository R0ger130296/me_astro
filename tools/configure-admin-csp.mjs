import { readFile, writeFile } from 'node:fs/promises';

const origins = ['PUBLIC_API_URL', 'PUBLIC_KEYCLOAK_URL'].map((key) => {
  if (!process.env[key]) throw new Error(`${key} is required`);
  const url = new URL(process.env[key]);
  if (url.protocol !== 'https:') throw new Error(`${key} must use HTTPS for Vercel`);
  return url.origin;
});
const file = new URL('../vercel.json', import.meta.url);
const config = JSON.parse(await readFile(file, 'utf8'));
const source = '/admin/:path*';
const headers = [
  { key: 'Content-Security-Policy', value: `default-src 'self'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; img-src 'self' data:; font-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self'; connect-src 'self' ${[...new Set(origins)].join(' ')}; object-src 'none'; upgrade-insecure-requests` },
  { key: 'Cache-Control', value: 'no-store' },
  { key: 'X-Robots-Tag', value: 'noindex, nofollow' },
];
config.headers = config.headers.filter((entry) => entry.source !== source);
config.headers.push({ source, headers });
await writeFile(file, JSON.stringify(config, null, 2) + '\n');
console.log('Admin security headers configured. Review vercel.json before deployment.');
