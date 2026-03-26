import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BackToTop from '../../components/BackToTop.jsx'

describe('BackToTop', () => {
  beforeEach(() => {
    vi.spyOn(window, 'scrollTo').mockImplementation(() => {})
    vi.spyOn(window, 'addEventListener')
    vi.spyOn(window, 'removeEventListener')
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('is not visible when page is at top (scrollY = 0)', () => {
    window.scrollY = 0
    const { container } = render(<BackToTop />)
    expect(container.firstChild).toBeNull()
  })

  it('is visible when user scrolls past 400px', () => {
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      value: 500,
    })
    render(<BackToTop />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('is not visible below 400px scroll', () => {
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      value: 300,
    })
    const { container } = render(<BackToTop />)
    expect(container.firstChild).toBeNull()
  })

  it('clicking button calls window.scrollTo', async () => {
    const user = userEvent.setup()
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      value: 500,
    })
    render(<BackToTop />)
    await user.click(screen.getByRole('button'))
    expect(window.scrollTo).toHaveBeenCalled()
  })

  it('window.scrollTo called with correct parameters', async () => {
    const user = userEvent.setup()
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      value: 500,
    })
    render(<BackToTop />)
    await user.click(screen.getByRole('button'))
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })
  })

  it('button has aria-label for accessibility', () => {
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      value: 500,
    })
    render(<BackToTop />)
    expect(screen.getByRole('button')).toHaveAttribute(
      'aria-label',
      'Back to top'
    )
  })

  it('button has appropriate CSS classes for styling', () => {
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      value: 500,
    })
    render(<BackToTop />)
    const button = screen.getByRole('button')
    expect(button.className).toContain('fixed')
    expect(button.className).toContain('bottom-5')
    expect(button.className).toContain('right-5')
  })

  it('registers scroll event listener on mount', () => {
    render(<BackToTop />)
    expect(window.addEventListener).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function),
      { passive: true }
    )
  })

  it('removes scroll event listener on unmount', () => {
    const { unmount } = render(<BackToTop />)
    unmount()
    expect(window.removeEventListener).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function)
    )
  })

  it('renders icon inside button', () => {
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      value: 500,
    })
    const { container } = render(<BackToTop />)
    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })
})
