import { readFileSync } from 'fs';
const j = JSON.parse(readFileSync('c:/data/code2026/untrackt/all-tests.json', 'utf8'));
console.log(`T:${j.numTotalTests} P:${j.numPassedTests} F:${j.numFailedTests} FS:${j.numFailedTestSuites}`);
j.testResults.forEach(f => {
  if (f.status === 'failed') {
    const name = f.name.replace(/.*src[\\/]tests[\\/]/, '');
    const msg = (f.message || '');
    const line = msg.split('\n').find(l => l.includes('Error') || l.includes('Cannot') || l.includes('not defined') || l.includes('does not')) || msg.slice(0,300);
    console.log(`\nFAIL: ${name}`);
    console.log(line.trim().slice(0,300));
    f.assertionResults.forEach(a => {
      if (a.status === 'failed') {
        console.log(`  Test: ${a.title}`);
        if (a.failureMessages && a.failureMessages[0]) {
          console.log(`  ${a.failureMessages[0].split('\n')[0].slice(0,200)}`);
        }
      }
    });
  }
});
