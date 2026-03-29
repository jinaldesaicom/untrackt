import { useMemo, useState, useCallback } from 'react'
import { getItem, removeItem, setItem } from '../../utils/storage.js'

const STORAGE_KEY = 'untrackt:flashcardDeck'

export default function FlashcardSession() {
  const [cards, setCards] = useState(() => getItem(STORAGE_KEY, []))
  const [front, setFront] = useState('')
  const [back, setBack] = useState('')
  const [bulk, setBulk] = useState('')
  const [mode, setMode] = useState('build')
  const [index, setIndex] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [missed, setMissed] = useState([])
  const [correct, setCorrect] = useState(0)
  const [shuffle, setShuffle] = useState(false)
  const [editIdx, setEditIdx] = useState(null)
  const [editFront, setEditFront] = useState('')
  const [editBack, setEditBack] = useState('')
  const [dragIdx, setDragIdx] = useState(null)

  const activeDeck = useMemo(() => shuffle ? [...cards].sort(() => Math.random() - 0.5) : cards, [cards, shuffle])
  const current = activeDeck[index]

  const persist = (next) => {
    setCards(next)
    setItem(STORAGE_KEY, next)
  }

  const addCard = () => {
    if (!front.trim() || !back.trim() || cards.length >= 50) return
    persist([...cards, { front: front.trim(), back: back.trim() }])
    setFront('')
    setBack('')
  }

  const importBulk = () => {
    const parsed = bulk
      .split('\n')
      .map((line) => line.split('|').map((p) => p.trim()))
      .filter((pair) => pair.length >= 2 && pair[0] && pair[1])
      .map(([f, b]) => ({ front: f, back: b }))
    persist([...cards, ...parsed].slice(0, 50))
    setBulk('')
  }

  const moveCard = useCallback((from, to) => {
    if (to < 0 || to >= cards.length) return
    const next = [...cards]
    const [moved] = next.splice(from, 1)
    next.splice(to, 0, moved)
    persist(next)
  }, [cards])

  const deleteCard = useCallback((i) => {
    persist(cards.filter((_, idx) => idx !== i))
    if (editIdx === i) setEditIdx(null)
  }, [cards, editIdx])

  const startEdit = (i) => {
    setEditIdx(i)
    setEditFront(cards[i].front)
    setEditBack(cards[i].back)
  }

  const saveEdit = () => {
    if (editIdx === null || !editFront.trim() || !editBack.trim()) return
    const next = [...cards]
    next[editIdx] = { front: editFront.trim(), back: editBack.trim() }
    persist(next)
    setEditIdx(null)
  }

  const handleDragStart = (i) => setDragIdx(i)
  const handleDragOver = (e) => e.preventDefault()
  const handleDrop = (i) => {
    if (dragIdx !== null && dragIdx !== i) moveCard(dragIdx, i)
    setDragIdx(null)
  }

  const grade = (ok) => {
    if (!current) return
    if (ok) setCorrect((v) => v + 1)
    else setMissed((v) => [...v, current])
    setRevealed(false)
    if (index + 1 >= activeDeck.length) setMode('results')
    else setIndex((v) => v + 1)
  }

  const restart = (useMissed = false) => {
    const deck = useMissed ? missed : cards
    persist(deck)
    setIndex(0)
    setCorrect(0)
    setMissed([])
    setRevealed(false)
    setMode('study')
  }

  return (
    <div className="space-y-4">
      {mode === 'build' ? (
        <>
          <div className="rounded-xl border border-gray-200 bg-white p-4 space-y-2">
            <h3 className="font-semibold">Create card ({cards.length}/50)</h3>
            <input className="input-field" placeholder="Question" value={front} onChange={(e) => setFront(e.target.value)} />
            <textarea className="textarea-field min-h-[70px]" placeholder="Answer" value={back} onChange={(e) => setBack(e.target.value)} />
            <button className="btn-primary" onClick={addCard}>Add card</button>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-4 space-y-2">
            <h3 className="font-semibold">Bulk import (Question | Answer per line)</h3>
            <textarea className="textarea-field min-h-[100px]" value={bulk} onChange={(e) => setBulk(e.target.value)} />
            <button className="btn-secondary" onClick={importBulk}>Import</button>
          </div>

          <div className="flex gap-2">
            <button className="btn-primary" onClick={() => setMode('study')} disabled={cards.length === 0}>Start study</button>
            <button className="btn-secondary" onClick={() => { setCards([]); removeItem(STORAGE_KEY); setEditIdx(null) }}>Clear deck</button>
          </div>

          {cards.length > 0 && (
            <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
              <div className="px-4 py-2.5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200">Deck ({cards.length} card{cards.length !== 1 ? 's' : ''})</h3>
                <span className="text-xs text-gray-400">Drag to reorder</span>
              </div>
              <ul className="divide-y divide-gray-100 dark:divide-gray-800 max-h-80 overflow-y-auto">
                {cards.map((card, i) => (
                  <li
                    key={i}
                    draggable
                    onDragStart={() => handleDragStart(i)}
                    onDragOver={handleDragOver}
                    onDrop={() => handleDrop(i)}
                    className={`flex items-start gap-2 px-4 py-2.5 group transition-colors ${dragIdx === i ? 'bg-indigo-50 dark:bg-indigo-900/20' : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'}`}
                  >
                    <span className="text-xs text-gray-400 mt-1 cursor-grab active:cursor-grabbing select-none shrink-0 w-5 text-center" title="Drag to reorder">⠿</span>

                    {editIdx === i ? (
                      <div className="flex-1 space-y-1.5">
                        <input className="input-field w-full text-sm" value={editFront} onChange={(e) => setEditFront(e.target.value)} placeholder="Question" />
                        <textarea className="textarea-field w-full text-sm min-h-[50px]" value={editBack} onChange={(e) => setEditBack(e.target.value)} placeholder="Answer" />
                        <div className="flex gap-1.5">
                          <button className="btn-primary text-xs px-2.5 py-1" onClick={saveEdit}>Save</button>
                          <button className="btn-secondary text-xs px-2.5 py-1" onClick={() => setEditIdx(null)}>Cancel</button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">{card.front}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{card.back}</p>
                        </div>
                        <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => moveCard(i, i - 1)} disabled={i === 0} className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 disabled:opacity-30" title="Move up">↑</button>
                          <button onClick={() => moveCard(i, i + 1)} disabled={i === cards.length - 1} className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 disabled:opacity-30" title="Move down">↓</button>
                          <button onClick={() => startEdit(i)} className="p-1 text-gray-400 hover:text-indigo-500" title="Edit">✎</button>
                          <button onClick={() => deleteCard(i)} className="p-1 text-gray-400 hover:text-red-500" title="Delete">✕</button>
                        </div>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      ) : null}

      {mode === 'study' ? (
        <div className="rounded-xl border border-gray-200 bg-white p-4 space-y-3">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Progress: {Math.min(index + 1, activeDeck.length)} of {activeDeck.length}</span>
            <label className="inline-flex items-center gap-2"><input type="checkbox" checked={shuffle} onChange={(e) => setShuffle(e.target.checked)} />Shuffle</label>
          </div>

          {current ? (
            <>
              <div className="rounded-lg border border-gray-200 p-4 min-h-[120px]">
                <p className="font-semibold mb-2">Question</p>
                <p>{current.front}</p>
                {revealed ? <><p className="font-semibold mt-4 mb-2">Answer</p><p>{current.back}</p></> : null}
              </div>
              {!revealed ? (
                <button className="btn-primary" onClick={() => setRevealed(true)}>Reveal</button>
              ) : (
                <div className="flex gap-2">
                  <button className="btn-primary" onClick={() => grade(true)}>Got it</button>
                  <button className="btn-secondary" onClick={() => grade(false)}>Missed it</button>
                </div>
              )}
            </>
          ) : null}
        </div>
      ) : null}

      {mode === 'results' ? (
        <div className="rounded-xl border border-gray-200 bg-white p-4 space-y-3">
          <p className="text-lg font-semibold">Score: {activeDeck.length ? ((correct / activeDeck.length) * 100).toFixed(1) : '0'}%</p>
          <p className="text-sm text-gray-600">Cards to review again: {missed.length}</p>
          <div className="flex gap-2">
            <button className="btn-primary" onClick={() => restart(false)}>Restart session</button>
            <button className="btn-secondary" onClick={() => restart(true)} disabled={missed.length === 0}>Study missed only</button>
          </div>
        </div>
      ) : null}
    </div>
  )
}
