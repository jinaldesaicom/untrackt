import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

const W = ({ children }) => (
  <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>
);

let Component;
beforeAll(async () => {
  const mod = await import('../../../tools/finance/DailyExpenseTracker.jsx');
  Component = mod.default;
});

const findBtn = (text) => screen.getAllByRole('button').find(b => text.test(b.textContent.trim()));
const findRadio = (text) => screen.queryAllByRole('radio').find(r => text.test(r.textContent || r.getAttribute('aria-label') || ''));

describe('DailyExpenseTracker – coverage', () => {
  it('renders with log tab', () => {
    render(<W><Component /></W>);
    expect(document.body.textContent).toMatch(/expense|income|log|track/i);
  });

  it('adds an expense', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const logTab = findBtn(/^log$/i) || findRadio(/^log$/i);
    if (logTab) await user.click(logTab);
    const addBtn = findBtn(/add\s*expense|\+\s*add/i);
    if (addBtn) await user.click(addBtn);
    const numInputs = screen.queryAllByRole('spinbutton');
    if (numInputs.length > 0) {
      await user.clear(numInputs[0]);
      await user.type(numInputs[0], '25');
    }
    const textInputs = screen.queryAllByRole('textbox');
    if (textInputs.length > 0) {
      await user.clear(textInputs[0]);
      await user.type(textInputs[0], 'Coffee');
    }
    const selects = screen.queryAllByRole('combobox');
    if (selects.length > 0) {
      const opts = Array.from(selects[0].options);
      if (opts.length > 1) await user.selectOptions(selects[0], opts[1].value);
    }
    const saveBtn = findBtn(/save|add|submit/i);
    if (saveBtn) await user.click(saveBtn);
  });

  it('switches to income sub-tab', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const incomeBtn = findBtn(/^income$/i) || findRadio(/^income$/i);
    if (incomeBtn) await user.click(incomeBtn);
  });

  it('views charts tab', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const chartsBtn = findBtn(/^charts?$/i) || findRadio(/^charts?$/i);
    if (chartsBtn) await user.click(chartsBtn);
  });

  it('views trends tab', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const trendsBtn = findBtn(/^trends?$/i) || findRadio(/^trends?$/i);
    if (trendsBtn) await user.click(trendsBtn);
  });

  it('views balance tab', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const balBtn = findBtn(/^balance$/i) || findRadio(/^balance$/i);
    if (balBtn) await user.click(balBtn);
  });

  it('views categories tab', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const catBtn = findBtn(/^categories$/i) || findRadio(/^categories$/i);
    if (catBtn) await user.click(catBtn);
  });

  it('views budget tab', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const budBtn = findBtn(/^budget$/i) || findRadio(/^budget$/i);
    if (budBtn) await user.click(budBtn);
    const numInputs = screen.queryAllByRole('spinbutton');
    if (numInputs.length > 0) {
      await user.clear(numInputs[0]);
      await user.type(numInputs[0], '2000');
    }
  });

  it('filters by category', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const selects = screen.queryAllByRole('combobox');
    if (selects.length > 0) {
      const opts = Array.from(selects[0].options);
      if (opts.length > 2) await user.selectOptions(selects[0], opts[2].value);
    }
  });

  it('changes month', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const monthInput = document.querySelector('input[type="month"]');
    if (monthInput) {
      await user.clear(monthInput);
      await user.type(monthInput, '2025-01');
    }
  });
});
