import { memo, useRef, useEffect } from 'react'

const categoryColorMap = {
  frontend: { bg: 'bg-blue-100 dark:bg-blue-900/40', text: 'text-blue-700 dark:text-blue-300', border: 'border-blue-200 dark:border-blue-800' },
  backend: { bg: 'bg-emerald-100 dark:bg-emerald-900/40', text: 'text-emerald-700 dark:text-emerald-300', border: 'border-emerald-200 dark:border-emerald-800' },
  'ai-ml': { bg: 'bg-purple-100 dark:bg-purple-900/40', text: 'text-purple-700 dark:text-purple-300', border: 'border-purple-200 dark:border-purple-800' },
  devtools: { bg: 'bg-violet-100 dark:bg-violet-900/40', text: 'text-violet-700 dark:text-violet-300', border: 'border-violet-200 dark:border-violet-800' },
  'css-design': { bg: 'bg-pink-100 dark:bg-pink-900/40', text: 'text-pink-700 dark:text-pink-300', border: 'border-pink-200 dark:border-pink-800' },
  database: { bg: 'bg-amber-100 dark:bg-amber-900/40', text: 'text-amber-700 dark:text-amber-300', border: 'border-amber-200 dark:border-amber-800' },
  mobile: { bg: 'bg-cyan-100 dark:bg-cyan-900/40', text: 'text-cyan-700 dark:text-cyan-300', border: 'border-cyan-200 dark:border-cyan-800' },
  devops: { bg: 'bg-teal-100 dark:bg-teal-900/40', text: 'text-teal-700 dark:text-teal-300', border: 'border-teal-200 dark:border-teal-800' },
  security: { bg: 'bg-red-100 dark:bg-red-900/40', text: 'text-red-700 dark:text-red-300', border: 'border-red-200 dark:border-red-800' },
  languages: { bg: 'bg-orange-100 dark:bg-orange-900/40', text: 'text-orange-700 dark:text-orange-300', border: 'border-orange-200 dark:border-orange-800' },
  awesome: { bg: 'bg-indigo-100 dark:bg-indigo-900/40', text: 'text-indigo-700 dark:text-indigo-300', border: 'border-indigo-200 dark:border-indigo-800' },
}

function GhCategoryTabs({ categories, activeCategory, onCategoryChange, counts }) {
  const scrollRef = useRef(null)

  useEffect(() => {
    if (!scrollRef.current) return
    const active = scrollRef.current.querySelector('[aria-selected="true"]')
    if (active) {
      active.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
    }
  }, [activeCategory])

  return (
    <div
      ref={scrollRef}
      role="tablist"
      aria-label="Filter by category"
      className="flex flex-wrap gap-1.5 pb-2"
    >
      {categories.map((cat) => {
        const isActive = activeCategory === cat.id
        const count = counts[cat.id] || 0

        return (
          <button
            key={cat.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onCategoryChange(cat.id)}
            className={`flex items-center gap-1 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 ${
              isActive
                ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 ring-1 ring-indigo-300 dark:ring-indigo-700'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            <span aria-hidden="true">{cat.emoji}</span>
            <span className="hidden sm:inline">{cat.name}</span>
            <span className="sm:hidden">{cat.shortName || cat.name}</span>
            <span
              className={`ml-0.5 text-xs px-1.5 py-0.5 rounded-full ${
                isActive
                  ? 'bg-indigo-200 dark:bg-indigo-800 text-indigo-700 dark:text-indigo-200'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
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

export default memo(GhCategoryTabs)
export { categoryColorMap }
