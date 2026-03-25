import { useMemo, useRef, useState } from 'react'
import CopyButton from '../../components/CopyButton.jsx'
import useStoredPreference from '../../hooks/useStoredPreference.js'
import { ToolLayout, Panel, SegmentedToggle, FieldLabel } from '../../components/ToolLayout.jsx'

function hexToRgb(hex) {
  const normalized = hex.replace('#', '')
  const expanded = normalized.length === 3 ? normalized.split('').map((char) => char + char).join('') : normalized
  const value = Number.parseInt(expanded, 16)
  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  }
}

function rgbToHex(r, g, b) {
  return `#${[r, g, b].map((channel) => Math.max(0, Math.min(255, Math.round(channel))).toString(16).padStart(2, '0')).join('')}`
}

function rgbToHsl(r, g, b) {
  const red = r / 255
  const green = g / 255
  const blue = b / 255
  const max = Math.max(red, green, blue)
  const min = Math.min(red, green, blue)
  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const delta = max - min
    s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min)
    switch (max) {
      case red:
        h = (green - blue) / delta + (green < blue ? 6 : 0)
        break
      case green:
        h = (blue - red) / delta + 2
        break
      default:
        h = (red - green) / delta + 4
        break
    }
    h /= 6
  }

  return { h: h * 360, s: s * 100, l: l * 100 }
}

function hslToRgb(h, s, l) {
  const hue = ((h % 360) + 360) % 360 / 360
  const sat = s / 100
  const light = l / 100

  if (sat === 0) {
    const value = light * 255
    return { r: value, g: value, b: value }
  }

  const q = light < 0.5 ? light * (1 + sat) : light + sat - light * sat
  const p = 2 * light - q
  const channels = [hue + 1 / 3, hue, hue - 1 / 3].map((t) => {
    let next = t
    if (next < 0) next += 1
    if (next > 1) next -= 1
    if (next < 1 / 6) return p + (q - p) * 6 * next
    if (next < 1 / 2) return q
    if (next < 2 / 3) return p + (q - p) * (2 / 3 - next) * 6
    return p
  })

  return { r: channels[0] * 255, g: channels[1] * 255, b: channels[2] * 255 }
}

function buildPaletteFromHarmony(baseColor, harmony) {
  const baseHsl = rgbToHsl(...Object.values(hexToRgb(baseColor)))
  const harmonyOffsets = {
    complementary: [0, 20, -20, 180, 200],
    analogous: [-40, -20, 0, 20, 40],
    triadic: [0, 120, 240, 150, 270],
    split: [0, 150, 210, -30, 30],
    tetradic: [0, 90, 180, 270, 45],
    monochromatic: [0, 0, 0, 0, 0],
  }

  return harmonyOffsets[harmony].map((offset, index) => {
    const lightness = harmony === 'monochromatic' ? Math.max(12, Math.min(88, baseHsl.l + (index - 2) * 12)) : Math.max(18, Math.min(82, baseHsl.l + (index % 2 === 0 ? 0 : index * 5 - 10)))
    const saturation = harmony === 'monochromatic' ? Math.max(18, Math.min(96, baseHsl.s + (index - 2) * 4)) : baseHsl.s
    const rgb = hslToRgb(baseHsl.h + offset, saturation, lightness)
    return rgbToHex(rgb.r, rgb.g, rgb.b)
  })
}

function randomBetween(min, max) {
  return Math.floor(min + Math.random() * (max - min + 1))
}

function buildRandomPalette(style) {
  const presets = {
    pastel: () => Array.from({ length: 5 }, () => rgbToHex(...Object.values(hslToRgb(randomBetween(0, 360), randomBetween(35, 55), randomBetween(72, 84))))),
    vibrant: () => Array.from({ length: 5 }, () => rgbToHex(...Object.values(hslToRgb(randomBetween(0, 360), randomBetween(75, 95), randomBetween(42, 58))))),
    earth: () => Array.from({ length: 5 }, (_, index) => rgbToHex(...Object.values(hslToRgb(randomBetween(20, 110), randomBetween(20, 50), 35 + index * 8)))),
    neon: () => Array.from({ length: 5 }, () => rgbToHex(...Object.values(hslToRgb(randomBetween(0, 360), randomBetween(88, 100), randomBetween(56, 66))))),
    monochrome: () => buildPaletteFromHarmony(rgbToHex(...Object.values(hslToRgb(randomBetween(0, 360), 0, 50))), 'monochromatic'),
    complementary: () => buildPaletteFromHarmony(rgbToHex(...Object.values(hslToRgb(randomBetween(0, 360), randomBetween(60, 90), randomBetween(42, 60)))), 'complementary'),
  }

  return presets[style]()
}

