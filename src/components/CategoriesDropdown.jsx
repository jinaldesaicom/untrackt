import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import tools, { categories, categoryColorMap } from '../data/tools.js'
import { getIcon } from '../icons.js'

export default function CategoriesDropdown() {
  const [open, setOpen] = useState(false)
  const counts = useMemo(() => tools.reduce((accumulator, tool) => ({ ...accumulator, [tool.category]: (accumulator[tool.category] || 0) + 1 }), {}), [])

  return (
    <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button type="button" aria-expanded={open} className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800" onClick={() => setOpen((current) => !current)}>
        Categories
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open ? (
        <div className="absolute right-0 top-full z-50 pt-3">
          <div className="w-[760px] rounded-3xl border border-gray-200 bg-white p-5 shadow-2xl dark:border-gray-700 dark:bg-gray-900">
            <div className="grid grid-cols-4 gap-4">
              {categories.map((category) => {
                const Icon = getIcon(category.icon)
                const colors = categoryColorMap[category.id]
                return (
                  <Link key={category.id} to={`/category/${category.id}`} className={`rounded-2xl border p-4 transition-transform hover:-translate-y-0.5 ${colors.border} ${colors.darkBorder} ${colors.bg} ${colors.darkBg}`} onClick={() => setOpen(false)}>
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl bg-white/80 p-2 shadow-sm dark:bg-gray-900/70">
                        <Icon className={`h-5 w-5 ${colors.icon}`} />
                      </div>
                      <div>
                        <p className={`font-semibold ${colors.text} ${colors.darkText}`}>{category.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{counts[category.id] || 0} tools</p>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
