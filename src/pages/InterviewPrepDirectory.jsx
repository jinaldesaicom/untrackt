import { useMemo, useCallback, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import SEOHead from '../components/SEOHead.jsx'
import IPSearch from '../components/interviewPrep/IPSearch.jsx'
import IPCategoryTabs from '../components/interviewPrep/IPCategoryTabs.jsx'
import IPCard from '../components/interviewPrep/IPCard.jsx'
import IPCardCompact from '../components/interviewPrep/IPCardCompact.jsx'
import { categoryColorMap, levelColorMap } from '../components/interviewPrep/IPCategoryTabs.jsx'
import { useInterviewPrepFavorites } from '../hooks/useInterviewPrepFavorites.js'
import { useRecentInterviewPrep } from '../hooks/useRecentInterviewPrep.js'
import {
  interviewPrepResources,
  interviewPrepCategories,
  getResourcesByCategory,
  getPopularResources,
  getCategoryCounts,
  getLevelCounts,
  getTotalCount,
} from '../data/interviewPrep.js'

const PREVIEW_COUNT = 4
const POPULAR_LIMIT = 8

const levels = [
  { id: 'all', label: 'All Levels' },
  { id: 'beginner', label: 'Beginner' },
  { id: 'intermediate', label: 'Intermediate' },
  { id: 'advanced', label: 'Advanced' },
]

const pricingFilters = [
  { id: 'all', label: 'All' },
  { id: 'free', label: 'Free' },
  { id: 'freemium', label: 'Free + Paid' },
  { id: 'paid', label: 'Paid' },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Interview Prep Resources Directory',
  description: `Curated directory of ${getTotalCount()}+ interview preparation resources`,
  numberOfItems: getTotalCount(),
  itemListElement: getPopularResources()
    .slice(0, 10)
    .map((r, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: r.name,
      url: r.url,
    })),
}

