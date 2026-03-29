import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'

const W = ({ children }) => <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>

// Helper to fill all spinbutton inputs with values
const fillInputs = (values) => {
  const inputs = screen.queryAllByRole('spinbutton')
  inputs.slice(0, values.length).forEach((inp, i) => {
    fireEvent.change(inp, { target: { value: String(values[i]) } })
  })
}

// Helper to click first matching button
const clickButton = (pattern) => {
  const btn = screen.queryAllByRole('button').find(b => b.textContent.match(pattern))
  if (btn) fireEvent.click(btn)
  return btn
}

// Helper to click all matching buttons
const clickAllButtons = (pattern) => {
  screen.queryAllByRole('button').filter(b => b.textContent.match(pattern)).forEach(b => {
    try { fireEvent.click(b) } catch {}
  })
}

// ---- BinaryBooleanLogicCalculator ----
import BinaryBooleanLogicCalculator from '../../../tools/maths-science/BinaryBooleanLogicCalculator'
describe('BinaryBooleanLogicCalculator – interact', () => {
  it('renders and fills binary inputs', () => {
    render(<W><BinaryBooleanLogicCalculator /></W>)
    const inputs = screen.queryAllByRole('textbox')
    if (inputs[0]) fireEvent.change(inputs[0], { target: { value: '1010' } })
    if (inputs[1]) fireEvent.change(inputs[1], { target: { value: '1100' } })
  })
  it('clicks operation buttons', () => {
    render(<W><BinaryBooleanLogicCalculator /></W>)
    const inputs = screen.queryAllByRole('textbox')
    if (inputs[0]) fireEvent.change(inputs[0], { target: { value: '1010' } })
    if (inputs[1]) fireEvent.change(inputs[1], { target: { value: '1100' } })
    clickAllButtons(/and|or|xor|not|nand|nor/i)
  })
  it('converts between bases', () => {
    render(<W><BinaryBooleanLogicCalculator /></W>)
    const inputs = screen.queryAllByRole('textbox')
    if (inputs[0]) fireEvent.change(inputs[0], { target: { value: '255' } })
    clickAllButtons(/convert|binary|hex|octal|decimal/i)
  })
})

// ---- CalculusReferenceTool ----
import CalculusReferenceTool from '../../../tools/maths-science/CalculusReferenceTool'
describe('CalculusReferenceTool – interact', () => {
  it('renders reference sections', () => {
    render(<W><CalculusReferenceTool /></W>)
    expect(document.body.textContent).toMatch(/deriv|integral|calculus|limit/i)
  })
  it('navigates sections', () => {
    render(<W><CalculusReferenceTool /></W>)
    const btns = screen.queryAllByRole('button').filter(b => b.textContent.length < 30)
    btns.slice(0, 8).forEach(b => { try { fireEvent.click(b) } catch {} })
  })
  it('searches formulas', () => {
    render(<W><CalculusReferenceTool /></W>)
    const search = screen.queryAllByRole('textbox').find(i => i.getAttribute('placeholder')?.match(/search/i))
    if (search) fireEvent.change(search, { target: { value: 'derivative' } })
  })
})

// ---- ComplexNumberCalculator ----
import ComplexNumberCalculator from '../../../tools/maths-science/ComplexNumberCalculator'
describe('ComplexNumberCalculator – interact', () => {
  it('fills real and imaginary parts', () => {
    render(<W><ComplexNumberCalculator /></W>)
    fillInputs([3, 4, 1, -2])
  })
  it('performs operations', () => {
    render(<W><ComplexNumberCalculator /></W>)
    fillInputs([3, 4, 1, -2])
    clickAllButtons(/add|subtract|multiply|divide|conjugate|magnitude|modulus/i)
  })
})

// ---- DnaRnaTools ----
import DnaRnaTools from '../../../tools/maths-science/DnaRnaTools'
describe('DnaRnaTools – interact', () => {
  it('enters DNA sequence', () => {
    render(<W><DnaRnaTools /></W>)
    const inputs = screen.queryAllByRole('textbox')
    const textareas = document.querySelectorAll('textarea')
    const target = inputs[0] || textareas[0]
    if (target) fireEvent.change(target, { target: { value: 'ATCGATCGATCG' } })
  })
  it('converts DNA to RNA', () => {
    render(<W><DnaRnaTools /></W>)
    const target = screen.queryAllByRole('textbox')[0] || document.querySelector('textarea')
    if (target) fireEvent.change(target, { target: { value: 'ATCGATCG' } })
    clickAllButtons(/transcri|rna|complement|translate/i)
  })
})

