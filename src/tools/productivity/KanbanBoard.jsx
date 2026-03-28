import { useState, useEffect } from 'react'
import { Plus, Trash2, GripVertical } from 'lucide-react'
import { getItem, setItem } from '../../utils/storage'

const STORAGE_KEY = 'untrackt_kanban'

const DEFAULT_COLUMNS = [
  { id: 'todo', title: 'To Do', color: 'border-gray-300 dark:border-gray-600' },
  { id: 'in-progress', title: 'In Progress', color: 'border-blue-400 dark:border-blue-600' },
  { id: 'done', title: 'Done', color: 'border-green-400 dark:border-green-600' }
]

export default function KanbanBoard() {
  const [cards, setCards] = useState(() => getItem(STORAGE_KEY, []))
  const [newCard, setNewCard] = useState({ column: 'todo', text: '' })
  const [dragCard, setDragCard] = useState(null)

  useEffect(() => { setItem(STORAGE_KEY, cards) }, [cards])

  const addCard = () => {
    const text = newCard.text.trim()
    if (!text) return
    setCards(prev => [...prev, { id: Date.now(), text, column: newCard.column, createdAt: new Date().toISOString() }])
    setNewCard(prev => ({ ...prev, text: '' }))
  }

  const deleteCard = (id) => setCards(prev => prev.filter(c => c.id !== id))
  const moveCard = (id, newCol) => setCards(prev => prev.map(c => c.id === id ? { ...c, column: newCol } : c))

  const handleDragStart = (card) => setDragCard(card)
  const handleDragOver = (e) => e.preventDefault()
  const handleDrop = (colId) => {
    if (dragCard) {
      moveCard(dragCard.id, colId)
      setDragCard(null)
    }
  }

  const getCards = (colId) => cards.filter(c => c.column === colId)

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <select value={newCard.column} onChange={e => setNewCard(prev => ({ ...prev, column: e.target.value }))} className="input-field w-36 text-sm">
          {DEFAULT_COLUMNS.map(col => <option key={col.id} value={col.id}>{col.title}</option>)}
        </select>
        <input type="text" value={newCard.text} onChange={e => setNewCard(prev => ({ ...prev, text: e.target.value }))} onKeyDown={e => e.key === 'Enter' && addCard()} className="input-field flex-1" placeholder="Add a card…" />
        <button onClick={addCard} className="btn-primary flex items-center gap-1.5"><Plus className="w-4 h-4" /> Add</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {DEFAULT_COLUMNS.map(col => (
          <div key={col.id} onDragOver={handleDragOver} onDrop={() => handleDrop(col.id)}
            className={`rounded-xl border-t-4 ${col.color} border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 min-h-[200px]`}>
            <div className="flex items-center justify-between px-3 py-2.5 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{col.title}</h3>
              <span className="text-xs text-gray-400 bg-gray-200 dark:bg-gray-700 px-1.5 py-0.5 rounded-full">{getCards(col.id).length}</span>
            </div>
            <div className="p-2 space-y-2">
              {getCards(col.id).map(card => (
                <div key={card.id} draggable onDragStart={() => handleDragStart(card)}
                  className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 cursor-grab active:cursor-grabbing hover:shadow-sm transition-shadow group">
                  <div className="flex items-start gap-2">
                    <GripVertical className="w-3.5 h-3.5 text-gray-300 dark:text-gray-600 flex-shrink-0 mt-0.5" />
                    <p className="flex-1 text-sm text-gray-700 dark:text-gray-300">{card.text}</p>
                    <button onClick={() => deleteCard(card.id)} className="text-gray-300 hover:text-red-500 dark:text-gray-600 dark:hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
              {getCards(col.id).length === 0 && (
                <p className="text-xs text-gray-400 text-center py-4">Drop cards here</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between text-xs text-gray-400">
        <span>{cards.length} total cards</span>
        {cards.length > 0 && (
          <span>{getCards('done').length} completed ({cards.length > 0 ? Math.round(getCards('done').length / cards.length * 100) : 0}%)</span>
        )}
      </div>
    </div>
  )
}
