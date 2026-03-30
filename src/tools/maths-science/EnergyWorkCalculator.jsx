import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

export default function EnergyWorkCalculator() {
  const [tab, setTab] = useState('kinetic')
  const [copied, setCopied] = useState(false)

  const [keMass, setKeMass] = useState('')
  const [keVel, setKeVel] = useState('')
  const [keResult, setKeResult] = useState(null)

  const [peMass, setPeMass] = useState('')
  const [peHeight, setPeHeight] = useState('')
  const [peG, setPeG] = useState('9.81')
  const [peResult, setPeResult] = useState(null)

  const [workForce, setWorkForce] = useState('')
  const [workDist, setWorkDist] = useState('')
  const [workAngle, setWorkAngle] = useState('0')
  const [workResult, setWorkResult] = useState(null)

  const [powerWork, setPowerWork] = useState('')
  const [powerTime, setPowerTime] = useState('')
  const [powerResult, setPowerResult] = useState(null)

  const [effIn, setEffIn] = useState('')
  const [effOut, setEffOut] = useState('')
  const [effResult, setEffResult] = useState(null)

  const calcKE = () => {
    const m = parseFloat(keMass), v = parseFloat(keVel)
    if (isNaN(m) || isNaN(v)) return
    const ke = 0.5 * m * v * v
    let text = `KE = ½mv² = 0.5 × ${m} × ${v}² = ${ke.toFixed(4)} J\n`
    text += `   = ${(ke / 1000).toFixed(4)} kJ\n`
    text += `   = ${(ke / 4184).toFixed(4)} kcal\n`
    text += `   = ${(ke / 3600000).toFixed(6)} kWh\n\n`
    text += `Equivalent height (PE): ${(ke / (m * 9.81)).toFixed(4)} m\n`
    text += `Equivalent speed for 1kg: ${Math.sqrt(2 * ke).toFixed(4)} m/s`
    setKeResult(text)
  }

  const calcPE = () => {
    const m = parseFloat(peMass), h = parseFloat(peHeight), g = parseFloat(peG) || 9.81
    if (isNaN(m) || isNaN(h)) return
    const pe = m * g * h
    let text = `PE = mgh = ${m} × ${g} × ${h} = ${pe.toFixed(4)} J\n`
    text += `   = ${(pe / 1000).toFixed(4)} kJ\n\n`
    text += `Impact speed (if dropped): v = √(2gh) = ${Math.sqrt(2 * g * h).toFixed(4)} m/s\n`
    text += `  = ${(Math.sqrt(2 * g * h) * 3.6).toFixed(2)} km/h`
    setPeResult(text)
  }

  const calcWork = () => {
    const F = parseFloat(workForce), d = parseFloat(workDist), theta = parseFloat(workAngle) || 0
    if (isNaN(F) || isNaN(d)) return
    const rad = theta * Math.PI / 180
    const W = F * d * Math.cos(rad)
    let text = `W = Fd·cos(θ) = ${F} × ${d} × cos(${theta}°)\n`
    text += `  = ${F} × ${d} × ${Math.cos(rad).toFixed(6)}\n`
    text += `  = ${W.toFixed(4)} J\n`
    text += `  = ${(W / 1000).toFixed(4)} kJ\n\n`
    if (theta > 0) {
      text += `Component along displacement: ${(F * Math.cos(rad)).toFixed(4)} N\n`
      text += `Component perpendicular: ${(F * Math.sin(rad)).toFixed(4)} N`
    }
    setWorkResult(text)
  }

  const calcPower = () => {
    const W = parseFloat(powerWork), t = parseFloat(powerTime)
    if (isNaN(W) || isNaN(t) || t === 0) return
    const P = W / t
    let text = `P = W/t = ${W} / ${t} = ${P.toFixed(4)} W\n`
    text += `  = ${(P / 1000).toFixed(4)} kW\n`
    text += `  = ${(P / 745.7).toFixed(4)} hp\n\n`
    text += `Energy per hour: ${(P * 3600 / 1000).toFixed(4)} kJ\n`
    text += `Energy per day: ${(P * 86400 / 1000).toFixed(4)} kJ`
    setPowerResult(text)
  }

  const calcEfficiency = () => {
    const ei = parseFloat(effIn), eo = parseFloat(effOut)
    if (isNaN(ei) || isNaN(eo) || ei === 0) return
    const eff = (eo / ei) * 100
    let text = `Efficiency = (Output / Input) × 100\n`
    text += `           = (${eo} / ${ei}) × 100\n`
    text += `           = ${eff.toFixed(2)}%\n\n`
    text += `Energy lost: ${(ei - eo).toFixed(4)} J (${(100 - eff).toFixed(2)}%)`
    setEffResult(text)
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
        {[['kinetic', 'Kinetic Energy'], ['potential', 'Potential Energy'], ['work', 'Work'], ['power', 'Power'], ['efficiency', 'Efficiency']].map(([k, l]) => (
          <button key={k} onClick={() => setTab(k)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${tab === k ? 'bg-purple-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>
            {l}
          </button>
        ))}
      </div>

      {tab === 'kinetic' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 space-y-4">
          <h3 className="font-semibold text-gray-800 dark:text-gray-200">KE = ½mv²</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Mass (kg)</label>
              <input type="number" value={keMass} onChange={e => setKeMass(e.target.value)} placeholder="10"
                className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Velocity (m/s)</label>
              <input type="number" value={keVel} onChange={e => setKeVel(e.target.value)} placeholder="5"
                className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
            </div>
          </div>
          <button onClick={calcKE} className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium">Calculate</button>
          <ResultBlock result={keResult} />
        </div>
      )}

      {tab === 'potential' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 space-y-4">
          <h3 className="font-semibold text-gray-800 dark:text-gray-200">PE = mgh</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Mass (kg)</label>
              <input type="number" value={peMass} onChange={e => setPeMass(e.target.value)} placeholder="10"
                className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Height (m)</label>
              <input type="number" value={peHeight} onChange={e => setPeHeight(e.target.value)} placeholder="20"
                className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">g (m/s²)</label>
              <input type="number" value={peG} onChange={e => setPeG(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
            </div>
          </div>
          <button onClick={calcPE} className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium">Calculate</button>
          <ResultBlock result={peResult} />
        </div>
      )}

      {tab === 'work' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 space-y-4">
          <h3 className="font-semibold text-gray-800 dark:text-gray-200">W = Fd·cos(θ)</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Force (N)</label>
              <input type="number" value={workForce} onChange={e => setWorkForce(e.target.value)} placeholder="100"
                className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Distance (m)</label>
              <input type="number" value={workDist} onChange={e => setWorkDist(e.target.value)} placeholder="5"
                className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Angle (°)</label>
              <input type="number" value={workAngle} onChange={e => setWorkAngle(e.target.value)} placeholder="0"
                className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
            </div>
          </div>
          <button onClick={calcWork} className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium">Calculate</button>
          <ResultBlock result={workResult} />
        </div>
      )}

      {tab === 'power' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 space-y-4">
          <h3 className="font-semibold text-gray-800 dark:text-gray-200">P = W/t</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Work (J)</label>
              <input type="number" value={powerWork} onChange={e => setPowerWork(e.target.value)} placeholder="1000"
                className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Time (s)</label>
              <input type="number" value={powerTime} onChange={e => setPowerTime(e.target.value)} placeholder="10"
                className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
            </div>
          </div>
          <button onClick={calcPower} className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium">Calculate</button>
          <ResultBlock result={powerResult} />
        </div>
      )}

      {tab === 'efficiency' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 space-y-4">
          <h3 className="font-semibold text-gray-800 dark:text-gray-200">η = (Output / Input) × 100%</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Energy Input (J)</label>
              <input type="number" value={effIn} onChange={e => setEffIn(e.target.value)} placeholder="1000"
                className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Useful Output (J)</label>
              <input type="number" value={effOut} onChange={e => setEffOut(e.target.value)} placeholder="750"
                className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
            </div>
          </div>
          <button onClick={calcEfficiency} className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium">Calculate</button>
          <ResultBlock result={effResult} />
        </div>
      )}
    </div>
  )
}
