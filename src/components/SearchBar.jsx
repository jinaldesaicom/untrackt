import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, X } from 'lucide-react'
import { getIcon } from '../icons.js'
import tools, { categoryColorMap } from '../data/tools.js'

export default function SearchBar({ large = false }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [activeIndex, setActiveIndex] = useState(-1)
  const [open, setOpen] = useState(false)
  const containerRef = useRef(null)
  const inputRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleChange = (e) => {
    const q = e.target.value
    setQuery(q)
    setActiveIndex(-1)
    if (q.trim().length < 1) {
      setResults([])
      setOpen(false)
      return
    }
    const lower = q.toLowerCase()
    const filtered = tools.filter((t) =>
      t.name.toLowerCase().includes(lower) ||
      t.description.toLowerCase().includes(lower) ||
      t.tags.some((tag) => tag.toLowerCase().includes(lower))
    ).slice(0, 6)
    setResults(filtered)
    setOpen(true)
  }

  const handleSelect = (tool) => {
    setQuery('')
    setResults([])
    setOpen(false)
    navigate(tool.path)
  }

  const handleKeyDown = (e) => {
    if (!open) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((i) => Math.min(i + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((i) => Math.max(i - 1, -1))
    } else if (e.key === 'Enter') {
      if (activeIndex >= 0 && results[activeIndex]) {
        handleSelect(results[activeIndex])
      }
    } else if (e.key === 'Escape') {
      setOpen(false)
    }
  }

  const clearQuery = () => {
    setQuery('')
    setResults([])
    setOpen(false)
    inputRef.current?.focus()
  }

  return (
    <div ref={containerRef} className="relative w-full">
      <div className={`relative flex items-center ${large ? 'max-w-xl mx-auto' : ''}`}>
        <Search className="absolute left-3 w-4 h-4 text-gray-400 pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => query.trim() && setOpen(true)}
          placeholder="Search tools..."
          className={`w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl pl-9 pr-9 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${large ? 'py-3 text-base' : 'py-2'}`}
        />
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
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{tool.name}</p>
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
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-xl px-4 py-5 text-center text-sm text-gray-500">
          No tools found for "{query}"
        </div>
      )}
    </div>
  )
}
