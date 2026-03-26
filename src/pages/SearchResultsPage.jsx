import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Search } from 'lucide-react'
import SEOHead from '../components/SEOHead.jsx'
import ToolGrid from '../components/ToolGrid.jsx'
import { findMatchingTools } from '../utils/searchTools.js'

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const normalizedQuery = query.trim()

  const results = useMemo(() => findMatchingTools(query), [query])

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
      />

      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
        <div className="flex items-start gap-4">
          <div className="rounded-2xl bg-indigo-100 p-3 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-300">
            <Search className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-indigo-600 dark:text-indigo-300">URL search</p>
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

      {normalizedQuery ? (
        <section className="mt-8" aria-label="Search results list">
          <ToolGrid tools={results} />
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