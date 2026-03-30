import { useState, useMemo } from 'react'

export default function ErrorUncertaintyCalculator() {
  const [mode, setMode] = useState('absolute')
  const [inputs, setInputs] = useState({})
  const set = (k, v) => setInputs(p => ({ ...p, [k]: v }))
  const [dataPoints, setDataPoints] = useState('10.2, 10.5, 10.1, 10.4, 10.3')

  const modes = [
    { k: 'absolute', l: 'Absolute Error' },
    { k: 'relative', l: 'Relative Error' },
    { k: 'propagation', l: 'Error Propagation' },
    { k: 'stats', l: 'Statistical Uncertainty' },
  ]

  const results = useMemo(() => {
    const g = (k) => parseFloat(inputs[k])
    switch (mode) {
      case 'absolute': {
        const measured = g('measured'), actual = g('actual')
        if ([measured, actual].some(isNaN)) return null
        const absErr = Math.abs(measured - actual)
        const relErr = actual !== 0 ? (absErr / Math.abs(actual)) * 100 : 0
        return {
          rows: [
            { l: 'Measured value', v: measured },
            { l: 'Actual value', v: actual },
            { l: 'Absolute error', v: absErr.toFixed(6), highlight: true },
            { l: 'Relative error', v: `${relErr.toFixed(4)}%` },
            { l: 'Percent error', v: `${relErr.toFixed(4)}%` },
          ],
          formulas: ['Absolute Error = |Measured − Actual|', 'Relative Error = |Absolute Error / Actual| × 100%'],
        }
      }
      case 'relative': {
        const value = g('value'), uncertainty = g('uncertainty')
        if ([value, uncertainty].some(isNaN)) return null
        const relUncertainty = value !== 0 ? (uncertainty / Math.abs(value)) * 100 : 0
        return {
          rows: [
            { l: 'Value', v: value },
            { l: 'Uncertainty (±)', v: uncertainty },
            { l: 'Result', v: `${value} ± ${uncertainty}`, highlight: true },
            { l: 'Relative uncertainty', v: `${relUncertainty.toFixed(4)}%` },
            { l: 'Range', v: `${(value - uncertainty).toFixed(6)} to ${(value + uncertainty).toFixed(6)}` },
          ],
          formulas: ['Relative Uncertainty = (Uncertainty / Value) × 100%'],
        }
      }
      case 'propagation': {
        const a = g('propA'), da = g('propDA'), b = g('propB'), db = g('propDB')
        if ([a, da, b, db].some(isNaN)) return null
        const sumVal = a + b
        const sumErr = Math.sqrt(da * da + db * db)
        const diffVal = a - b
        const diffErr = sumErr
        const prodVal = a * b
        const prodRelErr = Math.sqrt((da / a) ** 2 + (db / b) ** 2)
        const prodErr = Math.abs(prodVal) * prodRelErr
        const divVal = b !== 0 ? a / b : 0
        const divErr = b !== 0 ? Math.abs(divVal) * prodRelErr : 0
        return {
          rows: [
            { l: 'A', v: `${a} ± ${da}` },
            { l: 'B', v: `${b} ± ${db}` },
            { l: 'A + B', v: `${sumVal.toFixed(6)} ± ${sumErr.toFixed(6)}`, highlight: true },
            { l: 'A − B', v: `${diffVal.toFixed(6)} ± ${diffErr.toFixed(6)}` },
            { l: 'A × B', v: `${prodVal.toFixed(6)} ± ${prodErr.toFixed(6)}` },
            { l: 'A / B', v: b !== 0 ? `${divVal.toFixed(6)} ± ${divErr.toFixed(6)}` : 'undefined' },
          ],
          formulas: [
            'Add/Sub: δ(A±B) = √(δA² + δB²)',
            'Mul/Div: δ(A×B)/|A×B| = √((δA/A)² + (δB/B)²)',
          ],
        }
      }
      case 'stats': {
        const pts = dataPoints.split(',').map(s => parseFloat(s.trim())).filter(n => !isNaN(n))
        if (pts.length < 2) return null
        const n = pts.length
        const mean = pts.reduce((a, b) => a + b, 0) / n
        const variance = pts.reduce((s, x) => s + (x - mean) ** 2, 0) / (n - 1)
        const sd = Math.sqrt(variance)
        const sem = sd / Math.sqrt(n)
        const ci95 = 1.96 * sem
        return {
          rows: [
            { l: 'Data points', v: n },
            { l: 'Mean', v: mean.toFixed(6), highlight: true },
            { l: 'Std deviation (s)', v: sd.toFixed(6) },
            { l: 'Std error (SEM)', v: sem.toFixed(6) },
            { l: '95% CI', v: `${mean.toFixed(4)} ± ${ci95.toFixed(4)}` },
            { l: 'Range', v: `${Math.min(...pts).toFixed(4)} to ${Math.max(...pts).toFixed(4)}` },
            { l: 'Variance', v: variance.toFixed(6) },
            { l: 'Coefficient of variation', v: `${mean !== 0 ? ((sd / Math.abs(mean)) * 100).toFixed(2) : 0}%` },
          ],
          formulas: ['s = √(Σ(xᵢ − x̄)² / (n−1))', 'SEM = s / √n', '95% CI ≈ x̄ ± 1.96 × SEM'],
        }
      }
      default: return null
    }
  }, [mode, inputs, dataPoints])

  const field = (key, label, placeholder) => (
    <div key={key}>
      <label className="text-xs text-gray-500 dark:text-gray-400">{label}</label>
      <input type="number" value={inputs[key] || ''} onChange={e => set(key, e.target.value)} step="any" placeholder={placeholder}
        className="w-full border rounded-lg px-3 py-2 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
    </div>
  )

  const renderInputs = () => {
    switch (mode) {
      case 'absolute': return <div className="grid grid-cols-2 gap-3">{field('measured', 'Measured value', '9.8')}{field('actual', 'Actual value', '9.81')}</div>
      case 'relative': return <div className="grid grid-cols-2 gap-3">{field('value', 'Value', '25.4')}{field('uncertainty', 'Uncertainty (±)', '0.3')}</div>
      case 'propagation': return <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">{field('propA', 'Value A', '5.0')}{field('propDA', 'δA (±)', '0.2')}{field('propB', 'Value B', '3.0')}{field('propDB', 'δB (±)', '0.1')}</div>
      case 'stats': return (
        <div>
          <label className="text-xs text-gray-500 dark:text-gray-400">Data points (comma-separated)</label>
          <textarea value={dataPoints} onChange={e => setDataPoints(e.target.value)} rows={2}
            className="w-full border rounded-lg px-3 py-2 text-sm font-mono dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
        </div>
      )
      default: return null
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Error & Uncertainty Calculator</h3>
        <div className="flex flex-wrap gap-2">
          {modes.map(m => (
            <button key={m.k} onClick={() => { setMode(m.k); setInputs({}) }}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${mode === m.k ? 'bg-purple-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}>
              {m.l}
            </button>
          ))}
        </div>
        {renderInputs()}
      </div>

      {results && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 space-y-3">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Results</h4>
          <div className="space-y-2">
            {results.rows.map((r, i) => (
              <div key={i} className={`flex justify-between items-center px-3 py-2 rounded-lg ${r.highlight ? 'bg-purple-100 dark:bg-purple-900/30' : 'bg-purple-50 dark:bg-purple-900/20'}`}>
                <span className="text-sm text-gray-600 dark:text-gray-400">{r.l}</span>
                <span className={`font-mono text-sm ${r.highlight ? 'font-bold text-purple-700 dark:text-purple-300' : 'font-bold text-gray-900 dark:text-gray-100'}`}>{r.v}</span>
              </div>
            ))}
          </div>
          {results.formulas && (
            <div className="text-xs bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg space-y-1">
              {results.formulas.map((f, i) => (
                <div key={i} className="font-mono text-gray-500 dark:text-gray-400">{f}</div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
