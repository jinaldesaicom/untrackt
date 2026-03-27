import { useState, useMemo } from 'react'
import { Copy, Check, Plus, Trash2 } from 'lucide-react'

function CopyBtn({ text }) {
  const [copied, setCopied] = useState(false)
  const copy = () => { navigator.clipboard.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1500) }) }
  return <button onClick={copy} className="btn-secondary flex items-center gap-1.5 text-xs">{copied ? <><Check className="w-3.5 h-3.5" /> Copied</> : <><Copy className="w-3.5 h-3.5" /> Copy</>}</button>
}

const LANGUAGES = [
  { code: 'en', name: 'English' }, { code: 'en-US', name: 'English (US)' }, { code: 'en-GB', name: 'English (UK)' },
  { code: 'es', name: 'Spanish' }, { code: 'fr', name: 'French' }, { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' }, { code: 'pt', name: 'Portuguese' }, { code: 'pt-BR', name: 'Portuguese (Brazil)' },
  { code: 'nl', name: 'Dutch' }, { code: 'ru', name: 'Russian' }, { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' }, { code: 'zh', name: 'Chinese' }, { code: 'zh-TW', name: 'Chinese (Traditional)' },
  { code: 'ar', name: 'Arabic' }, { code: 'hi', name: 'Hindi' }, { code: 'sv', name: 'Swedish' },
  { code: 'da', name: 'Danish' }, { code: 'fi', name: 'Finnish' }, { code: 'no', name: 'Norwegian' },
  { code: 'pl', name: 'Polish' }, { code: 'tr', name: 'Turkish' }, { code: 'th', name: 'Thai' },
  { code: 'vi', name: 'Vietnamese' }, { code: 'id', name: 'Indonesian' }, { code: 'ms', name: 'Malay' },
  { code: 'x-default', name: 'x-default (fallback)' }
]

export default function HreflangGenerator() {
  const [pages, setPages] = useState([{ lang: 'en', url: '' }, { lang: 'es', url: '' }])

  const addPage = () => setPages(prev => [...prev, { lang: '', url: '' }])
  const removePage = (i) => setPages(prev => prev.filter((_, j) => j !== i))
  const updatePage = (i, key, val) => setPages(prev => { const n = [...prev]; n[i] = { ...n[i], [key]: val }; return n })

  const hasXDefault = pages.some(p => p.lang === 'x-default')

  const warnings = useMemo(() => {
    const w = []
    const langs = pages.map(p => p.lang).filter(Boolean)
    const dupes = langs.filter((l, i) => langs.indexOf(l) !== i)
    if (dupes.length) w.push(`Duplicate language: ${[...new Set(dupes)].join(', ')}`)
    if (!hasXDefault) w.push('No x-default set — recommended as a fallback')
    pages.forEach((p, i) => {
      if (p.url && !p.url.startsWith('http')) w.push(`Entry ${i + 1}: URL should be absolute (start with https://)`)
      if (p.lang && !p.url) w.push(`Entry ${i + 1}: Missing URL`)
    })
    return w
  }, [pages, hasXDefault])

  const htmlTags = pages
    .filter(p => p.lang && p.url)
    .map(p => `<link rel="alternate" hreflang="${p.lang}" href="${p.url}" />`)
    .join('\n')

  const httpHeaders = pages
    .filter(p => p.lang && p.url)
    .map(p => `Link: <${p.url}>; rel="alternate"; hreflang="${p.lang}"`)
    .join('\n')

  const sitemapXml = pages.filter(p => p.lang && p.url).length > 0
    ? `<url>\n  <loc>${pages.find(p => p.lang !== 'x-default' && p.url)?.url || pages[0].url}</loc>\n${pages.filter(p => p.lang && p.url).map(p => `  <xhtml:link rel="alternate" hreflang="${p.lang}" href="${p.url}" />`).join('\n')}\n</url>`
    : ''

  const [tab, setTab] = useState('html')
  const output = tab === 'html' ? htmlTags : tab === 'http' ? httpHeaders : sitemapXml

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-900/20 px-4 py-3 text-sm text-rose-700 dark:text-rose-300">
        This tool provides guidance and estimates only. SEO results depend on many factors outside this tool.
      </div>

      <div className="space-y-2">
        {pages.map((page, i) => (
          <div key={i} className="flex items-center gap-2">
            <select value={page.lang} onChange={e => updatePage(i, 'lang', e.target.value)} className="input-field text-xs w-44">
              <option value="">Select language…</option>
              {LANGUAGES.map(l => <option key={l.code} value={l.code}>{l.name} ({l.code})</option>)}
            </select>
            <input type="text" value={page.url} onChange={e => updatePage(i, 'url', e.target.value)} className="input-field text-xs flex-1" placeholder="https://example.com/page" />
            {pages.length > 2 && <button onClick={() => removePage(i)} className="text-red-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>}
          </div>
        ))}
        <button onClick={addPage} className="btn-secondary text-xs flex items-center gap-1"><Plus className="w-3 h-3" /> Add language version</button>
      </div>

      {warnings.length > 0 && (
        <div className="rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 p-3 space-y-1">
          {warnings.map((w, i) => <p key={i} className="text-xs text-amber-700 dark:text-amber-300">⚠ {w}</p>)}
        </div>
      )}

      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex gap-1">
            {['html', 'http', 'sitemap'].map(t => (
              <button key={t} onClick={() => setTab(t)} className={`px-3 py-1 text-xs rounded-full border ${tab === t ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700'}`}>
                {t === 'html' ? 'HTML Tags' : t === 'http' ? 'HTTP Headers' : 'Sitemap XML'}
              </button>
            ))}
          </div>
          <CopyBtn text={output} />
        </div>
        <pre className="textarea-field min-h-[100px] whitespace-pre-wrap text-xs bg-gray-50 dark:bg-gray-800 overflow-x-auto">{output || 'Add language/URL pairs above to generate tags.'}</pre>
      </div>
    </div>
  )
}
