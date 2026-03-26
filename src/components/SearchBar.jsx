import { memo, useCallback, useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, X } from 'lucide-react'
import { getIcon } from '../icons.js'
import { categoryColorMap } from '../data/tools.js'
import useDebounce from '../hooks/useDebounce.js'
import { addRecentSearch, getRecentSearches } from '../utils/storage.js'
import { findMatchingTools } from '../utils/searchTools.js'

function SearchBar({ large = false }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [activeIndex, setActiveIndex] = useState(-1)
  const [open, setOpen] = useState(false)
  const [recentSearches, setRecentSearches] = useState(() => getRecentSearches())
  const containerRef = useRef(null)
  const inputRef = useRef(null)
  const navigate = useNavigate()
  const debouncedQuery = useDebounce(query, 150)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const handleSlashShortcut = (event) => {
      if (event.key !== '/') return
      const tag = event.target?.tagName?.toLowerCase()
      const inInput = tag === 'input' || tag === 'textarea' || event.target?.isContentEditable
      if (inInput) return
      event.preventDefault()
      inputRef.current?.focus()
    }
    document.addEventListener('keydown', handleSlashShortcut)
    return () => document.removeEventListener('keydown', handleSlashShortcut)
  }, [])

  useEffect(() => {
    setActiveIndex(-1)

    if (debouncedQuery.trim().length < 1) {
      setResults([])
      setOpen(false)
      return
    }

    const filtered = findMatchingTools(debouncedQuery, 6)

    setResults(filtered)
    setOpen(true)
  }, [debouncedQuery])

  const handleChange = (e) => {
    setQuery(e.target.value)
  }

  const handleSelect = (tool) => {
    if (query.trim()) {
      addRecentSearch(query.trim())
      setRecentSearches(getRecentSearches())
    }
    setQuery('')
    setResults([])
    setOpen(false)
    navigate(tool.path)
  }

  const submitSearch = () => {
    const trimmedQuery = query.trim()
    if (!trimmedQuery) return

    addRecentSearch(trimmedQuery)
    setRecentSearches(getRecentSearches())
    setOpen(false)
    navigate(`/search?q=${encodeURIComponent(trimmedQuery)}`)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      submitSearch()
      return
    }

    if (!open) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((i) => Math.min(i + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((i) => Math.max(i - 1, -1))
    } else if (e.key === 'Escape') {
      setOpen(false)
      inputRef.current?.blur()
    } else if (e.key === 'Tab') {
      setOpen(false)
    }
  }

  const clearQuery = () => {
    setQuery('')
    setResults([])
    setOpen(false)
    inputRef.current?.focus()
  }

  const highlightMatch = useCallback((text) => {
    const q = query.trim()
    if (!q) return text
    const index = text.toLowerCase().indexOf(q.toLowerCase())
    if (index < 0) return text

    return (
      <>
        {text.slice(0, index)}
        <strong>{text.slice(index, index + q.length)}</strong>
        {text.slice(index + q.length)}
      </>
    )
  }, [query])

  return (
    <div ref={containerRef} className="relative w-full">
      <div className={`relative flex items-center ${large ? 'max-w-xl mx-auto' : ''}`} role="search">
        <Search className="absolute left-3 w-4 h-4 text-gray-400 pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setOpen(true)}
          aria-label="Search tools"
          placeholder="Search tools..."
          className={`w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl pl-9 pr-9 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${large ? 'py-3 text-base' : 'py-2'}`}
        />
        <span className="pointer-events-none absolute right-10 hidden text-xs text-gray-400 sm:block">Press / to search</span>
        {query && (
          <button onClick={clearQuery} className="absolute right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {open && results.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl overflow-hidden">
          {results.map((tool, idx) => {
            const Icon = getIcon(tool.icon)
            const colors = categoryColorMap[tool.category]
            return (
              <button
                key={tool.id}
                onClick={() => handleSelect(tool)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${activeIndex === idx ? 'bg-indigo-50 dark:bg-indigo-900/40' : ''}`}
              >
                <div className={`p-1.5 rounded-lg ${colors.bg} shrink-0`}>
                  <Icon className={`w-4 h-4 ${colors.icon}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                    <span className="sr-only">{tool.name}</span>
                    <span aria-hidden>{highlightMatch(tool.name)}</span>
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{tool.description}</p>
                </div>
                <span className={`shrink-0 text-xs font-medium text-white px-2 py-0.5 rounded-full ${colors.pill}`}>
                  {tool.category}
                </span>
              </button>
            )
          })}
        </div>
      )}

      {open && query.trim() && results.length === 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl px-4 py-5 text-center text-sm text-gray-500 dark:text-gray-400">
          No tools found for "{query}"
        </div>
      )}

      {open && !query.trim() && recentSearches.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl px-4 py-3">
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">Recent searches</p>
          <div className="flex flex-wrap gap-2">
            {recentSearches.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => {
                  setQuery(item)
                  inputRef.current?.focus()
                }}
                className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default memo(SearchBar)
