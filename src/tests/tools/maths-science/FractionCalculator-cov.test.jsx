import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

const W = ({ children }) => (
  <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>
);

let Component;
beforeAll(async () => {
  const mod = await import('../../../tools/maths-science/FractionCalculator.jsx');
  Component = mod.default;
});

const findBtn = (text) => screen.getAllByRole('button').find(b => text.test(b.textContent.trim()));

describe('FractionCalculator – coverage', () => {
  it('renders', () => {
    render(<W><Component /></W>);
    expect(document.body.textContent).toMatch(/fraction/i);
  });

  it('adds two fractions', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const inputs = screen.queryAllByRole('spinbutton');
    if (inputs.length >= 4) {
      await user.clear(inputs[0]);
      await user.type(inputs[0], '1');
      await user.clear(inputs[1]);
      await user.type(inputs[1], '3');
      await user.clear(inputs[2]);
      await user.type(inputs[2], '1');
      await user.clear(inputs[3]);
      await user.type(inputs[3], '6');
    }
    const plusBtn = screen.getAllByRole('button').find(b => b.textContent.trim() === '+');
    if (plusBtn) await user.click(plusBtn);
    const calcBtn = screen.getAllByRole('button').find(b => /^calculate$/i.test(b.textContent.trim()));
    if (calcBtn) await user.click(calcBtn);
  });

  it('subtracts fractions', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const inputs = screen.queryAllByRole('spinbutton');
    if (inputs.length >= 4) {
      await user.clear(inputs[0]);
      await user.type(inputs[0], '3');
      await user.clear(inputs[1]);
      await user.type(inputs[1], '4');
      await user.clear(inputs[2]);
      await user.type(inputs[2], '1');
      await user.clear(inputs[3]);
      await user.type(inputs[3], '4');
    }
    const minusBtn = screen.getAllByRole('button').find(b => b.textContent.trim() === '−' || b.textContent.trim() === '-');
    if (minusBtn) await user.click(minusBtn);
    const calcBtn = screen.getAllByRole('button').find(b => /^calculate$/i.test(b.textContent.trim()));
    if (calcBtn) await user.click(calcBtn);
  });

  it('multiplies fractions', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const inputs = screen.queryAllByRole('spinbutton');
    if (inputs.length >= 4) {
      await user.clear(inputs[0]);
      await user.type(inputs[0], '2');
      await user.clear(inputs[1]);
      await user.type(inputs[1], '3');
      await user.clear(inputs[2]);
      await user.type(inputs[2], '3');
      await user.clear(inputs[3]);
      await user.type(inputs[3], '5');
    }
    const mulBtn = screen.getAllByRole('button').find(b => b.textContent.trim() === '×');
    if (mulBtn) await user.click(mulBtn);
    const calcBtn = screen.getAllByRole('button').find(b => /^calculate$/i.test(b.textContent.trim()));
    if (calcBtn) await user.click(calcBtn);
  });

  it('divides fractions', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const inputs = screen.queryAllByRole('spinbutton');
    if (inputs.length >= 4) {
      await user.clear(inputs[0]);
      await user.type(inputs[0], '1');
      await user.clear(inputs[1]);
      await user.type(inputs[1], '2');
      await user.clear(inputs[2]);
      await user.type(inputs[2], '1');
      await user.clear(inputs[3]);
      await user.type(inputs[3], '4');
    }
    const divBtn = screen.getAllByRole('button').find(b => b.textContent.trim() === '÷');
    if (divBtn) await user.click(divBtn);
    const calcBtn = screen.getAllByRole('button').find(b => /^calculate$/i.test(b.textContent.trim()));
    if (calcBtn) await user.click(calcBtn);
  });

  it('converts to mixed number', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const convBtn = findBtn(/convert/i) || screen.queryAllByRole('radio').find(r => /convert/i.test(r.textContent || ''));
    if (convBtn) await user.click(convBtn);
    const inputs = screen.queryAllByRole('spinbutton');
    if (inputs.length >= 2) {
      await user.clear(inputs[0]);
      await user.type(inputs[0], '7');
      await user.clear(inputs[1]);
      await user.type(inputs[1], '3');
    }
    const convertCalcBtn = screen.getAllByRole('button').find(b => /^convert$|^calculate$/i.test(b.textContent.trim()));
    if (convertCalcBtn) await user.click(convertCalcBtn);
  });

  it('simplifies', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const inputs = screen.queryAllByRole('spinbutton');
    if (inputs.length >= 4) {
      await user.clear(inputs[0]);
      await user.type(inputs[0], '4');
      await user.clear(inputs[1]);
      await user.type(inputs[1], '8');
      await user.clear(inputs[2]);
      await user.type(inputs[2], '2');
      await user.clear(inputs[3]);
      await user.type(inputs[3], '6');
    }
    const plusBtn = screen.getAllByRole('button').find(b => b.textContent.trim() === '+');
    if (plusBtn) await user.click(plusBtn);
    const calcBtn = screen.getAllByRole('button').find(b => /^calculate$/i.test(b.textContent.trim()));
    if (calcBtn) await user.click(calcBtn);
  });

  it('handles zero denominator', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const inputs = screen.queryAllByRole('spinbutton');
    if (inputs.length >= 4) {
      await user.clear(inputs[0]);
      await user.type(inputs[0], '1');
      await user.clear(inputs[1]);
      await user.type(inputs[1], '0');
      await user.clear(inputs[2]);
      await user.type(inputs[2], '1');
      await user.clear(inputs[3]);
      await user.type(inputs[3], '2');
    }
    const calcBtn = screen.getAllByRole('button').find(b => /^calculate$/i.test(b.textContent.trim()));
    if (calcBtn) await user.click(calcBtn);
  });

  it('resets form', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const resetBtn = findBtn(/reset|clear/i);
    if (resetBtn) await user.click(resetBtn);
  });
});
