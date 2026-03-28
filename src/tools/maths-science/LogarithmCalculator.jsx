import { useState } from 'react'
import { Copy, Check, RefreshCw } from 'lucide-react'

export default function LogarithmCalculator() {
  const [mode, setMode] = useState('log')
  const [value, setValue] = useState('')
  const [base, setBase] = useState('10')
  const [antiVal, setAntiVal] = useState('')
  const [antiBase, setAntiBase] = useState('10')
  const [fromBase, setFromBase] = useState('')
  const [toBase, setToBase] = useState('')
  const [cobValue, setCobValue] = useState('')
  const [result, setResult] = useState(null)
  const [copied, setCopied] = useState(false)

  const fmt = (n) => Number.isInteger(n) ? String(n) : (+n.toFixed(10)).toString()

  const calculate = () => {
    const steps = []
    switch (mode) {
      case 'log': {
        const x = parseFloat(value)
        const b = parseFloat(base)
        if (isNaN(x) || x <= 0) { setResult('Value must be positive'); return }
        if (isNaN(b) || b <= 0 || b === 1) { setResult('Base must be positive and ≠ 1'); return }
        const result = Math.log(x) / Math.log(b)
        steps.push(`log${b === 10 ? '' : `_${b}`}(${x})`)
        if (b === 10) {
          steps.push(`= log₁₀(${x})`)
          steps.push(`= ${fmt(result)}`)
        } else if (b === Math.E) {
          steps.push(`= ln(${x})`)
          steps.push(`= ${fmt(result)}`)
        } else {
          steps.push(`Using change of base: ln(${x}) / ln(${b})`)
          steps.push(`= ${fmt(Math.log(x))} / ${fmt(Math.log(b))}`)
          steps.push(`= ${fmt(result)}`)
        }
        steps.push('')
        steps.push(`Verification: ${b}^${fmt(result)} = ${fmt(Math.pow(b, result))} ≈ ${x}`)
        setResult(steps.join('\n'))
        break
      }
      case 'ln': {
        const x = parseFloat(value)
        if (isNaN(x) || x <= 0) { setResult('Value must be positive'); return }
        const result = Math.log(x)
        steps.push(`ln(${x}) = logₑ(${x})`)
        steps.push(`= ${fmt(result)}`)
        steps.push('')
        steps.push(`Also: log₁₀(${x}) = ${fmt(Math.log10(x))}`)
        steps.push(`Also: log₂(${x}) = ${fmt(Math.log2(x))}`)
        steps.push('')
        steps.push(`Verification: e^${fmt(result)} = ${fmt(Math.exp(result))} ≈ ${x}`)
        setResult(steps.join('\n'))
        break
      }
      case 'antilog': {
        const x = parseFloat(antiVal)
        const b = parseFloat(antiBase)
        if (isNaN(x)) { setResult('Enter a value'); return }
        if (isNaN(b) || b <= 0 || b === 1) { setResult('Base must be positive and ≠ 1'); return }
        const result = Math.pow(b, x)
        steps.push(`antilog_${b}(${x}) = ${b}^${x}`)
        steps.push(`= ${fmt(result)}`)
        steps.push('')
        steps.push(`This means: log_${b}(${fmt(result)}) = ${x}`)
        setResult(steps.join('\n'))
        break
      }
      case 'changebase': {
        const x = parseFloat(cobValue)
        const fb = parseFloat(fromBase)
        const tb = parseFloat(toBase)
        if (isNaN(x) || x <= 0) { setResult('Value must be positive'); return }
        if (isNaN(fb) || fb <= 0 || fb === 1) { setResult('From-base must be positive and ≠ 1'); return }
        if (isNaN(tb) || tb <= 0 || tb === 1) { setResult('To-base must be positive and ≠ 1'); return }
        const fromResult = Math.log(x) / Math.log(fb)
        const toResult = Math.log(x) / Math.log(tb)
        steps.push(`Converting log_${fb}(${x}) to log_${tb}(${x}):`)
        steps.push('')
        steps.push(`Change of Base Formula:`)
        steps.push(`log_b(x) = log_c(x) / log_c(b)`)
        steps.push('')
        steps.push(`log_${fb}(${x}) = ln(${x}) / ln(${fb})`)
        steps.push(`= ${fmt(Math.log(x))} / ${fmt(Math.log(fb))}`)
        steps.push(`= ${fmt(fromResult)}`)
        steps.push('')
        steps.push(`log_${tb}(${x}) = ln(${x}) / ln(${tb})`)
        steps.push(`= ${fmt(Math.log(x))} / ${fmt(Math.log(tb))}`)
        steps.push(`= ${fmt(toResult)}`)
        steps.push('')
        steps.push(`Alternatively: log_${tb}(${x}) = log_${fb}(${x}) / log_${fb}(${tb})`)
        steps.push(`= ${fmt(fromResult)} / ${fmt(Math.log(tb) / Math.log(fb))}`)
        steps.push(`= ${fmt(toResult)}`)
        setResult(steps.join('\n'))
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

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex flex-wrap gap-2">
        {[['log', 'Log (any base)'], ['ln', 'Natural Log'], ['antilog', 'Antilog'], ['changebase', 'Change of Base']].map(([k, l]) => (
          <button key={k} onClick={() => { setMode(k); setResult(null) }}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${mode === k ? 'bg-purple-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>
            {l}
          </button>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 space-y-4">
        {mode === 'log' && (
          <>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-mono">log_b(x)</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Value (x)</label>
                <input type="number" value={value} onChange={e => setValue(e.target.value)} placeholder="100"
                  className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Base (b)</label>
                <input type="number" value={base} onChange={e => setBase(e.target.value)} placeholder="10"
                  className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
              </div>
            </div>
          </>
        )}
        {mode === 'ln' && (
          <>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-mono">ln(x) = logₑ(x), e ≈ 2.71828...</p>
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Value (x)</label>
              <input type="number" value={value} onChange={e => setValue(e.target.value)} placeholder="2.718"
                className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
            </div>
          </>
        )}
        {mode === 'antilog' && (
          <>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-mono">antilog_b(x) = b^x</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Value (x)</label>
                <input type="number" value={antiVal} onChange={e => setAntiVal(e.target.value)} placeholder="2"
                  className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Base (b)</label>
                <input type="number" value={antiBase} onChange={e => setAntiBase(e.target.value)} placeholder="10"
                  className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
              </div>
            </div>
          </>
        )}
        {mode === 'changebase' && (
          <>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-mono">log_b(x) = log_c(x) / log_c(b)</p>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Value (x)</label>
                <input type="number" value={cobValue} onChange={e => setCobValue(e.target.value)} placeholder="100"
                  className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">From Base</label>
                <input type="number" value={fromBase} onChange={e => setFromBase(e.target.value)} placeholder="10"
                  className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">To Base</label>
                <input type="number" value={toBase} onChange={e => setToBase(e.target.value)} placeholder="2"
                  className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
              </div>
            </div>
          </>
        )}
      </div>

      <div className="flex gap-3">
        <button onClick={calculate} className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium">Calculate</button>
        <button onClick={() => { setValue(''); setBase('10'); setAntiVal(''); setAntiBase('10'); setFromBase(''); setToBase(''); setCobValue(''); setResult(null) }}
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
