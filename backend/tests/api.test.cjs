require('reflect-metadata');
const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const { createServer } = require('node:http');
const { once } = require('node:events');
const { randomUUID } = require('node:crypto');
const { Pool } = require('pg');
const { Test } = require('@nestjs/testing');
const request = require('supertest');
const { generateKeyPair, exportJWK, SignJWT } = require('jose');
const { migrate } = require('../dist/database/migrate');

let app, server, signingKey, issuer, database, adminPool, token;
const schema = `test_${randomUUID().replaceAll('-', '')}`;
const project = { title: 'Proyecto de prueba', slug: 'prueba', status: 'En desarrollo', description: 'Descripción', impact: 'Impacto', tags: ['NestJS'], published: false, caseStudy: { problem: 'Problema', decision: 'Decisión', result: 'Resultado', architecture: ['API'], codeLanguage: 'TypeScript', code: ['const ok = true;'] } };
async function sign(claims = {}, key = signingKey) {
  return new SignJWT({ typ: 'Bearer', resource_access: { 'portfolio-api': { roles: ['portfolio-admin'] } }, ...claims })
    .setProtectedHeader({ alg: 'RS256', kid: 'test' }).setIssuer(issuer).setAudience('portfolio-api').setSubject('test-user').setIssuedAt().setExpirationTime('5m').sign(key);
}

before(async () => {
  const keys = await generateKeyPair('RS256'); signingKey = keys.privateKey;
  const jwk = { ...await exportJWK(keys.publicKey), kid: 'test', alg: 'RS256', use: 'sig' };
  server = createServer((req, res) => { res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify({ keys: [jwk] })); });
  server.listen(0, '127.0.0.1'); await once(server, 'listening');
  issuer = `http://127.0.0.1:${server.address().port}`;
  const url = new URL(process.env.TEST_DATABASE_URL ?? 'postgresql://portfolio:local-development-only@localhost:5433/portfolio');
  adminPool = new Pool({ connectionString: url.toString(), connectionTimeoutMillis: 5000 });
  await adminPool.query(`CREATE SCHEMA ${schema}`);
  url.searchParams.set('options', `-c search_path=${schema}`);
  Object.assign(process.env, { NODE_ENV: 'test', KEYCLOAK_ISSUER: issuer, KEYCLOAK_AUDIENCE: 'portfolio-api', CORS_ORIGINS: 'http://localhost:4321', DATABASE_URL: url.toString() });
  database = new Pool({ connectionString: url.toString() });
  await migrate(database); await migrate(database);
  const { AppModule } = require('../dist/app.module');
  const { setup } = require('../dist/setup');
  const module = await Test.createTestingModule({ imports: [AppModule] }).compile();
  app = module.createNestApplication(); setup(app); await app.init();
  token = await sign();
});

after(async () => {
  if (app) await app.close();
  if (database) await database.end();
  if (adminPool) { await adminPool.query(`DROP SCHEMA IF EXISTS ${schema} CASCADE`); await adminPool.end(); }
  if (server) await new Promise((resolve) => server.close(resolve));
});

test('public health is ready and private endpoints require authentication', async () => {
  await request(app.getHttpServer()).get('/api/v1/health').expect(200);
  await request(app.getHttpServer()).get('/api/v1/admin/projects').expect(401);
  await request(app.getHttpServer()).post('/api/v1/admin/projects').send(project).expect(401);
  await request(app.getHttpServer()).get('/api/v1/admin/projects').set('Authorization', 'Bearer invalid').expect(401);
});

