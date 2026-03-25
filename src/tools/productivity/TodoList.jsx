import { useMemo, useState } from 'react'
import { Panel } from '../../components/ToolLayout.jsx'
import { useDebouncedStoredState, ProductivityNotice } from './shared.jsx'

const STORAGE_KEY = 'untrackt:productivity:todo-list'
const PRIORITIES = ['High', 'Medium', 'Low']

function createTask(text, priority, dueDate) {
  return {
    id: crypto.randomUUID(),
    text: text.trim(),
    completed: false,
    priority,
    dueDate,
    createdAt: Date.now(),
    selected: false,
  }
}

export default function TodoList() {
  const [tasks, setTasks] = useDebouncedStoredState(STORAGE_KEY, [], 300)
  const [text, setText] = useState('')
  const [priority, setPriority] = useState('Medium')
  const [dueDate, setDueDate] = useState('')
  const [filter, setFilter] = useState('All')
  const [sortBy, setSortBy] = useState('Added')
  const [query, setQuery] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [dragId, setDragId] = useState(null)

  const visibleTasks = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10)
    let next = tasks.filter((task) => task.text.toLowerCase().includes(query.trim().toLowerCase()))

    if (filter === 'Active') next = next.filter((task) => !task.completed)
    if (filter === 'Completed') next = next.filter((task) => task.completed)
    if (filter === 'Overdue') next = next.filter((task) => !task.completed && task.dueDate && task.dueDate < today)

    if (sortBy === 'Priority') {
      const order = { High: 0, Medium: 1, Low: 2 }
      next = [...next].sort((left, right) => order[left.priority] - order[right.priority])
    } else if (sortBy === 'Due date') {
      next = [...next].sort((left, right) => (left.dueDate || '9999').localeCompare(right.dueDate || '9999'))
    } else {
      next = [...next].sort((left, right) => left.createdAt - right.createdAt)
    }

    return next
  }, [filter, query, sortBy, tasks])

  const remaining = tasks.filter((task) => !task.completed).length

  const addTask = () => {
    if (!text.trim()) return
    setTasks((current) => [...current, createTask(text, priority, dueDate)])
    setText('')
    setDueDate('')
    setPriority('Medium')
  }

  const reorderTasks = (targetId) => {
    if (!dragId || dragId === targetId) return
    setTasks((current) => {
      const next = [...current]
      const fromIndex = next.findIndex((task) => task.id === dragId)
      const toIndex = next.findIndex((task) => task.id === targetId)
      if (fromIndex < 0 || toIndex < 0) return current
      const [moved] = next.splice(fromIndex, 1)
      next.splice(toIndex, 0, moved)
      return next
    })
  }

  return (
    <div className="space-y-6">
      <ProductivityNotice storageKey={STORAGE_KEY} onClear={() => setTasks([])} />

      <Panel>
        <div className="grid gap-3 lg:grid-cols-[1.4fr,0.8fr,0.8fr,auto]">
          <input className="input-field" value={text} onChange={(event) => setText(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') addTask() }} placeholder="Add a task" />
          <select className="input-field" value={priority} onChange={(event) => setPriority(event.target.value)}>{PRIORITIES.map((level) => <option key={level}>{level}</option>)}</select>
          <input className="input-field" type="date" value={dueDate} onChange={(event) => setDueDate(event.target.value)} />
          <button type="button" className="btn-primary" onClick={addTask}>Add task</button>
        </div>
      </Panel>

      <Panel>
        <div className="grid gap-3 lg:grid-cols-[auto,auto,1fr,1fr,auto,auto,auto]">
          <select className="input-field" value={filter} onChange={(event) => setFilter(event.target.value)}>{['All', 'Active', 'Completed', 'Overdue'].map((option) => <option key={option}>{option}</option>)}</select>
          <select className="input-field" value={sortBy} onChange={(event) => setSortBy(event.target.value)}>{['Added', 'Priority', 'Due date'].map((option) => <option key={option}>{option}</option>)}</select>
          <input className="input-field lg:col-span-2" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search tasks" />
          <button type="button" className="btn-secondary" onClick={() => setTasks((current) => current.map((task) => ({ ...task, selected: true })))}>Select all</button>
          <button type="button" className="btn-secondary" onClick={() => setTasks((current) => current.filter((task) => !task.completed))}>Clear completed</button>
          <button type="button" className="btn-secondary" onClick={() => setTasks((current) => current.filter((task) => !task.selected))}>Delete selected</button>
        </div>
      </Panel>

      <Panel>
        <div className="space-y-3">
          {visibleTasks.map((task) => {
            const overdue = !task.completed && task.dueDate && task.dueDate < new Date().toISOString().slice(0, 10)
            return (
              <div
                key={task.id}
                draggable
                onDragStart={() => setDragId(task.id)}
                onDragOver={(event) => event.preventDefault()}
                onDrop={() => reorderTasks(task.id)}
                className={`group grid gap-3 rounded-2xl border p-4 dark:border-gray-700 md:grid-cols-[auto,1fr,auto,auto,auto,auto] ${task.completed ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20' : overdue ? 'border-rose-200 bg-rose-50 dark:border-rose-800 dark:bg-rose-950/20' : 'border-gray-200 bg-white dark:bg-gray-900'}`}
              >
                <input type="checkbox" checked={task.selected} onChange={(event) => setTasks((current) => current.map((entry) => entry.id === task.id ? { ...entry, selected: event.target.checked } : entry))} className="mt-1 h-4 w-4 rounded border-gray-300 text-indigo-600" />
                <div className="space-y-2">
                  {editingId === task.id ? (
                    <input className="input-field" value={task.text} onChange={(event) => setTasks((current) => current.map((entry) => entry.id === task.id ? { ...entry, text: event.target.value } : entry))} onBlur={() => setEditingId(null)} autoFocus />
                  ) : (
                    <button type="button" className={`text-left font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-900 dark:text-gray-100'}`} onClick={() => setEditingId(task.id)}>{task.text}</button>
                  )}
                  <div className="flex flex-wrap gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <span className={`rounded-full px-2 py-1 ${task.priority === 'High' ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300' : task.priority === 'Medium' ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300' : 'bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-300'}`}>{task.priority}</span>
                    {task.dueDate ? <span>Due {task.dueDate}</span> : null}
                  </div>
                </div>
                <input type="checkbox" checked={task.completed} onChange={(event) => setTasks((current) => current.map((entry) => entry.id === task.id ? { ...entry, completed: event.target.checked } : entry))} className="mt-1 h-4 w-4 rounded border-gray-300 text-indigo-600" />
                <select className="input-field min-w-[110px]" value={task.priority} onChange={(event) => setTasks((current) => current.map((entry) => entry.id === task.id ? { ...entry, priority: event.target.value } : entry))}>{PRIORITIES.map((level) => <option key={level}>{level}</option>)}</select>
                <input className="input-field min-w-[150px]" type="date" value={task.dueDate || ''} onChange={(event) => setTasks((current) => current.map((entry) => entry.id === task.id ? { ...entry, dueDate: event.target.value } : entry))} />
                <button type="button" className="opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity text-sm text-rose-600 dark:text-rose-300" onClick={() => setTasks((current) => current.filter((entry) => entry.id !== task.id))}>Delete</button>
              </div>
            )
          })}
          {visibleTasks.length === 0 ? <p className="text-sm text-gray-500 dark:text-gray-400">No tasks match the current filters.</p> : null}
        </div>
      </Panel>

      <p className="text-sm text-gray-500 dark:text-gray-400">{remaining} tasks remaining</p>
    </div>
  )
}
