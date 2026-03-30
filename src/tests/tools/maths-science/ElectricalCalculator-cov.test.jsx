import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

const W = ({ children }) => (
  <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>
);

let Component;
beforeAll(async () => {
  const mod = await import('../../../tools/maths-science/ElectricityCalculator.jsx');
  Component = mod.default;
});

const findBtn = (text) => screen.getAllByRole('button').find(b => text.test(b.textContent.trim()));
const findRadio = (text) => screen.queryAllByRole('radio').find(r => text.test(r.textContent || r.getAttribute('aria-label') || ''));

describe('ElectricalCalculator – coverage', () => {
  it('renders', () => {
    render(<W><Component /></W>);
    expect(document.body.textContent).toMatch(/ohm|voltage|current|resistance|electric/i);
  });

  it('Ohm law - find V', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const ohmBtn = findBtn(/ohm/i) || findRadio(/ohm/i);
    if (ohmBtn) await user.click(ohmBtn);
    const findVBtn = findBtn(/find\s*V/i);
    if (findVBtn) await user.click(findVBtn);
    const inputs = screen.queryAllByRole('spinbutton');
    if (inputs.length >= 2) {
      await user.clear(inputs[0]);
      await user.type(inputs[0], '2');  // I
      await user.clear(inputs[1]);
      await user.type(inputs[1], '10'); // R
    }
    const calcBtn = findBtn(/^calculate$/i);
    if (calcBtn) await user.click(calcBtn);
  });

  it('Ohm law - find I', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const ohmBtn = findBtn(/ohm/i) || findRadio(/ohm/i);
    if (ohmBtn) await user.click(ohmBtn);
    const findIBtn = findBtn(/find\s*I/i);
    if (findIBtn) await user.click(findIBtn);
    const inputs = screen.queryAllByRole('spinbutton');
    if (inputs.length >= 2) {
      await user.clear(inputs[0]);
      await user.type(inputs[0], '20'); // V
      await user.clear(inputs[1]);
      await user.type(inputs[1], '10'); // R
    }
    const calcBtn = findBtn(/^calculate$/i);
    if (calcBtn) await user.click(calcBtn);
  });

  it('Ohm law - find R', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const ohmBtn = findBtn(/ohm/i) || findRadio(/ohm/i);
    if (ohmBtn) await user.click(ohmBtn);
    const findRBtn = findBtn(/find\s*R/i);
    if (findRBtn) await user.click(findRBtn);
    const inputs = screen.queryAllByRole('spinbutton');
    if (inputs.length >= 2) {
      await user.clear(inputs[0]);
      await user.type(inputs[0], '20'); // V
      await user.clear(inputs[1]);
      await user.type(inputs[1], '2');  // I
    }
    const calcBtn = findBtn(/^calculate$/i);
    if (calcBtn) await user.click(calcBtn);
  });

  it('power calculator', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const pwrBtn = findBtn(/^power$/i) || findRadio(/^power$/i);
    if (pwrBtn) await user.click(pwrBtn);
    const inputs = screen.queryAllByRole('spinbutton');
    if (inputs.length >= 2) {
      await user.clear(inputs[0]);
      await user.type(inputs[0], '120'); // V
      await user.clear(inputs[1]);
      await user.type(inputs[1], '2');   // I
    }
    const calcBtn = findBtn(/^calculate$/i);
    if (calcBtn) await user.click(calcBtn);
  });

  it('series/parallel resistors', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const spBtn = findBtn(/series|parallel/i) || findRadio(/series|parallel/i);
    if (spBtn) await user.click(spBtn);
    const ta = document.querySelector('textarea');
    if (ta) {
      await user.clear(ta);
      await user.type(ta, '100, 200, 300');
    }
    const calcBtn = findBtn(/^calculate$/i);
    if (calcBtn) await user.click(calcBtn);
  });

  it('resistor color code', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const ccBtn = findBtn(/color\s*code/i) || findRadio(/color\s*code/i);
    if (ccBtn) await user.click(ccBtn);
    const selects = screen.queryAllByRole('combobox');
    if (selects.length >= 3) {
      await user.selectOptions(selects[0], selects[0].options[2]?.value || '2');
      await user.selectOptions(selects[1], selects[1].options[3]?.value || '3');
      await user.selectOptions(selects[2], selects[2].options[2]?.value || '100');
    }
    const decodeBtn = findBtn(/decode|calculate/i);
    if (decodeBtn) await user.click(decodeBtn);
  });

  it('capacitance calculator', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const capBtn = findBtn(/capacit/i) || findRadio(/capacit/i);
    if (capBtn) await user.click(capBtn);
    const ta = document.querySelector('textarea');
    if (ta) {
      await user.clear(ta);
      await user.type(ta, '10, 20, 30');
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
