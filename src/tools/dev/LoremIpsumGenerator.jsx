import { useMemo, useState } from 'react'

const BASE_WORDS = 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'.split(' ')

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function buildWords(wordPool, count) {
  return Array.from({ length: count }, () => wordPool[randomInt(0, wordPool.length - 1)]).join(' ')
}

function toSentences(wordPool, count) {
  const out = []
  for (let i = 0; i < count; i += 1) {
    const words = buildWords(wordPool, randomInt(8, 16))
    out.push(`${words.charAt(0).toUpperCase()}${words.slice(1)}.`)
  }
  return out.join(' ')
}

function toParagraphs(wordPool, count) {
  return Array.from({ length: count }, () => toSentences(wordPool, randomInt(3, 6))).join('\n\n')
}

export default function LoremIpsumGenerator() {
  const [type, setType] = useState('paragraphs')
  const [count, setCount] = useState(3)
  const [startClassic, setStartClassic] = useState(true)
  const [includeHtml, setIncludeHtml] = useState(false)
  const [customWords, setCustomWords] = useState('')
  const [seed, setSeed] = useState(0)

  const wordPool = useMemo(() => {
    const custom = customWords
      .split(/\s+/)
      .map((w) => w.trim())
      .filter(Boolean)
    return custom.length > 2 ? custom : BASE_WORDS
  }, [customWords])

  const output = useMemo(() => {
    const n = Number(count)
    if (Number.isNaN(n) || n < 1) return ''
    const capped = Math.min(100, n)
    let text = ''

    if (type === 'words') text = buildWords(wordPool, capped)
    else if (type === 'sentences') text = toSentences(wordPool, capped)
    else if (type === 'bytes') {
      let tmp = ''
      while (new TextEncoder().encode(tmp).length < capped) {
        tmp += `${buildWords(wordPool, 8)} `
      }
      text = tmp.slice(0, capped)
    } else text = toParagraphs(wordPool, capped)

    if (startClassic && text.length > 0) {
      if (type === 'paragraphs') {
        text = text.replace(/^[^\n]+/, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.')
      } else {
        text = `Lorem ipsum dolor sit amet. ${text}`
      }
    }

    if (includeHtml) {
      return text
        .split(/\n\n+/)
        .map((p) => `<p>${p}</p>`)
        .join('\n')
    }

    return text
  }, [type, count, startClassic, includeHtml, wordPool, seed])

  const words = output.trim() ? output.trim().split(/\s+/).length : 0
  const chars = output.length

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <select value={type} onChange={(e) => setType(e.target.value)} className="input-field">
          <option value="paragraphs">Paragraphs</option>
          <option value="sentences">Sentences</option>
          <option value="words">Words</option>
          <option value="bytes">Bytes</option>
        </select>
        <input type="number" min="1" max="100" value={count} onChange={(e) => setCount(Number(e.target.value))} className="input-field" />
      </div>

      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
        <label className="inline-flex items-center gap-2"><input type="checkbox" checked={startClassic} onChange={(e) => setStartClassic(e.target.checked)} />Start with "Lorem ipsum..."</label>
        <label className="inline-flex items-center gap-2"><input type="checkbox" checked={includeHtml} onChange={(e) => setIncludeHtml(e.target.checked)} />Include HTML tags</label>
      </div>

      <textarea
        value={customWords}
        onChange={(e) => setCustomWords(e.target.value)}
        className="textarea-field min-h-[80px]"
        placeholder="Optional custom word list"
      />

      <textarea readOnly value={output} className="textarea-field min-h-[220px] bg-gray-50" />

      <div className="flex flex-wrap gap-2">
        <button className="btn-primary" onClick={() => navigator.clipboard.writeText(output)}>Copy</button>
        <button className="btn-secondary" onClick={() => setSeed((x) => x + 1)}>Regenerate</button>
      </div>

      <p className="text-sm text-gray-500">Word count: {words} | Character count: {chars}</p>
    </div>
  )
}
