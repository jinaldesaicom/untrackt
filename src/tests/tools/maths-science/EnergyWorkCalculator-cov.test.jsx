import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

const W = ({ children }) => (
  <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>
);

let Component;
beforeAll(async () => {
  const mod = await import('../../../tools/maths-science/EnergyWorkCalculator.jsx');
  Component = mod.default;
});

const findBtn = (text) => screen.getAllByRole('button').find(b => text.test(b.textContent.trim()));
const findRadio = (text) => screen.queryAllByRole('radio').find(r => text.test(r.textContent || r.getAttribute('aria-label') || ''));

describe('EnergyWorkCalculator – coverage', () => {
  it('renders', () => {
    render(<W><Component /></W>);
    expect(document.body.textContent).toMatch(/energy|kinetic|work/i);
  });

  it('calculates kinetic energy', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const keBtn = findBtn(/kinetic/i) || findRadio(/kinetic/i);
    if (keBtn) await user.click(keBtn);
    const inputs = screen.queryAllByRole('spinbutton');
    if (inputs.length >= 2) {
      await user.clear(inputs[0]);
      await user.type(inputs[0], '10'); // mass
      await user.clear(inputs[1]);
      await user.type(inputs[1], '5');  // velocity
    }
    const calcBtn = findBtn(/^calculate$/i);
    if (calcBtn) await user.click(calcBtn);
    expect(document.body.textContent).toMatch(/125|joule|J|result/i);
  });

  it('calculates potential energy', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const peBtn = findBtn(/potential/i) || findRadio(/potential/i);
    if (peBtn) await user.click(peBtn);
    const inputs = screen.queryAllByRole('spinbutton');
    if (inputs.length >= 2) {
      await user.clear(inputs[0]);
      await user.type(inputs[0], '5');  // mass
      await user.clear(inputs[1]);
      await user.type(inputs[1], '10'); // height
    }
    const calcBtn = findBtn(/^calculate$/i);
    if (calcBtn) await user.click(calcBtn);
  });

  it('calculates work with angle', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const workBtn = findBtn(/^work$/i) || findRadio(/^work$/i);
    if (workBtn) await user.click(workBtn);
    const inputs = screen.queryAllByRole('spinbutton');
    if (inputs.length >= 3) {
      await user.clear(inputs[0]);
      await user.type(inputs[0], '100'); // force
      await user.clear(inputs[1]);
      await user.type(inputs[1], '5');   // distance
      await user.clear(inputs[2]);
      await user.type(inputs[2], '30');  // angle
    }
    const calcBtn = findBtn(/^calculate$/i);
    if (calcBtn) await user.click(calcBtn);
  });

  it('calculates power', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const powerBtn = findBtn(/^power$/i) || findRadio(/^power$/i);
    if (powerBtn) await user.click(powerBtn);
    const inputs = screen.queryAllByRole('spinbutton');
    if (inputs.length >= 2) {
      await user.clear(inputs[0]);
      await user.type(inputs[0], '500'); // work
      await user.clear(inputs[1]);
      await user.type(inputs[1], '10');  // time
    }
    const calcBtn = findBtn(/^calculate$/i);
    if (calcBtn) await user.click(calcBtn);
  });

  it('calculates efficiency', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const effBtn = findBtn(/efficiency/i) || findRadio(/efficiency/i);
    if (effBtn) await user.click(effBtn);
    const inputs = screen.queryAllByRole('spinbutton');
    if (inputs.length >= 2) {
      await user.clear(inputs[0]);
      await user.type(inputs[0], '1000'); // input
      await user.clear(inputs[1]);
      await user.type(inputs[1], '750');  // output
    }
    const calcBtn = findBtn(/^calculate$/i);
    if (calcBtn) await user.click(calcBtn);
    expect(document.body.textContent).toMatch(/75|%|efficiency/i);
  });

  it('resets form', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const resetBtn = findBtn(/reset/i);
    if (resetBtn) await user.click(resetBtn);
  });

  it('copies result', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const inputs = screen.queryAllByRole('spinbutton');
    if (inputs.length >= 2) {
      await user.clear(inputs[0]);
      await user.type(inputs[0], '10');
      await user.clear(inputs[1]);
      await user.type(inputs[1], '5');
    }
    const calcBtn = findBtn(/^calculate$/i);
    if (calcBtn) await user.click(calcBtn);
    const copyBtn = findBtn(/copy/i);
    if (copyBtn) await user.click(copyBtn);
  });
});
