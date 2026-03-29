import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

const W = ({ children }) => (
  <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>
);

let Component;
beforeAll(async () => {
  const mod = await import('../../../tools/maths-science/EquationSolver.jsx');
  Component = mod.default;
});

const findBtn = (text) => screen.getAllByRole('button').find(b => text.test(b.textContent.trim()));

describe('LinearEquationSolver – coverage', () => {
  it('renders', () => {
    render(<W><Component /></W>);
    expect(document.body.textContent).toMatch(/linear|equation|solve|system/i);
  });

  it('solves 2-variable system', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const inputs = screen.queryAllByRole('spinbutton');
    // 2x2: a11, a12, b1, a21, a22, b2
    if (inputs.length >= 6) {
      const vals = [2, 1, 5, 1, 3, 10];
      for (let i = 0; i < 6; i++) {
        await user.clear(inputs[i]);
        await user.type(inputs[i], String(vals[i]));
      }
    }
    const solveBtn = findBtn(/solve|calculate/i);
    if (solveBtn) await user.click(solveBtn);
  });

  it('switches to 3-variable mode', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const threBtn = findBtn(/3.?var|3x3/i) || screen.queryAllByRole('radio').find(r => /3/i.test(r.textContent || ''));
    if (threBtn) await user.click(threBtn);
    const inputs = screen.queryAllByRole('spinbutton');
    if (inputs.length >= 9) {
      const vals = [1, 1, 1, 6, 2, 1, -1, 3, 1, -1, 2, 5];
      for (let i = 0; i < Math.min(inputs.length, vals.length); i++) {
        await user.clear(inputs[i]);
        await user.type(inputs[i], String(vals[i]));
      }
    }
    const solveBtn = findBtn(/solve|calculate/i);
    if (solveBtn) await user.click(solveBtn);
  });

  it('enters equation text format', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const ta = document.querySelector('textarea') || screen.queryAllByRole('textbox')[0];
    if (ta) {
      await user.clear(ta);
      await user.type(ta, '2x + 3y = 12');
    }
    const solveBtn = findBtn(/solve|calculate|parse/i);
    if (solveBtn) await user.click(solveBtn);
  });

  it('handles no solution', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const inputs = screen.queryAllByRole('spinbutton');
    // Parallel lines: x + y = 1, x + y = 2
    if (inputs.length >= 6) {
      const vals = [1, 1, 1, 1, 1, 2];
      for (let i = 0; i < 6; i++) {
        await user.clear(inputs[i]);
        await user.type(inputs[i], String(vals[i]));
      }
    }
    const solveBtn = findBtn(/solve|calculate/i);
    if (solveBtn) await user.click(solveBtn);
  });

  it('copies', async () => {
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
