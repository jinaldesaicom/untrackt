import sharp from 'sharp'
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const publicDir = resolve(process.cwd(), 'public')
const svgInput = readFileSync(resolve(publicDir, 'favicon.svg'))

const sizes = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'pwa-192x192.png', size: 192 },
  { name: 'pwa-512x512.png', size: 512 },
]

for (const { name, size } of sizes) {
  await sharp(svgInput, { density: 300 })
    .resize(size, size)
    .png()
    .toFile(resolve(publicDir, name))
  console.log(`Generated ${name} (${size}x${size})`)
}
