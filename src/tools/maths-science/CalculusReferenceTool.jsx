import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

export default function CalculusReferenceTool() {
  const [tab, setTab] = useState('derivatives')
  const [limitExpr, setLimitExpr] = useState('')
  const [limitX, setLimitX] = useState('0')
  const [limitResult, setLimitResult] = useState(null)
  const [copied, setCopied] = useState(false)

  const derivativeRules = [
    { rule: 'Constant', formula: 'd/dx[c] = 0', example: 'd/dx[5] = 0' },
    { rule: 'Power', formula: 'd/dx[xⁿ] = nxⁿ⁻¹', example: 'd/dx[x³] = 3x²' },
    { rule: 'Constant Multiple', formula: 'd/dx[cf(x)] = cf\'(x)', example: 'd/dx[3x²] = 6x' },
    { rule: 'Sum/Difference', formula: 'd/dx[f ± g] = f\' ± g\'', example: 'd/dx[x² + x] = 2x + 1' },
    { rule: 'Product', formula: 'd/dx[fg] = f\'g + fg\'', example: 'd/dx[x·sin(x)] = sin(x) + x·cos(x)' },
    { rule: 'Quotient', formula: 'd/dx[f/g] = (f\'g − fg\')/g²', example: 'd/dx[sin(x)/x] = (x·cos(x) − sin(x))/x²' },
    { rule: 'Chain', formula: 'd/dx[f(g(x))] = f\'(g(x))·g\'(x)', example: 'd/dx[sin(x²)] = cos(x²)·2x' },
    { rule: 'Exponential', formula: 'd/dx[eˣ] = eˣ', example: 'd/dx[e²ˣ] = 2e²ˣ' },
    { rule: 'Logarithmic', formula: 'd/dx[ln(x)] = 1/x', example: 'd/dx[ln(x²)] = 2/x' },
    { rule: 'Sine', formula: 'd/dx[sin(x)] = cos(x)', example: '' },
    { rule: 'Cosine', formula: 'd/dx[cos(x)] = −sin(x)', example: '' },
    { rule: 'Tangent', formula: 'd/dx[tan(x)] = sec²(x)', example: '' },
    { rule: 'Arcsine', formula: 'd/dx[sin⁻¹(x)] = 1/√(1−x²)', example: '' },
    { rule: 'Arccosine', formula: 'd/dx[cos⁻¹(x)] = −1/√(1−x²)', example: '' },
    { rule: 'Arctangent', formula: 'd/dx[tan⁻¹(x)] = 1/(1+x²)', example: '' },
  ]

  const integralRules = [
    { rule: 'Constant', formula: '∫c dx = cx + C', example: '∫5 dx = 5x + C' },
    { rule: 'Power', formula: '∫xⁿ dx = xⁿ⁺¹/(n+1) + C, n≠−1', example: '∫x² dx = x³/3 + C' },
    { rule: '1/x', formula: '∫1/x dx = ln|x| + C', example: '' },
    { rule: 'Exponential', formula: '∫eˣ dx = eˣ + C', example: '∫e²ˣ dx = e²ˣ/2 + C' },
    { rule: 'aˣ', formula: '∫aˣ dx = aˣ/ln(a) + C', example: '∫2ˣ dx = 2ˣ/ln(2) + C' },
    { rule: 'sin(x)', formula: '∫sin(x) dx = −cos(x) + C', example: '' },
    { rule: 'cos(x)', formula: '∫cos(x) dx = sin(x) + C', example: '' },
    { rule: 'sec²(x)', formula: '∫sec²(x) dx = tan(x) + C', example: '' },
    { rule: 'csc²(x)', formula: '∫csc²(x) dx = −cot(x) + C', example: '' },
    { rule: '1/(1+x²)', formula: '∫1/(1+x²) dx = tan⁻¹(x) + C', example: '' },
    { rule: '1/√(1−x²)', formula: '∫1/√(1−x²) dx = sin⁻¹(x) + C', example: '' },
    { rule: 'sec(x)tan(x)', formula: '∫sec(x)tan(x) dx = sec(x) + C', example: '' },
  ]

  const taylorSeries = [
    { fn: 'eˣ', series: '1 + x + x²/2! + x³/3! + ...', convergence: 'All x' },
    { fn: 'sin(x)', series: 'x − x³/3! + x⁵/5! − x⁷/7! + ...', convergence: 'All x' },
    { fn: 'cos(x)', series: '1 − x²/2! + x⁴/4! − x⁶/6! + ...', convergence: 'All x' },
    { fn: 'ln(1+x)', series: 'x − x²/2 + x³/3 − x⁴/4 + ...', convergence: '−1 < x ≤ 1' },
    { fn: '1/(1−x)', series: '1 + x + x² + x³ + ...', convergence: '|x| < 1' },
    { fn: 'tan⁻¹(x)', series: 'x − x³/3 + x⁵/5 − x⁷/7 + ...', convergence: '|x| ≤ 1' },
    { fn: '(1+x)ⁿ', series: '1 + nx + n(n−1)x²/2! + ...', convergence: '|x| < 1' },
  ]

  const calculateLimit = () => {
    if (!limitExpr.trim()) { setLimitResult('Enter an expression in x'); return }
    const x0 = parseFloat(limitX)
    if (isNaN(x0)) { setLimitResult('Enter a valid x value'); return }

    try {
      const fn = new Function('x', 'Math', `"use strict"; return (${limitExpr})`)
      // Try direct substitution
      const direct = fn(x0, Math)
      if (isFinite(direct)) {
        setLimitResult(`lim(x→${x0}) [${limitExpr}] = ${(+direct.toFixed(10)).toString()}\n(By direct substitution)`)
        return
      }

      // Numerical approach from both sides
      const deltas = [0.1, 0.01, 0.001, 0.0001, 0.00001]
      const fromLeft = deltas.map(d => fn(x0 - d, Math))
      const fromRight = deltas.map(d => fn(x0 + d, Math))

      const leftLimit = fromLeft[fromLeft.length - 1]
      const rightLimit = fromRight[fromRight.length - 1]

      let text = `lim(x→${x0}) [${limitExpr}]\n\n`
      text += 'Numerical approach:\n'
      text += `From left:  ${deltas.map((d, i) => `f(${x0 - d}) = ${(+fromLeft[i].toFixed(8)).toString()}`).join('\n            ')}\n`
      text += `From right: ${deltas.map((d, i) => `f(${x0 + d}) = ${(+fromRight[i].toFixed(8)).toString()}`).join('\n            ')}\n\n`

      if (isFinite(leftLimit) && isFinite(rightLimit) && Math.abs(leftLimit - rightLimit) < 0.001) {
        text += `Limit ≈ ${(+(leftLimit + rightLimit) / 2).toFixed(8)}`
      } else if (!isFinite(leftLimit) || !isFinite(rightLimit)) {
        text += 'Limit does not exist (approaches ±∞)'
      } else {
        text += `Left limit ≈ ${(+leftLimit.toFixed(8)).toString()}, Right limit ≈ ${(+rightLimit.toFixed(8)).toString()}\nLimit does not exist (left ≠ right)`
      }
      setLimitResult(text)
    } catch (e) {
      setLimitResult('Error evaluating expression. Use JS syntax: Math.sin(x), x*x, etc.')
    }
  }

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-wrap gap-2">
        {[['derivatives', 'Derivatives'], ['integrals', 'Integrals'], ['limits', 'Limits'], ['taylor', 'Taylor Series']].map(([k, l]) => (
          <button key={k} onClick={() => setTab(k)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${tab === k ? 'bg-purple-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>
            {l}
          </button>
        ))}
      </div>

      {tab === 'derivatives' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700/50">
                <th className="text-left px-4 py-3 text-gray-600 dark:text-gray-300">Rule</th>
                <th className="text-left px-4 py-3 text-gray-600 dark:text-gray-300">Formula</th>
                <th className="text-left px-4 py-3 text-gray-600 dark:text-gray-300">Example</th>
              </tr>
            </thead>
            <tbody>
              {derivativeRules.map((r, i) => (
                <tr key={i} className="border-t border-gray-100 dark:border-gray-700">
                  <td className="px-4 py-2 font-medium text-gray-700 dark:text-gray-300">{r.rule}</td>
                  <td className="px-4 py-2 font-mono text-purple-700 dark:text-purple-400">{r.formula}</td>
                  <td className="px-4 py-2 font-mono text-gray-500 dark:text-gray-400">{r.example}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'integrals' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700/50">
                <th className="text-left px-4 py-3 text-gray-600 dark:text-gray-300">Function</th>
                <th className="text-left px-4 py-3 text-gray-600 dark:text-gray-300">Integral</th>
                <th className="text-left px-4 py-3 text-gray-600 dark:text-gray-300">Example</th>
              </tr>
            </thead>
            <tbody>
              {integralRules.map((r, i) => (
                <tr key={i} className="border-t border-gray-100 dark:border-gray-700">
                  <td className="px-4 py-2 font-medium text-gray-700 dark:text-gray-300">{r.rule}</td>
                  <td className="px-4 py-2 font-mono text-purple-700 dark:text-purple-400">{r.formula}</td>
                  <td className="px-4 py-2 font-mono text-gray-500 dark:text-gray-400">{r.example}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'limits' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">Enter a function in x (JS syntax). Calculates limits numerically.</p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">f(x)</label>
              <input value={limitExpr} onChange={e => setLimitExpr(e.target.value)} placeholder="Math.sin(x)/x"
                className="w-full border rounded-lg px-3 py-2 font-mono text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">x →</label>
              <input type="number" value={limitX} onChange={e => setLimitX(e.target.value)} placeholder="0"
                className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
            </div>
          </div>
          <button onClick={calculateLimit} className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium">Calculate Limit</button>
          {limitResult && (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <pre className="font-mono text-sm text-green-700 dark:text-green-400 whitespace-pre-wrap">{limitResult}</pre>
            </div>
          )}
        </div>
      )}

      {tab === 'taylor' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700/50">
                <th className="text-left px-4 py-3 text-gray-600 dark:text-gray-300">Function</th>
                <th className="text-left px-4 py-3 text-gray-600 dark:text-gray-300">Taylor Series (at x=0)</th>
                <th className="text-left px-4 py-3 text-gray-600 dark:text-gray-300">Convergence</th>
              </tr>
            </thead>
            <tbody>
              {taylorSeries.map((r, i) => (
                <tr key={i} className="border-t border-gray-100 dark:border-gray-700">
                  <td className="px-4 py-2 font-mono font-medium text-gray-700 dark:text-gray-300">{r.fn}</td>
                  <td className="px-4 py-2 font-mono text-purple-700 dark:text-purple-400">{r.series}</td>
                  <td className="px-4 py-2 text-gray-500 dark:text-gray-400">{r.convergence}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
