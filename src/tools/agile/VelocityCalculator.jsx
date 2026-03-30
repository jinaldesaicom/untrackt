import { useState, useEffect } from 'react'
import { Plus, Trash2, TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { getItem, setItem } from '../../utils/storage'

const STORAGE_KEY = 'untrackt_velocity_calc'

export default function VelocityCalculator() {
  const [sprints, setSprints] = useState(() => getItem(STORAGE_KEY, [
    { id: 1, name: 'Sprint 1', committed: 20, completed: 18 },
    { id: 2, name: 'Sprint 2', committed: 22, completed: 21 },
    { id: 3, name: 'Sprint 3', committed: 25, completed: 23 },
  ]))

  useEffect(() => { setItem(STORAGE_KEY, sprints) }, [sprints])

  const addSprint = () => {
    const num = sprints.length + 1
    setSprints(prev => [...prev, { id: Date.now(), name: `Sprint ${num}`, committed: 0, completed: 0 }])
  }

  const removeSprint = (id) => setSprints(prev => prev.filter(s => s.id !== id))
  const updateSprint = (id, key, val) => setSprints(prev => prev.map(s => s.id === id ? { ...s, [key]: val } : s))

  const completedValues = sprints.map(s => s.completed).filter(v => v > 0)
  const avgVelocity = completedValues.length > 0 ? Math.round(completedValues.reduce((a, b) => a + b, 0) / completedValues.length * 10) / 10 : 0
  const minVelocity = completedValues.length > 0 ? Math.min(...completedValues) : 0
  const maxVelocity = completedValues.length > 0 ? Math.max(...completedValues) : 0

  const last3 = completedValues.slice(-3)
  const rollingAvg = last3.length > 0 ? Math.round(last3.reduce((a, b) => a + b, 0) / last3.length * 10) / 10 : 0

  const commitmentRate = sprints.length > 0
    ? Math.round(sprints.filter(s => s.committed > 0).reduce((sum, s) => sum + (s.completed / s.committed) * 100, 0) / sprints.filter(s => s.committed > 0).length || 0)
    : 0

  const trend = completedValues.length >= 2
    ? completedValues[completedValues.length - 1] - completedValues[completedValues.length - 2]
    : 0

  const chartMax = Math.max(...sprints.map(s => Math.max(s.committed, s.completed)), 1)

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="rounded-xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 p-3 text-center">
          <p className="text-[10px] text-indigo-600 dark:text-indigo-400 font-medium">Avg Velocity</p>
          <p className="text-xl font-bold text-indigo-700 dark:text-indigo-300">{avgVelocity}</p>
        </div>
        <div className="rounded-xl bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-200 dark:border-cyan-800 p-3 text-center">
          <p className="text-[10px] text-cyan-600 dark:text-cyan-400 font-medium">Rolling (3)</p>
          <p className="text-xl font-bold text-cyan-700 dark:text-cyan-300">{rollingAvg}</p>
        </div>
        <div className="rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-3 text-center">
          <p className="text-[10px] text-green-600 dark:text-green-400 font-medium">Min / Max</p>
          <p className="text-xl font-bold text-green-700 dark:text-green-300">{minVelocity} / {maxVelocity}</p>
        </div>
        <div className="rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-3 text-center">
          <p className="text-[10px] text-amber-600 dark:text-amber-400 font-medium">Commitment %</p>
          <p className="text-xl font-bold text-amber-700 dark:text-amber-300">{commitmentRate}%</p>
        </div>
        <div className="rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-3 text-center">
          <p className="text-[10px] text-gray-500 dark:text-gray-400 font-medium">Trend</p>
          <div className="flex items-center justify-center gap-1">
            {trend > 0 ? <TrendingUp className="w-4 h-4 text-green-500" /> : trend < 0 ? <TrendingDown className="w-4 h-4 text-red-500" /> : <Minus className="w-4 h-4 text-gray-400" />}
            <p className={`text-xl font-bold ${trend > 0 ? 'text-green-600' : trend < 0 ? 'text-red-600' : 'text-gray-500'}`}>{trend > 0 ? '+' : ''}{trend}</p>
          </div>
        </div>
      </div>

      {sprints.length > 0 && (
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
          <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">Velocity Chart</h3>
          <div className="flex items-end gap-1 h-32">
            {sprints.map(s => (
              <div key={s.id} className="flex-1 flex items-end gap-0.5 group" title={`${s.name}: ${s.completed}/${s.committed}`}>
                <div className="flex-1 bg-indigo-200 dark:bg-indigo-800 rounded-t transition-all group-hover:bg-indigo-300"
                  style={{ height: `${(s.committed / chartMax) * 100}%`, minHeight: s.committed > 0 ? '4px' : '0' }} />
                <div className="flex-1 bg-indigo-500 dark:bg-indigo-400 rounded-t transition-all group-hover:bg-indigo-600"
                  style={{ height: `${(s.completed / chartMax) * 100}%`, minHeight: s.completed > 0 ? '4px' : '0' }} />
              </div>
            ))}
          </div>
          <div className="flex gap-1 mt-1">
            {sprints.map(s => (
              <div key={s.id} className="flex-1 text-center">
                <p className="text-[9px] text-gray-400 truncate">{s.name}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-2 justify-center">
            <span className="flex items-center gap-1 text-[10px] text-gray-500"><span className="w-2 h-2 rounded bg-indigo-200 dark:bg-indigo-800" /> Committed</span>
            <span className="flex items-center gap-1 text-[10px] text-gray-500"><span className="w-2 h-2 rounded bg-indigo-500 dark:bg-indigo-400" /> Completed</span>
          </div>
        </div>
      )}

      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Sprint Data</h3>
          <button onClick={addSprint} className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1">
            <Plus className="w-3 h-3" /> Add Sprint
          </button>
        </div>
        <div className="space-y-2">
          {sprints.map(s => (
            <div key={s.id} className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 rounded-lg px-3 py-2">
              <input type="text" value={s.name} onChange={e => updateSprint(s.id, 'name', e.target.value)}
                className="flex-1 min-w-0 bg-transparent text-sm text-gray-900 dark:text-white outline-none" placeholder="Sprint name" />
              <div className="flex items-center gap-1">
                <label className="text-[10px] text-gray-400">Committed:</label>
                <input type="number" min="0" value={s.committed} onChange={e => updateSprint(s.id, 'committed', Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-16 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded px-2 py-0.5 text-xs text-center" />
              </div>
              <div className="flex items-center gap-1">
                <label className="text-[10px] text-gray-400">Completed:</label>
                <input type="number" min="0" value={s.completed} onChange={e => updateSprint(s.id, 'completed', Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-16 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded px-2 py-0.5 text-xs text-center" />
              </div>
              <button onClick={() => removeSprint(s.id)} className="text-gray-300 hover:text-red-500 shrink-0">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
