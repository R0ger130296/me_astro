const { test } = require('node:test');
const assert = require('node:assert/strict');
const { configuration } = require('../dist/config');
const valid = { KEYCLOAK_ISSUER: 'https://auth.example.com/realms/portfolio', KEYCLOAK_AUDIENCE: 'portfolio-api', CORS_ORIGINS: 'https://portfolio.example.com', DATABASE_URL: 'postgresql://localhost/portfolio', NODE_ENV: 'production' };
test('configuration fails early for missing values, insecure origins and invalid ports', () => {
  assert.equal(configuration(valid).port, 3001);
  for (const change of [{ KEYCLOAK_AUDIENCE: '' }, { CORS_ORIGINS: '*' }, { CORS_ORIGINS: 'https://example.com/path' }, { KEYCLOAK_ISSUER: 'http://example.com' }, { PORT: 'NaN' }, { PORT: '0' }]) assert.throws(() => configuration({ ...valid, ...change }));
});
