import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

const W = ({ children }) => (
  <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>
);

let NewtonsLawsCalculator, NumberTheoryCalculator, OpticsCalculator, PeriodicTableReference;
let PhCalculator, PolynomialCalculator, PrimeNumberTools, ProbabilityCalculator;
let ScientificNotationCalculator, SignificantFiguresCalculator, UnitConverterScientific, WaveSoundCalculator;
beforeAll(async () => {
  const [m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12] = await Promise.all([
    import('../../../tools/maths-science/NewtonsLawsCalculator.jsx'),
    import('../../../tools/maths-science/NumberTheoryCalculator.jsx'),
    import('../../../tools/maths-science/OpticsCalculator.jsx'),
    import('../../../tools/maths-science/PeriodicTableReference.jsx'),
    import('../../../tools/maths-science/PhCalculator.jsx'),
    import('../../../tools/maths-science/PolynomialCalculator.jsx'),
    import('../../../tools/maths-science/PrimeNumberTools.jsx'),
    import('../../../tools/maths-science/ProbabilityCalculator.jsx'),
    import('../../../tools/maths-science/ScientificNotationCalculator.jsx'),
    import('../../../tools/maths-science/SignificantFiguresCalculator.jsx'),
    import('../../../tools/maths-science/UnitConverterScientific.jsx'),
    import('../../../tools/maths-science/WaveSoundCalculator.jsx'),
  ]);
  NewtonsLawsCalculator = m1.default;
  NumberTheoryCalculator = m2.default;
  OpticsCalculator = m3.default;
  PeriodicTableReference = m4.default;
  PhCalculator = m5.default;
  PolynomialCalculator = m6.default;
  PrimeNumberTools = m7.default;
  ProbabilityCalculator = m8.default;
  ScientificNotationCalculator = m9.default;
  SignificantFiguresCalculator = m10.default;
  UnitConverterScientific = m11.default;
  WaveSoundCalculator = m12.default;
}, 30000);

describe('NewtonsLawsCalculator – cov', () => {
  it('renders', () => {
    render(<W><NewtonsLawsCalculator /></W>);
    expect(document.body.textContent).toMatch(/newton|force|mass|accelerat/i);
  });

  it('calculates F=ma', async () => {
    const user = userEvent.setup();
    render(<W><NewtonsLawsCalculator /></W>);
    const numInputs = document.querySelectorAll('input[type="number"], input.input-field');
    if (numInputs.length >= 2) {
      await user.clear(numInputs[0]);
      await user.type(numInputs[0], '10');
      await user.clear(numInputs[1]);
      await user.type(numInputs[1], '5');
    }
    const calcBtn = screen.getAllByRole('button').find(b => /calculate/i.test(b.textContent));
    if (calcBtn) await user.click(calcBtn);
  });

  it('switches law mode', async () => {
    const user = userEvent.setup();
    render(<W><NewtonsLawsCalculator /></W>);
    const radios = screen.queryAllByRole('radio');
    for (const r of radios.slice(0, 3)) {
      await user.click(r);
    }
  });
});

describe('NumberTheoryCalculator – cov', () => {
  it('renders', () => {
    render(<W><NumberTheoryCalculator /></W>);
    expect(document.body.textContent).toMatch(/number.*theory|gcd|lcm|factor/i);
  });

  it('enters numbers and calculates', async () => {
    const user = userEvent.setup();
    render(<W><NumberTheoryCalculator /></W>);
    const numInputs = document.querySelectorAll('input[type="number"], input.input-field');
    if (numInputs.length >= 1) {
      await user.clear(numInputs[0]);
      await user.type(numInputs[0], '120');
    }
    const calcBtn = screen.getAllByRole('button').find(b => /calculate|factor/i.test(b.textContent));
    if (calcBtn) await user.click(calcBtn);
  });

  it('switches mode', async () => {
    const user = userEvent.setup();
    render(<W><NumberTheoryCalculator /></W>);
    const radios = screen.queryAllByRole('radio');
    for (const r of radios.slice(0, 4)) {
      await user.click(r);
    }
  });

  it('calculates GCD/LCM', async () => {
    const user = userEvent.setup();
    render(<W><NumberTheoryCalculator /></W>);
    const gcdBtn = screen.getAllByRole('button').find(b => /gcd|lcm/i.test(b.textContent));
    if (gcdBtn) await user.click(gcdBtn);
    const numInputs = document.querySelectorAll('input[type="number"], input.input-field');
    if (numInputs.length >= 2) {
      await user.clear(numInputs[0]);
      await user.type(numInputs[0], '12');
      await user.clear(numInputs[1]);
      await user.type(numInputs[1], '18');
    }
  });
});

