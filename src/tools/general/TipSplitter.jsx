import { useRef, useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { formatCurrency, getCurrencySymbol } from '../../utils/currency.js'

export default function TipSplitter() {
  const [bill, setBill] = useState('85.00')
  const [tip, setTip] = useState(18)
  const [people, setPeople] = useState(4)
  const [customMode, setCustomMode] = useState(false)
  const [customSplits, setCustomSplits] = useState([
    { id: 1, name: 'Person 1', pct: 25 },
    { id: 2, name: 'Person 2', pct: 25 },
    { id: 3, name: 'Person 3', pct: 25 },
    { id: 4, name: 'Person 4', pct: 25 },
  ])
  const nextId = useRef(5)

  const billAmt = parseFloat(bill) || 0
  const tipAmt = billAmt * (tip / 100)
  const total = billAmt + tipAmt
  const perPerson = people > 0 ? total / people : 0

  const totalCustomPct = customSplits.reduce((s, p) => s + p.pct, 0)

  const fmt = (n) => formatCurrency(n, { minimumFractionDigits: 2 })

  const addPerson = () => {
    setCustomSplits((cs) => [...cs, { id: nextId.current++, name: `Person ${cs.length + 1}`, pct: 0 }])
  }

  const updateSplit = (id, field, value) => {
    setCustomSplits((cs) => cs.map((p) => p.id === id ? { ...p, [field]: value } : p))
  }

  const removeSplit = (id) => setCustomSplits((cs) => cs.filter((p) => p.id !== id))

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Bill Amount ({getCurrencySymbol()})</label>
          <input type="number" value={bill} onChange={(e) => setBill(e.target.value)} className="input-field" min="0" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Number of People</label>
          <input type="number" value={people} onChange={(e) => setPeople(Math.max(1, parseInt(e.target.value) || 1))} className="input-field" min="1" />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm font-medium text-gray-700">Tip %</label>
            <span className="text-sm font-bold text-indigo-600">{tip}%</span>
          </div>
          <input
            type="range" min="0" max="30" value={tip}
            onChange={(e) => setTip(Number(e.target.value))}
            className="w-full accent-indigo-600 mt-1"
          />
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Tip Amount', value: fmt(tipAmt) },
          { label: 'Total Bill', value: fmt(total) },
          { label: 'Per Person', value: fmt(perPerson) },
        ].map((item) => (
          <div key={item.label} className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 text-center">
            <p className="text-xs text-gray-500 mb-1">{item.label}</p>
            <p className="text-xl font-bold text-indigo-700">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Custom split toggle */}
      <div>
        <button
          onClick={() => setCustomMode((m) => !m)}
          className="text-sm text-indigo-600 hover:underline font-medium"
        >
          {customMode ? '← Back to equal split' : 'Custom split by person →'}
        </button>
      </div>

      {customMode && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-700">Custom Split</h3>
            <span className={`text-xs font-medium ${totalCustomPct === 100 ? 'text-green-600' : 'text-red-500'}`}>
              Total: {totalCustomPct}% {totalCustomPct !== 100 ? `(${100 - totalCustomPct > 0 ? '+' : ''}${totalCustomPct - 100}% off)` : '✓'}
            </span>
          </div>
          {customSplits.map((p) => (
            <div key={p.id} className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg p-3">
              <input
                type="text"
                value={p.name}
                onChange={(e) => updateSplit(p.id, 'name', e.target.value)}
                className="input-field flex-1"
                placeholder="Name"
              />
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  value={p.pct}
                  onChange={(e) => updateSplit(p.id, 'pct', parseFloat(e.target.value) || 0)}
                  className="input-field w-20 text-center"
                  min="0" max="100" step="0.5"
                />
                <span className="text-sm text-gray-500">%</span>
              </div>
              <span className="text-sm font-semibold text-indigo-700 w-20 text-right">{fmt(total * p.pct / 100)}</span>
              <button onClick={() => removeSplit(p.id)} className="text-gray-400 hover:text-red-500 p-1">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
          <button onClick={addPerson} className="btn-secondary flex items-center gap-1.5">
            <Plus className="w-4 h-4" /> Add Person
          </button>
        </div>
      )}
    </div>
  )
}
