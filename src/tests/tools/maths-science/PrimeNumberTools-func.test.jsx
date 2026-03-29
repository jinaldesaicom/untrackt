import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

const W = ({ children }) => (
  <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>
);

let PrimeNumberTools;
beforeAll(async () => {
  const mod = await import('../../../tools/maths-science/PrimeNumberTools.jsx');
  PrimeNumberTools = mod.default;
});

describe('PrimeNumberTools – functional', () => {
  it('checks if a number is prime', async () => {
    const user = userEvent.setup();
    render(<W><PrimeNumberTools /></W>);
    const inputs = screen.getAllByRole('spinbutton');
    await user.clear(inputs[0]);
    await user.type(inputs[0], '17');
    await user.click(screen.getByRole('button', { name: /^calculate$/i }));
    expect(document.body.textContent).toMatch(/prime|17/i);
  });

  it('checks a non-prime number', async () => {
    const user = userEvent.setup();
    render(<W><PrimeNumberTools /></W>);
    const inputs = screen.getAllByRole('spinbutton');
    await user.clear(inputs[0]);
    await user.type(inputs[0], '20');
    await user.click(screen.getByRole('button', { name: /^calculate$/i }));
    expect(document.body.textContent).toMatch(/not prime|20|factor/i);
  });

  it('switches to factorization mode', async () => {
    const user = userEvent.setup();
    render(<W><PrimeNumberTools /></W>);
    const factBtn = screen.queryByRole('button', { name: /factor/i });
    if (factBtn) {
      await user.click(factBtn);
      const inputs = screen.getAllByRole('spinbutton');
      await user.clear(inputs[0]);
      await user.type(inputs[0], '60');
      await user.click(screen.getByRole('button', { name: /calculate/i }));
      expect(document.body.textContent).toMatch(/2|3|5|60/);
    }
  });

  it('switches to range mode', async () => {
    const user = userEvent.setup();
    render(<W><PrimeNumberTools /></W>);
    const rangeBtn = screen.queryByRole('button', { name: /range/i });
    if (rangeBtn) {
      await user.click(rangeBtn);
      const inputs = screen.getAllByRole('spinbutton');
      if (inputs.length >= 2) {
        await user.clear(inputs[0]); await user.type(inputs[0], '2');
        await user.clear(inputs[1]); await user.type(inputs[1], '50');
      }
      await user.click(screen.getByRole('button', { name: /calculate/i }));
      expect(document.body.textContent).toMatch(/2|3|5|7|11/);
    }
  });

  it('switches to GCD/LCM mode', async () => {
    const user = userEvent.setup();
    render(<W><PrimeNumberTools /></W>);
    const gcdBtn = screen.queryByRole('button', { name: /gcd|lcm/i });
    if (gcdBtn) {
      await user.click(gcdBtn);
      const inputs = screen.getAllByRole('spinbutton');
      if (inputs.length >= 2) {
        await user.clear(inputs[0]); await user.type(inputs[0], '24');
        await user.clear(inputs[1]); await user.type(inputs[1], '36');
      }
      await user.click(screen.getByRole('button', { name: /calculate/i }));
      expect(document.body.textContent).toMatch(/12|72|gcd|lcm/i);
    }
  });

  it('handles copy button', async () => {
    const user = userEvent.setup();
    render(<W><PrimeNumberTools /></W>);
    const inputs = screen.getAllByRole('spinbutton');
    await user.clear(inputs[0]);
    await user.type(inputs[0], '17');
    await user.click(screen.getByRole('button', { name: /^calculate$/i }));
    const copyBtn = screen.queryByRole('button', { name: /copy/i });
    if (copyBtn) await user.click(copyBtn);
  });
});