export default function InterviewPrepDirectory() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeCategory = searchParams.get('cat') || 'all'
  const { favorites, toggleFavorite, isFavorite } = useInterviewPrepFavorites()
  const { recentResources, addRecent } = useRecentInterviewPrep()
  const counts = useMemo(() => getCategoryCounts(), [])
  const levelCounts = useMemo(() => getLevelCounts(), [])
  const totalCount = getTotalCount()

  const [activeLevel, setActiveLevel] = useState('all')
  const [activePricing, setActivePricing] = useState('all')

  const setCategory = useCallback(
    (catId) => {
      if (catId === 'all') {
        setSearchParams({})
      } else {
        setSearchParams({ cat: catId })
      }
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    [setSearchParams],
  )

  const sortResources = useCallback(
    (resources) =>
      [...resources].sort((a, b) => {
        const aFav = favorites.includes(a.id) ? 0 : 1
        const bFav = favorites.includes(b.id) ? 0 : 1
        if (aFav !== bFav) return aFav - bFav
        const aPop = a.isPopular ? 0 : 1
        const bPop = b.isPopular ? 0 : 1
        if (aPop !== bPop) return aPop - bPop
        return a.name.localeCompare(b.name)
      }),
    [favorites],
  )

  const applyFilters = useCallback(
    (resources) => {
      let filtered = resources
      if (activeLevel !== 'all') {
        filtered = filtered.filter((r) => r.level === activeLevel)
      }
      if (activePricing !== 'all') {
        filtered = filtered.filter((r) => r.pricing === activePricing)
      }
      return filtered
    },
    [activeLevel, activePricing],
  )

  const filteredResources = useMemo(() => {
    return sortResources(applyFilters(getResourcesByCategory(activeCategory)))
  }, [activeCategory, sortResources, applyFilters])

  const popularResources = useMemo(() => getPopularResources().slice(0, POPULAR_LIMIT), [])

  const categorySections = useMemo(() => {
    return interviewPrepCategories
      .filter((c) => c.id !== 'all')
      .map((cat) => {
        const all = sortResources(getResourcesByCategory(cat.id))
        return { ...cat, resources: all.slice(0, PREVIEW_COUNT), total: all.length }
      })
  }, [sortResources])

  const catLabel =
    activeCategory === 'all'
      ? 'all'
      : interviewPrepCategories.find((c) => c.id === activeCategory)?.name || activeCategory

  const isAllView = activeCategory === 'all'
  const hasActiveFilters = activeLevel !== 'all' || activePricing !== 'all'

  return (
    <div>
      <SEOHead
        title={`Interview Prep Resources — ${totalCount}+ DSA, Behavioral & Coding Guides | UnTrackt`}
        description={`Curated directory of ${totalCount}+ interview preparation resources. LeetCode patterns, behavioral guides, system design prep, mock interviews, salary negotiation, and more.`}
        path="/interview-prep"
        jsonLd={jsonLd}
      />

      {/* Hero */}
      <section className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-3">
            💼 Interview Prep Resources
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 mb-2 max-w-xl mx-auto">
            Curated collection of {totalCount}+ resources to ace your tech interviews
          </p>
          <p className="text-sm text-gray-400 dark:text-gray-500 mb-6">
            DSA · Behavioral · System Design · Frontend · Backend · Mock Interviews · Salary Negotiation
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-xs sm:text-sm">
            <span className="inline-flex items-center gap-1 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-indigo-700 dark:border-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-200">
              {totalCount}+ resources
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-violet-700 dark:border-violet-700 dark:bg-violet-900/40 dark:text-violet-200">
              {interviewPrepCategories.length - 1} categories
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-green-200 bg-green-50 px-3 py-1 text-green-700 dark:border-green-700 dark:bg-green-900/40 dark:text-green-200">
              {levelCounts.free || 0}+ free resources
            </span>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search */}
        <div className="mb-8 max-w-xl">
          <IPSearch onVisit={addRecent} />
        </div>

        {/* Category Tabs */}
        <div className="mb-4">
          <IPCategoryTabs
            categories={interviewPrepCategories}
            activeCategory={activeCategory}
            onCategoryChange={setCategory}
            counts={counts}
          />
        </div>

        {/* Level + Pricing Filters */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Level:</span>
            {levels.map((l) => {
              const isActive = l.id === activeLevel
              const lColors = l.id !== 'all' ? levelColorMap[l.id] : null
              return (
                <button
                  key={l.id}
                  onClick={() => setActiveLevel(l.id)}
                  className={`text-xs px-2 py-1 rounded-md font-medium transition-colors ${
                    isActive
                      ? lColors
                        ? `${lColors.bg} ${lColors.text}`
                        : 'bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-100'
                      : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {l.label}
                </button>
              )
            })}
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Pricing:</span>
            {pricingFilters.map((p) => {
              const isActive = p.id === activePricing
              return (
                <button
                  key={p.id}
                  onClick={() => setActivePricing(p.id)}
                  className={`text-xs px-2 py-1 rounded-md font-medium transition-colors ${
                    isActive
                      ? 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300'
                      : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {p.label}
                </button>
              )
            })}
          </div>
          {hasActiveFilters && (
            <button
              onClick={() => { setActiveLevel('all'); setActivePricing('all') }}
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Clear filters
            </button>
          )}

          {/* Newsletter cross-links */}
          <div className="inline-flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <span>📮 Newsletters:</span>
            <Link to="/ai-learning?cat=newsletters" className="text-pink-600 dark:text-pink-400 hover:underline">AI</Link>
            <span>·</span>
            <Link to="/system-design?cat=newsletters" className="text-pink-600 dark:text-pink-400 hover:underline">System Design</Link>
          </div>
        </div>

        {/* ── "All" overview: popular + category previews ── */}
        {isAllView && !hasActiveFilters && (
          <>
            {/* Popular Resources */}
            <section className="mb-10">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-1.5">
                <span>⭐</span> Popular Resources
              </h3>
              <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:overflow-visible sm:pb-0">
                {popularResources.map((resource) => (
                  <div key={resource.id} className="min-w-[260px] snap-start sm:min-w-0">
                    <IPCard
                      resource={resource}
                      isFavorite={isFavorite(resource.id)}
                      onToggleFavorite={toggleFavorite}
                      onVisit={addRecent}
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* Category Sections — 4 preview cards each */}
            {categorySections.map((cat) => {
              const colors = categoryColorMap[cat.id] || categoryColorMap.dsa
              return (
                <section key={cat.id} className="mb-8">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-1.5">
                      <span>{cat.emoji}</span> {cat.name}
                      <span className={`ml-1.5 text-[11px] font-medium px-1.5 py-0.5 rounded-full ${colors.bg} ${colors.text}`}>
                        {cat.total}
                      </span>
                    </h3>
                    <button
                      onClick={() => setCategory(cat.id)}
                      className="inline-flex items-center gap-1 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
                    >
                      View all {cat.total}
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {cat.resources.map((resource) => (
                      <IPCard
                        key={resource.id}
                        resource={resource}
                        isFavorite={isFavorite(resource.id)}
                        onToggleFavorite={toggleFavorite}
                        onVisit={addRecent}
                      />
                    ))}
                  </div>
                </section>
              )
            })}
          </>
        )}

        {/* ── Filtered "All" view or specific category view: full grid ── */}
        {(!isAllView || hasActiveFilters) && (
          <section>
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                {isAllView ? 'All Resources' : catLabel}{' '}
                <span className="text-sm font-normal text-gray-400">({filteredResources.length})</span>
              </h2>
            </div>
            {filteredResources.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {filteredResources.map((resource) => (
                  <IPCard
                    key={resource.id}
                    resource={resource}
                    isFavorite={isFavorite(resource.id)}
                    onToggleFavorite={toggleFavorite}
                    onVisit={addRecent}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">No resources match the current filters.</p>
                <button
                  onClick={() => { setActiveLevel('all'); setActivePricing('all') }}
                  className="mt-2 text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  Clear filters
                </button>
              </div>
            )}
          </section>
        )}

        {/* Recently Visited */}
        {recentResources.length > 0 && (
          <section className="mt-12">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-1.5">
              <span>🕐</span> Recently Visited
            </h3>
            <div className="space-y-1.5">
              {recentResources.map((resource) => (
                <IPCardCompact key={resource.id} resource={resource} onVisit={addRecent} />
              ))}
            </div>
          </section>
        )}

        {/* Footer Note */}
        <div className="mt-12 text-center text-xs text-gray-400 dark:text-gray-500">
          <p>Resources are curated and verified. If you find a broken link or have a suggestion,</p>
          <a href="mailto:hello@untrackt.com?subject=Interview Prep Resource Suggestion" className="text-indigo-500 hover:underline">
            let us know
          </a>
          .
        </div>
      </div>
    </div>
  )
}
