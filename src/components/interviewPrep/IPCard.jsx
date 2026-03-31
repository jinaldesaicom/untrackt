import { memo } from 'react'
import { Heart, ExternalLink } from 'lucide-react'
import { categoryColorMap, levelColorMap, pricingColorMap } from './IPCategoryTabs.jsx'
import { interviewPrepCategories } from '../../data/interviewPrep.js'

function IPCard({ resource, isFavorite, onToggleFavorite, onVisit }) {
  const colors = categoryColorMap[resource.category] || categoryColorMap.dsa
  const levelColors = levelColorMap[resource.level] || levelColorMap.beginner
  const pricingColors = pricingColorMap[resource.pricing] || pricingColorMap.free
  const categoryLabel = interviewPrepCategories.find((c) => c.id === resource.category)?.name || resource.category

  const handleVisit = () => {
    if (onVisit) onVisit(resource.id)
    window.open(resource.url, '_blank', 'noopener,noreferrer')
  }

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
            {resource.emoji}
          </span>
          <div className="min-w-0">
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm leading-tight truncate">
              {resource.name}
            </h3>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5 truncate">
              by {resource.provider}
            </p>
          </div>
        </div>
        <button
          onClick={() => onToggleFavorite(resource.id)}
          aria-label={isFavorite ? `Remove ${resource.name} from favorites` : `Save ${resource.name} to favorites`}
          className="shrink-0 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-300 dark:text-gray-600 hover:text-red-400'
            }`}
          />
        </button>
      </div>

      <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 line-clamp-2 min-h-[2rem]">
        {resource.description}
      </p>

      <div className="flex items-center gap-1.5 mb-3 flex-wrap">
        <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${levelColors.bg} ${levelColors.text} capitalize`}>
          {resource.level}
        </span>
        <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${pricingColors.bg} ${pricingColors.text} capitalize`}>
          {resource.pricing === 'freemium' ? 'Free + Paid' : resource.pricing}
        </span>
        <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${colors.bg} ${colors.text}`}>
          {categoryLabel}
        </span>
      </div>

      <button
        onClick={handleVisit}
        className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium border border-indigo-200 dark:border-indigo-700 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white transition-colors"
      >
        <ExternalLink className="w-3.5 h-3.5" />
        Explore Resource
      </button>
    </div>
  )
}

export default memo(IPCard)
