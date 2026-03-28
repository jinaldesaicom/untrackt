import { useState, useEffect } from 'react'
import { Plus, Trash2, GripVertical, Check } from 'lucide-react'
import { getItem, setItem } from '../../utils/storage'

const STORAGE_KEY = 'untrackt_todo_list'

export default function TodoList() {
  const [todos, setTodos] = useState(() => getItem(STORAGE_KEY, []))
  const [input, setInput] = useState('')
  const [filter, setFilter] = useState('all')
  const [dragIdx, setDragIdx] = useState(null)

  useEffect(() => { setItem(STORAGE_KEY, todos) }, [todos])

  const addTodo = () => {
    const text = input.trim()
    if (!text) return
    setTodos(prev => [...prev, { id: Date.now(), text, done: false, createdAt: new Date().toISOString() }])
    setInput('')
  }

  const toggleTodo = (id) => setTodos(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t))
  const deleteTodo = (id) => setTodos(prev => prev.filter(t => t.id !== id))
  const clearCompleted = () => setTodos(prev => prev.filter(t => !t.done))

  const handleDragStart = (idx) => setDragIdx(idx)
  const handleDragOver = (e, idx) => {
    e.preventDefault()
    if (dragIdx === null || dragIdx === idx) return
    setTodos(prev => {
      const n = [...prev]
      const [item] = n.splice(dragIdx, 1)
      n.splice(idx, 0, item)
      return n
    })
    setDragIdx(idx)
  }
  const handleDragEnd = () => setDragIdx(null)

  const filtered = filter === 'all' ? todos : filter === 'active' ? todos.filter(t => !t.done) : todos.filter(t => t.done)
  const activeCount = todos.filter(t => !t.done).length
  const completedCount = todos.filter(t => t.done).length

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input type="text" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && addTodo()} className="input-field flex-1" placeholder="What needs to be done?" />
        <button onClick={addTodo} className="btn-primary flex items-center gap-1.5"><Plus className="w-4 h-4" /> Add</button>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-1">
          {['all', 'active', 'completed'].map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1 text-xs rounded-full border ${filter === f ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700'}`}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
          <span>{activeCount} active</span>
          <span>{completedCount} done</span>
          {completedCount > 0 && <button onClick={clearCompleted} className="text-red-500 hover:text-red-600">Clear completed</button>}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-8 text-center text-sm text-gray-400">
          {todos.length === 0 ? 'No tasks yet — add one above!' : 'No tasks match this filter.'}
        </div>
      ) : (
        <div className="space-y-1.5">
          {filtered.map((todo, idx) => (
            <div key={todo.id} draggable onDragStart={() => handleDragStart(idx)} onDragOver={e => handleDragOver(e, idx)} onDragEnd={handleDragEnd}
              className={`flex items-center gap-3 rounded-lg border px-3 py-2.5 transition-colors cursor-grab active:cursor-grabbing ${dragIdx === idx ? 'border-indigo-300 bg-indigo-50 dark:bg-indigo-900/20' : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800/50'}`}>
              <GripVertical className="w-3.5 h-3.5 text-gray-300 dark:text-gray-600 flex-shrink-0" />
              <button onClick={() => toggleTodo(todo.id)} className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${todo.done ? 'bg-green-500 border-green-500' : 'border-gray-300 dark:border-gray-600 hover:border-indigo-400'}`}>
                {todo.done && <Check className="w-3 h-3 text-white" />}
              </button>
              <span className={`flex-1 text-sm ${todo.done ? 'line-through text-gray-400' : 'text-gray-800 dark:text-gray-200'}`}>{todo.text}</span>
              <button onClick={() => deleteTodo(todo.id)} className="text-gray-300 hover:text-red-500 dark:text-gray-600 dark:hover:text-red-400 transition-colors">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {todos.length > 0 && (
        <div className="h-2 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
          <div className="h-full bg-green-500 rounded-full transition-all" style={{ width: `${todos.length > 0 ? (completedCount / todos.length * 100) : 0}%` }} />
        </div>
      )}
    </div>
  )
}
