import { useMemo, useState } from 'react'
import { Panel, SegmentedToggle } from '../../components/ToolLayout.jsx'
import { Field, ResultCard, SeoNote, StatsGrid } from './shared.jsx'

function parseImages(html) {
  if (!html.trim()) return []
  const doc = new DOMParser().parseFromString(html, 'text/html')
  return Array.from(doc.querySelectorAll('img')).map((image, index) => {
    const src = image.getAttribute('src') || `Image ${index + 1}`
    const alt = image.getAttribute('alt')
    let status = 'ok'
    let issue = 'Looks good'

    if (alt === null) {
      status = 'error'
      issue = 'Missing alt attribute'
    } else if (alt === '') {
      status = 'decorative'
      issue = 'Decorative image with empty alt text'
    } else if (alt.length < 5) {
      status = 'warning'
      issue = 'Alt text is very short'
    } else if (alt.length > 125) {
      status = 'warning'
      issue = 'Alt text is too long'
    } else if (/\.(jpg|jpeg|png|gif|webp|svg)$/i.test(alt)) {
      status = 'warning'
      issue = 'Alt text looks like a filename'
    } else if (/^(image|photo) of\b/i.test(alt)) {
      status = 'warning'
      issue = 'Avoid saying "image of" or "photo of"'
    }

    return { src, alt: alt ?? '', status, issue }
  })
}

export default function AltTextAnalyzer() {
  const [mode, setMode] = useState('html')
  const [html, setHtml] = useState('')
  const [url, setUrl] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [fetchMessage, setFetchMessage] = useState('')

  const images = useMemo(() => parseImages(html), [html])
  const filteredImages = useMemo(() => statusFilter === 'all' ? images : images.filter((image) => image.status === statusFilter), [images, statusFilter])
  const withAlt = images.filter((image) => image.alt !== '' && image.status !== 'error').length
  const decorative = images.filter((image) => image.status === 'decorative').length
  const missing = images.filter((image) => image.status === 'error').length
  const score = images.length ? Math.max(0, Math.round(((withAlt + decorative) / images.length) * 100 - images.filter((image) => image.status === 'warning').length * 5)) : 0

  return (
    <div className="space-y-6">
      <SeoNote />
      <Panel>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <SegmentedToggle value={mode} onChange={setMode} options={[{ label: 'Paste HTML', value: 'html' }, { label: 'Fetch URL', value: 'url' }]} />
          {fetchMessage ? <p className="text-sm text-amber-700 dark:text-amber-300">{fetchMessage}</p> : null}
        </div>
        {mode === 'html' ? (
          <div className="mt-4">
            <Field label="HTML input">
              <textarea className="textarea-field min-h-[220px]" value={html} onChange={(event) => setHtml(event.target.value)} placeholder="Paste full page HTML here..." />
            </Field>
          </div>
        ) : (
          <div className="mt-4 flex flex-wrap gap-3">
            <input className="input-field flex-1 min-w-[240px]" value={url} onChange={(event) => setUrl(event.target.value)} placeholder="https://example.com" />
            <button
              type="button"
              className="btn-primary"
              onClick={async () => {
                try {
                  setFetchMessage('')
                  const response = await fetch(url)
                  const text = await response.text()
                  setHtml(text)
                } catch {
                  setFetchMessage('This URL could not be fetched. CORS restrictions often block browser-side requests.')
                }
              }}
            >
              Fetch HTML
            </button>
          </div>
        )}
      </Panel>

      <StatsGrid items={[
        { label: 'Images found', value: images.length, tone: 'indigo' },
        { label: 'With alt text', value: `${withAlt} (${images.length ? Math.round((withAlt / images.length) * 100) : 0}%)`, tone: 'green' },
        { label: 'Decorative', value: decorative, helper: 'Empty alt="" is acceptable', tone: 'blue' },
        { label: 'Accessibility score', value: score, helper: score >= 90 ? 'WCAG-friendly' : 'Needs work', tone: score >= 90 ? 'green' : score >= 70 ? 'amber' : 'rose' },
      ]} />

      <div className="grid gap-6 xl:grid-cols-[1fr,1fr]">
        <ResultCard title="Analysis filters">
          <div className="flex flex-wrap gap-2">
            {['all', 'ok', 'warning', 'error', 'decorative'].map((filter) => (
              <button key={filter} type="button" className={`rounded-full px-3 py-1.5 text-sm ${statusFilter === filter ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200'}`} onClick={() => setStatusFilter(filter)}>{filter}</button>
            ))}
          </div>
          <div className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-300">
            <p>Missing alt attributes: {missing}</p>
            <p>Too short, too long, filename-like, or redundant alt text will show as warnings.</p>
          </div>
        </ResultCard>

        <ResultCard title="Suggested improvements">
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
            <li>Describe the image purpose, not just its visual contents.</li>
            <li>Use empty alt text for decorative images only.</li>
            <li>Keep alt text concise, usually under 125 characters.</li>
            <li>Avoid filenames and redundant phrases like “image of”.</li>
          </ul>
        </ResultCard>
      </div>

      <ResultCard title="Results table">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-left text-gray-500 dark:border-gray-700 dark:text-gray-400">
                <th className="pb-3 pr-4">Image src</th>
                <th className="pb-3 pr-4">Alt text</th>
                <th className="pb-3 pr-4">Status</th>
                <th className="pb-3">Issue</th>
              </tr>
            </thead>
            <tbody>
              {filteredImages.map((image) => (
                <tr key={`${image.src}-${image.alt}`} className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-3 pr-4 text-gray-700 dark:text-gray-200">{image.src.length > 45 ? `${image.src.slice(0, 45)}...` : image.src}</td>
                  <td className="py-3 pr-4 text-gray-600 dark:text-gray-300">{image.alt || '(empty)'}</td>
                  <td className={`py-3 pr-4 font-medium ${image.status === 'ok' ? 'text-green-600 dark:text-green-300' : image.status === 'warning' ? 'text-amber-600 dark:text-amber-300' : image.status === 'decorative' ? 'text-blue-600 dark:text-blue-300' : 'text-rose-600 dark:text-rose-300'}`}>{image.status === 'ok' ? '✓' : image.status === 'warning' ? '⚠' : image.status === 'decorative' ? '○' : '✗'}</td>
                  <td className="py-3 text-gray-600 dark:text-gray-300">{image.issue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ResultCard>
    </div>
  )
}
