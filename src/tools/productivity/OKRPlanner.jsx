import { useState, useEffect, useMemo } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { getItem, setItem } from '../../utils/storage'

const STORAGE_KEY = 'untrackt_okr_planner'

function emptyObjective() {
  return { id: Date.now(), title: '', keyResults: [{ id: Date.now() + 1, text: '', current: 0, target: 100 }] }
}

function emptyQuarter() {
  return { objectives: [emptyObjective()] }
}

export default function OKRPlanner() {
  const [quarters, setQuarters] = useState(() => getItem(STORAGE_KEY, {}))
  const [currentQ, setCurrentQ] = useState(() => {
    const now = new Date()
    const q = Math.ceil((now.getMonth() + 1) / 3)
    return `${now.getFullYear()}-Q${q}`
  })

  useEffect(() => { setItem(STORAGE_KEY, quarters) }, [quarters])

  const quarter = quarters[currentQ] || emptyQuarter()
  const updateQuarter = (q) => setQuarters(prev => ({ ...prev, [currentQ]: q }))

  const addObjective = () => {
    updateQuarter({ ...quarter, objectives: [...quarter.objectives, emptyObjective()] })
  }

  const removeObjective = (objId) => {
    updateQuarter({ ...quarter, objectives: quarter.objectives.filter(o => o.id !== objId) })
  }

  const updateObjective = (objId, title) => {
    updateQuarter({ ...quarter, objectives: quarter.objectives.map(o => o.id === objId ? { ...o, title } : o) })
  }

  const addKR = (objId) => {
    updateQuarter({
      ...quarter,
      objectives: quarter.objectives.map(o => o.id === objId ? { ...o, keyResults: [...o.keyResults, { id: Date.now(), text: '', current: 0, target: 100 }] } : o)
    })
  }

  const removeKR = (objId, krId) => {
    updateQuarter({
      ...quarter,
      objectives: quarter.objectives.map(o => o.id === objId ? { ...o, keyResults: o.keyResults.filter(k => k.id !== krId) } : o)
    })
  }

  const updateKR = (objId, krId, key, val) => {
    updateQuarter({
      ...quarter,
      objectives: quarter.objectives.map(o => o.id === objId ? { ...o, keyResults: o.keyResults.map(k => k.id === krId ? { ...k, [key]: val } : k) } : o)
    })
  }

  const quarterKeys = useMemo(() => {
    const keys = new Set(Object.keys(quarters))
    keys.add(currentQ)
    const now = new Date()
    for (let i = -1; i <= 3; i++) {
      const y = now.getFullYear() + Math.floor((now.getMonth() + i * 3) / 12)
      const q = ((Math.floor(now.getMonth() / 3) + i) % 4 + 4) % 4 + 1
      keys.add(`${y}-Q${q}`)
    }
    return [...keys].sort()
  }, [quarters, currentQ])

  const progressRing = (pct) => {
    const r = 16, c = 2 * Math.PI * r
    const color = pct >= 70 ? '#22c55e' : pct >= 40 ? '#f59e0b' : '#6366f1'
    return (
      <svg width="40" height="40" className="flex-shrink-0">
        <circle cx="20" cy="20" r={r} fill="none" stroke="currentColor" strokeWidth="3" className="text-gray-200 dark:text-gray-700" />
        <circle cx="20" cy="20" r={r} fill="none" stroke={color} strokeWidth="3" strokeDasharray={`${(pct / 100) * c} ${c}`} strokeLinecap="round" transform="rotate(-90 20 20)" />
        <text x="20" y="20" textAnchor="middle" dominantBaseline="central" className="text-[9px] font-bold fill-gray-700 dark:fill-gray-300">{pct}%</text>
      </svg>
    )
  }

  const objProgress = (obj) => {
    if (!obj.keyResults.length) return 0
    const total = obj.keyResults.reduce((s, kr) => {
      const p = kr.target > 0 ? Math.min(100, (kr.current / kr.target) * 100) : 0
      return s + p
    }, 0)
    return Math.round(total / obj.keyResults.length)
  }

  const overallProgress = quarter.objectives.length > 0
    ? Math.round(quarter.objectives.reduce((s, o) => s + objProgress(o), 0) / quarter.objectives.length)
    : 0

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {quarterKeys.map(key => (
          <button key={key} onClick={() => setCurrentQ(key)}
            className={`px-3 py-1.5 rounded-full text-xs border flex-shrink-0 ${currentQ === key ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700'}`}>
            {key}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {progressRing(overallProgress)}
          <div>
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white">{currentQ} OKRs</h2>
            <p className="text-xs text-gray-400">{quarter.objectives.length} objective{quarter.objectives.length !== 1 ? 's' : ''}</p>
          </div>
        </div>
        <button onClick={addObjective} className="btn-primary flex items-center gap-1.5 text-sm"><Plus className="w-4 h-4" /> Objective</button>
      </div>

      <div className="space-y-4">
        {quarter.objectives.map((obj, objIdx) => (
          <div key={obj.id} className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 dark:border-gray-800">
              <span className="text-xs text-gray-400 font-mono">O{objIdx + 1}</span>
              {progressRing(objProgress(obj))}
              <input type="text" value={obj.title} onChange={e => updateObjective(obj.id, e.target.value)} className="flex-1 bg-transparent text-sm font-medium text-gray-900 dark:text-white outline-none" placeholder="Objective title…" />
              {quarter.objectives.length > 1 && <button onClick={() => removeObjective(obj.id)} className="text-gray-300 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>}
            </div>
            <div className="p-4 space-y-2">
              {obj.keyResults.map((kr, krIdx) => {
                const pct = kr.target > 0 ? Math.min(100, Math.round((kr.current / kr.target) * 100)) : 0
                return (
                  <div key={kr.id} className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-gray-400 font-mono w-8">KR{krIdx + 1}</span>
                      <input type="text" value={kr.text} onChange={e => updateKR(obj.id, kr.id, 'text', e.target.value)} className="input-field text-xs flex-1" placeholder="Key result…" />
                      <input type="number" value={kr.current} onChange={e => updateKR(obj.id, kr.id, 'current', Number(e.target.value))} className="input-field text-xs w-16 text-center" min="0" />
                      <span className="text-xs text-gray-400">/</span>
                      <input type="number" value={kr.target} onChange={e => updateKR(obj.id, kr.id, 'target', Number(e.target.value))} className="input-field text-xs w-16 text-center" min="1" />
                      {obj.keyResults.length > 1 && <button onClick={() => removeKR(obj.id, kr.id)} className="text-gray-300 hover:text-red-500"><Trash2 className="w-3 h-3" /></button>}
                    </div>
                    <div className="flex items-center gap-2 ml-10">
                      <div className="flex-1 h-1.5 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                        <div className={`h-full rounded-full transition-all ${pct >= 70 ? 'bg-green-500' : pct >= 40 ? 'bg-amber-500' : 'bg-indigo-500'}`} style={{ width: `${pct}%` }} />
                      </div>
                      <span className="text-[10px] text-gray-400 w-8 text-right">{pct}%</span>
                    </div>
                  </div>
                )
              })}
              <button onClick={() => addKR(obj.id)} className="btn-secondary text-xs flex items-center gap-1 ml-10"><Plus className="w-3 h-3" /> Key Result</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
