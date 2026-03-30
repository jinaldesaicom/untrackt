import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

export default function ThermodynamicsCalculator() {
  const [tab, setTab] = useState('ideal')
  const [copied, setCopied] = useState(false)

  const [igP, setIgP] = useState('')
  const [igV, setIgV] = useState('')
  const [igN, setIgN] = useState('')
  const [igT, setIgT] = useState('')
  const [igResult, setIgResult] = useState(null)

  const [glLaw, setGlLaw] = useState('boyle')
  const [glP1, setGlP1] = useState('')
  const [glV1, setGlV1] = useState('')
  const [glT1, setGlT1] = useState('')
  const [glP2, setGlP2] = useState('')
  const [glV2, setGlV2] = useState('')
  const [glT2, setGlT2] = useState('')
  const [glResult, setGlResult] = useState(null)

  const [teType, setTeType] = useState('linear')
  const [teL0, setTeL0] = useState('')
  const [teAlpha, setTeAlpha] = useState('')
  const [teDT, setTeDT] = useState('')
  const [teResult, setTeResult] = useState(null)

  const [hcM, setHcM] = useState('')
  const [hcC, setHcC] = useState('')
  const [hcDT, setHcDT] = useState('')
  const [hcResult, setHcResult] = useState(null)

  const R = 8.314

  const calcIdealGas = () => {
    const P = parseFloat(igP), V = parseFloat(igV), n = parseFloat(igN), T = parseFloat(igT)
    const known = [!isNaN(P), !isNaN(V), !isNaN(n), !isNaN(T)]
    const count = known.filter(Boolean).length
    if (count < 3) { setIgResult('Enter 3 values to find the 4th'); return }

    let text = 'PV = nRT  (R = 8.314 J/(mol·K))\n\n'
    if (isNaN(P) && !isNaN(V) && !isNaN(n) && !isNaN(T)) {
      const p = n * R * T / V
      text += `P = nRT/V = ${n}×${R}×${T}/${V}\n  = ${p.toFixed(4)} Pa = ${(p / 101325).toFixed(6)} atm = ${(p / 1000).toFixed(4)} kPa`
    } else if (isNaN(V) && !isNaN(P) && !isNaN(n) && !isNaN(T)) {
      const v = n * R * T / P
      text += `V = nRT/P = ${n}×${R}×${T}/${P}\n  = ${v.toFixed(6)} m³ = ${(v * 1000).toFixed(4)} L`
    } else if (isNaN(n) && !isNaN(P) && !isNaN(V) && !isNaN(T)) {
      const nn = P * V / (R * T)
      text += `n = PV/(RT) = ${P}×${V}/(${R}×${T})\n  = ${nn.toFixed(6)} mol`
    } else if (isNaN(T) && !isNaN(P) && !isNaN(V) && !isNaN(n)) {
      const t = P * V / (n * R)
      text += `T = PV/(nR) = ${P}×${V}/(${n}×${R})\n  = ${t.toFixed(4)} K = ${(t - 273.15).toFixed(4)} °C`
    }
    setIgResult(text)
  }

  const calcGasLaw = () => {
    const p1 = parseFloat(glP1), v1 = parseFloat(glV1), t1 = parseFloat(glT1)
    const p2 = parseFloat(glP2), v2 = parseFloat(glV2), t2 = parseFloat(glT2)
    let text = ''

    if (glLaw === 'boyle') {
      if (isNaN(p1) || isNaN(v1)) { setGlResult('Enter P₁ and V₁'); return }
      text = `Boyle's Law: P₁V₁ = P₂V₂ (constant T)\n\n`
      text += `P₁V₁ = ${p1} × ${v1} = ${(p1 * v1).toFixed(4)}\n\n`
      if (!isNaN(p2)) text += `V₂ = P₁V₁/P₂ = ${(p1 * v1 / p2).toFixed(4)}\n`
      if (!isNaN(v2)) text += `P₂ = P₁V₁/V₂ = ${(p1 * v1 / v2).toFixed(4)}\n`
    } else if (glLaw === 'charles') {
      if (isNaN(v1) || isNaN(t1)) { setGlResult('Enter V₁ and T₁ (K)'); return }
      text = `Charles's Law: V₁/T₁ = V₂/T₂ (constant P)\n\n`
      text += `V₁/T₁ = ${v1}/${t1} = ${(v1 / t1).toFixed(6)}\n\n`
      if (!isNaN(t2)) text += `V₂ = V₁T₂/T₁ = ${(v1 * t2 / t1).toFixed(4)}\n`
      if (!isNaN(v2)) text += `T₂ = T₁V₂/V₁ = ${(t1 * v2 / v1).toFixed(4)} K\n`
    } else if (glLaw === 'gaylussac') {
      if (isNaN(p1) || isNaN(t1)) { setGlResult('Enter P₁ and T₁ (K)'); return }
      text = `Gay-Lussac's Law: P₁/T₁ = P₂/T₂ (constant V)\n\n`
      text += `P₁/T₁ = ${p1}/${t1} = ${(p1 / t1).toFixed(6)}\n\n`
      if (!isNaN(t2)) text += `P₂ = P₁T₂/T₁ = ${(p1 * t2 / t1).toFixed(4)}\n`
      if (!isNaN(p2)) text += `T₂ = T₁P₂/P₁ = ${(t1 * p2 / p1).toFixed(4)} K\n`
    } else {
      if (isNaN(p1) || isNaN(v1) || isNaN(t1)) { setGlResult('Enter P₁, V₁, T₁'); return }
      text = `Combined: P₁V₁/T₁ = P₂V₂/T₂\n\n`
      text += `P₁V₁/T₁ = ${(p1 * v1 / t1).toFixed(6)}\n\n`
      const c = p1 * v1 / t1
      if (!isNaN(p2) && !isNaN(t2)) text += `V₂ = c×T₂/P₂ = ${(c * t2 / p2).toFixed(4)}\n`
      if (!isNaN(v2) && !isNaN(t2)) text += `P₂ = c×T₂/V₂ = ${(c * t2 / v2).toFixed(4)}\n`
      if (!isNaN(p2) && !isNaN(v2)) text += `T₂ = P₂V₂/c = ${(p2 * v2 / c).toFixed(4)} K\n`
    }
    setGlResult(text)
  }

  const calcExpansion = () => {
    const l0 = parseFloat(teL0), alpha = parseFloat(teAlpha), dt = parseFloat(teDT)
    if (isNaN(l0) || isNaN(alpha) || isNaN(dt)) { setTeResult('Enter all values'); return }

    let text = ''
    if (teType === 'linear') {
      const dl = l0 * alpha * dt
      text = `Linear: ΔL = L₀αΔT\n= ${l0} × ${alpha} × ${dt}\n= ${dl.toExponential(4)} m\n\nNew length: ${(l0 + dl).toFixed(6)} m`
    } else if (teType === 'area') {
      const da = l0 * 2 * alpha * dt
      text = `Area: ΔA = A₀(2α)ΔT\n= ${l0} × ${2 * alpha} × ${dt}\n= ${da.toExponential(4)} m²\n\nNew area: ${(l0 + da).toFixed(6)} m²`
    } else {
      const dv = l0 * 3 * alpha * dt
      text = `Volume: ΔV = V₀(3α)ΔT\n= ${l0} × ${3 * alpha} × ${dt}\n= ${dv.toExponential(4)} m³\n\nNew volume: ${(l0 + dv).toFixed(6)} m³`
    }
    text += `\n\nCommon α values:\n  Steel: 12×10⁻⁶ /°C\n  Aluminum: 23×10⁻⁶ /°C\n  Copper: 17×10⁻⁶ /°C\n  Glass: 9×10⁻⁶ /°C`
    setTeResult(text)
  }

  const calcHeat = () => {
    const m = parseFloat(hcM), c = parseFloat(hcC), dt = parseFloat(hcDT)
    if (isNaN(m) || isNaN(c) || isNaN(dt)) { setHcResult('Enter all values'); return }
    const Q = m * c * dt
    let text = `Q = mcΔT = ${m} × ${c} × ${dt}\n  = ${Q.toFixed(4)} J\n  = ${(Q / 1000).toFixed(4)} kJ\n  = ${(Q / 4184).toFixed(4)} kcal\n`
    text += `\nCommon specific heat capacities (J/(kg·K)):\n  Water: 4186\n  Ice: 2090\n  Steam: 2010\n  Aluminum: 900\n  Iron: 450\n  Copper: 385`
    setHcResult(text)
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
        {[['ideal', 'Ideal Gas'], ['gaslaw', 'Gas Laws'], ['expand', 'Thermal Expansion'], ['heat', 'Q = mcΔT']].map(([k, l]) => (
          <button key={k} onClick={() => setTab(k)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${tab === k ? 'bg-purple-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>
            {l}
          </button>
        ))}
      </div>

      {tab === 'ideal' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 space-y-4">
          <h3 className="font-semibold text-gray-800 dark:text-gray-200">PV = nRT</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Enter 3 values. P in Pa, V in m³, T in K.</p>
          <div className="grid grid-cols-4 gap-3">
            {[['P (Pa)', igP, setIgP, '101325'], ['V (m³)', igV, setIgV, '0.0224'], ['n (mol)', igN, setIgN, '1'], ['T (K)', igT, setIgT, '273.15']].map(([l, v, fn, ph]) => (
              <div key={l}>
                <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">{l}</label>
                <input type="number" value={v} onChange={e => fn(e.target.value)} placeholder={ph}
                  className="w-full border rounded-lg px-3 py-2 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
              </div>
            ))}
          </div>
          <button onClick={calcIdealGas} className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium">Solve</button>
          <ResultBlock result={igResult} />
        </div>
      )}

      {tab === 'gaslaw' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 space-y-4">
          <div className="flex flex-wrap gap-2 mb-2">
            {[['boyle', "Boyle's"], ['charles', "Charles's"], ['gaylussac', "Gay-Lussac's"], ['combined', 'Combined']].map(([k, l]) => (
              <button key={k} onClick={() => setGlLaw(k)}
                className={`px-2 py-1 rounded text-xs font-medium transition ${glLaw === k ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400' : 'bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-400'}`}>
                {l}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div><label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">P₁</label>
              <input type="number" value={glP1} onChange={e => setGlP1(e.target.value)} className="w-full border rounded-lg px-3 py-2 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" /></div>
            <div><label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">V₁</label>
              <input type="number" value={glV1} onChange={e => setGlV1(e.target.value)} className="w-full border rounded-lg px-3 py-2 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" /></div>
            <div><label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">T₁ (K)</label>
              <input type="number" value={glT1} onChange={e => setGlT1(e.target.value)} className="w-full border rounded-lg px-3 py-2 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" /></div>
            <div><label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">P₂</label>
              <input type="number" value={glP2} onChange={e => setGlP2(e.target.value)} className="w-full border rounded-lg px-3 py-2 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" /></div>
            <div><label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">V₂</label>
              <input type="number" value={glV2} onChange={e => setGlV2(e.target.value)} className="w-full border rounded-lg px-3 py-2 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" /></div>
            <div><label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">T₂ (K)</label>
              <input type="number" value={glT2} onChange={e => setGlT2(e.target.value)} className="w-full border rounded-lg px-3 py-2 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" /></div>
          </div>
          <button onClick={calcGasLaw} className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium">Calculate</button>
          <ResultBlock result={glResult} />
        </div>
      )}

      {tab === 'expand' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 space-y-4">
          <div className="flex gap-2 mb-2">
            {[['linear', 'Linear'], ['area', 'Area'], ['volume', 'Volume']].map(([k, l]) => (
              <button key={k} onClick={() => setTeType(k)}
                className={`px-2 py-1 rounded text-xs font-medium transition ${teType === k ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400' : 'bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-400'}`}>
                {l}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">{teType === 'linear' ? 'L₀ (m)' : teType === 'area' ? 'A₀ (m²)' : 'V₀ (m³)'}</label>
              <input type="number" value={teL0} onChange={e => setTeL0(e.target.value)} placeholder="1"
                className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">α (per °C)</label>
              <input type="number" value={teAlpha} onChange={e => setTeAlpha(e.target.value)} placeholder="0.000012"
                className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">ΔT (°C)</label>
              <input type="number" value={teDT} onChange={e => setTeDT(e.target.value)} placeholder="100"
                className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
            </div>
          </div>
          <button onClick={calcExpansion} className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium">Calculate</button>
          <ResultBlock result={teResult} />
        </div>
      )}

      {tab === 'heat' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 space-y-4">
          <h3 className="font-semibold text-gray-800 dark:text-gray-200">Q = mcΔT</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Mass (kg)</label>
              <input type="number" value={hcM} onChange={e => setHcM(e.target.value)} placeholder="1"
                className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">c (J/(kg·K))</label>
              <input type="number" value={hcC} onChange={e => setHcC(e.target.value)} placeholder="4186"
                className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">ΔT (K or °C)</label>
              <input type="number" value={hcDT} onChange={e => setHcDT(e.target.value)} placeholder="10"
                className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
            </div>
          </div>
          <button onClick={calcHeat} className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium">Calculate</button>
          <ResultBlock result={hcResult} />
        </div>
      )}
    </div>
  )
}
