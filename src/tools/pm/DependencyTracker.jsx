import { useState, useEffect } from 'react'
import { Plus, Trash2, AlertCircle, CheckCircle } from 'lucide-react'
import { getItem, setItem } from '../../utils/storage'

const STORAGE_KEY = 'untrackt_dependency_tracker'

function emptyTask() {
  return { id: Date.now(), name: '', dependsOn: [] }
}

export default function DependencyTracker() {
  const [tasks, setTasks] = useState(() => getItem(STORAGE_KEY, []))

  useEffect(() => { setItem(STORAGE_KEY, tasks) }, [tasks])

  const add = () => setTasks(prev => [...prev, emptyTask()])
  const remove = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id).map(t => ({
      ...t, dependsOn: t.dependsOn.filter(d => d !== id),
    })))
  }
  const updateName = (id, name) => setTasks(prev => prev.map(t => t.id === id ? { ...t, name } : t))
  const toggleDep = (taskId, depId) => {
    setTasks(prev => prev.map(t => {
      if (t.id !== taskId) return t
      const deps = t.dependsOn.includes(depId) ? t.dependsOn.filter(d => d !== depId) : [...t.dependsOn, depId]
      return { ...t, dependsOn: deps }
    }))
  }

  // Compute blocked status
  const completed = new Set() // In this simple tool, no completion — track blocking chains
  const isBlocked = (task) => {
    return task.dependsOn.length > 0
  }

  // Simple graph: tasks are nodes, dependencies are edges
  const graphH = Math.max(200, tasks.length * 50 + 40)
  const graphW = 500
  const nodeW = 120
  const nodeH = 28

  const positions = tasks.map((t, i) => ({
    id: t.id,
    x: (i % 3) * 170 + 30,
    y: Math.floor(i / 3) * 60 + 20,
  }))
  const posMap = {}
  positions.forEach(p => { posMap[p.id] = p })

  return (
    <div className="space-y-5">
      {/* Task list */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500 dark:text-gray-400">{tasks.length} task{tasks.length !== 1 ? 's' : ''}</span>
        <button onClick={add} className="btn-primary flex items-center gap-1.5 text-sm"><Plus className="w-4 h-4" /> Add Task</button>
      </div>

      <div className="space-y-2">
        {tasks.map(t => {
          const blocked = isBlocked(t)
          return (
            <div key={t.id} className={`rounded-lg border p-3 space-y-2 ${blocked ? 'border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-900/10' : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900'}`}>
              <div className="flex items-center gap-2">
                {blocked ? <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" /> : <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />}
                <input value={t.name} onChange={(e) => updateName(t.id, e.target.value)} placeholder="Task name" className="flex-1 bg-transparent border-b border-transparent focus:border-indigo-400 outline-none text-sm text-gray-800 dark:text-gray-200 placeholder:text-gray-400" />
                <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full ${blocked ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300' : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'}`}>
                  {blocked ? 'Blocked' : 'Unblocked'}
                </span>
                <button onClick={() => remove(t.id)} className="text-red-400 hover:text-red-600 p-1"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
              {tasks.length > 1 && (
                <div className="flex flex-wrap items-center gap-1.5 pl-6">
                  <span className="text-[10px] text-gray-400 mr-1">Depends on:</span>
                  {tasks.filter(x => x.id !== t.id).map(x => (
                    <button key={x.id} onClick={() => toggleDep(t.id, x.id)} className={`text-[10px] px-2 py-0.5 rounded-full border transition-colors ${t.dependsOn.includes(x.id) ? 'bg-indigo-100 dark:bg-indigo-900/30 border-indigo-300 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300' : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400'}`}>
                      {x.name || 'Unnamed'}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Simple graph */}
      {tasks.length > 1 && (
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 overflow-x-auto">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Dependency Graph</h3>
          <svg width={graphW} height={graphH} className="font-sans">
            {/* Edges */}
            {tasks.flatMap(t => t.dependsOn.map(depId => {
              const from = posMap[depId]
              const to = posMap[t.id]
              if (!from || !to) return null
              return <line key={`${depId}-${t.id}`} x1={from.x + nodeW / 2} y1={from.y + nodeH} x2={to.x + nodeW / 2} y2={to.y} stroke="currentColor" className="text-indigo-300 dark:text-indigo-700" strokeWidth={1.5} markerEnd="url(#depArrow)" />
            }))}
            {/* Nodes */}
            {positions.map(p => {
              const task = tasks.find(t => t.id === p.id)
              const blocked = task && isBlocked(task)
              return (
                <g key={p.id}>
                  <rect x={p.x} y={p.y} width={nodeW} height={nodeH} rx={6} className={blocked ? 'fill-amber-100 dark:fill-amber-900/30 stroke-amber-300 dark:stroke-amber-700' : 'fill-green-50 dark:fill-green-900/20 stroke-green-300 dark:stroke-green-700'} strokeWidth={1} />
                  <text x={p.x + nodeW / 2} y={p.y + nodeH / 2 + 4} textAnchor="middle" className="fill-gray-700 dark:fill-gray-300" fontSize={10}>{task?.name || 'Unnamed'}</text>
                </g>
              )
            })}
            <defs>
              <marker id="depArrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                <polygon points="0 0, 8 3, 0 6" className="fill-indigo-300 dark:fill-indigo-700" />
              </marker>
            </defs>
          </svg>
        </div>
      )}

      {tasks.length === 0 && (
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-8 text-center text-sm text-gray-400">
          Add tasks and set dependencies to track blocked/unblocked status.
        </div>
      )}
    </div>
  )
}
