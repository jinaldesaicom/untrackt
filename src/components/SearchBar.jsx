import { memo, useCallback, useMemo } from 'react'
import { Search, X, Star } from 'lucide-react'
import { getIcon } from '../icons.js'
import { categoryColorMap } from '../data/tools.js'
import useSearch from '../hooks/useSearch.js'

function SearchBar({ large = false }) {
  const {
    query, setQuery, results, activeIndex, open, setOpen,
    recentSearches, inputRef, containerRef,
    handleSelect, handleKeyDown, clearQuery, popular,
  } = useSearch({ limit: 8 })

  const popularTools = useMemo(() => popular(), [popular])

  const highlightMatch = useCallback((text, matches, fieldName) => {
    if (!matches) {
      const q = query.trim()
      if (!q) return text
      const idx = text.toLowerCase().indexOf(q.toLowerCase())
      if (idx < 0) return text
      return (
        <>
          {text.slice(0, idx)}
          <mark className="bg-yellow-200 dark:bg-yellow-700/40 rounded-sm px-0.5">{text.slice(idx, idx + q.length)}</mark>
          {text.slice(idx + q.length)}
        </>
      )
    }
    const match = matches.find((m) => m.key === fieldName)
    if (!match || !match.indices?.length) return text
    const parts = []
    let lastIdx = 0
    for (const [start, end] of match.indices) {
      if (start > lastIdx) parts.push(text.slice(lastIdx, start))
      parts.push(
        <mark key={start} className="bg-yellow-200 dark:bg-yellow-700/40 rounded-sm px-0.5">{text.slice(start, end + 1)}</mark>
      )
      lastIdx = end + 1
    }
    if (lastIdx < text.length) parts.push(text.slice(lastIdx))
    return parts
  }, [query])

  const grouped = useMemo(() => {
    const map = {}
    results.forEach((tool) => {
      const cat = tool.category
      if (!map[cat]) map[cat] = []
      map[cat].push(tool)
    })
    return Object.entries(map)
  }, [results])

  return (
    <div ref={containerRef} className="relative w-full">
      <div className={`relative flex items-center ${large ? 'max-w-xl mx-auto' : ''}`} role="search">
        <Search className="absolute left-3 w-4 h-4 text-gray-400 pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
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
        <div className="absolute z-50 w-full mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl overflow-hidden max-h-[70vh] overflow-y-auto">
          <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400">
            {results.length} result{results.length !== 1 ? 's' : ''}
          </div>
          {grouped.map(([cat, catTools]) => {
            const colors = categoryColorMap[cat]
            return (
              <div key={cat}>
                <div className="px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-800/50">
                  {cat}
                </div>
                {catTools.map((tool) => {
                  const Icon = getIcon(tool.icon)
                  const flatIdx = results.indexOf(tool)
                  return (
                    <button
                      key={tool.id}
                      onClick={() => handleSelect(tool)}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${activeIndex === flatIdx ? 'bg-indigo-50 dark:bg-indigo-900/40' : ''}`}
                    >
                      <div className={`p-1.5 rounded-lg ${colors.bg} shrink-0`}>
                        <Icon className={`w-4 h-4 ${colors.icon}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                          <span className="sr-only">{tool.name}</span>
                          <span aria-hidden>{highlightMatch(tool.name, tool.matches, 'name')}</span>
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{tool.description}</p>
                      </div>
                      <span className={`shrink-0 text-xs font-medium text-white px-2 py-0.5 rounded-full ${colors.pill}`}>
                        {cat}
                      </span>
                    </button>
                  )
                })}
              </div>
            )
          })}
        </div>
      )}

      {open && query.trim() && results.length === 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl px-4 py-5 text-center text-sm text-gray-500 dark:text-gray-400">
          No tools found for &ldquo;{query}&rdquo;
        </div>
      )}

      {open && !query.trim() && (
        <div className="absolute z-50 w-full mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl px-4 py-3 max-h-[70vh] overflow-y-auto">
          {recentSearches.length > 0 && (
            <div className="mb-3">
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
          {popularTools.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 flex items-center gap-1">
                <Star className="w-3 h-3" /> Popular tools
              </p>
              {popularTools.map((tool) => {
                const Icon = getIcon(tool.icon)
                const colors = categoryColorMap[tool.category]
                return (
                  <button
                    key={tool.id}
                    onClick={() => handleSelect(tool)}
                    className="w-full flex items-center gap-3 px-2 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <div className={`p-1.5 rounded-lg ${colors.bg} shrink-0`}>
                      <Icon className={`w-4 h-4 ${colors.icon}`} />
                    </div>
                    <span className="text-sm text-gray-900 dark:text-gray-100 truncate">{tool.name}</span>
                  </button>
                )
              })}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default memo(SearchBar)
