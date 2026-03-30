import { useState, useEffect } from 'react'
import { Plus, Trash2, AlertTriangle } from 'lucide-react'
import { getItem, setItem } from '../../utils/storage'

const STORAGE_KEY = 'untrackt_resource_allocation'

function emptyResource() { return { id: Date.now(), name: '', role: '' } }
function emptyTask() { return { id: Date.now(), name: '', assignments: {} } } // assignments: { resourceId: percent }

export default function ResourceAllocationPlanner() {
  const [resources, setResources] = useState(() => getItem(STORAGE_KEY + '_res', []))
  const [tasks, setTasks] = useState(() => getItem(STORAGE_KEY + '_tasks', []))

  useEffect(() => { setItem(STORAGE_KEY + '_res', resources) }, [resources])
  useEffect(() => { setItem(STORAGE_KEY + '_tasks', tasks) }, [tasks])

  const addResource = () => setResources(prev => [...prev, emptyResource()])
  const removeResource = (id) => {
    setResources(prev => prev.filter(r => r.id !== id))
    setTasks(prev => prev.map(t => {
      const a = { ...t.assignments }; delete a[id]; return { ...t, assignments: a }
    }))
  }
  const updateResource = (id, key, val) => setResources(prev => prev.map(r => r.id === id ? { ...r, [key]: val } : r))

  const addTask = () => setTasks(prev => [...prev, emptyTask()])
  const removeTask = (id) => setTasks(prev => prev.filter(t => t.id !== id))
  const updateTaskName = (id, name) => setTasks(prev => prev.map(t => t.id === id ? { ...t, name } : t))
  const updateAssignment = (taskId, resId, pct) => {
    const val = Math.max(0, Math.min(100, parseInt(pct) || 0))
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, assignments: { ...t.assignments, [resId]: val } } : t))
  }

  // Compute totals per resource
  const totals = {}
  resources.forEach(r => { totals[r.id] = 0 })
  tasks.forEach(t => {
    Object.entries(t.assignments).forEach(([rid, pct]) => {
      if (totals[rid] !== undefined) totals[rid] += pct
    })
  })

  return (
    <div className="space-y-5">
      {/* Resources */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Resources</h3>
          <button onClick={addResource} className="btn-primary flex items-center gap-1.5 text-sm"><Plus className="w-4 h-4" /> Add Person</button>
        </div>
        <div className="space-y-1.5">
          {resources.map(r => {
            const over = totals[r.id] > 100
            return (
              <div key={r.id} className={`flex items-center gap-2 rounded-lg border p-2 ${over ? 'border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20' : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900'}`}>
                <input value={r.name} onChange={(e) => updateResource(r.id, 'name', e.target.value)} placeholder="Name" className="flex-1 min-w-[100px] bg-transparent border-b border-transparent focus:border-indigo-400 outline-none text-sm text-gray-800 dark:text-gray-200 placeholder:text-gray-400" />
                <input value={r.role} onChange={(e) => updateResource(r.id, 'role', e.target.value)} placeholder="Role" className="w-28 bg-transparent border-b border-transparent focus:border-indigo-400 outline-none text-xs text-gray-500 dark:text-gray-400 placeholder:text-gray-400" />
                <span className={`text-xs font-semibold w-14 text-right ${over ? 'text-red-600 dark:text-red-400' : 'text-gray-600 dark:text-gray-400'}`}>{totals[r.id]}%</span>
                {over && <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" />}
                <button onClick={() => removeResource(r.id)} className="text-red-400 hover:text-red-600 p-1"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            )
          })}
          {resources.length === 0 && <p className="text-xs text-gray-400 py-2">Add resources to assign to tasks.</p>}
        </div>
      </div>

      {/* Allocation matrix */}
      {resources.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Tasks &amp; Allocation</h3>
            <button onClick={addTask} className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors"><Plus className="w-3.5 h-3.5" /> Task</button>
          </div>
          <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <th className="px-3 py-2 text-left text-gray-500 dark:text-gray-400 min-w-[150px]">Task</th>
                  {resources.map(r => <th key={r.id} className="px-2 py-2 text-center text-gray-500 dark:text-gray-400 min-w-[80px]">{r.name || 'Unnamed'}</th>)}
                  <th className="px-2 py-2 w-8" />
                </tr>
              </thead>
              <tbody>
                {tasks.map(t => (
                  <tr key={t.id} className="border-b border-gray-50 dark:border-gray-800/50">
                    <td className="px-3 py-1.5">
                      <input value={t.name} onChange={(e) => updateTaskName(t.id, e.target.value)} placeholder="Task name" className="w-full bg-transparent outline-none text-gray-800 dark:text-gray-200 placeholder:text-gray-400" />
                    </td>
                    {resources.map(r => (
                      <td key={r.id} className="px-1 py-1 text-center">
                        <input type="number" min={0} max={100} value={t.assignments[r.id] || ''} onChange={(e) => updateAssignment(t.id, r.id, e.target.value)} placeholder="0" className="w-14 text-center bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-1 py-0.5 text-gray-700 dark:text-gray-300" />
                      </td>
                    ))}
                    <td className="px-1 py-1 text-center">
                      <button onClick={() => removeTask(t.id)} className="text-red-400 hover:text-red-600 p-0.5"><Trash2 className="w-3.5 h-3.5" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {tasks.length === 0 && <p className="text-xs text-gray-400 py-2 text-center">Add tasks to allocate resources.</p>}
        </div>
      )}
    </div>
  )
}
