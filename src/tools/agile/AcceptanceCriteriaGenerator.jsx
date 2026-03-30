import { useState, useEffect } from 'react'
import { Plus, Trash2, Copy, Check } from 'lucide-react'
import { getItem, setItem } from '../../utils/storage'

const STORAGE_KEY = 'untrackt_acceptance_criteria'

function emptyCriteria() {
  return { id: Date.now(), given: '', when: '', then: '' }
}

export default function AcceptanceCriteriaGenerator() {
  const [storyTitle, setStoryTitle] = useState(() => getItem(STORAGE_KEY + '_title', ''))
  const [criteria, setCriteria] = useState(() => getItem(STORAGE_KEY + '_criteria', [emptyCriteria()]))
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    setItem(STORAGE_KEY + '_title', storyTitle)
    setItem(STORAGE_KEY + '_criteria', criteria)
  }, [storyTitle, criteria])

  const addCriteria = () => setCriteria(prev => [...prev, { ...emptyCriteria(), id: Date.now() + Math.random() }])
  const removeCriteria = (id) => setCriteria(prev => prev.filter(c => c.id !== id))
  const updateCriteria = (id, key, val) => setCriteria(prev => prev.map(c => c.id === id ? { ...c, [key]: val } : c))

  const formatOutput = () => {
    let text = storyTitle ? `Story: ${storyTitle}\n\n` : ''
    criteria.forEach((c, i) => {
      text += `Scenario ${i + 1}:\n`
      text += `  Given ${c.given || '___'}\n`
      text += `  When ${c.when || '___'}\n`
      text += `  Then ${c.then || '___'}\n\n`
    })
    return text.trim()
  }

  const copyAll = () => {
    navigator.clipboard.writeText(formatOutput()).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const clearAll = () => {
    setStoryTitle('')
    setCriteria([emptyCriteria()])
  }

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">User Story (optional)</label>
        <input type="text" value={storyTitle} onChange={e => setStoryTitle(e.target.value)}
          className="input-field text-sm" placeholder="As a user, I want to..." />
      </div>

      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Acceptance Criteria <span className="text-xs text-gray-400 font-normal">({criteria.length})</span>
        </h3>
        <div className="flex items-center gap-2">
          <button onClick={copyAll} className="text-xs text-indigo-600 dark:text-indigo-400 flex items-center gap-1 hover:underline">
            {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />} {copied ? 'Copied' : 'Copy All'}
          </button>
          <button onClick={clearAll} className="text-xs text-gray-500 hover:underline">Clear</button>
        </div>
      </div>

      <div className="space-y-3">
        {criteria.map((c, idx) => (
          <div key={c.id} className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400">Scenario {idx + 1}</span>
              {criteria.length > 1 && (
                <button onClick={() => removeCriteria(c.id)} className="text-gray-300 hover:text-red-500">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            <div>
              <label className="block text-xs font-medium text-green-600 dark:text-green-400 mb-1">Given</label>
              <textarea value={c.given} onChange={e => updateCriteria(c.id, 'given', e.target.value)}
                className="textarea-field text-sm min-h-[40px]" placeholder="a precondition or context..." />
            </div>
            <div>
              <label className="block text-xs font-medium text-blue-600 dark:text-blue-400 mb-1">When</label>
              <textarea value={c.when} onChange={e => updateCriteria(c.id, 'when', e.target.value)}
                className="textarea-field text-sm min-h-[40px]" placeholder="an action or event occurs..." />
            </div>
            <div>
              <label className="block text-xs font-medium text-purple-600 dark:text-purple-400 mb-1">Then</label>
              <textarea value={c.then} onChange={e => updateCriteria(c.id, 'then', e.target.value)}
                className="textarea-field text-sm min-h-[40px]" placeholder="the expected outcome..." />
            </div>
          </div>
        ))}
      </div>

      <button onClick={addCriteria} className="w-full py-2 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 text-sm text-gray-400 hover:border-indigo-300 hover:text-indigo-500 transition-colors flex items-center justify-center gap-1">
        <Plus className="w-4 h-4" /> Add Scenario
      </button>

      {criteria.some(c => c.given || c.when || c.then) && (
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-4">
          <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">Preview</h4>
          <pre className="text-xs text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-mono">{formatOutput()}</pre>
        </div>
      )}
    </div>
  )
}
