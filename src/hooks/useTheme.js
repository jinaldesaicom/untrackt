import { createContext, createElement, useContext, useEffect, useMemo, useState } from 'react'
import { getTheme as readTheme, setTheme as persistTheme } from '../utils/storage.js'

const ThemeContext = createContext({
  theme: 'system',
  setTheme: () => {},
  isDark: false,
})

function getSystemDark() {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

function applyThemeClass(theme, systemDark) {
  if (typeof document === 'undefined') return

  const root = document.documentElement
  const shouldUseDark = theme === 'dark' || (theme === 'system' && systemDark)

  root.classList.toggle('dark', shouldUseDark)
  root.dataset.theme = theme
  root.style.colorScheme = shouldUseDark ? 'dark' : 'light'
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => readTheme())
  const [systemDark, setSystemDark] = useState(() => getSystemDark())

  useEffect(() => {
    applyThemeClass(theme, systemDark)
  }, [theme, systemDark])

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return undefined
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (event) => {
      setSystemDark(event.matches)
    }

    setSystemDark(mediaQuery.matches)

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    }

    mediaQuery.addListener(handleChange)
    return () => mediaQuery.removeListener(handleChange)
  }, [])

  const setTheme = (nextTheme) => {
    setThemeState(nextTheme)
    persistTheme(nextTheme)
  }

  const value = useMemo(() => {
    const isDark = theme === 'dark' || (theme === 'system' && systemDark)
    return { theme, setTheme, isDark }
  }, [theme, systemDark])

  return createElement(ThemeContext.Provider, { value }, children)
}

export function useTheme() {
  return useContext(ThemeContext)
}