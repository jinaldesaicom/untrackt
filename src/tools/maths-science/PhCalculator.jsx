import { useState, useMemo } from 'react'

export default function PhCalculator() {
  const [mode, setMode] = useState('ph')
  const [value, setValue] = useState('')

  const results = useMemo(() => {
    const v = parseFloat(value)
    if (isNaN(v) || v < 0) return null
    let pH, pOH, hConc, ohConc
    switch (mode) {
      case 'ph':
        if (v > 14) return null
        pH = v; pOH = 14 - v; hConc = Math.pow(10, -v); ohConc = Math.pow(10, -(14 - v))
        break
      case 'poh':
        if (v > 14) return null
        pOH = v; pH = 14 - v; hConc = Math.pow(10, -(14 - v)); ohConc = Math.pow(10, -v)
        break
      case 'h':
        hConc = v; pH = -Math.log10(v); pOH = 14 - pH; ohConc = Math.pow(10, -pOH)
        break
      case 'oh':
        ohConc = v; pOH = -Math.log10(v); pH = 14 - pOH; hConc = Math.pow(10, -pH)
        break
      default: return null
    }
    const nature = pH < 7 ? 'Acidic' : pH > 7 ? 'Basic' : 'Neutral'
    const strength = Math.abs(pH - 7)
    let strengthLabel = 'Neutral'
    if (strength > 0 && strength <= 2) strengthLabel = pH < 7 ? 'Weakly Acidic' : 'Weakly Basic'
    else if (strength > 2 && strength <= 5) strengthLabel = pH < 7 ? 'Moderately Acidic' : 'Moderately Basic'
    else if (strength > 5) strengthLabel = pH < 7 ? 'Strongly Acidic' : 'Strongly Basic'
    return { pH, pOH, hConc, ohConc, nature, strengthLabel }
  }, [mode, value])

  const commonSolutions = [
    { name: 'Battery Acid', pH: 0.5 },
    { name: 'Stomach Acid', pH: 1.5 },
    { name: 'Lemon Juice', pH: 2.0 },
    { name: 'Vinegar', pH: 2.9 },
    { name: 'Orange Juice', pH: 3.5 },
    { name: 'Coffee', pH: 5.0 },
    { name: 'Milk', pH: 6.5 },
    { name: 'Pure Water', pH: 7.0 },
    { name: 'Blood', pH: 7.4 },
    { name: 'Sea Water', pH: 8.1 },
    { name: 'Baking Soda', pH: 8.3 },
    { name: 'Milk of Magnesia', pH: 10.5 },
    { name: 'Ammonia', pH: 11.0 },
    { name: 'Bleach', pH: 12.5 },
    { name: 'Drain Cleaner', pH: 14.0 },
  ]

  const fmtSci = (n) => {
    if (n === 0) return '0'
    const exp = Math.floor(Math.log10(Math.abs(n)))
    const mant = n / Math.pow(10, exp)
    return `${mant.toFixed(3)} × 10^${exp}`
  }

  const getBarColor = (pH) => {
    if (pH < 3) return 'bg-red-500'
    if (pH < 6) return 'bg-orange-500'
    if (pH < 7) return 'bg-yellow-500'
    if (pH === 7) return 'bg-green-500'
    if (pH < 9) return 'bg-teal-500'
    if (pH < 12) return 'bg-blue-500'
    return 'bg-purple-500'
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">pH ↔ pOH ↔ [H⁺] ↔ [OH⁻] Calculator</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
          {[{ k: 'ph', l: 'pH' }, { k: 'poh', l: 'pOH' }, { k: 'h', l: '[H⁺] (M)' }, { k: 'oh', l: '[OH⁻] (M)' }].map(o => (
            <button key={o.k} onClick={() => { setMode(o.k); setValue('') }}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${mode === o.k ? 'bg-purple-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}>
              {o.l}
            </button>
          ))}
        </div>
        <div className="flex gap-3 items-center">
          <label className="text-sm text-gray-600 dark:text-gray-400 w-28">
            {mode === 'ph' ? 'pH value' : mode === 'poh' ? 'pOH value' : mode === 'h' ? '[H⁺] in mol/L' : '[OH⁻] in mol/L'}:
          </label>
          <input type="number" value={value} onChange={e => setValue(e.target.value)} step="any"
            className="border rounded-lg px-3 py-2 flex-1 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" placeholder={mode.includes('p') ? '0 to 14' : 'e.g. 0.001'} />
        </div>
      </div>

      {results && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { l: 'pH', v: results.pH.toFixed(4) },
              { l: 'pOH', v: results.pOH.toFixed(4) },
              { l: '[H⁺]', v: fmtSci(results.hConc) + ' M' },
              { l: '[OH⁻]', v: fmtSci(results.ohConc) + ' M' },
            ].map(r => (
              <div key={r.l} className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg text-center">
                <div className="text-xs text-gray-500 dark:text-gray-400">{r.l}</div>
                <div className="font-mono text-sm font-bold text-gray-900 dark:text-gray-100">{r.v}</div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${results.pH < 7 ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' : results.pH > 7 ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'}`}>
              {results.nature}
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400">{results.strengthLabel}</span>
          </div>

          <div className="space-y-1">
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300">pH Scale Position</div>
            <div className="relative h-8 rounded-lg overflow-hidden" style={{ background: 'linear-gradient(to right, #ef4444, #f97316, #eab308, #22c55e, #14b8a6, #3b82f6, #8b5cf6)' }}>
              <div className="absolute top-0 h-full w-0.5 bg-black dark:bg-white transition-all"
                style={{ left: `${Math.max(0, Math.min(100, (results.pH / 14) * 100))}%` }}>
                <div className="absolute -top-5 -translate-x-1/2 text-xs font-bold text-gray-900 dark:text-gray-100">{results.pH.toFixed(1)}</div>
              </div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>0 (Acidic)</span><span>7 (Neutral)</span><span>14 (Basic)</span>
            </div>
          </div>

          <div className="text-xs space-y-1 bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg text-gray-600 dark:text-gray-400">
            <div>pH + pOH = 14</div>
            <div>[H⁺] = 10^(-pH)</div>
            <div>[OH⁻] = 10^(-pOH)</div>
            <div>[H⁺] × [OH⁻] = 10⁻¹⁴ (at 25°C)</div>
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">Common Solutions</h3>
        <div className="space-y-1.5">
          {commonSolutions.map(s => (
            <div key={s.name} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded px-2 py-1"
              onClick={() => { setMode('ph'); setValue(String(s.pH)) }}>
              <span className="text-sm text-gray-600 dark:text-gray-400 w-36">{s.name}</span>
              <div className="flex-1 h-3 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${getBarColor(s.pH)}`} style={{ width: `${(s.pH / 14) * 100}%` }}></div>
              </div>
              <span className="text-xs font-mono text-gray-500 dark:text-gray-400 w-8 text-right">{s.pH}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
