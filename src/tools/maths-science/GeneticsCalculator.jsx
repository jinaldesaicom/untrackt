import { useState, useMemo } from 'react'

const alleles = (g) => g.split('').filter(c => c !== ' ')

export default function GeneticsCalculator() {
  const [mode, setMode] = useState('mono')
  const [p1, setP1] = useState('Aa')
  const [p2, setP2] = useState('Aa')
  const [dp1, setDp1] = useState('AaBb')
  const [dp2, setDp2] = useState('AaBb')
  const [bloodP1, setBloodP1] = useState('AO')
  const [bloodP2, setBloodP2] = useState('BO')

  const monoResult = useMemo(() => {
    if (p1.length !== 2 || p2.length !== 2) return null
    const a1 = [p1[0], p1[1]]
    const a2 = [p2[0], p2[1]]
    const grid = []
    const counts = {}
    const phenoCounts = {}
    for (const g1 of a1) {
      for (const g2 of a2) {
        const pair = g1.toUpperCase() === g1 ? g1 + g2 : g2 + g1
        const sorted = [pair[0], pair[1]].sort((a, b) => {
          if (a.toUpperCase() === b.toUpperCase()) return a === a.toUpperCase() ? -1 : 1
          return a.toUpperCase().localeCompare(b.toUpperCase())
        }).join('')
        grid.push(sorted)
        counts[sorted] = (counts[sorted] || 0) + 1
        const pheno = sorted[0] === sorted[0].toUpperCase() ? 'Dominant' : 'Recessive'
        phenoCounts[pheno] = (phenoCounts[pheno] || 0) + 1
      }
    }
    return { a1, a2, grid, counts, phenoCounts }
  }, [p1, p2])

  const diResult = useMemo(() => {
    if (dp1.length !== 4 || dp2.length !== 4) return null
    const gametes1 = [dp1[0] + dp1[2], dp1[0] + dp1[3], dp1[1] + dp1[2], dp1[1] + dp1[3]]
    const gametes2 = [dp2[0] + dp2[2], dp2[0] + dp2[3], dp2[1] + dp2[2], dp2[1] + dp2[3]]
    const grid = []
    const counts = {}
    for (const g1 of gametes1) {
      const row = []
      for (const g2 of gametes2) {
        const a = [g1[0], g2[0]].sort((a, b) => a === a.toUpperCase() ? -1 : 1).join('')
        const b2 = [g1[1], g2[1]].sort((a, b) => a === a.toUpperCase() ? -1 : 1).join('')
        const geno = a + b2
        row.push(geno)
        counts[geno] = (counts[geno] || 0) + 1
      }
      grid.push(row)
    }
    const phenoCounts = {}
    for (const [geno, count] of Object.entries(counts)) {
      const p1t = geno[0] === geno[0].toUpperCase() ? 'Dom' : 'Rec'
      const p2t = geno[2] === geno[2].toUpperCase() ? 'Dom' : 'Rec'
      const pheno = `${p1t}-${p2t}`
      phenoCounts[pheno] = (phenoCounts[pheno] || 0) + count
    }
    return { gametes1, gametes2, grid, counts, phenoCounts }
  }, [dp1, dp2])

  const bloodResult = useMemo(() => {
    const alleles1 = [bloodP1[0], bloodP1[1]]
    const alleles2 = [bloodP2[0], bloodP2[1]]
    const results = []
    const counts = {}
    for (const a1 of alleles1) {
      for (const a2 of alleles2) {
        const pair = [a1, a2].sort().join('')
        results.push(pair)
        counts[pair] = (counts[pair] || 0) + 1
      }
    }
    const phenotypes = {}
    for (const [geno, count] of Object.entries(counts)) {
      let type
      if (geno.includes('A') && geno.includes('B')) type = 'AB'
      else if (geno.includes('A')) type = 'A'
      else if (geno.includes('B')) type = 'B'
      else type = 'O'
      phenotypes[type] = (phenotypes[type] || 0) + count
    }
    return { alleles1, alleles2, results, counts, phenotypes }
  }, [bloodP1, bloodP2])

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-wrap gap-2">
        {[{ k: 'mono', l: 'Monohybrid Cross' }, { k: 'di', l: 'Dihybrid Cross' }, { k: 'blood', l: 'Blood Type' }].map(m => (
          <button key={m.k} onClick={() => setMode(m.k)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${mode === m.k ? 'bg-purple-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}>
            {m.l}
          </button>
        ))}
      </div>

      {mode === 'mono' && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">Monohybrid Punnett Square</h3>
            <div className="flex gap-4 mb-4">
              <div>
                <label className="text-xs text-gray-500 dark:text-gray-400">Parent 1 genotype</label>
                <input value={p1} onChange={e => setP1(e.target.value)} maxLength={2}
                  className="w-24 border rounded-lg px-3 py-2 text-sm font-mono dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
              </div>
              <div>
                <label className="text-xs text-gray-500 dark:text-gray-400">Parent 2 genotype</label>
                <input value={p2} onChange={e => setP2(e.target.value)} maxLength={2}
                  className="w-24 border rounded-lg px-3 py-2 text-sm font-mono dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
              </div>
              <div className="flex gap-2 items-end">
                {[['AA', 'Aa'], ['Aa', 'Aa'], ['Aa', 'aa']].map(([a, b], i) => (
                  <button key={i} onClick={() => { setP1(a); setP2(b) }}
                    className="px-2 py-1 text-xs rounded bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">
                    {a}×{b}
                  </button>
                ))}
              </div>
            </div>

            {monoResult && (
              <div className="space-y-4">
                <div className="overflow-x-auto">
                  <table className="border-collapse">
                    <thead>
                      <tr>
                        <th className="w-12 h-12 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700"></th>
                        {monoResult.a2.map((a, i) => (
                          <th key={i} className="w-16 h-12 border border-gray-300 dark:border-gray-600 bg-purple-100 dark:bg-purple-900/30 text-center font-mono font-bold text-purple-700 dark:text-purple-300">{a}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {monoResult.a1.map((a, ri) => (
                        <tr key={ri}>
                          <td className="w-12 h-16 border border-gray-300 dark:border-gray-600 bg-purple-100 dark:bg-purple-900/30 text-center font-mono font-bold text-purple-700 dark:text-purple-300">{a}</td>
                          {monoResult.a2.map((_, ci) => {
                            const geno = monoResult.grid[ri * 2 + ci]
                            const isDom = geno[0] === geno[0].toUpperCase()
                            return (
                              <td key={ci} className={`w-16 h-16 border border-gray-300 dark:border-gray-600 text-center font-mono font-bold text-lg ${isDom ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300' : 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300'}`}>
                                {geno}
                              </td>
                            )
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Genotype Ratios</h4>
                    {Object.entries(monoResult.counts).map(([g, c]) => (
                      <div key={g} className="flex justify-between text-sm py-1">
                        <span className="font-mono text-gray-900 dark:text-gray-100">{g}</span>
                        <span className="text-gray-600 dark:text-gray-400">{c}/4 ({(c / 4 * 100).toFixed(0)}%)</span>
                      </div>
                    ))}
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phenotype Ratios</h4>
                    {Object.entries(monoResult.phenoCounts).map(([p, c]) => (
                      <div key={p} className="flex justify-between text-sm py-1">
                        <span className={`font-medium ${p === 'Dominant' ? 'text-green-700 dark:text-green-400' : 'text-yellow-700 dark:text-yellow-400'}`}>{p}</span>
                        <span className="text-gray-600 dark:text-gray-400">{c}/4 ({(c / 4 * 100).toFixed(0)}%)</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {mode === 'di' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Dihybrid Punnett Square</h3>
          <div className="flex gap-4 mb-4">
            <div>
              <label className="text-xs text-gray-500 dark:text-gray-400">Parent 1 (e.g. AaBb)</label>
              <input value={dp1} onChange={e => setDp1(e.target.value)} maxLength={4}
                className="w-28 border rounded-lg px-3 py-2 text-sm font-mono dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
            </div>
            <div>
              <label className="text-xs text-gray-500 dark:text-gray-400">Parent 2 (e.g. AaBb)</label>
              <input value={dp2} onChange={e => setDp2(e.target.value)} maxLength={4}
                className="w-28 border rounded-lg px-3 py-2 text-sm font-mono dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
            </div>
          </div>

          {diResult && (
            <div className="space-y-4">
              <div className="overflow-x-auto">
                <table className="border-collapse text-xs">
                  <thead>
                    <tr>
                      <th className="w-12 h-10 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700"></th>
                      {diResult.gametes2.map((g, i) => (
                        <th key={i} className="w-14 h-10 border border-gray-300 dark:border-gray-600 bg-purple-100 dark:bg-purple-900/30 text-center font-mono font-bold text-purple-700 dark:text-purple-300">{g}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {diResult.gametes1.map((g, ri) => (
                      <tr key={ri}>
                        <td className="w-12 h-12 border border-gray-300 dark:border-gray-600 bg-purple-100 dark:bg-purple-900/30 text-center font-mono font-bold text-purple-700 dark:text-purple-300">{g}</td>
                        {diResult.grid[ri].map((geno, ci) => (
                          <td key={ci} className="w-14 h-12 border border-gray-300 dark:border-gray-600 text-center font-mono font-bold bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                            {geno}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phenotype Ratios</h4>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(diResult.phenoCounts).map(([p, c]) => (
                    <div key={p} className="flex justify-between bg-purple-50 dark:bg-purple-900/20 px-3 py-2 rounded-lg text-sm">
                      <span className="text-gray-700 dark:text-gray-300">{p.replace('Dom', 'Dominant').replace('Rec', 'Recessive')}</span>
                      <span className="font-mono font-bold text-gray-900 dark:text-gray-100">{c}/16 ({(c / 16 * 100).toFixed(1)}%)</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {mode === 'blood' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Blood Type Genetics</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Use A, B, O alleles (e.g., AO, BO, AB, OO, AA, BB)</p>
          <div className="flex gap-4 mb-4">
            <div>
              <label className="text-xs text-gray-500 dark:text-gray-400">Parent 1</label>
              <select value={bloodP1} onChange={e => setBloodP1(e.target.value)}
                className="border rounded-lg px-3 py-2 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200">
                {['AA', 'AO', 'BB', 'BO', 'AB', 'OO'].map(v => <option key={v} value={v}>{v} (Type {v.includes('A') && v.includes('B') ? 'AB' : v.includes('A') ? 'A' : v.includes('B') ? 'B' : 'O'})</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-500 dark:text-gray-400">Parent 2</label>
              <select value={bloodP2} onChange={e => setBloodP2(e.target.value)}
                className="border rounded-lg px-3 py-2 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200">
                {['AA', 'AO', 'BB', 'BO', 'AB', 'OO'].map(v => <option key={v} value={v}>{v} (Type {v.includes('A') && v.includes('B') ? 'AB' : v.includes('A') ? 'A' : v.includes('B') ? 'B' : 'O'})</option>)}
              </select>
            </div>
          </div>

          {bloodResult && (
            <div className="space-y-4">
              <div className="overflow-x-auto">
                <table className="border-collapse">
                  <thead>
                    <tr>
                      <th className="w-12 h-12 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700"></th>
                      {bloodResult.alleles2.map((a, i) => (
                        <th key={i} className="w-16 h-12 border border-gray-300 dark:border-gray-600 bg-purple-100 dark:bg-purple-900/30 text-center font-mono font-bold text-purple-700 dark:text-purple-300">{a}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {bloodResult.alleles1.map((a, ri) => (
                      <tr key={ri}>
                        <td className="w-12 h-16 border border-gray-300 dark:border-gray-600 bg-purple-100 dark:bg-purple-900/30 text-center font-mono font-bold text-purple-700 dark:text-purple-300">{a}</td>
                        {bloodResult.alleles2.map((_, ci) => {
                          const geno = bloodResult.results[ri * 2 + ci]
                          let type = geno.includes('A') && geno.includes('B') ? 'AB' : geno.includes('A') ? 'A' : geno.includes('B') ? 'B' : 'O'
                          const colors = { A: 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300', B: 'bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300', AB: 'bg-purple-50 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300', O: 'bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-300' }
                          return (
                            <td key={ci} className={`w-16 h-16 border border-gray-300 dark:border-gray-600 text-center font-mono ${colors[type]}`}>
                              <div className="font-bold">{geno}</div>
                              <div className="text-xs">Type {type}</div>
                            </td>
                          )
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Blood Type Probabilities</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {['A', 'B', 'AB', 'O'].map(type => {
                    const count = bloodResult.phenotypes[type] || 0
                    const colors = { A: 'bg-red-100 dark:bg-red-900/30', B: 'bg-blue-100 dark:bg-blue-900/30', AB: 'bg-purple-100 dark:bg-purple-900/30', O: 'bg-gray-100 dark:bg-gray-700/50' }
                    return (
                      <div key={type} className={`p-3 rounded-lg text-center ${colors[type]}`}>
                        <div className="text-lg font-bold text-gray-900 dark:text-gray-100">Type {type}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{count}/4 ({(count / 4 * 100).toFixed(0)}%)</div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="text-xs bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg text-gray-500 dark:text-gray-400">
                <div className="font-medium mb-1">Blood Type Alleles:</div>
                <div>• I^A and I^B are codominant (both expressed in AB)</div>
                <div>• i (O allele) is recessive to both I^A and I^B</div>
                <div>• Type A: AA or AO | Type B: BB or BO | Type AB: AB | Type O: OO</div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
