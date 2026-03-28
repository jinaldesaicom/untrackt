import { useState, useMemo } from 'react'

function countSigFigs(str) {
  const s = str.trim()
  if (!s || isNaN(Number(s))) return { count: 0, rules: [] }
  const rules = []
  const isNeg = s.startsWith('-')
  const abs = isNeg ? s.slice(1) : s
  if (abs.includes('e') || abs.includes('E')) {
    const parts = abs.split(/[eE]/)
    const result = countSigFigs(parts[0])
    result.rules.push('Scientific notation: count digits in coefficient')
    return result
  }
  const hasDecimal = abs.includes('.')
  const cleaned = abs.replace('.', '')
  if (Number(abs) === 0 && hasDecimal) {
    const afterDecimal = abs.split('.')[1] || ''
    const count = afterDecimal.replace(/^0+/, '').length || 1
    rules.push('Leading zeros are not significant')
    if (afterDecimal.endsWith('0')) rules.push('Trailing zeros after decimal point ARE significant')
    return { count, rules }
  }
  let first = -1, last = -1
  for (let i = 0; i < cleaned.length; i++) {
    if (cleaned[i] !== '0') {
      if (first === -1) first = i
      last = i
    }
  }
  if (first === -1) return { count: 1, rules: ['Zero has 1 significant figure'] }
  let count
  if (hasDecimal) {
    count = cleaned.length - first
    rules.push('All digits after the first non-zero digit are significant')
    if (abs.endsWith('0')) rules.push('Trailing zeros after decimal ARE significant')
  } else {
    count = last - first + 1
    rules.push('Non-zero digits are always significant')
    rules.push('Trapped zeros (between non-zero digits) are significant')
    if (abs.endsWith('0') && !hasDecimal) rules.push('Trailing zeros without decimal point are ambiguous (assumed NOT significant)')
  }
  if (first > 0) rules.push('Leading zeros are NOT significant')
  return { count, rules }
}

function roundToSigFigs(num, sigFigs) {
  if (num === 0) return '0'
  if (sigFigs <= 0) return '0'
  const d = Math.ceil(Math.log10(Math.abs(num)))
  const power = sigFigs - d
  const magnitude = Math.pow(10, power)
  const shifted = Math.round(num * magnitude)
  const result = shifted / magnitude
  if (power > 0) return result.toFixed(power)
  return String(result)
}

