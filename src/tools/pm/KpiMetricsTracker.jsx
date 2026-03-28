import { useState, useEffect } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { getItem, setItem } from '../../utils/storage'

const STORAGE_KEY = 'untrackt_kpi_tracker'

function emptyKPI() {
  return { id: Date.now(), name: '', unit: '', target: '', entries: [] }
}

export default function KpiMetricsTracker() {
  const [kpis, setKpis] = useState(() => getItem(STORAGE_KEY, []))

  useEffect(() => { setItem(STORAGE_KEY, kpis) }, [kpis])

  const addKPI = () => setKpis(prev => [...prev, emptyKPI()])
  const removeKPI = (id) => setKpis(prev => prev.filter(k => k.id !== id))
  const updateKPI = (id, key, val) => setKpis(prev => prev.map(k => k.id === id ? { ...k, [key]: val } : k))
  const addEntry = (kpiId) => {
    setKpis(prev => prev.map(k => {
      if (k.id !== kpiId) return k
      return { ...k, entries: [...k.entries, { date: new Date().toISOString().slice(0, 10), value: '' }] }
    }))
  }
  const updateEntry = (kpiId, idx, key, val) => {
    setKpis(prev => prev.map(k => {
      if (k.id !== kpiId) return k
      const entries = k.entries.map((e, i) => i === idx ? { ...e, [key]: val } : e)
      return { ...k, entries }
    }))
  }
  const removeEntry = (kpiId, idx) => {
    setKpis(prev => prev.map(k => {
      if (k.id !== kpiId) return k
      return { ...k, entries: k.entries.filter((_, i) => i !== idx) }
    }))
  }

  // Simple SVG sparkline
  function Sparkline({ entries, target }) {
    const values = entries.map(e => parseFloat(e.value)).filter(v => !isNaN(v))
    if (values.length < 2) return null
    const w = 200; const h = 60; const pad = 4
    const min = Math.min(...values, parseFloat(target) || Infinity)
    const max = Math.max(...values, parseFloat(target) || -Infinity)
    const range = max - min || 1
    const points = values.map((v, i) => {
      const x = pad + (i / (values.length - 1)) * (w - pad * 2)
      const y = h - pad - ((v - min) / range) * (h - pad * 2)
      return `${x},${y}`
    }).join(' ')
    const tgt = parseFloat(target)
    const targetY = !isNaN(tgt) ? h - pad - ((tgt - min) / range) * (h - pad * 2) : null
    return (
      <svg width={w} height={h} className="mt-2">
        {targetY !== null && <line x1={0} y1={targetY} x2={w} y2={targetY} stroke="currentColor" className="text-green-400 dark:text-green-600" strokeDasharray="4 2" strokeWidth={1} />}
        <polyline fill="none" stroke="currentColor" className="text-indigo-500" strokeWidth={2} points={points} />
        {values.map((v, i) => {
          const x = pad + (i / (values.length - 1)) * (w - pad * 2)
          const y = h - pad - ((v - min) / range) * (h - pad * 2)
          return <circle key={i} cx={x} cy={y} r={3} className="fill-indigo-500" />
        })}
      </svg>
    )
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500 dark:text-gray-400">{kpis.length} KPI{kpis.length !== 1 ? 's' : ''}</span>
        <button onClick={addKPI} className="btn-primary flex items-center gap-1.5 text-sm"><Plus className="w-4 h-4" /> Add KPI</button>
      </div>

      {kpis.length === 0 ? (
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-8 text-center text-sm text-gray-400">
          Define KPIs to start tracking metrics.
        </div>
      ) : (
        <div className="space-y-4">
          {kpis.map(k => {
            const latest = k.entries.length > 0 ? k.entries[k.entries.length - 1].value : null
            return (
              <div key={k.id} className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <input value={k.name} onChange={(e) => updateKPI(k.id, 'name', e.target.value)} placeholder="KPI Name" className="flex-1 min-w-[120px] bg-transparent border-b border-transparent focus:border-indigo-400 outline-none text-sm font-medium text-gray-800 dark:text-gray-200 placeholder:text-gray-400" />
                  <input value={k.unit} onChange={(e) => updateKPI(k.id, 'unit', e.target.value)} placeholder="Unit" className="w-16 bg-transparent border-b border-transparent focus:border-indigo-400 outline-none text-xs text-gray-500 dark:text-gray-400 placeholder:text-gray-400" />
                  <input value={k.target} onChange={(e) => updateKPI(k.id, 'target', e.target.value)} placeholder="Target" className="w-20 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-2 py-1 text-xs text-gray-700 dark:text-gray-300" />
                  <button onClick={() => removeKPI(k.id)} className="text-red-400 hover:text-red-600 p-1"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
                {latest && <div className="text-xs text-gray-500 dark:text-gray-400">Latest: <span className="font-semibold text-gray-800 dark:text-gray-200">{latest}{k.unit ? ` ${k.unit}` : ''}</span></div>}
                <Sparkline entries={k.entries} target={k.target} />
                {/* Entries */}
                <div className="space-y-1">
                  {k.entries.map((e, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <input type="date" value={e.date} onChange={(ev) => updateEntry(k.id, i, 'date', ev.target.value)} className="text-xs bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-2 py-0.5 text-gray-700 dark:text-gray-300" />
                      <input type="number" value={e.value} onChange={(ev) => updateEntry(k.id, i, 'value', ev.target.value)} placeholder="Value" className="w-20 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-2 py-0.5 text-xs text-gray-700 dark:text-gray-300" />
                      <button onClick={() => removeEntry(k.id, i)} className="text-red-400 hover:text-red-600 p-0.5"><Trash2 className="w-3 h-3" /></button>
                    </div>
                  ))}
                </div>
                <button onClick={() => addEntry(k.id)} className="text-xs text-indigo-500 hover:text-indigo-700 font-medium">+ Add Data Point</button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
