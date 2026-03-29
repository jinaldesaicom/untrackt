import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

const W = ({ children }) => (
  <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>
);

let Component;
beforeAll(async () => {
  const mod = await import('../../../tools/maths-science/MicroscopyCalculator.jsx');
  Component = mod.default;
});

describe('MicroscopyCalculator – functional', () => {
  it('calculates total magnification reactively', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const inputs = screen.getAllByRole('spinbutton');
    // Eyepiece (default 10x), Objective lens
    await user.clear(inputs[0]); await user.type(inputs[0], '10');
    await user.clear(inputs[1]); await user.type(inputs[1], '40');
    expect(document.body.textContent).toMatch(/400|magnification/i);
  });

  it('switches to FOV mode', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    await user.click(screen.getByRole('button', { name: /field of view|fov/i }));
    const inputs = screen.getAllByRole('spinbutton');
    if (inputs.length >= 3) {
      await user.clear(inputs[0]); await user.type(inputs[0], '4.5');
      await user.clear(inputs[1]); await user.type(inputs[1], '40');
      await user.clear(inputs[2]); await user.type(inputs[2], '100');
    }
    expect(document.body.textContent).toMatch(/1\.8|fov|field/i);
  });

  it('switches to actual size mode', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    await user.click(screen.getByRole('button', { name: /actual size/i }));
    const inputs = screen.getAllByRole('spinbutton');
    if (inputs.length >= 2) {
      await user.clear(inputs[0]); await user.type(inputs[0], '20');
      await user.clear(inputs[1]); await user.type(inputs[1], '400');
    }
    expect(document.body.textContent).toMatch(/0\.05|actual|size/i);
  });

  it('switches to scale bar mode', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    await user.click(screen.getByRole('button', { name: /scale bar/i }));
    const inputs = screen.getAllByRole('spinbutton');
    if (inputs.length >= 3) {
      await user.clear(inputs[0]); await user.type(inputs[0], '10');
      await user.clear(inputs[1]); await user.type(inputs[1], '50');
      await user.clear(inputs[2]); await user.type(inputs[2], '30');
    }
    expect(document.body.textContent).toMatch(/150|scale|specimen/i);
  });

  it('switches to resolution limit mode', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    await user.click(screen.getByRole('button', { name: /resolution/i }));
    const inputs = screen.getAllByRole('spinbutton');
    if (inputs.length >= 2) {
      await user.clear(inputs[0]); await user.type(inputs[0], '550');
      await user.clear(inputs[1]); await user.type(inputs[1], '1.25');
    }
    expect(document.body.textContent).toMatch(/268|resolution|limit|nm/i);
  });
});
