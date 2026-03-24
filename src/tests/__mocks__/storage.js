import { vi } from 'vitest'

export const getItem = vi.fn((key, defaultValue = null) => defaultValue)
export const setItem = vi.fn()
export const removeItem = vi.fn()
export const getRecentTools = vi.fn(() => [])
export const addRecentTool = vi.fn()
export const getPreference = vi.fn((key, defaultValue = null) => defaultValue)
export const setPreference = vi.fn()
