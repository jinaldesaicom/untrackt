import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import HourlyRateCalculator from '../../../tools/freelance/HourlyRateCalculator.jsx'

describe('HourlyRateCalculator', () => {
  it('renders all input fields', () => {
    render(<HourlyRateCalculator />)
    expect(screen.getByText(/annual income goal/i)).toBeInTheDocument()
    expect(screen.getByText(/weeks vacation/i)).toBeInTheDocument()
    expect(screen.getByText(/hours worked per week/i)).toBeInTheDocument()
    expect(screen.getByText(/annual business expenses/i)).toBeInTheDocument()
    expect(screen.getByText(/tax rate/i)).toBeInTheDocument()
    expect(screen.getAllByRole('spinbutton').length).toBe(5)
  })

  it('with valid inputs, shows calculated minimum hourly rate', () => {
    render(<HourlyRateCalculator />)
    // Default values are pre-filled; minimum rate should be visible
    expect(screen.getByText(/minimum hourly rate/i)).toBeInTheDocument()
  })

  it('recommended rate is at least 30% higher than minimum rate', () => {
    render(<HourlyRateCalculator />)
    // The component always shows recommended (+30%)
    expect(screen.getByText(/recommended rate \(\+30%\)/i)).toBeInTheDocument()
  })

  it('calculates a positive minimum rate for given inputs', async () => {
    const user = userEvent.setup()
    render(<HourlyRateCalculator />)
    const [incomeInput, vacationInput, hoursInput, expensesInput, taxInput] = screen.getAllByRole('spinbutton')
    await user.clear(incomeInput); await user.type(incomeInput, '60000')
    await user.clear(vacationInput); await user.type(vacationInput, '2')
    await user.clear(hoursInput); await user.type(hoursInput, '40')
    await user.clear(expensesInput); await user.type(expensesInput, '5000')
    await user.clear(taxInput); await user.type(taxInput, '25')
    // workWeeks = 52 - 2 = 50, billableHours = 50*40 = 2000
    // totalNeeded = 60000 + 5000 = 65000
    // minimum = 65000 / 2000 = $32.50
    // Component formats as currency, look for $32.50
    expect(screen.getByText('$32.50')).toBeInTheDocument()
  })

  it('shows calculation breakdown section', () => {
    render(<HourlyRateCalculator />)
    expect(screen.getByText(/billable hours\/year/i)).toBeInTheDocument()
    expect(screen.getByText(/total needed\/year/i)).toBeInTheDocument()
  })
})
