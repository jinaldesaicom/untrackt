import { useState, useMemo } from 'react'
import { Copy, Check } from 'lucide-react'

const STOP_WORDS = new Set([
  'a','about','above','after','again','against','all','am','an','and','any','are','aren\'t','as','at',
  'be','because','been','before','being','below','between','both','but','by','can\'t','cannot','could',
  'couldn\'t','did','didn\'t','do','does','doesn\'t','doing','don\'t','down','during','each','few','for',
  'from','further','get','got','had','hadn\'t','has','hasn\'t','have','haven\'t','having','he','he\'d',
  'he\'ll','he\'s','her','here','here\'s','hers','herself','him','himself','his','how','how\'s','i',
  'i\'d','i\'ll','i\'m','i\'ve','if','in','into','is','isn\'t','it','it\'s','its','itself','let\'s',
  'me','more','most','mustn\'t','my','myself','no','nor','not','of','off','on','once','only','or',
  'other','ought','our','ours','ourselves','out','over','own','same','shan\'t','she','she\'d','she\'ll',
  'she\'s','should','shouldn\'t','so','some','such','than','that','that\'s','the','their','theirs','them',
  'themselves','then','there','there\'s','these','they','they\'d','they\'ll','they\'re','they\'ve','this',
  'those','through','to','too','under','until','up','upon','us','very','was','wasn\'t','we','we\'d',
  'we\'ll','we\'re','we\'ve','were','weren\'t','what','what\'s','when','when\'s','where','where\'s',
  'which','while','who','who\'s','whom','why','why\'s','will','with','won\'t','would','wouldn\'t',
  'you','you\'d','you\'ll','you\'re','you\'ve','your','yours','yourself','yourselves','also','just',
  'like','well','back','even','still','way','take','since','another','however','two','three','four',
  'five','first','second','new','old','high','long','make','many','much','one','use','may','said',
  'each','tell','set','put','say','help','every','good','great','know','want','give','find','think',
  'look','need','see','come','go','made','right','look','come','think','say','help','show','try',
  'ask','using','used','really','already','around','thing','things','going','does','been','never',
  'often','always','sometimes','usually','rather','quite','enough','able','getting','got','keep',
  'keep','keeps','kept', 'etc','via','vs','ie','eg','per','re','able','across','almost','among',
  'along','became','become','becomes','beside','besides','beyond','cannot','eg','else','everywhere',
  'following','former','hence','hereafter','hereby','herein','hereupon','ie','indeed','instead',
  'latter','meanwhile','moreover','namely','neither','nevertheless','nobody','none','nonetheless',
  'nothing','otherwise','perhaps','rather','regarding','several','shall','somebody','somehow',
  'someone','something','somewhat','therefore','thereby','thus','toward','towards','unless',
  'unlike','various','whatever','whatsoever','whenever','whereas','whereby','wherever','whether',
  'whichever','whoever','whole','whose','within','without',
])

