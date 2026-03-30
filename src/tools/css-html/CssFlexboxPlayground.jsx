import { useState, useEffect } from 'react'
import { Copy, Check, Plus, Trash2 } from 'lucide-react'
import { getItem, setItem } from '../../utils/storage'

const STORAGE_KEY = 'untrackt_css_flexbox'

const defaults = {
  direction: 'row', wrap: 'nowrap', justify: 'flex-start',
  alignItems: 'stretch', alignContent: 'stretch', gap: 8, items: 4,
}

const options = {
  direction: ['row', 'row-reverse', 'column', 'column-reverse'],
  wrap: ['nowrap', 'wrap', 'wrap-reverse'],
  justify: ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'],
  alignItems: ['flex-start', 'flex-end', 'center', 'stretch', 'baseline'],
  alignContent: ['flex-start', 'flex-end', 'center', 'stretch', 'space-between', 'space-around'],
}

export default function CssFlexboxPlayground() {
  const [state, setState] = useState(() => getItem(STORAGE_KEY, defaults))
  const [copied, setCopied] = useState(false)

  useEffect(() => { setItem(STORAGE_KEY, state) }, [state])

  const set = (key, val) => setState(prev => ({ ...prev, [key]: val }))

  const containerCss = `display: flex;
flex-direction: ${state.direction};
flex-wrap: ${state.wrap};
justify-content: ${state.justify};
align-items: ${state.alignItems};
align-content: ${state.alignContent};
gap: ${state.gap}px;`

  const copy = () => {
    navigator.clipboard.writeText(containerCss)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const colors = ['bg-teal-400', 'bg-cyan-400', 'bg-sky-400', 'bg-indigo-400', 'bg-violet-400', 'bg-fuchsia-400', 'bg-rose-400', 'bg-amber-400', 'bg-emerald-400', 'bg-orange-400']

  return (
    <div className="space-y-5">
      {/* Preview */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-2 min-h-[220px]">
        <div
          className="w-full min-h-[200px] rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 p-2"
          style={{
            display: 'flex',
            flexDirection: state.direction,
            flexWrap: state.wrap,
            justifyContent: state.justify,
            alignItems: state.alignItems,
            alignContent: state.alignContent,
            gap: `${state.gap}px`,
          }}
        >
          {Array.from({ length: state.items }, (_, i) => (
            <div
              key={i}
              className={`${colors[i % colors.length]} rounded-lg flex items-center justify-center text-white font-bold text-sm`}
              style={{ width: 60 + (i % 3) * 20, height: 50 + (i % 2) * 15, minWidth: 40 }}
            >
              {i + 1}
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 space-y-3">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { label: 'Direction', key: 'direction', opts: options.direction },
            { label: 'Wrap', key: 'wrap', opts: options.wrap },
            { label: 'Justify Content', key: 'justify', opts: options.justify },
            { label: 'Align Items', key: 'alignItems', opts: options.alignItems },
            { label: 'Align Content', key: 'alignContent', opts: options.alignContent },
          ].map(ctrl => (
            <div key={ctrl.key}>
              <label className="text-[10px] text-gray-500 dark:text-gray-400 uppercase block mb-1">{ctrl.label}</label>
              <select value={state[ctrl.key]} onChange={e => set(ctrl.key, e.target.value)} className="w-full text-xs bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-2 py-1.5 text-gray-700 dark:text-gray-300">
                {ctrl.opts.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-[10px] text-gray-500 dark:text-gray-400 uppercase">Gap</label>
            <input type="range" min={0} max={40} value={state.gap} onChange={e => set('gap', +e.target.value)} className="w-full" />
            <div className="text-xs text-center text-gray-600 dark:text-gray-300">{state.gap}px</div>
          </div>
          <div>
            <label className="text-[10px] text-gray-500 dark:text-gray-400 uppercase">Items</label>
            <div className="flex items-center gap-2 mt-1">
              <button onClick={() => set('items', Math.max(1, state.items - 1))} className="px-2 py-0.5 text-sm rounded border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"><Trash2 className="w-3 h-3 inline" /></button>
              <span className="text-sm font-mono text-gray-700 dark:text-gray-300">{state.items}</span>
              <button onClick={() => set('items', Math.min(12, state.items + 1))} className="px-2 py-0.5 text-sm rounded border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"><Plus className="w-3 h-3 inline" /></button>
            </div>
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
        <pre className="text-sm text-green-400 font-mono whitespace-pre-wrap">{containerCss}</pre>
      </div>
    </div>
  )
}
