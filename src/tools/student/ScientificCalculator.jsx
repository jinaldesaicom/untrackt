import { useEffect, useMemo, useState } from 'react'
import { getItem, setItem } from '../../utils/storage.js'

const HISTORY_KEY = 'untrackt:scientificHistory'

function factorial(n) {
  const val = Number(n)
  if (!Number.isInteger(val) || val < 0 || val > 170) return NaN
  let out = 1
  for (let i = 2; i <= val; i += 1) out *= i
  return out
}

function evaluate(expr, radians) {
  const safe = expr
    .replaceAll('×', '*')
    .replaceAll('÷', '/')
    .replaceAll('^', '**')
    .replace(/\bpi\b/gi, 'Math.PI')
    .replace(/\be\b/g, 'Math.E')
    .replace(/sin\(([^)]+)\)/g, (_, x) => `Math.sin(${radians ? x : `(${x})*Math.PI/180`})`)
    .replace(/cos\(([^)]+)\)/g, (_, x) => `Math.cos(${radians ? x : `(${x})*Math.PI/180`})`)
    .replace(/tan\(([^)]+)\)/g, (_, x) => `Math.tan(${radians ? x : `(${x})*Math.PI/180`})`)
    .replace(/asin\(([^)]+)\)/g, (_, x) => `${radians ? '' : '(180/Math.PI)*'}Math.asin(${x})`)
    .replace(/acos\(([^)]+)\)/g, (_, x) => `${radians ? '' : '(180/Math.PI)*'}Math.acos(${x})`)
    .replace(/atan\(([^)]+)\)/g, (_, x) => `${radians ? '' : '(180/Math.PI)*'}Math.atan(${x})`)
    .replace(/log\(([^)]+)\)/g, 'Math.log10($1)')
    .replace(/ln\(([^)]+)\)/g, 'Math.log($1)')
    .replace(/log2\(([^)]+)\)/g, 'Math.log2($1)')
    .replace(/sqrt\(([^)]+)\)/g, 'Math.sqrt($1)')
    .replace(/abs\(([^)]+)\)/g, 'Math.abs($1)')
    .replace(/ceil\(([^)]+)\)/g, 'Math.ceil($1)')
    .replace(/floor\(([^)]+)\)/g, 'Math.floor($1)')
    .replace(/round\(([^)]+)\)/g, 'Math.round($1)')
    .replace(/(\d+)!/g, (_, x) => `factorial(${x})`)

  // eslint-disable-next-line no-new-func
  const fn = new Function('factorial', `return (${safe})`)
  return fn(factorial)
}

export default function ScientificCalculator() {
  const [expr, setExpr] = useState('')
  const [result, setResult] = useState('')
  const [memory, setMemory] = useState(0)
  const [history, setHistory] = useState(() => getItem(HISTORY_KEY, []))
  const [radians, setRadians] = useState(false)

  const buttons = useMemo(() => [
    '7', '8', '9', '/', 'sin(',
    '4', '5', '6', '*', 'cos(',
    '1', '2', '3', '-', 'tan(',
    '0', '.', '(', ')', '+',
    'pi', 'e', '^', 'sqrt(', 'log(',
    'ln(', 'log2(', 'abs(', 'round(', '!',
  ], [])

  const run = () => {
    try {
      const val = evaluate(expr, radians)
      const text = Number.isFinite(val) ? String(val) : 'Error'
      setResult(text)
      const entry = `${expr} = ${text}`
      const next = [entry, ...history].slice(0, 10)
      setHistory(next)
      setItem(HISTORY_KEY, next)
    } catch {
      setResult('Error')
    }
  }

  useEffect(() => {
    const onKey = (e) => {
      if (/[0-9+\-*/().]/.test(e.key)) setExpr((v) => v + e.key)
      else if (e.key === 'Backspace') setExpr((v) => v.slice(0, -1))
      else if (e.key === 'Enter') run()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-gray-200 bg-white p-4">
        <input value={expr} onChange={(e) => setExpr(e.target.value)} className="input-field font-mono" placeholder="Type expression" />
        <p className="text-2xl font-bold mt-2 font-mono">{result}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        <button className="btn-secondary" onClick={() => setRadians((v) => !v)}>{radians ? 'RAD' : 'DEG'}</button>
        <button className="btn-secondary" onClick={() => setMemory((m) => m + Number(result || 0))}>M+</button>
        <button className="btn-secondary" onClick={() => setMemory((m) => m - Number(result || 0))}>M-</button>
        <button className="btn-secondary" onClick={() => setExpr((v) => v + memory)}>MR</button>
        <button className="btn-secondary" onClick={() => setMemory(0)}>MC</button>
        <button className="btn-secondary" onClick={() => setExpr('')}>Clear</button>
        <button className="btn-primary" onClick={run}>=</button>
      </div>

      <div className="grid grid-cols-5 gap-2">
        {buttons.map((b) => (
          <button key={b} className="btn-secondary text-xs" onClick={() => setExpr((v) => v + b)}>{b}</button>
        ))}
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-4">
        <h3 className="font-semibold mb-2">History (last 10)</h3>
        <ul className="text-sm text-gray-700 space-y-1">
          {history.map((item, idx) => <li key={idx} className="font-mono">{item}</li>)}
        </ul>
      </div>
    </div>
  )
}
