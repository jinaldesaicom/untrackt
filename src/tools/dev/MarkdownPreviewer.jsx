import { useEffect, useMemo, useState } from 'react'
import { getItem, setItem, removeItem } from '../../utils/storage.js'

const STORAGE_KEY = 'untrackt:markdownPreviewer'

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

function escapeAttribute(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

function sanitizeUrl(value) {
  const trimmed = value.trim()
  if (!trimmed) return '#'
  try {
    const parsed = new URL(trimmed, window.location.origin)
    const protocol = parsed.protocol.toLowerCase()
    if (protocol === 'http:' || protocol === 'https:' || protocol === 'mailto:') {
      return escapeAttribute(parsed.href)
    }
    return '#'
  } catch {
    return '#'
  }
}

function parseInline(text) {
  const safe = escapeHtml(text)
  return safe
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/~~([^~]+)~~/g, '<del>$1</del>')
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_, alt, url) => `<img alt="${escapeAttribute(alt)}" src="${sanitizeUrl(url)}" />`)
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, url) => `<a href="${sanitizeUrl(url)}" target="_blank" rel="noreferrer">${label}</a>`)
}

function markdownToHtml(md) {
  const lines = md.split('\n')
  const out = []
  let inCode = false
  let inUl = false
  let inOl = false

  const closeLists = () => {
    if (inUl) { out.push('</ul>'); inUl = false }
    if (inOl) { out.push('</ol>'); inOl = false }
  }

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i]

    if (line.startsWith('```')) {
      closeLists()
      if (!inCode) out.push('<pre><code>')
      else out.push('</code></pre>')
      inCode = !inCode
      continue
    }

    if (inCode) {
      out.push(escapeHtml(line))
      continue
    }

    if (/^\|.+\|$/.test(line) && /^\|[- :|]+\|$/.test(lines[i + 1] || '')) {
      closeLists()
      const headers = line.split('|').slice(1, -1).map((x) => x.trim())
      const rows = []
      i += 2
      while (i < lines.length && /^\|.+\|$/.test(lines[i])) {
        rows.push(lines[i].split('|').slice(1, -1).map((x) => x.trim()))
        i += 1
      }
      i -= 1
      out.push('<table><thead><tr>')
      headers.forEach((h) => out.push(`<th>${parseInline(h)}</th>`))
      out.push('</tr></thead><tbody>')
      rows.forEach((row) => {
        out.push('<tr>')
        row.forEach((cell) => out.push(`<td>${parseInline(cell)}</td>`))
        out.push('</tr>')
      })
      out.push('</tbody></table>')
      continue
    }

    if (/^#{1,6}\s+/.test(line)) {
      closeLists()
      const level = line.match(/^#+/)[0].length
      out.push(`<h${level}>${parseInline(line.replace(/^#{1,6}\s+/, ''))}</h${level}>`)
      continue
    }

    if (/^>\s+/.test(line)) {
      closeLists()
      out.push(`<blockquote>${parseInline(line.replace(/^>\s+/, ''))}</blockquote>`)
      continue
    }

    if (/^-\s+/.test(line)) {
      if (!inUl) { closeLists(); out.push('<ul>') }
      inUl = true
      out.push(`<li>${parseInline(line.replace(/^-\s+/, ''))}</li>`)
      continue
    }

    if (/^\d+\.\s+/.test(line)) {
      if (!inOl) { closeLists(); out.push('<ol>') }
      inOl = true
      out.push(`<li>${parseInline(line.replace(/^\d+\.\s+/, ''))}</li>`)
      continue
    }

    closeLists()

    if (/^---+$/.test(line.trim())) {
      out.push('<hr />')
      continue
    }

    if (!line.trim()) {
      out.push('')
      continue
    }

    out.push(`<p>${parseInline(line)}</p>`)
  }

  if (inUl) out.push('</ul>')
  if (inOl) out.push('</ol>')
  if (inCode) out.push('</code></pre>')

  return out.join('\n')
}

function insertToken(text, token) {
  return `${text}${token}`
}

export default function MarkdownPreviewer() {
  const [markdown, setMarkdown] = useState(() => getItem(STORAGE_KEY, '# Markdown Previewer\n\nStart typing...'))
  const [viewMode, setViewMode] = useState('split')

  useEffect(() => {
    const id = setInterval(() => setItem(STORAGE_KEY, markdown), 2000)
    return () => clearInterval(id)
  }, [markdown])

  const html = useMemo(() => markdownToHtml(markdown), [markdown])
  const words = markdown.trim() ? markdown.trim().split(/\s+/).length : 0
  const reading = Math.max(1, Math.ceil(words / 200))

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <button className="btn-secondary" onClick={() => setMarkdown((v) => insertToken(v, '**bold**'))}>Bold</button>
        <button className="btn-secondary" onClick={() => setMarkdown((v) => insertToken(v, '*italic*'))}>Italic</button>
        <button className="btn-secondary" onClick={() => setMarkdown((v) => insertToken(v, '\n# Heading\n'))}>Heading</button>
        <button className="btn-secondary" onClick={() => setMarkdown((v) => insertToken(v, '[label](https://example.com)'))}>Link</button>
        <button className="btn-secondary" onClick={() => setMarkdown((v) => insertToken(v, '`code`'))}>Code</button>
        <button className="btn-secondary" onClick={() => setMarkdown((v) => insertToken(v, '\n- list item'))}>List</button>
        <button className="btn-secondary" onClick={() => setMarkdown((v) => insertToken(v, '\n> quote'))}>Quote</button>
      </div>

      <div className="flex gap-2">
        <button className={viewMode === 'split' ? 'btn-primary' : 'btn-secondary'} onClick={() => setViewMode('split')}>Split view</button>
        <button className={viewMode === 'editor' ? 'btn-primary' : 'btn-secondary'} onClick={() => setViewMode('editor')}>Editor only</button>
        <button className={viewMode === 'preview' ? 'btn-primary' : 'btn-secondary'} onClick={() => setViewMode('preview')}>Preview only</button>
      </div>

      <div className={`grid gap-4 ${viewMode === 'split' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
        {viewMode !== 'preview' ? (
          <textarea value={markdown} onChange={(e) => setMarkdown(e.target.value)} className="textarea-field min-h-[280px]" />
        ) : null}

        {viewMode !== 'editor' ? (
          <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 prose prose-sm dark:prose-invert max-w-none overflow-auto min-h-[280px]" dangerouslySetInnerHTML={{ __html: html }} />
        ) : null}
      </div>

      <div className="flex flex-wrap gap-2">
        <button className="btn-secondary" onClick={() => navigator.clipboard.writeText(markdown)}>Copy Markdown</button>
        <button className="btn-secondary" onClick={() => navigator.clipboard.writeText(html)}>Copy HTML</button>
        <button
          className="btn-secondary"
          onClick={() => {
            if (window.confirm('Clear markdown content?')) {
              setMarkdown('')
              removeItem(STORAGE_KEY)
            }
          }}
        >
          Clear
        </button>
      </div>

      <p className="text-sm text-gray-500">Words: {words} | Reading time: {reading} min</p>
    </div>
  )
}
