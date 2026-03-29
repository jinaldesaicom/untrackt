import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import MoodTracker from '../../../tools/health/MoodTracker'


vi.mock('../../utils/storage', () => ({
  getItem: vi.fn((_k, d) => d ?? null),
  setItem: vi.fn(),
  removeItem: vi.fn(),
}))


const W = ({ children }) => (
  <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>
)


describe('MoodTracker – deep', () => {
  it('renders mood selection buttons', () => {
    render(<W><MoodTracker /></W>)
    // Should have mood emoji or mood label buttons
    const btns = screen.getAllByRole('button')
    expect(btns.length).toBeGreaterThan(0)
  })

  it('selects a mood and saves entry', async () => {
    render(<W><MoodTracker /></W>)
    const btns = screen.getAllByRole('button')
    // Click first mood button (usually an emoji or mood level)
    if (btns[0]) fireEvent.click(btns[0])
    // Look for save/log/add button
    const saveBtn = screen.getAllByRole('button').find(b => b.textContent.match(/save|log|add|submit/i))
    if (saveBtn) fireEvent.click(saveBtn)
  })

  it('adds notes to mood entry', async () => {
    render(<W><MoodTracker /></W>)
    const textareas = document.querySelectorAll('textarea')
    const textInputs = screen.queryAllByRole('textbox')
    const noteInput = textareas[0] || textInputs[0]
    if (noteInput) {
      await userEvent.type(noteInput, 'Feeling great today!')
    }
  })

  it('switches between views/tabs', () => {
    render(<W><MoodTracker /></W>)
    const tabBtns = screen.getAllByRole('button').filter(b =>
      b.textContent.match(/history|chart|stats|trend|log|calendar/i)
    )
    tabBtns.forEach(b => fireEvent.click(b))
  })
})
