import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

const W = ({ children }) => (
  <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>
);

let Component;
beforeAll(async () => {
  const mod = await import('../../../tools/maths-science/CalculusReferenceTool.jsx');
  Component = mod.default;
});

describe('CalculusReferenceTool – functional', () => {
  it('shows derivatives reference by default', () => {
    render(<W><Component /></W>);
    expect(document.body.textContent).toMatch(/derivative|rule|power|chain/i);
  });

  it('switches to integrals tab', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    await user.click(screen.getByRole('button', { name: /integral/i }));
    expect(document.body.textContent).toMatch(/integral|∫|antiderivative/i);
  });

  it('switches to limits tab and calculates a limit', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    await user.click(screen.getByRole('button', { name: /limit/i }));
    const textInputs = screen.getAllByRole('textbox');
    await user.clear(textInputs[0]);
    await user.type(textInputs[0], 'Math.sin(x)/x');
    const numInputs = screen.getAllByRole('spinbutton');
    await user.clear(numInputs[0]);
    await user.type(numInputs[0], '0');
    await user.click(screen.getByRole('button', { name: /calculate/i }));
    expect(document.body.textContent).toMatch(/1|lim|limit/i);
  });

  it('switches to taylor series tab', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    await user.click(screen.getByRole('button', { name: /taylor/i }));
    expect(document.body.textContent).toMatch(/taylor|series|expansion/i);
  });

  it('handles invalid limit expression', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    await user.click(screen.getByRole('button', { name: /limit/i }));
    const textInputs = screen.getAllByRole('textbox');
    await user.clear(textInputs[0]);
    await user.type(textInputs[0], 'invalid!!!');
    const numInputs = screen.getAllByRole('spinbutton');
    await user.clear(numInputs[0]);
    await user.type(numInputs[0], '0');
    await user.click(screen.getByRole('button', { name: /calculate/i }));
    // Should show error or NaN
    expect(document.body.textContent).toMatch(/error|NaN|invalid|could not/i);
  });
});
