import { useMemo, useCallback } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import SEOHead from '../components/SEOHead.jsx'
import CheatsheetSearch from '../components/cheatsheets/CheatsheetSearch.jsx'
import CheatsheetCategoryTabs from '../components/cheatsheets/CheatsheetCategoryTabs.jsx'
import CheatsheetCard from '../components/cheatsheets/CheatsheetCard.jsx'
import CheatsheetCardCompact from '../components/cheatsheets/CheatsheetCardCompact.jsx'
import { categoryColorMap } from '../components/cheatsheets/CheatsheetCategoryTabs.jsx'
import useCheatsheetFavorites from '../hooks/useCheatsheetFavorites.js'
import useRecentCheatsheets from '../hooks/useRecentCheatsheets.js'
import {
  cheatsheets,
  cheatsheetCategories,
  getCheatsheetsByCategory,
  getPopularCheatsheets,
  getCategoryCounts,
  getTotalCommandCount,
} from '../data/cheatsheets.js'

const PREVIEW_COUNT = 4
const POPULAR_LIMIT = 8

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Developer Cheatsheets',
  description: `${cheatsheets.length}+ developer cheatsheets with ${getTotalCommandCount()}+ commands`,
  numberOfItems: cheatsheets.length,
  itemListElement: getPopularCheatsheets()
    .slice(0, 10)
    .map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: `${s.name} Cheatsheet`,
      url: `https://untrackt.com/cheatsheets/${s.id}`,
    })),
}

export default function CheatsheetsDirectory() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeCategory = searchParams.get('cat') || 'all'
  const { favorites, toggleFavorite, isFavorite } = useCheatsheetFavorites()
  const { recentSheets, addRecent } = useRecentCheatsheets()
  const counts = useMemo(() => getCategoryCounts(), [])
  const totalCommands = getTotalCommandCount()

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

  const sortSheets = useCallback(
    (sheets) =>
      [...sheets].sort((a, b) => {
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

  const filteredSheets = useMemo(() => {
    return sortSheets(getCheatsheetsByCategory(activeCategory))
  }, [activeCategory, sortSheets])

  const popularSheets = useMemo(() => getPopularCheatsheets().slice(0, POPULAR_LIMIT), [])

  const categorySections = useMemo(() => {
    return cheatsheetCategories
      .filter((c) => c.id !== 'all')
      .map((cat) => {
        const all = sortSheets(getCheatsheetsByCategory(cat.id))
        return { ...cat, sheets: all.slice(0, PREVIEW_COUNT), total: all.length }
      })
  }, [sortSheets])

  const catLabel =
    activeCategory === 'all'
      ? 'all'
      : cheatsheetCategories.find((c) => c.id === activeCategory)?.name || activeCategory

  const isAllView = activeCategory === 'all'

  return (
    <div>
      <SEOHead
        title={`Developer Cheatsheets — ${cheatsheets.length}+ Quick-Reference Guides | UnTrackt`}
        description={`${cheatsheets.length}+ developer cheatsheets with ${totalCommands}+ commands. Git, Docker, Kubernetes, React, Python, SQL, and more. Copy commands instantly.`}
        path="/cheatsheets"
        jsonLd={jsonLd}
      />

      {/* Hero */}
      <section className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-3">
            📋 Developer Cheatsheets
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 mb-2 max-w-xl mx-auto">
            Quick-reference command guides for {cheatsheets.length}+ tools and technologies
          </p>
          <p className="text-sm text-gray-400 dark:text-gray-500 mb-6">
            Copy commands instantly — no accounts, runs in your browser
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-xs sm:text-sm">
            <span className="inline-flex items-center gap-1 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-indigo-700 dark:border-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-200">
              {cheatsheets.length}+ cheatsheets
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-emerald-700 dark:border-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200">
              {totalCommands}+ commands
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-amber-700 dark:border-amber-700 dark:bg-amber-900/40 dark:text-amber-200">
              {cheatsheetCategories.length - 1} categories
            </span>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search */}
        <div className="mb-8 max-w-xl">
          <CheatsheetSearch onVisit={addRecent} />
        </div>

        {/* Category Tabs */}
        <div className="mb-6">
          <CheatsheetCategoryTabs
            categories={cheatsheetCategories}
            activeCategory={activeCategory}
            onCategoryChange={setCategory}
            counts={counts}
          />
        </div>

        {/* Newsletter cross-links */}
        <div className="flex items-center gap-2 mb-6 text-xs text-gray-500 dark:text-gray-400">
          <span>📮 Tech Newsletters:</span>
          <Link to="/ai-learning?cat=newsletters" className="text-pink-600 dark:text-pink-400 hover:underline">AI Newsletters</Link>
          <span>·</span>
          <Link to="/system-design?cat=newsletters" className="text-pink-600 dark:text-pink-400 hover:underline">System Design Newsletters</Link>
        </div>

        {/* ── "All" overview: popular + category previews ── */}
        {isAllView && (
          <>
            {/* Popular Cheatsheets */}
            <section className="mb-10">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-1.5">
                <span>⭐</span> Popular Cheatsheets
              </h3>
              <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:overflow-visible sm:pb-0">
                {popularSheets.map((sheet) => (
                  <div key={sheet.id} className="min-w-[260px] snap-start sm:min-w-0">
                    <CheatsheetCard
                      sheet={sheet}
                      isFavorite={isFavorite(sheet.id)}
                      onToggleFavorite={toggleFavorite}
                      onVisit={addRecent}
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* Category Sections — preview cards */}
            {categorySections.map((cat) => {
              const colors = categoryColorMap[cat.id] || categoryColorMap.languages
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
                    {cat.sheets.map((sheet) => (
                      <CheatsheetCard
                        key={sheet.id}
                        sheet={sheet}
                        isFavorite={isFavorite(sheet.id)}
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

        {/* ── Category view: full grid ── */}
        {!isAllView && (
          <section>
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                {catLabel}{' '}
                <span className="text-sm font-normal text-gray-400">({filteredSheets.length})</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {filteredSheets.map((sheet) => (
                <CheatsheetCard
                  key={sheet.id}
                  sheet={sheet}
                  isFavorite={isFavorite(sheet.id)}
                  onToggleFavorite={toggleFavorite}
                  onVisit={addRecent}
                />
              ))}
            </div>
          </section>
        )}

        {/* Recently Visited */}
        {recentSheets.length > 0 && (
          <section className="mt-12">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-1.5">
              <span>🕐</span> Recently Visited
            </h3>
            <div className="space-y-1.5">
              {recentSheets.map((sheet) => (
                <CheatsheetCardCompact key={sheet.id} sheet={sheet} onVisit={addRecent} />
              ))}
            </div>
          </section>
        )}

        {/* Footer Note */}
        <div className="mt-12 text-center text-sm text-gray-400 dark:text-gray-500 border-t border-gray-100 dark:border-gray-800 pt-8">
          <p>
            Cheatsheets are maintained by the community. If you spot an error,{' '}
            <a
              href="mailto:support@untrackt.com?subject=Cheatsheet%20fix"
              className="text-indigo-500 hover:underline"
            >
              let us know
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
