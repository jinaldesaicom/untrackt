import { useMemo, useState } from 'react'
import { Panel } from '../../components/ToolLayout.jsx'
import { Field, ResultCard, SeoNote, StatsGrid } from './shared.jsx'

const GENERIC_ANCHOR_TEXT = new Set(['click here', 'read more', 'here', 'this', 'learn more'])

function analyzeLinks(html, baseDomain) {
  if (!html.trim()) return []
  const doc = new DOMParser().parseFromString(html, 'text/html')

  return Array.from(doc.querySelectorAll('a[href]')).map((link, index) => {
    const href = link.getAttribute('href') || ''
    const anchorText = (link.textContent || '').trim()
    let absoluteUrl = href
    let isInternal = false

    try {
      const parsed = new URL(href, `https://${baseDomain || 'example.com'}`)
      absoluteUrl = parsed.href
      isInternal = !baseDomain || parsed.hostname.includes(baseDomain.replace(/^https?:\/\//, '').replace(/^www\./, ''))
    } catch {
      absoluteUrl = href
      isInternal = href.startsWith('/')
    }

    const issues = []
    if (!anchorText) issues.push('Missing anchor text')
    if (GENERIC_ANCHOR_TEXT.has(anchorText.toLowerCase())) issues.push('Generic anchor text')
    if (/^\/[^/]+$/.test(href) && !href.includes('-') && href.length < 6) issues.push('Relative URL may be incomplete')

    return {
      id: `${href}-${index}`,
      url: absoluteUrl,
      anchorText,
      isInternal,
      nofollow: (link.getAttribute('rel') || '').includes('nofollow'),
      issues,
      status: issues.length ? 'warning' : 'ok',
    }
  })
}

export default function InternalLinkAnalyzer() {
  const [html, setHtml] = useState('')
  const [baseDomain, setBaseDomain] = useState('untrackt.com')

  const links = useMemo(() => analyzeLinks(html, baseDomain), [baseDomain, html])
  const internalLinks = links.filter((link) => link.isInternal)
  const externalLinks = links.filter((link) => !link.isInternal)
  const issueLinks = links.filter((link) => link.issues.length > 0)
  const genericAnchors = links.filter((link) => GENERIC_ANCHOR_TEXT.has(link.anchorText.toLowerCase())).length

  return (
    <div className="space-y-6">
      <SeoNote />
      <Panel>
        <div className="grid gap-4 lg:grid-cols-[1.1fr,0.9fr]">
          <Field label="Page HTML">
            <textarea className="textarea-field min-h-[240px]" value={html} onChange={(event) => setHtml(event.target.value)} placeholder="Paste the full HTML of the page here..." />
          </Field>
          <Field label="Base domain">
            <input className="input-field" value={baseDomain} onChange={(event) => setBaseDomain(event.target.value)} placeholder="example.com" />
          </Field>
        </div>
      </Panel>

      <StatsGrid items={[
        { label: 'Total links', value: links.length, tone: 'indigo' },
        { label: 'Internal links', value: internalLinks.length, helper: `${externalLinks.length} external`, tone: 'green' },
        { label: 'Link ratio', value: externalLinks.length ? `${(internalLinks.length / externalLinks.length).toFixed(1)} : 1` : 'All internal', tone: 'blue' },
        { label: 'Issues', value: issueLinks.length, helper: `${genericAnchors} generic anchors`, tone: issueLinks.length ? 'amber' : 'green' },
      ]} />

      <div className="grid gap-6 xl:grid-cols-3">
        <ResultCard title="Internal links table">
          <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
            {internalLinks.map((link) => <div key={link.id} className="rounded-xl border border-gray-200 p-3 dark:border-gray-700"><p className="font-medium text-gray-900 dark:text-gray-100">{link.anchorText || '(no text)'}</p><p className="mt-1 break-all text-xs">{link.url}</p></div>)}
            {internalLinks.length === 0 ? <p>No internal links found yet.</p> : null}
          </div>
        </ResultCard>
        <ResultCard title="External links table">
          <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
            {externalLinks.map((link) => <div key={link.id} className="rounded-xl border border-gray-200 p-3 dark:border-gray-700"><p className="font-medium text-gray-900 dark:text-gray-100">{link.anchorText || '(no text)'}</p><p className="mt-1 break-all text-xs">{link.url}</p><p className="mt-1 text-xs">{link.nofollow ? 'nofollow' : 'follow'}</p></div>)}
            {externalLinks.length === 0 ? <p>No external links found yet.</p> : null}
          </div>
        </ResultCard>
        <ResultCard title="Issues and recommendations">
          <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
            {issueLinks.length > 0 ? issueLinks.map((link) => <p key={link.id}><span className="font-medium text-gray-900 dark:text-gray-100">{link.anchorText || link.url}</span>: {link.issues.join(', ')}</p>) : <p>No major linking issues detected.</p>}
            <p>{genericAnchors > 0 ? `${genericAnchors} links have generic anchor text — use descriptive text for SEO.` : 'Anchor text looks descriptive overall.'}</p>
          </div>
        </ResultCard>
      </div>
    </div>
  )
}
