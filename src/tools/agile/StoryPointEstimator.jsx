import { useState, useEffect } from 'react'
import { Plus, Trash2, Copy, Check } from 'lucide-react'
import { getItem, setItem } from '../../utils/storage'

const STORAGE_KEY = 'untrackt_story_point_estimator'

const COMPLEXITY = [
  { value: 1, label: 'Trivial', desc: 'Well-understood, minimal logic' },
  { value: 2, label: 'Simple', desc: 'Straightforward, familiar pattern' },
  { value: 3, label: 'Moderate', desc: 'Some unknowns, moderate logic' },
  { value: 5, label: 'Complex', desc: 'Significant logic, multiple components' },
  { value: 8, label: 'Very Complex', desc: 'Many unknowns, cross-cutting concerns' },
]

const EFFORT = [
  { value: 1, label: 'Minimal', desc: 'A few hours' },
  { value: 2, label: 'Small', desc: 'Less than a day' },
  { value: 3, label: 'Medium', desc: '1–2 days' },
  { value: 5, label: 'Large', desc: '3–5 days' },
  { value: 8, label: 'Very Large', desc: 'A full sprint or more' },
]

const UNCERTAINTY = [
  { value: 0.8, label: 'Low', desc: 'Clear requirements, known tech' },
  { value: 1.0, label: 'Medium', desc: 'Some open questions' },
  { value: 1.3, label: 'High', desc: 'Many unknowns, needs spike' },
  { value: 1.5, label: 'Very High', desc: 'Unpredictable scope' },
]

const FIBONACCI = [1, 2, 3, 5, 8, 13, 21]

function nearestFibonacci(value) {
  return FIBONACCI.reduce((prev, curr) => Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev)
}

export default function StoryPointEstimator() {
  const [stories, setStories] = useState(() => getItem(STORAGE_KEY, []))
  const [copied, setCopied] = useState(false)

  useEffect(() => { setItem(STORAGE_KEY, stories) }, [stories])

  const addStory = () => {
    setStories(prev => [...prev, {
      id: Date.now(),
      title: '',
      complexity: 3,
      effort: 3,
      uncertainty: 1.0,
    }])
  }

  const updateStory = (id, key, val) => setStories(prev => prev.map(s => s.id === id ? { ...s, [key]: val } : s))
  const removeStory = (id) => setStories(prev => prev.filter(s => s.id !== id))

  const getPoints = (story) => {
    const raw = ((story.complexity + story.effort) / 2) * story.uncertainty
    return nearestFibonacci(raw)
  }

  const totalPoints = stories.reduce((sum, s) => sum + getPoints(s), 0)

  const copyAll = () => {
    const text = stories.map(s => `${s.title || 'Untitled'}: ${getPoints(s)} SP`).join('\n') + `\n\nTotal: ${totalPoints} SP`
    navigator.clipboard.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000) })
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">{stories.length} stories, {totalPoints} total SP</p>
          {stories.length > 0 && (
            <button onClick={copyAll} className="text-xs text-indigo-600 dark:text-indigo-400 flex items-center gap-1 hover:underline">
              {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />} {copied ? 'Copied' : 'Copy All'}
            </button>
          )}
        </div>
        <button onClick={addStory} className="btn-primary flex items-center gap-1.5">
          <Plus className="w-4 h-4" /> Add Story
        </button>
      </div>

      {stories.length === 0 && (
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-8 text-center text-sm text-gray-400">
          Add a story to start estimating story points
        </div>
      )}

      <div className="space-y-3">
        {stories.map(story => {
          const points = getPoints(story)
          return (
            <div key={story.id} className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 space-y-3">
              <div className="flex items-center justify-between gap-3">
                <input type="text" value={story.title} onChange={e => updateStory(story.id, 'title', e.target.value)}
                  className="flex-1 text-sm font-medium bg-transparent text-gray-900 dark:text-white outline-none" placeholder="Story title..." />
                <div className="flex items-center gap-2 shrink-0">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 font-bold text-lg">
                    {points}
                  </span>
                  <button onClick={() => removeStory(story.id)} className="text-gray-300 hover:text-red-500">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">Complexity</label>
                <div className="flex flex-wrap gap-1.5">
                  {COMPLEXITY.map(c => (
                    <button key={c.value} onClick={() => updateStory(story.id, 'complexity', c.value)}
                      className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${story.complexity === c.value
                        ? 'bg-indigo-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                      title={c.desc}>
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">Effort</label>
                <div className="flex flex-wrap gap-1.5">
                  {EFFORT.map(e => (
                    <button key={e.value} onClick={() => updateStory(story.id, 'effort', e.value)}
                      className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${story.effort === e.value
                        ? 'bg-indigo-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                      title={e.desc}>
                      {e.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">Uncertainty</label>
                <div className="flex flex-wrap gap-1.5">
                  {UNCERTAINTY.map(u => (
                    <button key={u.value} onClick={() => updateStory(story.id, 'uncertainty', u.value)}
                      className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${story.uncertainty === u.value
                        ? 'bg-amber-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                      title={u.desc}>
                      {u.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
