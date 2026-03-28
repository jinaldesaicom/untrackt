import Fuse from 'fuse.js'
import tools, { categories } from '../data/tools.js'

const fuseOptions = {
  keys: [
    { name: 'name', weight: 0.4 },
    { name: 'tags', weight: 0.3 },
    { name: 'description', weight: 0.2 },
    { name: 'category', weight: 0.05 },
    { name: 'subcategory', weight: 0.05 },
  ],
  threshold: 0.35,
  includeMatches: true,
  includeScore: true,
  minMatchCharLength: 2,
}

let fuse = null

function getFuse() {
  if (!fuse) {
    fuse = new Fuse(tools, fuseOptions)
  }
  return fuse
}

export function searchTools(query, limit = 20) {
  const trimmed = (query || '').trim()
  if (!trimmed) return []
  const results = getFuse().search(trimmed)
  return (limit ? results.slice(0, limit) : results).map((r) => ({
    ...r.item,
    score: r.score,
    matches: r.matches,
  }))
}

export function searchInCategory(query, categoryId, limit = 20) {
  const trimmed = (query || '').trim()
  if (!trimmed) return []
  const results = getFuse().search(trimmed)
  const filtered = results.filter((r) => r.item.category === categoryId)
  return (limit ? filtered.slice(0, limit) : filtered).map((r) => ({
    ...r.item,
    score: r.score,
    matches: r.matches,
  }))
}

export function getPopularTools() {
  return tools.filter((t) => t.isPopular)
}

export function getNewTools() {
  return tools.filter((t) => t.isNew)
}

export function getToolOfTheDay() {
  const key = new Date().toISOString().slice(0, 10)
  const seed = key.split('-').reduce((acc, part) => acc + Number(part), 0)
  return tools[seed % tools.length]
}

export function getToolsBySubcategory(categoryId, subcategory) {
  return tools.filter(
    (t) => t.category === categoryId && t.subcategory === subcategory
  )
}

export function getSubcategories(categoryId) {
  const subs = new Set()
  tools.forEach((t) => {
    if (t.category === categoryId && t.subcategory) subs.add(t.subcategory)
  })
  return Array.from(subs)
}

export function getAllTags() {
  const tagMap = {}
  tools.forEach((t) => {
    t.tags.forEach((tag) => {
      tagMap[tag] = (tagMap[tag] || 0) + 1
    })
  })
  return Object.entries(tagMap)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
}

export function getToolsByTag(tag) {
  return tools.filter((t) => t.tags.includes(tag))
}

export function invalidateSearchCache() {
  fuse = null
}

export { categories }
