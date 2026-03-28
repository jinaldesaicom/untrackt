import { useState, useEffect } from 'react'
import { Copy, Check, RotateCcw } from 'lucide-react'
import { getItem, setItem } from '../../utils/storage'

const STORAGE_KEY = 'untrackt_css_clip_path'

const presets = {
  triangle: [[50, 0], [0, 100], [100, 100]],
  diamond: [[50, 0], [100, 50], [50, 100], [0, 50]],
  pentagon: [[50, 0], [100, 38], [82, 100], [18, 100], [0, 38]],
  hexagon: [[25, 0], [75, 0], [100, 50], [75, 100], [25, 100], [0, 50]],
  star: [[50, 0], [61, 35], [98, 35], [68, 57], [79, 91], [50, 70], [21, 91], [32, 57], [2, 35], [39, 35]],
  arrow: [[40, 0], [40, 20], [100, 20], [100, 80], [40, 80], [40, 100], [0, 50]],
}

export default function CssClipPathMaker() {
  const [points, setPoints] = useState(() => getItem(STORAGE_KEY, presets.triangle))
  const [copied, setCopied] = useState(false)

  useEffect(() => { setItem(STORAGE_KEY, points) }, [points])

  const updatePoint = (idx, axis, val) => {
    setPoints(prev => prev.map((p, i) => i === idx ? (axis === 0 ? [val, p[1]] : [p[0], val]) : p))
  }
  const addPoint = () => setPoints(prev => [...prev, [50, 50]])
  const removePoint = (idx) => setPoints(prev => prev.length > 3 ? prev.filter((_, i) => i !== idx) : prev)

  const polygonValue = points.map(p => `${p[0]}% ${p[1]}%`).join(', ')
  const fullCss = `clip-path: polygon(${polygonValue});`

  const copy = () => {
    navigator.clipboard.writeText(fullCss)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const handleSvgClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100)
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 100)
    setPoints(prev => [...prev, [Math.max(0, Math.min(100, x)), Math.max(0, Math.min(100, y))]])
  }

  return (
    <div className="space-y-5">
      {/* Preview */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-6">
        <div className="flex items-center justify-center">
          <div className="relative" style={{ width: 280, height: 280 }}>
            <div
              className="w-full h-full bg-teal-500"
              style={{ clipPath: `polygon(${polygonValue})` }}
            />
            {/* SVG overlay for editing */}
            <svg
              viewBox="0 0 100 100"
              className="absolute inset-0 w-full h-full cursor-crosshair"
              onClick={handleSvgClick}
            >
              <polygon
                points={points.map(p => `${p[0]},${p[1]}`).join(' ')}
                fill="none"
                stroke="rgba(255,255,255,0.5)"
                strokeWidth="0.5"
                strokeDasharray="2,2"
              />
              {points.map((p, i) => (
                <circle
                  key={i}
                  cx={p[0]}
                  cy={p[1]}
                  r="2.5"
                  fill="white"
                  stroke="rgba(0,0,0,0.3)"
                  strokeWidth="0.5"
                  className="cursor-move"
                  onMouseDown={(e) => {
                    e.stopPropagation()
                    const svg = e.currentTarget.ownerSVGElement
                    const move = (ev) => {
                      const r = svg.getBoundingClientRect()
                      const nx = Math.round(((ev.clientX - r.left) / r.width) * 100)
                      const ny = Math.round(((ev.clientY - r.top) / r.height) * 100)
                      updatePoint(i, 0, Math.max(0, Math.min(100, nx)))
                      updatePoint(i, 1, Math.max(0, Math.min(100, ny)))
                    }
                    const up = () => { document.removeEventListener('mousemove', move); document.removeEventListener('mouseup', up) }
                    document.addEventListener('mousemove', move)
                    document.addEventListener('mouseup', up)
                  }}
                />
              ))}
            </svg>
          </div>
        </div>
      </div>

      {/* Presets */}
      <div className="flex flex-wrap gap-2">
        {Object.keys(presets).map(name => (
          <button key={name} onClick={() => setPoints(presets[name])} className="px-3 py-1 text-xs rounded-full border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-teal-50 dark:hover:bg-teal-900/20 hover:border-teal-300 dark:hover:border-teal-700 capitalize transition-colors">
            {name}
          </button>
        ))}
      </div>

      {/* Point controls */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 space-y-2">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Points ({points.length})</span>
          <button onClick={addPoint} className="text-xs text-teal-600 dark:text-teal-400 hover:underline">+ Add Point</button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto">
          {points.map((p, i) => (
            <div key={i} className="flex items-center gap-1 text-xs">
              <span className="w-4 text-gray-400 font-mono">{i + 1}</span>
              <input type="number" min={0} max={100} value={p[0]} onChange={e => updatePoint(i, 0, +e.target.value)} className="w-14 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-1.5 py-0.5 text-gray-700 dark:text-gray-300 font-mono" />
              <input type="number" min={0} max={100} value={p[1]} onChange={e => updatePoint(i, 1, +e.target.value)} className="w-14 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-1.5 py-0.5 text-gray-700 dark:text-gray-300 font-mono" />
              {points.length > 3 && (
                <button onClick={() => removePoint(i)} className="text-red-400 hover:text-red-600 text-[10px]">✕</button>
              )}
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
