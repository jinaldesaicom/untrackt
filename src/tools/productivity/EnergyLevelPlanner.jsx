import { useState, useEffect, useMemo } from 'react'
import { getItem, setItem } from '../../utils/storage'

const STORAGE_KEY = 'untrackt_energy_planner'

const HOURS = ['6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM']
const ENERGY_LEVELS = [1, 2, 3, 4, 5]
const TASK_TYPES = ['Deep Work', 'Meetings', 'Admin', 'Creative', 'Exercise', 'Break']

const TASK_ENERGY = {
  'Deep Work': 5,
  'Creative': 4,
  'Meetings': 3,
  'Admin': 2,
  'Exercise': 3,
  'Break': 1
}

export default function EnergyLevelPlanner() {
  const [energyProfile, setEnergyProfile] = useState(() => getItem(STORAGE_KEY, {
    levels: {},
    tasks: {}
  }))

  useEffect(() => { setItem(STORAGE_KEY, energyProfile) }, [energyProfile])

  const setLevel = (hour, level) => {
    setEnergyProfile(prev => ({
      ...prev,
      levels: { ...prev.levels, [hour]: level }
    }))
  }

  const setTask = (hour, task) => {
    setEnergyProfile(prev => ({
      ...prev,
      tasks: { ...prev.tasks, [hour]: task }
    }))
  }

  const hasData = Object.keys(energyProfile.levels).length > 0

  const suggestions = useMemo(() => {
    const s = []
    HOURS.forEach(hour => {
      const level = energyProfile.levels[hour]
      const task = energyProfile.tasks[hour]
      if (level && task) {
        const needed = TASK_ENERGY[task] || 3
        if (level < needed - 1) s.push({ hour, msg: `"${task}" needs high energy but you're at level ${level}. Consider moving this to a higher-energy time.` })
        if (level >= 4 && (task === 'Admin' || task === 'Break')) s.push({ hour, msg: `High energy at ${hour} — consider doing Deep Work instead of ${task}` })
      }
    })
    return s
  }, [energyProfile])

  // SVG energy curve
  const maxHours = HOURS.length
  const svgW = 600
  const svgH = 120
  const padX = 30
  const padY = 10
  const points = HOURS.map((h, i) => {
    const level = energyProfile.levels[h] || 0
    const x = padX + (i / (maxHours - 1)) * (svgW - padX * 2)
    const y = padY + ((5 - level) / 5) * (svgH - padY * 2)
    return { x, y, level, hour: h }
  }).filter(p => p.level > 0)

  const pathD = points.length >= 2
    ? points.map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`)).join(' ')
    : ''

  return (
    <div className="space-y-5">
      <p className="text-xs text-gray-500 dark:text-gray-400">Map your energy levels throughout the day and assign tasks to match. Higher-energy tasks should go in high-energy slots.</p>

      {hasData && (
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Energy Curve</h3>
          <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full h-auto">
            {/* Y axis labels */}
            {[1, 2, 3, 4, 5].map(l => (
              <text key={l} x="10" y={padY + ((5 - l) / 5) * (svgH - padY * 2) + 3} className="text-[8px] fill-gray-400" textAnchor="end">{l}</text>
            ))}
            {/* Grid lines */}
            {[1, 2, 3, 4, 5].map(l => (
              <line key={l} x1={padX} x2={svgW - padX} y1={padY + ((5 - l) / 5) * (svgH - padY * 2)} y2={padY + ((5 - l) / 5) * (svgH - padY * 2)} stroke="currentColor" strokeWidth="0.5" className="text-gray-100 dark:text-gray-800" />
            ))}
            {/* Energy line */}
            {pathD && <path d={pathD} fill="none" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />}
            {/* Dots */}
            {points.map((p, i) => (
              <circle key={i} cx={p.x} cy={p.y} r="4" fill="#6366f1" stroke="white" strokeWidth="2" />
            ))}
          </svg>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th className="text-left p-2 text-xs text-gray-500 font-medium w-16">Time</th>
              <th className="text-left p-2 text-xs text-gray-500 font-medium">Energy Level</th>
              <th className="text-left p-2 text-xs text-gray-500 font-medium w-36">Task Type</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {HOURS.map(hour => {
              const level = energyProfile.levels[hour] || 0
              const task = energyProfile.tasks[hour] || ''
              return (
                <tr key={hour} className="bg-white dark:bg-gray-900">
                  <td className="p-2 text-xs text-gray-600 dark:text-gray-400 font-medium">{hour}</td>
                  <td className="p-2">
                    <div className="flex gap-1">
                      {ENERGY_LEVELS.map(n => (
                        <button key={n} onClick={() => setLevel(hour, n)}
                          className={`w-7 h-5 rounded text-[10px] font-bold transition-colors ${level >= n ? n >= 4 ? 'bg-green-500 text-white' : n >= 2 ? 'bg-amber-400 text-white' : 'bg-red-400 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-400'}`}>
                          {n}
                        </button>
                      ))}
                    </div>
                  </td>
                  <td className="p-2">
                    <select value={task} onChange={e => setTask(hour, e.target.value)} className="input-field text-xs">
                      <option value="">—</option>
                      {TASK_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {suggestions.length > 0 && (
        <div className="space-y-1.5">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Suggestions</h3>
          {suggestions.map((s, i) => (
            <div key={i} className="rounded-lg px-3 py-2 text-xs bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
              ⚠ <strong>{s.hour}:</strong> {s.msg}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
