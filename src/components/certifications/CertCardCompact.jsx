import { memo } from 'react'
import { ExternalLink } from 'lucide-react'
import { categoryColorMap, levelColorMap } from './CertCategoryTabs.jsx'
import { certCategories } from '../../data/cloudCertifications.js'

function CertCardCompact({ cert, onVisit }) {
  const catColor = categoryColorMap[cert.category] || categoryColorMap.aws
  const catMeta = certCategories.find((c) => c.id === cert.category)

  const handleVisit = () => {
    if (onVisit) onVisit(cert.id)
    window.open(cert.officialUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <button
      onClick={handleVisit}
      className="flex items-center gap-3 w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750 hover:border-indigo-200 dark:hover:border-indigo-700 transition-all text-left group"
    >
      <span className="text-xl shrink-0" aria-hidden="true">{cert.emoji}</span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{cert.name}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{cert.examCode} · {cert.cost}</p>
      </div>
      <span className={`shrink-0 inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${catColor.bg} ${catColor.darkBg} ${catColor.text} ${catColor.darkText}`}>
        {catMeta?.shortName || cert.category}
      </span>
      <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-indigo-500 shrink-0 transition-colors" />
    </button>
  )
}

export default memo(CertCardCompact)
