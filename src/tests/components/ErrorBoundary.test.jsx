import { render, screen } from '@testing-library/react'
import ErrorBoundary from '../../components/ErrorBoundary.jsx'
import * as errorReporter from '../../utils/errorReporter'

vi.mock('../../utils/errorReporter', () => ({
  logError: vi.fn(),
}))

describe('ErrorBoundary', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.clearAllMocks()
    console.error.mockRestore()
  })

  it('renders children when no error thrown', () => {
    const { getByText } = render(
      <ErrorBoundary>
        <div>Working fine</div>
      </ErrorBoundary>
    )
    expect(getByText('Working fine')).toBeInTheDocument()
  })

  it('shows error UI when child throws', () => {
    const BrokenComponent = () => {
      throw new Error('Test error')
    }

    render(
      <ErrorBoundary>
        <BrokenComponent />
      </ErrorBoundary>
    )
    expect(screen.getByText('Something went wrong with this tool')).toBeInTheDocument()
  })

  it('error UI contains friendly message', () => {
    const BrokenComponent = () => {
      throw new Error('Test error')
    }

    render(
      <ErrorBoundary>
        <BrokenComponent />
      </ErrorBoundary>
    )
    expect(
      screen.getByText(/try refreshing/i)
    ).toBeInTheDocument()
  })

  it('error UI shows Report an issue element', () => {
    const BrokenComponent = () => {
      throw new Error('Test error')
    }

    render(
      <ErrorBoundary>
        <BrokenComponent />
      </ErrorBoundary>
    )
    expect(screen.getByText('Report an issue')).toBeInTheDocument()
  })

  it('calls errorReporter.logError when error caught', () => {
    const BrokenComponent = () => {
      throw new Error('Test error')
    }

    render(
      <ErrorBoundary>
        <BrokenComponent />
      </ErrorBoundary>
    )
    expect(errorReporter.logError).toHaveBeenCalled()
  })

  it('does not render error UI when no error occurs', () => {
    render(
      <ErrorBoundary>
        <div>Safe content</div>
      </ErrorBoundary>
    )
    expect(
      screen.queryByText('Something went wrong with this tool')
    ).not.toBeInTheDocument()
  })

  it('Report an issue link has correct email format', () => {
    const BrokenComponent = () => {
      throw new Error('Test error')
    }

    render(
      <ErrorBoundary>
        <BrokenComponent />
      </ErrorBoundary>
    )
    const link = screen.getByText('Report an issue')
    expect(link.href).toContain('mailto:support@untrackt.com')
  })

  it('error boundary UI includes icon for emergency signal', () => {
    const BrokenComponent = () => {
      throw new Error('Test error')
    }

    const { container } = render(
      <ErrorBoundary>
        <BrokenComponent />
      </ErrorBoundary>
    )
    const icon = container.querySelector('svg')
    expect(icon).toBeInTheDocument()
  })

  it('console.error called when error caught', () => {
    const BrokenComponent = () => {
      throw new Error('Test error')
    }

    render(
      <ErrorBoundary>
        <BrokenComponent />
      </ErrorBoundary>
    )
    expect(console.error).toHaveBeenCalled()
  })

  it('error message is included in error report link', () => {
    const BrokenComponent = () => {
      throw new Error('Specific error message')
    }

    render(
      <ErrorBoundary>
        <BrokenComponent />
      </ErrorBoundary>
    )
    const link = screen.getByText('Report an issue')
    expect(link.href).toContain('Specific%20error%20message')
  })
})
