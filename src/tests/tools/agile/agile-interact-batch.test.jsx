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

import AcceptanceCriteriaGenerator from '../../../tools/agile/AcceptanceCriteriaGenerator'
describe('AcceptanceCriteriaGenerator – interact', () => {
  it('fills story details', async () => {
    render(<W><AcceptanceCriteriaGenerator /></W>)
    const ta = document.querySelector('textarea') || screen.queryAllByRole('textbox')[0]
    if (ta) fireEvent.change(ta, { target: { value: 'As a user, I want to login with SSO' } })
    clickButton(/generate|create/i)
  })
})

import CeremonyTimer from '../../../tools/agile/CeremonyTimer'
describe('CeremonyTimer – interact', () => {
  it('starts ceremony timer', () => {
    render(<W><CeremonyTimer /></W>)
    clickAllButtons(/standup|planning|review|retro/i)
    clickButton(/start|begin/i)
  })
})

import DailyStandupTemplate from '../../../tools/agile/DailyStandupTemplate'
describe('DailyStandupTemplate – interact', () => {
  it('fills standup fields', () => {
    render(<W><DailyStandupTemplate /></W>)
    const tas = document.querySelectorAll('textarea')
    Array.from(tas).forEach((ta, i) => {
      fireEvent.change(ta, { target: { value: ['Did this', 'Will do that', 'Blocked by X'][i] || 'Note' } })
    })
    clickButton(/copy|save|export/i)
  })
})

import DefinitionOfDoneChecklist from '../../../tools/agile/DefinitionOfDoneChecklist'
describe('DefinitionOfDoneChecklist – interact', () => {
  it('toggles checklist items', () => {
    render(<W><DefinitionOfDoneChecklist /></W>)
    const cbs = screen.queryAllByRole('checkbox')
    cbs.slice(0, 5).forEach(cb => fireEvent.click(cb))
  })
})

import DefinitionOfReadyChecklist from '../../../tools/agile/DefinitionOfReadyChecklist'
describe('DefinitionOfReadyChecklist – interact', () => {
  it('toggles checklist items', () => {
    render(<W><DefinitionOfReadyChecklist /></W>)
    const cbs = screen.queryAllByRole('checkbox')
    cbs.slice(0, 5).forEach(cb => fireEvent.click(cb))
  })
})

import EpicBreakdownAssistant from '../../../tools/agile/EpicBreakdownAssistant'
describe('EpicBreakdownAssistant – interact', () => {
  it('fills epic details', async () => {
    render(<W><EpicBreakdownAssistant /></W>)
    const inputs = screen.queryAllByRole('textbox')
    if (inputs[0]) await userEvent.type(inputs[0], 'User Management')
    clickButton(/break|split|add/i)
  })
})

import EstimationComparison from '../../../tools/agile/EstimationComparison'
describe('EstimationComparison – interact', () => {
  it('fills estimation values', () => {
    render(<W><EstimationComparison /></W>)
    fillInputs([5, 8, 13])
    clickButton(/compare|calc/i)
  })
})

import ImpedimentLog from '../../../tools/agile/ImpedimentLog'
describe('ImpedimentLog – interact', () => {
  it('logs impediment', async () => {
    render(<W><ImpedimentLog /></W>)
    const inputs = screen.queryAllByRole('textbox')
    if (inputs[0]) await userEvent.type(inputs[0], 'CI pipeline broken')
    clickButton(/add|save|log/i)
  })
})

import PlanningPoker from '../../../tools/agile/PlanningPoker'
describe('PlanningPoker – interact', () => {
  it('selects story point cards', () => {
    render(<W><PlanningPoker /></W>)
    clickAllButtons(/^1$|^2$|^3$|^5$|^8$|^13$/i)
  })
})

