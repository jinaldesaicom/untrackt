/**
 * Fix storage mocks to include removeItem.
 * Also add global window.alert/confirm/print mocks.
 * 
 * Run: node scripts/fix-storage-removeitem.cjs
 */
const fs = require('fs');
const path = require('path');

const TESTS_DIR = path.join(__dirname, '..', 'src', 'tests', 'tools');
let fixed = 0;

const categories = fs.readdirSync(TESTS_DIR).filter(d =>
  fs.statSync(path.join(TESTS_DIR, d)).isDirectory()
);

for (const cat of categories) {
  const catDir = path.join(TESTS_DIR, cat);
  const files = fs.readdirSync(catDir).filter(f => f.endsWith('.test.jsx'));

  for (const file of files) {
    const filePath = path.join(catDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    // Fix storage mock to include removeItem
    if (content.includes("getItem: vi.fn(") && !content.includes("removeItem")) {
      content = content.replace(
        /getItem: vi\.fn\(([^)]+)\),\s*setItem: vi\.fn\(\)/,
        'getItem: vi.fn($1), setItem: vi.fn(), removeItem: vi.fn()'
      );
      changed = true;
    }

    if (changed) {
      fs.writeFileSync(filePath, content);
      fixed++;
      console.log(`Fixed: ${cat}/${file}`);
    }
  }
}

console.log(`\nDone: ${fixed} files updated`);
