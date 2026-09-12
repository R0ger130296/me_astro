import { readFile } from 'node:fs/promises';
import { parseEnv } from 'node:util';

// Credentials remain in memory and are never printed or written into the realm export.
const envPath = process.argv[2];
if (!envPath) throw new Error('Usage: node tools/setup-keycloak.mjs path/to/keycloak/.env');
const env = parseEnv(await readFile(envPath, 'utf8'));
const base = process.env.KEYCLOAK_URL ?? 'http://localhost:9090';
const tokenResponse = await fetch(`${base}/realms/master/protocol/openid-connect/token`, {
  method: 'POST', body: new URLSearchParams({ grant_type: 'password', client_id: 'admin-cli', username: env.KEYCLOAK_ADMIN, password: env.KEYCLOAK_ADMIN_PASSWORD }),
});
if (!tokenResponse.ok) throw new Error(`Keycloak admin login failed (${tokenResponse.status})`);
const { access_token } = await tokenResponse.json();
const headers = { Authorization: `Bearer ${access_token}`, 'Content-Type': 'application/json' };
const existing = await fetch(`${base}/admin/realms/portfolio`, { headers });
if (existing.ok) console.log('Realm portfolio already exists. No changes applied.');
else {
  if (existing.status !== 404) throw new Error(`Realm lookup failed (${existing.status})`);
  const realm = JSON.stringify(JSON.parse(await readFile(new URL('../infrastructure/keycloak/portfolio-realm.json', import.meta.url), 'utf8')));
  const result = await fetch(`${base}/admin/realms`, { method: 'POST', headers, body: realm });
  if (!result.ok) throw new Error(`Realm creation failed (${result.status}): ${await result.text()}`);
  console.log('Realm portfolio created. Create your user and assign portfolio-api / portfolio-admin in the Keycloak console.');
}
