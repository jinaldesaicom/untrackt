import { useState, useEffect } from 'react'
import { Plus, Trash2, Download, Copy } from 'lucide-react'
import { getItem, setItem } from '../../utils/storage'

const STORAGE_KEY = 'untrackt_raid_log'

const TYPES = [
  { value: 'risk', label: 'Risk', color: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300' },
  { value: 'assumption', label: 'Assumption', color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' },
  { value: 'issue', label: 'Issue', color: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300' },
  { value: 'dependency', label: 'Dependency', color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300' },
]

const PRIORITIES = [
  { value: 'high', label: 'High', color: 'text-red-600 dark:text-red-400' },
  { value: 'medium', label: 'Medium', color: 'text-amber-600 dark:text-amber-400' },
  { value: 'low', label: 'Low', color: 'text-green-600 dark:text-green-400' },
]

const STATUSES = ['Open', 'Mitigated', 'Closed']

function emptyEntry(type = 'risk') {
  return { id: Date.now(), type, title: '', description: '', priority: 'medium', status: 'Open', owner: '', date: new Date().toISOString().slice(0, 10) }
}

export default function RaidLog() {
  const [entries, setEntries] = useState(() => getItem(STORAGE_KEY, []))
  const [filterType, setFilterType] = useState('all')

  useEffect(() => { setItem(STORAGE_KEY, entries) }, [entries])

  const add = (type) => setEntries(prev => [emptyEntry(type), ...prev])
  const remove = (id) => setEntries(prev => prev.filter(e => e.id !== id))
  const update = (id, key, val) => setEntries(prev => prev.map(e => e.id === id ? { ...e, [key]: val } : e))

  const filtered = filterType === 'all' ? entries : entries.filter(e => e.type === filterType)

  const exportCSV = () => {
    const head = 'Type,Title,Description,Priority,Status,Owner,Date'
    const rows = entries.map(e => [e.type, `"${e.title}"`, `"${e.description}"`, e.priority, e.status, `"${e.owner}"`, e.date].join(','))
    const csv = [head, ...rows].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href = url; a.download = 'raid-log.csv'; a.click()
    URL.revokeObjectURL(url)
  }

  const copyAll = () => {
    const text = entries.map(e => `[${e.type.toUpperCase()}] ${e.title} | ${e.priority} | ${e.status} | ${e.owner}`).join('\n')
    navigator.clipboard.writeText(text)
  }

  const counts = { risk: 0, assumption: 0, issue: 0, dependency: 0 }
  entries.forEach(e => { if (counts[e.type] !== undefined) counts[e.type]++ })

  return (
    <div className="space-y-5">
      {/* Summary */}
      <div className="grid grid-cols-4 gap-2">
        {TYPES.map(t => (
          <div key={t.value} className={`rounded-lg border border-gray-200 dark:border-gray-700 p-2 text-center`}>
            <div className="text-lg font-bold text-gray-800 dark:text-gray-200">{counts[t.value]}</div>
            <div className={`text-[10px] font-semibold uppercase ${t.color.split(' ').filter(c => c.startsWith('text-')).join(' ')}`}>{t.label}s</div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 flex-wrap">
          <button onClick={() => setFilterType('all')} className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${filterType === 'all' ? 'bg-indigo-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200'}`}>All ({entries.length})</button>
          {TYPES.map(t => (
            <button key={t.value} onClick={() => setFilterType(t.value)} className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${filterType === t.value ? 'bg-indigo-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200'}`}>{t.label} ({counts[t.value]})</button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button onClick={copyAll} disabled={!entries.length} className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-40">
            <Copy className="w-3.5 h-3.5" /> Copy
          </button>
          <button onClick={exportCSV} disabled={!entries.length} className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-40">
            <Download className="w-3.5 h-3.5" /> CSV
          </button>
        </div>
      </div>

      {/* Add buttons */}
      <div className="flex items-center gap-2">
        {TYPES.map(t => (
          <button key={t.value} onClick={() => add(t.value)} className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <Plus className="w-3.5 h-3.5" /> {t.label}
          </button>
        ))}
      </div>

      {/* Entries */}
      {filtered.length === 0 ? (
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-8 text-center text-sm text-gray-400">
          No entries yet. Add a Risk, Assumption, Issue, or Dependency above.
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map(e => {
            const typeObj = TYPES.find(t => t.value === e.type)
            const priObj = PRIORITIES.find(p => p.value === e.priority)
            return (
              <div key={e.id} className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-3 space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full ${typeObj.color}`}>{typeObj.label}</span>
                  <input value={e.title} onChange={(ev) => update(e.id, 'title', ev.target.value)} placeholder="Title" className="flex-1 min-w-[120px] bg-transparent border-b border-transparent focus:border-indigo-400 outline-none text-sm font-medium text-gray-800 dark:text-gray-200 placeholder:text-gray-400" />
                  <button onClick={() => remove(e.id)} className="text-red-400 hover:text-red-600 p-1"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
                <textarea value={e.description} onChange={(ev) => update(e.id, 'description', ev.target.value)} placeholder="Description..." rows={2} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-xs text-gray-700 dark:text-gray-300 outline-none resize-none focus:border-indigo-400" />
                <div className="flex flex-wrap items-center gap-2">
                  <select value={e.priority} onChange={(ev) => update(e.id, 'priority', ev.target.value)} className="text-xs bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-2 py-1 text-gray-700 dark:text-gray-300">
                    {PRIORITIES.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
                  </select>
                  <select value={e.status} onChange={(ev) => update(e.id, 'status', ev.target.value)} className="text-xs bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-2 py-1 text-gray-700 dark:text-gray-300">
                    {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <input value={e.owner} onChange={(ev) => update(e.id, 'owner', ev.target.value)} placeholder="Owner" className="w-28 bg-transparent border-b border-transparent focus:border-indigo-400 outline-none text-xs text-gray-600 dark:text-gray-400 placeholder:text-gray-400" />
                  <input type="date" value={e.date} onChange={(ev) => update(e.id, 'date', ev.target.value)} className="text-xs bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-2 py-1 text-gray-700 dark:text-gray-300" />
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
