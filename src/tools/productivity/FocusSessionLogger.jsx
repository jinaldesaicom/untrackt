import { useMemo, useState } from 'react'
import CopyButton from '../../components/CopyButton.jsx'
import { Panel } from '../../components/ToolLayout.jsx'
import { ProductivityNotice, useStoredState, downloadTextFile } from './shared.jsx'

const STORAGE_KEY = 'untrackt:productivity:focus-logger'

function createEntry(form) {
  return { id: crypto.randomUUID(), ...form, createdAt: Date.now() }
}

export default function FocusSessionLogger() {
  const [entries, setEntries] = useStoredState(STORAGE_KEY, [])
  const [form, setForm] = useState({ startTime: new Date().toTimeString().slice(0, 5), duration: 45, project: '', work: '', energy: 3, focus: 3, interruptions: 0 })

  const cleanedEntries = useMemo(() => {
    const cutoff = Date.now() - 30 * 86400000
    return entries.filter((entry) => entry.createdAt >= cutoff)
  }, [entries])
  const todayEntries = cleanedEntries.filter((entry) => new Date(entry.createdAt).toISOString().slice(0, 10) === new Date().toISOString().slice(0, 10)).sort((left, right) => right.createdAt - left.createdAt)
  const totalFocused = todayEntries.reduce((sum, entry) => sum + Number(entry.duration), 0)
  const averageEnergy = todayEntries.length ? todayEntries.reduce((sum, entry) => sum + Number(entry.energy), 0) / todayEntries.length : 0
  const averageFocus = todayEntries.length ? todayEntries.reduce((sum, entry) => sum + Number(entry.focus), 0) / todayEntries.length : 0
  const totalInterruptions = todayEntries.reduce((sum, entry) => sum + Number(entry.interruptions), 0)

  const weeklyHours = Array.from({ length: 7 }, (_, index) => {
    const date = new Date()
    date.setDate(date.getDate() - (6 - index))
    const key = date.toISOString().slice(0, 10)
    const minutes = cleanedEntries.filter((entry) => new Date(entry.createdAt).toISOString().slice(0, 10) === key).reduce((sum, entry) => sum + Number(entry.duration), 0)
    return { key, hours: minutes / 60 }
  })
  const summaryText = [`Today focused time: ${totalFocused} minutes`, `Average energy: ${averageEnergy.toFixed(1)}`, `Average focus: ${averageFocus.toFixed(1)}`, `Interruptions: ${totalInterruptions}`].join('\n')

  return (
    <div className="space-y-6">
      <ProductivityNotice storageKey={STORAGE_KEY} onClear={() => setEntries([])} />

      <Panel>
        <div className="grid gap-3 lg:grid-cols-[140px,140px,1fr,1.2fr,120px,120px,120px,auto]">
          <input className="input-field" type="time" value={form.startTime} onChange={(event) => setForm((current) => ({ ...current, startTime: event.target.value }))} />
          <input className="input-field" type="number" value={form.duration} onChange={(event) => setForm((current) => ({ ...current, duration: Number(event.target.value) }))} placeholder="Minutes" />
          <input className="input-field" value={form.project} onChange={(event) => setForm((current) => ({ ...current, project: event.target.value }))} placeholder="Project / category" list="projects-list" />
          <textarea className="textarea-field min-h-[80px]" value={form.work} onChange={(event) => setForm((current) => ({ ...current, work: event.target.value }))} placeholder="What I worked on" />
          <input className="input-field" type="number" min="1" max="5" value={form.energy} onChange={(event) => setForm((current) => ({ ...current, energy: Number(event.target.value) }))} />
          <input className="input-field" type="number" min="1" max="5" value={form.focus} onChange={(event) => setForm((current) => ({ ...current, focus: Number(event.target.value) }))} />
          <input className="input-field" type="number" min="0" value={form.interruptions} onChange={(event) => setForm((current) => ({ ...current, interruptions: Number(event.target.value) }))} />
          <button type="button" className="btn-primary" onClick={() => setEntries((current) => [...current, createEntry(form)])}>Add entry</button>
        </div>
        <datalist id="projects-list">{Array.from(new Set(cleanedEntries.map((entry) => entry.project).filter(Boolean))).map((project) => <option key={project} value={project} />)}</datalist>
      </Panel>

      <div className="grid gap-6 xl:grid-cols-[1fr,1fr]">
        <Panel>
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Today's log</h2>
            <div className="flex gap-2"><CopyButton text={summaryText} label="Copy summary" /><button type="button" className="btn-secondary" onClick={() => downloadTextFile('focus-log.csv', ['date,start_time,duration,project,work,energy,focus,interruptions', ...cleanedEntries.slice(-7).map((entry) => [new Date(entry.createdAt).toISOString().slice(0, 10), entry.startTime, entry.duration, JSON.stringify(entry.project), JSON.stringify(entry.work), entry.energy, entry.focus, entry.interruptions].join(','))].join('\n'))}>Download CSV</button></div>
          </div>
          <div className="mt-4 space-y-3 text-sm text-gray-600 dark:text-gray-300">
            <p>Total focused time today: {totalFocused} minutes</p>
            <p>Average energy: {averageEnergy.toFixed(1)}</p>
            <p>Average focus quality: {averageFocus.toFixed(1)}</p>
            <p>Total interruptions: {totalInterruptions}</p>
            {todayEntries.map((entry) => <div key={entry.id} className="rounded-2xl border border-gray-200 p-3 dark:border-gray-700"><p className="font-medium text-gray-900 dark:text-gray-100">{entry.project || 'Untitled project'} · {entry.duration} min</p><p className="mt-1">{entry.work}</p><p className="mt-1 text-xs">Energy {entry.energy}/5 · Focus {entry.focus}/5 · Interruptions {entry.interruptions}</p></div>)}
          </div>
        </Panel>

        <Panel>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Weekly summary</h2>
          <svg viewBox="0 0 600 220" className="mt-4 w-full">
            {weeklyHours.map((day, index) => {
              const height = day.hours * 22
              return (
                <g key={day.key}>
                  <rect x={40 + index * 80} y={180 - height} width="44" height={height} rx="10" fill="#4f46e5" opacity="0.85" />
                  <text x={62 + index * 80} y="200" textAnchor="middle" className="fill-gray-500 text-[12px] dark:fill-gray-400">{day.key.slice(5)}</text>
                  <text x={62 + index * 80} y={170 - height} textAnchor="middle" className="fill-gray-700 text-[11px] dark:fill-gray-200">{day.hours.toFixed(1)}h</text>
                </g>
              )
            })}
          </svg>
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">Best focus time of day: {cleanedEntries.length ? cleanedEntries.sort((left, right) => right.focus - left.focus)[0].startTime : 'No data yet'}</p>
        </Panel>
      </div>
    </div>
  )
}
