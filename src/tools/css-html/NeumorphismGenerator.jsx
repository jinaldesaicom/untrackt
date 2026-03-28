import { useState, useEffect } from 'react'
import { Copy, Check, RotateCcw } from 'lucide-react'
import { getItem, setItem } from '../../utils/storage'

const STORAGE_KEY = 'untrackt_neumorphism'

const defaults = {
  bgColor: '#e0e5ec',
  size: 200,
  radius: 30,
  distance: 10,
  intensity: 15,
  blur: 20,
  shape: 'flat', // flat, concave, convex, pressed
}

function adjustColor(hex, amount) {
  const num = parseInt(hex.slice(1), 16)
  let r = (num >> 16) + amount
  let g = ((num >> 8) & 0x00FF) + amount
  let b = (num & 0x0000FF) + amount
  r = Math.max(0, Math.min(255, r))
  g = Math.max(0, Math.min(255, g))
  b = Math.max(0, Math.min(255, b))
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`
}

export default function NeumorphismGenerator() {
  const [state, setState] = useState(() => getItem(STORAGE_KEY, defaults))
  const [copied, setCopied] = useState(false)

  useEffect(() => { setItem(STORAGE_KEY, state) }, [state])
  const set = (key, val) => setState(prev => ({ ...prev, [key]: val }))
  const reset = () => setState(defaults)

  const lightShadow = adjustColor(state.bgColor, state.intensity * 3)
  const darkShadow = adjustColor(state.bgColor, -state.intensity * 3)

  let boxShadow
  let background = state.bgColor

  switch (state.shape) {
    case 'concave':
      boxShadow = `${state.distance}px ${state.distance}px ${state.blur}px ${darkShadow}, -${state.distance}px -${state.distance}px ${state.blur}px ${lightShadow}`
      background = `linear-gradient(145deg, ${adjustColor(state.bgColor, -10)}, ${adjustColor(state.bgColor, 10)})`
      break
    case 'convex':
      boxShadow = `${state.distance}px ${state.distance}px ${state.blur}px ${darkShadow}, -${state.distance}px -${state.distance}px ${state.blur}px ${lightShadow}`
      background = `linear-gradient(145deg, ${adjustColor(state.bgColor, 10)}, ${adjustColor(state.bgColor, -10)})`
      break
    case 'pressed':
      boxShadow = `inset ${state.distance}px ${state.distance}px ${state.blur}px ${darkShadow}, inset -${state.distance}px -${state.distance}px ${state.blur}px ${lightShadow}`
      break
    default:
      boxShadow = `${state.distance}px ${state.distance}px ${state.blur}px ${darkShadow}, -${state.distance}px -${state.distance}px ${state.blur}px ${lightShadow}`
  }

  const css = `border-radius: ${state.radius}px;
background: ${background};
box-shadow: ${boxShadow};`

  const copy = () => {
    navigator.clipboard.writeText(css)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const shapes = ['flat', 'concave', 'convex', 'pressed']

  return (
    <div className="space-y-5">
      {/* Preview */}
      <div className="flex items-center justify-center rounded-xl p-10" style={{ backgroundColor: state.bgColor }}>
        <div
          style={{
            width: `${Math.min(state.size, 280)}px`,
            height: `${Math.min(state.size, 280)}px`,
            borderRadius: `${state.radius}px`,
            background,
            boxShadow,
          }}
        />
      </div>

      {/* Shape selector */}
      <div className="flex flex-wrap gap-2">
        {shapes.map(s => (
          <button key={s} onClick={() => set('shape', s)} className={`px-4 py-1.5 text-xs rounded-full border capitalize transition-colors ${state.shape === s ? 'bg-teal-500 text-white border-teal-500' : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'}`}>
            {s}
          </button>
        ))}
      </div>

      {/* Controls */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Settings</span>
          <button onClick={reset} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1"><RotateCcw className="w-4 h-4" /></button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div>
            <label className="text-[10px] text-gray-500 dark:text-gray-400 uppercase">Background</label>
            <div className="flex items-center gap-1.5 mt-0.5">
              <input type="color" value={state.bgColor} onChange={e => set('bgColor', e.target.value)} className="w-7 h-7 rounded cursor-pointer border-0" />
              <span className="text-xs font-mono text-gray-600 dark:text-gray-300">{state.bgColor}</span>
            </div>
          </div>
          {[
            { label: 'Size', key: 'size', min: 80, max: 280 },
            { label: 'Radius', key: 'radius', min: 0, max: 140 },
            { label: 'Distance', key: 'distance', min: 1, max: 40 },
            { label: 'Intensity', key: 'intensity', min: 1, max: 30 },
            { label: 'Blur', key: 'blur', min: 1, max: 60 },
          ].map(c => (
            <div key={c.key}>
              <label className="text-[10px] text-gray-500 dark:text-gray-400 uppercase">{c.label}</label>
              <input type="range" min={c.min} max={c.max} value={state[c.key]} onChange={e => set(c.key, +e.target.value)} className="w-full" />
              <div className="text-xs text-center text-gray-600 dark:text-gray-300">{state[c.key]}px</div>
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
        <pre className="text-sm text-green-400 font-mono whitespace-pre-wrap">{css}</pre>
      </div>
    </div>
  )
}