function describeColor(hex) {
  const rgb = hexToRgb(hex)
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)
  return {
    hex,
    rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
    hsl: `hsl(${Math.round(hsl.h)}, ${Math.round(hsl.s)}%, ${Math.round(hsl.l)}%)`,
  }
}

function exportPalette(palette) {
  const colors = palette.map(describeColor)
  return {
    css: colors.map((color, index) => `--ut-color-${index + 1}: ${color.hex};`).join('\n'),
    hex: colors.map((color) => color.hex).join(', '),
    tailwind: `colors: {\n${colors.map((color, index) => `  ut${index + 1}: '${color.hex}',`).join('\n')}\n}`,
    scss: colors.map((color, index) => `$ut-color-${index + 1}: ${color.hex};`).join('\n'),
    json: JSON.stringify(colors.map((color) => color.hex), null, 2),
  }
}

async function extractPaletteFromImage(file) {
  const imageUrl = URL.createObjectURL(file)
  const image = new Image()

  await new Promise((resolve, reject) => {
    image.onload = resolve
    image.onerror = reject
    image.src = imageUrl
  })

  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  canvas.width = 64
  canvas.height = 64
  context.drawImage(image, 0, 0, 64, 64)
  const { data } = context.getImageData(0, 0, 64, 64)
  const buckets = new Map()

  for (let index = 0; index < data.length; index += 4) {
    const alpha = data[index + 3]
    if (alpha < 200) continue
    const red = Math.round(data[index] / 32) * 32
    const green = Math.round(data[index + 1] / 32) * 32
    const blue = Math.round(data[index + 2] / 32) * 32
    const key = `${red},${green},${blue}`
    buckets.set(key, (buckets.get(key) || 0) + 1)
  }

  URL.revokeObjectURL(imageUrl)

  return Array.from(buckets.entries())
    .sort((left, right) => right[1] - left[1])
    .slice(0, 5)
    .map(([key]) => {
      const [red, green, blue] = key.split(',').map(Number)
      return rgbToHex(red, green, blue)
    })
}

