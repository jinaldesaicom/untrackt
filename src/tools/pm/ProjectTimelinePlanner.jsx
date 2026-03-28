import { useState, useEffect } from 'react'
import { Plus, Trash2, GripVertical } from 'lucide-react'
import { getItem, setItem } from '../../utils/storage'

const STORAGE_KEY = 'untrackt_project_timeline'

function emptyItem(type = 'milestone') {
  return { id: Date.now(), type, name: '', date: '', endDate: '', color: '#6366f1' }
}

export default function ProjectTimelinePlanner() {
  const [items, setItems] = useState(() => getItem(STORAGE_KEY, []))

  useEffect(() => { setItem(STORAGE_KEY, items) }, [items])

  const add = (type) => setItems(prev => [...prev, emptyItem(type)])
  const remove = (id) => setItems(prev => prev.filter(i => i.id !== id))
  const update = (id, key, val) => setItems(prev => prev.map(i => i.id === id ? { ...i, [key]: val } : i))

  const moveUp = (idx) => {
    if (idx === 0) return
    setItems(prev => { const a = [...prev]; [a[idx - 1], a[idx]] = [a[idx], a[idx - 1]]; return a })
  }
  const moveDown = (idx) => {
    if (idx >= items.length - 1) return
    setItems(prev => { const a = [...prev]; [a[idx], a[idx + 1]] = [a[idx + 1], a[idx]]; return a })
  }

  const sorted = [...items].sort((a, b) => {
    const da = new Date(a.date || '9999')
    const db = new Date(b.date || '9999')
    return da - db
  })

  const allDates = items.map(i => new Date(i.date)).filter(d => !isNaN(d))
  const allEnd = items.filter(i => i.endDate).map(i => new Date(i.endDate)).filter(d => !isNaN(d))
  const minD = allDates.length ? new Date(Math.min(...allDates)) : new Date()
  const maxD = [...allDates, ...allEnd].length ? new Date(Math.max(...allDates, ...allEnd)) : new Date(Date.now() + 90 * 86400000)
  const span = Math.max(1, (maxD - minD) / 86400000)

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-sm text-gray-500 dark:text-gray-400">{items.length} item{items.length !== 1 ? 's' : ''}</span>
        <div className="flex items-center gap-2">
          <button onClick={() => add('phase')} className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors">
            <Plus className="w-3.5 h-3.5" /> Phase
          </button>
          <button onClick={() => add('milestone')} className="btn-primary flex items-center gap-1.5 text-sm">
            <Plus className="w-4 h-4" /> Milestone
          </button>
        </div>
      </div>

      {/* Item list */}
      <div className="space-y-2">
        {items.map((item, idx) => (
          <div key={item.id} className="flex flex-wrap items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-2">
            <div className="flex flex-col gap-0.5">
              <button onClick={() => moveUp(idx)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"><GripVertical className="w-3.5 h-3.5 rotate-180" /></button>
              <button onClick={() => moveDown(idx)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"><GripVertical className="w-3.5 h-3.5" /></button>
            </div>
            <span className={`text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded ${item.type === 'phase' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'}`}>{item.type}</span>
            <input value={item.name} onChange={(e) => update(item.id, 'name', e.target.value)} placeholder={item.type === 'phase' ? 'Phase name' : 'Milestone name'} className="flex-1 min-w-[120px] bg-transparent border-b border-transparent focus:border-indigo-400 outline-none text-sm text-gray-800 dark:text-gray-200 placeholder:text-gray-400" />
            <input type="date" value={item.date} onChange={(e) => update(item.id, 'date', e.target.value)} className="text-xs bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-2 py-1 text-gray-700 dark:text-gray-300" />
            {item.type === 'phase' && (
              <>
                <span className="text-gray-400 text-xs">→</span>
                <input type="date" value={item.endDate} onChange={(e) => update(item.id, 'endDate', e.target.value)} className="text-xs bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-2 py-1 text-gray-700 dark:text-gray-300" />
              </>
            )}
            <button onClick={() => remove(item.id)} className="text-red-400 hover:text-red-600 p-1"><Trash2 className="w-3.5 h-3.5" /></button>
          </div>
        ))}
      </div>

      {/* Visual timeline */}
      {items.length > 0 && (
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 overflow-x-auto">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Timeline View</h3>
          <div className="relative" style={{ minHeight: sorted.length * 36 + 40 }}>
            {/* Track line */}
            <div className="absolute left-0 right-0 top-6 h-0.5 bg-gray-200 dark:bg-gray-700" />

            {sorted.map((item, i) => {
              const d = new Date(item.date)
              if (isNaN(d)) return null
              const left = ((d - minD) / 86400000 / span) * 100

              if (item.type === 'milestone') {
                return (
                  <div key={item.id} className="absolute" style={{ left: `${Math.min(95, left)}%`, top: i * 36 }}>
                    <div className="w-3 h-3 rounded-full bg-purple-500 border-2 border-white dark:border-gray-900 shadow" />
                    <span className="absolute left-5 top-[-2px] text-xs text-gray-700 dark:text-gray-300 whitespace-nowrap">{item.name || 'Milestone'} <span className="text-gray-400">({item.date})</span></span>
                  </div>
                )
              }

              const end = new Date(item.endDate || item.date)
              const width = Math.max(2, ((end - d) / 86400000 / span) * 100)
              return (
                <div key={item.id} className="absolute" style={{ left: `${Math.min(95, left)}%`, top: i * 36, width: `${Math.min(100 - left, width)}%` }}>
                  <div className="h-5 rounded bg-indigo-200 dark:bg-indigo-800/50 border border-indigo-300 dark:border-indigo-700 flex items-center px-2">
                    <span className="text-[10px] text-indigo-700 dark:text-indigo-300 truncate">{item.name || 'Phase'}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {items.length === 0 && (
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-8 text-center text-sm text-gray-400">
          Add milestones and phases to build your project timeline.
        </div>
      )}
    </div>
  )
}
