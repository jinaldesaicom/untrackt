import { useState, useEffect } from 'react'
import { Plus, Trash2, Copy, Download } from 'lucide-react'
import { getItem, setItem } from '../../utils/storage'

const STORAGE_KEY = 'untrackt_time_blocking'

const HOURS = Array.from({ length: 16 }, (_, i) => {
  const h = i + 6 // 6 AM – 9 PM
  return `${h.toString().padStart(2, '0')}:00`
})

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

function emptyWeek() {
  const w = {}
  DAYS.forEach(d => { w[d] = {} })
  return w
}

export default function TimeBlockingPlanner() {
  const [mode, setMode] = useState('day') // 'day' | 'week'
  const [selectedDay, setSelectedDay] = useState(DAYS[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1])
  const [blocks, setBlocks] = useState(() => getItem(STORAGE_KEY, emptyWeek()))

  useEffect(() => { setItem(STORAGE_KEY, blocks) }, [blocks])

  const updateSlot = (day, hour, val) => {
    setBlocks(prev => ({
      ...prev,
      [day]: { ...prev[day], [hour]: val },
    }))
  }

  const clearDay = (day) => setBlocks(prev => ({ ...prev, [day]: {} }))

  const exportSchedule = () => {
    let text = ''
    const days = mode === 'day' ? [selectedDay] : DAYS
    days.forEach(d => {
      text += `--- ${d} ---\n`
      HOURS.forEach(h => {
        const task = blocks[d]?.[h]
        if (task) text += `${h}  ${task}\n`
      })
      text += '\n'
    })
    const blob = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href = url; a.download = 'time-blocks.txt'; a.click()
    URL.revokeObjectURL(url)
  }

  const copySchedule = () => {
    let text = ''
    const days = mode === 'day' ? [selectedDay] : DAYS
    days.forEach(d => {
      text += `--- ${d} ---\n`
      HOURS.forEach(h => {
        const task = blocks[d]?.[h]
        if (task) text += `${h}  ${task}\n`
      })
      text += '\n'
    })
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="space-y-5">
      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {['day', 'week'].map(m => (
            <button key={m} onClick={() => setMode(m)} className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${mode === m ? 'bg-indigo-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200'}`}>
              {m === 'day' ? 'Day View' : 'Week View'}
            </button>
          ))}
          {mode === 'day' && (
            <select value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)} className="text-xs bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-2 py-1 text-gray-700 dark:text-gray-300">
              {DAYS.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button onClick={copySchedule} className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <Copy className="w-3.5 h-3.5" /> Copy
          </button>
          <button onClick={exportSchedule} className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <Download className="w-3.5 h-3.5" /> Export
          </button>
        </div>
      </div>

      {/* Day view */}
      {mode === 'day' && (
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100 dark:border-gray-800">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">{selectedDay}</h3>
            <button onClick={() => clearDay(selectedDay)} className="text-xs text-red-400 hover:text-red-600">Clear</button>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {HOURS.map(h => (
              <div key={h} className="flex items-center gap-3 px-4 py-1.5">
                <span className="text-xs text-gray-400 w-12 shrink-0">{h}</span>
                <input
                  value={blocks[selectedDay]?.[h] || ''}
                  onChange={(e) => updateSlot(selectedDay, h, e.target.value)}
                  placeholder="—"
                  className="flex-1 bg-transparent text-sm text-gray-800 dark:text-gray-200 outline-none placeholder:text-gray-300 dark:placeholder:text-gray-700"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Week view */}
      {mode === 'week' && (
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800">
                <th className="px-2 py-2 text-left text-gray-500 dark:text-gray-400 w-14">Time</th>
                {DAYS.map(d => <th key={d} className="px-2 py-2 text-left text-gray-500 dark:text-gray-400 min-w-[100px]">{d.slice(0, 3)}</th>)}
              </tr>
            </thead>
            <tbody>
              {HOURS.map(h => (
                <tr key={h} className="border-b border-gray-50 dark:border-gray-800/50">
                  <td className="px-2 py-1 text-gray-400">{h}</td>
                  {DAYS.map(d => (
                    <td key={d} className="px-1 py-0.5">
                      <input
                        value={blocks[d]?.[h] || ''}
                        onChange={(e) => updateSlot(d, h, e.target.value)}
                        placeholder="—"
                        className="w-full bg-transparent text-gray-800 dark:text-gray-200 outline-none placeholder:text-gray-300 dark:placeholder:text-gray-700 text-[11px]"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
