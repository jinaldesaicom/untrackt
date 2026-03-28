import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

export default function GravitationalCalculator() {
  const [tab, setTab] = useState('gravity')
  const [copied, setCopied] = useState(false)

  const G = 6.674e-11

  const [gM1, setGM1] = useState('')
  const [gM2, setGM2] = useState('')
  const [gR, setGR] = useState('')
  const [gResult, setGResult] = useState(null)

  const [oM, setOM] = useState('')
  const [oR, setOR] = useState('')
  const [oResult, setOResult] = useState(null)

  const [eM, setEM] = useState('')
  const [eR, setER] = useState('')
  const [eResult, setEResult] = useState(null)

  const [wMass, setWMass] = useState('')
  const [wResult, setWResult] = useState(null)

  const planets = [
    { name: 'Mercury', mass: 3.30e23, radius: 2.44e6, g: 3.70 },
    { name: 'Venus', mass: 4.87e24, radius: 6.05e6, g: 8.87 },
    { name: 'Earth', mass: 5.97e24, radius: 6.37e6, g: 9.81 },
    { name: 'Moon', mass: 7.35e22, radius: 1.74e6, g: 1.62 },
    { name: 'Mars', mass: 6.42e23, radius: 3.39e6, g: 3.72 },
    { name: 'Jupiter', mass: 1.90e27, radius: 6.99e7, g: 24.79 },
    { name: 'Saturn', mass: 5.68e26, radius: 5.82e7, g: 10.44 },
    { name: 'Uranus', mass: 8.68e25, radius: 2.54e7, g: 8.87 },
    { name: 'Neptune', mass: 1.02e26, radius: 2.46e7, g: 11.15 },
    { name: 'Sun', mass: 1.99e30, radius: 6.96e8, g: 274 },
  ]

  const calcGravity = () => {
    const m1 = parseFloat(gM1), m2 = parseFloat(gM2), r = parseFloat(gR)
    if (isNaN(m1) || isNaN(m2) || isNaN(r) || r === 0) { setGResult('Enter all values (r > 0)'); return }
    const F = G * m1 * m2 / (r * r)
    let text = `F = Gm₁m₂/r²\n\n`
    text += `G = ${G.toExponential(4)} N·m²/kg²\n`
    text += `m₁ = ${m1.toExponential(4)} kg\n`
    text += `m₂ = ${m2.toExponential(4)} kg\n`
    text += `r = ${r.toExponential(4)} m\n\n`
    text += `F = ${G.toExponential(3)} × ${m1.toExponential(3)} × ${m2.toExponential(3)} / (${r.toExponential(3)})²\n`
    text += `  = ${F.toExponential(6)} N\n\n`
    text += `Gravitational field at r: g = Gm₁/r² = ${(G * m1 / (r * r)).toExponential(4)} m/s²`
    setGResult(text)
  }

  const calcOrbital = () => {
    const M = parseFloat(oM), r = parseFloat(oR)
    if (isNaN(M) || isNaN(r) || r === 0) { setOResult('Enter mass and orbital radius'); return }
    const v = Math.sqrt(G * M / r)
    const T = 2 * Math.PI * r / v
    let text = `Orbital velocity: v = √(GM/r)\n\n`
    text += `M = ${M.toExponential(4)} kg\nr = ${r.toExponential(4)} m\n\n`
    text += `v = √(${G.toExponential(3)} × ${M.toExponential(3)} / ${r.toExponential(3)})\n`
    text += `  = ${v.toFixed(2)} m/s = ${(v / 1000).toFixed(4)} km/s\n\n`
    text += `Orbital period: T = 2πr/v\n`
    text += `  = ${T.toFixed(2)} s\n`
    text += `  = ${(T / 3600).toFixed(4)} hours\n`
    text += `  = ${(T / 86400).toFixed(4)} days\n`
    text += `  = ${(T / (86400 * 365.25)).toFixed(6)} years`
    setOResult(text)
  }

  const calcEscape = () => {
    const M = parseFloat(eM), r = parseFloat(eR)
    if (isNaN(M) || isNaN(r) || r === 0) { setEResult('Enter mass and radius'); return }
    const ve = Math.sqrt(2 * G * M / r)
    let text = `Escape velocity: v_e = √(2GM/R)\n\n`
    text += `M = ${M.toExponential(4)} kg\nR = ${r.toExponential(4)} m\n\n`
    text += `v_e = √(2 × ${G.toExponential(3)} × ${M.toExponential(3)} / ${r.toExponential(3)})\n`
    text += `    = ${ve.toFixed(2)} m/s\n`
    text += `    = ${(ve / 1000).toFixed(4)} km/s\n\n`
    text += `Escape velocities of planets:\n`
    planets.forEach(p => {
      const vep = Math.sqrt(2 * G * p.mass / p.radius)
      text += `  ${p.name.padEnd(10)}: ${(vep / 1000).toFixed(2)} km/s\n`
    })
    setEResult(text)
  }

  const calcWeight = () => {
    const m = parseFloat(wMass)
    if (isNaN(m)) { setWResult('Enter mass'); return }
    let text = `Mass: ${m} kg\n\nWeight on various bodies:\n`
    planets.forEach(p => {
      const w = m * p.g
      text += `  ${p.name.padEnd(10)}: ${w.toFixed(2)} N (${(w / 9.81).toFixed(2)} kgf)  [g=${p.g} m/s²]\n`
    })
    setWResult(text)
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
        {[['gravity', 'Gravitation'], ['orbital', 'Orbital Velocity'], ['escape', 'Escape Velocity'], ['weight', 'Weight on Planets']].map(([k, l]) => (
          <button key={k} onClick={() => setTab(k)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${tab === k ? 'bg-purple-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>
            {l}
          </button>
        ))}
      </div>

      {tab === 'gravity' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 space-y-4">
          <h3 className="font-semibold text-gray-800 dark:text-gray-200">F = Gm₁m₂/r²</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">m₁ (kg)</label>
              <input type="number" value={gM1} onChange={e => setGM1(e.target.value)} placeholder="5.97e24"
                className="w-full border rounded-lg px-3 py-2 font-mono text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">m₂ (kg)</label>
              <input type="number" value={gM2} onChange={e => setGM2(e.target.value)} placeholder="70"
                className="w-full border rounded-lg px-3 py-2 font-mono text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">r (m)</label>
              <input type="number" value={gR} onChange={e => setGR(e.target.value)} placeholder="6.37e6"
                className="w-full border rounded-lg px-3 py-2 font-mono text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
            </div>
          </div>
          <button onClick={calcGravity} className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium">Calculate</button>
          <ResultBlock result={gResult} />
        </div>
      )}

      {tab === 'orbital' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 space-y-4">
          <h3 className="font-semibold text-gray-800 dark:text-gray-200">v = √(GM/r)</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Central mass M (kg)</label>
              <input type="number" value={oM} onChange={e => setOM(e.target.value)} placeholder="5.97e24"
                className="w-full border rounded-lg px-3 py-2 font-mono text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Orbital radius r (m)</label>
              <input type="number" value={oR} onChange={e => setOR(e.target.value)} placeholder="6.77e6"
                className="w-full border rounded-lg px-3 py-2 font-mono text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
            </div>
          </div>
          <button onClick={calcOrbital} className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium">Calculate</button>
          <ResultBlock result={oResult} />
        </div>
      )}

      {tab === 'escape' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 space-y-4">
          <h3 className="font-semibold text-gray-800 dark:text-gray-200">v_e = √(2GM/R)</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Body mass M (kg)</label>
              <input type="number" value={eM} onChange={e => setEM(e.target.value)} placeholder="5.97e24"
                className="w-full border rounded-lg px-3 py-2 font-mono text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Body radius R (m)</label>
              <input type="number" value={eR} onChange={e => setER(e.target.value)} placeholder="6.37e6"
                className="w-full border rounded-lg px-3 py-2 font-mono text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
            </div>
          </div>
          <button onClick={calcEscape} className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium">Calculate</button>
          <ResultBlock result={eResult} />
        </div>
      )}

      {tab === 'weight' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 space-y-4">
          <div>
            <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Mass (kg)</label>
            <input type="number" value={wMass} onChange={e => setWMass(e.target.value)} placeholder="70"
              className="w-full max-w-xs border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
          </div>
          <button onClick={calcWeight} className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium">Calculate</button>
          <ResultBlock result={wResult} />
        </div>
      )}
    </div>
  )
}
