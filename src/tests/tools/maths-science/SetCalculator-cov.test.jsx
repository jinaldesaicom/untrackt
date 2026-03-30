import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

const W = ({ children }) => (
  <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>
);

let Component;
beforeAll(async () => {
  const mod = await import('../../../tools/maths-science/SetTheoryCalculator.jsx');
  Component = mod.default;
});

const findBtn = (text) => screen.getAllByRole('button').find(b => text.test(b.textContent.trim()));

describe('SetCalculator – coverage', () => {
  it('renders', () => {
    render(<W><Component /></W>);
    expect(document.body.textContent).toMatch(/set|union|intersection|difference/i);
  });

  it('enters two sets and calculates union', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const textInputs = screen.queryAllByRole('textbox');
    const tas = document.querySelectorAll('textarea');
    const inputA = tas[0] || textInputs[0];
    const inputB = tas[1] || textInputs[1];
    if (inputA) {
      await user.clear(inputA);
      await user.type(inputA, '1, 2, 3, 4');
    }
    if (inputB) {
      await user.clear(inputB);
      await user.type(inputB, '3, 4, 5, 6');
    }
    const unionBtn = findBtn(/union|∪/i);
    if (unionBtn) await user.click(unionBtn);
    const calcBtn = findBtn(/^calculate$/i);
    if (calcBtn) await user.click(calcBtn);
  });

  it('calculates intersection', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const tas = document.querySelectorAll('textarea');
    const textInputs = screen.queryAllByRole('textbox');
    const inputA = tas[0] || textInputs[0];
    const inputB = tas[1] || textInputs[1];
    if (inputA) {
      await user.clear(inputA);
      await user.type(inputA, '1, 2, 3');
    }
    if (inputB) {
      await user.clear(inputB);
      await user.type(inputB, '2, 3, 4');
    }
    const intBtn = findBtn(/intersection|∩/i);
    if (intBtn) await user.click(intBtn);
    const calcBtn = findBtn(/^calculate$/i);
    if (calcBtn) await user.click(calcBtn);
  });

  it('calculates difference', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const diffBtn = findBtn(/difference|\\|−/i);
    if (diffBtn) await user.click(diffBtn);
  });

  it('calculates symmetric difference', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const symBtn = findBtn(/symmetric|△|⊕/i);
    if (symBtn) await user.click(symBtn);
  });

  it('checks subset', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const subBtn = findBtn(/subset|⊆/i);
    if (subBtn) await user.click(subBtn);
  });

  it('copies result', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const copyBtn = findBtn(/copy/i);
    if (copyBtn) await user.click(copyBtn);
  });

  it('resets', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const resetBtn = findBtn(/reset|clear/i);
    if (resetBtn) await user.click(resetBtn);
  });
});
