import { useMemo, useState } from 'react'
import { detectCtaWords, detectPassiveVoiceCount, analyzeReadability, countPhraseOccurrences } from '../../utils/textAnalysis.js'
import { FieldLabel, Panel } from '../../components/ToolLayout.jsx'
import { Field, ResultCard, SeoNote, StatsGrid } from './shared.jsx'

function getLengthTone(length) {
  if (length > 170) return 'rose'
  if (length > 160) return 'amber'
  if (length >= 120) return 'green'
  return 'blue'
}

export default function MetaDescriptionAnalyzer() {
  const [description, setDescription] = useState('Describe your page clearly and give searchers a reason to click.')
  const [keyword, setKeyword] = useState('')
  const [pageUrl, setPageUrl] = useState('https://untrackt.com/example-page')

  const analysis = useMemo(() => {
    const trimmed = description.trim()
    const readability = analyzeReadability(trimmed)
    const keywordCount = countPhraseOccurrences(trimmed, keyword)
    const ctaWords = detectCtaWords(trimmed)
    const length = trimmed.length
    return {
      length,
      wordCount: trimmed ? trimmed.split(/\s+/).length : 0,
      keywordCount,
      hasKeyword: keyword.trim() ? keywordCount > 0 : false,
      ctaWords,
      passiveVoiceCount: detectPassiveVoiceCount(trimmed),
      readingLevel: readability.fleschKincaidGrade,
      truncated: length > 160 ? `${trimmed.slice(0, 157).trim()}...` : trimmed,
      tone: getLengthTone(length),
    }
  }, [description, keyword])

  return (
    <div className="space-y-6">
      <SeoNote />

      <Panel>
        <div className="grid gap-4 lg:grid-cols-[1.05fr,0.95fr]">
          <div>
            <FieldLabel helper={`${analysis.length} characters`}>Meta description</FieldLabel>
            <textarea className="textarea-field min-h-[180px]" value={description} onChange={(event) => setDescription(event.target.value)} />
          </div>
          <div className="space-y-4">
            <Field label="Target keyword">
              <input className="input-field" value={keyword} onChange={(event) => setKeyword(event.target.value)} placeholder="Optional keyword" />
            </Field>
            <Field label="Page URL">
              <input className="input-field" value={pageUrl} onChange={(event) => setPageUrl(event.target.value)} placeholder="https://example.com/page" />
            </Field>
          </div>
        </div>
      </Panel>

      <StatsGrid
        items={[
          { label: 'Characters', value: analysis.length, helper: analysis.length < 120 ? 'Too short' : analysis.length <= 160 ? 'Optimal' : analysis.length <= 170 ? 'Too long' : 'Will truncate', tone: analysis.tone },
          { label: 'Word count', value: analysis.wordCount, tone: 'indigo' },
          { label: 'Keyword', value: keyword ? (analysis.hasKeyword ? 'Found' : 'Not found') : 'Optional', helper: keyword ? `${analysis.keywordCount} mentions` : 'Add a keyword to check', tone: analysis.hasKeyword ? 'green' : 'gray' },
          { label: 'CTA words', value: analysis.ctaWords.length, helper: analysis.ctaWords.join(', ') || 'None detected', tone: analysis.ctaWords.length ? 'green' : 'amber' },
        ]}
      />

      <div className="grid gap-6 xl:grid-cols-3">
        <ResultCard title="Google SERP preview" className="xl:col-span-2">
          <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
            <p className="text-xl leading-snug text-blue-700 dark:text-blue-300">Your page title would appear here</p>
            <p className="mt-1 text-sm text-green-700 dark:text-green-400">{pageUrl || 'https://example.com/page'} › breadcrumb</p>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{analysis.truncated || 'Meta description would appear here...'}</p>
          </div>
        </ResultCard>

        <ResultCard title="Writing diagnostics">
          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
            <p>Passive voice sentences detected: <span className="font-semibold text-gray-900 dark:text-gray-100">{analysis.passiveVoiceCount}</span></p>
            <p>Estimated reading level: Grade <span className="font-semibold text-gray-900 dark:text-gray-100">{analysis.readingLevel.toFixed(1)}</span></p>
          </div>
        </ResultCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <ResultCard title="Facebook + Twitter card preview">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700">
              <div className="h-28 bg-gray-100 dark:bg-gray-800" />
              <div className="p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-gray-500 dark:text-gray-400">Facebook</p>
                <p className="mt-2 font-semibold text-gray-900 dark:text-gray-100">Your page title</p>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{analysis.truncated}</p>
              </div>
            </div>
            <div className="overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700">
              <div className="h-28 bg-slate-100 dark:bg-slate-800" />
              <div className="p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-gray-500 dark:text-gray-400">Twitter</p>
                <p className="mt-2 font-semibold text-gray-900 dark:text-gray-100">Your page title</p>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{analysis.truncated}</p>
              </div>
            </div>
          </div>
        </ResultCard>

        <ResultCard title="Suggestions">
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
            <li>{analysis.hasKeyword ? 'Target keyword is present naturally.' : 'Include the target keyword naturally when it fits the page intent.'}</li>
            <li>{analysis.ctaWords.length ? 'A call to action is present.' : 'Add a clear call to action such as learn, discover, or get.'}</li>
            <li>Be specific about the page content so the description matches search intent.</li>
            <li>Keep the description between 120 and 160 characters when possible.</li>
          </ul>
        </ResultCard>
      </div>
    </div>
  )
}
