import { getItem, setItem, removeItem } from './storage.js'

const ERROR_LOG_KEY = 'untrackt:errorLog'
const MAX_ERRORS = 10

export function logError(error, context = {}) {
  const message = error instanceof Error ? error.message : String(error)
  const stack = error instanceof Error ? error.stack : null
  const entry = {
    timestamp: new Date().toISOString(),
    message,
    stack,
    context,
  }

  console.error('[UnTrackt Error]', entry)

  try {
    const current = getItem(ERROR_LOG_KEY, [])
    const next = [entry, ...(Array.isArray(current) ? current : [])].slice(0, MAX_ERRORS)
    setItem(ERROR_LOG_KEY, next)
  } catch {
    // Never allow client-side error logging to break the app flow.
  }
}

export function getErrorLog() {
  const value = getItem(ERROR_LOG_KEY, [])
  return Array.isArray(value) ? value : []
}

export function clearErrorLog() {
  removeItem(ERROR_LOG_KEY)
}
