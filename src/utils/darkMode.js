import { createContext, createElement, useContext, useState, useEffect } from 'react'

const STORAGE_KEY = 'untrackt:darkMode'

const DarkModeContext = createContext({ isDark: false, toggle: () => {} })

export function DarkModeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved !== null) return saved === 'true'
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    } catch {
      return false
    }
  })

  useEffect(() => {
    const root = document.documentElement
    if (isDark) root.classList.add('dark')
    else root.classList.remove('dark')
    try { localStorage.setItem(STORAGE_KEY, String(isDark)) } catch {}
  }, [isDark])

  const toggle = () => setIsDark((v) => !v)

  return createElement(DarkModeContext.Provider, { value: { isDark, toggle } }, children)
}

export function useDarkMode() {
  return useContext(DarkModeContext)
}
