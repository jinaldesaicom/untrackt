import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FireNumberCalculator from '../../../tools/finance/FireNumberCalculator.jsx'

describe('FireNumberCalculator', () => {
  it('renders all inputs', () => {
    render(<FireNumberCalculator />)
    expect(screen.getByText('Annual Expenses ($)')).toBeInTheDocument()
    expect(screen.getByText('Expected Return Rate (%)')).toBeInTheDocument()
    expect(screen.getByText('Safe Withdrawal Rate (%)')).toBeInTheDocument()
    expect(screen.getByText('Current Savings ($)')).toBeInTheDocument()
    expect(screen.getByText('Monthly Savings ($)')).toBeInTheDocument()
    expect(screen.getAllByRole('spinbutton').length).toBe(5)
  })

  it('calculates FIRE number: $40,000 expenses at 4% withdrawal = $1,000,000', async () => {
    const user = userEvent.setup()
    render(<FireNumberCalculator />)
    // spinbutton order: expenses[0], returnRate[1], withdrawalRate[2], currentSavings[3], monthlySavings[4]
    const inputs = screen.getAllByRole('spinbutton')
    await user.clear(inputs[0]); await user.type(inputs[0], '40000')
    await user.clear(inputs[2]); await user.type(inputs[2], '4')
    // FIRE number = $40,000 / 0.04 = $1,000,000
    expect(screen.getAllByText('$1,000,000').length).toBeGreaterThanOrEqual(1)
  })

  it('years to FIRE is a positive number when monthly savings > 0', async () => {
    const user = userEvent.setup()
    render(<FireNumberCalculator />)
    // Default has monthly savings > 0, so years to FIRE should render
    expect(screen.getByText(/years to fire/i)).toBeInTheDocument()
    // The years value should be a number (not "—")
    const yearsToFireSection = screen.getByText(/years to fire/i).closest('div')
    const valueEl = yearsToFireSection.querySelector('p.text-2xl')
    expect(valueEl).not.toBeNull()
    expect(valueEl.textContent).not.toBe('—')
  })

  it('"how much you still need" = FIRE number - current savings', async () => {
    const user = userEvent.setup()
    render(<FireNumberCalculator />)
    const inputs = screen.getAllByRole('spinbutton')
    await user.clear(inputs[0]); await user.type(inputs[0], '40000')
    await user.clear(inputs[2]); await user.type(inputs[2], '4')
    await user.clear(inputs[3]); await user.type(inputs[3], '0')
    // Still needed = $1,000,000 - $0 = $1,000,000
    expect(screen.getByText(/still needed/i)).toBeInTheDocument()
    const neededSection = screen.getByText(/still needed/i).closest('div')
    expect(neededSection.textContent).toContain('$1,000,000')
  })

  it('FIRE explanation text is visible in the UI', () => {
    render(<FireNumberCalculator />)
    expect(screen.getByText(/what is fire/i)).toBeInTheDocument()
    expect(screen.getByText(/financial independence, retire early/i)).toBeInTheDocument()
  })

  it('disclaimer text is present', () => {
    render(<FireNumberCalculator />)
    expect(screen.getByText(/consult a financial advisor/i)).toBeInTheDocument()
  })
})
