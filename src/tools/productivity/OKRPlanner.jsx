import { useMemo, useState } from 'react'
import CopyButton from '../../components/CopyButton.jsx'
import { Panel } from '../../components/ToolLayout.jsx'
import { ProductivityNotice, useStoredState } from './shared.jsx'

const STORAGE_KEY = 'untrackt:productivity:okr-planner'

function createQuarter() {
  return { id: 'Q1-2026', objectives: [{ id: crypto.randomUUID(), text: 'Objective 1', owner: '', status: 'On Track', keyResults: [{ id: crypto.randomUUID(), text: 'Key result', start: 0, target: 100, current: 0, unit: '%' }] }] }
}

function scoreKr(kr) {
  const denominator = Number(kr.target) - Number(kr.start)
  if (!denominator) return 0
  return Math.max(0, Math.min(1, (Number(kr.current) - Number(kr.start)) / denominator))
}

export default function OKRPlanner() {
  const [quarters, setQuarters] = useStoredState(STORAGE_KEY, { active: 'Q1-2026', items: { 'Q1-2026': createQuarter() } })
  const [quarterInput, setQuarterInput] = useState(quarters.active)
  const activeQuarter = quarters.items[quarters.active] || createQuarter()

  const updateQuarter = (updater) => setQuarters((current) => ({ ...current, items: { ...current.items, [current.active]: updater(current.items[current.active] || createQuarter()) } }))
  const objectiveScores = useMemo(() => activeQuarter.objectives.map((objective) => {
    const scores = objective.keyResults.map(scoreKr)
    const average = scores.length ? scores.reduce((sum, score) => sum + score, 0) / scores.length : 0
    return { objectiveId: objective.id, average }
  }), [activeQuarter.objectives])
  const overall = objectiveScores.length ? objectiveScores.reduce((sum, item) => sum + item.average, 0) / objectiveScores.length : 0
  const summary = useMemo(() => [`Quarter ${quarters.active}`, ...activeQuarter.objectives.map((objective) => `${objective.text} · ${(objectiveScores.find((entry) => entry.objectiveId === objective.id)?.average || 0).toFixed(2)}`)].join('\n'), [activeQuarter.objectives, objectiveScores, quarters.active])

  return (
    <div className="space-y-6">
      <ProductivityNotice storageKey={STORAGE_KEY} onClear={() => setQuarters({ active: 'Q1-2026', items: { 'Q1-2026': createQuarter() } })} />

      <Panel>
        <div className="grid gap-3 lg:grid-cols-[180px,180px,auto,auto]">
          <input className="input-field" value={quarterInput} onChange={(event) => setQuarterInput(event.target.value)} placeholder="Q1-2026" />
          <select className="input-field" value={quarters.active} onChange={(event) => setQuarters((current) => ({ ...current, active: event.target.value }))}>{Object.keys(quarters.items).map((key) => <option key={key}>{key}</option>)}</select>
          <button type="button" className="btn-secondary" onClick={() => setQuarters((current) => ({ ...current, active: quarterInput, items: current.items[quarterInput] ? current.items : { ...current.items, [quarterInput]: createQuarter() } }))}>Load quarter</button>
          <CopyButton text={summary} label="Copy OKR summary" />
        </div>
      </Panel>

      <Panel>
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Objectives</h2>
          <button type="button" className="btn-secondary" onClick={() => updateQuarter((quarter) => ({ ...quarter, objectives: quarter.objectives.length < 5 ? [...quarter.objectives, { id: crypto.randomUUID(), text: `Objective ${quarter.objectives.length + 1}`, owner: '', status: 'On Track', keyResults: [{ id: crypto.randomUUID(), text: 'Key result', start: 0, target: 100, current: 0, unit: '%' }] }] : quarter.objectives }))}>Add objective</button>
        </div>
        <div className="mt-4 space-y-4">
          {activeQuarter.objectives.map((objective) => {
            const score = objectiveScores.find((entry) => entry.objectiveId === objective.id)?.average || 0
            return (
              <div key={objective.id} className="rounded-3xl border border-gray-200 p-4 dark:border-gray-700">
                <div className="grid gap-3 lg:grid-cols-[1fr,180px,160px,auto]">
                  <input className="input-field" value={objective.text} onChange={(event) => updateQuarter((quarter) => ({ ...quarter, objectives: quarter.objectives.map((entry) => entry.id === objective.id ? { ...entry, text: event.target.value } : entry) }))} />
                  <input className="input-field" value={objective.owner} onChange={(event) => updateQuarter((quarter) => ({ ...quarter, objectives: quarter.objectives.map((entry) => entry.id === objective.id ? { ...entry, owner: event.target.value } : entry) }))} placeholder="Owner" />
                  <select className="input-field" value={objective.status} onChange={(event) => updateQuarter((quarter) => ({ ...quarter, objectives: quarter.objectives.map((entry) => entry.id === objective.id ? { ...entry, status: event.target.value } : entry) }))}><option>On Track</option><option>At Risk</option><option>Off Track</option></select>
                  <button type="button" className="btn-secondary" onClick={() => updateQuarter((quarter) => ({ ...quarter, objectives: quarter.objectives.filter((entry) => entry.id !== objective.id) }))}>Remove</button>
                </div>
                <div className="mt-4 space-y-3">
                  {objective.keyResults.map((kr) => (
                    <div key={kr.id} className="grid gap-3 rounded-2xl border border-gray-200 p-3 dark:border-gray-700 lg:grid-cols-[1fr,100px,100px,100px,80px,auto]">
                      <input className="input-field" value={kr.text} onChange={(event) => updateQuarter((quarter) => ({ ...quarter, objectives: quarter.objectives.map((entry) => entry.id === objective.id ? { ...entry, keyResults: entry.keyResults.map((result) => result.id === kr.id ? { ...result, text: event.target.value } : result) } : entry) }))} />
                      <input className="input-field" type="number" value={kr.start} onChange={(event) => updateQuarter((quarter) => ({ ...quarter, objectives: quarter.objectives.map((entry) => entry.id === objective.id ? { ...entry, keyResults: entry.keyResults.map((result) => result.id === kr.id ? { ...result, start: Number(event.target.value) } : result) } : entry) }))} />
                      <input className="input-field" type="number" value={kr.target} onChange={(event) => updateQuarter((quarter) => ({ ...quarter, objectives: quarter.objectives.map((entry) => entry.id === objective.id ? { ...entry, keyResults: entry.keyResults.map((result) => result.id === kr.id ? { ...result, target: Number(event.target.value) } : result) } : entry) }))} />
                      <input className="input-field" type="number" value={kr.current} onChange={(event) => updateQuarter((quarter) => ({ ...quarter, objectives: quarter.objectives.map((entry) => entry.id === objective.id ? { ...entry, keyResults: entry.keyResults.map((result) => result.id === kr.id ? { ...result, current: Number(event.target.value) } : result) } : entry) }))} />
                      <input className="input-field" value={kr.unit} onChange={(event) => updateQuarter((quarter) => ({ ...quarter, objectives: quarter.objectives.map((entry) => entry.id === objective.id ? { ...entry, keyResults: entry.keyResults.map((result) => result.id === kr.id ? { ...result, unit: event.target.value } : result) } : entry) }))} />
                      <button type="button" className="btn-secondary" onClick={() => updateQuarter((quarter) => ({ ...quarter, objectives: quarter.objectives.map((entry) => entry.id === objective.id ? { ...entry, keyResults: entry.keyResults.filter((result) => result.id !== kr.id) } : entry) }))}>Remove</button>
                    </div>
                  ))}
                  <button type="button" className="btn-secondary" onClick={() => updateQuarter((quarter) => ({ ...quarter, objectives: quarter.objectives.map((entry) => entry.id === objective.id ? { ...entry, keyResults: entry.keyResults.length < 5 ? [...entry.keyResults, { id: crypto.randomUUID(), text: 'Key result', start: 0, target: 100, current: 0, unit: '%' }] : entry.keyResults } : entry) }))}>Add key result</button>
                </div>
                <div className="mt-4 grid gap-3 md:grid-cols-[1fr,120px]">
                  <div className="h-3 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800"><div className={`h-full ${score < 0.3 ? 'bg-rose-500' : score < 0.7 ? 'bg-amber-500' : 'bg-green-500'}`} style={{ width: `${score * 100}%` }} /></div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Objective score: {score.toFixed(2)}</p>
                </div>
              </div>
            )
          })}
        </div>
      </Panel>

      <Panel>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Overall health score</h2>
        <p className="mt-3 text-3xl font-bold text-indigo-600 dark:text-indigo-300">{overall.toFixed(2)}</p>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">0.0-0.3 low · 0.3-0.7 medium · 0.7-1.0 strong</p>
      </Panel>
    </div>
  )
}
