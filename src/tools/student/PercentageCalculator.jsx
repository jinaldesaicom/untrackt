import { useMemo, useState } from 'react'

function n(v) { return Number(v) || 0 }

export default function PercentageCalculator() {
  const [mode, setMode] = useState('of')
  const [x, setX] = useState('')
  const [y, setY] = useState('')
  const [amt, setAmt] = useState('')

  const result = useMemo(() => {
    const a = n(x)
    const b = n(y)
    if (mode === 'of') return (a / 100) * b
    if (mode === 'is') return b === 0 ? 0 : (a / b) * 100
    if (mode === 'change') return a === 0 ? 0 : ((b - a) / a) * 100
    if (mode === 'delta') return b + (b * a) / 100
    if (mode === 'plusminus') return n(amt) + (n(amt) * a) / 100
    return 0
  }, [mode, x, y, amt])

  const formula = mode === 'of'
    ? `${x || 0}% of ${y || 0} = (${x || 0}/100) × ${y || 0}`
    : mode === 'is'
      ? `${x || 0} is what % of ${y || 0} = (${x || 0}/${y || 0}) × 100`
      : mode === 'change'
        ? `% change from ${x || 0} to ${y || 0} = ((${y || 0}-${x || 0})/${x || 0}) × 100`
        : mode === 'delta'
          ? `${y || 0} adjusted by ${x || 0}% = ${y || 0} + (${y || 0}×${x || 0}/100)`
          : `${amt || 0} adjusted by ${x || 0}%`

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <button className={mode === 'of' ? 'btn-primary' : 'btn-secondary'} onClick={() => setMode('of')}>What is X% of Y?</button>
        <button className={mode === 'is' ? 'btn-primary' : 'btn-secondary'} onClick={() => setMode('is')}>X is what % of Y?</button>
        <button className={mode === 'change' ? 'btn-primary' : 'btn-secondary'} onClick={() => setMode('change')}>Percentage change X to Y</button>
        <button className={mode === 'delta' ? 'btn-primary' : 'btn-secondary'} onClick={() => setMode('delta')}>Increase/decrease by %</button>
        <button className={mode === 'plusminus' ? 'btn-primary' : 'btn-secondary'} onClick={() => setMode('plusminus')}>Add/subtract %</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <input value={x} onChange={(e) => setX(e.target.value)} className="input-field" placeholder="X" />
        <input value={y} onChange={(e) => setY(e.target.value)} className="input-field" placeholder="Y" />
        {mode === 'plusminus' ? <input value={amt} onChange={(e) => setAmt(e.target.value)} className="input-field" placeholder="Number" /> : null}
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-4">
        <p className="text-sm text-gray-500 mb-1">Formula</p>
        <p className="font-mono text-sm">{formula}</p>
        <p className="text-2xl font-bold mt-2">{Number.isFinite(result) ? result.toFixed(4) : 'N/A'}</p>
      </div>

      <button className="btn-secondary" onClick={() => navigator.clipboard.writeText(String(result))}>Copy result</button>
    </div>
  )
}
