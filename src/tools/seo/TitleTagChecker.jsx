import { useMemo, useState } from 'react'
import { FieldLabel, Panel, SegmentedToggle } from '../../components/ToolLayout.jsx'
import { Field, ResultCard, SeoNote, StatsGrid } from './shared.jsx'

function getLengthState(length) {
  if (length > 70) return { label: 'Will truncate', tone: 'rose' }
  if (length > 60) return { label: 'Too long', tone: 'amber' }
  if (length >= 30) return { label: 'Optimal', tone: 'green' }
  return { label: 'Too short', tone: 'blue' }
}

export default function TitleTagChecker() {
  const [title, setTitle] = useState('Your Title Tag Here — Site Name')
  const [keyword, setKeyword] = useState('')
  const [device, setDevice] = useState('desktop')

  const metrics = useMemo(() => {
    const trimmed = title.trim()
    const lowerTitle = trimmed.toLowerCase()
    const lowerKeyword = keyword.trim().toLowerCase()
    const charCount = trimmed.length
    const pixelWidth = charCount * 6
    const keywordPosition = lowerKeyword ? lowerTitle.indexOf(lowerKeyword) : -1
    const cutoff = device === 'mobile' ? 50 : 60
    return {
      charCount,
      pixelWidth,
      wordCount: trimmed ? trimmed.split(/\s+/).length : 0,
      keywordPosition,
      startsWithKeyword: Boolean(lowerKeyword) && lowerTitle.startsWith(lowerKeyword),
      lengthState: getLengthState(charCount),
      previewTitle: charCount > cutoff ? `${trimmed.slice(0, cutoff).trim()}...` : trimmed,
      progress: Math.min(100, (pixelWidth / 600) * 100),
    }
  }, [device, keyword, title])

  return (
    <div className="space-y-6">
      <SeoNote />

      <Panel>
        <div className="grid gap-4 lg:grid-cols-[1.05fr,0.95fr]">
          <div className="space-y-4">
            <Field label="Title tag" helper={`${metrics.charCount} characters`}>
              <input className="input-field" value={title} onChange={(event) => setTitle(event.target.value)} />
            </Field>
            <Field label="Target keyword">
              <input className="input-field" value={keyword} onChange={(event) => setKeyword(event.target.value)} placeholder="Optional target keyword" />
            </Field>
            <div>
              <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">SERP preview</p>
              <SegmentedToggle
                value={device}
                onChange={setDevice}
                options={[
                  { label: 'Desktop', value: 'desktop' },
                  { label: 'Mobile', value: 'mobile' },
                ]}
              />
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900">
            <p className="text-xs uppercase tracking-[0.16em] text-gray-500 dark:text-gray-400">Pixel width estimate</p>
            <div className="mt-3 h-3 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
              <div className={`h-full ${metrics.lengthState.tone === 'green' ? 'bg-green-500' : metrics.lengthState.tone === 'amber' ? 'bg-amber-500' : metrics.lengthState.tone === 'rose' ? 'bg-rose-500' : 'bg-blue-500'}`} style={{ width: `${metrics.progress}%` }} />
            </div>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{metrics.pixelWidth}px of 600px desktop cutoff</p>
          </div>
        </div>
      </Panel>

      <StatsGrid
        items={[
          { label: 'Length', value: metrics.charCount, helper: metrics.lengthState.label, tone: metrics.lengthState.tone },
          { label: 'Pixel width', value: `${metrics.pixelWidth}px`, helper: '600px desktop cutoff', tone: 'indigo' },
          { label: 'Word count', value: metrics.wordCount, tone: 'blue' },
          { label: 'Keyword position', value: metrics.keywordPosition >= 0 ? metrics.keywordPosition + 1 : 'Not found', helper: metrics.startsWithKeyword ? 'Starts with keyword' : 'Keyword not front-loaded', tone: metrics.startsWithKeyword ? 'green' : 'gray' },
        ]}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <ResultCard title="Google SERP preview">
          <div className={`rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900 ${device === 'mobile' ? 'max-w-sm' : ''}`}>
            <p className="text-xl leading-snug text-blue-700 dark:text-blue-300">{metrics.previewTitle || 'Your Title Tag Here — Site Name'}</p>
            <p className="mt-1 text-sm text-green-700 dark:text-green-400">https://yoursite.com</p>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Meta description would appear here...</p>
          </div>
        </ResultCard>

        <ResultCard title="Suggestions panel">
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
            <li>{metrics.startsWithKeyword ? 'Keyword is front-loaded near the start.' : 'Include the target keyword near the start if it fits naturally.'}</li>
            <li>{metrics.charCount <= 60 ? 'Length is within the usual desktop target.' : 'Trim the title to stay under 60 characters when possible.'}</li>
            <li>Make the title descriptive and compelling, not just keyword-heavy.</li>
            <li>Put your brand name at the end when it adds trust or recognition.</li>
          </ul>
        </ResultCard>
      </div>
    </div>
  )
}
