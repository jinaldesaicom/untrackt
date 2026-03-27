import { useState, useEffect, useMemo } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { getItem, setItem } from '../../utils/storage'

const STORAGE_KEY = 'untrackt_focus_sessions'

function getDateKey(d) { return d.toISOString().slice(0, 10) }

export default function FocusSessionLogger() {
  const [sessions, setSessions] = useState(() => getItem(STORAGE_KEY, []))
  const [task, setTask] = useState('')
  const [duration, setDuration] = useState(25)
  const [quality, setQuality] = useState(3)

  useEffect(() => { setItem(STORAGE_KEY, sessions) }, [sessions])

  const addSession = () => {
    const t = task.trim()
    if (!t) return
    setSessions(prev => [{ id: Date.now(), task: t, duration, quality, date: getDateKey(new Date()) }, ...prev])
    setTask('')
  }

  const deleteSession = (id) => setSessions(prev => prev.filter(s => s.id !== id))

  // Last 30 days chart data
  const chartData = useMemo(() => {
    const days = []
    const now = new Date()
    for (let i = 29; i >= 0; i--) {
      const d = new Date(now)
      d.setDate(d.getDate() - i)
      const key = getDateKey(d)
      const daySessions = sessions.filter(s => s.date === key)
      const totalMin = daySessions.reduce((s, x) => s + x.duration, 0)
      days.push({ date: key, label: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), totalMin, count: daySessions.length })
    }
    return days
  }, [sessions])

  const maxMin = Math.max(...chartData.map(d => d.totalMin), 1)
  const totalSessions = sessions.length
  const totalHours = (sessions.reduce((s, x) => s + x.duration, 0) / 60).toFixed(1)
  const avgQuality = sessions.length > 0 ? (sessions.reduce((s, x) => s + x.quality, 0) / sessions.length).toFixed(1) : '—'

  const streak = useMemo(() => {
    let s = 0
    const now = new Date()
    for (let i = 0; i < 365; i++) {
      const d = new Date(now)
      d.setDate(d.getDate() - i)
      const key = getDateKey(d)
      if (sessions.some(x => x.date === key)) s++; else break
    }
    return s
  }, [sessions])

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard label="Total Sessions" value={totalSessions} />
        <StatCard label="Total Hours" value={totalHours} />
        <StatCard label="Avg Quality" value={avgQuality} />
        <StatCard label="Day Streak" value={streak} />
      </div>

      <div className="flex gap-2">
        <input type="text" value={task} onChange={e => setTask(e.target.value)} onKeyDown={e => e.key === 'Enter' && addSession()} className="input-field flex-1" placeholder="What did you focus on?" />
        <input type="number" value={duration} onChange={e => setDuration(Number(e.target.value))} className="input-field w-20 text-center" min="1" placeholder="min" />
        <div className="flex items-center gap-0.5">
          {[1, 2, 3, 4, 5].map(n => (
            <button key={n} onClick={() => setQuality(n)} className={`w-6 h-6 rounded-full text-[10px] font-bold ${quality >= n ? 'bg-indigo-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-400'}`}>{n}</button>
          ))}
        </div>
        <button onClick={addSession} className="btn-primary flex items-center gap-1.5"><Plus className="w-4 h-4" /> Log</button>
      </div>

      {/* 30-day bar chart */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Last 30 Days</h3>
        <div className="flex items-end gap-[2px] h-24">
          {chartData.map((day, i) => (
            <div key={i} className="flex-1 flex flex-col items-center group relative">
              <div className="w-full rounded-t bg-indigo-500 dark:bg-indigo-400 transition-all" style={{ height: `${maxMin > 0 ? (day.totalMin / maxMin) * 100 : 0}%`, minHeight: day.totalMin > 0 ? '2px' : '0' }} />
              <div className="absolute bottom-full mb-1 hidden group-hover:block bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-[9px] px-1.5 py-0.5 rounded whitespace-nowrap z-10">
                {day.label}: {day.totalMin}min ({day.count} sessions)
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-1 text-[9px] text-gray-400">
          <span>{chartData[0]?.label}</span>
          <span>{chartData[chartData.length - 1]?.label}</span>
        </div>
      </div>

      {/* Recent sessions */}
      {sessions.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Recent Sessions</h3>
          <div className="space-y-1">
            {sessions.slice(0, 20).map(s => (
              <div key={s.id} className="flex items-center gap-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 group">
                <span className="text-xs text-gray-400 w-16">{s.date.slice(5)}</span>
                <span className="flex-1 text-sm text-gray-700 dark:text-gray-300 truncate">{s.task}</span>
                <span className="text-xs text-gray-500">{s.duration} min</span>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map(n => (
                    <span key={n} className={`w-2 h-2 rounded-full ${s.quality >= n ? 'bg-indigo-500' : 'bg-gray-200 dark:bg-gray-700'}`} />
                  ))}
                </div>
                <button onClick={() => deleteSession(s.id)} className="text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100"><Trash2 className="w-3 h-3" /></button>
              </div>
            ))}
          </div>
          {sessions.length > 20 && <p className="text-xs text-gray-400 mt-1">Showing 20 of {sessions.length}</p>}
        </div>
      )}
    </div>
  )
}

function StatCard({ label, value }) {
  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-3 text-center">
      <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{value}</p>
      <p className="text-[10px] text-gray-500 dark:text-gray-400">{label}</p>
    </div>
  )
}
