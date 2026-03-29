// Tests for wiki/data/index.js – getWikiEntry, hasWikiEntry, getWikiToolIds
import { getWikiEntry, hasWikiEntry, getWikiToolIds } from '../../wiki/data/index.js'

describe('wiki/data/index', () => {
  it('getWikiToolIds returns an array of tool IDs', () => {
    const ids = getWikiToolIds()
    expect(Array.isArray(ids)).toBe(true)
    expect(ids.length).toBeGreaterThan(200)
    expect(ids).toContain('json-formatter')
    expect(ids).toContain('gpa-calculator')
    expect(ids).toContain('sprint-planner')
  })

  it('hasWikiEntry returns true for known tools', () => {
    expect(hasWikiEntry('json-formatter')).toBe(true)
    expect(hasWikiEntry('base64-tool')).toBe(true)
    expect(hasWikiEntry('password-generator')).toBe(true)
  })

  it('hasWikiEntry returns false for unknown tools', () => {
    expect(hasWikiEntry('nonexistent-tool')).toBe(false)
    expect(hasWikiEntry('')).toBe(false)
  })

  it('getWikiEntry returns data for a known tool', async () => {
    const entry = await getWikiEntry('json-formatter')
    expect(entry).toBeTruthy()
    expect(typeof entry).toBe('object')
  })

  it('getWikiEntry returns null for unknown tool', async () => {
    const entry = await getWikiEntry('nonexistent-tool')
    expect(entry).toBeNull()
  })

  it('loads wiki entries from multiple categories', async () => {
    const categories = [
      'json-formatter', // dev
      'gpa-calculator', // student
      'hourly-rate-calculator', // freelance
      'password-generator', // general
      'bmr-calculator', // health
      'compound-interest-calculator', // finance
      'keyword-density-analyzer', // seo
      'todo-list', // productivity
      'sprint-planner', // agile
      'css-box-shadow-generator', // css-html
      'task-breakdown-wbs', // pm
      'matrix-calculator', // maths-science
    ]
    for (const id of categories) {
      const entry = await getWikiEntry(id)
      expect(entry).toBeTruthy()
    }
  })
})