export default function ColorPaletteGenerator() {
  const [tab, setTab] = useState('base')
  const [baseColor, setBaseColor] = useState('#4f46e5')
  const [harmony, setHarmony] = useState('complementary')
  const [randomStyle, setRandomStyle] = useState('pastel')
  const [imagePalette, setImagePalette] = useState([])
  const [palette, setPalette] = useState(buildPaletteFromHarmony('#4f46e5', 'complementary'))
  const [savedPalettes, setSavedPalettes] = useStoredPreference('general:colorPalettes', [])
  const fileInputRef = useRef(null)

  const exports = useMemo(() => exportPalette(palette), [palette])

  const generateBasePalette = () => setPalette(buildPaletteFromHarmony(baseColor, harmony))
  const generateRandomPalette = () => setPalette(buildRandomPalette(randomStyle))
  const handleImageUpload = async (file) => {
    if (!file) return
    const extracted = await extractPaletteFromImage(file)
    setImagePalette(extracted)
    setPalette(extracted)
  }
  const savePalette = () => {
    setSavedPalettes((current) => [palette, ...current.filter((item) => item.join(',') !== palette.join(',')).slice(0, 9)])
  }

  return (
    <ToolLayout
      title="Color Palette Generator"
      description="Generate harmonious color palettes from a base color, random style, or uploaded image, then export them for CSS, Tailwind, SCSS, or JSON."
      path="/tools/color-palette-generator"
    >
      <Panel>
        <SegmentedToggle options={[{ label: 'From base color', value: 'base' }, { label: 'Random palette', value: 'random' }, { label: 'From image', value: 'image' }]} value={tab} onChange={setTab} className="flex-wrap" />
      </Panel>

      <div className="grid gap-6 lg:grid-cols-[0.95fr,1.05fr]">
        <Panel>
          {tab === 'base' && (
            <div className="space-y-4">
              <div>
                <FieldLabel>Base color</FieldLabel>
                <div className="flex gap-3">
                  <input type="color" value={baseColor} onChange={(event) => setBaseColor(event.target.value)} className="h-12 w-16 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent" />
                  <input className="input-field" value={baseColor} onChange={(event) => setBaseColor(event.target.value)} />
                </div>
              </div>
              <div>
                <FieldLabel>Harmony type</FieldLabel>
                <div className="flex flex-wrap gap-2">
                  {[
                    ['complementary', 'Complementary'],
                    ['analogous', 'Analogous'],
                    ['triadic', 'Triadic'],
                    ['split', 'Split-complementary'],
                    ['tetradic', 'Tetradic'],
                    ['monochromatic', 'Monochromatic'],
                  ].map(([value, label]) => (
                    <button key={value} type="button" onClick={() => setHarmony(value)} className={`btn-secondary ${harmony === value ? '!bg-indigo-600 !text-white' : ''}`}>{label}</button>
                  ))}
                </div>
              </div>
              <button type="button" className="btn-primary" onClick={generateBasePalette}>Generate palette</button>
            </div>
          )}

          {tab === 'random' && (
            <div className="space-y-4">
              <div>
                <FieldLabel>Style</FieldLabel>
                <select className="input-field" value={randomStyle} onChange={(event) => setRandomStyle(event.target.value)}>
                  <option value="pastel">Pastel</option>
                  <option value="vibrant">Vibrant</option>
                  <option value="earth">Earth tones</option>
                  <option value="neon">Neon</option>
                  <option value="monochrome">Monochrome</option>
                  <option value="complementary">Complementary</option>
                </select>
              </div>
              <button type="button" className="btn-primary" onClick={generateRandomPalette}>Regenerate palette</button>
            </div>
          )}

          {tab === 'image' && (
            <div className="space-y-4">
              <div className="rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-700 p-6 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-300">Upload an image to extract five dominant colors.</p>
                <button type="button" className="btn-primary mt-4" onClick={() => fileInputRef.current?.click()}>Choose image</button>
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={(event) => handleImageUpload(event.target.files?.[0])} />
              </div>
              {imagePalette.length > 0 && <p className="text-sm text-gray-500 dark:text-gray-400">Extracted from image using canvas sampling and simple color bucketing.</p>}
            </div>
          )}
        </Panel>

        <div className="space-y-6">
          <Panel>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
              {palette.map((color) => {
                const details = describeColor(color)
                return (
                  <div key={color} className="rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <div className="h-28" style={{ backgroundColor: color }} />
                    <div className="p-4 text-sm text-gray-600 dark:text-gray-300 space-y-1">
                      <p className="font-semibold text-gray-900 dark:text-gray-100">{details.hex}</p>
                      <p>{details.rgb}</p>
                      <p>{details.hsl}</p>
                      <CopyButton text={details.hex} label="Copy" className="mt-2" />
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <CopyButton text={exports.css} label="Copy CSS variables" />
              <CopyButton text={exports.hex} label="Copy all HEX values" />
              <button type="button" className="btn-primary" onClick={savePalette}>Save palette</button>
            </div>
          </Panel>

          <Panel>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Exports</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {[
                ['CSS custom properties', exports.css],
                ['Tailwind config', exports.tailwind],
                ['SCSS variables', exports.scss],
                ['JSON array', exports.json],
              ].map(([label, content]) => (
                <div key={label} className="rounded-2xl border border-gray-200 dark:border-gray-700 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm">{label}</p>
                    <CopyButton text={content} label="Copy" />
                  </div>
                  <pre className="mt-3 text-xs whitespace-pre-wrap text-gray-600 dark:text-gray-300 font-mono">{content}</pre>
                </div>
              ))}
            </div>
          </Panel>

          <Panel>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Saved palettes</h2>
            <div className="mt-4 space-y-3">
              {savedPalettes.length === 0 && <p className="text-sm text-gray-500 dark:text-gray-400">Save up to 10 palettes on this device for later reuse.</p>}
              {savedPalettes.map((savedPalette, index) => (
                <button key={`${savedPalette.join('-')}-${index}`} type="button" onClick={() => setPalette(savedPalette)} className="w-full rounded-2xl border border-gray-200 dark:border-gray-700 p-3 text-left hover:border-indigo-400 transition-colors">
                  <div className="flex overflow-hidden rounded-xl">
                    {savedPalette.map((color) => <span key={color} className="h-10 flex-1" style={{ backgroundColor: color }} />)}
                  </div>
                </button>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </ToolLayout>
  )
}