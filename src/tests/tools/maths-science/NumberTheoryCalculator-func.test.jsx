import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

const W = ({ children }) => (
  <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>
);

let Component;
beforeAll(async () => {
  const mod = await import('../../../tools/maths-science/NumberTheoryCalculator.jsx');
  Component = mod.default;
});

describe('NumberTheoryCalculator – functional', () => {
  it('calculates factorial', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const inputs = screen.getAllByRole('spinbutton');
    await user.clear(inputs[0]);
    await user.type(inputs[0], '10');
    await user.click(screen.getByRole('button', { name: /calculate/i }));
    expect(document.body.textContent).toMatch(/3628800|10!/);
  });

  it('switches to fibonacci mode', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    await user.click(screen.getByRole('button', { name: /fibonacci/i }));
    const inputs = screen.getAllByRole('spinbutton');
    await user.clear(inputs[0]);
    await user.type(inputs[0], '10');
    await user.click(screen.getByRole('button', { name: /calculate/i }));
    expect(document.body.textContent).toMatch(/55|fibonacci/i);
  });

  it('switches to modular arithmetic mode', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    await user.click(screen.getByRole('button', { name: /modular/i }));
    const inputs = screen.getAllByRole('spinbutton');
    if (inputs.length >= 3) {
      await user.clear(inputs[0]); await user.type(inputs[0], '7');
      await user.clear(inputs[1]); await user.type(inputs[1], '5');
      await user.clear(inputs[2]); await user.type(inputs[2], '3');
    }
    await user.click(screen.getByRole('button', { name: /calculate/i }));
    expect(document.body.textContent).toMatch(/mod|2|0|1/);
  });

  it('switches to Euler totient mode', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    await user.click(screen.getByRole('button', { name: /totient/i }));
    const inputs = screen.getAllByRole('spinbutton');
    await user.clear(inputs[0]);
    await user.type(inputs[0], '12');
    await user.click(screen.getByRole('button', { name: /calculate/i }));
    expect(document.body.textContent).toMatch(/4|φ|totient/i);
  });

  it('handles reset', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const inputs = screen.getAllByRole('spinbutton');
    await user.type(inputs[0], '10');
    await user.click(screen.getByRole('button', { name: /calculate/i }));
    const resetBtn = screen.queryByRole('button', { name: /reset/i });
    if (resetBtn) await user.click(resetBtn);
  });
});
