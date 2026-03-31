import { memo, useState, useMemo, useRef, useEffect } from 'react'
import { Search, X } from 'lucide-react'
import Fuse from 'fuse.js'
import { githubStars } from '../../data/githubStars.js'
import RepoCardCompact from './RepoCardCompact.jsx'

const fuse = new Fuse(githubStars, {
  keys: [
    { name: 'name', weight: 0.35 },
    { name: 'fullName', weight: 0.25 },
    { name: 'tags', weight: 0.25 },
    { name: 'description', weight: 0.15 },
  ],
  threshold: 0.3,
  minMatchCharLength: 2,
})

function GhStarsSearch({ onVisit }) {
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
          placeholder="Search React, TensorFlow, Tailwind..."
          className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow"
          aria-label="Search GitHub repositories"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Clear search"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        )}
        {!query && (
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono text-gray-400 bg-gray-100 dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600">
            /
          </kbd>
        )}
      </div>

      {results.length > 0 && (
        <div className="mt-3 space-y-1.5">
          <p className="text-xs text-gray-400 dark:text-gray-500 mb-2">
            {results.length} result{results.length !== 1 ? 's' : ''}
          </p>
          {results.map((repo) => (
            <RepoCardCompact key={repo.id} repo={repo} onVisit={onVisit} />
          ))}
        </div>
      )}

      {query.trim().length >= 2 && results.length === 0 && (
        <p className="mt-3 text-sm text-gray-400 dark:text-gray-500">
          No repos found for &ldquo;{query}&rdquo;
        </p>
      )}
    </div>
  )
}

export default memo(GhStarsSearch)