function tokenize(text) {
  return text.toLowerCase().replace(/<[^>]*>/g, ' ').replace(/[^a-z0-9'-]/g, ' ').split(/\s+/).filter(w => w.length > 1)
}

function getDensityRating(density) {
  if (density < 0.5) return { label: 'Too low', color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/30' }
  if (density <= 2.5) return { label: 'Optimal', color: 'text-green-600 dark:text-green-400', bg: 'bg-green-50 dark:bg-green-900/30' }
  if (density <= 4) return { label: 'High', color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-900/30' }
  return { label: 'Keyword stuffing risk', color: 'text-red-600 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-900/30' }
}

function CopyBtn({ text }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => { navigator.clipboard.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1500) }) }
  return <button onClick={handleCopy} className="text-xs text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 flex items-center gap-1">{copied ? <><Check className="w-3 h-3" /> Copied</> : <><Copy className="w-3 h-3" /> Copy</>}</button>
}

export default function KeywordDensityAnalyzer() {
  const [content, setContent] = useState('')
  const [keyword, setKeyword] = useState('')
  const [ignoreStopWords, setIgnoreStopWords] = useState(true)
  const [sortBy, setSortBy] = useState('count')

  const analysis = useMemo(() => {
    const words = tokenize(content)
    const totalWords = words.length
    if (totalWords === 0) return null

    const targetKw = keyword.trim().toLowerCase()
    const kwCount = targetKw ? words.filter(w => w === targetKw).length : 0
    const kwDensity = targetKw ? (kwCount / totalWords) * 100 : 0

    const freq = {}
    words.forEach(w => {
      if (ignoreStopWords && STOP_WORDS.has(w)) return
      freq[w] = (freq[w] || 0) + 1
    })

    const topKeywords = Object.entries(freq)
      .map(([word, count]) => ({ word, count, density: (count / totalWords) * 100 }))
      .sort((a, b) => sortBy === 'density' ? b.density - a.density : b.count - a.count)
      .slice(0, 20)

    let prominence = 0
    if (targetKw) {
      const firstParagraph = content.split(/\n\n|\r\n\r\n/)[0] || ''
      const fpWords = tokenize(firstParagraph)
      const fpCount = fpWords.filter(w => w === targetKw).length
      const hasH1 = /<h1[^>]*>.*?$/mi.test(content) && content.toLowerCase().includes(targetKw)
      const hasH2 = /<h2[^>]*>.*?$/mi.test(content) && content.toLowerCase().includes(targetKw)
      prominence = Math.min(100, (fpCount > 0 ? 40 : 0) + (hasH1 ? 30 : 0) + (hasH2 ? 20 : 0) + (kwDensity > 0.5 ? 10 : 0))
    }

    return { totalWords, kwCount, kwDensity, topKeywords, prominence, targetKw }
  }, [content, keyword, ignoreStopWords, sortBy])

  const rating = analysis ? getDensityRating(analysis.kwDensity) : null

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-900/20 px-4 py-3 text-sm text-rose-700 dark:text-rose-300">
        This tool provides guidance and estimates only. SEO results depend on many factors outside this tool.
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">Content</label>
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="Paste your article or content here..."
          className="textarea-field min-h-[200px]"
          spellCheck={false}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">Target keyword (optional)</label>
          <input type="text" value={keyword} onChange={e => setKeyword(e.target.value)} placeholder="e.g. keyword density" className="input-field" />
        </div>
        <div className="flex items-end gap-4">
          <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 dark:text-gray-300">
            <input type="checkbox" checked={ignoreStopWords} onChange={() => setIgnoreStopWords(!ignoreStopWords)} className="w-4 h-4 rounded accent-indigo-600" />
            Ignore stop words
          </label>
        </div>
      </div>

      {analysis && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 text-center">
              <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Words</p>
              <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">{analysis.totalWords.toLocaleString()}</p>
            </div>
            {analysis.targetKw && (
              <>
                <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 text-center">
                  <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Keyword Count</p>
                  <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">{analysis.kwCount}</p>
                </div>
                <div className={`rounded-xl border p-4 text-center ${rating.bg}`}>
                  <p className="text-xs uppercase tracking-wide opacity-80">Density</p>
                  <p className={`mt-1 text-2xl font-bold ${rating.color}`}>{analysis.kwDensity.toFixed(2)}%</p>
                  <p className={`text-xs mt-0.5 font-medium ${rating.color}`}>{rating.label}</p>
                </div>
                <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 text-center">
                  <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Prominence</p>
                  <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">{analysis.prominence}%</p>
                </div>
              </>
            )}
          </div>

          {analysis.targetKw && (
            <div className={`rounded-xl border p-4 ${rating.bg}`}>
              <h3 className={`text-sm font-semibold ${rating.color}`}>Recommendation</h3>
              <p className={`text-sm mt-1 ${rating.color}`}>
                {analysis.kwDensity < 0.5 && 'Consider adding more mentions of your target keyword.'}
                {analysis.kwDensity >= 0.5 && analysis.kwDensity <= 2.5 && 'Good keyword density! Your target keyword usage looks optimal.'}
                {analysis.kwDensity > 2.5 && analysis.kwDensity <= 4 && 'Keyword density is getting high — consider reducing frequency slightly.'}
                {analysis.kwDensity > 4 && 'Risk of keyword stuffing — reduce frequency to appear natural.'}
              </p>
            </div>
          )}

          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Top Keywords</h3>
              <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="input-field w-auto text-xs">
                <option value="count">Sort by count</option>
                <option value="density">Sort by density</option>
              </select>
            </div>
            <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-800">
                    <th className="text-left px-4 py-2 text-gray-600 dark:text-gray-300 font-medium">Keyword</th>
                    <th className="text-right px-4 py-2 text-gray-600 dark:text-gray-300 font-medium">Count</th>
                    <th className="text-right px-4 py-2 text-gray-600 dark:text-gray-300 font-medium">Density %</th>
                  </tr>
                </thead>
                <tbody>
                  {analysis.topKeywords.map(kw => (
                    <tr
                      key={kw.word}
                      className={`border-t border-gray-100 dark:border-gray-800 ${analysis.targetKw === kw.word ? 'bg-indigo-50 dark:bg-indigo-900/20 font-semibold' : ''}`}
                    >
                      <td className="px-4 py-2 text-gray-900 dark:text-gray-100">{kw.word}</td>
                      <td className="px-4 py-2 text-right text-gray-700 dark:text-gray-300">{kw.count}</td>
                      <td className="px-4 py-2 text-right text-gray-700 dark:text-gray-300">{kw.density.toFixed(2)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
