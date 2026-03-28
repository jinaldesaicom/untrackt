import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import SEOHead from '../components/SEOHead.jsx'
import tools, { categories, categoryColorMap } from '../data/tools.js'
import { getIcon } from '../icons.js'
import {
  Map,
  ChevronDown,
  ChevronRight,
  Home,
  Heart,
  BarChart2,
  ShieldCheck,
  FileText,
  Info,
  Search,
  Star,
  Sparkles,
  ExternalLink,
} from 'lucide-react'

const staticPages = [
  { name: 'Home', path: '/', icon: Home, description: 'Browse all tools' },
  { name: 'Favorites', path: '/favorites', icon: Heart, description: 'Your saved tools' },
  { name: 'My Stats', path: '/my-stats', icon: BarChart2, description: 'Usage statistics' },
  { name: 'Search', path: '/search', icon: Search, description: 'Find any tool' },
  { name: 'About', path: '/about', icon: Info, description: 'About UnTrackt' },
  { name: 'Privacy Policy', path: '/privacy', icon: ShieldCheck, description: 'How we protect your data' },
  { name: 'Terms of Use', path: '/terms', icon: FileText, description: 'Terms and conditions' },
]

export default function SitemapPage() {
  const [expandedCategories, setExpandedCategories] = useState(
    () => new Set(categories.map((c) => c.id))
  )
  const [filter, setFilter] = useState('')

  const toggleCategory = (id) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const expandAll = () => setExpandedCategories(new Set(categories.map((c) => c.id)))
  const collapseAll = () => setExpandedCategories(new Set())

  const toolsByCategory = useMemo(() => {
    const map = {}
    for (const cat of categories) {
      map[cat.id] = tools.filter((t) => t.category === cat.id)
    }
    return map
  }, [])

  const filteredCategories = useMemo(() => {
    if (!filter.trim()) return categories
    const q = filter.toLowerCase()
    return categories.filter((cat) => {
      if (cat.name.toLowerCase().includes(q)) return true
      return toolsByCategory[cat.id]?.some(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.tags?.some((tag) => tag.toLowerCase().includes(q))
      )
    })
  }, [filter, toolsByCategory])

  const getFilteredTools = (catId) => {
    if (!filter.trim()) return toolsByCategory[catId] || []
    const q = filter.toLowerCase()
    return (toolsByCategory[catId] || []).filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.tags?.some((tag) => tag.toLowerCase().includes(q))
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <SEOHead
        title="Sitemap - All Tools & Pages | UnTrackt"
        description="Browse the complete directory of UnTrackt tools organized by category. Find every tool, page, and resource available."
        path="/sitemap"
      />

      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-8 sm:p-10 mb-10 shadow-xl">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-10 -right-10 w-64 h-64 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-white/20 blur-3xl" />
        </div>
        <div className="relative">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 rounded-xl bg-white/20 backdrop-blur-sm">
              <Map className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Sitemap</h1>
          </div>
          <p className="text-indigo-100 text-sm sm:text-base max-w-xl">
            Explore every tool and page on UnTrackt. {tools.length} free tools across {categories.length} categories — all running privately in your browser.
          </p>

          {/* Quick stats */}
          <div className="flex flex-wrap gap-4 mt-6">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/15 backdrop-blur-sm text-white text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              {tools.length} Tools
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/15 backdrop-blur-sm text-white text-sm font-medium">
              <Star className="w-4 h-4" />
              {categories.length} Categories
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/15 backdrop-blur-sm text-white text-sm font-medium">
              <ShieldCheck className="w-4 h-4" />
              100% Private
            </div>
          </div>
        </div>
      </div>

      {/* Filter + expand/collapse controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-8">
        <div className="relative flex-1 w-full sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Filter tools..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={expandAll}
            className="px-3 py-2 rounded-lg text-xs font-medium border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Expand All
          </button>
          <button
            onClick={collapseAll}
            className="px-3 py-2 rounded-lg text-xs font-medium border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Collapse All
          </button>
        </div>
      </div>

      {/* Static pages section */}
      <section className="mb-10">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <div className="w-1.5 h-6 rounded-full bg-indigo-500" />
          Pages
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {staticPages.map((page) => {
            const Icon = page.icon
            return (
              <Link
                key={page.path}
                to={page.path}
                className="group flex items-center gap-3 p-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 hover:border-indigo-300 dark:hover:border-indigo-600 hover:shadow-md hover:shadow-indigo-500/5 transition-all duration-200"
              >
                <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/50 transition-colors">
                  <Icon className="w-4 h-4 text-indigo-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">
                    {page.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{page.description}</p>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-gray-300 dark:text-gray-600 group-hover:text-indigo-400 transition-colors shrink-0" />
              </Link>
            )
          })}
        </div>
      </section>

      {/* Tool categories */}
      <section>
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <div className="w-1.5 h-6 rounded-full bg-purple-500" />
          Tools by Category
        </h2>

        <div className="space-y-4">
          {filteredCategories.map((cat) => {
            const colors = categoryColorMap[cat.id]
            const CatIcon = getIcon(cat.icon)
            const isExpanded = expandedCategories.has(cat.id)
            const catTools = getFilteredTools(cat.id)
            const subcategories = [...new Set(catTools.map((t) => t.subcategory).filter(Boolean))].sort()

            return (
              <div
                key={cat.id}
                className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 overflow-hidden transition-shadow hover:shadow-lg hover:shadow-gray-200/50 dark:hover:shadow-black/20"
              >
                {/* Category header */}
                <button
                  onClick={() => toggleCategory(cat.id)}
                  className="w-full flex items-center gap-3 p-4 sm:p-5 text-left hover:bg-gray-50/50 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className={`p-2.5 rounded-xl ${colors.bg} ${colors.darkBg} shrink-0`}>
                    <CatIcon className={`w-5 h-5 ${colors.icon}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-gray-900 dark:text-white">{cat.name}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full text-white ${colors.pill} font-semibold`}>
                        {catTools.length}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate">{cat.description}</p>
                  </div>
                  <div className="shrink-0 p-1">
                    {isExpanded ? (
                      <ChevronDown className="w-5 h-5 text-gray-400 transition-transform" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-400 transition-transform" />
                    )}
                  </div>
                </button>

                {/* Expanded tool list */}
                {isExpanded && catTools.length > 0 && (
                  <div className="border-t border-gray-100 dark:border-gray-700/50">
                    {subcategories.length > 1 ? (
                      /* Group by subcategory */
                      subcategories.map((sub) => {
                        const subTools = catTools.filter((t) => t.subcategory === sub)
                        if (subTools.length === 0) return null
                        return (
                          <div key={sub}>
                            <div className="px-5 pt-4 pb-1">
                              <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                                {sub}
                              </span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 px-4 pb-3">
                              {subTools.map((tool) => (
                                <ToolLink key={tool.id} tool={tool} colors={colors} />
                              ))}
                            </div>
                          </div>
                        )
                      })
                    ) : (
                      /* Flat list */
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 p-4">
                        {catTools.map((tool) => (
                          <ToolLink key={tool.id} tool={tool} colors={colors} />
                        ))}
                      </div>
                    )}

                    {/* Category link */}
                    <div className="px-4 pb-4">
                      <Link
                        to={`/category/${cat.id}`}
                        className={`inline-flex items-center gap-1.5 text-xs font-medium ${colors.text} ${colors.darkText} hover:underline`}
                      >
                        View all {cat.name} →
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {filteredCategories.length === 0 && (
          <div className="text-center py-16">
            <Search className="w-10 h-10 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
            <p className="text-gray-500 dark:text-gray-400 text-sm">No tools match "{filter}"</p>
            <button
              onClick={() => setFilter('')}
              className="mt-2 text-indigo-600 dark:text-indigo-400 text-sm font-medium hover:underline"
            >
              Clear filter
            </button>
          </div>
        )}
      </section>
    </div>
  )
}

function ToolLink({ tool, colors }) {
  const Icon = getIcon(tool.icon)
  return (
    <Link
      to={tool.path}
      className="group flex items-center gap-2.5 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/40 transition-colors"
    >
      <div className={`p-1.5 rounded-lg ${colors.bg} ${colors.darkBg} shrink-0 group-hover:scale-110 transition-transform`}>
        <Icon className={`w-3.5 h-3.5 ${colors.icon}`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-800 dark:text-gray-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 truncate transition-colors">
          {tool.name}
        </p>
        <p className="text-[11px] text-gray-400 dark:text-gray-500 truncate">{tool.description}</p>
      </div>
      {tool.isNew && (
        <span className="shrink-0 text-[10px] px-1.5 py-0.5 rounded-full bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300 font-semibold">
          New
        </span>
      )}
      {tool.isPopular && (
        <span className="shrink-0 text-[10px] px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300 font-semibold">
          Popular
        </span>
      )}
    </Link>
  )
}
