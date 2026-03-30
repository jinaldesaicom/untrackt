import { useState, useMemo } from 'react'

const R = 8.314 // J/(mol·K)
const R_Latm = 0.08206 // L·atm/(mol·K)

export default function GasLawsCalculator() {
  const [mode, setMode] = useState('ideal')
  const [inputs, setInputs] = useState({})
  const set = (k, v) => setInputs(p => ({ ...p, [k]: v }))

  const modes = [
    { k: 'ideal', l: "Ideal Gas (PV=nRT)" },
    { k: 'boyle', l: "Boyle's Law" },
    { k: 'charles', l: "Charles's Law" },
    { k: 'gayLussac', l: "Gay-Lussac's Law" },
    { k: 'combined', l: "Combined Gas Law" },
    { k: 'stp', l: "STP Calculations" },
  ]

  const results = useMemo(() => {
    const g = (k) => parseFloat(inputs[k])
    switch (mode) {
      case 'ideal': {
        const P = g('P'), V = g('V'), n = g('n'), T = g('T')
        const vals = [P, V, n, T]
        const unknowns = vals.filter(isNaN).length
        if (unknowns !== 1) return { rows: [{ l: 'Info', v: 'Enter exactly 3 values, leave 1 empty' }] }
        let rP = P, rV = V, rn = n, rT = T, solved = ''
        if (isNaN(P)) { rP = (n * R_Latm * T) / V; solved = 'Pressure' }
        else if (isNaN(V)) { rV = (n * R_Latm * T) / P; solved = 'Volume' }
        else if (isNaN(n)) { rn = (P * V) / (R_Latm * T); solved = 'Moles' }
        else { rT = (P * V) / (n * R_Latm); solved = 'Temperature' }
        return {
          rows: [
            { l: 'Pressure (P)', v: `${rP.toFixed(4)} atm` },
            { l: 'Volume (V)', v: `${rV.toFixed(4)} L` },
            { l: 'Moles (n)', v: `${rn.toFixed(6)} mol` },
            { l: 'Temperature (T)', v: `${rT.toFixed(2)} K (${(rT - 273.15).toFixed(2)} °C)` },
            { l: 'Solved for', v: solved },
          ],
          formula: 'PV = nRT, R = 0.08206 L·atm/(mol·K)',
        }
      }
      case 'boyle': {
        const P1 = g('P1'), V1 = g('V1'), P2 = g('P2'), V2 = g('V2')
        const vals = [P1, V1, P2, V2]
        const unknowns = vals.filter(isNaN).length
        if (unknowns !== 1) return { rows: [{ l: 'Info', v: 'Enter exactly 3 values' }] }
        let rP1 = P1, rV1 = V1, rP2 = P2, rV2 = V2, solved = ''
        if (isNaN(P1)) { rP1 = (P2 * V2) / V1; solved = 'P₁' }
        else if (isNaN(V1)) { rV1 = (P2 * V2) / P1; solved = 'V₁' }
        else if (isNaN(P2)) { rP2 = (P1 * V1) / V2; solved = 'P₂' }
        else { rV2 = (P1 * V1) / P2; solved = 'V₂' }
        return {
          rows: [
            { l: 'P₁', v: `${rP1.toFixed(4)} atm` },
            { l: 'V₁', v: `${rV1.toFixed(4)} L` },
            { l: 'P₂', v: `${rP2.toFixed(4)} atm` },
            { l: 'V₂', v: `${rV2.toFixed(4)} L` },
            { l: 'Solved for', v: solved },
          ],
          formula: "Boyle's Law: P₁V₁ = P₂V₂ (constant T, n)",
        }
      }
      case 'charles': {
        const V1 = g('cV1'), T1 = g('cT1'), V2 = g('cV2'), T2 = g('cT2')
        const vals = [V1, T1, V2, T2]
        const unknowns = vals.filter(isNaN).length
        if (unknowns !== 1) return { rows: [{ l: 'Info', v: 'Enter exactly 3 values' }] }
        let rV1 = V1, rT1 = T1, rV2 = V2, rT2 = T2, solved = ''
        if (isNaN(V1)) { rV1 = (V2 * T1) / T2; solved = 'V₁' }
        else if (isNaN(T1)) { rT1 = (V1 * T2) / V2; solved = 'T₁' }
        else if (isNaN(V2)) { rV2 = (V1 * T2) / T1; solved = 'V₂' }
        else { rT2 = (V2 * T1) / V1; solved = 'T₂' }
        return {
          rows: [
            { l: 'V₁', v: `${rV1.toFixed(4)} L` },
            { l: 'T₁', v: `${rT1.toFixed(2)} K (${(rT1 - 273.15).toFixed(2)} °C)` },
            { l: 'V₂', v: `${rV2.toFixed(4)} L` },
            { l: 'T₂', v: `${rT2.toFixed(2)} K (${(rT2 - 273.15).toFixed(2)} °C)` },
            { l: 'Solved for', v: solved },
          ],
          formula: "Charles's Law: V₁/T₁ = V₂/T₂ (constant P, n)",
        }
      }
      case 'gayLussac': {
        const P1 = g('gP1'), T1 = g('gT1'), P2 = g('gP2'), T2 = g('gT2')
        const vals = [P1, T1, P2, T2]
        const unknowns = vals.filter(isNaN).length
        if (unknowns !== 1) return { rows: [{ l: 'Info', v: 'Enter exactly 3 values' }] }
        let rP1 = P1, rT1 = T1, rP2 = P2, rT2 = T2, solved = ''
        if (isNaN(P1)) { rP1 = (P2 * T1) / T2; solved = 'P₁' }
        else if (isNaN(T1)) { rT1 = (P1 * T2) / P2; solved = 'T₁' }
        else if (isNaN(P2)) { rP2 = (P1 * T2) / T1; solved = 'P₂' }
        else { rT2 = (P2 * T1) / P1; solved = 'T₂' }
        return {
          rows: [
            { l: 'P₁', v: `${rP1.toFixed(4)} atm` },
            { l: 'T₁', v: `${rT1.toFixed(2)} K (${(rT1 - 273.15).toFixed(2)} °C)` },
            { l: 'P₂', v: `${rP2.toFixed(4)} atm` },
            { l: 'T₂', v: `${rT2.toFixed(2)} K (${(rT2 - 273.15).toFixed(2)} °C)` },
            { l: 'Solved for', v: solved },
          ],
          formula: "Gay-Lussac's Law: P₁/T₁ = P₂/T₂ (constant V, n)",
        }
      }
      case 'combined': {
        const P1 = g('xP1'), V1 = g('xV1'), T1 = g('xT1'), P2 = g('xP2'), V2 = g('xV2'), T2 = g('xT2')
        const vals = [P1, V1, T1, P2, V2, T2]
        const unknowns = vals.filter(isNaN).length
        if (unknowns !== 1) return { rows: [{ l: 'Info', v: 'Enter exactly 5 values, leave 1 empty' }] }
        let rP1 = P1, rV1 = V1, rT1 = T1, rP2 = P2, rV2 = V2, rT2 = T2, solved = ''
        const k = (p, v, t) => (p * v) / t
        if (isNaN(P1)) { rP1 = (P2 * V2 * T1) / (T2 * V1); solved = 'P₁' }
        else if (isNaN(V1)) { rV1 = (P2 * V2 * T1) / (P1 * T2); solved = 'V₁' }
        else if (isNaN(T1)) { rT1 = (P1 * V1 * T2) / (P2 * V2); solved = 'T₁' }
        else if (isNaN(P2)) { rP2 = (P1 * V1 * T2) / (T1 * V2); solved = 'P₂' }
        else if (isNaN(V2)) { rV2 = (P1 * V1 * T2) / (P2 * T1); solved = 'V₂' }
        else { rT2 = (P2 * V2 * T1) / (P1 * V1); solved = 'T₂' }
        return {
          rows: [
            { l: 'P₁', v: `${rP1.toFixed(4)} atm` },
            { l: 'V₁', v: `${rV1.toFixed(4)} L` },
            { l: 'T₁', v: `${rT1.toFixed(2)} K` },
            { l: 'P₂', v: `${rP2.toFixed(4)} atm` },
            { l: 'V₂', v: `${rV2.toFixed(4)} L` },
            { l: 'T₂', v: `${rT2.toFixed(2)} K` },
            { l: 'Solved for', v: solved },
          ],
          formula: "Combined: P₁V₁/T₁ = P₂V₂/T₂",
        }
      }
      case 'stp': {
        const n = g('stpN')
        if (isNaN(n) || n <= 0) return null
        const vol = n * 22.414
        const mass_air = n * 28.97
        return {
          rows: [
            { l: 'Moles', v: `${n.toFixed(6)} mol` },
            { l: 'Volume at STP', v: `${vol.toFixed(4)} L` },
            { l: 'Molecules', v: `${(n * 6.022e23).toExponential(4)}` },
            { l: 'STP Conditions', v: '0 °C (273.15 K), 1 atm' },
            { l: 'Molar volume', v: '22.414 L/mol' },
          ],
          formula: 'V = n × 22.414 L/mol at STP (0°C, 1 atm)',
        }
      }
      default: return null
    }
  }, [mode, inputs])

  const field = (key, label, placeholder) => (
    <div key={key}>
      <label className="text-xs text-gray-500 dark:text-gray-400">{label}</label>
      <input type="number" value={inputs[key] || ''} onChange={e => set(key, e.target.value)} step="any" placeholder={placeholder}
        className="w-full border rounded-lg px-3 py-2 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
    </div>
  )

  const renderInputs = () => {
    switch (mode) {
      case 'ideal': return <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">{field('P', 'Pressure (atm)', '1')}{field('V', 'Volume (L)', '22.4')}{field('n', 'Moles (mol)', '1')}{field('T', 'Temperature (K)', '273.15')}</div>
      case 'boyle': return <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">{field('P1', 'P₁ (atm)', '2')}{field('V1', 'V₁ (L)', '3')}{field('P2', 'P₂ (atm)', '1')}{field('V2', 'V₂ (L)', '')}</div>
      case 'charles': return <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">{field('cV1', 'V₁ (L)', '2')}{field('cT1', 'T₁ (K)', '300')}{field('cV2', 'V₂ (L)', '')}{field('cT2', 'T₂ (K)', '600')}</div>
      case 'gayLussac': return <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">{field('gP1', 'P₁ (atm)', '1.5')}{field('gT1', 'T₁ (K)', '300')}{field('gP2', 'P₂ (atm)', '')}{field('gT2', 'T₂ (K)', '450')}</div>
      case 'combined': return <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">{field('xP1', 'P₁ (atm)', '1')}{field('xV1', 'V₁ (L)', '5')}{field('xT1', 'T₁ (K)', '300')}{field('xP2', 'P₂ (atm)', '2')}{field('xV2', 'V₂ (L)', '')}{field('xT2', 'T₂ (K)', '400')}</div>
      case 'stp': return <div className="max-w-xs">{field('stpN', 'Moles of gas', '1')}</div>
      default: return null
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Gas Laws Calculator</h3>
        <div className="flex flex-wrap gap-2">
          {modes.map(m => (
            <button key={m.k} onClick={() => { setMode(m.k); setInputs({}) }}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${mode === m.k ? 'bg-purple-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}>
              {m.l}
            </button>
          ))}
        </div>
        {renderInputs()}
      </div>

      {results && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 space-y-3">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Results</h4>
          <div className="space-y-2">
            {results.rows.map((r, i) => (
              <div key={i} className="flex justify-between items-center bg-purple-50 dark:bg-purple-900/20 px-3 py-2 rounded-lg">
                <span className="text-sm text-gray-600 dark:text-gray-400">{r.l}</span>
                <span className="font-mono text-sm font-bold text-gray-900 dark:text-gray-100">{r.v}</span>
              </div>
            ))}
          </div>
          {results.formula && (
            <div className="text-xs bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg text-gray-500 dark:text-gray-400 font-mono">{results.formula}</div>
          )}
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">Gas Law Summary</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          {[
            { name: "Ideal Gas Law", eq: "PV = nRT", const: "None (general case)" },
            { name: "Boyle's Law", eq: "P₁V₁ = P₂V₂", const: "T, n constant" },
            { name: "Charles's Law", eq: "V₁/T₁ = V₂/T₂", const: "P, n constant" },
            { name: "Gay-Lussac's Law", eq: "P₁/T₁ = P₂/T₂", const: "V, n constant" },
            { name: "Combined Gas Law", eq: "P₁V₁/T₁ = P₂V₂/T₂", const: "n constant" },
            { name: "Avogadro's Law", eq: "V₁/n₁ = V₂/n₂", const: "P, T constant" },
          ].map(law => (
            <div key={law.name} className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
              <div className="font-medium text-gray-900 dark:text-gray-100">{law.name}</div>
              <div className="font-mono text-purple-700 dark:text-purple-400">{law.eq}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{law.const}</div>
            </div>
          ))}
        </div>
        <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
          R = 8.314 J/(mol·K) = 0.08206 L·atm/(mol·K) | STP: 0°C (273.15 K), 1 atm | Molar volume at STP: 22.414 L/mol
        </div>
      </div>
    </div>
  )
}
