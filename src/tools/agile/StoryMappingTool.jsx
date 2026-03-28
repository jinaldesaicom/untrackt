import { useState, useEffect } from 'react'
import { Plus, Trash2, GripVertical } from 'lucide-react'
import { getItem, setItem } from '../../utils/storage'

const STORAGE_KEY = 'untrackt_story_mapping'

const RELEASE_COLORS = [
  'bg-indigo-100 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800',
  'bg-green-100 dark:bg-green-900/20 border-green-200 dark:border-green-800',
  'bg-amber-100 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800',
  'bg-rose-100 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800',
  'bg-cyan-100 dark:bg-cyan-900/20 border-cyan-200 dark:border-cyan-800',
]

export default function StoryMappingTool() {
  const [activities, setActivities] = useState(() => getItem(STORAGE_KEY + '_activities', [
    { id: 1, name: 'User Registration', tasks: [
      { id: 10, name: 'Sign up form', stories: [{ id: 100, text: 'Email/password signup', release: 0 }, { id: 101, text: 'Social login', release: 1 }] },
      { id: 11, name: 'Verification', stories: [{ id: 110, text: 'Email verification', release: 0 }] },
    ]},
    { id: 2, name: 'Dashboard', tasks: [
      { id: 20, name: 'Overview', stories: [{ id: 200, text: 'Basic metrics', release: 0 }, { id: 201, text: 'Custom widgets', release: 2 }] },
    ]},
  ]))
  const [releases, setReleases] = useState(() => getItem(STORAGE_KEY + '_releases', ['MVP', 'v1.1', 'v2.0']))

  useEffect(() => {
    setItem(STORAGE_KEY + '_activities', activities)
    setItem(STORAGE_KEY + '_releases', releases)
  }, [activities, releases])

  const addActivity = () => {
    setActivities(prev => [...prev, { id: Date.now(), name: '', tasks: [] }])
  }

  const removeActivity = (actId) => setActivities(prev => prev.filter(a => a.id !== actId))
  const updateActivityName = (actId, name) => setActivities(prev => prev.map(a => a.id === actId ? { ...a, name } : a))

  const addTask = (actId) => {
    setActivities(prev => prev.map(a =>
      a.id === actId ? { ...a, tasks: [...a.tasks, { id: Date.now(), name: '', stories: [] }] } : a
    ))
  }

  const removeTask = (actId, taskId) => {
    setActivities(prev => prev.map(a =>
      a.id === actId ? { ...a, tasks: a.tasks.filter(t => t.id !== taskId) } : a
    ))
  }

  const updateTaskName = (actId, taskId, name) => {
    setActivities(prev => prev.map(a =>
      a.id === actId ? { ...a, tasks: a.tasks.map(t => t.id === taskId ? { ...t, name } : t) } : a
    ))
  }

  const addStory = (actId, taskId, release) => {
    setActivities(prev => prev.map(a =>
      a.id === actId ? { ...a, tasks: a.tasks.map(t =>
        t.id === taskId ? { ...t, stories: [...t.stories, { id: Date.now() + Math.random(), text: '', release }] } : t
      )} : a
    ))
  }

  const removeStory = (actId, taskId, storyId) => {
    setActivities(prev => prev.map(a =>
      a.id === actId ? { ...a, tasks: a.tasks.map(t =>
        t.id === taskId ? { ...t, stories: t.stories.filter(s => s.id !== storyId) } : t
      )} : a
    ))
  }

  const updateStoryText = (actId, taskId, storyId, text) => {
    setActivities(prev => prev.map(a =>
      a.id === actId ? { ...a, tasks: a.tasks.map(t =>
        t.id === taskId ? { ...t, stories: t.stories.map(s => s.id === storyId ? { ...s, text } : s) } : t
      )} : a
    ))
  }

  const addRelease = () => setReleases(prev => [...prev, `Release ${prev.length + 1}`])
  const removeRelease = (idx) => {
    setReleases(prev => prev.filter((_, i) => i !== idx))
    setActivities(prev => prev.map(a => ({ ...a, tasks: a.tasks.map(t => ({
      ...t, stories: t.stories.filter(s => s.release !== idx).map(s => ({ ...s, release: s.release > idx ? s.release - 1 : s.release }))
    }))})))
  }
  const updateReleaseName = (idx, name) => setReleases(prev => prev.map((r, i) => i === idx ? name : r))

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Releases:</span>
        {releases.map((r, i) => (
          <div key={i} className={`flex items-center gap-1 rounded-full px-2.5 py-1 border text-xs ${RELEASE_COLORS[i % RELEASE_COLORS.length]}`}>
            <input type="text" value={r} onChange={e => updateReleaseName(i, e.target.value)}
              className="bg-transparent outline-none w-16 text-xs font-medium" />
            {releases.length > 1 && (
              <button onClick={() => removeRelease(i)} className="text-gray-400 hover:text-red-500 text-[10px]">×</button>
            )}
          </div>
        ))}
        <button onClick={addRelease} className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline">+ Release</button>
        <div className="flex-1" />
        <button onClick={addActivity} className="btn-primary flex items-center gap-1.5 text-sm">
          <Plus className="w-4 h-4" /> Add Activity
        </button>
      </div>

      <div className="overflow-x-auto">
        <div className="inline-flex gap-3 min-w-full pb-4">
          {activities.map(activity => (
            <div key={activity.id} className="w-64 shrink-0">
              {/* Activity header */}
              <div className="rounded-t-xl bg-indigo-500 px-3 py-2 flex items-center justify-between">
                <input type="text" value={activity.name} onChange={e => updateActivityName(activity.id, e.target.value)}
                  className="bg-transparent text-white text-sm font-semibold outline-none flex-1 placeholder-indigo-200" placeholder="Activity..." />
                <button onClick={() => removeActivity(activity.id)} className="text-indigo-200 hover:text-white shrink-0 ml-1">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Tasks */}
              <div className="border-x border-b border-gray-200 dark:border-gray-700 rounded-b-xl bg-white dark:bg-gray-900 divide-y divide-gray-100 dark:divide-gray-800">
                {activity.tasks.map(task => (
                  <div key={task.id} className="p-2.5 space-y-2">
                    <div className="flex items-center gap-1">
                      <input type="text" value={task.name} onChange={e => updateTaskName(activity.id, task.id, e.target.value)}
                        className="flex-1 bg-transparent text-xs font-medium text-gray-700 dark:text-gray-300 outline-none" placeholder="Task..." />
                      <button onClick={() => removeTask(activity.id, task.id)} className="text-gray-300 hover:text-red-500">
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Stories grouped by release */}
                    {releases.map((rel, ri) => {
                      const relStories = task.stories.filter(s => s.release === ri)
                      return (
                        <div key={ri}>
                          {relStories.map(story => (
                            <div key={story.id}
                              className={`flex items-center gap-1 rounded px-2 py-1 mb-1 border text-[10px] ${RELEASE_COLORS[ri % RELEASE_COLORS.length]}`}>
                              <input type="text" value={story.text}
                                onChange={e => updateStoryText(activity.id, task.id, story.id, e.target.value)}
                                className="flex-1 bg-transparent outline-none min-w-0" placeholder="Story..." />
                              <button onClick={() => removeStory(activity.id, task.id, story.id)} className="text-gray-400 hover:text-red-500 shrink-0">×</button>
                            </div>
                          ))}
                          {relStories.length === 0 && (
                            <button onClick={() => addStory(activity.id, task.id, ri)}
                              className={`w-full rounded px-2 py-0.5 mb-1 border border-dashed text-[10px] text-gray-400 hover:text-indigo-500 hover:border-indigo-300 transition-colors`}>
                              + {rel}
                            </button>
                          )}
                        </div>
                      )
                    })}
                  </div>
                ))}

                <button onClick={() => addTask(activity.id)}
                  className="w-full py-2 text-xs text-gray-400 hover:text-indigo-500 transition-colors">
                  + Add Task
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 p-3">
        <p className="text-xs text-blue-700 dark:text-blue-300">
          <strong>Tip:</strong> Story maps read left-to-right for user journey flow, and top-to-bottom for priority.
          Assign stories to releases to plan incremental delivery.
        </p>
      </div>
    </div>
  )
}