describe('OpticsCalculator – cov', () => {
  it('renders', () => {
    render(<W><OpticsCalculator /></W>);
    expect(document.body.textContent).toMatch(/optic|lens|refract|focal/i);
  });

  it('calculates focal length', async () => {
    const user = userEvent.setup();
    render(<W><OpticsCalculator /></W>);
    const numInputs = document.querySelectorAll('input[type="number"], input.input-field');
    if (numInputs.length >= 2) {
      await user.clear(numInputs[0]);
      await user.type(numInputs[0], '20');
      await user.clear(numInputs[1]);
      await user.type(numInputs[1], '30');
    }
    const calcBtn = screen.getAllByRole('button').find(b => /calculate/i.test(b.textContent));
    if (calcBtn) await user.click(calcBtn);
  });

  it('switches mode', async () => {
    const user = userEvent.setup();
    render(<W><OpticsCalculator /></W>);
    const radios = screen.queryAllByRole('radio');
    for (const r of radios.slice(0, 3)) {
      await user.click(r);
    }
  });
});

describe('PeriodicTableReference – cov', () => {
  it('renders', () => {
    render(<W><PeriodicTableReference /></W>);
    expect(document.body.textContent.length).toBeGreaterThan(50);
  });

  it('searches for element', async () => {
    const user = userEvent.setup();
    render(<W><PeriodicTableReference /></W>);
    const searchInput = document.querySelector('input[placeholder*="search" i], input[placeholder*="element" i], input.input-field');
    if (searchInput) {
      await user.clear(searchInput);
      await user.type(searchInput, 'Oxygen');
    }
  });

  it('clicks on element buttons', async () => {
    const user = userEvent.setup();
    render(<W><PeriodicTableReference /></W>);
    const elementCells = document.querySelectorAll('[data-symbol], .cursor-pointer, td[class]');
    if (elementCells.length > 0) fireEvent.click(elementCells[0]);
    if (elementCells.length > 5) fireEvent.click(elementCells[5]);
  });

  it('filters by category', async () => {
    const user = userEvent.setup();
    render(<W><PeriodicTableReference /></W>);
    const selects = screen.queryAllByRole('combobox');
    if (selects.length > 0) {
      const opts = Array.from(selects[0].options);
      if (opts.length > 1) fireEvent.change(selects[0], { target: { value: opts[1].value } });
    }
  });
});

describe('PhCalculator – cov', () => {
  it('renders', () => {
    render(<W><PhCalculator /></W>);
    expect(document.body.textContent).toMatch(/ph|acid|base|concentrat/i);
  });

  it('enters pH value', async () => {
    const user = userEvent.setup();
    render(<W><PhCalculator /></W>);
    const numInputs = document.querySelectorAll('input[type="number"], input.input-field');
    if (numInputs.length > 0) {
      await user.clear(numInputs[0]);
      await user.type(numInputs[0], '7');
    }
    const calcBtn = screen.getAllByRole('button').find(b => /calculate/i.test(b.textContent));
    if (calcBtn) await user.click(calcBtn);
  });

  it('switches mode', async () => {
    const user = userEvent.setup();
    render(<W><PhCalculator /></W>);
    const radios = screen.queryAllByRole('radio');
    for (const r of radios.slice(0, 3)) {
      await user.click(r);
    }
  });

  it('changes slider value', () => {
    render(<W><PhCalculator /></W>);
    const slider = document.querySelector('input[type="range"]');
    if (slider) fireEvent.change(slider, { target: { value: '4' } });
  });
});

