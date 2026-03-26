import { describe, it, expect, afterEach, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import React from 'react'
import { ThemeProvider, useTheme } from '../../hooks/useTheme.js'
import * as storage from '../../utils/storage'

vi.mock('../../utils/storage', () => ({
  getTheme: vi.fn(() => 'system'),
  setTheme: vi.fn(),
}))

function Wrapper({ children }) {
  return React.createElement(ThemeProvider, null, children)
}

describe('useTheme', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    storage.getTheme.mockReturnValue('system')
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
    }))
    document.documentElement.classList.remove('dark')
    delete document.documentElement.dataset.theme
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('returns theme, setTheme, and isDark properties', () => {
    const { result } = renderHook(() => useTheme(), { wrapper: Wrapper })
    expect(result.current).toHaveProperty('theme')
    expect(result.current).toHaveProperty('setTheme')
    expect(result.current).toHaveProperty('isDark')
  })

  it('initializes theme to system when storage returns system', () => {
    storage.getTheme.mockReturnValue('system')
    const { result } = renderHook(() => useTheme(), { wrapper: Wrapper })
    expect(result.current.theme).toBe('system')
  })

  it('sets isDark to false when system prefers light mode', () => {
    window.matchMedia.mockImplementation((query) => ({
      matches: false,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))
    storage.getTheme.mockReturnValue('system')
    const { result } = renderHook(() => useTheme(), { wrapper: Wrapper })
    expect(result.current.isDark).toBe(false)
  })

  it('sets isDark to true when system prefers dark mode', () => {
    window.matchMedia.mockImplementation((query) => ({
      matches: true,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))
    storage.getTheme.mockReturnValue('system')
    const { result } = renderHook(() => useTheme(), { wrapper: Wrapper })
    expect(result.current.isDark).toBe(true)
  })

  it('sets isDark to true when stored theme is dark regardless of system preference', () => {
    window.matchMedia.mockImplementation((query) => ({
      matches: false,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))
    storage.getTheme.mockReturnValue('dark')
    const { result } = renderHook(() => useTheme(), { wrapper: Wrapper })
    expect(result.current.isDark).toBe(true)
  })

  it('sets isDark to false when stored theme is light regardless of system preference', () => {
    window.matchMedia.mockImplementation((query) => ({
      matches: true,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))
    storage.getTheme.mockReturnValue('light')
    const { result } = renderHook(() => useTheme(), { wrapper: Wrapper })
    expect(result.current.isDark).toBe(false)
  })

  it('calls storage.setTheme when setTheme is called with dark', () => {
    storage.getTheme.mockReturnValue('system')
    const { result } = renderHook(() => useTheme(), { wrapper: Wrapper })
    act(() => {
      result.current.setTheme('dark')
    })
    expect(storage.setTheme).toHaveBeenCalledWith('dark')
  })

  it('adds dark class to document.documentElement when setTheme is called with dark', () => {
    storage.getTheme.mockReturnValue('system')
    const { result } = renderHook(() => useTheme(), { wrapper: Wrapper })
    expect(document.documentElement.classList.contains('dark')).toBe(false)
    act(() => {
      result.current.setTheme('dark')
    })
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('removes dark class from document.documentElement when setTheme is called with light', () => {
    document.documentElement.classList.add('dark')
    storage.getTheme.mockReturnValue('light')
    const { result } = renderHook(() => useTheme(), { wrapper: Wrapper })
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })

  it('adds dark class on mount when stored theme is dark', () => {
    storage.getTheme.mockReturnValue('dark')
    renderHook(() => useTheme(), { wrapper: Wrapper })
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('removes dark class on mount when stored theme is light', () => {
    document.documentElement.classList.add('dark')
    storage.getTheme.mockReturnValue('light')
    renderHook(() => useTheme(), { wrapper: Wrapper })
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })
})
