/**
 * Remove duplicate storage mocks from test files that had both old and new pattern.
 * The fix-mocks.cjs script added inline mock but didn't clean up old import+mock in existing files.
 */
const fs = require('fs');
const path = require('path');

const testsDir = path.join(__dirname, '..', 'src', 'tests');
let fixed = 0;

function walkDir(dir) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach(item => {
    const full = path.join(dir, item);
    if (fs.statSync(full).isDirectory()) {
      walkDir(full);
    } else if (item.endsWith('.test.jsx') || item.endsWith('.test.js')) {
      let content = fs.readFileSync(full, 'utf8');
      // Check if file has BOTH the inline mock AND the old import pattern
      if (content.includes("import * as storage from '../../__mocks__/storage.js'")) {
        // Remove the old import and old vi.mock lines
        content = content.replace(/\nimport \* as storage from '\.\.\/\.\.\/__mocks__\/storage\.js'\n/g, '\n');
        content = content.replace(/\nvi\.mock\('\.\.\/\.\.\/\.\.\/utils\/storage\.js', \(\) => storage\)\n/g, '\n');
        // Also try without leading newline
        content = content.replace(/import \* as storage from '\.\.\/\.\.\/__mocks__\/storage\.js'\n/g, '');
        content = content.replace(/vi\.mock\('\.\.\/\.\.\/\.\.\/utils\/storage\.js', \(\) => storage\)\n/g, '');
        fs.writeFileSync(full, content);
        fixed++;
        console.log('Fixed:', full.replace(path.join(__dirname, '..') + path.sep, ''));
      }
    }
  });
}

walkDir(testsDir);
console.log(`\nTotal cleaned: ${fixed}`);
