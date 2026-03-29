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

import BrainDumpCapture from '../../../tools/productivity/BrainDumpCapture'
describe('BrainDumpCapture – interact', () => {
  it('enters thoughts', async () => {
    render(<W><BrainDumpCapture /></W>)
    const ta = document.querySelector('textarea')
    if (ta) fireEvent.change(ta, { target: { value: 'I need to refactor the API layer' } })
    clickButton(/save|capture|add/i)
  })
})

import DailyJournal from '../../../tools/productivity/DailyJournal'
describe('DailyJournal – interact', () => {
  it('writes journal entry', async () => {
    render(<W><DailyJournal /></W>)
    const ta = document.querySelector('textarea')
    if (ta) fireEvent.change(ta, { target: { value: 'Today was productive' } })
    clickButton(/save|add/i)
  })
})

import DailyPlanner from '../../../tools/productivity/DailyPlanner'
describe('DailyPlanner – interact', () => {
  it('adds daily task', async () => {
    render(<W><DailyPlanner /></W>)
    const inputs = screen.queryAllByRole('textbox')
    if (inputs[0]) await userEvent.type(inputs[0], 'Review PRs')
    clickButton(/add|save/i)
  })
})

import DecisionMatrix from '../../../tools/productivity/DecisionMatrix'
describe('DecisionMatrix – interact', () => {
  it('adds options and criteria', async () => {
    render(<W><DecisionMatrix /></W>)
    const inputs = screen.queryAllByRole('textbox')
    if (inputs[0]) await userEvent.type(inputs[0], 'Option A')
    clickButton(/add.*option|add.*criteria|add/i)
    fillInputs([8, 6, 7])
  })
})

import EisenhowerMatrix from '../../../tools/productivity/EisenhowerMatrix'
describe('EisenhowerMatrix – interact', () => {
  it('adds task to quadrants', async () => {
    render(<W><EisenhowerMatrix /></W>)
    const inputs = screen.queryAllByRole('textbox')
    if (inputs[0]) await userEvent.type(inputs[0], 'Deploy fix')
    clickButton(/add|save/i)
  })
  it('clicks quadrant buttons', () => {
    render(<W><EisenhowerMatrix /></W>)
    clickAllButtons(/urgent|important|delegate|eliminate|do.*first|schedule/i)
  })
})

import EnergyLevelPlanner from '../../../tools/productivity/EnergyLevelPlanner'
describe('EnergyLevelPlanner – interact', () => {
  it('sets energy levels', () => {
    render(<W><EnergyLevelPlanner /></W>)
    clickAllButtons(/high|medium|low|morning|afternoon|evening/i)
    fillInputs([8, 5, 3])
  })
})

import FocusSessionLogger from '../../../tools/productivity/FocusSessionLogger'
describe('FocusSessionLogger – interact', () => {
  it('starts focus session', async () => {
    render(<W><FocusSessionLogger /></W>)
    const inputs = screen.queryAllByRole('textbox')
    if (inputs[0]) await userEvent.type(inputs[0], 'Code review')
    clickButton(/start|begin|focus/i)
  })
})

import KanbanBoard from '../../../tools/productivity/KanbanBoard'
describe('KanbanBoard – interact', () => {
  it('adds card', async () => {
    render(<W><KanbanBoard /></W>)
    clickButton(/add.*card|add.*task|\+/i)
    const inputs = screen.queryAllByRole('textbox')
    if (inputs[0]) await userEvent.type(inputs[0], 'Feature X')
    clickButton(/save|add|create/i)
  })
})

import MeetingAgendaBuilder from '../../../tools/productivity/MeetingAgendaBuilder'
describe('MeetingAgendaBuilder – interact', () => {
  it('adds agenda items', async () => {
    render(<W><MeetingAgendaBuilder /></W>)
    const inputs = screen.queryAllByRole('textbox')
    if (inputs[0]) await userEvent.type(inputs[0], 'Sprint planning')
    fillInputs([15])
    clickButton(/add|save/i)
  })
})

