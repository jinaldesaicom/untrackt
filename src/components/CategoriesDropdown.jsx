import { memo, useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import { categories, categoryColorMap } from '../data/tools.js'
import { getIcon } from '../icons.js'
import { getToolsByCategory } from '../data/tools.js'

function CategoriesDropdown() {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const close = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        aria-expanded={open}
        aria-haspopup="true"
      >
        <span>📂</span>
        Categories
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-2 w-[540px] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl p-4 z-50 grid grid-cols-2 gap-3">
          {categories.map((cat) => {
            const Icon = getIcon(cat.icon)
            const colors = categoryColorMap[cat.id]
            const toolCount = getToolsByCategory(cat.id).length
            const popular = getToolsByCategory(cat.id)
              .filter((t) => t.isPopular)
              .slice(0, 3)
            return (
              <Link
                key={cat.id}
                to={`/category/${cat.id}`}
                onClick={() => setOpen(false)}
                className={`flex items-start gap-3 p-3 rounded-xl border ${colors.border} ${colors.darkBorder} hover:shadow-md transition-all group`}
              >
                <div className={`p-2 rounded-lg ${colors.bg} ${colors.darkBg} shrink-0`}>
                  <Icon className={`w-5 h-5 ${colors.icon}`} />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`font-semibold text-sm ${colors.text} ${colors.darkText} group-hover:underline`}>{cat.name}</span>
                    <span className="text-[11px] text-gray-400">{toolCount}</span>
                  </div>
                  {popular.length > 0 && (
                    <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5 truncate">
                      {popular.map((t) => t.name).join(', ')}
                    </p>
                  )}
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default memo(CategoriesDropdown)
