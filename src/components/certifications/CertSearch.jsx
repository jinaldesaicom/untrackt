import { memo, useState, useEffect, useRef, useMemo } from 'react'
import { Search, X } from 'lucide-react'
import Fuse from 'fuse.js'
import { certifications, certCategories } from '../../data/cloudCertifications.js'
import { categoryColorMap, levelColorMap } from './CertCategoryTabs.jsx'

const fuseOptions = {
  keys: [
    { name: 'name', weight: 0.35 },
    { name: 'provider', weight: 0.2 },
    { name: 'examCode', weight: 0.2 },
    { name: 'tags', weight: 0.15 },
    { name: 'description', weight: 0.1 },
  ],
  threshold: 0.3,
  minMatchCharLength: 2,
}

function CertSearch({ onVisit }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [showResults, setShowResults] = useState(false)
  const inputRef = useRef(null)
  const containerRef = useRef(null)

  const fuse = useMemo(() => new Fuse(certifications, fuseOptions), [])

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

  const handleVisit = (cert) => {
    if (onVisit) onVisit(cert.id)
    window.open(cert.officialUrl, '_blank', 'noopener,noreferrer')
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
          placeholder='Search certifications... Press "/"'
          className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          aria-label="Search certifications"
        />
        {query && (
          <button
            onClick={() => { setQuery(''); setShowResults(false) }}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {showResults && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-50 max-h-96 overflow-y-auto">
          {results.map((cert) => {
            const catColor = categoryColorMap[cert.category] || categoryColorMap.aws
            const lvlColor = levelColorMap[cert.level] || levelColorMap.associate
            const catMeta = certCategories.find((c) => c.id === cert.category)
            return (
              <button
                key={cert.id}
                onClick={() => handleVisit(cert)}
                className="flex items-center gap-3 w-full p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors first:rounded-t-xl last:rounded-b-xl"
              >
                <span className="text-xl shrink-0">{cert.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{cert.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{cert.examCode} · {cert.cost} · {cert.duration}</p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-semibold ${catColor.bg} ${catColor.darkBg} ${catColor.text} ${catColor.darkText}`}>
                    {catMeta?.shortName || cert.category}
                  </span>
                  <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-semibold capitalize ${lvlColor.bg} ${lvlColor.darkBg} ${lvlColor.text} ${lvlColor.darkText}`}>
                    {cert.level}
                  </span>
                </div>
              </button>
            )
          })}
        </div>
      )}

      {showResults && query.trim().length >= 2 && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-50 p-6 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">No certifications found for "{query}"</p>
        </div>
      )}
    </div>
  )
}

export default memo(CertSearch)
