import { useMemo, useState } from 'react'
import { FieldLabel, Panel, SegmentedToggle } from '../../components/ToolLayout.jsx'
import { countPhraseOccurrences, getKeywordProminenceScore, splitWords, stripHtml } from '../../utils/textAnalysis.js'
import { Field, ResultCard, SeoNote, StatsGrid, STOP_WORDS } from './shared.jsx'

function getDensityTone(density) {
  if (density > 4) return 'rose'
  if (density > 2.5) return 'amber'
  if (density >= 0.5) return 'green'
  return 'blue'
}

function getDensityLabel(density) {
  if (density > 4) return 'Keyword stuffing risk'
  if (density > 2.5) return 'High'
  if (density >= 0.5) return 'Optimal'
  return 'Too low'
}

export default function KeywordDensityAnalyzer() {
  const [content, setContent] = useState('')
  const [targetKeyword, setTargetKeyword] = useState('')
  const [ignoreStopWords, setIgnoreStopWords] = useState(true)
  const [sortBy, setSortBy] = useState('count')

  const analysis = useMemo(() => {
    const plainText = stripHtml(content)
    const words = splitWords(plainText)
    const totalWords = words.length
    const keywordOccurrences = countPhraseOccurrences(plainText, targetKeyword)
    const keywordDensity = totalWords > 0 ? (keywordOccurrences / totalWords) * 100 : 0
    const frequencies = new Map()

    words.forEach((word) => {
      if (ignoreStopWords && STOP_WORDS.has(word)) return
      frequencies.set(word, (frequencies.get(word) || 0) + 1)
    })

    const topKeywords = Array.from(frequencies.entries())
      .map(([keyword, count]) => ({
        keyword,
        count,
        density: totalWords > 0 ? (count / totalWords) * 100 : 0,
      }))
      .sort((left, right) => {
        if (sortBy === 'density') {
          return right.density - left.density || left.keyword.localeCompare(right.keyword)
        }
        return right.count - left.count || left.keyword.localeCompare(right.keyword)
      })
      .slice(0, 20)

    const prominenceScore = getKeywordProminenceScore(content, targetKeyword)
    const lowerContent = content.toLowerCase()
    const usesH1 = targetKeyword ? /<h1[^>]*>[\s\S]*?<\/h1>/.test(lowerContent) && lowerContent.match(/<h1[^>]*>[\s\S]*?<\/h1>/)?.some?.((heading) => heading.includes(targetKeyword.toLowerCase())) : false
    const usesH2 = targetKeyword ? /<h2[^>]*>[\s\S]*?<\/h2>/.test(lowerContent) && lowerContent.match(/<h2[^>]*>[\s\S]*?<\/h2>/)?.some?.((heading) => heading.includes(targetKeyword.toLowerCase())) : false
    let recommendation = 'Paste content to begin analysis.'

    if (totalWords > 0 && targetKeyword.trim()) {
      if (keywordDensity < 0.5) recommendation = 'Consider adding more mentions of your target keyword.'
      else if (keywordDensity > 3) recommendation = 'Risk of keyword stuffing — reduce frequency.'
      else recommendation = 'Good keyword density!'
    }

    return {
      totalWords,
      keywordOccurrences,
      keywordDensity,
      densityLabel: getDensityLabel(keywordDensity),
      densityTone: getDensityTone(keywordDensity),
      topKeywords,
      prominenceScore,
      usesH1,
      usesH2,
      recommendation,
    }
  }, [content, ignoreStopWords, sortBy, targetKeyword])

  return (
    <div className="space-y-6">
      <SeoNote />

      <Panel>
        <div className="grid gap-4 lg:grid-cols-[1.2fr,0.8fr]">
          <div>
            <FieldLabel helper={`${splitWords(stripHtml(content)).length} words`}>Content</FieldLabel>
            <textarea
              className="textarea-field min-h-[240px]"
              value={content}
              onChange={(event) => setContent(event.target.value)}
              placeholder="Paste article text or HTML here..."
            />
          </div>
          <div className="space-y-4">
            <Field label="Target keyword">
              <input
                className="input-field"
                value={targetKeyword}
                onChange={(event) => setTargetKeyword(event.target.value)}
                placeholder="Optional target keyword"
              />
            </Field>
            <label className="flex items-center gap-3 rounded-2xl border border-gray-200 p-4 text-sm text-gray-700 dark:border-gray-700 dark:text-gray-200">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600"
                checked={ignoreStopWords}
                onChange={(event) => setIgnoreStopWords(event.target.checked)}
              />
              Ignore common stop words
            </label>
            <div>
              <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">Sort keyword table by</p>
              <SegmentedToggle
                value={sortBy}
                onChange={setSortBy}
                options={[
                  { label: 'Count', value: 'count' },
                  { label: 'Density', value: 'density' },
                ]}
              />
            </div>
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-600 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300">
              <p className="font-medium text-gray-900 dark:text-gray-100">Recommendations</p>
              <p className="mt-2">{analysis.recommendation}</p>
            </div>
          </div>
        </div>
      </Panel>

      <StatsGrid
        items={[
          { label: 'Total words', value: analysis.totalWords, tone: 'indigo' },
          { label: 'Keyword mentions', value: analysis.keywordOccurrences, helper: targetKeyword || 'Add a target keyword', tone: 'blue' },
          { label: 'Keyword density', value: `${analysis.keywordDensity.toFixed(2)}%`, helper: analysis.densityLabel, tone: analysis.densityTone },
          { label: 'Prominence score', value: analysis.prominenceScore, helper: `${analysis.usesH1 ? 'H1' : 'No H1'} / ${analysis.usesH2 ? 'H2' : 'No H2'} usage`, tone: 'green' },
        ]}
      />

      <ResultCard title="Top keywords table">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-left text-gray-500 dark:border-gray-700 dark:text-gray-400">
                <th className="pb-3 pr-4">Keyword</th>
                <th className="pb-3 pr-4">Count</th>
                <th className="pb-3">Density %</th>
              </tr>
            </thead>
            <tbody>
              {analysis.topKeywords.map((row) => {
                const isTarget = targetKeyword.trim() && row.keyword === targetKeyword.trim().toLowerCase()
                return (
                  <tr key={row.keyword} className={`border-b border-gray-100 dark:border-gray-800 ${isTarget ? 'bg-amber-50 dark:bg-amber-950/20' : ''}`}>
                    <td className="py-3 pr-4 font-medium text-gray-900 dark:text-gray-100">{row.keyword}</td>
                    <td className="py-3 pr-4 text-gray-600 dark:text-gray-300">{row.count}</td>
                    <td className="py-3 text-gray-600 dark:text-gray-300">{row.density.toFixed(2)}%</td>
                  </tr>
                )
              })}
              {analysis.topKeywords.length === 0 ? (
                <tr>
                  <td colSpan="3" className="py-6 text-center text-gray-500 dark:text-gray-400">Add content to see your top 20 keywords.</td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </ResultCard>

      <div className="grid gap-6 lg:grid-cols-2">
        <ResultCard title="Simplified TF-IDF view">
          <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
            <p>Target keyword prominence score: <span className="font-semibold text-gray-900 dark:text-gray-100">{analysis.prominenceScore}</span></p>
            <p>{analysis.usesH1 ? 'Target keyword appears in an H1 heading.' : 'No H1 usage detected for the target keyword.'}</p>
            <p>{analysis.usesH2 ? 'Target keyword appears in an H2 heading.' : 'No H2 usage detected for the target keyword.'}</p>
            <p>Keywords placed early in the first paragraph receive more weight in this simplified prominence estimate.</p>
          </div>
        </ResultCard>

        <ResultCard title="Density guidance">
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
            <li>&lt; 0.5%: Too low, the keyword may be underused.</li>
            <li>0.5% to 2.5%: Usually a healthy target range.</li>
            <li>2.5% to 4%: Watch for repetition and unnatural phrasing.</li>
            <li>&gt; 4%: Strong keyword stuffing risk.</li>
          </ul>
        </ResultCard>
      </div>
    </div>
  )
}
