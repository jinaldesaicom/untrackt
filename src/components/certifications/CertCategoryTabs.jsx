import { memo } from 'react'

export const categoryColorMap = {
  aws: { bg: 'bg-orange-100', text: 'text-orange-700', darkBg: 'dark:bg-orange-900/30', darkText: 'dark:text-orange-300', border: 'border-orange-200 dark:border-orange-800' },
  azure: { bg: 'bg-blue-100', text: 'text-blue-700', darkBg: 'dark:bg-blue-900/30', darkText: 'dark:text-blue-300', border: 'border-blue-200 dark:border-blue-800' },
  gcp: { bg: 'bg-emerald-100', text: 'text-emerald-700', darkBg: 'dark:bg-emerald-900/30', darkText: 'dark:text-emerald-300', border: 'border-emerald-200 dark:border-emerald-800' },
  kubernetes: { bg: 'bg-indigo-100', text: 'text-indigo-700', darkBg: 'dark:bg-indigo-900/30', darkText: 'dark:text-indigo-300', border: 'border-indigo-200 dark:border-indigo-800' },
  hashicorp: { bg: 'bg-violet-100', text: 'text-violet-700', darkBg: 'dark:bg-violet-900/30', darkText: 'dark:text-violet-300', border: 'border-violet-200 dark:border-violet-800' },
  linux: { bg: 'bg-yellow-100', text: 'text-yellow-700', darkBg: 'dark:bg-yellow-900/30', darkText: 'dark:text-yellow-300', border: 'border-yellow-200 dark:border-yellow-800' },
  docker: { bg: 'bg-cyan-100', text: 'text-cyan-700', darkBg: 'dark:bg-cyan-900/30', darkText: 'dark:text-cyan-300', border: 'border-cyan-200 dark:border-cyan-800' },
  security: { bg: 'bg-red-100', text: 'text-red-700', darkBg: 'dark:bg-red-900/30', darkText: 'dark:text-red-300', border: 'border-red-200 dark:border-red-800' },
  'cloud-general': { bg: 'bg-sky-100', text: 'text-sky-700', darkBg: 'dark:bg-sky-900/30', darkText: 'dark:text-sky-300', border: 'border-sky-200 dark:border-sky-800' },
  devops: { bg: 'bg-teal-100', text: 'text-teal-700', darkBg: 'dark:bg-teal-900/30', darkText: 'dark:text-teal-300', border: 'border-teal-200 dark:border-teal-800' },
  data: { bg: 'bg-purple-100', text: 'text-purple-700', darkBg: 'dark:bg-purple-900/30', darkText: 'dark:text-purple-300', border: 'border-purple-200 dark:border-purple-800' },
  ai: { bg: 'bg-fuchsia-100', text: 'text-fuchsia-700', darkBg: 'dark:bg-fuchsia-900/30', darkText: 'dark:text-fuchsia-300', border: 'border-fuchsia-200 dark:border-fuchsia-800' },
  cybersecurity: { bg: 'bg-rose-100', text: 'text-rose-700', darkBg: 'dark:bg-rose-900/30', darkText: 'dark:text-rose-300', border: 'border-rose-200 dark:border-rose-800' },
}

export const levelColorMap = {
  foundational: { bg: 'bg-green-100', text: 'text-green-700', darkBg: 'dark:bg-green-900/30', darkText: 'dark:text-green-300' },
  associate: { bg: 'bg-blue-100', text: 'text-blue-700', darkBg: 'dark:bg-blue-900/30', darkText: 'dark:text-blue-300' },
  professional: { bg: 'bg-amber-100', text: 'text-amber-700', darkBg: 'dark:bg-amber-900/30', darkText: 'dark:text-amber-300' },
  specialty: { bg: 'bg-purple-100', text: 'text-purple-700', darkBg: 'dark:bg-purple-900/30', darkText: 'dark:text-purple-300' },
  expert: { bg: 'bg-red-100', text: 'text-red-700', darkBg: 'dark:bg-red-900/30', darkText: 'dark:text-red-300' },
}

function CertCategoryTabs({ categories, activeCategory, onCategoryChange, counts }) {
  return (
    <div className="flex flex-wrap gap-1.5 sm:gap-2" role="tablist" aria-label="Certification categories">
      {categories.map((cat) => {
        const isActive = activeCategory === cat.id
        const count = counts[cat.id] || 0
        return (
          <button
            key={cat.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onCategoryChange(cat.id)}
            className={`flex items-center gap-1 px-2.5 py-1.5 text-xs sm:px-3 sm:py-2 sm:text-sm rounded-lg font-medium transition-all ${
              isActive
                ? 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <span className="text-sm sm:text-base">{cat.emoji}</span>
            <span className="hidden sm:inline">{cat.name}</span>
            <span className="sm:hidden">{cat.shortName}</span>
            {count > 0 && (
              <span className={`ml-0.5 px-1.5 py-0.5 text-[10px] rounded-full font-semibold ${
                isActive
                  ? 'bg-indigo-200 dark:bg-indigo-800 text-indigo-800 dark:text-indigo-200'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
              }`}>
                {count}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}

export default memo(CertCategoryTabs)
