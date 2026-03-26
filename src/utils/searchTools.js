import tools from '../data/tools.js'

export function findMatchingTools(query, limit) {
  const normalizedQuery = query.trim().toLowerCase()

  if (!normalizedQuery) {
    return []
  }

  const matches = tools.filter((tool) => (
    tool.name.toLowerCase().includes(normalizedQuery) ||
    tool.description.toLowerCase().includes(normalizedQuery) ||
    tool.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery))
  ))

  return typeof limit === 'number' ? matches.slice(0, limit) : matches
}