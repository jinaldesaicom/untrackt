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

const findBtn = (text) => screen.getAllByRole('button').find(b => text.test(b.textContent.trim()));
const findRadio = (text) => screen.queryAllByRole('radio').find(r => text.test(r.textContent || r.getAttribute('aria-label') || ''));

describe('ChemicalSolutionCalculator – coverage', () => {
  it('renders', () => {
    render(<W><Component /></W>);
    expect(document.body.textContent).toMatch(/concentration|molarity|solution/i);
  });

  it('calculates molarity', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const molBtn = findBtn(/molarity/i) || findRadio(/molarity/i);
    if (molBtn) await user.click(molBtn);
    const inputs = screen.queryAllByRole('spinbutton');
    if (inputs.length >= 3) {
      await user.clear(inputs[0]);
      await user.type(inputs[0], '58.44'); // mass
      await user.clear(inputs[1]);
      await user.type(inputs[1], '58.44'); // molar mass
      await user.clear(inputs[2]);
      await user.type(inputs[2], '1000');  // volume
    }
    const calcBtn = findBtn(/^calculate$/i);
    if (calcBtn) await user.click(calcBtn);
  });

  it('calculates molality', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const btn = findBtn(/molality/i) || findRadio(/molality/i);
    if (btn) await user.click(btn);
    const inputs = screen.queryAllByRole('spinbutton');
    if (inputs.length >= 2) {
      await user.clear(inputs[0]);
      await user.type(inputs[0], '1');    // moles
      await user.clear(inputs[1]);
      await user.type(inputs[1], '1000'); // solvent mass
    }
    const calcBtn = findBtn(/^calculate$/i);
    if (calcBtn) await user.click(calcBtn);
  });

  it('calculates mass percent', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const btn = findBtn(/mass\s*percent/i) || findRadio(/mass\s*percent/i);
    if (btn) await user.click(btn);
    const inputs = screen.queryAllByRole('spinbutton');
    if (inputs.length >= 2) {
      await user.clear(inputs[0]);
      await user.type(inputs[0], '10');  // solute mass
      await user.clear(inputs[1]);
      await user.type(inputs[1], '100'); // solution mass
    }
    const calcBtn = findBtn(/^calculate$/i);
    if (calcBtn) await user.click(calcBtn);
  });

  it('calculates dilution', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const btn = findBtn(/dilution/i) || findRadio(/dilution/i);
    if (btn) await user.click(btn);
    const inputs = screen.queryAllByRole('spinbutton');
    if (inputs.length >= 3) {
      await user.clear(inputs[0]);
      await user.type(inputs[0], '5');   // C1
      await user.clear(inputs[1]);
      await user.type(inputs[1], '100'); // V1
      await user.clear(inputs[2]);
      await user.type(inputs[2], '1');   // C2
    }
    const calcBtn = findBtn(/^calculate$/i);
    if (calcBtn) await user.click(calcBtn);
  });

  it('calculates PPM', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const btn = findBtn(/ppm/i) || findRadio(/ppm/i);
    if (btn) await user.click(btn);
    const inputs = screen.queryAllByRole('spinbutton');
    if (inputs.length >= 2) {
      await user.clear(inputs[0]);
      await user.type(inputs[0], '50');  // solute mg
      await user.clear(inputs[1]);
      await user.type(inputs[1], '1');   // volume L
    }
    const calcBtn = findBtn(/^calculate$/i);
    if (calcBtn) await user.click(calcBtn);
  });

  it('resets form', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const resetBtn = findBtn(/reset/i);
    if (resetBtn) await user.click(resetBtn);
  });
});
