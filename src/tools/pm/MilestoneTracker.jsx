import { useState, useEffect } from 'react'
import { Plus, Trash2, Flag, CheckCircle, Clock } from 'lucide-react'
import { getItem, setItem } from '../../utils/storage'

const STORAGE_KEY = 'untrackt_milestone_tracker'

function emptyMilestone() {
  return { id: Date.now(), name: '', dueDate: '', status: 'pending', notes: '' }
}

const STATUSES = [
  { value: 'pending', label: 'Pending', icon: Clock, color: 'text-amber-500', bg: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300' },
  { value: 'done', label: 'Done', icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' },
]

export default function MilestoneTracker() {
  const [milestones, setMilestones] = useState(() => getItem(STORAGE_KEY, []))

  useEffect(() => { setItem(STORAGE_KEY, milestones) }, [milestones])

  const add = () => setMilestones(prev => [...prev, emptyMilestone()])
  const remove = (id) => setMilestones(prev => prev.filter(m => m.id !== id))
  const update = (id, key, val) => setMilestones(prev => prev.map(m => m.id === id ? { ...m, [key]: val } : m))

  const done = milestones.filter(m => m.status === 'done').length
  const total = milestones.length
  const pct = total ? Math.round((done / total) * 100) : 0

  return (
    <div className="space-y-5">
      {/* Summary */}
      {total > 0 && (
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Progress</span>
            <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">{done}/{total} ({pct}%)</span>
          </div>
          <div className="w-full h-2.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-500 rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500 dark:text-gray-400">{total} milestone{total !== 1 ? 's' : ''}</span>
        <button onClick={add} className="btn-primary flex items-center gap-1.5 text-sm">
          <Plus className="w-4 h-4" /> Add Milestone
        </button>
      </div>

      {milestones.length === 0 ? (
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-8 text-center text-sm text-gray-400">
          No milestones yet. Click &quot;Add Milestone&quot; to get started.
        </div>
      ) : (
        <div className="space-y-2">
          {milestones.map(m => {
            const st = STATUSES.find(s => s.value === m.status)
            const Icon = st.icon
            return (
              <div key={m.id} className="flex flex-wrap items-start gap-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-3">
                <button onClick={() => update(m.id, 'status', m.status === 'done' ? 'pending' : 'done')} className={`mt-0.5 ${st.color}`}>
                  <Icon className="w-5 h-5" />
                </button>
                <div className="flex-1 min-w-[150px] space-y-1.5">
                  <input value={m.name} onChange={(e) => update(m.id, 'name', e.target.value)} placeholder="Milestone name" className={`w-full bg-transparent border-b border-transparent focus:border-indigo-400 outline-none text-sm text-gray-800 dark:text-gray-200 placeholder:text-gray-400 ${m.status === 'done' ? 'line-through opacity-60' : ''}`} />
                  <input value={m.notes} onChange={(e) => update(m.id, 'notes', e.target.value)} placeholder="Notes (optional)" className="w-full bg-transparent text-xs text-gray-500 dark:text-gray-400 outline-none placeholder:text-gray-400" />
                </div>
                <input type="date" value={m.dueDate} onChange={(e) => update(m.id, 'dueDate', e.target.value)} className="text-xs bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-2 py-1 text-gray-700 dark:text-gray-300" />
                <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full ${st.bg}`}>{st.label}</span>
                <button onClick={() => remove(m.id)} className="text-red-400 hover:text-red-600 p-1"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
