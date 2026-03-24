const RECENT_TOOLS_KEY = 'untrackt:recentTools'
const RECENT_SEARCHES_KEY = 'untrackt:recentSearches'
const THEME_KEY = 'untrackt:theme'
const FAVORITES_KEY = 'untrackt:favorites'

const VALID_THEMES = new Set(['light', 'dark', 'system'])

function canUseStorage() {
  try {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'
  } catch {
    return false
  }
}

export function getItem(key, defaultValue = null) {
  if (!canUseStorage()) return defaultValue
  try {
    const raw = window.localStorage.getItem(key)
    if (raw === null) return defaultValue
    return JSON.parse(raw)
  } catch {
    return defaultValue
  }
}

export function setItem(key, value) {
  if (!canUseStorage()) return
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Intentionally fail silently to keep tools fully usable without storage.
  }
}

export function removeItem(key) {
  if (!canUseStorage()) return
  try {
    window.localStorage.removeItem(key)
  } catch {
    // Intentionally fail silently.
  }
}

export function getRecentTools() {
  const tools = getItem(RECENT_TOOLS_KEY, [])
  return Array.isArray(tools) ? tools.slice(0, 6) : []
}

export function addRecentTool(toolId) {
  if (!toolId) return
  const current = getRecentTools()
  const next = [toolId, ...current.filter((id) => id !== toolId)].slice(0, 6)
  setItem(RECENT_TOOLS_KEY, next)
}

export function getRecentSearches() {
  const searches = getItem(RECENT_SEARCHES_KEY, [])
  return Array.isArray(searches) ? searches.slice(0, 3) : []
}

export function addRecentSearch(searchTerm) {
  const value = String(searchTerm || '').trim()
  if (!value) return
  const current = getRecentSearches()
  const next = [value, ...current.filter((item) => item !== value)].slice(0, 3)
  setItem(RECENT_SEARCHES_KEY, next)
}

export function getPreference(key, defaultValue = null) {
  return getItem(`untrackt:pref:${key}`, defaultValue)
}

export function setPreference(key, value) {
  setItem(`untrackt:pref:${key}`, value)
}

export function getTheme() {
  const theme = getItem(THEME_KEY, 'system')
  return VALID_THEMES.has(theme) ? theme : 'system'
}

export function setTheme(theme) {
  if (!VALID_THEMES.has(theme)) return
  setItem(THEME_KEY, theme)
}

export function getFavorites() {
  const favorites = getItem(FAVORITES_KEY, [])
  return Array.isArray(favorites) ? favorites.filter(Boolean) : []
}

export function addFavorite(toolId) {
  if (!toolId) return getFavorites()
  const current = getFavorites()
  if (current.includes(toolId)) return current
  const next = [...current, toolId]
  setItem(FAVORITES_KEY, next)
  return next
}

export function removeFavorite(toolId) {
  const next = getFavorites().filter((id) => id !== toolId)
  setItem(FAVORITES_KEY, next)
  return next
}

export function isFavorite(toolId) {
  return getFavorites().includes(toolId)
}

export function toggleFavorite(toolId) {
  return isFavorite(toolId) ? removeFavorite(toolId) : addFavorite(toolId)
}

export function clearFavorites() {
  setItem(FAVORITES_KEY, [])
  return []
}

export function clearAllUntracktStorage() {
  if (!canUseStorage()) return
  Object.keys(window.localStorage).forEach((key) => {
    if (key.startsWith('untrackt:')) {
      window.localStorage.removeItem(key)
    }
  })
}
