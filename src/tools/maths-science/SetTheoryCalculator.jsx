import { useState } from 'react'
import { Copy, Check, RefreshCw } from 'lucide-react'

export default function SetTheoryCalculator() {
  const [setAStr, setSetAStr] = useState('')
  const [setBStr, setSetBStr] = useState('')
  const [universalStr, setUniversalStr] = useState('')
  const [results, setResults] = useState(null)
  const [copied, setCopied] = useState(false)

  const parseSet = (s) => [...new Set(s.split(/[,\s]+/).map(v => v.trim()).filter(Boolean))]

  const calculate = () => {
    const a = parseSet(setAStr)
    const b = parseSet(setBStr)
    const u = universalStr.trim() ? parseSet(universalStr) : [...new Set([...a, ...b])]

    const union = [...new Set([...a, ...b])]
    const intersection = a.filter(x => b.includes(x))
    const differenceAB = a.filter(x => !b.includes(x))
    const differenceBA = b.filter(x => !a.includes(x))
    const symDiff = [...differenceAB, ...differenceBA]
    const complementA = u.filter(x => !a.includes(x))
    const complementB = u.filter(x => !b.includes(x))
    const isSubsetAB = a.every(x => b.includes(x))
    const isSubsetBA = b.every(x => a.includes(x))

    // Power set of A (limit to 10 elements)
    const powerSet = (arr) => {
      if (arr.length > 10) return null
      const ps = [[]]
      for (const item of arr) {
        const newSets = ps.map(s => [...s, item])
        ps.push(...newSets)
      }
      return ps
    }

    setResults({
      a, b, u, union, intersection, differenceAB, differenceBA, symDiff,
      complementA, complementB, isSubsetAB, isSubsetBA,
      powerSetA: powerSet(a)
    })
  }

  const fmtSet = (s) => `{${s.join(', ')}}`
  const handleCopy = () => {
    if (!results) return
    const text = `A = ${fmtSet(results.a)}\nB = ${fmtSet(results.b)}\nA ∪ B = ${fmtSet(results.union)}\nA ∩ B = ${fmtSet(results.intersection)}\nA − B = ${fmtSet(results.differenceAB)}\nB − A = ${fmtSet(results.differenceBA)}\nA △ B = ${fmtSet(results.symDiff)}`
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  // Venn diagram
  const VennDiagram = () => {
    if (!results) return null
    const { a, b, intersection, differenceAB, differenceBA } = results
    return (
      <svg viewBox="0 0 400 250" className="w-full max-w-lg mx-auto">
        <rect width="400" height="250" fill="none" stroke="#d1d5db" rx="10" />
        <text x="200" y="20" textAnchor="middle" fontSize="12" fill="#6b7280">U = {fmtSet(results.u).substring(0, 50)}</text>
        <circle cx="155" cy="130" r="85" fill="#7c3aed" fillOpacity="0.15" stroke="#7c3aed" strokeWidth="2" />
        <circle cx="245" cy="130" r="85" fill="#2563eb" fillOpacity="0.15" stroke="#2563eb" strokeWidth="2" />
        <text x="110" y="90" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#7c3aed">A</text>
        <text x="290" y="90" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#2563eb">B</text>
        <text x="115" y="135" textAnchor="middle" fontSize="10" fill="#7c3aed">{differenceAB.slice(0, 4).join(', ')}{differenceAB.length > 4 ? '...' : ''}</text>
        <text x="200" y="135" textAnchor="middle" fontSize="10" fill="#4b5563">{intersection.slice(0, 4).join(', ')}{intersection.length > 4 ? '...' : ''}</text>
        <text x="285" y="135" textAnchor="middle" fontSize="10" fill="#2563eb">{differenceBA.slice(0, 4).join(', ')}{differenceBA.length > 4 ? '...' : ''}</text>
        {intersection.length === 0 && <text x="200" y="135" textAnchor="middle" fontSize="9" fill="#9ca3af">∅</text>}
      </svg>
    )
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 space-y-4">
        <p className="text-xs text-gray-500 dark:text-gray-400">Enter elements separated by commas or spaces.</p>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Set A</label>
          <input value={setAStr} onChange={e => setSetAStr(e.target.value)} placeholder="1, 2, 3, 4, 5"
            className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Set B</label>
          <input value={setBStr} onChange={e => setSetBStr(e.target.value)} placeholder="3, 4, 5, 6, 7"
            className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Universal Set U (optional)</label>
          <input value={universalStr} onChange={e => setUniversalStr(e.target.value)} placeholder="1, 2, 3, 4, 5, 6, 7, 8, 9, 10"
            className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
        </div>
      </div>

      <div className="flex gap-3">
        <button onClick={calculate} className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium">Calculate</button>
        <button onClick={() => { setSetAStr(''); setSetBStr(''); setUniversalStr(''); setResults(null) }}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition flex items-center gap-1">
          <RefreshCw size={14} /> Reset
        </button>
      </div>

      {results && (
        <>
          <VennDiagram />
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200">Results</h3>
              <button onClick={handleCopy} className="text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 flex items-center gap-1">
                {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
            <div className="space-y-2 font-mono text-sm">
              {[
                ['A', fmtSet(results.a), `|A| = ${results.a.length}`],
                ['B', fmtSet(results.b), `|B| = ${results.b.length}`],
                ['U', fmtSet(results.u), `|U| = ${results.u.length}`],
                ['A ∪ B', fmtSet(results.union), `|A∪B| = ${results.union.length}`],
                ['A ∩ B', fmtSet(results.intersection), `|A∩B| = ${results.intersection.length}`],
                ['A − B', fmtSet(results.differenceAB), `${results.differenceAB.length} elements`],
                ['B − A', fmtSet(results.differenceBA), `${results.differenceBA.length} elements`],
                ['A △ B', fmtSet(results.symDiff), `${results.symDiff.length} elements`],
                ["A'", fmtSet(results.complementA), `${results.complementA.length} elements`],
                ["B'", fmtSet(results.complementB), `${results.complementB.length} elements`],
              ].map(([label, value, note]) => (
                <div key={label} className="flex items-start gap-3 py-1 border-b border-gray-100 dark:border-gray-700 last:border-0">
                  <span className="text-purple-600 dark:text-purple-400 font-semibold w-16 shrink-0">{label}</span>
                  <span className="text-gray-700 dark:text-gray-300 break-all flex-1">= {value}</span>
                  <span className="text-gray-400 text-xs shrink-0">{note}</span>
                </div>
              ))}
              <div className="pt-2 space-y-1">
                <p className="text-gray-700 dark:text-gray-300">A ⊆ B? {results.isSubsetAB ? '✓ Yes' : '✗ No'}</p>
                <p className="text-gray-700 dark:text-gray-300">B ⊆ A? {results.isSubsetBA ? '✓ Yes' : '✗ No'}</p>
              </div>
            </div>
          </div>

          {results.powerSetA && (
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Power Set of A <span className="text-sm font-normal text-gray-500">({results.powerSetA.length} subsets)</span></h3>
              <p className="font-mono text-sm text-gray-700 dark:text-gray-300 break-all">
                {'{'}{results.powerSetA.map(s => s.length === 0 ? '∅' : `{${s.join(',')}}`).join(', ')}{'}'}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  )
}
