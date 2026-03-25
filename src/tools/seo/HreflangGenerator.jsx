import { useMemo, useState } from 'react'
import CopyButton from '../../components/CopyButton.jsx'
import { Panel } from '../../components/ToolLayout.jsx'
import { Field, ResultCard, SeoNote } from './shared.jsx'

const LANGUAGES = [
  ['en', 'English'], ['fr', 'French'], ['de', 'German'], ['es', 'Spanish'], ['ja', 'Japanese'], ['zh', 'Chinese'], ['it', 'Italian'], ['pt', 'Portuguese'], ['nl', 'Dutch'], ['ko', 'Korean'], ['ar', 'Arabic'], ['hi', 'Hindi'],
]
const REGIONS = ['', 'US', 'GB', 'AU', 'CA', 'IN', 'ES', 'MX', 'AR', 'FR', 'BE']

function createRow(language = 'en', region = '', url = '') {
  return { id: crypto.randomUUID(), language, region, url }
}

export default function HreflangGenerator() {
  const [rows, setRows] = useState([createRow('en', '', 'https://untrackt.com')])
  const [includeDefault, setIncludeDefault] = useState(true)
  const [defaultUrl, setDefaultUrl] = useState('')

  const output = useMemo(() => {
    const lines = rows.filter((row) => row.url.trim()).map((row) => {
      const code = row.region ? `${row.language}-${row.region}` : row.language
      return `<link rel="alternate" hreflang="${code}" href="${row.url.trim()}" />`
    })
    if (includeDefault) {
      lines.push(`<link rel="alternate" hreflang="x-default" href="${defaultUrl.trim() || rows[0]?.url || ''}" />`)
    }
    return lines.join('\n')
  }, [defaultUrl, includeDefault, rows])

  const warnings = useMemo(() => {
    const seen = new Set()
    const list = []
    rows.forEach((row) => {
      const code = row.region ? `${row.language}-${row.region}` : row.language
      if (seen.has(code)) list.push(`${code} appears more than once.`)
      seen.add(code)
      if (!row.url.trim()) list.push(`${code} is missing a URL.`)
    })
    return list
  }, [rows])

  const addPreset = (variant) => {
    if (variant === 'english') {
      setRows([createRow('en', '', 'https://example.com'), createRow('en', 'US', 'https://example.com/us'), createRow('en', 'GB', 'https://example.com/uk'), createRow('en', 'AU', 'https://example.com/au')])
    }
    if (variant === 'spanish') {
      setRows([createRow('es', '', 'https://example.com/es'), createRow('es', 'ES', 'https://example.com/es-es'), createRow('es', 'MX', 'https://example.com/es-mx'), createRow('es', 'AR', 'https://example.com/es-ar')])
    }
    if (variant === 'french') {
      setRows([createRow('fr', '', 'https://example.com/fr'), createRow('fr', 'FR', 'https://example.com/fr-fr'), createRow('fr', 'CA', 'https://example.com/fr-ca'), createRow('fr', 'BE', 'https://example.com/fr-be')])
    }
  }

  return (
    <div className="space-y-6">
      <SeoNote />
      <Panel>
        <div className="flex flex-wrap gap-2">
          <button type="button" className="btn-secondary" onClick={() => addPreset('english')}>English variants</button>
          <button type="button" className="btn-secondary" onClick={() => addPreset('spanish')}>Spanish variants</button>
          <button type="button" className="btn-secondary" onClick={() => addPreset('french')}>French variants</button>
          <button type="button" className="btn-primary" onClick={() => setRows((current) => [...current, createRow()])}>Add row</button>
        </div>
      </Panel>

      <div className="grid gap-6 xl:grid-cols-[1fr,1fr]">
        <Panel>
          <div className="space-y-4">
            {rows.map((row) => (
              <div key={row.id} className="grid gap-3 rounded-2xl border border-gray-200 p-4 dark:border-gray-700 md:grid-cols-[1fr,1fr,2fr,auto]">
                <select className="input-field" value={row.language} onChange={(event) => setRows((current) => current.map((entry) => entry.id === row.id ? { ...entry, language: event.target.value } : entry))}>
                  {LANGUAGES.map(([code, label]) => <option key={code} value={code}>{label} ({code})</option>)}
                </select>
                <select className="input-field" value={row.region} onChange={(event) => setRows((current) => current.map((entry) => entry.id === row.id ? { ...entry, region: event.target.value } : entry))}>
                  {REGIONS.map((region) => <option key={region || 'none'} value={region}>{region || 'No region'}</option>)}
                </select>
                <input className="input-field" value={row.url} onChange={(event) => setRows((current) => current.map((entry) => entry.id === row.id ? { ...entry, url: event.target.value } : entry))} placeholder="https://example.com/page" />
                <button type="button" className="btn-secondary" onClick={() => setRows((current) => current.length === 1 ? current : current.filter((entry) => entry.id !== row.id))}>Remove</button>
              </div>
            ))}
            <label className="flex items-center gap-3 rounded-2xl border border-gray-200 p-4 text-sm dark:border-gray-700">
              <input type="checkbox" checked={includeDefault} onChange={(event) => setIncludeDefault(event.target.checked)} className="h-4 w-4 rounded border-gray-300 text-indigo-600" />
              Include x-default tag
            </label>
            {includeDefault ? <Field label="x-default URL"><input className="input-field" value={defaultUrl} onChange={(event) => setDefaultUrl(event.target.value)} placeholder="Defaults to the first URL if blank" /></Field> : null}
          </div>
        </Panel>

        <div className="space-y-6">
          <ResultCard title="Generated hreflang tags" actions={<CopyButton text={output} label="Copy all" />}>
            <textarea className="textarea-field min-h-[260px] font-mono text-xs" readOnly value={output} />
          </ResultCard>
          <ResultCard title="Validation">
            {warnings.length > 0 ? <ul className="space-y-2 text-sm text-amber-700 dark:text-amber-300">{warnings.map((warning) => <li key={warning}>{warning}</li>)}</ul> : <p className="text-sm text-green-700 dark:text-green-300">Language-region combinations look consistent.</p>}
          </ResultCard>
          <ResultCard title="What each tag does">
            <p className="text-sm text-gray-600 dark:text-gray-300">Each link tells search engines which language or region-specific version of the page is the best match for a user. Use x-default for the fallback version when no specific locale fits.</p>
          </ResultCard>
        </div>
      </div>
    </div>
  )
}
