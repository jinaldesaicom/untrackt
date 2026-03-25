import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import {
  recordToolVisit,
  getToolStats,
  getMostUsedTools,
  getTotalVisits,
  getStreak,
  clearAllStats,
} from '../../utils/localStats'
import * as storage from '../../utils/storage'

vi.mock('../../utils/storage', () => ({
  getItem: vi.fn((key, defaultValue) => defaultValue),
  setItem: vi.fn(),
  removeItem: vi.fn(),
}))

describe('localStats utility', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    storage.getItem.mockImplementation((key, defaultValue) => defaultValue)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('recordToolVisit increments visit count in storage', () => {
    let storedStats = {
      totalVisits: 0,
      tools: {},
      history: [],
      daily: {},
    }
    storage.getItem.mockImplementation((key, defaultValue) => {
      if (key === 'untrackt:localStats') return storedStats
      return defaultValue
    })
    storage.setItem.mockImplementation((key, value) => {
      if (key === 'untrackt:localStats') storedStats = value
    })

    recordToolVisit('json-formatter')
    expect(storage.setItem).toHaveBeenCalled()
  })

  it('recordToolVisit called twice increments visit count to 2', () => {
    let storedStats = {
      totalVisits: 0,
      tools: {},
      history: [],
      daily: {},
    }
    storage.getItem.mockImplementation((key, defaultValue) => {
      if (key === 'untrackt:localStats') return storedStats
      return defaultValue
    })
    storage.setItem.mockImplementation((key, value) => {
      if (key === 'untrackt:localStats') storedStats = value
    })

    recordToolVisit('json-formatter')
    recordToolVisit('json-formatter')
    expect(storage.setItem).toHaveBeenCalledTimes(2)
  })

  it('getToolStats returns visits, lastVisited, firstVisited for a tool', () => {
    const mockStats = {
      totalVisits: 1,
      tools: {
        'json-formatter': {
          visits: 1,
          firstVisited: '2026-01-01T00:00:00.000Z',
          lastVisited: '2026-01-01T00:00:00.000Z',
        },
      },
      history: [],
      daily: {},
    }
    storage.getItem.mockReturnValue(mockStats)

    const stats = getToolStats('json-formatter')
    expect(stats).toHaveProperty('visits')
    expect(stats).toHaveProperty('lastVisited')
    expect(stats).toHaveProperty('firstVisited')
  })

  it('getToolStats for unvisited tool returns zeros and nulls', () => {
    storage.getItem.mockReturnValue({
      totalVisits: 0,
      tools: {},
      history: [],
      daily: {},
    })

    const stats = getToolStats('unknown-tool')
    expect(stats.visits).toBe(0)
    expect(stats.lastVisited).toBeNull()
    expect(stats.firstVisited).toBeNull()
  })

  it('getMostUsedTools returns top N tools sorted by visits', () => {
    const mockStats = {
      totalVisits: 28,
      tools: {
        'json-formatter': { visits: 15, lastVisited: '2026-01-01T00:00:00.000Z' },
        'password-generator': { visits: 8, lastVisited: '2026-01-01T00:00:00.000Z' },
        'base64-tool': { visits: 5, lastVisited: '2026-01-01T00:00:00.000Z' },
      },
      history: [],
      daily: {},
    }
    storage.getItem.mockReturnValue(mockStats)

    const tools = getMostUsedTools(3)
    expect(tools).toHaveLength(3)
    expect(tools[0].toolId).toBe('json-formatter')
    expect(tools[0].visits).toBe(15)
    expect(tools[1].toolId).toBe('password-generator')
    expect(tools[2].toolId).toBe('base64-tool')
  })

  it('getMostUsedTools returns empty array when no visits recorded', () => {
    storage.getItem.mockReturnValue({
      totalVisits: 0,
      tools: {},
      history: [],
      daily: {},
    })

    const tools = getMostUsedTools(5)
    expect(tools).toEqual([])
  })

  it('getTotalVisits returns sum of all tool visit counts', () => {
    const mockStats = {
      totalVisits: 28,
      tools: {
        'json-formatter': { visits: 15 },
        'password-generator': { visits: 8 },
        'base64-tool': { visits: 5 },
      },
      history: [],
      daily: {},
    }
    storage.getItem.mockReturnValue(mockStats)

    expect(getTotalVisits()).toBe(28)
  })

  it('getStreak returns 1 after visiting today', () => {
    const today = new Date().toISOString().slice(0, 10)
    const mockStats = {
      totalVisits: 1,
      tools: {},
      history: [],
      daily: { [today]: 1 },
    }
    storage.getItem.mockReturnValue(mockStats)

    expect(getStreak()).toBe(1)
  })

  it('getStreak returns 0 if last visit was more than 1 day ago', () => {
    vi.useFakeTimers()
    const now = new Date('2026-01-10T00:00:00Z')
    vi.setSystemTime(now)

    const pastDay = '2026-01-08'
    const mockStats = {
      totalVisits: 1,
      tools: {},
      history: [],
      daily: { [pastDay]: 1 },
    }
    storage.getItem.mockReturnValue(mockStats)

    expect(getStreak()).toBe(0)
    vi.useRealTimers()
  })

  it('getStreak returns 2 for visits on 2 consecutive days', () => {
    vi.useFakeTimers()
    const now = new Date('2026-01-10T00:00:00Z')
    vi.setSystemTime(now)

    const today = '2026-01-10'
    const yesterday = '2026-01-09'
    const mockStats = {
      totalVisits: 2,
      tools: {},
      history: [],
      daily: { [today]: 1, [yesterday]: 1 },
    }
    storage.getItem.mockReturnValue(mockStats)

    expect(getStreak()).toBe(2)
    vi.useRealTimers()
  })

  it('clearAllStats removes all stats from storage', () => {
    clearAllStats()
    expect(storage.removeItem).toHaveBeenCalledWith('untrackt:localStats')
  })

  it('recordToolVisit stores timestamp of visit', () => {
    let storedStats = {
      totalVisits: 0,
      tools: {},
      history: [],
      daily: {},
    }
    storage.getItem.mockImplementation((key, defaultValue) => {
      if (key === 'untrackt:localStats') return storedStats
      return defaultValue
    })
    storage.setItem.mockImplementation((key, value) => {
      if (key === 'untrackt:localStats') storedStats = value
    })

    recordToolVisit('json-formatter')
    const callArgs = storage.setItem.mock.calls[0]
    const savedStats = callArgs[1]
    expect(savedStats.tools['json-formatter'].lastVisited).toBeDefined()
    expect(typeof savedStats.tools['json-formatter'].lastVisited).toBe('string')
  })
})
