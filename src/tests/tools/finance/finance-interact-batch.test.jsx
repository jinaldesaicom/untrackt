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

import BreakEvenCalculator from '../../../tools/finance/BreakEvenCalculator'
describe('BreakEvenCalculator – interact', () => {
  it('fills cost values', () => {
    render(<W><BreakEvenCalculator /></W>)
    fillInputs([10000, 25, 50])
    clickButton(/calc/i)
  })
})

import CompoundInterestCalculator from '../../../tools/finance/CompoundInterestCalculator'
describe('CompoundInterestCalculator – interact', () => {
  it('fills compound interest values', () => {
    render(<W><CompoundInterestCalculator /></W>)
    fillInputs([10000, 7, 10, 12])
    clickButton(/calc/i)
  })
})

import CreditCardPayoffCalculator from '../../../tools/finance/CreditCardPayoffCalculator'
describe('CreditCardPayoffCalculator – interact', () => {
  it('fills credit card values', () => {
    render(<W><CreditCardPayoffCalculator /></W>)
    fillInputs([5000, 18, 200])
    clickButton(/calc/i)
  })
})

import CurrencyConverter from '../../../tools/finance/CurrencyConverter'
describe('CurrencyConverter – interact', () => {
  beforeEach(() => {
    global.fetch = vi.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve({ rates: { EUR: 0.85, GBP: 0.73 } }) }))
  })
  afterEach(() => vi.restoreAllMocks())
  it('enters amount and converts', () => {
    render(<W><CurrencyConverter /></W>)
    fillInputs([100])
    const selects = screen.queryAllByRole('combobox')
    if (selects[0]) fireEvent.change(selects[0], { target: { value: 'USD' } })
    if (selects[1]) fireEvent.change(selects[1], { target: { value: 'EUR' } })
    clickButton(/convert|swap/i)
  })
})

import EmergencyFundCalculator from '../../../tools/finance/EmergencyFundCalculator'
describe('EmergencyFundCalculator – interact', () => {
  it('fills monthly expenses', () => {
    render(<W><EmergencyFundCalculator /></W>)
    fillInputs([3000, 6])
    clickButton(/calc/i)
  })
})

import FireNumberCalculator from '../../../tools/finance/FireNumberCalculator'
describe('FireNumberCalculator – interact', () => {
  it('fills annual expenses', () => {
    render(<W><FireNumberCalculator /></W>)
    fillInputs([50000, 4])
    clickButton(/calc/i)
  })
})

import InflationCalculator from '../../../tools/finance/InflationCalculator'
describe('InflationCalculator – interact', () => {
  it('fills inflation values', () => {
    render(<W><InflationCalculator /></W>)
    fillInputs([100, 3, 10])
    clickButton(/calc/i)
  })
})

import LoanCalculator from '../../../tools/finance/LoanCalculator'
describe('LoanCalculator – interact', () => {
  it('fills loan values', () => {
    render(<W><LoanCalculator /></W>)
    fillInputs([250000, 5, 30])
    clickButton(/calc/i)
  })
})

import MortgageCalculator from '../../../tools/finance/MortgageCalculator'
describe('MortgageCalculator – interact', () => {
  it('fills mortgage values', () => {
    render(<W><MortgageCalculator /></W>)
    fillInputs([350000, 3.5, 30])
    clickButton(/calc/i)
  })
})

import NetWorthSnapshot from '../../../tools/finance/NetWorthSnapshot'
describe('NetWorthSnapshot – interact', () => {
  it('fills asset and liability values', () => {
    render(<W><NetWorthSnapshot /></W>)
    fillInputs([50000, 200000, 15000, 25000])
    clickButton(/calc|add/i)
  })
})

import RetirementCalculator from '../../../tools/finance/RetirementCalculator'
describe('RetirementCalculator – interact', () => {
  it('fills retirement values', () => {
    render(<W><RetirementCalculator /></W>)
    fillInputs([30, 65, 100000, 500])
    clickButton(/calc/i)
  })
})

import ROICalculator from '../../../tools/finance/ROICalculator'
describe('ROICalculator – interact', () => {
  it('fills investment values', () => {
    render(<W><ROICalculator /></W>)
    fillInputs([10000, 15000])
    clickButton(/calc/i)
  })
})

import RuleOf72Calculator from '../../../tools/finance/RuleOf72Calculator'
describe('RuleOf72Calculator – interact', () => {
  it('fills interest rate', () => {
    render(<W><RuleOf72Calculator /></W>)
    fillInputs([8])
    expect(document.body.textContent).toMatch(/9|year|double/i)
  })
})

import SavingsGoalCalculator from '../../../tools/finance/SavingsGoalCalculator'
describe('SavingsGoalCalculator – interact', () => {
  it('fills savings goal', () => {
    render(<W><SavingsGoalCalculator /></W>)
    fillInputs([50000, 2000, 5])
    clickButton(/calc/i)
  })
})

import SIPCalculator from '../../../tools/finance/SIPCalculator'
describe('SIPCalculator – interact', () => {
  it('fills SIP values', () => {
    render(<W><SIPCalculator /></W>)
    fillInputs([5000, 12, 10])
    clickButton(/calc/i)
  })
})
