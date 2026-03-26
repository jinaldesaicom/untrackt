import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Base64Tool from '../../../tools/dev/Base64Tool.jsx'

describe('Base64Tool', () => {
  it('renders in Encode mode by default', () => {
    render(<Base64Tool />)
    // Button text is lowercase: {m} where m = 'encode'
    expect(screen.getByRole('button', { name: /^encode$/i })).toBeInTheDocument()
    expect(screen.getByText('Plain Text Input')).toBeInTheDocument()
  })

  it('typing in input encodes to Base64 in output', async () => {
    const user = userEvent.setup()
    render(<Base64Tool />)
    const input = screen.getByPlaceholderText(/enter text to encode/i)
    await user.type(input, 'hello')
    // btoa('hello') = 'aGVsbG8='
    const outputTextarea = screen.getByPlaceholderText(/output will appear here/i)
    expect(outputTextarea.value).toBe('aGVsbG8=')
  })

  it('switching to Decode mode decodes Base64 input', async () => {
    const user = userEvent.setup()
    render(<Base64Tool />)
    await user.click(screen.getByRole('button', { name: /decode/i }))
    expect(screen.getByText('Base64 Input')).toBeInTheDocument()
    const input = screen.getByPlaceholderText(/enter base64 to decode/i)
    await user.type(input, 'aGVsbG8=')
    const outputTextarea = screen.getByPlaceholderText(/output will appear here/i)
    expect(outputTextarea.value).toBe('hello')
  })

  it('invalid Base64 input in Decode mode shows error', async () => {
    const user = userEvent.setup()
    render(<Base64Tool />)
    await user.click(screen.getByRole('button', { name: /decode/i }))
    const input = screen.getByPlaceholderText(/enter base64 to decode/i)
    await user.type(input, '!!!invalid!!!')
    expect(screen.getByText(/invalid base64/i)).toBeInTheDocument()
  })

  it('Copy button is present on output when there is content', async () => {
    const user = userEvent.setup()
    render(<Base64Tool />)
    const input = screen.getByPlaceholderText(/enter text to encode/i)
    await user.type(input, 'test')
    expect(screen.getByRole('button', { name: /copy/i })).toBeInTheDocument()
  })
})