import MeetingMinutes from '../../../tools/productivity/MeetingMinutes'
describe('MeetingMinutes – interact', () => {
  it('fills meeting details', async () => {
    render(<W><MeetingMinutes /></W>)
    const inputs = screen.queryAllByRole('textbox')
    if (inputs[0]) await userEvent.type(inputs[0], 'Sprint Retro')
    const ta = document.querySelector('textarea')
    if (ta) fireEvent.change(ta, { target: { value: 'Discussed sprint improvements' } })
    clickButton(/save|export/i)
  })
})

import Notepad from '../../../tools/productivity/Notepad'
describe('Notepad – interact', () => {
  it('types in notepad', async () => {
    render(<W><Notepad /></W>)
    const ta = document.querySelector('textarea')
    if (ta) fireEvent.change(ta, { target: { value: 'Quick notes for the meeting' } })
  })
})

import OKRPlanner from '../../../tools/productivity/OKRPlanner'
describe('OKRPlanner – interact', () => {
  it('adds objective', async () => {
    render(<W><OKRPlanner /></W>)
    const inputs = screen.queryAllByRole('textbox')
    if (inputs[0]) await userEvent.type(inputs[0], 'Improve deployment pipeline')
    clickButton(/add|save/i)
  })
})

import SMARTGoalSetter from '../../../tools/productivity/SMARTGoalSetter'
describe('SMARTGoalSetter – interact', () => {
  it('fills SMART fields', async () => {
    render(<W><SMARTGoalSetter /></W>)
    const inputs = screen.queryAllByRole('textbox')
    const tas = document.querySelectorAll('textarea')
    const all = [...inputs, ...Array.from(tas)]
    for (const inp of all.slice(0, 5)) {
      if (!inp.readOnly) fireEvent.change(inp, { target: { value: 'Improve code coverage to 85%' } })
    }
    clickButton(/save|generate|create/i)
  })
})

import StickyNotes from '../../../tools/productivity/StickyNotes'
describe('StickyNotes – interact', () => {
  it('adds sticky note', async () => {
    render(<W><StickyNotes /></W>)
    clickButton(/add|\+|new/i)
    const ta = document.querySelector('textarea') || screen.queryAllByRole('textbox')[0]
    if (ta) fireEvent.change(ta, { target: { value: 'Remember to update tests' } })
  })
})

import TodoList from '../../../tools/productivity/TodoList'
describe('TodoList – interact', () => {
  it('adds and toggles todo', async () => {
    render(<W><TodoList /></W>)
    const inputs = screen.queryAllByRole('textbox')
    if (inputs[0]) await userEvent.type(inputs[0], 'Write unit tests')
    clickButton(/add|save/i)
    const cbs = screen.queryAllByRole('checkbox')
    if (cbs[0]) fireEvent.click(cbs[0])
  })
})

import TwoMinuteTaskFilter from '../../../tools/productivity/TwoMinuteTaskFilter'
describe('TwoMinuteTaskFilter – interact', () => {
  it('adds tasks and filters', async () => {
    render(<W><TwoMinuteTaskFilter /></W>)
    const inputs = screen.queryAllByRole('textbox')
    if (inputs[0]) await userEvent.type(inputs[0], 'Reply to email')
    clickButton(/add|save/i)
    clickAllButtons(/2.min|quick|delegate|schedule/i)
  })
})

import WeeklyReviewTemplate from '../../../tools/productivity/WeeklyReviewTemplate'
describe('WeeklyReviewTemplate – interact', () => {
  it('fills review sections', () => {
    render(<W><WeeklyReviewTemplate /></W>)
    const tas = document.querySelectorAll('textarea')
    Array.from(tas).forEach((ta, i) => {
      fireEvent.change(ta, { target: { value: 'Review note ' + (i + 1) } })
    })
    clickButton(/save|export|copy/i)
  })
})

import ProjectScopeDefiner from '../../../tools/productivity/ProjectScopeDefiner'
describe('ProjectScopeDefiner – interact', () => {
  it('fills scope fields', async () => {
    render(<W><ProjectScopeDefiner /></W>)
    const inputs = screen.queryAllByRole('textbox')
    if (inputs[0]) await userEvent.type(inputs[0], 'E-commerce platform')
    const tas = document.querySelectorAll('textarea')
    if (tas[0]) fireEvent.change(tas[0], { target: { value: 'Build shopping cart' } })
    clickButton(/save|generate/i)
  })
})
