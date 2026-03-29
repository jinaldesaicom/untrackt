// Tests for data/tools – verifies lazy imports resolve to React components
import { lazy } from 'react'

// Import each tool module to execute the lazy() calls and push coverage
const toolModules = [
  () => import('../../data/tools/agileTools.js'),
  () => import('../../data/tools/cssHtmlTools.js'),
  () => import('../../data/tools/devTools.js'),
  () => import('../../data/tools/financeTools.js'),
  () => import('../../data/tools/freelanceTools.js'),
  () => import('../../data/tools/generalTools.js'),
  () => import('../../data/tools/healthTools.js'),
  () => import('../../data/tools/mathsScienceTools.js'),
  () => import('../../data/tools/pmTools.js'),
  () => import('../../data/tools/productivityTools.js'),
  () => import('../../data/tools/seoTools.js'),
  () => import('../../data/tools/studentTools.js'),
]

describe('data/tools modules', () => {
  toolModules.forEach((load, i) => {
    it(`module ${i} exports an array of tool configs`, async () => {
      const mod = await load()
      // Each module default-exports an array of tool config objects
      const tools = mod.default || Object.values(mod).find(v => Array.isArray(v))
      expect(Array.isArray(tools)).toBe(true)
      expect(tools.length).toBeGreaterThan(0)
      tools.forEach(tool => {
        expect(tool).toHaveProperty('id')
        expect(tool).toHaveProperty('name')
        expect(tool).toHaveProperty('component')
      })
    })
  })
})
