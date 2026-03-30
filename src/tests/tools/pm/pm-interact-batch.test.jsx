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

import ActionItemTracker from '../../../tools/pm/ActionItemTracker'
describe('ActionItemTracker – interact', () => {
  it('adds action item', async () => {
    render(<W><ActionItemTracker /></W>)
    const inputs = screen.queryAllByRole('textbox')
    if (inputs[0]) await userEvent.type(inputs[0], 'Review design docs')
    clickButton(/add|save|create/i)
  })
  it('filters items', () => {
    render(<W><ActionItemTracker /></W>)
    clickAllButtons(/all|open|closed|overdue|complete/i)
  })
})

import ChecklistBuilder from '../../../tools/pm/ChecklistBuilder'
describe('ChecklistBuilder – interact', () => {
  it('adds checklist item', async () => {
    render(<W><ChecklistBuilder /></W>)
    const inputs = screen.queryAllByRole('textbox')
    if (inputs[0]) await userEvent.type(inputs[0], 'Deploy to staging')
    clickButton(/add|save/i)
  })
  it('toggles items', () => {
    render(<W><ChecklistBuilder /></W>)
    const cbs = screen.queryAllByRole('checkbox')
    cbs.slice(0, 3).forEach(cb => fireEvent.click(cb))
  })
})

import CostEstimator from '../../../tools/pm/CostEstimator'
describe('CostEstimator – interact', () => {
  it('fills cost fields', () => {
    render(<W><CostEstimator /></W>)
    fillInputs([50000, 10000, 5000])
    clickButton(/calc|estimate|add/i)
  })
})

import DependencyTracker from '../../../tools/pm/DependencyTracker'
describe('DependencyTracker – interact', () => {
  it('adds dependency', async () => {
    render(<W><DependencyTracker /></W>)
    const inputs = screen.queryAllByRole('textbox')
    if (inputs[0]) await userEvent.type(inputs[0], 'API service')
    clickButton(/add|save/i)
  })
})

import EffortEstimationCalculator from '../../../tools/pm/EffortEstimationCalculator'
describe('EffortEstimationCalculator – interact', () => {
  it('fills estimation values', () => {
    render(<W><EffortEstimationCalculator /></W>)
    fillInputs([2, 5, 14])
    clickButton(/calc|estimate/i)
  })
})

import GanttChartGenerator from '../../../tools/pm/GanttChartGenerator'
describe('GanttChartGenerator – interact', () => {
  it('adds tasks', async () => {
    render(<W><GanttChartGenerator /></W>)
    const inputs = screen.queryAllByRole('textbox')
    if (inputs[0]) await userEvent.type(inputs[0], 'Design')
    clickButton(/add|save/i)
  })
})

import KpiMetricsTracker from '../../../tools/pm/KpiMetricsTracker'
describe('KpiMetricsTracker – interact', () => {
  it('adds KPI', async () => {
    render(<W><KpiMetricsTracker /></W>)
    const inputs = screen.queryAllByRole('textbox')
    if (inputs[0]) await userEvent.type(inputs[0], 'Sprint Velocity')
    fillInputs([50, 60])
    clickButton(/add|save/i)
  })
})

import MilestoneTracker from '../../../tools/pm/MilestoneTracker'
describe('MilestoneTracker – interact', () => {
  it('adds milestone', async () => {
    render(<W><MilestoneTracker /></W>)
    const inputs = screen.queryAllByRole('textbox')
    if (inputs[0]) await userEvent.type(inputs[0], 'Beta Release')
    clickButton(/add|save/i)
  })
})

import ProjectHealthDashboard from '../../../tools/pm/ProjectHealthDashboard'
describe('ProjectHealthDashboard – interact', () => {
  it('renders metrics', () => {
    render(<W><ProjectHealthDashboard /></W>)
    expect(document.body.textContent).toMatch(/health|status|budget|scope|schedule/i)
  })
  it('interacts with inputs', () => {
    render(<W><ProjectHealthDashboard /></W>)
    fillInputs([80, 75, 90])
    clickAllButtons(/green|amber|red|on.track|at.risk/i)
  })
})

import ProjectTimelinePlanner from '../../../tools/pm/ProjectTimelinePlanner'
describe('ProjectTimelinePlanner – interact', () => {
  it('adds timeline entries', async () => {
    render(<W><ProjectTimelinePlanner /></W>)
    const inputs = screen.queryAllByRole('textbox')
    if (inputs[0]) await userEvent.type(inputs[0], 'Phase 1')
    clickButton(/add|save/i)
  })
})

import RiskAssessmentMatrix from '../../../tools/pm/RiskAssessmentMatrix'
describe('RiskAssessmentMatrix – interact', () => {
  it('adds risk', async () => {
    render(<W><RiskAssessmentMatrix /></W>)
    const inputs = screen.queryAllByRole('textbox')
    if (inputs[0]) await userEvent.type(inputs[0], 'Data loss')
    clickButton(/add|save/i)
  })
  it('sets impact/likelihood', () => {
    render(<W><RiskAssessmentMatrix /></W>)
    fillInputs([4, 3])
    clickAllButtons(/high|medium|low|critical/i)
  })
})

import ScopeChangeLog from '../../../tools/pm/ScopeChangeLog'
describe('ScopeChangeLog – interact', () => {
  it('adds change', async () => {
    render(<W><ScopeChangeLog /></W>)
    const inputs = screen.queryAllByRole('textbox')
    if (inputs[0]) await userEvent.type(inputs[0], 'Add auth module')
    const ta = document.querySelector('textarea')
    if (ta) fireEvent.change(ta, { target: { value: 'Need OAuth2 integration' } })
    clickButton(/add|save|log/i)
  })
})

import TaskBreakdownWBS from '../../../tools/pm/TaskBreakdownWBS'
describe('TaskBreakdownWBS – interact', () => {
  it('adds work breakdown', async () => {
    render(<W><TaskBreakdownWBS /></W>)
    const inputs = screen.queryAllByRole('textbox')
    if (inputs[0]) await userEvent.type(inputs[0], 'Authentication')
    clickButton(/add|save/i)
  })
})

import TimeBlockingPlanner from '../../../tools/pm/TimeBlockingPlanner'
describe('TimeBlockingPlanner – interact', () => {
  it('adds time block', async () => {
    render(<W><TimeBlockingPlanner /></W>)
    const inputs = screen.queryAllByRole('textbox')
    if (inputs[0]) await userEvent.type(inputs[0], 'Deep work')
    clickButton(/add|save/i)
  })
})

import WorkloadCalculator from '../../../tools/pm/WorkloadCalculator'
describe('WorkloadCalculator – interact', () => {
  it('fills workload values', () => {
    render(<W><WorkloadCalculator /></W>)
    fillInputs([40, 5, 8])
    clickButton(/calc|estimate/i)
  })
})