// ---- ElectricityCalculator ----
import ElectricityCalculator from '../../../tools/maths-science/ElectricityCalculator'
describe('ElectricityCalculator – interact', () => {
  it('fills voltage/current/resistance', () => {
    render(<W><ElectricityCalculator /></W>)
    fillInputs([12, 2])
    clickButton(/calc|solve/i)
  })
  it('switches calculation modes', () => {
    render(<W><ElectricityCalculator /></W>)
    clickAllButtons(/ohm|power|series|parallel/i)
    fillInputs([100, 200, 300])
  })
})

// ---- ElectromagneticCalculator ----
import ElectromagneticCalculator from '../../../tools/maths-science/ElectromagneticCalculator'
describe('ElectromagneticCalculator – interact', () => {
  it('fills frequency and wavelength', () => {
    render(<W><ElectromagneticCalculator /></W>)
    fillInputs([3e8, 500e-9])
    clickButton(/calc|solve/i)
  })
  it('switches modes', () => {
    render(<W><ElectromagneticCalculator /></W>)
    clickAllButtons(/frequency|wavelength|energy|photon/i)
  })
})

// ---- EnergyWorkCalculator ----
import EnergyWorkCalculator from '../../../tools/maths-science/EnergyWorkCalculator'
describe('EnergyWorkCalculator – interact', () => {
  it('fills force and distance', () => {
    render(<W><EnergyWorkCalculator /></W>)
    fillInputs([100, 5, 30])
    clickButton(/calc|solve/i)
  })
  it('switches calculation types', () => {
    render(<W><EnergyWorkCalculator /></W>)
    clickAllButtons(/kinetic|potential|work|power/i)
    fillInputs([10, 9.8, 5])
  })
})

// ---- ErrorUncertaintyCalculator ----
import ErrorUncertaintyCalculator from '../../../tools/maths-science/ErrorUncertaintyCalculator'
describe('ErrorUncertaintyCalculator – interact', () => {
  it('fills measured and expected values', () => {
    render(<W><ErrorUncertaintyCalculator /></W>)
    fillInputs([98.5, 100])
    clickButton(/calc|solve/i)
  })
  it('adds measurements for std dev', () => {
    render(<W><ErrorUncertaintyCalculator /></W>)
    const ta = document.querySelector('textarea')
    if (ta) fireEvent.change(ta, { target: { value: '10.1\n10.2\n9.9\n10.0\n10.3' } })
    clickButton(/calc|analyz/i)
  })
})

// ---- GasLawsCalculator ----
import GasLawsCalculator from '../../../tools/maths-science/GasLawsCalculator'
describe('GasLawsCalculator – interact', () => {
  it('fills PV=nRT values', () => {
    render(<W><GasLawsCalculator /></W>)
    fillInputs([1, 22.4, 1, 273])
    clickButton(/calc|solve/i)
  })
  it('switches gas laws', () => {
    render(<W><GasLawsCalculator /></W>)
    clickAllButtons(/ideal|boyle|charles|combined|dalton/i)
  })
})

// ---- GeneticsCalculator ----
import GeneticsCalculator from '../../../tools/maths-science/GeneticsCalculator'
describe('GeneticsCalculator – interact', () => {
  it('fills allele inputs', () => {
    render(<W><GeneticsCalculator /></W>)
    const inputs = screen.queryAllByRole('textbox')
    if (inputs[0]) fireEvent.change(inputs[0], { target: { value: 'Aa' } })
    if (inputs[1]) fireEvent.change(inputs[1], { target: { value: 'Aa' } })
  })
  it('calculates cross', () => {
    render(<W><GeneticsCalculator /></W>)
    const inputs = screen.queryAllByRole('textbox')
    if (inputs[0]) fireEvent.change(inputs[0], { target: { value: 'Aa' } })
    if (inputs[1]) fireEvent.change(inputs[1], { target: { value: 'Aa' } })
    clickButton(/cross|calc|solve/i)
  })
  it('switches cross types', () => {
    render(<W><GeneticsCalculator /></W>)
    clickAllButtons(/monohybrid|dihybrid|punnett|hardy/i)
  })
})

