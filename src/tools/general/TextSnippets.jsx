import { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import { getItem, setItem } from '../../utils/storage'
import {
  Plus, Trash2, Copy, Check, Search, Pencil, X, Download, Upload,
  ChevronDown, ChevronRight, CopyPlus, AlertTriangle,
} from 'lucide-react'

const STORAGE_KEY = 'untrackt_text_snippets'
const MAX_SNIPPETS = 200

const DEFAULT_CATEGORIES = ['General', 'Email', 'Code', 'Address', 'Signature']

function resolveContent(text) {
  const now = new Date()
  return text
    .replace(/\{\{date\}\}/gi, now.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }))
    .replace(/\{\{time\}\}/gi, now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }))
    .replace(/\{\{cursor\}\}/gi, '')
}

function hasCursor(text) {
  return /\{\{cursor\}\}/i.test(text)
}

function highlightPlaceholders(text) {
  return text
    .replace(/\{\{date\}\}/gi, '⟨date⟩')
    .replace(/\{\{time\}\}/gi, '⟨time⟩')
    .replace(/\{\{cursor\}\}/gi, '⟨cursor⟩')
}

function wordCount(t) { return t.trim() ? t.trim().split(/\s+/).length : 0 }

function CopyBtn({ text, onUse }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    const resolved = resolveContent(text)
    navigator.clipboard.writeText(resolved).then(() => {
      setCopied(true)
      if (onUse) onUse()
      setTimeout(() => setCopied(false), 1500)
    })
  }
  return (
    <button onClick={copy} title="Copy expanded text" className="text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
      {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
    </button>
  )
}

// ── Snippet form (create + edit) ────────────────────────────────

