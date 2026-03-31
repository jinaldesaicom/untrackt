import { memo, useRef, useEffect } from 'react'

export const categoryColorMap = {
  dsa:                { bg: 'bg-blue-100 dark:bg-blue-900/40',     text: 'text-blue-700 dark:text-blue-300' },
  'coding-platforms': { bg: 'bg-amber-100 dark:bg-amber-900/40',   text: 'text-amber-700 dark:text-amber-300' },
  behavioral:         { bg: 'bg-emerald-100 dark:bg-emerald-900/40', text: 'text-emerald-700 dark:text-emerald-300' },
  'system-design':    { bg: 'bg-violet-100 dark:bg-violet-900/40', text: 'text-violet-700 dark:text-violet-300' },
  frontend:           { bg: 'bg-cyan-100 dark:bg-cyan-900/40',     text: 'text-cyan-700 dark:text-cyan-300' },
  backend:            { bg: 'bg-orange-100 dark:bg-orange-900/40', text: 'text-orange-700 dark:text-orange-300' },
  books:              { bg: 'bg-rose-100 dark:bg-rose-900/40',     text: 'text-rose-700 dark:text-rose-300' },
  courses:            { bg: 'bg-indigo-100 dark:bg-indigo-900/40', text: 'text-indigo-700 dark:text-indigo-300' },
  mock:               { bg: 'bg-pink-100 dark:bg-pink-900/40',     text: 'text-pink-700 dark:text-pink-300' },
  videos:             { bg: 'bg-red-100 dark:bg-red-900/40',       text: 'text-red-700 dark:text-red-300' },
  salary:             { bg: 'bg-teal-100 dark:bg-teal-900/40',     text: 'text-teal-700 dark:text-teal-300' },
}

export const levelColorMap = {
  beginner:     { bg: 'bg-green-100 dark:bg-green-900/40', text: 'text-green-700 dark:text-green-300' },
  intermediate: { bg: 'bg-blue-100 dark:bg-blue-900/40',   text: 'text-blue-700 dark:text-blue-300' },
  advanced:     { bg: 'bg-red-100 dark:bg-red-900/40',     text: 'text-red-700 dark:text-red-300' },
}

export const pricingColorMap = {
  free:     { bg: 'bg-green-100 dark:bg-green-900/40', text: 'text-green-700 dark:text-green-300' },
  freemium: { bg: 'bg-amber-100 dark:bg-amber-900/40', text: 'text-amber-700 dark:text-amber-300' },
  paid:     { bg: 'bg-gray-100 dark:bg-gray-700',      text: 'text-gray-600 dark:text-gray-300' },
}

function IPCategoryTabs({ categories, activeCategory, onCategoryChange, counts }) {
  const activeRef = useRef(null)

  useEffect(() => {
    if (activeRef.current) {
      activeRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
    }
  }, [activeCategory])

  return (
    <div role="tablist" aria-label="Interview prep categories" className="flex flex-wrap gap-1.5">
      {categories.map((cat) => {
        const isActive = cat.id === activeCategory
        const count = counts[cat.id] || 0
        return (
          <button
            key={cat.id}
            ref={isActive ? activeRef : null}
            role="tab"
            aria-selected={isActive}
            onClick={() => onCategoryChange(cat.id)}
            className={`inline-flex items-center gap-1 px-2.5 py-1.5 text-xs sm:px-3 sm:py-2 sm:text-sm rounded-lg font-medium transition-colors ${
              isActive
                ? 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-200 ring-1 ring-indigo-300 dark:ring-indigo-600'
                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <span className="hidden sm:inline">{cat.emoji}</span>
            <span className="sm:hidden">{cat.shortName || cat.name}</span>
            <span className="hidden sm:inline">{cat.name}</span>
            <span
              className={`text-[10px] ml-0.5 px-1.5 py-0.5 rounded-full ${
                isActive
                  ? 'bg-indigo-200 dark:bg-indigo-800 text-indigo-700 dark:text-indigo-200'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
              }`}
            >
              {count}
            </span>
          </button>
        )
      })}
    </div>
  )
}

export default memo(IPCategoryTabs)
