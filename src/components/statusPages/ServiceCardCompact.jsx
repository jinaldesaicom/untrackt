import { memo } from 'react'
import { ExternalLink } from 'lucide-react'
import { categoryColorMap } from './CategoryTabs.jsx'
import { statusPageCategories } from '../../data/statusPages.js'

function ServiceCardCompact({ service, onVisit }) {
  const colors = categoryColorMap[service.category] || categoryColorMap.cloud
  const categoryLabel = statusPageCategories.find((c) => c.id === service.category)?.name || service.category

  const handleClick = () => {
    if (onVisit) onVisit(service.id)
    window.open(service.statusUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <button
      onClick={handleClick}
      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-indigo-200 dark:hover:border-indigo-700 hover:shadow-sm transition-all text-left group"
    >
      <span className="text-lg shrink-0" aria-hidden="true">
        {service.emoji}
      </span>
      <span className="font-medium text-sm text-gray-900 dark:text-white truncate flex-1">
        {service.name}
      </span>
      <span
        className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full shrink-0 ${colors.bg} ${colors.text}`}
      >
        {categoryLabel}
      </span>
      <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-indigo-500 shrink-0 transition-colors" />
    </button>
  )
}

export default memo(ServiceCardCompact)
