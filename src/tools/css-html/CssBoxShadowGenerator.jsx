import { useState, useEffect } from 'react'
import { Copy, Check, Plus, Trash2 } from 'lucide-react'
import { getItem, setItem } from '../../utils/storage'

const STORAGE_KEY = 'untrackt_css_box_shadow'

function defaultShadow() {
  return { id: Date.now(), x: 4, y: 4, blur: 10, spread: 0, color: '#00000040', inset: false }
}

export default function CssBoxShadowGenerator() {
  const [shadows, setShadows] = useState(() => getItem(STORAGE_KEY, [defaultShadow()]))
  const [copied, setCopied] = useState(false)

  useEffect(() => { setItem(STORAGE_KEY, shadows) }, [shadows])

  const update = (id, key, val) => setShadows(prev => prev.map(s => s.id === id ? { ...s, [key]: val } : s))
  const remove = (id) => setShadows(prev => prev.length > 1 ? prev.filter(s => s.id !== id) : prev)
  const add = () => setShadows(prev => [...prev, defaultShadow()])

  const cssValue = shadows.map(s =>
    `${s.inset ? 'inset ' : ''}${s.x}px ${s.y}px ${s.blur}px ${s.spread}px ${s.color}`
  ).join(',\n    ')

  const fullCss = `box-shadow:\n    ${cssValue};`

  const copy = () => {
    navigator.clipboard.writeText(fullCss)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="space-y-5">
      {/* Preview */}
      <div className="flex items-center justify-center rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-12">
        <div
          className="w-40 h-40 rounded-2xl bg-white dark:bg-gray-700"
          style={{ boxShadow: shadows.map(s => `${s.inset ? 'inset ' : ''}${s.x}px ${s.y}px ${s.blur}px ${s.spread}px ${s.color}`).join(', ') }}
        />
      </div>

      {/* Shadows list */}
      <div className="space-y-3">
        {shadows.map((s, i) => (
          <div key={s.id} className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Shadow {i + 1}</span>
              <div className="flex items-center gap-2">
                <label className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-300 cursor-pointer">
                  <input type="checkbox" checked={s.inset} onChange={e => update(s.id, 'inset', e.target.checked)} className="rounded" /> Inset
                </label>
                {shadows.length > 1 && (
                  <button onClick={() => remove(s.id)} className="text-red-400 hover:text-red-600 p-0.5"><Trash2 className="w-3.5 h-3.5" /></button>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { label: 'X Offset', key: 'x', min: -100, max: 100 },
                { label: 'Y Offset', key: 'y', min: -100, max: 100 },
                { label: 'Blur', key: 'blur', min: 0, max: 200 },
                { label: 'Spread', key: 'spread', min: -100, max: 100 },
              ].map(ctrl => (
                <div key={ctrl.key}>
                  <label className="text-[10px] text-gray-500 dark:text-gray-400 uppercase">{ctrl.label}</label>
                  <input type="range" min={ctrl.min} max={ctrl.max} value={s[ctrl.key]} onChange={e => update(s.id, ctrl.key, +e.target.value)} className="w-full" />
                  <div className="text-xs text-center text-gray-600 dark:text-gray-300">{s[ctrl.key]}px</div>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <label className="text-[10px] text-gray-500 dark:text-gray-400 uppercase">Color</label>
              <input type="color" value={s.color.slice(0, 7)} onChange={e => update(s.id, 'color', e.target.value + '40')} className="w-8 h-8 rounded cursor-pointer border-0" />
              <input value={s.color} onChange={e => update(s.id, 'color', e.target.value)} className="flex-1 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-2 py-1 text-xs text-gray-700 dark:text-gray-300 font-mono" />
            </div>
          </div>
        ))}
      </div>

      <button onClick={add} className="btn-primary flex items-center gap-1.5 text-sm"><Plus className="w-4 h-4" /> Add Shadow Layer</button>

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
