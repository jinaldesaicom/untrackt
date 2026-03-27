import { useMemo, useState } from 'react'
import { useParams, Link, useSearchParams } from 'react-router-dom'
import { LayoutGrid, List } from 'lucide-react'
import ToolGrid from '../components/ToolGrid.jsx'
import SEOHead from '../components/SEOHead.jsx'
import tools, { categories, categoryColorMap } from '../data/tools.js'
import categoryContent from '../data/categoryContent.js'
import { getIcon } from '../icons.js'
import { getMostUsedTools } from '../utils/localStats.js'
import { getSubcategories } from '../search/searchEngine.js'

export default function CategoryPage() {
  const { categoryId } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const category = categories.find((c) => c.id === categoryId)
  const sortBy = searchParams.get('sort') || 'default'
  const activeSub = searchParams.get('sub') || 'all'
  const [activeTag, setActiveTag] = useState('all')
  const [viewMode, setViewMode] = useState('grid')
  const categoryTools = useMemo(() => tools.filter((t) => t.category === categoryId), [categoryId])
  const colors = categoryColorMap[categoryId] || categoryColorMap['general']
  const content = categoryContent[categoryId]
  const mostUsed = getMostUsedTools(50)
  const subcategories = useMemo(() => getSubcategories(categoryId), [categoryId])

  const setSortBy = (val) => {
    const params = new URLSearchParams(searchParams)
    if (val === 'default') params.delete('sort')
    else params.set('sort', val)
    setSearchParams(params, { replace: true })
  }

  const setActiveSub = (val) => {
    const params = new URLSearchParams(searchParams)
    if (val === 'all') params.delete('sub')
    else params.set('sub', val)
    setSearchParams(params, { replace: true })
  }

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
    let base = activeSub === 'all'
      ? categoryTools
      : categoryTools.filter((tool) => tool.subcategory === activeSub)

    if (activeTag !== 'all') {
      base = base.filter((tool) => tool.tags.includes(activeTag))
    }

    if (sortBy === 'a-z') {
      return [...base].sort((a, b) => a.name.localeCompare(b.name))
    }
    if (sortBy === 'popular') {
      return [...base].sort((a, b) => (visitMap[b.id] || 0) - (visitMap[a.id] || 0))
    }
    return base
  }, [activeTag, activeSub, categoryTools, sortBy, visitMap])

  const featuredTools = categoryTools.filter((t) => t.isPopular)
  const newTools = categoryTools.filter((t) => t.isNew)

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
        breadcrumbs={[
          { name: 'Home', url: 'https://untrackt.com' },
          { name: category.name, url: `https://untrackt.com/category/${category.id}` },
        ]}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: `${category.name} Tools`,
          url: `https://untrackt.com/category/${category.id}`,
          description: content?.seoDescription || `Free ${category.name.toLowerCase()} tools`,
          mainEntity: {
            '@type': 'ItemList',
            itemListElement: categoryTools.map((t, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              name: t.name,
              url: `https://untrackt.com${t.path}`,
            })),
          },
        }}
      />

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-8">
        <Link to="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Home</Link>
        <span>/</span>
        <span className="text-gray-900 dark:text-gray-100 font-medium">{category.name}</span>
      </nav>

      {/* Hero gradient header */}
      <div className={`rounded-2xl p-6 mb-8 ${colors.bg} ${colors.darkBg} border ${colors.border} ${colors.darkBorder}`}>
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-white dark:bg-gray-800 shadow-sm shrink-0">
            <Icon className={`w-8 h-8 ${colors.icon}`} />
          </div>
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">{category.name}</h1>
              <span className={`px-2.5 py-0.5 rounded-full text-sm font-medium text-white ${colors.pill}`}>
                {categoryTools.length} tools
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mt-1 leading-relaxed">{content?.description || category.description}</p>
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
      </div>

      {/* Subcategory tabs */}
      {subcategories.length > 1 && (
        <div className="mb-6 flex flex-wrap gap-2" aria-label="Filter by subcategory">
          <button
            type="button"
            onClick={() => setActiveSub('all')}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold border transition-colors ${activeSub === 'all' ? `${colors.pill} text-white border-transparent` : 'bg-white text-gray-700 border-gray-200 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 hover:border-gray-300'}`}
          >
            All
          </button>
          {subcategories.map((sub) => (
            <button
              key={sub}
              type="button"
              onClick={() => setActiveSub(sub)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold border capitalize transition-colors ${activeSub === sub ? `${colors.pill} text-white border-transparent` : 'bg-white text-gray-700 border-gray-200 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 hover:border-gray-300'}`}
            >
              {sub}
            </button>
          ))}
        </div>
      )}

      {/* New tools banner */}
      {newTools.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse" /> New in {category.name}
          </h2>
          <ToolGrid tools={newTools} />
        </section>
      )}

      {/* Featured / popular tools */}
      {featuredTools.length > 0 && (
        <section aria-label="Popular tools" className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Popular in {category.name}</h2>
          <div className="mt-3">
            <ToolGrid tools={featuredTools} />
          </div>
        </section>
      )}

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
        <div className="ml-auto flex items-center gap-1">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-300' : 'text-gray-400 hover:text-gray-600'}`}
            aria-label="Grid view"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-300' : 'text-gray-400 hover:text-gray-600'}`}
            aria-label="List view"
          >
            <List className="w-4 h-4" />
          </button>
        </div>
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

      {viewMode === 'list' ? (
        <div className="space-y-2">
          {filteredTools.map((tool) => {
            const TIcon = getIcon(tool.icon)
            const tColors = categoryColorMap[tool.category] || colors
            return (
              <Link
                key={tool.id}
                to={tool.path}
                className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:shadow-md transition-shadow"
              >
                <div className={`p-2 rounded-lg ${tColors.bg} ${tColors.darkBg} shrink-0`}>
                  <TIcon className={`w-4 h-4 ${tColors.icon}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">{tool.name}</span>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{tool.description}</p>
                </div>
                {tool.isNew && <span className="text-[10px] bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300 px-2 py-0.5 rounded-full font-semibold">New</span>}
                {tool.isPopular && <span className="text-[10px] bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300 px-2 py-0.5 rounded-full font-semibold">Popular</span>}
              </Link>
            )
          })}
        </div>
      ) : (
        <ToolGrid tools={filteredTools} />
      )}
    </div>
  )
}
