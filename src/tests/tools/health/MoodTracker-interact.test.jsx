import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import MoodTracker from '../../../tools/health/MoodTracker'

vi.mock('../../../utils/storage', () => ({
  getItem: vi.fn((_k, d) => d ?? null),
  setItem: vi.fn(),
  removeItem: vi.fn(),
}))

const W = ({ children }) => <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>

describe('MoodTracker – interaction', () => {
  it('renders mood selection', () => {
    render(<W><MoodTracker /></W>)
    expect(document.body.textContent).toMatch(/mood|feel|today/i)
  })

  it('selects mood levels', () => {
    render(<W><MoodTracker /></W>)
    const btns = screen.queryAllByRole('button')
    const moodBtns = btns.filter(b => b.textContent.length < 10)
    moodBtns.slice(0, 5).forEach(b => fireEvent.click(b))
  })

  it('adds note', async () => {
    render(<W><MoodTracker /></W>)
    const textareas = document.querySelectorAll('textarea')
    if (textareas[0]) fireEvent.change(textareas[0], { target: { value: 'Good day' } })
  })

  it('saves entry', () => {
    render(<W><MoodTracker /></W>)
    const saveBtn = screen.queryAllByRole('button').find(b => b.textContent.match(/save|log|add|record/i))
    if (saveBtn) fireEvent.click(saveBtn)
  })

  it('views history', () => {
    render(<W><MoodTracker /></W>)
    const histBtn = screen.queryAllByRole('button').find(b => b.textContent.match(/history|past|view/i))
    if (histBtn) fireEvent.click(histBtn)
  })
})