import ReleasePlanningCalculator from '../../../tools/agile/ReleasePlanningCalculator'
describe('ReleasePlanningCalculator – interact', () => {
  it('fills release data', () => {
    render(<W><ReleasePlanningCalculator /></W>)
    fillInputs([100, 20, 2])
    clickButton(/calc|plan/i)
  })
})

import RetrospectiveBoard from '../../../tools/agile/RetrospectiveBoard'
describe('RetrospectiveBoard – interact', () => {
  it('adds retro items', async () => {
    render(<W><RetrospectiveBoard /></W>)
    const inputs = screen.queryAllByRole('textbox')
    if (inputs[0]) await userEvent.type(inputs[0], 'Good team collaboration')
    clickButton(/add|save/i)
  })
  it('switches categories', () => {
    render(<W><RetrospectiveBoard /></W>)
    clickAllButtons(/start|stop|continue|went.*well|improve/i)
  })
})

import SprintCapacityCalculator from '../../../tools/agile/SprintCapacityCalculator'
describe('SprintCapacityCalculator – interact', () => {
  it('fills capacity values', () => {
    render(<W><SprintCapacityCalculator /></W>)
    fillInputs([5, 10, 6, 80])
    clickButton(/calc/i)
  })
})

import SprintPlanner from '../../../tools/agile/SprintPlanner'
describe('SprintPlanner – interact', () => {
  it('fills sprint details', async () => {
    render(<W><SprintPlanner /></W>)
    const inputs = screen.queryAllByRole('textbox')
    if (inputs[0]) await userEvent.type(inputs[0], 'Sprint 42')
    fillInputs([10, 40])
    clickButton(/add|save/i)
  })
})

import StoryMappingTool from '../../../tools/agile/StoryMappingTool'
describe('StoryMappingTool – interact', () => {
  it('adds activities', async () => {
    render(<W><StoryMappingTool /></W>)
    const inputs = screen.queryAllByRole('textbox')
    if (inputs[0]) await userEvent.type(inputs[0], 'Browse Products')
    clickButton(/add|save/i)
  })
})

import StoryPointEstimator from '../../../tools/agile/StoryPointEstimator'
describe('StoryPointEstimator – interact', () => {
  it('estimates story points', () => {
    render(<W><StoryPointEstimator /></W>)
    clickAllButtons(/1|2|3|5|8|13|simple|medium|complex/i)
    fillInputs([5])
  })
})

import UserStoryBuilder from '../../../tools/agile/UserStoryBuilder'
describe('UserStoryBuilder – interact', () => {
  it('fills user story template', async () => {
    render(<W><UserStoryBuilder /></W>)
    const inputs = screen.queryAllByRole('textbox')
    const tas = document.querySelectorAll('textarea')
    const all = [...inputs, ...Array.from(tas)]
    if (all[0]) fireEvent.change(all[0], { target: { value: 'customer' } })
    if (all[1]) fireEvent.change(all[1], { target: { value: 'search products' } })
    if (all[2]) fireEvent.change(all[2], { target: { value: 'find items quickly' } })
    clickButton(/generate|create|copy/i)
  })
})

import VelocityCalculator from '../../../tools/agile/VelocityCalculator'
describe('VelocityCalculator – interact', () => {
  it('fills sprint velocity data', () => {
    render(<W><VelocityCalculator /></W>)
    fillInputs([35, 40, 38, 42])
    clickButton(/calc|average/i)
  })
})

import WorkingAgreementBuilder from '../../../tools/agile/WorkingAgreementBuilder'
describe('WorkingAgreementBuilder – interact', () => {
  it('adds agreement items', async () => {
    render(<W><WorkingAgreementBuilder /></W>)
    const inputs = screen.queryAllByRole('textbox')
    const ta = document.querySelector('textarea')
    if (inputs[0]) await userEvent.type(inputs[0], 'Code review within 24 hours')
    if (ta) fireEvent.change(ta, { target: { value: 'All PRs reviewed within one business day' } })
    clickButton(/add|save/i)
  })
})
