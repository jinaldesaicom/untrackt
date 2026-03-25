import { useEffect, useMemo, useState } from 'react'
import { getItem, removeItem, setItem } from '../../utils/storage.js'
import { Panel } from '../../components/ToolLayout.jsx'

export const PRODUCTIVITY_PRIVACY_NOTICE = 'Your data is saved in this browser only. It never leaves your device.'
export const PRODUCTIVITY_WARNING = 'Do not store passwords, financial data, health data, or personal identifiers in this tool.'

export function useStoredState(key, initialValue) {
  const [value, setValue] = useState(() => {
    const stored = getItem(key)
    return stored ?? (typeof initialValue === 'function' ? initialValue() : initialValue)
  })

  useEffect(() => {
    setItem(key, value)
  }, [key, value])

  return [value, setValue]
}

export function useDebouncedStoredState(key, initialValue, delay = 300) {
  const [value, setValue] = useState(() => {
    const stored = getItem(key)
    return stored ?? (typeof initialValue === 'function' ? initialValue() : initialValue)
  })

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setItem(key, value), delay)
    return () => window.clearTimeout(timeoutId)
  }, [delay, key, value])

  return [value, setValue]
}

export function ProductivityNotice({ storageKey, onClear }) {
  return (
    <Panel className="border-cyan-200 dark:border-cyan-800 bg-cyan-50 dark:bg-cyan-950/30">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-cyan-900 dark:text-cyan-200">{PRODUCTIVITY_PRIVACY_NOTICE}</p>
          <p className="mt-1 text-xs text-cyan-800/80 dark:text-cyan-300/80">{PRODUCTIVITY_WARNING}</p>
        </div>
        <button
          type="button"
          className="btn-secondary"
          onClick={() => {
            if (window.confirm('Clear all saved data for this tool?')) {
              if (storageKey) {
                removeItem(storageKey)
              }
              onClear?.()
            }
          }}
        >
          Clear all data
        </button>
      </div>
    </Panel>
  )
}

export function downloadTextFile(filename, text, mimeType = 'text/plain;charset=utf-8') {
  const blob = new Blob([text], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  anchor.click()
  URL.revokeObjectURL(url)
}

export function formatRelativeTime(timestamp) {
  if (!timestamp) return 'Not saved yet'
  const deltaMs = Date.now() - timestamp
  const seconds = Math.max(0, Math.round(deltaMs / 1000))
  if (seconds < 5) return 'Saved just now'
  if (seconds < 60) return `Saved ${seconds}s ago`
  const minutes = Math.round(seconds / 60)
  if (minutes < 60) return `Saved ${minutes}m ago`
  const hours = Math.round(minutes / 60)
  return `Saved ${hours}h ago`
}

export function playBeep() {
  const AudioCtor = window.AudioContext || window.webkitAudioContext
  if (!AudioCtor) return

  const context = new AudioCtor()
  const oscillator = context.createOscillator()
  const gain = context.createGain()
  oscillator.type = 'sine'
  oscillator.frequency.value = 880
  oscillator.connect(gain)
  gain.connect(context.destination)
  gain.gain.setValueAtTime(0.2, context.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.25)
  oscillator.start()
  oscillator.stop(context.currentTime + 0.25)
}

export function keepLastItems(items, maxItems) {
  return [...items].slice(-maxItems)
}

export function useFilteredItems(items, query, selector) {
  return useMemo(() => {
    const normalized = String(query || '').trim().toLowerCase()
    if (!normalized) return items
    return items.filter((item) => selector(item).toLowerCase().includes(normalized))
  }, [items, query, selector])
}
