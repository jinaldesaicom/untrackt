import { useMemo, useRef } from 'react'

const modules = import.meta.glob('../tools/**/*.jsx')

function toKebabCase(name) {
  return name
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .replace(/_/g, '-')
    .toLowerCase()
}

const prefetchMap = Object.entries(modules).reduce((acc, [path, loader]) => {
  const parts = path.split('/')
  const fileName = parts[parts.length - 1].replace('.jsx', '')
  acc[toKebabCase(fileName)] = loader
  return acc
}, {})

export default function usePrefetchTool(toolId) {
  const timerRef = useRef(null)

  const api = useMemo(() => ({
    prefetch: () => {
      if (!toolId) return
      window.clearTimeout(timerRef.current)
      timerRef.current = window.setTimeout(() => {
        const loader = prefetchMap[toolId]
        if (loader) {
          loader()
        }
      }, 100)
    },
    cancelPrefetch: () => {
      window.clearTimeout(timerRef.current)
    },
  }), [toolId])

  return api
}
