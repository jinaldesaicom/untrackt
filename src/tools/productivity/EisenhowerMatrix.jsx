import { useMemo, useState } from 'react'
import CopyButton from '../../components/CopyButton.jsx'
import { Panel } from '../../components/ToolLayout.jsx'
import { ProductivityNotice, useStoredState } from './shared.jsx'

const STORAGE_KEY = 'untrackt:productivity:eisenhower-matrix'
const QUADRANTS = {
  q1: { title: 'Do First', subtitle: 'Crises, deadlines, emergencies', tone: 'bg-rose-50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800' },
  q2: { title: 'Schedule', subtitle: 'Goals, planning, relationships, growth', tone: 'bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800' },
  q3: { title: 'Delegate', subtitle: 'Interruptions, meetings, some emails', tone: 'bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800' },
  q4: { title: 'Eliminate', subtitle: 'Time wasters and trivial tasks', tone: 'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700' },
}

function classify(urgent, important) {
  if (urgent && important) return 'q1'
  if (!urgent && important) return 'q2'
  if (urgent && !important) return 'q3'
  return 'q4'
}

function createTask(text, notes = '') {
  return { id: crypto.randomUUID(), text, notes, completed: false }
}

export default function EisenhowerMatrix() {
  const [state, setState] = useStoredState(STORAGE_KEY, { inbox: [], quadrants: { q1: [], q2: [], q3: [], q4: [] } })
  const [taskText, setTaskText] = useState('')
  const [taskNotes, setTaskNotes] = useState('')
  const [urgent, setUrgent] = useState(true)
  const [important, setImportant] = useState(true)

  const exportText = useMemo(() => ['Inbox', ...state.inbox.map((task) => `- ${task.text}`), '', ...Object.entries(QUADRANTS).flatMap(([id, quadrant]) => [quadrant.title, ...(state.quadrants[id] || []).map((task) => `- ${task.text}`), ''])].join('\n'), [state])

  const addToInbox = () => {
    if (!taskText.trim()) return
    setState((current) => ({ ...current, inbox: [...current.inbox, createTask(taskText, taskNotes)] }))
    setTaskText('')
    setTaskNotes('')
  }

  const sendToQuadrant = () => {
    if (!taskText.trim()) return
    const quadrant = classify(urgent, important)
    setState((current) => ({ ...current, quadrants: { ...current.quadrants, [quadrant]: [...current.quadrants[quadrant], createTask(taskText, taskNotes)] } }))
    setTaskText('')
    setTaskNotes('')
  }

  return (
    <div className="space-y-6">
      <ProductivityNotice storageKey={STORAGE_KEY} onClear={() => setState({ inbox: [], quadrants: { q1: [], q2: [], q3: [], q4: [] } })} />

      <Panel>
        <div className="grid gap-3 lg:grid-cols-[1fr,1fr,auto,auto,auto,auto]">
          <input className="input-field" value={taskText} onChange={(event) => setTaskText(event.target.value)} placeholder="Add a task" />
          <input className="input-field" value={taskNotes} onChange={(event) => setTaskNotes(event.target.value)} placeholder="Optional notes" />
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={urgent} onChange={(event) => setUrgent(event.target.checked)} /> Urgent</label>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={important} onChange={(event) => setImportant(event.target.checked)} /> Important</label>
          <button type="button" className="btn-secondary" onClick={addToInbox}>Add to inbox</button>
          <button type="button" className="btn-primary" onClick={sendToQuadrant}>Classify now</button>
        </div>
      </Panel>

      <Panel>
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Inbox</h2>
          <div className="flex gap-2"><CopyButton text={exportText} label="Copy matrix" /><button type="button" className="btn-secondary" onClick={() => window.print()}>Print matrix</button></div>
        </div>
        <div className="mt-4 space-y-3">
          {state.inbox.map((task) => (
            <div key={task.id} className="rounded-2xl border border-gray-200 p-4 dark:border-gray-700">
              <p className="font-medium text-gray-900 dark:text-gray-100">{task.text}</p>
              {task.notes ? <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{task.notes}</p> : null}
              <div className="mt-3 flex flex-wrap gap-2">
                {Object.entries(QUADRANTS).map(([id, quadrant]) => <button key={id} type="button" className="btn-secondary" onClick={() => setState((current) => ({ ...current, inbox: current.inbox.filter((entry) => entry.id !== task.id), quadrants: { ...current.quadrants, [id]: [...current.quadrants[id], task] } }))}>{quadrant.title}</button>)}
              </div>
            </div>
          ))}
          {state.inbox.length === 0 ? <p className="text-sm text-gray-500 dark:text-gray-400">No inbox tasks yet.</p> : null}
        </div>
      </Panel>

      <div className="grid gap-4 xl:grid-cols-2">
        {Object.entries(QUADRANTS).map(([id, quadrant]) => (
          <div key={id} className={`rounded-3xl border p-4 ${quadrant.tone}`}>
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{quadrant.title}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300">{quadrant.subtitle}</p>
              </div>
              <span className="rounded-full bg-white/80 px-2 py-1 text-xs text-gray-600 dark:bg-gray-900/70 dark:text-gray-300">{state.quadrants[id].length}</span>
            </div>
            <div className="mt-4 space-y-3">
              {state.quadrants[id].map((task) => (
                <div key={task.id} className="rounded-2xl bg-white/80 p-4 dark:bg-gray-900/70">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className={`font-medium text-gray-900 dark:text-gray-100 ${task.completed ? 'line-through opacity-60' : ''}`}>{task.text}</p>
                      {task.notes ? <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{task.notes}</p> : null}
                    </div>
                    <button type="button" className="text-sm text-rose-600 dark:text-rose-300" onClick={() => setState((current) => ({ ...current, quadrants: { ...current.quadrants, [id]: current.quadrants[id].filter((entry) => entry.id !== task.id) } }))}>Delete</button>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs">
                    <label className="flex items-center gap-2"><input type="checkbox" checked={task.completed} onChange={(event) => setState((current) => ({ ...current, quadrants: { ...current.quadrants, [id]: current.quadrants[id].map((entry) => entry.id === task.id ? { ...entry, completed: event.target.checked } : entry) } }))} /> Complete</label>
                    <select className="rounded-xl border border-gray-200 bg-white px-2 py-1 dark:border-gray-700 dark:bg-gray-900" value={id} onChange={(event) => setState((current) => ({ ...current, quadrants: Object.fromEntries(Object.entries(current.quadrants).map(([quadrantId, tasks]) => quadrantId === id ? [quadrantId, tasks.filter((entry) => entry.id !== task.id)] : quadrantId === event.target.value ? [quadrantId, [...tasks, task]] : [quadrantId, tasks])) }))}>{Object.entries(QUADRANTS).map(([optionId, option]) => <option key={optionId} value={optionId}>{option.title}</option>)}</select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
