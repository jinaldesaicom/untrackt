import { useState } from 'react'
import { Copy, Check, RefreshCw } from 'lucide-react'

export default function PolynomialCalculator() {
  const [mode, setMode] = useState('evaluate')
  const [polyA, setPolyA] = useState('')
  const [polyB, setPolyB] = useState('')
  const [xVal, setXVal] = useState('')
  const [result, setResult] = useState(null)
  const [plotData, setPlotData] = useState(null)
  const [copied, setCopied] = useState(false)

  const parseCoeffs = (s) => {
    const trimmed = s.trim()
    if (!trimmed) return []
    return trimmed.split(/[,\s]+/).map(Number).filter(n => !isNaN(n))
  }

  const formatPoly = (coeffs) => {
    if (!coeffs.length) return '0'
    const deg = coeffs.length - 1
    return coeffs.map((c, i) => {
      if (c === 0) return ''
      const exp = deg - i
      const absC = Math.abs(c)
      const sign = c < 0 ? ' − ' : (i > 0 ? ' + ' : '')
      const coefStr = (absC === 1 && exp > 0) ? '' : String(+absC.toFixed(6))
      const varStr = exp === 0 ? '' : exp === 1 ? 'x' : `x^${exp}`
      return sign + coefStr + varStr
    }).filter(Boolean).join('') || '0'
  }

  const evaluatePoly = (coeffs, x) => {
    let result = 0
    for (let i = 0; i < coeffs.length; i++) {
      result = result * x + coeffs[i]
    }
    return result
  }

  const addPolys = (a, b) => {
    const max = Math.max(a.length, b.length)
    const result = []
    const pa = [...Array(max - a.length).fill(0), ...a]
    const pb = [...Array(max - b.length).fill(0), ...b]
    for (let i = 0; i < max; i++) result.push(pa[i] + pb[i])
    return result
  }

  const subPolys = (a, b) => addPolys(a, b.map(c => -c))

  const mulPolys = (a, b) => {
    const result = Array(a.length + b.length - 1).fill(0)
    for (let i = 0; i < a.length; i++)
      for (let j = 0; j < b.length; j++)
        result[i + j] += a[i] * b[j]
    return result
  }

  const findRoots = (coeffs) => {
    if (coeffs.length <= 1) return []
    const deg = coeffs.length - 1
    if (deg === 1) return [-coeffs[1] / coeffs[0]]
    if (deg === 2) {
      const [a, b, c] = coeffs
      const disc = b * b - 4 * a * c
      if (disc >= 0) {
        return [(-b + Math.sqrt(disc)) / (2 * a), (-b - Math.sqrt(disc)) / (2 * a)]
      }
      return [`${(-b / (2 * a)).toFixed(4)} + ${(Math.sqrt(-disc) / (2 * a)).toFixed(4)}i`, `${(-b / (2 * a)).toFixed(4)} − ${(Math.sqrt(-disc) / (2 * a)).toFixed(4)}i`]
    }
    // Numerical roots via Durand-Kerner for degree 3+
    const roots = []
    let c = [...coeffs]
    // Normalize
    const lead = c[0]
    c = c.map(v => v / lead)
    // Try rational root theorem for integers
    const last = Math.abs(c[c.length - 1])
    const candidates = new Set()
    for (let i = 1; i <= Math.min(last, 100); i++) {
      if (last % i === 0) { candidates.add(i); candidates.add(-i) }
    }
    candidates.add(0)
    for (const r of candidates) {
      if (Math.abs(evaluatePoly(c, r)) < 1e-8) {
        roots.push(r)
        // Synthetic division
        const newC = [c[0]]
        for (let i = 1; i < c.length; i++) newC.push(c[i] + newC[i - 1] * r)
        newC.pop()
        c = newC
        if (c.length <= 1) break
      }
    }
    // Remaining roots from reduced polynomial
    if (c.length === 2) roots.push(-c[1] / c[0])
    else if (c.length === 3) {
      const [a, b, cc] = c
      const disc = b * b - 4 * a * cc
      if (disc >= 0) {
        roots.push((-b + Math.sqrt(disc)) / (2 * a), (-b - Math.sqrt(disc)) / (2 * a))
      } else {
        roots.push(`${(-b / (2 * a)).toFixed(4)} ± ${(Math.sqrt(-disc) / (2 * a)).toFixed(4)}i`)
      }
    }
    return roots
  }

  const generatePlot = (coeffs) => {
    if (!coeffs.length) return null
    const roots = findRoots(coeffs).filter(r => typeof r === 'number')
    let xMin = -5, xMax = 5
    if (roots.length) {
      xMin = Math.min(...roots) - 3
      xMax = Math.max(...roots) + 3
    }
    const points = []
    const step = (xMax - xMin) / 200
    let yMin = Infinity, yMax = -Infinity
    for (let x = xMin; x <= xMax; x += step) {
      const y = evaluatePoly(coeffs, x)
      if (isFinite(y)) {
        points.push({ x, y })
        yMin = Math.min(yMin, y)
        yMax = Math.max(yMax, y)
      }
    }
    const pad = (yMax - yMin) * 0.1 || 5
    yMin -= pad; yMax += pad
    return { points, xMin, xMax, yMin, yMax }
  }

  const calculate = () => {
    const a = parseCoeffs(polyA)
    if (!a.length) { setResult('Enter polynomial coefficients.'); return }

    switch (mode) {
      case 'evaluate': {
        const x = parseFloat(xVal)
        if (isNaN(x)) { setResult('Enter a value for x.'); return }
        const val = evaluatePoly(a, x)
        setResult(`P(${x}) = ${formatPoly(a)} evaluated at x=${x}: ${+val.toFixed(8)}`)
        setPlotData(generatePlot(a))
        break
      }
      case 'add': {
        const b = parseCoeffs(polyB)
        if (!b.length) { setResult('Enter second polynomial.'); return }
        const sum = addPolys(a, b)
        setResult(`(${formatPoly(a)}) + (${formatPoly(b)}) = ${formatPoly(sum)}`)
        setPlotData(generatePlot(sum))
        break
      }
      case 'subtract': {
        const b = parseCoeffs(polyB)
        if (!b.length) { setResult('Enter second polynomial.'); return }
        const diff = subPolys(a, b)
        setResult(`(${formatPoly(a)}) − (${formatPoly(b)}) = ${formatPoly(diff)}`)
        setPlotData(generatePlot(diff))
        break
      }
      case 'multiply': {
        const b = parseCoeffs(polyB)
        if (!b.length) { setResult('Enter second polynomial.'); return }
        const prod = mulPolys(a, b)
        setResult(`(${formatPoly(a)}) × (${formatPoly(b)}) = ${formatPoly(prod)}`)
        setPlotData(generatePlot(prod))
        break
      }
      case 'roots': {
        const roots = findRoots(a)
        setResult(`Roots of ${formatPoly(a)}: ${roots.length ? roots.map(r => typeof r === 'number' ? (+r.toFixed(6)).toString() : r).join(', ') : 'No roots found'}`)
        setPlotData(generatePlot(a))
        break
      }
    }
  }

  const handleCopy = () => {
    if (!result) return
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const w = 500, h = 300, pad = 40

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex flex-wrap gap-2">
        {[['evaluate', 'Evaluate'], ['add', 'Add'], ['subtract', 'Subtract'], ['multiply', 'Multiply'], ['roots', 'Find Roots']].map(([k, l]) => (
          <button key={k} onClick={() => { setMode(k); setResult(null); setPlotData(null) }}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${mode === k ? 'bg-purple-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>
            {l}
          </button>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 space-y-4">
        <p className="text-xs text-gray-500 dark:text-gray-400">Enter coefficients from highest to lowest degree, separated by commas or spaces. E.g. "1, -3, 2" = x² − 3x + 2</p>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Polynomial A</label>
          <input value={polyA} onChange={e => setPolyA(e.target.value)} placeholder="1, -3, 2"
            className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
          {polyA && <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">= {formatPoly(parseCoeffs(polyA))}</p>}
        </div>
        {['add', 'subtract', 'multiply'].includes(mode) && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Polynomial B</label>
            <input value={polyB} onChange={e => setPolyB(e.target.value)} placeholder="1, 1"
              className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
            {polyB && <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">= {formatPoly(parseCoeffs(polyB))}</p>}
          </div>
        )}
        {mode === 'evaluate' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Value of x</label>
            <input type="number" value={xVal} onChange={e => setXVal(e.target.value)} placeholder="2"
              className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <button onClick={calculate} className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium">Calculate</button>
        <button onClick={() => { setPolyA(''); setPolyB(''); setXVal(''); setResult(null); setPlotData(null) }}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition flex items-center gap-1">
          <RefreshCw size={14} /> Reset
        </button>
      </div>

      {result && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 flex items-start justify-between">
          <p className="font-mono text-sm text-green-700 dark:text-green-400 break-all">{result}</p>
          <button onClick={handleCopy} className="ml-3 flex items-center gap-1 text-sm text-green-600 dark:text-green-400 hover:text-green-800 transition shrink-0">
            {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      )}

      {plotData && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
          <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Graph</h3>
          <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ maxHeight: 350 }}>
            <rect x={pad} y={pad / 2} width={w - 2 * pad} height={h - pad} fill="none" stroke="#d1d5db" strokeWidth="0.5" />
            {/* Axes */}
            {plotData.yMin <= 0 && plotData.yMax >= 0 && (
              <line x1={pad} x2={w - pad} y1={pad / 2 + (h - pad) * (1 - (0 - plotData.yMin) / (plotData.yMax - plotData.yMin))} y2={pad / 2 + (h - pad) * (1 - (0 - plotData.yMin) / (plotData.yMax - plotData.yMin))} stroke="#9ca3af" strokeWidth="0.8" />
            )}
            {plotData.xMin <= 0 && plotData.xMax >= 0 && (
              <line x1={pad + (w - 2 * pad) * ((0 - plotData.xMin) / (plotData.xMax - plotData.xMin))} x2={pad + (w - 2 * pad) * ((0 - plotData.xMin) / (plotData.xMax - plotData.xMin))} y1={pad / 2} y2={h - pad / 2} stroke="#9ca3af" strokeWidth="0.8" />
            )}
            {/* Curve */}
            <polyline fill="none" stroke="#7c3aed" strokeWidth="2"
              points={plotData.points.map(p => {
                const px = pad + (w - 2 * pad) * ((p.x - plotData.xMin) / (plotData.xMax - plotData.xMin))
                const py = pad / 2 + (h - pad) * (1 - (p.y - plotData.yMin) / (plotData.yMax - plotData.yMin))
                return `${px},${Math.max(0, Math.min(h, py))}`
              }).join(' ')} />
            {/* Labels */}
            <text x={pad} y={h - 2} fontSize="10" fill="#6b7280">{plotData.xMin.toFixed(1)}</text>
            <text x={w - pad} y={h - 2} fontSize="10" fill="#6b7280" textAnchor="end">{plotData.xMax.toFixed(1)}</text>
            <text x={4} y={pad / 2 + 10} fontSize="10" fill="#6b7280">{plotData.yMax.toFixed(1)}</text>
            <text x={4} y={h - pad / 2} fontSize="10" fill="#6b7280">{plotData.yMin.toFixed(1)}</text>
          </svg>
        </div>
      )}
    </div>
  )
}
