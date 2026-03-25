import { useMemo, useState } from 'react'
import CopyButton from '../../components/CopyButton.jsx'
import { Panel } from '../../components/ToolLayout.jsx'
import { ProductivityNotice, useStoredState } from './shared.jsx'

const STORAGE_KEY = 'untrackt:productivity:decision-matrix'

function createDecision(index = 1) {
  return {
    id: crypto.randomUUID(),
    title: `Decision ${index}`,
    options: ['Option A', 'Option B'],
    criteria: [
      { id: crypto.randomUUID(), name: 'Price', weight: 5 },
      { id: crypto.randomUUID(), name: 'Quality', weight: 8 },
    ],
    scores: {},
  }
}

export default function DecisionMatrix() {
  const [saved, setSaved] = useStoredState(STORAGE_KEY, [createDecision(1)])
  const [activeId, setActiveId] = useState(saved[0]?.id)
  const active = saved.find((decision) => decision.id === activeId) || saved[0]

  const updateActive = (updater) => setSaved((current) => current.map((decision) => decision.id === active.id ? updater(decision) : decision))
  const results = useMemo(() => {
    return active.options.map((option) => {
      const criterionScores = active.criteria.map((criterion) => ({
        criterion: criterion.name,
        weighted: (active.scores[`${option}:${criterion.id}`] || 0) * criterion.weight,
      }))
      const total = criterionScores.reduce((sum, item) => sum + item.weighted, 0)
      const strongest = [...criterionScores].sort((left, right) => right.weighted - left.weighted)[0]
      const weakest = [...criterionScores].sort((left, right) => left.weighted - right.weighted)[0]
      return { option, total, strongest: strongest?.criterion, weakest: weakest?.criterion }
    }).sort((left, right) => right.total - left.total)
  }, [active])

  const winner = results[0]
  const summary = [`Decision: ${active.title}`, '', ...results.map((result) => `${result.option}: ${result.total}`), '', winner ? `Winner: ${winner.option}` : ''].join('\n')

  return (
    <div className="space-y-6">
      <ProductivityNotice storageKey={STORAGE_KEY} onClear={() => setSaved([createDecision(1)])} />

      <Panel>
        <div className="grid gap-3 lg:grid-cols-[1fr,auto,auto,auto]">
          <input className="input-field" value={active.title} onChange={(event) => updateActive((decision) => ({ ...decision, title: event.target.value }))} />
          <select className="input-field" value={active.id} onChange={(event) => setActiveId(event.target.value)}>{saved.map((decision) => <option key={decision.id} value={decision.id}>{decision.title}</option>)}</select>
          <button type="button" className="btn-secondary" onClick={() => { if (saved.length < 5) { const next = createDecision(saved.length + 1); setSaved((current) => [...current, next]); setActiveId(next.id) } }}>New decision</button>
          <CopyButton text={summary} label="Copy summary" />
        </div>
      </Panel>

      <div className="grid gap-6 xl:grid-cols-[1fr,1fr]">
        <Panel>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Options</h2>
                <button type="button" className="btn-secondary" onClick={() => updateActive((decision) => ({ ...decision, options: decision.options.length < 8 ? [...decision.options, `Option ${decision.options.length + 1}`] : decision.options }))}>Add option</button>
              </div>
              <div className="mt-3 space-y-3">
                {active.options.map((option, index) => <input key={index} className="input-field" value={option} onChange={(event) => updateActive((decision) => ({ ...decision, options: decision.options.map((entry, entryIndex) => entryIndex === index ? event.target.value : entry) }))} />)}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Criteria</h2>
                <button type="button" className="btn-secondary" onClick={() => updateActive((decision) => ({ ...decision, criteria: decision.criteria.length < 8 ? [...decision.criteria, { id: crypto.randomUUID(), name: `Criterion ${decision.criteria.length + 1}`, weight: 5 }] : decision.criteria }))}>Add criterion</button>
              </div>
              <div className="mt-3 space-y-3">
                {active.criteria.map((criterion) => (
                  <div key={criterion.id} className="grid gap-3 md:grid-cols-[1fr,120px]">
                    <input className="input-field" value={criterion.name} onChange={(event) => updateActive((decision) => ({ ...decision, criteria: decision.criteria.map((entry) => entry.id === criterion.id ? { ...entry, name: event.target.value } : entry) }))} />
                    <input className="input-field" type="range" min="1" max="10" value={criterion.weight} onChange={(event) => updateActive((decision) => ({ ...decision, criteria: decision.criteria.map((entry) => entry.id === criterion.id ? { ...entry, weight: Number(event.target.value) } : entry) }))} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Panel>

        <div className="space-y-6">
          <Panel>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 text-left dark:border-gray-700">
                    <th className="pb-3 pr-4">Criteria</th>
                    {active.options.map((option) => <th key={option} className="pb-3 pr-4">{option}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {active.criteria.map((criterion) => (
                    <tr key={criterion.id} className="border-b border-gray-100 dark:border-gray-800">
                      <td className="py-3 pr-4">{criterion.name} × {criterion.weight}</td>
                      {active.options.map((option) => (
                        <td key={option} className="py-3 pr-4"><input className="input-field w-20" type="number" min="1" max="10" value={active.scores[`${option}:${criterion.id}`] || 0} onChange={(event) => updateActive((decision) => ({ ...decision, scores: { ...decision.scores, [`${option}:${criterion.id}`]: Number(event.target.value) } }))} /></td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>
          <Panel>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Results</h2>
            <div className="mt-4 space-y-4">
              {results.map((result) => (
                <div key={result.option} className={`rounded-2xl border p-4 ${winner?.option === result.option ? 'border-green-300 bg-green-50 dark:border-green-800 dark:bg-green-950/20' : 'border-gray-200 dark:border-gray-700'}`}>
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-semibold text-gray-900 dark:text-gray-100">{result.option}</p>
                    <p className="text-lg font-bold text-indigo-600 dark:text-indigo-300">{result.total}</p>
                  </div>
                  <div className="mt-3 h-3 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800"><div className="h-full bg-indigo-600" style={{ width: `${winner?.total ? (result.total / winner.total) * 100 : 0}%` }} /></div>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Strongest in: {result.strongest || '-'} · Weakest in: {result.weakest || '-'}</p>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </div>
  )
}
