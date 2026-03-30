import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

export default function MoleCalculator() {
  const [tab, setTab] = useState('moles')
  const [copied, setCopied] = useState(false)

  const [molMass, setMolMass] = useState('')
  const [molMM, setMolMM] = useState('')
  const [molResult, setMolResult] = useState(null)

  const [convValue, setConvValue] = useState('')
  const [convMM, setConvMM] = useState('')
  const [convFrom, setConvFrom] = useState('grams')
  const [convResult, setConvResult] = useState(null)

  const [concMoles, setConcMoles] = useState('')
  const [concVol, setConcVol] = useState('')
  const [concResult, setConcResult] = useState(null)

  const [dilC1, setDilC1] = useState('')
  const [dilV1, setDilV1] = useState('')
  const [dilC2, setDilC2] = useState('')
  const [dilV2, setDilV2] = useState('')
  const [dilResult, setDilResult] = useState(null)

  const AVOGADRO = 6.022e23

  const calcMoles = () => {
    const mass = parseFloat(molMass), mm = parseFloat(molMM)
    if (isNaN(mass) || isNaN(mm) || mm === 0) { setMolResult('Enter mass and molar mass'); return }
    const moles = mass / mm
    const molecules = moles * AVOGADRO
    let text = `n = mass / M\n`
    text += `  = ${mass} g / ${mm} g/mol\n`
    text += `  = ${moles.toFixed(6)} mol\n\n`
    text += `Molecules = n × Nₐ\n`
    text += `  = ${moles.toFixed(6)} × ${AVOGADRO.toExponential(3)}\n`
    text += `  = ${molecules.toExponential(6)} molecules\n\n`
    text += `At STP (0°C, 1 atm):\n`
    text += `  Volume = n × 22.4 L/mol = ${(moles * 22.4).toFixed(4)} L`
    setMolResult(text)
  }

  const calcConvert = () => {
    const val = parseFloat(convValue), mm = parseFloat(convMM)
    if (isNaN(val) || isNaN(mm) || mm === 0) { setConvResult('Enter value and molar mass'); return }

    let moles, text = ''
    if (convFrom === 'grams') {
      moles = val / mm
      text += `${val} g → ${moles.toFixed(6)} mol\n`
    } else if (convFrom === 'moles') {
      moles = val
      text += `${val} mol → ${(val * mm).toFixed(6)} g\n`
    } else {
      moles = val / AVOGADRO
      text += `${val.toExponential(4)} molecules → ${moles.toExponential(6)} mol\n`
    }

    text += `\nAll conversions:\n`
    text += `  Moles: ${moles.toFixed(6)} mol\n`
    text += `  Grams: ${(moles * mm).toFixed(6)} g\n`
    text += `  Molecules: ${(moles * AVOGADRO).toExponential(6)}\n`
    text += `  Volume (STP): ${(moles * 22.4).toFixed(4)} L`
    setConvResult(text)
  }

  const calcConcentration = () => {
    const n = parseFloat(concMoles), V = parseFloat(concVol)
    if (isNaN(n) || isNaN(V) || V === 0) { setConcResult('Enter moles and volume'); return }
    const M = n / V
    let text = `Molarity = n / V\n`
    text += `  = ${n} mol / ${V} L\n`
    text += `  = ${M.toFixed(6)} M (mol/L)\n\n`
    text += `At this concentration:\n`
    text += `  In 100 mL: ${(M * 0.1).toFixed(6)} mol\n`
    text += `  In 250 mL: ${(M * 0.25).toFixed(6)} mol\n`
    text += `  In 500 mL: ${(M * 0.5).toFixed(6)} mol\n`
    text += `  In 1000 mL: ${M.toFixed(6)} mol`
    setConcResult(text)
  }

  const calcDilution = () => {
    const c1 = parseFloat(dilC1), v1 = parseFloat(dilV1), c2 = parseFloat(dilC2), v2 = parseFloat(dilV2)
    const known = [!isNaN(c1), !isNaN(v1), !isNaN(c2), !isNaN(v2)].filter(Boolean).length
    if (known < 3) { setDilResult('Enter 3 values to find the 4th'); return }

    let text = `C₁V₁ = C₂V₂\n\n`
    if (isNaN(c1)) {
      const r = c2 * v2 / v1
      text += `C₁ = C₂V₂/V₁ = ${c2}×${v2}/${v1} = ${r.toFixed(6)} M`
    } else if (isNaN(v1)) {
      const r = c2 * v2 / c1
      text += `V₁ = C₂V₂/C₁ = ${c2}×${v2}/${c1} = ${r.toFixed(6)} L`
    } else if (isNaN(c2)) {
      const r = c1 * v1 / v2
      text += `C₂ = C₁V₁/V₂ = ${c1}×${v1}/${v2} = ${r.toFixed(6)} M`
    } else {
      const r = c1 * v1 / c2
      text += `V₂ = C₁V₁/C₂ = ${c1}×${v1}/${c2} = ${r.toFixed(6)} L`
    }
    setDilResult(text)
  }

  const handleCopy = (t) => { navigator.clipboard.writeText(t); setCopied(true); setTimeout(() => setCopied(false), 1500) }
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

  const commonMM = [
    ['H₂O', 18.015], ['NaCl', 58.44], ['CO₂', 44.01], ['H₂SO₄', 98.079],
    ['NaOH', 40.00], ['HCl', 36.46], ['CaCO₃', 100.09], ['C₆H₁₂O₆', 180.16],
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-wrap gap-2">
        {[['moles', 'Mass → Moles'], ['convert', 'Unit Converter'], ['conc', 'Molarity'], ['dilution', 'Dilution']].map(([k, l]) => (
          <button key={k} onClick={() => setTab(k)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${tab === k ? 'bg-purple-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>
            {l}
          </button>
        ))}
      </div>

      {tab === 'moles' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Mass (g)</label>
              <input type="number" value={molMass} onChange={e => setMolMass(e.target.value)} placeholder="36.03"
                className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Molar mass (g/mol)</label>
              <input type="number" value={molMM} onChange={e => setMolMM(e.target.value)} placeholder="18.015"
                className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {commonMM.map(([name, mm]) => (
              <button key={name} onClick={() => setMolMM(mm.toString())}
                className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition">
                {name} ({mm})
              </button>
            ))}
          </div>
          <button onClick={calcMoles} className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium">Calculate</button>
          <ResultBlock result={molResult} />
        </div>
      )}

      {tab === 'convert' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Value</label>
              <input type="number" value={convValue} onChange={e => setConvValue(e.target.value)} placeholder="100"
                className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">From</label>
              <select value={convFrom} onChange={e => setConvFrom(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200">
                <option value="grams">Grams</option>
                <option value="moles">Moles</option>
                <option value="molecules">Molecules</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Molar mass (g/mol)</label>
              <input type="number" value={convMM} onChange={e => setConvMM(e.target.value)} placeholder="18.015"
                className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
            </div>
          </div>
          <button onClick={calcConvert} className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium">Convert</button>
          <ResultBlock result={convResult} />
        </div>
      )}

      {tab === 'conc' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 space-y-4">
          <h3 className="font-semibold text-gray-800 dark:text-gray-200">M = n / V</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Moles of solute (mol)</label>
              <input type="number" value={concMoles} onChange={e => setConcMoles(e.target.value)} placeholder="0.5"
                className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Volume of solution (L)</label>
              <input type="number" value={concVol} onChange={e => setConcVol(e.target.value)} placeholder="0.25"
                className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
            </div>
          </div>
          <button onClick={calcConcentration} className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium">Calculate</button>
          <ResultBlock result={concResult} />
        </div>
      )}

      {tab === 'dilution' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 space-y-4">
          <h3 className="font-semibold text-gray-800 dark:text-gray-200">C₁V₁ = C₂V₂</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Enter 3 values to find the 4th</p>
          <div className="grid grid-cols-2 gap-4">
            {[['C₁ (M)', dilC1, setDilC1], ['V₁ (L)', dilV1, setDilV1], ['C₂ (M)', dilC2, setDilC2], ['V₂ (L)', dilV2, setDilV2]].map(([l, v, fn]) => (
              <div key={l}>
                <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">{l}</label>
                <input type="number" value={v} onChange={e => fn(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
              </div>
            ))}
          </div>
          <button onClick={calcDilution} className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium">Calculate</button>
          <ResultBlock result={dilResult} />
        </div>
      )}
    </div>
  )
}
