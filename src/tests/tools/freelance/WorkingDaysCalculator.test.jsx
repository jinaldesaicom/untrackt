import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import WorkingDaysCalculator from '../../../tools/freelance/WorkingDaysCalculator.jsx'

// Helper: get the Working Days number from the results
function getWorkingDays() {
  return screen.getByText('Working Days').closest('div').querySelector('p').textContent
}

describe('WorkingDaysCalculator', () => {
  it('renders start and end date inputs', () => {
    const { container } = render(<WorkingDaysCalculator />)
    const dateInputs = container.querySelectorAll('input[type="date"]')
    expect(dateInputs.length).toBeGreaterThanOrEqual(2)
    expect(screen.getByText('Start Date')).toBeInTheDocument()
    expect(screen.getByText('End Date')).toBeInTheDocument()
  })

  it('with same start and end date on a weekday → 1 working day', async () => {
    const { container } = render(<WorkingDaysCalculator />)
    // 2024-01-15 is a Monday
    const dateInputs = container.querySelectorAll('input[type="date"]')
    fireEvent.change(dateInputs[0], { target: { value: '2024-01-15' } })
    fireEvent.change(dateInputs[1], { target: { value: '2024-01-15' } })
    expect(getWorkingDays()).toBe('1')
  })

  it('with a full Monday-Friday week → 5 working days', async () => {
    const { container } = render(<WorkingDaysCalculator />)
    // 2024-01-15 (Mon) to 2024-01-19 (Fri)
    const dateInputs = container.querySelectorAll('input[type="date"]')
    fireEvent.change(dateInputs[0], { target: { value: '2024-01-15' } })
    fireEvent.change(dateInputs[1], { target: { value: '2024-01-19' } })
    expect(getWorkingDays()).toBe('5')
  })

  it('unchecking "exclude weekends" includes all 7 days', async () => {
    const user = userEvent.setup()
    const { container } = render(<WorkingDaysCalculator />)
    // Mon Jan 15 to Sun Jan 21 = 7 calendar days
    const dateInputs = container.querySelectorAll('input[type="date"]')
    fireEvent.change(dateInputs[0], { target: { value: '2024-01-15' } })
    fireEvent.change(dateInputs[1], { target: { value: '2024-01-21' } })
    const checkbox = screen.getByRole('checkbox', { name: /exclude weekends/i })
    await user.click(checkbox) // uncheck it
    // Now all 7 days count as working
    expect(getWorkingDays()).toBe('7')
  })

  it('adding a custom holiday reduces the working day count by 1', async () => {
    const user = userEvent.setup()
    const { container } = render(<WorkingDaysCalculator />)
    // Mon-Fri: 5 days
    const dateInputs = container.querySelectorAll('input[type="date"]')
    fireEvent.change(dateInputs[0], { target: { value: '2024-01-15' } })
    fireEvent.change(dateInputs[1], { target: { value: '2024-01-19' } })
    expect(getWorkingDays()).toBe('5')
    // Add 2024-01-15 as a holiday
    fireEvent.change(dateInputs[2], { target: { value: '2024-01-15' } })
    await user.click(screen.getByRole('button', { name: /add/i }))
    // Now should be 4 working days
    expect(getWorkingDays()).toBe('4')
  })
})
