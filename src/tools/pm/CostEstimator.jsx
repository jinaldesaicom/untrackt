import { useState, useEffect } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { getItem, setItem } from '../../utils/storage'

const STORAGE_KEY = 'untrackt_cost_estimator'

function emptyLineItem() {
  return { id: Date.now(), name: '', type: 'variable', hours: '', rate: '', fixedCost: '' }
}

export default function CostEstimator() {
  const [items, setItems] = useState(() => getItem(STORAGE_KEY, []))

  useEffect(() => { setItem(STORAGE_KEY, items) }, [items])

  const add = () => setItems(prev => [...prev, emptyLineItem()])
  const remove = (id) => setItems(prev => prev.filter(i => i.id !== id))
  const update = (id, key, val) => setItems(prev => prev.map(i => i.id === id ? { ...i, [key]: val } : i))

  const variableItems = items.filter(i => i.type === 'variable')
  const fixedItems = items.filter(i => i.type === 'fixed')

  const variableCost = variableItems.reduce((s, i) => s + (parseFloat(i.hours) || 0) * (parseFloat(i.rate) || 0), 0)
  const fixedCost = fixedItems.reduce((s, i) => s + (parseFloat(i.fixedCost) || 0), 0)
  const totalCost = variableCost + fixedCost

  const fmt = (n) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 })

  return (
    <div className="space-y-5">
      {/* Summary */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Variable Cost', value: fmt(variableCost) },
          { label: 'Fixed Cost', value: fmt(fixedCost) },
          { label: 'Total Project Cost', value: fmt(totalCost), highlight: true },
        ].map(c => (
          <div key={c.label} className={`rounded-xl border p-3 text-center ${c.highlight ? 'border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-900/20' : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900'}`}>
            <div className={`text-lg font-bold ${c.highlight ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-800 dark:text-gray-200'}`}>{c.value}</div>
            <div className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wide mt-0.5">{c.label}</div>
          </div>
        ))}
      </div>

      {/* Line items */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500 dark:text-gray-400">{items.length} line item{items.length !== 1 ? 's' : ''}</span>
        <button onClick={add} className="btn-primary flex items-center gap-1.5 text-sm"><Plus className="w-4 h-4" /> Add Line Item</button>
      </div>

      <div className="space-y-2">
        {items.map(item => (
          <div key={item.id} className="flex flex-wrap items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-2">
            <select value={item.type} onChange={(e) => update(item.id, 'type', e.target.value)} className="text-xs bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-2 py-1 text-gray-700 dark:text-gray-300">
              <option value="variable">Variable (Rate × Hours)</option>
              <option value="fixed">Fixed Cost</option>
            </select>
            <input value={item.name} onChange={(e) => update(item.id, 'name', e.target.value)} placeholder="Description" className="flex-1 min-w-[120px] bg-transparent border-b border-transparent focus:border-indigo-400 outline-none text-sm text-gray-800 dark:text-gray-200 placeholder:text-gray-400" />
            {item.type === 'variable' ? (
              <>
                <input type="number" min={0} step={0.5} value={item.hours} onChange={(e) => update(item.id, 'hours', e.target.value)} placeholder="Hours" className="w-20 text-center bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-2 py-1 text-sm text-gray-700 dark:text-gray-300" />
                <span className="text-gray-400 text-xs">×</span>
                <input type="number" min={0} step={1} value={item.rate} onChange={(e) => update(item.id, 'rate', e.target.value)} placeholder="$/hr" className="w-20 text-center bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-2 py-1 text-sm text-gray-700 dark:text-gray-300" />
                <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 w-20 text-right">{fmt((parseFloat(item.hours) || 0) * (parseFloat(item.rate) || 0))}</span>
              </>
            ) : (
              <input type="number" min={0} value={item.fixedCost} onChange={(e) => update(item.id, 'fixedCost', e.target.value)} placeholder="Amount" className="w-28 text-center bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-2 py-1 text-sm text-gray-700 dark:text-gray-300" />
            )}
            <button onClick={() => remove(item.id)} className="text-red-400 hover:text-red-600 p-1"><Trash2 className="w-3.5 h-3.5" /></button>
          </div>
        ))}
      </div>

      {items.length === 0 && (
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-8 text-center text-sm text-gray-400">
          Add fixed and variable cost items to estimate project cost.
        </div>
      )}
    </div>
  )
}
