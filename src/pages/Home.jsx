import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import SearchBar from '../components/SearchBar.jsx'
import ToolGrid from '../components/ToolGrid.jsx'
import SEOHead from '../components/SEOHead.jsx'
import tools, { categories, categoryColorMap } from '../data/tools.js'
import { getIcon } from '../icons.js'
import { getRecentTools } from '../utils/storage.js'

function getRandomFeaturedTools(count = 6) {
  const shuffled = [...tools].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

export default function Home() {
  const featured = useMemo(() => getRandomFeaturedTools(6), [])
  const recentTools = useMemo(() => {
    const recentIds = getRecentTools()
    return recentIds
      .map((id) => tools.find((tool) => tool.id === id))
      .filter(Boolean)
      .slice(0, 6)
  }, [])

  const toolCounts = {}
  tools.forEach((t) => {
    toolCounts[t.category] = (toolCounts[t.category] || 0) + 1
  })

  return (
    <div>
      <SEOHead
        title="Free Online Tools - No Tracking | UnTrackt"
        description="88+ free tools for developers, students, freelancers and more. Runs entirely in your browser. Zero tracking, zero accounts, zero data collection."
        path="/"
      />

      {/* Hero */}
      <section className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20 text-center">
          <div className="mb-4 flex justify-center">
            <span className="beta-badge">Beta Release</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-3">
            {`${tools.length}+ free tools. Runs in your browser. Zero tracking.`}
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 mb-8 max-w-xl mx-auto">
            No accounts. No servers. No nonsense.
          </p>
          <div className="max-w-lg mx-auto">
            <SearchBar large />
          </div>
          <div className="mt-7 flex justify-center gap-4 sm:gap-7 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            <span>{`${tools.length}+ free tools`}</span>
            <span>{`${categories.length} categories`}</span>
            <span>Zero tracking</span>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Browse by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => {
            const Icon = getIcon(cat.icon)
            const colors = categoryColorMap[cat.id]
            return (
              <Link
                key={cat.id}
                to={`/category/${cat.id}`}
                className={`flex flex-col items-center text-center p-4 rounded-xl border ${colors.border} ${colors.darkBorder} ${colors.bg} ${colors.darkBg} hover:shadow-md hover:-translate-y-0.5 transition-all duration-200`}
              >
                <div className="p-2 rounded-lg bg-white dark:bg-gray-700 mb-2 shadow-sm">
                  <Icon className={`w-6 h-6 ${colors.icon}`} />
                </div>
                <span className={`font-semibold text-sm ${colors.text} ${colors.darkText}`}>{cat.name}</span>
                <span className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{toolCounts[cat.id] || 0} tools</span>
                <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium mt-2">View all →</span>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Why UnTrackt */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Why UnTrackt?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h3 className="text-base font-semibold text-gray-900">Runs in your browser</h3>
            <p className="text-sm text-gray-500 mt-2">Nothing you type ever leaves your device.</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h3 className="text-base font-semibold text-gray-900">Instant results</h3>
            <p className="text-sm text-gray-500 mt-2">No loading spinners. No server round trips.</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h3 className="text-base font-semibold text-gray-900">Forever free</h3>
            <p className="text-sm text-gray-500 mt-2">No account. No subscription. No catch.</p>
          </div>
        </div>
      </section>

      {/* Recently Used */}
      {recentTools.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="flex items-end justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recently Used Tools</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Pick up where you left off</p>
            </div>
          </div>
          <ToolGrid tools={recentTools} />
        </section>
      )}

      {/* Featured Tools */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Featured Tools</h2>
        </div>
        <ToolGrid tools={featured} />
      </section>

      {/* All Tools */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">All Tools</h2>
        <ToolGrid tools={tools} />
      </section>
    </div>
  )
}
