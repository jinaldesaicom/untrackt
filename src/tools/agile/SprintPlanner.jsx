import { useState, useEffect } from 'react'
import { Plus, Trash2, Save, ChevronDown, ChevronUp, GripVertical } from 'lucide-react'
import { getItem, setItem } from '../../utils/storage'

const STORAGE_KEY = 'untrackt_sprint_planner'

function emptySprint() {
  return {
    id: Date.now(),
    name: '',
    goal: '',
    startDate: '',
    endDate: '',
    stories: [],
    createdAt: new Date().toISOString(),
  }
}

function emptyStory() {
  return { id: Date.now(), title: '', points: '', assignee: '', status: 'todo' }
}

const STATUS_OPTIONS = [
  { value: 'todo', label: 'To Do', color: 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300' },
  { value: 'in-progress', label: 'In Progress', color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' },
  { value: 'done', label: 'Done', color: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' },
]

export default function SprintPlanner() {
  const [sprints, setSprints] = useState(() => getItem(STORAGE_KEY, []))
  const [activeId, setActiveId] = useState(null)
  const [expanded, setExpanded] = useState({})

  useEffect(() => { setItem(STORAGE_KEY, sprints) }, [sprints])

  const addSprint = () => {
    const s = emptySprint()
    setSprints(prev => [s, ...prev])
    setActiveId(s.id)
    setExpanded(prev => ({ ...prev, [s.id]: true }))
  }

  const deleteSprint = (id) => {
    setSprints(prev => prev.filter(s => s.id !== id))
    if (activeId === id) setActiveId(null)
  }

  const updateSprint = (id, key, val) =>
    setSprints(prev => prev.map(s => s.id === id ? { ...s, [key]: val } : s))

  const addStory = (sprintId) => {
    setSprints(prev => prev.map(s =>
      s.id === sprintId ? { ...s, stories: [...s.stories, emptyStory()] } : s
    ))
  }

  const updateStory = (sprintId, storyId, key, val) => {
    setSprints(prev => prev.map(s =>
      s.id === sprintId
        ? { ...s, stories: s.stories.map(st => st.id === storyId ? { ...st, [key]: val } : st) }
        : s
    ))
  }

  const deleteStory = (sprintId, storyId) => {
    setSprints(prev => prev.map(s =>
      s.id === sprintId ? { ...s, stories: s.stories.filter(st => st.id !== storyId) } : s
    ))
  }

  const toggleExpand = (id) => setExpanded(prev => ({ ...prev, [id]: !prev[id] }))

  const getSprintStats = (sprint) => {
    const totalPoints = sprint.stories.reduce((sum, s) => sum + (parseInt(s.points) || 0), 0)
    const donePoints = sprint.stories.filter(s => s.status === 'done').reduce((sum, s) => sum + (parseInt(s.points) || 0), 0)
    const progress = totalPoints > 0 ? Math.round((donePoints / totalPoints) * 100) : 0
    return { totalPoints, donePoints, progress, storyCount: sprint.stories.length }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500 dark:text-gray-400">{sprints.length} sprint{sprints.length !== 1 ? 's' : ''}</p>
        <button onClick={addSprint} className="btn-primary flex items-center gap-1.5">
          <Plus className="w-4 h-4" /> New Sprint
        </button>
      </div>

      {sprints.length === 0 && (
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-8 text-center text-sm text-gray-400">
          No sprints yet — click &quot;New Sprint&quot; to start planning!
        </div>
      )}

      <div className="space-y-3">
        {sprints.map(sprint => {
          const stats = getSprintStats(sprint)
          const isExpanded = expanded[sprint.id]
          return (
            <div key={sprint.id} className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
              <button onClick={() => toggleExpand(sprint.id)}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <div className="flex items-center gap-3 min-w-0">
                  {isExpanded ? <ChevronUp className="w-4 h-4 text-gray-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />}
                  <span className="font-medium text-gray-900 dark:text-white truncate">
                    {sprint.name || 'Untitled Sprint'}
                  </span>
                </div>
                <div className="flex items-center gap-4 shrink-0 text-xs text-gray-500 dark:text-gray-400">
                  <span>{stats.storyCount} stories</span>
                  <span>{stats.donePoints}/{stats.totalPoints} pts</span>
                  <div className="w-20 h-1.5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                    <div className="h-full bg-indigo-500 rounded-full transition-all" style={{ width: `${stats.progress}%` }} />
                  </div>
                </div>
              </button>

              {isExpanded && (
                <div className="px-4 pb-4 space-y-4 border-t border-gray-100 dark:border-gray-800">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Sprint Name</label>
                      <input type="text" value={sprint.name} onChange={e => updateSprint(sprint.id, 'name', e.target.value)}
                        className="input-field text-sm" placeholder="Sprint 1" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Sprint Goal</label>
                      <input type="text" value={sprint.goal} onChange={e => updateSprint(sprint.id, 'goal', e.target.value)}
                        className="input-field text-sm" placeholder="Complete user auth flow" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Start Date</label>
                      <input type="date" value={sprint.startDate} onChange={e => updateSprint(sprint.id, 'startDate', e.target.value)}
                        className="input-field text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">End Date</label>
                      <input type="date" value={sprint.endDate} onChange={e => updateSprint(sprint.id, 'endDate', e.target.value)}
                        className="input-field text-sm" />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Stories</h4>
                      <button onClick={() => addStory(sprint.id)} className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1">
                        <Plus className="w-3 h-3" /> Add Story
                      </button>
                    </div>

                    {sprint.stories.length === 0 ? (
                      <p className="text-xs text-gray-400 italic">No stories yet</p>
                    ) : (
                      <div className="space-y-2">
                        {sprint.stories.map(story => (
                          <div key={story.id} className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 rounded-lg px-3 py-2">
                            <GripVertical className="w-3.5 h-3.5 text-gray-300 dark:text-gray-600 shrink-0" />
                            <input type="text" value={story.title} onChange={e => updateStory(sprint.id, story.id, 'title', e.target.value)}
                              className="flex-1 min-w-0 bg-transparent text-sm text-gray-900 dark:text-white outline-none" placeholder="Story title" />
                            <input type="number" value={story.points} onChange={e => updateStory(sprint.id, story.id, 'points', e.target.value)}
                              className="w-14 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded px-1.5 py-0.5 text-xs text-center" placeholder="Pts" min="0" />
                            <input type="text" value={story.assignee} onChange={e => updateStory(sprint.id, story.id, 'assignee', e.target.value)}
                              className="w-24 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded px-1.5 py-0.5 text-xs" placeholder="Assignee" />
                            <select value={story.status} onChange={e => updateStory(sprint.id, story.id, 'status', e.target.value)}
                              className="text-xs rounded px-1.5 py-0.5 border-0 cursor-pointer font-medium bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                              {STATUS_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                            </select>
                            <button onClick={() => deleteStory(sprint.id, story.id)} className="text-gray-300 hover:text-red-500 shrink-0">
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end">
                    <button onClick={() => deleteSprint(sprint.id)} className="text-xs text-red-500 hover:text-red-600 flex items-center gap-1">
                      <Trash2 className="w-3 h-3" /> Delete Sprint
                    </button>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
