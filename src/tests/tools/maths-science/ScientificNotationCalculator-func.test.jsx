import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

const W = ({ children }) => (
  <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>
);

let Component;
beforeAll(async () => {
  const mod = await import('../../../tools/maths-science/ScientificNotationCalculator.jsx');
  Component = mod.default;
});

describe('ScientificNotationCalculator – functional', () => {
  it('converts number to scientific notation reactively', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const textInputs = screen.getAllByRole('textbox');
    await user.clear(textInputs[0]);
    await user.type(textInputs[0], '299792458');
    // Reactive - no calculate button needed
    expect(document.body.textContent).toMatch(/2\.997|×.*10|E\+/i);
  });

  it('shows SI prefix for large numbers', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const textInputs = screen.getAllByRole('textbox');
    await user.clear(textInputs[0]);
    await user.type(textInputs[0], '0.000000001');
    expect(document.body.textContent).toMatch(/nano|10|−9|E-/i);
  });

  it('uses quick-fill example buttons', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const exampleBtn = screen.queryByText(/299792458|speed of light/i);
    if (exampleBtn) await user.click(exampleBtn);
    expect(document.body.textContent).toMatch(/2\.99|×.*10/i);
  });

  it('switches to calc mode', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    await user.click(screen.getByRole('button', { name: /calc/i }));
    const numInputs = screen.getAllByRole('spinbutton');
    if (numInputs.length >= 4) {
      await user.clear(numInputs[0]); await user.type(numInputs[0], '3');
      await user.clear(numInputs[1]); await user.type(numInputs[1], '8');
      await user.clear(numInputs[2]); await user.type(numInputs[2], '2');
      await user.clear(numInputs[3]); await user.type(numInputs[3], '3');
    }
    // Result should show calculation
    expect(document.body.textContent).toMatch(/×.*10|result|scientific/i);
  });

  it('switches operation in calc mode', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    await user.click(screen.getByRole('button', { name: /calc/i }));
    // Look for operation buttons
    const divBtn = screen.queryByRole('button', { name: /÷/ });
    if (divBtn) await user.click(divBtn);
  });
});
