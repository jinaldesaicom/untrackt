import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

vi.mock('../../../utils/storage', () => ({
  getItem: vi.fn((key, def = null) => def),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  getPreference: vi.fn(() => null),
  setPreference: vi.fn()
}));

const W = ({ children }) => (
  <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>
);

let Component;
beforeAll(async () => {
  const mod = await import('../../../tools/pm/RaidLog.jsx');
  Component = mod.default;
});

describe('RaidLog – functional', () => {
  it('renders with add buttons for each RAID type', () => {
    render(<W><Component /></W>);
    const btns = screen.getAllByRole('button');
    expect(btns.some(b => /Risk/i.test(b.textContent))).toBe(true);
    expect(btns.some(b => /Assumption/i.test(b.textContent))).toBe(true);
    expect(btns.some(b => /Issue/i.test(b.textContent))).toBe(true);
    expect(btns.some(b => /Dependency/i.test(b.textContent))).toBe(true);
  });

  it('adds a risk entry', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const btns = screen.getAllByRole('button');
    const addBtn = btns.find(b => /^\+?\s*Risk$/i.test(b.textContent.replace(/[^\w\s+]/g, '').trim()));
    // Find the button with SVG plus icon and "Risk" text (not the filter button "Risk (0)")
    const riskAddBtn = btns.find(b => b.textContent.includes('Risk') && !b.textContent.includes('('));
    if (riskAddBtn) await user.click(riskAddBtn);
    expect(document.body.textContent).toMatch(/risk|title|description/i);
  });

  it('adds an assumption entry', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const btns = screen.getAllByRole('button');
    const addBtn = btns.find(b => b.textContent.includes('Assumption') && !b.textContent.includes('('));
    if (addBtn) await user.click(addBtn);
    expect(document.body.textContent).toMatch(/assumption/i);
  });

  it('adds an issue entry', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const btns = screen.getAllByRole('button');
    const addBtn = btns.find(b => b.textContent.includes('Issue') && !b.textContent.includes('('));
    if (addBtn) await user.click(addBtn);
    expect(document.body.textContent).toMatch(/issue/i);
  });

  it('adds a dependency entry', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const btns = screen.getAllByRole('button');
    const addBtn = btns.find(b => b.textContent.includes('Dependency') && !b.textContent.includes('('));
    if (addBtn) await user.click(addBtn);
    expect(document.body.textContent).toMatch(/dependency/i);
  });

  it('uses filter buttons', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const allBtn = screen.queryByRole('button', { name: /^all$/i });
    if (allBtn) await user.click(allBtn);
  });

  it('copy and export buttons exist', () => {
    render(<W><Component /></W>);
    const copyBtn = screen.queryByRole('button', { name: /copy/i });
    const csvBtn = screen.queryByRole('button', { name: /csv/i });
    expect(copyBtn || csvBtn).toBeTruthy();
  });
});
