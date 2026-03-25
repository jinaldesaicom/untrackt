import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import { render, waitFor } from '@testing-library/react'
import React from 'react'
import useAnnouncer, { AnnouncerProvider } from '../../hooks/useAnnouncer.jsx'

function Wrapper({ children }) {
  return React.createElement(AnnouncerProvider, null, children)
}

describe('useAnnouncer', () => {
  beforeEach(() => {
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => {
      callback()
      return 1
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('returns announce and announceUrgent functions', () => {
    const { result } = renderHook(() => useAnnouncer(), { wrapper: Wrapper })
    expect(result.current).toHaveProperty('announce')
    expect(result.current).toHaveProperty('announceUrgent')
  })

  it('announce creates element with aria-live polite', () => {
    const { container } = render(React.createElement(AnnouncerProvider, null, React.createElement(TestComponent)))
    const liveRegion = container.querySelector('[aria-live="polite"]')
    expect(liveRegion).toBeInTheDocument()
  })

  it('announceUrgent creates element with aria-live assertive', () => {
    const { container } = render(React.createElement(AnnouncerProvider, null, React.createElement(TestComponent)))
    const liveRegion = container.querySelector('[aria-live="assertive"]')
    expect(liveRegion).toBeInTheDocument()
  })

  it('announce puts message text in the polite region', async () => {
    const { container } = render(React.createElement(AnnouncerProvider, null, React.createElement(AnounceTest)))
    const politeRegion = container.querySelector('[aria-live="polite"]')
    await waitFor(() => {
      expect(politeRegion.textContent).toContain('Test message')
    })
  })

  it('announceUrgent puts message text in the assertive region', async () => {
    const { container } = render(React.createElement(AnnouncerProvider, null, React.createElement(AnounceUrgentTest)))
    const assertiveRegion = container.querySelector('[aria-live="assertive"]')
    await waitFor(() => {
      expect(assertiveRegion.textContent).toContain('Urgent message')
    })
  })

  it('updates live region text with new message', () => {
    const { container, rerender } = render(
      React.createElement(AnnouncerProvider, null, React.createElement(UpdateTest, { message: 'First' }))
    )
    const politeRegion = container.querySelector('[aria-live="polite"]')
    expect(politeRegion.textContent).toContain('First')
    rerender(
      React.createElement(AnnouncerProvider, null, React.createElement(UpdateTest, { message: 'Second' }))
    )
    expect(politeRegion.textContent).toContain('Second')
  })

  it('live region has sr-only class for screen reader only visibility', () => {
    const { container } = render(React.createElement(AnnouncerProvider, null, React.createElement(TestComponent)))
    const liveRegion = container.querySelector('[aria-live="polite"]')
    expect(liveRegion).toHaveClass('sr-only')
  })
})

function TestComponent() {
  return React.createElement('div', null, 'Test')
}

function AnounceTest() {
  const { announce } = useAnnouncer()
  React.useEffect(() => {
    announce('Test message')
  }, [announce])
  return React.createElement('div', null, 'Content')
}

function AnounceUrgentTest() {
  const { announceUrgent } = useAnnouncer()
  React.useEffect(() => {
    announceUrgent('Urgent message')
  }, [announceUrgent])
  return React.createElement('div', null, 'Content')
}

function UpdateTest({ message }) {
  const { announce } = useAnnouncer()
  React.useEffect(() => {
    announce(message)
  }, [announce, message])
  return React.createElement('div', null, 'Content')
}
