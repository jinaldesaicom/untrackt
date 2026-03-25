import { useMemo, useState } from 'react'
import { Panel } from '../../components/ToolLayout.jsx'
import { ProductivityNotice, useStoredState, downloadTextFile } from './shared.jsx'

const STORAGE_KEY = 'untrackt:productivity:kanban-board'
const DEFAULT_BOARD = {
  title: 'My Kanban Board',
  search: '',
  columns: [
    { id: crypto.randomUUID(), title: 'To Do', cards: [] },
    { id: crypto.randomUUID(), title: 'In Progress', cards: [] },
    { id: crypto.randomUUID(), title: 'Review', cards: [] },
    { id: crypto.randomUUID(), title: 'Done', cards: [] },
  ],
}

function createCard(title) {
  return { id: crypto.randomUUID(), title, description: '', priority: 'Medium', label: '', dueDate: '' }
}

export default function KanbanBoard() {
  const [board, setBoard] = useStoredState(STORAGE_KEY, DEFAULT_BOARD)
  const [drafts, setDrafts] = useState({})
  const [dragPayload, setDragPayload] = useState(null)

  const filteredColumns = useMemo(() => board.columns.map((column) => ({ ...column, cards: column.cards.filter((card) => `${card.title} ${card.description} ${card.label}`.toLowerCase().includes(board.search.toLowerCase())) })), [board.columns, board.search])

  const exportSummary = board.columns.map((column) => `${column.title}\n${column.cards.map((card) => `- ${card.title}${card.description ? `: ${card.description}` : ''}`).join('\n') || '- No cards'}`).join('\n\n')

  return (
    <div className="space-y-6">
      <ProductivityNotice storageKey={STORAGE_KEY} onClear={() => setBoard(DEFAULT_BOARD)} />

      <Panel>
        <div className="grid gap-3 lg:grid-cols-[1fr,1fr,auto,auto,auto]">
          <input className="input-field" value={board.title} onChange={(event) => setBoard((current) => ({ ...current, title: event.target.value }))} />
          <input className="input-field" value={board.search} onChange={(event) => setBoard((current) => ({ ...current, search: event.target.value }))} placeholder="Search cards" />
          <button type="button" className="btn-secondary" onClick={() => setBoard((current) => ({ ...current, columns: [...current.columns, { id: crypto.randomUUID(), title: `Column ${current.columns.length + 1}`, cards: [] }] }))}>Add column</button>
          <button type="button" className="btn-secondary" onClick={() => downloadTextFile('kanban-board.txt', exportSummary)}>Export summary</button>
          <button type="button" className="btn-secondary" onClick={() => { if (window.confirm('Clear the full board?')) setBoard(DEFAULT_BOARD) }}>Clear board</button>
        </div>
      </Panel>

      <div className="grid gap-4 xl:grid-cols-4">
        {filteredColumns.map((column) => (
          <div
            key={column.id}
            className="rounded-3xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900"
            onDragOver={(event) => event.preventDefault()}
            onDrop={() => {
              if (!dragPayload) return
              setBoard((current) => ({
                ...current,
                columns: current.columns.map((entry) => {
                  if (entry.id === dragPayload.fromColumnId) {
                    return { ...entry, cards: entry.cards.filter((card) => card.id !== dragPayload.card.id) }
                  }
                  if (entry.id === column.id) {
                    return { ...entry, cards: [...entry.cards, dragPayload.card] }
                  }
                  return entry
                }),
              }))
              setDragPayload(null)
            }}
          >
            <div className="flex items-center justify-between gap-3">
              <button type="button" className="text-left font-semibold text-gray-900 dark:text-gray-100" onClick={() => {
                const nextTitle = window.prompt('Rename column', column.title)
                if (nextTitle) setBoard((current) => ({ ...current, columns: current.columns.map((entry) => entry.id === column.id ? { ...entry, title: nextTitle } : entry) }))
              }}>{column.title}</button>
              <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-300">{column.cards.length}</span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <button type="button" className="btn-secondary" onClick={() => setDrafts((current) => ({ ...current, [column.id]: current[column.id] ?? { title: '', description: '', priority: 'Medium', label: '', dueDate: '' } }))}>+ Add card</button>
              <button type="button" className="btn-secondary" onClick={() => setBoard((current) => ({ ...current, columns: current.columns.map((entry) => entry.id === column.id ? { ...entry, cards: entry.title === 'Done' ? entry.cards : [] } : entry.id === current.columns.find((item) => item.title === 'Done')?.id ? { ...entry, cards: [...entry.cards, ...column.cards] } : entry) }))}>Archive to Done</button>
              {column.cards.length === 0 ? <button type="button" className="btn-secondary" onClick={() => setBoard((current) => ({ ...current, columns: current.columns.length > 1 ? current.columns.filter((entry) => entry.id !== column.id) : current.columns }))}>Delete column</button> : null}
            </div>

            {drafts[column.id] ? (
              <div className="mt-4 space-y-3 rounded-2xl border border-dashed border-gray-300 p-3 dark:border-gray-700">
                <input className="input-field" value={drafts[column.id].title} onChange={(event) => setDrafts((current) => ({ ...current, [column.id]: { ...current[column.id], title: event.target.value } }))} placeholder="Card title" />
                <textarea className="textarea-field min-h-[90px]" value={drafts[column.id].description} onChange={(event) => setDrafts((current) => ({ ...current, [column.id]: { ...current[column.id], description: event.target.value } }))} placeholder="Description" />
                <div className="grid gap-3 sm:grid-cols-3">
                  <select className="input-field" value={drafts[column.id].priority} onChange={(event) => setDrafts((current) => ({ ...current, [column.id]: { ...current[column.id], priority: event.target.value } }))}><option>High</option><option>Medium</option><option>Low</option></select>
                  <input className="input-field" value={drafts[column.id].label} onChange={(event) => setDrafts((current) => ({ ...current, [column.id]: { ...current[column.id], label: event.target.value } }))} placeholder="Label/tag" />
                  <input className="input-field" type="date" value={drafts[column.id].dueDate} onChange={(event) => setDrafts((current) => ({ ...current, [column.id]: { ...current[column.id], dueDate: event.target.value } }))} />
                </div>
                <div className="flex gap-2">
                  <button type="button" className="btn-primary" onClick={() => {
                    if (!drafts[column.id].title.trim()) return
                    setBoard((current) => ({ ...current, columns: current.columns.map((entry) => entry.id === column.id ? { ...entry, cards: [...entry.cards, { id: crypto.randomUUID(), ...drafts[column.id] }] } : entry) }))
                    setDrafts((current) => { const next = { ...current }; delete next[column.id]; return next })
                  }}>Save card</button>
                  <button type="button" className="btn-secondary" onClick={() => setDrafts((current) => { const next = { ...current }; delete next[column.id]; return next })}>Cancel</button>
                </div>
              </div>
            ) : null}

            <div className="mt-4 space-y-3">
              {column.cards.map((card) => (
                <div key={card.id} draggable onDragStart={() => setDragPayload({ card, fromColumnId: column.id })} className="rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/60">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-gray-100">{card.title}</p>
                      {card.description ? <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{card.description}</p> : null}
                    </div>
                    <button type="button" className="text-sm text-rose-600 dark:text-rose-300" onClick={() => setBoard((current) => ({ ...current, columns: current.columns.map((entry) => entry.id === column.id ? { ...entry, cards: entry.cards.filter((entryCard) => entryCard.id !== card.id) } : entry) }))}>Delete</button>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <span className={`rounded-full px-2 py-1 ${card.priority === 'High' ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300' : card.priority === 'Medium' ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300' : 'bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-300'}`}>{card.priority}</span>
                    {card.label ? <span className="rounded-full bg-indigo-100 px-2 py-1 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300">{card.label}</span> : null}
                    {card.dueDate ? <span>Due {card.dueDate}</span> : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
