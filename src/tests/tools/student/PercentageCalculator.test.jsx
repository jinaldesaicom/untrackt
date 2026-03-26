import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PercentageCalculator from '../../../tools/student/PercentageCalculator.jsx'

describe('PercentageCalculator', () => {
  it('renders mode tabs and performs live calculations', async () => {
    const user = userEvent.setup()
    render(<PercentageCalculator />)

    expect(screen.getByRole('button', { name: /what is x% of y/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /x is what % of y/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /percentage change x to y/i })).toBeInTheDocument()

    const [x, y] = screen.getAllByRole('textbox')
    await user.type(x, '10')
    await user.type(y, '200')
    expect(screen.getByText(/20\.0000/)).toBeInTheDocument()
    expect(screen.getByText(/formula/i)).toBeInTheDocument()
  })
})
