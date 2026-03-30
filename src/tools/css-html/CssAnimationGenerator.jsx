import { useState, useEffect } from 'react'
import { Copy, Check, Plus, Trash2, RotateCcw } from 'lucide-react'
import { getItem, setItem } from '../../utils/storage'

const STORAGE_KEY = 'untrackt_css_animation'

const defaults = {
  name: 'myAnimation',
  duration: 1,
  timing: 'ease',
  delay: 0,
  iterations: 'infinite',
  direction: 'normal',
  fillMode: 'none',
  keyframes: [
    { offset: 0, props: 'opacity: 0; transform: translateY(-20px);' },
    { offset: 100, props: 'opacity: 1; transform: translateY(0);' },
  ],
}

const timings = ['ease', 'ease-in', 'ease-out', 'ease-in-out', 'linear', 'step-start', 'step-end']
const directions = ['normal', 'reverse', 'alternate', 'alternate-reverse']
const fillModes = ['none', 'forwards', 'backwards', 'both']

export default function CssAnimationGenerator() {
  const [state, setState] = useState(() => getItem(STORAGE_KEY, defaults))
  const [copied, setCopied] = useState(false)
  const [previewKey, setPreviewKey] = useState(0)

  useEffect(() => { setItem(STORAGE_KEY, state) }, [state])
  const set = (key, val) => setState(prev => ({ ...prev, [key]: val }))

  const updateKF = (idx, key, val) => {
    setState(prev => ({ ...prev, keyframes: prev.keyframes.map((k, i) => i === idx ? { ...k, [key]: val } : k) }))
  }
  const addKF = () => {
    setState(prev => ({ ...prev, keyframes: [...prev.keyframes, { offset: 50, props: '' }] }))
  }
  const removeKF = (idx) => {
    setState(prev => ({ ...prev, keyframes: prev.keyframes.filter((_, i) => i !== idx) }))
  }

  const kfCss = state.keyframes
    .sort((a, b) => a.offset - b.offset)
    .map(k => `  ${k.offset}% {\n    ${k.props}\n  }`)
    .join('\n')

  const fullCss = `@keyframes ${state.name} {\n${kfCss}\n}\n\n.element {\n  animation: ${state.name} ${state.duration}s ${state.timing} ${state.delay}s ${state.iterations} ${state.direction} ${state.fillMode};\n}`

  const copy = () => {
    navigator.clipboard.writeText(fullCss)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  // Generate inline style for preview
  const styleTag = `@keyframes ${state.name}{${state.keyframes.sort((a, b) => a.offset - b.offset).map(k => `${k.offset}%{${k.props}}`).join('')}}`

  return (
    <div className="space-y-5">
      {/* Preview */}
      <div className="flex items-center justify-center rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-10 min-h-[160px] relative">
        <style>{styleTag}</style>
        <div
          key={previewKey}
          className="w-24 h-24 rounded-xl bg-teal-500"
          style={{
            animation: `${state.name} ${state.duration}s ${state.timing} ${state.delay}s ${state.iterations} ${state.direction} ${state.fillMode}`,
          }}
        />
        <button onClick={() => setPreviewKey(k => k + 1)} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" title="Replay"><RotateCcw className="w-4 h-4" /></button>
      </div>

      {/* Animation Props */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 space-y-3">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div>
            <label className="text-[10px] text-gray-500 dark:text-gray-400 uppercase">Name</label>
            <input value={state.name} onChange={e => set('name', e.target.value.replace(/[^a-zA-Z0-9_-]/g, ''))} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-2 py-1 text-xs text-gray-700 dark:text-gray-300 font-mono" />
          </div>
          <div>
            <label className="text-[10px] text-gray-500 dark:text-gray-400 uppercase">Duration (s)</label>
            <input type="number" min={0.1} max={20} step={0.1} value={state.duration} onChange={e => set('duration', +e.target.value)} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-2 py-1 text-xs text-gray-700 dark:text-gray-300" />
          </div>
          <div>
            <label className="text-[10px] text-gray-500 dark:text-gray-400 uppercase">Timing</label>
            <select value={state.timing} onChange={e => set('timing', e.target.value)} className="w-full text-xs bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-2 py-1 text-gray-700 dark:text-gray-300">
              {timings.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="text-[10px] text-gray-500 dark:text-gray-400 uppercase">Delay (s)</label>
            <input type="number" min={0} max={10} step={0.1} value={state.delay} onChange={e => set('delay', +e.target.value)} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-2 py-1 text-xs text-gray-700 dark:text-gray-300" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="text-[10px] text-gray-500 dark:text-gray-400 uppercase">Iterations</label>
            <input value={state.iterations} onChange={e => set('iterations', e.target.value)} placeholder="infinite or number" className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-2 py-1 text-xs text-gray-700 dark:text-gray-300" />
          </div>
          <div>
            <label className="text-[10px] text-gray-500 dark:text-gray-400 uppercase">Direction</label>
            <select value={state.direction} onChange={e => set('direction', e.target.value)} className="w-full text-xs bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-2 py-1 text-gray-700 dark:text-gray-300">
              {directions.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div>
            <label className="text-[10px] text-gray-500 dark:text-gray-400 uppercase">Fill Mode</label>
            <select value={state.fillMode} onChange={e => set('fillMode', e.target.value)} className="w-full text-xs bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-2 py-1 text-gray-700 dark:text-gray-300">
              {fillModes.map(f => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Keyframes */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Keyframes</span>
          <button onClick={addKF} className="btn-primary flex items-center gap-1.5 text-xs"><Plus className="w-3.5 h-3.5" /> Add</button>
        </div>
        {state.keyframes.map((kf, idx) => (
          <div key={idx} className="flex items-start gap-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-2">
            <div className="w-16">
              <label className="text-[10px] text-gray-500 dark:text-gray-400 uppercase">%</label>
              <input type="number" min={0} max={100} value={kf.offset} onChange={e => updateKF(idx, 'offset', +e.target.value)} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-2 py-1 text-xs text-gray-700 dark:text-gray-300" />
            </div>
            <div className="flex-1">
              <label className="text-[10px] text-gray-500 dark:text-gray-400 uppercase">CSS Properties</label>
              <input value={kf.props} onChange={e => updateKF(idx, 'props', e.target.value)} placeholder="opacity: 1; transform: scale(1);" className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-2 py-1 text-xs text-gray-700 dark:text-gray-300 font-mono" />
            </div>
            {state.keyframes.length > 2 && (
              <button onClick={() => removeKF(idx)} className="text-red-400 hover:text-red-600 mt-4 p-0.5"><Trash2 className="w-3.5 h-3.5" /></button>
            )}
          </div>
        ))}
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
