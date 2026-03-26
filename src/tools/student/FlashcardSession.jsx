import { useMemo, useState } from 'react'
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
            <button className="btn-secondary" onClick={() => { setCards([]); removeItem(STORAGE_KEY) }}>Clear deck</button>
          </div>
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
