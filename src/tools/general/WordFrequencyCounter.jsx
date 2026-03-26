import { useMemo, useState } from 'react'
import CopyButton from '../../components/CopyButton.jsx'
import { STOP_WORDS } from '../../data/generalData.js'
import { ToolLayout, Panel, SegmentedToggle, FieldLabel } from '../../components/ToolLayout.jsx'

function analyzeText(text, excludeStopWords, minWordLength, sortBy) {
  const words = (text.toLowerCase().match(/[a-z0-9']+/g) || [])
    .filter((word) => word.length >= minWordLength)
    .filter((word) => !excludeStopWords || !STOP_WORDS.has(word))
  const counts = words.reduce((accumulator, word) => {
    accumulator.set(word, (accumulator.get(word) || 0) + 1)
    return accumulator
  }, new Map())
  const rows = Array.from(counts.entries()).map(([word, count]) => ({ word, count, percent: words.length ? (count / words.length) * 100 : 0 }))

  if (sortBy === 'alpha') rows.sort((left, right) => left.word.localeCompare(right.word))
  else rows.sort((left, right) => right.count - left.count || left.word.localeCompare(right.word))

  return {
    totalWords: words.length,
    uniqueWords: counts.size,
    characters: text.length,
    sentences: (text.match(/[.!?]+/g) || []).length,
    paragraphs: text.split(/\n\s*\n/).filter(Boolean).length,
    rows,
  }
}

export default function WordFrequencyCounter() {
  const [text, setText] = useState('Paste text here to analyze word frequency, sentence counts, and the top repeated words.')
  const [excludeStopWords, setExcludeStopWords] = useState(true)
  const [minWordLength, setMinWordLength] = useState(3)
  const [sortBy, setSortBy] = useState('frequency')

  const analysis = useMemo(() => analyzeText(text, excludeStopWords, minWordLength, sortBy), [text, excludeStopWords, minWordLength, sortBy])
  const topWords = analysis.rows.slice(0, 20)
  const topTenExport = analysis.rows.slice(0, 10).map((row) => `${row.word}: ${row.count}`).join('\n')
  const csvExport = ['Word,Count,Frequency%', ...analysis.rows.map((row) => `${row.word},${row.count},${row.percent.toFixed(2)}`)].join('\n')

  return (
    <ToolLayout
      title="Word Frequency Counter"
      description="Analyze text for word frequency, counts, stop-word filtering, CSV export, a bar chart, and a simple word cloud."
      path="/tools/word-frequency-counter"
    >
      <div className="grid gap-6 lg:grid-cols-[0.95fr,1.05fr]">
        <Panel>
          <div className="space-y-4">
            <div>
              <FieldLabel>Text</FieldLabel>
              <textarea className="textarea-field min-h-[220px]" value={text} onChange={(event) => setText(event.target.value)} />
            </div>
            <div>
              <FieldLabel>Upload plain text file</FieldLabel>
              <input className="input-field" type="file" accept=".txt" onChange={async (event) => {
                const file = event.target.files?.[0]
                if (!file) return
                setText(await file.text())
              }} />
            </div>
            <div className="flex flex-wrap gap-2">
              <button type="button" className={`btn-secondary ${excludeStopWords ? '!bg-indigo-600 !text-white' : ''}`} onClick={() => setExcludeStopWords((current) => !current)}>Stop words {excludeStopWords ? 'ON' : 'OFF'}</button>
              <SegmentedToggle options={[{ label: 'Frequency', value: 'frequency' }, { label: 'Alphabetical', value: 'alpha' }]} value={sortBy} onChange={setSortBy} />
            </div>
            <div>
              <FieldLabel helper={`${minWordLength}+ characters`}>Minimum word length</FieldLabel>
              <input className="w-full accent-indigo-600" type="range" min="1" max="10" value={minWordLength} onChange={(event) => setMinWordLength(Number(event.target.value))} />
            </div>
          </div>
        </Panel>

        <div className="space-y-6">
          <Panel>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
              {[
                ['Words', analysis.totalWords], ['Unique', analysis.uniqueWords], ['Characters', analysis.characters], ['Sentences', analysis.sentences], ['Paragraphs', analysis.paragraphs],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-gray-200 dark:border-gray-700 p-4 text-center min-w-0">
                  <p className="text-[11px] uppercase tracking-[0.08em] text-gray-500 dark:text-gray-400 break-words leading-tight">{label}</p>
                  <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-gray-100 break-words">{value}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <CopyButton text={csvExport} label="Copy CSV" />
              <CopyButton text={topTenExport} label="Copy top 10" />
            </div>
          </Panel>

          <Panel>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Top 20 words</h2>
            <svg viewBox={`0 0 700 ${topWords.length * 28 + 20}`} className="mt-4 w-full">
              {topWords.map((row, index) => (
                <g key={row.word} transform={`translate(0, ${index * 28})`}>
                  <text x="0" y="18" fill="currentColor" className="text-gray-600 dark:text-gray-300" fontSize="12">{row.word}</text>
                  <rect x="140" y="6" width={Math.max(8, row.percent * 8)} height="14" rx="7" fill="#4f46e5" />
                  <text x={150 + Math.max(8, row.percent * 8)} y="18" fill="currentColor" fontSize="12">{row.count}</text>
                </g>
              ))}
            </svg>
          </Panel>

          <Panel>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Word cloud</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {topWords.map((row, index) => (
                <span key={row.word} style={{ fontSize: `${14 + row.percent * 1.6}px` }} className={`font-semibold ${index % 3 === 0 ? 'text-indigo-600 dark:text-indigo-300' : index % 3 === 1 ? 'text-emerald-600 dark:text-emerald-300' : 'text-amber-600 dark:text-amber-300'}`}>
                  {row.word}
                </span>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </ToolLayout>
  )
}