import { useState, useEffect } from 'react'
import { Plus, Trash2, AlertTriangle, CheckCircle, Clock } from 'lucide-react'
import { getItem, setItem } from '../../utils/storage'

const STORAGE_KEY = 'untrackt_impediment_log'

const PRIORITIES = [
  { value: 'critical', label: 'Critical', color: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300' },
  { value: 'high', label: 'High', color: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300' },
  { value: 'medium', label: 'Medium', color: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300' },
  { value: 'low', label: 'Low', color: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' },
]

const STATUSES = [
  { value: 'open', label: 'Open', icon: AlertTriangle, color: 'text-red-500' },
  { value: 'in-progress', label: 'In Progress', icon: Clock, color: 'text-amber-500' },
  { value: 'resolved', label: 'Resolved', icon: CheckCircle, color: 'text-green-500' },
]

function emptyImpediment() {
  return {
    id: Date.now(),
    title: '',
    description: '',
    priority: 'medium',
    status: 'open',
    assignee: '',
    reportedDate: new Date().toISOString().slice(0, 10),
    resolvedDate: '',
  }
}

export default function ImpedimentLog() {
  const [items, setItems] = useState(() => getItem(STORAGE_KEY, []))
  const [filter, setFilter] = useState('all')

  useEffect(() => { setItem(STORAGE_KEY, items) }, [items])

  const addItem = () => setItems(prev => [emptyImpediment(), ...prev])
  const removeItem = (id) => setItems(prev => prev.filter(i => i.id !== id))
  const updateItem = (id, key, val) => {
    setItems(prev => prev.map(i => {
      if (i.id !== id) return i
      const updated = { ...i, [key]: val }
      if (key === 'status' && val === 'resolved' && !i.resolvedDate) {
        updated.resolvedDate = new Date().toISOString().slice(0, 10)
      }
      return updated
    }))
  }

  const filtered = filter === 'all' ? items : items.filter(i => i.status === filter)
  const openCount = items.filter(i => i.status === 'open').length
  const inProgressCount = items.filter(i => i.status === 'in-progress').length
  const resolvedCount = items.filter(i => i.status === 'resolved').length

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {[{ v: 'all', l: `All (${items.length})` }, { v: 'open', l: `Open (${openCount})` }, { v: 'in-progress', l: `In Progress (${inProgressCount})` }, { v: 'resolved', l: `Resolved (${resolvedCount})` }].map(f => (
            <button key={f.v} onClick={() => setFilter(f.v)}
              className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                filter === f.v ? 'bg-indigo-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200'
              }`}>
              {f.l}
            </button>
          ))}
        </div>
        <button onClick={addItem} className="btn-primary flex items-center gap-1.5 text-sm">
          <Plus className="w-4 h-4" /> Log Impediment
        </button>
      </div>

      {items.length === 0 && (
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-8 text-center text-sm text-gray-400">
          No impediments logged — that&apos;s great! Click &quot;Log Impediment&quot; when blockers arise.
        </div>
      )}

      <div className="space-y-3">
        {filtered.map(item => {
          const StatusIcon = STATUSES.find(s => s.value === item.status)?.icon || AlertTriangle
          const statusColor = STATUSES.find(s => s.value === item.status)?.color || ''
          const priorityStyle = PRIORITIES.find(p => p.value === item.priority)?.color || ''
          return (
            <div key={item.id} className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <StatusIcon className={`w-4 h-4 shrink-0 ${statusColor}`} />
                  <input type="text" value={item.title} onChange={e => updateItem(item.id, 'title', e.target.value)}
                    className="flex-1 text-sm font-medium bg-transparent text-gray-900 dark:text-white outline-none" placeholder="Impediment title..." />
                </div>
                <button onClick={() => removeItem(item.id)} className="text-gray-300 hover:text-red-500 shrink-0">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <textarea value={item.description} onChange={e => updateItem(item.id, 'description', e.target.value)}
                className="textarea-field text-sm min-h-[40px]" placeholder="Describe the impediment..." />

              <div className="flex flex-wrap gap-3">
                <div>
                  <label className="block text-[10px] text-gray-400 mb-0.5">Priority</label>
                  <select value={item.priority} onChange={e => updateItem(item.id, 'priority', e.target.value)}
                    className="text-xs rounded-lg px-2 py-1 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 cursor-pointer">
                    {PRIORITIES.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] text-gray-400 mb-0.5">Status</label>
                  <select value={item.status} onChange={e => updateItem(item.id, 'status', e.target.value)}
                    className="text-xs rounded-lg px-2 py-1 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 cursor-pointer">
                    {STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] text-gray-400 mb-0.5">Assignee</label>
                  <input type="text" value={item.assignee} onChange={e => updateItem(item.id, 'assignee', e.target.value)}
                    className="w-28 text-xs rounded-lg px-2 py-1 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800" placeholder="Who owns this?" />
                </div>
                <div>
                  <label className="block text-[10px] text-gray-400 mb-0.5">Reported</label>
                  <input type="date" value={item.reportedDate} onChange={e => updateItem(item.id, 'reportedDate', e.target.value)}
                    className="text-xs rounded-lg px-2 py-1 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800" />
                </div>
                {item.status === 'resolved' && (
                  <div>
                    <label className="block text-[10px] text-gray-400 mb-0.5">Resolved</label>
                    <input type="date" value={item.resolvedDate} onChange={e => updateItem(item.id, 'resolvedDate', e.target.value)}
                      className="text-xs rounded-lg px-2 py-1 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800" />
                  </div>
                )}
              </div>

              <span className={`inline-block text-[10px] font-medium px-2 py-0.5 rounded-full ${priorityStyle}`}>
                {PRIORITIES.find(p => p.value === item.priority)?.label} priority
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
