import { readFileSync } from 'fs';
const j = JSON.parse(readFileSync('c:/data/code2026/untrackt/all-tests.json', 'utf8'));
console.log(`Total: ${j.numTotalTests} Pass: ${j.numPassedTests} Fail: ${j.numFailedTests}`);
console.log(`Suites: ${j.numTotalTestSuites} Pass: ${j.numPassedTestSuites} Fail: ${j.numFailedTestSuites}`);
const fails = [];
j.testResults.forEach(f => {
  if (f.status === 'failed') {
    const name = f.name.replace(/.*src[\\/]tests[\\/]/, '');
    const msg = (f.message || '').split('\n').find(l => l.includes('Error') || l.includes('Cannot') || l.includes('not defined') || l.includes('mock')) || (f.message||'').slice(0,150);
    fails.push(`${name} | ${msg.trim().slice(0,200)}`);
  }
});
console.log(`\nFailed suites (${fails.length}):`);
fails.forEach(f => console.log(f));
