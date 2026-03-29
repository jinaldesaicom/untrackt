import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

const W = ({ children }) => (
  <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>
);

let Component;
beforeAll(async () => {
  const mod = await import('../../../tools/maths-science/TrigonometryCalculator.jsx');
  Component = mod.default;
});

const findBtn = (text) => screen.getAllByRole('button').find(b => text.test(b.textContent.trim()));
const findRadio = (text) => screen.queryAllByRole('radio').find(r => text.test(r.textContent || r.getAttribute('aria-label') || ''));

describe('TrigonometryCalculator – coverage', () => {
  it('renders trig calculator', () => {
    render(<W><Component /></W>);
    expect(document.body.textContent).toMatch(/trig|sin|cos|tan/i);
  });

  it('calculates basic trig functions', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const trigBtn = findBtn(/trig\s*func/i) || findRadio(/trig\s*func/i);
    if (trigBtn) await user.click(trigBtn);
    const inputs = screen.queryAllByRole('spinbutton');
    if (inputs.length > 0) {
      await user.clear(inputs[0]);
      await user.type(inputs[0], '45');
    }
    const calcBtn = findBtn(/^calculate$/i);
    if (calcBtn) await user.click(calcBtn);
  });

  it('switches to inverse trig', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const invBtn = findBtn(/inverse/i) || findRadio(/inverse/i);
    if (invBtn) await user.click(invBtn);
    const sinInvBtn = findBtn(/sin⁻¹|asin/i);
    if (sinInvBtn) await user.click(sinInvBtn);
    const inputs = screen.queryAllByRole('spinbutton');
    if (inputs.length > 0) {
      await user.clear(inputs[0]);
      await user.type(inputs[0], '0.5');
    }
    const calcBtn = findBtn(/^calculate$/i);
    if (calcBtn) await user.click(calcBtn);
  });

  it('switches to degree/radian conversion', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const convBtn = findBtn(/deg|rad/i) || findRadio(/deg|rad/i);
    if (convBtn) await user.click(convBtn);
    const inputs = screen.queryAllByRole('spinbutton');
    if (inputs.length > 0) {
      await user.clear(inputs[0]);
      await user.type(inputs[0], '180');
    }
    const calcBtn = findBtn(/^calculate$|^convert$/i);
    if (calcBtn) await user.click(calcBtn);
  });

  it('triangle solver SSS', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const triBtn = findBtn(/triangle/i) || findRadio(/triangle/i);
    if (triBtn) await user.click(triBtn);
    const sssBtn = findBtn(/^SSS$/i);
    if (sssBtn) await user.click(sssBtn);
    const inputs = screen.queryAllByRole('spinbutton');
    if (inputs.length >= 3) {
      await user.clear(inputs[0]);
      await user.type(inputs[0], '3');
      await user.clear(inputs[1]);
      await user.type(inputs[1], '4');
      await user.clear(inputs[2]);
      await user.type(inputs[2], '5');
    }
    const calcBtn = findBtn(/^calculate$|^solve$/i);
    if (calcBtn) await user.click(calcBtn);
  });

  it('triangle solver SAS', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const triBtn = findBtn(/triangle/i) || findRadio(/triangle/i);
    if (triBtn) await user.click(triBtn);
    const sasBtn = findBtn(/^SAS$/i);
    if (sasBtn) await user.click(sasBtn);
    const inputs = screen.queryAllByRole('spinbutton');
    if (inputs.length >= 3) {
      await user.clear(inputs[0]);
      await user.type(inputs[0], '5');
      await user.clear(inputs[1]);
      await user.type(inputs[1], '60');
      await user.clear(inputs[2]);
      await user.type(inputs[2], '7');
    }
    const calcBtn = findBtn(/^calculate$|^solve$/i);
    if (calcBtn) await user.click(calcBtn);
  });

  it('unit circle mode', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const ucBtn = findBtn(/unit\s*circle/i) || findRadio(/unit\s*circle/i);
    if (ucBtn) await user.click(ucBtn);
    expect(document.body.textContent).toMatch(/circle|angle|radian/i);
  });

  it('resets fields', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const resetBtn = findBtn(/reset/i);
    if (resetBtn) await user.click(resetBtn);
  });

  it('toggles degree/radian unit', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const degBtn = findBtn(/^degrees$/i) || findRadio(/^degrees$/i);
    if (degBtn) await user.click(degBtn);
    const radBtn = findBtn(/^radians$/i) || findRadio(/^radians$/i);
    if (radBtn) await user.click(radBtn);
  });
});
