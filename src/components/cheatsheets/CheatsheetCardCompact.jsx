import { memo } from 'react'
import { Link } from 'react-router-dom'
import { Terminal } from 'lucide-react'
import { categoryColorMap } from './CheatsheetCategoryTabs.jsx'
import { cheatsheetCategories } from '../../data/cheatsheets.js'

function CheatsheetCardCompact({ sheet, onVisit }) {
  const colors = categoryColorMap[sheet.category] || categoryColorMap.languages
  const categoryLabel = cheatsheetCategories.find((c) => c.id === sheet.category)?.name || sheet.category

  return (
    <Link
      to={`/cheatsheets/${sheet.id}`}
      onClick={() => onVisit && onVisit(sheet.id)}
      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-indigo-200 dark:hover:border-indigo-700 hover:shadow-sm transition-all text-left group"
    >
      <span className="text-lg shrink-0" aria-hidden="true">
        {sheet.emoji}
      </span>
      <span className="font-medium text-sm text-gray-900 dark:text-white truncate flex-1">
        {sheet.name}
      </span>
      <span
        className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full shrink-0 ${colors.bg} ${colors.text}`}
      >
        {categoryLabel}
      </span>
      <Terminal className="w-3.5 h-3.5 text-gray-400 group-hover:text-indigo-500 shrink-0 transition-colors" />
    </Link>
  )
}

export default memo(CheatsheetCardCompact)
