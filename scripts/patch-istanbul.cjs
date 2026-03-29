/**
 * Patches vite-plugin-istanbul to use __VITEST_COVERAGE__ as the coverage variable
 * instead of the default __coverage__. This is needed because @vitest/coverage-istanbul
 * reads from __VITEST_COVERAGE__.
 *
 * Run via: node scripts/patch-istanbul.cjs
 * Also runs automatically as a postinstall script.
 */
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'node_modules', 'vite-plugin-istanbul', 'dist', 'index.mjs');

if (!fs.existsSync(filePath)) {
  console.log('vite-plugin-istanbul not found, skipping patch');
  process.exit(0);
}

let content = fs.readFileSync(filePath, 'utf8');

if (content.includes('coverageVariable: "__VITEST_COVERAGE__"')) {
  console.log('vite-plugin-istanbul already patched');
  process.exit(0);
}

const oldStr = 'coverageGlobalScope: "globalThis",';
const newStr = 'coverageGlobalScope: "globalThis",\n    coverageVariable: "__VITEST_COVERAGE__",';

if (!content.includes(oldStr)) {
  console.error('Could not find target string in vite-plugin-istanbul');
  process.exit(1);
}

content = content.replace(oldStr, newStr);
fs.writeFileSync(filePath, content, 'utf8');
console.log('Patched vite-plugin-istanbul to use __VITEST_COVERAGE__');
