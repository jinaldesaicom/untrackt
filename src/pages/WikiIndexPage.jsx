import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import SEOHead from '../components/SEOHead.jsx'
import tools, { categories, categoryColorMap } from '../data/tools.js'
import { getIcon } from '../icons.js'
import { hasWikiEntry } from '../wiki/data/index.js'
import { BookOpen, Search, ChevronRight, Sparkles } from 'lucide-react'

export default function WikiIndexPage() {
  const [filter, setFilter] = useState('')

  const wikiTools = useMemo(
    () => tools.filter((t) => hasWikiEntry(t.id)),
    []
  )

  const toolsByCategory = useMemo(() => {
    const map = {}
    for (const cat of categories) {
      map[cat.id] = wikiTools.filter((t) => t.category === cat.id)
    }
    return map
  }, [wikiTools])

  const q = filter.toLowerCase().trim()

  const filteredCategories = useMemo(() => {
    if (!q) return categories.filter((c) => (toolsByCategory[c.id]?.length || 0) > 0)
    return categories.filter((cat) => {
      if (cat.name.toLowerCase().includes(q)) return true
      return toolsByCategory[cat.id]?.some(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.tags?.some((tag) => tag.toLowerCase().includes(q))
      )
    })
  }, [q, toolsByCategory])

  const getFilteredTools = (catId) => {
    if (!q) return toolsByCategory[catId] || []
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
        title="Tool Wiki - In-Depth Guides & Documentation | UnTrackt"
        description="Browse detailed guides, examples, terminology, and best practices for every UnTrackt tool. Learn how each tool works with step-by-step instructions."
        path="/wiki"
        keywords={['wiki', 'guide', 'documentation', 'tools', 'how to', 'tutorial', 'examples']}
      />

      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 p-8 sm:p-10 mb-10 shadow-xl">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-10 -right-10 w-64 h-64 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-white/20 blur-3xl" />
        </div>
        <div className="relative">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 rounded-xl bg-white/20 backdrop-blur-sm">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Tool Wiki</h1>
          </div>
          <p className="text-emerald-100 text-sm sm:text-base max-w-2xl">
            In-depth guides for every tool on UnTrackt. Learn what each tool does, how to use it,
            explore real-world examples, understand key terminology, and discover best practices.
          </p>
          <div className="flex flex-wrap gap-4 mt-6">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/15 backdrop-blur-sm text-white text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              {wikiTools.length} Guides
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/15 backdrop-blur-sm text-white text-sm font-medium">
              <BookOpen className="w-4 h-4" />
              {categories.filter((c) => (toolsByCategory[c.id]?.length || 0) > 0).length} Categories
            </div>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="mb-8">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search wiki guides..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-shadow"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-10">
        {filteredCategories.map((cat) => {
          const colors = categoryColorMap[cat.id]
          const CatIcon = getIcon(cat.icon)
          const catTools = getFilteredTools(cat.id)
          if (catTools.length === 0) return null

          return (
            <section key={cat.id}>
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-lg ${colors.bg} ${colors.darkBg}`}>
                  <CatIcon className={`w-5 h-5 ${colors.icon}`} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">{cat.name}</h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{catTools.length} guides</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {catTools.map((tool) => {
                  const Icon = getIcon(tool.icon)
                  return (
                    <Link
                      key={tool.id}
                      to={`/wiki/${tool.id}`}
                      className="group relative flex items-start gap-3 p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 hover:border-emerald-300 dark:hover:border-emerald-600 hover:shadow-lg hover:shadow-emerald-500/5 transition-all duration-200"
                    >
                      <div className={`p-2 rounded-lg ${colors.bg} ${colors.darkBg} shrink-0 group-hover:scale-110 transition-transform`}>
                        <Icon className={`w-4 h-4 ${colors.icon}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                          {tool.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">
                          {tool.description}
                        </p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-300 dark:text-gray-600 group-hover:text-emerald-400 shrink-0 mt-0.5 transition-colors" />
                    </Link>
                  )
                })}
              </div>
            </section>
          )
        })}
      </div>

      {filteredCategories.length === 0 && (
        <div className="text-center py-16">
          <Search className="w-10 h-10 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
          <p className="text-gray-500 dark:text-gray-400 text-sm">No wiki guides match &ldquo;{filter}&rdquo;</p>
          <button onClick={() => setFilter('')} className="mt-2 text-emerald-600 dark:text-emerald-400 text-sm font-medium hover:underline">
            Clear filter
          </button>
        </div>
      )}
    </div>
  )
}
