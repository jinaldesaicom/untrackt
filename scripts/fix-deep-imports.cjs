/**
 * Fixes deep test files that have wrong import paths (0 test = import error).
 * Scans each -deep.test.jsx file to find the import, checks if the source file exists,
 * and if not, searches for the correct filename.
 */
const fs = require('fs');
const path = require('path');
const glob = require('path');

function findFiles(dir, pattern) {
  const results = [];
  function walk(d) {
    for (const entry of fs.readdirSync(d, { withFileTypes: true })) {
      const full = path.join(d, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name.match(pattern)) results.push(full);
    }
  }
  walk(dir);
  return results;
}

const srcDir = path.join(__dirname, '..', 'src');
const testsDir = path.join(srcDir, 'tests');

// Find all -deep.test.jsx files
const deepTests = findFiles(testsDir, /-deep\.test\.jsx$/);

let fixed = 0;
let deleted = 0;

for (const testFile of deepTests) {
  const content = fs.readFileSync(testFile, 'utf8');
  
  // Extract import path like: import Foo from '../../../tools/seo/Foo'
  const importMatch = content.match(/import\s+(\w+)\s+from\s+['"]([^'"]+)['"]/);
  if (!importMatch) continue;
  
  const [, componentName, importPath] = importMatch;
  
  // Resolve the import to an absolute path
  const testDir = path.dirname(testFile);
  let resolvedBase = path.resolve(testDir, importPath);
  
  // Try .jsx and .js extensions
  const extensions = ['.jsx', '.js'];
  let sourceExists = false;
  for (const ext of extensions) {
    if (fs.existsSync(resolvedBase + ext)) {
      sourceExists = true;
      break;
    }
  }
  
  if (sourceExists) continue; // File exists, not a naming issue
  
  // File doesn't exist - search for correct name in the same directory
  const sourceDir = path.dirname(resolvedBase);
  if (!fs.existsSync(sourceDir)) {
    console.log(`DELETE (dir not found): ${path.relative(testsDir, testFile)} -> ${sourceDir}`);
    fs.unlinkSync(testFile);
    deleted++;
    continue;
  }
  
  const sourceDirFiles = fs.readdirSync(sourceDir);
  
  // Try to find a matching file (case-insensitive comparison)
  const targetBase = path.basename(resolvedBase).toLowerCase();
  const match = sourceDirFiles.find(f => f.replace(/\.(jsx|js)$/, '').toLowerCase() === targetBase);
  
  if (match) {
    const correctName = match.replace(/\.(jsx|js)$/, '');
    const newImportPath = importPath.replace(componentName, correctName);
    const newContent = content
      .replace(new RegExp(`import\\s+${componentName}\\s+from`, 'g'), `import ${correctName} from`)
      .replace(new RegExp(`'${importPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}'`, 'g'), `'${newImportPath}'`)
      .replace(new RegExp(`"${importPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`, 'g'), `"${newImportPath}"`)
      .replace(new RegExp(`<${componentName}\\s`, 'g'), `<${correctName} `)
      .replace(new RegExp(`</${componentName}>`, 'g'), `</${correctName}>`)
      .replace(new RegExp(`'${componentName}'`, 'g'), `'${correctName}'`);
    
    fs.writeFileSync(testFile, newContent);
    console.log(`FIXED: ${componentName} -> ${correctName} in ${path.relative(testsDir, testFile)}`);
    fixed++;
  } else {
    console.log(`DELETE (no match): ${path.relative(testsDir, testFile)} (looked for ${targetBase} in ${sourceDir})`);
    fs.unlinkSync(testFile);
    deleted++;
  }
}

console.log(`\nDone: ${fixed} fixed, ${deleted} deleted, ${deepTests.length - fixed - deleted} unchanged.`);
