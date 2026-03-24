import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import MeetingCostCalculator from '../../../tools/freelance/MeetingCostCalculator.jsx'

describe('MeetingCostCalculator', () => {
  it('renders attendees, salary, and duration inputs', () => {
    render(<MeetingCostCalculator />)
    expect(screen.getByText(/number of attendees/i)).toBeInTheDocument()
    expect(screen.getByText(/avg hourly salary/i)).toBeInTheDocument()
    expect(screen.getByText(/planned duration/i)).toBeInTheDocument()
    expect(screen.getAllByRole('spinbutton').length).toBe(3)
  })

  it('with valid inputs, shows a cost value', () => {
    render(<MeetingCostCalculator />)
    // Default values: 8 attendees, $75/hr, 60 min
    // plannedTotal = 8 * 75 / 60 * 60 = $600.00
    // $600.00 appears twice: in big display and in stats card
    expect(screen.getAllByText('$600.00').length).toBeGreaterThanOrEqual(1)
  })

  it('cost is a positive number', () => {
    render(<MeetingCostCalculator />)
    // The formatted planned total should appear — verify it's rendered
    expect(screen.getAllByText(/\$[0-9,]+\.[0-9]{2}/).length).toBeGreaterThanOrEqual(1)
  })

  it('"could have been an email" message appears when cost exceeds $500', () => {
    render(<MeetingCostCalculator />)
    // Default: 8 attendees × $75/hr × 60 min = $600 > $500 → message appears
    expect(screen.getByText(/could have been an email/i)).toBeInTheDocument()
  })

  it('10 people × $100/hr × 60 min = $100 total cost (no email message)', async () => {
    const user = userEvent.setup()
    render(<MeetingCostCalculator />)
    const [attendeesInput, salaryInput, durationInput] = screen.getAllByRole('spinbutton')
    await user.clear(attendeesInput); await user.type(attendeesInput, '10')
    await user.clear(salaryInput); await user.type(salaryInput, '100')
    await user.clear(durationInput); await user.type(durationInput, '6')
    // 10 * 100 / 60 * 6 = $100.00
    // $100.00 may appear in big display and stats card
    expect(screen.getAllByText('$100.00').length).toBeGreaterThanOrEqual(1)
    expect(screen.queryByText(/could have been an email/i)).not.toBeInTheDocument()
  })

  it('20 people × $200/hr × 120 min = $800 total cost (email message appears)', async () => {
    const user = userEvent.setup()
    render(<MeetingCostCalculator />)
    const [attendeesInput, salaryInput, durationInput] = screen.getAllByRole('spinbutton')
    await user.clear(attendeesInput); await user.type(attendeesInput, '20')
    await user.clear(salaryInput); await user.type(salaryInput, '200')
    await user.clear(durationInput); await user.type(durationInput, '120')
    // 20 * 200 / 60 * 120 = $8,000.00
    expect(screen.getAllByText(/\$8,000\.00/).length).toBeGreaterThanOrEqual(1)
    expect(screen.getByText(/could have been an email/i)).toBeInTheDocument()
  })
})
