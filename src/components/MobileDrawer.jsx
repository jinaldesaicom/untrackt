import { memo, useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { X, Heart, BarChart3, HardDrive, ChevronDown } from 'lucide-react'
import { categories, categoryColorMap } from '../data/tools.js'
import { getIcon } from '../icons.js'

function AccordionSection({ label, emoji, icon: Icon, defaultOpen, children }) {
  const [open, setOpen] = useState(defaultOpen || false)
  return (
    <div>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-expanded={open}
      >
        <span className="flex items-center gap-2.5">
          {emoji && <span className="text-base">{emoji}</span>}
          {Icon && <Icon className="w-4 h-4" />}
          {label}
        </span>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ${open ? 'max-h-[2000px] opacity-100 mt-1' : 'max-h-0 opacity-0'}`}
      >
        <div className="pl-2 space-y-0.5">
          {children}
        </div>
      </div>
    </div>
  )
}

function MobileDrawer({ open, onClose }) {
  const ref = useRef(null)

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="fixed inset-0 bg-black/40" onClick={onClose} aria-hidden="true" />
      <nav
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className="relative z-50 w-72 max-w-[80vw] h-full bg-white dark:bg-gray-900 shadow-xl flex flex-col animate-slide-in-left"
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <span className="font-bold text-lg text-gray-900 dark:text-white">Menu</span>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-1">
          <AccordionSection label="Categories" emoji="📂" defaultOpen={false}>
            {categories.map((cat) => {
              const Icon = getIcon(cat.icon)
              const colors = categoryColorMap[cat.id]
              return (
                <NavLink
                  key={cat.id}
                  to={`/category/${cat.id}`}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                      isActive
                        ? `${colors.bg} ${colors.darkBg} ${colors.text} ${colors.darkText} font-semibold`
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`
                  }
                >
                  <Icon className={`w-4 h-4 ${colors.icon}`} />
                  {cat.name}
                </NavLink>
              )
            })}
          </AccordionSection>

          <AccordionSection label="Resources" emoji="📚" defaultOpen={false}>
            <Link to="/ai-directory" onClick={onClose} className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
              <span className="text-base">🤖</span> AI Tools Directory
            </Link>
            <Link to="/status-pages" onClick={onClose} className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
              <span className="text-base">📡</span> Status Pages
            </Link>
            <Link to="/github-stars" onClick={onClose} className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
              <span className="text-base">⭐</span> GitHub Stars
            </Link>
            <Link to="/ai-learning" onClick={onClose} className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
              <span className="text-base">🧠</span> AI Learning
            </Link>
            <Link to="/certifications" onClick={onClose} className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
              <span className="text-base">🎓</span> Certifications
            </Link>
            <Link to="/system-design" onClick={onClose} className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
              <span className="text-base">🏗️</span> System Design
            </Link>
            <Link to="/interview-prep" onClick={onClose} className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
              <span className="text-base">💼</span> Interview Prep
            </Link>
          </AccordionSection>

          <hr className="my-3 border-gray-200 dark:border-gray-700" />

          <Link to="/favorites" onClick={onClose} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
            <Heart className="w-4 h-4" /> Favorites
          </Link>
          <Link to="/my-stats" onClick={onClose} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
            <BarChart3 className="w-4 h-4" /> My Stats
          </Link>
          <Link to="/tools/data-sync" onClick={onClose} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
            <HardDrive className="w-4 h-4" /> Data Sync & Backup
          </Link>
        </div>
      </nav>
    </div>
  )
}

export default memo(MobileDrawer)
