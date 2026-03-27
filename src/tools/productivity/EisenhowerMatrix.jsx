import { useState, useEffect } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { getItem, setItem } from '../../utils/storage'

const STORAGE_KEY = 'untrackt_eisenhower'

const QUADRANTS = [
  { id: 'do', label: 'Do First', subtitle: 'Urgent & Important', bg: 'bg-red-50 dark:bg-red-900/20', border: 'border-red-200 dark:border-red-800', text: 'text-red-700 dark:text-red-300', badge: 'bg-red-500' },
  { id: 'schedule', label: 'Schedule', subtitle: 'Not Urgent & Important', bg: 'bg-blue-50 dark:bg-blue-900/20', border: 'border-blue-200 dark:border-blue-800', text: 'text-blue-700 dark:text-blue-300', badge: 'bg-blue-500' },
  { id: 'delegate', label: 'Delegate', subtitle: 'Urgent & Not Important', bg: 'bg-amber-50 dark:bg-amber-900/20', border: 'border-amber-200 dark:border-amber-800', text: 'text-amber-700 dark:text-amber-300', badge: 'bg-amber-500' },
  { id: 'eliminate', label: 'Eliminate', subtitle: 'Not Urgent & Not Important', bg: 'bg-gray-50 dark:bg-gray-800/50', border: 'border-gray-200 dark:border-gray-700', text: 'text-gray-600 dark:text-gray-400', badge: 'bg-gray-500' },
]

export default function EisenhowerMatrix() {
  const [items, setItems] = useState(() => getItem(STORAGE_KEY, { inbox: [], do: [], schedule: [], delegate: [], eliminate: [] }))
  const [input, setInput] = useState('')
  const [dragItem, setDragItem] = useState(null)
  const [dragSource, setDragSource] = useState(null)

  useEffect(() => { setItem(STORAGE_KEY, items) }, [items])

  const addToInbox = () => {
    const text = input.trim()
    if (!text) return
    setItems(prev => ({ ...prev, inbox: [...prev.inbox, { id: Date.now(), text }] }))
    setInput('')
  }

  const moveItem = (itemId, from, to) => {
    setItems(prev => {
      const item = prev[from].find(i => i.id === itemId)
      if (!item) return prev
      return { ...prev, [from]: prev[from].filter(i => i.id !== itemId), [to]: [...prev[to], item] }
    })
  }

  const deleteItem = (itemId, from) => setItems(prev => ({ ...prev, [from]: prev[from].filter(i => i.id !== itemId) }))

  const handleDragStart = (item, source) => { setDragItem(item); setDragSource(source) }
  const handleDrop = (target) => {
    if (dragItem && dragSource && dragSource !== target) {
      moveItem(dragItem.id, dragSource, target)
    }
    setDragItem(null)
    setDragSource(null)
  }

  const totalCount = Object.values(items).flat().length

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input type="text" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && addToInbox()} className="input-field flex-1" placeholder="Add task to inbox…" />
        <button onClick={addToInbox} className="btn-primary flex items-center gap-1.5"><Plus className="w-4 h-4" /> Add</button>
      </div>

      {items.inbox.length > 0 && (
        <div className="rounded-xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-900/20 p-3">
          <h3 className="text-xs font-semibold text-indigo-700 dark:text-indigo-300 mb-2">Inbox ({items.inbox.length}) — Drag to a quadrant</h3>
          <div className="flex flex-wrap gap-2">
            {items.inbox.map(item => (
              <div key={item.id} draggable onDragStart={() => handleDragStart(item, 'inbox')}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white dark:bg-gray-900 border border-indigo-200 dark:border-indigo-800 text-xs text-gray-700 dark:text-gray-300 cursor-grab active:cursor-grabbing">
                {item.text}
                <button onClick={() => deleteItem(item.id, 'inbox')} className="text-gray-300 hover:text-red-500"><Trash2 className="w-3 h-3" /></button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {QUADRANTS.map(q => (
          <div key={q.id} onDragOver={e => e.preventDefault()} onDrop={() => handleDrop(q.id)}
            className={`rounded-xl border ${q.border} ${q.bg} min-h-[160px] p-3`}>
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className={`text-sm font-semibold ${q.text}`}>{q.label}</h3>
                <p className="text-[10px] text-gray-400">{q.subtitle}</p>
              </div>
              <span className={`${q.badge} text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center`}>{items[q.id]?.length || 0}</span>
            </div>
            <div className="space-y-1.5">
              {(items[q.id] || []).map(item => (
                <div key={item.id} draggable onDragStart={() => handleDragStart(item, q.id)}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-xs text-gray-700 dark:text-gray-300 cursor-grab group">
                  <span className="flex-1">{item.text}</span>
                  <button onClick={() => deleteItem(item.id, q.id)} className="text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100"><Trash2 className="w-3 h-3" /></button>
                </div>
              ))}
              {(!items[q.id] || items[q.id].length === 0) && (
                <p className="text-xs text-gray-400 text-center py-3">Drop tasks here</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-gray-400 text-center">{totalCount} total tasks</p>
    </div>
  )
}
