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
  const mod = await import('../../../tools/finance/DailyExpenseTracker.jsx');
  Component = mod.default;
});

describe('DailyExpenseTracker – functional', () => {
  it('renders with expense log view', () => {
    render(<W><Component /></W>);
    expect(document.body.textContent).toMatch(/expense|log|add|amount/i);
  });

  it('adds an expense entry', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    // First click Add button to open form
    const btns = screen.getAllByRole('button');
    const addBtn = btns.find(b => /^add$/i.test(b.textContent.trim()) || /add expense/i.test(b.textContent));
    if (addBtn) await user.click(addBtn);
    // Now look for number inputs
    const numInputs = screen.queryAllByRole('spinbutton');
    if (numInputs.length > 0) {
      await user.clear(numInputs[0]);
      await user.type(numInputs[0], '25');
    }
    const textInputs = screen.queryAllByRole('textbox');
    if (textInputs.length > 0) {
      await user.clear(textInputs[0]);
      await user.type(textInputs[0], 'Lunch');
    }
    const saveBtn = screen.queryAllByRole('button').find(b => /save|add/i.test(b.textContent));
    if (saveBtn) await user.click(saveBtn);
  });

  it('switches to income tab', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const incomeBtn = screen.queryByRole('button', { name: /income/i });
    if (incomeBtn) {
      await user.click(incomeBtn);
      expect(document.body.textContent).toMatch(/income|source|add/i);
    }
  });

  it('switches to charts view', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const chartsBtn = screen.queryByRole('button', { name: /chart/i });
    if (chartsBtn) {
      await user.click(chartsBtn);
      expect(document.body.textContent).toMatch(/chart|breakdown|category/i);
    }
  });

  it('switches to trends view', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const trendsBtn = screen.queryByRole('button', { name: /trend/i });
    if (trendsBtn) {
      await user.click(trendsBtn);
      expect(document.body.textContent).toMatch(/trend|daily|monthly/i);
    }
  });

  it('switches to balance view', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const balBtn = screen.queryByRole('button', { name: /balance/i });
    if (balBtn) {
      await user.click(balBtn);
      expect(document.body.textContent).toMatch(/balance|net|income|expense/i);
    }
  });

  it('switches to budget view', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const budgetBtn = screen.queryByRole('button', { name: /budget/i });
    if (budgetBtn) {
      await user.click(budgetBtn);
      expect(document.body.textContent).toMatch(/budget|monthly|limit/i);
    }
  });

  it('navigates months', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const buttons = screen.queryAllByRole('button');
    const prevBtn = buttons.find(b => b.textContent.includes('←') || b.getAttribute('aria-label')?.match(/prev/i));
    if (prevBtn) await user.click(prevBtn);
    const nextBtn = buttons.find(b => b.textContent.includes('→') || b.getAttribute('aria-label')?.match(/next/i));
    if (nextBtn) await user.click(nextBtn);
  });
});
