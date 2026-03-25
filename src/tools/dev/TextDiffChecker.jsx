import { useMemo, useState } from 'react'

function lcsDiff(a, b) {
  const m = a.length
  const n = b.length
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0))

  for (let i = m - 1; i >= 0; i -= 1) {
    for (let j = n - 1; j >= 0; j -= 1) {
      dp[i][j] = a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1])
    }
  }

  const chunks = []
  let i = 0
  let j = 0
  while (i < m && j < n) {
    if (a[i] === b[j]) {
      chunks.push({ type: 'same', value: a[i] })
      i += 1
      j += 1
    } else if (dp[i + 1][j] >= dp[i][j + 1]) {
      chunks.push({ type: 'removed', value: a[i] })
      i += 1
    } else {
      chunks.push({ type: 'added', value: b[j] })
      j += 1
    }
  }
  while (i < m) chunks.push({ type: 'removed', value: a[i++] })
  while (j < n) chunks.push({ type: 'added', value: b[j++] })
  return chunks
}

function tokenize(text, mode) {
  if (mode === 'line') return text.split('\n')
  if (mode === 'word') return text.match(/\S+|\s+/g) || []
  return Array.from(text)
}

export default function TextDiffChecker() {
  const [original, setOriginal] = useState('')
  const [modified, setModified] = useState('')
  const [mode, setMode] = useState('line')

  const chunks = useMemo(() => lcsDiff(tokenize(original, mode), tokenize(modified, mode)), [original, modified, mode])
  const stats = useMemo(() => {
    let added = 0
    let removed = 0
    let same = 0
    chunks.forEach((c) => {
      if (c.type === 'added') added += 1
      else if (c.type === 'removed') removed += 1
      else same += 1
    })
    return { added, removed, same }
  }, [chunks])

  const plainDiff = chunks.map((chunk) => {
    if (chunk.type === 'added') return `+ ${chunk.value}`
    if (chunk.type === 'removed') return `- ${chunk.value}`
    return `  ${chunk.value}`
  }).join(mode === 'line' ? '\n' : '')

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button className={mode === 'line' ? 'btn-primary' : 'btn-secondary'} onClick={() => setMode('line')}>Line-by-line</button>
        <button className={mode === 'word' ? 'btn-primary' : 'btn-secondary'} onClick={() => setMode('word')}>Word-by-word</button>
        <button className={mode === 'char' ? 'btn-primary' : 'btn-secondary'} onClick={() => setMode('char')}>Character-by-character</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <textarea value={original} onChange={(e) => setOriginal(e.target.value)} className="textarea-field min-h-[180px]" placeholder="Original" />
        <textarea value={modified} onChange={(e) => setModified(e.target.value)} className="textarea-field min-h-[180px]" placeholder="Modified" />
      </div>

      <div className="flex flex-wrap gap-2">
        <button className="btn-secondary" onClick={() => { const a = original; setOriginal(modified); setModified(a) }}>Swap</button>
        <button className="btn-secondary" onClick={() => navigator.clipboard.writeText(plainDiff)}>Copy diff as text</button>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-4 text-sm text-gray-600">
        {stats.added} added | {stats.removed} removed | {stats.same} unchanged
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-4">
        <h3 className="font-semibold text-gray-900 mb-2">Diff View</h3>
        <pre className="whitespace-pre-wrap break-words font-mono text-sm">
          {chunks.map((chunk, idx) => (
            <span
              key={idx}
              className={chunk.type === 'added' ? 'bg-green-100' : chunk.type === 'removed' ? 'bg-red-100' : 'bg-gray-100'}
            >
              {chunk.value}
            </span>
          ))}
        </pre>
      </div>
    </div>
  )
}
