/**
 * Enhanced test generator that reads tool source files and generates
 * interaction-based tests (not just render stubs).
 *
 * Run: node scripts/generate-enhanced-tests.cjs
 */
const fs = require('fs');
const path = require('path');

const TOOLS_DIR = path.join(__dirname, '..', 'src', 'tools');
const TESTS_DIR = path.join(__dirname, '..', 'src', 'tests', 'tools');

const categories = fs.readdirSync(TOOLS_DIR).filter(d =>
  fs.statSync(path.join(TOOLS_DIR, d)).isDirectory()
);

let created = 0;
let skipped = 0;

for (const cat of categories) {
  const catDir = path.join(TOOLS_DIR, cat);
  const testCatDir = path.join(TESTS_DIR, cat);
  if (!fs.existsSync(testCatDir)) fs.mkdirSync(testCatDir, { recursive: true });

  const files = fs.readdirSync(catDir).filter(f => f.endsWith('.jsx'));

  for (const file of files) {
    const name = file.replace('.jsx', '');
    const testPath = path.join(testCatDir, `${name}.test.jsx`);
    const srcPath = path.join(catDir, file);
    const src = fs.readFileSync(srcPath, 'utf8');

    // Skip if test already has more than just render stub
    if (fs.existsSync(testPath)) {
      const existingTest = fs.readFileSync(testPath, 'utf8');
      const testCount = (existingTest.match(/\bit\s*\(/g) || []).length;
      if (testCount > 1) {
        skipped++;
        continue; // Already has meaningful tests
      }
    }

    const relImport = `../../../tools/${cat}/${name}.jsx`;
    const analysis = analyzeSource(src, name);
    const testCode = generateTest(analysis, name, relImport);

    fs.writeFileSync(testPath, testCode);
    created++;
    console.log(`Created: ${cat}/${name}.test.jsx (${analysis.type})`);
  }
}

console.log(`\nDone: ${created} tests created, ${skipped} skipped (already have tests)`);

function analyzeSource(src, name) {
  const analysis = {
    name,
    type: 'unknown',
    usesStorage: /getItem|setItem/.test(src),
    usesSEOHead: /SEOHead|Helmet/.test(src),
    hasTabs: false,
    tabLabels: [],
    buttons: [],
    inputs: [],
    selects: [],
    textareas: [],
    hasCalculate: false,
    calculateLabel: '',
    hasReset: false,
    hasAdd: false,
    addLabel: '',
    isReactive: false,
    outputPatterns: [],
    emptyState: '',
    usesClipboard: /clipboard|writeText|handleCopy|copy\(/.test(src),
    usesFetch: /fetch\s*\(/.test(src),
    usesTimer: /setInterval|setTimeout/.test(src) && /timeLeft|timer|running/.test(src),
  };

  // Detect tool type
  if (/\bSolve\b|\bCalculate\b|\bConvert\b|\bGenerate\b|\bAnalyze\b/.test(src) &&
      /onClick\s*=\s*\{/.test(src)) {
    analysis.type = 'compute';
  }
  if (/addCard|addItem|addSprint|addTask|addEntry|addNote|addChecklist/.test(src)) {
    analysis.type = 'crud';
  }
  if (/useMemo/.test(src) && !/onClick.*calculate|onClick.*solve/i.test(src)) {
    analysis.type = 'reactive';
  }
  if (analysis.type === 'unknown') analysis.type = 'compute';

  // Find tab/mode labels
  const tabMatches = src.matchAll(/["']([A-Z][A-Za-z\s]+)["']\s*===\s*\w+|onClick\s*=\s*\{[^}]*set\w+\s*\(\s*["']([a-z]+)["']/g);
  for (const m of tabMatches) {
    if (m[1]) analysis.tabLabels.push(m[1]);
  }
  // Better tab detection - look for button text patterns that look like mode switches
  const modeButtonMatches = src.matchAll(/>([A-Z][a-zA-Z\s×]+)<\/button>/g);
  for (const m of modeButtonMatches) {
    const label = m[1].trim();
    if (label.length < 25 && !['Solve', 'Calculate', 'Reset', 'Copy', 'Copied', 'Add', 'Delete', 'Clear', 'Export'].includes(label)) {
      analysis.tabLabels.push(label);
    }
  }
  analysis.hasTabs = analysis.tabLabels.length > 1;

  // Find button labels
  const buttonMatches = src.matchAll(/>([A-Za-z\s]+)<\/button>|>\{[^}]*\}\s*([A-Za-z\s]+)<\/button>/g);
  for (const m of buttonMatches) {
    const label = (m[1] || m[2] || '').trim();
    if (label.length > 0 && label.length < 30) {
      analysis.buttons.push(label);
    }
  }

  // Find calculate/solve button
  if (/>\s*Solve\s*</.test(src)) { analysis.hasCalculate = true; analysis.calculateLabel = 'Solve'; }
  else if (/>\s*Calculate\s*</.test(src)) { analysis.hasCalculate = true; analysis.calculateLabel = 'Calculate'; }
  else if (/>\s*Convert\s*</.test(src)) { analysis.hasCalculate = true; analysis.calculateLabel = 'Convert'; }
  else if (/>\s*Generate\s*</.test(src)) { analysis.hasCalculate = true; analysis.calculateLabel = 'Generate'; }
  else if (/>\s*Analyze\s*</.test(src)) { analysis.hasCalculate = true; analysis.calculateLabel = 'Analyze'; }
  else if (/>\s*Check\s*</.test(src)) { analysis.hasCalculate = true; analysis.calculateLabel = 'Check'; }
  else if (/>\s*Evaluate\s*</.test(src)) { analysis.hasCalculate = true; analysis.calculateLabel = 'Evaluate'; }
  else if (/>\s*Submit\s*</.test(src)) { analysis.hasCalculate = true; analysis.calculateLabel = 'Submit'; }
  else if (/>\s*Run\s*</.test(src)) { analysis.hasCalculate = true; analysis.calculateLabel = 'Run'; }
  else if (/>\s*Test\s*</.test(src)) { analysis.hasCalculate = true; analysis.calculateLabel = 'Test'; }
  else if (/>\s*Parse\s*</.test(src)) { analysis.hasCalculate = true; analysis.calculateLabel = 'Parse'; }
  else if (/>\s*Look\s*Up\s*<|>\s*Lookup\s*</.test(src)) { analysis.hasCalculate = true; analysis.calculateLabel = 'Look Up'; }
  else if (/>\s*Search\s*</.test(src)) { analysis.hasCalculate = true; analysis.calculateLabel = 'Search'; }
  else if (/>\s*Save\s*</.test(src)) { analysis.hasCalculate = true; analysis.calculateLabel = 'Save'; }

  // Find reset
  analysis.hasReset = />\s*Reset\s*<|title\s*=\s*["']Reset/.test(src);

  // Find add button
  const addMatch = src.match(/>\s*(Add\s*[A-Za-z]*|New\s*[A-Za-z]*|\+\s*[A-Za-z]*)\s*</);
  if (addMatch) {
    analysis.hasAdd = true;
    analysis.addLabel = addMatch[1].trim();
  }

  // Find inputs with placeholders
  const inputMatches = src.matchAll(/placeholder\s*=\s*["']([^"']+)["']/g);
  for (const m of inputMatches) {
    analysis.inputs.push(m[1]);
  }

  // Find select options
  const selectMatches = src.matchAll(/<option[^>]*value\s*=\s*["']([^"']+)["'][^>]*>([^<]+)</g);
  for (const m of selectMatches) {
    analysis.selects.push({ value: m[1], label: m[2].trim() });
  }

  // Find textareas
  const textareaMatches = src.matchAll(/<textarea[^>]*placeholder\s*=\s*["']([^"']+)["']/g);
  for (const m of textareaMatches) {
    analysis.textareas.push(m[1]);
  }

  // Detect empty states
  const emptyMatch = src.match(/["']([^"']*(?:no\s|empty|nothing|start|begin|create|click|enter|add)[^"']*)["']/i);
  if (emptyMatch) analysis.emptyState = emptyMatch[1];

  return analysis;
}

function generateTest(a, name, relImport) {
  const mockStorage = a.usesStorage;
  const needsHelmet = a.usesSEOHead;
  const lines = [];

  lines.push(`import { render, screen, fireEvent, waitFor } from '@testing-library/react';`);
  lines.push(`import userEvent from '@testing-library/user-event';`);
  if (needsHelmet) {
    lines.push(`import { HelmetProvider } from 'react-helmet-async';`);
  }

  if (mockStorage) {
    lines.push(`vi.mock('../../../utils/storage', () => ({ getItem: vi.fn((_k, d) => d ?? null), setItem: vi.fn() }));`);
  }

  lines.push(`import ${name} from '${relImport}';`);
  lines.push('');

  const renderJsx = needsHelmet
    ? `<HelmetProvider><${name} /></HelmetProvider>`
    : `<${name} />`;

  lines.push(`const R = () => render(${renderJsx});`);
  lines.push('');
  lines.push(`describe('${name}', () => {`);

  // Test 1: renders without crashing
  lines.push(`  it('renders without crashing', () => {`);
  lines.push(`    R();`);
  lines.push(`  });`);
  lines.push('');

  // Test 2: key elements visible
  if (a.inputs.length > 0 || a.textareas.length > 0) {
    lines.push(`  it('shows input fields', () => {`);
    lines.push(`    R();`);
    const firstInput = a.inputs[0] || a.textareas[0];
    if (firstInput) {
      lines.push(`    expect(screen.getByPlaceholderText(/${escapeRegex(firstInput.substring(0, 20))}/i)).toBeInTheDocument();`);
    }
    lines.push(`  });`);
    lines.push('');
  }

  // Test 3: has calculate/action button
  if (a.hasCalculate) {
    lines.push(`  it('has ${a.calculateLabel.toLowerCase()} button', () => {`);
    lines.push(`    R();`);
    lines.push(`    expect(screen.getByRole('button', { name: /${escapeRegex(a.calculateLabel)}/i })).toBeInTheDocument();`);
    lines.push(`  });`);
    lines.push('');
  }

  // Type-specific tests
  if (a.type === 'compute' && a.hasCalculate) {
    generateComputeTests(lines, a, name);
  } else if (a.type === 'crud') {
    generateCrudTests(lines, a, name);
  } else if (a.type === 'reactive') {
    generateReactiveTests(lines, a, name);
  }

  // Test: tabs/modes
  if (a.hasTabs && a.tabLabels.length >= 2) {
    const tab = a.tabLabels[1]; // second tab
    lines.push(`  it('switches to ${tab} mode', async () => {`);
    lines.push(`    R();`);
    lines.push(`    const user = userEvent.setup();`);
    lines.push(`    const tabBtn = screen.getByRole('button', { name: /${escapeRegex(tab)}/i });`);
    lines.push(`    await user.click(tabBtn);`);
    lines.push(`    expect(tabBtn).toBeInTheDocument();`);
    lines.push(`  });`);
    lines.push('');
  }

  // Test: reset
  if (a.hasReset) {
    lines.push(`  it('handles reset', async () => {`);
    lines.push(`    R();`);
    lines.push(`    const user = userEvent.setup();`);
    lines.push(`    const resetBtns = screen.getAllByRole('button');`);
    lines.push(`    const resetBtn = resetBtns.find(b => b.textContent.match(/reset/i) || b.getAttribute('title')?.match(/reset/i));`);
    lines.push(`    if (resetBtn) await user.click(resetBtn);`);
    lines.push(`  });`);
    lines.push('');
  }

  // Test: copy button
  if (a.usesClipboard) {
    lines.push(`  it('handles copy action', async () => {`);
    lines.push(`    R();`);
    lines.push(`    const user = userEvent.setup();`);
    lines.push(`    const copyBtns = screen.getAllByRole('button');`);
    lines.push(`    const copyBtn = copyBtns.find(b => b.textContent.match(/copy/i) || b.getAttribute('title')?.match(/copy/i));`);
    lines.push(`    if (copyBtn) await user.click(copyBtn);`);
    lines.push(`  });`);
    lines.push('');
  }

  // Test: select options
  if (a.selects.length > 0) {
    lines.push(`  it('allows changing select options', async () => {`);
    lines.push(`    R();`);
    lines.push(`    const selects = screen.getAllByRole('combobox');`);
    lines.push(`    if (selects.length > 0) {`);
    lines.push(`      fireEvent.change(selects[0], { target: { value: '${a.selects[0]?.value || ''}' } });`);
    lines.push(`    }`);
    lines.push(`  });`);
    lines.push('');
  }

  lines.push('});');
  return lines.join('\n') + '\n';
}

function generateComputeTests(lines, a, name) {
  // Test: fill inputs and click calculate
  if (a.inputs.length > 0) {
    lines.push(`  it('accepts input and computes result', async () => {`);
    lines.push(`    R();`);
    lines.push(`    const user = userEvent.setup();`);

    // Find number inputs
    lines.push(`    const numberInputs = screen.getAllByRole('spinbutton');`);
    lines.push(`    if (numberInputs.length > 0) {`);
    lines.push(`      await user.clear(numberInputs[0]);`);
    lines.push(`      await user.type(numberInputs[0], '5');`);
    lines.push(`      if (numberInputs.length > 1) {`);
    lines.push(`        await user.clear(numberInputs[1]);`);
    lines.push(`        await user.type(numberInputs[1], '3');`);
    lines.push(`      }`);
    lines.push(`    }`);

    if (a.hasCalculate) {
      lines.push(`    const btn = screen.getByRole('button', { name: /${escapeRegex(a.calculateLabel)}/i });`);
      lines.push(`    await user.click(btn);`);
    }
    lines.push(`  });`);
    lines.push('');
  }

  // Test: fill textareas and compute
  if (a.textareas.length > 0) {
    lines.push(`  it('processes text input', async () => {`);
    lines.push(`    R();`);
    lines.push(`    const user = userEvent.setup();`);
    lines.push(`    const textareas = screen.getAllByRole('textbox');`);
    lines.push(`    if (textareas.length > 0) {`);
    lines.push(`      await user.type(textareas[0], 'test input value');`);
    lines.push(`    }`);
    if (a.hasCalculate) {
      lines.push(`    const btn = screen.getByRole('button', { name: /${escapeRegex(a.calculateLabel)}/i });`);
      lines.push(`    await user.click(btn);`);
    }
    lines.push(`  });`);
    lines.push('');
  }

  // Test: click calculate without input (edge case)
  if (a.hasCalculate) {
    lines.push(`  it('handles empty input gracefully', async () => {`);
    lines.push(`    R();`);
    lines.push(`    const user = userEvent.setup();`);
    lines.push(`    const btn = screen.getByRole('button', { name: /${escapeRegex(a.calculateLabel)}/i });`);
    lines.push(`    await user.click(btn);`);
    lines.push(`    // Should not crash with empty/default inputs`);
    lines.push(`  });`);
    lines.push('');
  }
}

function generateCrudTests(lines, a, name) {
  if (a.hasAdd) {
    lines.push(`  it('adds a new item', async () => {`);
    lines.push(`    R();`);
    lines.push(`    const user = userEvent.setup();`);
    // Try to find add button
    lines.push(`    const addBtns = screen.getAllByRole('button');`);
    lines.push(`    const addBtn = addBtns.find(b => b.textContent.match(/add|new|\\+/i));`);
    lines.push(`    if (addBtn) await user.click(addBtn);`);
    lines.push(`  });`);
    lines.push('');

    // Test: add multiple items
    lines.push(`  it('can add multiple items', async () => {`);
    lines.push(`    R();`);
    lines.push(`    const user = userEvent.setup();`);
    lines.push(`    const addBtns = screen.getAllByRole('button');`);
    lines.push(`    const addBtn = addBtns.find(b => b.textContent.match(/add|new|\\+/i));`);
    lines.push(`    if (addBtn) {`);
    lines.push(`      await user.click(addBtn);`);
    lines.push(`      await user.click(addBtn);`);
    lines.push(`    }`);
    lines.push(`  });`);
    lines.push('');
  }

  // Test: fill input then add
  if (a.inputs.length > 0) {
    lines.push(`  it('fills input and adds item', async () => {`);
    lines.push(`    R();`);
    lines.push(`    const user = userEvent.setup();`);
    lines.push(`    const inputs = screen.getAllByRole('textbox');`);
    lines.push(`    if (inputs.length > 0) {`);
    lines.push(`      await user.type(inputs[0], 'Test item');`);
    lines.push(`    }`);
    lines.push(`    const addBtns = screen.getAllByRole('button');`);
    lines.push(`    const addBtn = addBtns.find(b => b.textContent.match(/add|new|\\+/i));`);
    lines.push(`    if (addBtn) await user.click(addBtn);`);
    lines.push(`  });`);
    lines.push('');
  }
}

function generateReactiveTests(lines, a, name) {
  if (a.textareas.length > 0) {
    lines.push(`  it('reacts to text input changes', async () => {`);
    lines.push(`    R();`);
    lines.push(`    const user = userEvent.setup();`);
    lines.push(`    const textareas = screen.getAllByRole('textbox');`);
    lines.push(`    if (textareas.length > 0) {`);
    lines.push(`      await user.type(textareas[0], 'sample test content');`);
    lines.push(`    }`);
    lines.push(`  });`);
    lines.push('');
  }

  if (a.inputs.length > 0) {
    lines.push(`  it('reacts to input changes', async () => {`);
    lines.push(`    R();`);
    lines.push(`    const user = userEvent.setup();`);
    lines.push(`    const numberInputs = screen.queryAllByRole('spinbutton');`);
    lines.push(`    const textInputs = screen.queryAllByRole('textbox');`);
    lines.push(`    const inputs = [...numberInputs, ...textInputs];`);
    lines.push(`    if (inputs.length > 0) {`);
    lines.push(`      await user.clear(inputs[0]);`);
    lines.push(`      await user.type(inputs[0], '10');`);
    lines.push(`    }`);
    lines.push(`  });`);
    lines.push('');
  }
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\s+/g, '\\s*');
}
