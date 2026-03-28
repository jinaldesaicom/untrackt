import { useState, useMemo } from 'react'

const SYLLABLE_OVERRIDES = { 'area': 3, 'idea': 3, 'real': 2, 'create': 2, 'the': 1, 'every': 3, 'different': 3, 'business': 3, 'people': 2, 'because': 2 }

function countSyllables(word) {
  word = word.toLowerCase().replace(/[^a-z]/g, '')
  if (!word) return 0
  if (SYLLABLE_OVERRIDES[word]) return SYLLABLE_OVERRIDES[word]
  if (word.length <= 3) return 1
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '')
  word = word.replace(/^y/, '')
  const m = word.match(/[aeiouy]{1,2}/g)
  return m ? m.length : 1
}

function analyze(text) {
  if (!text.trim()) return null

  const sentences = text.split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 0)
  const words = text.split(/\s+/).filter(w => w.replace(/[^a-zA-Z]/g, '').length > 0)

  if (words.length === 0) return null

  const totalSentences = sentences.length
  const totalWords = words.length
  const totalSyllables = words.reduce((s, w) => s + countSyllables(w), 0)
  const avgWordsPerSentence = totalWords / totalSentences
  const avgSyllablesPerWord = totalSyllables / totalWords

  // Flesch Reading Ease
  const fleschEase = 206.835 - (1.015 * avgWordsPerSentence) - (84.6 * avgSyllablesPerWord)

  // Flesch-Kincaid Grade Level
  const fleschKincaid = (0.39 * avgWordsPerSentence) + (11.8 * avgSyllablesPerWord) - 15.59

  // Gunning Fog Index
  const complexWords = words.filter(w => countSyllables(w) >= 3).length
  const fogIndex = 0.4 * (avgWordsPerSentence + 100 * (complexWords / totalWords))

  // Coleman-Liau Index
  const chars = words.join('').length
  const L = (chars / totalWords) * 100
  const S = (totalSentences / totalWords) * 100
  const colemanLiau = 0.0588 * L - 0.296 * S - 15.8

  // SMOG (for 30+ sentences, approximation otherwise)
  const smog = 1.0430 * Math.sqrt(complexWords * (30 / totalSentences)) + 3.1291

  // Grade level interpretation
  const grade = Math.round(fleschKincaid)
  let level, audience
  if (grade <= 5) { level = 'Very Easy'; audience = 'Elementary school' }
  else if (grade <= 8) { level = 'Easy'; audience = 'Middle school' }
  else if (grade <= 12) { level = 'Average'; audience = 'High school' }
  else if (grade <= 16) { level = 'Difficult'; audience = 'College' }
  else { level = 'Very Difficult'; audience = 'Post-graduate' }

  // Flesch ease interpretation
  let easeLabel
  if (fleschEase >= 90) easeLabel = 'Very Easy — 5th grader'
  else if (fleschEase >= 80) easeLabel = 'Easy — 6th grader'
  else if (fleschEase >= 70) easeLabel = 'Fairly Easy — 7th grader'
  else if (fleschEase >= 60) easeLabel = 'Standard — 8th-9th grader'
  else if (fleschEase >= 50) easeLabel = 'Fairly Difficult — 10th-12th grader'
  else if (fleschEase >= 30) easeLabel = 'Difficult — College level'
  else easeLabel = 'Very Difficult — Post-graduate'

  // Suggestions
  const suggestions = []
  if (avgWordsPerSentence > 20) suggestions.push('Break long sentences — aim for under 20 words on average')
  if (fleschEase < 60) suggestions.push('Simplify vocabulary — replace complex words with shorter alternatives')
  if (complexWords / totalWords > 0.2) suggestions.push(`${((complexWords / totalWords) * 100).toFixed(1)}% complex words (3+ syllables) — try to reduce below 15%`)
  if (fleschKincaid > 12) suggestions.push('Content reads at college level — simplify for broader audience')
  const longSentences = sentences.filter(s => s.split(/\s+/).length > 25)
  if (longSentences.length) suggestions.push(`${longSentences.length} sentence(s) exceed 25 words — consider splitting them`)

  return {
    totalWords, totalSentences, totalSyllables, complexWords,
    avgWordsPerSentence: avgWordsPerSentence.toFixed(1),
    avgSyllablesPerWord: avgSyllablesPerWord.toFixed(2),
    fleschEase: Math.max(0, Math.min(100, fleschEase)).toFixed(1),
    fleschKincaid: Math.max(0, fleschKincaid).toFixed(1),
    fogIndex: fogIndex.toFixed(1),
    colemanLiau: Math.max(0, colemanLiau).toFixed(1),
    smog: smog.toFixed(1),
    grade, level, audience, easeLabel, suggestions
  }
}

