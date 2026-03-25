import { useMemo, useState } from 'react'
import { conversionCategories, unitConversions } from '../../data/unitConversions.js'

export default function UnitConverter() {
  const [category, setCategory] = useState('length')
  const [fromUnit, setFromUnit] = useState('km')
  const [toUnit, setToUnit] = useState('mi')
  const [fromValue, setFromValue] = useState('1')
  const [toValue, setToValue] = useState('')

  const config = unitConversions[category]
  const unitKeys = Object.keys(config.units)

  const convert = (value, from, to) => {
    const num = Number(value)
    if (!Number.isFinite(num)) return ''
    const base = config.units[from].toBase(num)
    return config.units[to].fromBase(base)
  }

  const computed = useMemo(() => convert(fromValue, fromUnit, toUnit), [fromValue, fromUnit, toUnit, category])

  const onChangeTo = (next) => {
    setToValue(next)
    const back = convert(next, toUnit, fromUnit)
    setFromValue(back === '' ? '' : String(back))
  }

  const quick = [
    { label: 'km↔mi', category: 'length', from: 'km', to: 'mi', value: '1' },
    { label: 'kg↔lb', category: 'mass', from: 'kg', to: 'lb', value: '1' },
    { label: '°C↔°F', category: 'temperature', from: 'c', to: 'f', value: '20' },
    { label: 'L↔gal', category: 'volume', from: 'l', to: 'gal', value: '1' },
  ]

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {conversionCategories.map((c) => (
          <button
            key={c.id}
            className={category === c.id ? 'btn-primary' : 'btn-secondary'}
            onClick={() => {
              setCategory(c.id)
              const units = Object.keys(unitConversions[c.id].units)
              setFromUnit(units[0])
              setToUnit(units[1] || units[0])
            }}
          >
            {c.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <input value={fromValue} onChange={(e) => setFromValue(e.target.value)} className="input-field" />
        <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)} className="input-field">
          {unitKeys.map((u) => <option key={u} value={u}>{config.units[u].name}</option>)}
        </select>
        <select value={toUnit} onChange={(e) => setToUnit(e.target.value)} className="input-field">
          {unitKeys.map((u) => <option key={u} value={u}>{config.units[u].name}</option>)}
        </select>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-4">
        <p className="text-sm text-gray-500">Converted result</p>
        <p className="text-2xl font-bold">{computed === '' ? 'N/A' : computed}</p>
        <p className="text-sm text-gray-500 mt-2">Formula: 1 {fromUnit} = {convert(1, fromUnit, toUnit)} {toUnit}</p>
      </div>

      <div>
        <label className="text-sm text-gray-600">Bidirectional input</label>
        <input value={toValue} onChange={(e) => onChangeTo(e.target.value)} className="input-field mt-1" placeholder="Edit output side to reverse-calculate" />
      </div>

      <div className="flex flex-wrap gap-2">
        {quick.map((chip) => (
          <button
            key={chip.label}
            className="btn-secondary"
            onClick={() => {
              setCategory(chip.category)
              setFromUnit(chip.from)
              setToUnit(chip.to)
              setFromValue(chip.value)
            }}
          >
            {chip.label}
          </button>
        ))}
      </div>
    </div>
  )
}
