import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import UnixTimestampConverter from '../../../tools/dev/UnixTimestampConverter.jsx'

describe('UnixTimestampConverter', () => {
  beforeEach(() => {
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: vi.fn() },
      configurable: true,
    })
  })

  it('renders the live current timestamp, input field, and current timestamp shortcut', () => {
    render(<UnixTimestampConverter />)

    expect(screen.getByText(/current unix timestamp:/i).textContent).toMatch(/\d+/)
    expect(screen.getByPlaceholderText(/1711270000/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /use current timestamp/i })).toBeInTheDocument()
  })

  it('converts a valid timestamp into local, utc, iso, and relative outputs with copy buttons', async () => {
    const user = userEvent.setup()
    render(<UnixTimestampConverter />)

    await user.type(screen.getByPlaceholderText(/1711270000/i), '1711270000')

    expect(screen.getByText(/local time/i)).toBeInTheDocument()
    expect(screen.getByText(/utc time/i)).toBeInTheDocument()
    expect(screen.getByText(/iso 8601/i)).toBeInTheDocument()
    expect(screen.getByText(/relative/i)).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: /copy/i }).length).toBeGreaterThanOrEqual(5)
  })

  it('fills the input from the current timestamp button and supports reverse mode', async () => {
    const user = userEvent.setup()
    render(<UnixTimestampConverter />)

    await user.click(screen.getByRole('button', { name: /use current timestamp/i }))
    expect(String(screen.getByPlaceholderText(/1711270000/i).value)).toMatch(/^\d+$/)

    await user.type(screen.getByDisplayValue(''), '2026-03-24T12:30')
    expect(screen.getByText(/unix \(seconds\)/i).parentElement).toHaveTextContent(/\d{10}/)
  })
})
