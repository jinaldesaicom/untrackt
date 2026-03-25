import { useMemo, useState } from 'react'

function countSyllables(word) {
  const w = word.toLowerCase().replace(/[^a-z]/g, '')
  if (!w) return 0
  const matches = w.match(/[aeiouy]+/g)
  const count = matches ? matches.length : 1
  return Math.max(1, w.endsWith('e') ? count - 1 : count)
}

function score(text) {
  const words = text.match(/\b[\w']+\b/g) || []
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim()).length || 1
  const chars = text.replace(/\s+/g, '').length
  const syllables = words.reduce((acc, w) => acc + countSyllables(w), 0)
  const complexWords = words.filter((w) => countSyllables(w) >= 3).length

  const wCount = words.length || 1
  const flesch = 206.835 - 1.015 * (wCount / sentences) - 84.6 * (syllables / wCount)
  const fk = 0.39 * (wCount / sentences) + 11.8 * (syllables / wCount) - 15.59
  const fog = 0.4 * ((wCount / sentences) + 100 * (complexWords / wCount))
  const smog = 1.043 * Math.sqrt(complexWords * (30 / sentences)) + 3.1291
  const cl = 0.0588 * ((chars / wCount) * 100) - 0.296 * ((sentences / wCount) * 100) - 15.8
  const ari = 4.71 * (chars / wCount) + 0.5 * (wCount / sentences) - 21.43

  return {
    words: wCount,
    sentences,
    chars,
    flesch,
    fk,
    fog,
    smog,
    cl,
    ari,
    uniqueWords: new Set(words.map((w) => w.toLowerCase())).size,
    avgWordLength: chars / wCount,
    avgSentenceLength: wCount / sentences,
    longWords: complexWords,
  }
}

function gradeLabel(level) {
  if (level < 6) return 'Elementary'
  if (level < 9) return 'Middle School'
  if (level < 13) return 'High School'
  if (level < 17) return 'College'
  return 'Professional'
}

function ScoreBar({ label, value }) {
  const pct = Math.max(0, Math.min(100, value))
  return (
    <div>
      <div className="flex justify-between text-sm mb-1"><span>{label}</span><span>{value.toFixed(2)}</span></div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden"><div className="h-full bg-indigo-500" style={{ width: `${pct}%` }} /></div>
    </div>
  )
}

export default function ReadabilityScorer() {
  const [text, setText] = useState('')

  const s = useMemo(() => score(text), [text])
  const overall = (s.fk + s.fog + s.smog + s.cl + s.ari) / 5

  return (
    <div className="space-y-4">
      <textarea value={text} onChange={(e) => setText(e.target.value)} className="textarea-field min-h-[180px]" placeholder="Paste text to score readability" />

      <div className="rounded-xl border border-gray-200 bg-white p-4 text-sm text-gray-700">
        Overall grade: <strong>{gradeLabel(overall)}</strong>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 rounded-xl border border-gray-200 bg-white p-4">
        <ScoreBar label="Flesch Reading Ease" value={s.flesch} />
        <ScoreBar label="Flesch-Kincaid Grade" value={s.fk * 10} />
        <ScoreBar label="Gunning Fog" value={s.fog * 10} />
        <ScoreBar label="SMOG" value={s.smog * 10} />
        <ScoreBar label="Coleman-Liau" value={s.cl * 10} />
        <ScoreBar label="Automated Readability Index" value={s.ari * 10} />
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-4 text-sm text-gray-700 space-y-1">
        <p>Unique words: {s.uniqueWords}</p>
        <p>Avg word length: {s.avgWordLength.toFixed(2)}</p>
        <p>Avg sentence length: {s.avgSentenceLength.toFixed(2)}</p>
        <p>Long words (3+ syllables): {s.longWords}</p>
        <p>Your sentences average {s.avgSentenceLength.toFixed(1)} words - aim for under 20.</p>
      </div>
    </div>
  )
}
