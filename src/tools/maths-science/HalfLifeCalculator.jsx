import { useState, useMemo } from 'react'

export default function HalfLifeCalculator() {
  const [mode, setMode] = useState('decay')
  const [inputs, setInputs] = useState({})
  const set = (k, v) => setInputs(p => ({ ...p, [k]: v }))

  const modes = [
    { k: 'decay', l: 'Radioactive Decay' },
    { k: 'remaining', l: 'Amount Remaining' },
    { k: 'halfLife', l: 'Find Half-Life' },
    { k: 'age', l: 'Age Dating' },
  ]

  const isotopes = [
    { name: 'Carbon-14', halfLife: 5730, unit: 'years' },
    { name: 'Uranium-238', halfLife: 4.468e9, unit: 'years' },
    { name: 'Potassium-40', halfLife: 1.248e9, unit: 'years' },
    { name: 'Iodine-131', halfLife: 8.02, unit: 'days' },
    { name: 'Cobalt-60', halfLife: 5.271, unit: 'years' },
    { name: 'Strontium-90', halfLife: 28.8, unit: 'years' },
    { name: 'Radon-222', halfLife: 3.82, unit: 'days' },
    { name: 'Phosphorus-32', halfLife: 14.29, unit: 'days' },
    { name: 'Technetium-99m', halfLife: 6.01, unit: 'hours' },
    { name: 'Tritium (H-3)', halfLife: 12.32, unit: 'years' },
  ]

  const results = useMemo(() => {
    const g = (k) => parseFloat(inputs[k])
    switch (mode) {
      case 'decay': {
        const N0 = g('N0'), halfLife = g('halfLife'), time = g('time')
        if ([N0, halfLife, time].some(isNaN) || halfLife <= 0) return null
        const lambda = Math.LN2 / halfLife
        const N = N0 * Math.exp(-lambda * time)
        const decayed = N0 - N
        const halfLives = time / halfLife
        const activity = lambda * N
        const intervals = []
        for (let i = 0; i <= Math.min(Math.ceil(halfLives) + 1, 12); i++) {
          const t = i * halfLife
          intervals.push({ halfLives: i, time: t, remaining: N0 * Math.pow(0.5, i), percent: (Math.pow(0.5, i) * 100) })
        }
        return {
          rows: [
            { l: 'Initial amount (N₀)', v: N0 },
            { l: 'Half-life (t½)', v: halfLife },
            { l: 'Time elapsed', v: time },
            { l: 'Remaining (N)', v: N.toFixed(6), highlight: true },
            { l: 'Decayed', v: decayed.toFixed(6) },
            { l: '% remaining', v: `${((N / N0) * 100).toFixed(4)}%` },
            { l: 'Half-lives elapsed', v: halfLives.toFixed(4) },
            { l: 'Decay constant (λ)', v: lambda.toExponential(4) },
            { l: 'Activity (λN)', v: activity.toExponential(4) },
          ],
          intervals,
          formulas: ['N = N₀ × (½)^(t/t½)', 'N = N₀ × e^(−λt)', 'λ = ln(2) / t½ ≈ 0.693 / t½'],
        }
      }
      case 'remaining': {
        const N0 = g('rN0'), numHalfLives = g('numHL')
        if ([N0, numHalfLives].some(isNaN)) return null
        const N = N0 * Math.pow(0.5, numHalfLives)
        return {
          rows: [
            { l: 'Initial amount', v: N0 },
            { l: 'Number of half-lives', v: numHalfLives },
            { l: 'Remaining', v: N.toFixed(6), highlight: true },
            { l: 'Fraction remaining', v: `1/${Math.pow(2, numHalfLives).toFixed(0)}` },
            { l: '% remaining', v: `${((N / N0) * 100).toFixed(4)}%` },
          ],
          formulas: ['N = N₀ × (½)^n, where n = number of half-lives'],
        }
      }
      case 'halfLife': {
        const N0 = g('hN0'), N = g('hN'), time = g('hTime')
        if ([N0, N, time].some(isNaN) || N0 <= 0 || N <= 0 || N >= N0) return null
        const halfLife = -time * Math.LN2 / Math.log(N / N0)
        const lambda = Math.LN2 / halfLife
        const meanLife = 1 / lambda
        return {
          rows: [
            { l: 'Initial amount', v: N0 },
            { l: 'Final amount', v: N },
            { l: 'Time elapsed', v: time },
            { l: 'Half-life', v: halfLife.toFixed(6), highlight: true },
            { l: 'Decay constant (λ)', v: lambda.toExponential(4) },
            { l: 'Mean lifetime (τ)', v: meanLife.toFixed(4) },
          ],
          formulas: ['t½ = −t × ln(2) / ln(N/N₀)', 'τ = 1/λ = t½ / ln(2)'],
        }
      }
      case 'age': {
        const ratio = g('ratio'), halfLife = g('aHL')
        if ([ratio, halfLife].some(isNaN) || ratio <= 0 || ratio >= 1 || halfLife <= 0) return null
        const age = -halfLife * Math.log(ratio) / Math.LN2
        return {
          rows: [
            { l: 'Remaining fraction', v: `${(ratio * 100).toFixed(2)}%` },
            { l: 'Half-life', v: halfLife },
            { l: 'Estimated age', v: age.toFixed(4), highlight: true },
            { l: 'Half-lives elapsed', v: (age / halfLife).toFixed(4) },
          ],
          formulas: ['Age = −t½ × ln(N/N₀) / ln(2)'],
        }
      }
      default: return null
    }
  }, [mode, inputs])

  const field = (key, label, placeholder) => (
    <div key={key}>
      <label className="text-xs text-gray-500 dark:text-gray-400">{label}</label>
      <input type="number" value={inputs[key] || ''} onChange={e => set(key, e.target.value)} step="any" placeholder={placeholder}
        className="w-full border rounded-lg px-3 py-2 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
    </div>
  )

  const renderInputs = () => {
    switch (mode) {
      case 'decay': return <div className="grid grid-cols-3 gap-3">{field('N0', 'Initial amount (N₀)', '1000')}{field('halfLife', 'Half-life', '5730')}{field('time', 'Time elapsed', '11460')}</div>
      case 'remaining': return <div className="grid grid-cols-2 gap-3">{field('rN0', 'Initial amount', '1000')}{field('numHL', 'Number of half-lives', '3')}</div>
      case 'halfLife': return <div className="grid grid-cols-3 gap-3">{field('hN0', 'Initial amount', '100')}{field('hN', 'Final amount', '25')}{field('hTime', 'Time elapsed', '10')}</div>
      case 'age': return <div className="grid grid-cols-2 gap-3">{field('ratio', 'Remaining fraction (0-1)', '0.25')}{field('aHL', 'Half-life', '5730')}</div>
      default: return null
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Half-Life Calculator</h3>
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
              {results.formulas.map((f, i) => <div key={i} className="font-mono text-gray-500 dark:text-gray-400">{f}</div>)}
            </div>
          )}
          {results.intervals && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mt-3 mb-2">Decay Over Time</h4>
              <div className="space-y-1">
                {results.intervals.map(iv => (
                  <div key={iv.halfLives} className="flex items-center gap-3">
                    <span className="text-xs text-gray-500 dark:text-gray-400 w-16">{iv.halfLives} t½</span>
                    <div className="flex-1 h-4 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500 rounded-full transition-all" style={{ width: `${iv.percent}%` }}></div>
                    </div>
                    <span className="text-xs font-mono text-gray-600 dark:text-gray-400 w-20 text-right">{iv.percent.toFixed(1)}%</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">Common Isotopes</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {isotopes.map(iso => (
            <div key={iso.name} className="flex justify-between items-center bg-gray-50 dark:bg-gray-700/50 px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => { setMode('decay'); setInputs({ N0: '1000', halfLife: String(iso.halfLife), time: String(iso.halfLife * 2) }) }}>
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{iso.name}</span>
              <span className="text-sm font-mono text-purple-600 dark:text-purple-400">{iso.halfLife.toLocaleString()} {iso.unit}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
