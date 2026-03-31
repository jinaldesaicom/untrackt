import { useState, useMemo, useCallback } from 'react'
import { getItem, setItem } from '../utils/storage.js'

const AI_BOOKMARKS_KEY = 'untrackt:aiBookmarks'
const AI_RECENTLY_VIEWED_KEY = 'untrackt:aiRecentlyViewed'

function readBookmarks() {
  const val = getItem(AI_BOOKMARKS_KEY, [])
  return Array.isArray(val) ? val : []
}

function readRecentlyViewed() {
  const val = getItem(AI_RECENTLY_VIEWED_KEY, [])
  return Array.isArray(val) ? val : []
}

export function useAiBookmarks() {
  const [bookmarks, setBookmarks] = useState(readBookmarks)

  const toggleBookmark = useCallback((toolId) => {
    if (!toolId) return false
    let added = false
    setBookmarks((current) => {
      if (current.includes(toolId)) {
        added = false
        const next = current.filter((id) => id !== toolId)
        setItem(AI_BOOKMARKS_KEY, next)
        return next
      }
      added = true
      const next = [...current, toolId]
      setItem(AI_BOOKMARKS_KEY, next)
      return next
    })
    return added
  }, [])

  const isBookmarked = useCallback((toolId) => bookmarks.includes(toolId), [bookmarks])

  return { bookmarks, toggleBookmark, isBookmarked }
}

export function useAiRecentlyViewed() {
  const [recentlyViewed, setRecentlyViewed] = useState(readRecentlyViewed)

  const addRecentlyViewed = useCallback((toolId) => {
    if (!toolId) return
    setRecentlyViewed((current) => {
      const next = [toolId, ...current.filter((id) => id !== toolId)].slice(0, 10)
      setItem(AI_RECENTLY_VIEWED_KEY, next)
      return next
    })
  }, [])

  return { recentlyViewed, addRecentlyViewed }
}

export function useAiSearch(tools) {
  const [query, setQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [pricingFilter, setPricingFilter] = useState('')
  const [platformFilter, setPlatformFilter] = useState('')
  const [sortBy, setSortBy] = useState('popular')

  const filtered = useMemo(() => {
    let result = tools

    if (query.trim()) {
      const q = query.toLowerCase().trim()
      result = result.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.tags?.some((tag) => tag.toLowerCase().includes(q))
      )
    }

    if (categoryFilter) {
      result = result.filter((t) => t.category === categoryFilter)
    }

    if (pricingFilter) {
      result = result.filter((t) => t.pricing === pricingFilter)
    }

    if (platformFilter) {
      result = result.filter((t) => t.platform?.includes(platformFilter))
    }

    if (sortBy === 'alphabetical') {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name))
    } else if (sortBy === 'newest') {
      result = [...result].sort((a, b) => (b.dateAdded || '').localeCompare(a.dateAdded || ''))
    } else if (sortBy === 'popular') {
      result = [...result].sort((a, b) => {
        const aScore = (a.badges?.includes('popular') ? 2 : 0) + (a.badges?.includes('editorsPick') ? 1 : 0)
        const bScore = (b.badges?.includes('popular') ? 2 : 0) + (b.badges?.includes('editorsPick') ? 1 : 0)
        return bScore - aScore
      })
    }

    return result
  }, [tools, query, categoryFilter, pricingFilter, platformFilter, sortBy])

  return {
    query, setQuery,
    categoryFilter, setCategoryFilter,
    pricingFilter, setPricingFilter,
    platformFilter, setPlatformFilter,
    sortBy, setSortBy,
    filtered,
  }
}
