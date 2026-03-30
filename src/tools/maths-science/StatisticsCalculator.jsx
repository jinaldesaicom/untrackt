import { useState, useMemo } from 'react'
import { Copy, Check, RefreshCw } from 'lucide-react'

export default function StatisticsCalculator() {
  const [dataStr, setDataStr] = useState('')
  const [zInput, setZInput] = useState('')
  const [zMean, setZMean] = useState('')
  const [zSD, setZSD] = useState('')
  const [copied, setCopied] = useState(false)

  const data = useMemo(() => {
    return dataStr.split(/[,\s\n]+/).map(Number).filter(n => !isNaN(n) && isFinite(n))
  }, [dataStr])

  const stats = useMemo(() => {
    if (data.length === 0) return null
    const sorted = [...data].sort((a, b) => a - b)
    const n = data.length
    const sum = data.reduce((a, b) => a + b, 0)
    const mean = sum / n
    const median = n % 2 === 0 ? (sorted[n / 2 - 1] + sorted[n / 2]) / 2 : sorted[Math.floor(n / 2)]

    // Mode
    const freq = {}
    data.forEach(v => { freq[v] = (freq[v] || 0) + 1 })
    const maxFreq = Math.max(...Object.values(freq))
    const modes = Object.keys(freq).filter(k => freq[k] === maxFreq).map(Number)
    const mode = maxFreq === 1 ? 'No mode' : modes.join(', ')

    const range = sorted[n - 1] - sorted[0]
    const variance = data.reduce((s, v) => s + (v - mean) ** 2, 0) / n
    const sampleVariance = n > 1 ? data.reduce((s, v) => s + (v - mean) ** 2, 0) / (n - 1) : 0
    const sd = Math.sqrt(variance)
    const sampleSD = Math.sqrt(sampleVariance)

    // Quartiles
    const q = (arr, p) => {
      const idx = (arr.length - 1) * p
      const lo = Math.floor(idx)
      const hi = Math.ceil(idx)
      return arr[lo] + (arr[hi] - arr[lo]) * (idx - lo)
    }
    const q1 = q(sorted, 0.25)
    const q3 = q(sorted, 0.75)
    const iqr = q3 - q1
    const outliers = sorted.filter(v => v < q1 - 1.5 * iqr || v > q3 + 1.5 * iqr)

    return { n, sum, mean, median, mode, range, variance, sampleVariance, sd, sampleSD, q1, q3, iqr, outliers, sorted, min: sorted[0], max: sorted[n - 1] }
  }, [data])

  const zScore = useMemo(() => {
    const x = parseFloat(zInput), m = parseFloat(zMean), s = parseFloat(zSD)
    if (isNaN(x) || isNaN(m) || isNaN(s) || s === 0) return null
    return (x - m) / s
  }, [zInput, zMean, zSD])

  const histogram = useMemo(() => {
    if (!stats) return null
    const { sorted, min, max } = stats
    const binCount = Math.min(Math.max(Math.ceil(Math.sqrt(sorted.length)), 3), 15)
    const binWidth = (max - min) / binCount || 1
    const bins = Array(binCount).fill(0)
    sorted.forEach(v => {
      let idx = Math.floor((v - min) / binWidth)
      if (idx >= binCount) idx = binCount - 1
      bins[idx]++
    })
    const maxBin = Math.max(...bins)
    return { bins, binWidth, min, binCount, maxBin }
  }, [stats])

  const fmt = (n) => Number.isInteger(n) ? String(n) : (+n.toFixed(6)).toString()

  const handleCopy = () => {
    if (!stats) return
    const text = Object.entries(stats).filter(([k]) => !['sorted'].includes(k)).map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(', ') : v}`).join('\n')
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const svgW = 500, svgH = 220, pad = 40

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Data Set</label>
        <textarea value={dataStr} onChange={e => setDataStr(e.target.value)} rows={3}
          placeholder="Enter numbers separated by commas, spaces, or newlines: 12, 15, 18, 22, 25, 28, 30"
          className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 font-mono text-sm" />
        {data.length > 0 && <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{data.length} values parsed</p>}
      </div>

      {stats && (
        <>
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200">Results</h3>
              <button onClick={handleCopy} className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 transition">
                {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                ['Count (n)', stats.n],
                ['Sum', fmt(stats.sum)],
                ['Mean', fmt(stats.mean)],
                ['Median', fmt(stats.median)],
                ['Mode', stats.mode],
                ['Range', fmt(stats.range)],
                ['Pop. Variance (σ²)', fmt(stats.variance)],
                ['Sample Variance (s²)', fmt(stats.sampleVariance)],
                ['Pop. Std Dev (σ)', fmt(stats.sd)],
                ['Sample Std Dev (s)', fmt(stats.sampleSD)],
                ['Q1', fmt(stats.q1)],
                ['Q3', fmt(stats.q3)],
                ['IQR', fmt(stats.iqr)],
                ['Min', fmt(stats.min)],
                ['Max', fmt(stats.max)],
              ].map(([label, val]) => (
                <div key={label} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                  <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
                  <p className="font-mono font-semibold text-gray-800 dark:text-gray-200">{val}</p>
                </div>
              ))}
            </div>
            {stats.outliers.length > 0 && (
              <div className="mt-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
                <p className="text-sm text-yellow-700 dark:text-yellow-400">⚠ Outliers detected (IQR method): {stats.outliers.join(', ')}</p>
              </div>
            )}
          </div>

          {histogram && histogram.maxBin > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Histogram</h3>
              <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full">
                {histogram.bins.map((count, i) => {
                  const barW = (svgW - 2 * pad) / histogram.binCount
                  const barH = histogram.maxBin > 0 ? (count / histogram.maxBin) * (svgH - 2 * pad) : 0
                  const x = pad + i * barW
                  const y = svgH - pad - barH
                  return (
                    <g key={i}>
                      <rect x={x + 1} y={y} width={barW - 2} height={barH} fill="#7c3aed" opacity={0.8} rx={2} />
                      {count > 0 && <text x={x + barW / 2} y={y - 4} textAnchor="middle" fontSize="10" fill="#6b7280">{count}</text>}
                      <text x={x + barW / 2} y={svgH - pad + 14} textAnchor="middle" fontSize="9" fill="#9ca3af">{fmt(histogram.min + i * histogram.binWidth)}</text>
                    </g>
                  )
                })}
                <line x1={pad} x2={svgW - pad} y1={svgH - pad} y2={svgH - pad} stroke="#9ca3af" strokeWidth="1" />
                <line x1={pad} x2={pad} y1={pad} y2={svgH - pad} stroke="#9ca3af" strokeWidth="1" />
              </svg>
            </div>
          )}
        </>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
        <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Z-Score Calculator</h3>
        <div className="grid sm:grid-cols-3 gap-4 mb-3">
          <div>
            <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Value (x)</label>
            <input type="number" value={zInput} onChange={e => setZInput(e.target.value)} className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
          </div>
          <div>
            <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Mean (μ)</label>
            <input type="number" value={zMean} onChange={e => setZMean(e.target.value)} className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
          </div>
          <div>
            <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Std Dev (σ)</label>
            <input type="number" value={zSD} onChange={e => setZSD(e.target.value)} className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
          </div>
        </div>
        {zScore !== null && (
          <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-3">
            <p className="font-mono text-purple-700 dark:text-purple-300">Z = (x − μ) / σ = ({zInput} − {zMean}) / {zSD} = <strong>{fmt(zScore)}</strong></p>
          </div>
        )}
      </div>
    </div>
  )
}
