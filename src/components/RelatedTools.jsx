import { Link } from 'react-router-dom'
import tools, { categories, categoryColorMap } from '../data/tools.js'
import { getIcon } from '../icons.js'

export default function RelatedTools({ currentToolId, category }) {
  const categoryId = category || 'general'
  const categoryInfo = categories.find((item) => item.id === categoryId)
  const related = tools.filter((tool) => tool.category === categoryId && tool.id !== currentToolId).slice(0, 3)

  if (!related.length) return null

  return (
    <section aria-label={`Other ${categoryInfo?.name || categoryId} tools`} className="mt-10">
      <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Other {categoryInfo?.name || categoryId} tools</h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {related.map((tool) => {
          const Icon = getIcon(tool.icon)
          const colors = categoryColorMap[tool.category]
          return (
            <Link
              key={tool.id}
              to={tool.path}
              className="rounded-xl border border-gray-200 bg-white p-4 transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-gray-700 dark:bg-gray-900"
            >
              <div className="flex items-center gap-2">
                <div className={`rounded-lg p-1.5 ${colors.bg} ${colors.darkBg}`}>
                  <Icon className={`h-4 w-4 ${colors.icon}`} />
                </div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">{tool.name}</h3>
              </div>
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">{tool.description}</p>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
