const PASSIVE_PATTERN = /\b(?:am|is|are|was|were|be|been|being)\s+\w+(?:ed|en)\b/i
const CTA_WORDS = ['learn', 'discover', 'find', 'get', 'try', 'start', 'see', 'read', 'shop', 'explore', 'download', 'build', 'compare']

export function countSyllables(word) {
  const normalized = String(word || '').toLowerCase().replace(/[^a-z]/g, '')
  if (!normalized) return 0
  const groups = normalized.match(/[aeiouy]+/g)
  const rawCount = groups ? groups.length : 1
  return Math.max(1, normalized.endsWith('e') ? rawCount - 1 : rawCount)
}

export function splitWords(text) {
  return String(text || '').toLowerCase().match(/[a-z0-9][a-z0-9'-]*/g) || []
}

export function splitSentences(text) {
  return String(text || '')
    .split(/(?<=[.!?])\s+|\n+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean)
}

export function stripHtml(html) {
  const source = String(html || '')
  if (typeof DOMParser === 'undefined') {
    return source.replace(/<[^>]+>/g, ' ')
  }

  const doc = new DOMParser().parseFromString(source, 'text/html')
  return doc.body?.textContent || ''
}

export function normalizeKeyword(value) {
  return String(value || '').trim().toLowerCase()
}

export function countPhraseOccurrences(text, phrase) {
  const normalizedText = String(text || '').toLowerCase()
  const normalizedPhrase = normalizeKeyword(phrase)
  if (!normalizedPhrase) return 0
  const escaped = normalizedPhrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const matches = normalizedText.match(new RegExp(escaped, 'g'))
  return matches ? matches.length : 0
}

export function analyzeReadability(text) {
  const safeText = String(text || '')
  const words = splitWords(safeText)
  const sentences = splitSentences(safeText)
  const wordCount = words.length || 1
  const sentenceCount = sentences.length || 1
  const syllableCount = words.reduce((sum, word) => sum + countSyllables(word), 0)
  const complexWordCount = words.filter((word) => countSyllables(word) >= 3).length
  const avgWordsPerSentence = wordCount / sentenceCount
  const avgSyllablesPerWord = syllableCount / wordCount
  const fleschReadingEase = 206.835 - 1.015 * avgWordsPerSentence - 84.6 * avgSyllablesPerWord
  const fleschKincaidGrade = 0.39 * avgWordsPerSentence + 11.8 * avgSyllablesPerWord - 15.59
  const passiveSentences = sentences.filter((sentence) => PASSIVE_PATTERN.test(sentence))
  const longSentences = sentences.filter((sentence) => splitWords(sentence).length > 25)

  return {
    words,
    sentences,
    wordCount,
    sentenceCount,
    syllableCount,
    complexWordCount,
    avgWordsPerSentence,
    avgSyllablesPerWord,
    fleschReadingEase,
    fleschKincaidGrade,
    passiveSentences,
    longSentences,
    passiveVoicePercentage: (passiveSentences.length / sentenceCount) * 100,
    longSentencePercentage: (longSentences.length / sentenceCount) * 100,
    complexWordPercentage: (complexWordCount / wordCount) * 100,
  }
}

export function estimateReadingLabel(fleschReadingEase) {
  if (fleschReadingEase >= 80) return 'Very easy'
  if (fleschReadingEase >= 70) return 'Easy'
  if (fleschReadingEase >= 60) return 'Standard'
  if (fleschReadingEase >= 50) return 'Fairly difficult'
  if (fleschReadingEase >= 30) return 'Difficult'
  return 'Very difficult'
}

export function estimateReadingTime(wordCount, wordsPerMinute = 200) {
  return Math.max(1, Math.ceil((Number(wordCount) || 0) / wordsPerMinute))
}

export function detectCtaWords(text) {
  const lower = String(text || '').toLowerCase()
  return CTA_WORDS.filter((word) => lower.includes(word))
}

export function detectPassiveVoiceCount(text) {
  return splitSentences(text).filter((sentence) => PASSIVE_PATTERN.test(sentence)).length
}

export function getFirstParagraph(text) {
  return String(text || '').split(/\n\s*\n/).find((part) => part.trim()) || ''
}

export function getKeywordProminenceScore(text, keyword) {
  const normalizedKeyword = normalizeKeyword(keyword)
  if (!normalizedKeyword) return 0

  const lowerText = String(text || '').toLowerCase()
  const firstParagraph = getFirstParagraph(lowerText)
  const position = lowerText.indexOf(normalizedKeyword)
  let score = 0

  if (position !== -1) {
    score += Math.max(5, 100 - position / 8)
  }
  if (firstParagraph.includes(normalizedKeyword)) {
    score += 20
  }

  const h1Matches = lowerText.match(/<h1[^>]*>[\s\S]*?<\/h1>/g) || []
  const h2Matches = lowerText.match(/<h2[^>]*>[\s\S]*?<\/h2>/g) || []
  if (h1Matches.some((heading) => heading.includes(normalizedKeyword))) {
    score += 18
  }
  if (h2Matches.some((heading) => heading.includes(normalizedKeyword))) {
    score += 12
  }

  return Math.round(score)
}

export function getSimpleSynonym(word) {
  const map = {
    utilize: 'use',
    approximately: 'about',
    commence: 'start',
    terminate: 'end',
    facilitate: 'help',
    optimize: 'improve',
    numerous: 'many',
    purchase: 'buy',
    additional: 'more',
    demonstrate: 'show',
    assistance: 'help',
    modification: 'change',
    requirement: 'need',
  }

  return map[String(word || '').toLowerCase()] || ''
}

export function safeNumber(value, fallback = 0) {
  const numeric = Number(value)
  return Number.isFinite(numeric) ? numeric : fallback
}

export function slugify(value) {
  return String(value || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
