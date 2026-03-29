import { useState, useMemo } from 'react'

export default function InternalLinkAnalyzer() {
  const [htmlInput, setHtmlInput] = useState('')
  const [domain, setDomain] = useState('')

  const analysis = useMemo(() => {
    if (!htmlInput.trim()) return null

    const anchorRegex = /<a\s[^>]*href\s*=\s*["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi
    const links = []
    let match
    while ((match = anchorRegex.exec(htmlInput)) !== null) {
      const href = match[1].trim()
      const text = match[2].replace(/<[^>]*>/g, '').trim()
      const fullTag = match[0]
      const hasNofollow = /rel\s*=\s*["'][^"']*nofollow[^"']*["']/i.test(fullTag)
      const hasNewTab = /target\s*=\s*["']_blank["']/i.test(fullTag)
      const hasTitle = /title\s*=\s*["'][^"']+["']/i.test(fullTag)

      let type = 'external'
      if (href.startsWith('#')) type = 'anchor'
      else if (href.startsWith('/') || href.startsWith('./') || href.startsWith('../')) type = 'internal'
      else if (domain && href.toLowerCase().includes(domain.toLowerCase())) type = 'internal'
      else if (href.startsWith('mailto:')) type = 'mailto'
      else if (href.startsWith('tel:')) type = 'tel'
      else if (href.startsWith('javascript:')) type = 'javascript'

      links.push({ href, text, type, hasNofollow, hasNewTab, hasTitle })
    }

    const internal = links.filter(l => l.type === 'internal')
    const external = links.filter(l => l.type === 'external')
    const anchors = links.filter(l => l.type === 'anchor')
    const others = links.filter(l => !['internal', 'external', 'anchor'].includes(l.type))

    const issues = []
    links.forEach((l, i) => {
      if (!l.text) issues.push({ type: 'error', msg: `Link ${i + 1} (${l.href.slice(0, 40)}): Empty anchor text — bad for accessibility and SEO` })
      else if (['click here', 'here', 'read more', 'learn more', 'this', 'link'].includes(l.text.toLowerCase())) issues.push({ type: 'warning', msg: `Link ${i + 1}: Generic anchor text "${l.text}" — use descriptive text` })
      if (l.type === 'javascript') issues.push({ type: 'error', msg: `Link ${i + 1}: javascript: href — not crawlable by search engines` })
    })

    // Check for duplicate hrefs
    const hrefCounts = {}
    links.forEach(l => { hrefCounts[l.href] = (hrefCounts[l.href] || 0) + 1 })
    Object.entries(hrefCounts).filter(([, c]) => c > 2).forEach(([href]) => {
      issues.push({ type: 'info', msg: `"${href.slice(0, 50)}" linked ${hrefCounts[href]} times — consolidating may improve link equity distribution` })
    })

    if (links.length > 0 && internal.length === 0) issues.push({ type: 'warning', msg: 'No internal links found — internal linking improves crawlability' })
    if (external.length > 0 && external.every(l => !l.hasNofollow)) issues.push({ type: 'info', msg: 'No external links have nofollow — consider adding for untrusted links' })

    const ratio = links.length > 0 ? (internal.length / links.length * 100).toFixed(1) : 0

    return { links, internal, external, anchors, others, issues, ratio }
  }, [htmlInput, domain])

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-900/20 px-4 py-3 text-sm text-rose-700 dark:text-rose-300">
        This tool provides guidance and estimates only. SEO results depend on many factors outside this tool.
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Your Domain <span className="font-normal text-gray-400">(to identify internal links)</span></label>
            <input type="text" value={domain} onChange={e => setDomain(e.target.value)} className="input-field" placeholder="example.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Paste HTML Content</label>
            <textarea value={htmlInput} onChange={e => setHtmlInput(e.target.value)} className="textarea-field min-h-[200px] font-mono text-xs" placeholder="Paste your page HTML here…" />
          </div>
        </div>

        <div className="space-y-3">
          {analysis ? (
            <>
              <div className="grid grid-cols-2 gap-2">
                <StatCard label="Total Links" value={analysis.links.length} />
                <StatCard label="Internal" value={analysis.internal.length} color="green" />
                <StatCard label="External" value={analysis.external.length} color="blue" />
                <StatCard label="Anchors" value={analysis.anchors.length} color="gray" />
              </div>
              <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-3 text-center">
                <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{analysis.ratio}%</p>
                <p className="text-xs text-gray-500">Internal Link Ratio</p>
              </div>
            </>
          ) : (
            <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-6 text-center text-sm text-gray-400">
              Paste HTML to analyze
            </div>
          )}
        </div>
      </div>

      {analysis && analysis.issues.length > 0 && (
        <div className="space-y-1.5">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Issues & Suggestions</h3>
          {analysis.issues.map((issue, i) => (
            <div key={i} className={`rounded-lg px-3 py-2 text-xs ${issue.type === 'error' ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800' : issue.type === 'warning' ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800' : 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800'}`}>
              {issue.type === 'error' ? '✗' : issue.type === 'warning' ? '⚠' : 'ℹ'} {issue.msg}
            </div>
          ))}
        </div>
      )}

      {analysis && analysis.links.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Link Details</h3>
          <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
            <table className="w-full text-xs">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="text-left p-2 text-gray-500 dark:text-gray-400 font-medium">#</th>
                  <th className="text-left p-2 text-gray-500 dark:text-gray-400 font-medium">Anchor Text</th>
                  <th className="text-left p-2 text-gray-500 dark:text-gray-400 font-medium">URL</th>
                  <th className="text-left p-2 text-gray-500 dark:text-gray-400 font-medium">Type</th>
                  <th className="text-left p-2 text-gray-500 dark:text-gray-400 font-medium">Attrs</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {analysis.links.slice(0, 100).map((l, i) => (
                  <tr key={i} className="bg-white dark:bg-gray-900">
                    <td className="p-2 text-gray-400">{i + 1}</td>
                    <td className="p-2 text-gray-700 dark:text-gray-300 max-w-[150px] truncate">{l.text || <span className="text-red-400 italic">empty</span>}</td>
                    <td className="p-2 text-gray-500 dark:text-gray-400 max-w-[200px] truncate font-mono">{l.href}</td>
                    <td className="p-2">
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${l.type === 'internal' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' : l.type === 'external' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'}`}>
                        {l.type}
                      </span>
                    </td>
                    <td className="p-2 space-x-1">
                      {l.hasNofollow && <span className="text-amber-500 text-[10px]">nofollow</span>}
                      {l.hasNewTab && <span className="text-gray-400 text-[10px]">_blank</span>}
                      {l.hasTitle && <span className="text-green-500 text-[10px]">title</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {analysis.links.length > 100 && <p className="text-xs text-gray-400 mt-1">Showing first 100 of {analysis.links.length} links</p>}
        </div>
      )}
    </div>
  )
}

function StatCard({ label, value, color = 'indigo' }) {
  const colorMap = { indigo: 'text-indigo-600 dark:text-indigo-400', green: 'text-green-600 dark:text-green-400', blue: 'text-blue-600 dark:text-blue-400', gray: 'text-gray-600 dark:text-gray-400' }
  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-3 text-center">
      <p className={`text-xl font-bold ${colorMap[color]}`}>{value}</p>
      <p className="text-[10px] text-gray-500 dark:text-gray-400">{label}</p>
    </div>
  )
}
