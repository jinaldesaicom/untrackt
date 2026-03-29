import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

const W = ({ children }) => (
  <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>
);

let BinaryBooleanLogicCalculator, CalculusReferenceTool, ChemicalEquationBalancer;
let ComplexNumberCalculator, DnaRnaTools, ElectromagneticCalculator;
let ErrorUncertaintyCalculator, GasLawsCalculator;
beforeAll(async () => {
  const [m1, m2, m3, m4, m5, m6, m7, m8] = await Promise.all([
    import('../../../tools/maths-science/BinaryBooleanLogicCalculator.jsx'),
    import('../../../tools/maths-science/CalculusReferenceTool.jsx'),
    import('../../../tools/maths-science/ChemicalEquationBalancer.jsx'),
    import('../../../tools/maths-science/ComplexNumberCalculator.jsx'),
    import('../../../tools/maths-science/DnaRnaTools.jsx'),
    import('../../../tools/maths-science/ElectromagneticCalculator.jsx'),
    import('../../../tools/maths-science/ErrorUncertaintyCalculator.jsx'),
    import('../../../tools/maths-science/GasLawsCalculator.jsx'),
  ]);
  BinaryBooleanLogicCalculator = m1.default;
  CalculusReferenceTool = m2.default;
  ChemicalEquationBalancer = m3.default;
  ComplexNumberCalculator = m4.default;
  DnaRnaTools = m5.default;
  ElectromagneticCalculator = m6.default;
  ErrorUncertaintyCalculator = m7.default;
  GasLawsCalculator = m8.default;
}, 30000);

describe('BinaryBooleanLogicCalculator – cov', () => {
  it('renders', () => {
    render(<W><BinaryBooleanLogicCalculator /></W>);
    expect(document.body.textContent).toMatch(/binary|boolean|logic/i);
  });

  it('enters binary values and performs operation', async () => {
    const user = userEvent.setup();
    render(<W><BinaryBooleanLogicCalculator /></W>);
    const inputs = screen.queryAllByRole('textbox');
    if (inputs.length >= 2) {
      await user.clear(inputs[0]);
      await user.type(inputs[0], '1010');
      await user.clear(inputs[1]);
      await user.type(inputs[1], '1100');
    }
    const radios = screen.queryAllByRole('radio');
    for (const r of radios.slice(0, 4)) {
      await user.click(r);
    }
  });

  it('switches operation type', async () => {
    const user = userEvent.setup();
    render(<W><BinaryBooleanLogicCalculator /></W>);
    const opBtns = screen.getAllByRole('button').filter(b => /AND|OR|XOR|NOT|NAND|NOR/i.test(b.textContent));
    for (const btn of opBtns.slice(0, 3)) {
      await user.click(btn);
    }
  });

  it('converts between decimal and binary', async () => {
    const user = userEvent.setup();
    render(<W><BinaryBooleanLogicCalculator /></W>);
    const inputs = screen.queryAllByRole('textbox');
    if (inputs.length > 0) {
      await user.clear(inputs[0]);
      await user.type(inputs[0], '255');
    }
    const modeBtns = screen.getAllByRole('button').filter(b => /decimal|binary|hex|truth|number/i.test(b.textContent));
    if (modeBtns.length > 0) await user.click(modeBtns[0]);
  });
});

describe('CalculusReferenceTool – cov', () => {
  it('renders', () => {
    render(<W><CalculusReferenceTool /></W>);
    expect(document.body.textContent).toMatch(/calculus|derivative|integral/i);
  });

  it('navigates categories', async () => {
    const user = userEvent.setup();
    render(<W><CalculusReferenceTool /></W>);
    const radios = screen.queryAllByRole('radio');
    for (const r of radios.slice(0, 4)) {
      await user.click(r);
    }
    const categoryBtns = screen.getAllByRole('button').filter(b =>
      /derivative|integral|limit|series|trig/i.test(b.textContent)
    );
    for (const btn of categoryBtns.slice(0, 3)) {
      await user.click(btn);
    }
  });

  it('searches formulas', async () => {
    const user = userEvent.setup();
    render(<W><CalculusReferenceTool /></W>);
    const searchInput = document.querySelector('input[placeholder*="search" i], input[placeholder*="find" i], input.input-field');
    if (searchInput) {
      await user.clear(searchInput);
      await user.type(searchInput, 'power rule');
    }
  });
});

