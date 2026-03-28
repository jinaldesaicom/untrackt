import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

export default function ChemicalEquationBalancer() {
  const [equation, setEquation] = useState('')
  const [result, setResult] = useState(null)
  const [copied, setCopied] = useState(false)

  const parseFormula = (formula) => {
    const elements = {}
    const regex = /([A-Z][a-z]?)(\d*)/g
    let match
    // Handle parentheses first
    let expanded = formula
    const parenRegex = /\(([^)]+)\)(\d+)/g
    let pm
    while ((pm = parenRegex.exec(formula)) !== null) {
      const inner = pm[1]
      const mult = parseInt(pm[2])
      let replacement = ''
      const innerRegex = /([A-Z][a-z]?)(\d*)/g
      let im
      while ((im = innerRegex.exec(inner)) !== null) {
        const el = im[1]
        const count = (parseInt(im[2]) || 1) * mult
        replacement += el + (count > 1 ? count : '')
      }
      expanded = expanded.replace(pm[0], replacement)
    }

    while ((match = regex.exec(expanded)) !== null) {
      if (!match[1]) continue
      const el = match[1]
      const count = parseInt(match[2]) || 1
      elements[el] = (elements[el] || 0) + count
    }
    return elements
  }

  const balanceEquation = () => {
    if (!equation.trim()) { setResult({ error: 'Enter a chemical equation (e.g., H2 + O2 = H2O)' }); return }

    const parts = equation.replace(/→/g, '=').replace(/->/g, '=').split('=').map(s => s.trim())
    if (parts.length !== 2) { setResult({ error: 'Use = or -> to separate reactants and products' }); return }

    const reactantStrs = parts[0].split('+').map(s => s.trim()).filter(Boolean)
    const productStrs = parts[1].split('+').map(s => s.trim()).filter(Boolean)
    const allCompounds = [...reactantStrs, ...productStrs]
    const n = allCompounds.length
    const nReactants = reactantStrs.length

    // Get all elements
    const allElements = new Set()
    allCompounds.forEach(c => {
      Object.keys(parseFormula(c)).forEach(e => allElements.add(e))
    })
    const elements = [...allElements]

    // Build matrix: each row is an element, each column is a compound
    // Reactants have positive coefficients, products have negative
    const matrix = elements.map(el => {
      return allCompounds.map((compound, i) => {
        const parsed = parseFormula(compound)
        const count = parsed[el] || 0
        return i < nReactants ? count : -count
      })
    })

    // Gaussian elimination to find coefficients
    const tryBalance = (maxCoeff) => {
      // Brute force for small equations (up to 6 compounds, coefficients up to maxCoeff)
      if (n > 6) return null

      const check = (coeffs) => {
        for (const el of elements) {
          let sum = 0
          allCompounds.forEach((compound, i) => {
            const parsed = parseFormula(compound)
            const count = parsed[el] || 0
            sum += (i < nReactants ? 1 : -1) * coeffs[i] * count
          })
          if (sum !== 0) return false
        }
        return true
      }

      const search = (idx, current) => {
        if (idx === n) return check(current) ? [...current] : null
        for (let c = 1; c <= maxCoeff; c++) {
          current[idx] = c
          const res = search(idx + 1, current)
          if (res) return res
        }
        return null
      }

      return search(0, new Array(n).fill(0))
    }

    const coeffs = tryBalance(10) || tryBalance(20)

    if (!coeffs) {
      setResult({ error: 'Could not balance this equation. Check the formula syntax.' })
      return
    }

    // Build balanced equation string
    const formatSide = (compounds, coefficients) => {
      return compounds.map((c, i) => {
        const coeff = coefficients[i]
        return coeff === 1 ? c : `${coeff}${c}`
      }).join(' + ')
    }

    const balanced = formatSide(reactantStrs, coeffs.slice(0, nReactants)) +
      ' → ' + formatSide(productStrs, coeffs.slice(nReactants))

    // Verify atom counts
    const verification = {}
    elements.forEach(el => {
      let left = 0, right = 0
      reactantStrs.forEach((c, i) => { left += (parseFormula(c)[el] || 0) * coeffs[i] })
      productStrs.forEach((c, i) => { right += (parseFormula(c)[el] || 0) * coeffs[nReactants + i] })
      verification[el] = { left, right, balanced: left === right }
    })

    setResult({ balanced, coefficients: coeffs, compounds: allCompounds, verification })
  }

  const handleCopy = (text) => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1500) }

  const examples = [
    'H2 + O2 = H2O',
    'Fe + O2 = Fe2O3',
    'CH4 + O2 = CO2 + H2O',
    'Al + HCl = AlCl3 + H2',
    'NaOH + H2SO4 = Na2SO4 + H2O',
    'C6H12O6 + O2 = CO2 + H2O',
    'KMnO4 + HCl = KCl + MnCl2 + Cl2 + H2O',
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Chemical Equation</label>
          <input value={equation} onChange={e => setEquation(e.target.value)} placeholder="H2 + O2 = H2O"
            className="w-full border rounded-lg px-4 py-3 font-mono text-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
            onKeyDown={e => e.key === 'Enter' && balanceEquation()} />
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Use = or → to separate sides. Elements: H2, O2, Fe2O3, Ca(OH)2, etc.</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {examples.map(ex => (
            <button key={ex} onClick={() => { setEquation(ex); setResult(null) }}
              className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition font-mono">
              {ex}
            </button>
          ))}
        </div>

        <button onClick={balanceEquation} className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium">Balance Equation</button>
      </div>

      {result && result.error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-red-600 dark:text-red-400">
          {result.error}
        </div>
      )}

      {result && result.balanced && (
        <>
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-5">
            <div className="flex justify-between items-center">
              <p className="font-mono text-xl font-bold text-green-700 dark:text-green-400">{result.balanced}</p>
              <button onClick={() => handleCopy(result.balanced)} className="p-2 rounded hover:bg-green-100 dark:hover:bg-green-800/30">
                {copied ? <Check size={16} className="text-green-600" /> : <Copy size={16} className="text-gray-400" />}
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Atom Count Verification</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700/50">
                  <th className="text-left px-4 py-2">Element</th>
                  <th className="text-center px-4 py-2">Left Side</th>
                  <th className="text-center px-4 py-2">Right Side</th>
                  <th className="text-center px-4 py-2">Balanced</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(result.verification).map(([el, data]) => (
                  <tr key={el} className="border-t border-gray-100 dark:border-gray-700">
                    <td className="px-4 py-2 font-mono font-medium text-gray-700 dark:text-gray-300">{el}</td>
                    <td className="px-4 py-2 text-center font-mono">{data.left}</td>
                    <td className="px-4 py-2 text-center font-mono">{data.right}</td>
                    <td className="px-4 py-2 text-center">{data.balanced ? '✓' : '✗'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  )
}
