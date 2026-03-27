import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Search } from 'lucide-react'
import SEOHead from '../components/SEOHead.jsx'
import ToolGrid from '../components/ToolGrid.jsx'
import { searchTools } from '../search/searchEngine.js'
import { categories, categoryColorMap } from '../data/tools.js'

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const normalizedQuery = query.trim()
  const [filterCat, setFilterCat] = useState('all')

  const results = useMemo(() => searchTools(query, 50), [query])

  const grouped = useMemo(() => {
    const map = {}
    results.forEach((tool) => {
      const cat = tool.category
      if (!map[cat]) map[cat] = []
      map[cat].push(tool)
    })
    return map
  }, [results])

  const filteredResults = filterCat === 'all' ? results : (grouped[filterCat] || [])
  const availableCats = Object.keys(grouped)

  const title = normalizedQuery
    ? `Search results for "${normalizedQuery}" | UnTrackt`
    : 'Search | UnTrackt'

  const description = normalizedQuery
    ? `Browse browser-based tools matching "${normalizedQuery}" on UnTrackt.`
    : 'Search UnTrackt tools by adding a q query parameter to the URL.'

  const path = normalizedQuery
    ? `/search?q=${encodeURIComponent(normalizedQuery)}`
    : '/search'

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <SEOHead
        title={title}
        description={description}
        path={path}
        noindex
      />

      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
        <div className="flex items-start gap-4">
          <div className="rounded-2xl bg-indigo-100 p-3 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-300">
            <Search className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-indigo-600 dark:text-indigo-300">Search</p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Search results</h1>
            {normalizedQuery ? (
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Showing {results.length} result{results.length === 1 ? '' : 's'} for <span className="font-semibold text-gray-900 dark:text-gray-100">&quot;{normalizedQuery}&quot;</span>
              </p>
            ) : (
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Add a <span className="font-semibold text-gray-900 dark:text-gray-100">q</span> query parameter in the address bar, for example <span className="font-semibold text-gray-900 dark:text-gray-100">/search?q=json</span>.
              </p>
            )}
          </div>
        </div>
      </div>

      {normalizedQuery && availableCats.length > 1 && (
        <div className="mt-6 flex flex-wrap gap-2" aria-label="Filter by category">
          <button
            onClick={() => setFilterCat('all')}
            className={`rounded-full px-3 py-1 text-xs font-medium border ${filterCat === 'all' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700 border-gray-200 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700'}`}
          >
            All ({results.length})
          </button>
          {availableCats.map((cat) => {
            const colors = categoryColorMap[cat]
            const catObj = categories.find((c) => c.id === cat)
            return (
              <button
                key={cat}
                onClick={() => setFilterCat(cat)}
                className={`rounded-full px-3 py-1 text-xs font-medium border ${filterCat === cat ? `${colors.pill} text-white border-transparent` : 'bg-white text-gray-700 border-gray-200 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700'}`}
              >
                {catObj?.name || cat} ({grouped[cat].length})
              </button>
            )
          })}
        </div>
      )}

      {normalizedQuery ? (
        <section className="mt-8" aria-label="Search results list">
          <ToolGrid tools={filteredResults} />
        </section>
      ) : (
        <section className="mt-8 rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-6 text-center dark:border-gray-600 dark:bg-gray-800/60">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">No query provided</h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">This page only renders results from the URL query string. The existing in-page search bars keep their current behavior.</p>
          <Link to="/" className="btn-primary mt-4 inline-flex">Back to home</Link>
        </section>
      )}
    </div>
  )
}