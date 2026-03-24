import { NavLink } from 'react-router-dom'
import { categories, categoryColorMap } from '../data/tools.js'

export default function CategoryNav() {
  return (
    <nav className="flex items-center gap-1 overflow-x-auto scrollbar-hide py-1">
      {categories.map((cat) => {
        const colors = categoryColorMap[cat.id]
        return (
          <NavLink
            key={cat.id}
            to={`/category/${cat.id}`}
            className={({ isActive }) =>
              `shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${
                isActive
                  ? `${colors.pill} text-white`
                  : `${colors.bg} ${colors.text} hover:opacity-80`
              }`
            }
          >
            {cat.name}
          </NavLink>
        )
      })}
    </nav>
  )
}
