import { useState, useEffect } from 'react'
import { Plus, Trash2, Download } from 'lucide-react'
import { getItem, setItem } from '../../utils/storage'

const STORAGE_KEY = 'untrackt_gantt_chart'

function emptyTask() {
  const today = new Date().toISOString().slice(0, 10)
  const next = new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10)
  return { id: Date.now(), name: '', start: today, end: next, dependsOn: '' }
}

export default function GanttChartGenerator() {
  const [tasks, setTasks] = useState(() => getItem(STORAGE_KEY, []))

  useEffect(() => { setItem(STORAGE_KEY, tasks) }, [tasks])

  const addTask = () => setTasks(prev => [...prev, emptyTask()])
  const removeTask = (id) => setTasks(prev => prev.filter(t => t.id !== id))
  const updateTask = (id, key, val) => setTasks(prev => prev.map(t => t.id === id ? { ...t, [key]: val } : t))

  // Chart calculations
  const allDates = tasks.flatMap(t => [new Date(t.start), new Date(t.end)]).filter(d => !isNaN(d))
  const minDate = allDates.length ? new Date(Math.min(...allDates)) : new Date()
  const maxDate = allDates.length ? new Date(Math.max(...allDates)) : new Date(Date.now() + 30 * 86400000)
  const totalDays = Math.max(1, Math.ceil((maxDate - minDate) / 86400000) + 1)

  const rowH = 32
  const padLeft = 160
  const padTop = 30
  const dayW = Math.max(18, Math.min(40, 800 / totalDays))
  const chartW = padLeft + totalDays * dayW + 20
  const chartH = padTop + tasks.length * rowH + 20

  const dayX = (date) => {
    const d = new Date(date)
    return padLeft + Math.round(((d - minDate) / 86400000) * dayW)
  }

  const taskById = {}
  tasks.forEach(t => { taskById[t.id] = t })

  const depLinks = []
  tasks.forEach((t, i) => {
    if (!t.dependsOn) return
    const depIdx = tasks.findIndex(x => x.id === Number(t.dependsOn))
    if (depIdx < 0) return
    const dep = tasks[depIdx]
    const x1 = dayX(dep.end) + dayW
    const y1 = padTop + depIdx * rowH + rowH / 2
    const x2 = dayX(t.start)
    const y2 = padTop + i * rowH + rowH / 2
    depLinks.push({ x1, y1, x2, y2, key: `${dep.id}-${t.id}` })
  })

  const exportSVG = () => {
    const el = document.getElementById('gantt-svg')
    if (!el) return
    const blob = new Blob([el.outerHTML], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href = url; a.download = 'gantt.svg'; a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-5">
      {/* Task list */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-sm text-gray-500 dark:text-gray-400">{tasks.length} task{tasks.length !== 1 ? 's' : ''}</span>
        <div className="flex items-center gap-2">
          <button onClick={exportSVG} disabled={tasks.length === 0} className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-40">
            <Download className="w-3.5 h-3.5" /> SVG
          </button>
          <button onClick={addTask} className="btn-primary flex items-center gap-1.5 text-sm">
            <Plus className="w-4 h-4" /> Add Task
          </button>
        </div>
      </div>

      <div className="space-y-2">
        {tasks.map((t, i) => (
          <div key={t.id} className="flex flex-wrap items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-2">
            <span className="text-xs text-gray-400 w-5 text-right">{i + 1}</span>
            <input value={t.name} onChange={(e) => updateTask(t.id, 'name', e.target.value)} placeholder="Task name" className="flex-1 min-w-[120px] bg-transparent border-b border-transparent focus:border-indigo-400 outline-none text-sm text-gray-800 dark:text-gray-200 placeholder:text-gray-400" />
            <input type="date" value={t.start} onChange={(e) => updateTask(t.id, 'start', e.target.value)} className="text-xs bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-2 py-1 text-gray-700 dark:text-gray-300" />
            <span className="text-gray-400 text-xs">→</span>
            <input type="date" value={t.end} onChange={(e) => updateTask(t.id, 'end', e.target.value)} className="text-xs bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-2 py-1 text-gray-700 dark:text-gray-300" />
            <select value={t.dependsOn} onChange={(e) => updateTask(t.id, 'dependsOn', e.target.value)} className="text-xs bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-2 py-1 text-gray-700 dark:text-gray-300">
              <option value="">No dependency</option>
              {tasks.filter(x => x.id !== t.id).map((x, xi) => (
                <option key={x.id} value={x.id}>← {x.name || `Task ${tasks.indexOf(x) + 1}`}</option>
              ))}
            </select>
            <button onClick={() => removeTask(t.id)} className="text-red-400 hover:text-red-600 p-1"><Trash2 className="w-3.5 h-3.5" /></button>
          </div>
        ))}
      </div>

      {tasks.length === 0 ? (
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-8 text-center text-sm text-gray-400">
          Add tasks to see the Gantt chart.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-3">
          <svg id="gantt-svg" width={chartW} height={chartH} className="font-sans">
            {/* Date headers */}
            {Array.from({ length: totalDays }, (_, d) => {
              const date = new Date(minDate.getTime() + d * 86400000)
              const x = padLeft + d * dayW
              return (
                <g key={d}>
                  <line x1={x} y1={padTop - 2} x2={x} y2={chartH - 10} stroke="currentColor" className="text-gray-100 dark:text-gray-800" strokeWidth={1} />
                  {dayW >= 25 && <text x={x + dayW / 2} y={padTop - 8} textAnchor="middle" className="fill-gray-400 dark:fill-gray-500" fontSize={9}>{date.getDate()}/{date.getMonth() + 1}</text>}
                </g>
              )
            })}
            {/* Task bars */}
            {tasks.map((t, i) => {
              const x1 = dayX(t.start)
              const x2 = dayX(t.end) + dayW
              const y = padTop + i * rowH
              const w = Math.max(dayW, x2 - x1)
              return (
                <g key={t.id}>
                  <text x={4} y={y + rowH / 2 + 4} className="fill-gray-600 dark:fill-gray-400" fontSize={11}>{t.name || `Task ${i + 1}`}</text>
                  <rect x={x1} y={y + 4} width={w} height={rowH - 8} rx={4} className="fill-indigo-400 dark:fill-indigo-500" opacity={0.85} />
                </g>
              )
            })}
            {/* Dependency arrows */}
            {depLinks.map(l => (
              <line key={l.key} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="currentColor" className="text-red-400 dark:text-red-500" strokeWidth={1.5} markerEnd="url(#arrowhead)" />
            ))}
            <defs>
              <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                <polygon points="0 0, 8 3, 0 6" className="fill-red-400 dark:fill-red-500" />
              </marker>
            </defs>
          </svg>
        </div>
      )}
    </div>
  )
}
