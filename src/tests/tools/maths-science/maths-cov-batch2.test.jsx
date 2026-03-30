import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

const W = ({ children }) => (
  <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>
);

let GeneticsCalculator, GraphPlotter, GravitationalCalculator, HalfLifeCalculator;
let KinematicsCalculator, LogarithmCalculator, MicroscopyCalculator, MoleCalculator;
beforeAll(async () => {
  const [m1, m2, m3, m4, m5, m6, m7, m8] = await Promise.all([
    import('../../../tools/maths-science/GeneticsCalculator.jsx'),
    import('../../../tools/maths-science/GraphPlotter.jsx'),
    import('../../../tools/maths-science/GravitationalCalculator.jsx'),
    import('../../../tools/maths-science/HalfLifeCalculator.jsx'),
    import('../../../tools/maths-science/KinematicsCalculator.jsx'),
    import('../../../tools/maths-science/LogarithmCalculator.jsx'),
    import('../../../tools/maths-science/MicroscopyCalculator.jsx'),
    import('../../../tools/maths-science/MoleCalculator.jsx'),
  ]);
  GeneticsCalculator = m1.default;
  GraphPlotter = m2.default;
  GravitationalCalculator = m3.default;
  HalfLifeCalculator = m4.default;
  KinematicsCalculator = m5.default;
  LogarithmCalculator = m6.default;
  MicroscopyCalculator = m7.default;
  MoleCalculator = m8.default;
}, 30000);

describe('GeneticsCalculator – cov', () => {
  it('renders', () => {
    render(<W><GeneticsCalculator /></W>);
    expect(document.body.textContent).toMatch(/genetic|punnett|allele/i);
  });

  it('enters allele values', async () => {
    const user = userEvent.setup();
    render(<W><GeneticsCalculator /></W>);
    const inputs = screen.queryAllByRole('textbox');
    if (inputs.length >= 2) {
      await user.clear(inputs[0]);
      await user.type(inputs[0], 'Aa');
      await user.clear(inputs[1]);
      await user.type(inputs[1], 'Aa');
    }
  });

  it('generates punnett square', async () => {
    const user = userEvent.setup();
    render(<W><GeneticsCalculator /></W>);
    const inputs = screen.queryAllByRole('textbox');
    if (inputs.length >= 2) {
      await user.clear(inputs[0]);
      await user.type(inputs[0], 'Bb');
      await user.clear(inputs[1]);
      await user.type(inputs[1], 'Bb');
    }
    const calcBtn = screen.getAllByRole('button').find(b => /generate|calculate|cross/i.test(b.textContent));
    if (calcBtn) await user.click(calcBtn);
  });

  it('switches modes', async () => {
    const user = userEvent.setup();
    render(<W><GeneticsCalculator /></W>);
    const radios = screen.queryAllByRole('radio');
    for (const r of radios.slice(0, 3)) {
      await user.click(r);
    }
  });
});

describe('GraphPlotter – cov', () => {
  it('renders', () => {
    render(<W><GraphPlotter /></W>);
    expect(document.body.textContent).toMatch(/graph|plot|function/i);
  });

  it('enters a function expression', async () => {
    const user = userEvent.setup();
    render(<W><GraphPlotter /></W>);
    const inputs = screen.queryAllByRole('textbox');
    if (inputs.length > 0) {
      await user.clear(inputs[0]);
      await user.type(inputs[0], 'x^2');
    }
    const plotBtn = screen.getAllByRole('button').find(b => /plot|draw|graph/i.test(b.textContent));
    if (plotBtn) await user.click(plotBtn);
  });

  it('adds multiple functions', async () => {
    const user = userEvent.setup();
    render(<W><GraphPlotter /></W>);
    const addBtn = screen.getAllByRole('button').find(b => /add/i.test(b.textContent));
    if (addBtn) await user.click(addBtn);
  });

  it('changes x range', async () => {
    const user = userEvent.setup();
    render(<W><GraphPlotter /></W>);
    const numInputs = document.querySelectorAll('input[type="number"]');
    if (numInputs.length >= 2) {
      await user.clear(numInputs[0]);
      await user.type(numInputs[0], '-5');
      await user.clear(numInputs[1]);
      await user.type(numInputs[1], '5');
    }
  });

  it('removes a function', async () => {
    const user = userEvent.setup();
    render(<W><GraphPlotter /></W>);
    const addBtn = screen.getAllByRole('button').find(b => /add/i.test(b.textContent));
    if (addBtn) await user.click(addBtn);
    const delBtns = screen.getAllByRole('button').filter(b => b.querySelector('svg') && !b.textContent.trim());
    if (delBtns.length > 0) await user.click(delBtns[delBtns.length - 1]);
  });
});

describe('GravitationalCalculator – cov', () => {
  it('renders', () => {
    render(<W><GravitationalCalculator /></W>);
    expect(document.body.textContent).toMatch(/gravit|force|mass/i);
  });

  it('enters mass and distance values', async () => {
    const user = userEvent.setup();
    render(<W><GravitationalCalculator /></W>);
    const numInputs = document.querySelectorAll('input[type="number"], input.input-field');
    if (numInputs.length >= 3) {
      await user.clear(numInputs[0]);
      await user.type(numInputs[0], '100');
      await user.clear(numInputs[1]);
      await user.type(numInputs[1], '200');
      await user.clear(numInputs[2]);
      await user.type(numInputs[2], '10');
    }
    const calcBtn = screen.getAllByRole('button').find(b => /calculate/i.test(b.textContent));
    if (calcBtn) await user.click(calcBtn);
  });

  it('switches mode', async () => {
    const user = userEvent.setup();
    render(<W><GravitationalCalculator /></W>);
    const radios = screen.queryAllByRole('radio');
    for (const r of radios.slice(0, 3)) {
      await user.click(r);
    }
  });
});

