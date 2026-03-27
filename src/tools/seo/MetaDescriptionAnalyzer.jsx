import { useState, useMemo } from 'react'
import { Copy, Check } from 'lucide-react'

const CTA_WORDS = ['learn', 'discover', 'find', 'get', 'try', 'start', 'see', 'read', 'explore', 'check', 'compare', 'save', 'download', 'sign up', 'join', 'buy', 'shop', 'order', 'grab', 'claim', 'unlock', 'boost', 'improve']

function CopyBtn({ text }) {
  const [copied, setCopied] = useState(false)
  const copy = () => { navigator.clipboard.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1500) }) }
  return <button onClick={copy} className="text-xs text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 flex items-center gap-1">{copied ? <><Check className="w-3 h-3" /> Copied</> : <><Copy className="w-3 h-3" /> Copy</>}</button>
}

function getLenStatus(len) {
  if (len === 0) return { label: 'Empty', color: 'text-gray-400' }
  if (len < 120) return { label: 'Too short', color: 'text-blue-600 dark:text-blue-400' }
  if (len <= 160) return { label: 'Optimal', color: 'text-green-600 dark:text-green-400' }
  if (len <= 170) return { label: 'Too long', color: 'text-amber-600 dark:text-amber-400' }
  return { label: 'Will be truncated', color: 'text-red-600 dark:text-red-400' }
}

function countPassiveVoice(text) {
  const beVerbs = /\b(is|are|was|were|been|being|be)\b/gi
  const pastParticiple = /\b(is|are|was|were|been|being|be)\s+\w+ed\b/gi
  const matches = text.match(pastParticiple)
  return matches ? matches.length : 0
}

export default function MetaDescriptionAnalyzer() {
  const [desc, setDesc] = useState('')
  const [keyword, setKeyword] = useState('')
  const [pageUrl, setPageUrl] = useState('')

  const analysis = useMemo(() => {
    const len = desc.length
    const words = desc.trim().split(/\s+/).filter(Boolean).length
    const status = getLenStatus(len)
    const lower = desc.toLowerCase()

    const kw = keyword.trim().toLowerCase()
    const kwFound = kw ? lower.includes(kw) : false
    const kwCount = kw ? (lower.split(kw).length - 1) : 0

    const hasCta = CTA_WORDS.some(w => lower.includes(w.toLowerCase()))
    const passiveCount = countPassiveVoice(desc)

    const avgWordLen = words > 0 ? desc.replace(/\s+/g, '').length / words : 0
    let readingLevel = 'Easy'
    if (avgWordLen > 6) readingLevel = 'Moderate'
    if (avgWordLen > 8) readingLevel = 'Complex'

    return { len, words, status, kwFound, kwCount, hasCta, passiveCount, readingLevel, kw }
  }, [desc, keyword])

  const truncated = desc.length > 160 ? desc.slice(0, 157) + '...' : desc

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-900/20 px-4 py-3 text-sm text-rose-700 dark:text-rose-300">
        This tool provides guidance and estimates only. SEO results depend on many factors outside this tool.
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">Meta description</label>
        <textarea value={desc} onChange={e => setDesc(e.target.value)} placeholder="Enter your meta description..." className="textarea-field min-h-[100px]" maxLength={300} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">Target keyword (optional)</label>
          <input type="text" value={keyword} onChange={e => setKeyword(e.target.value)} placeholder="e.g. seo tools" className="input-field" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">Page URL (optional)</label>
          <input type="text" value={pageUrl} onChange={e => setPageUrl(e.target.value)} placeholder="https://example.com/page" className="input-field" />
        </div>
      </div>

      {desc && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 text-center">
              <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Characters</p>
              <p className={`mt-1 text-2xl font-bold ${analysis.status.color}`}>{analysis.len}</p>
              <p className={`text-xs mt-0.5 font-medium ${analysis.status.color}`}>{analysis.status.label}</p>
            </div>
            <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 text-center">
              <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Words</p>
              <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">{analysis.words}</p>
            </div>
            <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 text-center">
              <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">CTA Found</p>
              <p className={`mt-1 text-2xl font-bold ${analysis.hasCta ? 'text-green-600 dark:text-green-400' : 'text-amber-600 dark:text-amber-400'}`}>
                {analysis.hasCta ? 'Yes' : 'No'}
              </p>
            </div>
            {analysis.kw && (
              <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 text-center">
                <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Keyword</p>
                <p className={`mt-1 text-2xl font-bold ${analysis.kwFound ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {analysis.kwFound ? `×${analysis.kwCount}` : 'Missing'}
                </p>
              </div>
            )}
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Google SERP Preview</h3>
            <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-5">
              <p className="text-xl text-blue-700 dark:text-blue-400 hover:underline cursor-pointer font-normal leading-tight" style={{ fontFamily: 'Arial, sans-serif' }}>
                Page Title — Your Site Name
              </p>
              <p className="text-sm text-green-700 dark:text-green-400 mt-1" style={{ fontFamily: 'Arial, sans-serif' }}>
                {pageUrl || 'https://yoursite.com'} › page
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5" style={{ fontFamily: 'Arial, sans-serif' }}>
                {truncated || 'Your meta description will appear here...'}
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Social Card Preview</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
                <div className="h-32 bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400 text-sm">Image placeholder</div>
                <div className="p-3 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-[10px] uppercase text-gray-500 dark:text-gray-400">{(() => { try { return new URL(pageUrl.startsWith('http') ? pageUrl : `https://${pageUrl}`).hostname } catch { return pageUrl || 'yoursite.com' } })()}</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white mt-0.5">Page Title</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">{truncated}</p>
                </div>
                <p className="text-[10px] text-center text-gray-400 py-1">Facebook / LinkedIn</p>
              </div>
              <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
                <div className="h-40 bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400 text-sm">Large image area</div>
                <div className="p-3 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">Page Title</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">{truncated}</p>
                </div>
                <p className="text-[10px] text-center text-gray-400 py-1">Twitter</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Suggestions</h3>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1.5">
              {analysis.kw && !analysis.kwFound && <li className="text-amber-600 dark:text-amber-400">• Include your target keyword naturally</li>}
              {!analysis.hasCta && <li className="text-amber-600 dark:text-amber-400">• Add a clear call to action (Learn, Discover, Get, etc.)</li>}
              {analysis.len < 120 && analysis.len > 0 && <li className="text-blue-600 dark:text-blue-400">• Description is too short — aim for 120-160 characters</li>}
              {analysis.len > 160 && <li className="text-amber-600 dark:text-amber-400">• Keep between 120-160 characters to avoid truncation</li>}
              {analysis.passiveCount > 0 && <li className="text-amber-600 dark:text-amber-400">• {analysis.passiveCount} passive voice instance(s) detected — use active voice</li>}
              <li>• Be specific about page content</li>
            </ul>
          </div>
        </>
      )}
    </div>
  )
}