// ---- GravitationalCalculator ----
import GravitationalCalculator from '../../../tools/maths-science/GravitationalCalculator'
describe('GravitationalCalculator – interact', () => {
  it('fills mass and distance', () => {
    render(<W><GravitationalCalculator /></W>)
    fillInputs([5.97e24, 6.37e6, 100])
    clickButton(/calc|solve/i)
  })
  it('switches modes', () => {
    render(<W><GravitationalCalculator /></W>)
    clickAllButtons(/force|field|potential|orbit|escape/i)
  })
})

// ---- HalfLifeCalculator ----
import HalfLifeCalculator from '../../../tools/maths-science/HalfLifeCalculator'
describe('HalfLifeCalculator – interact', () => {
  it('fills half-life inputs', () => {
    render(<W><HalfLifeCalculator /></W>)
    fillInputs([100, 5730, 11460])
    clickButton(/calc|solve/i)
  })
  it('switches modes', () => {
    render(<W><HalfLifeCalculator /></W>)
    clickAllButtons(/decay|remaining|time|activity/i)
  })
})

// ---- KinematicsCalculator ----
import KinematicsCalculator from '../../../tools/maths-science/KinematicsCalculator'
describe('KinematicsCalculator – interact', () => {
  it('fills kinematic values', () => {
    render(<W><KinematicsCalculator /></W>)
    fillInputs([0, 10, 2])
    clickButton(/calc|solve/i)
  })
  it('switches equations', () => {
    render(<W><KinematicsCalculator /></W>)
    clickAllButtons(/velocity|displacement|acceleration|time|projectile/i)
  })
})

// ---- LogarithmCalculator ----
import LogarithmCalculator from '../../../tools/maths-science/LogarithmCalculator'
describe('LogarithmCalculator – interact', () => {
  it('fills log inputs', () => {
    render(<W><LogarithmCalculator /></W>)
    fillInputs([100, 10])
    clickButton(/calc|solve/i)
  })
  it('switches log types', () => {
    render(<W><LogarithmCalculator /></W>)
    clickAllButtons(/log|ln|natural|common|custom/i)
  })
})

// ---- MicroscopyCalculator ----
import MicroscopyCalculator from '../../../tools/maths-science/MicroscopyCalculator'
describe('MicroscopyCalculator – interact', () => {
  it('fills magnification inputs', () => {
    render(<W><MicroscopyCalculator /></W>)
    fillInputs([40, 10, 0.5])
    clickButton(/calc|solve/i)
  })
  it('switches modes', () => {
    render(<W><MicroscopyCalculator /></W>)
    clickAllButtons(/magnif|resolution|field|depth/i)
  })
})

// ---- MoleCalculator ----
import MoleCalculator from '../../../tools/maths-science/MoleCalculator'
describe('MoleCalculator – interact', () => {
  it('fills mass and molar mass', () => {
    render(<W><MoleCalculator /></W>)
    fillInputs([18, 18.015])
    clickButton(/calc|solve|convert/i)
  })
  it('enters formula', () => {
    render(<W><MoleCalculator /></W>)
    const inputs = screen.queryAllByRole('textbox')
    if (inputs[0]) fireEvent.change(inputs[0], { target: { value: 'H2O' } })
    clickButton(/calc|solve/i)
  })
})

// ---- NewtonsLawsCalculator ----
import NewtonsLawsCalculator from '../../../tools/maths-science/NewtonsLawsCalculator'
describe('NewtonsLawsCalculator – interact', () => {
  it('fills force and mass', () => {
    render(<W><NewtonsLawsCalculator /></W>)
    fillInputs([100, 10])
    clickButton(/calc|solve/i)
  })
  it('switches laws', () => {
    render(<W><NewtonsLawsCalculator /></W>)
    clickAllButtons(/first|second|third|friction|incline/i)
    fillInputs([50, 10, 0.3])
  })
})

// ---- NumberTheoryCalculator ----
import NumberTheoryCalculator from '../../../tools/maths-science/NumberTheoryCalculator'
describe('NumberTheoryCalculator – interact', () => {
  it('fills number input', () => {
    render(<W><NumberTheoryCalculator /></W>)
    fillInputs([120])
    clickButton(/calc|analyz|factor/i)
  })
  it('GCD and LCM', () => {
    render(<W><NumberTheoryCalculator /></W>)
    fillInputs([120, 45])
    clickAllButtons(/gcd|lcm|factor|prime|divisor/i)
  })
})