function SnippetForm({ initial, categories, onSave, onCancel, isEdit }) {
  const [shortcode, setShortcode] = useState(initial?.shortcode || '')
  const [content, setContent] = useState(initial?.content || '')
  const [category, setCategory] = useState(initial?.category || 'General')
  const [newCat, setNewCat] = useState('')
  const [trigger, setTrigger] = useState(initial?.trigger || 'manual')
  const [error, setError] = useState('')

  const save = () => {
    const sc = shortcode.trim()
    const ct = content.trim()
    if (!sc) return setError('Shortcode is required.')
    if (/\s/.test(sc)) return setError('Shortcode cannot contain spaces.')
    if (!ct) return setError('Content is required.')
    const cat = newCat.trim() || category
    onSave({ shortcode: sc, content: ct, category: cat, trigger })
    setError('')
  }

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 space-y-3">
      <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
        {isEdit ? 'Edit Snippet' : 'New Snippet'}
      </h3>

      {error && (
        <div className="flex items-center gap-2 text-xs text-rose-600 dark:text-rose-400">
          <AlertTriangle className="w-3.5 h-3.5" /> {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
            Shortcode
          </label>
          <input
            type="text"
            value={shortcode}
            onChange={(e) => setShortcode(e.target.value.replace(/\s/g, ''))}
            placeholder="e.g. addr, sig1, thx"
            className="input-field text-sm font-mono"
            maxLength={40}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
            Trigger
          </label>
          <div className="flex gap-2">
            {[
              { key: 'manual', label: 'Manual' },
              { key: 'prefix', label: '; Prefix' },
            ].map((t) => (
              <button
                key={t.key}
                onClick={() => setTrigger(t.key)}
                className={`flex-1 text-xs font-medium py-2 rounded-lg border transition-all ${
                  trigger === t.key
                    ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border-indigo-300 dark:border-indigo-700'
                    : 'bg-gray-50 dark:bg-gray-700 text-gray-400 dark:text-gray-500 border-gray-200 dark:border-gray-600'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="input-field text-sm"
          >
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
            Or new category
          </label>
          <input
            type="text"
            value={newCat}
            onChange={(e) => setNewCat(e.target.value)}
            placeholder="Custom category…"
            className="input-field text-sm"
            maxLength={30}
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="block text-xs font-medium text-gray-500 dark:text-gray-400">
            Content
          </label>
          <span className="text-[10px] text-gray-400 dark:text-gray-500">
            Use {'{{date}}'} {'{{time}}'} {'{{cursor}}'} as placeholders
          </span>
        </div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={'e.g. 123 Main St, Springfield, IL 62704\nor a multi-line email template…'}
          className="textarea-field text-sm min-h-[100px] font-mono"
          rows={4}
        />
        {content.trim() && (
          <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1">
            {content.length} chars · {wordCount(content)} words
            {hasCursor(content) && ' · has {{cursor}} marker'}
          </p>
        )}
      </div>

      <div className="flex gap-2">
        <button onClick={save} className="btn-primary text-xs flex items-center gap-1.5">
          <Check className="w-3.5 h-3.5" /> {isEdit ? 'Save Changes' : 'Add Snippet'}
        </button>
        {onCancel && (
          <button onClick={onCancel} className="btn-secondary text-xs">Cancel</button>
        )}
      </div>
    </div>
  )
}

// ── Expander overlay ────────────────────────────────────────────

function ExpanderOverlay({ snippets, onClose, onUse }) {
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)

  useEffect(() => { inputRef.current?.focus() }, [])

  const filtered = useMemo(() => {
    if (!query.trim()) return snippets.filter((s) => s.trigger === 'prefix').slice(0, 20)
    const q = query.toLowerCase().replace(/^;/, '')
    return snippets.filter(
      (s) => s.shortcode.toLowerCase().includes(q) || s.content.toLowerCase().includes(q)
    ).slice(0, 20)
  }, [query, snippets])

  const expand = (snippet) => {
    const resolved = resolveContent(snippet.content)
    navigator.clipboard.writeText(resolved).then(() => {
      onUse(snippet.id)
      onClose()
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] bg-black/30 dark:bg-black/50" onClick={onClose}>
      <div
        className="w-full max-w-lg mx-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100 dark:border-gray-700">
          <span className="text-sm font-mono text-indigo-500 dark:text-indigo-400">;</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') onClose()
              if (e.key === 'Enter' && filtered.length > 0) expand(filtered[0])
            }}
            placeholder="Type shortcode to expand…"
            className="flex-1 bg-transparent text-sm text-gray-900 dark:text-gray-100 outline-none font-mono"
            autoComplete="off"
          />
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="max-h-64 overflow-y-auto divide-y divide-gray-100 dark:divide-gray-700">
          {filtered.length === 0 && (
            <div className="px-4 py-6 text-center text-sm text-gray-400 dark:text-gray-500">No matching snippets</div>
          )}
          {filtered.map((s) => (
            <button
              key={s.id}
              onClick={() => expand(s)}
              className="w-full text-left px-4 py-2.5 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">;{s.shortcode}</span>
                <span className="text-[10px] text-gray-400 dark:text-gray-500">{s.category}</span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-300 truncate mt-0.5">{highlightPlaceholders(s.content)}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Main component ──────────────────────────────────────────────

export default function TextSnippets() {
  const [snippets, setSnippets] = useState(() => getItem(STORAGE_KEY, []))
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState(null)
  const [search, setSearch] = useState('')
  const [expandedCats, setExpandedCats] = useState({})
  const [showExpander, setShowExpander] = useState(false)
  const [showImport, setShowImport] = useState(false)
  const [importJson, setImportJson] = useState('')
  const [importError, setImportError] = useState('')

  useEffect(() => { setItem(STORAGE_KEY, snippets) }, [snippets])

  // Keyboard shortcut: Ctrl+; to open expander
  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === ';') {
        e.preventDefault()
        setShowExpander((v) => !v)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const allCategories = useMemo(() => {
    const cats = new Set(DEFAULT_CATEGORIES)
    snippets.forEach((s) => cats.add(s.category))
    return [...cats].sort()
  }, [snippets])

  const addSnippet = useCallback((data) => {
    if (snippets.length >= MAX_SNIPPETS) return
    const snippet = {
      id: Date.now(),
      ...data,
      usageCount: 0,
      lastUsed: null,
      createdAt: new Date().toISOString(),
    }
    setSnippets((prev) => [snippet, ...prev])
    setShowForm(false)
  }, [snippets])

  const updateSnippet = useCallback((data) => {
    setSnippets((prev) => prev.map((s) => (s.id === editId ? { ...s, ...data } : s)))
    setEditId(null)
  }, [editId])

  const deleteSnippet = (id) => {
    setSnippets((prev) => prev.filter((s) => s.id !== id))
    if (editId === id) setEditId(null)
  }

  const cloneSnippet = (snippet) => {
    if (snippets.length >= MAX_SNIPPETS) return
    const clone = {
      ...snippet,
      id: Date.now(),
      shortcode: snippet.shortcode + '_copy',
      usageCount: 0,
      lastUsed: null,
      createdAt: new Date().toISOString(),
    }
    setSnippets((prev) => [clone, ...prev])
  }

  const recordUse = (id) => {
    setSnippets((prev) =>
      prev.map((s) => (s.id === id ? { ...s, usageCount: (s.usageCount || 0) + 1, lastUsed: new Date().toISOString() } : s))
    )
  }

  const clearAll = () => {
    setSnippets([])
    setSearch('')
    setEditId(null)
  }

  const toggleCat = (cat) => {
    setExpandedCats((prev) => ({ ...prev, [cat]: !prev[cat] }))
  }

  // Export
  const handleExport = () => {
    const json = JSON.stringify(snippets, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `text-snippets-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  // Import
  const handleImport = () => {
    setImportError('')
    try {
      const data = JSON.parse(importJson)
      if (!Array.isArray(data)) throw new Error('JSON must be an array of snippets.')
      const valid = data.filter((d) => d.shortcode && d.content).slice(0, MAX_SNIPPETS - snippets.length)
      if (valid.length === 0) throw new Error('No valid snippets found in the JSON.')
      const imported = valid.map((d) => ({
        id: Date.now() + Math.random(),
        shortcode: String(d.shortcode).trim(),
        content: String(d.content),
        category: String(d.category || 'General'),
        trigger: d.trigger === 'prefix' ? 'prefix' : 'manual',
        usageCount: 0,
        lastUsed: null,
        createdAt: new Date().toISOString(),
      }))
      setSnippets((prev) => [...imported, ...prev])
      setImportJson('')
      setShowImport(false)
    } catch (err) {
      setImportError(err.message)
    }
  }

  // Filtered + grouped
  const filtered = useMemo(() => {
    let list = snippets
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(
        (s) =>
          s.shortcode.toLowerCase().includes(q) ||
          s.content.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q)
      )
    }
    return list
  }, [snippets, search])

  // Recently used (top 5)
  const recentlyUsed = useMemo(() => {
    return [...filtered].filter((s) => s.lastUsed).sort((a, b) => b.lastUsed.localeCompare(a.lastUsed)).slice(0, 5)
  }, [filtered])

  // Group by category
  const grouped = useMemo(() => {
    const groups = {}
    filtered.forEach((s) => {
      if (!groups[s.category]) groups[s.category] = []
      groups[s.category].push(s)
    })
    return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b))
  }, [filtered])

  const editSnippet = editId ? snippets.find((s) => s.id === editId) : null

  return (
    <div className="space-y-5">
      {/* Privacy notice */}
      <div className="rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 px-4 py-3 text-sm text-blue-700 dark:text-blue-300">
        All snippets saved in your browser only. Never transmitted anywhere.
      </div>

      {/* Top actions */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => { setShowForm(!showForm); setEditId(null) }}
          disabled={snippets.length >= MAX_SNIPPETS}
          className="btn-primary text-xs flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" /> New Snippet
        </button>
        <button
          onClick={() => setShowExpander(true)}
          className="btn-secondary text-xs flex items-center gap-1.5"
          title="Ctrl+; to toggle"
        >
          <Search className="w-3.5 h-3.5" /> Quick Expand
          <kbd className="hidden sm:inline-block text-[9px] px-1 py-0.5 rounded bg-gray-200 dark:bg-gray-600 text-gray-500 dark:text-gray-300 ml-1">Ctrl+;</kbd>
        </button>
        <div className="ml-auto flex items-center gap-2">
          <button onClick={handleExport} disabled={snippets.length === 0} className="btn-secondary text-xs flex items-center gap-1.5">
            <Download className="w-3.5 h-3.5" /> Export
          </button>
          <button onClick={() => setShowImport(!showImport)} className="btn-secondary text-xs flex items-center gap-1.5">
            <Upload className="w-3.5 h-3.5" /> Import
          </button>
        </div>
      </div>

      {/* Snippet count */}
      {snippets.length > 0 && (
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>{snippets.length} / {MAX_SNIPPETS} snippets</span>
          <button onClick={clearAll} className="text-rose-500 hover:text-rose-600 dark:text-rose-400 dark:hover:text-rose-300 hover:underline">
            Clear all
          </button>
        </div>
      )}

      {/* Import panel */}
      {showImport && (
        <div className="rounded-xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950/30 p-4 space-y-3">
          <p className="text-sm font-medium text-indigo-700 dark:text-indigo-300">Import snippets from JSON</p>
          <textarea
            value={importJson}
            onChange={(e) => setImportJson(e.target.value)}
            placeholder='Paste JSON array, e.g. [{"shortcode":"addr","content":"123 Main St","category":"Address"}]'
            className="textarea-field text-xs font-mono min-h-[80px]"
            rows={3}
          />
          {importError && (
            <p className="text-xs text-rose-600 dark:text-rose-400 flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" /> {importError}
            </p>
          )}
          <div className="flex gap-2">
            <button onClick={handleImport} disabled={!importJson.trim()} className="btn-primary text-xs">Import</button>
            <button onClick={() => { setShowImport(false); setImportError('') }} className="btn-secondary text-xs">Cancel</button>
          </div>
        </div>
      )}

      {/* New / Edit form */}
      {showForm && !editId && (
        <SnippetForm
          categories={allCategories}
          onSave={addSnippet}
          onCancel={() => setShowForm(false)}
        />
      )}
      {editSnippet && (
        <SnippetForm
          initial={editSnippet}
          categories={allCategories}
          onSave={updateSnippet}
          onCancel={() => setEditId(null)}
          isEdit
        />
      )}

      {/* Search */}
      {snippets.length > 0 && (
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by shortcode, content, or category…"
            className="input-field text-sm pl-9"
          />
        </div>
      )}

      {/* Recently used */}
      {recentlyUsed.length > 0 && !search && (
        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Recently Used</h3>
          {recentlyUsed.map((s) => (
            <SnippetCard key={`recent-${s.id}`} snippet={s} onUse={() => recordUse(s.id)} onEdit={() => setEditId(s.id)} onDelete={() => deleteSnippet(s.id)} onClone={() => cloneSnippet(s)} />
          ))}
        </div>
      )}

      {/* Grouped snippets */}
      {snippets.length === 0 ? (
        <div className="text-center py-10 text-sm text-gray-400 dark:text-gray-500">
          No snippets yet. Create one to get started.
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-8 text-sm text-gray-400 dark:text-gray-500">
          No snippets match your search.
        </div>
      ) : (
        <div className="space-y-2">
          {grouped.map(([cat, items]) => {
            const isOpen = expandedCats[cat] !== false // default open
            return (
              <div key={cat}>
                <button
                  onClick={() => toggleCat(cat)}
                  className="flex items-center gap-2 w-full text-left py-2 group"
                >
                  {isOpen ? <ChevronDown className="w-4 h-4 text-gray-400" /> : <ChevronRight className="w-4 h-4 text-gray-400" />}
                  <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">{cat}</span>
                  <span className="text-[10px] text-gray-400 dark:text-gray-500">{items.length}</span>
                </button>
                {isOpen && (
                  <div className="space-y-2 ml-6">
                    {items.map((s) => (
                      <SnippetCard key={s.id} snippet={s} onUse={() => recordUse(s.id)} onEdit={() => setEditId(s.id)} onDelete={() => deleteSnippet(s.id)} onClone={() => cloneSnippet(s)} />
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* Expander overlay */}
      {showExpander && (
        <ExpanderOverlay
          snippets={snippets}
          onClose={() => setShowExpander(false)}
          onUse={(id) => recordUse(id)}
        />
      )}
    </div>
  )
}

// ── Snippet card ────────────────────────────────────────────────

function SnippetCard({ snippet, onUse, onEdit, onDelete, onClone }) {
  const s = snippet
  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-3">
      <div className="flex items-start justify-between gap-3 mb-1">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-mono font-bold text-indigo-600 dark:text-indigo-400">
              {s.trigger === 'prefix' ? ';' : ''}{s.shortcode}
            </span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
              s.trigger === 'prefix'
                ? 'bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400'
                : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400'
            }`}>
              {s.trigger === 'prefix' ? 'prefix' : 'manual'}
            </span>
            {s.usageCount > 0 && (
              <span className="text-[10px] text-gray-400 dark:text-gray-500">{s.usageCount}× used</span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          <CopyBtn text={s.content} onUse={onUse} />
          <button onClick={onClone} title="Clone" className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
            <CopyPlus className="w-4 h-4" />
          </button>
          <button onClick={onEdit} title="Edit" className="text-gray-400 hover:text-amber-500 dark:hover:text-amber-400 transition-colors">
            <Pencil className="w-4 h-4" />
          </button>
          <button onClick={onDelete} title="Delete" className="text-gray-300 hover:text-rose-500 dark:text-gray-600 dark:hover:text-rose-400 transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      <pre className="text-xs text-gray-600 dark:text-gray-300 whitespace-pre-wrap break-words font-mono leading-relaxed max-h-28 overflow-y-auto mt-1">
        {highlightPlaceholders(s.content)}
      </pre>
      {hasCursor(s.content) && (
        <span className="inline-block mt-1 text-[10px] text-amber-600 dark:text-amber-400">⟨cursor⟩ marks cursor position</span>
      )}
    </div>
  )
}
