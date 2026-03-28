import { useState } from 'react'
import { RotateCcw, Eye, EyeOff } from 'lucide-react'

const DECKS = {
  fibonacci: { name: 'Fibonacci', cards: ['0', '1', '2', '3', '5', '8', '13', '21', '?', '☕'] },
  tshirt: { name: 'T-Shirt', cards: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '?', '☕'] },
  powers: { name: 'Powers of 2', cards: ['0', '1', '2', '4', '8', '16', '32', '?', '☕'] },
}

function emptyParticipant(name) {
  return { id: Date.now() + Math.random(), name, vote: null }
}

export default function PlanningPoker() {
  const [deckType, setDeckType] = useState('fibonacci')
  const [storyTitle, setStoryTitle] = useState('')
  const [participants, setParticipants] = useState([
    emptyParticipant('Participant 1'),
    emptyParticipant('Participant 2'),
    emptyParticipant('Participant 3'),
  ])
  const [newName, setNewName] = useState('')
  const [revealed, setRevealed] = useState(false)
  const [activeParticipant, setActiveParticipant] = useState(null)

  const deck = DECKS[deckType]

  const addParticipant = () => {
    const name = newName.trim()
    if (!name) return
    setParticipants(prev => [...prev, emptyParticipant(name)])
    setNewName('')
  }

  const removeParticipant = (id) => setParticipants(prev => prev.filter(p => p.id !== id))

  const vote = (card) => {
    if (!activeParticipant || revealed) return
    setParticipants(prev => prev.map(p => p.id === activeParticipant ? { ...p, vote: card } : p))
    // Move to next unvoted participant
    const idx = participants.findIndex(p => p.id === activeParticipant)
    const next = participants.find((p, i) => i > idx && !p.vote)
    setActiveParticipant(next?.id || null)
  }

  const reveal = () => setRevealed(true)

  const reset = () => {
    setParticipants(prev => prev.map(p => ({ ...p, vote: null })))
    setRevealed(false)
    setActiveParticipant(participants[0]?.id || null)
  }

  const newRound = () => {
    setStoryTitle('')
    reset()
  }

  const allVoted = participants.every(p => p.vote !== null)
  const votes = participants.filter(p => p.vote && p.vote !== '?' && p.vote !== '☕').map(p => p.vote)
  const numericVotes = votes.map(Number).filter(n => !isNaN(n))
  const average = numericVotes.length > 0 ? (numericVotes.reduce((a, b) => a + b, 0) / numericVotes.length).toFixed(1) : null
  const consensus = votes.length > 0 && new Set(votes).size === 1

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-3 items-end">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Story Being Estimated</label>
          <input type="text" value={storyTitle} onChange={e => setStoryTitle(e.target.value)}
            className="input-field text-sm" placeholder="As a user, I want to..." />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Deck</label>
          <select value={deckType} onChange={e => { setDeckType(e.target.value); reset() }}
            className="input-field text-sm">
            {Object.entries(DECKS).map(([k, v]) => <option key={k} value={k}>{v.name}</option>)}
          </select>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Participants</h3>
          <div className="flex items-center gap-2">
            <input type="text" value={newName} onChange={e => setNewName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addParticipant()}
              className="w-36 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-2 py-1 text-xs" placeholder="Add participant" />
            <button onClick={addParticipant} className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline">Add</button>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {participants.map(p => (
            <button key={p.id}
              onClick={() => !revealed && setActiveParticipant(p.id)}
              className={`relative flex flex-col items-center gap-1 rounded-xl border px-4 py-3 min-w-[80px] transition-all ${
                activeParticipant === p.id
                  ? 'border-indigo-400 dark:border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 ring-2 ring-indigo-200 dark:ring-indigo-800'
                  : p.vote
                    ? 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/10'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900'
              }`}>
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300 truncate max-w-[80px]">{p.name}</span>
              <div className={`w-10 h-12 rounded-lg flex items-center justify-center text-lg font-bold ${
                revealed && p.vote
                  ? 'bg-indigo-500 text-white'
                  : p.vote
                    ? 'bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-400'
              }`}>
                {revealed ? p.vote || '—' : p.vote ? '✓' : '?'}
              </div>
              {participants.length > 2 && (
                <button onClick={e => { e.stopPropagation(); removeParticipant(p.id) }}
                  className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-500 text-[10px] flex items-center justify-center hover:bg-red-200 hover:text-red-600">
                  ×
                </button>
              )}
            </button>
          ))}
        </div>
      </div>

      {activeParticipant && !revealed && (
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
            Voting as: <strong className="text-gray-700 dark:text-gray-200">{participants.find(p => p.id === activeParticipant)?.name}</strong>
          </p>
          <div className="flex flex-wrap gap-2">
            {deck.cards.map(card => (
              <button key={card} onClick={() => vote(card)}
                className="w-14 h-20 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 flex items-center justify-center text-xl font-bold text-gray-700 dark:text-gray-300 transition-all hover:scale-105">
                {card}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center gap-3">
        {!revealed && allVoted && (
          <button onClick={reveal} className="btn-primary flex items-center gap-1.5">
            <Eye className="w-4 h-4" /> Reveal Votes
          </button>
        )}
        <button onClick={reset} className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center gap-1.5">
          <RotateCcw className="w-3.5 h-3.5" /> Reset Round
        </button>
        <button onClick={newRound} className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800">
          New Story
        </button>
      </div>

      {revealed && (
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-4 space-y-2">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Results</h3>
          {consensus && <p className="text-sm text-green-600 dark:text-green-400 font-medium">🎉 Consensus reached: {votes[0]}</p>}
          {!consensus && average && <p className="text-sm text-gray-600 dark:text-gray-400">Average: <strong className="text-indigo-600 dark:text-indigo-400">{average}</strong></p>}
          {!consensus && <p className="text-xs text-amber-600 dark:text-amber-400">Votes differ — discuss outliers and re-vote if needed.</p>}
        </div>
      )}
    </div>
  )
}
