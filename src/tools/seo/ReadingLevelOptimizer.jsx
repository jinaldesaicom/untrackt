import { useEffect, useMemo, useState } from 'react'
import { analyzeReadability, estimateReadingLabel, getSimpleSynonym, splitSentences, splitWords } from '../../utils/textAnalysis.js'
import { Panel } from '../../components/ToolLayout.jsx'
import { Field, ResultCard, SeoNote, StatsGrid } from './shared.jsx'

function highlightText(text) {
  return splitSentences(text).map((sentence, index) => {
    const words = splitWords(sentence)
    const longSentence = words.length > 25
    const passive = /\b(?:am|is|are|was|were|be|been|being)\s+\w+(?:ed|en)\b/i.test(sentence)
    const complex = Array.from(new Set(words.filter((word) => word.length > 8 || getSimpleSynonym(word))))
    return { id: `${index}-${sentence.slice(0, 12)}`, sentence, longSentence, passive, complex }
  })
}

export default function ReadingLevelOptimizer() {
  const [text, setText] = useState('')
  const [baseline, setBaseline] = useState('')

  useEffect(() => {
    if (!baseline && text.trim()) {
      setBaseline(text)
    }
  }, [baseline, text])

  const current = useMemo(() => analyzeReadability(text), [text])
  const original = useMemo(() => analyzeReadability(baseline), [baseline])
  const sentenceAnalysis = useMemo(() => highlightText(text), [text])
  const suggestions = useMemo(() => sentenceAnalysis.flatMap((entry) => {
    const list = []
    if (entry.longSentence) list.push(`Break this sentence into two: "${entry.sentence}"`)
    if (entry.passive) list.push(`Consider active voice: "${entry.sentence}"`)
    entry.complex.slice(0, 2).forEach((word) => {
      const synonym = getSimpleSynonym(word)
      if (synonym) list.push(`Simpler alternative for "${word}": ${synonym}`)
    })
    return list
  }).slice(0, 8), [sentenceAnalysis])

  return (
    <div className="space-y-6">
      <SeoNote />
      <Panel>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Field label="Content">
            <textarea className="textarea-field min-h-[240px]" value={text} onChange={(event) => setText(event.target.value)} placeholder="Paste blog copy, landing page text, or technical content here..." />
          </Field>
          <button type="button" className="btn-secondary" onClick={() => setBaseline(text)}>
            Reset baseline to current text
          </button>
        </div>
      </Panel>

      <StatsGrid items={[
        { label: 'Flesch reading ease', value: current.fleschReadingEase.toFixed(1), helper: estimateReadingLabel(current.fleschReadingEase), tone: current.fleschReadingEase >= 60 ? 'green' : current.fleschReadingEase >= 45 ? 'amber' : 'rose' },
        { label: 'Grade level', value: current.fleschKincaidGrade.toFixed(1), helper: 'Blog target 6-8', tone: current.fleschKincaidGrade <= 8 ? 'green' : current.fleschKincaidGrade <= 12 ? 'amber' : 'rose' },
        { label: 'Avg words/sentence', value: current.avgWordsPerSentence.toFixed(1), tone: current.avgWordsPerSentence <= 20 ? 'green' : 'amber' },
        { label: 'Passive voice', value: `${current.passiveVoicePercentage.toFixed(1)}%`, helper: `${current.longSentencePercentage.toFixed(1)}% long sentences`, tone: current.passiveVoicePercentage < 10 ? 'green' : 'amber' },
      ]} />

      <div className="grid gap-6 xl:grid-cols-[1fr,1fr]">
        <ResultCard title="SEO readability targets">
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
            <li>Blog posts: aim for grade 6-8 and Flesch 60-70.</li>
            <li>Technical docs: grade 10-12 can still be acceptable.</li>
            <li>Landing pages: grade 5-7 usually reaches a broad audience.</li>
            <li>Complex words: {current.complexWordPercentage.toFixed(1)}% of your text.</li>
          </ul>
        </ResultCard>

        <ResultCard title="Before / after comparison">
          <div className="grid gap-3 sm:grid-cols-2 text-sm text-gray-600 dark:text-gray-300">
            <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-700">
              <p className="font-medium text-gray-900 dark:text-gray-100">Original baseline</p>
              <p className="mt-2">Flesch: {original.fleschReadingEase.toFixed(1)}</p>
              <p>Grade: {original.fleschKincaidGrade.toFixed(1)}</p>
            </div>
            <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-700">
              <p className="font-medium text-gray-900 dark:text-gray-100">Current draft</p>
              <p className="mt-2">Flesch: {current.fleschReadingEase.toFixed(1)}</p>
              <p>Grade: {current.fleschKincaidGrade.toFixed(1)}</p>
            </div>
          </div>
        </ResultCard>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr,0.9fr]">
        <ResultCard title="Sentence-level analysis">
          <div className="space-y-3">
            {sentenceAnalysis.map((entry) => (
              <p key={entry.id} className={`rounded-xl border p-3 text-sm ${entry.longSentence ? 'border-amber-300 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/20' : entry.passive ? 'border-blue-300 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/20' : 'border-gray-200 dark:border-gray-700'}`}>
                <span className="text-gray-800 dark:text-gray-200">{entry.sentence}</span>
                {entry.complex.length > 0 ? <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">Complex words: {entry.complex.slice(0, 3).join(', ')}</span> : null}
              </p>
            ))}
          </div>
        </ResultCard>
        <ResultCard title="Improvement suggestions">
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
            {suggestions.length > 0 ? suggestions.map((suggestion) => <li key={suggestion}>{suggestion}</li>) : <li>Add text to see sentence-level recommendations.</li>}
          </ul>
        </ResultCard>
      </div>
    </div>
  )
}
