import { useState, useEffect } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { getItem, setItem } from '../../utils/storage'

const STORAGE_KEY = 'untrackt_estimation_comparison'

export default function EstimationComparison() {
  const [items, setItems] = useState(() => getItem(STORAGE_KEY, [
    { id: 1, title: 'Example Story', estimated: 5, actual: 8 },
  ]))

  useEffect(() => { setItem(STORAGE_KEY, items) }, [items])

  const addItem = () => setItems(prev => [...prev, { id: Date.now(), title: '', estimated: 0, actual: 0 }])
  const removeItem = (id) => setItems(prev => prev.filter(i => i.id !== id))
  const updateItem = (id, key, val) => setItems(prev => prev.map(i => i.id === id ? { ...i, [key]: val } : i))

  const validItems = items.filter(i => i.estimated > 0 && i.actual > 0)
  const totalEstimated = validItems.reduce((s, i) => s + i.estimated, 0)
  const totalActual = validItems.reduce((s, i) => s + i.actual, 0)
  const avgVariance = validItems.length > 0
    ? Math.round(validItems.reduce((s, i) => s + ((i.actual - i.estimated) / i.estimated) * 100, 0) / validItems.length)
    : 0
  const accuracy = totalEstimated > 0 ? Math.round((1 - Math.abs(totalActual - totalEstimated) / totalEstimated) * 100) : 0

  const overEstimated = validItems.filter(i => i.estimated > i.actual).length
  const underEstimated = validItems.filter(i => i.actual > i.estimated).length
  const onTarget = validItems.filter(i => i.actual === i.estimated).length

  const chartMax = Math.max(...items.map(i => Math.max(i.estimated, i.actual)), 1)

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="rounded-xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 p-3 text-center">
          <p className="text-[10px] text-indigo-600 dark:text-indigo-400 font-medium">Accuracy</p>
          <p className="text-xl font-bold text-indigo-700 dark:text-indigo-300">{accuracy}%</p>
        </div>
        <div className="rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-3 text-center">
          <p className="text-[10px] text-amber-600 dark:text-amber-400 font-medium">Avg Variance</p>
          <p className="text-xl font-bold text-amber-700 dark:text-amber-300">{avgVariance > 0 ? '+' : ''}{avgVariance}%</p>
        </div>
        <div className="rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-3 text-center">
          <p className="text-[10px] text-green-600 dark:text-green-400 font-medium">On Target</p>
          <p className="text-xl font-bold text-green-700 dark:text-green-300">{onTarget}</p>
        </div>
        <div className="rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-3 text-center">
          <p className="text-[10px] text-gray-500 dark:text-gray-400 font-medium">Over / Under</p>
          <p className="text-xl font-bold text-gray-700 dark:text-gray-300">{overEstimated} / {underEstimated}</p>
        </div>
      </div>

      {validItems.length > 1 && (
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
          <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">Estimate vs Actual</h3>
          <div className="flex items-end gap-2 h-28">
            {items.filter(i => i.estimated > 0 || i.actual > 0).map(i => (
              <div key={i.id} className="flex-1 flex items-end gap-0.5 group" title={`${i.title || 'Story'}: Est ${i.estimated}, Act ${i.actual}`}>
                <div className="flex-1 bg-blue-200 dark:bg-blue-800 rounded-t"
                  style={{ height: `${(i.estimated / chartMax) * 100}%`, minHeight: i.estimated > 0 ? '4px' : '0' }} />
                <div className={`flex-1 rounded-t ${i.actual > i.estimated ? 'bg-red-400 dark:bg-red-700' : i.actual < i.estimated ? 'bg-green-400 dark:bg-green-700' : 'bg-blue-500 dark:bg-blue-400'}`}
                  style={{ height: `${(i.actual / chartMax) * 100}%`, minHeight: i.actual > 0 ? '4px' : '0' }} />
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-2 justify-center">
            <span className="flex items-center gap-1 text-[10px] text-gray-500"><span className="w-2 h-2 rounded bg-blue-200 dark:bg-blue-800" /> Estimated</span>
            <span className="flex items-center gap-1 text-[10px] text-gray-500"><span className="w-2 h-2 rounded bg-red-400 dark:bg-red-700" /> Actual (over)</span>
            <span className="flex items-center gap-1 text-[10px] text-gray-500"><span className="w-2 h-2 rounded bg-green-400 dark:bg-green-700" /> Actual (under)</span>
          </div>
        </div>
      )}

      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Stories</h3>
          <button onClick={addItem} className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1">
            <Plus className="w-3 h-3" /> Add Story
          </button>
        </div>
        <div className="space-y-2">
          {items.map(i => {
            const variance = i.estimated > 0 ? Math.round(((i.actual - i.estimated) / i.estimated) * 100) : 0
            return (
              <div key={i.id} className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 rounded-lg px-3 py-2">
                <input type="text" value={i.title} onChange={e => updateItem(i.id, 'title', e.target.value)}
                  className="flex-1 min-w-0 bg-transparent text-sm text-gray-900 dark:text-white outline-none" placeholder="Story title" />
                <div className="flex items-center gap-1">
                  <label className="text-[10px] text-gray-400">Est:</label>
                  <input type="number" min="0" value={i.estimated}
                    onChange={e => updateItem(i.id, 'estimated', Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-14 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded px-2 py-0.5 text-xs text-center" />
                </div>
                <div className="flex items-center gap-1">
                  <label className="text-[10px] text-gray-400">Act:</label>
                  <input type="number" min="0" value={i.actual}
                    onChange={e => updateItem(i.id, 'actual', Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-14 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded px-2 py-0.5 text-xs text-center" />
                </div>
                <span className={`text-xs font-medium w-12 text-center ${variance > 0 ? 'text-red-500' : variance < 0 ? 'text-green-500' : 'text-gray-400'}`}>
                  {i.estimated > 0 ? `${variance > 0 ? '+' : ''}${variance}%` : '—'}
                </span>
                <button onClick={() => removeItem(i.id)} className="text-gray-300 hover:text-red-500 shrink-0">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
