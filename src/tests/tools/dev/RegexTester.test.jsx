import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import RegexTester from '../../../tools/dev/RegexTester.jsx'

describe('RegexTester', () => {
  it('renders the pattern and test string inputs with all regex flags', () => {
    render(<RegexTester />)

    expect(screen.getByPlaceholderText(/e\.g\./i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/paste or type text to test matches/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/^g$/i)).toBeChecked()
    expect(screen.getByLabelText(/^i$/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/^m$/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/^s$/i)).toBeInTheDocument()
  })

  it('counts matches, supports presets, and respects the case-insensitive flag', async () => {
    const user = userEvent.setup()
    render(<RegexTester />)

    const pattern = screen.getByPlaceholderText(/e\.g\./i)
    const text = screen.getByPlaceholderText(/paste or type text to test matches/i)

    await user.type(pattern, 'hello')
    await user.type(text, 'hello world hello')
    expect(screen.getByText(/2 matches/i)).toBeInTheDocument()

    await user.clear(pattern)
    await user.click(screen.getByRole('button', { name: /email/i }))
    expect(pattern).toHaveValue('^[\\w.-]+@[\\w.-]+\\.[A-Za-z]{2,}$')

    await user.clear(pattern)
    await user.click(screen.getByLabelText(/^g$/i))
    await user.click(screen.getByLabelText(/^i$/i))
    await user.type(pattern, 'HELLO')
    await user.clear(text)
    await user.type(text, 'hello world')
    expect(screen.getByText(/1 matches/i)).toBeInTheDocument()
  })

  it('shows an error message and red styling for invalid regular expressions', async () => {
    const user = userEvent.setup()
    render(<RegexTester />)

    const pattern = screen.getByPlaceholderText(/e\.g\./i)
    await user.click(pattern)
    await user.paste('[')

    expect(screen.getByText(/unterminated character class|invalid regular expression/i)).toBeInTheDocument()
    expect(pattern).toHaveClass('border-red-500')
  })
})
