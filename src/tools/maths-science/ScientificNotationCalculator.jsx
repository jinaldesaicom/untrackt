import { useState, useMemo } from 'react'

export default function ScientificNotationCalculator() {
  const [mode, setMode] = useState('convert')
  const [number, setNumber] = useState('')
  const [sciA, setSciA] = useState('')
  const [sciExpA, setSciExpA] = useState('')
  const [sciB, setSciB] = useState('')
  const [sciExpB, setSciExpB] = useState('')
  const [calcOp, setCalcOp] = useState('mul')

  const convertResult = useMemo(() => {
    const n = parseFloat(number)
    if (isNaN(n)) return null
    if (n === 0) return { scientific: '0 × 10⁰', engineering: '0 × 10⁰', coefficient: 0, exponent: 0, decimal: '0' }
    const exp = Math.floor(Math.log10(Math.abs(n)))
    const coeff = n / Math.pow(10, exp)
    const engExp = Math.floor(exp / 3) * 3
    const engCoeff = n / Math.pow(10, engExp)

    const prefixes = [
      { exp: 24, sym: 'Y', name: 'yotta' }, { exp: 21, sym: 'Z', name: 'zetta' },
      { exp: 18, sym: 'E', name: 'exa' }, { exp: 15, sym: 'P', name: 'peta' },
      { exp: 12, sym: 'T', name: 'tera' }, { exp: 9, sym: 'G', name: 'giga' },
      { exp: 6, sym: 'M', name: 'mega' }, { exp: 3, sym: 'k', name: 'kilo' },
      { exp: 0, sym: '', name: '' },
      { exp: -3, sym: 'm', name: 'milli' }, { exp: -6, sym: 'μ', name: 'micro' },
      { exp: -9, sym: 'n', name: 'nano' }, { exp: -12, sym: 'p', name: 'pico' },
      { exp: -15, sym: 'f', name: 'femto' }, { exp: -18, sym: 'a', name: 'atto' },
    ]
    const prefix = prefixes.find(p => p.exp === engExp) || null

    return {
      scientific: `${coeff.toFixed(6)} × 10^${exp}`,
      engineering: `${engCoeff.toFixed(4)} × 10^${engExp}`,
      coefficient: coeff,
      exponent: exp,
      engCoeff,
      engExp,
      prefix,
      decimal: n.toLocaleString(undefined, { maximumFractionDigits: 20 }),
      eNotation: n.toExponential(6),
    }
  }, [number])

  const calcResult = useMemo(() => {
    const a = parseFloat(sciA), ea = parseInt(sciExpA)
    const b = parseFloat(sciB), eb = parseInt(sciExpB)
    if ([a, ea, b, eb].some(isNaN)) return null
    const valA = a * Math.pow(10, ea)
    const valB = b * Math.pow(10, eb)
    let raw, resultCoeff, resultExp, opSymbol
    switch (calcOp) {
      case 'add': raw = valA + valB; opSymbol = '+'; break
      case 'sub': raw = valA - valB; opSymbol = '−'; break
      case 'mul':
        resultCoeff = a * b
        resultExp = ea + eb
        raw = valA * valB
        opSymbol = '×'
        break
      case 'div':
        if (b === 0) return null
        resultCoeff = a / b
        resultExp = ea - eb
        raw = valA / valB
        opSymbol = '÷'
        break
      default: return null
    }
    if (raw === 0) return { raw: 0, scientific: '0 × 10⁰', expression: `(${a}×10^${ea}) ${opSymbol} (${b}×10^${eb})` }
    const finalExp = Math.floor(Math.log10(Math.abs(raw)))
    const finalCoeff = raw / Math.pow(10, finalExp)
    const steps = []
    if (calcOp === 'mul') {
      steps.push(`Coefficients: ${a} × ${b} = ${(a * b).toFixed(6)}`)
      steps.push(`Exponents: 10^${ea} × 10^${eb} = 10^${ea + eb}`)
      steps.push(`Result: ${(a * b).toFixed(6)} × 10^${ea + eb}`)
      steps.push(`Normalized: ${finalCoeff.toFixed(6)} × 10^${finalExp}`)
    } else if (calcOp === 'div') {
      steps.push(`Coefficients: ${a} ÷ ${b} = ${(a / b).toFixed(6)}`)
      steps.push(`Exponents: 10^${ea} ÷ 10^${eb} = 10^${ea - eb}`)
      steps.push(`Result: ${(a / b).toFixed(6)} × 10^${ea - eb}`)
      steps.push(`Normalized: ${finalCoeff.toFixed(6)} × 10^${finalExp}`)
    } else {
      steps.push(`Convert to same exponent then ${calcOp === 'add' ? 'add' : 'subtract'}`)
      steps.push(`${valA.toExponential(4)} ${opSymbol} ${valB.toExponential(4)} = ${raw.toExponential(4)}`)
    }
    return {
      raw, scientific: `${finalCoeff.toFixed(6)} × 10^${finalExp}`,
      expression: `(${a}×10^${ea}) ${opSymbol} (${b}×10^${eb})`,
      steps,
    }
  }, [sciA, sciExpA, sciB, sciExpB, calcOp])

  const superscript = (exp) => {
    const digits = { '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹', '-': '⁻' }
    return String(exp).split('').map(c => digits[c] || c).join('')
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-wrap gap-2">
        {[{ k: 'convert', l: 'Convert' }, { k: 'calc', l: 'Calculate' }].map(m => (
          <button key={m.k} onClick={() => setMode(m.k)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${mode === m.k ? 'bg-purple-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}>
            {m.l}
          </button>
        ))}
      </div>

      {mode === 'convert' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Scientific Notation Converter</h3>
          <input type="text" value={number} onChange={e => setNumber(e.target.value)} placeholder="Enter any number (e.g. 602200000000000000000000)"
            className="w-full border rounded-lg px-3 py-2 text-lg font-mono dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
          <div className="flex gap-2 flex-wrap">
            {['299792458', '0.000000001', '6.022e23', '1.602e-19', '3.14159265'].map(ex => (
              <button key={ex} onClick={() => setNumber(ex)} className="px-2 py-1 text-xs rounded bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">{ex}</button>
            ))}
          </div>

          {convertResult && (
            <div className="space-y-3">
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl text-center">
                <div className="text-sm text-gray-500 dark:text-gray-400">Scientific Notation</div>
                <div className="text-2xl font-bold font-mono text-purple-700 dark:text-purple-300">
                  {convertResult.coefficient.toFixed(6)} × 10{superscript(convertResult.exponent)}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { l: 'E-notation', v: convertResult.eNotation },
                  { l: 'Engineering', v: convertResult.engineering },
                  { l: 'Coefficient', v: convertResult.coefficient.toFixed(6) },
                  { l: 'Exponent', v: convertResult.exponent },
                ].map(r => (
                  <div key={r.l} className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                    <div className="text-xs text-gray-500 dark:text-gray-400">{r.l}</div>
                    <div className="font-mono font-bold text-gray-900 dark:text-gray-100">{r.v}</div>
                  </div>
                ))}
              </div>
              {convertResult.prefix && convertResult.prefix.sym && (
                <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg text-sm">
                  <span className="text-gray-600 dark:text-gray-400">SI Prefix: </span>
                  <span className="font-bold text-green-700 dark:text-green-400">{convertResult.prefix.name} ({convertResult.prefix.sym})</span>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {mode === 'calc' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Calculate in Scientific Notation</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Number A</div>
              <div className="flex gap-1 items-center">
                <input type="number" value={sciA} onChange={e => setSciA(e.target.value)} placeholder="6.022" step="any"
                  className="w-24 border rounded-lg px-2 py-2 text-sm font-mono dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
                <span className="text-sm text-gray-500">× 10^</span>
                <input type="number" value={sciExpA} onChange={e => setSciExpA(e.target.value)} placeholder="23"
                  className="w-16 border rounded-lg px-2 py-2 text-sm font-mono dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Number B</div>
              <div className="flex gap-1 items-center">
                <input type="number" value={sciB} onChange={e => setSciB(e.target.value)} placeholder="1.602" step="any"
                  className="w-24 border rounded-lg px-2 py-2 text-sm font-mono dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
                <span className="text-sm text-gray-500">× 10^</span>
                <input type="number" value={sciExpB} onChange={e => setSciExpB(e.target.value)} placeholder="-19"
                  className="w-16 border rounded-lg px-2 py-2 text-sm font-mono dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            {[{ k: 'add', l: '+' }, { k: 'sub', l: '−' }, { k: 'mul', l: '×' }, { k: 'div', l: '÷' }].map(o => (
              <button key={o.k} onClick={() => setCalcOp(o.k)}
                className={`w-12 h-10 rounded-lg text-lg font-bold ${calcOp === o.k ? 'bg-purple-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}>
                {o.l}
              </button>
            ))}
          </div>

          {calcResult && (
            <div className="space-y-3">
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl text-center">
                <div className="text-xs text-gray-500 dark:text-gray-400 font-mono">{calcResult.expression}</div>
                <div className="text-2xl font-bold font-mono text-purple-700 dark:text-purple-300">{calcResult.scientific}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">= {calcResult.raw.toExponential(6)}</div>
              </div>
              {calcResult.steps && (
                <div className="text-xs bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg space-y-1">
                  {calcResult.steps.map((s, i) => <div key={i} className="font-mono text-gray-500 dark:text-gray-400">{s}</div>)}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">SI Prefixes</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
          {[
            { sym: 'T', name: 'tera', exp: 12 }, { sym: 'G', name: 'giga', exp: 9 },
            { sym: 'M', name: 'mega', exp: 6 }, { sym: 'k', name: 'kilo', exp: 3 },
            { sym: '', name: '(base)', exp: 0 },
            { sym: 'm', name: 'milli', exp: -3 }, { sym: 'μ', name: 'micro', exp: -6 },
            { sym: 'n', name: 'nano', exp: -9 }, { sym: 'p', name: 'pico', exp: -12 },
            { sym: 'f', name: 'femto', exp: -15 }, { sym: 'a', name: 'atto', exp: -18 },
          ].map(p => (
            <div key={p.name} className="flex justify-between bg-gray-50 dark:bg-gray-700/50 px-3 py-2 rounded-lg">
              <span className="text-gray-600 dark:text-gray-400">{p.name} ({p.sym || '—'})</span>
              <span className="font-mono font-bold text-gray-900 dark:text-gray-100">10{superscript(p.exp)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
