import { useState, useEffect } from 'react'
import { Copy, Check, ArrowRightLeft } from 'lucide-react'
import { getItem, setItem } from '../../utils/storage'

const STORAGE_KEY = 'untrackt_css_units'

const defaults = { value: 16, fromUnit: 'px', toUnit: 'rem', baseFontSize: 16, viewportWidth: 1920, viewportHeight: 1080 }

export default function CssUnitsConverter() {
  const [state, setState] = useState(() => getItem(STORAGE_KEY, defaults))
  const [copied, setCopied] = useState(false)

  useEffect(() => { setItem(STORAGE_KEY, state) }, [state])
  const set = (key, val) => setState(prev => ({ ...prev, [key]: val }))

  // Convert everything to px first, then to target
  const toPx = (value, unit) => {
    switch (unit) {
      case 'px': return value
      case 'rem': return value * state.baseFontSize
      case 'em': return value * state.baseFontSize
      case 'vh': return (value / 100) * state.viewportHeight
      case 'vw': return (value / 100) * state.viewportWidth
      case 'pt': return value * (96 / 72)
      default: return value
    }
  }

  const fromPx = (px, unit) => {
    switch (unit) {
      case 'px': return px
      case 'rem': return px / state.baseFontSize
      case 'em': return px / state.baseFontSize
      case 'vh': return (px / state.viewportHeight) * 100
      case 'vw': return (px / state.viewportWidth) * 100
      case 'pt': return px / (96 / 72)
      default: return px
    }
  }

  const pxValue = toPx(state.value, state.fromUnit)
  const result = fromPx(pxValue, state.toUnit)
  const formatted = Number.isInteger(result) ? result.toString() : result.toFixed(4).replace(/0+$/, '').replace(/\.$/, '')

  const swap = () => setState(prev => ({ ...prev, fromUnit: prev.toUnit, toUnit: prev.fromUnit, value: parseFloat(formatted) || 0 }))

  const copyResult = () => {
    navigator.clipboard.writeText(`${formatted}${state.toUnit}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const units = ['px', 'rem', 'em', 'vh', 'vw', 'pt']

  return (
    <div className="space-y-5">
      {/* Result */}
      <div className="rounded-xl border border-teal-200 dark:border-teal-800 bg-teal-50 dark:bg-teal-900/20 p-5 text-center">
        <div className="text-3xl font-bold text-teal-700 dark:text-teal-300 font-mono">{formatted}<span className="text-lg ml-1">{state.toUnit}</span></div>
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{state.value} {state.fromUnit} = {formatted} {state.toUnit}</div>
      </div>

      {/* Converter */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 space-y-4">
        <div className="flex items-end gap-3">
          <div className="flex-1">
            <label className="text-[10px] text-gray-500 dark:text-gray-400 uppercase block mb-1">Value</label>
            <input type="number" step="any" value={state.value} onChange={e => set('value', parseFloat(e.target.value) || 0)} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-3 py-2 text-sm text-gray-700 dark:text-gray-300 font-mono" />
          </div>
          <div className="w-24">
            <label className="text-[10px] text-gray-500 dark:text-gray-400 uppercase block mb-1">From</label>
            <select value={state.fromUnit} onChange={e => set('fromUnit', e.target.value)} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-2 py-2 text-sm text-gray-700 dark:text-gray-300">
              {units.map(u => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>
          <button onClick={swap} className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 mb-0.5" title="Swap"><ArrowRightLeft className="w-4 h-4" /></button>
          <div className="w-24">
            <label className="text-[10px] text-gray-500 dark:text-gray-400 uppercase block mb-1">To</label>
            <select value={state.toUnit} onChange={e => set('toUnit', e.target.value)} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-2 py-2 text-sm text-gray-700 dark:text-gray-300">
              {units.map(u => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>
        </div>

        {/* Settings */}
        <div className="grid grid-cols-3 gap-3 pt-2 border-t border-gray-100 dark:border-gray-800">
          <div>
            <label className="text-[10px] text-gray-500 dark:text-gray-400 uppercase">Base Font Size (px)</label>
            <input type="number" min={1} value={state.baseFontSize} onChange={e => set('baseFontSize', +e.target.value || 16)} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-2 py-1 text-xs text-gray-700 dark:text-gray-300" />
          </div>
          <div>
            <label className="text-[10px] text-gray-500 dark:text-gray-400 uppercase">Viewport Width (px)</label>
            <input type="number" min={1} value={state.viewportWidth} onChange={e => set('viewportWidth', +e.target.value || 1920)} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-2 py-1 text-xs text-gray-700 dark:text-gray-300" />
          </div>
          <div>
            <label className="text-[10px] text-gray-500 dark:text-gray-400 uppercase">Viewport Height (px)</label>
            <input type="number" min={1} value={state.viewportHeight} onChange={e => set('viewportHeight', +e.target.value || 1080)} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-2 py-1 text-xs text-gray-700 dark:text-gray-300" />
          </div>
        </div>
      </div>

      {/* Quick reference */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-2">Quick Reference</span>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-gray-600 dark:text-gray-400">
          {units.filter(u => u !== state.fromUnit).map(u => {
            const r = fromPx(pxValue, u)
            const f = Number.isInteger(r) ? r.toString() : r.toFixed(4).replace(/0+$/, '').replace(/\.$/, '')
            return (
              <div key={u} className="flex justify-between rounded-lg bg-gray-50 dark:bg-gray-800 px-3 py-1.5">
                <span className="font-mono">{f}</span>
                <span className="text-gray-400">{u}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Copy button */}
      <button onClick={copyResult} className="btn-primary flex items-center gap-1.5 text-sm mx-auto">
        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        {copied ? 'Copied!' : `Copy ${formatted}${state.toUnit}`}
      </button>
    </div>
  )
}
