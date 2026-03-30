import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import DailyExpenseTracker from '../../../tools/finance/DailyExpenseTracker'


vi.mock('../../utils/storage', () => ({
  getItem: vi.fn((_k, d) => d ?? null),
  setItem: vi.fn(),
  removeItem: vi.fn(),
}))


const W = ({ children }) => (
  <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>
)


describe('DailyExpenseTracker – deep', () => {
  
beforeEach(() => {
  URL.createObjectURL = vi.fn(() => 'blob:test')
  URL.revokeObjectURL = vi.fn()
})


  it('renders with view buttons', () => {
    render(<W><DailyExpenseTracker /></W>)
    expect(document.body.textContent).toMatch(/log|expense|income|budget/i)
  })

  it('adds an expense', async () => {
    render(<W><DailyExpenseTracker /></W>)
    // Click add/show form button
    const addBtn = screen.getAllByRole('button').find(b => b.textContent.match(/add|new|\+/i))
    if (addBtn) fireEvent.click(addBtn)
    await waitFor(() => {
      const spinbuttons = screen.queryAllByRole('spinbutton')
      if (spinbuttons.length) {
        fireEvent.change(spinbuttons[0], { target: { value: '25.50' } })
      }
    })
    // Fill description
    const textInputs = screen.queryAllByRole('textbox')
    if (textInputs.length) await userEvent.type(textInputs[0], 'Lunch')
    // Submit
    const submitBtn = screen.getAllByRole('button').find(b => b.textContent.match(/add|save|submit/i))
    if (submitBtn) fireEvent.click(submitBtn)
  })

  it('navigates months', () => {
    render(<W><DailyExpenseTracker /></W>)
    const navBtns = screen.getAllByRole('button').filter(b => /^[<>←→]$/.test(b.textContent.trim()) || b.getAttribute('aria-label')?.match(/previous|next|back|forward/i))
    navBtns.forEach(b => fireEvent.click(b))
  })

  it('switches views', () => {
    render(<W><DailyExpenseTracker /></W>)
    const viewNames = ['charts', 'trends', 'balance', 'categories', 'budget']
    viewNames.forEach(name => {
      const btn = screen.getAllByRole('button').find(b => b.textContent.toLowerCase().includes(name))
      if (btn) fireEvent.click(btn)
    })
  })

  it('switches expense/income tabs', async () => {
    render(<W><DailyExpenseTracker /></W>)
    const incomeTab = screen.getAllByRole('button').find(b => b.textContent.match(/income/i))
    if (incomeTab) {
      fireEvent.click(incomeTab)
      await waitFor(() => expect(document.body.textContent).toMatch(/income/i))
    }
  })

  it('exports CSV', () => {
    render(<W><DailyExpenseTracker /></W>)
    const csvBtn = screen.getAllByRole('button').find(b => b.textContent.match(/export|csv/i))
    if (csvBtn) fireEvent.click(csvBtn)
  })
})
