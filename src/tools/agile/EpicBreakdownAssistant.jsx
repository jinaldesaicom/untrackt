import { useState, useEffect } from 'react'
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react'
import { getItem, setItem } from '../../utils/storage'

const STORAGE_KEY = 'untrackt_epic_breakdown'

function emptyEpic() {
  return {
    id: Date.now(),
    title: '',
    description: '',
    stories: [],
    expanded: true,
  }
}

function emptyStory() {
  return { id: Date.now() + Math.random(), title: '', points: '', priority: 'medium' }
}

export default function EpicBreakdownAssistant() {
  const [epics, setEpics] = useState(() => getItem(STORAGE_KEY, []))
  const [activeEpic, setActiveEpic] = useState(null)

  useEffect(() => { setItem(STORAGE_KEY, epics) }, [epics])

  const addEpic = () => {
    const e = emptyEpic()
    setEpics(prev => [e, ...prev])
    setActiveEpic(e.id)
  }

  const deleteEpic = (id) => {
    setEpics(prev => prev.filter(e => e.id !== id))
    if (activeEpic === id) setActiveEpic(null)
  }

  const updateEpic = (id, key, val) => setEpics(prev => prev.map(e => e.id === id ? { ...e, [key]: val } : e))
  const toggleExpand = (id) => setEpics(prev => prev.map(e => e.id === id ? { ...e, expanded: !e.expanded } : e))

  const addStory = (epicId) => {
    setEpics(prev => prev.map(e =>
      e.id === epicId ? { ...e, stories: [...e.stories, emptyStory()] } : e
    ))
  }

  const updateStory = (epicId, storyId, key, val) => {
    setEpics(prev => prev.map(e =>
      e.id === epicId
        ? { ...e, stories: e.stories.map(s => s.id === storyId ? { ...s, [key]: val } : s) }
        : e
    ))
  }

  const deleteStory = (epicId, storyId) => {
    setEpics(prev => prev.map(e =>
      e.id === epicId ? { ...e, stories: e.stories.filter(s => s.id !== storyId) } : e
    ))
  }

  const getEpicPoints = (epic) => epic.stories.reduce((sum, s) => sum + (parseInt(s.points) || 0), 0)
  const totalPoints = epics.reduce((sum, e) => sum + getEpicPoints(e), 0)
  const totalStories = epics.reduce((sum, e) => sum + e.stories.length, 0)

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {epics.length} epics · {totalStories} stories · {totalPoints} total SP
        </div>
        <button onClick={addEpic} className="btn-primary flex items-center gap-1.5">
          <Plus className="w-4 h-4" /> New Epic
        </button>
      </div>

      {epics.length === 0 && (
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-8 text-center text-sm text-gray-400">
          No epics yet — click &quot;New Epic&quot; to start breaking down work!
        </div>
      )}

      <div className="space-y-3">
        {epics.map(epic => {
          const epicPoints = getEpicPoints(epic)
          return (
            <div key={epic.id} className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50" onClick={() => toggleExpand(epic.id)}>
                {epic.expanded ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                <input type="text" value={epic.title} onClick={e => e.stopPropagation()}
                  onChange={e => updateEpic(epic.id, 'title', e.target.value)}
                  className="flex-1 font-medium text-sm bg-transparent text-gray-900 dark:text-white outline-none" placeholder="Epic title..." />
                <span className="text-xs text-gray-400 shrink-0">{epic.stories.length} stories · {epicPoints} SP</span>
              </div>

              {epic.expanded && (
                <div className="px-4 pb-4 border-t border-gray-100 dark:border-gray-800 space-y-3 pt-3">
                  <textarea value={epic.description}
                    onChange={e => updateEpic(epic.id, 'description', e.target.value)}
                    className="textarea-field text-sm min-h-[40px]" placeholder="Epic description — what's the high-level goal?" />

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400">Stories</h4>
                      <button onClick={() => addStory(epic.id)} className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1">
                        <Plus className="w-3 h-3" /> Add Story
                      </button>
                    </div>

                    {epic.stories.length === 0 ? (
                      <p className="text-xs text-gray-400 italic">Break this epic into smaller stories</p>
                    ) : (
                      <div className="space-y-1.5">
                        {epic.stories.map((story, idx) => (
                          <div key={story.id} className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 rounded-lg px-3 py-2">
                            <span className="text-[10px] text-gray-400 w-4 shrink-0">{idx + 1}</span>
                            <input type="text" value={story.title} onChange={e => updateStory(epic.id, story.id, 'title', e.target.value)}
                              className="flex-1 min-w-0 bg-transparent text-sm text-gray-900 dark:text-white outline-none" placeholder="Story title" />
                            <select value={story.priority} onChange={e => updateStory(epic.id, story.id, 'priority', e.target.value)}
                              className="text-[10px] rounded px-1.5 py-0.5 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 cursor-pointer">
                              <option value="critical">Critical</option>
                              <option value="high">High</option>
                              <option value="medium">Medium</option>
                              <option value="low">Low</option>
                            </select>
                            <input type="number" min="0" value={story.points} onChange={e => updateStory(epic.id, story.id, 'points', e.target.value)}
                              className="w-14 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded px-1.5 py-0.5 text-xs text-center" placeholder="SP" />
                            <button onClick={() => deleteStory(epic.id, story.id)} className="text-gray-300 hover:text-red-500 shrink-0">
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end">
                    <button onClick={() => deleteEpic(epic.id)} className="text-xs text-red-500 hover:text-red-600 flex items-center gap-1">
                      <Trash2 className="w-3 h-3" /> Delete Epic
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
