import { NavLink } from 'react-router-dom'
import { categories, categoryColorMap } from '../data/tools.js'

export default function CategoryNav({ mobile = false }) {
  const navClass = mobile
    ? 'flex items-center gap-2 py-1.5 pr-4 min-w-max snap-x snap-mandatory'
    : 'flex items-center gap-1 py-1'

  return (
    <nav className={navClass}>
      {categories.map((cat) => {
        const colors = categoryColorMap[cat.id]
        return (
          <NavLink
            key={cat.id}
            to={`/category/${cat.id}`}
            className={({ isActive }) =>
              `shrink-0 rounded-full font-medium whitespace-nowrap transition-colors ${mobile ? 'px-3.5 py-2 text-[13px] snap-start' : 'px-3 py-1.5 text-xs'} ${
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
