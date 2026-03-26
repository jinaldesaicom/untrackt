import { useState } from 'react'
import SEOHead from '../../components/SEOHead.jsx'
import DisclaimerCard from '../../components/DisclaimerCard.jsx'

const STOP_WORDS = new Set([
  'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'from',
  'as', 'is', 'was', 'are', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did',
  'will', 'would', 'should', 'could', 'can', 'may', 'might', 'must', 'shall', 'this', 'that',
  'these', 'those', 'it', 'its', 'their', 'what', 'which', 'who', 'whom', 'where', 'when', 'why', 'how',
])

export default function ContractAnalyzer() {
  const [text, setText] = useState('')

  // Calculate metrics
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0
  const charCount = text.length
  const pageEstimate = Math.ceil(wordCount / 250)
  const readingTimeMinutes = Math.ceil(wordCount / 200)

  // Sentence analysis
  const sentences = text.match(/[^.!?]+[.!?]+/g) || []
  const avgWordsPerSentence = sentences.length > 0 ? wordCount / sentences.length : 0

  // Flesch-Kincaid Grade
  const syllables = (text.match(/[aeiouAEIOU]+/g) || []).length
  const gradeLevel = Math.round(0.39 * wordCount + 11.8 * syllables - 15.59)

  // Passive voice detection (simplified)
  const passivePattern = /\b(?:is|are|was|were|been|be)\s+\b(?:by\s+)?/gi
  const passiveSentences = text.match(passivePattern) ? (text.match(passivePattern) || []).length : 0
  const passivePercent = sentences.length > 0 ? (passiveSentences / sentences.length * 100).toFixed(1) : 0

  // Keyword frequency
  const words = text.toLowerCase().match(/\b\w+\b/g) || []
  const freq = {}
  words.forEach(word => {
    if (word.length > 3 && !STOP_WORDS.has(word)) {
      freq[word] = (freq[word] || 0) + 1
    }
  })
  const topKeywords = Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)

  // Long sentences (>40 words)
  const longSentences = sentences.filter(s => s.trim().split(/\s+/).length > 40)

  // ALL CAPS phrases
  const capsPattern = /\b[A-Z]{2,}(?:\s+[A-Z]{2,})*\b/g
  const capsPhrases = text.match(capsPattern) || []
  const uniqueCaps = [...new Set(capsPhrases)]

  // Numbers and monetary amounts
  const numberPattern = /\$[\d,]+(?:\.\d{2})?|\d{1,3}(?:,\d{3})*(?:\.\d+)?/g
  const numbers = text.match(numberPattern) || []

  // Dates
  const datePattern = /\b(?:\d{1,2}\/\d{1,2}\/\d{2,4}|\d{4}-\d{2}-\d{2}|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{1,2},?\s+\d{4})\b/gi
  const dates = text.match(datePattern) || []

  return (
    <>
      <SEOHead
        title="Contract Analyzer | UnTrackt"
        description="Analyze contract text for readability, complexity, keywords, and structure. Highlights important clauses and metrics. No legal advice."
        path="/tools/contract-analyzer"
        toolName="Contract Analyzer"
      />

      <DisclaimerCard type="legal" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-4">
            <h2 className="font-semibold text-lg text-gray-900">Paste Contract Text</h2>
            <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              className="input-field resize-none"
              rows="12"
              placeholder="Paste contract or document text here..."
            />
          </div>
        </div>

        {/* Stats */}
        <div className="lg:col-span-2 space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
              <p className="text-xs text-blue-600 mb-1">Words</p>
              <p className="text-2xl font-bold text-blue-700">{wordCount}</p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-xl p-3">
              <p className="text-xs text-green-600 mb-1">Characters</p>
              <p className="text-2xl font-bold text-green-700">{charCount}</p>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-3">
              <p className="text-xs text-purple-600 mb-1">Pages</p>
              <p className="text-2xl font-bold text-purple-700">{pageEstimate}</p>
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-3">
              <p className="text-xs text-orange-600 mb-1">Read Time</p>
              <p className="text-2xl font-bold text-orange-700">{readingTimeMinutes}m</p>
            </div>
          </div>

          {/* Complexity */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-4">
            <h3 className="font-semibold text-gray-900">Complexity Analysis</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600 mb-1">Avg Words per Sentence</p>
                <p className="text-2xl font-bold text-gray-900">{avgWordsPerSentence.toFixed(1)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Flesch-Kincaid Grade Level</p>
                <p className="text-2xl font-bold text-gray-900">{Math.max(0, gradeLevel)}</p>
                <p className="text-xs text-gray-500">
                  {gradeLevel < 6 ? 'Easy to read' : gradeLevel < 12 ? 'Average' : 'Advanced/Technical'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Passive Voice Usage</p>
                <p className="text-2xl font-bold text-gray-900">{passivePercent}%</p>
                <p className="text-xs text-gray-500">{passiveSentences} passive sentences</p>
              </div>
            </div>
          </div>

          {/* Keywords */}
          {topKeywords.length > 0 && (
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3">Top Keywords</h3>
              <div className="flex flex-wrap gap-2">
                {topKeywords.map(([word, count]) => (
                  <span key={word} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                    {word} <span className="text-blue-600">×{count}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Long Sentences */}
          {longSentences.length > 0 && (
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3">Long Sentences ({longSentences.length} found)</h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {longSentences.map((sentence, idx) => {
                  const wordCount = sentence.trim().split(/\s+/).length
                  return (
                    <div key={idx} className="p-3 bg-orange-50 border border-orange-200 rounded-lg text-sm text-gray-900">
                      <p className="mb-1"><span className="font-semibold text-orange-600">{wordCount} words:</span> {sentence.trim().slice(0, 100)}...</p>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* ALL CAPS */}
          {uniqueCaps.length > 0 && (
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3">ALL CAPS Phrases ({uniqueCaps.length} found)</h3>
              <div className="flex flex-wrap gap-2">
                {uniqueCaps.slice(0, 15).map(phrase => (
                  <span key={phrase} className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-monospace font-bold">
                    {phrase}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Numbers & Amounts */}
          {numbers.length > 0 && (
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3">Numbers & Amounts ({numbers.length} found)</h3>
              <div className="space-y-2">
                {numbers.slice(0, 20).map((num, idx) => (
                  <span key={idx} className="inline-block px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-mono mr-2 mb-2">
                    {num}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Dates */}
          {dates.length > 0 && (
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3">Dates Found ({dates.length})</h3>
              <div className="space-y-2">
                {dates.slice(0, 20).map((date, idx) => (
                  <span key={idx} className="inline-block px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-mono mr-2 mb-2">
                    {date}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
