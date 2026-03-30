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

import AlcoholUnitCalculator from '../../../tools/health/AlcoholUnitCalculator'
describe('AlcoholUnitCalculator – interact', () => {
  it('fills drink details', () => {
    render(<W><AlcoholUnitCalculator /></W>)
    fillInputs([330, 5])
    clickButton(/calc|add/i)
  })
})

import BloodPressureClassifier from '../../../tools/health/BloodPressureClassifier'
describe('BloodPressureClassifier – interact', () => {
  it('fills BP values', () => {
    render(<W><BloodPressureClassifier /></W>)
    fillInputs([120, 80])
    clickButton(/check|classify|calc/i)
  })
})

import BmrCalculator from '../../../tools/health/BmrCalculator'
describe('BmrCalculator – interact', () => {
  it('fills body metrics', () => {
    render(<W><BmrCalculator /></W>)
    fillInputs([70, 175, 30])
    clickAllButtons(/male|female|calc/i)
  })
})

import BodyFatCalculator from '../../../tools/health/BodyFatCalculator'
describe('BodyFatCalculator – interact', () => {
  it('fills measurements', () => {
    render(<W><BodyFatCalculator /></W>)
    fillInputs([85, 175, 40])
    clickAllButtons(/male|female|calc/i)
  })
})

import CalorieBurnEstimator from '../../../tools/health/CalorieBurnEstimator'
describe('CalorieBurnEstimator – interact', () => {
  it('fills exercise data', () => {
    render(<W><CalorieBurnEstimator /></W>)
    fillInputs([70, 30])
    clickButton(/calc|estimate/i)
  })
  it('selects activity', () => {
    render(<W><CalorieBurnEstimator /></W>)
    const selects = screen.queryAllByRole('combobox')
    if (selects[0]) fireEvent.change(selects[0], { target: { value: selects[0].options?.[2]?.value || 'running' } })
    clickAllButtons(/running|walking|cycling|swimming/i)
  })
})

import HeartRateZoneCalculator from '../../../tools/health/HeartRateZoneCalculator'
describe('HeartRateZoneCalculator – interact', () => {
  it('fills age and resting HR', () => {
    render(<W><HeartRateZoneCalculator /></W>)
    fillInputs([30, 60])
    clickButton(/calc/i)
  })
})

import IdealWeightCalculator from '../../../tools/health/IdealWeightCalculator'
describe('IdealWeightCalculator – interact', () => {
  it('fills height and gender', () => {
    render(<W><IdealWeightCalculator /></W>)
    fillInputs([175])
    clickAllButtons(/male|female|calc/i)
  })
})

import MacroCalculator from '../../../tools/health/MacroCalculator'
describe('MacroCalculator – interact', () => {
  it('fills calorie target', () => {
    render(<W><MacroCalculator /></W>)
    fillInputs([2000])
    clickAllButtons(/balanced|low.*carb|high.*protein|keto|calc/i)
  })
})

import MedicalUnitConverter from '../../../tools/health/MedicalUnitConverter'
describe('MedicalUnitConverter – interact', () => {
  it('converts units', () => {
    render(<W><MedicalUnitConverter /></W>)
    fillInputs([100])
    const selects = screen.queryAllByRole('combobox')
    if (selects[0]) fireEvent.change(selects[0], { target: { value: selects[0].options?.[1]?.value || '' } })
    clickButton(/convert|calc/i)
  })
})

import OvulationCalculator from '../../../tools/health/OvulationCalculator'
describe('OvulationCalculator – interact', () => {
  it('sets cycle data', () => {
    render(<W><OvulationCalculator /></W>)
    fillInputs([28])
    clickButton(/calc|predict/i)
  })
})

import PregnancyDueDateCalculator from '../../../tools/health/PregnancyDueDateCalculator'
describe('PregnancyDueDateCalculator – interact', () => {
  it('enters date', () => {
    render(<W><PregnancyDueDateCalculator /></W>)
    const dateInput = document.querySelector('input[type="date"]')
    if (dateInput) fireEvent.change(dateInput, { target: { value: '2025-01-15' } })
    clickButton(/calc/i)
  })
})

import SleepCycleCalculator from '../../../tools/health/SleepCycleCalculator'
describe('SleepCycleCalculator – interact', () => {
  it('sets wake/sleep times', () => {
    render(<W><SleepCycleCalculator /></W>)
    const timeInputs = document.querySelectorAll('input[type="time"]')
    if (timeInputs[0]) fireEvent.change(timeInputs[0], { target: { value: '07:00' } })
    clickButton(/calc|suggest/i)
  })
})

import SymptomJournal from '../../../tools/health/SymptomJournal'
describe('SymptomJournal – interact', () => {
  it('logs symptom', async () => {
    render(<W><SymptomJournal /></W>)
    const inputs = screen.queryAllByRole('textbox')
    if (inputs[0]) await userEvent.type(inputs[0], 'Headache')
    const ta = document.querySelector('textarea')
    if (ta) fireEvent.change(ta, { target: { value: 'Mild headache after lunch' } })
    clickButton(/save|log|add/i)
  })
})

import TDEECalculator from '../../../tools/health/TDEECalculator'
describe('TDEECalculator – interact', () => {
  it('fills activity data', () => {
    render(<W><TDEECalculator /></W>)
    fillInputs([70, 175, 30])
    clickAllButtons(/sedentary|light|moderate|active|very.*active|calc/i)
  })
})

import VaccinationAgeGuide from '../../../tools/health/VaccinationAgeGuide'
describe('VaccinationAgeGuide – interact', () => {
  it('selects age group', () => {
    render(<W><VaccinationAgeGuide /></W>)
    const selects = screen.queryAllByRole('combobox')
    if (selects[0]) fireEvent.change(selects[0], { target: { value: selects[0].options?.[1]?.value || '' } })
    clickAllButtons(/infant|child|adult|elderly/i)
  })
})

import WaterIntakeCalculator from '../../../tools/health/WaterIntakeCalculator'
describe('WaterIntakeCalculator – interact', () => {
  it('fills body weight', () => {
    render(<W><WaterIntakeCalculator /></W>)
    fillInputs([70])
    clickAllButtons(/calc|sedentary|active/i)
  })
})
