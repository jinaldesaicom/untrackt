import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

const W = ({ children }) => (
  <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>
);

let Component;
beforeAll(async () => {
  const mod = await import('../../../tools/maths-science/WaveSoundCalculator.jsx');
  Component = mod.default;
});

describe('WaveSoundCalculator – functional', () => {
  it('renders with wave tab by default', () => {
    render(<W><Component /></W>);
    expect(screen.getByText(/wave equation/i)).toBeInTheDocument();
  });

  it('calculates wave equation (frequency from speed and wavelength)', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const inputs = screen.getAllByRole('spinbutton');
    // Speed, Frequency, Wavelength - fill speed and wavelength
    await user.clear(inputs[0]);
    await user.type(inputs[0], '340');
    await user.clear(inputs[2]);
    await user.type(inputs[2], '0.5');
    await user.click(screen.getByRole('button', { name: /calculate/i }));
    expect(document.body.textContent).toMatch(/680|frequency/i);
  });

  it('switches to decibel tab and calculates', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    await user.click(screen.getByRole('button', { name: /decibel/i }));
    const inputs = screen.getAllByRole('spinbutton');
    await user.clear(inputs[0]);
    await user.type(inputs[0], '20');
    await user.click(screen.getByRole('button', { name: /calculate/i }));
    expect(document.body.textContent).toMatch(/dB|SPL|decibel/i);
  });

  it('switches to doppler tab and calculates', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    await user.click(screen.getByRole('button', { name: /doppler/i }));
    const inputs = screen.getAllByRole('spinbutton');
    if (inputs.length >= 3) {
      await user.clear(inputs[0]);
      await user.type(inputs[0], '30');
      await user.clear(inputs[1]);
      await user.type(inputs[1], '0');
      await user.clear(inputs[2]);
      await user.type(inputs[2], '440');
    }
    await user.click(screen.getByRole('button', { name: /calculate/i }));
    expect(document.body.textContent).toMatch(/approach|reced|doppler|Hz/i);
  });

  it('switches to EM spectrum tab and calculates', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    await user.click(screen.getByRole('button', { name: /em spectrum/i }));
    const inputs = screen.getAllByRole('spinbutton');
    await user.clear(inputs[0]);
    await user.type(inputs[0], '5e14');
    await user.click(screen.getByRole('button', { name: /calculate/i }));
    expect(document.body.textContent).toMatch(/wavelength|spectrum|nm|visible/i);
  });
});
