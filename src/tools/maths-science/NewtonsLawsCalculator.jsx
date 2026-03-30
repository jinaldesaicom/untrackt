import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

export default function NewtonsLawsCalculator() {
  const [tab, setTab] = useState('fma')
  const [copied, setCopied] = useState(false)

  // F=ma
  const [fmaMode, setFmaMode] = useState('force')
  const [fmaMass, setFmaMass] = useState('')
  const [fmaAccel, setFmaAccel] = useState('')
  const [fmaForce, setFmaForce] = useState('')
  const [fmaResult, setFmaResult] = useState(null)

  // Weight
  const [weightMass, setWeightMass] = useState('')
  const [weightG, setWeightG] = useState('9.81')
  const [weightResult, setWeightResult] = useState(null)

  // Friction
  const [fricNormal, setFricNormal] = useState('')
  const [fricCoeff, setFricCoeff] = useState('')
  const [fricAngle, setFricAngle] = useState('')
  const [fricMass, setFricMass] = useState('')
  const [fricResult, setFricResult] = useState(null)

  // Momentum
  const [momMass1, setMomMass1] = useState('')
  const [momVel1, setMomVel1] = useState('')
  const [momMass2, setMomMass2] = useState('')
  const [momVel2, setMomVel2] = useState('')
  const [momType, setMomType] = useState('elastic')
  const [momResult, setMomResult] = useState(null)

  const calcFma = () => {
    const m = parseFloat(fmaMass), a = parseFloat(fmaAccel), f = parseFloat(fmaForce)
    let text = ''
    if (fmaMode === 'force' && !isNaN(m) && !isNaN(a)) {
      const F = m * a
      text = `F = ma = ${m} × ${a} = ${F.toFixed(4)} N\n= ${(F / 1000).toFixed(4)} kN`
    } else if (fmaMode === 'mass' && !isNaN(f) && !isNaN(a) && a !== 0) {
      const M = f / a
      text = `m = F/a = ${f} / ${a} = ${M.toFixed(4)} kg`
    } else if (fmaMode === 'accel' && !isNaN(f) && !isNaN(m) && m !== 0) {
      const A = f / m
      text = `a = F/m = ${f} / ${m} = ${A.toFixed(4)} m/s²`
    } else {
      text = 'Enter all required values'
    }
    setFmaResult(text)
  }

  const calcWeight = () => {
    const m = parseFloat(weightMass), gv = parseFloat(weightG) || 9.81
    if (isNaN(m)) { setWeightResult('Enter mass'); return }
    const W = m * gv
    const planets = [
      ['Earth', 9.81], ['Moon', 1.62], ['Mars', 3.72], ['Jupiter', 24.79],
      ['Venus', 8.87], ['Mercury', 3.7], ['Saturn', 10.44], ['Sun', 274],
    ]
    let text = `Mass: ${m} kg\nWeight on Earth: ${W.toFixed(2)} N (${(W / 9.81).toFixed(2)} kgf)\n\nWeight on other bodies:\n`
    planets.forEach(([name, gp]) => {
      text += `  ${name.padEnd(10)}: ${(m * gp).toFixed(2)} N (g = ${gp} m/s²)\n`
    })
    setWeightResult(text)
  }

  const calcFriction = () => {
    const mu = parseFloat(fricCoeff)
    const mass = parseFloat(fricMass)
    const angle = parseFloat(fricAngle) || 0
    const gv = 9.81

    if (isNaN(mu)) { setFricResult('Enter coefficient of friction'); return }

    let N, text = ''
    if (fricNormal !== '' && !isNaN(parseFloat(fricNormal))) {
      N = parseFloat(fricNormal)
      text = `Normal force: ${N} N (given)\n`
    } else if (!isNaN(mass)) {
      const radAngle = angle * Math.PI / 180
      N = mass * gv * Math.cos(radAngle)
      text = `Mass: ${mass} kg, Angle: ${angle}°\n`
      text += `Normal force: N = mg·cos(θ) = ${mass}×${gv}×cos(${angle}°) = ${N.toFixed(4)} N\n`
    } else {
      setFricResult('Enter normal force or mass'); return
    }

    const friction = mu * N
    text += `Coefficient: μ = ${mu}\n`
    text += `Friction force: f = μN = ${mu}×${N.toFixed(4)} = ${friction.toFixed(4)} N\n`

    if (!isNaN(mass) && angle > 0) {
      const radAngle = angle * Math.PI / 180
      const gravComp = mass * gv * Math.sin(radAngle)
      text += `\nInclined plane analysis:\n`
      text += `  Gravity component along slope: ${gravComp.toFixed(4)} N\n`
      text += `  Net force: ${(gravComp - friction).toFixed(4)} N\n`
      text += `  ${gravComp > friction ? 'Object slides down' : 'Object stays stationary'}\n`
      if (gravComp > friction && mass > 0) {
        text += `  Acceleration: ${((gravComp - friction) / mass).toFixed(4)} m/s²`
      }
    }
    setFricResult(text)
  }

  const calcMomentum = () => {
    const m1 = parseFloat(momMass1), v1 = parseFloat(momVel1)
    const m2 = parseFloat(momMass2), v2 = parseFloat(momVel2)
    if ([m1, v1, m2, v2].some(isNaN)) { setMomResult('Enter all values'); return }

    const p1 = m1 * v1, p2 = m2 * v2
    const totalP = p1 + p2
    let text = `Before collision:\n`
    text += `  Object 1: m=${m1}kg, v=${v1}m/s, p=${p1.toFixed(4)} kg·m/s\n`
    text += `  Object 2: m=${m2}kg, v=${v2}m/s, p=${p2.toFixed(4)} kg·m/s\n`
    text += `  Total momentum: ${totalP.toFixed(4)} kg·m/s\n\n`

    const ke1 = 0.5 * m1 * v1 * v1 + 0.5 * m2 * v2 * v2

    if (momType === 'elastic') {
      const v1f = ((m1 - m2) * v1 + 2 * m2 * v2) / (m1 + m2)
      const v2f = ((m2 - m1) * v2 + 2 * m1 * v1) / (m1 + m2)
      const ke2 = 0.5 * m1 * v1f * v1f + 0.5 * m2 * v2f * v2f
      text += `Elastic collision:\n`
      text += `  v₁' = ${v1f.toFixed(4)} m/s\n`
      text += `  v₂' = ${v2f.toFixed(4)} m/s\n`
      text += `  KE before: ${ke1.toFixed(4)} J, KE after: ${ke2.toFixed(4)} J\n`
      text += `  Momentum conserved: ${totalP.toFixed(4)} = ${(m1 * v1f + m2 * v2f).toFixed(4)} kg·m/s ✓`
    } else {
      const vf = totalP / (m1 + m2)
      const ke2 = 0.5 * (m1 + m2) * vf * vf
      text += `Perfectly inelastic collision (objects stick):\n`
      text += `  Combined velocity: v = ${vf.toFixed(4)} m/s\n`
      text += `  KE before: ${ke1.toFixed(4)} J, KE after: ${ke2.toFixed(4)} J\n`
      text += `  KE lost: ${(ke1 - ke2).toFixed(4)} J (${((1 - ke2 / ke1) * 100).toFixed(1)}%)\n`
      text += `  Momentum conserved: ${totalP.toFixed(4)} = ${((m1 + m2) * vf).toFixed(4)} kg·m/s ✓`
    }
    setMomResult(text)
  }

  const handleCopy = (text) => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1500) }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-wrap gap-2">
        {[['fma', 'F = ma'], ['weight', 'Weight'], ['friction', 'Friction'], ['momentum', 'Momentum']].map(([k, l]) => (
          <button key={k} onClick={() => setTab(k)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${tab === k ? 'bg-purple-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>
            {l}
          </button>
        ))}
      </div>

      {tab === 'fma' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 space-y-4">
          <div className="flex gap-2 mb-2">
            {[['force', 'Find Force(N)'], ['mass', 'Find Mass(kg)'], ['accel', 'Find Accel(m/s²)']].map(([k, l]) => (
              <button key={k} onClick={() => setFmaMode(k)}
                className={`px-2 py-1 rounded text-xs font-medium transition ${fmaMode === k ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400' : 'bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-400'}`}>
                {l}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-4">
            {fmaMode !== 'force' && (
              <div>
                <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Force (N)</label>
                <input type="number" value={fmaForce} onChange={e => setFmaForce(e.target.value)} className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
              </div>
            )}
            {fmaMode !== 'mass' && (
              <div>
                <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Mass (kg)</label>
                <input type="number" value={fmaMass} onChange={e => setFmaMass(e.target.value)} className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
              </div>
            )}
            {fmaMode !== 'accel' && (
              <div>
                <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Acceleration (m/s²)</label>
                <input type="number" value={fmaAccel} onChange={e => setFmaAccel(e.target.value)} className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
              </div>
            )}
          </div>
          <button onClick={calcFma} className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium">Calculate</button>
          {fmaResult && (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <pre className="font-mono text-sm text-green-700 dark:text-green-400 whitespace-pre-wrap">{fmaResult}</pre>
            </div>
          )}
        </div>
      )}

      {tab === 'weight' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Mass (kg)</label>
              <input type="number" value={weightMass} onChange={e => setWeightMass(e.target.value)} placeholder="70"
                className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">g (m/s²)</label>
              <input type="number" value={weightG} onChange={e => setWeightG(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
            </div>
          </div>
          <button onClick={calcWeight} className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium">Calculate</button>
          {weightResult && (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <pre className="font-mono text-sm text-green-700 dark:text-green-400 whitespace-pre-wrap">{weightResult}</pre>
            </div>
          )}
        </div>
      )}

      {tab === 'friction' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">Enter normal force directly, or mass + angle to calculate it.</p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Coefficient of friction (μ)</label>
              <input type="number" step="0.01" value={fricCoeff} onChange={e => setFricCoeff(e.target.value)} placeholder="0.5"
                className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Normal force (N) (optional)</label>
              <input type="number" value={fricNormal} onChange={e => setFricNormal(e.target.value)} placeholder="Auto from mass"
                className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Mass (kg)</label>
              <input type="number" value={fricMass} onChange={e => setFricMass(e.target.value)} placeholder="10"
                className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Incline angle (°)</label>
              <input type="number" value={fricAngle} onChange={e => setFricAngle(e.target.value)} placeholder="0"
                className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
            </div>
          </div>
          <button onClick={calcFriction} className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium">Calculate</button>
          {fricResult && (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <pre className="font-mono text-sm text-green-700 dark:text-green-400 whitespace-pre-wrap">{fricResult}</pre>
            </div>
          )}
        </div>
      )}

      {tab === 'momentum' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 space-y-4">
          <div className="flex gap-2 mb-2">
            {[['elastic', 'Elastic'], ['inelastic', 'Perfectly Inelastic']].map(([k, l]) => (
              <button key={k} onClick={() => setMomType(k)}
                className={`px-2 py-1 rounded text-xs font-medium transition ${momType === k ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400' : 'bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-400'}`}>
                {l}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Object 1</h4>
              <input type="number" value={momMass1} onChange={e => setMomMass1(e.target.value)} placeholder="Mass (kg)"
                className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
              <input type="number" value={momVel1} onChange={e => setMomVel1(e.target.value)} placeholder="Velocity (m/s)"
                className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Object 2</h4>
              <input type="number" value={momMass2} onChange={e => setMomMass2(e.target.value)} placeholder="Mass (kg)"
                className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
              <input type="number" value={momVel2} onChange={e => setMomVel2(e.target.value)} placeholder="Velocity (m/s)"
                className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
            </div>
          </div>
          <button onClick={calcMomentum} className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium">Calculate</button>
          {momResult && (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <pre className="font-mono text-sm text-green-700 dark:text-green-400 whitespace-pre-wrap">{momResult}</pre>
                <button onClick={() => handleCopy(momResult)} className="ml-2 p-1 rounded hover:bg-green-100 dark:hover:bg-green-800/30">
                  {copied ? <Check size={14} className="text-green-600" /> : <Copy size={14} className="text-gray-400" />}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
