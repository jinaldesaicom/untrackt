function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

function escapeAttribute(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

function sanitizeUrl(value) {
  const trimmed = String(value || '').trim()
  if (!trimmed) return '#'

  try {
    const parsed = new URL(trimmed, typeof window !== 'undefined' ? window.location.origin : 'https://untrackt.com')
    const protocol = parsed.protocol.toLowerCase()
    if (protocol === 'http:' || protocol === 'https:' || protocol === 'mailto:') {
      return escapeAttribute(parsed.href)
    }
  } catch {
    return '#'
  }

  return '#'
}

function parseInline(text) {
  const safe = escapeHtml(String(text || ''))

  return safe
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/~~([^~]+)~~/g, '<del>$1</del>')
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_, alt, url) => `<img alt="${escapeAttribute(alt)}" src="${sanitizeUrl(url)}" />`)
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, url) => `<a href="${sanitizeUrl(url)}" target="_blank" rel="noreferrer">${label}</a>`)
}

export function markdownToHtml(markdown) {
  const lines = String(markdown || '').split('\n')
  const out = []
  let inCode = false
  let inUl = false
  let inOl = false

  const closeLists = () => {
    if (inUl) {
      out.push('</ul>')
      inUl = false
    }
    if (inOl) {
      out.push('</ol>')
      inOl = false
    }
  }

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index]

    if (line.startsWith('```')) {
      closeLists()
      out.push(inCode ? '</code></pre>' : '<pre><code>')
      inCode = !inCode
      continue
    }

    if (inCode) {
      out.push(escapeHtml(line))
      continue
    }

    if (/^\|.+\|$/.test(line) && /^\|[- :|]+\|$/.test(lines[index + 1] || '')) {
      closeLists()
      const headers = line.split('|').slice(1, -1).map((item) => item.trim())
      const rows = []
      index += 2

      while (index < lines.length && /^\|.+\|$/.test(lines[index])) {
        rows.push(lines[index].split('|').slice(1, -1).map((item) => item.trim()))
        index += 1
      }

      index -= 1
      out.push('<table><thead><tr>')
      headers.forEach((header) => out.push(`<th>${parseInline(header)}</th>`))
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
      if (!inUl) {
        closeLists()
        out.push('<ul>')
        inUl = true
      }
      out.push(`<li>${parseInline(line.replace(/^-\s+/, ''))}</li>`)
      continue
    }

    if (/^\d+\.\s+/.test(line)) {
      if (!inOl) {
        closeLists()
        out.push('<ol>')
        inOl = true
      }
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

  closeLists()
  if (inCode) {
    out.push('</code></pre>')
  }

  return out.join('\n')
}
