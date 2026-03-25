import { useMemo, useState } from 'react'
import { Panel } from '../../components/ToolLayout.jsx'
import { useStoredState, ProductivityNotice } from './shared.jsx'

const STORAGE_KEY = 'untrackt:productivity:sticky-notes'
const COLORS = {
  Yellow: 'bg-amber-100 text-amber-950 dark:bg-amber-900/50 dark:text-amber-100',
  Pink: 'bg-pink-100 text-pink-950 dark:bg-pink-900/50 dark:text-pink-100',
  Blue: 'bg-sky-100 text-sky-950 dark:bg-sky-900/50 dark:text-sky-100',
  Green: 'bg-emerald-100 text-emerald-950 dark:bg-emerald-900/50 dark:text-emerald-100',
  Purple: 'bg-fuchsia-100 text-fuchsia-950 dark:bg-fuchsia-900/50 dark:text-fuchsia-100',
  Orange: 'bg-orange-100 text-orange-950 dark:bg-orange-900/50 dark:text-orange-100',
}
const SIZES = { Small: 'min-h-[180px]', Medium: 'min-h-[240px]', Large: 'min-h-[320px]' }

function createNote() {
  const colorNames = Object.keys(COLORS)
  return { id: crypto.randomUUID(), title: '', content: '', color: colorNames[Math.floor(Math.random() * colorNames.length)], size: 'Medium', pinned: false, rotation: `${Math.random() * 4 - 2}deg` }
}

export default function StickyNotes() {
  const [notes, setNotes] = useStoredState(STORAGE_KEY, [])
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    return [...notes]
      .filter((note) => `${note.title} ${note.content}`.toLowerCase().includes(query.trim().toLowerCase()))
      .sort((left, right) => Number(right.pinned) - Number(left.pinned))
  }, [notes, query])

  return (
    <div className="space-y-6">
      <ProductivityNotice storageKey={STORAGE_KEY} onClear={() => setNotes([])} />

      <Panel>
        <div className="flex flex-wrap items-center gap-3">
          <input className="input-field flex-1 min-w-[220px]" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search notes" />
          <button type="button" className="btn-primary" onClick={() => setNotes((current) => [createNote(), ...current])}>Create new note</button>
          <button type="button" className="btn-secondary" onClick={() => { if (window.confirm('Clear all sticky notes?')) setNotes([]) }}>Clear all</button>
        </div>
      </Panel>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {filtered.map((note) => (
          <div key={note.id} className={`rounded-3xl border border-white/60 p-4 shadow-[0_18px_40px_rgba(15,23,42,0.08)] ${COLORS[note.color]} ${SIZES[note.size]}`} style={{ transform: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'none' : `rotate(${note.rotation})` }}>
            <div className="flex items-start gap-2">
              <input className="w-full bg-transparent text-sm font-semibold outline-none placeholder:text-current/60" value={note.title} onChange={(event) => setNotes((current) => current.map((entry) => entry.id === note.id ? { ...entry, title: event.target.value } : entry))} placeholder="Title" />
              <button type="button" className="text-sm" onClick={() => setNotes((current) => current.filter((entry) => entry.id !== note.id))}>×</button>
            </div>
            <textarea className="mt-3 h-[60%] w-full resize-none bg-transparent text-sm outline-none placeholder:text-current/60" value={note.content} onChange={(event) => setNotes((current) => current.map((entry) => entry.id === note.id ? { ...entry, content: event.target.value } : entry))} placeholder="Capture the idea..." />
            <div className="mt-3 grid gap-2 text-xs">
              <select className="rounded-xl border border-black/10 bg-white/60 px-2 py-1 text-current dark:bg-black/20" value={note.color} onChange={(event) => setNotes((current) => current.map((entry) => entry.id === note.id ? { ...entry, color: event.target.value } : entry))}>{Object.keys(COLORS).map((color) => <option key={color}>{color}</option>)}</select>
              <select className="rounded-xl border border-black/10 bg-white/60 px-2 py-1 text-current dark:bg-black/20" value={note.size} onChange={(event) => setNotes((current) => current.map((entry) => entry.id === note.id ? { ...entry, size: event.target.value } : entry))}>{Object.keys(SIZES).map((size) => <option key={size}>{size}</option>)}</select>
              <label className="flex items-center gap-2"><input type="checkbox" checked={note.pinned} onChange={(event) => setNotes((current) => current.map((entry) => entry.id === note.id ? { ...entry, pinned: event.target.checked } : entry))} /> Pin to top</label>
            </div>
          </div>
        ))}
        {filtered.length === 0 ? <p className="text-sm text-gray-500 dark:text-gray-400">No sticky notes yet.</p> : null}
      </div>
    </div>
  )
}
