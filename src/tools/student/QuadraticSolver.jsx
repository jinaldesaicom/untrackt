import { useMemo, useState } from 'react'

function formatComplex(real, imag) {
  if (imag === 0) return `${real.toFixed(4)}`
  const sign = imag >= 0 ? '+' : '-'
  return `${real.toFixed(4)} ${sign} ${Math.abs(imag).toFixed(4)}i`
}

export default function QuadraticSolver() {
  const [a, setA] = useState('1')
  const [b, setB] = useState('0')
  const [c, setC] = useState('0')

  const result = useMemo(() => {
    const A = Number(a)
    const B = Number(b)
    const C = Number(c)
    if (!Number.isFinite(A) || A === 0 || !Number.isFinite(B) || !Number.isFinite(C)) return null

    const d = B * B - 4 * A * C
    const twoA = 2 * A
    let root1
    let root2
    if (d >= 0) {
      root1 = { re: (-B + Math.sqrt(d)) / twoA, im: 0 }
      root2 = { re: (-B - Math.sqrt(d)) / twoA, im: 0 }
    } else {
      root1 = { re: -B / twoA, im: Math.sqrt(-d) / twoA }
      root2 = { re: -B / twoA, im: -Math.sqrt(-d) / twoA }
    }

    const h = -B / (2 * A)
    const k = A * h * h + B * h + C

    return {
      A,
      B,
      C,
      d,
      root1,
      root2,
      h,
      k,
      axis: h,
      interpretation: d > 0 ? '2 real roots' : d === 0 ? '1 real root' : '2 complex roots',
    }
  }, [a, b, c])

  const graphPoints = useMemo(() => {
    if (!result) return []
    const pts = []
    for (let x = -10; x <= 10; x += 0.25) {
      const y = result.A * x * x + result.B * x + result.C
      pts.push({ x, y })
    }
    return pts
  }, [result])

  const path = useMemo(() => {
    if (graphPoints.length === 0) return ''
    const mapX = (x) => ((x + 10) / 20) * 300
    const mapY = (y) => 150 - y * 8
    return graphPoints.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${mapX(p.x)} ${mapY(p.y)}`).join(' ')
  }, [graphPoints])

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <input value={a} onChange={(e) => setA(e.target.value)} className="input-field" placeholder="a" />
        <input value={b} onChange={(e) => setB(e.target.value)} className="input-field" placeholder="b" />
        <input value={c} onChange={(e) => setC(e.target.value)} className="input-field" placeholder="c" />
      </div>

      {result ? (
        <>
          <div className="rounded-xl border border-gray-200 bg-white p-4 text-sm text-gray-700 space-y-1">
            <p>Discriminant: {result.d.toFixed(4)} ({result.interpretation})</p>
            <p>Root 1: {formatComplex(result.root1.re, result.root1.im)}</p>
            <p>Root 2: {formatComplex(result.root2.re, result.root2.im)}</p>
            <p>Factored form: {result.d >= 0 ? `${result.A.toFixed(2)}(x - ${result.root1.re.toFixed(3)})(x - ${result.root2.re.toFixed(3)})` : 'Complex roots - no real factorization'}</p>
            <p>Vertex: ({result.h.toFixed(4)}, {result.k.toFixed(4)})</p>
            <p>Axis of symmetry: x = {result.axis.toFixed(4)}</p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <h3 className="font-semibold mb-2">Parabola</h3>
            <svg viewBox="0 0 300 200" className="w-full h-52 bg-gray-50 rounded">
              <line x1="0" y1="150" x2="300" y2="150" stroke="#cbd5e1" />
              <line x1="150" y1="0" x2="150" y2="200" stroke="#cbd5e1" />
              <path d={path} stroke="#4f46e5" fill="none" strokeWidth="2" />
              <circle cx={((result.h + 10) / 20) * 300} cy={150 - result.k * 8} r="4" fill="#ef4444" />
            </svg>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-4 text-sm text-gray-700">
            <p className="font-semibold mb-1">Step-by-step</p>
            <p>x = (-b ± sqrt(b² - 4ac)) / 2a</p>
            <p>x = (-({result.B}) ± sqrt(({result.B})² - 4({result.A})({result.C}))) / (2*{result.A})</p>
            <p>x = (-({result.B}) ± sqrt({result.d.toFixed(4)})) / {(2 * result.A).toFixed(4)}</p>
          </div>

          <button
            className="btn-secondary"
            onClick={() => navigator.clipboard.writeText(`Roots: ${formatComplex(result.root1.re, result.root1.im)}, ${formatComplex(result.root2.re, result.root2.im)}`)}
          >
            Copy results
          </button>
        </>
      ) : <p className="text-sm text-red-600">Coefficient a must be non-zero.</p>}
    </div>
  )
}
