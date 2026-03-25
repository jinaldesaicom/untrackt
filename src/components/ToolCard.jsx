import React from 'react'
import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import { getIcon } from '../icons.js'
import { categoryColorMap } from '../data/tools.js'
import { useFavorites } from '../hooks/useFavorites.js'
import usePrefetchTool from '../hooks/usePrefetchTool.js'
import useToast from '../hooks/useToast.jsx'
import useAnnouncer from '../hooks/useAnnouncer.jsx'

function ToolCard({ tool }) {
  const Icon = getIcon(tool.icon)
  const colors = categoryColorMap[tool.category]
  const { isFavorite, toggleFavorite } = useFavorites()
  const { showToast } = useToast()
  const { announce } = useAnnouncer()
  const { prefetch, cancelPrefetch } = usePrefetchTool(tool.id)
  const favorite = isFavorite(tool.id)
  const accentMap = {
    dev: 'border-l-violet-500',
    student: 'border-l-blue-500',
    freelance: 'border-l-amber-500',
    general: 'border-l-gray-500',
    health: 'border-l-green-500',
    finance: 'border-l-emerald-500',
  }

  return (
    <div
      className={`tool-card group h-full relative overflow-hidden border-l-4 ${accentMap[tool.category] || 'border-l-indigo-500'}`}
      onMouseEnter={prefetch}
      onMouseLeave={cancelPrefetch}
      onFocus={prefetch}
      onBlur={cancelPrefetch}
    >
      <button
        type="button"
        onClick={(event) => {
          event.preventDefault()
          event.stopPropagation()
          const added = toggleFavorite(tool.id)
          showToast({
            message: added ? 'Favorite saved' : 'Favorite removed',
            type: added ? 'success' : 'info',
          })
          announce(added ? `${tool.name} added to favorites` : `${tool.name} removed from favorites`)
        }}
        aria-label={favorite ? `Remove ${tool.name} from favorites` : `Add ${tool.name} to favorites`}
        title={favorite ? 'Remove from favorites' : 'Save to favorites'}
        className="absolute top-4 right-4 z-10 rounded-full p-2 bg-white/90 dark:bg-gray-900/90 border border-gray-200 dark:border-gray-700 text-gray-400 hover:text-rose-500 dark:hover:text-rose-300 hover:border-rose-200 dark:hover:border-rose-500/40 transition-all duration-200"
      >
        <Heart className={`w-4 h-4 transition-all duration-200 ${favorite ? 'fill-rose-500 text-rose-500 scale-110 animate-heart-pop' : ''}`} />
      </button>

      <Link to={tool.path} data-tool-card className="block h-full pr-10 active:scale-[0.99] transition-transform duration-150">
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
