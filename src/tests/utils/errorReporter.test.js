import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { logError, getErrorLog, clearErrorLog } from '../../utils/errorReporter'
import * as storage from '../../utils/storage'

vi.mock('../../utils/storage', () => ({
  getItem: vi.fn((key, defaultValue) => defaultValue),
  setItem: vi.fn(),
  removeItem: vi.fn(),
}))

describe('errorReporter utility', () => {
  beforeEach(() => {
    vi.resetAllMocks()
    vi.spyOn(console, 'error').mockImplementation(() => {})
    storage.getItem.mockImplementation((key, defaultValue) => defaultValue)
    storage.setItem.mockImplementation(() => {})
    storage.removeItem.mockImplementation(() => {})
  })

  afterEach(() => {
    vi.clearAllMocks()
    console.error.mockRestore()
  })

  it('logError calls console.error', () => {
    const error = new Error('Test error')
    logError(error, {})
    expect(console.error).toHaveBeenCalled()
  })

  it('logError stores error in storage', () => {
    const error = new Error('Test error')
    logError(error, {})
    expect(storage.setItem).toHaveBeenCalled()
  })

  it('logError stores max 10 errors and removes oldest', () => {
    let storedErrors = []
    storage.getItem.mockImplementation((key, defaultValue) => {
      if (key === 'untrackt:errorLog') return storedErrors
      return defaultValue
    })
    storage.setItem.mockImplementation((key, value) => {
      if (key === 'untrackt:errorLog') storedErrors = value
    })

    for (let i = 0; i < 12; i++) {
      logError(new Error(`Error ${i}`), {})
    }

    const callArgs = storage.setItem.mock.calls[storage.setItem.mock.calls.length - 1]
    const finalErrors = callArgs[1]
    expect(finalErrors.length).toBeLessThanOrEqual(10)
  })

  it('getErrorLog returns array of stored errors', () => {
    const mockErrors = [
      {
        timestamp: '2026-01-01T00:00:00.000Z',
        message: 'Error 1',
        stack: null,
        context: {},
      },
      {
        timestamp: '2026-01-01T00:00:01.000Z',
        message: 'Error 2',
        stack: null,
        context: {},
      },
    ]
    storage.getItem.mockReturnValue(mockErrors)

    const errors = getErrorLog()
    expect(Array.isArray(errors)).toBe(true)
    expect(errors).toHaveLength(2)
  })

  it('getErrorLog returns empty array when nothing stored', () => {
    storage.getItem.mockReturnValue([])
    const errors = getErrorLog()
    expect(errors).toEqual([])
  })

  it('clearErrorLog removes all errors from storage', () => {
    clearErrorLog()
    expect(storage.removeItem).toHaveBeenCalledWith('untrackt:errorLog')
  })

  it('each stored error has message, timestamp, and context fields', () => {
    let storedErrors = []
    storage.getItem.mockImplementation((key, defaultValue) => {
      if (key === 'untrackt:errorLog') return storedErrors
      return defaultValue
    })
    storage.setItem.mockImplementation((key, value) => {
      if (key === 'untrackt:errorLog') storedErrors = value
    })

    const error = new Error('Test error')
    const context = { userId: 123, action: 'test' }
    logError(error, context)

    const callArgs = storage.setItem.mock.calls[0]
    const savedErrors = callArgs[1]
    const savedError = savedErrors[0]

    expect(savedError).toHaveProperty('message')
    expect(savedError).toHaveProperty('timestamp')
    expect(savedError).toHaveProperty('context')
  })

  it('logError never throws even when localStorage is unavailable', () => {
    storage.setItem.mockImplementation(() => {
      throw new Error('localStorage unavailable')
    })

    expect(() => {
      logError(new Error('Test'), {})
    }).not.toThrow()
  })

  it('logError does not call fetch or external services', () => {
    const fetchSpy = vi.spyOn(global, 'fetch')
    logError(new Error('Test'), {})
    expect(fetchSpy).not.toHaveBeenCalled()
    fetchSpy.mockRestore()
  })

  it('logError accepts string errors as well as Error objects', () => {
    let storedErrors = []
    storage.getItem.mockImplementation((key, defaultValue) => {
      if (key === 'untrackt:errorLog') return storedErrors
      return defaultValue
    })
    storage.setItem.mockImplementation((key, value) => {
      if (key === 'untrackt:errorLog') storedErrors = value
    })

    logError('String error', {})
    const callArgs = storage.setItem.mock.calls[0]
    const savedErrors = callArgs[1]
    expect(savedErrors[0].message).toBe('String error')
  })
})
