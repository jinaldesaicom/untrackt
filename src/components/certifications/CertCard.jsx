import { memo } from 'react'
import { Heart, ExternalLink } from 'lucide-react'
import { categoryColorMap, levelColorMap } from './CertCategoryTabs.jsx'
import { certCategories } from '../../data/cloudCertifications.js'

function DifficultyStars({ difficulty }) {
  return (
    <span className="inline-flex gap-0.5" aria-label={`Difficulty ${difficulty} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={`text-xs ${i <= difficulty ? 'text-amber-500' : 'text-gray-300 dark:text-gray-600'}`}>
          ★
        </span>
      ))}
    </span>
  )
}

function CertCard({ cert, isFavorite, onToggleFavorite, onVisit }) {
  const catColor = categoryColorMap[cert.category] || categoryColorMap.aws
  const lvlColor = levelColorMap[cert.level] || levelColorMap.associate
  const catMeta = certCategories.find((c) => c.id === cert.category)

  const handleVisit = () => {
    if (onVisit) onVisit(cert.id)
    window.open(cert.officialUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <div
      className={`group relative bg-white dark:bg-gray-800 rounded-xl border p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
        isFavorite
          ? 'border-red-200 dark:border-red-800'
          : 'border-gray-200 dark:border-gray-700 hover:border-indigo-200 dark:hover:border-indigo-700'
      }`}
    >
      {/* Header row */}
      <div className="flex items-start gap-3 mb-2">
        <span className="text-2xl shrink-0" aria-hidden="true">{cert.emoji}</span>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm text-gray-900 dark:text-white leading-tight line-clamp-2">
            {cert.name}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            {cert.examCode} · {catMeta?.name || cert.category}
          </p>
        </div>
        <button
          onClick={() => onToggleFavorite(cert.id)}
          className="shrink-0 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label={isFavorite ? `Remove ${cert.name} from favorites` : `Save ${cert.name} to favorites`}
        >
          <Heart className={`w-4 h-4 transition-colors ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400 hover:text-red-400'}`} />
        </button>
      </div>

      {/* Description */}
      <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
        {cert.description}
      </p>

      {/* Metadata row */}
      <div className="flex items-center gap-2 flex-wrap mb-3">
        <DifficultyStars difficulty={cert.difficulty} />
        <span className="text-xs text-gray-500 dark:text-gray-400">{cert.cost}</span>
        <span className="text-xs text-gray-400 dark:text-gray-500">·</span>
        <span className="text-xs text-gray-500 dark:text-gray-400">{cert.duration}</span>
        {cert.validityYears > 0 && (
          <>
            <span className="text-xs text-gray-400 dark:text-gray-500">·</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">{cert.validityYears}yr</span>
          </>
        )}
      </div>

      {/* Badges */}
      <div className="flex items-center gap-1.5 flex-wrap mb-3">
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${catColor.bg} ${catColor.darkBg} ${catColor.text} ${catColor.darkText}`}>
          {catMeta?.emoji} {catMeta?.shortName || cert.category}
        </span>
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold capitalize ${lvlColor.bg} ${lvlColor.darkBg} ${lvlColor.text} ${lvlColor.darkText}`}>
          {cert.level}
        </span>
      </div>

      {/* Free resources */}
      {cert.freeResources.length > 0 && (
        <div className="mb-3">
          <p className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Free Resources</p>
          <div className="space-y-0.5">
            {cert.freeResources.slice(0, 2).map((r, i) => (
              <a
                key={i}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[11px] text-indigo-600 dark:text-indigo-400 hover:underline truncate"
              >
                <span className="shrink-0">📖</span>
                <span className="truncate">{r.name}</span>
              </a>
            ))}
            {cert.freeResources.length > 2 && (
              <span className="text-[10px] text-gray-400 dark:text-gray-500">+{cert.freeResources.length - 2} more</span>
            )}
          </div>
        </div>
      )}

      {/* Action button */}
      <button
        onClick={handleVisit}
        className="w-full flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border border-indigo-200 dark:border-indigo-700 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors"
      >
        <ExternalLink className="w-3.5 h-3.5" />
        View Exam Guide
      </button>

      {/* URL domain */}
      <p className="text-[10px] text-gray-400 dark:text-gray-500 text-center mt-1.5 truncate">
        {cert.officialUrl.replace(/^https?:\/\//, '').split('/')[0]}
      </p>
    </div>
  )
}

export default memo(CertCard)
