import { vi } from 'vitest'

export const logError = vi.fn()
export const getErrorLog = vi.fn(() => [])
export const clearErrorLog = vi.fn()
