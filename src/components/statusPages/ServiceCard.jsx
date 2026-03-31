import { memo } from 'react'
import { Heart, ExternalLink, AlertTriangle } from 'lucide-react'
import { categoryColorMap } from './CategoryTabs.jsx'
import { statusPageCategories } from '../../data/statusPages.js'

function getDomain(url) {
  try {
    return new URL(url).hostname
  } catch {
    return url
  }
}

function ServiceCard({ service, isFavorite, onToggleFavorite, onVisit }) {
  const colors = categoryColorMap[service.category] || categoryColorMap.cloud
  const categoryLabel = statusPageCategories.find((c) => c.id === service.category)?.name || service.category

  const handleCheckStatus = () => {
    if (onVisit) onVisit(service.id)
    window.open(service.statusUrl, '_blank', 'noopener,noreferrer')
  }

  const reportSubject = encodeURIComponent(`Broken status URL: ${service.name}`)
  const reportBody = encodeURIComponent(
    `Service: ${service.name}\nCurrent URL: ${service.statusUrl}\nCorrect URL: [please fill in]`,
  )

  return (
    <div
      className={`group relative bg-white dark:bg-gray-800 rounded-xl border p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
        isFavorite
          ? 'border-red-200 dark:border-red-800'
          : 'border-gray-200 dark:border-gray-700 hover:border-indigo-200 dark:hover:border-indigo-700'
      }`}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-xl shrink-0" aria-hidden="true">
            {service.emoji}
          </span>
          <div className="min-w-0">
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm leading-tight truncate">
              {service.name}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">
              {service.description}
            </p>
          </div>
        </div>
        <button
          onClick={() => onToggleFavorite(service.id)}
          aria-label={isFavorite ? `Remove ${service.name} from favorites` : `Save ${service.name} to favorites`}
          className={`shrink-0 p-1.5 rounded-lg transition-colors ${
            isFavorite
              ? 'text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30'
              : 'text-gray-400 hover:text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
        </button>
      </div>

      <div className="mb-3">
        <span
          className={`inline-flex items-center text-[11px] font-medium px-2 py-0.5 rounded-full ${colors.bg} ${colors.text}`}
        >
          {categoryLabel}
        </span>
      </div>

      <button
        onClick={handleCheckStatus}
        className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium border border-indigo-200 dark:border-indigo-700 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white transition-colors"
      >
        <ExternalLink className="w-3.5 h-3.5" />
        Check Status
      </button>

      <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-1.5 text-center truncate">
        {getDomain(service.statusUrl)}
      </p>

      <div className="absolute top-1 right-12 opacity-0 group-hover:opacity-100 transition-opacity">
        <a
          href={`mailto:status@untrackt.com?subject=${reportSubject}&body=${reportBody}`}
          className="text-[10px] text-gray-400 hover:text-amber-500 dark:text-gray-500 dark:hover:text-amber-400 flex items-center gap-0.5"
          title="Report broken link"
        >
          <AlertTriangle className="w-3 h-3" />
        </a>
      </div>
    </div>
  )
}

export default memo(ServiceCard)
