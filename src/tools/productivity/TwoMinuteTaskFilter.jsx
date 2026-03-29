import { useState } from 'react'
import { Plus, Trash2, Zap, Clock } from 'lucide-react'

export default function TwoMinuteTaskFilter() {
  const [tasks, setTasks] = useState([])
  const [input, setInput] = useState('')
  const [estimateMin, setEstimateMin] = useState(2)

  const addTask = () => {
    const text = input.trim()
    if (!text) return
    setTasks(prev => [...prev, { id: Date.now(), text, estimate: estimateMin, done: false }])
    setInput('')
    setEstimateMin(2)
  }

  const toggleDone = (id) => setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t))
  const deleteTask = (id) => setTasks(prev => prev.filter(t => t.id !== id))
  const clearAll = () => setTasks([])

  const quickTasks = tasks.filter(t => t.estimate <= 2 && !t.done)
  const laterTasks = tasks.filter(t => t.estimate > 2 && !t.done)
  const doneTasks = tasks.filter(t => t.done)

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-cyan-200 dark:border-cyan-800 bg-cyan-50 dark:bg-cyan-900/20 px-4 py-3 text-sm text-cyan-700 dark:text-cyan-300">
        <strong>The 2-Minute Rule:</strong> If a task takes less than 2 minutes, do it now. Otherwise, schedule or delegate it.
      </div>

      <div className="flex gap-2">
        <input type="text" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && addTask()} className="input-field flex-1" placeholder="Enter a task…" />
        <div className="flex items-center gap-1">
          <input type="number" value={estimateMin} onChange={e => setEstimateMin(Number(e.target.value))} className="input-field w-16 text-center text-sm" min="1" max="60" />
          <span className="text-xs text-gray-400">min</span>
        </div>
        <button onClick={addTask} className="btn-primary flex items-center gap-1.5"><Plus className="w-4 h-4" /> Add</button>
      </div>

      {tasks.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-3 text-center">
            <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{tasks.length}</p>
            <p className="text-[10px] text-gray-500">Total</p>
          </div>
          <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-3 text-center">
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">{quickTasks.length}</p>
            <p className="text-[10px] text-gray-500">Do Now (≤2 min)</p>
          </div>
          <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-3 text-center">
            <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">{laterTasks.length}</p>
            <p className="text-[10px] text-gray-500">Schedule Later</p>
          </div>
        </div>
      )}

      {quickTasks.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-green-700 dark:text-green-400 flex items-center gap-1.5 mb-2"><Zap className="w-4 h-4" /> Do Now (≤ 2 minutes)</h3>
          <div className="space-y-1.5">
            {quickTasks.map(t => (
              <TaskRow key={t.id} task={t} onToggle={toggleDone} onDelete={deleteTask} accent="green" />
            ))}
          </div>
        </div>
      )}

      {laterTasks.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-amber-700 dark:text-amber-400 flex items-center gap-1.5 mb-2"><Clock className="w-4 h-4" /> Schedule / Delegate ({'>'}2 minutes)</h3>
          <div className="space-y-1.5">
            {laterTasks.map(t => (
              <TaskRow key={t.id} task={t} onToggle={toggleDone} onDelete={deleteTask} accent="amber" />
            ))}
          </div>
        </div>
      )}

      {doneTasks.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">Completed ({doneTasks.length})</h3>
          <div className="space-y-1">
            {doneTasks.map(t => (
              <TaskRow key={t.id} task={t} onToggle={toggleDone} onDelete={deleteTask} accent="gray" />
            ))}
          </div>
        </div>
      )}

      {tasks.length === 0 && (
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-8 text-center text-sm text-gray-400">
          Add tasks with time estimates to sort them by the 2-minute rule
        </div>
      )}

      {tasks.length > 0 && (
        <div className="flex justify-end">
          <button onClick={clearAll} className="text-xs text-red-400 hover:text-red-600">Clear all</button>
        </div>
      )}
    </div>
  )
}

function TaskRow({ task, onToggle, onDelete, accent }) {
  const accentMap = {
    green: 'border-green-200 dark:border-green-800',
    amber: 'border-amber-200 dark:border-amber-800',
    gray: 'border-gray-200 dark:border-gray-700'
  }
  return (
    <div className={`flex items-center gap-3 rounded-lg border ${accentMap[accent]} bg-white dark:bg-gray-900 px-3 py-2 group`}>
      <button onClick={() => onToggle(task.id)}
        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${task.done ? 'bg-green-500 border-green-500' : 'border-gray-300 dark:border-gray-600 hover:border-indigo-400'}`}>
        {task.done && <span className="text-white text-xs">✓</span>}
      </button>
      <span className={`flex-1 text-sm ${task.done ? 'line-through text-gray-400' : 'text-gray-700 dark:text-gray-300'}`}>{task.text}</span>
      <span className="text-xs text-gray-400">{task.estimate} min</span>
      <button onClick={() => onDelete(task.id)} className="text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100"><Trash2 className="w-3.5 h-3.5" /></button>
    </div>
  )
}
