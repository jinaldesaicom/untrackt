import { useMemo, useState } from 'react'
import CopyButton from '../../components/CopyButton.jsx'
import { Panel, SegmentedToggle } from '../../components/ToolLayout.jsx'
import { Field, ResultCard, SeoNote } from './shared.jsx'

const SCENARIOS = {
  https: {
    title: 'HTTP vs HTTPS duplicate',
    problem: 'http://example.com/page and https://example.com/page both load.',
    canonical: 'https://example.com/page',
    explanation: 'Use the secure HTTPS version as the canonical URL.',
  },
  www: {
    title: 'www vs non-www duplicate',
    problem: 'https://www.example.com/page and https://example.com/page both exist.',
    canonical: 'https://example.com/page',
    explanation: 'Pick one hostname version and keep it consistent site-wide.',
  },
  slash: {
    title: 'Trailing slash issue',
    problem: 'https://example.com/page and https://example.com/page/ both exist.',
    canonical: 'https://example.com/page/',
    explanation: 'Canonicalize to the preferred slash format consistently.',
  },
  params: {
    title: 'URL parameters',
    problem: 'https://example.com/page?utm_source=newsletter duplicates the clean URL.',
    canonical: 'https://example.com/page',
    explanation: 'Canonicalize tracking-parameter URLs to the clean URL.',
  },
  pagination: {
    title: 'Pagination',
    problem: 'Paginated list pages need clear primary versions.',
    canonical: 'https://example.com/blog',
    explanation: 'If page 1 is the main category page, canonicalize that version appropriately.',
  },
  print: {
    title: 'Print versions',
    problem: 'https://example.com/page?print=1 duplicates the default page.',
    canonical: 'https://example.com/page',
    explanation: 'Point print URLs back to the main content URL.',
  },
  mobile: {
    title: 'Mobile subdomain',
    problem: 'https://m.example.com/page duplicates the main responsive page.',
    canonical: 'https://example.com/page',
    explanation: 'Use the primary responsive URL as the canonical target.',
  },
  syndicated: {
    title: 'Syndicated content',
    problem: 'A republished article lives on another domain.',
    canonical: 'https://original-site.com/article',
    explanation: 'Canonicalize to the original source when republishing is allowed.',
  },
}

function toCanonicalTag(url) {
  return `<link rel="canonical" href="${url}" />`
}

function toHeader(url) {
  return `Link: <${url}>; rel="canonical"`
}

function pickCanonical(urlA, urlB) {
  const scores = [urlA, urlB].map((url) => {
    let score = 0
    if (url.startsWith('https://')) score += 3
    if (!url.includes('?')) score += 2
    if (!/\/print|m\./.test(url)) score += 1
    if (!url.includes('www.')) score += 1
    return { url, score }
  })
  return scores.sort((left, right) => right.score - left.score)[0]?.url || urlA
}

export default function CanonicalTagGenerator() {
  const [tab, setTab] = useState('generator')
  const [pageUrl, setPageUrl] = useState('https://example.com/page?utm_source=newsletter')
  const [canonicalUrl, setCanonicalUrl] = useState('https://example.com/page')
  const [selfReferencing, setSelfReferencing] = useState(false)
  const [checkerA, setCheckerA] = useState('https://example.com/page')
  const [checkerB, setCheckerB] = useState('http://www.example.com/page?ref=nav')

  const finalCanonical = selfReferencing ? pageUrl : canonicalUrl
  const chosen = useMemo(() => pickCanonical(checkerA, checkerB), [checkerA, checkerB])

  return (
    <div className="space-y-6">
      <SeoNote />
      <Panel>
        <SegmentedToggle value={tab} onChange={setTab} options={[{ label: 'Generator', value: 'generator' }, { label: 'Scenarios', value: 'scenarios' }, { label: 'Checker', value: 'checker' }]} />
      </Panel>

      {tab === 'generator' ? (
        <div className="grid gap-6 xl:grid-cols-[1fr,1fr]">
          <Panel>
            <div className="space-y-4">
              <Field label="Page URL"><input className="input-field" value={pageUrl} onChange={(event) => setPageUrl(event.target.value)} /></Field>
              <Field label="Canonical URL"><input className="input-field" value={canonicalUrl} onChange={(event) => setCanonicalUrl(event.target.value)} disabled={selfReferencing} /></Field>
              <label className="flex items-center gap-3 rounded-2xl border border-gray-200 p-4 text-sm dark:border-gray-700">
                <input type="checkbox" checked={selfReferencing} onChange={(event) => setSelfReferencing(event.target.checked)} className="h-4 w-4 rounded border-gray-300 text-indigo-600" />
                Self-referencing canonical
              </label>
            </div>
          </Panel>
          <div className="space-y-6">
            <ResultCard title="Canonical output" actions={<div className="flex flex-wrap gap-2"><CopyButton text={toCanonicalTag(finalCanonical)} label="Copy tag" /><CopyButton text={toHeader(finalCanonical)} label="Copy header" /></div>}>
              <textarea className="textarea-field min-h-[120px] font-mono text-xs" readOnly value={`${toCanonicalTag(finalCanonical)}\n\n${toHeader(finalCanonical)}`} />
            </ResultCard>
            <ResultCard title="Where to place this">
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li>Place the HTML canonical tag inside the page &lt;head&gt;.</li>
                <li>Use the HTTP header version for PDFs or other non-HTML files.</li>
                <li>Keep canonical targets indexable and consistent with internal links.</li>
              </ul>
            </ResultCard>
          </div>
        </div>
      ) : null}

      {tab === 'scenarios' ? (
        <div className="grid gap-6 md:grid-cols-2">
          {Object.entries(SCENARIOS).map(([key, scenario]) => (
            <ResultCard key={key} title={scenario.title} actions={<CopyButton text={toCanonicalTag(scenario.canonical)} label="Copy tag" />}>
              <p className="text-sm text-gray-600 dark:text-gray-300"><strong>Problem:</strong> {scenario.problem}</p>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300"><strong>Why:</strong> {scenario.explanation}</p>
              <textarea className="textarea-field mt-4 min-h-[96px] font-mono text-xs" readOnly value={toCanonicalTag(scenario.canonical)} />
            </ResultCard>
          ))}
        </div>
      ) : null}

      {tab === 'checker' ? (
        <div className="grid gap-6 xl:grid-cols-[1fr,1fr]">
          <Panel>
            <div className="space-y-4">
              <Field label="URL A"><input className="input-field" value={checkerA} onChange={(event) => setCheckerA(event.target.value)} /></Field>
              <Field label="URL B"><input className="input-field" value={checkerB} onChange={(event) => setCheckerB(event.target.value)} /></Field>
            </div>
          </Panel>
          <ResultCard title="Checker result" actions={<CopyButton text={toCanonicalTag(chosen)} label="Copy tag" />}>
            <p className="text-sm text-gray-600 dark:text-gray-300">Recommended canonical URL: <span className="font-semibold text-gray-900 dark:text-gray-100">{chosen}</span></p>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Why: HTTPS, clean URLs, and the non-parameter version are usually safer canonical targets.</p>
            <textarea className="textarea-field mt-4 min-h-[96px] font-mono text-xs" readOnly value={toCanonicalTag(chosen)} />
          </ResultCard>
        </div>
      ) : null}
    </div>
  )
}
