import { useState, useEffect } from 'react'
import { Copy, Check, RotateCcw } from 'lucide-react'
import { getItem, setItem } from '../../utils/storage'

const STORAGE_KEY = 'untrackt_css_filter'

const filterDefs = [
  { key: 'blur', label: 'Blur', unit: 'px', min: 0, max: 20, step: 0.5, def: 0 },
  { key: 'brightness', label: 'Brightness', unit: '%', min: 0, max: 300, step: 5, def: 100 },
  { key: 'contrast', label: 'Contrast', unit: '%', min: 0, max: 300, step: 5, def: 100 },
  { key: 'grayscale', label: 'Grayscale', unit: '%', min: 0, max: 100, step: 5, def: 0 },
  { key: 'hueRotate', label: 'Hue Rotate', unit: 'deg', min: 0, max: 360, step: 5, def: 0 },
  { key: 'invert', label: 'Invert', unit: '%', min: 0, max: 100, step: 5, def: 0 },
  { key: 'opacity', label: 'Opacity', unit: '%', min: 0, max: 100, step: 5, def: 100 },
  { key: 'saturate', label: 'Saturate', unit: '%', min: 0, max: 300, step: 5, def: 100 },
  { key: 'sepia', label: 'Sepia', unit: '%', min: 0, max: 100, step: 5, def: 0 },
]

const defaultValues = Object.fromEntries(filterDefs.map(f => [f.key, f.def]))

export default function CssFilterGenerator() {
  const [values, setValues] = useState(() => getItem(STORAGE_KEY, defaultValues))
  const [copied, setCopied] = useState(false)

  useEffect(() => { setItem(STORAGE_KEY, values) }, [values])

  const set = (key, val) => setValues(prev => ({ ...prev, [key]: val }))
  const reset = () => setValues(defaultValues)

  const filterParts = []
  if (values.blur !== 0) filterParts.push(`blur(${values.blur}px)`)
  if (values.brightness !== 100) filterParts.push(`brightness(${values.brightness}%)`)
  if (values.contrast !== 100) filterParts.push(`contrast(${values.contrast}%)`)
  if (values.grayscale !== 0) filterParts.push(`grayscale(${values.grayscale}%)`)
  if (values.hueRotate !== 0) filterParts.push(`hue-rotate(${values.hueRotate}deg)`)
  if (values.invert !== 0) filterParts.push(`invert(${values.invert}%)`)
  if (values.opacity !== 100) filterParts.push(`opacity(${values.opacity}%)`)
  if (values.saturate !== 100) filterParts.push(`saturate(${values.saturate}%)`)
  if (values.sepia !== 0) filterParts.push(`sepia(${values.sepia}%)`)

  const filterStr = filterParts.length > 0 ? filterParts.join(' ') : 'none'
  const fullCss = `filter: ${filterStr};`

  const copy = () => {
    navigator.clipboard.writeText(fullCss)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="space-y-5">
      {/* Preview */}
      <div className="flex items-center justify-center rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-6">
        <div
          className="w-56 h-36 rounded-xl bg-gradient-to-br from-teal-400 via-cyan-500 to-indigo-500 flex items-center justify-center text-white font-bold text-lg"
          style={{ filter: filterStr }}
        >
          Preview
        </div>
      </div>

      {/* Controls */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Filter Settings</span>
          <button onClick={reset} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1" title="Reset"><RotateCcw className="w-4 h-4" /></button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
          {filterDefs.map(f => (
            <div key={f.key} className="flex items-center gap-2">
              <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase w-20 shrink-0">{f.label}</span>
              <input type="range" min={f.min} max={f.max} step={f.step} value={values[f.key]} onChange={e => set(f.key, +e.target.value)} className="flex-1" />
              <span className="text-xs text-gray-600 dark:text-gray-300 w-14 text-right font-mono">{values[f.key]}{f.unit}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CSS Output */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-900 p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] text-gray-400 uppercase tracking-wide">Generated CSS</span>
          <button onClick={copy} className="flex items-center gap-1 text-xs text-teal-400 hover:text-teal-300">
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <pre className="text-sm text-green-400 font-mono whitespace-pre-wrap">{fullCss}</pre>
      </div>
    </div>
  )
}
