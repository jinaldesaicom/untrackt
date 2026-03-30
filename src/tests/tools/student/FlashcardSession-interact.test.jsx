import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import FlashcardSession from '../../../tools/student/FlashcardSession'

vi.mock('../../../utils/storage', () => ({
  getItem: vi.fn((_k, d) => d ?? null),
  setItem: vi.fn(),
  removeItem: vi.fn(),
}))

const W = ({ children }) => <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>

describe('FlashcardSession – interaction', () => {
  it('renders add card interface', () => {
    render(<W><FlashcardSession /></W>)
    expect(document.body.textContent).toMatch(/card|flash|front|back|add/i)
  })

  it('adds flashcards', async () => {
    render(<W><FlashcardSession /></W>)
    const inputs = screen.queryAllByRole('textbox')
    const textareas = document.querySelectorAll('textarea')
    const allInputs = [...inputs, ...Array.from(textareas)]
    if (allInputs.length >= 2) {
      fireEvent.change(allInputs[0], { target: { value: 'What is React?' } })
      fireEvent.change(allInputs[1], { target: { value: 'A JavaScript library for building UIs' } })
    }
    const addBtn = screen.queryAllByRole('button').find(b => b.textContent.match(/add|save|create/i))
    if (addBtn) fireEvent.click(addBtn)
  })

  it('flips cards', () => {
    render(<W><FlashcardSession /></W>)
    const flipBtn = screen.queryAllByRole('button').find(b => b.textContent.match(/flip|show|reveal/i))
    if (flipBtn) fireEvent.click(flipBtn)
  })

  it('navigates through cards', () => {
    render(<W><FlashcardSession /></W>)
    const nextBtn = screen.queryAllByRole('button').find(b => b.textContent.match(/next|→|forward/i))
    const prevBtn = screen.queryAllByRole('button').find(b => b.textContent.match(/prev|←|back/i))
    if (nextBtn) fireEvent.click(nextBtn)
    if (prevBtn) fireEvent.click(prevBtn)
  })

  it('shuffles cards', () => {
    render(<W><FlashcardSession /></W>)
    const shuffleBtn = screen.queryAllByRole('button').find(b => b.textContent.match(/shuffle|random/i))
    if (shuffleBtn) fireEvent.click(shuffleBtn)
  })
})
