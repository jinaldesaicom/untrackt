import { useMemo, useState } from 'react'
import CopyButton from '../../components/CopyButton.jsx'
import { Panel } from '../../components/ToolLayout.jsx'
import { ProductivityNotice } from './shared.jsx'

const BUCKETS = {
  now: { title: 'DO NOW', description: 'Do these immediately before anything else', tone: 'border-rose-200 bg-rose-50 dark:border-rose-800 dark:bg-rose-950/20' },
  schedule: { title: 'SCHEDULE', description: 'Add these to your calendar or todo list', tone: 'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/20' },
  defer: { title: 'DELEGATE OR DEFER', description: 'These need proper project planning', tone: 'border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-900' },
}

function bucketForEstimate(estimate) {
  if (estimate === '< 1 min' || estimate === '1-2 min') return 'now'
  if (estimate === '2-5 min' || estimate === '5-15 min' || estimate === '15-30 min') return 'schedule'
  return 'defer'
}

function createTask(text, estimate) {
  return { id: crypto.randomUUID(), text, estimate, bucket: bucketForEstimate(estimate), done: false }
}

export default function TwoMinuteTaskFilter() {
  const [tasks, setTasks] = useState([])
  const [text, setText] = useState('')
  const [estimate, setEstimate] = useState('< 1 min')

  const groups = useMemo(() => ({
    now: tasks.filter((task) => task.bucket === 'now'),
    schedule: tasks.filter((task) => task.bucket === 'schedule'),
    defer: tasks.filter((task) => task.bucket === 'defer'),
  }), [tasks])
  const quickWins = groups.now.filter((task) => !task.done).length
  const scheduledMinutes = groups.schedule.reduce((sum, task) => sum + (task.estimate === '2-5 min' ? 4 : task.estimate === '5-15 min' ? 10 : 22), 0)
  const clipboardText = groups.schedule.map((task) => `- ${task.text}`).join('\n')

  return (
    <div className="space-y-6">
      <ProductivityNotice onClear={() => setTasks([])} />

      <Panel>
        <div className="grid gap-3 lg:grid-cols-[1fr,180px,auto]">
          <input className="input-field" value={text} onChange={(event) => setText(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter' && text.trim()) { setTasks((current) => [...current, createTask(text.trim(), estimate)]); setText('') } }} placeholder="Add a task" />
          <select className="input-field" value={estimate} onChange={(event) => setEstimate(event.target.value)}>{['< 1 min', '1-2 min', '2-5 min', '5-15 min', '15-30 min', '30+ min'].map((option) => <option key={option}>{option}</option>)}</select>
          <button type="button" className="btn-primary" onClick={() => { if (text.trim()) { setTasks((current) => [...current, createTask(text.trim(), estimate)]); setText('') } }}>Add task</button>
        </div>
      </Panel>

      <Panel>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-300">
          <p>{quickWins} quick wins available (&lt; 2 min)</p>
          <p>Estimated scheduled time: {scheduledMinutes} minutes</p>
          <div className="flex gap-2"><CopyButton text={tasks.map((task) => `${task.text} (${task.estimate})`).join('\n')} label="Copy lists" /><CopyButton text={clipboardText} label="Send to Todo List" /></div>
        </div>
      </Panel>

      <div className="grid gap-4 xl:grid-cols-3">
        {Object.entries(BUCKETS).map(([bucketId, bucket]) => (
          <div key={bucketId} className={`rounded-3xl border p-4 ${bucket.tone}`}>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{bucket.title}</h2>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{bucket.description}</p>
            <div className="mt-4 space-y-3">
              {groups[bucketId].map((task) => (
                <div key={task.id} className="rounded-2xl bg-white/70 p-3 dark:bg-gray-900/70">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className={`font-medium text-gray-900 dark:text-gray-100 ${task.done ? 'line-through opacity-60' : ''}`}>{task.text}</p>
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{task.estimate}</p>
                    </div>
                    <button type="button" className="text-sm text-rose-600 dark:text-rose-300" onClick={() => setTasks((current) => current.filter((entry) => entry.id !== task.id))}>Delete</button>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs">
                    <label className="flex items-center gap-2"><input type="checkbox" checked={task.done} onChange={(event) => setTasks((current) => current.map((entry) => entry.id === task.id ? { ...entry, done: event.target.checked } : entry))} /> Done</label>
                    <select className="rounded-xl border border-gray-200 bg-white px-2 py-1 dark:border-gray-700 dark:bg-gray-900" value={task.bucket} onChange={(event) => setTasks((current) => current.map((entry) => entry.id === task.id ? { ...entry, bucket: event.target.value } : entry))}>{Object.entries(BUCKETS).map(([id, config]) => <option key={id} value={id}>{config.title}</option>)}</select>
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
