import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import RomanNumeralConverter from '../../../tools/student/RomanNumeralConverter.jsx'

describe('RomanNumeralConverter', () => {
  it('converts between arabic and roman numerals and shows validation errors', async () => {
    const user = userEvent.setup()
    render(<RomanNumeralConverter />)

    const [arabic, roman] = screen.getAllByRole('textbox')
    await user.clear(arabic)
    await user.type(arabic, '2024')
    expect(roman).toHaveValue('MMXXIV')

    await user.clear(arabic)
    await user.type(arabic, '0')
    expect(screen.getByText(/enter 1 to 3,999,999/i)).toBeInTheDocument()
  })
})
