import { useState, useEffect, useMemo, useCallback } from 'react'
import { getItem, setItem } from '../../utils/storage'
import { Copy, Check, Trash2, Pin, PinOff, Plus, Search, AlertTriangle, X } from 'lucide-react'

const STORAGE_KEY = 'untrackt_clipboard_manager'

function wordCount(text) {
  return text.trim() ? text.trim().split(/\s+/).length : 0
}

function CopyBtn({ text }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }
  return (
    <button onClick={copy} title="Copy to clipboard" className="text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
      {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
    </button>
  )
}

export default function ClipboardManager() {
  const [clips, setClips] = useState(() => getItem(STORAGE_KEY, []))
  const [input, setInput] = useState('')
  const [label, setLabel] = useState('')
  const [search, setSearch] = useState('')
  const [dupWarning, setDupWarning] = useState('')

  useEffect(() => { setItem(STORAGE_KEY, clips) }, [clips])

  const addClip = useCallback(() => {
    const content = input.trim()
    if (!content) return

    // Duplicate detection
    const existing = clips.find((c) => c.content === content)
    if (existing) {
      setDupWarning(`Duplicate detected — this content already exists${existing.label ? ` as "${existing.label}"` : ''}.`)
      return
    }

    const clip = {
      id: Date.now(),
      content,
      label: label.trim(),
      pinned: false,
      createdAt: new Date().toISOString(),
    }
    setClips((prev) => [clip, ...prev])
    setInput('')
    setLabel('')
    setDupWarning('')
  }, [input, label, clips])

  const removeClip = (id) => {
    setClips((prev) => prev.filter((c) => c.id !== id))
  }

  const togglePin = (id) => {
    setClips((prev) => prev.map((c) => (c.id === id ? { ...c, pinned: !c.pinned } : c)))
  }

  const clearAll = () => {
    setClips([])
    setSearch('')
    setDupWarning('')
  }

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText()
      if (text) setInput(text)
    } catch {
      // clipboard read not available
    }
  }

  // Clear dup warning when input changes
  useEffect(() => { setDupWarning('') }, [input])

  // Filtered + sorted: pinned first, then by creation date
  const displayed = useMemo(() => {
    let list = clips
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(
        (c) => c.content.toLowerCase().includes(q) || (c.label && c.label.toLowerCase().includes(q))
      )
    }
    return [...list].sort((a, b) => {
      if (a.pinned !== b.pinned) return a.pinned ? -1 : 1
      return b.id - a.id
    })
  }, [clips, search])

  const pinnedCount = clips.filter((c) => c.pinned).length

  return (
    <div className="space-y-5">
      {/* Input area */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 space-y-3">
        <div>
          <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Label (optional)</label>
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="e.g. API key, meeting link…"
            className="input-field text-sm"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400">Content</label>
            <button onClick={handlePaste} className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline">
              Paste from clipboard
            </button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) addClip() }}
            placeholder="Paste or type text to save as a clip…"
            className="textarea-field text-sm min-h-[90px]"
            rows={3}
          />
          {input.trim() && (
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
              {input.length} char{input.length !== 1 ? 's' : ''} · {wordCount(input)} word{wordCount(input) !== 1 ? 's' : ''}
            </p>
          )}
        </div>

        {/* Duplicate warning */}
        {dupWarning && (
          <div className="flex items-start gap-2 rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 px-3 py-2 text-xs text-amber-700 dark:text-amber-300">
            <AlertTriangle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
            <span className="flex-1">{dupWarning}</span>
            <button onClick={() => setDupWarning('')} className="text-amber-400 hover:text-amber-600 dark:hover:text-amber-300">
              <X className="w-3 h-3" />
            </button>
          </div>
        )}

        <button
          onClick={addClip}
          disabled={!input.trim()}
          className="btn-primary w-full flex items-center justify-center gap-2 text-sm"
        >
          <Plus className="w-4 h-4" /> Save Clip
        </button>
      </div>

      {/* Search + actions */}
      {clips.length > 0 && (
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search clips…"
              className="input-field text-sm pl-9"
            />
          </div>
          <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
            <span>{clips.length} clip{clips.length !== 1 ? 's' : ''}{pinnedCount > 0 ? ` · ${pinnedCount} pinned` : ''}</span>
            <button onClick={clearAll} className="text-rose-500 hover:text-rose-600 dark:text-rose-400 dark:hover:text-rose-300 hover:underline">
              Clear all
            </button>
          </div>
        </div>
      )}

      {/* Clips list */}
      {clips.length === 0 ? (
        <div className="text-center py-10 text-sm text-gray-400 dark:text-gray-500">
          No clips saved yet. Paste or type text above to get started.
        </div>
      ) : displayed.length === 0 ? (
        <div className="text-center py-8 text-sm text-gray-400 dark:text-gray-500">
          No clips match your search.
        </div>
      ) : (
        <div className="space-y-2">
          {displayed.map((clip) => (
            <div
              key={clip.id}
              className={`rounded-xl border bg-white dark:bg-gray-800 p-4 transition-colors ${
                clip.pinned
                  ? 'border-indigo-200 dark:border-indigo-800 bg-indigo-50/30 dark:bg-indigo-950/10'
                  : 'border-gray-200 dark:border-gray-700'
              }`}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-1.5">
                <div className="min-w-0 flex-1">
                  {clip.label && (
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">{clip.label}</p>
                  )}
                  <p className="text-[10px] text-gray-400 dark:text-gray-500">
                    {new Date(clip.createdAt).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    {' · '}{clip.content.length} char{clip.content.length !== 1 ? 's' : ''}
                    {' · '}{wordCount(clip.content)} word{wordCount(clip.content) !== 1 ? 's' : ''}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <CopyBtn text={clip.content} />
                  <button
                    onClick={() => togglePin(clip.id)}
                    title={clip.pinned ? 'Unpin' : 'Pin to top'}
                    className={`transition-colors ${
                      clip.pinned
                        ? 'text-indigo-500 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300'
                        : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                    }`}
                  >
                    {clip.pinned ? <PinOff className="w-4 h-4" /> : <Pin className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => removeClip(clip.id)}
                    title="Delete"
                    className="text-gray-300 hover:text-rose-500 dark:text-gray-600 dark:hover:text-rose-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <pre className="text-sm text-gray-700 dark:text-gray-200 whitespace-pre-wrap break-words font-sans leading-relaxed max-h-40 overflow-y-auto">
                {clip.content}
              </pre>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
