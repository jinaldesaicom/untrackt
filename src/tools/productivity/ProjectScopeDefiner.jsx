import { useMemo, useState } from 'react'
import CopyButton from '../../components/CopyButton.jsx'
import { Panel } from '../../components/ToolLayout.jsx'
import { ProductivityNotice, useStoredState, downloadTextFile } from './shared.jsx'

const STORAGE_KEY = 'untrackt:productivity:project-scope'

function createProject(index = 1) {
  return {
    id: crypto.randomUUID(),
    name: `Project ${index}`,
    goal: '',
    startDate: '',
    endDate: '',
    stakeholders: '',
    inScope: [{ id: crypto.randomUUID(), text: '', priority: 'Must have', category: 'Features' }],
    outScope: [{ id: crypto.randomUUID(), text: '', reason: '', category: 'Features' }],
    assumptions: [''],
    constraints: [{ id: crypto.randomUUID(), type: 'Time', text: '' }],
    successCriteria: [''],
  }
}

export default function ProjectScopeDefiner() {
  const [projects, setProjects] = useStoredState(STORAGE_KEY, [createProject(1)])
  const [activeId, setActiveId] = useState(projects[0]?.id)
  const active = projects.find((project) => project.id === activeId) || projects[0]
  const updateActive = (updater) => setProjects((current) => current.map((project) => project.id === active.id ? updater(project) : project))

  const summary = useMemo(() => [
    active.name,
    active.goal,
    `${active.startDate} -> ${active.endDate}`,
    `Stakeholders: ${active.stakeholders}`,
    '',
    'In scope', ...active.inScope.map((item) => `- [${item.priority}] ${item.text} (${item.category})`),
    '',
    'Out of scope', ...active.outScope.map((item) => `- ${item.text} — ${item.reason}`),
  ].join('\n'), [active])

  return (
    <div className="space-y-6">
      <ProductivityNotice storageKey={STORAGE_KEY} onClear={() => setProjects([createProject(1)])} />

      <Panel>
        <div className="grid gap-3 lg:grid-cols-[1fr,auto,auto,auto]">
          <input className="input-field" value={active.name} onChange={(event) => updateActive((project) => ({ ...project, name: event.target.value }))} />
          <select className="input-field" value={active.id} onChange={(event) => setActiveId(event.target.value)}>{projects.map((project) => <option key={project.id} value={project.id}>{project.name}</option>)}</select>
          <button type="button" className="btn-secondary" onClick={() => { if (projects.length < 5) { const next = createProject(projects.length + 1); setProjects((current) => [...current, next]); setActiveId(next.id) } }}>Add project</button>
          <div className="flex gap-2"><CopyButton text={summary} label="Copy scope" /><button type="button" className="btn-secondary" onClick={() => downloadTextFile(`${active.name.replace(/\s+/g, '-').toLowerCase()}.txt`, summary)}>Download .txt</button></div>
        </div>
      </Panel>

      <div className="grid gap-6 xl:grid-cols-[1fr,1fr]">
        <Panel>
          <div className="grid gap-4 sm:grid-cols-2">
            <textarea className="textarea-field min-h-[100px] sm:col-span-2" value={active.goal} onChange={(event) => updateActive((project) => ({ ...project, goal: event.target.value }))} placeholder="One-line goal" />
            <input className="input-field" type="date" value={active.startDate} onChange={(event) => updateActive((project) => ({ ...project, startDate: event.target.value }))} />
            <input className="input-field" type="date" value={active.endDate} onChange={(event) => updateActive((project) => ({ ...project, endDate: event.target.value }))} />
            <input className="input-field sm:col-span-2" value={active.stakeholders} onChange={(event) => updateActive((project) => ({ ...project, stakeholders: event.target.value }))} placeholder="Stakeholders (comma-separated)" />
          </div>
        </Panel>

        <Panel>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">In scope</h2>
          <div className="mt-4 space-y-3">
            {active.inScope.map((item) => <div key={item.id} className="grid gap-3 rounded-2xl border border-gray-200 p-3 dark:border-gray-700 lg:grid-cols-[1fr,160px,160px]"><input className="input-field" value={item.text} onChange={(event) => updateActive((project) => ({ ...project, inScope: project.inScope.map((entry) => entry.id === item.id ? { ...entry, text: event.target.value } : entry) }))} placeholder="Scope item" /><select className="input-field" value={item.priority} onChange={(event) => updateActive((project) => ({ ...project, inScope: project.inScope.map((entry) => entry.id === item.id ? { ...entry, priority: event.target.value } : entry) }))}><option>Must have</option><option>Should have</option><option>Could have</option></select><select className="input-field" value={item.category} onChange={(event) => updateActive((project) => ({ ...project, inScope: project.inScope.map((entry) => entry.id === item.id ? { ...entry, category: event.target.value } : entry) }))}><option>Features</option><option>Deliverables</option><option>Services</option><option>Content</option></select></div>)}
            <button type="button" className="btn-secondary" onClick={() => updateActive((project) => ({ ...project, inScope: [...project.inScope, { id: crypto.randomUUID(), text: '', priority: 'Should have', category: 'Features' }] }))}>Add in-scope item</button>
          </div>
        </Panel>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr,1fr]">
        <Panel>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Out of scope</h2>
          <div className="mt-4 space-y-3">
            {active.outScope.map((item) => <div key={item.id} className="grid gap-3 rounded-2xl border border-gray-200 p-3 dark:border-gray-700 lg:grid-cols-[1fr,1fr,160px]"><input className="input-field" value={item.text} onChange={(event) => updateActive((project) => ({ ...project, outScope: project.outScope.map((entry) => entry.id === item.id ? { ...entry, text: event.target.value } : entry) }))} placeholder="Excluded item" /><input className="input-field" value={item.reason} onChange={(event) => updateActive((project) => ({ ...project, outScope: project.outScope.map((entry) => entry.id === item.id ? { ...entry, reason: event.target.value } : entry) }))} placeholder="Reason excluded" /><select className="input-field" value={item.category} onChange={(event) => updateActive((project) => ({ ...project, outScope: project.outScope.map((entry) => entry.id === item.id ? { ...entry, category: event.target.value } : entry) }))}><option>Features</option><option>Deliverables</option><option>Services</option><option>Content</option></select></div>)}
          </div>
        </Panel>
        <Panel>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Assumptions, constraints, success criteria</h2>
          <div className="mt-4 space-y-4">
            {active.assumptions.map((entry, index) => <input key={index} className="input-field" value={entry} onChange={(event) => updateActive((project) => ({ ...project, assumptions: project.assumptions.map((item, itemIndex) => itemIndex === index ? event.target.value : item) }))} placeholder="Assumption" />)}
            {active.constraints.map((constraint) => <div key={constraint.id} className="grid gap-3 md:grid-cols-[180px,1fr]"><select className="input-field" value={constraint.type} onChange={(event) => updateActive((project) => ({ ...project, constraints: project.constraints.map((entry) => entry.id === constraint.id ? { ...entry, type: event.target.value } : entry) }))}><option>Budget</option><option>Time</option><option>Resources</option><option>Technical</option><option>Other</option></select><input className="input-field" value={constraint.text} onChange={(event) => updateActive((project) => ({ ...project, constraints: project.constraints.map((entry) => entry.id === constraint.id ? { ...entry, text: event.target.value } : entry) }))} placeholder="Constraint" /></div>)}
            {active.successCriteria.map((entry, index) => <input key={index} className="input-field" value={entry} onChange={(event) => updateActive((project) => ({ ...project, successCriteria: project.successCriteria.map((item, itemIndex) => itemIndex === index ? event.target.value : item) }))} placeholder="Success criterion" />)}
          </div>
        </Panel>
      </div>
    </div>
  )
}
