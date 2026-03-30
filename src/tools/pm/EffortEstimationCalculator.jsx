import { useState, useEffect } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { getItem, setItem } from '../../utils/storage'

const STORAGE_KEY = 'untrackt_effort_estimation'

function emptyTask() {
  return { id: Date.now(), name: '', hours: '' }
}

export default function EffortEstimationCalculator() {
  const [tasks, setTasks] = useState(() => getItem(STORAGE_KEY + '_tasks', []))
  const [buffer, setBuffer] = useState(() => getItem(STORAGE_KEY + '_buffer', 20))

  useEffect(() => { setItem(STORAGE_KEY + '_tasks', tasks) }, [tasks])
  useEffect(() => { setItem(STORAGE_KEY + '_buffer', buffer) }, [buffer])

  const add = () => setTasks(prev => [...prev, emptyTask()])
  const remove = (id) => setTasks(prev => prev.filter(t => t.id !== id))
  const update = (id, key, val) => setTasks(prev => prev.map(t => t.id === id ? { ...t, [key]: val } : t))

  const totalHours = tasks.reduce((s, t) => s + (parseFloat(t.hours) || 0), 0)
  const bufferHours = totalHours * (buffer / 100)
  const grandTotal = totalHours + bufferHours

  return (
    <div className="space-y-5">
      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Tasks', value: tasks.length },
          { label: 'Raw Hours', value: totalHours.toFixed(1) },
          { label: `Buffer (${buffer}%)`, value: bufferHours.toFixed(1) },
          { label: 'Total Effort', value: grandTotal.toFixed(1) + ' h', highlight: true },
        ].map(c => (
          <div key={c.label} className={`rounded-xl border p-3 text-center ${c.highlight ? 'border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-900/20' : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900'}`}>
            <div className={`text-lg font-bold ${c.highlight ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-800 dark:text-gray-200'}`}>{c.value}</div>
            <div className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wide mt-0.5">{c.label}</div>
          </div>
        ))}
      </div>

      {/* Buffer slider */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Buffer Adjustment</label>
          <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">{buffer}%</span>
        </div>
        <input type="range" min={0} max={100} value={buffer} onChange={(e) => setBuffer(Number(e.target.value))} className="w-full accent-indigo-500" />
      </div>

      {/* Tasks */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500 dark:text-gray-400">{tasks.length} task{tasks.length !== 1 ? 's' : ''}</span>
        <button onClick={add} className="btn-primary flex items-center gap-1.5 text-sm"><Plus className="w-4 h-4" /> Add Task</button>
      </div>

      <div className="space-y-2">
        {tasks.map((t, i) => (
          <div key={t.id} className="flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-2">
            <span className="text-xs text-gray-400 w-5 text-right">{i + 1}</span>
            <input value={t.name} onChange={(e) => update(t.id, 'name', e.target.value)} placeholder="Task name" className="flex-1 min-w-[120px] bg-transparent border-b border-transparent focus:border-indigo-400 outline-none text-sm text-gray-800 dark:text-gray-200 placeholder:text-gray-400" />
            <input type="number" min={0} step={0.5} value={t.hours} onChange={(e) => update(t.id, 'hours', e.target.value)} placeholder="Hours" className="w-20 text-center bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-2 py-1 text-sm text-gray-700 dark:text-gray-300" />
            <button onClick={() => remove(t.id)} className="text-red-400 hover:text-red-600 p-1"><Trash2 className="w-3.5 h-3.5" /></button>
          </div>
        ))}
      </div>

      {tasks.length === 0 && (
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-8 text-center text-sm text-gray-400">
          Add tasks with estimated hours to calculate total effort.
        </div>
      )}
    </div>
  )
}
