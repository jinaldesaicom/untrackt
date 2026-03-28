import { useState, useEffect } from 'react'
import { Copy, Check, RotateCcw } from 'lucide-react'
import { getItem, setItem } from '../../utils/storage'

const STORAGE_KEY = 'untrackt_glassmorphism'

const defaults = { bgColor: '#ffffff', opacity: 0.15, blur: 12, borderOpacity: 0.2, borderRadius: 16, saturation: 180 }

export default function GlassmorphismGenerator() {
  const [state, setState] = useState(() => getItem(STORAGE_KEY, defaults))
  const [copied, setCopied] = useState(false)

  useEffect(() => { setItem(STORAGE_KEY, state) }, [state])
  const set = (key, val) => setState(prev => ({ ...prev, [key]: val }))
  const reset = () => setState(defaults)

  const hexToRgb = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return `${r}, ${g}, ${b}`
  }

  const rgb = hexToRgb(state.bgColor)
  const css = `background: rgba(${rgb}, ${state.opacity});
backdrop-filter: blur(${state.blur}px) saturate(${state.saturation}%);
-webkit-backdrop-filter: blur(${state.blur}px) saturate(${state.saturation}%);
border-radius: ${state.borderRadius}px;
border: 1px solid rgba(${rgb}, ${state.borderOpacity});`

  const copy = () => {
    navigator.clipboard.writeText(css)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="space-y-5">
      {/* Preview */}
      <div
        className="rounded-xl p-2 min-h-[280px] flex items-center justify-center relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)' }}
      >
        {/* Decorative blobs */}
        <div className="absolute w-32 h-32 rounded-full bg-yellow-300 opacity-70 top-4 left-8" />
        <div className="absolute w-24 h-24 rounded-full bg-pink-400 opacity-70 bottom-6 right-10" />
        <div className="absolute w-20 h-20 rounded-full bg-cyan-300 opacity-70 top-10 right-20" />

        <div
          className="relative p-8 max-w-xs text-center"
          style={{
            background: `rgba(${rgb}, ${state.opacity})`,
            backdropFilter: `blur(${state.blur}px) saturate(${state.saturation}%)`,
            WebkitBackdropFilter: `blur(${state.blur}px) saturate(${state.saturation}%)`,
            borderRadius: `${state.borderRadius}px`,
            border: `1px solid rgba(${rgb}, ${state.borderOpacity})`,
          }}
        >
          <div className="text-white font-bold text-lg mb-1">Glass Card</div>
          <div className="text-white/80 text-sm">A frosted glass UI effect using backdrop-filter.</div>
        </div>
      </div>

      {/* Controls */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Settings</span>
          <button onClick={reset} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1"><RotateCcw className="w-4 h-4" /></button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div>
            <label className="text-[10px] text-gray-500 dark:text-gray-400 uppercase">Base Color</label>
            <div className="flex items-center gap-1.5 mt-0.5">
              <input type="color" value={state.bgColor} onChange={e => set('bgColor', e.target.value)} className="w-7 h-7 rounded cursor-pointer border-0" />
              <span className="text-xs font-mono text-gray-600 dark:text-gray-300">{state.bgColor}</span>
            </div>
          </div>
          {[
            { label: 'Opacity', key: 'opacity', min: 0, max: 1, step: 0.05 },
            { label: 'Blur', key: 'blur', min: 0, max: 30, step: 1 },
            { label: 'Border Opacity', key: 'borderOpacity', min: 0, max: 1, step: 0.05 },
            { label: 'Border Radius', key: 'borderRadius', min: 0, max: 40, step: 1 },
            { label: 'Saturation', key: 'saturation', min: 100, max: 300, step: 10 },
          ].map(c => (
            <div key={c.key}>
              <label className="text-[10px] text-gray-500 dark:text-gray-400 uppercase">{c.label}</label>
              <input type="range" min={c.min} max={c.max} step={c.step} value={state[c.key]} onChange={e => set(c.key, +e.target.value)} className="w-full" />
              <div className="text-xs text-center text-gray-600 dark:text-gray-300">{state[c.key]}{c.key.includes('pacity') ? '' : c.key === 'saturation' ? '%' : 'px'}</div>
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
