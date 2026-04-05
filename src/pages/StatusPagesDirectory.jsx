import { useMemo, useCallback } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { Copy, ChevronRight } from 'lucide-react'
import SEOHead from '../components/SEOHead.jsx'
import StatusPagesSearch from '../components/statusPages/StatusPagesSearch.jsx'
import CategoryTabs from '../components/statusPages/CategoryTabs.jsx'
import ServiceCard from '../components/statusPages/ServiceCard.jsx'
import ServiceCardCompact from '../components/statusPages/ServiceCardCompact.jsx'
import { categoryColorMap } from '../components/statusPages/CategoryTabs.jsx'
import useStatusFavorites from '../hooks/useStatusFavorites.js'
import SponsorBanner from '../components/SponsorBanner.jsx'
import useRecentStatusPages from '../hooks/useRecentStatusPages.js'
import useToast from '../hooks/useToast.jsx'
import {
  statusPages,
  statusPageCategories,
  getServicesByCategory,
  getPopularServices,
  getCategoryCounts,
  getTotalCount,
} from '../data/statusPages.js'

const PREVIEW_COUNT = 4
const POPULAR_LIMIT = 8

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Service Status Pages Directory',
  description: 'Official status pages for 200+ popular services',
  numberOfItems: getTotalCount(),
  itemListElement: getPopularServices()
    .slice(0, 10)
    .map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: `${s.name} Status Page`,
      url: s.statusUrl,
    })),
}

export default function StatusPagesDirectory() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeCategory = searchParams.get('cat') || 'all'
  const { favorites, toggleFavorite, isFavorite } = useStatusFavorites()
  const { recentServices, addRecent } = useRecentStatusPages()
  const { showToast } = useToast()
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

  const sortServices = useCallback(
    (services) =>
      [...services].sort((a, b) => {
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

  const filteredServices = useMemo(() => {
    return sortServices(getServicesByCategory(activeCategory))
  }, [activeCategory, sortServices])

  const popularServices = useMemo(() => getPopularServices().slice(0, POPULAR_LIMIT), [])

  // Category sections for the "All" overview — each with a preview of PREVIEW_COUNT cards
  const categorySections = useMemo(() => {
    return statusPageCategories
      .filter((c) => c.id !== 'all')
      .map((cat) => {
        const all = sortServices(getServicesByCategory(cat.id))
        return { ...cat, services: all.slice(0, PREVIEW_COUNT), total: all.length }
      })
  }, [sortServices])

  const handleCopyAll = useCallback(() => {
    const services = getServicesByCategory(activeCategory)
    const text = services.map((s) => `${s.name}: ${s.statusUrl}`).join('\n')
    navigator.clipboard.writeText(text).then(() => {
      showToast({ message: `Copied ${services.length} URLs!`, type: 'success' })
    })
  }, [activeCategory, showToast])

  const catLabel =
    activeCategory === 'all'
      ? 'all'
      : statusPageCategories.find((c) => c.id === activeCategory)?.name || activeCategory

  const isAllView = activeCategory === 'all'

  return (
    <div>
      <SEOHead
        title="Service Status Pages Directory — 200+ Official Status Links | UnTrackt"
        description="Quick links to official status pages for AWS, GitHub, Stripe, Slack, Google Cloud, and 200+ popular services. Bookmark this page for instant access when services go down."
        path="/status-pages"
        jsonLd={jsonLd}
      />

      {/* Hero */}
      <section className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-3">
            📡 Service Status Pages
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 mb-2 max-w-xl mx-auto">
            Quick links to official status pages for {totalCount}+ popular services
          </p>
          <p className="text-sm text-gray-400 dark:text-gray-500 mb-6">
            No live checking — links to official status pages only
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-xs sm:text-sm">
            <span className="inline-flex items-center gap-1 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-indigo-700 dark:border-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-200">
              {totalCount}+ services
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-emerald-700 dark:border-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200">
              {statusPageCategories.length - 1} categories
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-amber-700 dark:border-amber-700 dark:bg-amber-900/40 dark:text-amber-200">
              Always up to date
            </span>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search */}
        <div className="mb-8 max-w-xl">
          <StatusPagesSearch onVisit={addRecent} />
        </div>

        {/* Category Tabs */}
        <div className="mb-6">
          <CategoryTabs
            categories={statusPageCategories}
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
            {/* Popular Services — horizontal scroll on mobile, grid on desktop */}
            <section className="mb-10">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-1.5">
                <span>⭐</span> Popular Services
              </h3>
              <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:overflow-visible sm:pb-0">
                {popularServices.map((service) => (
                  <div key={service.id} className="min-w-[260px] snap-start sm:min-w-0">
                    <ServiceCard
                      service={service}
                      isFavorite={isFavorite(service.id)}
                      onToggleFavorite={toggleFavorite}
                      onVisit={addRecent}
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* Category Sections — 4 preview cards each */}
            {categorySections.map((cat) => {
              const colors = categoryColorMap[cat.id] || categoryColorMap.cloud
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
                    {cat.services.map((service) => (
                      <ServiceCard
                        key={service.id}
                        service={service}
                        isFavorite={isFavorite(service.id)}
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
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                {catLabel}{' '}
                <span className="text-sm font-normal text-gray-400">({filteredServices.length})</span>
              </h2>
              <button
                onClick={handleCopyAll}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <Copy className="w-3.5 h-3.5" />
                Copy {catLabel} URLs
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {filteredServices.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  isFavorite={isFavorite(service.id)}
                  onToggleFavorite={toggleFavorite}
                  onVisit={addRecent}
                />
              ))}
            </div>
          </section>
        )}

        {/* Recently Visited */}
        {recentServices.length > 0 && (
          <section className="mt-12">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-1.5">
              <span>🕐</span> Recently Visited
            </h3>
            <div className="space-y-1.5">
              {recentServices.map((service) => (
                <ServiceCardCompact key={service.id} service={service} onVisit={addRecent} />
              ))}
            </div>
          </section>
        )}

        {/* Footer Note */}
        <div className="mt-12 text-center text-sm text-gray-400 dark:text-gray-500 border-t border-gray-100 dark:border-gray-800 pt-8">
          <p>
            Status page URLs are maintained manually. If a URL is outdated, please{' '}
            <a
              href="mailto:status@untrackt.com?subject=Outdated%20status%20URL"
              className="text-indigo-500 hover:underline"
            >
              let us know
            </a>
            .
          </p>
        </div>

        <SponsorBanner />
      </div>
    </div>
  )
}
