import { render, screen, fireEvent, act } from '@testing-library/react'
import Toast from '../../components/Toast.jsx'
import useToast, { ToastProvider } from '../../hooks/useToast.jsx'

describe('Toast component', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  it('renders message text correctly', () => {
    const toast = { message: 'Test message', type: 'info', duration: 3000 }
    render(<Toast toast={toast} onDismiss={() => {}} />)
    expect(screen.getByText('Test message')).toBeInTheDocument()
  })

  it('success type has appropriate styling', () => {
    const toast = { message: 'Success!', type: 'success', duration: 3000 }
    const { container } = render(<Toast toast={toast} onDismiss={() => {}} />)
    const wrapper = container.querySelector('button')
    expect(wrapper.className).toContain('emerald')
  })

  it('error type has appropriate styling', () => {
    const toast = { message: 'Error!', type: 'error', duration: 3000 }
    const { container } = render(<Toast toast={toast} onDismiss={() => {}} />)
    const wrapper = container.querySelector('button')
    expect(wrapper.className).toContain('rose')
  })

  it('info type has appropriate styling', () => {
    const toast = { message: 'Info', type: 'info', duration: 3000 }
    const { container } = render(<Toast toast={toast} onDismiss={() => {}} />)
    const wrapper = container.querySelector('button')
    expect(wrapper.className).toContain('indigo')
  })

  it('clicking toast dismisses it', () => {
    const onDismiss = vi.fn()
    const toast = { message: 'Click me', type: 'info', duration: 3000 }
    render(<Toast toast={toast} onDismiss={onDismiss} />)
    fireEvent.click(screen.getByRole('alert'))
    expect(onDismiss).toHaveBeenCalled()
  })

  it('toast has role alert for accessibility', () => {
    const toast = { message: 'Test', type: 'info', duration: 3000 }
    render(<Toast toast={toast} onDismiss={() => {}} />)
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  it('toast auto-dismisses after duration expires', () => {
    const onDismiss = vi.fn()
    const toast = { message: 'Auto dismiss', type: 'info', duration: 3000 }
    render(<Toast toast={toast} onDismiss={onDismiss} />)
    vi.advanceTimersByTime(3000)
    expect(onDismiss).toHaveBeenCalled()
  })
})

describe('useToast hook', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  it('showToast adds a toast to the list', () => {
    const TestComponent = () => {
      const { showToast } = useToast()
      return (
        <button onClick={() => showToast({ message: 'Test' })}>
          Show Toast
        </button>
      )
    }
    const { getByText } = render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    )
    fireEvent.click(getByText('Show Toast'))
    expect(screen.getByText('Test')).toBeInTheDocument()
  })

  it('toast auto-dismisses after duration', () => {
    const TestComponent = () => {
      const { showToast } = useToast()
      return (
        <button onClick={() => showToast({ message: 'Dismiss me', duration: 1000 })}>
          Show
        </button>
      )
    }
    const { getByText, queryByText } = render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    )
    fireEvent.click(getByText('Show'))
    expect(getByText('Dismiss me')).toBeInTheDocument()
    act(() => {
      vi.advanceTimersByTime(1000)
    })
    expect(queryByText('Dismiss me')).not.toBeInTheDocument()
  })

  it('multiple toasts can be shown up to 3', () => {
    const TestComponent = () => {
      const { showToast } = useToast()
      return (
        <button
          onClick={() => {
            showToast({ message: 'Toast 1' })
            showToast({ message: 'Toast 2' })
            showToast({ message: 'Toast 3' })
          }}
        >
          Show 3
        </button>
      )
    }
    const { getByText } = render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    )
    fireEvent.click(getByText('Show 3'))
    expect(screen.getByText('Toast 1')).toBeInTheDocument()
    expect(screen.getByText('Toast 2')).toBeInTheDocument()
    expect(screen.getByText('Toast 3')).toBeInTheDocument()
  })

  it('showToast with type success sets correct type', () => {
    const TestComponent = () => {
      const { showToast } = useToast()
      return (
        <button
          onClick={() => showToast({ message: 'Success!', type: 'success' })}
        >
          Show
        </button>
      )
    }
    const { container, getByText } = render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    )
    fireEvent.click(getByText('Show'))
    const toast = container.querySelector('[role="alert"]')
    expect(toast.className).toContain('emerald')
  })

  it('dismissing a toast removes it from the list', () => {
    const TestComponent = () => {
      const { showToast } = useToast()
      return (
        <button
          onClick={() => showToast({ message: 'Dismiss me' })}
        >
          Show
        </button>
      )
    }
    const { getByText, queryByText } = render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    )
    fireEvent.click(getByText('Show'))
    expect(getByText('Dismiss me')).toBeInTheDocument()
    fireEvent.click(getByText('Dismiss me'))
    expect(queryByText('Dismiss me')).not.toBeInTheDocument()
  })
})
