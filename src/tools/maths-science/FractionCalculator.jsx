import { useState } from 'react'
import { Copy, Check, RefreshCw } from 'lucide-react'

export default function FractionCalculator() {
  const [mode, setMode] = useState('arithmetic')
  const [a, setA] = useState({ num: '', den: '', whole: '' })
  const [b, setB] = useState({ num: '', den: '', whole: '' })
  const [op, setOp] = useState('+')
  const [convertInput, setConvertInput] = useState('')
  const [convertFrom, setConvertFrom] = useState('fraction')
  const [result, setResult] = useState(null)
  const [copied, setCopied] = useState(false)

  const gcd = (a, b) => {
    a = Math.abs(a); b = Math.abs(b)
    while (b) { [a, b] = [b, a % b] }
    return a
  }

  const simplify = (num, den) => {
    if (den === 0) return { num: 0, den: 1 }
    if (den < 0) { num = -num; den = -den }
    const g = gcd(Math.abs(num), den)
    return { num: num / g, den: den / g }
  }

  const toImproper = (whole, num, den) => {
    const w = parseInt(whole) || 0
    const n = parseInt(num) || 0
    const d = parseInt(den) || 1
    if (d === 0) return { num: 0, den: 1 }
    const sign = w < 0 ? -1 : 1
    return { num: sign * (Math.abs(w) * d + n), den: d }
  }

  const toMixed = (num, den) => {
    if (den === 0) return '0'
    const s = simplify(num, den)
    const sign = s.num < 0 ? '-' : ''
    const absNum = Math.abs(s.num)
    const whole = Math.floor(absNum / s.den)
    const rem = absNum % s.den
    if (rem === 0) return `${sign}${whole}`
    if (whole === 0) return `${sign}${rem}/${s.den}`
    return `${sign}${whole} ${rem}/${s.den}`
  }

  const formatFrac = (num, den) => {
    const s = simplify(num, den)
    return s.den === 1 ? String(s.num) : `${s.num}/${s.den}`
  }

  const calculate = () => {
    if (mode === 'arithmetic') {
      const fa = toImproper(a.whole, a.num, a.den)
      const fb = toImproper(b.whole, b.num, b.den)
      if (fa.den === 0 || fb.den === 0) { setResult('Denominator cannot be 0.'); return }

      let resNum, resDen
      const steps = []
      steps.push(`A = ${formatFrac(fa.num, fa.den)}, B = ${formatFrac(fb.num, fb.den)}`)

      switch (op) {
        case '+':
          resDen = fa.den * fb.den
          resNum = fa.num * fb.den + fb.num * fa.den
          steps.push(`${fa.num}×${fb.den} + ${fb.num}×${fa.den} over ${fa.den}×${fb.den}`)
          steps.push(`= ${resNum}/${resDen}`)
          break
        case '-':
          resDen = fa.den * fb.den
          resNum = fa.num * fb.den - fb.num * fa.den
          steps.push(`${fa.num}×${fb.den} − ${fb.num}×${fa.den} over ${fa.den}×${fb.den}`)
          steps.push(`= ${resNum}/${resDen}`)
          break
        case '×':
          resNum = fa.num * fb.num
          resDen = fa.den * fb.den
          steps.push(`${fa.num}×${fb.num} over ${fa.den}×${fb.den}`)
          steps.push(`= ${resNum}/${resDen}`)
          break
        case '÷':
          if (fb.num === 0) { setResult('Cannot divide by zero.'); return }
          resNum = fa.num * fb.den
          resDen = fa.den * fb.num
          steps.push(`Flip B and multiply: ${fa.num}×${fb.den} over ${fa.den}×${fb.num}`)
          steps.push(`= ${resNum}/${resDen}`)
          break
      }

      const s = simplify(resNum, resDen)
      steps.push(`Simplified: ${formatFrac(s.num, s.den)}`)
      const mixed = toMixed(s.num, s.den)
      if (mixed !== formatFrac(s.num, s.den)) steps.push(`Mixed: ${mixed}`)
      const decimal = s.num / s.den
      steps.push(`Decimal: ${(+decimal.toFixed(8)).toString()}`)
      steps.push(`Percentage: ${(+(decimal * 100).toFixed(6)).toString()}%`)

      setResult(steps.join('\n'))
    } else {
      // Convert mode
      const input = convertInput.trim()
      if (!input) { setResult('Enter a value to convert.'); return }

      let text = ''
      if (convertFrom === 'fraction') {
        const match = input.match(/^(-?\d+)\s*\/\s*(\d+)$/)
        const mixedMatch = input.match(/^(-?\d+)\s+(\d+)\s*\/\s*(\d+)$/)
        let num, den
        if (mixedMatch) {
          const w = parseInt(mixedMatch[1])
          const n = parseInt(mixedMatch[2])
          const d = parseInt(mixedMatch[3])
          const sign = w < 0 ? -1 : 1
          num = sign * (Math.abs(w) * d + n)
          den = d
        } else if (match) {
          num = parseInt(match[1])
          den = parseInt(match[2])
        } else { setResult('Enter fraction like "3/4" or "1 3/4"'); return }
        if (den === 0) { setResult('Denominator cannot be 0'); return }
        const s = simplify(num, den)
        const decimal = num / den
        text = `Fraction: ${formatFrac(s.num, s.den)}\nMixed: ${toMixed(s.num, s.den)}\nDecimal: ${(+decimal.toFixed(8)).toString()}\nPercentage: ${(+(decimal * 100).toFixed(6)).toString()}%`
      } else if (convertFrom === 'decimal') {
        const decimal = parseFloat(input)
        if (isNaN(decimal)) { setResult('Enter a valid decimal'); return }
        // Convert decimal to fraction
        const str = input.includes('.') ? input : input + '.0'
        const parts = str.split('.')
        const dec = parts[1] || ''
        const den = Math.pow(10, dec.length)
        const num = Math.round(decimal * den)
        const s = simplify(num, den)
        text = `Decimal: ${decimal}\nFraction: ${formatFrac(s.num, s.den)}\nMixed: ${toMixed(s.num, s.den)}\nPercentage: ${(+(decimal * 100).toFixed(6)).toString()}%`
      } else {
        const pct = parseFloat(input)
        if (isNaN(pct)) { setResult('Enter a valid percentage'); return }
        const decimal = pct / 100
        const den = 10000
        const num = Math.round(decimal * den)
        const s = simplify(num, den)
        text = `Percentage: ${pct}%\nDecimal: ${(+decimal.toFixed(8)).toString()}\nFraction: ${formatFrac(s.num, s.den)}\nMixed: ${toMixed(s.num, s.den)}`
      }
      setResult(text)
    }
  }

  const handleCopy = () => {
    if (!result) return
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const fracInput = (label, val, setVal) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
      <div className="flex items-center gap-2">
        <input type="number" value={val.whole} onChange={e => setVal({ ...val, whole: e.target.value })}
          placeholder="Whole" className="w-20 border rounded-lg px-2 py-2 text-center dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 text-sm" />
        <input type="number" value={val.num} onChange={e => setVal({ ...val, num: e.target.value })}
          placeholder="Num" className="w-20 border rounded-lg px-2 py-2 text-center dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 text-sm" />
        <span className="text-gray-500 dark:text-gray-400 text-lg">/</span>
        <input type="number" value={val.den} onChange={e => setVal({ ...val, den: e.target.value })}
          placeholder="Den" className="w-20 border rounded-lg px-2 py-2 text-center dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 text-sm" />
      </div>
    </div>
  )

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex flex-wrap gap-2">
        <button onClick={() => { setMode('arithmetic'); setResult(null) }}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${mode === 'arithmetic' ? 'bg-purple-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>
          Arithmetic
        </button>
        <button onClick={() => { setMode('convert'); setResult(null) }}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${mode === 'convert' ? 'bg-purple-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>
          Convert
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 space-y-4">
        {mode === 'arithmetic' ? (
          <>
            <p className="text-xs text-gray-500 dark:text-gray-400">Leave "Whole" blank for simple fractions. Enter numerator and denominator.</p>
            {fracInput('Fraction A', a, setA)}
            <div className="flex gap-2">
              {['+', '-', '×', '÷'].map(o => (
                <button key={o} onClick={() => setOp(o)}
                  className={`w-10 h-10 rounded-lg text-lg font-medium transition ${op === o ? 'bg-purple-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}>
                  {o}
                </button>
              ))}
            </div>
            {fracInput('Fraction B', b, setB)}
          </>
        ) : (
          <>
            <div className="flex gap-2 mb-3">
              {[['fraction', 'Fraction'], ['decimal', 'Decimal'], ['percentage', 'Percentage']].map(([k, l]) => (
                <button key={k} onClick={() => setConvertFrom(k)}
                  className={`px-3 py-1 rounded text-sm ${convertFrom === k ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'}`}>
                  {l}
                </button>
              ))}
            </div>
            <input value={convertInput} onChange={e => setConvertInput(e.target.value)}
              placeholder={convertFrom === 'fraction' ? '3/4 or 1 3/4' : convertFrom === 'decimal' ? '0.75' : '75'}
              className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
          </>
        )}
      </div>

      <div className="flex gap-3">
        <button onClick={calculate} className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium">Calculate</button>
        <button onClick={() => { setA({ num: '', den: '', whole: '' }); setB({ num: '', den: '', whole: '' }); setConvertInput(''); setResult(null) }}
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
    </div>
  )
}
