import { readdirSync, statSync } from 'node:fs'
import { resolve, extname } from 'node:path'

const publicDir = resolve(process.cwd(), 'public')
const imageExts = new Set(['.png', '.jpg', '.jpeg', '.svg'])

const files = readdirSync(publicDir)
  .map((name) => ({ name, path: resolve(publicDir, name) }))
  .filter((entry) => statSync(entry.path).isFile())
  .filter((entry) => imageExts.has(extname(entry.name).toLowerCase()))

let totalBytes = 0
for (const file of files) {
  totalBytes += statSync(file.path).size
}

console.log(`Scanned ${files.length} public image assets.`)
console.log(`Total image size: ${(totalBytes / 1024).toFixed(2)} KB`)
console.log('Tip: run pngquant or svgo in CI if deeper compression is needed.')
