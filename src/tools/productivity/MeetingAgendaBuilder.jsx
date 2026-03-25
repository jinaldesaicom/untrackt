import { useEffect, useMemo, useState } from 'react'
import CopyButton from '../../components/CopyButton.jsx'
import { Panel } from '../../components/ToolLayout.jsx'
import { ProductivityNotice, useStoredState, playBeep } from './shared.jsx'

const STORAGE_KEY = 'untrackt:productivity:meeting-agenda'

function createAgenda() {
  return {
    title: '',
    date: '',
    time: '',
    location: '',
    duration: 60,
    attendees: '',
    facilitator: '',
    items: [{ id: crypto.randomUUID(), topic: '', owner: '', duration: 10, type: 'Discussion' }],
  }
}

export default function MeetingAgendaBuilder() {
  const [agenda, setAgenda] = useStoredState(STORAGE_KEY, createAgenda())
  const [timerIndex, setTimerIndex] = useState(-1)
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    if (timerIndex < 0) return undefined
    const interval = window.setInterval(() => setSeconds((current) => current + 1), 1000)
    return () => window.clearInterval(interval)
  }, [timerIndex])

  useEffect(() => {
    if (timerIndex < 0) return
    const currentItem = agenda.items[timerIndex]
    if (currentItem && seconds >= currentItem.duration * 60) {
      playBeep()
    }
  }, [agenda.items, seconds, timerIndex])

  const allocated = useMemo(() => agenda.items.reduce((sum, item) => sum + Number(item.duration || 0), 0), [agenda.items])
  const runningItem = timerIndex >= 0 ? agenda.items[timerIndex] : null
  const agendaText = useMemo(() => [
    agenda.title,
    `${agenda.date} ${agenda.time}`,
    agenda.location,
    `Facilitator: ${agenda.facilitator}`,
    `Attendees: ${agenda.attendees}`,
    '',
    ...agenda.items.map((item, index) => `${index + 1}. ${item.topic} (${item.duration} min, ${item.type}${item.owner ? `, ${item.owner}` : ''})`),
  ].join('\n'), [agenda])

  return (
    <div className="space-y-6">
      <ProductivityNotice storageKey={STORAGE_KEY} onClear={() => setAgenda(createAgenda())} />

      <Panel>
        <div className="grid gap-3 lg:grid-cols-2">
          <input className="input-field" value={agenda.title} onChange={(event) => setAgenda((current) => ({ ...current, title: event.target.value }))} placeholder="Meeting title" />
          <input className="input-field" value={agenda.location} onChange={(event) => setAgenda((current) => ({ ...current, location: event.target.value }))} placeholder="Location or link" />
          <input className="input-field" type="date" value={agenda.date} onChange={(event) => setAgenda((current) => ({ ...current, date: event.target.value }))} />
          <input className="input-field" type="time" value={agenda.time} onChange={(event) => setAgenda((current) => ({ ...current, time: event.target.value }))} />
          <input className="input-field" type="number" value={agenda.duration} onChange={(event) => setAgenda((current) => ({ ...current, duration: Number(event.target.value) }))} placeholder="Total duration" />
          <input className="input-field" value={agenda.facilitator} onChange={(event) => setAgenda((current) => ({ ...current, facilitator: event.target.value }))} placeholder="Facilitator" />
          <input className="input-field lg:col-span-2" value={agenda.attendees} onChange={(event) => setAgenda((current) => ({ ...current, attendees: event.target.value }))} placeholder="Attendees (comma-separated)" />
        </div>
      </Panel>

      <Panel>
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Agenda items</h2>
          <button type="button" className="btn-secondary" onClick={() => setAgenda((current) => ({ ...current, items: [...current.items, { id: crypto.randomUUID(), topic: '', owner: '', duration: 5, type: 'Discussion' }] }))}>Add item</button>
        </div>
        <div className="mt-4 space-y-3">
          {agenda.items.map((item, index) => (
            <div key={item.id} className="grid gap-3 rounded-2xl border border-gray-200 p-4 dark:border-gray-700 lg:grid-cols-[1fr,180px,120px,160px,auto,auto,auto]">
              <input className="input-field" value={item.topic} onChange={(event) => setAgenda((current) => ({ ...current, items: current.items.map((entry) => entry.id === item.id ? { ...entry, topic: event.target.value } : entry) }))} placeholder="Topic" />
              <input className="input-field" value={item.owner} onChange={(event) => setAgenda((current) => ({ ...current, items: current.items.map((entry) => entry.id === item.id ? { ...entry, owner: event.target.value } : entry) }))} placeholder="Owner" />
              <input className="input-field" type="number" value={item.duration} onChange={(event) => setAgenda((current) => ({ ...current, items: current.items.map((entry) => entry.id === item.id ? { ...entry, duration: Number(event.target.value) } : entry) }))} />
              <select className="input-field" value={item.type} onChange={(event) => setAgenda((current) => ({ ...current, items: current.items.map((entry) => entry.id === item.id ? { ...entry, type: event.target.value } : entry) }))}><option>Discussion</option><option>Decision</option><option>Information</option><option>Action items</option></select>
              <button type="button" className="btn-secondary" onClick={() => setAgenda((current) => ({ ...current, items: current.items.map((entry, entryIndex, entries) => entryIndex === index && index > 0 ? entries[index - 1] : entry).map((entry, entryIndex, entries) => entryIndex === index - 1 ? entries[index] : entry) }))} disabled={index === 0}>Up</button>
              <button type="button" className="btn-secondary" onClick={() => setAgenda((current) => ({ ...current, items: current.items.map((entry, entryIndex, entries) => entryIndex === index && index < entries.length - 1 ? entries[index + 1] : entry).map((entry, entryIndex, entries) => entryIndex === index + 1 ? entries[index] : entry) }))} disabled={index === agenda.items.length - 1}>Down</button>
              <button type="button" className="btn-secondary" onClick={() => setAgenda((current) => ({ ...current, items: current.items.filter((entry) => entry.id !== item.id) }))}>Remove</button>
            </div>
          ))}
          <p className={`text-sm ${allocated > agenda.duration ? 'text-rose-600 dark:text-rose-300' : 'text-gray-500 dark:text-gray-400'}`}>Allocated {allocated} of {agenda.duration} minutes{allocated > agenda.duration ? ' · Agenda exceeds available time' : ''}</p>
        </div>
      </Panel>

      <div className="grid gap-6 xl:grid-cols-[1fr,1fr]">
        <Panel>
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Time tracker mode</h2>
            <div className="flex gap-2">
              <button type="button" className="btn-secondary" onClick={() => { setTimerIndex(0); setSeconds(0) }}>Start meeting</button>
              <button type="button" className="btn-secondary" onClick={() => { setTimerIndex((current) => Math.min(agenda.items.length - 1, current + 1)); setSeconds(0) }}>Next item</button>
            </div>
          </div>
          {runningItem ? <div className="mt-4 rounded-2xl border border-indigo-200 bg-indigo-50 p-4 dark:border-indigo-800 dark:bg-indigo-950/30"><p className="font-semibold text-indigo-900 dark:text-indigo-200">{runningItem.topic || 'Current agenda item'}</p><p className="mt-2 text-sm text-indigo-800 dark:text-indigo-300">{Math.floor(seconds / 60)}m {String(seconds % 60).padStart(2, '0')}s elapsed · {seconds > runningItem.duration * 60 ? 'Running behind' : 'On pace'}</p></div> : <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">Start the meeting timer to track agenda timing.</p>}
        </Panel>

        <Panel>
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Agenda preview</h2>
            <div className="flex gap-2"><CopyButton text={agendaText} label="Copy agenda" /><button type="button" className="btn-secondary" onClick={() => window.print()}>Print agenda</button></div>
          </div>
          <pre className="mt-4 whitespace-pre-wrap rounded-2xl bg-gray-50 p-4 text-sm text-gray-700 dark:bg-gray-900 dark:text-gray-200">{agendaText}</pre>
        </Panel>
      </div>
    </div>
  )
}
