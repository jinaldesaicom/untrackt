// vitest globals provided by config

// Wiki data module - test that each lazy import resolves
const wikiModules = {}
const importAll = async () => {
  const mod = await import('../../wiki/data/index.js')
  return mod
}

describe('wiki/data/index – full coverage', () => {
  it('exports getWikiEntry, hasWikiEntry, getWikiToolIds', async () => {
    const mod = await import('../../wiki/data/index.js')
    expect(typeof mod.getWikiEntry).toBe('function')
    expect(typeof mod.hasWikiEntry).toBe('function')
    expect(typeof mod.getWikiToolIds).toBe('function')
  })

  it('getWikiToolIds returns array of strings', async () => {
    const { getWikiToolIds } = await import('../../wiki/data/index.js')
    const ids = getWikiToolIds()
    expect(Array.isArray(ids)).toBe(true)
    expect(ids.length).toBeGreaterThan(100)
    ids.forEach(id => expect(typeof id).toBe('string'))
  })

  it('hasWikiEntry returns true for known tools', async () => {
    const { hasWikiEntry, getWikiToolIds } = await import('../../wiki/data/index.js')
    const ids = getWikiToolIds()
    // Check first 20 ids
    for (const id of ids.slice(0, 20)) {
      expect(hasWikiEntry(id)).toBe(true)
    }
  })

  it('hasWikiEntry returns false for nonexistent tool', async () => {
    const { hasWikiEntry } = await import('../../wiki/data/index.js')
    expect(hasWikiEntry('nonexistent-tool-xyz-999')).toBe(false)
  })

  it('getWikiEntry resolves for dev tools', async () => {
    const { getWikiEntry } = await import('../../wiki/data/index.js')
    const entry = await getWikiEntry('json-formatter')
    expect(entry).toBeTruthy()
    expect(typeof entry).toBe('object')
  })

  it('getWikiEntry resolves for student tools', async () => {
    const { getWikiEntry } = await import('../../wiki/data/index.js')
    const entry = await getWikiEntry('gpa-calculator')
    expect(entry).toBeTruthy()
  })

  it('getWikiEntry resolves for finance tools', async () => {
    const { getWikiEntry } = await import('../../wiki/data/index.js')
    const entry = await getWikiEntry('compound-interest-calculator')
    expect(entry).toBeTruthy()
  })

  it('getWikiEntry resolves for health tools', async () => {
    const { getWikiEntry } = await import('../../wiki/data/index.js')
    const entry = await getWikiEntry('bmi-calculator') || await getWikiEntry('bmr-calculator')
    expect(entry).toBeTruthy()
  })

  it('getWikiEntry resolves for agile tools', async () => {
    const { getWikiEntry } = await import('../../wiki/data/index.js')
    const entry = await getWikiEntry('sprint-capacity-calculator')
    expect(entry).toBeTruthy()
  })

  it('getWikiEntry resolves for seo tools', async () => {
    const { getWikiEntry } = await import('../../wiki/data/index.js')
    const entry = await getWikiEntry('meta-description-analyzer')
    expect(entry).toBeTruthy()
  })

  it('getWikiEntry resolves for freelance tools', async () => {
    const { getWikiEntry } = await import('../../wiki/data/index.js')
    const entry = await getWikiEntry('hourly-rate-calculator')
    expect(entry).toBeTruthy()
  })

  it('getWikiEntry resolves for pm tools', async () => {
    const { getWikiEntry } = await import('../../wiki/data/index.js')
    const entry = await getWikiEntry('gantt-chart-generator')
    expect(entry).toBeTruthy()
  })

  it('getWikiEntry resolves for productivity tools', async () => {
    const { getWikiEntry } = await import('../../wiki/data/index.js')
    const entry = await getWikiEntry('pomodoro-timer') || await getWikiEntry('todo-list')
    expect(entry).toBeTruthy()
  })

  it('getWikiEntry resolves for general tools', async () => {
    const { getWikiEntry } = await import('../../wiki/data/index.js')
    const entry = await getWikiEntry('password-generator')
    expect(entry).toBeTruthy()
  })

  it('getWikiEntry resolves for maths-science tools', async () => {
    const { getWikiEntry } = await import('../../wiki/data/index.js')
    const entry = await getWikiEntry('statistics-calculator')
    expect(entry).toBeTruthy()
  })

  it('getWikiEntry resolves for css-html tools', async () => {
    const { getWikiEntry } = await import('../../wiki/data/index.js')
    const entry = await getWikiEntry('css-grid-generator')
    expect(entry).toBeTruthy()
  })

  it('getWikiEntry returns null for nonexistent tool', async () => {
    const { getWikiEntry } = await import('../../wiki/data/index.js')
    const entry = await getWikiEntry('nonexistent-tool-xyz-999')
    expect(entry).toBeNull()
  })

  it('loads ALL wiki entries without errors', async () => {
    const { getWikiEntry, getWikiToolIds } = await import('../../wiki/data/index.js')
    const ids = getWikiToolIds()
    const results = await Promise.allSettled(ids.map(id => getWikiEntry(id)))
    const fulfilled = results.filter(r => r.status === 'fulfilled' && r.value)
    expect(fulfilled.length).toBe(ids.length)
  }, 30000)
})
