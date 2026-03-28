import { useState } from 'react'
import { Copy, Check, RefreshCw } from 'lucide-react'

export default function KinematicsCalculator() {
  const [tab, setTab] = useState('suvat')
  const [copied, setCopied] = useState(false)

  // SUVAT
  const [suvat, setSuvat] = useState({ s: '', u: '', v: '', a: '', t: '' })
  const [suvatResult, setSuvatResult] = useState(null)

  // Projectile
  const [projV0, setProjV0] = useState('')
  const [projAngle, setProjAngle] = useState('')
  const [projH0, setProjH0] = useState('0')
  const [projResult, setProjResult] = useState(null)

  // Free fall
  const [ffHeight, setFfHeight] = useState('')
  const [ffG, setFfG] = useState('9.81')
  const [ffResult, setFfResult] = useState(null)

  const g = 9.81

  const calcSuvat = () => {
    const vals = {}
    const known = []
    const unknown = []
    for (const k of ['s', 'u', 'v', 'a', 't']) {
      if (suvat[k] !== '') { vals[k] = parseFloat(suvat[k]); known.push(k) }
      else unknown.push(k)
    }
    if (known.length < 3) { setSuvatResult('Need at least 3 known values'); return }

    let steps = 'Known: ' + known.map(k => `${k} = ${vals[k]}`).join(', ') + '\n\n'
    const results = { ...vals }

    try {
      if (vals.u !== undefined && vals.a !== undefined && vals.t !== undefined && vals.v === undefined) {
        results.v = vals.u + vals.a * vals.t
        steps += `v = u + at = ${vals.u} + ${vals.a}×${vals.t} = ${results.v.toFixed(4)}\n`
      }
      if (vals.u !== undefined && vals.a !== undefined && vals.t !== undefined && vals.s === undefined) {
        results.s = vals.u * vals.t + 0.5 * vals.a * vals.t * vals.t
        steps += `s = ut + ½at² = ${vals.u}×${vals.t} + 0.5×${vals.a}×${vals.t}² = ${results.s.toFixed(4)}\n`
      }
      if (vals.u !== undefined && vals.v !== undefined && vals.a !== undefined && vals.s === undefined) {
        results.s = (vals.v * vals.v - vals.u * vals.u) / (2 * vals.a)
        steps += `v² = u² + 2as → s = (v²−u²)/(2a) = (${vals.v}²−${vals.u}²)/(2×${vals.a}) = ${results.s.toFixed(4)}\n`
      }
      if (vals.s !== undefined && vals.u !== undefined && vals.t !== undefined && vals.a === undefined) {
        results.a = 2 * (vals.s - vals.u * vals.t) / (vals.t * vals.t)
        steps += `s = ut + ½at² → a = 2(s−ut)/t² = 2(${vals.s}−${vals.u}×${vals.t})/${vals.t}² = ${results.a.toFixed(4)}\n`
      }
      if (vals.v !== undefined && vals.u !== undefined && vals.t !== undefined && vals.a === undefined) {
        results.a = (vals.v - vals.u) / vals.t
        steps += `a = (v−u)/t = (${vals.v}−${vals.u})/${vals.t} = ${results.a.toFixed(4)}\n`
      }
      if (vals.s !== undefined && vals.u !== undefined && vals.a !== undefined && vals.t === undefined) {
        const disc = vals.u * vals.u + 2 * vals.a * vals.s
        if (disc < 0) { setSuvatResult('No real solution (discriminant < 0)'); return }
        results.t = (-vals.u + Math.sqrt(disc)) / vals.a
        steps += `s = ut + ½at² → t = (−u + √(u²+2as))/a = ${results.t.toFixed(4)}\n`
      }
      if (vals.v !== undefined && vals.u !== undefined && vals.a !== undefined && vals.t === undefined) {
        results.t = (vals.v - vals.u) / vals.a
        steps += `t = (v−u)/a = (${vals.v}−${vals.u})/${vals.a} = ${results.t.toFixed(4)}\n`
      }
      // Secondary calculations
      if (results.u !== undefined && results.a !== undefined && results.t !== undefined && results.v === undefined) {
        results.v = results.u + results.a * results.t
        steps += `v = u + at = ${results.v.toFixed(4)}\n`
      }
      if (results.u !== undefined && results.a !== undefined && results.t !== undefined && results.s === undefined) {
        results.s = results.u * results.t + 0.5 * results.a * results.t * results.t
        steps += `s = ut + ½at² = ${results.s.toFixed(4)}\n`
      }

      steps += '\nResults:\n'
      for (const k of ['s', 'u', 'v', 'a', 't']) {
        if (results[k] !== undefined) {
          const unit = k === 't' ? 's' : k === 'a' ? 'm/s²' : k === 's' ? 'm' : 'm/s'
          steps += `  ${k} = ${results[k].toFixed(4)} ${unit}\n`
        }
      }
      setSuvatResult(steps)
    } catch { setSuvatResult('Could not solve with given values') }
  }

  const calcProjectile = () => {
    const v0 = parseFloat(projV0)
    const angle = parseFloat(projAngle) * Math.PI / 180
    const h0 = parseFloat(projH0) || 0
    if (isNaN(v0) || isNaN(angle)) { setProjResult('Enter valid values'); return }

    const vx = v0 * Math.cos(angle)
    const vy = v0 * Math.sin(angle)
    const tMax = (vy + Math.sqrt(vy * vy + 2 * g * h0)) / g
    const maxH = h0 + (vy * vy) / (2 * g)
    const range = vx * tMax

    let text = `Initial velocity: ${v0} m/s at ${projAngle}°\n`
    text += `Initial height: ${h0} m\n\n`
    text += `Horizontal velocity (vₓ): ${vx.toFixed(4)} m/s\n`
    text += `Vertical velocity (v_y₀): ${vy.toFixed(4)} m/s\n`
    text += `Time of flight: ${tMax.toFixed(4)} s\n`
    text += `Maximum height: ${maxH.toFixed(4)} m\n`
    text += `Range: ${range.toFixed(4)} m\n`
    text += `\nTime to max height: ${(vy / g).toFixed(4)} s\n`
    text += `Impact speed: ${Math.sqrt(vx * vx + (vy - g * tMax) ** 2).toFixed(4)} m/s`
    setProjResult(text)
  }

  const calcFreeFall = () => {
    const h = parseFloat(ffHeight)
    const gVal = parseFloat(ffG) || 9.81
    if (isNaN(h) || h < 0) { setFfResult('Enter a valid height'); return }

    const t = Math.sqrt(2 * h / gVal)
    const vf = gVal * t

    let text = `Height: ${h} m, g = ${gVal} m/s²\n\n`
    text += `Time to fall: t = √(2h/g) = √(2×${h}/${gVal}) = ${t.toFixed(4)} s\n`
    text += `Final velocity: v = gt = ${gVal}×${t.toFixed(4)} = ${vf.toFixed(4)} m/s\n`
    text += `              = ${(vf * 3.6).toFixed(2)} km/h\n\n`
    text += 'Position at intervals:\n'
    const steps = 5
    for (let i = 0; i <= steps; i++) {
      const ti = (t * i) / steps
      const si = 0.5 * gVal * ti * ti
      const vi = gVal * ti
      text += `  t=${ti.toFixed(2)}s: h=${(h - si).toFixed(2)}m, v=${vi.toFixed(2)}m/s\n`
    }
    setFfResult(text)
  }

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const resetSuvat = () => { setSuvat({ s: '', u: '', v: '', a: '', t: '' }); setSuvatResult(null) }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-wrap gap-2">
        {[['suvat', 'SUVAT Equations'], ['projectile', 'Projectile Motion'], ['freefall', 'Free Fall']].map(([k, l]) => (
          <button key={k} onClick={() => setTab(k)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${tab === k ? 'bg-purple-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>
            {l}
          </button>
        ))}
      </div>

      {tab === 'suvat' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">Enter at least 3 known values. Leave unknowns blank.</p>
          <div className="grid grid-cols-5 gap-3">
            {[['s', 'Displacement (m)'], ['u', 'Initial vel (m/s)'], ['v', 'Final vel (m/s)'], ['a', 'Accel (m/s²)'], ['t', 'Time (s)']].map(([k, label]) => (
              <div key={k}>
                <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">{label}</label>
                <input type="number" value={suvat[k]} onChange={e => setSuvat(p => ({ ...p, [k]: e.target.value }))} placeholder={k}
                  className="w-full border rounded-lg px-3 py-2 font-mono text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <button onClick={calcSuvat} className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium">Solve</button>
            <button onClick={resetSuvat} className="px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition">
              <RefreshCw size={16} />
            </button>
          </div>
          {suvatResult && (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <pre className="font-mono text-sm text-green-700 dark:text-green-400 whitespace-pre-wrap">{suvatResult}</pre>
                <button onClick={() => handleCopy(suvatResult)} className="ml-2 p-1 rounded hover:bg-green-100 dark:hover:bg-green-800/30">
                  {copied ? <Check size={14} className="text-green-600" /> : <Copy size={14} className="text-gray-400" />}
                </button>
              </div>
            </div>
          )}
          <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-3 text-xs text-gray-500 dark:text-gray-400 space-y-1">
            <p className="font-medium text-gray-700 dark:text-gray-300">SUVAT Equations:</p>
            <p>v = u + at &nbsp;|&nbsp; s = ut + ½at² &nbsp;|&nbsp; v² = u² + 2as &nbsp;|&nbsp; s = ½(u+v)t</p>
          </div>
        </div>
      )}

      {tab === 'projectile' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Initial velocity (m/s)</label>
              <input type="number" value={projV0} onChange={e => setProjV0(e.target.value)} placeholder="50"
                className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Launch angle (°)</label>
              <input type="number" value={projAngle} onChange={e => setProjAngle(e.target.value)} placeholder="45"
                className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Initial height (m)</label>
              <input type="number" value={projH0} onChange={e => setProjH0(e.target.value)} placeholder="0"
                className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
            </div>
          </div>
          <button onClick={calcProjectile} className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium">Calculate</button>
          {projResult && (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <pre className="font-mono text-sm text-green-700 dark:text-green-400 whitespace-pre-wrap">{projResult}</pre>
                <button onClick={() => handleCopy(projResult)} className="ml-2 p-1 rounded hover:bg-green-100 dark:hover:bg-green-800/30">
                  {copied ? <Check size={14} className="text-green-600" /> : <Copy size={14} className="text-gray-400" />}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {tab === 'freefall' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Height (m)</label>
              <input type="number" value={ffHeight} onChange={e => setFfHeight(e.target.value)} placeholder="100"
                className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">g (m/s²)</label>
              <input type="number" value={ffG} onChange={e => setFfG(e.target.value)} placeholder="9.81"
                className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
            </div>
          </div>
          <button onClick={calcFreeFall} className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium">Calculate</button>
          {ffResult && (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <pre className="font-mono text-sm text-green-700 dark:text-green-400 whitespace-pre-wrap">{ffResult}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
