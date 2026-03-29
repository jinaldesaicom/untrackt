const fs = require('fs');
const text = fs.readFileSync('test-v2-out.txt', 'utf-8');
const lines = text.split('\n');

// Find lines that have test failure markers
const failedTestFiles = new Set();
let currentFile = '';
for (let i = 0; i < lines.length; i++) {
  const fileMatch = lines[i].match(/src\/tests\/[\w\/-]+\.test\.jsx?/);
  if (fileMatch) currentFile = fileMatch[0];
  
  // Check each char code for failure symbols
  const trimmed = lines[i].trimStart();
  if (trimmed.length > 0) {
    const firstChar = trimmed.charCodeAt(0);
    // ✗ (U+2717), × (U+00D7), ✕ (U+2715), ⨉ (U+2A09), ❌ etc
    if (firstChar === 0x2717 || firstChar === 0x00D7 || firstChar === 0x2715 || firstChar === 0x2A09) {
      if (currentFile) failedTestFiles.add(currentFile);
    }
    // Also check second/third char
    const secondChar = trimmed.charCodeAt(1);
    const thirdChar = trimmed.charCodeAt(2);
    if (secondChar === 0x2717 || secondChar === 0x00D7 || secondChar === 0x2715 || thirdChar === 0x2717 || thirdChar === 0x00D7 || thirdChar === 0x2715) {
      if (currentFile) failedTestFiles.add(currentFile);
    }
  }
}

// Also just search for the literal text
for (let i = 0; i < lines.length; i++) {
  const fileMatch = lines[i].match(/src\/tests\/[\w\/-]+\.test\.jsx?/);
  if (fileMatch) currentFile = fileMatch[0];
  if (lines[i].includes('×') && lines[i].includes('ms') && currentFile) {
    failedTestFiles.add(currentFile);
  }
}

// Alternative: find lines between test file paths that have failure markers
// Let's look for lines that matched the original "×" grep
const failLines = [];
for (let i = 0; i < lines.length; i++) {
  // The original output had lines like "     × fills inputs 135ms"
  if (/^\s+.{1}\s+\w/.test(lines[i]) && /\d+ms$/.test(lines[i].trim())) {
    // Check if first non-space char is the cross
    const firstNonSpace = lines[i].trim()[0];
    if (firstNonSpace !== '✓' && firstNonSpace !== '√') {
      failLines.push({ lineNum: i+1, line: lines[i], file: currentFile, charCode: firstNonSpace.charCodeAt(0) });
    }
  }
  const fileMatch = lines[i].match(/src\/tests\/[\w\/-]+\.test\.jsx?/);
  if (fileMatch) currentFile = fileMatch[0];
}

console.log('=== FAILED TEST FILES ===');
failedTestFiles.forEach(f => console.log(f));
console.log('\n=== FAIL LINES (from non-checkmark detection) ===');
failLines.forEach(f => console.log(`${f.file} :: ${f.line.trim()} (charCode: ${f.charCode})`));
