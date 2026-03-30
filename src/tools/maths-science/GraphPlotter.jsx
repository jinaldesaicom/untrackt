import { useState, useCallback, useRef } from 'react'
import { RefreshCw, Plus, Trash2 } from 'lucide-react'

export default function GraphPlotter() {
  const [functions, setFunctions] = useState([{ expr: 'Math.sin(x)', color: '#7c3aed', label: 'sin(x)' }])
  const [xMin, setXMin] = useState(-10)
  const [xMax, setXMax] = useState(10)
  const [yMin, setYMin] = useState(-5)
  const [yMax, setYMax] = useState(5)
  const svgRef = useRef(null)

  const w = 600, h = 400, pad = 50

  const safeEval = useCallback((expr, x) => {
    try {
      const fn = new Function('x', 'Math', `"use strict"; return (${expr})`)
      const result = fn(x, Math)
      return typeof result === 'number' && isFinite(result) ? result : null
    } catch { return null }
  }, [])

  const addFunction = () => {
    if (functions.length >= 6) return
    const colors = ['#7c3aed', '#2563eb', '#dc2626', '#16a34a', '#f59e0b', '#ec4899']
    setFunctions([...functions, { expr: '', color: colors[functions.length % colors.length], label: '' }])
  }

  const removeFunction = (i) => {
    if (functions.length <= 1) return
    setFunctions(functions.filter((_, idx) => idx !== i))
  }

  const updateFunction = (i, field, value) => {
    const copy = [...functions]
    copy[i] = { ...copy[i], [field]: value }
    if (field === 'expr') copy[i].label = value
    setFunctions(copy)
  }

  const zoom = (factor) => {
    const cx = (xMin + xMax) / 2, cy = (yMin + yMax) / 2
    const xr = (xMax - xMin) / 2 * factor, yr = (yMax - yMin) / 2 * factor
    setXMin(cx - xr); setXMax(cx + xr); setYMin(cy - yr); setYMax(cy + yr)
  }

  const toSvgX = (x) => pad + (x - xMin) / (xMax - xMin) * (w - 2 * pad)
  const toSvgY = (y) => pad + (1 - (y - yMin) / (yMax - yMin)) * (h - 2 * pad)

  const generatePath = (expr) => {
    const points = []
    const steps = 400
    const dx = (xMax - xMin) / steps
    for (let i = 0; i <= steps; i++) {
      const x = xMin + i * dx
      const y = safeEval(expr, x)
      if (y !== null && y >= yMin - (yMax - yMin) && y <= yMax + (yMax - yMin)) {
        points.push({ x: toSvgX(x), y: toSvgY(y), valid: y >= yMin && y <= yMax })
      } else {
        points.push(null) // break in line
      }
    }
    // Build SVG path segments
    let d = ''
    let drawing = false
    for (const p of points) {
      if (p === null) { drawing = false; continue }
      if (!drawing) { d += `M${p.x},${p.y}`; drawing = true }
      else d += `L${p.x},${p.y}`
    }
    return d
  }

  // Grid lines
  const gridLines = () => {
    const lines = []
    const xStep = niceStep(xMax - xMin)
    const yStep = niceStep(yMax - yMin)
    for (let x = Math.ceil(xMin / xStep) * xStep; x <= xMax; x += xStep) {
      const sx = toSvgX(x)
      lines.push(<line key={`gx${x}`} x1={sx} x2={sx} y1={pad} y2={h - pad} stroke="#e5e7eb" strokeWidth="0.5" />)
      lines.push(<text key={`lx${x}`} x={sx} y={h - pad + 15} textAnchor="middle" fontSize="10" fill="#9ca3af">{+x.toFixed(4)}</text>)
    }
    for (let y = Math.ceil(yMin / yStep) * yStep; y <= yMax; y += yStep) {
      const sy = toSvgY(y)
      lines.push(<line key={`gy${y}`} x1={pad} x2={w - pad} y1={sy} y2={sy} stroke="#e5e7eb" strokeWidth="0.5" />)
      lines.push(<text key={`ly${y}`} x={pad - 5} y={sy + 4} textAnchor="end" fontSize="10" fill="#9ca3af">{+y.toFixed(4)}</text>)
    }
    return lines
  }

  const niceStep = (range) => {
    const rough = range / 8
    const pow = Math.pow(10, Math.floor(Math.log10(rough)))
    const norm = rough / pow
    if (norm < 1.5) return pow
    if (norm < 3.5) return 2 * pow
    if (norm < 7.5) return 5 * pow
    return 10 * pow
  }

  // Axes
  const axes = () => {
    const els = []
    if (xMin <= 0 && xMax >= 0) {
      const sx = toSvgX(0)
      els.push(<line key="yaxis" x1={sx} x2={sx} y1={pad} y2={h - pad} stroke="#6b7280" strokeWidth="1" />)
    }
    if (yMin <= 0 && yMax >= 0) {
      const sy = toSvgY(0)
      els.push(<line key="xaxis" x1={pad} x2={w - pad} y1={sy} y2={sy} stroke="#6b7280" strokeWidth="1" />)
    }
    return els
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Functions</h3>
          <button onClick={addFunction} className="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 flex items-center gap-1">
            <Plus size={14} /> Add
          </button>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400">Use JavaScript math: Math.sin(x), Math.pow(x,2), x*x, Math.sqrt(x), Math.abs(x), Math.log(x), Math.exp(x)</p>
        {functions.map((f, i) => (
          <div key={i} className="flex items-center gap-2">
            <input type="color" value={f.color} onChange={e => updateFunction(i, 'color', e.target.value)} className="w-8 h-8 rounded cursor-pointer border-0" />
            <input value={f.expr} onChange={e => updateFunction(i, 'expr', e.target.value)}
              placeholder="Math.sin(x)" className="flex-1 border rounded-lg px-3 py-2 font-mono text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
            {functions.length > 1 && (
              <button onClick={() => removeFunction(i)} className="text-gray-400 hover:text-red-500 transition">
                <Trash2 size={16} />
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <div className="flex items-center gap-2">
            <label className="text-xs text-gray-500 dark:text-gray-400">X:</label>
            <input type="number" value={xMin} onChange={e => setXMin(+e.target.value)} className="w-20 border rounded px-2 py-1 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
            <span className="text-gray-400">to</span>
            <input type="number" value={xMax} onChange={e => setXMax(+e.target.value)} className="w-20 border rounded px-2 py-1 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-xs text-gray-500 dark:text-gray-400">Y:</label>
            <input type="number" value={yMin} onChange={e => setYMin(+e.target.value)} className="w-20 border rounded px-2 py-1 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
            <span className="text-gray-400">to</span>
            <input type="number" value={yMax} onChange={e => setYMax(+e.target.value)} className="w-20 border rounded px-2 py-1 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
          </div>
          <div className="flex gap-1">
            <button onClick={() => zoom(0.5)} className="px-2 py-1 text-sm rounded bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600">Zoom +</button>
            <button onClick={() => zoom(2)} className="px-2 py-1 text-sm rounded bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600">Zoom −</button>
            <button onClick={() => { setXMin(-10); setXMax(10); setYMin(-5); setYMax(5) }} className="px-2 py-1 text-sm rounded bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600">
              <RefreshCw size={14} />
            </button>
          </div>
        </div>

        <svg ref={svgRef} viewBox={`0 0 ${w} ${h}`} className="w-full bg-white dark:bg-gray-900 rounded-lg">
          <rect x={pad} y={pad} width={w - 2 * pad} height={h - 2 * pad} fill="none" stroke="#e5e7eb" strokeWidth="1" />
          {gridLines()}
          {axes()}
          {functions.map((f, i) => {
            if (!f.expr.trim()) return null
            const d = generatePath(f.expr)
            return d ? <path key={i} d={d} fill="none" stroke={f.color} strokeWidth="2" strokeLinecap="round" /> : null
          })}
        </svg>

        {functions.filter(f => f.expr.trim()).length > 0 && (
          <div className="flex flex-wrap gap-4 mt-3">
            {functions.filter(f => f.expr.trim()).map((f, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                <span className="w-4 h-1 rounded" style={{ backgroundColor: f.color }} />
                <span className="font-mono text-gray-600 dark:text-gray-400">{f.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
