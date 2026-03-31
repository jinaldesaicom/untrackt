import { memo, useState, useEffect, useRef, useMemo } from 'react'
import { Search, X } from 'lucide-react'
import Fuse from 'fuse.js'
import { systemDesignResources } from '../../data/systemDesign.js'
import { categoryColorMap, levelColorMap, pricingColorMap } from './SDCategoryTabs.jsx'
import { systemDesignCategories } from '../../data/systemDesign.js'

const fuseOptions = {
  keys: [
    { name: 'name', weight: 0.4 },
    { name: 'provider', weight: 0.25 },
    { name: 'tags', weight: 0.2 },
    { name: 'description', weight: 0.15 },
  ],
  threshold: 0.3,
  minMatchCharLength: 2,
}

function SDSearch({ onVisit }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [showResults, setShowResults] = useState(false)
  const inputRef = useRef(null)
  const containerRef = useRef(null)

  const fuse = useMemo(() => new Fuse(systemDesignResources, fuseOptions), [])

  useEffect(() => {
    if (query.trim().length >= 2) {
      setResults(fuse.search(query.trim()).slice(0, 8).map((r) => r.item))
      setShowResults(true)
    } else {
      setResults([])
      setShowResults(false)
    }
  }, [query, fuse])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === '/' && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) {
        e.preventDefault()
        inputRef.current?.focus()
      }
      if (e.key === 'Escape') {
        setShowResults(false)
        inputRef.current?.blur()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    const onClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowResults(false)
      }
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  const handleVisit = (resource) => {
    if (onVisit) onVisit(resource.id)
    window.open(resource.url, '_blank', 'noopener,noreferrer')
    setShowResults(false)
    setQuery('')
  }

  return (
    <div ref={containerRef} className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.trim().length >= 2 && setShowResults(true)}
          placeholder='Search DDIA, microservices, caching... Press "/"'
          className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
        />
        {query && (
          <button
            onClick={() => { setQuery(''); setShowResults(false) }}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {showResults && results.length > 0 && (
        <div className="absolute z-50 top-full mt-2 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl overflow-hidden max-h-96 overflow-y-auto">
          {results.map((r) => {
            const colors = categoryColorMap[r.category] || categoryColorMap.courses
            const levelColors = levelColorMap[r.level] || levelColorMap.beginner
            const pricingColors = pricingColorMap[r.pricing] || pricingColorMap.free
            const catLabel = systemDesignCategories.find((c) => c.id === r.category)?.shortName || r.category
            return (
              <button
                key={r.id}
                onClick={() => handleVisit(r)}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors text-left border-b border-gray-100 dark:border-gray-700/50 last:border-b-0"
              >
                <span className="text-lg shrink-0">{r.emoji}</span>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium text-gray-900 dark:text-white truncate">{r.name}</div>
                  <div className="text-xs text-gray-400 dark:text-gray-500 truncate">by {r.provider}</div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${levelColors.bg} ${levelColors.text} capitalize`}>
                    {r.level}
                  </span>
                  <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${pricingColors.bg} ${pricingColors.text} capitalize`}>
                    {r.pricing === 'freemium' ? 'Free+' : r.pricing}
                  </span>
                  <span className={`hidden sm:inline text-[10px] font-medium px-1.5 py-0.5 rounded-full ${colors.bg} ${colors.text}`}>
                    {catLabel}
                  </span>
                </div>
              </button>
            )
          })}
        </div>
      )}

      {showResults && query.trim().length >= 2 && results.length === 0 && (
        <div className="absolute z-50 top-full mt-2 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl p-4 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">No resources found for "{query}"</p>
        </div>
      )}
    </div>
  )
}

export default memo(SDSearch)
