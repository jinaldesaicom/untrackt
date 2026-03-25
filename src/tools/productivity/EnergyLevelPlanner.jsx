import { useMemo, useState } from 'react'
import CopyButton from '../../components/CopyButton.jsx'
import { Panel } from '../../components/ToolLayout.jsx'
import { ProductivityNotice, useStoredState } from './shared.jsx'

const STORAGE_KEY = 'untrackt:productivity:energy-planner'

const PRESETS = {
  'Morning person': [5, 5, 4, 4, 3, 2, 2, 1, 1, 1, 1, 1],
  'Night owl': [1, 1, 1, 1, 2, 3, 4, 5, 5, 4, 3, 2],
  'Afternoon peak': [2, 2, 3, 4, 5, 5, 4, 3, 2, 2, 1, 1],
  Custom: [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
}

function createTask() {
  return { id: crypto.randomUUID(), name: '', energy: 'High', duration: 60 }
}

export default function EnergyLevelPlanner() {
  const [state, setState] = useStoredState(STORAGE_KEY, { profile: 'Morning person', levels: PRESETS['Morning person'], tasks: [createTask()] })

  const suggested = useMemo(() => {
    const taskOrder = { High: 5, Medium: 3, Low: 1 }
    return state.tasks.map((task) => {
      const target = taskOrder[task.energy]
      const bestIndex = state.levels.reduce((best, level, index) => Math.abs(level - target) < Math.abs(state.levels[best] - target) ? index : best, 0)
      const matchLevel = Math.abs(state.levels[bestIndex] - target)
      return { ...task, slot: bestIndex, match: matchLevel === 0 ? 'Green' : matchLevel === 1 ? 'Amber' : 'Red' }
    })
  }, [state.levels, state.tasks])

  const scheduleText = suggested.map((task) => `${task.name || 'Untitled task'} · ${task.energy} energy · Suggested ${task.slot * 2}:00-${task.slot * 2 + 2}:00`).join('\n')

  return (
    <div className="space-y-6">
      <ProductivityNotice storageKey={STORAGE_KEY} onClear={() => setState({ profile: 'Morning person', levels: PRESETS['Morning person'], tasks: [createTask()] })} />

      <Panel>
        <div className="grid gap-3 lg:grid-cols-[220px,auto]">
          <select className="input-field" value={state.profile} onChange={(event) => setState((current) => ({ ...current, profile: event.target.value, levels: [...PRESETS[event.target.value]] }))}>{Object.keys(PRESETS).map((profile) => <option key={profile}>{profile}</option>)}</select>
          <CopyButton text={scheduleText} label="Copy suggested schedule" />
        </div>
      </Panel>

      <div className="grid gap-6 xl:grid-cols-[1fr,1fr]">
        <Panel>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Energy profile</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {state.levels.map((level, index) => <label key={index} className="rounded-2xl border border-gray-200 p-3 dark:border-gray-700">{index * 2}:00 - {index * 2 + 2}:00<input className="mt-2 w-full" type="range" min="1" max="5" value={level} onChange={(event) => setState((current) => ({ ...current, profile: 'Custom', levels: current.levels.map((entry, entryIndex) => entryIndex === index ? Number(event.target.value) : entry) }))} /></label>)}
          </div>
        </Panel>

        <Panel>
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Tasks</h2>
            <button type="button" className="btn-secondary" onClick={() => setState((current) => ({ ...current, tasks: [...current.tasks, createTask()] }))}>Add task</button>
          </div>
          <div className="mt-4 space-y-3">
            {state.tasks.map((task) => <div key={task.id} className="grid gap-3 rounded-2xl border border-gray-200 p-3 dark:border-gray-700 md:grid-cols-[1fr,160px,140px]"><input className="input-field" value={task.name} onChange={(event) => setState((current) => ({ ...current, tasks: current.tasks.map((entry) => entry.id === task.id ? { ...entry, name: event.target.value } : entry) }))} placeholder="Task name" /><select className="input-field" value={task.energy} onChange={(event) => setState((current) => ({ ...current, tasks: current.tasks.map((entry) => entry.id === task.id ? { ...entry, energy: event.target.value } : entry) }))}><option>High</option><option>Medium</option><option>Low</option></select><input className="input-field" type="number" value={task.duration} onChange={(event) => setState((current) => ({ ...current, tasks: current.tasks.map((entry) => entry.id === task.id ? { ...entry, duration: Number(event.target.value) } : entry) }))} placeholder="Minutes" /></div>)}
          </div>
        </Panel>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.9fr,1.1fr]">
        <Panel>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Energy curve</h2>
          <svg viewBox="0 0 600 220" className="mt-4 w-full">
            <polyline fill="none" stroke="#06b6d4" strokeWidth="4" points={state.levels.map((level, index) => `${40 + index * 45},${190 - level * 28}`).join(' ')} />
            {state.levels.map((level, index) => <circle key={index} cx={40 + index * 45} cy={190 - level * 28} r="6" fill="#06b6d4" />)}
          </svg>
        </Panel>
        <Panel>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Suggested daily schedule</h2>
          <div className="mt-4 space-y-3 text-sm text-gray-600 dark:text-gray-300">
            {suggested.map((task) => <div key={task.id} className={`rounded-2xl border p-3 ${task.match === 'Green' ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20' : task.match === 'Amber' ? 'border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/20' : 'border-rose-200 bg-rose-50 dark:border-rose-800 dark:bg-rose-950/20'}`}><p className="font-medium text-gray-900 dark:text-gray-100">{task.name || 'Untitled task'}</p><p className="mt-1">{task.slot * 2}:00 - {task.slot * 2 + 2}:00 · {task.match} match</p></div>)}
          </div>
        </Panel>
      </div>
    </div>
  )
}
