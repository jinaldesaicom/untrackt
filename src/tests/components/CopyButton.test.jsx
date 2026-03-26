import { render, screen, act } from '@testing-library/react'
import CopyButton from '../../components/CopyButton.jsx'

describe('CopyButton', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: vi.fn().mockResolvedValue(undefined) },
      configurable: true,
    })
    document.execCommand = vi.fn().mockReturnValue(true)
    window.alert = vi.fn()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders, copies the provided text, shows success feedback, and resets after two seconds', async () => {
    render(<CopyButton text="secret value" label="Copy result" />)

    screen.getByRole('button', { name: /copy result/i }).click()

    await act(async () => {
      await Promise.resolve()
    })

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('secret value')
    expect(screen.getByRole('button', { name: /copied/i })).toBeInTheDocument()

    await act(async () => {
      vi.advanceTimersByTime(2000)
    })

    expect(screen.getByRole('button', { name: /copy result/i })).toBeInTheDocument()
  })

  it('falls back to execCommand when the clipboard api is unavailable', async () => {
    Object.defineProperty(navigator, 'clipboard', {
      value: undefined,
      configurable: true,
    })

    render(<CopyButton text="fallback value" label="Copy" />)
    act(() => {
      screen.getByRole('button', { name: /^copy$/i }).click()
    })

    await act(async () => {
      await Promise.resolve()
    })

    expect(document.execCommand).toHaveBeenCalledWith('copy')
    expect(screen.getByRole('button', { name: /copied/i })).toBeInTheDocument()
  })
})
