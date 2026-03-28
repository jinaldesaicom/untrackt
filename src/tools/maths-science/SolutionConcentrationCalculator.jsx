import { useState, useMemo } from 'react'

export default function SolutionConcentrationCalculator() {
  const [mode, setMode] = useState('molarity')
  const [inputs, setInputs] = useState({})
  const set = (k, v) => setInputs(p => ({ ...p, [k]: v }))

  const modes = [
    { k: 'molarity', l: 'Molarity (M)' },
    { k: 'molality', l: 'Molality (m)' },
    { k: 'massPct', l: 'Mass Percent' },
    { k: 'dilution', l: 'Dilution (C₁V₁=C₂V₂)' },
    { k: 'ppm', l: 'PPM / PPB' },
  ]

  const results = useMemo(() => {
    const g = (k) => parseFloat(inputs[k])
    switch (mode) {
      case 'molarity': {
        const mass = g('mass'), mw = g('mw'), vol = g('vol')
        if ([mass, mw, vol].some(isNaN) || mw === 0 || vol === 0) return null
        const moles = mass / mw
        const molarity = moles / (vol / 1000)
        return {
          rows: [
            { l: 'Moles of solute', v: `${moles.toFixed(6)} mol` },
            { l: 'Volume', v: `${vol} mL = ${(vol / 1000).toFixed(4)} L` },
            { l: 'Molarity (M)', v: `${molarity.toFixed(6)} mol/L` },
          ],
          formula: 'M = (mass / molar mass) / volume(L) = n / V',
        }
      }
      case 'molality': {
        const moles = g('moles'), solventMass = g('solventMass')
        if ([moles, solventMass].some(isNaN) || solventMass === 0) return null
        const molality = moles / (solventMass / 1000)
        return {
          rows: [
            { l: 'Moles of solute', v: `${moles.toFixed(6)} mol` },
            { l: 'Solvent mass', v: `${solventMass} g = ${(solventMass / 1000).toFixed(4)} kg` },
            { l: 'Molality (m)', v: `${molality.toFixed(6)} mol/kg` },
          ],
          formula: 'm = moles of solute / mass of solvent (kg)',
        }
      }
      case 'massPct': {
        const soluteMass = g('soluteMass'), solnMass = g('solnMass')
        if ([soluteMass, solnMass].some(isNaN) || solnMass === 0) return null
        const pct = (soluteMass / solnMass) * 100
        return {
          rows: [
            { l: 'Solute mass', v: `${soluteMass} g` },
            { l: 'Solution mass', v: `${solnMass} g` },
            { l: 'Mass percent', v: `${pct.toFixed(4)}%` },
            { l: 'Mass fraction', v: (soluteMass / solnMass).toFixed(6) },
          ],
          formula: 'Mass % = (mass of solute / mass of solution) × 100',
        }
      }
      case 'dilution': {
        const c1 = g('c1'), v1 = g('v1'), c2 = g('c2'), v2 = g('v2')
        const known = [c1, v1, c2, v2]
        const unknown = known.filter(isNaN).length
        if (unknown !== 1) return { rows: [{ l: 'Info', v: 'Leave exactly one field empty to solve' }], formula: 'C₁V₁ = C₂V₂' }
        let rc1 = c1, rv1 = v1, rc2 = c2, rv2 = v2, solved = ''
        if (isNaN(c1)) { rc1 = (c2 * v2) / v1; solved = 'C₁' }
        else if (isNaN(v1)) { rv1 = (c2 * v2) / c1; solved = 'V₁' }
        else if (isNaN(c2)) { rc2 = (c1 * v1) / v2; solved = 'C₂' }
        else { rv2 = (c1 * v1) / c2; solved = 'V₂' }
        return {
          rows: [
            { l: 'C₁ (initial conc.)', v: `${rc1.toFixed(6)} M` },
            { l: 'V₁ (initial vol.)', v: `${rv1.toFixed(4)} mL` },
            { l: 'C₂ (final conc.)', v: `${rc2.toFixed(6)} M` },
            { l: 'V₂ (final vol.)', v: `${rv2.toFixed(4)} mL` },
            { l: 'Solved for', v: solved },
          ],
          formula: 'C₁V₁ = C₂V₂',
        }
      }
      case 'ppm': {
        const soluteMg = g('soluteMg'), solnL = g('solnL')
        if ([soluteMg, solnL].some(isNaN) || solnL === 0) return null
        const ppm = soluteMg / solnL
        const ppb = ppm * 1000
        const pct = ppm / 10000
        return {
          rows: [
            { l: 'Solute', v: `${soluteMg} mg` },
            { l: 'Solution volume', v: `${solnL} L` },
            { l: 'PPM (mg/L)', v: ppm.toFixed(4) },
            { l: 'PPB (μg/L)', v: ppb.toFixed(4) },
            { l: 'Percent', v: `${pct.toFixed(6)}%` },
          ],
          formula: 'ppm = mg solute / L solution',
        }
      }
      default: return null
    }
  }, [mode, inputs])

  const renderInputs = () => {
    const field = (key, label, placeholder) => (
      <div key={key}>
        <label className="text-xs text-gray-500 dark:text-gray-400">{label}</label>
        <input type="number" value={inputs[key] || ''} onChange={e => set(key, e.target.value)} step="any" placeholder={placeholder}
          className="w-full border rounded-lg px-3 py-2 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
      </div>
    )
    switch (mode) {
      case 'molarity': return <div className="grid grid-cols-3 gap-3">{field('mass', 'Mass of solute (g)', '5.85')}{field('mw', 'Molar mass (g/mol)', '58.44')}{field('vol', 'Volume (mL)', '500')}</div>
      case 'molality': return <div className="grid grid-cols-2 gap-3">{field('moles', 'Moles of solute', '0.5')}{field('solventMass', 'Solvent mass (g)', '500')}</div>
      case 'massPct': return <div className="grid grid-cols-2 gap-3">{field('soluteMass', 'Solute mass (g)', '10')}{field('solnMass', 'Solution mass (g)', '200')}</div>
      case 'dilution': return <div className="grid grid-cols-4 gap-3">{field('c1', 'C₁ (M)', '2')}{field('v1', 'V₁ (mL)', '50')}{field('c2', 'C₂ (M)', '0.5')}{field('v2', 'V₂ (mL)', '')}</div>
      case 'ppm': return <div className="grid grid-cols-2 gap-3">{field('soluteMg', 'Solute (mg)', '50')}{field('solnL', 'Solution vol. (L)', '1')}</div>
      default: return null
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Solution Concentration Calculator</h3>
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
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">Quick Reference</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b dark:border-gray-700">
              <th className="text-left py-1.5 text-gray-600 dark:text-gray-400">Unit</th>
              <th className="text-left py-1.5 text-gray-600 dark:text-gray-400">Formula</th>
              <th className="text-left py-1.5 text-gray-600 dark:text-gray-400">SI Units</th>
            </tr></thead>
            <tbody className="text-gray-700 dark:text-gray-300">
              <tr className="border-b dark:border-gray-700"><td className="py-1.5">Molarity</td><td className="font-mono">M = mol / L</td><td>mol/L</td></tr>
              <tr className="border-b dark:border-gray-700"><td className="py-1.5">Molality</td><td className="font-mono">m = mol / kg</td><td>mol/kg</td></tr>
              <tr className="border-b dark:border-gray-700"><td className="py-1.5">Mass %</td><td className="font-mono">(m_solute/m_soln)×100</td><td>%</td></tr>
              <tr className="border-b dark:border-gray-700"><td className="py-1.5">PPM</td><td className="font-mono">mg / L</td><td>mg/L</td></tr>
              <tr><td className="py-1.5">PPB</td><td className="font-mono">μg / L</td><td>μg/L</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
