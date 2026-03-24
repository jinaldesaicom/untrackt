import { useState } from 'react'
import { ToolLayout } from '../../components/ToolLayout.jsx'

const ACTIVITY_LEVELS = [
  { label: 'Sedentary (little/no exercise)', value: 1.2 },
  { label: 'Lightly active (1–3 days/week)', value: 1.375 },
  { label: 'Moderately active (3–5 days/week)', value: 1.55 },
  { label: 'Very active (6–7 days/week)', value: 1.725 },
  { label: 'Extra active (hard exercise + physical job)', value: 1.9 },
]

function calcMifflin(gender, weight_kg, height_cm, age) {
  const base = 10 * weight_kg + 6.25 * height_cm - 5 * age
  return gender === 'male' ? base + 5 : base - 161
}

function calcHarrisBenedict(gender, weight_kg, height_cm, age) {
  if (gender === 'male') return 88.362 + 13.397 * weight_kg + 4.799 * height_cm - 5.677 * age
  return 447.593 + 9.247 * weight_kg + 3.098 * height_cm - 4.330 * age
}

export default function BmrCalculator() {
  const [age, setAge] = useState('30')
  const [gender, setGender] = useState('male')
  const [weightUnit, setWeightUnit] = useState('kg')
  const [weight, setWeight] = useState('70')
  const [heightUnit, setHeightUnit] = useState('cm')
  const [heightCm, setHeightCm] = useState('175')
  const [heightFt, setHeightFt] = useState('5')
  const [heightIn, setHeightIn] = useState('9')
  const [activity, setActivity] = useState(1.55)

  const weightKg = weightUnit === 'kg' ? parseFloat(weight) : parseFloat(weight) * 0.453592
  const hCm = heightUnit === 'cm'
    ? parseFloat(heightCm)
    : (parseFloat(heightFt) * 30.48) + (parseFloat(heightIn) * 2.54)
  const ageVal = parseFloat(age)

  const valid = weightKg > 0 && hCm > 0 && ageVal > 0

  const bmrMifflin = valid ? calcMifflin(gender, weightKg, hCm, ageVal) : 0
  const bmrHarris = valid ? calcHarrisBenedict(gender, weightKg, hCm, ageVal) : 0
  const tdee = bmrMifflin * activity
  const lose = tdee - 500
  const gain = tdee + 300

  const fmt = (n) => Math.round(n).toLocaleString()

  return (
    <ToolLayout
      title="BMR Calculator"
      description="Calculate your basal metabolic rate and daily calorie estimates privately in your browser."
      path="/tools/bmr-calculator"
      disclaimerType="health"
    >
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Age */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
          <input type="number" value={age} onChange={(e) => setAge(e.target.value)} className="input-field" min="1" max="120" />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)} className="input-field">
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other (uses female formula)</option>
          </select>
        </div>

        {/* Weight */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm font-medium text-gray-700">Weight</label>
            <div className="flex rounded border border-gray-200 text-xs overflow-hidden">
              {['kg', 'lbs'].map((u) => (
                <button key={u} onClick={() => setWeightUnit(u)} className={`px-2.5 py-1 ${weightUnit === u ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600'}`}>{u}</button>
              ))}
            </div>
          </div>
          <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="input-field" min="1" />
        </div>

        {/* Height */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm font-medium text-gray-700">Height</label>
            <div className="flex rounded border border-gray-200 text-xs overflow-hidden">
              {['cm', 'ft'].map((u) => (
                <button key={u} onClick={() => setHeightUnit(u)} className={`px-2.5 py-1 ${heightUnit === u ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600'}`}>{u}</button>
              ))}
            </div>
          </div>
          {heightUnit === 'cm' ? (
            <input type="number" value={heightCm} onChange={(e) => setHeightCm(e.target.value)} className="input-field" min="1" />
          ) : (
            <div className="flex gap-2">
              <input type="number" value={heightFt} onChange={(e) => setHeightFt(e.target.value)} placeholder="ft" className="input-field" min="0" />
              <input type="number" value={heightIn} onChange={(e) => setHeightIn(e.target.value)} placeholder="in" className="input-field" min="0" max="11" />
            </div>
          )}
        </div>

        {/* Activity */}
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Activity Level</label>
          <select value={activity} onChange={(e) => setActivity(parseFloat(e.target.value))} className="input-field">
            {ACTIVITY_LEVELS.map((a) => (
              <option key={a.value} value={a.value}>{a.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Results */}
      {valid && (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-500 mb-1">BMR (Mifflin-St Jeor)</p>
              <p className="text-2xl font-bold text-indigo-700">{fmt(bmrMifflin)} kcal</p>
              <p className="text-xs text-gray-400 mt-0.5">Calories at rest</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-500 mb-1">BMR (Harris-Benedict)</p>
              <p className="text-2xl font-bold text-gray-700">{fmt(bmrHarris)} kcal</p>
              <p className="text-xs text-gray-400 mt-0.5">Alternative formula</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-center">
              <p className="text-xs text-blue-600 mb-1">Lose Weight</p>
              <p className="text-xl font-bold text-blue-700">{fmt(lose)} kcal</p>
            </div>
            <div className="bg-green-50 border border-green-100 rounded-xl p-4 text-center">
              <p className="text-xs text-green-600 mb-1">Maintain (TDEE)</p>
              <p className="text-xl font-bold text-green-700">{fmt(tdee)} kcal</p>
            </div>
            <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 text-center">
              <p className="text-xs text-amber-600 mb-1">Gain Weight</p>
              <p className="text-xl font-bold text-amber-700">{fmt(gain)} kcal</p>
            </div>
          </div>

          <p className="text-xs text-gray-400 text-center">
            This is an estimate. Consult a dietitian for personalised advice.
          </p>
        </div>
      )}
    </div>
    </ToolLayout>
  )
}
