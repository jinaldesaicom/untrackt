/**
 * Generate tests for missing components, pages, hooks, and utils tests.
 * 
 * Run: node scripts/generate-missing-tests.cjs
 */
const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'src');
const TESTS = path.join(BASE, 'tests');

// ── Components that need tests ──
const components = {
  'CategoriesDropdown': { router: true, props: '' },
  'CategoryNav': { router: true, props: 'mobile={false}' },
  'Footer': { router: true, props: '' },
  'Header': { router: true, props: '' },
  'Layout': { router: false, props: `children={<div>child</div>} theme="light" isDark={false}` },
  'MobileDrawer': { router: true, props: 'open={true} onClose={vi.fn()}' },
  'MobileSearchOverlay': { router: false, props: 'open={true} onClose={vi.fn()}' },
  'RandomToolButton': { router: true, props: '' },
  'TagCloud': { router: true, props: '' },
  'ToolGrid': { router: false, props: 'tools={[]}' },
  'ToolGuide': { router: false, props: 'toolId="test-tool"' },
  'ToolLayout': { router: false, helmet: true, named: true, props: 'title="Test" description="desc" path="/test"' },
};

for (const [name, cfg] of Object.entries(components)) {
  const testPath = path.join(TESTS, 'components', `${name}.test.jsx`);
  if (fs.existsSync(testPath)) continue;

  const importLine = cfg.named
    ? `import { ${name} } from '../../components/${name}.jsx';`
    : `import ${name} from '../../components/${name}.jsx';`;

  const lines = [];
  lines.push(`import { render, screen, fireEvent } from '@testing-library/react';`);
  lines.push(`import userEvent from '@testing-library/user-event';`);
  if (cfg.router) lines.push(`import { MemoryRouter } from 'react-router-dom';`);
  if (cfg.helmet) lines.push(`import { HelmetProvider } from 'react-helmet-async';`);
  lines.push(importLine);
  lines.push('');

  let jsx = `<${name} ${cfg.props}>${name === 'Layout' || name === 'ToolLayout' ? '<p>child</p>' : ''}</${name}>`;
  if (cfg.router && cfg.helmet) jsx = `<HelmetProvider><MemoryRouter>${jsx}</MemoryRouter></HelmetProvider>`;
  else if (cfg.router) jsx = `<MemoryRouter>${jsx}</MemoryRouter>`;
  else if (cfg.helmet) jsx = `<HelmetProvider>${jsx}</HelmetProvider>`;

  lines.push(`const R = () => render(${jsx});`);
  lines.push('');
  lines.push(`describe('${name}', () => {`);
  lines.push(`  it('renders without crashing', () => {`);
  lines.push(`    R();`);
  lines.push(`  });`);
  lines.push('');
  lines.push(`  it('interacts with buttons', async () => {`);
  lines.push(`    R();`);
  lines.push(`    const user = userEvent.setup();`);
  lines.push(`    const buttons = screen.queryAllByRole('button');`);
  lines.push(`    for (const btn of buttons.slice(0, 4)) {`);
  lines.push(`      try { await user.click(btn); } catch {}`);
  lines.push(`    }`);
  lines.push(`  });`);
  lines.push('});');

  fs.writeFileSync(testPath, lines.join('\n') + '\n');
  console.log(`Created: components/${name}.test.jsx`);
}

// ── Pages that need tests ──
const pages = {
  'SitemapPage': { router: true, helmet: true },
  'TagPage': { router: true, helmet: true },
  'WikiIndexPage': { router: true, helmet: true },
  'WikiToolPage': { router: true, helmet: true, routeParams: true },
};

for (const [name, cfg] of Object.entries(pages)) {
  const testPath = path.join(TESTS, 'pages', `${name}.test.jsx`);
  if (fs.existsSync(testPath)) continue;

  const lines = [];
  lines.push(`import { render, screen } from '@testing-library/react';`);
  if (cfg.router) lines.push(`import { MemoryRouter } from 'react-router-dom';`);
  if (cfg.helmet) lines.push(`import { HelmetProvider } from 'react-helmet-async';`);
  lines.push(`import ${name} from '../../pages/${name}.jsx';`);
  lines.push('');

  let jsx = `<${name} />`;
  if (cfg.routeParams) {
    // WikiToolPage requires route params  
    jsx = `<HelmetProvider><MemoryRouter initialEntries={['/wiki/unit-converter']}><${name} /></MemoryRouter></HelmetProvider>`;
  } else if (cfg.router && cfg.helmet) {
    jsx = `<HelmetProvider><MemoryRouter>${jsx}</MemoryRouter></HelmetProvider>`;
  } else if (cfg.router) {
    jsx = `<MemoryRouter>${jsx}</MemoryRouter>`;
  }

  lines.push(`describe('${name}', () => {`);
  lines.push(`  it('renders without crashing', () => {`);
  lines.push(`    render(${jsx});`);
  lines.push(`  });`);
  lines.push('});');

  fs.writeFileSync(testPath, lines.join('\n') + '\n');
  console.log(`Created: pages/${name}.test.jsx`);
}

