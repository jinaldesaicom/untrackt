import { useState, useEffect } from 'react'
import { Copy, Check, RotateCcw } from 'lucide-react'
import { getItem, setItem } from '../../utils/storage'

const STORAGE_KEY = 'untrackt_css_grid'

const defaults = { cols: 3, rows: 2, colGap: 8, rowGap: 8, colUnit: 'fr', rowUnit: 'fr', colSizes: '1,1,1', rowSizes: '1,1' }

export default function CssGridGenerator() {
  const [state, setState] = useState(() => getItem(STORAGE_KEY, defaults))
  const [copied, setCopied] = useState(false)

  useEffect(() => { setItem(STORAGE_KEY, state) }, [state])
  const set = (key, val) => setState(prev => ({ ...prev, [key]: val }))

  const colTemplate = state.colSizes.split(',').map(s => `${s.trim()}${state.colUnit}`).join(' ')
  const rowTemplate = state.rowSizes.split(',').map(s => `${s.trim()}${state.rowUnit}`).join(' ')

  const gridCss = `display: grid;
grid-template-columns: ${colTemplate};
grid-template-rows: ${rowTemplate};
column-gap: ${state.colGap}px;
row-gap: ${state.rowGap}px;`

  const copy = () => {
    navigator.clipboard.writeText(gridCss)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const reset = () => setState(defaults)
  const cellCount = state.cols * state.rows

  const colors = ['bg-teal-200 dark:bg-teal-800', 'bg-cyan-200 dark:bg-cyan-800', 'bg-sky-200 dark:bg-sky-800', 'bg-indigo-200 dark:bg-indigo-800', 'bg-violet-200 dark:bg-violet-800', 'bg-fuchsia-200 dark:bg-fuchsia-800']

  return (
    <div className="space-y-5">
      {/* Preview */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-4">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: colTemplate,
            gridTemplateRows: rowTemplate,
            columnGap: `${state.colGap}px`,
            rowGap: `${state.rowGap}px`,
          }}
        >
          {Array.from({ length: cellCount }, (_, i) => (
            <div key={i} className={`${colors[i % colors.length]} rounded-lg min-h-[50px] flex items-center justify-center text-sm font-bold text-gray-700 dark:text-gray-200`}>
              {i + 1}
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Grid Settings</span>
          <button onClick={reset} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1"><RotateCcw className="w-4 h-4" /></button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-[10px] text-gray-500 dark:text-gray-400 uppercase">Columns</label>
            <input type="range" min={1} max={6} value={state.cols} onChange={e => {
              const n = +e.target.value
              set('cols', n)
              set('colSizes', Array(n).fill('1').join(','))
            }} className="w-full" />
            <div className="text-xs text-center text-gray-600 dark:text-gray-300">{state.cols}</div>
          </div>
          <div>
            <label className="text-[10px] text-gray-500 dark:text-gray-400 uppercase">Rows</label>
            <input type="range" min={1} max={6} value={state.rows} onChange={e => {
              const n = +e.target.value
              set('rows', n)
              set('rowSizes', Array(n).fill('1').join(','))
            }} className="w-full" />
            <div className="text-xs text-center text-gray-600 dark:text-gray-300">{state.rows}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-[10px] text-gray-500 dark:text-gray-400 uppercase">Column Sizes (comma-separated)</label>
            <input value={state.colSizes} onChange={e => set('colSizes', e.target.value)} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-2 py-1 text-xs text-gray-700 dark:text-gray-300 font-mono" />
          </div>
          <div>
            <label className="text-[10px] text-gray-500 dark:text-gray-400 uppercase">Row Sizes (comma-separated)</label>
            <input value={state.rowSizes} onChange={e => set('rowSizes', e.target.value)} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-2 py-1 text-xs text-gray-700 dark:text-gray-300 font-mono" />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div>
            <label className="text-[10px] text-gray-500 dark:text-gray-400 uppercase">Col Unit</label>
            <select value={state.colUnit} onChange={e => set('colUnit', e.target.value)} className="w-full text-xs bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-2 py-1 text-gray-700 dark:text-gray-300">
              <option value="fr">fr</option><option value="px">px</option><option value="%">%</option><option value="auto">auto</option>
            </select>
          </div>
          <div>
            <label className="text-[10px] text-gray-500 dark:text-gray-400 uppercase">Row Unit</label>
            <select value={state.rowUnit} onChange={e => set('rowUnit', e.target.value)} className="w-full text-xs bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-2 py-1 text-gray-700 dark:text-gray-300">
              <option value="fr">fr</option><option value="px">px</option><option value="%">%</option><option value="auto">auto</option>
            </select>
          </div>
          <div>
            <label className="text-[10px] text-gray-500 dark:text-gray-400 uppercase">Column Gap</label>
            <input type="range" min={0} max={40} value={state.colGap} onChange={e => set('colGap', +e.target.value)} className="w-full" />
            <div className="text-xs text-center text-gray-600 dark:text-gray-300">{state.colGap}px</div>
          </div>
          <div>
            <label className="text-[10px] text-gray-500 dark:text-gray-400 uppercase">Row Gap</label>
            <input type="range" min={0} max={40} value={state.rowGap} onChange={e => set('rowGap', +e.target.value)} className="w-full" />
            <div className="text-xs text-center text-gray-600 dark:text-gray-300">{state.rowGap}px</div>
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
        <pre className="text-sm text-green-400 font-mono whitespace-pre-wrap">{gridCss}</pre>
      </div>
    </div>
  )
}
