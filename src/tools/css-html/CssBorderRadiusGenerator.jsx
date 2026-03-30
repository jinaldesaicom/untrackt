import { useState, useEffect } from 'react'
import { Copy, Check, RotateCcw } from 'lucide-react'
import { getItem, setItem } from '../../utils/storage'

const STORAGE_KEY = 'untrackt_css_border_radius'

const defaults = { tl: 16, tr: 16, br: 16, bl: 16, linked: true, unit: 'px', width: 200, height: 200 }

export default function CssBorderRadiusGenerator() {
  const [state, setState] = useState(() => getItem(STORAGE_KEY, defaults))
  const [copied, setCopied] = useState(false)

  useEffect(() => { setItem(STORAGE_KEY, state) }, [state])

  const set = (key, val) => {
    if (state.linked && ['tl', 'tr', 'br', 'bl'].includes(key)) {
      setState(prev => ({ ...prev, tl: val, tr: val, br: val, bl: val }))
    } else {
      setState(prev => ({ ...prev, [key]: val }))
    }
  }

  const u = state.unit
  const radiusValue = `${state.tl}${u} ${state.tr}${u} ${state.br}${u} ${state.bl}${u}`
  const fullCss = `border-radius: ${radiusValue};`

  const copy = () => {
    navigator.clipboard.writeText(fullCss)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const reset = () => setState(defaults)

  const corners = [
    { key: 'tl', label: 'Top Left' },
    { key: 'tr', label: 'Top Right' },
    { key: 'br', label: 'Bottom Right' },
    { key: 'bl', label: 'Bottom Left' },
  ]

  return (
    <div className="space-y-5">
      {/* Preview */}
      <div className="flex items-center justify-center rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-10">
        <div
          className="bg-teal-500 dark:bg-teal-400 transition-all duration-200"
          style={{
            width: `${Math.min(state.width, 300)}px`,
            height: `${Math.min(state.height, 300)}px`,
            borderRadius: `${state.tl}px ${state.tr}px ${state.br}px ${state.bl}px`,
          }}
        />
      </div>

      {/* Controls */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 space-y-3">
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
            <input type="checkbox" checked={state.linked} onChange={e => set('linked', e.target.checked)} className="rounded" />
            Link all corners
          </label>
          <div className="flex items-center gap-2">
            <select value={state.unit} onChange={e => set('unit', e.target.value)} className="text-xs bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-2 py-1 text-gray-700 dark:text-gray-300">
              <option value="px">px</option>
              <option value="%">%</option>
              <option value="rem">rem</option>
            </select>
            <button onClick={reset} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1" title="Reset"><RotateCcw className="w-4 h-4" /></button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {corners.map(c => (
            <div key={c.key}>
              <label className="text-[10px] text-gray-500 dark:text-gray-400 uppercase">{c.label}</label>
              <input type="range" min={0} max={state.unit === '%' ? 50 : 200} value={state[c.key]} onChange={e => set(c.key, +e.target.value)} className="w-full" />
              <div className="text-xs text-center text-gray-600 dark:text-gray-300">{state[c.key]}{u}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-[10px] text-gray-500 dark:text-gray-400 uppercase">Width</label>
            <input type="range" min={50} max={300} value={state.width} onChange={e => set('width', +e.target.value)} className="w-full" />
            <div className="text-xs text-center text-gray-600 dark:text-gray-300">{state.width}px</div>
          </div>
          <div>
            <label className="text-[10px] text-gray-500 dark:text-gray-400 uppercase">Height</label>
            <input type="range" min={50} max={300} value={state.height} onChange={e => set('height', +e.target.value)} className="w-full" />
            <div className="text-xs text-center text-gray-600 dark:text-gray-300">{state.height}px</div>
          </div>
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
        <pre className="text-sm text-green-400 font-mono">{fullCss}</pre>
      </div>
    </div>
  )
}
