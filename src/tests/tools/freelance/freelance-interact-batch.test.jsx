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

import ClientProfitabilityEstimator from '../../../tools/freelance/ClientProfitabilityEstimator'
describe('ClientProfitabilityEstimator – interact', () => {
  it('fills client data', () => {
    render(<W><ClientProfitabilityEstimator /></W>)
    fillInputs([5000, 40, 100])
    clickButton(/calc|estimate/i)
  })
})

import ContractAnalyzer from '../../../tools/freelance/ContractAnalyzer'
describe('ContractAnalyzer – interact', () => {
  it('analyzes contract text', () => {
    render(<W><ContractAnalyzer /></W>)
    const ta = document.querySelector('textarea')
    if (ta) fireEvent.change(ta, { target: { value: 'This agreement shall commence on January 1 and terminate on December 31. Payment terms: Net 30.' } })
    clickButton(/analyz|check/i)
  })
})

import DiscountMarkupCalculator from '../../../tools/freelance/DiscountMarkupCalculator'
describe('DiscountMarkupCalculator – interact', () => {
  it('calculates discount/markup', () => {
    render(<W><DiscountMarkupCalculator /></W>)
    fillInputs([100, 20])
    clickAllButtons(/discount|markup/i)
  })
})

import HourlyRateCalculator from '../../../tools/freelance/HourlyRateCalculator'
describe('HourlyRateCalculator – interact', () => {
  it('fills salary data', () => {
    render(<W><HourlyRateCalculator /></W>)
    fillInputs([75000, 2000, 52])
    clickButton(/calc/i)
  })
})

import InvoiceGenerator from '../../../tools/freelance/InvoiceGenerator'
describe('InvoiceGenerator – interact', () => {
  it('fills invoice fields', async () => {
    render(<W><InvoiceGenerator /></W>)
    const inputs = screen.queryAllByRole('textbox')
    for (const inp of inputs.slice(0, 4)) {
      if (!inp.readOnly) await userEvent.type(inp, 'Test Client')
    }
    fillInputs([1, 100])
    clickButton(/add.*item|generate|save/i)
  })
})

import LatePaymentFeeCalculator from '../../../tools/freelance/LatePaymentFeeCalculator'
describe('LatePaymentFeeCalculator – interact', () => {
  it('fills payment data', () => {
    render(<W><LatePaymentFeeCalculator /></W>)
    fillInputs([5000, 1.5, 30])
    clickButton(/calc/i)
  })
})

import FreelanceMeetingCostCalculator from '../../../tools/freelance/MeetingCostCalculator'
describe('FreelanceMeetingCostCalculator – interact', () => {
  it('fills meeting data', () => {
    render(<W><FreelanceMeetingCostCalculator /></W>)
    fillInputs([5, 75, 60])
    clickButton(/calc/i)
  })
})

import ProjectTimelineEstimator from '../../../tools/freelance/ProjectTimelineEstimator'
describe('ProjectTimelineEstimator – interact', () => {
  it('fills timeline data', () => {
    render(<W><ProjectTimelineEstimator /></W>)
    fillInputs([40, 20, 8])
    clickButton(/calc|estimate/i)
  })
})

import ProposalBuilder from '../../../tools/freelance/ProposalBuilder'
describe('ProposalBuilder – interact', () => {
  it('fills proposal fields', async () => {
    render(<W><ProposalBuilder /></W>)
    const inputs = screen.queryAllByRole('textbox')
    for (const inp of inputs.slice(0, 4)) {
      if (!inp.readOnly) await userEvent.type(inp, 'Project Proposal')
    }
    const ta = document.querySelector('textarea')
    if (ta) fireEvent.change(ta, { target: { value: 'We will build a modern web app' } })
    clickButton(/generate|preview|save/i)
  })
})

import TaxBracketEstimator from '../../../tools/freelance/TaxBracketEstimator'
describe('TaxBracketEstimator – interact', () => {
  it('fills income data', () => {
    render(<W><TaxBracketEstimator /></W>)
    fillInputs([85000])
    clickAllButtons(/single|married|head.*house/i)
    clickButton(/calc|estimate/i)
  })
})

import TimeZoneScheduler from '../../../tools/freelance/TimeZoneScheduler'
describe('TimeZoneScheduler – interact', () => {
  it('selects time zones', () => {
    render(<W><TimeZoneScheduler /></W>)
    const selects = screen.queryAllByRole('combobox')
    if (selects[0]) fireEvent.change(selects[0], { target: { value: selects[0].options?.[2]?.value || '' } })
    clickButton(/add|find/i)
  })
})

import WorkingDaysCalculator from '../../../tools/freelance/WorkingDaysCalculator'
describe('WorkingDaysCalculator – interact', () => {
  it('sets date range', () => {
    render(<W><WorkingDaysCalculator /></W>)
    const dateInputs = document.querySelectorAll('input[type="date"]')
    if (dateInputs[0]) fireEvent.change(dateInputs[0], { target: { value: '2025-01-01' } })
    if (dateInputs[1]) fireEvent.change(dateInputs[1], { target: { value: '2025-12-31' } })
    clickButton(/calc/i)
  })
})
