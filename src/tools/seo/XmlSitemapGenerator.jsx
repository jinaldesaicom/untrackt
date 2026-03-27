import { useState, useMemo } from 'react'
import { Copy, Check, Download, Plus, Trash2 } from 'lucide-react'

const CHANGE_FREQS = ['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never']

function CopyBtn({ text }) {
  const [copied, setCopied] = useState(false)
  const copy = () => { navigator.clipboard.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1500) }) }
  return <button onClick={copy} className="btn-secondary flex items-center gap-1.5 text-xs">{copied ? <><Check className="w-3.5 h-3.5" /> Copied</> : <><Copy className="w-3.5 h-3.5" /> Copy</>}</button>
}

const today = new Date().toISOString().split('T')[0]

const emptyUrl = () => ({ url: '', lastmod: today, changefreq: 'monthly', priority: '0.5' })

export default function XmlSitemapGenerator() {
  const [baseUrl, setBaseUrl] = useState('')
  const [urls, setUrls] = useState([emptyUrl()])
  const [bulkInput, setBulkInput] = useState('')
  const [showBulk, setShowBulk] = useState(false)

  const updateUrl = (idx, field, value) => {
    const next = [...urls]
    next[idx] = { ...next[idx], [field]: value }
    setUrls(next)
  }

  const removeUrl = (idx) => setUrls(urls.filter((_, i) => i !== idx))

  const addBulkUrls = () => {
    const lines = bulkInput.split('\n').map(l => l.trim()).filter(Boolean)
    const newUrls = lines.map(url => ({ ...emptyUrl(), url }))
    setUrls([...urls, ...newUrls].slice(0, 200))
    setBulkInput('')
    setShowBulk(false)
  }

  const resolveUrl = (path) => {
    if (!path) return ''
    if (path.startsWith('http')) return path
    const base = baseUrl.replace(/\/+$/, '')
    return base ? `${base}${path.startsWith('/') ? '' : '/'}${path}` : path
  }

  const { xml, warnings } = useMemo(() => {
    const w = []
    const seen = new Set()
    const validUrls = urls.filter(u => u.url.trim())

    validUrls.forEach(u => {
      const resolved = resolveUrl(u.url)
      if (seen.has(resolved)) w.push(`Duplicate URL: ${resolved}`)
      seen.add(resolved)
      if (!u.url.startsWith('/') && !u.url.startsWith('http')) w.push(`"${u.url}" should start with / or http`)
    })
    if (validUrls.length > 50000) w.push('Sitemaps should contain fewer than 50,000 URLs')

    let x = '<?xml version="1.0" encoding="UTF-8"?>\n'
    x += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    validUrls.forEach(u => {
      const resolved = resolveUrl(u.url)
      x += '  <url>\n'
      x += `    <loc>${escapeXml(resolved)}</loc>\n`
      if (u.lastmod) x += `    <lastmod>${u.lastmod}</lastmod>\n`
      x += `    <changefreq>${u.changefreq}</changefreq>\n`
      x += `    <priority>${u.priority}</priority>\n`
      x += '  </url>\n'
    })
    x += '</urlset>'
    return { xml: x, warnings: w }
  }, [urls, baseUrl])

  const downloadFile = () => {
    const blob = new Blob([xml], { type: 'application/xml' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'sitemap.xml'
    a.click()
    URL.revokeObjectURL(url)
  }

  const urlCount = urls.filter(u => u.url.trim()).length

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-900/20 px-4 py-3 text-sm text-rose-700 dark:text-rose-300">
        This tool provides guidance and estimates only. SEO results depend on many factors outside this tool.
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">Base URL (optional, prefixed to relative paths)</label>
        <input type="text" value={baseUrl} onChange={e => setBaseUrl(e.target.value)} className="input-field" placeholder="https://example.com" />
      </div>

      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">URLs ({urlCount}/200)</h3>
        <div className="flex gap-2">
          <button onClick={() => setShowBulk(!showBulk)} className="btn-secondary text-xs">{showBulk ? 'Cancel' : 'Bulk import'}</button>
          {urls.length < 200 && <button onClick={() => setUrls([...urls, emptyUrl()])} className="btn-secondary text-xs flex items-center gap-1"><Plus className="w-3 h-3" /> Add URL</button>}
        </div>
      </div>

      {showBulk && (
        <div className="space-y-2">
          <textarea value={bulkInput} onChange={e => setBulkInput(e.target.value)} className="textarea-field min-h-[100px]" placeholder="Paste URLs, one per line..." />
          <button onClick={addBulkUrls} className="btn-primary text-xs">Import URLs</button>
        </div>
      )}

      <div className="space-y-2 max-h-[400px] overflow-y-auto">
        {urls.map((u, idx) => (
          <div key={idx} className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-3">
            <div className="flex items-start gap-2">
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-4 gap-2">
                <div className="sm:col-span-2">
                  <input type="text" value={u.url} onChange={e => updateUrl(idx, 'url', e.target.value)} className="input-field text-xs" placeholder="/about or https://..." />
                </div>
                <div>
                  <select value={u.changefreq} onChange={e => updateUrl(idx, 'changefreq', e.target.value)} className="input-field text-xs">
                    {CHANGE_FREQS.map(f => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>
                <div className="flex gap-2">
                  <input type="date" value={u.lastmod} onChange={e => updateUrl(idx, 'lastmod', e.target.value)} className="input-field text-xs flex-1" />
                  <select value={u.priority} onChange={e => updateUrl(idx, 'priority', e.target.value)} className="input-field text-xs w-16">
                    {[0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1.0].map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
              </div>
              <button onClick={() => removeUrl(idx)} className="text-red-400 hover:text-red-600 mt-1"><Trash2 className="w-3.5 h-3.5" /></button>
            </div>
          </div>
        ))}
      </div>

      {warnings.length > 0 && (
        <div className="rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 px-4 py-3 text-sm text-amber-700 dark:text-amber-300">
          {warnings.map((w, i) => <p key={i}>• {w}</p>)}
        </div>
      )}

      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Generated Sitemap</h3>
          <div className="flex gap-2">
            <CopyBtn text={xml} />
            <button onClick={downloadFile} className="btn-secondary flex items-center gap-1.5 text-xs"><Download className="w-3.5 h-3.5" /> Download</button>
          </div>
        </div>
        <pre className="textarea-field min-h-[150px] whitespace-pre-wrap text-xs bg-gray-50 dark:bg-gray-800 overflow-x-auto">{xml}</pre>
      </div>
    </div>
  )
}

function escapeXml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;')
}
