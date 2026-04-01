import { memo } from 'react'
import { Link } from 'react-router-dom'
import { Heart, Terminal } from 'lucide-react'
import { categoryColorMap } from './CheatsheetCategoryTabs.jsx'
import { cheatsheetCategories } from '../../data/cheatsheets.js'

function CheatsheetCard({ sheet, isFavorite, onToggleFavorite, onVisit }) {
  const colors = categoryColorMap[sheet.category] || categoryColorMap.languages
  const categoryLabel = cheatsheetCategories.find((c) => c.id === sheet.category)?.name || sheet.category
  const commandCount = sheet.sections.reduce((a, s) => a + s.commands.length, 0)

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
            {sheet.emoji}
          </span>
          <div className="min-w-0">
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm leading-tight truncate">
              {sheet.name}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">
              {sheet.description}
            </p>
          </div>
        </div>
        <button
          onClick={() => onToggleFavorite(sheet.id)}
          aria-label={isFavorite ? `Remove ${sheet.name} from favorites` : `Save ${sheet.name} to favorites`}
          className={`shrink-0 p-1.5 rounded-lg transition-colors ${
            isFavorite
              ? 'text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30'
              : 'text-gray-400 hover:text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
        </button>
      </div>

      <div className="flex items-center gap-2 mb-3">
        <span
          className={`inline-flex items-center text-[11px] font-medium px-2 py-0.5 rounded-full ${colors.bg} ${colors.text}`}
        >
          {categoryLabel}
        </span>
        <span className="text-[11px] text-gray-400 dark:text-gray-500 flex items-center gap-1">
          <Terminal className="w-3 h-3" />
          {commandCount} commands
        </span>
      </div>

      <Link
        to={`/cheatsheets/${sheet.id}`}
        onClick={() => onVisit && onVisit(sheet.id)}
        className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium border border-indigo-200 dark:border-indigo-700 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white transition-colors"
      >
        <Terminal className="w-3.5 h-3.5" />
        View Cheatsheet
      </Link>
    </div>
  )
}

export default memo(CheatsheetCard)
