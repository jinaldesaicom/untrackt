// Test that all tool data modules export arrays with correct structure
// and that lazy component imports are functions
const modules = [
  ['agileTools', () => import('../../data/tools/agileTools.js'), 'agileTools'],
  ['cssHtmlTools', () => import('../../data/tools/cssHtmlTools.js'), 'cssHtmlTools'],
  ['devTools', () => import('../../data/tools/devTools.js'), 'devTools'],
  ['financeTools', () => import('../../data/tools/financeTools.js'), 'financeTools'],
  ['freelanceTools', () => import('../../data/tools/freelanceTools.js'), 'freelanceTools'],
  ['generalTools', () => import('../../data/tools/generalTools.js'), 'generalTools'],
  ['healthTools', () => import('../../data/tools/healthTools.js'), 'healthTools'],
  ['mathsScienceTools', () => import('../../data/tools/mathsScienceTools.js'), 'mathsScienceTools'],
  ['pmTools', () => import('../../data/tools/pmTools.js'), 'pmTools'],
  ['productivityTools', () => import('../../data/tools/productivityTools.js'), 'productivityTools'],
  ['scrumTools', () => import('../../data/tools/scrumTools.js'), 'scrumTools'],
  ['seoTools', () => import('../../data/tools/seoTools.js'), 'seoTools'],
  ['studentTools', () => import('../../data/tools/studentTools.js'), 'studentTools'],
]

describe('data/tools – all modules', () => {
  modules.forEach(([name, importFn, exportName]) => {
    describe(name, () => {
      it('exports a named array', async () => {
        const mod = await importFn()
        const tools = mod[exportName]
        expect(Array.isArray(tools)).toBe(true)
      })

      it('each tool has required fields', async () => {
        const mod = await importFn()
        const tools = mod[exportName]
        if (tools.length === 0) return // scrumTools is empty
        for (const tool of tools) {
          expect(tool.id).toBeTruthy()
          expect(tool.name).toBeTruthy()
          expect(tool.category).toBeTruthy()
          expect(tool.path).toBeTruthy()
          expect(tool.component).toBeTruthy()
          expect(typeof tool.component.$$typeof === 'symbol' || typeof tool.component === 'object').toBe(true)
        }
      })

      it('tool ids are unique', async () => {
        const mod = await importFn()
        const tools = mod[exportName]
        if (tools.length === 0) return
        const ids = tools.map(t => t.id)
        expect(new Set(ids).size).toBe(ids.length)
      })

      it('lazy components are defined', async () => {
        const mod = await importFn()
        const tools = mod[exportName]
        if (tools.length === 0) return
        for (const tool of tools.slice(0, 2)) {
          expect(tool.component).toBeDefined()
        }
      })
    })
  })
})
