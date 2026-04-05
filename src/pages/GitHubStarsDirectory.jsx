import { useMemo, useCallback } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import SEOHead from '../components/SEOHead.jsx'
import GhStarsSearch from '../components/githubStars/GhStarsSearch.jsx'
import GhCategoryTabs from '../components/githubStars/GhCategoryTabs.jsx'
import RepoCard from '../components/githubStars/RepoCard.jsx'
import RepoCardCompact from '../components/githubStars/RepoCardCompact.jsx'
import { categoryColorMap } from '../components/githubStars/GhCategoryTabs.jsx'
import useGithubStarsFavorites from '../hooks/useGithubStarsFavorites.js'
import SponsorBanner from '../components/SponsorBanner.jsx'
import useRecentGithubRepos from '../hooks/useRecentGithubRepos.js'
import {
  githubStars,
  githubStarsCategories,
  getReposByCategory,
  getPopularRepos,
  getCategoryCounts,
  getTotalCount,
} from '../data/githubStars.js'

const PREVIEW_COUNT = 4
const POPULAR_LIMIT = 8

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Most Starred GitHub Repositories',
  description: 'Curated directory of 200+ most-starred GitHub repositories',
  numberOfItems: getTotalCount(),
  itemListElement: getPopularRepos()
    .slice(0, 10)
    .map((r, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: r.name,
      url: r.repoUrl,
    })),
}

export default function GitHubStarsDirectory() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeCategory = searchParams.get('cat') || 'all'
  const { favorites, toggleFavorite, isFavorite } = useGithubStarsFavorites()
  const { recentRepos, addRecent } = useRecentGithubRepos()
  const counts = useMemo(() => getCategoryCounts(), [])
  const totalCount = getTotalCount()

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

  const sortRepos = useCallback(
    (repos) =>
      [...repos].sort((a, b) => {
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

  const filteredRepos = useMemo(() => {
    return sortRepos(getReposByCategory(activeCategory))
  }, [activeCategory, sortRepos])

  const popularRepos = useMemo(() => getPopularRepos().slice(0, POPULAR_LIMIT), [])

  const categorySections = useMemo(() => {
    return githubStarsCategories
      .filter((c) => c.id !== 'all')
      .map((cat) => {
        const all = sortRepos(getReposByCategory(cat.id))
        return { ...cat, repos: all.slice(0, PREVIEW_COUNT), total: all.length }
      })
  }, [sortRepos])

  const catLabel =
    activeCategory === 'all'
      ? 'all'
      : githubStarsCategories.find((c) => c.id === activeCategory)?.name || activeCategory

  const isAllView = activeCategory === 'all'

  return (
    <div>
      <SEOHead
        title="Most Starred GitHub Repositories — 200+ Curated Repos | UnTrackt"
        description="Discover the most starred GitHub repositories across frontend, backend, AI, DevOps, and more. Curated directory of 200+ top open source projects."
        path="/github-stars"
        jsonLd={jsonLd}
      />

      {/* Hero */}
      <section className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-3">
            ⭐ Most Starred GitHub Repos
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 mb-2 max-w-xl mx-auto">
            Curated directory of {totalCount}+ most-starred open source repositories
          </p>
          <p className="text-sm text-gray-400 dark:text-gray-500 mb-6">
            Static snapshots · No live API calls · Last updated March 2026
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-xs sm:text-sm">
            <span className="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-amber-700 dark:border-amber-700 dark:bg-amber-900/40 dark:text-amber-200">
              {totalCount}+ repos
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-indigo-700 dark:border-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-200">
              {githubStarsCategories.length - 1} categories
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-emerald-700 dark:border-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200">
              100% open source
            </span>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search */}
        <div className="mb-8 max-w-xl">
          <GhStarsSearch onVisit={addRecent} />
        </div>

        {/* Category Tabs */}
        <div className="mb-6">
          <GhCategoryTabs
            categories={githubStarsCategories}
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
            {/* Popular Repos */}
            <section className="mb-10">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-1.5">
                <span>⭐</span> Popular Repos
              </h3>
              <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:overflow-visible sm:pb-0">
                {popularRepos.map((repo) => (
                  <div key={repo.id} className="min-w-[260px] snap-start sm:min-w-0">
                    <RepoCard
                      repo={repo}
                      isFavorite={isFavorite(repo.id)}
                      onToggleFavorite={toggleFavorite}
                      onVisit={addRecent}
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* Category Sections — 4 preview cards each */}
            {categorySections.map((cat) => {
              const colors = categoryColorMap[cat.id] || categoryColorMap.frontend
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
                    {cat.repos.map((repo) => (
                      <RepoCard
                        key={repo.id}
                        repo={repo}
                        isFavorite={isFavorite(repo.id)}
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

        {/* ── Specific category view: full grid ── */}
        {!isAllView && (
          <section>
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                {catLabel}{' '}
                <span className="text-sm font-normal text-gray-400">({filteredRepos.length})</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {filteredRepos.map((repo) => (
                <RepoCard
                  key={repo.id}
                  repo={repo}
                  isFavorite={isFavorite(repo.id)}
                  onToggleFavorite={toggleFavorite}
                  onVisit={addRecent}
                />
              ))}
            </div>
          </section>
        )}

        {/* Recently Visited */}
        {recentRepos.length > 0 && (
          <section className="mt-12">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-1.5">
              <span>🕐</span> Recently Visited
            </h3>
            <div className="space-y-1.5">
              {recentRepos.map((repo) => (
                <RepoCardCompact key={repo.id} repo={repo} onVisit={addRecent} />
              ))}
            </div>
          </section>
        )}

        {/* Footer Note */}
        <div className="mt-12 text-center text-sm text-gray-400 dark:text-gray-500 border-t border-gray-100 dark:border-gray-800 pt-8">
          <p>
            Star counts are approximate snapshots last updated March 2026. Repository data is maintained manually.
          </p>
        </div>

        <SponsorBanner />
      </div>
    </div>
  )
}
