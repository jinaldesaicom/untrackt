import { Link } from 'react-router-dom'
import { getIcon } from '../icons.js'
import { categoryColorMap } from '../data/tools.js'

export default function ToolCard({ tool }) {
  const Icon = getIcon(tool.icon)
  const colors = categoryColorMap[tool.category]

  return (
    <Link to={tool.path} className="block">
      <div className="tool-card group h-full">
        <div className="flex items-start gap-3">
          <div className={`p-2 rounded-lg ${colors.bg} shrink-0`}>
            <Icon className={`w-5 h-5 ${colors.icon}`} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 text-sm leading-tight group-hover:text-indigo-600 transition-colors">
              {tool.name}
            </h3>
            <p className="text-gray-500 text-xs mt-1 leading-relaxed line-clamp-2">
              {tool.description}
            </p>
          </div>
        </div>
        <div className="mt-3">
          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium text-white ${colors.pill}`}>
            {tool.category}
          </span>
        </div>
      </div>
    </Link>
  )
}
