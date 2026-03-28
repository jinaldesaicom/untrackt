import { useState } from 'react'
import { Copy, Check, RefreshCw } from 'lucide-react'

export default function TrigonometryCalculator() {
  const [mode, setMode] = useState('basic')
  const [angle, setAngle] = useState('')
  const [unit, setUnit] = useState('degrees')
  const [invValue, setInvValue] = useState('')
  const [invFunc, setInvFunc] = useState('asin')
  const [triMode, setTriMode] = useState('SSS')
  const [sides, setSides] = useState({ a: '', b: '', c: '' })
  const [angles, setAngles] = useState({ A: '', B: '', C: '' })
  const [result, setResult] = useState(null)
  const [copied, setCopied] = useState(false)

  const toRad = (d) => d * Math.PI / 180
  const toDeg = (r) => r * 180 / Math.PI
  const fmt = (n) => (+n.toFixed(8)).toString()

  const calculate = () => {
    switch (mode) {
      case 'basic': {
        const a = parseFloat(angle)
        if (isNaN(a)) { setResult('Enter an angle'); return }
        const rad = unit === 'degrees' ? toRad(a) : a
        const deg = unit === 'degrees' ? a : toDeg(a)
        const lines = []
        lines.push(`Angle: ${fmt(deg)}° = ${fmt(rad)} rad`)
        lines.push('')
        lines.push(`sin(${fmt(deg)}°) = ${fmt(Math.sin(rad))}`)
        lines.push(`cos(${fmt(deg)}°) = ${fmt(Math.cos(rad))}`)
        lines.push(`tan(${fmt(deg)}°) = ${Math.abs(Math.cos(rad)) < 1e-10 ? 'undefined' : fmt(Math.tan(rad))}`)
        lines.push('')
        lines.push(`csc(${fmt(deg)}°) = ${Math.abs(Math.sin(rad)) < 1e-10 ? 'undefined' : fmt(1 / Math.sin(rad))}`)
        lines.push(`sec(${fmt(deg)}°) = ${Math.abs(Math.cos(rad)) < 1e-10 ? 'undefined' : fmt(1 / Math.cos(rad))}`)
        lines.push(`cot(${fmt(deg)}°) = ${Math.abs(Math.sin(rad)) < 1e-10 ? 'undefined' : fmt(Math.cos(rad) / Math.sin(rad))}`)
        setResult(lines.join('\n'))
        break
      }
      case 'inverse': {
        const v = parseFloat(invValue)
        if (isNaN(v)) { setResult('Enter a value'); return }
        let rad, name
        switch (invFunc) {
          case 'asin': if (v < -1 || v > 1) { setResult('sin⁻¹ domain: [-1, 1]'); return }; rad = Math.asin(v); name = 'sin⁻¹'; break
          case 'acos': if (v < -1 || v > 1) { setResult('cos⁻¹ domain: [-1, 1]'); return }; rad = Math.acos(v); name = 'cos⁻¹'; break
          case 'atan': rad = Math.atan(v); name = 'tan⁻¹'; break
          default: rad = Math.atan(v); name = 'tan⁻¹'
        }
        setResult(`${name}(${v}) = ${fmt(toDeg(rad))}° = ${fmt(rad)} rad`)
        break
      }
      case 'convert': {
        const v = parseFloat(angle)
        if (isNaN(v)) { setResult('Enter an angle'); return }
        if (unit === 'degrees') setResult(`${v}° = ${fmt(toRad(v))} radians`)
        else setResult(`${v} rad = ${fmt(toDeg(v))}°`)
        break
      }
      case 'triangle': {
        const a = parseFloat(sides.a), b = parseFloat(sides.b), c = parseFloat(sides.c)
        const A = parseFloat(angles.A), B = parseFloat(angles.B), C = parseFloat(angles.C)
        const lines = []
        try {
          let sa, sb, sc, sA, sB, sC
          switch (triMode) {
            case 'SSS':
              if (isNaN(a) || isNaN(b) || isNaN(c) || a <= 0 || b <= 0 || c <= 0) { setResult('Enter 3 positive sides'); return }
              if (a + b <= c || a + c <= b || b + c <= a) { setResult('Invalid triangle (violates triangle inequality)'); return }
              sa = a; sb = b; sc = c
              sA = toDeg(Math.acos((b * b + c * c - a * a) / (2 * b * c)))
              sB = toDeg(Math.acos((a * a + c * c - b * b) / (2 * a * c)))
              sC = 180 - sA - sB
              lines.push('Using Law of Cosines:')
              lines.push(`A = cos⁻¹((b²+c²−a²)/(2bc)) = ${fmt(sA)}°`)
              lines.push(`B = cos⁻¹((a²+c²−b²)/(2ac)) = ${fmt(sB)}°`)
              lines.push(`C = 180° − A − B = ${fmt(sC)}°`)
              break
            case 'SAS':
              if (isNaN(a) || isNaN(b) || isNaN(C) || a <= 0 || b <= 0) { setResult('Enter sides a, b and angle C'); return }
              sa = a; sb = b
              sc = Math.sqrt(a * a + b * b - 2 * a * b * Math.cos(toRad(C)))
              sC = C
              sA = toDeg(Math.asin(a * Math.sin(toRad(C)) / sc))
              sB = 180 - sA - sC
              lines.push('Using Law of Cosines: c² = a² + b² − 2ab·cos(C)')
              lines.push(`c = ${fmt(sc)}`)
              lines.push(`A = sin⁻¹(a·sin(C)/c) = ${fmt(sA)}°`)
              lines.push(`B = 180° − A − C = ${fmt(sB)}°`)
              break
            case 'ASA':
              if (isNaN(a) || isNaN(B) || isNaN(C)) { setResult('Enter side a and angles B, C'); return }
              sA = 180 - B - C
              sa = a; sB = B; sC = C
              sb = a * Math.sin(toRad(B)) / Math.sin(toRad(sA))
              sc = a * Math.sin(toRad(C)) / Math.sin(toRad(sA))
              lines.push(`A = 180° − B − C = ${fmt(sA)}°`)
              lines.push('Using Law of Sines: a/sin(A) = b/sin(B) = c/sin(C)')
              lines.push(`b = a·sin(B)/sin(A) = ${fmt(sb)}`)
              lines.push(`c = a·sin(C)/sin(A) = ${fmt(sc)}`)
              break
            case 'AAS':
              if (isNaN(a) || isNaN(A) || isNaN(B)) { setResult('Enter side a and angles A, B'); return }
              sA = A; sB = B; sC = 180 - A - B
              sa = a
              sb = a * Math.sin(toRad(B)) / Math.sin(toRad(A))
              sc = a * Math.sin(toRad(sC)) / Math.sin(toRad(A))
              lines.push(`C = 180° − A − B = ${fmt(sC)}°`)
              lines.push('Using Law of Sines:')
              lines.push(`b = a·sin(B)/sin(A) = ${fmt(sb)}`)
              lines.push(`c = a·sin(C)/sin(A) = ${fmt(sc)}`)
              break
          }
          lines.push('')
          lines.push(`Sides: a = ${fmt(sa)}, b = ${fmt(sb)}, c = ${fmt(sc)}`)
          lines.push(`Angles: A = ${fmt(sA)}°, B = ${fmt(sB)}°, C = ${fmt(sC)}°`)
          const s = (sa + sb + sc) / 2
          const area = Math.sqrt(s * (s - sa) * (s - sb) * (s - sc))
          lines.push(`Perimeter: ${fmt(sa + sb + sc)}`)
          lines.push(`Area (Heron's): ${fmt(area)}`)
        } catch (e) {
          lines.push('Error: Could not solve triangle. Check inputs.')
        }
        setResult(lines.join('\n'))
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

  // Unit circle data
  const unitCircleAngles = [0, 30, 45, 60, 90, 120, 135, 150, 180, 210, 225, 240, 270, 300, 315, 330]

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-wrap gap-2">
        {[['basic', 'Trig Functions'], ['inverse', 'Inverse'], ['convert', 'Deg ↔ Rad'], ['triangle', 'Triangle Solver'], ['unitcircle', 'Unit Circle']].map(([k, l]) => (
          <button key={k} onClick={() => { setMode(k); setResult(null) }}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${mode === k ? 'bg-purple-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>
            {l}
          </button>
        ))}
      </div>

      {mode !== 'unitcircle' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 space-y-4">
          {(mode === 'basic' || mode === 'convert') && (
            <>
              <div className="flex gap-2 mb-2">
                <button onClick={() => setUnit('degrees')} className={`px-3 py-1 rounded text-sm ${unit === 'degrees' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'}`}>Degrees</button>
                <button onClick={() => setUnit('radians')} className={`px-3 py-1 rounded text-sm ${unit === 'radians' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'}`}>Radians</button>
              </div>
              <input type="number" value={angle} onChange={e => setAngle(e.target.value)} placeholder={unit === 'degrees' ? '45' : '0.7854'}
                className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
            </>
          )}
          {mode === 'inverse' && (
            <>
              <div className="flex gap-2 mb-2">
                {[['asin', 'sin⁻¹'], ['acos', 'cos⁻¹'], ['atan', 'tan⁻¹']].map(([k, l]) => (
                  <button key={k} onClick={() => setInvFunc(k)} className={`px-3 py-1 rounded text-sm ${invFunc === k ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'}`}>{l}</button>
                ))}
              </div>
              <input type="number" value={invValue} onChange={e => setInvValue(e.target.value)} placeholder="0.5"
                className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
            </>
          )}
          {mode === 'triangle' && (
            <>
              <div className="flex gap-2 mb-3">
                {['SSS', 'SAS', 'ASA', 'AAS'].map(m => (
                  <button key={m} onClick={() => setTriMode(m)} className={`px-3 py-1 rounded text-sm font-mono ${triMode === m ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'}`}>{m}</button>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-3">
                {triMode === 'SSS' && <>
                  <div><label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Side a</label><input type="number" value={sides.a} onChange={e => setSides({ ...sides, a: e.target.value })} className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" /></div>
                  <div><label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Side b</label><input type="number" value={sides.b} onChange={e => setSides({ ...sides, b: e.target.value })} className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" /></div>
                  <div><label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Side c</label><input type="number" value={sides.c} onChange={e => setSides({ ...sides, c: e.target.value })} className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" /></div>
                </>}
                {triMode === 'SAS' && <>
                  <div><label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Side a</label><input type="number" value={sides.a} onChange={e => setSides({ ...sides, a: e.target.value })} className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" /></div>
                  <div><label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Angle C (°)</label><input type="number" value={angles.C} onChange={e => setAngles({ ...angles, C: e.target.value })} className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" /></div>
                  <div><label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Side b</label><input type="number" value={sides.b} onChange={e => setSides({ ...sides, b: e.target.value })} className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" /></div>
                </>}
                {triMode === 'ASA' && <>
                  <div><label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Angle B (°)</label><input type="number" value={angles.B} onChange={e => setAngles({ ...angles, B: e.target.value })} className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" /></div>
                  <div><label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Side a</label><input type="number" value={sides.a} onChange={e => setSides({ ...sides, a: e.target.value })} className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" /></div>
                  <div><label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Angle C (°)</label><input type="number" value={angles.C} onChange={e => setAngles({ ...angles, C: e.target.value })} className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" /></div>
                </>}
                {triMode === 'AAS' && <>
                  <div><label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Angle A (°)</label><input type="number" value={angles.A} onChange={e => setAngles({ ...angles, A: e.target.value })} className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" /></div>
                  <div><label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Angle B (°)</label><input type="number" value={angles.B} onChange={e => setAngles({ ...angles, B: e.target.value })} className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" /></div>
                  <div><label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Side a</label><input type="number" value={sides.a} onChange={e => setSides({ ...sides, a: e.target.value })} className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" /></div>
                </>}
              </div>
            </>
          )}
        </div>
      )}

      {mode !== 'unitcircle' && (
        <div className="flex gap-3">
          <button onClick={calculate} className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium">Calculate</button>
          <button onClick={() => { setAngle(''); setInvValue(''); setSides({ a: '', b: '', c: '' }); setAngles({ A: '', B: '', C: '' }); setResult(null) }}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition flex items-center gap-1">
            <RefreshCw size={14} /> Reset
          </button>
        </div>
      )}

      {result && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
          <div className="flex items-start justify-between">
            <pre className="font-mono text-sm text-green-700 dark:text-green-400 whitespace-pre-wrap">{result}</pre>
            <button onClick={handleCopy} className="ml-3 shrink-0 text-sm text-green-600 dark:text-green-400 hover:text-green-800">
              {copied ? <Check size={14} /> : <Copy size={14} />}
            </button>
          </div>
        </div>
      )}

      {mode === 'unitcircle' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
          <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">Unit Circle Reference</h3>
          <svg viewBox="-160 -160 320 320" className="w-full max-w-md mx-auto">
            <circle cx="0" cy="0" r="130" fill="none" stroke="#d1d5db" strokeWidth="1" />
            <line x1="-140" x2="140" y1="0" y2="0" stroke="#9ca3af" strokeWidth="0.5" />
            <line x1="0" x2="0" y1="-140" y2="140" stroke="#9ca3af" strokeWidth="0.5" />
            {unitCircleAngles.map(deg => {
              const rad = toRad(deg)
              const x = 130 * Math.cos(rad)
              const y = -130 * Math.sin(rad)
              const cos = Math.cos(rad)
              const sin = Math.sin(rad)
              const cosStr = Math.abs(cos) < 1e-10 ? '0' : cos === 1 ? '1' : cos === -1 ? '-1' : `${cos.toFixed(2)}`
              const sinStr = Math.abs(sin) < 1e-10 ? '0' : sin === 1 ? '1' : sin === -1 ? '-1' : `${sin.toFixed(2)}`
              return (
                <g key={deg}>
                  <circle cx={x} cy={y} r="3" fill="#7c3aed" />
                  <text x={x + (x >= 0 ? 6 : -6)} y={y + (y >= 0 ? -6 : 10)} fontSize="7" fill="#6b7280" textAnchor={x >= 0 ? 'start' : 'end'}>
                    {deg}° ({cosStr},{sinStr})
                  </text>
                </g>
              )
            })}
          </svg>
        </div>
      )}
    </div>
  )
}
