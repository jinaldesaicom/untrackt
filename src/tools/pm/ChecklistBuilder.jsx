import { useState, useEffect } from 'react'
import { Plus, Trash2, Copy, RotateCcw } from 'lucide-react'
import { getItem, setItem } from '../../utils/storage'

const STORAGE_KEY = 'untrackt_checklist_builder'

const TEMPLATES = {
  blank: { name: 'Blank Checklist', items: [] },
  launch: { name: 'Product Launch', items: ['Feature freeze', 'QA sign-off', 'Documentation updated', 'Marketing assets ready', 'Release notes drafted', 'Stakeholder notification', 'Deploy to production', 'Post-launch monitoring'] },
  onboarding: { name: 'Team Onboarding', items: ['Account setup', 'Tools access', 'Intro meeting scheduled', 'Documentation shared', 'Mentor assigned', 'First task assigned'] },
  review: { name: 'Code Review', items: ['Tests passing', 'No linting errors', 'Edge cases covered', 'API docs updated', 'Security reviewed', 'Performance acceptable'] },
}

function emptyChecklist(templateKey = 'blank') {
  const tpl = TEMPLATES[templateKey] || TEMPLATES.blank
  return {
    id: Date.now(),
    name: tpl.name,
    items: tpl.items.map((text, i) => ({ id: Date.now() + i, text, done: false })),
  }
}

export default function ChecklistBuilder() {
  const [checklists, setChecklists] = useState(() => getItem(STORAGE_KEY, []))
  const [activeId, setActiveId] = useState(null)

  useEffect(() => { setItem(STORAGE_KEY, checklists) }, [checklists])

  const addChecklist = (templateKey = 'blank') => {
    const cl = emptyChecklist(templateKey)
    setChecklists(prev => [cl, ...prev])
    setActiveId(cl.id)
  }
  const removeChecklist = (id) => {
    setChecklists(prev => prev.filter(c => c.id !== id))
    if (activeId === id) setActiveId(null)
  }
  const updateName = (id, name) => setChecklists(prev => prev.map(c => c.id === id ? { ...c, name } : c))

  const addItem = (clId) => {
    setChecklists(prev => prev.map(c => {
      if (c.id !== clId) return c
      return { ...c, items: [...c.items, { id: Date.now(), text: '', done: false }] }
    }))
  }
  const removeItem = (clId, itemId) => {
    setChecklists(prev => prev.map(c => {
      if (c.id !== clId) return c
      return { ...c, items: c.items.filter(i => i.id !== itemId) }
    }))
  }
  const updateItem = (clId, itemId, key, val) => {
    setChecklists(prev => prev.map(c => {
      if (c.id !== clId) return c
      return { ...c, items: c.items.map(i => i.id === itemId ? { ...i, [key]: val } : i) }
    }))
  }
  const uncheckAll = (clId) => {
    setChecklists(prev => prev.map(c => {
      if (c.id !== clId) return c
      return { ...c, items: c.items.map(i => ({ ...i, done: false })) }
    }))
  }
  const copyChecklist = (cl) => {
    const text = cl.items.map(i => `${i.done ? '☑' : '☐'} ${i.text}`).join('\n')
    navigator.clipboard.writeText(`${cl.name}\n${'─'.repeat(cl.name.length)}\n${text}`)
  }

  const active = checklists.find(c => c.id === activeId)

  return (
    <div className="space-y-5">
      {/* Template buttons */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-gray-500 dark:text-gray-400">New from template:</span>
        {Object.entries(TEMPLATES).map(([key, tpl]) => (
          <button key={key} onClick={() => addChecklist(key)} className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <Plus className="w-3.5 h-3.5" /> {tpl.name}
          </button>
        ))}
      </div>

      {/* Checklist list */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {checklists.map(cl => {
          const done = cl.items.filter(i => i.done).length
          const total = cl.items.length
          const pct = total ? Math.round((done / total) * 100) : 0
          return (
            <button key={cl.id} onClick={() => setActiveId(cl.id)} className={`text-left rounded-lg border p-3 transition-colors ${activeId === cl.id ? 'border-indigo-400 dark:border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20' : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-indigo-200'}`}>
              <div className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">{cl.name || 'Untitled'}</div>
              <div className="text-[10px] text-gray-500 dark:text-gray-400 mt-1">{done}/{total} ({pct}%)</div>
              <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full mt-1.5 overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full transition-all" style={{ width: `${pct}%` }} />
              </div>
            </button>
          )
        })}
      </div>

      {/* Active checklist */}
      {active ? (
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 space-y-3">
          <div className="flex items-center gap-2">
            <input value={active.name} onChange={(e) => updateName(active.id, e.target.value)} className="flex-1 bg-transparent text-sm font-semibold text-gray-800 dark:text-gray-200 outline-none border-b border-transparent focus:border-indigo-400" />
            <button onClick={() => uncheckAll(active.id)} title="Uncheck all" className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1"><RotateCcw className="w-4 h-4" /></button>
            <button onClick={() => copyChecklist(active)} title="Copy" className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1"><Copy className="w-4 h-4" /></button>
            <button onClick={() => removeChecklist(active.id)} className="text-red-400 hover:text-red-600 p-1"><Trash2 className="w-4 h-4" /></button>
          </div>
          {/* Progress */}
          {(() => {
            const done = active.items.filter(i => i.done).length
            const total = active.items.length
            const pct = total ? Math.round((done / total) * 100) : 0
            return (
              <div>
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                  <span>{done}/{total} complete</span><span>{pct}%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full transition-all" style={{ width: `${pct}%` }} />
                </div>
              </div>
            )
          })()}
          {/* Items */}
          <div className="space-y-1.5">
            {active.items.map(item => (
              <div key={item.id} className="flex items-center gap-2 group">
                <input type="checkbox" checked={item.done} onChange={(e) => updateItem(active.id, item.id, 'done', e.target.checked)} className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-indigo-500 focus:ring-indigo-500" />
                <input value={item.text} onChange={(e) => updateItem(active.id, item.id, 'text', e.target.value)} placeholder="Checklist item" className={`flex-1 bg-transparent border-b border-transparent focus:border-indigo-400 outline-none text-sm text-gray-800 dark:text-gray-200 placeholder:text-gray-400 ${item.done ? 'line-through opacity-60' : ''}`} />
                <button onClick={() => removeItem(active.id, item.id)} className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 p-0.5 transition-opacity"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            ))}
          </div>
          <button onClick={() => addItem(active.id)} className="text-xs text-indigo-500 hover:text-indigo-700 font-medium">+ Add Item</button>
        </div>
      ) : checklists.length > 0 ? (
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-8 text-center text-sm text-gray-400">
          Select a checklist to view and edit.
        </div>
      ) : (
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-8 text-center text-sm text-gray-400">
          Create a checklist from a template above.
        </div>
      )}
    </div>
  )
}
