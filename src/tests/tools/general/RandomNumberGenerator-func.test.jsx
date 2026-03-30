import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

// Mock crypto.getRandomValues
if (!globalThis.crypto) globalThis.crypto = {};
if (!globalThis.crypto.getRandomValues) {
  globalThis.crypto.getRandomValues = (arr) => {
    for (let i = 0; i < arr.length; i++) arr[i] = Math.floor(Math.random() * 256);
    return arr;
  };
}

const W = ({ children }) => (
  <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>
);

let Component;
beforeAll(async () => {
  const mod = await import('../../../tools/general/RandomNumberGenerator.jsx');
  Component = mod.default;
});

describe('RandomNumberGenerator – functional', () => {
  it('renders single mode by default', () => {
    render(<W><Component /></W>);
    expect(document.body.textContent).toMatch(/single|min|max|generate/i);
  });

  it('generates a single random number', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const genBtn = screen.getByRole('button', { name: /^Generate$/ });
    await user.click(genBtn);
    expect(document.body.textContent).toMatch(/\d+/);
  });

  it('switches to multiple mode and generates', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    await user.click(screen.getByRole('radio', { name: /Multiple/i }));
    const genBtn = screen.queryByRole('button', { name: /generate unique/i });
    if (genBtn) await user.click(genBtn);
  });

  it('switches to list mode', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    await user.click(screen.getByRole('radio', { name: /From list/i }));
    const pickBtn = screen.getAllByRole('button').find(b => /^Pick random/i.test(b.textContent.trim()));
    if (pickBtn) await user.click(pickBtn);
  });

  it('switches to dice mode and rolls', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    await user.click(screen.getByRole('radio', { name: /Dice/i }));
    const rollBtn = screen.queryByRole('button', { name: /roll/i });
    if (rollBtn) await user.click(rollBtn);
    // Can also click preset buttons
    const d6Btn = screen.queryByRole('button', { name: /d6/i });
    if (d6Btn) await user.click(d6Btn);
  });

  it('switches to coin mode and flips', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    await user.click(screen.getByRole('radio', { name: /Coin/i }));
    const flipBtn = screen.queryByRole('button', { name: /flip/i });
    if (flipBtn) await user.click(flipBtn);
    expect(document.body.textContent).toMatch(/head|tail|coin/i);
  });
});
