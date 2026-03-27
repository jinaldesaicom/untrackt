import { useState, useMemo } from 'react'
import { Copy, Check } from 'lucide-react'

function CopyBtn({ text }) {
  const [copied, setCopied] = useState(false)
  const copy = () => { navigator.clipboard.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1500) }) }
  return <button onClick={copy} className="btn-secondary flex items-center gap-1.5 text-xs">{copied ? <><Check className="w-3.5 h-3.5" /> Copied</> : <><Copy className="w-3.5 h-3.5" /> Copy</>}</button>
}

export default function CanonicalTagGenerator() {
  const [tab, setTab] = useState('single')

  // Single mode
  const [canonicalUrl, setCanonicalUrl] = useState('')
  const [pageType, setPageType] = useState('self-referencing')
  const [alternateUrl, setAlternateUrl] = useState('')

  // Batch mode
  const [batchInput, setBatchInput] = useState('')

  // Audit mode
  const [auditHtml, setAuditHtml] = useState('')

  const singleTag = useMemo(() => {
    const url = pageType === 'cross-domain' && alternateUrl ? alternateUrl : canonicalUrl
    if (!url) return ''
    return `<link rel="canonical" href="${url}" />`
  }, [canonicalUrl, pageType, alternateUrl])

  const singleWarnings = useMemo(() => {
    const w = []
    const url = pageType === 'cross-domain' && alternateUrl ? alternateUrl : canonicalUrl
    if (url && !url.startsWith('https://') && !url.startsWith('http://')) w.push('URL should be absolute (start with https://)')
    if (url && url.includes('?')) w.push('URL contains query parameters — canonicals should typically be clean URLs')
    if (url && url !== url.toLowerCase() && !url.includes('://')) w.push('URL contains uppercase characters — use lowercase for consistency')
    if (url && url.endsWith('/') && url.split('/').length > 4) w.push('Trailing slash detected — ensure consistency across your site')
    if (pageType === 'cross-domain' && !alternateUrl) w.push('Cross-domain canonical requires a target URL')
    return w
  }, [canonicalUrl, pageType, alternateUrl])

  const batchResults = useMemo(() => {
    if (!batchInput.trim()) return []
    return batchInput.trim().split('\n').filter(Boolean).map(line => {
      const parts = line.split(',').map(s => s.trim())
      const page = parts[0] || ''
      const canonical = parts[1] || parts[0] || ''
      return { page, canonical, tag: `<link rel="canonical" href="${canonical}" />` }
    })
  }, [batchInput])

  const batchOutput = batchResults.map(r => `<!-- ${r.page} -->\n${r.tag}`).join('\n\n')

  const auditResults = useMemo(() => {
    if (!auditHtml.trim()) return null
    const canonicalMatch = auditHtml.match(/<link[^>]*rel\s*=\s*["']canonical["'][^>]*href\s*=\s*["']([^"']+)["'][^>]*\/?>/i)
      || auditHtml.match(/<link[^>]*href\s*=\s*["']([^"']+)["'][^>]*rel\s*=\s*["']canonical["'][^>]*\/?>/i)

    const ogUrlMatch = auditHtml.match(/<meta[^>]*property\s*=\s*["']og:url["'][^>]*content\s*=\s*["']([^"']+)["'][^>]*\/?>/i)

    const allCanonicals = auditHtml.match(/<link[^>]*rel\s*=\s*["']canonical["'][^>]*/gi) || []

    const issues = []
    if (!canonicalMatch) issues.push({ type: 'error', msg: 'No canonical tag found on this page' })
    if (allCanonicals.length > 1) issues.push({ type: 'error', msg: `${allCanonicals.length} canonical tags found — only one should exist` })
    if (canonicalMatch && ogUrlMatch && canonicalMatch[1] !== ogUrlMatch[1]) issues.push({ type: 'warning', msg: 'Canonical URL and og:url do not match' })
    if (canonicalMatch) {
      const url = canonicalMatch[1]
      if (!url.startsWith('http')) issues.push({ type: 'error', msg: 'Canonical URL is not absolute' })
      if (url.includes('?')) issues.push({ type: 'warning', msg: 'Canonical URL contains query parameters' })
    }
    if (canonicalMatch && allCanonicals.length === 1) issues.push({ type: 'good', msg: 'Single canonical tag found — good' })

    return {
      canonical: canonicalMatch ? canonicalMatch[1] : null,
      ogUrl: ogUrlMatch ? ogUrlMatch[1] : null,
      count: allCanonicals.length,
      issues
    }
  }, [auditHtml])

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-900/20 px-4 py-3 text-sm text-rose-700 dark:text-rose-300">
        This tool provides guidance and estimates only. SEO results depend on many factors outside this tool.
      </div>

      <div className="flex gap-1">
        {[{ val: 'single', label: 'Single' }, { val: 'batch', label: 'Batch' }, { val: 'audit', label: 'Audit' }].map(t => (
          <button key={t.val} onClick={() => setTab(t.val)} className={`px-4 py-1.5 text-sm font-medium rounded-full border transition-colors ${tab === t.val ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700'}`}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'single' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Canonical Type</label>
            <div className="flex gap-2">
              {[{ val: 'self-referencing', label: 'Self-Referencing' }, { val: 'cross-domain', label: 'Cross-Domain' }].map(t => (
                <button key={t.val} onClick={() => setPageType(t.val)} className={`px-3 py-1 text-xs rounded-full border ${pageType === t.val ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700'}`}>
                  {t.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Page URL</label>
            <input type="text" value={canonicalUrl} onChange={e => setCanonicalUrl(e.target.value)} className="input-field" placeholder="https://example.com/my-page" />
          </div>
          {pageType === 'cross-domain' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Canonical Target URL</label>
              <input type="text" value={alternateUrl} onChange={e => setAlternateUrl(e.target.value)} className="input-field" placeholder="https://other-domain.com/original-page" />
            </div>
          )}
          {singleWarnings.length > 0 && (
            <div className="space-y-1">{singleWarnings.map((w, i) => <p key={i} className="text-xs text-amber-600 dark:text-amber-400">⚠ {w}</p>)}</div>
          )}
          {singleTag && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Generated Tag</h3>
                <CopyBtn text={singleTag} />
              </div>
              <pre className="textarea-field text-xs bg-gray-50 dark:bg-gray-800 whitespace-pre-wrap">{singleTag}</pre>
            </div>
          )}
        </div>
      )}

      {tab === 'batch' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Batch Input <span className="font-normal text-gray-400">(one per line: page_url or page_url, canonical_url)</span></label>
            <textarea value={batchInput} onChange={e => setBatchInput(e.target.value)} className="textarea-field min-h-[120px] font-mono text-xs" placeholder={"https://example.com/page-1\nhttps://example.com/page-2, https://example.com/canonical-page"} />
          </div>
          {batchResults.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{batchResults.length} Tags Generated</h3>
                <CopyBtn text={batchOutput} />
              </div>
              <pre className="textarea-field text-xs bg-gray-50 dark:bg-gray-800 whitespace-pre-wrap min-h-[100px] max-h-[300px] overflow-y-auto">{batchOutput}</pre>
            </div>
          )}
        </div>
      )}

      {tab === 'audit' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Paste Page HTML</label>
            <textarea value={auditHtml} onChange={e => setAuditHtml(e.target.value)} className="textarea-field min-h-[150px] font-mono text-xs" placeholder="Paste your page's <head> HTML here…" />
          </div>
          {auditResults && (
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-3">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Canonical Tag</p>
                  <p className="text-sm font-mono text-gray-900 dark:text-white truncate mt-1">{auditResults.canonical || '—'}</p>
                </div>
                <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-3">
                  <p className="text-xs text-gray-500 dark:text-gray-400">og:url</p>
                  <p className="text-sm font-mono text-gray-900 dark:text-white truncate mt-1">{auditResults.ogUrl || '—'}</p>
                </div>
                <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-3">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Canonical Tags Found</p>
                  <p className={`text-2xl font-bold ${auditResults.count === 1 ? 'text-green-600' : auditResults.count === 0 ? 'text-red-600' : 'text-amber-600'}`}>{auditResults.count}</p>
                </div>
              </div>
              <div className="space-y-1.5">
                {auditResults.issues.map((issue, i) => (
                  <div key={i} className={`rounded-lg px-3 py-2 text-xs ${issue.type === 'error' ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800' : issue.type === 'warning' ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800' : 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800'}`}>
                    {issue.type === 'error' ? '✗' : issue.type === 'warning' ? '⚠' : '✓'} {issue.msg}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
