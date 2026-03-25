import { vi } from 'vitest'

export const recordToolVisit = vi.fn()
export const getToolStats = vi.fn(() => ({
  visits: 0,
  lastVisited: null,
  firstVisited: null,
}))
export const getMostUsedTools = vi.fn(() => [])
export const getTotalVisits = vi.fn(() => 0)
export const getRecentVisits = vi.fn(() => [])
export const getDailyStats = vi.fn(() => ({}))
export const getAllStats = vi.fn(() => ({
  totalVisits: 0,
  tools: {},
  history: [],
  daily: {},
}))
export const getStreak = vi.fn(() => 0)
export const clearAllStats = vi.fn()
