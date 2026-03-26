import { getItem, setItem, removeItem } from './storage.js'

const STATS_KEY = 'untrackt:localStats'
const MAX_HISTORY = 500
const MAX_DAILY_KEYS = 365

function getTodayKey(date = new Date()) {
  return date.toISOString().slice(0, 10)
}

function readStats() {
  const empty = {
    totalVisits: 0,
    tools: {},
    history: [],
    daily: {},
  }
  const value = getItem(STATS_KEY, empty)
  if (!value || typeof value !== 'object') return empty
  return {
    totalVisits: Number.isFinite(value.totalVisits) ? value.totalVisits : 0,
    tools: value.tools && typeof value.tools === 'object' ? value.tools : {},
    history: Array.isArray(value.history) ? value.history : [],
    daily: value.daily && typeof value.daily === 'object' ? value.daily : {},
  }
}

function trimDailyStats(daily) {
  const keys = Object.keys(daily).sort()
  if (keys.length <= MAX_DAILY_KEYS) return daily
  const trimmed = {}
  keys.slice(-MAX_DAILY_KEYS).forEach((key) => { trimmed[key] = daily[key] })
  return trimmed
}

function writeStats(stats) {
  // Cap history and daily to prevent unbounded growth
  stats.history = stats.history.slice(0, MAX_HISTORY)
  stats.daily = trimDailyStats(stats.daily)
  setItem(STATS_KEY, stats)
}

export function recordToolVisit(toolId) {
  if (!toolId) return

  const stats = readStats()
  const now = new Date().toISOString()
  const today = getTodayKey()
  const existing = stats.tools[toolId] || {
    visits: 0,
    firstVisited: now,
    lastVisited: now,
  }

  stats.totalVisits += 1
  stats.tools[toolId] = {
    visits: existing.visits + 1,
    firstVisited: existing.firstVisited || now,
    lastVisited: now,
  }
  stats.history = [{ toolId, timestamp: now }, ...stats.history].slice(0, 500)
  stats.daily[today] = (stats.daily[today] || 0) + 1

  writeStats(stats)
}

export function getToolStats(toolId) {
  const stats = readStats()
  const current = stats.tools[toolId]
  if (!current) {
    return { visits: 0, lastVisited: null, firstVisited: null }
  }
  return {
    visits: Number(current.visits) || 0,
    lastVisited: current.lastVisited || null,
    firstVisited: current.firstVisited || null,
  }
}

export function getMostUsedTools(limit = 5) {
  const stats = readStats()
  return Object.entries(stats.tools)
    .map(([toolId, info]) => ({
      toolId,
      visits: Number(info?.visits) || 0,
      lastVisited: info?.lastVisited || null,
    }))
    .sort((a, b) => b.visits - a.visits)
    .slice(0, limit)
}

export function getTotalVisits() {
  return readStats().totalVisits
}

export function getRecentVisits(limit = 10) {
  return readStats().history.slice(0, limit)
}

export function getDailyStats() {
  return readStats().daily
}

export function getAllStats() {
  return readStats()
}

export function getStreak() {
  const daily = readStats().daily
  const keys = new Set(Object.keys(daily).filter((day) => (daily[day] || 0) > 0))
  if (keys.size === 0) return 0

  let streak = 0
  const cursor = new Date()
  while (true) {
    const key = getTodayKey(cursor)
    if (!keys.has(key)) break
    streak += 1
    cursor.setDate(cursor.getDate() - 1)
  }
  return streak
}

export function clearAllStats() {
  removeItem(STATS_KEY)
}
