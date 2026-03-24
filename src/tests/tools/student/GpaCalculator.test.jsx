import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import GpaCalculator from '../../../tools/student/GpaCalculator.jsx'

describe('GpaCalculator', () => {
  it('renders with default course rows', () => {
    render(<GpaCalculator />)
    // Should have at least one row with credits input
    const creditsInputs = screen.getAllByPlaceholderText('3')
    expect(creditsInputs.length).toBeGreaterThanOrEqual(1)
  })

  it('"Add Course" button adds a new row', async () => {
    const user = userEvent.setup()
    render(<GpaCalculator />)
    const before = screen.getAllByPlaceholderText('3').length
    await user.click(screen.getByRole('button', { name: /add course/i }))
    const after = screen.getAllByPlaceholderText('3').length
    expect(after).toBe(before + 1)
  })

  it('removing a course removes the row', async () => {
    const user = userEvent.setup()
    render(<GpaCalculator />)
    // Add a course first so we can safely remove one
    await user.click(screen.getByRole('button', { name: /add course/i }))
    const before = screen.getAllByPlaceholderText('3').length
    // Click the first delete button
    const deleteButtons = screen.getAllByRole('button').filter((btn) =>
      btn.querySelector('svg')
    )
    // The first non-add button should be a delete button — find by disabled state
    const trashButtons = screen.getAllByRole('button').filter(
      (btn) => !btn.textContent.includes('Add') && btn.tagName === 'BUTTON'
    )
    await user.click(trashButtons[0])
    const after = screen.getAllByPlaceholderText('3').length
    expect(after).toBe(before - 1)
  })

  it('calculates GPA: 1 course, 3 credits, grade A (4.0) → GPA = 4.00', async () => {
    const user = userEvent.setup()
    render(<GpaCalculator />)
    // Get the first credits input and set it to 3
    const creditsInputs = screen.getAllByPlaceholderText('3')
    await user.clear(creditsInputs[0])
    await user.type(creditsInputs[0], '3')
    // Grade defaults to A (4.0) so the GPA should be 4.00
    // The second course row has no credits, so only the first one counts
    expect(screen.getByText('4.00')).toBeInTheDocument()
  })

  it('calculates GPA: 2 courses, equal credits, grades A and C → GPA = 3.00', async () => {
    const user = userEvent.setup()
    render(<GpaCalculator />)
    const creditsInputs = screen.getAllByPlaceholderText('3')
    await user.clear(creditsInputs[0])
    await user.type(creditsInputs[0], '3')
    await user.clear(creditsInputs[1])
    await user.type(creditsInputs[1], '3')
    // Default grade is A (4.0) for both. Change second to C (2.0)
    const gradeSelects = screen.getAllByRole('combobox')
    // Set second course to "C (2.0)"
    await user.selectOptions(gradeSelects[1], '2')
    // GPA = (3*4.0 + 3*2.0) / 6 = 18/6 = 3.00
    expect(screen.getByText('3.00')).toBeInTheDocument()
  })

  it('total credits updates correctly', async () => {
    const user = userEvent.setup()
    render(<GpaCalculator />)
    const creditsInputs = screen.getAllByPlaceholderText('3')
    await user.clear(creditsInputs[0])
    await user.type(creditsInputs[0], '4')
    await user.clear(creditsInputs[1])
    await user.type(creditsInputs[1], '3')
    expect(screen.getByText('7')).toBeInTheDocument()
  })
})
