import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  ExternalLink,
  ArrowLeft,
  Bookmark,
  BookmarkCheck,
  Check,
  X,
  Tag,
} from 'lucide-react'
import SEOHead from '../../components/SEOHead.jsx'
import {
  aiTools,
  aiCategories,
  getAiToolById,
  getAiAlternatives,
  AI_DIRECTORY_LAST_UPDATED,
} from '../../data/ai-directory/index.js'
import { useAiBookmarks, useAiRecentlyViewed } from '../../hooks/useAiDirectory.js'

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

export default function AiToolDetailPage() {
  const { toolId } = useParams()
  const tool = getAiToolById(toolId)
  const { toggleBookmark, isBookmarked } = useAiBookmarks()
  const { addRecentlyViewed } = useAiRecentlyViewed()
  const alternatives = tool ? getAiAlternatives(tool) : []
  const category = tool ? aiCategories.find((c) => c.id === tool.category) : null

  useEffect(() => {
    if (tool) addRecentlyViewed(tool.id)
  }, [tool?.id])

  if (!tool) {
    return (
      <div className="max-w-3xl mx-auto text-center py-20">
        <SEOHead title="Tool Not Found — AI Directory" path={`/ai-directory/${toolId}`} noindex />
        <p className="text-6xl mb-4">🔍</p>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Tool not found</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          This AI tool doesn't exist in our directory.
        </p>
        <Link
          to="/ai-directory"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700"
        >
          <ArrowLeft size={16} />
          Back to Directory
        </Link>
      </div>
    )
  }

  const bookmarked = isBookmarked(tool.id)

  return (
    <>
      <SEOHead
        title={`${tool.name} — AI Tools Directory`}
        description={tool.description}
        path={`/ai-directory/${tool.id}`}
      />

      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
          <Link to="/ai-directory" className="hover:text-blue-600 dark:hover:text-blue-400">
            AI Directory
          </Link>
          <span>/</span>
          {category && (
            <>
              <Link
                to={`/ai-directory?category=${tool.category}`}
                className="hover:text-blue-600 dark:hover:text-blue-400"
              >
                {category.emoji} {category.name}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="text-gray-900 dark:text-white font-medium">{tool.name}</span>
        </nav>

        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <span className="text-4xl" role="img" aria-hidden="true">
              {tool.emoji}
            </span>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
                {tool.name}
              </h1>
              <p className="mt-1 text-gray-600 dark:text-gray-400">{tool.description}</p>
            </div>
          </div>
          <button
            onClick={() => toggleBookmark(tool.id)}
            className={`p-2.5 rounded-xl border transition-colors flex-shrink-0 ${
              bookmarked
                ? 'border-yellow-300 bg-yellow-50 text-yellow-600 dark:border-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                : 'border-gray-200 bg-white text-gray-400 hover:text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:hover:text-gray-300'
            }`}
            aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark this tool'}
          >
            {bookmarked ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
          </button>
        </div>

        {/* Badges row */}
        <div className="flex flex-wrap gap-2 mb-8">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${pricingColors[tool.pricing]}`}>
            {pricingLabels[tool.pricing]}
          </span>
          {tool.badges?.map((badge) => (
            <span key={badge} className={`px-3 py-1 rounded-full text-sm font-medium ${badgeStyles[badge]}`}>
              {badgeLabels[badge]}
            </span>
          ))}
          {tool.platform?.map((p) => (
            <span key={p} className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </span>
          ))}
        </div>

        {/* CTA */}
        <a
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors mb-8"
        >
          Visit {tool.name} <ExternalLink size={16} />
        </a>

        {/* Full description */}
        <div className="prose prose-gray dark:prose-invert max-w-none mb-8">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{tool.fullDescription}</p>
        </div>

        {/* Features, Use Cases, Pros, Cons in 2-col grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Features */}
          <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800">
            <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-3">Key Features</h2>
            <ul className="space-y-2">
              {tool.features?.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <Check size={14} className="text-green-500 mt-0.5 flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Use Cases */}
          <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800">
            <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-3">Use Cases</h2>
            <ul className="space-y-2">
              {tool.useCases?.map((u, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <span className="text-blue-500 mt-0.5 flex-shrink-0">•</span>
                  {u}
                </li>
              ))}
            </ul>
          </div>

          {/* Pros */}
          <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800">
            <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-3">Pros</h2>
            <ul className="space-y-2">
              {tool.pros?.map((p, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <Check size={14} className="text-green-500 mt-0.5 flex-shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
          </div>

          {/* Cons */}
          <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800">
            <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-3">Cons</h2>
            <ul className="space-y-2">
              {tool.cons?.map((c, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <X size={14} className="text-red-400 mt-0.5 flex-shrink-0" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Pricing details */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800 mb-8">
          <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-2">Pricing Details</h2>
          <p className="text-sm text-gray-700 dark:text-gray-300">{tool.pricingDetails}</p>
        </div>

        {/* Tags */}
        {tool.tags?.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-8">
            <Tag size={14} className="text-gray-400" />
            {tool.tags.map((tag) => (
              <Link
                key={tag}
                to={`/ai-directory?tag=${encodeURIComponent(tag)}`}
                className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
              >
                {tag}
              </Link>
            ))}
          </div>
        )}

        {/* Alternatives */}
        {alternatives.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Alternatives</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {alternatives.map((alt) => (
                <Link
                  key={alt.id}
                  to={`/ai-directory/${alt.id}`}
                  className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 bg-white hover:shadow-md hover:border-gray-300 transition-all dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600"
                >
                  <span className="text-2xl flex-shrink-0">{alt.emoji}</span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-1">{alt.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">{alt.description}</p>
                    <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${pricingColors[alt.pricing]}`}>
                      {pricingLabels[alt.pricing]}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Back link */}
        <div className="text-center pt-4 pb-8">
          <Link
            to="/ai-directory"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
          >
            <ArrowLeft size={16} />
            Back to AI Directory
          </Link>
        </div>
      </div>
    </>
  )
}
