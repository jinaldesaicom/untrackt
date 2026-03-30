/**
 * Add HelmetProvider to ALL tool test files that don't have it yet.
 * ToolLayout uses SEOHead/Helmet internally, so every tool needs it.
 *
 * Run: node scripts/fix-all-helmet.cjs
 */
const fs = require('fs');
const path = require('path');

const TESTS_DIR = path.join(__dirname, '..', 'src', 'tests', 'tools');

let fixed = 0;
let alreadyOk = 0;

const categories = fs.readdirSync(TESTS_DIR).filter(d =>
  fs.statSync(path.join(TESTS_DIR, d)).isDirectory()
);

for (const cat of categories) {
  const catDir = path.join(TESTS_DIR, cat);
  const files = fs.readdirSync(catDir).filter(f => f.endsWith('.test.jsx'));

  for (const file of files) {
    const filePath = path.join(catDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    if (content.includes('HelmetProvider')) {
      alreadyOk++;
      continue;
    }

    // Add import
    if (content.includes("from '@testing-library/react'")) {
      content = content.replace(
        /import \{([^}]+)\} from '@testing-library\/react';/,
        "import {$1} from '@testing-library/react';\nimport { HelmetProvider } from 'react-helmet-async';"
      );
    } else {
      // Prepend
      content = "import { HelmetProvider } from 'react-helmet-async';\n" + content;
    }

    // Wrap JSX in render calls with HelmetProvider
    // Pattern 1: const R = () => render(<Comp />);
    content = content.replace(
      /const R = \(\) => render\(<(\w+)\s*\/>\);/,
      'const R = () => render(<HelmetProvider><$1 /></HelmetProvider>);'
    );

    // Pattern 2: render(<Comp />) in test body
    content = content.replace(
      /render\(<(\w+)\s*\/>\)/g,
      (match, comp) => {
        // Don't double-wrap if already inside HelmetProvider
        return `render(<HelmetProvider><${comp} /></HelmetProvider>)`;
      }
    );

    // Pattern 3: const R = () => render(<MemoryRouter><Comp /></MemoryRouter>);
    content = content.replace(
      /const R = \(\) => render\(<MemoryRouter><(\w+)\s*\/><\/MemoryRouter>\);/,
      'const R = () => render(<HelmetProvider><MemoryRouter><$1 /></MemoryRouter></HelmetProvider>);'
    );

    fs.writeFileSync(filePath, content);
    fixed++;
    console.log(`Fixed: ${cat}/${file}`);
  }
}

console.log(`\nDone: ${fixed} fixed, ${alreadyOk} already had HelmetProvider`);
