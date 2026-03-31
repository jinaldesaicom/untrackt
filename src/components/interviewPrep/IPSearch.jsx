import { memo, useState, useEffect, useRef, useMemo } from 'react'
import { Search, X } from 'lucide-react'
import Fuse from 'fuse.js'
import { interviewPrepResources } from '../../data/interviewPrep.js'
import { categoryColorMap, levelColorMap, pricingColorMap } from './IPCategoryTabs.jsx'
import { interviewPrepCategories } from '../../data/interviewPrep.js'

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

function IPSearch({ onVisit }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [showResults, setShowResults] = useState(false)
  const inputRef = useRef(null)
  const containerRef = useRef(null)

  const fuse = useMemo(() => new Fuse(interviewPrepResources, fuseOptions), [])

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
          placeholder='Search LeetCode, CTCI, behavioral... Press "/"'
          className="w-full pl-9 pr-9 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
          aria-label="Search interview prep resources"
        />
        {query && (
          <button
            onClick={() => { setQuery(''); setShowResults(false) }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {showResults && results.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-50 max-h-[400px] overflow-y-auto">
          {results.map((r) => {
            const colors = categoryColorMap[r.category] || categoryColorMap.dsa
            const levelColors = levelColorMap[r.level] || levelColorMap.beginner
            const pricingColors = pricingColorMap[r.pricing] || pricingColorMap.free
            const catLabel = interviewPrepCategories.find((c) => c.id === r.category)?.shortName || r.category
            return (
              <button
                key={r.id}
                onClick={() => handleVisit(r)}
                className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors text-left border-b border-gray-100 dark:border-gray-700 last:border-0"
              >
                <span className="text-lg shrink-0">{r.emoji}</span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{r.name}</p>
                  <p className="text-xs text-gray-400 truncate">by {r.provider}</p>
                </div>
                <span className={`hidden sm:inline text-[10px] font-medium px-1.5 py-0.5 rounded-full ${levelColors.bg} ${levelColors.text} capitalize shrink-0`}>
                  {r.level}
                </span>
                <span className={`hidden sm:inline text-[10px] font-medium px-1.5 py-0.5 rounded-full ${pricingColors.bg} ${pricingColors.text} capitalize shrink-0`}>
                  {r.pricing === 'freemium' ? 'Free+' : r.pricing}
                </span>
                <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${colors.bg} ${colors.text} shrink-0`}>
                  {catLabel}
                </span>
              </button>
            )
          })}
        </div>
      )}

      {showResults && query.trim().length >= 2 && results.length === 0 && (
        <div className="absolute top-full mt-2 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-50 p-6 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">No resources found for "{query}"</p>
        </div>
      )}
    </div>
  )
}

export default memo(IPSearch)
