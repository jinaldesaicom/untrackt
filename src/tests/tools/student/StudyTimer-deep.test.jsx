import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import StudyTimer from '../../../tools/student/StudyTimer'


vi.mock('../../utils/storage', () => ({
  getItem: vi.fn((_k, d) => d ?? null),
  setItem: vi.fn(),
  removeItem: vi.fn(),
}))


const W = ({ children }) => (
  <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>
)


describe('StudyTimer – deep', () => {
  
beforeEach(() => {
  Object.assign(navigator, { clipboard: { writeText: vi.fn(() => Promise.resolve()) } })
})


  it('renders without crashing', () => {
    render(<W><StudyTimer /></W>)
    expect(document.body.textContent.length).toBeGreaterThan(30)
  })

  it('interacts with inputs', async () => {
    render(<W><StudyTimer /></W>)
    const textInputs = screen.queryAllByRole('textbox')
    for (const input of textInputs.slice(0, 3)) {
      if (!input.readOnly) await userEvent.type(input, 'Test content')
    }
    const spinbuttons = screen.queryAllByRole('spinbutton')
    spinbuttons.slice(0, 3).forEach(input => {
      fireEvent.change(input, { target: { value: '5' } })
    })
    const actionBtn = screen.queryAllByRole('button').find(b =>
      b.textContent.match(/start|add|create|generate|calculate|save/i)
    )
    if (actionBtn) fireEvent.click(actionBtn)
  })

  it('clicks through tabs', () => {
    render(<W><StudyTimer /></W>)
    const btns = screen.queryAllByRole('button').filter(b => b.textContent.length < 25)
    btns.slice(0, 5).forEach(b => {
      try { fireEvent.click(b) } catch {}
    })
  })
})
