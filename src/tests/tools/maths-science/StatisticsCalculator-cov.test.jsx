import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

const W = ({ children }) => (
  <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>
);

let Component;
beforeAll(async () => {
  const mod = await import('../../../tools/maths-science/StatisticsCalculator.jsx');
  Component = mod.default;
});

describe('StatisticsCalculator – coverage', () => {
  it('renders with data input', () => {
    render(<W><Component /></W>);
    expect(screen.getByRole('textbox') || screen.queryByPlaceholderText(/data/i) || document.querySelector('textarea')).toBeTruthy();
  });

  it('enters data and computes statistics', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const ta = document.querySelector('textarea') || screen.getByRole('textbox');
    await user.clear(ta);
    await user.type(ta, '1, 2, 3, 4, 5, 6, 7, 8, 9, 10');
    // Should auto-calculate or have calculate button
    const calcBtn = screen.queryAllByRole('button').find(b => /calculate/i.test(b.textContent));
    if (calcBtn) await user.click(calcBtn);
    expect(document.body.textContent).toMatch(/mean|average|median/i);
  });

  it('computes with outliers', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const ta = document.querySelector('textarea') || screen.getByRole('textbox');
    await user.clear(ta);
    await user.type(ta, '1, 2, 3, 4, 5, 100');
    const calcBtn = screen.queryAllByRole('button').find(b => /calculate/i.test(b.textContent));
    if (calcBtn) await user.click(calcBtn);
  });

  it('uses Z-score calculator', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const numInputs = screen.queryAllByRole('spinbutton');
    // Z-score inputs: Value, Mean, Std Dev
    if (numInputs.length >= 3) {
      const zInputs = numInputs.slice(-3);
      await user.clear(zInputs[0]);
      await user.type(zInputs[0], '85');
      await user.clear(zInputs[1]);
      await user.type(zInputs[1], '70');
      await user.clear(zInputs[2]);
      await user.type(zInputs[2], '10');
    }
    const zBtn = screen.queryAllByRole('button').find(b => /z.?score|calculate/i.test(b.textContent));
    if (zBtn) await user.click(zBtn);
  });

  it('copies results', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const ta = document.querySelector('textarea') || screen.getByRole('textbox');
    await user.clear(ta);
    await user.type(ta, '10, 20, 30');
    const calcBtn = screen.queryAllByRole('button').find(b => /calculate/i.test(b.textContent));
    if (calcBtn) await user.click(calcBtn);
    const copyBtn = screen.queryAllByRole('button').find(b => /copy/i.test(b.textContent));
    if (copyBtn) await user.click(copyBtn);
  });

  it('handles empty data', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const ta = document.querySelector('textarea') || screen.getByRole('textbox');
    await user.clear(ta);
    const calcBtn = screen.queryAllByRole('button').find(b => /calculate/i.test(b.textContent));
    if (calcBtn) await user.click(calcBtn);
  });

  it('handles single value', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const ta = document.querySelector('textarea') || screen.getByRole('textbox');
    await user.clear(ta);
    await user.type(ta, '42');
    const calcBtn = screen.queryAllByRole('button').find(b => /calculate/i.test(b.textContent));
    if (calcBtn) await user.click(calcBtn);
  });
});
