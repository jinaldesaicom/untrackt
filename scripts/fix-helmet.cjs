/**
 * Fix tests that fail because they're missing HelmetProvider wrapping.
 * Checks each tool source for SEOHead usage and adds HelmetProvider if needed.
 *
 * Run: node scripts/fix-helmet.cjs
 */
const fs = require('fs');
const path = require('path');

const TOOLS_DIR = path.join(__dirname, '..', 'src', 'tools');
const TESTS_DIR = path.join(__dirname, '..', 'src', 'tests', 'tools');

const categories = fs.readdirSync(TOOLS_DIR).filter(d =>
  fs.statSync(path.join(TOOLS_DIR, d)).isDirectory()
);

let fixed = 0;
let skipped = 0;

for (const cat of categories) {
  const catDir = path.join(TOOLS_DIR, cat);
  const testCatDir = path.join(TESTS_DIR, cat);
  if (!fs.existsSync(testCatDir)) continue;

  const files = fs.readdirSync(catDir).filter(f => f.endsWith('.jsx'));

  for (const file of files) {
    const name = file.replace('.jsx', '');
    const testPath = path.join(testCatDir, `${name}.test.jsx`);
    const srcPath = path.join(catDir, file);

    if (!fs.existsSync(testPath)) continue;

    const src = fs.readFileSync(srcPath, 'utf8');
    const needsHelmet = /SEOHead|Helmet/.test(src);

    if (!needsHelmet) {
      skipped++;
      continue;
    }

    let test = fs.readFileSync(testPath, 'utf8');

    // Skip if already has HelmetProvider
    if (test.includes('HelmetProvider')) {
      skipped++;
      continue;
    }

    // Add HelmetProvider import after last import or after vi.mock
    if (!test.includes('HelmetProvider')) {
      // Find where to add import - after the last import statement
      const importRegex = /^import .+$/gm;
      let lastImportEnd = 0;
      let m;
      while ((m = importRegex.exec(test)) !== null) {
        lastImportEnd = m.index + m[0].length;
      }

      if (lastImportEnd > 0) {
        test = test.slice(0, lastImportEnd) +
          "\nimport { HelmetProvider } from 'react-helmet-async';" +
          test.slice(lastImportEnd);
      }
    }

    // Wrap all render calls: render(<ComponentName ... />) → render(<HelmetProvider><ComponentName ... /></HelmetProvider>)
    // Handle both single-line and with props
    const renderRegex = new RegExp(`render\\(\\s*<${name}(\\s[^>]*)?\\/?>\\s*\\)`, 'g');
    test = test.replace(renderRegex, (match) => {
      return match
        .replace(`<${name}`, `<HelmetProvider><${name}`)
        .replace(/\/>(\s*\))/, `/></HelmetProvider>$1`)
        .replace(/>(\s*\))/, `></${name}></HelmetProvider>$1`);
    });

    // Also handle the R() helper pattern: render(<ComponentName />) inside const R = ...
    // This is already handled by the above regex

    fs.writeFileSync(testPath, test);
    fixed++;
    console.log(`Fixed: ${cat}/${name}.test.jsx`);
  }
}

console.log(`\nDone: ${fixed} tests fixed, ${skipped} skipped`);
