import { useMemo, useState } from 'react'
import { getItem, setItem } from '../../utils/storage.js'

const STORAGE_KEY = 'untrackt:recentGradients'

const PRESETS = [
  { name: 'Sunset', type: 'linear', direction: 135, stops: [{ color: '#ff7e5f', pos: 0 }, { color: '#feb47b', pos: 100 }] },
  { name: 'Ocean', type: 'linear', direction: 120, stops: [{ color: '#2193b0', pos: 0 }, { color: '#6dd5ed', pos: 100 }] },
  { name: 'Forest', type: 'linear', direction: 45, stops: [{ color: '#134e5e', pos: 0 }, { color: '#71b280', pos: 100 }] },
  { name: 'Candy', type: 'linear', direction: 90, stops: [{ color: '#f953c6', pos: 0 }, { color: '#b91d73', pos: 100 }] },
  { name: 'Cool', type: 'radial', radialShape: 'circle', stops: [{ color: '#00c6ff', pos: 0 }, { color: '#0072ff', pos: 100 }] },
  { name: 'Royal', type: 'linear', direction: 60, stops: [{ color: '#141e30', pos: 0 }, { color: '#243b55', pos: 100 }] },
  { name: 'Peach', type: 'conic', direction: 180, stops: [{ color: '#ed4264', pos: 0 }, { color: '#ffedbc', pos: 100 }] },
  { name: 'Mint', type: 'linear', direction: 120, stops: [{ color: '#00b09b', pos: 0 }, { color: '#96c93d', pos: 100 }] },
  { name: 'Berry', type: 'linear', direction: 75, stops: [{ color: '#5f2c82', pos: 0 }, { color: '#49a09d', pos: 100 }] },
  { name: 'Lemon', type: 'radial', radialShape: 'ellipse', stops: [{ color: '#f7971e', pos: 0 }, { color: '#ffd200', pos: 100 }] },
  { name: 'Sky', type: 'linear', direction: 180, stops: [{ color: '#2980b9', pos: 0 }, { color: '#6dd5fa', pos: 100 }] },
  { name: 'Dawn', type: 'linear', direction: 90, stops: [{ color: '#ee9ca7', pos: 0 }, { color: '#ffdde1', pos: 100 }] },
]

function stopString(stops) {
  return stops.map((s) => `${s.color} ${s.pos}%`).join(', ')
}