describe('PolynomialCalculator – cov', () => {
  it('renders', () => {
    render(<W><PolynomialCalculator /></W>);
    expect(document.body.textContent).toMatch(/polynomial|coefficien|degree/i);
  });

  it('enters polynomial coefficients', async () => {
    const user = userEvent.setup();
    render(<W><PolynomialCalculator /></W>);
    const numInputs = document.querySelectorAll('input[type="number"], input.input-field');
    if (numInputs.length >= 3) {
      await user.clear(numInputs[0]);
      await user.type(numInputs[0], '1');
      await user.clear(numInputs[1]);
      await user.type(numInputs[1], '-3');
      await user.clear(numInputs[2]);
      await user.type(numInputs[2], '2');
    }
    const calcBtn = screen.getAllByRole('button').find(b => /calculate|solve|evaluate/i.test(b.textContent));
    if (calcBtn) await user.click(calcBtn);
  });

  it('switches operation', async () => {
    const user = userEvent.setup();
    render(<W><PolynomialCalculator /></W>);
    const radios = screen.queryAllByRole('radio');
    for (const r of radios.slice(0, 3)) {
      await user.click(r);
    }
  });
});

describe('PrimeNumberTools – cov', () => {
  it('renders', () => {
    render(<W><PrimeNumberTools /></W>);
    expect(document.body.textContent).toMatch(/prime|number/i);
  });

  it('checks if number is prime', async () => {
    const user = userEvent.setup();
    render(<W><PrimeNumberTools /></W>);
    const numInputs = document.querySelectorAll('input[type="number"], input.input-field');
    if (numInputs.length > 0) {
      await user.clear(numInputs[0]);
      await user.type(numInputs[0], '97');
    }
    const checkBtn = screen.getAllByRole('button').find(b => /check|test|find/i.test(b.textContent));
    if (checkBtn) await user.click(checkBtn);
  });

  it('generates prime list', async () => {
    const user = userEvent.setup();
    render(<W><PrimeNumberTools /></W>);
    const radios = screen.queryAllByRole('radio');
    if (radios.length > 1) await user.click(radios[1]);
    const numInputs = document.querySelectorAll('input[type="number"], input.input-field');
    if (numInputs.length > 0) {
      await user.clear(numInputs[0]);
      await user.type(numInputs[0], '50');
    }
    const genBtn = screen.getAllByRole('button').find(b => /generate|list|find/i.test(b.textContent));
    if (genBtn) await user.click(genBtn);
  });

  it('factorizes a number', async () => {
    const user = userEvent.setup();
    render(<W><PrimeNumberTools /></W>);
    const factBtn = screen.getAllByRole('button').find(b => /factor/i.test(b.textContent));
    if (factBtn) await user.click(factBtn);
  });
});

describe('ProbabilityCalculator – cov', () => {
  it('renders', () => {
    render(<W><ProbabilityCalculator /></W>);
    expect(document.body.textContent).toMatch(/probability|combinat|permut/i);
  });

  it('calculates combinations', async () => {
    const user = userEvent.setup();
    render(<W><ProbabilityCalculator /></W>);
    const numInputs = document.querySelectorAll('input[type="number"], input.input-field');
    if (numInputs.length >= 2) {
      await user.clear(numInputs[0]);
      await user.type(numInputs[0], '10');
      await user.clear(numInputs[1]);
      await user.type(numInputs[1], '3');
    }
    const calcBtn = screen.getAllByRole('button').find(b => /calculate/i.test(b.textContent));
    if (calcBtn) await user.click(calcBtn);
  });

  it('switches mode', async () => {
    const user = userEvent.setup();
    render(<W><ProbabilityCalculator /></W>);
    const radios = screen.queryAllByRole('radio');
    for (const r of radios.slice(0, 4)) {
      await user.click(r);
    }
  });
});

