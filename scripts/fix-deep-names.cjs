/**
 * Fixes deep test files for components whose name doesn't match the filename.
 * Also fixes tests that use wrong selectors.
 */
const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'src');
const testsDir = path.join(srcDir, 'tests');

function findFiles(dir, pattern) {
  const results = [];
  if (!fs.existsSync(dir)) return results;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) results.push(...findFiles(full, pattern));
    else if (entry.name.match(pattern)) results.push(full);
  }
  return results;
}

// Find all deep test files
const deepTests = findFiles(testsDir, /-deep\.test\.jsx$/);

let fixed = 0;

for (const testFile of deepTests) {
  let content = fs.readFileSync(testFile, 'utf8');
  
  // Extract import: import ComponentName from '../../../tools/category/ComponentName'
  const importMatch = content.match(/import\s+(\w+)\s+from\s+['"](\.\.[\/\\][^'"]+)['"]/);
  if (!importMatch) continue;
  
  const [, componentName, importPath] = importMatch;
  
  // Resolve source file path
  const testDir = path.dirname(testFile);
  const resolvedBase = path.resolve(testDir, importPath.replace(/\//g, path.sep));
  
  let sourceFile = null;
  for (const ext of ['.jsx', '.js']) {
    if (fs.existsSync(resolvedBase + ext)) {
      sourceFile = resolvedBase + ext;
      break;
    }
  }
  
  if (!sourceFile) {
    // Try to find the correct file in the source directory
    const sourceDir = path.dirname(resolvedBase);
    if (!fs.existsSync(sourceDir)) continue;
    
    const files = fs.readdirSync(sourceDir);
    const baseName = path.basename(resolvedBase).toLowerCase();
    const match = files.find(f => f.replace(/\.(jsx|js)$/, '').toLowerCase() === baseName);
    if (!match) continue;
    
    sourceFile = path.join(sourceDir, match);
  }
  
  // Read source to check if it uses default export
  const sourceContent = fs.readFileSync(sourceFile, 'utf8');
  
  // Check if the default export name matches
  const defaultExport = sourceContent.match(/export\s+default\s+(?:function\s+)?(\w+)/);
  if (defaultExport && defaultExport[1] !== componentName) {
    const correctName = defaultExport[1];
    console.log(`RENAME: ${componentName} -> ${correctName} in ${path.relative(testsDir, testFile)}`);
    
    // Fix the import and JSX references
    content = content.replace(
      new RegExp(`import\\s+${componentName}\\s+from`, 'g'),
      `import ${correctName} from`
    );
    content = content.replace(new RegExp(`<${componentName}\\s`, 'g'), `<${correctName} `);
    content = content.replace(new RegExp(`<${componentName}/>`, 'g'), `<${correctName}/>`);
    content = content.replace(new RegExp(`</${componentName}>`, 'g'), `</${correctName}>`);
    content = content.replace(new RegExp(`'${componentName}'`, 'g'), `'${correctName}'`);
    
    fs.writeFileSync(testFile, content);
    fixed++;
  }
}

console.log(`\nFixed ${fixed} files.`);
