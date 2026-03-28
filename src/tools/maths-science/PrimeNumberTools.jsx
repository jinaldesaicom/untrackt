import { useState } from 'react'
import { Copy, Check, RefreshCw } from 'lucide-react'

export default function PrimeNumberTools() {
  const [mode, setMode] = useState('check')
  const [num, setNum] = useState('')
  const [rangeStart, setRangeStart] = useState('')
  const [rangeEnd, setRangeEnd] = useState('')
  const [numA, setNumA] = useState('')
  const [numB, setNumB] = useState('')
  const [result, setResult] = useState(null)
  const [copied, setCopied] = useState(false)

  const isPrime = (n) => {
    if (n < 2) return false
    if (n < 4) return true
    if (n % 2 === 0 || n % 3 === 0) return false
    for (let i = 5; i * i <= n; i += 6) {
      if (n % i === 0 || n % (i + 2) === 0) return false
    }
    return true
  }

  const primeFactorization = (n) => {
    const factors = []
    const steps = []
    let num = Math.abs(n)
    if (num < 2) return { factors: [num], steps: [`${num} is not factorizable`] }
    let d = 2
    while (d * d <= num) {
      while (num % d === 0) {
        factors.push(d)
        steps.push(`${num} ÷ ${d} = ${num / d}`)
        num /= d
      }
      d++
    }
    if (num > 1) {
      factors.push(num)
      steps.push(`${num} is prime`)
    }
    return { factors, steps }
  }

  const sieve = (start, end) => {
    if (end > 1000000) end = 1000000
    const arr = new Array(end + 1).fill(true)
    arr[0] = arr[1] = false
    for (let i = 2; i * i <= end; i++) {
      if (arr[i]) {
        for (let j = i * i; j <= end; j += i) arr[j] = false
      }
    }
    const primes = []
    for (let i = Math.max(2, start); i <= end; i++) {
      if (arr[i]) primes.push(i)
    }
    return primes
  }

  const gcd = (a, b) => {
    a = Math.abs(a); b = Math.abs(b)
    while (b) { [a, b] = [b, a % b] }
    return a
  }
  const lcm = (a, b) => Math.abs(a * b) / gcd(a, b)

  const calculate = () => {
    switch (mode) {
      case 'check': {
        const n = parseInt(num)
        if (isNaN(n)) { setResult('Enter a number'); return }
        const prime = isPrime(n)
        let text = `${n} is ${prime ? 'PRIME ✓' : 'NOT prime ✗'}`
        if (!prime && n > 1) {
          const { factors, steps } = primeFactorization(n)
          text += `\n\nPrime factorization: ${factors.join(' × ')}`
          text += `\n\nSteps:\n${steps.join('\n')}`
        }
        setResult(text)
        break
      }
      case 'factorize': {
        const n = parseInt(num)
        if (isNaN(n) || n < 2) { setResult('Enter a number ≥ 2'); return }
        const { factors, steps } = primeFactorization(n)
        // Group factors
        const counts = {}
        factors.forEach(f => { counts[f] = (counts[f] || 0) + 1 })
        const notation = Object.entries(counts).map(([p, e]) => e > 1 ? `${p}^${e}` : p).join(' × ')
        setResult(`${n} = ${factors.join(' × ')}\n= ${notation}\n\nSteps:\n${steps.join('\n')}`)
        break
      }
      case 'range': {
        const s = parseInt(rangeStart), e = parseInt(rangeEnd)
        if (isNaN(s) || isNaN(e) || s > e) { setResult('Enter valid range (start ≤ end)'); return }
        if (e - s > 1000000) { setResult('Range too large (max 1,000,000)'); return }
        const primes = sieve(s, e)
        setResult(`Primes between ${s} and ${e}: (${primes.length} found)\n\n${primes.join(', ')}`)
        break
      }
      case 'gcd-lcm': {
        const a = parseInt(numA), b = parseInt(numB)
        if (isNaN(a) || isNaN(b)) { setResult('Enter two numbers'); return }
        const g = gcd(a, b)
        const l = lcm(a, b)
        // Show Euclidean algorithm steps
        const steps = []
        let x = Math.abs(a), y = Math.abs(b)
        while (y) {
          steps.push(`${x} = ${Math.floor(x / y)} × ${y} + ${x % y}`)
          ;[x, y] = [y, x % y]
        }
        setResult(`GCD(${a}, ${b}) = ${g}\nLCM(${a}, ${b}) = ${l}\n\nEuclidean Algorithm:\n${steps.join('\n')}\n\nNote: LCM = |a × b| / GCD = ${Math.abs(a * b)} / ${g} = ${l}`)
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
        {[['check', 'Prime Check'], ['factorize', 'Factorization'], ['range', 'Primes in Range'], ['gcd-lcm', 'GCD & LCM']].map(([k, l]) => (
          <button key={k} onClick={() => { setMode(k); setResult(null) }}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${mode === k ? 'bg-purple-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>
            {l}
          </button>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 space-y-4">
        {(mode === 'check' || mode === 'factorize') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Number</label>
            <input type="number" value={num} onChange={e => setNum(e.target.value)} placeholder="Enter a number"
              className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
          </div>
        )}
        {mode === 'range' && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Start</label>
              <input type="number" value={rangeStart} onChange={e => setRangeStart(e.target.value)} placeholder="2"
                className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">End</label>
              <input type="number" value={rangeEnd} onChange={e => setRangeEnd(e.target.value)} placeholder="100"
                className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
            </div>
          </div>
        )}
        {mode === 'gcd-lcm' && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Number A</label>
              <input type="number" value={numA} onChange={e => setNumA(e.target.value)} placeholder="24"
                className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Number B</label>
              <input type="number" value={numB} onChange={e => setNumB(e.target.value)} placeholder="36"
                className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <button onClick={calculate} className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium">Calculate</button>
        <button onClick={() => { setNum(''); setRangeStart(''); setRangeEnd(''); setNumA(''); setNumB(''); setResult(null) }}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition flex items-center gap-1">
          <RefreshCw size={14} /> Reset
        </button>
      </div>

      {result && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
          <div className="flex items-start justify-between">
            <pre className="font-mono text-sm text-green-700 dark:text-green-400 whitespace-pre-wrap break-all">{result}</pre>
            <button onClick={handleCopy} className="ml-3 flex items-center gap-1 text-sm text-green-600 dark:text-green-400 hover:text-green-800 transition shrink-0">
              {copied ? <Check size={14} /> : <Copy size={14} />}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