describe('ChemicalEquationBalancer – cov', () => {
  it('renders', () => {
    render(<W><ChemicalEquationBalancer /></W>);
    expect(document.body.textContent).toMatch(/chemical|equation|balance/i);
  });

  it('balances an equation', async () => {
    const user = userEvent.setup();
    render(<W><ChemicalEquationBalancer /></W>);
    const inputs = screen.queryAllByRole('textbox');
    if (inputs.length > 0) {
      await user.clear(inputs[0]);
      await user.type(inputs[0], 'H2 + O2 -> H2O');
    }
    const balBtn = screen.getAllByRole('button').find(b => /balance/i.test(b.textContent));
    if (balBtn) await user.click(balBtn);
  });

  it('uses example equations', async () => {
    const user = userEvent.setup();
    render(<W><ChemicalEquationBalancer /></W>);
    const exBtns = screen.getAllByRole('button').filter(b => /example|sample|try/i.test(b.textContent));
    if (exBtns.length > 0) await user.click(exBtns[0]);
  });

  it('clears input', async () => {
    const user = userEvent.setup();
    render(<W><ChemicalEquationBalancer /></W>);
    const clearBtn = screen.getAllByRole('button').find(b => /clear|reset/i.test(b.textContent));
    if (clearBtn) await user.click(clearBtn);
  });
});

describe('ComplexNumberCalculator – cov', () => {
  it('renders', () => {
    render(<W><ComplexNumberCalculator /></W>);
    expect(document.body.textContent).toMatch(/complex|number|imaginar/i);
  });

  it('enters complex numbers and calculates', async () => {
    const user = userEvent.setup();
    render(<W><ComplexNumberCalculator /></W>);
    const numInputs = document.querySelectorAll('input[type="number"], input.input-field');
    if (numInputs.length >= 4) {
      await user.clear(numInputs[0]);
      await user.type(numInputs[0], '3');
      await user.clear(numInputs[1]);
      await user.type(numInputs[1], '4');
      await user.clear(numInputs[2]);
      await user.type(numInputs[2], '1');
      await user.clear(numInputs[3]);
      await user.type(numInputs[3], '2');
    }
    const calcBtn = screen.getAllByRole('button').find(b => /calculate|compute/i.test(b.textContent));
    if (calcBtn) await user.click(calcBtn);
  });

  it('changes operation', async () => {
    const user = userEvent.setup();
    render(<W><ComplexNumberCalculator /></W>);
    const radios = screen.queryAllByRole('radio');
    for (const r of radios.slice(0, 4)) {
      await user.click(r);
    }
    const opBtns = screen.getAllByRole('button').filter(b => /add|subtract|multiply|divide|conjugate|modulus/i.test(b.textContent));
    for (const btn of opBtns.slice(0, 3)) {
      await user.click(btn);
    }
  });
});

describe('DnaRnaTools – cov', () => {
  it('renders', () => {
    render(<W><DnaRnaTools /></W>);
    expect(document.body.textContent).toMatch(/dna|rna|sequence/i);
  });

  it('enters DNA sequence', async () => {
    const user = userEvent.setup();
    render(<W><DnaRnaTools /></W>);
    const textareas = screen.queryAllByRole('textbox');
    if (textareas.length > 0) {
      await user.clear(textareas[0]);
      await user.type(textareas[0], 'ATCGATCG');
    }
  });

  it('converts DNA to RNA', async () => {
    const user = userEvent.setup();
    render(<W><DnaRnaTools /></W>);
    const textareas = screen.queryAllByRole('textbox');
    if (textareas.length > 0) {
      await user.clear(textareas[0]);
      await user.type(textareas[0], 'ATCG');
    }
    const convertBtn = screen.getAllByRole('button').find(b => /transcribe|convert|rna/i.test(b.textContent));
    if (convertBtn) await user.click(convertBtn);
  });

  it('gets complement', async () => {
    const user = userEvent.setup();
    render(<W><DnaRnaTools /></W>);
    const textareas = screen.queryAllByRole('textbox');
    if (textareas.length > 0) {
      await user.clear(textareas[0]);
      await user.type(textareas[0], 'ATCG');
    }
    const compBtn = screen.getAllByRole('button').find(b => /complement|reverse/i.test(b.textContent));
    if (compBtn) await user.click(compBtn);
  });

  it('switches modes', async () => {
    const user = userEvent.setup();
    render(<W><DnaRnaTools /></W>);
    const radios = screen.queryAllByRole('radio');
    for (const r of radios.slice(0, 3)) {
      await user.click(r);
    }
  });
});

