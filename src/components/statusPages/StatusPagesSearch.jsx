import { memo, useState, useMemo, useRef, useEffect, useCallback } from 'react'
import { Search, X } from 'lucide-react'
import Fuse from 'fuse.js'
import { statusPages } from '../../data/statusPages.js'
import ServiceCardCompact from './ServiceCardCompact.jsx'

const fuse = new Fuse(statusPages, {
  keys: [
    { name: 'name', weight: 0.4 },
    { name: 'shortName', weight: 0.3 },
    { name: 'tags', weight: 0.2 },
    { name: 'description', weight: 0.1 },
  ],
  threshold: 0.3,
  minMatchCharLength: 2,
})

function StatusPagesSearch({ onVisit }) {
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)

  const results = useMemo(() => {
    if (!query.trim() || query.trim().length < 2) return []
    return fuse.search(query.trim()).slice(0, 12).map((r) => r.item)
  }, [query])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === '/' && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) {
        e.preventDefault()
        inputRef.current?.focus()
      }
      if (e.key === 'Escape' && document.activeElement === inputRef.current) {
        setQuery('')
        inputRef.current?.blur()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="w-full">
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='Search AWS, GitHub, Stripe...  Press "/"'
          aria-label="Search status pages"
          className="w-full pl-11 pr-10 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm transition-shadow"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {results.length > 0 && (
        <div className="mt-3 space-y-1.5">
          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
            {results.length} result{results.length !== 1 ? 's' : ''}
          </p>
          {results.map((service) => (
            <ServiceCardCompact key={service.id} service={service} onVisit={onVisit} />
          ))}
        </div>
      )}

      {query.trim().length >= 2 && results.length === 0 && (
        <p className="mt-3 text-sm text-gray-500 dark:text-gray-400 text-center py-4">
          No services found for &ldquo;{query}&rdquo;
        </p>
      )}
    </div>
  )
}

export default memo(StatusPagesSearch)
