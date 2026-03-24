import { useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import ToolGrid from '../components/ToolGrid.jsx'
import SEOHead from '../components/SEOHead.jsx'
import tools, { categories, categoryColorMap } from '../data/tools.js'
import categoryContent from '../data/categoryContent.js'
import { getIcon } from '../icons.js'
import { getMostUsedTools } from '../utils/localStats.js'

export default function CategoryPage() {
  const { categoryId } = useParams()
  const category = categories.find((c) => c.id === categoryId)
  const [sortBy, setSortBy] = useState('default')
  const [activeTag, setActiveTag] = useState('all')
  const categoryTools = useMemo(() => tools.filter((t) => t.category === categoryId), [categoryId])
  const colors = categoryColorMap[categoryId] || categoryColorMap['general']
  const content = categoryContent[categoryId]
  const mostUsed = getMostUsedTools(50)

  const visitMap = mostUsed.reduce((acc, item) => {
    acc[item.toolId] = item.visits
    return acc
  }, {})

  const tags = useMemo(() => {
    const allTags = new Set()
    categoryTools.forEach((tool) => tool.tags.forEach((tag) => allTags.add(tag)))
    return Array.from(allTags).slice(0, 14)
  }, [categoryTools])

  const filteredTools = useMemo(() => {
    const base = activeTag === 'all'
      ? categoryTools
      : categoryTools.filter((tool) => tool.tags.includes(activeTag))

    if (sortBy === 'a-z') {
      return [...base].sort((a, b) => a.name.localeCompare(b.name))
    }
    if (sortBy === 'popular') {
      return [...base].sort((a, b) => (visitMap[b.id] || 0) - (visitMap[a.id] || 0))
    }
    return base
  }, [activeTag, categoryTools, sortBy, visitMap])

  const popularTools = [...categoryTools]
    .sort((a, b) => (visitMap[b.id] || 0) - (visitMap[a.id] || 0))
    .filter((tool) => (visitMap[tool.id] || 0) > 0)
    .slice(0, 3)

  if (!category) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Category not found</h1>
        <Link to="/" className="text-indigo-600 dark:text-indigo-400 hover:underline">← Back to Home</Link>
      </div>
    )
  }

  const Icon = getIcon(category.icon)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <SEOHead
        title={`${category.name} Tools - Free & Private | UnTrackt`}
        description={content?.seoDescription || `Free ${category.name.toLowerCase()} tools that run in your browser. No sign-up, no tracking, no data stored on any server.`}
        path={`/category/${category.id}`}
      />

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-8">
        <Link to="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Home</Link>
        <span>/</span>
        <span className="text-gray-900 dark:text-gray-100 font-medium">{category.name}</span>
      </nav>

      {/* Header */}
      <div className="flex items-start gap-4 mb-8">
        <div className={`p-3 rounded-xl ${colors.bg} ${colors.darkBg} shrink-0`}>
          <Icon className={`w-8 h-8 ${colors.icon}`} />
        </div>
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">{category.name}</h1>
            <span className={`px-2.5 py-0.5 rounded-full text-sm font-medium text-white ${colors.pill}`}>
              {categoryTools.length} tools
            </span>
          </div>
          <p className="text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">{content?.description || category.description}</p>
          {content?.useCases?.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {content.useCases.slice(0, 4).map((useCase) => (
                <span key={useCase} className="px-3 py-1 rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-xs text-gray-600 dark:text-gray-300">
                  {useCase}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {popularTools.length > 0 ? (
        <section aria-label="Popular tools" className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Popular tools in this category</h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Based on your local usage only.</p>
          <div className="mt-4">
            <ToolGrid tools={popularTools} />
          </div>
        </section>
      ) : null}

      <div className="mb-5 flex flex-wrap items-center gap-2">
        <label htmlFor="sortTools" className="text-sm font-medium text-gray-700 dark:text-gray-300">Sort:</label>
        <select
          id="sortTools"
          className="input-field w-auto"
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value)}
        >
          <option value="default">Default</option>
          <option value="a-z">A-Z</option>
          <option value="popular">Most Popular</option>
        </select>
      </div>

      {tags.length > 0 ? (
        <div className="mb-6 flex flex-wrap gap-2" aria-label="Filter by tag">
          <button
            type="button"
            onClick={() => setActiveTag('all')}
            className={`rounded-full px-3 py-1 text-xs font-medium border ${activeTag === 'all' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700 border-gray-200 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700'}`}
          >
            All
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveTag(tag)}
              className={`rounded-full px-3 py-1 text-xs font-medium border ${activeTag === tag ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700 border-gray-200 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700'}`}
            >
              {tag}
            </button>
          ))}
        </div>
      ) : null}

      <ToolGrid tools={filteredTools} />
    </div>
  )
}
