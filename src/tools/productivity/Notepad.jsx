import { useState, useEffect, useMemo } from 'react'
import { Plus, X, FileText, Eye, Edit3 } from 'lucide-react'
import { getItem, setItem } from '../../utils/storage'

const STORAGE_KEY = 'untrackt_notepad'
const MAX_TABS = 5

function makeTab(idx) {
  return { id: Date.now() + idx, title: `Note ${idx + 1}`, content: '', updatedAt: new Date().toISOString() }
}

export default function Notepad() {
  const [tabs, setTabs] = useState(() => {
    const saved = getItem(STORAGE_KEY, null)
    return saved && saved.length ? saved : [makeTab(0)]
  })
  const [activeTab, setActiveTab] = useState(0)
  const [previewMode, setPreviewMode] = useState(false)

  useEffect(() => { setItem(STORAGE_KEY, tabs) }, [tabs])

  const current = tabs[activeTab] || tabs[0]

  const updateContent = (content) => {
    setTabs(prev => prev.map((t, i) => i === activeTab ? { ...t, content, updatedAt: new Date().toISOString() } : t))
  }

  const updateTitle = (title) => {
    setTabs(prev => prev.map((t, i) => i === activeTab ? { ...t, title } : t))
  }

  const addTab = () => {
    if (tabs.length >= MAX_TABS) return
    setTabs(prev => [...prev, makeTab(prev.length)])
    setActiveTab(tabs.length)
    setPreviewMode(false)
  }

  const closeTab = (idx) => {
    if (tabs.length <= 1) return
    setTabs(prev => prev.filter((_, i) => i !== idx))
    if (activeTab >= idx && activeTab > 0) setActiveTab(activeTab - 1)
  }

  const wordCount = current.content.split(/\s+/).filter(Boolean).length
  const charCount = current.content.length

  const previewHtml = useMemo(() => {
    if (!previewMode) return ''
    let html = current.content
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/^### (.+)$/gm, '<h3 class="text-lg font-semibold mt-3 mb-1">$1</h3>')
      .replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold mt-4 mb-1">$1</h2>')
      .replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold mt-4 mb-2">$1</h1>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/`(.+?)`/g, '<code class="bg-gray-100 dark:bg-gray-800 px-1 rounded text-sm">$1</code>')
      .replace(/^- (.+)$/gm, '<li class="ml-4 list-disc">$1</li>')
      .replace(/\n/g, '<br/>')
    return html
  }, [previewMode, current.content])

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-1 overflow-x-auto pb-1">
        {tabs.map((tab, idx) => (
          <button key={tab.id} onClick={() => { setActiveTab(idx); setPreviewMode(false) }}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-t-lg border border-b-0 whitespace-nowrap ${activeTab === idx ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-gray-200 dark:border-gray-700' : 'bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-transparent hover:border-gray-200 dark:hover:border-gray-700'}`}>
            <FileText className="w-3 h-3" />
            {tab.title}
            {tabs.length > 1 && (
              <span onClick={e => { e.stopPropagation(); closeTab(idx) }} className="ml-1 hover:text-red-500">
                <X className="w-3 h-3" />
              </span>
            )}
          </button>
        ))}
        {tabs.length < MAX_TABS && (
          <button onClick={addTab} className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"><Plus className="w-4 h-4" /></button>
        )}
      </div>

      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100 dark:border-gray-800">
          <input type="text" value={current.title} onChange={e => updateTitle(e.target.value)} className="bg-transparent text-sm font-medium text-gray-900 dark:text-white outline-none" />
          <div className="flex items-center gap-2">
            <button onClick={() => setPreviewMode(false)} className={`p-1 rounded ${!previewMode ? 'text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}><Edit3 className="w-4 h-4" /></button>
            <button onClick={() => setPreviewMode(true)} className={`p-1 rounded ${previewMode ? 'text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}><Eye className="w-4 h-4" /></button>
          </div>
        </div>

        {previewMode ? (
          <div className="p-4 min-h-[300px] prose prose-sm dark:prose-invert max-w-none text-sm text-gray-700 dark:text-gray-300" dangerouslySetInnerHTML={{ __html: previewHtml }} />
        ) : (
          <textarea value={current.content} onChange={e => updateContent(e.target.value)}
            className="w-full min-h-[300px] p-4 bg-transparent text-sm text-gray-800 dark:text-gray-200 outline-none resize-y font-mono" placeholder="Start typing your note… (supports **bold**, *italic*, # headings, - lists)" />
        )}

        <div className="flex items-center justify-between px-3 py-1.5 border-t border-gray-100 dark:border-gray-800 text-[10px] text-gray-400">
          <span>{wordCount} words · {charCount} chars</span>
          <span>Auto-saved</span>
        </div>
      </div>
    </div>
  )
}
