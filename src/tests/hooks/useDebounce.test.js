import { renderHook, act } from '@testing-library/react'
import useDebounce from '../../hooks/useDebounce.js'

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  it('returns initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('hello', 300))
    expect(result.current).toBe('hello')
  })

  it('does not update value before delay expires', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'hello', delay: 300 } }
    )
    rerender({ value: 'world', delay: 300 })
    act(() => {
      vi.advanceTimersByTime(100)
    })
    expect(result.current).toBe('hello')
  })

  it('updates value after delay expires', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'hello', delay: 300 } }
    )
    rerender({ value: 'world', delay: 300 })
    act(() => {
      vi.advanceTimersByTime(300)
    })
    expect(result.current).toBe('world')
  })

  it('resets timer when value changes before delay', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'hello', delay: 300 } }
    )
    rerender({ value: 'world', delay: 300 })
    act(() => {
      vi.advanceTimersByTime(200)
    })
    rerender({ value: 'foo', delay: 300 })
    act(() => {
      vi.advanceTimersByTime(200)
    })
    expect(result.current).toBe('hello')
    act(() => {
      vi.advanceTimersByTime(100)
    })
    expect(result.current).toBe('foo')
  })

  it('works with string values', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'test', delay: 300 } }
    )
    rerender({ value: 'debounced', delay: 300 })
    act(() => {
      vi.advanceTimersByTime(300)
    })
    expect(result.current).toBe('debounced')
  })

  it('works with number values', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 42, delay: 300 } }
    )
    rerender({ value: 100, delay: 300 })
    act(() => {
      vi.advanceTimersByTime(300)
    })
    expect(result.current).toBe(100)
  })

  it('works with object values', () => {
    const obj1 = { name: 'test' }
    const obj2 = { name: 'debounced' }
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: obj1, delay: 300 } }
    )
    rerender({ value: obj2, delay: 300 })
    act(() => {
      vi.advanceTimersByTime(300)
    })
    expect(result.current).toEqual(obj2)
  })

  it('cleans up timer on unmount to prevent memory leaks', () => {
    const { rerender, unmount } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'hello', delay: 300 } }
    )
    rerender({ value: 'world', delay: 300 })
    unmount()
    act(() => {
      vi.advanceTimersByTime(300)
    })
    expect(() => {
      vi.runAllTimers()
    }).not.toThrow()
  })
})