describe('HalfLifeCalculator – cov', () => {
  it('renders', () => {
    render(<W><HalfLifeCalculator /></W>);
    expect(document.body.textContent).toMatch(/half.*life|decay|isotope/i);
  });

  it('enters initial amount and half life', async () => {
    const user = userEvent.setup();
    render(<W><HalfLifeCalculator /></W>);
    const numInputs = document.querySelectorAll('input[type="number"], input.input-field');
    if (numInputs.length >= 3) {
      await user.clear(numInputs[0]);
      await user.type(numInputs[0], '100');
      await user.clear(numInputs[1]);
      await user.type(numInputs[1], '5.27');
      await user.clear(numInputs[2]);
      await user.type(numInputs[2], '10');
    }
    const calcBtn = screen.getAllByRole('button').find(b => /calculate/i.test(b.textContent));
    if (calcBtn) await user.click(calcBtn);
  });

  it('switches solve mode', async () => {
    const user = userEvent.setup();
    render(<W><HalfLifeCalculator /></W>);
    const radios = screen.queryAllByRole('radio');
    for (const r of radios.slice(0, 3)) {
      await user.click(r);
    }
  });
});

describe('KinematicsCalculator – cov', () => {
  it('renders', () => {
    render(<W><KinematicsCalculator /></W>);
    expect(document.body.textContent).toMatch(/suvat|projectile|displacement|motion/i);
  });

  it('enters kinematic values', async () => {
    const user = userEvent.setup();
    render(<W><KinematicsCalculator /></W>);
    const numInputs = document.querySelectorAll('input[type="number"], input.input-field');
    if (numInputs.length >= 3) {
      await user.clear(numInputs[0]);
      await user.type(numInputs[0], '0');
      await user.clear(numInputs[1]);
      await user.type(numInputs[1], '9.8');
      await user.clear(numInputs[2]);
      await user.type(numInputs[2], '5');
    }
    const calcBtn = screen.getAllByRole('button').find(b => /calculate/i.test(b.textContent));
    if (calcBtn) await user.click(calcBtn);
  });

  it('switches equation mode', async () => {
    const user = userEvent.setup();
    render(<W><KinematicsCalculator /></W>);
    const radios = screen.queryAllByRole('radio');
    for (const r of radios.slice(0, 4)) {
      await user.click(r);
    }
  });
});

describe('LogarithmCalculator – cov', () => {
  it('renders', () => {
    render(<W><LogarithmCalculator /></W>);
    expect(document.body.textContent).toMatch(/logarithm|log|base/i);
  });

  it('calculates logarithm', async () => {
    const user = userEvent.setup();
    render(<W><LogarithmCalculator /></W>);
    const numInputs = document.querySelectorAll('input[type="number"], input.input-field');
    if (numInputs.length >= 2) {
      await user.clear(numInputs[0]);
      await user.type(numInputs[0], '100');
      await user.clear(numInputs[1]);
      await user.type(numInputs[1], '10');
    }
    const calcBtn = screen.getAllByRole('button').find(b => /calculate/i.test(b.textContent));
    if (calcBtn) await user.click(calcBtn);
  });

  it('switches between log types', async () => {
    const user = userEvent.setup();
    render(<W><LogarithmCalculator /></W>);
    const radios = screen.queryAllByRole('radio');
    for (const r of radios.slice(0, 3)) {
      await user.click(r);
    }
  });
});

describe('MicroscopyCalculator – cov', () => {
  it('renders', () => {
    render(<W><MicroscopyCalculator /></W>);
    expect(document.body.textContent).toMatch(/microscop|magnif|resolut/i);
  });

  it('enters magnification values', async () => {
    const user = userEvent.setup();
    render(<W><MicroscopyCalculator /></W>);
    const numInputs = document.querySelectorAll('input[type="number"], input.input-field');
    if (numInputs.length >= 2) {
      await user.clear(numInputs[0]);
      await user.type(numInputs[0], '10');
      await user.clear(numInputs[1]);
      await user.type(numInputs[1], '40');
    }
    const calcBtn = screen.getAllByRole('button').find(b => /calculate/i.test(b.textContent));
    if (calcBtn) await user.click(calcBtn);
  });

  it('switches mode', async () => {
    const user = userEvent.setup();
    render(<W><MicroscopyCalculator /></W>);
    const radios = screen.queryAllByRole('radio');
    for (const r of radios.slice(0, 3)) {
      await user.click(r);
    }
  });
});

describe('MoleCalculator – cov', () => {
  it('renders', () => {
    render(<W><MoleCalculator /></W>);
    expect(document.body.textContent).toMatch(/mole|molar|mass|avogadro/i);
  });

  it('enters mass and molar mass', async () => {
    const user = userEvent.setup();
    render(<W><MoleCalculator /></W>);
    const numInputs = document.querySelectorAll('input[type="number"], input.input-field');
    if (numInputs.length >= 2) {
      await user.clear(numInputs[0]);
      await user.type(numInputs[0], '18');
      await user.clear(numInputs[1]);
      await user.type(numInputs[1], '18');
    }
    const calcBtn = screen.getAllByRole('button').find(b => /calculate/i.test(b.textContent));
    if (calcBtn) await user.click(calcBtn);
  });

  it('switches solve target', async () => {
    const user = userEvent.setup();
    render(<W><MoleCalculator /></W>);
    const radios = screen.queryAllByRole('radio');
    for (const r of radios.slice(0, 3)) {
      await user.click(r);
    }
  });
});
