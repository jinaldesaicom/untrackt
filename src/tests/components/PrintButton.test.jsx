import { render, screen, act } from '@testing-library/react'
import PrintButton from '../../components/PrintButton.jsx'

describe('PrintButton', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    window.print = vi.fn()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders with its label, enters a preparing state, and calls window.print', async () => {
    render(<PrintButton label="Print / Save as PDF" />)

    const button = screen.getByRole('button', { name: /print \/ save as pdf/i })
    expect(button).toBeInTheDocument()

    act(() => {
      button.click()
    })
    expect(screen.getByRole('button', { name: /preparing pdf/i })).toBeDisabled()

    await act(async () => {
      vi.advanceTimersByTime(100)
    })

    expect(window.print).toHaveBeenCalledTimes(1)
    expect(screen.getByRole('button', { name: /print \/ save as pdf/i })).toBeEnabled()
  })
})
