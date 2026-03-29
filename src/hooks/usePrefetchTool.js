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

const pageModules = {
  '/': () => import('../pages/Home.jsx'),
  '/favorites': () => import('../pages/FavoritesPage.jsx'),
  '/my-stats': () => import('../pages/MyStatsPage.jsx'),
  '/about': () => import('../pages/AboutPage.jsx'),
  '/privacy-policy': () => import('../pages/PrivacyPage.jsx'),
  '/terms': () => import('../pages/TermsPage.jsx'),
  '/search': () => import('../pages/SearchResultsPage.jsx'),
}

const prefetchedPages = new Set()

export function prefetchRoute(path) {
  const key = Object.keys(pageModules).find((k) => path === k || path.startsWith(k + '/'))
  if (!key || prefetchedPages.has(key)) return
  prefetchedPages.add(key)
  pageModules[key]()
}

export function prefetchCategory() {
  if (prefetchedPages.has('category')) return
  prefetchedPages.add('category')
  import('../pages/CategoryPage.jsx')
}
