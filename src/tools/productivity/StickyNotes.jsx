import { useState, useEffect } from 'react'
import { Plus, Trash2, Edit3 } from 'lucide-react'
import { getItem, setItem } from '../../utils/storage'

const STORAGE_KEY = 'untrackt_sticky_notes'
const COLORS = [
  { name: 'Yellow', bg: 'bg-yellow-100 dark:bg-yellow-900/40', border: 'border-yellow-300 dark:border-yellow-700' },
  { name: 'Pink', bg: 'bg-pink-100 dark:bg-pink-900/40', border: 'border-pink-300 dark:border-pink-700' },
  { name: 'Blue', bg: 'bg-blue-100 dark:bg-blue-900/40', border: 'border-blue-300 dark:border-blue-700' },
  { name: 'Green', bg: 'bg-green-100 dark:bg-green-900/40', border: 'border-green-300 dark:border-green-700' },
  { name: 'Purple', bg: 'bg-purple-100 dark:bg-purple-900/40', border: 'border-purple-300 dark:border-purple-700' },
  { name: 'Orange', bg: 'bg-orange-100 dark:bg-orange-900/40', border: 'border-orange-300 dark:border-orange-700' },
]

export default function StickyNotes() {
  const [notes, setNotes] = useState(() => getItem(STORAGE_KEY, []))
  const [editId, setEditId] = useState(null)

  useEffect(() => { setItem(STORAGE_KEY, notes) }, [notes])

  const addNote = () => {
    const note = { id: Date.now(), text: '', colorIdx: 0, createdAt: new Date().toISOString() }
    setNotes(prev => [note, ...prev])
    setEditId(note.id)
  }

  const updateNote = (id, updates) => setNotes(prev => prev.map(n => n.id === id ? { ...n, ...updates } : n))
  const deleteNote = (id) => { setNotes(prev => prev.filter(n => n.id !== id)); if (editId === id) setEditId(null) }

  const cycleColor = (id, currentIdx) => {
    updateNote(id, { colorIdx: (currentIdx + 1) % COLORS.length })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500 dark:text-gray-400">{notes.length} note{notes.length !== 1 ? 's' : ''}</p>
        <button onClick={addNote} className="btn-primary flex items-center gap-1.5"><Plus className="w-4 h-4" /> New Note</button>
      </div>

      {notes.length === 0 ? (
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-8 text-center text-sm text-gray-400">
          No sticky notes yet — click "New Note" to add one!
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {notes.map(note => {
            const color = COLORS[note.colorIdx] || COLORS[0]
            const isEditing = editId === note.id
            return (
              <div key={note.id} className={`rounded-xl border ${color.border} ${color.bg} p-4 min-h-[140px] flex flex-col transition-shadow hover:shadow-md`}>
                <div className="flex items-center justify-between mb-2">
                  <button onClick={() => cycleColor(note.id, note.colorIdx)} className="w-5 h-5 rounded-full border-2 border-gray-300 dark:border-gray-600" style={{ background: `var(--tw-gradient-stops)` }} title="Change color">
                    <span className="sr-only">Change color</span>
                    <div className={`w-full h-full rounded-full ${['bg-yellow-400', 'bg-pink-400', 'bg-blue-400', 'bg-green-400', 'bg-purple-400', 'bg-orange-400'][note.colorIdx]}`} />
                  </button>
                  <div className="flex items-center gap-1">
                    <button onClick={() => setEditId(isEditing ? null : note.id)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"><Edit3 className="w-3.5 h-3.5" /></button>
                    <button onClick={() => deleteNote(note.id)} className="text-gray-400 hover:text-red-500"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
                {isEditing ? (
                  <textarea value={note.text} onChange={e => updateNote(note.id, { text: e.target.value })} autoFocus onBlur={() => setEditId(null)}
                    className="flex-1 bg-transparent outline-none resize-none text-sm text-gray-800 dark:text-gray-200 placeholder-gray-400" placeholder="Type your note…" />
                ) : (
                  <div className="flex-1 text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap cursor-pointer" onClick={() => setEditId(note.id)}>
                    {note.text || <span className="text-gray-400 italic">Empty note — click to edit</span>}
                  </div>
                )}
                <p className="text-[10px] text-gray-400 mt-2">{new Date(note.createdAt).toLocaleDateString()}</p>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
