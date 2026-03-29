const fs = require('fs');
const txt = fs.readFileSync('cov-pass2.txt', 'utf8').replace(/\x1b\[[0-9;]*m/g, '');
const lines = txt.split('\n');
console.log('Total lines:', lines.length);
const pipeLines = lines.filter(l => l.includes('|'));
console.log('Pipe lines:', pipeLines.length);
// Show all directory-level rows (lines that have a folder path ending with space before |)
const rows = pipeLines.filter(l => {
  const trimmed = l.trim();
  return trimmed.includes('src/') || trimmed.includes('All files');
});
console.log('Matching rows:', rows.length);
rows.forEach(l => console.log(l.trim()));
