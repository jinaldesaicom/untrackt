/**
 * Fix tests that reference HelmetProvider but don't import it.
 * 
 * Run: node scripts/fix-missing-helmet-import.cjs
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
      if (content.includes('HelmetProvider') && !content.includes("from 'react-helmet-async'") && !content.includes('from "react-helmet-async"')) {
        // Add import at the top of the file (after existing imports)
        const lines = content.split('\n');
        let lastImportIdx = -1;
        for (let i = 0; i < lines.length; i++) {
          if (lines[i].startsWith('import ')) lastImportIdx = i;
        }
        if (lastImportIdx >= 0) {
          lines.splice(lastImportIdx + 1, 0, "import { HelmetProvider } from 'react-helmet-async'");
        } else {
          lines.unshift("import { HelmetProvider } from 'react-helmet-async'");
        }
        fs.writeFileSync(p, lines.join('\n'));
        fixed++;
        console.log(`Fixed: ${path.relative(TESTS_DIR, p)}`);
      }
    }
  }
}

walk(TESTS_DIR);
console.log(`\nDone: ${fixed} files fixed`);
