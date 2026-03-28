import { useMemo, useState } from 'react'
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

const FORMATS = ['hex', 'rgb', 'hsl', 'hsv', 'css-name']

function hsvToRgb(h, s, v) {
  s /= 100; v /= 100
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

function NumberInput({ label, value, onChange, min, max }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">{label}</span>
      <input type="number" min={min} max={max} value={value} onChange={(e) => onChange(clamp(Number(e.target.value) || 0, min, max))} className="input-field text-center font-mono" />
    </label>
  )
}

export default function ColorConverter() {
  const [format, setFormat] = useState('hex')
  const [hexVal, setHexVal] = useState('#1a2b3c')
  const [rgb, setRgb] = useState({ r: 26, g: 43, b: 60 })
  const [hsl, setHsl] = useState({ h: 210, s: 40, l: 17 })
  const [hsv, setHsv] = useState({ h: 210, s: 57, v: 24 })
  const [cssName, setCssName] = useState('teal')
  const [picker, setPicker] = useState('#1a2b3c')
  const [secondColor, setSecondColor] = useState('#ffffff')
  const [palette, setPalette] = useState(() => getItem(PALETTE_KEY, []))

  const syncFromRgb = (r, g, b) => {
    const hex = rgbToHex(r, g, b)
    setHexVal(hex)
    setRgb({ r, g, b })
    setHsl(rgbToHsl(r, g, b))
    setHsv(rgbToHsv(r, g, b))
    setPicker(hex)
    const name = Object.entries(CSS_NAMES).find(([, val]) => val.toLowerCase() === hex.toLowerCase())
    setCssName(name ? name[0] : '')
  }

  const handleHexChange = (val) => {
    setHexVal(val)
    const parsed = hexToRgb(val)
    if (parsed) syncFromRgb(parsed.r, parsed.g, parsed.b)
  }

  const handleRgbChange = (key, val) => {
    const next = { ...rgb, [key]: val }
    setRgb(next)
    syncFromRgb(next.r, next.g, next.b)
  }

  const handleHslChange = (key, val) => {
    const next = { ...hsl, [key]: val }
    setHsl(next)
    const converted = hslToRgb(next.h, next.s, next.l)
    const hex = rgbToHex(converted.r, converted.g, converted.b)
    setHexVal(hex)
    setRgb(converted)
    setHsv(rgbToHsv(converted.r, converted.g, converted.b))
    setPicker(hex)
    const name = Object.entries(CSS_NAMES).find(([, v]) => v.toLowerCase() === hex.toLowerCase())
    setCssName(name ? name[0] : '')
  }

  const handleHsvChange = (key, val) => {
    const next = { ...hsv, [key]: val }
    setHsv(next)
    const converted = hsvToRgb(next.h, next.s, next.v)
    const hex = rgbToHex(converted.r, converted.g, converted.b)
    setHexVal(hex)
    setRgb(converted)
    setHsl(rgbToHsl(converted.r, converted.g, converted.b))
    setPicker(hex)
    const name = Object.entries(CSS_NAMES).find(([, v]) => v.toLowerCase() === hex.toLowerCase())
    setCssName(name ? name[0] : '')
  }

  const handleCssNameChange = (val) => {
    setCssName(val)
    const lower = val.trim().toLowerCase()
    if (CSS_NAMES[lower]) {
      const parsed = hexToRgb(CSS_NAMES[lower])
      if (parsed) syncFromRgb(parsed.r, parsed.g, parsed.b)
    }
  }

  const handlePicker = (e) => {
    const val = e.target.value
    setPicker(val)
    setHexVal(val)
    setFormat('hex')
    const parsed = hexToRgb(val)
    if (parsed) syncFromRgb(parsed.r, parsed.g, parsed.b)
  }

  const currentHex = hexToRgb(hexVal) ? rgbToHex(hexToRgb(hexVal).r, hexToRgb(hexVal).g, hexToRgb(hexVal).b) : picker
  const outputs = useMemo(() => {
    const hex = rgbToHex(rgb.r, rgb.g, rgb.b)
    const h = rgbToHsl(rgb.r, rgb.g, rgb.b)
    const v = rgbToHsv(rgb.r, rgb.g, rgb.b)
    const name = Object.entries(CSS_NAMES).find(([, val]) => val.toLowerCase() === hex.toLowerCase())?.[0] || 'No exact name'
    return {
      hex,
      rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
      hsl: `hsl(${h.h}, ${h.s}%, ${h.l}%)`,
      hsv: `hsv(${v.h}, ${v.s}%, ${v.v}%)`,
      cssName: name,
    }
  }, [rgb])

  const secondParsed = useMemo(() => parseColor(secondColor), [secondColor])
  const secondHex = secondParsed ? rgbToHex(secondParsed.r, secondParsed.g, secondParsed.b) : '#ffffff'
  const ratio = contrast(outputs.hex, secondHex)

  const savePalette = () => {
    const next = [outputs.hex, ...palette.filter((c) => c !== outputs.hex)].slice(0, 12)
    setPalette(next)
    setItem(PALETTE_KEY, next)
  }

  const loadFromPalette = (c) => {
    setFormat('hex')
    setHexVal(c)
    const parsed = hexToRgb(c)
    if (parsed) syncFromRgb(parsed.r, parsed.g, parsed.b)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {FORMATS.map((f) => (
          <button key={f} onClick={() => setFormat(f)} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${format === f ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>
            {f === 'css-name' ? 'CSS Name' : f.toUpperCase()}
          </button>
        ))}
      </div>

      {format === 'hex' && (
        <input value={hexVal} onChange={(e) => handleHexChange(e.target.value)} className="input-field font-mono" placeholder="#1a2b3c" />
      )}

      {format === 'rgb' && (
        <div className="grid grid-cols-3 gap-3">
          <NumberInput label="R" value={rgb.r} onChange={(v) => handleRgbChange('r', v)} min={0} max={255} />
          <NumberInput label="G" value={rgb.g} onChange={(v) => handleRgbChange('g', v)} min={0} max={255} />
          <NumberInput label="B" value={rgb.b} onChange={(v) => handleRgbChange('b', v)} min={0} max={255} />
        </div>
      )}

      {format === 'hsl' && (
        <div className="grid grid-cols-3 gap-3">
          <NumberInput label="H°" value={hsl.h} onChange={(v) => handleHslChange('h', v)} min={0} max={360} />
          <NumberInput label="S%" value={hsl.s} onChange={(v) => handleHslChange('s', v)} min={0} max={100} />
          <NumberInput label="L%" value={hsl.l} onChange={(v) => handleHslChange('l', v)} min={0} max={100} />
        </div>
      )}

      {format === 'hsv' && (
        <div className="grid grid-cols-3 gap-3">
          <NumberInput label="H°" value={hsv.h} onChange={(v) => handleHsvChange('h', v)} min={0} max={360} />
          <NumberInput label="S%" value={hsv.s} onChange={(v) => handleHsvChange('s', v)} min={0} max={100} />
          <NumberInput label="V%" value={hsv.v} onChange={(v) => handleHsvChange('v', v)} min={0} max={100} />
        </div>
      )}

      {format === 'css-name' && (
        <>
          <input value={cssName} onChange={(e) => handleCssNameChange(e.target.value)} className="input-field" placeholder="e.g. teal, navy, orange" list="css-color-names" />
          <datalist id="css-color-names">
            {Object.keys(CSS_NAMES).map((name) => <option key={name} value={name} />)}
          </datalist>
        </>
      )}

      <div className="flex items-center gap-3">
        <input type="color" value={picker} onChange={handlePicker} className="w-14 h-10" />
        <p className="text-sm text-gray-500 dark:text-gray-400">Visual picker: {picker}</p>
      </div>

      <div className="h-24 rounded-xl border border-gray-200 dark:border-gray-700" style={{ backgroundColor: outputs.hex }} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {Object.entries(outputs).map(([key, value]) => (
          <div key={key} className="rounded-lg border border-gray-200 dark:border-gray-700 p-3 bg-white dark:bg-gray-800 flex justify-between items-center gap-2">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">{key === 'cssName' ? 'CSS Name' : key}</p>
              <p className="font-mono text-sm">{value}</p>
            </div>
            <button className="btn-secondary" onClick={() => navigator.clipboard.writeText(String(value))}>Copy</button>
          </div>
        ))}
      </div>

      <button className="btn-primary" onClick={savePalette}>Save to palette</button>

      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Contrast Checker</h3>
        <input value={secondColor} onChange={(e) => setSecondColor(e.target.value)} className="input-field mb-2" placeholder="Second color" />
        <p className="text-sm text-gray-700 dark:text-gray-300">Contrast ratio: {ratio.toFixed(2)}:1</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">AA normal text: {ratio >= 4.5 ? 'Pass' : 'Fail'} | AAA normal text: {ratio >= 7 ? 'Pass' : 'Fail'}</p>
      </div>

      {palette.length > 0 ? (
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Recent Palette</h3>
          <div className="grid grid-cols-6 md:grid-cols-12 gap-2">
            {palette.map((c) => (
              <button key={c} className="h-9 rounded-md border border-gray-200 dark:border-gray-600" style={{ backgroundColor: c }} title={c} onClick={() => loadFromPalette(c)} />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}
