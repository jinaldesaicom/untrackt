import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import UnitConverter from '../../../tools/student/UnitConverter.jsx'

describe('UnitConverter', () => {
  it('renders category tabs and converts common values', async () => {
    const user = userEvent.setup()
    render(<UnitConverter />)

    expect(screen.getByRole('button', { name: /length/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /temperature/i })).toBeInTheDocument()

    const [fromValue] = screen.getAllByRole('textbox')
    await user.clear(fromValue)
    await user.type(fromValue, '1')
    expect(screen.getByText(/1 km =/i)).toBeInTheDocument()
    expect(screen.getAllByText(/0\.621/i).length).toBeGreaterThan(0)
  })
})
