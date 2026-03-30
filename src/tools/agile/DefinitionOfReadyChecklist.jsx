import { useState, useEffect } from 'react'
import { Plus, Trash2, Check, Copy, RotateCcw } from 'lucide-react'
import { getItem, setItem } from '../../utils/storage'

const STORAGE_KEY = 'untrackt_dor_checklist'

const DEFAULT_ITEMS = [
  'User story is clearly written (As a / I want / So that)',
  'Acceptance criteria are defined',
  'Dependencies are identified',
  'Story is estimated by the team',
  'Story fits within one sprint',
  'UX/UI designs are available (if applicable)',
  'Technical approach is understood',
  'Test scenarios are identified',
  'Story is prioritized in the backlog',
  'No open questions or blockers',
]

export default function DefinitionOfReadyChecklist() {
  const [items, setItems] = useState(() => getItem(STORAGE_KEY, DEFAULT_ITEMS.map((text, i) => ({ id: i + 1, text, checked: false }))))
  const [newItem, setNewItem] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => { setItem(STORAGE_KEY, items) }, [items])

  const addItem = () => {
    if (!newItem.trim()) return
    setItems(prev => [...prev, { id: Date.now(), text: newItem.trim(), checked: false }])
    setNewItem('')
  }

  const removeItem = (id) => setItems(prev => prev.filter(i => i.id !== id))
  const toggleItem = (id) => setItems(prev => prev.map(i => i.id === id ? { ...i, checked: !i.checked } : i))
  const updateItem = (id, text) => setItems(prev => prev.map(i => i.id === id ? { ...i, text } : i))
  const resetChecks = () => setItems(prev => prev.map(i => ({ ...i, checked: false })))
  const resetAll = () => setItems(DEFAULT_ITEMS.map((text, i) => ({ id: i + 1, text, checked: false })))

  const checkedCount = items.filter(i => i.checked).length
  const progress = items.length > 0 ? Math.round((checkedCount / items.length) * 100) : 0
  const allReady = items.length > 0 && checkedCount === items.length

  const copyChecklist = () => {
    const text = `Definition of Ready Checklist\n${'='.repeat(30)}\n\n` +
      items.map(i => `[${i.checked ? 'x' : ' '}] ${i.text}`).join('\n') +
      `\n\nProgress: ${checkedCount}/${items.length} (${progress}%)`
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-sm text-gray-500 dark:text-gray-400">{checkedCount}/{items.length} met</div>
          {allReady && <span className="text-xs font-medium text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded-full">✓ Ready!</span>}
        </div>
        <div className="flex items-center gap-2">
          <button onClick={copyChecklist} className="px-2.5 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-xs text-gray-600 dark:text-gray-400 hover:bg-gray-50 flex items-center gap-1">
            {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />} {copied ? 'Copied' : 'Copy'}
          </button>
          <button onClick={resetChecks} className="px-2.5 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-xs text-gray-600 dark:text-gray-400 hover:bg-gray-50 flex items-center gap-1">
            <RotateCcw className="w-3 h-3" /> Uncheck
          </button>
          <button onClick={resetAll} className="px-2.5 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-xs text-gray-600 dark:text-gray-400 hover:bg-gray-50">
            Defaults
          </button>
        </div>
      </div>

      <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
        <div className={`h-full rounded-full transition-all duration-300 ${allReady ? 'bg-green-500' : 'bg-orange-500'}`} style={{ width: `${progress}%` }} />
      </div>

      <div className="space-y-1.5">
        {items.map(item => (
          <div key={item.id} className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 border transition-colors ${
            item.checked
              ? 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800'
              : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700'
          }`}>
            <input type="checkbox" checked={item.checked} onChange={() => toggleItem(item.id)}
              className="w-4 h-4 rounded accent-green-600 shrink-0 cursor-pointer" />
            <input type="text" value={item.text}
              onChange={e => updateItem(item.id, e.target.value)}
              className={`flex-1 bg-transparent text-sm outline-none ${item.checked ? 'text-gray-400 line-through' : 'text-gray-800 dark:text-gray-200'}`} />
            <button onClick={() => removeItem(item.id)} className="text-gray-300 hover:text-red-500 shrink-0">
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <input type="text" value={newItem} onChange={e => setNewItem(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addItem()}
          className="input-field text-sm flex-1" placeholder="Add a new DoR criterion..." />
        <button onClick={addItem} className="btn-primary flex items-center gap-1.5">
          <Plus className="w-4 h-4" /> Add
        </button>
      </div>

      <div className="rounded-lg bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 p-3">
        <p className="text-xs text-amber-700 dark:text-amber-300">
          <strong>Tip:</strong> Use this checklist during backlog refinement. A story should meet all criteria before being pulled into a sprint.
        </p>
      </div>
    </div>
  )
}
