import { useState, useEffect } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { getItem, setItem } from '../../utils/storage'

const STORAGE_KEY = 'untrackt_action_items'

const STATUSES = [
  { value: 'open', label: 'Open', color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' },
  { value: 'in-progress', label: 'In Progress', color: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300' },
  { value: 'done', label: 'Done', color: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' },
]

function emptyItem() {
  return { id: Date.now(), title: '', owner: '', dueDate: '', status: 'open' }
}

export default function ActionItemTracker() {
  const [items, setItems] = useState(() => getItem(STORAGE_KEY, []))
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterOwner, setFilterOwner] = useState('')

  useEffect(() => { setItem(STORAGE_KEY, items) }, [items])

  const add = () => setItems(prev => [emptyItem(), ...prev])
  const remove = (id) => setItems(prev => prev.filter(i => i.id !== id))
  const update = (id, key, val) => setItems(prev => prev.map(i => i.id === id ? { ...i, [key]: val } : i))

  const owners = [...new Set(items.map(i => i.owner).filter(Boolean))]

  let filtered = items
  if (filterStatus !== 'all') filtered = filtered.filter(i => i.status === filterStatus)
  if (filterOwner) filtered = filtered.filter(i => i.owner === filterOwner)

  const openCount = items.filter(i => i.status === 'open').length
  const ipCount = items.filter(i => i.status === 'in-progress').length
  const doneCount = items.filter(i => i.status === 'done').length

  const today = new Date().toISOString().slice(0, 10)

  return (
    <div className="space-y-5">
      {/* Summary */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Open', count: openCount, colors: 'border-blue-200 dark:border-blue-800' },
          { label: 'In Progress', count: ipCount, colors: 'border-amber-200 dark:border-amber-800' },
          { label: 'Done', count: doneCount, colors: 'border-green-200 dark:border-green-800' },
        ].map(s => (
          <div key={s.label} className={`rounded-lg border p-2 text-center bg-white dark:bg-gray-900 ${s.colors}`}>
            <div className="text-lg font-bold text-gray-800 dark:text-gray-200">{s.count}</div>
            <div className="text-[10px] text-gray-500 dark:text-gray-400 uppercase">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters + Add */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 flex-wrap">
          {[{ v: 'all', l: `All (${items.length})` }, ...STATUSES.map(s => ({ v: s.value, l: `${s.label} (${items.filter(i => i.status === s.value).length})` }))].map(f => (
            <button key={f.v} onClick={() => setFilterStatus(f.v)} className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${filterStatus === f.v ? 'bg-indigo-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200'}`}>{f.l}</button>
          ))}
          {owners.length > 0 && (
            <select value={filterOwner} onChange={(e) => setFilterOwner(e.target.value)} className="text-xs bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-2 py-1 text-gray-700 dark:text-gray-300">
              <option value="">All Owners</option>
              {owners.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          )}
        </div>
        <button onClick={add} className="btn-primary flex items-center gap-1.5 text-sm"><Plus className="w-4 h-4" /> Add Item</button>
      </div>

      {/* Items */}
      {filtered.length === 0 ? (
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-8 text-center text-sm text-gray-400">
          {items.length === 0 ? 'No action items yet.' : 'No items match the current filter.'}
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map(item => {
            const overdue = item.dueDate && item.dueDate < today && item.status !== 'done'
            const st = STATUSES.find(s => s.value === item.status)
            return (
              <div key={item.id} className={`flex flex-wrap items-center gap-2 rounded-lg border p-2 ${overdue ? 'border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/10' : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900'}`}>
                <select value={item.status} onChange={(e) => update(item.id, 'status', e.target.value)} className="text-xs bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-2 py-1 text-gray-700 dark:text-gray-300">
                  {STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                </select>
                <input value={item.title} onChange={(e) => update(item.id, 'title', e.target.value)} placeholder="Action item" className={`flex-1 min-w-[120px] bg-transparent border-b border-transparent focus:border-indigo-400 outline-none text-sm text-gray-800 dark:text-gray-200 placeholder:text-gray-400 ${item.status === 'done' ? 'line-through opacity-60' : ''}`} />
                <input value={item.owner} onChange={(e) => update(item.id, 'owner', e.target.value)} placeholder="Owner" className="w-24 bg-transparent border-b border-transparent focus:border-indigo-400 outline-none text-xs text-gray-600 dark:text-gray-400 placeholder:text-gray-400" />
                <input type="date" value={item.dueDate} onChange={(e) => update(item.id, 'dueDate', e.target.value)} className={`text-xs border rounded px-2 py-1 ${overdue ? 'bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-700 text-red-700 dark:text-red-300' : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300'}`} />
                {overdue && <span className="text-[10px] text-red-600 dark:text-red-400 font-semibold">Overdue</span>}
                <button onClick={() => remove(item.id)} className="text-red-400 hover:text-red-600 p-1"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
