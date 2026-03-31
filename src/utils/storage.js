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

// ── Status Pages Favorites ──────────────────
const STATUS_FAVORITES_KEY = 'untrackt:statusFavorites'
const RECENT_STATUS_KEY = 'untrackt:recentStatusPages'

export function getStatusFavorites() {
  const favorites = getItem(STATUS_FAVORITES_KEY, [])
  return Array.isArray(favorites) ? favorites.filter(Boolean) : []
}

export function addStatusFavorite(id) {
  if (!id) return
  const current = getStatusFavorites()
  if (current.includes(id)) return
  setItem(STATUS_FAVORITES_KEY, [...current, id])
}

export function removeStatusFavorite(id) {
  setItem(STATUS_FAVORITES_KEY, getStatusFavorites().filter((i) => i !== id))
}

export function isStatusFavorite(id) {
  return getStatusFavorites().includes(id)
}

export function toggleStatusFavorite(id) {
  if (isStatusFavorite(id)) {
    removeStatusFavorite(id)
  } else {
    addStatusFavorite(id)
  }
}

export function getRecentStatusPages() {
  const recent = getItem(RECENT_STATUS_KEY, [])
  return Array.isArray(recent) ? recent.slice(0, 8) : []
}

export function addRecentStatusPage(id) {
  if (!id) return
  const current = getRecentStatusPages()
  const next = [id, ...current.filter((i) => i !== id)].slice(0, 8)
  setItem(RECENT_STATUS_KEY, next)
}

// ── GitHub Stars Favorites ──────────────────
const GH_STARS_FAVORITES_KEY = 'untrackt:ghStarsFavorites'
const RECENT_GH_STARS_KEY = 'untrackt:recentGhStars'

export function getGhStarsFavorites() {
  const favorites = getItem(GH_STARS_FAVORITES_KEY, [])
  return Array.isArray(favorites) ? favorites.filter(Boolean) : []
}

export function addGhStarsFavorite(id) {
  if (!id) return
  const current = getGhStarsFavorites()
  if (current.includes(id)) return
  setItem(GH_STARS_FAVORITES_KEY, [...current, id])
}

export function removeGhStarsFavorite(id) {
  setItem(GH_STARS_FAVORITES_KEY, getGhStarsFavorites().filter((i) => i !== id))
}

export function isGhStarsFavorite(id) {
  return getGhStarsFavorites().includes(id)
}

export function getRecentGhStars() {
  const recent = getItem(RECENT_GH_STARS_KEY, [])
  return Array.isArray(recent) ? recent.slice(0, 8) : []
}

export function addRecentGhStar(id) {
  if (!id) return
  const current = getRecentGhStars()
  const next = [id, ...current.filter((i) => i !== id)].slice(0, 8)
  setItem(RECENT_GH_STARS_KEY, next)
}

// ── AI Learning Favorites ──────────────────
const AI_LEARNING_FAVORITES_KEY = 'untrackt:aiLearningFavorites'
const RECENT_AI_LEARNING_KEY = 'untrackt:recentAiLearning'

export function getAiLearningFavorites() {
  const favorites = getItem(AI_LEARNING_FAVORITES_KEY, [])
  return Array.isArray(favorites) ? favorites.filter(Boolean) : []
}

export function addAiLearningFavorite(id) {
  if (!id) return
  const current = getAiLearningFavorites()
  if (current.includes(id)) return
  setItem(AI_LEARNING_FAVORITES_KEY, [...current, id])
}

export function removeAiLearningFavorite(id) {
  setItem(AI_LEARNING_FAVORITES_KEY, getAiLearningFavorites().filter((i) => i !== id))
}

export function isAiLearningFavorite(id) {
  return getAiLearningFavorites().includes(id)
}

export function getRecentAiLearning() {
  const recent = getItem(RECENT_AI_LEARNING_KEY, [])
  return Array.isArray(recent) ? recent.slice(0, 8) : []
}

export function addRecentAiLearning(id) {
  if (!id) return
  const current = getRecentAiLearning()
  const next = [id, ...current.filter((i) => i !== id)].slice(0, 8)
  setItem(RECENT_AI_LEARNING_KEY, next)
}

// ── Cloud Certifications Favorites ──────────────────
const CERT_FAVORITES_KEY = 'untrackt:certFavorites'
const RECENT_CERTS_KEY = 'untrackt:recentCerts'

export function getCertFavorites() {
  const favorites = getItem(CERT_FAVORITES_KEY, [])
  return Array.isArray(favorites) ? favorites.filter(Boolean) : []
}

export function addCertFavorite(id) {
  if (!id) return
  const current = getCertFavorites()
  if (current.includes(id)) return
  setItem(CERT_FAVORITES_KEY, [...current, id])
}

export function removeCertFavorite(id) {
  setItem(CERT_FAVORITES_KEY, getCertFavorites().filter((i) => i !== id))
}

export function isCertFavorite(id) {
  return getCertFavorites().includes(id)
}

export function getRecentCerts() {
  const recent = getItem(RECENT_CERTS_KEY, [])
  return Array.isArray(recent) ? recent.slice(0, 8) : []
}

export function addRecentCert(id) {
  if (!id) return
  const current = getRecentCerts()
  const next = [id, ...current.filter((i) => i !== id)].slice(0, 8)
  setItem(RECENT_CERTS_KEY, next)
}

// ── System Design Favorites ──────────────────
const SD_FAVORITES_KEY = 'untrackt:sdFavorites'
const RECENT_SD_KEY = 'untrackt:recentSd'

export function getSdFavorites() {
  const favorites = getItem(SD_FAVORITES_KEY, [])
  return Array.isArray(favorites) ? favorites.filter(Boolean) : []
}

export function addSdFavorite(id) {
  if (!id) return
  const current = getSdFavorites()
  if (current.includes(id)) return
  setItem(SD_FAVORITES_KEY, [...current, id])
}

export function removeSdFavorite(id) {
  setItem(SD_FAVORITES_KEY, getSdFavorites().filter((i) => i !== id))
}

export function isSdFavorite(id) {
  return getSdFavorites().includes(id)
}

export function getRecentSd() {
  const recent = getItem(RECENT_SD_KEY, [])
  return Array.isArray(recent) ? recent.slice(0, 8) : []
}

export function addRecentSd(id) {
  if (!id) return
  const current = getRecentSd()
  const next = [id, ...current.filter((i) => i !== id)].slice(0, 8)
  setItem(RECENT_SD_KEY, next)
}

// ── Interview Prep Favorites ──────────────────
const IP_FAVORITES_KEY = 'untrackt:ipFavorites'
const RECENT_IP_KEY = 'untrackt:recentIp'

export function getIpFavorites() {
  const favorites = getItem(IP_FAVORITES_KEY, [])
  return Array.isArray(favorites) ? favorites.filter(Boolean) : []
}

export function addIpFavorite(id) {
  if (!id) return
  const current = getIpFavorites()
  if (current.includes(id)) return
  setItem(IP_FAVORITES_KEY, [...current, id])
}

export function removeIpFavorite(id) {
  setItem(IP_FAVORITES_KEY, getIpFavorites().filter((i) => i !== id))
}

export function isIpFavorite(id) {
  return getIpFavorites().includes(id)
}

export function getRecentIp() {
  const recent = getItem(RECENT_IP_KEY, [])
  return Array.isArray(recent) ? recent.slice(0, 8) : []
}

export function addRecentIp(id) {
  if (!id) return
  const current = getRecentIp()
  const next = [id, ...current.filter((i) => i !== id)].slice(0, 8)
  setItem(RECENT_IP_KEY, next)
}
