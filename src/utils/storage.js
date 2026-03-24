const RECENT_TOOLS_KEY = 'untrackt:recentTools'

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

export function getPreference(key, defaultValue = null) {
  return getItem(`untrackt:pref:${key}`, defaultValue)
}

export function setPreference(key, value) {
  setItem(`untrackt:pref:${key}`, value)
}
