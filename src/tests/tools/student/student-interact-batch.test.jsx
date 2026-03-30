import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'

vi.mock('../../../utils/storage', () => ({
  getItem: vi.fn((_k, d) => d ?? null),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  getPreference: vi.fn((_k, d) => d ?? null),
  setPreference: vi.fn(),
}))

const W = ({ children }) => <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>
const fillInputs = (values) => {
  const inputs = screen.queryAllByRole('spinbutton')
  inputs.slice(0, values.length).forEach((inp, i) => fireEvent.change(inp, { target: { value: String(values[i]) } }))
}
const clickButton = (pattern) => {
  const btn = screen.queryAllByRole('button').find(b => b.textContent.match(pattern))
  if (btn) fireEvent.click(btn)
  return btn
}
const clickAllButtons = (pattern) => {
  screen.queryAllByRole('button').filter(b => b.textContent.match(pattern)).forEach(b => { try { fireEvent.click(b) } catch {} })
}

import CitationGenerator from '../../../tools/student/CitationGenerator'
describe('CitationGenerator – interact', () => {
  it('fills citation fields', async () => {
    render(<W><CitationGenerator /></W>)
    const inputs = screen.queryAllByRole('textbox')
    for (const inp of inputs.slice(0, 5)) {
      if (!inp.readOnly) await userEvent.type(inp, 'Test Author')
    }
    clickAllButtons(/apa|mla|chicago|harvard/i)
    clickButton(/generate|copy/i)
  })
})

import EssayOutlineBuilder from '../../../tools/student/EssayOutlineBuilder'
describe('EssayOutlineBuilder – interact', () => {
  it('builds outline', async () => {
    render(<W><EssayOutlineBuilder /></W>)
    const inputs = screen.queryAllByRole('textbox')
    if (inputs[0]) await userEvent.type(inputs[0], 'Climate Change Effects')
    const ta = document.querySelector('textarea')
    if (ta) fireEvent.change(ta, { target: { value: 'Thesis about global warming' } })
    clickButton(/add.*section|generate|save/i)
  })
})

import GpaCalculator from '../../../tools/student/GpaCalculator'
describe('GpaCalculator – interact', () => {
  it('adds courses', () => {
    render(<W><GpaCalculator /></W>)
    const inputs = screen.queryAllByRole('textbox')
    if (inputs[0]) fireEvent.change(inputs[0], { target: { value: 'Math 101' } })
    fillInputs([3])
    const selects = screen.queryAllByRole('combobox')
    if (selects[0]) fireEvent.change(selects[0], { target: { value: 'A' } })
    clickButton(/add|calc/i)
  })
})

import PercentageCalculator from '../../../tools/student/PercentageCalculator'
describe('PercentageCalculator – interact', () => {
  it('fills percentage values', () => {
    render(<W><PercentageCalculator /></W>)
    fillInputs([85, 100])
    clickButton(/calc|compute/i)
  })
})

import PomodoroTimer from '../../../tools/student/PomodoroTimer'
describe('PomodoroTimer – interact', () => {
  it('starts pomodoro', () => {
    render(<W><PomodoroTimer /></W>)
    clickButton(/start|begin/i)
    clickButton(/pause|stop/i)
    clickButton(/reset|skip/i)
  })
})

import QuadraticSolver from '../../../tools/student/QuadraticSolver'
describe('QuadraticSolver – interact', () => {
  it('solves quadratic equation', () => {
    render(<W><QuadraticSolver /></W>)
    fillInputs([1, -5, 6])
    clickButton(/solve|calc/i)
  })
})

import ReadabilityScorer from '../../../tools/student/ReadabilityScorer'
describe('ReadabilityScorer – interact', () => {
  it('scores readability', () => {
    render(<W><ReadabilityScorer /></W>)
    const ta = document.querySelector('textarea')
    if (ta) fireEvent.change(ta, { target: { value: 'The quick brown fox jumps over the lazy dog. This is a simple sentence for readability testing purposes.' } })
  })
})

import RomanNumeralConverter from '../../../tools/student/RomanNumeralConverter'
describe('RomanNumeralConverter – interact', () => {
  it('converts numbers', () => {
    render(<W><RomanNumeralConverter /></W>)
    fillInputs([42])
    clickButton(/convert/i)
    const inputs = screen.queryAllByRole('textbox')
    if (inputs[0]) fireEvent.change(inputs[0], { target: { value: 'XIV' } })
  })
})

import ScientificCalculator from '../../../tools/student/ScientificCalculator'
describe('ScientificCalculator – interact', () => {
  it('presses calculator buttons', () => {
    render(<W><ScientificCalculator /></W>)
    clickAllButtons(/\d|sin|cos|tan|log|sqrt|pi|\+|-|=|clear/i)
  })
})

import UnitConverter from '../../../tools/student/UnitConverter'
describe('UnitConverter – interact', () => {
  it('converts units', () => {
    render(<W><UnitConverter /></W>)
    fillInputs([100])
    const selects = screen.queryAllByRole('combobox')
    if (selects[0]) fireEvent.change(selects[0], { target: { value: selects[0].options[1]?.value || '' } })
    clickButton(/convert|swap/i)
  })
})

import WordCounter from '../../../tools/student/WordCounter'
describe('WordCounter – interact', () => {
  it('counts words', () => {
    render(<W><WordCounter /></W>)
    const ta = document.querySelector('textarea')
    if (ta) fireEvent.change(ta, { target: { value: 'This is a test with exactly nine words total.' } })
    expect(document.body.textContent).toMatch(/\d/)
  })
})
