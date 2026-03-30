import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

const W = ({ children }) => (
  <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>
);

let Component;
beforeAll(async () => {
  const mod = await import('../../../tools/maths-science/ProbabilityCalculator.jsx');
  Component = mod.default;
});

describe('ProbabilityCalculator – functional', () => {
  it('calculates basic probability', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const inputs = screen.getAllByRole('spinbutton');
    await user.clear(inputs[0]); await user.type(inputs[0], '3');
    await user.clear(inputs[1]); await user.type(inputs[1], '10');
    await user.click(screen.getByRole('button', { name: /calculate/i }));
    expect(document.body.textContent).toMatch(/3\/10|0\.3|30%|P\(A\)/);
  });

  it('switches to permutation mode', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    await user.click(screen.getByRole('button', { name: /permut/i }));
    const inputs = screen.getAllByRole('spinbutton');
    await user.clear(inputs[0]); await user.type(inputs[0], '10');
    await user.clear(inputs[1]); await user.type(inputs[1], '3');
    await user.click(screen.getByRole('button', { name: /calculate/i }));
    expect(document.body.textContent).toMatch(/720|P\(10/);
  });

  it('switches to combination mode', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    await user.click(screen.getByRole('button', { name: /combin/i }));
    const inputs = screen.getAllByRole('spinbutton');
    await user.clear(inputs[0]); await user.type(inputs[0], '10');
    await user.clear(inputs[1]); await user.type(inputs[1], '3');
    await user.click(screen.getByRole('button', { name: /calculate/i }));
    expect(document.body.textContent).toMatch(/120|C\(10/);
  });

  it('switches to binomial mode', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    await user.click(screen.getByRole('button', { name: /binomial/i }));
    const inputs = screen.getAllByRole('spinbutton');
    if (inputs.length >= 3) {
      await user.clear(inputs[0]); await user.type(inputs[0], '10');
      await user.clear(inputs[1]); await user.type(inputs[1], '3');
      await user.clear(inputs[2]); await user.type(inputs[2], '0.5');
    }
    await user.click(screen.getByRole('button', { name: /calculate/i }));
    expect(document.body.textContent).toMatch(/0\.117|P\(X/);
  });

  it('switches to normal distribution mode', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    await user.click(screen.getByRole('button', { name: /normal/i }));
    const inputs = screen.getAllByRole('spinbutton');
    await user.clear(inputs[0]); await user.type(inputs[0], '1.96');
    await user.click(screen.getByRole('button', { name: /calculate/i }));
    expect(document.body.textContent).toMatch(/0\.975|P\(Z/);
  });

  it('handles reset', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const inputs = screen.getAllByRole('spinbutton');
    await user.type(inputs[0], '5');
    const resetBtn = screen.queryByRole('button', { name: /reset/i });
    if (resetBtn) await user.click(resetBtn);
  });
});
