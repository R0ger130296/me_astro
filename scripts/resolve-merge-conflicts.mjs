import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const SKIP_DIRS = new Set(['.git', '.astro', 'dist', 'node_modules', 'coverage']);
const SKIP_FILES = new Set([
  'scripts/resolve-merge-conflicts.mjs',
  'tests/project-contract.test.mjs',
]);
const TEXT_EXTENSIONS = new Set([
  '.astro', '.css', '.cjs', '.html', '.js', '.json', '.jsx', '.md', '.mjs',
  '.ts', '.tsx', '.txt', '.xml', '.yml', '.yaml',
]);

async function collectFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.isDirectory() && SKIP_DIRS.has(entry.name)) continue;

    const absolutePath = path.join(directory, entry.name);
    const relativePath = path.relative(ROOT, absolutePath).replaceAll('\\', '/');

    if (entry.isDirectory()) {
      files.push(...(await collectFiles(absolutePath)));
      continue;
    }

    if (SKIP_FILES.has(relativePath)) continue;
    if (!TEXT_EXTENSIONS.has(path.extname(entry.name)) && entry.name !== 'astro.d.ts') continue;
    files.push({ absolutePath, relativePath });
  }

  return files;
}

function keepHeadVersion(source, relativePath) {
  const lines = source.split(/\r?\n/);
  const output = [];
  let state = 'normal';
  let conflictCount = 0;

  for (const line of lines) {
    if (line.startsWith('<<<<<<< ')) {
      if (state !== 'normal') throw new Error(`Nested merge conflict in ${relativePath}`);
      state = 'head';
      conflictCount += 1;
      continue;
    }

    if (line === '=======' && state === 'head') {
      state = 'incoming';
      continue;
    }

    if (line.startsWith('>>>>>>> ') && state === 'incoming') {
      state = 'normal';
      continue;
    }

    if (state === 'normal' || state === 'head') output.push(line);
  }

  if (state !== 'normal') throw new Error(`Unclosed merge conflict in ${relativePath}`);

  return {
    content: output.join('\n'),
    conflictCount,
  };
}

const files = await collectFiles(ROOT);
const changed = [];
let resolvedBlocks = 0;

for (const file of files) {
  const source = await readFile(file.absolutePath, 'utf8');
  if (!source.includes('<<<<<<< ') && !source.includes('>>>>>>> ')) continue;

  const result = keepHeadVersion(source, file.relativePath);
  if (result.conflictCount === 0) continue;

  await writeFile(file.absolutePath, result.content, 'utf8');
  changed.push(file.relativePath);
  resolvedBlocks += result.conflictCount;
}

console.log(`Resolved ${resolvedBlocks} merge conflict block(s) in ${changed.length} file(s).`);
for (const file of changed) console.log(`- ${file}`);
