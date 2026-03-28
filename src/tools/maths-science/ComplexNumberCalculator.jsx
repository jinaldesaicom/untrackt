import { useState } from 'react'
import { Copy, Check, RefreshCw } from 'lucide-react'

export default function ComplexNumberCalculator() {
  const [mode, setMode] = useState('arithmetic')
  const [a, setA] = useState({ re: '', im: '' })
  const [b, setB] = useState({ re: '', im: '' })
  const [op, setOp] = useState('+')
  const [polarR, setPolarR] = useState('')
  const [polarTheta, setPolarTheta] = useState('')
  const [rectRe, setRectRe] = useState('')
  const [rectIm, setRectIm] = useState('')
  const [demoivreR, setDemoivreR] = useState('')
  const [demoivreTheta, setDemoivreTheta] = useState('')
  const [demoivreN, setDemoivreN] = useState('')
  const [result, setResult] = useState(null)
  const [copied, setCopied] = useState(false)

  const fmt = (n) => {
    if (Math.abs(n) < 1e-10) return '0'
    return (+n.toFixed(8)).toString()
  }

  const fmtComplex = (re, im) => {
    const r = +re.toFixed(8)
    const i = +im.toFixed(8)
    if (i === 0) return fmt(r)
    if (r === 0) return i === 1 ? 'i' : i === -1 ? '−i' : `${fmt(i)}i`
    return `${fmt(r)} ${i > 0 ? '+' : '−'} ${Math.abs(i) === 1 ? '' : fmt(Math.abs(i))}i`
  }

  const calculate = () => {
    const lines = []
    switch (mode) {
      case 'arithmetic': {
        const ar = parseFloat(a.re) || 0, ai = parseFloat(a.im) || 0
        const br = parseFloat(b.re) || 0, bi = parseFloat(b.im) || 0
        lines.push(`z₁ = ${fmtComplex(ar, ai)}`)
        lines.push(`z₂ = ${fmtComplex(br, bi)}`)
        lines.push('')
        let rr, ri
        switch (op) {
          case '+':
            rr = ar + br; ri = ai + bi
            lines.push(`z₁ + z₂ = (${fmt(ar)}+${fmt(br)}) + (${fmt(ai)}+${fmt(bi)})i`)
            break
          case '−':
            rr = ar - br; ri = ai - bi
            lines.push(`z₁ − z₂ = (${fmt(ar)}−${fmt(br)}) + (${fmt(ai)}−${fmt(bi)})i`)
            break
          case '×':
            rr = ar * br - ai * bi; ri = ar * bi + ai * br
            lines.push(`z₁ × z₂ = (${fmt(ar)}×${fmt(br)} − ${fmt(ai)}×${fmt(bi)}) + (${fmt(ar)}×${fmt(bi)} + ${fmt(ai)}×${fmt(br)})i`)
            break
          case '÷':
            const denom = br * br + bi * bi
            if (denom === 0) { setResult('Cannot divide by zero'); return }
            rr = (ar * br + ai * bi) / denom; ri = (ai * br - ar * bi) / denom
            lines.push(`z₁ ÷ z₂ = z₁ × conj(z₂) / |z₂|²`)
            lines.push(`|z₂|² = ${fmt(br)}² + ${fmt(bi)}² = ${fmt(denom)}`)
            break
        }
        lines.push(`= ${fmtComplex(rr, ri)}`)
        lines.push('')
        lines.push(`|result| = ${fmt(Math.sqrt(rr * rr + ri * ri))}`)
        lines.push(`arg(result) = ${fmt(Math.atan2(ri, rr) * 180 / Math.PI)}°`)
        break
      }
      case 'polar-to-rect': {
        const r = parseFloat(polarR), theta = parseFloat(polarTheta)
        if (isNaN(r) || isNaN(theta)) { setResult('Enter r and θ'); return }
        const thetaRad = theta * Math.PI / 180
        const re = r * Math.cos(thetaRad)
        const im = r * Math.sin(thetaRad)
        lines.push(`Polar: ${fmt(r)} × (cos ${fmt(theta)}° + i sin ${fmt(theta)}°)`)
        lines.push(`Re = r × cos(θ) = ${fmt(r)} × ${fmt(Math.cos(thetaRad))} = ${fmt(re)}`)
        lines.push(`Im = r × sin(θ) = ${fmt(r)} × ${fmt(Math.sin(thetaRad))} = ${fmt(im)}`)
        lines.push(`Rectangular: ${fmtComplex(re, im)}`)
        break
      }
      case 'rect-to-polar': {
        const re = parseFloat(rectRe) || 0, im = parseFloat(rectIm) || 0
        const r = Math.sqrt(re * re + im * im)
        const theta = Math.atan2(im, re) * 180 / Math.PI
        lines.push(`Rectangular: ${fmtComplex(re, im)}`)
        lines.push(`r = √(${fmt(re)}² + ${fmt(im)}²) = ${fmt(r)}`)
        lines.push(`θ = atan2(${fmt(im)}, ${fmt(re)}) = ${fmt(theta)}°`)
        lines.push(`Polar: ${fmt(r)} ∠ ${fmt(theta)}°`)
        lines.push(`= ${fmt(r)}(cos ${fmt(theta)}° + i sin ${fmt(theta)}°)`)
        break
      }
      case 'demoivre': {
        const r = parseFloat(demoivreR), theta = parseFloat(demoivreTheta), n = parseInt(demoivreN)
        if (isNaN(r) || isNaN(theta) || isNaN(n)) { setResult('Enter r, θ, and n'); return }
        lines.push(`De Moivre's Theorem: [r(cosθ + isinθ)]ⁿ = rⁿ(cos(nθ) + isin(nθ))`)
        lines.push('')
        lines.push(`[${fmt(r)}(cos ${fmt(theta)}° + i sin ${fmt(theta)}°)]^${n}`)
        const rn = Math.pow(r, n)
        const ntheta = n * theta
        const re = rn * Math.cos(ntheta * Math.PI / 180)
        const im = rn * Math.sin(ntheta * Math.PI / 180)
        lines.push(`= ${fmt(rn)}(cos ${fmt(ntheta)}° + i sin ${fmt(ntheta)}°)`)
        lines.push(`= ${fmtComplex(re, im)}`)
        if (n >= 2) {
          lines.push('')
          lines.push(`nth roots (n=${n}):`)
          const rootR = Math.pow(r, 1 / n)
          for (let k = 0; k < n; k++) {
            const rootTheta = (theta + 360 * k) / n
            const rootRe = rootR * Math.cos(rootTheta * Math.PI / 180)
            const rootIm = rootR * Math.sin(rootTheta * Math.PI / 180)
            lines.push(`  k=${k}: ${fmt(rootR)} ∠ ${fmt(rootTheta)}° = ${fmtComplex(rootRe, rootIm)}`)
          }
        }
        break
      }
    }
    setResult(lines.join('\n'))
  }

  const handleCopy = () => {
    if (!result) return
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const cinp = (label, val, onChange) => (
    <div>
      <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">{label}</label>
      <input type="number" value={val} onChange={onChange} className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
    </div>
  )

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex flex-wrap gap-2">
        {[['arithmetic', 'Arithmetic'], ['polar-to-rect', 'Polar → Rect'], ['rect-to-polar', 'Rect → Polar'], ['demoivre', "De Moivre's"]].map(([k, l]) => (
          <button key={k} onClick={() => { setMode(k); setResult(null) }}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${mode === k ? 'bg-purple-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>
            {l}
          </button>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 space-y-4">
        {mode === 'arithmetic' && (
          <>
            <p className="text-xs text-gray-500 dark:text-gray-400">z = a + bi</p>
            <div className="grid grid-cols-2 gap-4">
              {cinp('z₁ Real', a.re, e => setA({ ...a, re: e.target.value }))}
              {cinp('z₁ Imaginary', a.im, e => setA({ ...a, im: e.target.value }))}
            </div>
            <div className="flex gap-2">
              {['+', '−', '×', '÷'].map(o => (
                <button key={o} onClick={() => setOp(o)}
                  className={`w-10 h-10 rounded-lg text-lg font-medium ${op === o ? 'bg-purple-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}>{o}</button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4">
              {cinp('z₂ Real', b.re, e => setB({ ...b, re: e.target.value }))}
              {cinp('z₂ Imaginary', b.im, e => setB({ ...b, im: e.target.value }))}
            </div>
          </>
        )}
        {mode === 'polar-to-rect' && (
          <div className="grid grid-cols-2 gap-4">
            {cinp('r (magnitude)', polarR, e => setPolarR(e.target.value))}
            {cinp('θ (degrees)', polarTheta, e => setPolarTheta(e.target.value))}
          </div>
        )}
        {mode === 'rect-to-polar' && (
          <div className="grid grid-cols-2 gap-4">
            {cinp('Real part', rectRe, e => setRectRe(e.target.value))}
            {cinp('Imaginary part', rectIm, e => setRectIm(e.target.value))}
          </div>
        )}
        {mode === 'demoivre' && (
          <div className="grid grid-cols-3 gap-4">
            {cinp('r', demoivreR, e => setDemoivreR(e.target.value))}
            {cinp('θ (degrees)', demoivreTheta, e => setDemoivreTheta(e.target.value))}
            {cinp('n (power)', demoivreN, e => setDemoivreN(e.target.value))}
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <button onClick={calculate} className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium">Calculate</button>
        <button onClick={() => setResult(null)} className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition flex items-center gap-1">
          <RefreshCw size={14} /> Reset
        </button>
      </div>

      {result && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
          <div className="flex items-start justify-between">
            <pre className="font-mono text-sm text-green-700 dark:text-green-400 whitespace-pre-wrap">{result}</pre>
            <button onClick={handleCopy} className="ml-3 shrink-0 text-sm text-green-600 dark:text-green-400">
              {copied ? <Check size={14} /> : <Copy size={14} />}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
