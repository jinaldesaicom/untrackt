import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NumberBaseConverter from '../../../tools/dev/NumberBaseConverter.jsx'

describe('NumberBaseConverter', () => {
  it('converts decimal input into binary, hexadecimal, and octal outputs', async () => {
    const user = userEvent.setup()
    render(<NumberBaseConverter />)

    const input = screen.getByPlaceholderText(/0x2a, 0b101010/i)
    await user.clear(input)
    await user.type(input, '10')

    expect(screen.getByText('Decimal').nextSibling).toHaveTextContent('10')
    expect(screen.getByText('Binary').nextSibling).toHaveTextContent('0000 1010')
    expect(screen.getByText('Hexadecimal').nextSibling).toHaveTextContent('A')
    expect(screen.getByText('Octal').nextSibling).toHaveTextContent('12')
  })

  it('detects prefixed binary and hex input and updates the manual converter', async () => {
    const user = userEvent.setup()
    render(<NumberBaseConverter />)

    const input = screen.getByPlaceholderText(/0x2a, 0b101010/i)
    await user.clear(input)
    await user.type(input, '0b1010')
    expect(screen.getByText(/detected base: 2/i)).toBeInTheDocument()
    expect(screen.getByText('Decimal').nextSibling).toHaveTextContent('10')

    await user.clear(input)
    await user.type(input, '0xFF')
    expect(screen.getByText(/detected base: 16/i)).toBeInTheDocument()
    expect(screen.getByText('Decimal').nextSibling).toHaveTextContent('255')
  })
})
