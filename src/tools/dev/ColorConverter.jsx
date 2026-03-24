import { useEffect, useMemo, useState } from 'react'
import { getItem, setItem } from '../../utils/storage.js'

const PALETTE_KEY = 'untrackt:colorPalette'

const CSS_NAMES = {
  black: '#000000', white: '#ffffff', red: '#ff0000', green: '#008000', blue: '#0000ff',
  yellow: '#ffff00', cyan: '#00ffff', magenta: '#ff00ff', gray: '#808080', orange: '#ffa500',
  purple: '#800080', pink: '#ffc0cb', brown: '#a52a2a', navy: '#000080', teal: '#008080',
}

function clamp(v, min, max) {
  return Math.min(max, Math.max(min, v))
}

function rgbToHex(r, g, b) {
  return `#${[r, g, b].map((n) => clamp(Math.round(n), 0, 255).toString(16).padStart(2, '0')).join('')}`
}

function hexToRgb(hex) {
  const clean = hex.replace('#', '').trim()
  if (!/^[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/.test(clean)) return null
  const full = clean.length === 3 ? clean.split('').map((c) => `${c}${c}`).join('') : clean
  return {
    r: parseInt(full.slice(0, 2), 16),
    g: parseInt(full.slice(2, 4), 16),
    b: parseInt(full.slice(4, 6), 16),
  }
}

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2
  const d = max - min
  if (d !== 0) {
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break
      case g: h = (b - r) / d + 2; break
      default: h = (r - g) / d + 4
    }
    h /= 6
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) }
}

function hslToRgb(h, s, l) {
  h /= 360; s /= 100; l /= 100
  const hue2rgb = (p, q, t) => {
    let tt = t
    if (tt < 0) tt += 1
    if (tt > 1) tt -= 1
    if (tt < 1 / 6) return p + (q - p) * 6 * tt
    if (tt < 1 / 2) return q
    if (tt < 2 / 3) return p + (q - p) * (2 / 3 - tt) * 6
    return p
  }

  let r
  let g
  let b
  if (s === 0) {
    r = g = b = l
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    r = hue2rgb(p, q, h + 1 / 3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1 / 3)
  }
  return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) }
}

function rgbToHsv(r, g, b) {
  r /= 255; g /= 255; b /= 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  const d = max - min
  let h = 0
  const s = max === 0 ? 0 : d / max
  if (d !== 0) {
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break
      case g: h = (b - r) / d + 2; break
      default: h = (r - g) / d + 4
    }
    h *= 60
  }
  return { h: Math.round(h), s: Math.round(s * 100), v: Math.round(max * 100) }
}

function parseColor(value) {
  const trimmed = value.trim().toLowerCase()
  if (!trimmed) return null

  if (CSS_NAMES[trimmed]) return hexToRgb(CSS_NAMES[trimmed])

  const hex = hexToRgb(trimmed)
  if (hex) return hex

  const rgbMatch = trimmed.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/)
  if (rgbMatch) {
    return { r: Number(rgbMatch[1]), g: Number(rgbMatch[2]), b: Number(rgbMatch[3]) }
  }

  const hslMatch = trimmed.match(/^hsl\((\d+),\s*(\d+)%?,\s*(\d+)%?\)$/)
  if (hslMatch) {
    return hslToRgb(Number(hslMatch[1]), Number(hslMatch[2]), Number(hslMatch[3]))
  }

  const hsvMatch = trimmed.match(/^hsv\((\d+),\s*(\d+)%?,\s*(\d+)%?\)$/)
  if (hsvMatch) {
    const h = Number(hsvMatch[1])
    const s = Number(hsvMatch[2]) / 100
    const v = Number(hsvMatch[3]) / 100
    const c = v * s
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
    const m = v - c
    let r1 = 0, g1 = 0, b1 = 0
    if (h < 60) [r1, g1, b1] = [c, x, 0]
    else if (h < 120) [r1, g1, b1] = [x, c, 0]
    else if (h < 180) [r1, g1, b1] = [0, c, x]
    else if (h < 240) [r1, g1, b1] = [0, x, c]
    else if (h < 300) [r1, g1, b1] = [x, 0, c]
    else [r1, g1, b1] = [c, 0, x]
    return { r: Math.round((r1 + m) * 255), g: Math.round((g1 + m) * 255), b: Math.round((b1 + m) * 255) }
  }

  return null
}

