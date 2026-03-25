import { useMemo, useState } from 'react'
import CopyButton from '../../components/CopyButton.jsx'
import { Panel } from '../../components/ToolLayout.jsx'
import { downloadTextFile } from '../productivity/shared.jsx'
import { Field, ResultCard, SeoNote } from './shared.jsx'

const FREQUENCIES = ['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never']

function createRow(url = '') {
  return {
    id: crypto.randomUUID(),
    url,
    lastmod: new Date().toISOString().slice(0, 10),
    changefreq: 'monthly',
    priority: '0.5',
  }
}

function normalizeUrl(baseUrl, value) {
  const raw = value.trim()
  if (!raw) return ''
  try {
    return new URL(raw, baseUrl || undefined).href
  } catch {
    return raw
  }
}

export default function XmlSitemapGenerator() {
  const [baseUrl, setBaseUrl] = useState('https://untrackt.com')
  const [rows, setRows] = useState([createRow('/')])
  const [bulkText, setBulkText] = useState('')
  const [patternPrefix, setPatternPrefix] = useState('/blog/')
  const [patternCount, setPatternCount] = useState(5)

  const normalizedRows = useMemo(() => rows.map((row) => ({ ...row, normalizedUrl: normalizeUrl(baseUrl, row.url) })).filter((row) => row.normalizedUrl), [baseUrl, rows])
  const duplicates = useMemo(() => {
    const seen = new Set()
    return normalizedRows.filter((row) => {
      if (seen.has(row.normalizedUrl)) return true
      seen.add(row.normalizedUrl)
      return false
    })
  }, [normalizedRows])
  const invalidUrls = normalizedRows.filter((row) => !/^https?:\/\//.test(row.normalizedUrl))

  const xml = useMemo(() => {
    const lines = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    normalizedRows.forEach((row) => {
      lines.push('  <url>')
      lines.push(`    <loc>${row.normalizedUrl}</loc>`)
      lines.push(`    <lastmod>${row.lastmod}</lastmod>`)
      lines.push(`    <changefreq>${row.changefreq}</changefreq>`)
      lines.push(`    <priority>${row.priority}</priority>`)
      lines.push('  </url>')
    })
    lines.push('</urlset>')
    return lines.join('\n')
  }, [normalizedRows])

  return (
    <div className="space-y-6">
      <SeoNote />

      <div className="grid gap-6 xl:grid-cols-[1.1fr,0.9fr]">
        <div className="space-y-6">
          <Panel>
            <div className="grid gap-4 md:grid-cols-[1fr,auto]">
              <Field label="Base URL">
                <input className="input-field" value={baseUrl} onChange={(event) => setBaseUrl(event.target.value)} placeholder="https://example.com" />
              </Field>
              <button type="button" className="btn-primary self-end" onClick={() => setRows((current) => [...current, createRow('')])}>Add URL</button>
            </div>
          </Panel>

          <Panel>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">URLs</h2>
            <div className="mt-4 space-y-4">
              {rows.map((row) => (
                <div key={row.id} className="grid gap-3 rounded-2xl border border-gray-200 p-4 dark:border-gray-700 lg:grid-cols-[2fr,1fr,1fr,0.8fr,auto]">
                  <input className="input-field" value={row.url} onChange={(event) => setRows((current) => current.map((entry) => entry.id === row.id ? { ...entry, url: event.target.value } : entry))} placeholder="/page or https://example.com/page" />
                  <input className="input-field" type="date" value={row.lastmod} onChange={(event) => setRows((current) => current.map((entry) => entry.id === row.id ? { ...entry, lastmod: event.target.value } : entry))} />
                  <select className="input-field" value={row.changefreq} onChange={(event) => setRows((current) => current.map((entry) => entry.id === row.id ? { ...entry, changefreq: event.target.value } : entry))}>
                    {FREQUENCIES.map((frequency) => <option key={frequency} value={frequency}>{frequency}</option>)}
                  </select>
                  <input className="input-field" type="number" min="0.1" max="1" step="0.1" value={row.priority} onChange={(event) => setRows((current) => current.map((entry) => entry.id === row.id ? { ...entry, priority: event.target.value } : entry))} />
                  <button type="button" className="btn-secondary" onClick={() => setRows((current) => current.length === 1 ? current : current.filter((entry) => entry.id !== row.id))}>Remove</button>
                </div>
              ))}
            </div>
          </Panel>

          <Panel>
            <div className="grid gap-4 lg:grid-cols-2">
              <Field label="Bulk import">
                <textarea className="textarea-field min-h-[140px]" value={bulkText} onChange={(event) => setBulkText(event.target.value)} placeholder="One URL per line" />
              </Field>
              <div className="space-y-4">
                <button
                  type="button"
                  className="btn-primary w-full"
                  onClick={() => {
                    const imported = bulkText.split('\n').map((line) => line.trim()).filter(Boolean).slice(0, 200)
                    setRows((current) => [...current, ...imported.map((url) => createRow(url))].slice(0, 200))
                    setBulkText('')
                  }}
                >
                  Import URLs
                </button>
                <div className="rounded-2xl border border-gray-200 p-4 dark:border-gray-700">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Quick-add URL pattern</p>
                  <div className="mt-3 grid gap-3 sm:grid-cols-[1fr,120px]">
                    <input className="input-field" value={patternPrefix} onChange={(event) => setPatternPrefix(event.target.value)} placeholder="/blog/" />
                    <input className="input-field" type="number" min="1" max="50" value={patternCount} onChange={(event) => setPatternCount(Number(event.target.value) || 1)} />
                  </div>
                  <button
                    type="button"
                    className="btn-secondary mt-3"
                    onClick={() => {
                      const generated = Array.from({ length: patternCount }, (_, index) => createRow(`${patternPrefix}${index + 1}`))
                      setRows((current) => [...current, ...generated].slice(0, 200))
                    }}
                  >
                    Add URL pattern
                  </button>
                </div>
              </div>
            </div>
          </Panel>
        </div>

        <div className="space-y-6">
          <ResultCard
            title="XML sitemap preview"
            actions={<div className="flex flex-wrap gap-2"><CopyButton text={xml} label="Copy XML" /><button type="button" className="btn-secondary" onClick={() => downloadTextFile('sitemap.xml', xml, 'application/xml;charset=utf-8')}>Download</button></div>}
          >
            <p className="mb-3 text-sm text-gray-500 dark:text-gray-400">URL count: {normalizedRows.length}</p>
            <textarea className="textarea-field min-h-[340px] font-mono text-xs" readOnly value={xml} />
          </ResultCard>

          <ResultCard title="Validation">
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <li>{duplicates.length > 0 ? `${duplicates.length} duplicate URLs found.` : 'No duplicate URLs detected.'}</li>
              <li>{invalidUrls.length > 0 ? `${invalidUrls.length} URLs look invalid.` : 'All current URLs are valid absolute URLs after normalization.'}</li>
              <li>{normalizedRows.length > 50000 ? 'Sitemap exceeds the 50,000 URL limit.' : 'Within the 50,000 URL sitemap limit.'}</li>
              <li>{rows.length > 200 ? 'Trim to 200 URLs for browser performance.' : 'Within the 200-URL in-browser limit.'}</li>
            </ul>
          </ResultCard>
        </div>
      </div>
    </div>
  )
}
