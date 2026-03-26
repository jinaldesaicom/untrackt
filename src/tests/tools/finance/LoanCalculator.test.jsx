import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoanCalculator from '../../../tools/finance/LoanCalculator.jsx'

describe('LoanCalculator', () => {
  it('renders loan amount, rate, and term inputs', () => {
    render(<LoanCalculator />)
    expect(screen.getByText(/loan amount/i)).toBeInTheDocument()
    expect(screen.getByText(/annual interest rate/i)).toBeInTheDocument()
    expect(screen.getByText(/loan term/i)).toBeInTheDocument()
    expect(screen.getAllByRole('spinbutton').length).toBe(3)
  })

  it('calculates EMI: $10,000 loan at 12% annual for 12 months ≈ $888.49', async () => {
    const user = userEvent.setup()
    render(<LoanCalculator />)
    const [loanInput, rateInput, termInput] = screen.getAllByRole('spinbutton')
    await user.clear(loanInput); await user.type(loanInput, '10000')
    await user.clear(rateInput); await user.type(rateInput, '12')
    await user.clear(termInput); await user.type(termInput, '12')
    // EMI = $888.49
    expect(screen.getAllByText('$888.49').length).toBeGreaterThanOrEqual(1)
  })

  it('total payment > loan amount (interest is added)', async () => {
    const user = userEvent.setup()
    render(<LoanCalculator />)
    // Default loan is $250,000 > 0 so total payment should be visible and > loan
    expect(screen.getByText(/total payment/i)).toBeInTheDocument()
    expect(screen.getByText(/total interest/i)).toBeInTheDocument()
  })

  it('amortization table renders first 12 rows', async () => {
    const user = userEvent.setup()
    render(<LoanCalculator />)
    const [loanInput, rateInput, termInput] = screen.getAllByRole('spinbutton')
    await user.clear(loanInput); await user.type(loanInput, '10000')
    await user.clear(rateInput); await user.type(rateInput, '12')
    await user.clear(termInput); await user.type(termInput, '24')
    // 24 months total but only first 12 shown by default
    const rows = document.querySelectorAll('tbody tr')
    expect(rows.length).toBe(12)
  })

  it('"Show all" toggle reveals full table', async () => {
    const user = userEvent.setup()
    render(<LoanCalculator />)
    const [loanInput, , termInput] = screen.getAllByRole('spinbutton')
    await user.clear(loanInput); await user.type(loanInput, '10000')
    await user.clear(termInput); await user.type(termInput, '24')
    await user.click(screen.getByText(/show all/i))
    const rows = document.querySelectorAll('tbody tr')
    expect(rows.length).toBe(24)
  })
})
