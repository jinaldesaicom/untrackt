import { memo, useRef, useEffect } from 'react'

export const categoryColorMap = {
  courses:        { bg: 'bg-blue-100 dark:bg-blue-900/40',     text: 'text-blue-700 dark:text-blue-300' },
  books:          { bg: 'bg-amber-100 dark:bg-amber-900/40',   text: 'text-amber-700 dark:text-amber-300' },
  videos:         { bg: 'bg-rose-100 dark:bg-rose-900/40',     text: 'text-rose-700 dark:text-rose-300' },
  blogs:          { bg: 'bg-emerald-100 dark:bg-emerald-900/40', text: 'text-emerald-700 dark:text-emerald-300' },
  interview:      { bg: 'bg-violet-100 dark:bg-violet-900/40', text: 'text-violet-700 dark:text-violet-300' },
  practice:       { bg: 'bg-cyan-100 dark:bg-cyan-900/40',     text: 'text-cyan-700 dark:text-cyan-300' },
  tools:          { bg: 'bg-orange-100 dark:bg-orange-900/40', text: 'text-orange-700 dark:text-orange-300' },
  'case-studies': { bg: 'bg-pink-100 dark:bg-pink-900/40',     text: 'text-pink-700 dark:text-pink-300' },
  'github-repos': { bg: 'bg-gray-100 dark:bg-gray-700',        text: 'text-gray-700 dark:text-gray-300' },
  newsletters:    { bg: 'bg-indigo-100 dark:bg-indigo-900/40', text: 'text-indigo-700 dark:text-indigo-300' },
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

function SDCategoryTabs({ categories, activeCategory, onCategoryChange, counts }) {
  const activeRef = useRef(null)

  useEffect(() => {
    if (activeRef.current) {
      activeRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
    }
  }, [activeCategory])

  return (
    <div role="tablist" aria-label="Resource categories" className="flex flex-wrap gap-1.5">
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
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-indigo-200 dark:hover:border-indigo-700 hover:text-indigo-600 dark:hover:text-indigo-400'
            }`}
          >
            <span aria-hidden="true">{cat.emoji}</span>
            <span className="sm:hidden">{cat.shortName}</span>
            <span className="hidden sm:inline">{cat.name}</span>
            <span
              className={`text-[10px] sm:text-xs px-1.5 py-0.5 rounded-full font-medium ${
                isActive ? 'bg-indigo-500 text-indigo-100' : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
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

export default memo(SDCategoryTabs)
