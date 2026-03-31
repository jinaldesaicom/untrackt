import { memo } from 'react'
import { ExternalLink, Star } from 'lucide-react'
import { categoryColorMap } from './GhCategoryTabs.jsx'
import { githubStarsCategories } from '../../data/githubStars.js'

function RepoCardCompact({ repo, onVisit }) {
  const colors = categoryColorMap[repo.category] || categoryColorMap.frontend
  const categoryLabel = githubStarsCategories.find((c) => c.id === repo.category)?.name || repo.category

  const handleClick = () => {
    if (onVisit) onVisit(repo.id)
    window.open(repo.repoUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <button
      onClick={handleClick}
      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-indigo-200 dark:hover:border-indigo-700 hover:shadow-sm transition-all text-left group"
    >
      <span className="text-lg shrink-0" aria-hidden="true">
        {repo.emoji}
      </span>
      <span className="font-medium text-sm text-gray-900 dark:text-white truncate flex-1">
        {repo.name}
      </span>
      <span className="inline-flex items-center gap-0.5 text-xs text-amber-600 dark:text-amber-400 shrink-0">
        <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
        {repo.stars}
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

export default memo(RepoCardCompact)
