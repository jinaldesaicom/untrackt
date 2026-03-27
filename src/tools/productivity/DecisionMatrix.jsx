import { useState, useMemo } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { getItem, setItem } from '../../utils/storage'

const STORAGE_KEY = 'untrackt_decision_matrix'

export default function DecisionMatrix() {
  const [data, setData] = useState(() => getItem(STORAGE_KEY, {
    criteria: [
      { id: 1, name: 'Cost', weight: 3 },
      { id: 2, name: 'Quality', weight: 4 },
      { id: 3, name: 'Speed', weight: 2 }
    ],
    options: [
      { id: 1, name: 'Option A' },
      { id: 2, name: 'Option B' }
    ],
    scores: {}
  }))

  const save = (d) => { setData(d); setItem(STORAGE_KEY, d) }

  const addCriterion = () => {
    const id = Date.now()
    save({ ...data, criteria: [...data.criteria, { id, name: '', weight: 3 }] })
  }

  const addOption = () => {
    const id = Date.now()
    save({ ...data, options: [...data.options, { id, name: '' }] })
  }

  const updateCriterion = (id, key, val) => save({ ...data, criteria: data.criteria.map(c => c.id === id ? { ...c, [key]: val } : c) })
  const updateOption = (id, name) => save({ ...data, options: data.options.map(o => o.id === id ? { ...o, name } : o) })
  const removeCriterion = (id) => save({ ...data, criteria: data.criteria.filter(c => c.id !== id) })
  const removeOption = (id) => save({ ...data, options: data.options.filter(o => o.id !== id) })

  const setScore = (optId, critId, val) => {
    const key = `${optId}-${critId}`
    save({ ...data, scores: { ...data.scores, [key]: val } })
  }

  const getScore = (optId, critId) => data.scores[`${optId}-${critId}`] ?? 0

  const results = useMemo(() => {
    return data.options.map(opt => {
      let total = 0
      let maxPossible = 0
      data.criteria.forEach(crit => {
        total += (getScore(opt.id, crit.id) || 0) * crit.weight
        maxPossible += 5 * crit.weight
      })
      return { ...opt, total, pct: maxPossible > 0 ? Math.round((total / maxPossible) * 100) : 0 }
    }).sort((a, b) => b.total - a.total)
  }, [data])

  const maxTotal = Math.max(...results.map(r => r.total), 1)

  return (
    <div className="space-y-5">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th className="text-left p-2 text-gray-500 dark:text-gray-400 font-medium text-xs min-w-[120px]">Criteria / Weight</th>
              {data.options.map(opt => (
                <th key={opt.id} className="p-2 min-w-[100px]">
                  <div className="flex items-center gap-1">
                    <input type="text" value={opt.name} onChange={e => updateOption(opt.id, e.target.value)} className="input-field text-xs text-center" placeholder="Option" />
                    {data.options.length > 1 && <button onClick={() => removeOption(opt.id)} className="text-gray-300 hover:text-red-500"><Trash2 className="w-3 h-3" /></button>}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {data.criteria.map(crit => (
              <tr key={crit.id} className="bg-white dark:bg-gray-900">
                <td className="p-2">
                  <div className="flex items-center gap-2">
                    <input type="text" value={crit.name} onChange={e => updateCriterion(crit.id, 'name', e.target.value)} className="input-field text-xs w-24" placeholder="Criterion" />
                    <select value={crit.weight} onChange={e => updateCriterion(crit.id, 'weight', Number(e.target.value))} className="input-field text-xs w-14">
                      {[1, 2, 3, 4, 5].map(w => <option key={w} value={w}>×{w}</option>)}
                    </select>
                    {data.criteria.length > 1 && <button onClick={() => removeCriterion(crit.id)} className="text-gray-300 hover:text-red-500"><Trash2 className="w-3 h-3" /></button>}
                  </div>
                </td>
                {data.options.map(opt => (
                  <td key={opt.id} className="p-2 text-center">
                    <div className="flex justify-center gap-0.5">
                      {[1, 2, 3, 4, 5].map(s => (
                        <button key={s} onClick={() => setScore(opt.id, crit.id, s)}
                          className={`w-6 h-6 rounded-full text-[10px] font-bold transition-colors ${getScore(opt.id, crit.id) >= s ? 'bg-indigo-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-400'}`}>
                          {s}
                        </button>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex gap-2">
        <button onClick={addCriterion} className="btn-secondary text-xs flex items-center gap-1"><Plus className="w-3 h-3" /> Criterion</button>
        <button onClick={addOption} className="btn-secondary text-xs flex items-center gap-1"><Plus className="w-3 h-3" /> Option</button>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Results</h3>
        {results.map((r, idx) => (
          <div key={r.id} className="flex items-center gap-3">
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${idx === 0 ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>{idx + 1}</span>
            <span className="text-sm font-medium text-gray-800 dark:text-gray-200 w-24 truncate">{r.name || 'Unnamed'}</span>
            <div className="flex-1 h-5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
              <div className={`h-full rounded-full transition-all ${idx === 0 ? 'bg-indigo-500' : 'bg-gray-400'}`} style={{ width: `${maxTotal > 0 ? (r.total / maxTotal) * 100 : 0}%` }} />
            </div>
            <span className="text-sm font-bold text-gray-900 dark:text-white w-12 text-right">{r.total}</span>
            <span className="text-xs text-gray-400 w-10 text-right">{r.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}
