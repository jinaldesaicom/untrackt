import { useState } from 'react'
import { Copy, Check, RefreshCw } from 'lucide-react'

export default function EquationSolver() {
  const [mode, setMode] = useState('quadratic')
  const [inputs, setInputs] = useState({ a: '', b: '', c: '', d: '' })
  const [sysInputs, setSysInputs] = useState({ a1: '', b1: '', c1: '', a2: '', b2: '', c2: '', a3: '', b3: '', c3: '', d1: '', d2: '', d3: '' })
  const [sysSize, setSysSize] = useState(2)
  const [result, setResult] = useState(null)
  const [steps, setSteps] = useState([])
  const [copied, setCopied] = useState(false)

  const set = (k, v) => setInputs(p => ({ ...p, [k]: v }))
  const setSys = (k, v) => setSysInputs(p => ({ ...p, [k]: v }))

  const formatNum = (n) => {
    if (typeof n === 'object' && n.re !== undefined) {
      const re = +n.re.toFixed(6)
      const im = +n.im.toFixed(6)
      if (im === 0) return String(re)
      if (re === 0) return `${im}i`
      return `${re} ${im > 0 ? '+' : '−'} ${Math.abs(im)}i`
    }
    if (Number.isInteger(n)) return String(n)
    return (+n.toFixed(6)).toString()
  }

  const solveLinear = () => {
    const a = parseFloat(inputs.a), b = parseFloat(inputs.b)
    const s = []
    s.push(`Equation: ${a}x + ${b} = 0`)
    if (a === 0) { s.push(b === 0 ? 'Infinite solutions (0 = 0)' : 'No solution (contradiction)'); return { s, r: b === 0 ? 'Infinite solutions' : 'No solution' } }
    const x = -b / a
    s.push(`x = −b/a = −(${b})/(${a}) = ${formatNum(x)}`)
    return { s, r: `x = ${formatNum(x)}` }
  }

  const solveQuadratic = () => {
    const a = parseFloat(inputs.a), b = parseFloat(inputs.b), c = parseFloat(inputs.c)
    const s = []
    s.push(`Equation: ${a}x² + ${b}x + ${c} = 0`)
    if (a === 0) { s.push('Not quadratic (a = 0). Use linear solver.'); return { s, r: 'Not quadratic' } }
    const disc = b * b - 4 * a * c
    s.push(`Discriminant: Δ = b² − 4ac = ${b}² − 4(${a})(${c}) = ${formatNum(disc)}`)
    if (disc > 0) {
      s.push('Δ > 0 → Two distinct real roots')
      const x1 = (-b + Math.sqrt(disc)) / (2 * a)
      const x2 = (-b - Math.sqrt(disc)) / (2 * a)
      s.push(`x₁ = (−b + √Δ) / 2a = ${formatNum(x1)}`)
      s.push(`x₂ = (−b − √Δ) / 2a = ${formatNum(x2)}`)
      return { s, r: `x₁ = ${formatNum(x1)}, x₂ = ${formatNum(x2)}` }
    } else if (disc === 0) {
      const x = -b / (2 * a)
      s.push('Δ = 0 → One repeated real root')
      s.push(`x = −b / 2a = ${formatNum(x)}`)
      return { s, r: `x = ${formatNum(x)} (repeated)` }
    } else {
      s.push('Δ < 0 → Two complex conjugate roots')
      const re = -b / (2 * a)
      const im = Math.sqrt(-disc) / (2 * a)
      s.push(`x₁ = ${formatNum(re)} + ${formatNum(im)}i`)
      s.push(`x₂ = ${formatNum(re)} − ${formatNum(im)}i`)
      return { s, r: `x₁ = ${formatNum({ re, im })}, x₂ = ${formatNum({ re, im: -im })}` }
    }
  }

  const solveCubic = () => {
    const a = parseFloat(inputs.a), b = parseFloat(inputs.b), c = parseFloat(inputs.c), d = parseFloat(inputs.d)
    const s = []
    s.push(`Equation: ${a}x³ + ${b}x² + ${c}x + ${d} = 0`)
    if (a === 0) { s.push('Not cubic (a = 0).'); return { s, r: 'Not cubic' } }
    // Cardano's method via depressed cubic
    const p = (3 * a * c - b * b) / (3 * a * a)
    const q = (2 * b * b * b - 9 * a * b * c + 27 * a * a * d) / (27 * a * a * a)
    s.push(`Depressed cubic: t³ + ${formatNum(p)}t + ${formatNum(q)} = 0`)
    const disc = q * q / 4 + p * p * p / 27
    s.push(`Discriminant: ${formatNum(disc)}`)
    const roots = []
    if (Math.abs(disc) < 1e-10) {
      if (Math.abs(p) < 1e-10 && Math.abs(q) < 1e-10) {
        roots.push(-b / (3 * a))
        s.push('Triple root')
      } else {
        const t1 = 3 * q / p
        const t2 = -3 * q / (2 * p)
        roots.push(t1 - b / (3 * a), t2 - b / (3 * a))
        s.push('One single + one double root')
      }
    } else if (disc > 0) {
      const u = Math.cbrt(-q / 2 + Math.sqrt(disc))
      const v = Math.cbrt(-q / 2 - Math.sqrt(disc))
      const t1 = u + v
      roots.push(t1 - b / (3 * a))
      const re = -(u + v) / 2 - b / (3 * a)
      const im = (u - v) * Math.sqrt(3) / 2
      s.push('One real root + two complex conjugate roots')
      roots.push({ re, im }, { re, im: -im })
    } else {
      const r = Math.sqrt(-p * p * p / 27)
      const theta = Math.acos(-q / (2 * r))
      const m = 2 * Math.cbrt(r)
      for (let k = 0; k < 3; k++) {
        roots.push(m * Math.cos((theta + 2 * Math.PI * k) / 3) - b / (3 * a))
      }
      s.push('Three distinct real roots (casus irreducibilis)')
    }
    const formatted = roots.map((r, i) => `x${i + 1} = ${formatNum(r)}`).join(', ')
    return { s, r: formatted }
  }

  const solveSystem = () => {
    const s = []
    const g = (k) => parseFloat(sysInputs[k]) || 0
    if (sysSize === 2) {
      const a1 = g('a1'), b1 = g('b1'), c1 = g('c1')
      const a2 = g('a2'), b2 = g('b2'), c2 = g('c2')
      s.push(`${a1}x + ${b1}y = ${c1}`)
      s.push(`${a2}x + ${b2}y = ${c2}`)
      const det = a1 * b2 - a2 * b1
      s.push(`Determinant: ${a1}×${b2} − ${a2}×${b1} = ${formatNum(det)}`)
      if (Math.abs(det) < 1e-12) { s.push('System has no unique solution (det = 0).'); return { s, r: 'No unique solution' } }
      const x = (c1 * b2 - c2 * b1) / det
      const y = (a1 * c2 - a2 * c1) / det
      s.push(`x = (${c1}×${b2} − ${c2}×${b1}) / ${formatNum(det)} = ${formatNum(x)}`)
      s.push(`y = (${a1}×${c2} − ${a2}×${c1}) / ${formatNum(det)} = ${formatNum(y)}`)
      return { s, r: `x = ${formatNum(x)}, y = ${formatNum(y)}` }
    } else {
      const m = [
        [g('a1'), g('b1'), g('c1'), g('d1')],
        [g('a2'), g('b2'), g('c2'), g('d2')],
        [g('a3'), g('b3'), g('c3'), g('d3')]
      ]
      s.push(`${m[0][0]}x + ${m[0][1]}y + ${m[0][2]}z = ${m[0][3]}`)
      s.push(`${m[1][0]}x + ${m[1][1]}y + ${m[1][2]}z = ${m[1][3]}`)
      s.push(`${m[2][0]}x + ${m[2][1]}y + ${m[2][2]}z = ${m[2][3]}`)
      s.push('Using Cramer\'s Rule:')
      const detA = m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) - m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0]) + m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0])
      s.push(`det(A) = ${formatNum(detA)}`)
      if (Math.abs(detA) < 1e-12) { s.push('det = 0, no unique solution.'); return { s, r: 'No unique solution' } }
      const detX = m[0][3] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) - m[0][1] * (m[1][3] * m[2][2] - m[1][2] * m[2][3]) + m[0][2] * (m[1][3] * m[2][1] - m[1][1] * m[2][3])
      const detY = m[0][0] * (m[1][3] * m[2][2] - m[1][2] * m[2][3]) - m[0][3] * (m[1][0] * m[2][2] - m[1][2] * m[2][0]) + m[0][2] * (m[1][0] * m[2][3] - m[1][3] * m[2][0])
      const detZ = m[0][0] * (m[1][1] * m[2][3] - m[1][3] * m[2][1]) - m[0][1] * (m[1][0] * m[2][3] - m[1][3] * m[2][0]) + m[0][3] * (m[1][0] * m[2][1] - m[1][1] * m[2][0])
      const x = detX / detA, y = detY / detA, z = detZ / detA
      s.push(`x = det(Ax)/det(A) = ${formatNum(detX)}/${formatNum(detA)} = ${formatNum(x)}`)
      s.push(`y = det(Ay)/det(A) = ${formatNum(detY)}/${formatNum(detA)} = ${formatNum(y)}`)
      s.push(`z = det(Az)/det(A) = ${formatNum(detZ)}/${formatNum(detA)} = ${formatNum(z)}`)
      return { s, r: `x = ${formatNum(x)}, y = ${formatNum(y)}, z = ${formatNum(z)}` }
    }
  }

  const calculate = () => {
    let res
    if (mode === 'linear') res = solveLinear()
    else if (mode === 'quadratic') res = solveQuadratic()
    else if (mode === 'cubic') res = solveCubic()
    else res = solveSystem()
    setSteps(res.s)
    setResult(res.r)
  }

  const handleCopy = () => {
    if (!result) return
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const reset = () => {
    setInputs({ a: '', b: '', c: '', d: '' })
    setSysInputs({ a1: '', b1: '', c1: '', a2: '', b2: '', c2: '', a3: '', b3: '', c3: '', d1: '', d2: '', d3: '' })
    setResult(null)
    setSteps([])
  }

  const inp = (label, key, obj, setter) => (
    <div>
      <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">{label}</label>
      <input type="number" value={obj[key]} onChange={e => setter(key, e.target.value)}
        className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" placeholder="0" />
    </div>
  )

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex flex-wrap gap-2">
        {['linear', 'quadratic', 'cubic', 'system'].map(m => (
          <button key={m} onClick={() => { setMode(m); reset() }}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${mode === m ? 'bg-purple-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>
            {m === 'system' ? 'System of Equations' : m.charAt(0).toUpperCase() + m.slice(1)}
          </button>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
        {mode === 'linear' && (
          <>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 font-mono">ax + b = 0</p>
            <div className="grid grid-cols-2 gap-4">
              {inp('a', 'a', inputs, set)}
              {inp('b', 'b', inputs, set)}
            </div>
          </>
        )}
        {mode === 'quadratic' && (
          <>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 font-mono">ax² + bx + c = 0</p>
            <div className="grid grid-cols-3 gap-4">
              {inp('a', 'a', inputs, set)}
              {inp('b', 'b', inputs, set)}
              {inp('c', 'c', inputs, set)}
            </div>
          </>
        )}
        {mode === 'cubic' && (
          <>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 font-mono">ax³ + bx² + cx + d = 0</p>
            <div className="grid grid-cols-4 gap-4">
              {inp('a', 'a', inputs, set)}
              {inp('b', 'b', inputs, set)}
              {inp('c', 'c', inputs, set)}
              {inp('d', 'd', inputs, set)}
            </div>
          </>
        )}
        {mode === 'system' && (
          <>
            <div className="flex gap-2 mb-3">
              <button onClick={() => setSysSize(2)} className={`px-3 py-1 rounded text-sm ${sysSize === 2 ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'}`}>2×2</button>
              <button onClick={() => setSysSize(3)} className={`px-3 py-1 rounded text-sm ${sysSize === 3 ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'}`}>3×3</button>
            </div>
            {sysSize === 2 ? (
              <>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 font-mono">a₁x + b₁y = c₁</p>
                <div className="grid grid-cols-3 gap-3 mb-2">
                  {inp('a₁', 'a1', sysInputs, setSys)}
                  {inp('b₁', 'b1', sysInputs, setSys)}
                  {inp('c₁', 'c1', sysInputs, setSys)}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 font-mono">a₂x + b₂y = c₂</p>
                <div className="grid grid-cols-3 gap-3">
                  {inp('a₂', 'a2', sysInputs, setSys)}
                  {inp('b₂', 'b2', sysInputs, setSys)}
                  {inp('c₂', 'c2', sysInputs, setSys)}
                </div>
              </>
            ) : (
              <>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 font-mono">a₁x + b₁y + c₁z = d₁</p>
                <div className="grid grid-cols-4 gap-3 mb-2">
                  {inp('a₁', 'a1', sysInputs, setSys)} {inp('b₁', 'b1', sysInputs, setSys)} {inp('c₁', 'c1', sysInputs, setSys)} {inp('d₁', 'd1', sysInputs, setSys)}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 font-mono">a₂x + b₂y + c₂z = d₂</p>
                <div className="grid grid-cols-4 gap-3 mb-2">
                  {inp('a₂', 'a2', sysInputs, setSys)} {inp('b₂', 'b2', sysInputs, setSys)} {inp('c₂', 'c2', sysInputs, setSys)} {inp('d₂', 'd2', sysInputs, setSys)}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 font-mono">a₃x + b₃y + c₃z = d₃</p>
                <div className="grid grid-cols-4 gap-3">
                  {inp('a₃', 'a3', sysInputs, setSys)} {inp('b₃', 'b3', sysInputs, setSys)} {inp('c₃', 'c3', sysInputs, setSys)} {inp('d₃', 'd3', sysInputs, setSys)}
                </div>
              </>
            )}
          </>
        )}
      </div>

      <div className="flex gap-3">
        <button onClick={calculate} className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium">Solve</button>
        <button onClick={reset} className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition flex items-center gap-1">
          <RefreshCw size={14} /> Reset
        </button>
      </div>

      {steps.length > 0 && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
          <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Step-by-Step</h3>
          {steps.map((s, i) => <p key={i} className="text-sm text-blue-700 dark:text-blue-400 font-mono">{s}</p>)}
        </div>
      )}

      {result && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-green-800 dark:text-green-300 mb-1">Solution</h3>
            <p className="font-mono text-green-700 dark:text-green-400">{result}</p>
          </div>
          <button onClick={handleCopy} className="flex items-center gap-1 text-sm text-green-600 dark:text-green-400 hover:text-green-800 transition">
            {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      )}
    </div>
  )
}