export default function CssGradientGenerator() {
  const [type, setType] = useState('linear')
  const [direction, setDirection] = useState(90)
  const [radialShape, setRadialShape] = useState('circle')
  const [stops, setStops] = useState([
    { color: '#3b82f6', pos: 0 },
    { color: '#8b5cf6', pos: 100 },
  ])
  const [recent, setRecent] = useState(() => getItem(STORAGE_KEY, []))

  const gradient = useMemo(() => {
    const s = stopString(stops)
    if (type === 'radial') return `radial-gradient(${radialShape}, ${s})`
    if (type === 'conic') return `conic-gradient(from ${direction}deg, ${s})`
    return `linear-gradient(${direction}deg, ${s})`
  }, [type, direction, radialShape, stops])

  const cssCode = `background: ${gradient};\nbackground-image: ${gradient};`

  const updateStop = (idx, patch) => {
    setStops((prev) => prev.map((stop, i) => (i === idx ? { ...stop, ...patch } : stop)))
  }

  const moveStop = (idx, delta) => {
    setStops((prev) => {
      const nextIdx = idx + delta
      if (nextIdx < 0 || nextIdx >= prev.length) return prev
      const copy = [...prev]
      const [item] = copy.splice(idx, 1)
      copy.splice(nextIdx, 0, item)
      return copy
    })
  }

  const saveRecent = () => {
    const item = { type, direction, radialShape, stops }
    const next = [item, ...recent].slice(0, 5)
    setRecent(next)
    setItem(STORAGE_KEY, next)
  }

  const loadPreset = (preset) => {
    setType(preset.type)
    setDirection(preset.direction ?? 90)
    setRadialShape(preset.radialShape ?? 'circle')
    setStops(preset.stops)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {['linear', 'radial', 'conic'].map((t) => (
          <button key={t} onClick={() => setType(t)} className={type === t ? 'btn-primary' : 'btn-secondary'}>{t}</button>
        ))}
      </div>

      {type === 'radial' ? (
        <select className="input-field" value={radialShape} onChange={(e) => setRadialShape(e.target.value)}>
          <option value="circle">circle</option>
          <option value="ellipse">ellipse</option>
        </select>
      ) : (
        <div>
          <label className="text-sm text-gray-600">Direction: {direction}deg</label>
          <input type="range" min="0" max="360" value={direction} onChange={(e) => setDirection(Number(e.target.value))} className="w-full" />
        </div>
      )}

      <div className="space-y-2">
        {stops.map((stop, idx) => (
          <div key={idx} className="rounded-lg border border-gray-200 bg-white p-3 grid grid-cols-1 md:grid-cols-4 gap-2 items-center">
            <input type="color" value={stop.color} onChange={(e) => updateStop(idx, { color: e.target.value })} className="h-10" />
            <input type="number" min="0" max="100" value={stop.pos} onChange={(e) => updateStop(idx, { pos: Number(e.target.value) })} className="input-field" />
            <div className="flex gap-2">
              <button className="btn-secondary" onClick={() => moveStop(idx, -1)}>Up</button>
              <button className="btn-secondary" onClick={() => moveStop(idx, 1)}>Down</button>
            </div>
            <button className="btn-secondary" onClick={() => setStops((prev) => prev.filter((_, i) => i !== idx))} disabled={stops.length <= 2}>Remove</button>
          </div>
        ))}
        <button className="btn-secondary" onClick={() => setStops((prev) => [...prev, { color: '#ffffff', pos: 50 }])}>Add color stop</button>
      </div>

      <div className="h-40 rounded-xl border border-gray-200" style={{ backgroundImage: gradient }} />

      <textarea readOnly value={cssCode} className="textarea-field min-h-[90px] bg-gray-50" />
      <div className="flex flex-wrap gap-2">
        <button className="btn-primary" onClick={() => navigator.clipboard.writeText(cssCode)}>Copy CSS</button>
        <button className="btn-secondary" onClick={saveRecent}>Save recent</button>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-4">
        <h3 className="font-semibold text-gray-900 mb-2">Preset Gallery</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {PRESETS.map((preset) => (
            <button key={preset.name} className="rounded-lg border border-gray-200 overflow-hidden text-left" onClick={() => loadPreset(preset)}>
              <div className="h-12" style={{ backgroundImage: preset.type === 'radial' ? `radial-gradient(${preset.radialShape || 'circle'}, ${stopString(preset.stops)})` : preset.type === 'conic' ? `conic-gradient(from ${(preset.direction || 0)}deg, ${stopString(preset.stops)})` : `linear-gradient(${preset.direction || 90}deg, ${stopString(preset.stops)})` }} />
              <div className="p-2 text-xs font-medium">{preset.name}</div>
            </button>
          ))}
        </div>
      </div>

      {recent.length > 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <h3 className="font-semibold text-gray-900 mb-2">Recent Gradients</h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
            {recent.map((item, idx) => {
              const bg = item.type === 'radial'
                ? `radial-gradient(${item.radialShape}, ${stopString(item.stops)})`
                : item.type === 'conic'
                  ? `conic-gradient(from ${item.direction}deg, ${stopString(item.stops)})`
                  : `linear-gradient(${item.direction}deg, ${stopString(item.stops)})`
              return <button key={idx} className="h-12 rounded-lg border border-gray-200" style={{ backgroundImage: bg }} onClick={() => loadPreset(item)} />
            })}
          </div>
        </div>
      ) : null}
    </div>
  )
}
