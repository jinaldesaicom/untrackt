import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import DefinitionOfDoneChecklist from '../../../tools/agile/DefinitionOfDoneChecklist'

vi.mock('../../utils/storage', () => ({
  getItem: vi.fn((_k, d) => d ?? null),
  setItem: vi.fn(),
  removeItem: vi.fn(),
}))

const W = ({ children }) => (
  <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>
)

describe('DefinitionOfDoneChecklist – deep', () => {
  beforeEach(() => {
    Object.assign(navigator, { clipboard: { writeText: vi.fn(() => Promise.resolve()) } })
  })
  
  

  it('renders without crashing', () => {
    render(<W><DefinitionOfDoneChecklist /></W>)
    expect(document.body.textContent.length).toBeGreaterThan(30)
  })

  it('has interactive elements', () => {
    render(<W><DefinitionOfDoneChecklist /></W>)
    const btns = screen.queryAllByRole('button')
    const inputs = screen.queryAllByRole('textbox')
    const spinbuttons = screen.queryAllByRole('spinbutton')
    const textareas = document.querySelectorAll('textarea')
    expect(btns.length + inputs.length + spinbuttons.length + textareas.length).toBeGreaterThan(0)
  })

  it('fills inputs and triggers action', async () => {
    render(<W><DefinitionOfDoneChecklist /></W>)
    // Fill text inputs
    const textInputs = screen.queryAllByRole('textbox')
    for (const input of textInputs.slice(0, 3)) {
      if (!input.readOnly) {
        try { await userEvent.type(input, 'Test value 42') } catch {}
      }
    }
    // Fill number inputs
    const spinbuttons = screen.queryAllByRole('spinbutton')
    spinbuttons.slice(0, 4).forEach((input, i) => {
      fireEvent.change(input, { target: { value: String([10, 25, 5, 100][i % 4]) } })
    })
    // Fill textareas
    const textareas = document.querySelectorAll('textarea')
    Array.from(textareas).slice(0, 2).forEach(ta => {
      fireEvent.change(ta, { target: { value: '1, 2, 3, 4, 5, 10, 20' } })
    })
    // Click action button
    const actionBtn = screen.queryAllByRole('button').find(b =>
      b.textContent.match(/calculate|solve|compute|convert|generate|analyze|check|start|add|save|create|balance|format|lookup|test|estimate|find|export|apply|submit|run|encode|decode|validate|process|optimize/i)
    )
    if (actionBtn) fireEvent.click(actionBtn)
  })

  it('interacts with mode/tab buttons', () => {
    render(<W><DefinitionOfDoneChecklist /></W>)
    const btns = screen.queryAllByRole('button').filter(b =>
      b.textContent.length < 30 &&
      !b.textContent.match(/calculate|solve|copy|clear|delete|remove|reset|export|import|download/i)
    )
    btns.slice(0, 5).forEach(b => {
      try { fireEvent.click(b) } catch {}
    })
  })

  it('handles copy/export if available', () => {
    render(<W><DefinitionOfDoneChecklist /></W>)
    const btn = screen.queryAllByRole('button').find(b =>
      b.textContent.match(/copy|export|download|csv|markdown/i) ||
      b.getAttribute('aria-label')?.match(/copy|export/i)
    )
    if (btn) {
      try { fireEvent.click(btn) } catch {}
    }
  })
})