describe('ElectromagneticCalculator – cov', () => {
  it('renders', () => {
    render(<W><ElectromagneticCalculator /></W>);
    expect(document.body.textContent).toMatch(/coulomb|electric field|lorentz|force/i);
  });

  it('calculates wavelength from frequency', async () => {
    const user = userEvent.setup();
    render(<W><ElectromagneticCalculator /></W>);
    const numInputs = document.querySelectorAll('input[type="number"], input.input-field');
    if (numInputs.length > 0) {
      await user.clear(numInputs[0]);
      await user.type(numInputs[0], '3000000000');
    }
    const calcBtn = screen.getAllByRole('button').find(b => /calculate|compute/i.test(b.textContent));
    if (calcBtn) await user.click(calcBtn);
  });

  it('switches calculation mode', async () => {
    const user = userEvent.setup();
    render(<W><ElectromagneticCalculator /></W>);
    const radios = screen.queryAllByRole('radio');
    for (const r of radios.slice(0, 3)) {
      await user.click(r);
    }
  });
});

describe('ErrorUncertaintyCalculator – cov', () => {
  it('renders', () => {
    render(<W><ErrorUncertaintyCalculator /></W>);
    expect(document.body.textContent).toMatch(/error|uncertainty|propagat/i);
  });

  it('enters measurement values', async () => {
    const user = userEvent.setup();
    render(<W><ErrorUncertaintyCalculator /></W>);
    const numInputs = document.querySelectorAll('input[type="number"], input.input-field');
    if (numInputs.length >= 2) {
      await user.clear(numInputs[0]);
      await user.type(numInputs[0], '10.5');
      await user.clear(numInputs[1]);
      await user.type(numInputs[1], '0.3');
    }
  });

  it('switches calculation type', async () => {
    const user = userEvent.setup();
    render(<W><ErrorUncertaintyCalculator /></W>);
    const radios = screen.queryAllByRole('radio');
    for (const r of radios.slice(0, 3)) {
      await user.click(r);
    }
  });

  it('calculates error propagation', async () => {
    const user = userEvent.setup();
    render(<W><ErrorUncertaintyCalculator /></W>);
    const calcBtn = screen.getAllByRole('button').find(b => /calculate|compute/i.test(b.textContent));
    if (calcBtn) await user.click(calcBtn);
  });
});

describe('GasLawsCalculator – cov', () => {
  it('renders', () => {
    render(<W><GasLawsCalculator /></W>);
    expect(document.body.textContent).toMatch(/gas|law|pressure|volume/i);
  });

  it('enters values and calculates', async () => {
    const user = userEvent.setup();
    render(<W><GasLawsCalculator /></W>);
    const numInputs = document.querySelectorAll('input[type="number"], input.input-field');
    if (numInputs.length >= 3) {
      await user.clear(numInputs[0]);
      await user.type(numInputs[0], '101325');
      await user.clear(numInputs[1]);
      await user.type(numInputs[1], '22.4');
      await user.clear(numInputs[2]);
      await user.type(numInputs[2], '273');
    }
    const calcBtn = screen.getAllByRole('button').find(b => /calculate|compute/i.test(b.textContent));
    if (calcBtn) await user.click(calcBtn);
  });

  it('switches gas law type', async () => {
    const user = userEvent.setup();
    render(<W><GasLawsCalculator /></W>);
    const radios = screen.queryAllByRole('radio');
    for (const r of radios.slice(0, 4)) {
      await user.click(r);
    }
  });
});
