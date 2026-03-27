import { writeFileSync, mkdirSync } from 'node:fs'
import { resolve } from 'node:path'

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
  <text x="600" y="390" text-anchor="middle" fill="#f8fafc" font-family="Arial, sans-serif" font-size="34">124+ Free Browser Tools</text>
  <text x="600" y="445" text-anchor="middle" fill="#f8fafc" font-family="Arial, sans-serif" font-size="28">Zero Tracking • Zero Accounts • 100% Private</text>
</svg>`
}

Object.entries(palettes).forEach(([name, palette]) => {
  const target = name === 'image' ? 'og-image.svg' : `og-${name}.svg`
  writeFileSync(resolve(publicDir, target), buildSvg(palette.title, palette.from, palette.to), 'utf8')
})

console.log('Generated OG SVG assets in public/.')
