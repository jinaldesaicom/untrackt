import { useState, useEffect, useRef } from 'react'
import { Plus, Trash2, Play, Pause, Copy, Check, Eye, Code } from 'lucide-react'
import { getItem, setItem } from '../../utils/storage'
import { renderMarkdown } from '../../utils/markdownRenderer'

const STORAGE_KEY = 'untrackt_meeting_agenda'

function CopyBtn({ text }) {
  const [copied, setCopied] = useState(false)
  const copy = () => { navigator.clipboard.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1500) }) }
  return <button onClick={copy} className="btn-secondary flex items-center gap-1.5 text-xs">{copied ? <><Check className="w-3.5 h-3.5" /> Copied</> : <><Copy className="w-3.5 h-3.5" /> Copy</>}</button>
}

function formatTime(sec) {
  const m = Math.floor(sec / 60)
  const s = sec % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

export default function MeetingAgendaBuilder() {
  const [agenda, setAgenda] = useState(() => getItem(STORAGE_KEY, {
    title: '',
    date: '',
    time: '',
    attendees: '',
    items: [{ id: 1, topic: '', duration: 5, owner: '', notes: '' }]
  }))
  const [previewMode, setPreviewMode] = useState('formatted')
  const [timerItem, setTimerItem] = useState(null)
  const [elapsed, setElapsed] = useState(0)
  const [running, setRunning] = useState(false)
  const intervalRef = useRef(null)

  useEffect(() => { setItem(STORAGE_KEY, agenda) }, [agenda])

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => setElapsed(e => e + 1), 1000)
    } else {
      clearInterval(intervalRef.current)
    }
    return () => clearInterval(intervalRef.current)
  }, [running])

  const update = (u) => setAgenda(prev => ({ ...prev, ...u }))
  const updateItem = (id, key, val) => update({ items: agenda.items.map(i => i.id === id ? { ...i, [key]: val } : i) })
  const addItem = () => update({ items: [...agenda.items, { id: Date.now(), topic: '', duration: 5, owner: '', notes: '' }] })
  const removeItem = (id) => { update({ items: agenda.items.filter(i => i.id !== id) }); if (timerItem === id) { setTimerItem(null); setRunning(false); setElapsed(0) } }

  const startTimer = (id) => { setTimerItem(id); setElapsed(0); setRunning(true) }
  const toggleTimer = () => setRunning(prev => !prev)
  const stopTimer = () => { setRunning(false); setTimerItem(null); setElapsed(0) }

  const totalDuration = agenda.items.reduce((s, i) => s + (parseInt(i.duration) || 0), 0)

  const markdownOutput = [
    `# ${agenda.title || 'Meeting Agenda'}`,
    (agenda.date || agenda.time) ? `**Date:** ${agenda.date ? new Date(agenda.date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }) : ''}${agenda.time ? ` at ${agenda.time}` : ''}` : '',
    agenda.attendees ? `**Attendees:** ${agenda.attendees}` : '',
    `**Total Duration:** ${totalDuration} min`,
    '',
    '## Agenda Items',
    ...agenda.items.map((item, idx) => [
      `### ${idx + 1}. ${item.topic || 'TBD'} (${item.duration} min)${item.owner ? ` — ${item.owner}` : ''}`,
      item.notes ? `${item.notes}` : '',
      ''
    ].join('\n'))
  ].filter(Boolean).join('\n')

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <input type="text" value={agenda.title} onChange={e => update({ title: e.target.value })} className="input-field" placeholder="Meeting title" />
        <input type="date" value={agenda.date} onChange={e => update({ date: e.target.value })} className="input-field" />
        <input type="time" value={agenda.time} onChange={e => update({ time: e.target.value })} className="input-field" />
        <input type="text" value={agenda.attendees} onChange={e => update({ attendees: e.target.value })} className="input-field" placeholder="Attendees" />
      </div>

      <div className="space-y-2">
        {agenda.items.map((item, idx) => {
          const isTimerActive = timerItem === item.id
          const overTime = isTimerActive && elapsed > (parseInt(item.duration) || 5) * 60
          return (
            <div key={item.id} className={`rounded-xl border p-3 space-y-2 ${isTimerActive ? (overTime ? 'border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/10' : 'border-indigo-300 dark:border-indigo-700 bg-indigo-50 dark:bg-indigo-900/10') : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900'}`}>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400 w-5">{idx + 1}.</span>
                <input type="text" value={item.topic} onChange={e => updateItem(item.id, 'topic', e.target.value)} className="input-field text-sm flex-1" placeholder="Topic" />
                <input type="number" value={item.duration} onChange={e => updateItem(item.id, 'duration', e.target.value)} className="input-field text-xs w-16 text-center" min="1" /> <span className="text-xs text-gray-400">min</span>
                <input type="text" value={item.owner} onChange={e => updateItem(item.id, 'owner', e.target.value)} className="input-field text-xs w-24" placeholder="Owner" />
                {!isTimerActive ? (
                  <button onClick={() => startTimer(item.id)} className="text-gray-400 hover:text-indigo-500"><Play className="w-4 h-4" /></button>
                ) : (
                  <>
                    <button onClick={toggleTimer} className="text-indigo-500">{running ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}</button>
                    <span className={`text-xs font-mono font-bold ${overTime ? 'text-red-600' : 'text-indigo-600'}`}>{formatTime(elapsed)}</span>
                    <button onClick={stopTimer} className="text-xs text-gray-400 hover:text-red-500">Stop</button>
                  </>
                )}
                {agenda.items.length > 1 && <button onClick={() => removeItem(item.id)} className="text-gray-300 hover:text-red-500"><Trash2 className="w-3.5 h-3.5" /></button>}
              </div>
              <textarea value={item.notes} onChange={e => updateItem(item.id, 'notes', e.target.value)} className="textarea-field text-xs min-h-[40px]" placeholder="Notes / talking points…" />
            </div>
          )
        })}
      </div>

      <div className="flex items-center justify-between">
        <button onClick={addItem} className="btn-secondary text-xs flex items-center gap-1"><Plus className="w-3 h-3" /> Add Item</button>
        <p className="text-xs text-gray-500 dark:text-gray-400">Total: {totalDuration} min</p>
      </div>

      <div>
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Preview</h3>
            <div className="flex gap-0.5 p-0.5 rounded-lg bg-gray-100 dark:bg-gray-800">
              <button onClick={() => setPreviewMode('formatted')} className={`p-1 rounded-md transition-colors ${previewMode === 'formatted' ? 'bg-white dark:bg-gray-700 shadow-sm text-indigo-600 dark:text-indigo-400' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`} title="Formatted"><Eye className="w-3.5 h-3.5" /></button>
              <button onClick={() => setPreviewMode('raw')} className={`p-1 rounded-md transition-colors ${previewMode === 'raw' ? 'bg-white dark:bg-gray-700 shadow-sm text-indigo-600 dark:text-indigo-400' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`} title="Raw Markdown"><Code className="w-3.5 h-3.5" /></button>
            </div>
          </div>
          <CopyBtn text={markdownOutput} />
        </div>
        {previewMode === 'raw' ? (
          <pre className="textarea-field min-h-[80px] whitespace-pre-wrap text-xs bg-gray-50 dark:bg-gray-800 max-h-[200px] overflow-y-auto">{markdownOutput}</pre>
        ) : (
          <div className="min-h-[80px] max-h-[300px] overflow-y-auto p-3 rounded-lg bg-gray-50 dark:bg-gray-800" dangerouslySetInnerHTML={{ __html: renderMarkdown(markdownOutput) }} />
        )}
      </div>
    </div>
  )
}
