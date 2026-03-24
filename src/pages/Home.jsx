import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import SearchBar from '../components/SearchBar.jsx'
import ToolGrid from '../components/ToolGrid.jsx'
import tools, { categories, categoryColorMap } from '../data/tools.js'
import { getIcon } from '../icons.js'

function getRandomFeaturedTools(count = 6) {
  const shuffled = [...tools].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

export default function Home() {
  const featured = useMemo(() => getRandomFeaturedTools(6), [])
  const toolCounts = {}
  tools.forEach((t) => {
    toolCounts[t.category] = (toolCounts[t.category] || 0) + 1
  })

  return (
    <div>
      {/* Hero */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20 text-center">
          <div className="mb-4 flex justify-center">
            <span className="beta-badge">Beta Release</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-3">
            88+ free tools. Runs in your browser. Zero tracking.
          </h1>
          <p className="text-lg text-gray-500 mb-8 max-w-xl mx-auto">
            No accounts. No servers. No nonsense.
          </p>
          <div className="max-w-lg mx-auto">
            <SearchBar large />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Browse by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => {
            const Icon = getIcon(cat.icon)
            const colors = categoryColorMap[cat.id]
            return (
              <Link
                key={cat.id}
                to={`/category/${cat.id}`}
                className={`flex flex-col items-center text-center p-4 rounded-xl border ${colors.border} ${colors.bg} hover:shadow-md hover:-translate-y-0.5 transition-all duration-200`}
              >
                <div className={`p-2 rounded-lg bg-white mb-2 shadow-sm`}>
                  <Icon className={`w-6 h-6 ${colors.icon}`} />
                </div>
                <span className={`font-semibold text-sm ${colors.text}`}>{cat.name}</span>
                <span className="text-xs text-gray-400 mt-0.5">{toolCounts[cat.id] || 0} tools</span>
                <span className="text-xs text-indigo-600 font-medium mt-2">View all →</span>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Featured Tools */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Featured Tools</h2>
        </div>
        <ToolGrid tools={featured} />
      </section>

      {/* All Tools */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <h2 className="text-xl font-bold text-gray-900 mb-6">All Tools</h2>
        <ToolGrid tools={tools} />
      </section>
    </div>
  )
}
