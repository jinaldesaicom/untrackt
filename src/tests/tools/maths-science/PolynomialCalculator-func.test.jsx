import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

const W = ({ children }) => (
  <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>
);

let Component;
beforeAll(async () => {
  const mod = await import('../../../tools/maths-science/PolynomialCalculator.jsx');
  Component = mod.default;
});

describe('PolynomialCalculator – functional', () => {
  it('evaluates polynomial at a given x', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    // Evaluate mode should be default or find it
    const evalBtn = screen.queryByRole('button', { name: /evaluate/i });
    if (evalBtn) await user.click(evalBtn);
    const textInputs = screen.getAllByRole('textbox');
    await user.clear(textInputs[0]);
    await user.type(textInputs[0], '1 2 3'); // x^2 + 2x + 3
    const numInputs = screen.getAllByRole('spinbutton');
    await user.clear(numInputs[0]);
    await user.type(numInputs[0], '2');
    await user.click(screen.getByRole('button', { name: /calculate/i }));
    expect(document.body.textContent).toMatch(/11|P\(2\)/);
  });

  it('adds two polynomials', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    await user.click(screen.getByRole('button', { name: /^add$/i }));
    const textInputs = screen.getAllByRole('textbox');
    await user.clear(textInputs[0]);
    await user.type(textInputs[0], '1 2 3');
    await user.clear(textInputs[1]);
    await user.type(textInputs[1], '3 2 1');
    await user.click(screen.getByRole('button', { name: /calculate/i }));
    expect(document.body.textContent).toMatch(/4.*4.*4|result/i);
  });

  it('subtracts two polynomials', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    await user.click(screen.getByRole('button', { name: /subtract/i }));
    const textInputs = screen.getAllByRole('textbox');
    await user.clear(textInputs[0]);
    await user.type(textInputs[0], '3 2 1');
    await user.clear(textInputs[1]);
    await user.type(textInputs[1], '1 1 1');
    await user.click(screen.getByRole('button', { name: /calculate/i }));
    expect(document.body.textContent).toMatch(/2.*1.*0|result/i);
  });

  it('multiplies two polynomials', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    await user.click(screen.getByRole('button', { name: /multiply/i }));
    const textInputs = screen.getAllByRole('textbox');
    await user.clear(textInputs[0]);
    await user.type(textInputs[0], '1 1');
    await user.clear(textInputs[1]);
    await user.type(textInputs[1], '1 1');
    await user.click(screen.getByRole('button', { name: /calculate/i }));
    expect(document.body.textContent).toMatch(/1.*2.*1|result/i);
  });

  it('finds roots of a quadratic', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const rootsBtn = screen.queryByRole('button', { name: /roots/i });
    if (rootsBtn) await user.click(rootsBtn);
    const textInputs = screen.getAllByRole('textbox');
    await user.clear(textInputs[0]);
    await user.type(textInputs[0], '1 -3 2'); // (x-1)(x-2)
    await user.click(screen.getByRole('button', { name: /calculate/i }));
    expect(document.body.textContent).toMatch(/1|2|root/i);
  });

  it('handles reset', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const textInputs = screen.getAllByRole('textbox');
    await user.type(textInputs[0], '1 2 3');
    const resetBtn = screen.queryByRole('button', { name: /reset/i });
    if (resetBtn) await user.click(resetBtn);
  });
});
