import { useMemo, useState } from 'react'
import { Panel, SegmentedToggle } from '../../components/ToolLayout.jsx'
import { ProductivityNotice, useStoredState } from './shared.jsx'

const STORAGE_KEY = 'untrackt:productivity:brain-dump'

function createItem(text) {
  return { id: crypto.randomUUID(), text, createdAt: Date.now(), tag: '', promoted: false, archived: false }
}

export default function BrainDumpCapture() {
  const [items, setItems] = useStoredState(STORAGE_KEY, [])
  const [mode, setMode] = useState('capture')
  const [text, setText] = useState('')
  const [filter, setFilter] = useState('All')

  const visibleItems = useMemo(() => {
    const next = items.filter((item) => {
      if (filter === 'Unprocessed') return !item.tag && !item.archived
      if (filter === 'Tagged') return Boolean(item.tag)
      if (filter === 'Task' || filter === 'Idea' || filter === 'Question' || filter === 'Reference' || filter === 'Someday' || filter === 'Delete') return item.tag === filter
      return true
    })
    return [...next].sort((left, right) => right.createdAt - left.createdAt)
  }, [filter, items])

  const addItem = () => {
    if (!text.trim()) return
    setItems((current) => [...current.slice(-199), createItem(text.trim())])
    setText('')
  }

  return (
    <div className="space-y-6">
      <ProductivityNotice storageKey={STORAGE_KEY} onClear={() => setItems([])} />

      <Panel>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <SegmentedToggle value={mode} onChange={setMode} options={[{ label: 'Capture', value: 'capture' }, { label: 'Organize', value: 'organize' }]} />
          <p className="text-sm text-gray-500 dark:text-gray-400">Don't organize while capturing. Just capture everything.</p>
        </div>
      </Panel>

      {mode === 'capture' ? (
        <Panel>
          <div className="flex gap-3">
            <input className="input-field flex-1" value={text} onChange={(event) => setText(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') addItem() }} placeholder="Capture a thought and press Enter" autoFocus />
            <button type="button" className="btn-primary" onClick={addItem}>Add</button>
          </div>
        </Panel>
      ) : null}

      <Panel>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Captured items</h2>
          <select className="input-field w-auto" value={filter} onChange={(event) => setFilter(event.target.value)}>{['All', 'Unprocessed', 'Tagged', 'Task', 'Idea', 'Question', 'Reference', 'Someday', 'Delete'].map((option) => <option key={option}>{option}</option>)}</select>
        </div>
        <div className="mt-4 space-y-3">
          {visibleItems.map((item) => (
            <div key={item.id} className="rounded-2xl border border-gray-200 p-4 dark:border-gray-700">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">{item.text}</p>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{new Date(item.createdAt).toLocaleString()}</p>
                </div>
                <button type="button" className="text-sm text-rose-600 dark:text-rose-300" onClick={() => setItems((current) => current.filter((entry) => entry.id !== item.id))}>Delete</button>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <select className="input-field w-auto" value={item.tag} onChange={(event) => setItems((current) => current.map((entry) => entry.id === item.id ? { ...entry, tag: event.target.value } : entry))}><option value="">Tag</option><option>Task</option><option>Idea</option><option>Question</option><option>Reference</option><option>Someday</option><option>Delete</option></select>
                <button type="button" className="btn-secondary" onClick={() => setItems((current) => current.map((entry) => entry.id === item.id ? { ...entry, promoted: true, tag: 'Task' } : entry))}>Promote to todo</button>
                <button type="button" className="btn-secondary" onClick={() => setItems((current) => current.map((entry) => entry.id === item.id ? { ...entry, archived: true } : entry))}>Archive processed</button>
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  )
}
