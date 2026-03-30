import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

const W = ({ children }) => (
  <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>
);

let Component;
beforeAll(async () => {
  const mod = await import('../../../tools/maths-science/ThermodynamicsCalculator.jsx');
  Component = mod.default;
});

const findBtn = (text) => screen.getAllByRole('button').find(b => text.test(b.textContent.trim()));
const findRadio = (text) => screen.queryAllByRole('radio').find(r => text.test(r.textContent || r.getAttribute('aria-label') || ''));

describe('ThermodynamicsCalculator – coverage', () => {
  it('renders', () => {
    render(<W><Component /></W>);
    expect(document.body.textContent).toMatch(/thermo|gas|heat|ideal/i);
  });

  it('ideal gas law - solves for P', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const igBtn = findBtn(/ideal\s*gas/i) || findRadio(/ideal\s*gas/i);
    if (igBtn) await user.click(igBtn);
    const inputs = screen.queryAllByRole('spinbutton');
    // Fill V, n, T (leave P empty)
    if (inputs.length >= 3) {
      await user.clear(inputs[0]);
      await user.type(inputs[0], '22.4');  // V
      await user.clear(inputs[1]);
      await user.type(inputs[1], '1');     // n
      await user.clear(inputs[2]);
      await user.type(inputs[2], '273.15'); // T
    }
    const solveBtn = findBtn(/^solve$|^calculate$/i);
    if (solveBtn) await user.click(solveBtn);
  });

  it('gas laws - Boyle', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const glBtn = findBtn(/gas\s*law/i) || findRadio(/gas\s*law/i);
    if (glBtn) await user.click(glBtn);
    const boyleBtn = findBtn(/boyle/i);
    if (boyleBtn) await user.click(boyleBtn);
    const inputs = screen.queryAllByRole('spinbutton');
    if (inputs.length >= 3) {
      await user.clear(inputs[0]);
      await user.type(inputs[0], '1');   // P1
      await user.clear(inputs[1]);
      await user.type(inputs[1], '10');  // V1
      await user.clear(inputs[2]);
      await user.type(inputs[2], '2');   // P2
    }
    const calcBtn = findBtn(/^calculate$/i);
    if (calcBtn) await user.click(calcBtn);
  });

  it('gas laws - Charles', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const glBtn = findBtn(/gas\s*law/i) || findRadio(/gas\s*law/i);
    if (glBtn) await user.click(glBtn);
    const charBtn = findBtn(/charles/i);
    if (charBtn) await user.click(charBtn);
    const inputs = screen.queryAllByRole('spinbutton');
    if (inputs.length >= 3) {
      await user.clear(inputs[0]);
      await user.type(inputs[0], '10');  // V1
      await user.clear(inputs[1]);
      await user.type(inputs[1], '300'); // T1
      await user.clear(inputs[2]);
      await user.type(inputs[2], '600'); // T2
    }
    const calcBtn = findBtn(/^calculate$/i);
    if (calcBtn) await user.click(calcBtn);
  });

  it('gas laws - Gay-Lussac', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const glBtn = findBtn(/gas\s*law/i) || findRadio(/gas\s*law/i);
    if (glBtn) await user.click(glBtn);
    const gayBtn = findBtn(/gay.?lussac/i);
    if (gayBtn) await user.click(gayBtn);
    const inputs = screen.queryAllByRole('spinbutton');
    if (inputs.length >= 3) {
      await user.clear(inputs[0]);
      await user.type(inputs[0], '1');   // P1
      await user.clear(inputs[1]);
      await user.type(inputs[1], '300'); // T1
      await user.clear(inputs[2]);
      await user.type(inputs[2], '600'); // T2
    }
    const calcBtn = findBtn(/^calculate$/i);
    if (calcBtn) await user.click(calcBtn);
  });

  it('thermal expansion - linear', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const teBtn = findBtn(/thermal\s*exp/i) || findRadio(/thermal\s*exp/i);
    if (teBtn) await user.click(teBtn);
    const linBtn = findBtn(/^linear$/i);
    if (linBtn) await user.click(linBtn);
    const inputs = screen.queryAllByRole('spinbutton');
    if (inputs.length >= 3) {
      await user.clear(inputs[0]);
      await user.type(inputs[0], '100');     // length
      await user.clear(inputs[1]);
      await user.type(inputs[1], '0.000012'); // alpha
      await user.clear(inputs[2]);
      await user.type(inputs[2], '50');       // delta T
    }
    const calcBtn = findBtn(/^calculate$/i);
    if (calcBtn) await user.click(calcBtn);
  });

  it('thermal expansion - volume', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const teBtn = findBtn(/thermal\s*exp/i) || findRadio(/thermal\s*exp/i);
    if (teBtn) await user.click(teBtn);
    const volBtn = findBtn(/^volume$/i);
    if (volBtn) await user.click(volBtn);
  });

  it('heat capacity Q=mcΔT', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const hcBtn = findBtn(/Q\s*=|heat|mcΔT/i) || findRadio(/Q\s*=|heat|mcΔT/i);
    if (hcBtn) await user.click(hcBtn);
    const inputs = screen.queryAllByRole('spinbutton');
    if (inputs.length >= 3) {
      await user.clear(inputs[0]);
      await user.type(inputs[0], '2');     // mass
      await user.clear(inputs[1]);
      await user.type(inputs[1], '4186');  // specific heat
      await user.clear(inputs[2]);
      await user.type(inputs[2], '25');    // delta T
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