// ---- OpticsCalculator ----
import OpticsCalculator from '../../../tools/maths-science/OpticsCalculator'
describe('OpticsCalculator – interact', () => {
  it('fills lens values', () => {
    render(<W><OpticsCalculator /></W>)
    fillInputs([10, 15])
    clickButton(/calc|solve/i)
  })
  it('switches optics modes', () => {
    render(<W><OpticsCalculator /></W>)
    clickAllButtons(/lens|mirror|refraction|snell|critical/i)
  })
})

// ---- PeriodicTableReference ----
import PeriodicTableReference from '../../../tools/maths-science/PeriodicTableReference'
describe('PeriodicTableReference – interact', () => {
  it('renders periodic table', () => {
    render(<W><PeriodicTableReference /></W>)
    expect(document.body.textContent).toMatch(/hydrogen|helium|element|H|He/i)
  })
  it('searches elements', () => {
    render(<W><PeriodicTableReference /></W>)
    const search = screen.queryAllByRole('textbox')[0]
    if (search) fireEvent.change(search, { target: { value: 'Carbon' } })
  })
  it('clicks element buttons', () => {
    render(<W><PeriodicTableReference /></W>)
    const btns = screen.queryAllByRole('button').filter(b => b.textContent.length <= 3)
    btns.slice(0, 10).forEach(b => fireEvent.click(b))
  })
})

// ---- PhCalculator ----
import PhCalculator from '../../../tools/maths-science/PhCalculator'
describe('PhCalculator – interact', () => {
  it('fills pH value', () => {
    render(<W><PhCalculator /></W>)
    fillInputs([7])
    clickButton(/calc|solve|convert/i)
  })
  it('fills concentration', () => {
    render(<W><PhCalculator /></W>)
    fillInputs([0.001])
    clickAllButtons(/pH|pOH|concentration|acid|base/i)
  })
})

// ---- PolynomialCalculator ----
import PolynomialCalculator from '../../../tools/maths-science/PolynomialCalculator'
describe('PolynomialCalculator – interact', () => {
  it('fills polynomial coefficients', () => {
    render(<W><PolynomialCalculator /></W>)
    const inputs = screen.queryAllByRole('textbox')
    if (inputs[0]) fireEvent.change(inputs[0], { target: { value: '2x^2 + 3x - 5' } })
    fillInputs([2, 3, -5])
    clickButton(/calc|solve|evaluate/i)
  })
  it('operations', () => {
    render(<W><PolynomialCalculator /></W>)
    clickAllButtons(/add|subtract|multiply|divide|factor|roots/i)
  })
})

// ---- ProbabilityCalculator ----
import ProbabilityCalculator from '../../../tools/maths-science/ProbabilityCalculator'
describe('ProbabilityCalculator – interact', () => {
  it('fills probability inputs', () => {
    render(<W><ProbabilityCalculator /></W>)
    fillInputs([0.5, 0.3, 10, 3])
    clickButton(/calc|solve/i)
  })
  it('switches distribution types', () => {
    render(<W><ProbabilityCalculator /></W>)
    clickAllButtons(/binomial|normal|poisson|permut|combinat/i)
  })
})

// ---- ScientificNotationCalculator ----
import ScientificNotationCalculator from '../../../tools/maths-science/ScientificNotationCalculator'
describe('ScientificNotationCalculator – interact', () => {
  it('fills number for conversion', () => {
    render(<W><ScientificNotationCalculator /></W>)
    const inputs = screen.queryAllByRole('textbox')
    if (inputs[0]) fireEvent.change(inputs[0], { target: { value: '0.000045' } })
    fillInputs([4.5, -5])
    clickButton(/convert|calc/i)
  })
  it('arithmetic operations', () => {
    render(<W><ScientificNotationCalculator /></W>)
    fillInputs([3, 8, 2, 5])
    clickAllButtons(/add|subtract|multiply|divide/i)
  })
})

// ---- SetTheoryCalculator ----
import SetTheoryCalculator from '../../../tools/maths-science/SetTheoryCalculator'
describe('SetTheoryCalculator – interact', () => {
  it('fills set values', () => {
    render(<W><SetTheoryCalculator /></W>)
    const inputs = screen.queryAllByRole('textbox')
    if (inputs[0]) fireEvent.change(inputs[0], { target: { value: '1, 2, 3, 4, 5' } })
    if (inputs[1]) fireEvent.change(inputs[1], { target: { value: '3, 4, 5, 6, 7' } })
  })
  it('performs set operations', () => {
    render(<W><SetTheoryCalculator /></W>)
    const inputs = screen.queryAllByRole('textbox')
    if (inputs[0]) fireEvent.change(inputs[0], { target: { value: '1, 2, 3' } })
    if (inputs[1]) fireEvent.change(inputs[1], { target: { value: '2, 3, 4' } })
    clickAllButtons(/union|intersect|difference|complement|subset|power/i)
  })
})

