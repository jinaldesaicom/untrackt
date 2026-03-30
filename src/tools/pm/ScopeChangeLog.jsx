import { useState, useEffect } from 'react'
import { Plus, Trash2, Download } from 'lucide-react'
import { getItem, setItem } from '../../utils/storage'

const STORAGE_KEY = 'untrackt_scope_change_log'

const IMPACTS = ['Low', 'Medium', 'High', 'Critical']
const DECISIONS = ['Pending', 'Approved', 'Rejected', 'Deferred']

function emptyChange() {
  return { id: Date.now(), title: '', description: '', requestedBy: '', date: new Date().toISOString().slice(0, 10), impact: 'Medium', decision: 'Pending', notes: '' }
}

export default function ScopeChangeLog() {
  const [changes, setChanges] = useState(() => getItem(STORAGE_KEY, []))

  useEffect(() => { setItem(STORAGE_KEY, changes) }, [changes])

  const add = () => setChanges(prev => [emptyChange(), ...prev])
  const remove = (id) => setChanges(prev => prev.filter(c => c.id !== id))
  const update = (id, key, val) => setChanges(prev => prev.map(c => c.id === id ? { ...c, [key]: val } : c))

  const exportCSV = () => {
    const head = 'Date,Title,Description,Requested By,Impact,Decision,Notes'
    const rows = changes.map(c => [c.date, `"${c.title}"`, `"${c.description}"`, `"${c.requestedBy}"`, c.impact, c.decision, `"${c.notes}"`].join(','))
    const csv = [head, ...rows].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href = url; a.download = 'scope-changes.csv'; a.click()
    URL.revokeObjectURL(url)
  }

  const decisionColor = (d) => {
    switch (d) {
      case 'Approved': return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
      case 'Rejected': return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
      case 'Deferred': return 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300'
      default: return 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
    }
  }

  const counts = { Pending: 0, Approved: 0, Rejected: 0, Deferred: 0 }
  changes.forEach(c => { if (counts[c.decision] !== undefined) counts[c.decision]++ })

  return (
    <div className="space-y-5">
      {/* Summary */}
      {changes.length > 0 && (
        <div className="grid grid-cols-4 gap-2">
          {DECISIONS.map(d => (
            <div key={d} className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-2 text-center">
              <div className="text-lg font-bold text-gray-800 dark:text-gray-200">{counts[d]}</div>
              <div className="text-[10px] text-gray-500 dark:text-gray-400 uppercase">{d}</div>
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-sm text-gray-500 dark:text-gray-400">{changes.length} change{changes.length !== 1 ? 's' : ''}</span>
        <div className="flex items-center gap-2">
          <button onClick={exportCSV} disabled={!changes.length} className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-40">
            <Download className="w-3.5 h-3.5" /> CSV
          </button>
          <button onClick={add} className="btn-primary flex items-center gap-1.5 text-sm"><Plus className="w-4 h-4" /> Log Change</button>
        </div>
      </div>

      {changes.length === 0 ? (
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-8 text-center text-sm text-gray-400">
          No scope changes logged. Click &quot;Log Change&quot; when a change request arises.
        </div>
      ) : (
        <div className="space-y-2">
          {changes.map(c => (
            <div key={c.id} className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-3 space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full ${decisionColor(c.decision)}`}>{c.decision}</span>
                <input value={c.title} onChange={(e) => update(c.id, 'title', e.target.value)} placeholder="Change request title" className="flex-1 min-w-[140px] bg-transparent border-b border-transparent focus:border-indigo-400 outline-none text-sm font-medium text-gray-800 dark:text-gray-200 placeholder:text-gray-400" />
                <button onClick={() => remove(c.id)} className="text-red-400 hover:text-red-600 p-1"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
              <textarea value={c.description} onChange={(e) => update(c.id, 'description', e.target.value)} placeholder="Description of the change..." rows={2} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-xs text-gray-700 dark:text-gray-300 outline-none resize-none focus:border-indigo-400" />
              <div className="flex flex-wrap items-center gap-2">
                <input value={c.requestedBy} onChange={(e) => update(c.id, 'requestedBy', e.target.value)} placeholder="Requested by" className="w-28 bg-transparent border-b border-transparent focus:border-indigo-400 outline-none text-xs text-gray-600 dark:text-gray-400 placeholder:text-gray-400" />
                <input type="date" value={c.date} onChange={(e) => update(c.id, 'date', e.target.value)} className="text-xs bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-2 py-1 text-gray-700 dark:text-gray-300" />
                <select value={c.impact} onChange={(e) => update(c.id, 'impact', e.target.value)} className="text-xs bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-2 py-1 text-gray-700 dark:text-gray-300">
                  {IMPACTS.map(i => <option key={i} value={i}>{i} Impact</option>)}
                </select>
                <select value={c.decision} onChange={(e) => update(c.id, 'decision', e.target.value)} className="text-xs bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-2 py-1 text-gray-700 dark:text-gray-300">
                  {DECISIONS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <input value={c.notes} onChange={(e) => update(c.id, 'notes', e.target.value)} placeholder="Notes / rationale" className="w-full bg-transparent border-b border-transparent focus:border-indigo-400 outline-none text-xs text-gray-500 dark:text-gray-400 placeholder:text-gray-400" />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
