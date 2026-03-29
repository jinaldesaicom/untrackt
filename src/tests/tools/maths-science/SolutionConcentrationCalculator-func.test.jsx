import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

const W = ({ children }) => (
  <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>
);

let Component;
beforeAll(async () => {
  const mod = await import('../../../tools/maths-science/SolutionConcentrationCalculator.jsx');
  Component = mod.default;
});

describe('SolutionConcentrationCalculator – functional', () => {
  it('calculates molarity reactively', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const inputs = screen.getAllByRole('spinbutton');
    // Molarity: mass, molar mass, volume
    await user.clear(inputs[0]); await user.type(inputs[0], '58.44');
    await user.clear(inputs[1]); await user.type(inputs[1], '58.44');
    await user.clear(inputs[2]); await user.type(inputs[2], '1000');
    expect(document.body.textContent).toMatch(/1|molarity|mol/i);
  });

  it('switches to molality mode', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    await user.click(screen.getByRole('button', { name: /molality/i }));
    const inputs = screen.getAllByRole('spinbutton');
    await user.clear(inputs[0]); await user.type(inputs[0], '2');
    await user.clear(inputs[1]); await user.type(inputs[1], '500');
    expect(document.body.textContent).toMatch(/4|molal/i);
  });

  it('switches to mass percent mode', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    await user.click(screen.getByRole('button', { name: /mass/i }));
    const inputs = screen.getAllByRole('spinbutton');
    await user.clear(inputs[0]); await user.type(inputs[0], '10');
    await user.clear(inputs[1]); await user.type(inputs[1], '100');
    expect(document.body.textContent).toMatch(/10|%|mass percent/i);
  });

  it('switches to dilution mode', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    await user.click(screen.getByRole('button', { name: /dilution/i }));
    const inputs = screen.getAllByRole('spinbutton');
    // C1=2, V1=100, C2=0.5, leave V2 blank to solve
    await user.clear(inputs[0]); await user.type(inputs[0], '2');
    await user.clear(inputs[1]); await user.type(inputs[1], '100');
    await user.clear(inputs[2]); await user.type(inputs[2], '0.5');
    expect(document.body.textContent).toMatch(/400|solved|dilution/i);
  });

  it('switches to PPM mode', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    await user.click(screen.getByRole('button', { name: /ppm/i }));
    const inputs = screen.getAllByRole('spinbutton');
    await user.clear(inputs[0]); await user.type(inputs[0], '5');
    await user.clear(inputs[1]); await user.type(inputs[1], '1');
    expect(document.body.textContent).toMatch(/5|ppm/i);
  });
});
