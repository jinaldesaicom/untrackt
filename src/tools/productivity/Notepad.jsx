import { useEffect, useMemo, useState } from 'react'
import CopyButton from '../../components/CopyButton.jsx'
import { Panel, SegmentedToggle } from '../../components/ToolLayout.jsx'
import { markdownToHtml } from '../../utils/markdown.js'
import { estimateReadingTime } from '../../utils/textAnalysis.js'
import { getItem, setItem, removeItem } from '../../utils/storage.js'
import { ProductivityNotice, downloadTextFile, formatRelativeTime } from './shared.jsx'

const NOTES_KEY = 'untrackt:productivity:notepad:notes'
const PREFS_KEY = 'untrackt:productivity:notepad:prefs'

function createNote(index) {
  return { id: crypto.randomUUID(), title: `Note ${index}`, content: '' }
}

export default function Notepad() {
  const [notes, setNotes] = useState(() => getItem(NOTES_KEY, [createNote(1)]))
  const [prefs, setPrefs] = useState(() => getItem(PREFS_KEY, { activeId: null, view: 'editor', fontSize: 'Medium', focusMode: false, lastSavedAt: 0 }))
  const activeId = prefs.activeId || notes[0]?.id
  const activeNote = notes.find((note) => note.id === activeId) || notes[0]

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setItem(NOTES_KEY, notes)
      setItem(PREFS_KEY, { ...prefs, activeId: activeId || notes[0]?.id, lastSavedAt: Date.now() })
      setPrefs((current) => ({ ...current, lastSavedAt: Date.now(), activeId: activeId || notes[0]?.id }))
    }, 1000)

    return () => window.clearTimeout(timeoutId)
  }, [activeId, notes, prefs])

  useEffect(() => {
    const header = document.querySelector('header')
    const footer = document.querySelector('footer')
    if (prefs.focusMode) {
      if (header) header.style.display = 'none'
      if (footer) footer.style.display = 'none'
    } else {
      if (header) header.style.display = ''
      if (footer) footer.style.display = ''
    }
    return () => {
      if (header) header.style.display = ''
      if (footer) footer.style.display = ''
    }
  }, [prefs.focusMode])

  const stats = useMemo(() => {
    const content = activeNote?.content || ''
    const words = content.trim() ? content.trim().split(/\s+/).length : 0
    return {
      words,
      characters: content.length,
      readingTime: estimateReadingTime(words),
      html: markdownToHtml(content),
    }
  }, [activeNote])

  const fontClass = prefs.fontSize === 'Large' ? 'text-lg' : prefs.fontSize === 'Small' ? 'text-sm' : 'text-base'

  return (
    <div className={`space-y-6 ${prefs.focusMode ? 'mx-auto max-w-3xl' : ''}`}>
      <ProductivityNotice storageKey={NOTES_KEY} onClear={() => {
        setNotes([createNote(1)])
        setPrefs({ activeId: null, view: 'editor', fontSize: 'Medium', focusMode: false, lastSavedAt: 0 })
        removeItem(NOTES_KEY)
        removeItem(PREFS_KEY)
      }} />

      <Panel>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex flex-wrap gap-2">
            {notes.map((note, index) => (
              <button key={note.id} type="button" className={`rounded-full px-3 py-1.5 text-sm ${note.id === activeId ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200'}`} onClick={() => setPrefs((current) => ({ ...current, activeId: note.id }))}>{note.title || `Note ${index + 1}`}</button>
            ))}
            {notes.length < 5 ? <button type="button" className="btn-secondary" onClick={() => setNotes((current) => [...current, createNote(current.length + 1)])}>+</button> : null}
          </div>
          <div className="ml-auto flex flex-wrap gap-2">
            <SegmentedToggle value={prefs.view} onChange={(view) => setPrefs((current) => ({ ...current, view }))} options={[{ label: 'Editor', value: 'editor' }, { label: 'Split', value: 'split' }, { label: 'Preview', value: 'preview' }]} />
            <select className="input-field w-auto" value={prefs.fontSize} onChange={(event) => setPrefs((current) => ({ ...current, fontSize: event.target.value }))}><option>Small</option><option>Medium</option><option>Large</option></select>
            <button type="button" className="btn-secondary" onClick={() => setPrefs((current) => ({ ...current, focusMode: !current.focusMode }))}>{prefs.focusMode ? 'Exit focus mode' : 'Focus mode'}</button>
          </div>
        </div>
      </Panel>

      <Panel>
        <div className="space-y-3">
          <input className="input-field" value={activeNote?.title || ''} onChange={(event) => setNotes((current) => current.map((note) => note.id === activeId ? { ...note, title: event.target.value } : note))} placeholder="Note title" />
          <div className={`grid gap-4 ${prefs.view === 'split' ? 'lg:grid-cols-2' : 'grid-cols-1'}`}>
            {prefs.view !== 'preview' ? (
              <textarea className={`textarea-field min-h-[480px] ${fontClass}`} value={activeNote?.content || ''} onChange={(event) => setNotes((current) => current.map((note) => note.id === activeId ? { ...note, content: event.target.value } : note))} placeholder="Start writing..." />
            ) : null}
            {prefs.view !== 'editor' ? (
              <div className="min-h-[480px] rounded-2xl border border-gray-200 bg-white p-4 prose prose-sm max-w-none dark:border-gray-700 dark:bg-gray-900 dark:prose-invert" dangerouslySetInnerHTML={{ __html: stats.html }} />
            ) : null}
          </div>
        </div>
      </Panel>

      <Panel>
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-gray-500 dark:text-gray-400">
          <p>{formatRelativeTime(prefs.lastSavedAt)}</p>
          <p>{stats.words} words · {stats.characters} characters · {stats.readingTime} min read</p>
          <div className="flex flex-wrap gap-2">
            <CopyButton text={activeNote?.content || ''} label="Copy all" />
            <button type="button" className="btn-secondary" onClick={() => downloadTextFile(`${(activeNote?.title || 'note').replace(/\s+/g, '-').toLowerCase()}.txt`, activeNote?.content || '')}>Download .txt</button>
            <button type="button" className="btn-secondary" onClick={() => downloadTextFile(`${(activeNote?.title || 'note').replace(/\s+/g, '-').toLowerCase()}.md`, activeNote?.content || '')}>Download .md</button>
            <button type="button" className="btn-secondary" onClick={() => { if (window.confirm('Clear this note?')) setNotes((current) => current.map((note) => note.id === activeId ? { ...note, content: '' } : note)) }}>Clear note</button>
          </div>
        </div>
      </Panel>
    </div>
  )
}
