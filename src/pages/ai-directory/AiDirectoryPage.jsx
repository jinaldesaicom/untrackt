import { useState, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Search, Shuffle, ExternalLink, Bookmark, BookmarkCheck, Scale, Filter, X } from 'lucide-react'
import SEOHead from '../../components/SEOHead.jsx'
import {
  aiTools,
  aiCategories,
  aiPricingOptions,
  aiPlatformOptions,
  getAllAiTags,
  AI_DIRECTORY_LAST_UPDATED,
} from '../../data/ai-directory/index.js'
import { useAiBookmarks, useAiSearch } from '../../hooks/useAiDirectory.js'

const pricingColors = {
  free: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300',
  freemium: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
  paid: 'bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300',
  'open-source': 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300',
}

const pricingLabels = {
  free: 'Free',
  freemium: 'Freemium',
  paid: 'Paid',
  'open-source': 'Open Source',
}

const badgeStyles = {
  popular: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300',
  new: 'bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-300',
  editorsPick: 'bg-pink-100 text-pink-800 dark:bg-pink-900/40 dark:text-pink-300',
}

const badgeLabels = { popular: 'Popular', new: 'New', editorsPick: "Editor's Pick" }

function AiToolCard({ tool, isBookmarked, onToggleBookmark, isCompareSelected, onToggleCompare }) {
  return (
    <div className="group relative rounded-xl border border-gray-200 bg-white p-5 transition-all hover:shadow-lg hover:border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-2xl flex-shrink-0" role="img" aria-hidden="true">
            {tool.emoji}
          </span>
          <div className="min-w-0">
            <Link
              to={`/ai-directory/${tool.id}`}
              className="text-base font-semibold text-gray-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-400 line-clamp-1"
            >
              {tool.name}
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mt-0.5">
              {tool.description}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          <button
            onClick={() => onToggleCompare(tool.id)}
            className={`p-1.5 rounded-lg transition-colors ${
              isCompareSelected
                ? 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-900/30'
                : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:text-gray-300 dark:hover:bg-gray-700'
            }`}
            title={isCompareSelected ? 'Remove from comparison' : 'Add to comparison'}
            aria-label={isCompareSelected ? `Remove ${tool.name} from comparison` : `Add ${tool.name} to comparison`}
          >
            <Scale size={16} />
          </button>
          <button
            onClick={() => onToggleBookmark(tool.id)}
            className={`p-1.5 rounded-lg transition-colors ${
              isBookmarked
                ? 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/30'
                : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:text-gray-300 dark:hover:bg-gray-700'
            }`}
            aria-label={isBookmarked ? `Remove ${tool.name} from bookmarks` : `Bookmark ${tool.name}`}
          >
            {isBookmarked ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
          </button>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${pricingColors[tool.pricing]}`}>
          {pricingLabels[tool.pricing]}
        </span>
        {tool.badges?.map((badge) => (
          <span key={badge} className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${badgeStyles[badge]}`}>
            {badgeLabels[badge]}
          </span>
        ))}
        {tool.platform?.map((p) => (
          <span key={p} className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
            {p.charAt(0).toUpperCase() + p.slice(1)}
          </span>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between">
        <div className="flex flex-wrap gap-1">
          {tool.tags?.slice(0, 2).map((tag) => (
            <span key={tag} className="text-xs text-gray-400 dark:text-gray-500">
              #{tag}
            </span>
          ))}
        </div>
        <a
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          Visit <ExternalLink size={12} />
        </a>
      </div>
    </div>
  )
}

export default function AiDirectoryPage() {
  const [searchParams] = useSearchParams()
  const initialCategory = searchParams.get('category') || ''
  const { bookmarks, toggleBookmark, isBookmarked } = useAiBookmarks()
  const {
    query, setQuery,
    categoryFilter, setCategoryFilter,
    pricingFilter, setPricingFilter,
    platformFilter, setPlatformFilter,
    sortBy, setSortBy,
    filtered,
  } = useAiSearch(aiTools)
  const [compareList, setCompareList] = useState([])
  const [showFilters, setShowFilters] = useState(false)

  // Apply initial category from URL
  useState(() => {
    if (initialCategory) setCategoryFilter(initialCategory)
  })

  const allTags = useMemo(() => getAllAiTags().slice(0, 20), [])

  const toggleCompare = (toolId) => {
    setCompareList((prev) => {
      if (prev.includes(toolId)) return prev.filter((id) => id !== toolId)
      if (prev.length >= 3) return prev
      return [...prev, toolId]
    })
  }

  const randomTool = () => {
    const idx = Math.floor(Math.random() * aiTools.length)
    window.location.href = `/ai-directory/${aiTools[idx].id}`
  }

  const bookmarkedTools = useMemo(
    () => aiTools.filter((t) => bookmarks.includes(t.id)),
    [bookmarks]
  )

  const hasActiveFilters = categoryFilter || pricingFilter || platformFilter
  const clearFilters = () => {
    setCategoryFilter('')
    setPricingFilter('')
    setPlatformFilter('')
  }

  return (
    <>
      <SEOHead
        title="AI Tools Directory — 120+ Curated AI Tools"
        description="Explore 120+ handpicked AI tools across writing, coding, image generation, video, audio, and more. Honest descriptions, no paid listings."
        path="/ai-directory"
      />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            🤖 AI Tools Directory
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {aiTools.length}+ handpicked AI tools across {aiCategories.length} categories. Honest descriptions, no paid listings.
          </p>
          <div className="mt-2 flex items-center justify-center gap-4 text-xs text-gray-400 dark:text-gray-500">
            <span>Last updated: {AI_DIRECTORY_LAST_UPDATED}</span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400 font-medium">
              ✓ No paid listings
            </span>
          </div>
        </div>

        {/* Search + Controls */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search AI tools..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border text-sm font-medium transition-colors ${
                showFilters || hasActiveFilters
                  ? 'border-blue-500 bg-blue-50 text-blue-700 dark:border-blue-500 dark:bg-blue-900/30 dark:text-blue-300'
                  : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300'
              }`}
            >
              <Filter size={16} />
              Filters
              {hasActiveFilters && (
                <span className="w-2 h-2 rounded-full bg-blue-500" />
              )}
            </button>
            <button
              onClick={randomTool}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              <Shuffle size={16} />
              Random
            </button>
          </div>
        </div>

        {/* Filters panel */}
        {showFilters && (
          <div className="mb-6 p-4 rounded-xl border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">Category</label>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                >
                  <option value="">All Categories</option>
                  {aiCategories.map((c) => (
                    <option key={c.id} value={c.id}>{c.emoji} {c.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">Pricing</label>
                <select
                  value={pricingFilter}
                  onChange={(e) => setPricingFilter(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                >
                  <option value="">All Pricing</option>
                  {aiPricingOptions.map((p) => (
                    <option key={p} value={p}>{pricingLabels[p]}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">Platform</label>
                <select
                  value={platformFilter}
                  onChange={(e) => setPlatformFilter(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                >
                  <option value="">All Platforms</option>
                  {aiPlatformOptions.map((p) => (
                    <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex items-center justify-between mt-3">
              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">Sort by</label>
                <div className="flex gap-1.5">
                  {[
                    { value: 'popular', label: 'Popular' },
                    { value: 'alphabetical', label: 'A–Z' },
                    { value: 'newest', label: 'Newest' },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setSortBy(opt.value)}
                      className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                        sortBy === opt.value
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-gray-600 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center gap-1 text-xs text-red-600 hover:text-red-700 dark:text-red-400"
                >
                  <X size={14} /> Clear filters
                </button>
              )}
            </div>
          </div>
        )}

        {/* Category pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setCategoryFilter('')}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              !categoryFilter
                ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
            }`}
          >
            All ({aiTools.length})
          </button>
          {aiCategories.map((cat) => {
            const count = aiTools.filter((t) => t.category === cat.id).length
            return (
              <button
                key={cat.id}
                onClick={() => setCategoryFilter(cat.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  categoryFilter === cat.id
                    ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
                }`}
              >
                {cat.emoji} {cat.name} ({count})
              </button>
            )
          })}
        </div>

        {/* Compare bar */}
        {compareList.length > 0 && (
          <div className="mb-6 p-3 rounded-xl border border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Scale size={16} className="text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-800 dark:text-blue-300">
                {compareList.length} tool{compareList.length > 1 ? 's' : ''} selected
                {compareList.length < 2 && ' — select at least 2 to compare'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {compareList.length >= 2 && (
                <Link
                  to={`/ai-directory/compare?tools=${compareList.join(',')}`}
                  className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-medium hover:bg-blue-700"
                >
                  Compare
                </Link>
              )}
              <button
                onClick={() => setCompareList([])}
                className="px-3 py-1.5 rounded-lg bg-white text-xs font-medium text-gray-600 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-300"
              >
                Clear
              </button>
            </div>
          </div>
        )}

        {/* Bookmarked tools */}
        {bookmarkedTools.length > 0 && !query && !hasActiveFilters && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <BookmarkCheck size={18} className="text-yellow-500" />
              Your Bookmarks
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {bookmarkedTools.slice(0, 6).map((tool) => (
                <AiToolCard
                  key={tool.id}
                  tool={tool}
                  isBookmarked={true}
                  onToggleBookmark={toggleBookmark}
                  isCompareSelected={compareList.includes(tool.id)}
                  onToggleCompare={toggleCompare}
                />
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {filtered.length} tool{filtered.length !== 1 ? 's' : ''}
            {query && ` matching "${query}"`}
          </p>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-500 dark:text-gray-400">
            <p className="text-lg mb-2">No tools found</p>
            <p className="text-sm">Try a different search term or clear the filters.</p>
          </div>
        ) : !query && !categoryFilter && !pricingFilter && !platformFilter ? (
          /* Grouped by category when showing all tools unfiltered */
          <div className="space-y-10">
            {aiCategories.map((cat) => {
              const catTools = filtered.filter((t) => t.category === cat.id)
              if (catTools.length === 0) return null
              return (
                <section key={cat.id}>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                      <span>{cat.emoji}</span>
                      {cat.name}
                      <span className="text-sm font-normal text-gray-400 dark:text-gray-500">
                        ({catTools.length})
                      </span>
                    </h2>
                    <button
                      onClick={() => setCategoryFilter(cat.id)}
                      className="text-xs font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      View all →
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 [content-visibility:auto]">
                    {catTools.map((tool) => (
                      <AiToolCard
                        key={tool.id}
                        tool={tool}
                        isBookmarked={isBookmarked(tool.id)}
                        onToggleBookmark={toggleBookmark}
                        isCompareSelected={compareList.includes(tool.id)}
                        onToggleCompare={toggleCompare}
                      />
                    ))}
                  </div>
                </section>
              )
            })}
          </div>
        ) : (
          /* Flat grid when filters or search are active */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 [content-visibility:auto]">
            {filtered.map((tool) => (
              <AiToolCard
                key={tool.id}
                tool={tool}
                isBookmarked={isBookmarked(tool.id)}
                onToggleBookmark={toggleBookmark}
                isCompareSelected={compareList.includes(tool.id)}
                onToggleCompare={toggleCompare}
              />
            ))}
          </div>
        )}

        {/* Tags */}
        {!query && !hasActiveFilters && (
          <div className="mt-12 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Browse by Tag</h2>
            <div className="flex flex-wrap gap-2">
              {allTags.map(({ tag, count }) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="px-3 py-1.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 transition-colors"
                >
                  {tag} ({count})
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Suggest a tool */}
        <div className="mt-12 mb-4 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Know a great AI tool we should add?{' '}
            <a
              href="mailto:hello@untrackt.com?subject=AI%20Tool%20Suggestion"
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium"
            >
              Suggest a tool →
            </a>
          </p>
        </div>
      </div>
    </>
  )
}
