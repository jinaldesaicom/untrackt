import { useState, useEffect } from 'react'
import { Plus, Trash2, Copy, Check, RotateCcw } from 'lucide-react'
import { getItem, setItem } from '../../utils/storage'

const STORAGE_KEY = 'untrackt_daily_standup'

function emptyEntry() {
  return {
    id: Date.now(),
    member: '',
    yesterday: '',
    today: '',
    blockers: '',
  }
}

function todayKey() {
  return new Date().toISOString().slice(0, 10)
}

export default function DailyStandupTemplate() {
  const [date, setDate] = useState(todayKey())
  const [entries, setEntries] = useState(() => {
    const saved = getItem(STORAGE_KEY, {})
    return saved[todayKey()] || [emptyEntry()]
  })
  const [history, setHistory] = useState(() => getItem(STORAGE_KEY, {}))
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const updated = { ...history, [date]: entries }
    setHistory(updated)
    setItem(STORAGE_KEY, updated)
  }, [entries, date])

  const loadDate = (d) => {
    setDate(d)
    setEntries(history[d] || [emptyEntry()])
  }

  const addEntry = () => setEntries(prev => [...prev, { ...emptyEntry(), id: Date.now() + Math.random() }])
  const removeEntry = (id) => setEntries(prev => prev.filter(e => e.id !== id))
  const updateEntry = (id, key, val) => setEntries(prev => prev.map(e => e.id === id ? { ...e, [key]: val } : e))

  const clearAll = () => setEntries([emptyEntry()])

  const copyAll = () => {
    const lines = [`Daily Standup — ${date}`, '']
    entries.forEach(e => {
      lines.push(`**${e.member || 'Team Member'}**`)
      lines.push(`Yesterday: ${e.yesterday || '—'}`)
      lines.push(`Today: ${e.today || '—'}`)
      lines.push(`Blockers: ${e.blockers || 'None'}`)
      lines.push('')
    })
    navigator.clipboard.writeText(lines.join('\n')).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const hasBlockers = entries.some(e => e.blockers.trim())

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <input type="date" value={date} onChange={e => loadDate(e.target.value)}
            className="input-field text-sm w-40" />
          <button onClick={() => loadDate(todayKey())} className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline">Today</button>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={copyAll} className="px-2.5 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-xs text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center gap-1">
            {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />} {copied ? 'Copied' : 'Copy'}
          </button>
          <button onClick={clearAll} className="px-2.5 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-xs text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center gap-1">
            <RotateCcw className="w-3 h-3" /> Clear
          </button>
          <button onClick={addEntry} className="btn-primary flex items-center gap-1.5 text-sm">
            <Plus className="w-4 h-4" /> Add Member
          </button>
        </div>
      </div>

      {hasBlockers && (
        <div className="rounded-lg bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 px-3 py-2">
          <p className="text-xs font-medium text-red-700 dark:text-red-300">⚠ Blockers reported today:</p>
          <ul className="mt-1 space-y-0.5">
            {entries.filter(e => e.blockers.trim()).map(e => (
              <li key={e.id} className="text-xs text-red-600 dark:text-red-400">
                <strong>{e.member || 'Member'}:</strong> {e.blockers}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="space-y-3">
        {entries.map((entry, idx) => (
          <div key={entry.id} className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <input type="text" value={entry.member} onChange={e => updateEntry(entry.id, 'member', e.target.value)}
                className="text-sm font-semibold bg-transparent text-gray-900 dark:text-white outline-none flex-1" placeholder={`Team Member ${idx + 1}`} />
              {entries.length > 1 && (
                <button onClick={() => removeEntry(entry.id)} className="text-gray-300 hover:text-red-500">
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Yesterday</label>
              <textarea value={entry.yesterday} onChange={e => updateEntry(entry.id, 'yesterday', e.target.value)}
                className="textarea-field min-h-[50px] text-sm" placeholder="What did you work on yesterday?" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Today</label>
              <textarea value={entry.today} onChange={e => updateEntry(entry.id, 'today', e.target.value)}
                className="textarea-field min-h-[50px] text-sm" placeholder="What will you work on today?" />
            </div>
            <div>
              <label className="block text-xs font-medium text-red-500 dark:text-red-400 mb-1">Blockers</label>
              <textarea value={entry.blockers} onChange={e => updateEntry(entry.id, 'blockers', e.target.value)}
                className="textarea-field min-h-[40px] text-sm border-red-100 dark:border-red-900/30" placeholder="Any blockers or impediments?" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