test('cryptographic verification and API client roles cannot be bypassed', async () => {
  const wrongKey = (await generateKeyPair('RS256')).privateKey;
  for (const invalid of [await sign({}, wrongKey), await sign({ typ: 'ID' })]) {
    await request(app.getHttpServer()).get('/api/v1/admin/projects').auth(invalid, { type: 'bearer' }).expect(401);
  }
  const expired = await new SignJWT({ typ: 'Bearer' }).setProtectedHeader({ alg: 'RS256', kid: 'test' }).setIssuer(issuer).setAudience('portfolio-api').setSubject('test').setIssuedAt().setExpirationTime('0s').sign(signingKey);
  const wrongAudience = await new SignJWT({ typ: 'Bearer' }).setProtectedHeader({ alg: 'RS256', kid: 'test' }).setIssuer(issuer).setAudience('other').setSubject('test').setIssuedAt().setExpirationTime('5m').sign(signingKey);
  const wrongIssuer = await new SignJWT({ typ: 'Bearer' }).setProtectedHeader({ alg: 'RS256', kid: 'test' }).setIssuer('https://other.invalid').setAudience('portfolio-api').setSubject('test').setIssuedAt().setExpirationTime('5m').sign(signingKey);
  for (const invalid of [expired, wrongAudience, wrongIssuer]) await request(app.getHttpServer()).get('/api/v1/admin/projects').auth(invalid, { type: 'bearer' }).expect(401);
  await request(app.getHttpServer()).get('/api/v1/admin/projects').auth(await sign({ resource_access: {}, realm_access: { roles: ['portfolio-admin'] } }), { type: 'bearer' }).expect(403);
});

test('validation rejects unsafe links, invalid nested data and unknown fields', async () => {
  for (const change of [{ href: 'javascript:alert(1)' }, { slug: '../admin' }, { caseStudy: { problem: 'Only one field' } }, { published: 'false' }, { injected: true }, { title: '   ' }]) {
    await request(app.getHttpServer()).post('/api/v1/admin/projects').auth(token, { type: 'bearer' }).send({ ...project, ...change }).expect(400);
  }
});

test('real database CRUD preserves drafts, handles conflicts and persists publication', async () => {
  const http = app.getHttpServer();
  const created = await request(http).post('/api/v1/admin/projects').auth(token, { type: 'bearer' }).send(project).expect(201);
  const id = created.body.id;
  assert.equal((await request(http).get('/api/v1/projects').expect(200)).body.length, 0);
  const privateList = await request(http).get('/api/v1/admin/projects').auth(token, { type: 'bearer' }).expect(200);
  assert.equal(privateList.headers['cache-control'], 'no-store');
  assert.equal(privateList.body.length, 1);
  await request(http).post('/api/v1/admin/projects').auth(token, { type: 'bearer' }).send(project).expect(409);
  await request(http).put(`/api/v1/admin/projects/${id}`).auth(token, { type: 'bearer' }).send({ ...project, published: true, version: 1 }).expect(200);
  await request(http).put(`/api/v1/admin/projects/${id}`).auth(token, { type: 'bearer' }).send({ ...project, version: 1 }).expect(409);
  const publicList = await request(http).get('/api/v1/projects').expect(200);
  assert.equal(publicList.body[0].slug, 'prueba');
  assert.equal(publicList.body[0].version, undefined);
  assert.equal((await database.query('SELECT version, published FROM projects WHERE id=$1', [id])).rows[0].version, 2);
  await request(http).delete(`/api/v1/admin/projects/${id}?version=1`).auth(token, { type: 'bearer' }).expect(409);
  await request(http).delete(`/api/v1/admin/projects/${id}?version=2`).auth(token, { type: 'bearer' }).expect(204);
  assert.deepEqual((await request(http).get('/api/v1/projects')).body, []);
});

test('CORS only permits the configured frontend origin', async () => {
  const http = app.getHttpServer();
  const allowed = await request(http).options('/api/v1/admin/projects').set('Origin', 'http://localhost:4321').set('Access-Control-Request-Method', 'POST').expect(204);
  assert.equal(allowed.headers['access-control-allow-origin'], 'http://localhost:4321');
  const denied = await request(http).options('/api/v1/admin/projects').set('Origin', 'https://untrusted.invalid').set('Access-Control-Request-Method', 'POST');
  assert.equal(denied.headers['access-control-allow-origin'], undefined);
});
