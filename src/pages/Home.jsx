import { useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Lock, Zap, Globe, Dices } from 'lucide-react'
import SearchBar from '../components/SearchBar.jsx'
import ToolGrid from '../components/ToolGrid.jsx'
import SEOHead from '../components/SEOHead.jsx'
import tools, { categories, categoryColorMap, getToolsByCategory } from '../data/tools.js'
import { getIcon } from '../icons.js'
import { getRecentTools } from '../utils/storage.js'
import { useFavorites } from '../hooks/useFavorites.js'
import { getAllStats, getTotalVisits } from '../utils/localStats.js'
import { getToolOfTheDay, getPopularTools, getNewTools, getAllTags } from '../search/searchEngine.js'

export default function Home() {
  const navigate = useNavigate()
  const { favorites } = useFavorites()
  const toolOfTheDay = useMemo(() => getToolOfTheDay(), [])
  const popularTools = useMemo(() => getPopularTools().slice(0, 6), [])
  const newTools = useMemo(() => getNewTools().slice(0, 6), [])
  const topTags = useMemo(() => getAllTags().slice(0, 20), [])

  const totalVisits = getTotalVisits()
  const isReturning = totalVisits > 5
  const isPowerUser = totalVisits > 50

  const favoriteTools = useMemo(() => {
    return favorites
      .map((id) => tools.find((tool) => tool.id === id))
      .filter(Boolean)
  }, [favorites])

  const recentTools = useMemo(() => {
    const recentIds = getRecentTools()
    return recentIds
      .map((id) => tools.find((tool) => tool.id === id))
      .filter(Boolean)
      .slice(0, 6)
  }, [])

  const stats = getAllStats()
  const usedCount = Object.keys(stats.tools || {}).length

  const goToRandom = () => {
    const randomTool = tools[Math.floor(Math.random() * tools.length)]
    navigate(randomTool.path)
  }

  return (
    <div>
      <SEOHead
        title="Free Online Tools - No Tracking | UnTrackt"
        description="228+ free tools for developers, students, freelancers and more. Runs entirely in your browser. Zero tracking, zero accounts, zero data collection."
        path="/"
      />

      <section className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20 text-center">
          <div className="mb-4 flex justify-center">
            <span className="beta-badge">Beta Release</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-3">
            <span className="inline-block animate-count-up">{tools.length}+</span> free tools. Runs in your browser. Zero tracking.
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 mb-2 max-w-xl mx-auto">
            No accounts. No servers. No nonsense.
          </p>
          {isPowerUser ? (
            <p className="text-sm text-indigo-600 dark:text-indigo-400 mb-6">Welcome back, power user! You&apos;ve used {usedCount} tools across {totalVisits} visits.</p>
          ) : isReturning ? (
            <p className="text-sm text-indigo-600 dark:text-indigo-400 mb-6">Welcome back! Pick up where you left off.</p>
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Explore tools across {categories.length} categories.</p>
          )}
          <div className="max-w-lg mx-auto">
            <SearchBar large />
          </div>
          <div className="mt-7 flex flex-wrap justify-center gap-3 text-xs sm:text-sm">
            <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-emerald-700 dark:border-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200"><Lock className="w-3.5 h-3.5" /> No tracking</span>
            <span className="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-amber-700 dark:border-amber-700 dark:bg-amber-900/40 dark:text-amber-200"><Zap className="w-3.5 h-3.5" /> Instant results</span>
            <span className="inline-flex items-center gap-1 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-indigo-700 dark:border-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-200"><Globe className="w-3.5 h-3.5" /> Works offline</span>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" aria-label="Discover tools">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Discover</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link to={toolOfTheDay.path} className="rounded-2xl border border-indigo-200 bg-indigo-50 p-6 transition-all hover:shadow-lg dark:border-indigo-700 dark:bg-indigo-900/30">
            <p className="text-xs uppercase tracking-wide text-indigo-600 dark:text-indigo-300">Tool of the day</p>
            <h3 className="mt-1 text-2xl font-bold text-indigo-900 dark:text-indigo-100">{toolOfTheDay.name}</h3>
            <p className="mt-2 text-sm text-indigo-800/90 dark:text-indigo-200">{toolOfTheDay.description}</p>
          </Link>
          <button
            onClick={goToRandom}
            className="rounded-2xl border border-dashed border-indigo-300 dark:border-indigo-700 bg-indigo-50 dark:bg-indigo-900/20 p-6 text-center transition-all hover:shadow-lg hover:border-indigo-400 dark:hover:border-indigo-500 cursor-pointer"
          >
            <Dices className="w-8 h-8 text-indigo-500 mx-auto mb-2" />
            <p className="text-xs uppercase tracking-wide text-indigo-600 dark:text-indigo-300">Feeling lucky?</p>
            <h3 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">Random Tool</h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Discover something new</p>
          </button>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Browse by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((cat) => {
            const Icon = getIcon(cat.icon)
            const colors = categoryColorMap[cat.id]
            const catTools = getToolsByCategory(cat.id)
            const topNames = catTools.filter((t) => t.isPopular).slice(0, 3).map((t) => t.name)
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
                <span className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{catTools.length} tools</span>
                {topNames.length > 0 && (
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">{topNames.join(', ')}</p>
                )}
              </Link>
            )
          })}
        </div>
      </section>

      {favoriteTools.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="flex items-end justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Saved tools</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Quick access to the tools you use most</p>
            </div>
            {favoriteTools.length > 6 && (
              <Link to="/favorites" className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline">
                View all favorites
              </Link>
            )}
          </div>
          <ToolGrid tools={favoriteTools.slice(0, 6)} />
        </section>
      )}

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

      {popularTools.length > 0 && favoriteTools.length < 6 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Popular Tools</h2>
          </div>
          <ToolGrid tools={popularTools} />
        </section>
      )}

      {topTags.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12" aria-label="Browse by tag">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Browse by Tag</h2>
          <div className="flex flex-wrap gap-2">
            {topTags.map(({ tag, count }) => (
              <Link
                key={tag}
                to={`/tags/${encodeURIComponent(tag)}`}
                className="rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-1.5 text-xs text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:border-indigo-200 dark:hover:border-indigo-700 transition-colors"
              >
                {tag} <span className="text-gray-400 ml-1">{count}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Resources Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">📚 Resources</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {[
            { emoji: '🤖', name: 'AI Tools Directory', desc: '200+ AI tools', to: '/ai-directory', border: 'border-violet-200', darkBorder: 'dark:border-violet-800', bg: 'bg-violet-50', darkBg: 'dark:bg-violet-950/30', text: 'text-violet-700', darkText: 'dark:text-violet-300' },
            { emoji: '📡', name: 'Status Pages', desc: '200+ status links', to: '/status-pages', border: 'border-emerald-200', darkBorder: 'dark:border-emerald-800', bg: 'bg-emerald-50', darkBg: 'dark:bg-emerald-950/30', text: 'text-emerald-700', darkText: 'dark:text-emerald-300' },
            { emoji: '⭐', name: 'GitHub Stars', desc: '200+ top repos', to: '/github-stars', border: 'border-amber-200', darkBorder: 'dark:border-amber-800', bg: 'bg-amber-50', darkBg: 'dark:bg-amber-950/30', text: 'text-amber-700', darkText: 'dark:text-amber-300' },
            { emoji: '🧠', name: 'AI Learning', desc: '150+ learning resources', to: '/ai-learning', border: 'border-purple-200', darkBorder: 'dark:border-purple-800', bg: 'bg-purple-50', darkBg: 'dark:bg-purple-950/30', text: 'text-purple-700', darkText: 'dark:text-purple-300' },
            { emoji: '🎓', name: 'Certifications', desc: '140+ cert guides', to: '/certifications', border: 'border-teal-200', darkBorder: 'dark:border-teal-800', bg: 'bg-teal-50', darkBg: 'dark:bg-teal-950/30', text: 'text-teal-700', darkText: 'dark:text-teal-300' },
            { emoji: '🏗️', name: 'System Design', desc: '100+ resources', to: '/system-design', border: 'border-fuchsia-200', darkBorder: 'dark:border-fuchsia-800', bg: 'bg-fuchsia-50', darkBg: 'dark:bg-fuchsia-950/30', text: 'text-fuchsia-700', darkText: 'dark:text-fuchsia-300' },
            { emoji: '💼', name: 'Interview Prep', desc: '100+ resources', to: '/interview-prep', border: 'border-rose-200', darkBorder: 'dark:border-rose-800', bg: 'bg-rose-50', darkBg: 'dark:bg-rose-950/30', text: 'text-rose-700', darkText: 'dark:text-rose-300' },
          ].map((r) => (
            <Link
              key={r.to}
              to={r.to}
              className={`flex flex-col items-center text-center p-4 rounded-xl border ${r.border} ${r.darkBorder} ${r.bg} ${r.darkBg} hover:shadow-md hover:-translate-y-0.5 transition-all duration-200`}
            >
              <span className="text-2xl mb-2" aria-hidden="true">{r.emoji}</span>
              <span className={`font-semibold text-sm ${r.text} ${r.darkText}`}>{r.name}</span>
              <span className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{r.desc}</span>
            </Link>
          ))}
        </div>
      </section>

    </div>
  )
}
