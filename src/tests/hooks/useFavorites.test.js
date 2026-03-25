import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import React from 'react'
import { FavoritesProvider, useFavorites } from '../../hooks/useFavorites.js'
import * as storage from '../../utils/storage'

vi.mock('../../utils/storage', () => ({
  getFavorites: vi.fn(() => []),
  addFavorite: vi.fn(),
  removeFavorite: vi.fn(),
  clearFavorites: vi.fn(),
}))

function Wrapper({ children }) {
  return React.createElement(FavoritesProvider, null, children)
}

describe('useFavorites', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    storage.getFavorites.mockReturnValue([])
  })

  it('returns favorites, toggleFavorite, and isFavorite properties', () => {
    const { result } = renderHook(() => useFavorites(), { wrapper: Wrapper })
    expect(result.current).toHaveProperty('favorites')
    expect(result.current).toHaveProperty('toggleFavorite')
    expect(result.current).toHaveProperty('isFavorite')
    expect(result.current).toHaveProperty('clearFavorites')
  })

  it('initializes favorites as empty array when storage returns empty array', () => {
    storage.getFavorites.mockReturnValue([])
    const { result } = renderHook(() => useFavorites(), { wrapper: Wrapper })
    expect(result.current.favorites).toEqual([])
  })

  it('returns false from isFavorite when tool is not in favorites', () => {
    const { result } = renderHook(() => useFavorites(), { wrapper: Wrapper })
    expect(result.current.isFavorite('json-formatter')).toBe(false)
  })

  it('returns true from isFavorite when tool is in favorites', () => {
    storage.getFavorites.mockReturnValue(['json-formatter'])
    const { result } = renderHook(() => useFavorites(), { wrapper: Wrapper })
    expect(result.current.isFavorite('json-formatter')).toBe(true)
  })

  it('calls storage.addFavorite when toggling a new tool id', () => {
    storage.getFavorites.mockReturnValue([])
    const { result } = renderHook(() => useFavorites(), { wrapper: Wrapper })
    act(() => {
      result.current.toggleFavorite('json-formatter')
    })
    expect(storage.addFavorite).toHaveBeenCalledWith('json-formatter')
  })

  it('updates favorites list after toggle', async () => {
    storage.getFavorites.mockReturnValue([])
    const { result } = renderHook(() => useFavorites(), { wrapper: Wrapper })
    expect(result.current.favorites).toEqual([])
    act(() => {
      result.current.toggleFavorite('json-formatter')
    })
    expect(result.current.favorites).toEqual(['json-formatter'])
  })

  it('tracks multiple favorites correctly', () => {
    storage.getFavorites.mockReturnValue(['json-formatter', 'password-generator'])
    const { result } = renderHook(() => useFavorites(), { wrapper: Wrapper })
    expect(result.current.favorites).toHaveLength(2)
    expect(result.current.favorites).toContain('json-formatter')
    expect(result.current.favorites).toContain('password-generator')
  })

  it('initializes favorites from storage on mount', () => {
    storage.getFavorites.mockReturnValue(['base64-tool', 'uuid-generator'])
    const { result } = renderHook(() => useFavorites(), { wrapper: Wrapper })
    expect(result.current.favorites).toEqual(['base64-tool', 'uuid-generator'])
  })
})
