import { useState, useEffect } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { getItem, setItem } from '../../utils/storage'

const STORAGE_KEY = 'untrackt_risk_matrix'

const LEVELS = ['Very Low', 'Low', 'Medium', 'High', 'Very High']
const SCORE_MAP = { 'Very Low': 1, 'Low': 2, 'Medium': 3, 'High': 4, 'Very High': 5 }
const CELL_COLORS = {
  1: 'bg-green-100 dark:bg-green-900/30',
  2: 'bg-green-100 dark:bg-green-900/30',
  3: 'bg-yellow-100 dark:bg-yellow-900/30',
  4: 'bg-yellow-100 dark:bg-yellow-900/30',
  5: 'bg-orange-100 dark:bg-orange-900/30',
  6: 'bg-orange-100 dark:bg-orange-900/30',
  8: 'bg-orange-100 dark:bg-orange-900/30',
  9: 'bg-red-100 dark:bg-red-900/30',
  10: 'bg-red-100 dark:bg-red-900/30',
  12: 'bg-red-100 dark:bg-red-900/30',
  15: 'bg-red-200 dark:bg-red-900/50',
  16: 'bg-red-200 dark:bg-red-900/50',
  20: 'bg-red-300 dark:bg-red-800/50',
  25: 'bg-red-400 dark:bg-red-700/50',
}

function scoreColor(s) {
  if (s <= 2) return 'text-green-600 dark:text-green-400'
  if (s <= 6) return 'text-yellow-600 dark:text-yellow-400'
  if (s <= 12) return 'text-orange-600 dark:text-orange-400'
  return 'text-red-600 dark:text-red-400'
}

function scoreLabel(s) {
  if (s <= 2) return 'Low'
  if (s <= 6) return 'Medium'
  if (s <= 12) return 'High'
  return 'Critical'
}

function cellBg(score) {
  return CELL_COLORS[score] || 'bg-gray-50 dark:bg-gray-800'
}

function emptyRisk() {
  return { id: Date.now(), name: '', likelihood: 'Medium', impact: 'Medium' }
}

export default function RiskAssessmentMatrix() {
  const [risks, setRisks] = useState(() => getItem(STORAGE_KEY, []))

  useEffect(() => { setItem(STORAGE_KEY, risks) }, [risks])

  const add = () => setRisks(prev => [...prev, emptyRisk()])
  const remove = (id) => setRisks(prev => prev.filter(r => r.id !== id))
  const update = (id, key, val) => setRisks(prev => prev.map(r => r.id === id ? { ...r, [key]: val } : r))

  // Build heatmap data: likelihood (y) × impact (x)
  const heatmap = {}
  LEVELS.forEach(l => { LEVELS.forEach(i => { heatmap[`${l}-${i}`] = [] }) })
  risks.forEach(r => { heatmap[`${r.likelihood}-${r.impact}`]?.push(r) })

  return (
    <div className="space-y-5">
      {/* Heatmap */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 overflow-x-auto">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Risk Heatmap</h3>
        <div className="flex">
          <div className="flex flex-col justify-between pr-2 py-1">
            <span className="text-[9px] text-gray-500 dark:text-gray-400 -rotate-0 origin-center" style={{ writingMode: 'vertical-lr', transform: 'rotate(180deg)' }}>Likelihood →</span>
          </div>
          <div className="flex-1">
            <table className="w-full border-collapse text-[10px]">
              <thead>
                <tr>
                  <th />
                  {LEVELS.map(i => <th key={i} className="px-1 py-1 text-center text-gray-500 dark:text-gray-400 font-medium">{i}</th>)}
                </tr>
                <tr>
                  <th />
                  <th colSpan={5} className="text-center text-[9px] text-gray-400 pb-1">Impact →</th>
                </tr>
              </thead>
              <tbody>
                {[...LEVELS].reverse().map(l => (
                  <tr key={l}>
                    <td className="pr-2 text-right text-gray-500 dark:text-gray-400 font-medium whitespace-nowrap">{l}</td>
                    {LEVELS.map(i => {
                      const score = SCORE_MAP[l] * SCORE_MAP[i]
                      const items = heatmap[`${l}-${i}`]
                      return (
                        <td key={i} className={`border border-gray-200 dark:border-gray-700 p-1.5 text-center align-top min-w-[60px] ${cellBg(score)}`}>
                          <div className="text-[9px] text-gray-400 mb-0.5">{score}</div>
                          {items.map(r => (
                            <div key={r.id} className="text-[9px] bg-white/70 dark:bg-gray-900/70 rounded px-1 py-0.5 mt-0.5 truncate" title={r.name}>{r.name || '?'}</div>
                          ))}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Risk list */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500 dark:text-gray-400">{risks.length} risk{risks.length !== 1 ? 's' : ''}</span>
        <button onClick={add} className="btn-primary flex items-center gap-1.5 text-sm"><Plus className="w-4 h-4" /> Add Risk</button>
      </div>

      {risks.length === 0 ? (
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-8 text-center text-sm text-gray-400">
          Add risks to see them on the heatmap.
        </div>
      ) : (
        <div className="space-y-2">
          {risks.map(r => {
            const score = SCORE_MAP[r.likelihood] * SCORE_MAP[r.impact]
            return (
              <div key={r.id} className="flex flex-wrap items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-2">
                <input value={r.name} onChange={(e) => update(r.id, 'name', e.target.value)} placeholder="Risk description" className="flex-1 min-w-[140px] bg-transparent border-b border-transparent focus:border-indigo-400 outline-none text-sm text-gray-800 dark:text-gray-200 placeholder:text-gray-400" />
                <select value={r.likelihood} onChange={(e) => update(r.id, 'likelihood', e.target.value)} className="text-xs bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-2 py-1 text-gray-700 dark:text-gray-300">
                  {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
                <span className="text-gray-400 text-xs">×</span>
                <select value={r.impact} onChange={(e) => update(r.id, 'impact', e.target.value)} className="text-xs bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-2 py-1 text-gray-700 dark:text-gray-300">
                  {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
                <span className={`text-xs font-bold ${scoreColor(score)}`}>{score} ({scoreLabel(score)})</span>
                <button onClick={() => remove(r.id)} className="text-red-400 hover:text-red-600 p-1"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
