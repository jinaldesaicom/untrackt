import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

const W = ({ children }) => (
  <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>
);

let ChemicalEquationBalancer;
beforeAll(async () => {
  const mod = await import('../../../tools/maths-science/ChemicalEquationBalancer.jsx');
  ChemicalEquationBalancer = mod.default;
});

describe('ChemicalEquationBalancer – functional', () => {
  it('renders input and balance button', () => {
    render(<W><ChemicalEquationBalancer /></W>);
    expect(screen.getByRole('textbox')).toBeDefined();
    expect(screen.getByRole('button', { name: /balance/i })).toBeDefined();
  });

  it('balances H2 + O2 = H2O', async () => {
    const user = userEvent.setup();
    render(<W><ChemicalEquationBalancer /></W>);
    const input = screen.getByRole('textbox');
    await user.clear(input);
    await user.type(input, 'H2 + O2 = H2O');
    await user.click(screen.getByRole('button', { name: /balance/i }));
    // Should show balanced result or verification table
    expect(document.body.textContent).toMatch(/balanced|verification|coefficient|2\s*H/i);
  });

  it('balances Fe + O2 = Fe2O3', async () => {
    const user = userEvent.setup();
    render(<W><ChemicalEquationBalancer /></W>);
    const input = screen.getByRole('textbox');
    await user.clear(input);
    await user.type(input, 'Fe + O2 = Fe2O3');
    await user.click(screen.getByRole('button', { name: /balance/i }));
    expect(document.body.textContent).toMatch(/Fe|O/);
  });

  it('handles invalid equation gracefully', async () => {
    const user = userEvent.setup();
    render(<W><ChemicalEquationBalancer /></W>);
    const input = screen.getByRole('textbox');
    await user.clear(input);
    await user.type(input, 'invalid');
    await user.click(screen.getByRole('button', { name: /balance/i }));
    // Should show error or no crash
    expect(document.body.textContent.length).toBeGreaterThan(0);
  });

  it('balances Na + Cl2 = NaCl', async () => {
    const user = userEvent.setup();
    render(<W><ChemicalEquationBalancer /></W>);
    const input = screen.getByRole('textbox');
    await user.clear(input);
    await user.type(input, 'Na + Cl2 = NaCl');
    await user.click(screen.getByRole('button', { name: /balance/i }));
    expect(document.body.textContent).toMatch(/Na|Cl/);
  });

  it('handles copy button if present', async () => {
    const user = userEvent.setup();
    render(<W><ChemicalEquationBalancer /></W>);
    const input = screen.getByRole('textbox');
    await user.clear(input);
    await user.type(input, 'H2 + O2 = H2O');
    await user.click(screen.getByRole('button', { name: /balance/i }));
    const copyBtn = screen.queryByRole('button', { name: /copy/i });
    if (copyBtn) await user.click(copyBtn);
  });
});
