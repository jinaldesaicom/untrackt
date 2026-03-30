import { useState, useEffect } from 'react'
import { Plus, Trash2, RotateCcw, Copy, Check, ThumbsUp } from 'lucide-react'
import { getItem, setItem } from '../../utils/storage'

const STORAGE_KEY = 'untrackt_retrospective'

const FORMATS = [
  { id: 'glad-sad-mad', name: 'Glad / Sad / Mad', columns: [
    { key: 'glad', label: 'Glad 😊', color: 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800' },
    { key: 'sad', label: 'Sad 😢', color: 'bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800' },
    { key: 'mad', label: 'Mad 😡', color: 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800' },
  ]},
  { id: 'start-stop-continue', name: 'Start / Stop / Continue', columns: [
    { key: 'start', label: 'Start ▶', color: 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800' },
    { key: 'stop', label: 'Stop ⏹', color: 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800' },
    { key: 'continue', label: 'Continue ⏩', color: 'bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800' },
  ]},
  { id: 'went-well-improve-actions', name: 'Went Well / Improve / Actions', columns: [
    { key: 'well', label: 'Went Well ✅', color: 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800' },
    { key: 'improve', label: 'To Improve 🔧', color: 'bg-amber-50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-800' },
    { key: 'actions', label: 'Action Items 🎯', color: 'bg-indigo-50 dark:bg-indigo-900/10 border-indigo-200 dark:border-indigo-800' },
  ]},
  { id: '4ls', name: '4Ls', columns: [
    { key: 'liked', label: 'Liked 👍', color: 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800' },
    { key: 'learned', label: 'Learned 📚', color: 'bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800' },
    { key: 'lacked', label: 'Lacked 😕', color: 'bg-amber-50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-800' },
    { key: 'longedFor', label: 'Longed For 🌟', color: 'bg-purple-50 dark:bg-purple-900/10 border-purple-200 dark:border-purple-800' },
  ]},
]

function emptyItem() {
  return { id: Date.now() + Math.random(), text: '', votes: 0 }
}

export default function RetrospectiveBoard() {
  const [formatId, setFormatId] = useState(() => getItem(STORAGE_KEY + '_format', 'went-well-improve-actions'))
  const [board, setBoard] = useState(() => getItem(STORAGE_KEY + '_board', {}))
  const [copied, setCopied] = useState(false)

  const format = FORMATS.find(f => f.id === formatId) || FORMATS[0]

  useEffect(() => {
    setItem(STORAGE_KEY + '_format', formatId)
    setItem(STORAGE_KEY + '_board', board)
  }, [formatId, board])

  const getItems = (colKey) => board[colKey] || []

  const addItem = (colKey) => {
    setBoard(prev => ({ ...prev, [colKey]: [...(prev[colKey] || []), emptyItem()] }))
  }

  const updateItem = (colKey, itemId, text) => {
    setBoard(prev => ({
      ...prev,
      [colKey]: (prev[colKey] || []).map(i => i.id === itemId ? { ...i, text } : i)
    }))
  }

  const removeItem = (colKey, itemId) => {
    setBoard(prev => ({
      ...prev,
      [colKey]: (prev[colKey] || []).filter(i => i.id !== itemId)
    }))
  }

  const voteItem = (colKey, itemId) => {
    setBoard(prev => ({
      ...prev,
      [colKey]: (prev[colKey] || []).map(i => i.id === itemId ? { ...i, votes: i.votes + 1 } : i)
    }))
  }

  const clearBoard = () => setBoard({})

  const changeFormat = (newId) => {
    setFormatId(newId)
    setBoard({})
  }

  const totalItems = format.columns.reduce((s, c) => s + getItems(c.key).length, 0)

  const copyBoard = () => {
    let text = `Retrospective (${format.name})\n${'='.repeat(30)}\n\n`
    format.columns.forEach(col => {
      text += `${col.label}\n`
      const items = getItems(col.key)
      if (items.length === 0) text += '  (none)\n'
      items.sort((a, b) => b.votes - a.votes).forEach(i => {
        text += `  • ${i.text || '(empty)'}${i.votes > 0 ? ` [${i.votes} votes]` : ''}\n`
      })
      text += '\n'
    })
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <select value={formatId} onChange={e => changeFormat(e.target.value)}
            className="input-field text-sm">
            {FORMATS.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
          </select>
          <span className="text-xs text-gray-400">{totalItems} items</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={copyBoard} className="px-2.5 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-xs text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center gap-1">
            {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />} {copied ? 'Copied' : 'Copy'}
          </button>
          <button onClick={clearBoard} className="px-2.5 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-xs text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center gap-1">
            <RotateCcw className="w-3 h-3" /> Clear
          </button>
        </div>
      </div>

      <div className={`grid gap-3 ${format.columns.length === 4 ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' : 'grid-cols-1 sm:grid-cols-3'}`}>
        {format.columns.map(col => (
          <div key={col.key} className={`rounded-xl border p-3 ${col.color}`}>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">{col.label}</h3>
              <span className="text-[10px] text-gray-400">{getItems(col.key).length}</span>
            </div>

            <div className="space-y-1.5 min-h-[60px]">
              {getItems(col.key).sort((a, b) => b.votes - a.votes).map(item => (
                <div key={item.id} className="flex items-start gap-1.5 bg-white dark:bg-gray-900 rounded-lg px-2.5 py-2 border border-gray-200 dark:border-gray-700">
                  <textarea value={item.text} onChange={e => updateItem(col.key, item.id, e.target.value)}
                    className="flex-1 min-w-0 bg-transparent text-xs text-gray-800 dark:text-gray-200 outline-none resize-none min-h-[24px]" placeholder="Type here..." rows={1} />
                  <div className="flex flex-col items-center gap-0.5 shrink-0">
                    <button onClick={() => voteItem(col.key, item.id)} className="text-gray-300 hover:text-indigo-500" title="Vote">
                      <ThumbsUp className="w-3 h-3" />
                    </button>
                    {item.votes > 0 && <span className="text-[9px] font-bold text-indigo-500">{item.votes}</span>}
                    <button onClick={() => removeItem(col.key, item.id)} className="text-gray-300 hover:text-red-500">
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button onClick={() => addItem(col.key)}
              className="w-full mt-2 py-1.5 rounded-lg border border-dashed border-gray-300 dark:border-gray-600 text-xs text-gray-400 hover:text-indigo-500 hover:border-indigo-300 transition-colors flex items-center justify-center gap-1">
              <Plus className="w-3 h-3" /> Add
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
