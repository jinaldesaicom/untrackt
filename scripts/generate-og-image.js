import { writeFileSync, mkdirSync } from 'node:fs'
import { resolve } from 'node:path'
import blogPosts from '../src/data/blogPosts.js'
import { blogEnhancements } from '../src/data/blogEnhancements.js'

const publicDir = resolve(process.cwd(), 'public')
mkdirSync(publicDir, { recursive: true })

const palettes = {
  image: { from: '#4f46e5', to: '#7c3aed', title: 'UnTrackt' },
  dev: { from: '#7c3aed', to: '#4f46e5', title: 'Developer Tools' },
  student: { from: '#2563eb', to: '#1d4ed8', title: 'Student Tools' },
  freelance: { from: '#d97706', to: '#92400e', title: 'Freelance Tools' },
  finance: { from: '#059669', to: '#065f46', title: 'Finance Tools' },
  health: { from: '#16a34a', to: '#166534', title: 'Health Tools' },
  general: { from: '#4b5563', to: '#111827', title: 'General Tools' },
}

function buildSvg(title, from, to) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-label="${title} OG image">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${from}" />
      <stop offset="100%" stop-color="${to}" />
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)" />
  <g opacity="0.18" fill="#ffffff">
    <circle cx="120" cy="110" r="40" /><circle cx="240" cy="110" r="40" /><circle cx="360" cy="110" r="40" />
    <circle cx="120" cy="220" r="40" /><circle cx="240" cy="220" r="40" /><circle cx="360" cy="220" r="40" />
    <circle cx="120" cy="330" r="40" /><circle cx="240" cy="330" r="40" /><circle cx="360" cy="330" r="40" />
  </g>
  <text x="600" y="250" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="88" font-weight="700">UnTrackt</text>
  <text x="600" y="325" text-anchor="middle" fill="#e0e7ff" font-family="Arial, sans-serif" font-size="40" font-weight="600">${title}</text>
  <text x="600" y="390" text-anchor="middle" fill="#f8fafc" font-family="Arial, sans-serif" font-size="34">227+ Free Browser Tools</text>
  <text x="600" y="445" text-anchor="middle" fill="#f8fafc" font-family="Arial, sans-serif" font-size="28">Zero Tracking • Zero Accounts • 100% Private</text>
</svg>`
}

function wrapText(text, maxChars) {
  const words = text.split(' ')
  const lines = []
  let current = ''

  for (const word of words) {
    const next = current ? `${current} ${word}` : word
    if (next.length <= maxChars) {
      current = next
      continue
    }
    if (current) lines.push(current)
    current = word
  }

  if (current) lines.push(current)
  return lines.slice(0, 3)
}

function escapeXml(text) {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}

function buildBlogSvg(post, enhancement) {
  const lines = wrapText(post.title, 24)
  const titleY = lines.length === 3 ? 220 : 250
  const titleSvg = lines
    .map((line, index) => `<text x="90" y="${titleY + index * 82}" fill="#ffffff" font-family="Arial, sans-serif" font-size="64" font-weight="700">${escapeXml(line)}</text>`)
    .join('\n  ')

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-label="${escapeXml(post.title)} OG image">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${enhancement.palette.from}" />
      <stop offset="100%" stop-color="${enhancement.palette.to}" />
    </linearGradient>
    <radialGradient id="glow" cx="65%" cy="20%" r="70%">
      <stop offset="0%" stop-color="${enhancement.palette.accent}" stop-opacity="0.30" />
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)" />
  <rect width="1200" height="630" fill="url(#glow)" />
  <g opacity="0.16" fill="#ffffff">
    <circle cx="1030" cy="110" r="130" />
    <circle cx="1110" cy="220" r="72" />
    <circle cx="940" cy="470" r="180" />
  </g>
  <rect x="90" y="80" rx="22" ry="22" width="250" height="42" fill="rgba(255,255,255,0.16)" />
  <text x="115" y="108" fill="#eef2ff" font-family="Arial, sans-serif" font-size="24" font-weight="700">${escapeXml(enhancement.eyebrow)}</text>
  ${titleSvg}
  <text x="90" y="500" fill="#e2e8f0" font-family="Arial, sans-serif" font-size="30">${escapeXml(post.description.slice(0, 110))}${post.description.length > 110 ? '...' : ''}</text>
  <text x="90" y="565" fill="#ffffff" font-family="Arial, sans-serif" font-size="26" font-weight="600">UnTrackt Blog</text>
  <text x="1080" y="565" text-anchor="end" fill="#cbd5e1" font-family="Arial, sans-serif" font-size="24">No tracking • Browser-first</text>
</svg>`
}

Object.entries(palettes).forEach(([name, palette]) => {
  const target = name === 'image' ? 'og-image.svg' : `og-${name}.svg`
  writeFileSync(resolve(publicDir, target), buildSvg(palette.title, palette.from, palette.to), 'utf8')
})

blogPosts.forEach((post) => {
  const enhancement = blogEnhancements[post.slug]
  if (!enhancement?.ogImage) return

  const fileName = enhancement.ogImage.replace(/^\//, '')
  writeFileSync(resolve(publicDir, fileName), buildBlogSvg(post, enhancement), 'utf8')
})

console.log('Generated OG SVG assets in public/.')
