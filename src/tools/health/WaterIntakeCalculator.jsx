import { useState } from 'react'
import { Droplets } from 'lucide-react'

const ACTIVITY_FACTORS = [
  { label: 'Sedentary (desk work)', value: 0 },
  { label: 'Lightly active (light exercise)', value: 0.35 },
  { label: 'Moderately active (regular exercise)', value: 0.6 },
  { label: 'Very active (intense exercise daily)', value: 1.0 },
]

const CLIMATE_FACTORS = [
  { label: 'Temperate (typical indoor/outdoor)', value: 0 },
  { label: 'Hot (summer / tropical)', value: 0.35 },
  { label: 'Very hot (extreme heat / humid)', value: 0.7 },
]

export default function WaterIntakeCalculator() {
  const [weight, setWeight] = useState('70')
  const [unit, setUnit] = useState('kg')
  const [activity, setActivity] = useState(0)
  const [climate, setClimate] = useState(0)

  const weightKg = unit === 'kg' ? parseFloat(weight) : parseFloat(weight) * 0.453592
  const base = weightKg * 0.033
  const extra = activity + climate
  const totalLitres = base + extra
  const totalFlOz = totalLitres * 33.814
  const glasses = Math.ceil(totalLitres / 0.25)
  const exerciseExtra = 0.5

  const valid = weightKg > 0

  const filled = Math.min(glasses, 12)

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm font-medium text-gray-700">Weight</label>
            <div className="flex rounded border border-gray-200 text-xs overflow-hidden">
              {['kg', 'lbs'].map((u) => (
                <button key={u} onClick={() => setUnit(u)} className={`px-2.5 py-1 ${unit === u ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600'}`}>{u}</button>
              ))}
            </div>
          </div>
          <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="input-field" min="1" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Activity Level</label>
          <select value={activity} onChange={(e) => setActivity(parseFloat(e.target.value))} className="input-field">
            {ACTIVITY_FACTORS.map((a) => (
              <option key={a.value} value={a.value}>{a.label}</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Climate</label>
          <select value={climate} onChange={(e) => setClimate(parseFloat(e.target.value))} className="input-field">
            {CLIMATE_FACTORS.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>
      </div>

      {valid && (
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-center">
              <p className="text-xs text-blue-600 mb-1">Daily Intake</p>
              <p className="text-2xl font-bold text-blue-700">{totalLitres.toFixed(1)}L</p>
            </div>
            <div className="bg-cyan-50 border border-cyan-100 rounded-xl p-4 text-center">
              <p className="text-xs text-cyan-600 mb-1">In fl oz</p>
              <p className="text-2xl font-bold text-cyan-700">{Math.round(totalFlOz)} oz</p>
            </div>
            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 text-center">
              <p className="text-xs text-indigo-600 mb-1">Glasses (250ml)</p>
              <p className="text-2xl font-bold text-indigo-700">{glasses}</p>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 text-sm text-amber-800">
            <strong>Exercise tip:</strong> Drink an extra ~{exerciseExtra}L (2 glasses) per 30 min of intense exercise.
          </div>

          {/* Glass icons visual */}
          <div>
            <p className="text-xs text-gray-500 mb-2">Your daily goal ({glasses} glasses of 250ml)</p>
            <div className="flex flex-wrap gap-1.5">
              {Array.from({ length: Math.min(glasses, 16) }).map((_, i) => (
                <div key={i} className="flex flex-col items-center">
                  <Droplets className={`w-6 h-6 ${i < filled ? 'text-blue-400' : 'text-gray-200'}`} />
                </div>
              ))}
              {glasses > 16 && <span className="text-xs text-gray-400 self-center">+{glasses - 16} more</span>}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
