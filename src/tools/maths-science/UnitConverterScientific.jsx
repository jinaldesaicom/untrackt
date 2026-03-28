import { useState, useMemo } from 'react'

const categories = {
  length: {
    label: 'Length',
    units: { m: 1, km: 1000, cm: 0.01, mm: 0.001, μm: 1e-6, nm: 1e-9, pm: 1e-12, Å: 1e-10, mi: 1609.344, ft: 0.3048, in: 0.0254, yd: 0.9144, 'light-year': 9.461e15, AU: 1.496e11, parsec: 3.086e16 },
  },
  mass: {
    label: 'Mass',
    units: { kg: 1, g: 0.001, mg: 1e-6, μg: 1e-9, ng: 1e-12, lb: 0.453592, oz: 0.0283495, 'metric ton': 1000, amu: 1.66054e-27, slug: 14.5939 },
  },
  time: {
    label: 'Time',
    units: { s: 1, ms: 0.001, μs: 1e-6, ns: 1e-9, ps: 1e-12, min: 60, hr: 3600, day: 86400, week: 604800, year: 3.156e7 },
  },
  temperature: {
    label: 'Temperature',
    units: { '°C': 'special', '°F': 'special', K: 'special', '°R': 'special' },
  },
  energy: {
    label: 'Energy',
    units: { J: 1, kJ: 1000, cal: 4.184, kcal: 4184, eV: 1.602e-19, keV: 1.602e-16, MeV: 1.602e-13, BTU: 1055.06, 'kWh': 3.6e6, erg: 1e-7 },
  },
  pressure: {
    label: 'Pressure',
    units: { Pa: 1, kPa: 1000, MPa: 1e6, atm: 101325, bar: 100000, psi: 6894.76, torr: 133.322, mmHg: 133.322 },
  },
  force: {
    label: 'Force',
    units: { N: 1, kN: 1000, dyn: 1e-5, lbf: 4.44822, kgf: 9.80665 },
  },
  volume: {
    label: 'Volume',
    units: { L: 1, mL: 0.001, 'cm³': 0.001, 'm³': 1000, gal: 3.78541, qt: 0.946353, 'fl oz': 0.0295735, 'ft³': 28.3168 },
  },
  speed: {
    label: 'Speed',
    units: { 'm/s': 1, 'km/h': 0.277778, 'mi/h': 0.44704, 'ft/s': 0.3048, knot: 0.514444, c: 299792458 },
  },
  frequency: {
    label: 'Frequency',
    units: { Hz: 1, kHz: 1000, MHz: 1e6, GHz: 1e9, THz: 1e12, rpm: 1/60 },
  },
}

function convertTemp(value, from, to) {
  let celsius
  switch (from) {
    case '°C': celsius = value; break
    case '°F': celsius = (value - 32) * 5/9; break
    case 'K': celsius = value - 273.15; break
    case '°R': celsius = (value - 491.67) * 5/9; break
    default: return NaN
  }
  switch (to) {
    case '°C': return celsius
    case '°F': return celsius * 9/5 + 32
    case 'K': return celsius + 273.15
    case '°R': return (celsius + 273.15) * 9/5
    default: return NaN
  }
}

export default function UnitConverterScientific() {
  const [category, setCategory] = useState('length')
  const [fromUnit, setFromUnit] = useState('m')
  const [toUnit, setToUnit] = useState('km')
  const [value, setValue] = useState('1')

  const cat = categories[category]
  const units = Object.keys(cat.units)

  const result = useMemo(() => {
    const v = parseFloat(value)
    if (isNaN(v)) return null
    if (category === 'temperature') {
      return convertTemp(v, fromUnit, toUnit)
    }
    const fromFactor = cat.units[fromUnit]
    const toFactor = cat.units[toUnit]
    return (v * fromFactor) / toFactor
  }, [value, fromUnit, toUnit, category, cat])

  const allConversions = useMemo(() => {
    const v = parseFloat(value)
    if (isNaN(v)) return []
    return units.map(u => {
      let converted
      if (category === 'temperature') {
        converted = convertTemp(v, fromUnit, u)
      } else {
        converted = (v * cat.units[fromUnit]) / cat.units[u]
      }
      return { unit: u, value: converted }
    })
  }, [value, fromUnit, category, units, cat])

  const fmtNum = (n) => {
    if (Math.abs(n) < 0.001 || Math.abs(n) > 1e9) return n.toExponential(6)
    return n.toLocaleString(undefined, { maximumFractionDigits: 8 })
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Scientific Unit Converter</h3>
        <div className="flex flex-wrap gap-2">
          {Object.entries(categories).map(([k, v]) => (
            <button key={k} onClick={() => { setCategory(k); setFromUnit(Object.keys(v.units)[0]); setToUnit(Object.keys(v.units)[1]); setValue('1') }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${category === k ? 'bg-purple-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}>
              {v.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
          <div>
            <label className="text-xs text-gray-500 dark:text-gray-400">Value</label>
            <input type="number" value={value} onChange={e => setValue(e.target.value)} step="any"
              className="w-full border rounded-lg px-3 py-2 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
          </div>
          <div>
            <label className="text-xs text-gray-500 dark:text-gray-400">From</label>
            <select value={fromUnit} onChange={e => setFromUnit(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200">
              {units.map(u => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-500 dark:text-gray-400">To</label>
            <select value={toUnit} onChange={e => setToUnit(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200">
              {units.map(u => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>
        </div>

        {result !== null && (
          <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl text-center">
            <div className="text-sm text-gray-500 dark:text-gray-400">{value} {fromUnit} =</div>
            <div className="text-2xl font-bold font-mono text-purple-700 dark:text-purple-300">{fmtNum(result)} {toUnit}</div>
          </div>
        )}

        <button onClick={() => { const t = fromUnit; setFromUnit(toUnit); setToUnit(t) }}
          className="px-4 py-2 rounded-lg text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600">
          ⇄ Swap Units
        </button>
      </div>

      {allConversions.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">All {cat.label} Conversions</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {allConversions.map(c => (
              <div key={c.unit} className={`flex justify-between px-3 py-2 rounded-lg text-sm ${c.unit === toUnit ? 'bg-purple-100 dark:bg-purple-900/30' : 'bg-gray-50 dark:bg-gray-700/50'}`}>
                <span className="text-gray-600 dark:text-gray-400">{c.unit}</span>
                <span className="font-mono font-bold text-gray-900 dark:text-gray-100">{fmtNum(c.value)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
