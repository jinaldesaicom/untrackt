import { memo } from 'react'
import { ExternalLink } from 'lucide-react'
import { categoryColorMap, levelColorMap } from './SDCategoryTabs.jsx'
import { systemDesignCategories } from '../../data/systemDesign.js'

function SDCardCompact({ resource, onVisit }) {
  const colors = categoryColorMap[resource.category] || categoryColorMap.courses
  const levelColors = levelColorMap[resource.level] || levelColorMap.beginner
  const categoryLabel = systemDesignCategories.find((c) => c.id === resource.category)?.shortName || resource.category

  const handleVisit = () => {
    if (onVisit) onVisit(resource.id)
    window.open(resource.url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="flex items-center gap-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 px-3 py-2 hover:border-indigo-200 dark:hover:border-indigo-700 transition-colors">
      <span className="text-base shrink-0" aria-hidden="true">{resource.emoji}</span>
      <div className="min-w-0 flex-1">
        <span className="text-sm font-medium text-gray-900 dark:text-white truncate block">{resource.name}</span>
        <span className="text-xs text-gray-400 dark:text-gray-500 truncate block">by {resource.provider}</span>
      </div>
      <span className={`hidden sm:inline text-[10px] font-medium px-1.5 py-0.5 rounded-full ${levelColors.bg} ${levelColors.text} capitalize shrink-0`}>
        {resource.level}
      </span>
      <span className={`hidden sm:inline text-[10px] font-medium px-1.5 py-0.5 rounded-full ${colors.bg} ${colors.text} shrink-0`}>
        {categoryLabel}
      </span>
      <button
        onClick={handleVisit}
        className="shrink-0 p-1.5 rounded-lg text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors"
        aria-label={`Open ${resource.name}`}
      >
        <ExternalLink className="w-4 h-4" />
      </button>
    </div>
  )
}

export default memo(SDCardCompact)
