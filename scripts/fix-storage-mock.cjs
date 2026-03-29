/**
 * Fix storage mocks to return the default value (second argument) instead of null.
 * This prevents "Cannot read properties of null" errors when components
 * do getItem('key', []).map(...) or getItem('key', {}).property
 *
 * Run: node scripts/fix-storage-mock.cjs
 */
const fs = require('fs');
const path = require('path');

const TESTS_DIR = path.join(__dirname, '..', 'src', 'tests');

let fixed = 0;

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
    } else if (entry.name.endsWith('.test.jsx') || entry.name.endsWith('.test.js')) {
      fixFile(fullPath);
    }
  }
}

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace the bad mock: getItem: vi.fn(() => null)
  // With the correct mock: getItem: vi.fn((_k, d) => d ?? null)
  const oldMock = "getItem: vi.fn(() => null)";
  const newMock = "getItem: vi.fn((_k, d) => d ?? null)";

  if (content.includes(oldMock)) {
    content = content.replace(oldMock, newMock);
    fs.writeFileSync(filePath, content);
    fixed++;
    console.log(`Fixed: ${path.relative(TESTS_DIR, filePath)}`);
  }
}

walk(TESTS_DIR);
console.log(`\nDone: ${fixed} files fixed`);
