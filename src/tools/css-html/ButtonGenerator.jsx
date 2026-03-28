import { useState, useEffect } from 'react'
import { Copy, Check } from 'lucide-react'
import { getItem, setItem } from '../../utils/storage'

const STORAGE_KEY = 'untrackt_button_generator'

const defaults = {
  text: 'Click Me',
  bgColor: '#0d9488', textColor: '#ffffff',
  hoverBgColor: '#0f766e', hoverTextColor: '#ffffff',
  paddingX: 24, paddingY: 12,
  fontSize: 16, fontWeight: '600',
  borderWidth: 0, borderColor: '#0d9488', borderRadius: 8,
  shadowX: 0, shadowY: 2, shadowBlur: 8, shadowSpread: 0, shadowColor: '#00000025',
  transition: '0.2',
}

export default function ButtonGenerator() {
  const [state, setState] = useState(() => getItem(STORAGE_KEY, defaults))
  const [copied, setCopied] = useState(false)
  const [hovering, setHovering] = useState(false)

  useEffect(() => { setItem(STORAGE_KEY, state) }, [state])
  const set = (key, val) => setState(prev => ({ ...prev, [key]: val }))

  const btnStyle = {
    backgroundColor: hovering ? state.hoverBgColor : state.bgColor,
    color: hovering ? state.hoverTextColor : state.textColor,
    padding: `${state.paddingY}px ${state.paddingX}px`,
    fontSize: `${state.fontSize}px`,
    fontWeight: state.fontWeight,
    border: state.borderWidth > 0 ? `${state.borderWidth}px solid ${state.borderColor}` : 'none',
    borderRadius: `${state.borderRadius}px`,
    boxShadow: `${state.shadowX}px ${state.shadowY}px ${state.shadowBlur}px ${state.shadowSpread}px ${state.shadowColor}`,
    transition: `all ${state.transition}s ease`,
    cursor: 'pointer',
  }

  const css = `.btn {
  background-color: ${state.bgColor};
  color: ${state.textColor};
  padding: ${state.paddingY}px ${state.paddingX}px;
  font-size: ${state.fontSize}px;
  font-weight: ${state.fontWeight};
  border: ${state.borderWidth > 0 ? `${state.borderWidth}px solid ${state.borderColor}` : 'none'};
  border-radius: ${state.borderRadius}px;
  box-shadow: ${state.shadowX}px ${state.shadowY}px ${state.shadowBlur}px ${state.shadowSpread}px ${state.shadowColor};
  transition: all ${state.transition}s ease;
  cursor: pointer;
}

.btn:hover {
  background-color: ${state.hoverBgColor};
  color: ${state.hoverTextColor};
}`

  const htmlCode = `<button class="btn">${state.text}</button>`

  const copy = () => {
    navigator.clipboard.writeText(css + '\n\n/* HTML */\n' + htmlCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="space-y-5">
      {/* Preview */}
      <div className="flex items-center justify-center rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-10">
        <button
          style={btnStyle}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          {state.text}
        </button>
      </div>

      {/* Controls */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 space-y-4">
        {/* Text */}
        <div>
          <label className="text-[10px] text-gray-500 dark:text-gray-400 uppercase">Button Text</label>
          <input value={state.text} onChange={e => set('text', e.target.value)} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-3 py-1.5 text-sm text-gray-700 dark:text-gray-300" />
        </div>

        {/* Colors */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Background', key: 'bgColor' },
            { label: 'Text Color', key: 'textColor' },
            { label: 'Hover BG', key: 'hoverBgColor' },
            { label: 'Hover Text', key: 'hoverTextColor' },
          ].map(c => (
            <div key={c.key}>
              <label className="text-[10px] text-gray-500 dark:text-gray-400 uppercase">{c.label}</label>
              <div className="flex items-center gap-1.5 mt-0.5">
                <input type="color" value={state[c.key].slice(0, 7)} onChange={e => set(c.key, e.target.value)} className="w-7 h-7 rounded cursor-pointer border-0" />
                <input value={state[c.key]} onChange={e => set(c.key, e.target.value)} className="flex-1 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-2 py-0.5 text-xs text-gray-700 dark:text-gray-300 font-mono" />
              </div>
            </div>
          ))}
        </div>

        {/* Sizing */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Padding X', key: 'paddingX', min: 0, max: 60 },
            { label: 'Padding Y', key: 'paddingY', min: 0, max: 40 },
            { label: 'Font Size', key: 'fontSize', min: 10, max: 36 },
            { label: 'Border Radius', key: 'borderRadius', min: 0, max: 50 },
          ].map(c => (
            <div key={c.key}>
              <label className="text-[10px] text-gray-500 dark:text-gray-400 uppercase">{c.label}</label>
              <input type="range" min={c.min} max={c.max} value={state[c.key]} onChange={e => set(c.key, +e.target.value)} className="w-full" />
              <div className="text-xs text-center text-gray-600 dark:text-gray-300">{state[c.key]}px</div>
            </div>
          ))}
        </div>

        {/* Border & Shadow */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div>
            <label className="text-[10px] text-gray-500 dark:text-gray-400 uppercase">Border Width</label>
            <input type="range" min={0} max={5} value={state.borderWidth} onChange={e => set('borderWidth', +e.target.value)} className="w-full" />
            <div className="text-xs text-center text-gray-600 dark:text-gray-300">{state.borderWidth}px</div>
          </div>
          <div>
            <label className="text-[10px] text-gray-500 dark:text-gray-400 uppercase">Font Weight</label>
            <select value={state.fontWeight} onChange={e => set('fontWeight', e.target.value)} className="w-full text-xs bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-2 py-1 text-gray-700 dark:text-gray-300">
              {['400', '500', '600', '700', '800'].map(w => <option key={w} value={w}>{w}</option>)}
            </select>
          </div>
          <div>
            <label className="text-[10px] text-gray-500 dark:text-gray-400 uppercase">Shadow Blur</label>
            <input type="range" min={0} max={30} value={state.shadowBlur} onChange={e => set('shadowBlur', +e.target.value)} className="w-full" />
            <div className="text-xs text-center text-gray-600 dark:text-gray-300">{state.shadowBlur}px</div>
          </div>
          <div>
            <label className="text-[10px] text-gray-500 dark:text-gray-400 uppercase">Transition</label>
            <input type="range" min={0} max={1} step={0.05} value={state.transition} onChange={e => set('transition', e.target.value)} className="w-full" />
            <div className="text-xs text-center text-gray-600 dark:text-gray-300">{state.transition}s</div>
          </div>
        </div>
      </div>

      {/* CSS Output */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-900 p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] text-gray-400 uppercase tracking-wide">Generated CSS + HTML</span>
          <button onClick={copy} className="flex items-center gap-1 text-xs text-teal-400 hover:text-teal-300">
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <pre className="text-xs text-green-400 font-mono whitespace-pre-wrap">{css + '\n\n' + htmlCode}</pre>
      </div>
    </div>
  )
}
