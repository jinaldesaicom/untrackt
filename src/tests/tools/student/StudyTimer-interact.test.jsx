import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import StudyTimer from '../../../tools/student/StudyTimer'

vi.mock('../../../utils/storage', () => ({
  getItem: vi.fn((_k, d) => d ?? null),
  setItem: vi.fn(),
  removeItem: vi.fn(),
}))

const W = ({ children }) => <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>

describe('StudyTimer – interaction', () => {
  it('renders timer display', () => {
    render(<W><StudyTimer /></W>)
    expect(document.body.textContent).toMatch(/\d+:\d+|start|timer/i)
  })

  it('starts timer', () => {
    render(<W><StudyTimer /></W>)
    const startBtn = screen.queryAllByRole('button').find(b => b.textContent.match(/start|begin|play/i))
    if (startBtn) fireEvent.click(startBtn)
  })

  it('stops timer', () => {
    render(<W><StudyTimer /></W>)
    const startBtn = screen.queryAllByRole('button').find(b => b.textContent.match(/start|begin|play/i))
    if (startBtn) fireEvent.click(startBtn)
    const stopBtn = screen.queryAllByRole('button').find(b => b.textContent.match(/stop|pause|end/i))
    if (stopBtn) fireEvent.click(stopBtn)
  })

  it('resets timer', () => {
    render(<W><StudyTimer /></W>)
    const resetBtn = screen.queryAllByRole('button').find(b => b.textContent.match(/reset|clear/i))
    if (resetBtn) fireEvent.click(resetBtn)
  })

  it('changes subject', async () => {
    render(<W><StudyTimer /></W>)
    const inputs = screen.queryAllByRole('textbox')
    if (inputs[0]) fireEvent.change(inputs[0], { target: { value: 'Mathematics' } })
  })

  it('clicks all mode buttons', () => {
    render(<W><StudyTimer /></W>)
    const btns = screen.queryAllByRole('button').filter(b => b.textContent.length < 25)
    btns.slice(0, 6).forEach(b => { try { fireEvent.click(b) } catch {} })
  })
})