function luminance(hex) {
  const rgb = hexToRgb(hex)
  if (!rgb) return 0
  const vals = [rgb.r, rgb.g, rgb.b].map((v) => {
    const n = v / 255
    return n <= 0.03928 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * vals[0] + 0.7152 * vals[1] + 0.0722 * vals[2]
}

function contrast(hex1, hex2) {
  const l1 = luminance(hex1)
  const l2 = luminance(hex2)
  const [a, b] = l1 > l2 ? [l1, l2] : [l2, l1]
  return (a + 0.05) / (b + 0.05)
}

export default function ColorConverter() {
  const [input, setInput] = useState('#1a2b3c')
  const [picker, setPicker] = useState('#1a2b3c')
  const [secondColor, setSecondColor] = useState('#ffffff')
  const [palette, setPalette] = useState(() => getItem(PALETTE_KEY, []))

  const color = useMemo(() => parseColor(input), [input])
  const outputs = useMemo(() => {
    if (!color) return null
    const hex = rgbToHex(color.r, color.g, color.b)
    const hsl = rgbToHsl(color.r, color.g, color.b)
    const hsv = rgbToHsv(color.r, color.g, color.b)
    const cssName = Object.entries(CSS_NAMES).find(([, val]) => val.toLowerCase() === hex.toLowerCase())?.[0] || 'No exact name'
    return {
      hex,
      rgb: `rgb(${color.r}, ${color.g}, ${color.b})`,
      hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
      hsv: `hsv(${hsv.h}, ${hsv.s}%, ${hsv.v}%)`,
      cssName,
    }
  }, [color])

  useEffect(() => {
    if (outputs?.hex) {
      setPicker(outputs.hex)
    }
  }, [outputs?.hex])

  const secondParsed = useMemo(() => parseColor(secondColor), [secondColor])
  const secondHex = secondParsed ? rgbToHex(secondParsed.r, secondParsed.g, secondParsed.b) : '#ffffff'
  const ratio = outputs ? contrast(outputs.hex, secondHex) : 1

  const savePalette = () => {
    if (!outputs) return
    const next = [outputs.hex, ...palette.filter((c) => c !== outputs.hex)].slice(0, 12)
    setPalette(next)
    setItem(PALETTE_KEY, next)
  }

  return (
    <div className="space-y-4">
      <input value={input} onChange={(e) => setInput(e.target.value)} className="input-field" placeholder="HEX, RGB, HSL, HSV, or CSS name" />

      <div className="flex items-center gap-3">
        <input type="color" value={picker} onChange={(e) => { setPicker(e.target.value); setInput(e.target.value) }} className="w-14 h-10" />
        <p className="text-sm text-gray-500">Visual picker: {picker}</p>
      </div>

      {outputs ? (
        <>
          <div className="h-24 rounded-xl border border-gray-200" style={{ backgroundColor: outputs.hex }} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {Object.entries(outputs).map(([key, value]) => (
              <div key={key} className="rounded-lg border border-gray-200 p-3 bg-white flex justify-between items-center gap-2">
                <div>
                  <p className="text-xs text-gray-500 uppercase">{key}</p>
                  <p className="font-mono text-sm">{value}</p>
                </div>
                <button className="btn-secondary" onClick={() => navigator.clipboard.writeText(String(value))}>Copy</button>
              </div>
            ))}
          </div>

          <button className="btn-primary" onClick={savePalette}>Save to palette</button>

          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Contrast Checker</h3>
            <input value={secondColor} onChange={(e) => setSecondColor(e.target.value)} className="input-field mb-2" placeholder="Second color" />
            <p className="text-sm text-gray-700">Contrast ratio: {ratio.toFixed(2)}:1</p>
            <p className="text-sm text-gray-500">AA normal text: {ratio >= 4.5 ? 'Pass' : 'Fail'} | AAA normal text: {ratio >= 7 ? 'Pass' : 'Fail'}</p>
          </div>
        </>
      ) : (
        <p className="text-sm text-red-600">Unable to parse color input.</p>
      )}

      {palette.length > 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <h3 className="font-semibold text-gray-900 mb-2">Recent Palette</h3>
          <div className="grid grid-cols-6 md:grid-cols-12 gap-2">
            {palette.map((c) => (
              <button key={c} className="h-9 rounded-md border border-gray-200" style={{ backgroundColor: c }} title={c} onClick={() => setInput(c)} />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}
