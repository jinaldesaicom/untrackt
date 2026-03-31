import { memo } from 'react'
import { Heart, ExternalLink, Star } from 'lucide-react'
import { categoryColorMap } from './GhCategoryTabs.jsx'
import { githubStarsCategories } from '../../data/githubStars.js'

function RepoCard({ repo, isFavorite, onToggleFavorite, onVisit }) {
  const colors = categoryColorMap[repo.category] || categoryColorMap.frontend
  const categoryLabel = githubStarsCategories.find((c) => c.id === repo.category)?.name || repo.category

  const handleViewRepo = () => {
    if (onVisit) onVisit(repo.id)
    window.open(repo.repoUrl, '_blank', 'noopener,noreferrer')
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
            {repo.emoji}
          </span>
          <div className="min-w-0">
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm leading-tight truncate">
              {repo.name}
            </h3>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5 font-mono truncate">
              {repo.fullName}
            </p>
          </div>
        </div>
        <button
          onClick={() => onToggleFavorite(repo.id)}
          aria-label={isFavorite ? `Remove ${repo.name} from favorites` : `Save ${repo.name} to favorites`}
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
        {repo.description}
      </p>

      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-600 dark:text-amber-400">
          <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
          {repo.stars}
        </span>
        {repo.language && (
          <span className="inline-flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: repo.languageColor || '#888' }}
            />
            {repo.language}
          </span>
        )}
        <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${colors.bg} ${colors.text}`}>
          {categoryLabel}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={handleViewRepo}
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-indigo-200 dark:border-indigo-700 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors"
        >
          <ExternalLink className="w-3 h-3" />
          View on GitHub
        </button>
        {repo.websiteUrl && (
          <a
            href={repo.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-3 py-1.5 rounded-lg text-xs font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            Website
          </a>
        )}
      </div>
    </div>
  )
}

export default memo(RepoCard)
