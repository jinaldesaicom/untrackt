import { useState } from 'react'
import { Copy, Check, RefreshCw } from 'lucide-react'

export default function ProbabilityCalculator() {
  const [mode, setMode] = useState('basic')
  const [inputs, setInputs] = useState({})
  const [result, setResult] = useState(null)
  const [copied, setCopied] = useState(false)

  const set = (k, v) => setInputs(p => ({ ...p, [k]: v }))
  const g = (k) => parseFloat(inputs[k]) || 0
  const fmt = (n) => Number.isInteger(n) ? String(n) : (+n.toFixed(8)).toString()

  const factorial = (n) => {
    if (n < 0) return NaN
    if (n <= 1) return 1
    let r = 1
    for (let i = 2; i <= n; i++) r *= i
    return r
  }

  const nCr = (n, r) => {
    if (r < 0 || r > n) return 0
    if (r === 0 || r === n) return 1
    let num = 1, den = 1
    for (let i = 0; i < Math.min(r, n - r); i++) {
      num *= (n - i)
      den *= (i + 1)
    }
    return Math.round(num / den)
  }

  const nPr = (n, r) => {
    if (r < 0 || r > n) return 0
    let result = 1
    for (let i = n; i > n - r; i--) result *= i
    return result
  }

  // Standard normal CDF approximation (Abramowitz & Stegun)
  const normCdf = (z) => {
    if (z < -6) return 0
    if (z > 6) return 1
    const a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741, a4 = -1.453152027, a5 = 1.061405429, p = 0.3275911
    const sign = z < 0 ? -1 : 1
    const x = Math.abs(z) / Math.sqrt(2)
    const t = 1 / (1 + p * x)
    const y = 1 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x)
    return 0.5 * (1 + sign * y)
  }

  // Standard normal PDF
  const normPdf = (z) => Math.exp(-z * z / 2) / Math.sqrt(2 * Math.PI)

  const calculate = () => {
    let r = ''
    switch (mode) {
      case 'basic': {
        const fav = g('favorable'), total = g('total')
        if (total <= 0) { setResult('Total outcomes must be > 0'); return }
        const p = fav / total
        r = `P(A) = ${fav}/${total} = ${fmt(p)} (${(p * 100).toFixed(2)}%)\n`
        r += `P(A') = 1 − P(A) = ${fmt(1 - p)} (${((1 - p) * 100).toFixed(2)}%)`
        break
      }
      case 'permutation': {
        const n = Math.round(g('n')), rr = Math.round(g('r'))
        if (n < 0 || rr < 0) { setResult('Values must be non-negative'); return }
        const result = nPr(n, rr)
        r = `P(${n}, ${rr}) = ${n}! / (${n}−${rr})! = ${fmt(result)}`
        break
      }
      case 'combination': {
        const n = Math.round(g('n')), rr = Math.round(g('r'))
        if (n < 0 || rr < 0) { setResult('Values must be non-negative'); return }
        const result = nCr(n, rr)
        r = `C(${n}, ${rr}) = ${n}! / (${rr}! × (${n}−${rr})!) = ${fmt(result)}`
        break
      }
      case 'binomial': {
        const n = Math.round(g('n')), k = Math.round(g('k')), p = g('p')
        if (p < 0 || p > 1) { setResult('Probability p must be between 0 and 1'); return }
        const coeff = nCr(n, k)
        const prob = coeff * Math.pow(p, k) * Math.pow(1 - p, n - k)
        const mean = n * p
        const variance = n * p * (1 - p)
        r = `P(X = ${k}) = C(${n},${k}) × ${p}^${k} × ${fmt(1 - p)}^${n - k}\n`
        r += `= ${coeff} × ${fmt(Math.pow(p, k))} × ${fmt(Math.pow(1 - p, n - k))}\n`
        r += `= ${fmt(prob)} (${(prob * 100).toFixed(4)}%)\n\n`
        r += `Mean: μ = np = ${fmt(mean)}\n`
        r += `Variance: σ² = np(1−p) = ${fmt(variance)}\n`
        r += `Std Dev: σ = ${fmt(Math.sqrt(variance))}`
        break
      }
      case 'normal': {
        const z = g('z')
        const cdf = normCdf(z)
        const pdf = normPdf(z)
        r = `Z = ${z}\n`
        r += `P(Z ≤ ${z}) = ${fmt(cdf)} (${(cdf * 100).toFixed(4)}%)\n`
        r += `P(Z ≥ ${z}) = ${fmt(1 - cdf)} (${((1 - cdf) * 100).toFixed(4)}%)\n`
        r += `P(−${Math.abs(z)} ≤ Z ≤ ${Math.abs(z)}) = ${fmt(normCdf(Math.abs(z)) - normCdf(-Math.abs(z)))} (${((normCdf(Math.abs(z)) - normCdf(-Math.abs(z))) * 100).toFixed(4)}%)\n`
        r += `φ(${z}) = ${fmt(pdf)}`
        break
      }
    }
    setResult(r)
  }

  const handleCopy = () => {
    if (!result) return
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const inp = (label, key, placeholder) => (
    <div>
      <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">{label}</label>
      <input type="number" value={inputs[key] || ''} onChange={e => set(key, e.target.value)}
        placeholder={placeholder} className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
    </div>
  )

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex flex-wrap gap-2">
        {[['basic', 'Basic'], ['permutation', 'Permutations'], ['combination', 'Combinations'], ['binomial', 'Binomial'], ['normal', 'Normal Dist.']].map(([k, l]) => (
          <button key={k} onClick={() => { setMode(k); setInputs({}); setResult(null) }}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${mode === k ? 'bg-purple-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>
            {l}
          </button>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 space-y-4">
        {mode === 'basic' && (
          <>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-mono">P(A) = favorable / total</p>
            <div className="grid grid-cols-2 gap-4">
              {inp('Favorable outcomes', 'favorable', '3')}
              {inp('Total outcomes', 'total', '10')}
            </div>
          </>
        )}
        {mode === 'permutation' && (
          <>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-mono">nPr = n! / (n−r)!</p>
            <div className="grid grid-cols-2 gap-4">
              {inp('n (total items)', 'n', '10')}
              {inp('r (items chosen)', 'r', '3')}
            </div>
          </>
        )}
        {mode === 'combination' && (
          <>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-mono">nCr = n! / (r!(n−r)!)</p>
            <div className="grid grid-cols-2 gap-4">
              {inp('n (total items)', 'n', '10')}
              {inp('r (items chosen)', 'r', '3')}
            </div>
          </>
        )}
        {mode === 'binomial' && (
          <>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-mono">P(X=k) = C(n,k) × p^k × (1−p)^(n−k)</p>
            <div className="grid grid-cols-3 gap-4">
              {inp('n (trials)', 'n', '10')}
              {inp('k (successes)', 'k', '3')}
              {inp('p (probability)', 'p', '0.5')}
            </div>
          </>
        )}
        {mode === 'normal' && (
          <>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-mono">Standard Normal Distribution (Z-table)</p>
            <div className="grid grid-cols-1 gap-4">
              {inp('Z-score', 'z', '1.96')}
            </div>
          </>
        )}
      </div>

      <div className="flex gap-3">
        <button onClick={calculate} className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium">Calculate</button>
        <button onClick={() => { setInputs({}); setResult(null) }}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition flex items-center gap-1">
          <RefreshCw size={14} /> Reset
        </button>
      </div>

      {result && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
          <div className="flex items-start justify-between">
            <pre className="font-mono text-sm text-green-700 dark:text-green-400 whitespace-pre-wrap">{result}</pre>
            <button onClick={handleCopy} className="ml-3 flex items-center gap-1 text-sm text-green-600 dark:text-green-400 hover:text-green-800 transition shrink-0">
              {copied ? <Check size={14} /> : <Copy size={14} />}
            </button>
          </div>
        </div>
      )}

      {mode === 'normal' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
          <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Common Z-values</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">
            {[
              ['Z = 1.00', '84.13%'],
              ['Z = 1.28', '89.97%'],
              ['Z = 1.645', '95.00%'],
              ['Z = 1.96', '97.50%'],
              ['Z = 2.00', '97.72%'],
              ['Z = 2.33', '99.01%'],
              ['Z = 2.576', '99.50%'],
              ['Z = 3.00', '99.87%'],
            ].map(([z, p]) => (
              <div key={z} className="bg-gray-50 dark:bg-gray-700/50 rounded p-2 text-center">
                <p className="font-mono text-gray-700 dark:text-gray-300">{z}</p>
                <p className="text-gray-500 dark:text-gray-400">{p}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
