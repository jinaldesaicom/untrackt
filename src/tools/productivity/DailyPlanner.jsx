import { useEffect, useMemo, useState } from 'react'
import CopyButton from '../../components/CopyButton.jsx'
import { Panel } from '../../components/ToolLayout.jsx'
import { ProductivityNotice, useStoredState } from './shared.jsx'

const STORAGE_KEY = 'untrackt:productivity:daily-planner'
const SLOT_COUNT = 34
const START_HOUR = 6
const CATEGORY_COLORS = {
  Work: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300',
  Personal: 'bg-pink-100 text-pink-700 dark:bg-pink-950/40 dark:text-pink-300',
  Health: 'bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-300',
  Learning: 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300',
  Other: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
}

function slotLabel(index) {
  const totalMinutes = START_HOUR * 60 + index * 30
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  const suffix = hours >= 12 ? 'PM' : 'AM'
  const displayHour = hours % 12 || 12
  return `${displayHour}:${minutes.toString().padStart(2, '0')} ${suffix}`
}

function emptyDay() {
  return { tasks: [], priorities: ['', '', ''], notes: '' }
}

export default function DailyPlanner() {
  const today = new Date().toISOString().slice(0, 10)
  const [planner, setPlanner] = useStoredState(STORAGE_KEY, { selectedDate: today, days: {} })
  const [draft, setDraft] = useState({ slotIndex: 0, title: '', duration: 1, category: 'Work' })
  const [dragTaskId, setDragTaskId] = useState(null)
  const [now, setNow] = useState(Date.now())

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 60000)
    return () => window.clearInterval(timer)
  }, [])

  const day = planner.days[planner.selectedDate] || emptyDay()
  const tasks = day.tasks || []
  const currentSlot = Math.floor(((new Date(now).getHours() * 60 + new Date(now).getMinutes()) - START_HOUR * 60) / 30)
  const currentTop = currentSlot >= 0 && currentSlot < SLOT_COUNT ? currentSlot * 64 : null

  const updateDay = (updater) => {
    setPlanner((current) => {
      const nextDays = { ...current.days, [current.selectedDate]: updater(current.days[current.selectedDate] || emptyDay()) }
      const prunedEntries = Object.entries(nextDays)
        .sort((left, right) => right[0].localeCompare(left[0]))
        .slice(0, 7)
      return { ...current, days: Object.fromEntries(prunedEntries) }
    })
  }

  const planText = useMemo(() => {
    return [`Plan for ${planner.selectedDate}`, '', ...tasks.map((task) => `${slotLabel(task.slotIndex)} · ${task.title} (${task.duration * 30} min, ${task.category})`), '', 'Top priorities:', ...day.priorities.map((item, index) => `${index + 1}. ${item || '-'}`), '', `Notes: ${day.notes || '-'}`].join('\n')
  }, [day.notes, day.priorities, planner.selectedDate, tasks])

  return (
    <div className="space-y-6">
      <ProductivityNotice storageKey={STORAGE_KEY} onClear={() => setPlanner({ selectedDate: today, days: {} })} />

      <Panel>
        <div className="grid gap-3 lg:grid-cols-[1fr,auto,auto,auto]">
          <input className="input-field" type="date" value={planner.selectedDate} onChange={(event) => setPlanner((current) => ({ ...current, selectedDate: event.target.value }))} />
          <button type="button" className="btn-secondary" onClick={() => setPlanner((current) => ({ ...current, selectedDate: today }))}>Today</button>
          <CopyButton text={planText} label="Copy day plan" />
          <button type="button" className="btn-secondary" onClick={() => window.print()}>Print day plan</button>
        </div>
      </Panel>

      <div className="grid gap-6 xl:grid-cols-[1.2fr,0.8fr]">
        <Panel>
          <div className="grid gap-3 rounded-2xl border border-dashed border-gray-300 p-4 dark:border-gray-700 md:grid-cols-[1fr,120px,120px,auto]">
            <input className="input-field" value={draft.title} onChange={(event) => setDraft((current) => ({ ...current, title: event.target.value }))} placeholder={`Task for ${slotLabel(draft.slotIndex)}`} />
            <select className="input-field" value={draft.duration} onChange={(event) => setDraft((current) => ({ ...current, duration: Number(event.target.value) }))}><option value="1">30 min</option><option value="2">1 hr</option><option value="3">1.5 hr</option><option value="4">2 hr</option></select>
            <select className="input-field" value={draft.category} onChange={(event) => setDraft((current) => ({ ...current, category: event.target.value }))}>{Object.keys(CATEGORY_COLORS).map((category) => <option key={category}>{category}</option>)}</select>
            <button type="button" className="btn-primary" onClick={() => {
              if (!draft.title.trim()) return
              updateDay((current) => ({ ...current, tasks: [...current.tasks, { id: crypto.randomUUID(), slotIndex: draft.slotIndex, title: draft.title, duration: draft.duration, category: draft.category, completed: false }] }))
              setDraft((current) => ({ ...current, title: '' }))
            }}>Add block</button>
          </div>
          <div className="relative mt-4 space-y-2">
            {currentTop !== null ? <div className="pointer-events-none absolute left-0 right-0 z-10 h-0.5 bg-rose-500" style={{ top: `${currentTop + 32}px` }} /> : null}
            {Array.from({ length: SLOT_COUNT }, (_, index) => {
              const task = tasks.find((entry) => entry.slotIndex === index)
              return (
                <div key={index} className={`grid min-h-[60px] gap-3 rounded-2xl border p-3 ${currentSlot === index ? 'border-rose-300 bg-rose-50 dark:border-rose-800 dark:bg-rose-950/20' : 'border-gray-200 dark:border-gray-700'}`} onClick={() => setDraft((current) => ({ ...current, slotIndex: index }))} onDragOver={(event) => event.preventDefault()} onDrop={() => {
                  if (!dragTaskId) return
                  updateDay((current) => ({ ...current, tasks: current.tasks.map((entry) => entry.id === dragTaskId ? { ...entry, slotIndex: index } : entry) }))
                  setDragTaskId(null)
                }}>
                  <div className="flex items-start gap-3">
                    <span className="w-20 shrink-0 text-sm text-gray-500 dark:text-gray-400">{slotLabel(index)}</span>
                    {task ? (
                      <div draggable onDragStart={() => setDragTaskId(task.id)} className={`flex-1 rounded-xl px-3 py-2 ${CATEGORY_COLORS[task.category]}`}>
                        <div className="flex items-center justify-between gap-3">
                          <p className="font-medium">{task.title}</p>
                          <button type="button" className="text-xs" onClick={() => updateDay((current) => ({ ...current, tasks: current.tasks.filter((entry) => entry.id !== task.id) }))}>Delete</button>
                        </div>
                        <div className="mt-1 flex flex-wrap gap-2 text-xs opacity-80">
                          <label className="flex items-center gap-2"><input type="checkbox" checked={task.completed} onChange={(event) => updateDay((current) => ({ ...current, tasks: current.tasks.map((entry) => entry.id === task.id ? { ...entry, completed: event.target.checked } : entry) }))} /> Done</label>
                          <span>{task.duration * 30} minutes</span>
                        </div>
                      </div>
                    ) : <span className="text-sm text-gray-400 dark:text-gray-500">Click to schedule here</span>}
                  </div>
                </div>
              )
            })}
          </div>
        </Panel>

        <div className="space-y-6">
          <Panel>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Top 3 priorities</h2>
            <div className="mt-3 space-y-3">
              {day.priorities.map((priority, index) => <input key={index} className="input-field" value={priority} onChange={(event) => updateDay((current) => ({ ...current, priorities: current.priorities.map((entry, entryIndex) => entryIndex === index ? event.target.value : entry) }))} placeholder={`Priority ${index + 1}`} />)}
            </div>
          </Panel>
          <Panel>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Day notes</h2>
            <textarea className="textarea-field mt-3 min-h-[160px]" value={day.notes} onChange={(event) => updateDay((current) => ({ ...current, notes: event.target.value }))} />
          </Panel>
          <Panel>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Completion tracker</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{tasks.filter((task) => task.completed).length} completed / {tasks.length} total tasks</p>
          </Panel>
        </div>
      </div>
    </div>
  )
}
