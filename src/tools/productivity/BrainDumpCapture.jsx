import { useState, useEffect, useRef } from 'react'
import { Plus, Trash2, ArrowRight } from 'lucide-react'
import { getItem, setItem } from '../../utils/storage'

const STORAGE_KEY = 'untrackt_brain_dump'

const CATEGORIES = ['Ideas', 'Tasks', 'Questions', 'Notes', 'Follow-up', 'Someday']

export default function BrainDumpCapture() {
  const [items, setItems] = useState(() => getItem(STORAGE_KEY, []))
  const [input, setInput] = useState('')
  const [view, setView] = useState('dump') // dump or organize
  const inputRef = useRef(null)

  useEffect(() => { setItem(STORAGE_KEY, items) }, [items])

  const addItem = () => {
    const text = input.trim()
    if (!text) return
    setItems(prev => [{ id: Date.now(), text, category: null, createdAt: new Date().toISOString() }, ...prev])
    setInput('')
    inputRef.current?.focus()
  }

  const deleteItem = (id) => setItems(prev => prev.filter(i => i.id !== id))
  const categorize = (id, category) => setItems(prev => prev.map(i => i.id === id ? { ...i, category } : i))
  const clearAll = () => setItems([])

  const uncategorized = items.filter(i => !i.category)
  const categorized = CATEGORIES.map(cat => ({ name: cat, items: items.filter(i => i.category === cat) })).filter(c => c.items.length > 0)

  return (
    <div className="space-y-4">
      <div className="flex gap-1 mb-2">
        <button onClick={() => setView('dump')} className={`px-3 py-1.5 text-xs rounded-full border ${view === 'dump' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700'}`}>
          Dump ({uncategorized.length})
        </button>
        <button onClick={() => setView('organize')} className={`px-3 py-1.5 text-xs rounded-full border ${view === 'organize' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700'}`}>
          Organized ({items.length - uncategorized.length})
        </button>
      </div>

      {view === 'dump' && (
        <>
          <div className="flex gap-2">
            <input ref={inputRef} type="text" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && addItem()} className="input-field flex-1 text-lg" placeholder="What's on your mind? Just dump it here…" autoFocus />
            <button onClick={addItem} className="btn-primary"><Plus className="w-5 h-5" /></button>
          </div>
          <p className="text-xs text-gray-400">Quick capture — don't think, just type. Press Enter after each thought.</p>

          {uncategorized.length > 0 && (
            <div className="space-y-1.5">
              {uncategorized.map(item => (
                <div key={item.id} className="flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 group">
                  <span className="flex-1 text-sm text-gray-700 dark:text-gray-300">{item.text}</span>
                  <select onChange={e => { if (e.target.value) categorize(item.id, e.target.value); e.target.value = '' }} defaultValue=""
                    className="input-field text-xs w-24 opacity-0 group-hover:opacity-100 transition-opacity">
                    <option value="" disabled>Sort →</option>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <button onClick={() => deleteItem(item.id)} className="text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              ))}
            </div>
          )}

          {uncategorized.length === 0 && items.length === 0 && (
            <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-8 text-center text-sm text-gray-400">
              Empty mind? Start dumping your thoughts!
            </div>
          )}

          {uncategorized.length === 0 && items.length > 0 && (
            <div className="rounded-xl border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 p-4 text-center">
              <p className="text-sm text-green-700 dark:text-green-300">All items organized!</p>
              <button onClick={() => setView('organize')} className="text-xs text-indigo-600 dark:text-indigo-400 mt-1 flex items-center gap-1 mx-auto">View organized <ArrowRight className="w-3 h-3" /></button>
            </div>
          )}
        </>
      )}

      {view === 'organize' && (
        <>
          {categorized.length === 0 ? (
            <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-8 text-center text-sm text-gray-400">
              No organized items yet. Dump some thoughts first, then categorize them.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {categorized.map(cat => (
                <div key={cat.name} className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-3">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">{cat.name} <span className="text-gray-400 font-normal">({cat.items.length})</span></h3>
                  <div className="space-y-1">
                    {cat.items.map(item => (
                      <div key={item.id} className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 group">
                        <span className="flex-1">{item.text}</span>
                        <button onClick={() => categorize(item.id, null)} className="text-gray-300 hover:text-amber-500 opacity-0 group-hover:opacity-100" title="Move back to dump"><ArrowRight className="w-3 h-3 rotate-180" /></button>
                        <button onClick={() => deleteItem(item.id)} className="text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100"><Trash2 className="w-3 h-3" /></button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      <div className="flex items-center justify-between text-xs text-gray-400">
        <span>{items.length} total items</span>
        {items.length > 0 && <button onClick={clearAll} className="text-red-400 hover:text-red-600">Clear all</button>}
      </div>
    </div>
  )
}
