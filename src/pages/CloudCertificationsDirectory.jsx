import { useState, useMemo, useCallback } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import {
  certifications,
  certCategories,
  certLevels,
  getCertsByCategory,
  getPopularCerts,
  getCategoryCounts,
  getLevelCounts,
} from '../data/cloudCertifications.js'
import CertCategoryTabs from '../components/certifications/CertCategoryTabs.jsx'
import CertCard from '../components/certifications/CertCard.jsx'
import CertCardCompact from '../components/certifications/CertCardCompact.jsx'
import SponsorBanner from '../components/SponsorBanner.jsx'
import CertSearch from '../components/certifications/CertSearch.jsx'
import useCertFavorites from '../hooks/useCertFavorites.js'
import useRecentCerts from '../hooks/useRecentCerts.js'
import { levelColorMap } from '../components/certifications/CertCategoryTabs.jsx'

const PREVIEW_COUNT = 4

export default function CloudCertificationsDirectory() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeCategory = searchParams.get('cat') || 'all'
  const activeLevel = searchParams.get('level') || 'all'

  const { favorites, toggleFavorite, isFavorite } = useCertFavorites()
  const { recentCerts, addRecent } = useRecentCerts()

  const [sortBy, setSortBy] = useState('popular')

  const setCategory = useCallback((cat) => {
    const p = new URLSearchParams(searchParams)
    if (cat === 'all') p.delete('cat'); else p.set('cat', cat)
    setSearchParams(p, { replace: true })
  }, [searchParams, setSearchParams])

  const setLevel = useCallback((lvl) => {
    const p = new URLSearchParams(searchParams)
    if (lvl === 'all') p.delete('level'); else p.set('level', lvl)
    setSearchParams(p, { replace: true })
  }, [searchParams, setSearchParams])

  const categoryCounts = useMemo(() => getCategoryCounts(), [])

  const filteredCerts = useMemo(() => {
    let certs = getCertsByCategory(activeCategory)
    if (activeLevel !== 'all') {
      certs = certs.filter((c) => c.level === activeLevel)
    }
    return certs
  }, [activeCategory, activeLevel])

  const levelCounts = useMemo(() => getLevelCounts(getCertsByCategory(activeCategory)), [activeCategory])

  const sortedCerts = useMemo(() => {
    const arr = [...filteredCerts]
    arr.sort((a, b) => {
      const aFav = favorites.includes(a.id) ? 1 : 0
      const bFav = favorites.includes(b.id) ? 1 : 0
      if (aFav !== bFav) return bFav - aFav
      if (sortBy === 'difficulty-asc') return a.difficulty - b.difficulty
      if (sortBy === 'difficulty-desc') return b.difficulty - a.difficulty
      if (sortBy === 'name') return a.name.localeCompare(b.name)
      // popular (default)
      const aPop = a.isPopular ? 1 : 0
      const bPop = b.isPopular ? 1 : 0
      if (aPop !== bPop) return bPop - aPop
      return a.name.localeCompare(b.name)
    })
    return arr
  }, [filteredCerts, favorites, sortBy])

  const popularCerts = useMemo(() => getPopularCerts().slice(0, 8), [])

  const isAllView = activeCategory === 'all' && activeLevel === 'all'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Cloud Certifications Guide',
    description: `${certifications.length}+ cloud certifications with exam details, difficulty ratings, and free study resources`,
    numberOfItems: certifications.length,
    itemListElement: popularCerts.slice(0, 10).map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: `${c.name} (${c.examCode})`,
      url: c.officialUrl,
    })),
  }

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>{`Cloud Certifications Guide — ${certifications.length}+ Exam Guides & Free Resources | UnTrackt`}</title>
        <meta name="description" content={`Curated guide to ${certifications.length}+ cloud certifications — AWS, Azure, GCP, Kubernetes, Terraform, and more. Difficulty ratings, exam costs, and free study resources.`} />
        <link rel="canonical" href="https://untrackt.com/certifications" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* Hero */}
      <section className="bg-gradient-to-b from-indigo-50 via-white to-white dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-3">
            🎓 Cloud Certifications Guide
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-4">
            Exam details, difficulty ratings & free study resources for {certifications.length}+ cloud certifications
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1"><span className="text-indigo-500 font-bold">{certifications.length}+</span> certifications</span>
            <span className="text-gray-300 dark:text-gray-600">·</span>
            <span className="flex items-center gap-1"><span className="text-indigo-500 font-bold">{certCategories.length - 1}</span> providers</span>
            <span className="text-gray-300 dark:text-gray-600">·</span>
            <span className="flex items-center gap-1"><span className="text-indigo-500 font-bold">{certifications.filter((c) => c.cost === 'Free' || c.freeResources.length > 0).length}+</span> with free resources</span>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Search */}
        <CertSearch onVisit={addRecent} />

        {/* Category Tabs */}
        <CertCategoryTabs
          categories={certCategories}
          activeCategory={activeCategory}
          onCategoryChange={setCategory}
          counts={categoryCounts}
        />

        {/* Level filter pills */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mr-1">Level:</span>
          {certLevels.map((lvl) => {
            const isActive = activeLevel === lvl.id
            const lvlColor = levelColorMap[lvl.id]
            const count = levelCounts[lvl.id] || 0
            return (
              <button
                key={lvl.id}
                onClick={() => setLevel(lvl.id)}
                className={`px-2.5 py-1 text-xs rounded-full font-medium transition-all ${
                  isActive
                    ? lvlColor
                      ? `${lvlColor.bg} ${lvlColor.darkBg} ${lvlColor.text} ${lvlColor.darkText}`
                      : 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <span className="hidden sm:inline">{lvl.name}</span>
                <span className="sm:hidden">{lvl.shortName}</span>
                {lvl.id !== 'all' && count > 0 && (
                  <span className="ml-1 text-[10px] opacity-70">({count})</span>
                )}
              </button>
            )
          })}
        </div>

        {/* Sort (only shown on category/level view) */}
        {!isAllView && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Sort:</span>
            {[
              { id: 'popular', label: 'Popular' },
              { id: 'difficulty-asc', label: 'Easiest' },
              { id: 'difficulty-desc', label: 'Hardest' },
              { id: 'name', label: 'A–Z' },
            ].map((s) => (
              <button
                key={s.id}
                onClick={() => setSortBy(s.id)}
                className={`px-2.5 py-1 text-xs rounded-full font-medium transition-all ${
                  sortBy === s.id
                    ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        )}

        {/* Newsletter cross-links */}
        <div className="flex items-center gap-2 mb-6 text-xs text-gray-500 dark:text-gray-400">
          <span>📮 Tech Newsletters:</span>
          <Link to="/ai-learning?cat=newsletters" className="text-pink-600 dark:text-pink-400 hover:underline">AI Newsletters</Link>
          <span>·</span>
          <Link to="/system-design?cat=newsletters" className="text-pink-600 dark:text-pink-400 hover:underline">System Design Newsletters</Link>
        </div>

        {/* === "ALL" CATEGORY-FIRST LANDING === */}
        {isAllView ? (
          <div className="space-y-10">
            {/* Popular */}
            <section>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                ⭐ Popular Certifications
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {popularCerts.map((cert) => (
                  <CertCard
                    key={cert.id}
                    cert={cert}
                    isFavorite={isFavorite(cert.id)}
                    onToggleFavorite={toggleFavorite}
                    onVisit={addRecent}
                  />
                ))}
              </div>
            </section>

            {/* Category previews */}
            {certCategories.filter((c) => c.id !== 'all').map((cat) => {
              const catCerts = getCertsByCategory(cat.id)
              if (catCerts.length === 0) return null
              const preview = catCerts.slice(0, PREVIEW_COUNT)
              return (
                <section key={cat.id}>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      {cat.emoji} {cat.name}
                      <span className="text-sm font-normal text-gray-500 dark:text-gray-400">({catCerts.length})</span>
                    </h2>
                    <button
                      onClick={() => setCategory(cat.id)}
                      className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      View all {catCerts.length} →
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {preview.map((cert) => (
                      <CertCard
                        key={cert.id}
                        cert={cert}
                        isFavorite={isFavorite(cert.id)}
                        onToggleFavorite={toggleFavorite}
                        onVisit={addRecent}
                      />
                    ))}
                  </div>
                </section>
              )
            })}
          </div>
        ) : (
          /* === FILTERED VIEW === */
          <div>
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Showing <span className="font-semibold text-gray-900 dark:text-white">{sortedCerts.length}</span> certification{sortedCerts.length !== 1 ? 's' : ''}
              </p>
            </div>
            {sortedCerts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {sortedCerts.map((cert) => (
                  <CertCard
                    key={cert.id}
                    cert={cert}
                    isFavorite={isFavorite(cert.id)}
                    onToggleFavorite={toggleFavorite}
                    onVisit={addRecent}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-4xl mb-3">🔍</p>
                <p className="text-gray-500 dark:text-gray-400">No certifications match this filter combination.</p>
                <button
                  onClick={() => { setCategory('all'); setLevel('all') }}
                  className="mt-3 text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        )}

        {/* Recently Visited */}
        {recentCerts.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              🕐 Recently Visited
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {recentCerts.map((cert) => (
                <CertCardCompact key={cert.id} cert={cert} onVisit={addRecent} />
              ))}
            </div>
          </section>
        )}

        {/* Footer note */}
        <div className="text-center text-xs text-gray-400 dark:text-gray-500 pt-6 pb-4 border-t border-gray-200 dark:border-gray-800">
          Certification details and exam codes are based on publicly available information and may change.{' '}
          <a
            href="mailto:certifications@untrackt.com?subject=Certification%20update%20suggestion"
            className="text-indigo-500 hover:underline"
          >
            Suggest an update
          </a>
        </div>

        <SponsorBanner />
      </div>
    </div>
  )
}
