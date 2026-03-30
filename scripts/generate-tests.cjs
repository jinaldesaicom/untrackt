/**
 * Generate basic render test files for all tools that don't have tests yet.
 * Run: node scripts/generate-tests.js
 */
const fs = require('fs');
const path = require('path');

const toolsDir = path.join(__dirname, '..', 'src', 'tools');
const testsDir = path.join(__dirname, '..', 'src', 'tests', 'tools');

// Categories that need tests
const categories = ['agile', 'css-html', 'maths-science', 'pm', 'productivity', 'seo'];
// Partially covered categories  
const partialCategories = ['dev', 'general', 'health', 'finance'];

const allCategories = [...categories, ...partialCategories];

let created = 0;

// Check which tools need DisclaimerCard mock (health tools)
const healthTools = new Set();

allCategories.forEach(cat => {
  const srcDir = path.join(toolsDir, cat);
  const testDir = path.join(testsDir, cat);
  
  if (!fs.existsSync(srcDir)) return;
  
  // Create test directory if it doesn't exist
  if (!fs.existsSync(testDir)) {
    fs.mkdirSync(testDir, { recursive: true });
  }
  
  const toolFiles = fs.readdirSync(srcDir).filter(f => f.endsWith('.jsx'));
  
  toolFiles.forEach(toolFile => {
    const testFile = toolFile.replace('.jsx', '.test.jsx');
    const testPath = path.join(testDir, testFile);
    
    // Skip if test already exists
    if (fs.existsSync(testPath)) return;
    
    const componentName = toolFile.replace('.jsx', '');
    const srcContent = fs.readFileSync(path.join(srcDir, toolFile), 'utf8');
    
    // Check if component uses DisclaimerCard
    const usesDisclaimer = srcContent.includes('DisclaimerCard');
    // Check if component uses ToolLayout (which includes SEOHead)
    const usesToolLayout = srcContent.includes('ToolLayout');
    // Check if component uses SEOHead directly
    const usesSEOHead = srcContent.includes('SEOHead') && !usesToolLayout;
    // Check if uses canvas/chart - needs special mock
    const usesCanvas = srcContent.includes('canvas') || srcContent.includes('getContext');
    // Check if uses html2canvas
    const usesHtml2canvas = srcContent.includes('html2canvas');
    // Check if uses DOMParser
    const usesDOMParser = srcContent.includes('DOMParser');
    
    // Determine relative path depth
    const relPath = `../../../tools/${cat}/${toolFile}`;
    
    let mocks = '';
    
    if (usesSEOHead) {
      mocks += `\nvi.mock('../../../components/SEOHead', () => ({\n  default: () => <div>SEO Head</div>,\n}))\n`;
    }
    
    if (usesDisclaimer) {
      mocks += `\nvi.mock('../../../components/DisclaimerCard', () => ({\n  default: () => <div>Disclaimer Card</div>,\n}))\n`;
    }
    
    // Check for storage use
    const usesStorage = srcContent.includes("from '../../utils/storage") || srcContent.includes('from "../../utils/storage');
    if (usesStorage) {
      mocks = `\nimport * as storage from '../../__mocks__/storage.js'\nvi.mock('../../../utils/storage.js', () => storage)\n` + mocks;
    }

    const testContent = `import { render, screen } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import ${componentName} from '${relPath}'
${mocks}
describe('${componentName}', () => {
  it('renders without crashing', () => {
    expect(() => {
      render(
        <HelmetProvider>
          <${componentName} />
        </HelmetProvider>
      )
    }).not.toThrow()
  })
})
`;
    
    fs.writeFileSync(testPath, testContent);
    created++;
    console.log(`Created: ${testPath.replace(path.join(__dirname, '..') + path.sep, '')}`);
  });
});

console.log(`\nTotal test files created: ${created}`);
