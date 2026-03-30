import { useState, useEffect } from 'react'
import { getItem, setItem } from '../../utils/storage'

const STORAGE_KEY = 'untrackt_project_health'

const DIMENSIONS = [
  { key: 'scope', label: 'Scope', icon: '📐' },
  { key: 'cost', label: 'Cost', icon: '💰' },
  { key: 'time', label: 'Time', icon: '⏱️' },
  { key: 'risk', label: 'Risk', icon: '⚠️' },
]

function healthColor(score) {
  if (score >= 80) return { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-300', label: 'Healthy', ring: 'ring-green-400' }
  if (score >= 60) return { bg: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-700 dark:text-amber-300', label: 'At Risk', ring: 'ring-amber-400' }
  return { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-300', label: 'Critical', ring: 'ring-red-400' }
}

function dimColor(val) {
  if (val >= 80) return 'bg-green-500'
  if (val >= 60) return 'bg-amber-500'
  return 'bg-red-500'
}

export default function ProjectHealthDashboard() {
  const [scores, setScores] = useState(() => getItem(STORAGE_KEY + '_scores', { scope: 75, cost: 80, time: 70, risk: 65 }))
  const [projectName, setProjectName] = useState(() => getItem(STORAGE_KEY + '_name', ''))
  const [notes, setNotes] = useState(() => getItem(STORAGE_KEY + '_notes', ''))

  useEffect(() => {
    setItem(STORAGE_KEY + '_scores', scores)
    setItem(STORAGE_KEY + '_name', projectName)
    setItem(STORAGE_KEY + '_notes', notes)
  }, [scores, projectName, notes])

  const updateScore = (key, val) => setScores(prev => ({ ...prev, [key]: Math.max(0, Math.min(100, Number(val))) }))

  const overall = Math.round(DIMENSIONS.reduce((s, d) => s + scores[d.key], 0) / DIMENSIONS.length)
  const health = healthColor(overall)

  return (
    <div className="space-y-5">
      {/* Project name */}
      <input value={projectName} onChange={(e) => setProjectName(e.target.value)} placeholder="Project Name" className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-800 dark:text-gray-200 outline-none focus:border-indigo-400" />

      {/* Overall health */}
      <div className={`rounded-xl border p-6 text-center ${health.bg} border-gray-200 dark:border-gray-700`}>
        <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full ring-4 ${health.ring} bg-white dark:bg-gray-900 mb-3`}>
          <span className={`text-3xl font-bold ${health.text}`}>{overall}</span>
        </div>
        <div className={`text-lg font-semibold ${health.text}`}>{health.label}</div>
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Overall Health Score</div>
      </div>

      {/* Dimension sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {DIMENSIONS.map(d => {
          const dHealth = healthColor(scores[d.key])
          return (
            <div key={d.key} className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{d.icon} {d.label}</span>
                <span className={`text-sm font-bold ${dHealth.text}`}>{scores[d.key]}%</span>
              </div>
              <input type="range" min={0} max={100} value={scores[d.key]} onChange={(e) => updateScore(d.key, e.target.value)} className="w-full accent-indigo-500" />
              <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full mt-1 overflow-hidden">
                <div className={`h-full rounded-full transition-all ${dimColor(scores[d.key])}`} style={{ width: `${scores[d.key]}%` }} />
              </div>
            </div>
          )
        })}
      </div>

      {/* Summary table */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 dark:border-gray-800">
              <th className="px-4 py-2 text-left text-gray-500 dark:text-gray-400">Dimension</th>
              <th className="px-4 py-2 text-center text-gray-500 dark:text-gray-400">Score</th>
              <th className="px-4 py-2 text-center text-gray-500 dark:text-gray-400">Status</th>
            </tr>
          </thead>
          <tbody>
            {DIMENSIONS.map(d => {
              const dH = healthColor(scores[d.key])
              return (
                <tr key={d.key} className="border-b border-gray-50 dark:border-gray-800/50">
                  <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{d.icon} {d.label}</td>
                  <td className="px-4 py-2 text-center font-bold text-gray-800 dark:text-gray-200">{scores[d.key]}%</td>
                  <td className="px-4 py-2 text-center"><span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${dH.bg} ${dH.text}`}>{dH.label}</span></td>
                </tr>
              )
            })}
            <tr className="bg-gray-50 dark:bg-gray-800/50">
              <td className="px-4 py-2 font-semibold text-gray-800 dark:text-gray-200">Overall</td>
              <td className="px-4 py-2 text-center font-bold text-gray-800 dark:text-gray-200">{overall}%</td>
              <td className="px-4 py-2 text-center"><span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${health.bg} ${health.text}`}>{health.label}</span></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Notes */}
      <div>
        <label className="text-xs font-medium text-gray-500 dark:text-gray-400">Notes</label>
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Additional context about project health..." rows={3} className="mt-1 w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-700 dark:text-gray-300 outline-none resize-none focus:border-indigo-400" />
      </div>
    </div>
  )
}
