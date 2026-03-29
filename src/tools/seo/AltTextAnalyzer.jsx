import { useState, useMemo } from 'react'

export default function AltTextAnalyzer() {
  const [altText, setAltText] = useState('')
  const [context, setContext] = useState('')
  const [imageType, setImageType] = useState('informative')

  const analysis = useMemo(() => {
    if (!altText.trim()) return null
    const text = altText.trim()
    const words = text.split(/\s+/).filter(Boolean)
    const charLen = text.length
    const wordCount = words.length

    const issues = []
    const good = []

    // Length checks
    if (charLen < 10) issues.push({ type: 'error', msg: 'Too short — alt text should be at least a few words' })
    else if (charLen > 125) issues.push({ type: 'warning', msg: `${charLen} characters — aim for under 125 for screen reader compatibility` })
    else good.push(`Good length: ${charLen} characters`)

    // Starts with "image of", "picture of", etc.
    const badStarts = ['image of', 'picture of', 'photo of', 'graphic of', 'screenshot of', 'icon of', 'img']
    const lower = text.toLowerCase()
    const badStart = badStarts.find(s => lower.startsWith(s))
    if (badStart) issues.push({ type: 'warning', msg: `Starts with "${badStart}" — screen readers already announce it as an image` })
    else good.push('Does not start with redundant "image of" or "picture of"')

    // File extension
    const extMatch = text.match(/\.(jpg|jpeg|png|gif|svg|webp|bmp|tiff)/i)
    if (extMatch) issues.push({ type: 'error', msg: `Contains file extension ".${extMatch[1]}" — use descriptive text instead` })

    // All caps
    if (text === text.toUpperCase() && wordCount > 1) issues.push({ type: 'warning', msg: 'ALL CAPS — screen readers may spell it out letter by letter' })

    // Keyword stuffing (same word 3+ times)
    const wordFreq = {}
    words.forEach(w => { const k = w.toLowerCase().replace(/[^a-z]/g, ''); if (k.length > 2) wordFreq[k] = (wordFreq[k] || 0) + 1 })
    const stuffed = Object.entries(wordFreq).filter(([, c]) => c >= 3)
    if (stuffed.length) issues.push({ type: 'warning', msg: `Possible keyword stuffing: "${stuffed[0][0]}" appears ${stuffed[0][1]} times` })

    // Decorative image check
    if (imageType === 'decorative') {
      if (text.length > 0) issues.push({ type: 'info', msg: 'Decorative images should use alt="" (empty) — screen readers will skip them' })
    }

    // Context relevance (basic)
    if (context.trim()) {
      const contextWords = new Set(context.toLowerCase().split(/\s+/).filter(w => w.length > 3))
      const altWords = new Set(lower.split(/\s+/).filter(w => w.length > 3))
      const overlap = [...altWords].filter(w => contextWords.has(w))
      if (overlap.length > 0) good.push(`Contextually relevant — shares terms: ${overlap.slice(0, 5).join(', ')}`)
      else issues.push({ type: 'info', msg: 'No keyword overlap with page context — consider aligning alt text with surrounding content' })
    }

    // Ends with period
    if (text.endsWith('.')) good.push('Ends with a period — good for screen reader pacing')
    else issues.push({ type: 'info', msg: 'Consider ending with a period for better screen reader pacing' })

    const score = Math.max(0, Math.min(100, 100 - issues.filter(i => i.type === 'error').length * 30 - issues.filter(i => i.type === 'warning').length * 15 - issues.filter(i => i.type === 'info').length * 5 + good.length * 5))

    return { charLen, wordCount, issues, good, score }
  }, [altText, context, imageType])

  const scoreColor = analysis ? analysis.score >= 80 ? 'text-green-600 dark:text-green-400' : analysis.score >= 50 ? 'text-amber-600 dark:text-amber-400' : 'text-red-600 dark:text-red-400' : ''

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-900/20 px-4 py-3 text-sm text-rose-700 dark:text-rose-300">
        This tool provides guidance and estimates only. SEO results depend on many factors outside this tool.
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Image Type</label>
            <div className="flex gap-2">
              {[{ val: 'informative', label: 'Informative' }, { val: 'decorative', label: 'Decorative' }, { val: 'functional', label: 'Functional (button/link)' }].map(t => (
                <button key={t.val} onClick={() => setImageType(t.val)} className={`px-3 py-1.5 text-xs rounded-full border ${imageType === t.val ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700'}`}>
                  {t.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Alt Text</label>
            <textarea value={altText} onChange={e => setAltText(e.target.value)} className="textarea-field min-h-[80px]" placeholder='e.g. "A golden retriever playing fetch in a sunny park."' />
            <p className="text-xs text-gray-500 mt-1">{altText.length} characters</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Page Context <span className="font-normal text-gray-400">(optional)</span></label>
            <textarea value={context} onChange={e => setContext(e.target.value)} className="textarea-field min-h-[60px]" placeholder="Paste surrounding page text for relevance check" />
          </div>
        </div>

        <div className="space-y-4">
          {analysis && (
            <>
              <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 text-center">
                <p className={`text-4xl font-bold ${scoreColor}`}>{analysis.score}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Quality Score</p>
                <div className="mt-2 flex justify-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                  <span>{analysis.charLen} chars</span>
                  <span>{analysis.wordCount} words</span>
                </div>
              </div>

              {analysis.issues.length > 0 && (
                <div className="space-y-1.5">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-200">Issues</h3>
                  {analysis.issues.map((issue, i) => (
                    <div key={i} className={`rounded-lg px-3 py-2 text-xs ${issue.type === 'error' ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800' : issue.type === 'warning' ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800' : 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800'}`}>
                      {issue.type === 'error' ? '✗' : issue.type === 'warning' ? '⚠' : 'ℹ'} {issue.msg}
                    </div>
                  ))}
                </div>
              )}

              {analysis.good.length > 0 && (
                <div className="space-y-1.5">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-200">Good</h3>
                  {analysis.good.map((g, i) => (
                    <div key={i} className="rounded-lg px-3 py-2 text-xs bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800">✓ {g}</div>
                  ))}
                </div>
              )}
            </>
          )}

          {!analysis && (
            <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-6 text-center text-sm text-gray-400 dark:text-gray-500">
              Enter alt text to analyze
            </div>
          )}
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Alt Text Best Practices</h3>
        <ul className="space-y-1.5 text-xs text-gray-600 dark:text-gray-400">
          <li>• Be specific and descriptive — describe what's in the image</li>
          <li>• Keep it under 125 characters for screen reader compatibility</li>
          <li>• Don't start with "image of" or "picture of" — screen readers already announce it</li>
          <li>• For decorative images, use empty alt (alt="")</li>
          <li>• For functional images (buttons/links), describe the action, not the image</li>
          <li>• Include relevant keywords naturally, but avoid stuffing</li>
          <li>• End with a period for better screen reader pacing</li>
        </ul>
      </div>
    </div>
  )
}
