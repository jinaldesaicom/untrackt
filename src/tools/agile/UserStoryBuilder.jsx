import { useState, useEffect } from 'react'
import { Plus, Trash2, Copy, Check } from 'lucide-react'
import { getItem, setItem } from '../../utils/storage'

const STORAGE_KEY = 'untrackt_user_story_builder'

function emptyStory() {
  return {
    id: Date.now(),
    role: '',
    want: '',
    soThat: '',
    acceptanceCriteria: [''],
    priority: 'medium',
    points: '',
    notes: '',
  }
}

const PRIORITIES = [
  { value: 'critical', label: 'Critical', color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' },
  { value: 'high', label: 'High', color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300' },
  { value: 'medium', label: 'Medium', color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300' },
  { value: 'low', label: 'Low', color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' },
]

export default function UserStoryBuilder() {
  const [stories, setStories] = useState(() => getItem(STORAGE_KEY, []))
  const [activeId, setActiveId] = useState(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => { setItem(STORAGE_KEY, stories) }, [stories])

  const addStory = () => {
    const s = emptyStory()
    setStories(prev => [s, ...prev])
    setActiveId(s.id)
  }

  const deleteStory = (id) => {
    setStories(prev => prev.filter(s => s.id !== id))
    if (activeId === id) setActiveId(null)
  }

  const update = (id, key, val) => setStories(prev => prev.map(s => s.id === id ? { ...s, [key]: val } : s))

  const addCriteria = (id) => {
    setStories(prev => prev.map(s =>
      s.id === id ? { ...s, acceptanceCriteria: [...s.acceptanceCriteria, ''] } : s
    ))
  }

  const updateCriteria = (storyId, idx, val) => {
    setStories(prev => prev.map(s =>
      s.id === storyId ? { ...s, acceptanceCriteria: s.acceptanceCriteria.map((c, i) => i === idx ? val : c) } : s
    ))
  }

  const removeCriteria = (storyId, idx) => {
    setStories(prev => prev.map(s =>
      s.id === storyId ? { ...s, acceptanceCriteria: s.acceptanceCriteria.filter((_, i) => i !== idx) } : s
    ))
  }

  const current = stories.find(s => s.id === activeId)

  const formatStory = (s) => {
    let text = `As a ${s.role || '___'}, I want ${s.want || '___'}, so that ${s.soThat || '___'}.`
    if (s.acceptanceCriteria.some(c => c.trim())) {
      text += '\n\nAcceptance Criteria:\n'
      s.acceptanceCriteria.filter(c => c.trim()).forEach(c => { text += `- ${c}\n` })
    }
    if (s.points) text += `\nStory Points: ${s.points}`
    return text
  }

  const copyStory = (s) => {
    navigator.clipboard.writeText(formatStory(s)).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500 dark:text-gray-400">{stories.length} stories</p>
        <button onClick={addStory} className="btn-primary flex items-center gap-1.5">
          <Plus className="w-4 h-4" /> New Story
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="space-y-2">
          {stories.length === 0 && (
            <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-6 text-center text-sm text-gray-400">
              No stories yet — click &quot;New Story&quot; to start!
            </div>
          )}
          {stories.map(s => (
            <button key={s.id} onClick={() => setActiveId(s.id)}
              className={`w-full text-left rounded-lg border px-3 py-2.5 transition-colors ${
                activeId === s.id
                  ? 'border-indigo-300 dark:border-indigo-700 bg-indigo-50 dark:bg-indigo-900/20'
                  : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-indigo-200'
              }`}>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium truncate text-gray-800 dark:text-gray-200">
                  {s.want ? `I want ${s.want}` : 'Untitled Story'}
                </span>
                {s.points && <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900/30 px-1.5 rounded">{s.points} SP</span>}
              </div>
              <p className="text-[10px] text-gray-400 mt-0.5 truncate">
                {s.role ? `As a ${s.role}` : 'No role defined'}
              </p>
            </button>
          ))}
        </div>

        <div className="lg:col-span-2">
          {current ? (
            <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 space-y-4">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">User Story</h3>
                <div className="flex gap-2">
                  <button onClick={() => copyStory(current)} className="text-xs text-indigo-600 dark:text-indigo-400 flex items-center gap-1 hover:underline">
                    {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />} {copied ? 'Copied' : 'Copy'}
                  </button>
                  <button onClick={() => deleteStory(current.id)} className="text-xs text-red-500 hover:underline flex items-center gap-1">
                    <Trash2 className="w-3 h-3" /> Delete
                  </button>
                </div>
              </div>

              <div className="rounded-lg bg-gray-50 dark:bg-gray-800 p-3">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  As a <strong className="text-indigo-600 dark:text-indigo-400">{current.role || '___'}</strong>,
                  I want <strong className="text-indigo-600 dark:text-indigo-400">{current.want || '___'}</strong>,
                  so that <strong className="text-indigo-600 dark:text-indigo-400">{current.soThat || '___'}</strong>.
                </p>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">As a (role)...</label>
                  <input type="text" value={current.role} onChange={e => update(current.id, 'role', e.target.value)}
                    className="input-field text-sm" placeholder="e.g., logged-in user, admin, team lead" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">I want (feature)...</label>
                  <input type="text" value={current.want} onChange={e => update(current.id, 'want', e.target.value)}
                    className="input-field text-sm" placeholder="e.g., to filter search results by date" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">So that (benefit)...</label>
                  <input type="text" value={current.soThat} onChange={e => update(current.id, 'soThat', e.target.value)}
                    className="input-field text-sm" placeholder="e.g., I can find recent content quickly" />
                </div>
              </div>

              <div className="flex gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Priority</label>
                  <select value={current.priority} onChange={e => update(current.id, 'priority', e.target.value)}
                    className="input-field text-sm">
                    {PRIORITIES.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Story Points</label>
                  <input type="number" min="0" value={current.points} onChange={e => update(current.id, 'points', e.target.value)}
                    className="input-field text-sm w-20" placeholder="SP" />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-medium text-gray-500 dark:text-gray-400">Acceptance Criteria</label>
                  <button onClick={() => addCriteria(current.id)} className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline">
                    + Add
                  </button>
                </div>
                <div className="space-y-1.5">
                  {current.acceptanceCriteria.map((c, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-xs text-gray-400 w-5 shrink-0">{i + 1}.</span>
                      <input type="text" value={c} onChange={e => updateCriteria(current.id, i, e.target.value)}
                        className="flex-1 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-2.5 py-1.5 text-sm" placeholder="Acceptance criterion..." />
                      {current.acceptanceCriteria.length > 1 && (
                        <button onClick={() => removeCriteria(current.id, i)} className="text-gray-300 hover:text-red-500">
                          <Trash2 className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Notes</label>
                <textarea value={current.notes} onChange={e => update(current.id, 'notes', e.target.value)}
                  className="textarea-field text-sm min-h-[50px]" placeholder="Additional notes, dependencies, links..." />
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-8 text-center text-sm text-gray-400">
              Select a story to edit, or create a new one
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
