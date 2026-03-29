/**
 * Fix ALL storage mocks to include removeItem. Uses a simple string approach.
 * 
 * Run: node scripts/fix-all-removeitem.cjs
 */
const fs = require('fs');
const path = require('path');

const TESTS_DIR = path.join(__dirname, '..', 'src', 'tests');
let fixed = 0;

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith('.test.jsx') || e.name.endsWith('.test.js')) {
      let content = fs.readFileSync(p, 'utf8');
      // Look for storage mocks that have setItem but not removeItem
      if (content.includes('setItem: vi.fn()') && !content.includes('removeItem')) {
        content = content.replace(
          /setItem: vi\.fn\(\)/g,
          'setItem: vi.fn(), removeItem: vi.fn()'
        );
        fs.writeFileSync(p, content);
        fixed++;
        console.log(`Fixed: ${path.relative(TESTS_DIR, p)}`);
      }
    }
  }
}

walk(TESTS_DIR);
console.log(`\nDone: ${fixed} files fixed`);
