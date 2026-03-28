import { useState, useEffect } from 'react'
import { Plus, Trash2, Copy, Check, RotateCcw } from 'lucide-react'
import { getItem, setItem } from '../../utils/storage'

const STORAGE_KEY = 'untrackt_working_agreement'

const CATEGORIES = [
  { key: 'communication', label: 'Communication', emoji: '💬' },
  { key: 'meetings', label: 'Meetings', emoji: '📅' },
  { key: 'code', label: 'Code & Quality', emoji: '💻' },
  { key: 'collaboration', label: 'Collaboration', emoji: '🤝' },
  { key: 'worklife', label: 'Work-Life Balance', emoji: '⚖️' },
  { key: 'other', label: 'Other', emoji: '📌' },
]

const DEFAULT_RULES = [
  { id: 1, category: 'communication', text: 'Respond to messages within 4 hours during work hours', agreed: true },
  { id: 2, category: 'meetings', text: 'Cameras on for standups and retros', agreed: true },
  { id: 3, category: 'meetings', text: 'Start meetings on time, end 5 minutes early', agreed: true },
  { id: 4, category: 'code', text: 'All PRs need at least one approval before merge', agreed: true },
  { id: 5, category: 'code', text: 'Write tests for new features', agreed: true },
  { id: 6, category: 'collaboration', text: 'Ask for help if stuck for more than 30 minutes', agreed: true },
  { id: 7, category: 'worklife', text: 'No Slack/Teams messages after 6 PM', agreed: false },
]

export default function WorkingAgreementBuilder() {
  const [rules, setRules] = useState(() => getItem(STORAGE_KEY, DEFAULT_RULES))
  const [newRule, setNewRule] = useState('')
  const [newCategory, setNewCategory] = useState('communication')
  const [copied, setCopied] = useState(false)

  useEffect(() => { setItem(STORAGE_KEY, rules) }, [rules])

  const addRule = () => {
    if (!newRule.trim()) return
    setRules(prev => [...prev, { id: Date.now(), category: newCategory, text: newRule.trim(), agreed: false }])
    setNewRule('')
  }

  const removeRule = (id) => setRules(prev => prev.filter(r => r.id !== id))
  const toggleAgreed = (id) => setRules(prev => prev.map(r => r.id === id ? { ...r, agreed: !r.agreed } : r))
  const updateRule = (id, text) => setRules(prev => prev.map(r => r.id === id ? { ...r, text } : r))
  const resetAll = () => setRules(DEFAULT_RULES)

  const agreedCount = rules.filter(r => r.agreed).length

  const copyAgreement = () => {
    let text = `Team Working Agreement\n${'='.repeat(30)}\n\n`
    CATEGORIES.forEach(cat => {
      const catRules = rules.filter(r => r.category === cat.key)
      if (catRules.length === 0) return
      text += `${cat.emoji} ${cat.label}\n`
      catRules.forEach(r => {
        text += `  ${r.agreed ? '✅' : '⬜'} ${r.text}\n`
      })
      text += '\n'
    })
    text += `\nAgreed: ${agreedCount}/${rules.length}`
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {agreedCount}/{rules.length} rules agreed upon
        </div>
        <div className="flex items-center gap-2">
          <button onClick={copyAgreement} className="px-2.5 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-xs text-gray-600 dark:text-gray-400 hover:bg-gray-50 flex items-center gap-1">
            {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />} {copied ? 'Copied' : 'Copy'}
          </button>
          <button onClick={resetAll} className="px-2.5 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-xs text-gray-600 dark:text-gray-400 hover:bg-gray-50 flex items-center gap-1">
            <RotateCcw className="w-3 h-3" /> Defaults
          </button>
        </div>
      </div>

      {CATEGORIES.map(cat => {
        const catRules = rules.filter(r => r.category === cat.key)
        if (catRules.length === 0) return null
        return (
          <div key={cat.key}>
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-1.5">
              <span>{cat.emoji}</span> {cat.label}
            </h3>
            <div className="space-y-1.5">
              {catRules.map(rule => (
                <div key={rule.id} className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 border transition-colors ${
                  rule.agreed
                    ? 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800'
                    : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700'
                }`}>
                  <button onClick={() => toggleAgreed(rule.id)}
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                      rule.agreed
                        ? 'bg-green-500 border-green-500 text-white'
                        : 'border-gray-300 dark:border-gray-600 hover:border-green-400'
                    }`}>
                    {rule.agreed && <Check className="w-3 h-3" />}
                  </button>
                  <input type="text" value={rule.text} onChange={e => updateRule(rule.id, e.target.value)}
                    className={`flex-1 bg-transparent text-sm outline-none ${rule.agreed ? 'text-gray-700 dark:text-gray-300' : 'text-gray-600 dark:text-gray-400'}`} />
                  <button onClick={() => removeRule(rule.id)} className="text-gray-300 hover:text-red-500 shrink-0">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )
      })}

      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-4 space-y-3">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Add New Rule</h4>
        <div className="flex flex-wrap gap-2">
          <select value={newCategory} onChange={e => setNewCategory(e.target.value)}
            className="input-field text-sm w-40">
            {CATEGORIES.map(c => <option key={c.key} value={c.key}>{c.emoji} {c.label}</option>)}
          </select>
          <input type="text" value={newRule} onChange={e => setNewRule(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addRule()}
            className="input-field text-sm flex-1 min-w-[200px]" placeholder="Type a new team agreement..." />
          <button onClick={addRule} className="btn-primary flex items-center gap-1.5">
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>
      </div>
    </div>
  )
}
