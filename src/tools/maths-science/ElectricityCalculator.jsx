import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

export default function ElectricityCalculator() {
  const [tab, setTab] = useState('ohm')
  const [copied, setCopied] = useState(false)

  // Ohm's Law
  const [ohmMode, setOhmMode] = useState('voltage')
  const [ohmV, setOhmV] = useState('')
  const [ohmI, setOhmI] = useState('')
  const [ohmR, setOhmR] = useState('')
  const [ohmResult, setOhmResult] = useState(null)

  // Power
  const [powV, setPowV] = useState('')
  const [powI, setPowI] = useState('')
  const [powR, setPowR] = useState('')
  const [powResult, setPowResult] = useState(null)

  // Series/Parallel
  const [resistors, setResistors] = useState('100, 200, 300')
  const [circuitResult, setCircuitResult] = useState(null)

  // Resistor Color Code
  const colors = ['Black','Brown','Red','Orange','Yellow','Green','Blue','Violet','Grey','White']
  const multipliers = ['Black','Brown','Red','Orange','Yellow','Green','Blue','Violet','Grey','White','Gold','Silver']
  const tolerances = ['Brown','Red','Green','Blue','Violet','Grey','Gold','Silver']
  const [band1, setBand1] = useState(1)
  const [band2, setBand2] = useState(0)
  const [band3, setBand3] = useState(2)
  const [tolBand, setTolBand] = useState(6)
  const [colorResult, setColorResult] = useState(null)

  // Capacitance
  const [caps, setCaps] = useState('10, 22, 47')
  const [capResult, setCapResult] = useState(null)

  const calcOhm = () => {
    const V = parseFloat(ohmV), I = parseFloat(ohmI), R = parseFloat(ohmR)
    let text = ''
    if (ohmMode === 'voltage' && !isNaN(I) && !isNaN(R)) {
      const v = I * R
      text = `V = IR = ${I} × ${R} = ${v.toFixed(4)} V\nPower: P = VI = ${v.toFixed(4)} × ${I} = ${(v * I).toFixed(4)} W`
    } else if (ohmMode === 'current' && !isNaN(V) && !isNaN(R) && R !== 0) {
      const i = V / R
      text = `I = V/R = ${V} / ${R} = ${i.toFixed(6)} A = ${(i * 1000).toFixed(4)} mA\nPower: P = V²/R = ${(V * V / R).toFixed(4)} W`
    } else if (ohmMode === 'resistance' && !isNaN(V) && !isNaN(I) && I !== 0) {
      const r = V / I
      text = `R = V/I = ${V} / ${I} = ${r.toFixed(4)} Ω\nPower: P = VI = ${(V * I).toFixed(4)} W`
    } else { text = 'Enter all required values' }
    setOhmResult(text)
  }

  const calcPower = () => {
    const V = parseFloat(powV), I = parseFloat(powI), R = parseFloat(powR)
    let text = 'Power calculations:\n'
    if (!isNaN(V) && !isNaN(I)) text += `P = VI = ${V} × ${I} = ${(V * I).toFixed(4)} W\n`
    if (!isNaN(I) && !isNaN(R)) text += `P = I²R = ${I}² × ${R} = ${(I * I * R).toFixed(4)} W\n`
    if (!isNaN(V) && !isNaN(R) && R !== 0) text += `P = V²/R = ${V}² / ${R} = ${(V * V / R).toFixed(4)} W\n`
    if (text === 'Power calculations:\n') text += 'Enter at least two values (V, I, or R)'
    else {
      const p = !isNaN(V) && !isNaN(I) ? V * I : (!isNaN(I) && !isNaN(R) ? I * I * R : V * V / R)
      text += `\nConversions:\n  ${p.toFixed(4)} W = ${(p / 1000).toFixed(6)} kW = ${(p / 745.7).toFixed(6)} hp`
    }
    setPowResult(text)
  }

  const calcCircuit = () => {
    const vals = resistors.split(',').map(s => parseFloat(s.trim())).filter(n => !isNaN(n) && n > 0)
    if (vals.length < 2) { setCircuitResult('Enter at least 2 resistor values'); return }

    const series = vals.reduce((a, b) => a + b, 0)
    const parallel = 1 / vals.reduce((a, b) => a + 1 / b, 0)

    let text = `Resistors: ${vals.join(' Ω, ')} Ω\n\n`
    text += `Series (R_total = R₁ + R₂ + ...):\n  ${vals.join(' + ')} = ${series.toFixed(4)} Ω\n\n`
    text += `Parallel (1/R = 1/R₁ + 1/R₂ + ...):\n  ${vals.map(v => `1/${v}`).join(' + ')}\n  = ${parallel.toFixed(4)} Ω\n\n`

    if (vals.length === 2) {
      text += `Quick parallel: (R₁×R₂)/(R₁+R₂) = ${((vals[0] * vals[1]) / (vals[0] + vals[1])).toFixed(4)} Ω`
    }
    setCircuitResult(text)
  }

  const calcColor = () => {
    const multValues = [1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 0.1, 0.01]
    const tolValues = [1, 2, 0.5, 0.25, 0.1, 0.05, 5, 10]
    const resistance = (band1 * 10 + band2) * multValues[band3]
    const tol = tolValues[tolBand]

    let display
    if (resistance >= 1e6) display = `${(resistance / 1e6).toFixed(resistance % 1e6 ? 2 : 0)} MΩ`
    else if (resistance >= 1e3) display = `${(resistance / 1e3).toFixed(resistance % 1e3 ? 2 : 0)} kΩ`
    else display = `${resistance.toFixed(resistance < 1 ? 2 : 0)} Ω`

    let text = `Bands: ${colors[band1]} ${colors[band2]} ${multipliers[band3]} ${tolerances[tolBand]}\n`
    text += `Resistance: ${display} ±${tol}%\n`
    text += `Range: ${((resistance * (1 - tol / 100))).toFixed(2)} Ω to ${((resistance * (1 + tol / 100))).toFixed(2)} Ω`
    setColorResult(text)
  }

  const calcCap = () => {
    const vals = caps.split(',').map(s => parseFloat(s.trim())).filter(n => !isNaN(n) && n > 0)
    if (vals.length < 2) { setCapResult('Enter at least 2 capacitor values (µF)'); return }

    const parallel = vals.reduce((a, b) => a + b, 0)
    const series = 1 / vals.reduce((a, b) => a + 1 / b, 0)

    let text = `Capacitors: ${vals.join(', ')} µF\n\n`
    text += `Parallel (C_total = C₁ + C₂ + ...):\n  = ${parallel.toFixed(4)} µF\n\n`
    text += `Series (1/C = 1/C₁ + 1/C₂ + ...):\n  = ${series.toFixed(4)} µF\n`
    text += `\nNote: Capacitors in parallel ADD (opposite to resistors)`
    setCapResult(text)
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

  const colorHex = {
    Black: '#000', Brown: '#8B4513', Red: '#FF0000', Orange: '#FFA500', Yellow: '#FFD700',
    Green: '#008000', Blue: '#0000FF', Violet: '#8B00FF', Grey: '#808080', White: '#FFF', Gold: '#FFD700', Silver: '#C0C0C0',
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-wrap gap-2">
        {[['ohm', "Ohm's Law"], ['power', 'Power'], ['circuit', 'Series/Parallel'], ['color', 'Color Code'], ['cap', 'Capacitance']].map(([k, l]) => (
          <button key={k} onClick={() => setTab(k)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${tab === k ? 'bg-purple-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>
            {l}
          </button>
        ))}
      </div>

      {tab === 'ohm' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 space-y-4">
          <div className="flex gap-2">
            {[['voltage', 'Find V'], ['current', 'Find I'], ['resistance', 'Find R']].map(([k, l]) => (
              <button key={k} onClick={() => setOhmMode(k)}
                className={`px-2 py-1 rounded text-xs font-medium transition ${ohmMode === k ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400' : 'bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-400'}`}>
                {l}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-4">
            {ohmMode !== 'voltage' && (
              <div>
                <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Voltage (V)</label>
                <input type="number" value={ohmV} onChange={e => setOhmV(e.target.value)} className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
              </div>
            )}
            {ohmMode !== 'current' && (
              <div>
                <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Current (A)</label>
                <input type="number" value={ohmI} onChange={e => setOhmI(e.target.value)} className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
              </div>
            )}
            {ohmMode !== 'resistance' && (
              <div>
                <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Resistance (Ω)</label>
                <input type="number" value={ohmR} onChange={e => setOhmR(e.target.value)} className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
              </div>
            )}
          </div>
          <button onClick={calcOhm} className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium">Calculate</button>
          <ResultBlock result={ohmResult} />
        </div>
      )}

      {tab === 'power' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">Enter any two: Voltage, Current, Resistance</p>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Voltage (V)</label>
              <input type="number" value={powV} onChange={e => setPowV(e.target.value)} className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Current (A)</label>
              <input type="number" value={powI} onChange={e => setPowI(e.target.value)} className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Resistance (Ω)</label>
              <input type="number" value={powR} onChange={e => setPowR(e.target.value)} className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
            </div>
          </div>
          <button onClick={calcPower} className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium">Calculate</button>
          <ResultBlock result={powResult} />
        </div>
      )}

      {tab === 'circuit' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 space-y-4">
          <div>
            <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Resistor values (Ω, comma-separated)</label>
            <input value={resistors} onChange={e => setResistors(e.target.value)} placeholder="100, 200, 300"
              className="w-full border rounded-lg px-3 py-2 font-mono dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
          </div>
          <button onClick={calcCircuit} className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium">Calculate</button>
          <ResultBlock result={circuitResult} />
        </div>
      )}

      {tab === 'color' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 space-y-4">
          <h3 className="font-semibold text-gray-800 dark:text-gray-200">4-Band Resistor Color Code</h3>
          <div className="flex items-center justify-center gap-2 p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
            {[colors[band1], colors[band2], multipliers[band3], tolerances[tolBand]].map((c, i) => (
              <div key={i} className="w-8 h-16 rounded border-2 border-gray-300 dark:border-gray-500" style={{ backgroundColor: colorHex[c] || '#888' }}
                title={c} />
            ))}
          </div>
          <div className="grid grid-cols-4 gap-3">
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Band 1</label>
              <select value={band1} onChange={e => setBand1(+e.target.value)} className="w-full border rounded-lg px-2 py-1.5 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200">
                {colors.map((c, i) => <option key={c} value={i}>{c} ({i})</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Band 2</label>
              <select value={band2} onChange={e => setBand2(+e.target.value)} className="w-full border rounded-lg px-2 py-1.5 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200">
                {colors.map((c, i) => <option key={c} value={i}>{c} ({i})</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Multiplier</label>
              <select value={band3} onChange={e => setBand3(+e.target.value)} className="w-full border rounded-lg px-2 py-1.5 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200">
                {multipliers.map((c, i) => {
                  const mv = [1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 0.1, 0.01]
                  return <option key={c} value={i}>{c} (×{mv[i]})</option>
                })}
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Tolerance</label>
              <select value={tolBand} onChange={e => setTolBand(+e.target.value)} className="w-full border rounded-lg px-2 py-1.5 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200">
                {tolerances.map((c, i) => {
                  const tv = [1, 2, 0.5, 0.25, 0.1, 0.05, 5, 10]
                  return <option key={c} value={i}>{c} (±{tv[i]}%)</option>
                })}
              </select>
            </div>
          </div>
          <button onClick={calcColor} className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium">Decode</button>
          <ResultBlock result={colorResult} />
        </div>
      )}

      {tab === 'cap' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 space-y-4">
          <div>
            <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Capacitor values (µF, comma-separated)</label>
            <input value={caps} onChange={e => setCaps(e.target.value)} placeholder="10, 22, 47"
              className="w-full border rounded-lg px-3 py-2 font-mono dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
          </div>
          <button onClick={calcCap} className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium">Calculate</button>
          <ResultBlock result={capResult} />
        </div>
      )}
    </div>
  )
}
