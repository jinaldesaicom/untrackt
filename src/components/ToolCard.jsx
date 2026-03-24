import React from 'react'
import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import { getIcon } from '../icons.js'
import { categoryColorMap } from '../data/tools.js'
import { useFavorites } from '../hooks/useFavorites.js'

function ToolCard({ tool }) {
  const Icon = getIcon(tool.icon)
  const colors = categoryColorMap[tool.category]
  const { isFavorite, toggleFavorite } = useFavorites()
  const favorite = isFavorite(tool.id)

  return (
    <div className="tool-card group h-full relative overflow-hidden">
      <button
        type="button"
        onClick={(event) => {
          event.preventDefault()
          event.stopPropagation()
          toggleFavorite(tool.id)
        }}
        aria-label={favorite ? `Remove ${tool.name} from favorites` : `Save ${tool.name} to favorites`}
        title={favorite ? 'Remove from favorites' : 'Save to favorites'}
        className="absolute top-4 right-4 z-10 rounded-full p-2 bg-white/90 dark:bg-gray-900/90 border border-gray-200 dark:border-gray-700 text-gray-400 hover:text-rose-500 dark:hover:text-rose-300 hover:border-rose-200 dark:hover:border-rose-500/40 transition-all duration-200"
      >
        <Heart className={`w-4 h-4 transition-all duration-200 ${favorite ? 'fill-rose-500 text-rose-500 scale-110' : ''}`} />
      </button>

      <Link to={tool.path} className="block h-full pr-10">
        <div className="flex items-start gap-3">
          <div className={`p-2 rounded-lg ${colors.bg} ${colors.darkBg} shrink-0`}>
            <Icon className={`w-5 h-5 ${colors.icon}`} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm leading-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {tool.name}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-xs mt-1 leading-relaxed line-clamp-2">
              {tool.description}
            </p>
          </div>
        </div>
        <div className="mt-3">
          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium text-white ${colors.pill}`}>
            {tool.category}
          </span>
        </div>
      </Link>
    </div>
  )
}

export default React.memo(ToolCard)
