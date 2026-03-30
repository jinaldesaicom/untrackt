const fs = require('fs');
const text = fs.readFileSync('test-v2-out.txt', 'utf-8');
const lines = text.split('\n');
// Find test file lines that contain failures
const failedTestFiles = new Set();
let currentFile = '';
for (let i = 0; i < lines.length; i++) {
  const fileMatch = lines[i].match(/src\/tests\/[\w/-]+\.test\.jsx?/);
  if (fileMatch) currentFile = fileMatch[0];
  // × at start of line (indented) means a failed test
  if (lines[i].match(/^\s+×\s/) && currentFile) {
    failedTestFiles.add(currentFile);
  }
}
console.log('=== FAILED TEST FILES ===');
failedTestFiles.forEach(f => console.log(f));
const failedFiles = [];
if (failedFiles.length === 0) {
  // Try to find error sections - look for "src/tests" lines near "Error"
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('Error:') && lines[i].includes('src/tests')) {
      failedFiles.push(`Line ${i+1}: ${lines[i].trim()}`);
    }
  }
}
if (failedFiles.length === 0) {
  // Find lines referencing test files with errors
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    if (l.includes('-deep.test.jsx') && (l.includes('getBy') || l.includes('Error') || l.includes('unable'))) {
      failedFiles.push(`Line ${i+1}: ${l.trim()}`);
    }
  }
}
// Also find the summary
for (let i = lines.length - 10; i < lines.length; i++) {
  if (lines[i]) console.log(lines[i]);
}
console.log('\n=== FAILED SECTIONS ===');
console.log(failedFiles.slice(0, 30).join('\n'));
// Also find test files that have error references
const errorRefs = new Set();
for (let i = 0; i < lines.length; i++) {
  const m = lines[i].match(/src\/tests\/[\w/-]+\.test\.jsx?:\d+/);
  if (m && lines[i-1] && (lines[i-1].includes('getBy') || lines[i-1].includes('Error') || lines[i+1] && lines[i+1].includes('^'))) {
    errorRefs.add(m[0]);
  }
}
console.log('\n=== ERROR REFS ===');
errorRefs.forEach(r => console.log(r));