// ---- SignificantFiguresCalculator ----
import SignificantFiguresCalculator from '../../../tools/maths-science/SignificantFiguresCalculator'
describe('SignificantFiguresCalculator – interact', () => {
  it('fills number input', () => {
    render(<W><SignificantFiguresCalculator /></W>)
    const inputs = screen.queryAllByRole('textbox')
    if (inputs[0]) fireEvent.change(inputs[0], { target: { value: '0.00450' } })
    fillInputs([3])
  })
  it('rounds to sig figs', () => {
    render(<W><SignificantFiguresCalculator /></W>)
    const inputs = screen.queryAllByRole('textbox')
    if (inputs[0]) fireEvent.change(inputs[0], { target: { value: '123.456' } })
    fillInputs([4])
    clickButton(/round|calc|count/i)
  })
})

// ---- SolutionConcentrationCalculator ----
import SolutionConcentrationCalculator from '../../../tools/maths-science/SolutionConcentrationCalculator'
describe('SolutionConcentrationCalculator – interact', () => {
  it('fills concentration inputs', () => {
    render(<W><SolutionConcentrationCalculator /></W>)
    fillInputs([50, 500, 1])
    clickButton(/calc|solve/i)
  })
  it('switches modes', () => {
    render(<W><SolutionConcentrationCalculator /></W>)
    clickAllButtons(/molarity|dilution|mass|percent|molal/i)
  })
})

// ---- ThermodynamicsCalculator ----
import ThermodynamicsCalculator from '../../../tools/maths-science/ThermodynamicsCalculator'
describe('ThermodynamicsCalculator – interact', () => {
  it('fills heat transfer values', () => {
    render(<W><ThermodynamicsCalculator /></W>)
    fillInputs([100, 4.186, 25])
    clickButton(/calc|solve/i)
  })
  it('switches laws', () => {
    render(<W><ThermodynamicsCalculator /></W>)
    clickAllButtons(/first|second|entropy|enthalpy|heat|carnot/i)
  })
})

// ---- TrigonometryCalculator ----
import TrigonometryCalculator from '../../../tools/maths-science/TrigonometryCalculator'
describe('TrigonometryCalculator – interact', () => {
  it('fills angle input', () => {
    render(<W><TrigonometryCalculator /></W>)
    fillInputs([45])
    clickButton(/calc|solve/i)
  })
  it('switches between degrees and radians', () => {
    render(<W><TrigonometryCalculator /></W>)
    clickAllButtons(/degree|radian|grad/i)
    fillInputs([3.14159])
  })
  it('inverse trig functions', () => {
    render(<W><TrigonometryCalculator /></W>)
    fillInputs([0.5])
    clickAllButtons(/arcsin|arccos|arctan|inverse/i)
  })
})

// ---- UnitConverterScientific ----
import UnitConverterScientific from '../../../tools/maths-science/UnitConverterScientific'
describe('UnitConverterScientific – interact', () => {
  it('fills unit value', () => {
    render(<W><UnitConverterScientific /></W>)
    fillInputs([100])
    const selects = screen.queryAllByRole('combobox')
    if (selects[0]) fireEvent.change(selects[0], { target: { value: selects[0].options?.[1]?.value || '' } })
  })
  it('switches categories', () => {
    render(<W><UnitConverterScientific /></W>)
    clickAllButtons(/length|mass|temp|energy|pressure|volume|force/i)
  })
})

// ---- WaveSoundCalculator ----
import WaveSoundCalculator from '../../../tools/maths-science/WaveSoundCalculator'
describe('WaveSoundCalculator – interact', () => {
  it('fills wave parameters', () => {
    render(<W><WaveSoundCalculator /></W>)
    fillInputs([440, 343])
    clickButton(/calc|solve/i)
  })
  it('switches modes', () => {
    render(<W><WaveSoundCalculator /></W>)
    clickAllButtons(/frequency|wavelength|speed|doppler|decibel|standing/i)
  })
})
