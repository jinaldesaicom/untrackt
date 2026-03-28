import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { getAllTags } from '../search/searchEngine.js'

export default function TagCloud({ limit = 30 }) {
  const tags = useMemo(() => getAllTags().slice(0, limit), [limit])

  if (tags.length === 0) return null

  const maxCount = tags[0]?.count || 1

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map(({ tag, count }) => {
        const size = 0.75 + (count / maxCount) * 0.5
        return (
          <Link
            key={tag}
            to={`/tags/${encodeURIComponent(tag)}`}
            className="rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-1 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:border-indigo-200 dark:hover:border-indigo-700 transition-colors"
            style={{ fontSize: `${size}rem` }}
          >
            {tag}
            <span className="text-gray-400 ml-1 text-xs">({count})</span>
          </Link>
        )
      })}
    </div>
  )
}
