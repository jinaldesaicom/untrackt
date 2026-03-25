import { useMemo, useState } from 'react'
import CopyButton from '../../components/CopyButton.jsx'
import { Panel } from '../../components/ToolLayout.jsx'
import { ProductivityNotice, useStoredState } from './shared.jsx'

const STORAGE_KEY = 'untrackt:productivity:smart-goals'

function createGoal(index = 1) {
  return {
    id: crypto.randomUUID(),
    title: `Goal ${index}`,
    specific: '',
    measurable: '',
    metricType: 'Number',
    targetValue: '',
    achievable: '',
    confidence: 7,
    relevant: '',
    lifeArea: 'Career',
    deadline: '',
    milestones: [{ id: crypto.randomUUID(), title: '', date: '', completed: false }],
    completed: false,
  }
}

export default function SMARTGoalSetter() {
  const [goals, setGoals] = useStoredState(STORAGE_KEY, [createGoal(1)])
  const [activeId, setActiveId] = useState(goals[0]?.id)
  const active = goals.find((goal) => goal.id === activeId) || goals[0]

  const updateActive = (updater) => setGoals((current) => current.map((goal) => goal.id === active.id ? updater(goal) : goal))
  const goalStatement = useMemo(() => `I will ${active.specific || '[specific goal]'} as measured by ${active.measurable || '[measurement]'} by ${active.deadline || '[date]'} because ${active.relevant || '[reason]'}. I am ${active.confidence * 10}% confident.`, [active])
  const daysUntil = active.deadline ? Math.ceil((new Date(active.deadline) - new Date()) / 86400000) : null

  return (
    <div className="space-y-6">
      <ProductivityNotice storageKey={STORAGE_KEY} onClear={() => setGoals([createGoal(1)])} />

      <Panel>
        <div className="grid gap-3 lg:grid-cols-[1fr,auto,auto,auto]">
          <input className="input-field" value={active.title} onChange={(event) => updateActive((goal) => ({ ...goal, title: event.target.value }))} />
          <select className="input-field" value={active.id} onChange={(event) => setActiveId(event.target.value)}>{goals.map((goal) => <option key={goal.id} value={goal.id}>{goal.title}</option>)}</select>
          <button type="button" className="btn-secondary" onClick={() => { if (goals.length < 10) { const next = createGoal(goals.length + 1); setGoals((current) => [...current, next]); setActiveId(next.id) } }}>Add goal</button>
          <button type="button" className="btn-secondary" onClick={() => window.print()}>Print goal card</button>
        </div>
      </Panel>

      <div className="grid gap-6 xl:grid-cols-[1fr,1fr]">
        <Panel>
          <div className="space-y-4">
            <textarea className="textarea-field min-h-[100px]" value={active.specific} onChange={(event) => updateActive((goal) => ({ ...goal, specific: event.target.value }))} placeholder="Specific: what exactly do you want to achieve?" />
            <div className="grid gap-3 md:grid-cols-[1fr,160px,160px]">
              <input className="input-field" value={active.measurable} onChange={(event) => updateActive((goal) => ({ ...goal, measurable: event.target.value }))} placeholder="How will you know it is done?" />
              <select className="input-field" value={active.metricType} onChange={(event) => updateActive((goal) => ({ ...goal, metricType: event.target.value }))}><option>Number</option><option>Percentage</option><option>Date</option><option>Yes/No completion</option></select>
              <input className="input-field" value={active.targetValue} onChange={(event) => updateActive((goal) => ({ ...goal, targetValue: event.target.value }))} placeholder="Target value" />
            </div>
            <textarea className="textarea-field min-h-[100px]" value={active.achievable} onChange={(event) => updateActive((goal) => ({ ...goal, achievable: event.target.value }))} placeholder="Achievable: resources, constraints, and realism" />
            <label className="block text-sm text-gray-600 dark:text-gray-300">Confidence: {active.confidence}/10<input className="mt-2 w-full" type="range" min="1" max="10" value={active.confidence} onChange={(event) => updateActive((goal) => ({ ...goal, confidence: Number(event.target.value) }))} /></label>
            <div className="grid gap-3 md:grid-cols-[1fr,180px]">
              <textarea className="textarea-field min-h-[100px]" value={active.relevant} onChange={(event) => updateActive((goal) => ({ ...goal, relevant: event.target.value }))} placeholder="Relevant: why does this matter?" />
              <select className="input-field" value={active.lifeArea} onChange={(event) => updateActive((goal) => ({ ...goal, lifeArea: event.target.value }))}><option>Health</option><option>Career</option><option>Finance</option><option>Relationships</option><option>Learning</option><option>Other</option></select>
            </div>
            <input className="input-field" type="date" value={active.deadline} onChange={(event) => updateActive((goal) => ({ ...goal, deadline: event.target.value }))} />
            <div className="space-y-3">
              {active.milestones.map((milestone) => (
                <div key={milestone.id} className="grid gap-3 rounded-2xl border border-gray-200 p-3 dark:border-gray-700 md:grid-cols-[1fr,180px,auto,auto]">
                  <input className="input-field" value={milestone.title} onChange={(event) => updateActive((goal) => ({ ...goal, milestones: goal.milestones.map((entry) => entry.id === milestone.id ? { ...entry, title: event.target.value } : entry) }))} placeholder="Milestone" />
                  <input className="input-field" type="date" value={milestone.date} onChange={(event) => updateActive((goal) => ({ ...goal, milestones: goal.milestones.map((entry) => entry.id === milestone.id ? { ...entry, date: event.target.value } : entry) }))} />
                  <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={milestone.completed} onChange={(event) => updateActive((goal) => ({ ...goal, milestones: goal.milestones.map((entry) => entry.id === milestone.id ? { ...entry, completed: event.target.checked } : entry) }))} /> Done</label>
                  <button type="button" className="btn-secondary" onClick={() => updateActive((goal) => ({ ...goal, milestones: goal.milestones.filter((entry) => entry.id !== milestone.id) }))}>Remove</button>
                </div>
              ))}
              <button type="button" className="btn-secondary" onClick={() => updateActive((goal) => ({ ...goal, milestones: goal.milestones.length < 5 ? [...goal.milestones, { id: crypto.randomUUID(), title: '', date: '', completed: false }] : goal.milestones }))}>Add milestone</button>
            </div>
          </div>
        </Panel>

        <div className="space-y-6">
          <Panel>
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">SMART goal statement</h2>
              <CopyButton text={goalStatement} label="Copy statement" />
            </div>
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">{goalStatement}</p>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">{daysUntil !== null ? `${daysUntil} days until deadline` : 'Set a deadline to see the countdown.'}</p>
          </Panel>
          <Panel>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Milestone timeline</h2>
            <svg viewBox="0 0 600 140" className="mt-4 w-full">
              <line x1="40" y1="70" x2="560" y2="70" stroke="currentColor" strokeWidth="2" className="text-gray-300 dark:text-gray-700" />
              {active.milestones.map((milestone, index) => {
                const x = 60 + (index / Math.max(1, active.milestones.length - 1 || 1)) * 480
                return (
                  <g key={milestone.id}>
                    <circle cx={x} cy="70" r="10" className={milestone.completed ? 'fill-green-500' : 'fill-indigo-500'} />
                    <text x={x} y="35" textAnchor="middle" className="fill-gray-600 text-xs dark:fill-gray-300">{milestone.title || `M${index + 1}`}</text>
                    <text x={x} y="105" textAnchor="middle" className="fill-gray-500 text-[10px] dark:fill-gray-400">{milestone.date || 'No date'}</text>
                  </g>
                )
              })}
            </svg>
          </Panel>
          <Panel>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Saved goals</h2>
            <div className="mt-3 space-y-3 text-sm text-gray-600 dark:text-gray-300">
              {goals.map((goal) => <div key={goal.id} className="rounded-2xl border border-gray-200 p-3 dark:border-gray-700"><p className="font-medium text-gray-900 dark:text-gray-100">{goal.title}</p><p className="mt-1">Progress: {goal.milestones.filter((milestone) => milestone.completed).length}/{goal.milestones.length} milestones</p></div>)}
            </div>
          </Panel>
        </div>
      </div>
    </div>
  )
}
