import { useState } from 'react'
import { Copy, Check, RefreshCw } from 'lucide-react'

export default function NumberTheoryCalculator() {
  const [mode, setMode] = useState('factorial')
  const [inputs, setInputs] = useState({})
  const [result, setResult] = useState(null)
  const [copied, setCopied] = useState(false)

  const set = (k, v) => setInputs(p => ({ ...p, [k]: v }))
  const g = (k) => parseInt(inputs[k]) || 0

  // BigInt factorial for large numbers
  const factorialBig = (n) => {
    if (n < 0) return null
    let r = 1n
    for (let i = 2n; i <= BigInt(n); i++) r *= i
    return r
  }

  const fibonacci = (n) => {
    const seq = [0, 1]
    for (let i = 2; i <= n; i++) seq.push(seq[i - 1] + seq[i - 2])
    return seq.slice(0, n + 1)
  }

  const modPow = (base, exp, mod) => {
    if (mod === 1) return 0
    let result = 1
    base = ((base % mod) + mod) % mod
    while (exp > 0) {
      if (exp % 2 === 1) result = (result * base) % mod
      exp = Math.floor(exp / 2)
      base = (base * base) % mod
    }
    return result
  }

  const eulerTotient = (n) => {
    let result = n
    let p = 2
    let num = n
    while (p * p <= num) {
      if (num % p === 0) {
        while (num % p === 0) num /= p
        result -= result / p
      }
      p++
    }
    if (num > 1) result -= result / num
    return Math.round(result)
  }

  const gcd = (a, b) => {
    a = Math.abs(a); b = Math.abs(b)
    while (b) { [a, b] = [b, a % b] }
    return a
  }

  const calculate = () => {
    switch (mode) {
      case 'factorial': {
        const n = g('n')
        if (n < 0) { setResult('n must be ≥ 0'); return }
        if (n > 1000) { setResult('n must be ≤ 1000 for display'); return }
        const f = factorialBig(n)
        const str = f.toString()
        setResult(`${n}! = ${str}\n\nDigits: ${str.length}${n <= 20 ? `\n\nExpanded: ${Array.from({ length: n }, (_, i) => n - i).join(' × ')}` : ''}`)
        break
      }
      case 'fibonacci': {
        const n = g('n')
        if (n < 0 || n > 500) { setResult('Enter n between 0 and 500'); return }
        const seq = fibonacci(n)
        setResult(`Fibonacci sequence (F₀ to F${n}):\n\n${seq.join(', ')}\n\nF${n} = ${seq[n]}`)
        break
      }
      case 'modular': {
        const a = g('a'), b = g('b'), m = g('m')
        if (m === 0) { setResult('Modulus must be non-zero'); return }
        const addMod = ((a % m) + (b % m)) % m
        const subMod = (((a % m) - (b % m)) % m + m) % m
        const mulMod = ((a % m) * (b % m)) % m
        let text = `a = ${a}, b = ${b}, m = ${m}\n\n`
        text += `(a + b) mod m = ${addMod}\n`
        text += `(a − b) mod m = ${subMod}\n`
        text += `(a × b) mod m = ${mulMod}\n`
        text += `a mod m = ${((a % m) + m) % m}\n`
        text += `b mod m = ${((b % m) + m) % m}\n`
        if (b > 0 && m > 0) {
          text += `\na^b mod m = ${a}^${b} mod ${m} = ${modPow(a, b, m)} (modular exponentiation)`
        }
        setResult(text)
        break
      }
      case 'totient': {
        const n = g('n')
        if (n < 1) { setResult('n must be ≥ 1'); return }
        const phi = eulerTotient(n)
        // Show coprimes
        const coprimes = []
        for (let i = 1; i <= n && coprimes.length < 100; i++) {
          if (gcd(i, n) === 1) coprimes.push(i)
        }
        let text = `φ(${n}) = ${phi}\n\n`
        text += `Numbers coprime to ${n} (1 ≤ k ≤ ${n}):\n${coprimes.join(', ')}`
        if (coprimes.length < phi) text += ` ... (showing first 100)`
        // Show factorization-based explanation
        const factors = []
        let num = n, d = 2
        while (d * d <= num) {
          if (num % d === 0) {
            let count = 0
            while (num % d === 0) { num /= d; count++ }
            factors.push({ p: d, e: count })
          }
          d++
        }
        if (num > 1) factors.push({ p: num, e: 1 })
        if (factors.length > 0) {
          text += `\n\nFormula: φ(n) = n × ∏(1 − 1/p)`
          text += `\nφ(${n}) = ${n}${factors.map(f => ` × (1 − 1/${f.p})`).join('')} = ${phi}`
        }
        setResult(text)
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
        {[['factorial', 'Factorial'], ['fibonacci', 'Fibonacci'], ['modular', 'Modular Arith.'], ['totient', "Euler's Totient"]].map(([k, l]) => (
          <button key={k} onClick={() => { setMode(k); setInputs({}); setResult(null) }}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${mode === k ? 'bg-purple-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>
            {l}
          </button>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 space-y-4">
        {mode === 'factorial' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">n (0–1000)</label>
            <input type="number" value={inputs.n || ''} onChange={e => set('n', e.target.value)} placeholder="10"
              className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
          </div>
        )}
        {mode === 'fibonacci' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">n (0–500)</label>
            <input type="number" value={inputs.n || ''} onChange={e => set('n', e.target.value)} placeholder="10"
              className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
          </div>
        )}
        {mode === 'modular' && (
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">a</label>
              <input type="number" value={inputs.a || ''} onChange={e => set('a', e.target.value)} placeholder="17"
                className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">b</label>
              <input type="number" value={inputs.b || ''} onChange={e => set('b', e.target.value)} placeholder="5"
                className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">m (mod)</label>
              <input type="number" value={inputs.m || ''} onChange={e => set('m', e.target.value)} placeholder="7"
                className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
            </div>
          </div>
        )}
        {mode === 'totient' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">n (≥ 1)</label>
            <input type="number" value={inputs.n || ''} onChange={e => set('n', e.target.value)} placeholder="12"
              className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <button onClick={calculate} className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium">Calculate</button>
        <button onClick={() => { setInputs({}); setResult(null) }}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition flex items-center gap-1">
          <RefreshCw size={14} /> Reset
        </button>
      </div>

      {result && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
          <div className="flex items-start justify-between">
            <pre className="font-mono text-sm text-green-700 dark:text-green-400 whitespace-pre-wrap break-all flex-1">{result}</pre>
            <button onClick={handleCopy} className="ml-3 flex items-center gap-1 text-sm text-green-600 dark:text-green-400 hover:text-green-800 transition shrink-0">
              {copied ? <Check size={14} /> : <Copy size={14} />}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
