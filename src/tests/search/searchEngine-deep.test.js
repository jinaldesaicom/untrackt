// Deep tests for searchEngine.js
import {
  searchTools,
  searchInCategory,
  getPopularTools,
  getNewTools,
  getToolOfTheDay,
  getToolsBySubcategory,
  getSubcategories,
  getAllTags,
  getToolsByTag,
  invalidateSearchCache,
  categories,
} from '../../search/searchEngine.js'

describe('searchEngine', () => {
  it('searchTools returns results for a valid query', () => {
    const results = searchTools('json')
    expect(results.length).toBeGreaterThan(0)
    expect(results[0]).toHaveProperty('id')
    expect(results[0]).toHaveProperty('score')
  })

  it('searchTools returns empty for empty query', () => {
    expect(searchTools('')).toEqual([])
    expect(searchTools(null)).toEqual([])
    expect(searchTools(undefined)).toEqual([])
  })

  it('searchTools respects limit', () => {
    const results = searchTools('calculator', 3)
    expect(results.length).toBeLessThanOrEqual(3)
  })

  it('searchInCategory filters by category', () => {
    const results = searchInCategory('calculator', 'finance')
    results.forEach(r => expect(r.category).toBe('finance'))
  })

  it('searchInCategory returns empty for empty query', () => {
    expect(searchInCategory('', 'finance')).toEqual([])
  })

  it('getPopularTools returns an array', () => {
    const popular = getPopularTools()
    expect(Array.isArray(popular)).toBe(true)
  })

  it('getNewTools returns an array', () => {
    const newTools = getNewTools()
    expect(Array.isArray(newTools)).toBe(true)
  })

  it('getToolOfTheDay returns a tool', () => {
    const tool = getToolOfTheDay()
    expect(tool).toHaveProperty('id')
    expect(tool).toHaveProperty('name')
  })

  it('getSubcategories returns strings', () => {
    const subs = getSubcategories('dev')
    expect(Array.isArray(subs)).toBe(true)
  })

  it('getToolsBySubcategory returns tools', () => {
    const subs = getSubcategories('dev')
    if (subs.length > 0) {
      const tools = getToolsBySubcategory('dev', subs[0])
      expect(tools.length).toBeGreaterThan(0)
    }
  })

  it('getAllTags returns tag objects with count', () => {
    const tags = getAllTags()
    expect(tags.length).toBeGreaterThan(0)
    expect(tags[0]).toHaveProperty('tag')
    expect(tags[0]).toHaveProperty('count')
    // Sorted by count descending
    for (let i = 1; i < tags.length; i++) {
      expect(tags[i - 1].count).toBeGreaterThanOrEqual(tags[i].count)
    }
  })

  it('getToolsByTag returns tools for a known tag', () => {
    const tags = getAllTags()
    if (tags.length > 0) {
      const tools = getToolsByTag(tags[0].tag)
      expect(tools.length).toBeGreaterThan(0)
    }
  })

  it('invalidateSearchCache resets fuse and next search still works', () => {
    invalidateSearchCache()
    const results = searchTools('json')
    expect(results.length).toBeGreaterThan(0)
  })

  it('categories is exported', () => {
    expect(Array.isArray(categories)).toBe(true)
    expect(categories.length).toBeGreaterThan(0)
  })
})
