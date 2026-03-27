import { renderHook, act } from '@testing-library/react'
import usePrefetchTool from '../../hooks/usePrefetchTool'

describe('usePrefetchTool', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('returns prefetch and cancelPrefetch functions', () => {
    const { result } = renderHook(() => usePrefetchTool('json-formatter'))
    expect(result.current).toHaveProperty('prefetch')
    expect(result.current).toHaveProperty('cancelPrefetch')
    expect(typeof result.current.prefetch).toBe('function')
    expect(typeof result.current.cancelPrefetch).toBe('function')
  })

  it('triggers dynamic import after 100ms delay', () => {
    const { result } = renderHook(() => usePrefetchTool('json-formatter'))
    const spy = vi.spyOn(window, 'setTimeout')
    act(() => {
      result.current.prefetch()
    })
    expect(spy).toHaveBeenCalledWith(expect.any(Function), 100)
    vi.advanceTimersByTime(100)
    spy.mockRestore()
  })

  it('does not trigger import if prefetch cancelled before delay', () => {
    const { result } = renderHook(() => usePrefetchTool('json-formatter'))
    const spy = vi.spyOn(window, 'setTimeout')
    act(() => {
      result.current.prefetch()
    })
    act(() => {
      result.current.cancelPrefetch()
    })
    vi.advanceTimersByTime(100)
    expect(spy).toHaveBeenCalled()
    spy.mockRestore()
  })

  it('does not throw for unknown tool ID', () => {
    const { result } = renderHook(() => usePrefetchTool('unknown-tool-xyz'))
    expect(() => {
      act(() => {
        result.current.prefetch()
      })
      vi.advanceTimersByTime(100)
    }).not.toThrow()
  })

  it('resets timer on multiple prefetch calls', () => {
    const { result } = renderHook(() => usePrefetchTool('json-formatter'))
    const spy = vi.spyOn(window, 'setTimeout')
    act(() => {
      result.current.prefetch()
    })
    expect(spy).toHaveBeenCalledTimes(1)
    act(() => {
      result.current.prefetch()
    })
    expect(spy).toHaveBeenCalledTimes(2)
    vi.advanceTimersByTime(100)
    spy.mockRestore()
  })
})
