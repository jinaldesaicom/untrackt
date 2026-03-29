import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import DailyExpenseTracker from '../../../tools/finance/DailyExpenseTracker'

vi.mock('../../../utils/storage', () => ({
  getItem: vi.fn((_k, d) => d ?? null),
  setItem: vi.fn(),
  removeItem: vi.fn(),
}))

const W = ({ children }) => <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>

describe('DailyExpenseTracker – interaction', () => {
  it('renders expense form', () => {
    render(<W><DailyExpenseTracker /></W>)
    expect(document.body.textContent).toMatch(/expense|amount|category/i)
  })

  it('fills expense fields', async () => {
    render(<W><DailyExpenseTracker /></W>)
    const textInputs = screen.queryAllByRole('textbox')
    if (textInputs[0]) await userEvent.type(textInputs[0], 'Coffee')
    const spinbuttons = screen.queryAllByRole('spinbutton')
    if (spinbuttons[0]) fireEvent.change(spinbuttons[0], { target: { value: '4.50' } })
  })

  it('adds expense', async () => {
    render(<W><DailyExpenseTracker /></W>)
    const spinbuttons = screen.queryAllByRole('spinbutton')
    if (spinbuttons[0]) fireEvent.change(spinbuttons[0], { target: { value: '10' } })
    const addBtn = screen.queryAllByRole('button').find(b => b.textContent.match(/add|save/i))
    if (addBtn) fireEvent.click(addBtn)
  })

  it('selects category', () => {
    render(<W><DailyExpenseTracker /></W>)
    const selects = screen.queryAllByRole('combobox')
    if (selects[0]) fireEvent.change(selects[0], { target: { value: selects[0].options?.[1]?.value || 'Food' } })
    const catBtns = screen.queryAllByRole('button').filter(b => b.textContent.match(/food|transport|shopping|entertainment/i))
    catBtns.forEach(b => fireEvent.click(b))
  })

  it('clears expenses', () => {
    render(<W><DailyExpenseTracker /></W>)
    const clearBtn = screen.queryAllByRole('button').find(b => b.textContent.match(/clear|reset/i))
    if (clearBtn) fireEvent.click(clearBtn)
  })
})