export default function SignificantFiguresCalculator() {
  const [mode, setMode] = useState('count')
  const [number, setNumber] = useState('0.00450')
  const [roundNum, setRoundNum] = useState('')
  const [roundSF, setRoundSF] = useState('3')
  const [calcA, setCalcA] = useState('')
  const [calcB, setCalcB] = useState('')
  const [calcOp, setCalcOp] = useState('add')

  const countResult = useMemo(() => countSigFigs(number), [number])

  const roundResult = useMemo(() => {
    const n = parseFloat(roundNum)
    const sf = parseInt(roundSF)
    if (isNaN(n) || isNaN(sf) || sf < 1) return null
    return roundToSigFigs(n, sf)
  }, [roundNum, roundSF])

  const calcResult = useMemo(() => {
    const a = parseFloat(calcA), b = parseFloat(calcB)
    if (isNaN(a) || isNaN(b)) return null
    const sfA = countSigFigs(calcA).count
    const sfB = countSigFigs(calcB).count
    let raw, result, rule
    switch (calcOp) {
      case 'add': raw = a + b; break
      case 'sub': raw = a - b; break
      case 'mul': raw = a * b; break
      case 'div': if (b === 0) return null; raw = a / b; break
      default: return null
    }
    if (calcOp === 'add' || calcOp === 'sub') {
      const decA = (calcA.includes('.') ? calcA.split('.')[1]?.length : 0) || 0
      const decB = (calcB.includes('.') ? calcB.split('.')[1]?.length : 0) || 0
      const minDec = Math.min(decA, decB)
      result = raw.toFixed(minDec)
      rule = `Addition/Subtraction: Round to fewest decimal places (${minDec})`
    } else {
      const minSF = Math.min(sfA, sfB)
      result = roundToSigFigs(raw, minSF)
      rule = `Multiplication/Division: Round to fewest sig figs (${minSF})`
    }
    return { raw, result, sfA, sfB, rule }
  }, [calcA, calcB, calcOp])

  const examples = [
    { n: '100', sf: 1, note: 'Trailing zeros w/o decimal — ambiguous' },
    { n: '100.', sf: 3, note: 'Decimal point makes trailing zeros significant' },
    { n: '100.0', sf: 4, note: 'Trailing zero after decimal is significant' },
    { n: '0.0025', sf: 2, note: 'Leading zeros are not significant' },
    { n: '1.030', sf: 4, note: 'Trailing zero after decimal is significant' },
    { n: '5.00', sf: 3, note: 'Trailing zeros after decimal are significant' },
    { n: '8000', sf: 1, note: 'Trailing zeros w/o decimal — ambiguous' },
    { n: '8.000e3', sf: 4, note: 'Scientific notation makes it unambiguous' },
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-wrap gap-2">
        {[{ k: 'count', l: 'Count Sig Figs' }, { k: 'round', l: 'Round to Sig Figs' }, { k: 'calc', l: 'Calculate with Sig Figs' }].map(m => (
          <button key={m.k} onClick={() => setMode(m.k)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${mode === m.k ? 'bg-purple-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}>
            {m.l}
          </button>
        ))}
      </div>

      {mode === 'count' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Count Significant Figures</h3>
          <input type="text" value={number} onChange={e => setNumber(e.target.value)} placeholder="Enter a number..."
            className="w-full border rounded-lg px-3 py-2 text-lg font-mono dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
          <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl text-center">
            <div className="text-sm text-gray-500 dark:text-gray-400">Significant Figures</div>
            <div className="text-4xl font-bold text-purple-700 dark:text-purple-300">{countResult.count}</div>
          </div>
          {countResult.rules.length > 0 && (
            <div className="space-y-1">
              {countResult.rules.map((r, i) => (
                <div key={i} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                  <span className="text-purple-500">•</span> {r}
                </div>
              ))}
            </div>
          )}

          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Examples</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {examples.map((ex, i) => (
                <div key={i} className="flex items-center gap-3 bg-gray-50 dark:bg-gray-700/50 px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => setNumber(ex.n)}>
                  <span className="font-mono font-bold text-gray-900 dark:text-gray-100 w-16">{ex.n}</span>
                  <span className="text-purple-600 dark:text-purple-400 font-bold w-6">{ex.sf}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{ex.note}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {mode === 'round' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Round to Significant Figures</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-500 dark:text-gray-400">Number</label>
              <input type="text" value={roundNum} onChange={e => setRoundNum(e.target.value)} placeholder="3.14159"
                className="w-full border rounded-lg px-3 py-2 text-sm font-mono dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
            </div>
            <div>
              <label className="text-xs text-gray-500 dark:text-gray-400">Sig figs</label>
              <input type="number" value={roundSF} onChange={e => setRoundSF(e.target.value)} min="1" max="20"
                className="w-full border rounded-lg px-3 py-2 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
            </div>
          </div>
          {roundResult !== null && (
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl text-center">
              <div className="text-sm text-gray-500 dark:text-gray-400">Rounded to {roundSF} significant figures</div>
              <div className="text-3xl font-bold font-mono text-purple-700 dark:text-purple-300">{roundResult}</div>
            </div>
          )}
        </div>
      )}

      {mode === 'calc' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Calculate with Significant Figures</h3>
          <div className="grid grid-cols-3 gap-3 items-end">
            <div>
              <label className="text-xs text-gray-500 dark:text-gray-400">Value A</label>
              <input type="text" value={calcA} onChange={e => setCalcA(e.target.value)} placeholder="12.5"
                className="w-full border rounded-lg px-3 py-2 text-sm font-mono dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
            </div>
            <div>
              <label className="text-xs text-gray-500 dark:text-gray-400">Operation</label>
              <select value={calcOp} onChange={e => setCalcOp(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200">
                <option value="add">+ Add</option>
                <option value="sub">− Subtract</option>
                <option value="mul">× Multiply</option>
                <option value="div">÷ Divide</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-500 dark:text-gray-400">Value B</label>
              <input type="text" value={calcB} onChange={e => setCalcB(e.target.value)} placeholder="3.2"
                className="w-full border rounded-lg px-3 py-2 text-sm font-mono dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
            </div>
          </div>
          {calcResult && (
            <div className="space-y-3">
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl text-center">
                <div className="text-sm text-gray-500 dark:text-gray-400">Raw: {calcResult.raw}</div>
                <div className="text-3xl font-bold font-mono text-purple-700 dark:text-purple-300">{calcResult.result}</div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg text-center text-sm">
                  <div className="text-gray-500 dark:text-gray-400">A has</div>
                  <div className="font-bold text-gray-900 dark:text-gray-100">{calcResult.sfA} sig figs</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg text-center text-sm">
                  <div className="text-gray-500 dark:text-gray-400">B has</div>
                  <div className="font-bold text-gray-900 dark:text-gray-100">{calcResult.sfB} sig figs</div>
                </div>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                {calcResult.rule}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
