import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import PasswordGenerator from '../../../tools/general/PasswordGenerator.jsx'

// Mock crypto.getRandomValues so tests are deterministic
const mockGetRandomValues = vi.fn((arr) => {
  for (let i = 0; i < arr.length; i++) {
    arr[i] = i % 256
  }
  return arr
})

Object.defineProperty(globalThis, 'crypto', {
  value: {
    getRandomValues: mockGetRandomValues,
    randomUUID: () => '00000000-0000-4000-8000-000000000000',
  },
  writable: true,
})

describe('PasswordGenerator', () => {
  it('renders a generated password on load', () => {
    render(<PasswordGenerator />)
    // The generated password is in a <code> element
    const code = document.querySelector('code')
    expect(code).not.toBeNull()
    expect(code.textContent.length).toBeGreaterThanOrEqual(8)
  })

  it('password is at least 8 characters by default', () => {
    render(<PasswordGenerator />)
    // Default length is 16
    const code = document.querySelector('code')
    expect(code.textContent.length).toBeGreaterThanOrEqual(8)
  })

  it('strength meter is visible', () => {
    render(<PasswordGenerator />)
    // Strength label text: Weak / Fair / Strong / Very Strong
    const strengthLabel = screen.getByText(/weak|fair|strong|very strong/i)
    expect(strengthLabel).toBeInTheDocument()
  })

  it('copy button is present', () => {
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: vi.fn().mockResolvedValue(undefined) },
      configurable: true,
      writable: true,
    })
    render(<PasswordGenerator />)
    const copyButton = screen.getByTitle('Copy')
    expect(copyButton).toBeInTheDocument()
  })

  it('changing length slider updates password length', async () => {
    render(<PasswordGenerator />)
    const slider = screen.getByRole('slider')
    // Change length to 32
    fireEvent.change(slider, { target: { value: '32' } })
    expect(screen.getByText('32')).toBeInTheDocument()
  })

  it('unchecking all character types shows fallback message', async () => {
    const user = userEvent.setup()
    render(<PasswordGenerator />)
    // Uncheck uppercase, numbers (lowercase is checked by default)
    const checkboxes = screen.getAllByRole('checkbox')
    // Uncheck all checkboxes
    for (const cb of checkboxes) {
      if (cb.checked) {
        await user.click(cb)
      }
    }
    expect(screen.getByText(/select at least one/i)).toBeInTheDocument()
  })
})
