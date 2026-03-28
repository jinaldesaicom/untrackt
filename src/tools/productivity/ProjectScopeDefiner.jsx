import { useState, useEffect } from 'react'
import { Plus, Trash2, Copy, Check, Eye, Code } from 'lucide-react'
import { getItem, setItem } from '../../utils/storage'
import { renderMarkdown } from '../../utils/markdownRenderer'

const STORAGE_KEY = 'untrackt_project_scope'
const MOSCOW = ['Must Have', 'Should Have', 'Could Have', 'Won\'t Have']

function CopyBtn({ text }) {
  const [copied, setCopied] = useState(false)
  const copy = () => { navigator.clipboard.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1500) }) }
  return <button onClick={copy} className="btn-secondary flex items-center gap-1.5 text-xs">{copied ? <><Check className="w-3.5 h-3.5" /> Copied</> : <><Copy className="w-3.5 h-3.5" /> Copy</>}</button>
}

function emptyProject() {
  return {
    id: Date.now(),
    name: '',
    description: '',
    goals: '',
    outOfScope: '',
    items: [{ id: Date.now() + 1, feature: '', priority: 'Must Have' }]
  }
}

export default function ProjectScopeDefiner() {
  const [projects, setProjects] = useState(() => {
    const saved = getItem(STORAGE_KEY, [])
    return saved.length ? saved : [emptyProject()]
  })
  const [activeIdx, setActiveIdx] = useState(0)
  const [previewMode, setPreviewMode] = useState('formatted')

  useEffect(() => { setItem(STORAGE_KEY, projects) }, [projects])

  const project = projects[activeIdx] || projects[0]

  const updateProject = (key, val) => setProjects(prev => prev.map((p, i) => i === activeIdx ? { ...p, [key]: val } : p))
  const addProject = () => { if (projects.length >= 5) return; setProjects(prev => [...prev, emptyProject()]); setActiveIdx(projects.length) }
  const deleteProject = (idx) => {
    if (projects.length <= 1) return
    setProjects(prev => prev.filter((_, i) => i !== idx))
    if (activeIdx >= idx && activeIdx > 0) setActiveIdx(activeIdx - 1)
  }

  const addItem = () => updateProject('items', [...project.items, { id: Date.now(), feature: '', priority: 'Must Have' }])
  const removeItem = (id) => updateProject('items', project.items.filter(i => i.id !== id))
  const updateItem = (id, key, val) => updateProject('items', project.items.map(i => i.id === id ? { ...i, [key]: val } : i))

  const moscowCounts = MOSCOW.reduce((acc, p) => { acc[p] = project.items.filter(i => i.priority === p).length; return acc }, {})

  const exportText = [
    `# ${project.name || 'Project Scope'}`,
    project.description ? `\n## Description\n${project.description}` : '',
    project.goals ? `\n## Goals\n${project.goals}` : '',
    '\n## Features (MoSCoW)',
    ...MOSCOW.map(p => {
      const feats = project.items.filter(i => i.priority === p && i.feature.trim())
      return feats.length ? `\n### ${p}\n${feats.map(f => `- ${f.feature}`).join('\n')}` : ''
    }),
    project.outOfScope ? `\n## Out of Scope\n${project.outOfScope}` : ''
  ].filter(Boolean).join('\n')

  const priorityColor = {
    'Must Have': 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800',
    'Should Have': 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800',
    'Could Have': 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800',
    "Won't Have": 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700'
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {projects.map((p, i) => (
          <div key={p.id} className="flex items-center gap-1">
            <button onClick={() => setActiveIdx(i)} className={`px-3 py-1.5 text-xs rounded-full border ${activeIdx === i ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700'}`}>
              {p.name || `Project ${i + 1}`}
            </button>
            {projects.length > 1 && activeIdx === i && <button onClick={() => deleteProject(i)} className="text-gray-300 hover:text-red-500"><Trash2 className="w-3 h-3" /></button>}
          </div>
        ))}
        {projects.length < 5 && <button onClick={addProject} className="btn-secondary text-xs"><Plus className="w-3 h-3" /></button>}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Project Name</label>
            <input type="text" value={project.name} onChange={e => updateProject('name', e.target.value)} className="input-field" placeholder="My awesome project" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Description</label>
            <textarea value={project.description} onChange={e => updateProject('description', e.target.value)} className="textarea-field min-h-[60px]" placeholder="Brief project description…" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Goals</label>
            <textarea value={project.goals} onChange={e => updateProject('goals', e.target.value)} className="textarea-field min-h-[60px]" placeholder="What does success look like?" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Out of Scope</label>
            <textarea value={project.outOfScope} onChange={e => updateProject('outOfScope', e.target.value)} className="textarea-field min-h-[60px]" placeholder="What is explicitly NOT included?" />
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Features (MoSCoW)</h3>
            <div className="flex gap-1.5">
              {MOSCOW.map(p => (
                <span key={p} className={`px-1.5 py-0.5 rounded text-[10px] border ${priorityColor[p]}`}>{p.split(' ')[0]}: {moscowCounts[p]}</span>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            {project.items.map(item => (
              <div key={item.id} className="flex items-center gap-2">
                <input type="text" value={item.feature} onChange={e => updateItem(item.id, 'feature', e.target.value)} className="input-field text-xs flex-1" placeholder="Feature / requirement" />
                <select value={item.priority} onChange={e => updateItem(item.id, 'priority', e.target.value)} className="input-field text-xs w-28">
                  {MOSCOW.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
                {project.items.length > 1 && <button onClick={() => removeItem(item.id)} className="text-gray-300 hover:text-red-500"><Trash2 className="w-3 h-3" /></button>}
              </div>
            ))}
          </div>
          <button onClick={addItem} className="btn-secondary text-xs flex items-center gap-1"><Plus className="w-3 h-3" /> Add Feature</button>

          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <h3 className="text-xs font-medium text-gray-500">Preview</h3>
                <div className="flex gap-0.5 p-0.5 rounded-lg bg-gray-100 dark:bg-gray-800">
                  <button onClick={() => setPreviewMode('formatted')} className={`p-1 rounded-md transition-colors ${previewMode === 'formatted' ? 'bg-white dark:bg-gray-700 shadow-sm text-indigo-600 dark:text-indigo-400' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`} title="Formatted"><Eye className="w-3.5 h-3.5" /></button>
                  <button onClick={() => setPreviewMode('raw')} className={`p-1 rounded-md transition-colors ${previewMode === 'raw' ? 'bg-white dark:bg-gray-700 shadow-sm text-indigo-600 dark:text-indigo-400' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`} title="Raw Markdown"><Code className="w-3.5 h-3.5" /></button>
                </div>
              </div>
              <CopyBtn text={exportText} />
            </div>
            {previewMode === 'raw' ? (
              <pre className="textarea-field text-xs bg-gray-50 dark:bg-gray-800 whitespace-pre-wrap max-h-[200px] overflow-y-auto">{exportText}</pre>
            ) : (
              <div className="min-h-[80px] max-h-[300px] overflow-y-auto p-3 rounded-lg bg-gray-50 dark:bg-gray-800" dangerouslySetInnerHTML={{ __html: renderMarkdown(exportText) }} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
