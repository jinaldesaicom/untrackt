const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const outFile = path.join(root, 'cov-pass11.txt');
const out = fs.createWriteStream(outFile);

// Use local vitest binary directly
const vitestBin = path.join(root, 'node_modules', '.bin', 'vitest.cmd');
const child = spawn(vitestBin, ['run', '--coverage'], {
  cwd: root,
  shell: true,
  stdio: ['ignore', 'pipe', 'pipe']
});
child.stdout.pipe(out);
child.stderr.pipe(out);
child.on('error', (err) => {
  fs.appendFileSync(outFile, 'SPAWN ERROR: ' + err.message + '\n');
  console.log('Spawn error:', err.message);
});
child.on('close', (code) => {
  out.end(() => {
    const size = fs.statSync(outFile).size;
    console.log('Done. Exit code:', code, 'File size:', size);
  });
});
