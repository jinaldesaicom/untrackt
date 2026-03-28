import { useState, useMemo } from 'react'
import { Copy, Check } from 'lucide-react'

function CopyBtn({ text }) {
  const [copied, setCopied] = useState(false)
  const copy = () => { navigator.clipboard.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1500) }) }
  return <button onClick={copy} className="text-xs text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 flex items-center gap-1">{copied ? <><Check className="w-3 h-3" /> Copied</> : <><Copy className="w-3 h-3" /> Copy</>}</button>
}

function getLenStatus(len) {
  if (len === 0) return { label: 'Empty', color: 'text-gray-400' }
  if (len < 30) return { label: 'Too short', color: 'text-blue-600 dark:text-blue-400' }
  if (len <= 60) return { label: 'Optimal', color: 'text-green-600 dark:text-green-400' }
  if (len <= 70) return { label: 'Too long', color: 'text-amber-600 dark:text-amber-400' }
  return { label: 'Will be truncated', color: 'text-red-600 dark:text-red-400' }
}

export default function TitleTagChecker() {
  const [title, setTitle] = useState('')
  const [keyword, setKeyword] = useState('')
  const [mobilePreview, setMobilePreview] = useState(false)

  const analysis = useMemo(() => {
    const len = title.length
    const words = title.trim().split(/\s+/).filter(Boolean).length
    const pixelWidth = Math.round(len * 6)
    const status = getLenStatus(len)

    const kw = keyword.trim().toLowerCase()
    let kwPosition = -1
    let startsWithKw = false
    if (kw && title.toLowerCase().includes(kw)) {
      kwPosition = title.toLowerCase().indexOf(kw)
      startsWithKw = kwPosition < 3
    }

    return { len, words, pixelWidth, status, kw, kwPosition, startsWithKw }
  }, [title, keyword])

  const desktopTruncated = title.length > 60 ? title.slice(0, 57) + '...' : title
  const mobileTruncated = title.length > 50 ? title.slice(0, 47) + '...' : title

  const barPercent = Math.min(100, (analysis.pixelWidth / 600) * 100)
  const barColor = analysis.pixelWidth <= 600 ? 'bg-green-500' : 'bg-red-500'

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-900/20 px-4 py-3 text-sm text-rose-700 dark:text-rose-300">
        This tool provides guidance and estimates only. SEO results depend on many factors outside this tool.
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">Title tag</label>
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Enter your title tag text..." className="input-field" maxLength={200} />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">Target keyword (optional)</label>
        <input type="text" value={keyword} onChange={e => setKeyword(e.target.value)} placeholder="e.g. best running shoes" className="input-field" />
      </div>

      {title && (
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
              <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Pixel Width</p>
              <p className={`mt-1 text-2xl font-bold ${analysis.pixelWidth <= 600 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>~{analysis.pixelWidth}px</p>
            </div>
            {analysis.kw && (
              <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 text-center">
                <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Keyword</p>
                <p className={`mt-1 text-sm font-bold ${analysis.kwPosition >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {analysis.kwPosition >= 0 ? `Position ${analysis.kwPosition}` : 'Not found'}
                </p>
                {analysis.kwPosition >= 0 && (
                  <p className={`text-xs mt-0.5 ${analysis.startsWithKw ? 'text-green-600 dark:text-green-400' : 'text-amber-600 dark:text-amber-400'}`}>
                    {analysis.startsWithKw ? 'Front-loaded ✓' : 'Not front-loaded'}
                  </p>
                )}
              </div>
            )}
          </div>

          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Pixel width (600px Google desktop cutoff)</p>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className={`h-full rounded-full transition-all duration-300 ${barColor}`} style={{ width: `${barPercent}%` }} />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">SERP Preview</h3>
              <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-600 dark:text-gray-400">
                <input type="checkbox" checked={mobilePreview} onChange={() => setMobilePreview(!mobilePreview)} className="w-4 h-4 rounded accent-indigo-600" />
                Mobile
              </label>
            </div>
            <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-5">
              <p className="text-xl text-blue-700 dark:text-blue-400 hover:underline cursor-pointer font-normal leading-tight" style={{ fontFamily: 'Arial, sans-serif' }}>
                {mobilePreview ? mobileTruncated : desktopTruncated || 'Your Title Tag Here'}
              </p>
              <p className="text-sm text-green-700 dark:text-green-400 mt-1" style={{ fontFamily: 'Arial, sans-serif' }}>
                https://yoursite.com › page
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5" style={{ fontFamily: 'Arial, sans-serif' }}>
                Meta description would appear here. Write a compelling description to improve click-through rate.
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Suggestions</h3>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1.5">
              {analysis.kw && analysis.kwPosition < 0 && <li className="text-amber-600 dark:text-amber-400">• Include your target keyword in the title</li>}
              {analysis.kw && analysis.kwPosition >= 0 && !analysis.startsWithKw && <li className="text-amber-600 dark:text-amber-400">• Move keyword closer to the start for better rankings</li>}
              {analysis.len > 60 && <li className="text-amber-600 dark:text-amber-400">• Keep under 60 characters to avoid truncation</li>}
              {analysis.len < 30 && analysis.len > 0 && <li className="text-blue-600 dark:text-blue-400">• Title is short — add more descriptive words</li>}
              <li>• Make it compelling and descriptive for click-throughs</li>
              <li>• Include your brand name at the end (e.g. "| Brand")</li>
            </ul>
          </div>
        </>
      )}
    </div>
  )
}