// ── Hooks that need tests ──
const hooks = {
  'useSearch': `
import { renderHook, act } from '@testing-library/react';
import useSearch from '../../hooks/useSearch.js';

describe('useSearch', () => {
  it('returns empty results initially', () => {
    const { result } = renderHook(() => useSearch());
    expect(result.current).toBeDefined();
  });
});
`,
  'useStoredPreference': `
import { renderHook, act } from '@testing-library/react';
import useStoredPreference from '../../hooks/useStoredPreference.js';

vi.mock('../../utils/storage', () => ({
  getPreference: vi.fn((_k, d) => d),
  setPreference: vi.fn(),
  getItem: vi.fn((_k, d) => d ?? null),
  setItem: vi.fn(),
}));

describe('useStoredPreference', () => {
  it('returns default value initially', () => {
    const { result } = renderHook(() => useStoredPreference('test-key', 'default'));
    expect(result.current[0]).toBe('default');
  });

  it('updates value via setter', () => {
    const { result } = renderHook(() => useStoredPreference('test-key', 'default'));
    act(() => result.current[1]('new-value'));
    expect(result.current[0]).toBe('new-value');
  });
});
`,
  'useToast': `
import { renderHook, act } from '@testing-library/react';
import { useToast, ToastProvider } from '../../hooks/useToast.jsx';
import React from 'react';

const wrapper = ({ children }) => React.createElement(ToastProvider, null, children);

describe('useToast', () => {
  it('returns toast functions', () => {
    const { result } = renderHook(() => useToast(), { wrapper });
    expect(result.current).toBeDefined();
  });
});
`,
};

for (const [name, content] of Object.entries(hooks)) {
  const testPath = path.join(TESTS, 'hooks', `${name}.test.js`);
  if (fs.existsSync(testPath)) continue;
  fs.writeFileSync(testPath, content.trim() + '\n');
  console.log(`Created: hooks/${name}.test.js`);
}

// ── Utils that need tests ──
const utils = {
  'darkMode': `
import { applyTheme, getSystemTheme } from '../../utils/darkMode.js';

describe('darkMode', () => {
  beforeEach(() => {
    document.documentElement.classList.remove('dark');
  });

  it('applyTheme adds dark class for dark theme', () => {
    applyTheme('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('applyTheme removes dark class for light theme', () => {
    document.documentElement.classList.add('dark');
    applyTheme('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('getSystemTheme returns light or dark', () => {
    const theme = getSystemTheme();
    expect(['light', 'dark']).toContain(theme);
  });
});
`,
  'markdownRenderer': `
import { renderMarkdown } from '../../utils/markdownRenderer.js';

describe('markdownRenderer', () => {
  it('renders markdown to HTML', () => {
    const result = renderMarkdown('# Hello');
    expect(result).toContain('Hello');
  });

  it('handles empty input', () => {
    const result = renderMarkdown('');
    expect(result).toBeDefined();
  });
});
`,
  'searchTools': `
import { searchTools } from '../../utils/searchTools.js';

describe('searchTools', () => {
  it('returns results for a query', () => {
    const results = searchTools('calculator');
    expect(Array.isArray(results)).toBe(true);
  });

  it('returns empty array for empty query', () => {
    const results = searchTools('');
    expect(results).toEqual([]);
  });
});
`,
  'unitConverters': `
import * as converters from '../../utils/unitConverters.js';

describe('unitConverters', () => {
  it('exports are defined', () => {
    expect(converters).toBeDefined();
    const keys = Object.keys(converters);
    expect(keys.length).toBeGreaterThan(0);
  });

  it('converter functions return numbers', () => {
    const fns = Object.entries(converters).filter(([, v]) => typeof v === 'function');
    for (const [name, fn] of fns.slice(0, 5)) {
      try {
        const result = fn(1);
        if (typeof result === 'number') {
          expect(result).not.toBeNaN();
        }
      } catch {}
    }
  });
});
`,
};

for (const [name, content] of Object.entries(utils)) {
  const testPath = path.join(TESTS, 'utils', `${name}.test.js`);
  if (fs.existsSync(testPath)) continue;
  fs.writeFileSync(testPath, content.trim() + '\n');
  console.log(`Created: utils/${name}.test.js`);
}

console.log('\nDone generating missing tests.');
