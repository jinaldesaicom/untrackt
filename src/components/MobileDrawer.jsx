import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import tools, { categories, categoryColorMap } from '../data/tools.js'
import { getIcon } from '../icons.js'

export default function MobileDrawer() {
  const [open, setOpen] = useState(false)
  const counts = useMemo(() => tools.reduce((accumulator, tool) => ({ ...accumulator, [tool.category]: (accumulator[tool.category] || 0) + 1 }), {}), [])

  return (
    <>
      <button type="button" className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 lg:hidden" onClick={() => setOpen(true)} aria-label="Open navigation">
        <Menu className="h-5 w-5" />
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button type="button" className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} aria-label="Close navigation overlay" />
          <aside className="absolute right-0 top-0 h-full w-full max-w-sm overflow-y-auto bg-white p-5 shadow-2xl dark:bg-gray-900">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Browse categories</h2>
              <button type="button" className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800" onClick={() => setOpen(false)} aria-label="Close navigation">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-5 space-y-3">
              {categories.map((category) => {
                const Icon = getIcon(category.icon)
                const colors = categoryColorMap[category.id]
                return (
                  <Link key={category.id} to={`/category/${category.id}`} className={`flex items-center justify-between rounded-2xl border p-4 ${colors.border} ${colors.darkBorder} ${colors.bg} ${colors.darkBg}`} onClick={() => setOpen(false)}>
                    <div className="flex items-center gap-3">
                      <Icon className={`h-5 w-5 ${colors.icon}`} />
                      <div>
                        <p className={`font-medium ${colors.text} ${colors.darkText}`}>{category.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{counts[category.id] || 0} tools</p>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </aside>
        </div>
      ) : null}
    </>
  )
}
