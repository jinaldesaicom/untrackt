import { useState } from 'react'
import { X } from 'lucide-react'

const STOP_WORDS = new Set([
  'the','a','an','is','it','in','on','at','to','for','of','and','or','but','not',
  'this','that','with','from','by','are','was','were','be','been','have','has',
  'do','does','did','will','would','could','should','may','might','i','you',
  'he','she','we','they','my','your','his','her','our','its','as','if','so',
])

export default function WordCounter() {
  const [text, setText] = useState('')

  const words = text.trim() === '' ? [] : text.trim().split(/\s+/)
  const wordCount = words.length === 0 ? 0 : words.filter(w => w.length > 0).length
  const charWithSpaces = text.length
  const charNoSpaces = text.replace(/\s/g, '').length
  const sentences = text.trim() === '' ? 0 : text.split(/[.!?]+/).filter(s => s.trim().length > 0).length
  const paragraphs = text.trim() === '' ? 0 : text.split(/\n\s*\n/).filter(p => p.trim().length > 0).length
  const readingTime = wordCount === 0 ? '< 1 min' : wordCount < 200 ? '< 1 min' : `${Math.ceil(wordCount / 200)} min`

  const topWords = (() => {
    if (!text.trim()) return []
    const freq = {}
    text.toLowerCase().replace(/[^a-z\s]/g, '').split(/\s+/).forEach((w) => {
      if (w.length > 1 && !STOP_WORDS.has(w)) {
        freq[w] = (freq[w] || 0) + 1
      }
    })
    return Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, 5)
  })()

  const stats = [
    { label: 'Words', value: wordCount },
    { label: 'Chars (with spaces)', value: charWithSpaces },
    { label: 'Chars (no spaces)', value: charNoSpaces },
    { label: 'Sentences', value: sentences },
    { label: 'Paragraphs', value: paragraphs || 1 },
    { label: 'Reading time', value: readingTime },
  ]

  return (
    <div className="space-y-4">
      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start typing or paste your text here..."
          className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent min-h-[220px] resize-y leading-relaxed"
        />
        {text && (
          <button
            onClick={() => setText('')}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 p-1 rounded"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-center">
            <p className="text-2xl font-bold text-indigo-600">{s.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Top words */}
      {topWords.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Top 5 Words</h3>
          <div className="flex flex-wrap gap-2">
            {topWords.map(([word, count]) => (
              <span key={word} className="flex items-center gap-1.5 bg-indigo-50 text-indigo-700 text-xs font-medium px-3 py-1.5 rounded-full">
                {word}
                <span className="bg-indigo-200 text-indigo-800 rounded-full px-1.5 py-0.5 text-xs">{count}</span>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