export default function ReadingLevelOptimizer() {
  const [text, setText] = useState('')
  const result = useMemo(() => analyze(text), [text])

  const easeBarColor = result
    ? parseFloat(result.fleschEase) >= 60 ? 'bg-green-500' : parseFloat(result.fleschEase) >= 40 ? 'bg-amber-500' : 'bg-red-500'
    : 'bg-gray-300'

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-900/20 px-4 py-3 text-sm text-rose-700 dark:text-rose-300">
        This tool provides guidance and estimates only. SEO results depend on many factors outside this tool.
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Paste Your Content</label>
        <textarea value={text} onChange={e => setText(e.target.value)} className="textarea-field min-h-[180px]" placeholder="Paste your article or page content here…" />
        <p className="text-xs text-gray-400 mt-1">{text.split(/\s+/).filter(Boolean).length} words</p>
      </div>

      {result && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ScoreCard label="Flesch Ease" value={result.fleschEase} sub={result.easeLabel} />
            <ScoreCard label="Grade Level" value={result.fleschKincaid} sub={`${result.level} — ${result.audience}`} />
            <ScoreCard label="Gunning Fog" value={result.fogIndex} sub="Years of education" />
            <ScoreCard label="SMOG Index" value={result.smog} sub="Years of education" />
          </div>

          <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Flesch Reading Ease</h3>
            <div className="relative h-6 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
              <div className={`absolute left-0 top-0 h-full rounded-full transition-all ${easeBarColor}`} style={{ width: `${Math.min(100, Math.max(0, parseFloat(result.fleschEase)))}%` }} />
              <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-gray-900 dark:text-white">{result.fleschEase} / 100</div>
            </div>
            <div className="flex justify-between mt-1 text-[10px] text-gray-400">
              <span>Very Difficult</span><span>Standard</span><span>Very Easy</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <Stat label="Words" value={result.totalWords} />
            <Stat label="Sentences" value={result.totalSentences} />
            <Stat label="Syllables" value={result.totalSyllables} />
            <Stat label="Complex Words (3+ syl)" value={result.complexWords} />
            <Stat label="Avg Words/Sentence" value={result.avgWordsPerSentence} />
            <Stat label="Avg Syllables/Word" value={result.avgSyllablesPerWord} />
          </div>

          <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">All Scores</h3>
            <table className="w-full text-xs">
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {[
                  ['Flesch Reading Ease', result.fleschEase, 'Higher = easier (aim for 60-70 for web)'],
                  ['Flesch-Kincaid Grade', result.fleschKincaid, `${result.level} — ${result.audience}`],
                  ['Gunning Fog Index', result.fogIndex, 'Years of education needed'],
                  ['Coleman-Liau Index', result.colemanLiau, 'Grade level estimate'],
                  ['SMOG Index', result.smog, 'Years of education for comprehension']
                ].map(([name, val, note], i) => (
                  <tr key={i}>
                    <td className="py-1.5 text-gray-700 dark:text-gray-300 font-medium">{name}</td>
                    <td className="py-1.5 text-right font-bold text-gray-900 dark:text-white">{val}</td>
                    <td className="py-1.5 pl-3 text-gray-400">{note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {result.suggestions.length > 0 && (
            <div className="space-y-1.5">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Suggestions</h3>
              {result.suggestions.map((s, i) => (
                <div key={i} className="rounded-lg px-3 py-2 text-xs bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">⚠ {s}</div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}

function ScoreCard({ label, value, sub }) {
  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-3 text-center">
      <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{value}</p>
      <p className="text-xs font-medium text-gray-700 dark:text-gray-200">{label}</p>
      <p className="text-[10px] text-gray-400 mt-0.5">{sub}</p>
    </div>
  )
}

function Stat({ label, value }) {
  return (
    <div className="rounded-lg border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 px-3 py-2">
      <p className="text-lg font-semibold text-gray-900 dark:text-white">{value}</p>
      <p className="text-[10px] text-gray-500">{label}</p>
    </div>
  )
}
