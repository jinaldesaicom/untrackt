import { useState, useEffect } from 'react'
import { Plus, Trash2, AlertTriangle } from 'lucide-react'
import { getItem, setItem } from '../../utils/storage'

const STORAGE_KEY = 'untrackt_workload_calc'

function emptyPerson() { return { id: Date.now(), name: '', maxHours: 40 } }
function emptyTask() { return { id: Date.now(), name: '', hours: '', assignee: '' } }

export default function WorkloadCalculator() {
  const [people, setPeople] = useState(() => getItem(STORAGE_KEY + '_people', []))
  const [tasks, setTasks] = useState(() => getItem(STORAGE_KEY + '_tasks', []))

  useEffect(() => { setItem(STORAGE_KEY + '_people', people) }, [people])
  useEffect(() => { setItem(STORAGE_KEY + '_tasks', tasks) }, [tasks])

  const addPerson = () => setPeople(prev => [...prev, emptyPerson()])
  const removePerson = (id) => {
    setPeople(prev => prev.filter(p => p.id !== id))
    setTasks(prev => prev.map(t => t.assignee === String(id) ? { ...t, assignee: '' } : t))
  }
  const updatePerson = (id, key, val) => setPeople(prev => prev.map(p => p.id === id ? { ...p, [key]: val } : p))

  const addTask = () => setTasks(prev => [...prev, emptyTask()])
  const removeTask = (id) => setTasks(prev => prev.filter(t => t.id !== id))
  const updateTask = (id, key, val) => setTasks(prev => prev.map(t => t.id === id ? { ...t, [key]: val } : t))

  // Compute load per person
  const load = {}
  people.forEach(p => { load[p.id] = { assigned: 0, taskCount: 0 } })
  tasks.forEach(t => {
    if (t.assignee && load[t.assignee]) {
      load[t.assignee].assigned += parseFloat(t.hours) || 0
      load[t.assignee].taskCount++
    }
  })

  return (
    <div className="space-y-5">
      {/* People */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Team Members</h3>
          <button onClick={addPerson} className="btn-primary flex items-center gap-1.5 text-sm"><Plus className="w-4 h-4" /> Add Person</button>
        </div>
        <div className="space-y-1.5">
          {people.map(p => {
            const l = load[p.id] || { assigned: 0, taskCount: 0 }
            const pct = p.maxHours > 0 ? Math.round((l.assigned / p.maxHours) * 100) : 0
            const over = pct > 100
            return (
              <div key={p.id} className={`flex items-center gap-2 rounded-lg border p-2 ${over ? 'border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20' : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900'}`}>
                <input value={p.name} onChange={(e) => updatePerson(p.id, 'name', e.target.value)} placeholder="Name" className="flex-1 min-w-[100px] bg-transparent border-b border-transparent focus:border-indigo-400 outline-none text-sm text-gray-800 dark:text-gray-200 placeholder:text-gray-400" />
                <input type="number" min={0} value={p.maxHours} onChange={(e) => updatePerson(p.id, 'maxHours', Number(e.target.value))} className="w-16 text-center bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-1 py-0.5 text-xs text-gray-700 dark:text-gray-300" />
                <span className="text-[10px] text-gray-400">max h</span>
                <div className="w-24">
                  <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all ${over ? 'bg-red-500' : pct > 80 ? 'bg-amber-500' : 'bg-indigo-500'}`} style={{ width: `${Math.min(pct, 100)}%` }} />
                  </div>
                  <span className={`text-[10px] ${over ? 'text-red-600 dark:text-red-400' : 'text-gray-500 dark:text-gray-400'}`}>{l.assigned}h / {p.maxHours}h ({pct}%)</span>
                </div>
                {over && <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" />}
                <button onClick={() => removePerson(p.id)} className="text-red-400 hover:text-red-600 p-1"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            )
          })}
          {people.length === 0 && <p className="text-xs text-gray-400 py-2">Add team members to see workload.</p>}
        </div>
      </div>

      {/* Tasks */}
      {people.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Tasks</h3>
            <button onClick={addTask} className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors"><Plus className="w-3.5 h-3.5" /> Task</button>
          </div>
          <div className="space-y-1.5">
            {tasks.map((t, i) => (
              <div key={t.id} className="flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-2">
                <span className="text-xs text-gray-400 w-5 text-right">{i + 1}</span>
                <input value={t.name} onChange={(e) => updateTask(t.id, 'name', e.target.value)} placeholder="Task name" className="flex-1 min-w-[100px] bg-transparent border-b border-transparent focus:border-indigo-400 outline-none text-sm text-gray-800 dark:text-gray-200 placeholder:text-gray-400" />
                <input type="number" min={0} step={0.5} value={t.hours} onChange={(e) => updateTask(t.id, 'hours', e.target.value)} placeholder="Hours" className="w-20 text-center bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-2 py-1 text-sm text-gray-700 dark:text-gray-300" />
                <select value={t.assignee} onChange={(e) => updateTask(t.id, 'assignee', e.target.value)} className="text-xs bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-2 py-1 text-gray-700 dark:text-gray-300 w-28">
                  <option value="">Unassigned</option>
                  {people.map(p => <option key={p.id} value={p.id}>{p.name || 'Unnamed'}</option>)}
                </select>
                <button onClick={() => removeTask(t.id)} className="text-red-400 hover:text-red-600 p-1"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            ))}
            {tasks.length === 0 && <p className="text-xs text-gray-400 py-2 text-center">Add tasks to calculate workload.</p>}
          </div>
        </div>
      )}
    </div>
  )
}
