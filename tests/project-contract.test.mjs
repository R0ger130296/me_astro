import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const readJson = async (path) => JSON.parse(await readFile(path, 'utf8'));

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
