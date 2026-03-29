import { useState, useEffect } from 'react'
import { Plus, Trash2, Check } from 'lucide-react'
import { getItem, setItem } from '../../utils/storage'

const STORAGE_KEY = 'untrackt_smart_goals'

const FIELDS = [
  { key: 'specific', label: 'Specific', prompt: 'What exactly do you want to achieve?' },
  { key: 'measurable', label: 'Measurable', prompt: 'How will you measure progress?' },
  { key: 'achievable', label: 'Achievable', prompt: 'Is this realistic? What resources do you need?' },
  { key: 'relevant', label: 'Relevant', prompt: 'Why does this matter? How does it align with broader goals?' },
  { key: 'timeBound', label: 'Time-bound', prompt: 'What is the deadline or timeframe?' },
]

function emptyGoal() {
  return { id: Date.now(), title: '', specific: '', measurable: '', achievable: '', relevant: '', timeBound: '', done: false, createdAt: new Date().toISOString() }
}

export default function SMARTGoalSetter() {
  const [goals, setGoals] = useState(() => getItem(STORAGE_KEY, []))
  const [activeGoal, setActiveGoal] = useState(null)

  useEffect(() => { setItem(STORAGE_KEY, goals) }, [goals])

  const addGoal = () => {
    if (goals.length >= 10) return
    const g = emptyGoal()
    setGoals(prev => [g, ...prev])
    setActiveGoal(g.id)
  }

  const updateGoal = (id, key, val) => setGoals(prev => prev.map(g => g.id === id ? { ...g, [key]: val } : g))
  const deleteGoal = (id) => { setGoals(prev => prev.filter(g => g.id !== id)); if (activeGoal === id) setActiveGoal(null) }
  const toggleDone = (id) => setGoals(prev => prev.map(g => g.id === id ? { ...g, done: !g.done } : g))

  const current = goals.find(g => g.id === activeGoal)

  const completeness = (g) => {
    const filled = FIELDS.filter(f => g[f.key]?.trim()).length
    return Math.round((filled / FIELDS.length) * 100)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500 dark:text-gray-400">{goals.length}/10 goals</p>
        <button onClick={addGoal} disabled={goals.length >= 10} className="btn-primary flex items-center gap-1.5 disabled:opacity-50"><Plus className="w-4 h-4" /> New Goal</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="space-y-2">
          {goals.length === 0 && (
            <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-6 text-center text-sm text-gray-400">
              No goals yet — click "New Goal" to start!
            </div>
          )}
          {goals.map(g => (
            <button key={g.id} onClick={() => setActiveGoal(g.id)}
              className={`w-full text-left rounded-lg border px-3 py-2.5 transition-colors ${activeGoal === g.id ? 'border-indigo-300 dark:border-indigo-700 bg-indigo-50 dark:bg-indigo-900/20' : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-indigo-200'}`}>
              <div className="flex items-center justify-between">
                <span className={`text-sm font-medium truncate ${g.done ? 'line-through text-gray-400' : 'text-gray-800 dark:text-gray-200'}`}>{g.title || 'Untitled Goal'}</span>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-[10px] text-gray-400">{completeness(g)}%</span>
                  {g.done && <Check className="w-3.5 h-3.5 text-green-500" />}
                </div>
              </div>
              <div className="mt-1 h-1 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${completeness(g)}%` }} />
              </div>
            </button>
          ))}
        </div>

        <div className="lg:col-span-2">
          {current ? (
            <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 space-y-4">
              <div className="flex items-center justify-between">
                <input type="text" value={current.title} onChange={e => updateGoal(current.id, 'title', e.target.value)} className="text-lg font-semibold text-gray-900 dark:text-white bg-transparent outline-none flex-1" placeholder="Goal title…" />
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button onClick={() => toggleDone(current.id)} className={`px-2.5 py-1 rounded-full text-xs border ${current.done ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800' : 'border-gray-200 dark:border-gray-700 text-gray-500'}`}>
                    {current.done ? '✓ Complete' : 'Mark complete'}
                  </button>
                  <button onClick={() => deleteGoal(current.id)} className="text-gray-300 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>

              {FIELDS.map(field => (
                <div key={field.key}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold mr-1.5">{field.label[0]}</span>
                    {field.label}
                  </label>
                  <textarea value={current[field.key]} onChange={e => updateGoal(current.id, field.key, e.target.value)}
                    className="textarea-field min-h-[60px] text-sm" placeholder={field.prompt} />
                </div>
              ))}

              <div className="rounded-lg bg-gray-50 dark:bg-gray-800 p-3">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Completeness</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                    <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${completeness(current)}%` }} />
                  </div>
                  <span className="text-sm font-bold text-gray-900 dark:text-white">{completeness(current)}%</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-8 text-center text-sm text-gray-400">
              Select a goal to edit, or create a new one
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
