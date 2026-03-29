/**
 * Fix generated test files that have vi.mock hoisting issues.
 * Replaces `import * as storage ...; vi.mock(..., () => storage)` with proper inline mock.
 */
const fs = require('fs');
const path = require('path');

const testsDir = path.join(__dirname, '..', 'src', 'tests', 'tools');
let fixed = 0;

function walkDir(dir) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach(item => {
    const full = path.join(dir, item);
    if (fs.statSync(full).isDirectory()) {
      walkDir(full);
    } else if (item.endsWith('.test.jsx')) {
      const content = fs.readFileSync(full, 'utf8');
      if (content.includes("import * as storage from '../../__mocks__/storage.js'")) {
        const newContent = content
          .replace("import * as storage from '../../__mocks__/storage.js'\nvi.mock('../../../utils/storage.js', () => storage)\n", '')
          .replace("import * as storage from '../../__mocks__/storage.js'\nvi.mock('../../../utils/storage.js', () => storage)", '');

        // Add the proper vi.mock at top (before imports won't matter since it's hoisted)
        const fixedContent = newContent.replace(
          "import { render, screen } from '@testing-library/react'",
          "import { render, screen } from '@testing-library/react'\n\nvi.mock('../../../utils/storage.js', () => ({\n  getItem: vi.fn((key, defaultValue = null) => defaultValue),\n  setItem: vi.fn(),\n  removeItem: vi.fn(),\n  getRecentTools: vi.fn(() => []),\n  addRecentTool: vi.fn(),\n  getPreference: vi.fn((key, defaultValue = null) => defaultValue),\n  setPreference: vi.fn(),\n  getTheme: vi.fn(() => 'system'),\n  setTheme: vi.fn(),\n  getFavorites: vi.fn(() => []),\n  addFavorite: vi.fn(),\n  removeFavorite: vi.fn(),\n  isFavorite: vi.fn(() => false),\n  toggleFavorite: vi.fn(),\n  clearFavorites: vi.fn(),\n  clearAllUntracktStorage: vi.fn(),\n}))"
        );
        
        fs.writeFileSync(full, fixedContent);
        fixed++;
        console.log('Fixed:', full.replace(path.join(__dirname, '..') + path.sep, ''));
      }
    }
  });
}

walkDir(testsDir);
console.log(`\nTotal fixed: ${fixed}`);