describe('ScientificNotationCalculator – cov', () => {
  it('renders', () => {
    render(<W><ScientificNotationCalculator /></W>);
    expect(document.body.textContent).toMatch(/scientific|notation|exponent/i);
  });

  it('converts to scientific notation', async () => {
    const user = userEvent.setup();
    render(<W><ScientificNotationCalculator /></W>);
    const inputs = screen.queryAllByRole('textbox');
    const numInputs = document.querySelectorAll('input[type="number"], input.input-field');
    const target = inputs.length > 0 ? inputs[0] : numInputs[0];
    if (target) {
      await user.clear(target);
      await user.type(target, '0.000123');
    }
  });

  it('performs arithmetic in scientific notation', async () => {
    const user = userEvent.setup();
    render(<W><ScientificNotationCalculator /></W>);
    const radios = screen.queryAllByRole('radio');
    for (const r of radios.slice(0, 3)) {
      await user.click(r);
    }
  });
});

describe('SignificantFiguresCalculator – cov', () => {
  it('renders', () => {
    render(<W><SignificantFiguresCalculator /></W>);
    expect(document.body.textContent).toMatch(/significant|figure|sig.*fig/i);
  });

  it('counts significant figures', async () => {
    const user = userEvent.setup();
    render(<W><SignificantFiguresCalculator /></W>);
    const inputs = screen.queryAllByRole('textbox');
    const numInputs = document.querySelectorAll('input.input-field');
    const target = inputs.length > 0 ? inputs[0] : numInputs[0];
    if (target) {
      await user.clear(target);
      await user.type(target, '0.00340');
    }
  });

  it('rounds to significant figures', async () => {
    const user = userEvent.setup();
    render(<W><SignificantFiguresCalculator /></W>);
    const radios = screen.queryAllByRole('radio');
    if (radios.length > 1) await user.click(radios[1]);
  });
});

describe('UnitConverterScientific – cov', () => {
  it('renders', () => {
    render(<W><UnitConverterScientific /></W>);
    expect(document.body.textContent).toMatch(/unit|convert|scien/i);
  });

  it('enters value and converts', async () => {
    const user = userEvent.setup();
    render(<W><UnitConverterScientific /></W>);
    const numInputs = document.querySelectorAll('input[type="number"], input.input-field');
    if (numInputs.length > 0) {
      await user.clear(numInputs[0]);
      await user.type(numInputs[0], '100');
    }
  });

  it('changes unit category', async () => {
    render(<W><UnitConverterScientific /></W>);
    const selects = document.querySelectorAll('select');
    if (selects.length > 0) {
      fireEvent.change(selects[0], { target: { value: selects[0].options[1]?.value || '' } });
    }
  });

  it('swaps units', async () => {
    const user = userEvent.setup();
    render(<W><UnitConverterScientific /></W>);
    const swapBtn = screen.getAllByRole('button').find(b => /swap|⇄|↔/i.test(b.textContent));
    if (swapBtn) await user.click(swapBtn);
  });
});

describe('WaveSoundCalculator – cov', () => {
  it('renders', () => {
    render(<W><WaveSoundCalculator /></W>);
    expect(document.body.textContent).toMatch(/wave|sound|frequenc/i);
  });

  it('enters frequency and calculates', async () => {
    const user = userEvent.setup();
    render(<W><WaveSoundCalculator /></W>);
    const numInputs = document.querySelectorAll('input[type="number"], input.input-field');
    if (numInputs.length > 0) {
      await user.clear(numInputs[0]);
      await user.type(numInputs[0], '440');
    }
    const calcBtn = screen.getAllByRole('button').find(b => /calculate/i.test(b.textContent));
    if (calcBtn) await user.click(calcBtn);
  });

  it('switches mode', async () => {
    const user = userEvent.setup();
    render(<W><WaveSoundCalculator /></W>);
    const radios = screen.queryAllByRole('radio');
    for (const r of radios.slice(0, 3)) {
      await user.click(r);
    }
  });

  it('changes medium', async () => {
    render(<W><WaveSoundCalculator /></W>);
    const selects = document.querySelectorAll('select');
    if (selects.length > 0) {
      fireEvent.change(selects[0], { target: { value: selects[0].options[1]?.value || '' } });
    }
  });
});
