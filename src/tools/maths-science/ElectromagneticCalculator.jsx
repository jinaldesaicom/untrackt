import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

export default function ElectromagneticCalculator() {
  const [tab, setTab] = useState('coulomb')
  const [copied, setCopied] = useState(false)

  const k = 8.9875e9
  const mu0 = 4 * Math.PI * 1e-7
  const eps0 = 8.854e-12

  const [cQ1, setCQ1] = useState('')
  const [cQ2, setCQ2] = useState('')
  const [cR, setCR] = useState('')
  const [cResult, setCResult] = useState(null)

  const [efQ, setEfQ] = useState('')
  const [efR, setEfR] = useState('')
  const [efResult, setEfResult] = useState(null)

  const [mfQ, setMfQ] = useState('')
  const [mfV, setMfV] = useState('')
  const [mfB, setMfB] = useState('')
  const [mfAngle, setMfAngle] = useState('90')
  const [mfResult, setMfResult] = useState(null)

  const [farN, setFarN] = useState('')
  const [farA, setFarA] = useState('')
  const [farDB, setFarDB] = useState('')
  const [farDT, setFarDT] = useState('')
  const [farResult, setFarResult] = useState(null)

  const [cpV, setCpV] = useState('')
  const [cpI, setCpI] = useState('')
  const [cpResult, setCpResult] = useState(null)

  const calcCoulomb = () => {
    const q1 = parseFloat(cQ1), q2 = parseFloat(cQ2), r = parseFloat(cR)
    if (isNaN(q1) || isNaN(q2) || isNaN(r) || r === 0) { setCResult('Enter all values'); return }
    const F = k * Math.abs(q1 * q2) / (r * r)
    let text = `Coulomb's Law: F = kq₁q₂/r²\n\n`
    text += `k = ${k.toExponential(4)} N·m²/C²\n`
    text += `q₁ = ${q1.toExponential(4)} C\n`
    text += `q₂ = ${q2.toExponential(4)} C\n`
    text += `r = ${r.toExponential(4)} m\n\n`
    text += `F = ${F.toExponential(6)} N\n`
    text += `  = ${(F * 1000).toExponential(4)} mN\n\n`
    text += `Force is ${q1 * q2 > 0 ? 'repulsive (like charges)' : 'attractive (unlike charges)'}`
    setCResult(text)
  }

  const calcField = () => {
    const q = parseFloat(efQ), r = parseFloat(efR)
    if (isNaN(q) || isNaN(r) || r === 0) { setEfResult('Enter charge and distance'); return }
    const E = k * Math.abs(q) / (r * r)
    const V = k * q / r
    let text = `Electric Field: E = kQ/r²\n\n`
    text += `Q = ${q.toExponential(4)} C\nr = ${r.toExponential(4)} m\n\n`
    text += `E = ${E.toExponential(6)} N/C (V/m)\n\n`
    text += `Electric potential: V = kQ/r\nV = ${V.toExponential(6)} V\n\n`
    text += `Field direction: ${q > 0 ? 'radially outward' : 'radially inward'}`
    setEfResult(text)
  }

  const calcMagnetic = () => {
    const q = parseFloat(mfQ), v = parseFloat(mfV), B = parseFloat(mfB)
    const theta = parseFloat(mfAngle) || 90
    if (isNaN(q) || isNaN(v) || isNaN(B)) { setMfResult('Enter all values'); return }
    const rad = theta * Math.PI / 180
    const F = Math.abs(q) * v * B * Math.sin(rad)
    let text = `Lorentz Force: F = qvB·sin(θ)\n\n`
    text += `q = ${q.toExponential(4)} C\n`
    text += `v = ${v.toExponential(4)} m/s\n`
    text += `B = ${B.toExponential(4)} T\n`
    text += `θ = ${theta}°\n\n`
    text += `F = ${Math.abs(q).toExponential(3)} × ${v.toExponential(3)} × ${B.toExponential(3)} × sin(${theta}°)\n`
    text += `  = ${F.toExponential(6)} N\n\n`
    if (theta === 90 || theta === 270) {
      const r = (Math.abs(q) > 0 && B > 0) ? (parseFloat(mfV) * 1.67e-27) / (Math.abs(q) * B) : 0
      text += `For a proton: cyclotron radius = mv/(qB) = ${((1.67e-27 * v) / (1.6e-19 * B)).toExponential(4)} m`
    }
    setMfResult(text)
  }

  const calcFaraday = () => {
    const N = parseFloat(farN) || 1, A = parseFloat(farA)
    const dB = parseFloat(farDB), dt = parseFloat(farDT)
    if (isNaN(A) || isNaN(dB) || isNaN(dt) || dt === 0) { setFarResult('Enter area, ΔB, and Δt'); return }
    const emf = -N * A * dB / dt
    let text = `Faraday's Law: EMF = −NΔΦ/Δt = −NA(ΔB/Δt)\n\n`
    text += `N = ${N} turns\nA = ${A} m²\nΔB = ${dB} T\nΔt = ${dt} s\n\n`
    text += `EMF = −${N} × ${A} × ${dB}/${dt}\n`
    text += `    = ${emf.toFixed(6)} V\n`
    text += `    = ${(Math.abs(emf) * 1000).toFixed(4)} mV\n\n`
    text += `Magnetic flux change: ΔΦ = AΔB = ${(A * dB).toExponential(4)} Wb`
    setFarResult(text)
  }

  const calcCircuit = () => {
    const V = parseFloat(cpV), I = parseFloat(cpI)
    if (isNaN(V) || isNaN(I)) { setCpResult('Enter voltage and current'); return }
    const P = V * I
    const R = V / I
    let text = `Circuit Analysis:\n\n`
    text += `V = ${V} V, I = ${I} A\n`
    text += `R = V/I = ${R.toFixed(4)} Ω\n`
    text += `P = VI = ${P.toFixed(4)} W = ${(P / 1000).toFixed(6)} kW\n\n`
    text += `Energy per hour: ${(P * 3600).toFixed(2)} J = ${(P * 3600 / 1000).toFixed(4)} kJ\n`
    text += `Energy per day: ${(P * 86400 / 1000).toFixed(2)} kJ\n`
    text += `Cost/day (at $0.12/kWh): $${(P * 24 / 1000 * 0.12).toFixed(4)}`
    setCpResult(text)
  }

  const handleCopy = (text) => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1500) }
  const ResultBlock = ({ result }) => result ? (
    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
      <div className="flex justify-between items-start">
        <pre className="font-mono text-sm text-green-700 dark:text-green-400 whitespace-pre-wrap">{result}</pre>
        <button onClick={() => handleCopy(result)} className="ml-2 p-1 rounded hover:bg-green-100 dark:hover:bg-green-800/30">
          {copied ? <Check size={14} className="text-green-600" /> : <Copy size={14} className="text-gray-400" />}
        </button>
      </div>
    </div>
  ) : null

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-wrap gap-2">
        {[['coulomb', "Coulomb's"], ['field', 'Electric Field'], ['magnetic', 'Lorentz Force'], ['faraday', "Faraday's"], ['circuit', 'Circuit Power']].map(([k2, l]) => (
          <button key={k2} onClick={() => setTab(k2)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${tab === k2 ? 'bg-purple-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>
            {l}
          </button>
        ))}
      </div>

      {tab === 'coulomb' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 space-y-4">
          <h3 className="font-semibold text-gray-800 dark:text-gray-200">F = kq₁q₂/r²</h3>
          <div className="grid grid-cols-3 gap-4">
            {[['q₁ (C)', cQ1, setCQ1, '1.6e-19'], ['q₂ (C)', cQ2, setCQ2, '-1.6e-19'], ['r (m)', cR, setCR, '1e-10']].map(([l, v, fn, ph]) => (
              <div key={l}>
                <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">{l}</label>
                <input type="number" value={v} onChange={e => fn(e.target.value)} placeholder={ph}
                  className="w-full border rounded-lg px-3 py-2 font-mono text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
              </div>
            ))}
          </div>
          <button onClick={calcCoulomb} className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium">Calculate</button>
          <ResultBlock result={cResult} />
        </div>
      )}

      {tab === 'field' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 space-y-4">
          <h3 className="font-semibold text-gray-800 dark:text-gray-200">E = kQ/r²</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Charge Q (C)</label>
              <input type="number" value={efQ} onChange={e => setEfQ(e.target.value)} placeholder="1e-6"
                className="w-full border rounded-lg px-3 py-2 font-mono text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Distance r (m)</label>
              <input type="number" value={efR} onChange={e => setEfR(e.target.value)} placeholder="0.1"
                className="w-full border rounded-lg px-3 py-2 font-mono text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
            </div>
          </div>
          <button onClick={calcField} className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium">Calculate</button>
          <ResultBlock result={efResult} />
        </div>
      )}

      {tab === 'magnetic' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 space-y-4">
          <h3 className="font-semibold text-gray-800 dark:text-gray-200">F = qvB·sin(θ)</h3>
          <div className="grid grid-cols-2 gap-4">
            {[['Charge q (C)', mfQ, setMfQ, '1.6e-19'], ['Velocity v (m/s)', mfV, setMfV, '3e6'], ['Mag field B (T)', mfB, setMfB, '0.5'], ['Angle θ (°)', mfAngle, setMfAngle, '90']].map(([l, v, fn, ph]) => (
              <div key={l}>
                <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">{l}</label>
                <input type="number" value={v} onChange={e => fn(e.target.value)} placeholder={ph}
                  className="w-full border rounded-lg px-3 py-2 font-mono text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
              </div>
            ))}
          </div>
          <button onClick={calcMagnetic} className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium">Calculate</button>
          <ResultBlock result={mfResult} />
        </div>
      )}

      {tab === 'faraday' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 space-y-4">
          <h3 className="font-semibold text-gray-800 dark:text-gray-200">EMF = −NΔΦ/Δt</h3>
          <div className="grid grid-cols-2 gap-4">
            {[['Turns N', farN, setFarN, '100'], ['Area A (m²)', farA, setFarA, '0.01'], ['ΔB (T)', farDB, setFarDB, '0.5'], ['Δt (s)', farDT, setFarDT, '0.1']].map(([l, v, fn, ph]) => (
              <div key={l}>
                <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">{l}</label>
                <input type="number" value={v} onChange={e => fn(e.target.value)} placeholder={ph}
                  className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
              </div>
            ))}
          </div>
          <button onClick={calcFaraday} className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium">Calculate</button>
          <ResultBlock result={farResult} />
        </div>
      )}

      {tab === 'circuit' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Voltage (V)</label>
              <input type="number" value={cpV} onChange={e => setCpV(e.target.value)} placeholder="220"
                className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Current (A)</label>
              <input type="number" value={cpI} onChange={e => setCpI(e.target.value)} placeholder="5"
                className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
            </div>
          </div>
          <button onClick={calcCircuit} className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium">Calculate</button>
          <ResultBlock result={cpResult} />
        </div>
      )}
    </div>
  )
}
