const fs = require('fs');
const text = fs.readFileSync('cov-pass4.txt', 'utf-8');
const lines = text.split('\n');
// Find ALL directory summary lines - they have format: " name        | NN.NN |"
// and the name line usually starts with space(s)
for (const line of lines) {
  // Match lines that look like directory summaries (not individual files)
  // Directory summary lines don't have uncovered line numbers at the end
  const trimmed = line.trim();
  if (trimmed.match(/^[\w.\/\s-]+\s+\|\s+[\d.]+\s+\|\s+[\d.]+\s+\|\s+[\d.]+\s+\|\s+[\d.]+\s+\|\s*$/)) {
    console.log(trimmed);
  }
}
// Test summary
for (let i = lines.length - 20; i < lines.length; i++) {
  if (lines[i] && lines[i].match(/Test Files|Tests |Duration/)) {
    console.log(lines[i]);
  }
}
