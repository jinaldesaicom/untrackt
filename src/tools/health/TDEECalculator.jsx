import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ACTIVITY_LEVELS } from '../../data/healthData.js'
import useDebounce from '../../hooks/useDebounce.js'
import useStoredPreference from '../../hooks/useStoredPreference.js'
import { ToolLayout, Panel, StatCard, SegmentedToggle, FieldLabel } from '../../components/ToolLayout.jsx'
import { cmToFeetInches, feetInchesToCm, kgToLbs, lbsToKg, roundTo } from '../../utils/unitConverters.js'

function calculateMifflin(gender, weightKg, heightCm, age) {
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age
  if (gender === 'male') return base + 5
  if (gender === 'female') return base - 161
  return base - 78
}

function calculateHarris(gender, weightKg, heightCm, age) {
  if (gender === 'male') return 88.362 + 13.397 * weightKg + 4.799 * heightCm - 5.677 * age
  if (gender === 'female') return 447.593 + 9.247 * weightKg + 3.098 * heightCm - 4.33 * age
  return (88.362 + 13.397 * weightKg + 4.799 * heightCm - 5.677 * age + 447.593 + 9.247 * weightKg + 3.098 * heightCm - 4.33 * age) / 2
}

function formatCalories(value) {
  return `${Math.round(value).toLocaleString()} kcal`
}

export default function TDEECalculator() {
  const [weightUnit, setWeightUnit] = useStoredPreference('health:tdee:weightUnit', 'kg')
  const [heightUnit, setHeightUnit] = useStoredPreference('health:tdee:heightUnit', 'cm')
  const [inputs, setInputs] = useState({
    age: '30',
    gender: 'male',
    weight: '70',
    heightCm: '175',
    heightFt: '5',
    heightIn: '9',
    activityLevel: 'moderate',
  })

  const debouncedInputs = useDebounce(inputs, 300)
  const activity = ACTIVITY_LEVELS.find((item) => item.id === debouncedInputs.activityLevel) || ACTIVITY_LEVELS[2]
  const weightKg = weightUnit === 'kg' ? Number(debouncedInputs.weight) : lbsToKg(debouncedInputs.weight)
  const heightCm = heightUnit === 'cm'
    ? Number(debouncedInputs.heightCm)
    : feetInchesToCm(debouncedInputs.heightFt, debouncedInputs.heightIn)
  const age = Number(debouncedInputs.age)
  const isValid = age > 0 && weightKg > 0 && heightCm > 0

  const mifflinBmr = isValid ? calculateMifflin(debouncedInputs.gender, weightKg, heightCm, age) : 0
  const harrisBmr = isValid ? calculateHarris(debouncedInputs.gender, weightKg, heightCm, age) : 0
  const mifflinTdee = mifflinBmr * activity.multiplier
  const harrisTdee = harrisBmr * activity.multiplier
  const weightLbs = kgToLbs(weightKg)
  const proteinLow = weightLbs * 0.8
  const proteinHigh = weightLbs * 1
  const fatLow = (mifflinTdee * 0.25) / 9
  const fatHigh = (mifflinTdee * 0.35) / 9
  const carbLow = (mifflinTdee - proteinHigh * 4 - fatHigh * 9) / 4
  const carbHigh = (mifflinTdee - proteinLow * 4 - fatLow * 9) / 4

  const targets = [
    { label: 'Extreme cut', value: Math.max(0, mifflinTdee - 1000), tone: 'rose', helper: 'About 2 lb/week' },
    { label: 'Cut', value: Math.max(0, mifflinTdee - 500), tone: 'amber', helper: 'About 1 lb/week' },
    { label: 'Mild cut', value: Math.max(0, mifflinTdee - 250), tone: 'amber', helper: 'About 0.5 lb/week' },
    { label: 'Maintain', value: mifflinTdee, tone: 'green', helper: 'Current goal' },
    { label: 'Mild bulk', value: mifflinTdee + 250, tone: 'blue', helper: 'About 0.5 lb/week' },
    { label: 'Bulk', value: mifflinTdee + 500, tone: 'indigo', helper: 'About 1 lb/week' },
  ]

  const scaleMin = Math.min(...targets.map((target) => target.value))
  const scaleMax = Math.max(...targets.map((target) => target.value))

  const syncHeightFromUnit = (nextUnit) => {
    if (nextUnit === heightUnit) return
    if (nextUnit === 'ft') {
      const converted = cmToFeetInches(inputs.heightCm || 0)
      setInputs((current) => ({
        ...current,
        heightFt: String(converted.feet),
        heightIn: String(roundTo(converted.inches, 1)),
      }))
    } else {
      setInputs((current) => ({
        ...current,
        heightCm: String(roundTo(feetInchesToCm(current.heightFt || 0, current.heightIn || 0), 1)),
      }))
    }
    setHeightUnit(nextUnit)
  }

  const syncWeightFromUnit = (nextUnit) => {
    if (nextUnit === weightUnit) return
    setInputs((current) => ({
      ...current,
      weight: String(roundTo(nextUnit === 'kg' ? lbsToKg(current.weight || 0) : kgToLbs(current.weight || 0), 1)),
    }))
    setWeightUnit(nextUnit)
  }

  return (
    <ToolLayout
      title="TDEE Calculator"
      description="Calculate your total daily energy expenditure, calorie targets, and macro suggestions privately in your browser."
      path="/tools/tdee-calculator"
      disclaimerType="health"
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
        <Panel>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <FieldLabel>Age</FieldLabel>
              <input className="input-field" type="number" min="12" max="100" value={inputs.age} onChange={(event) => setInputs((current) => ({ ...current, age: event.target.value }))} />
            </div>
            <div>
              <FieldLabel>Gender</FieldLabel>
              <select className="input-field" value={inputs.gender} onChange={(event) => setInputs((current) => ({ ...current, gender: event.target.value }))}>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <FieldLabel helper="Stored locally">Weight</FieldLabel>
              <SegmentedToggle options={[{ label: 'kg', value: 'kg' }, { label: 'lbs', value: 'lbs' }]} value={weightUnit} onChange={syncWeightFromUnit} />
              <input className="input-field mt-2" type="number" min="1" value={inputs.weight} onChange={(event) => setInputs((current) => ({ ...current, weight: event.target.value }))} />
            </div>
            <div>
              <FieldLabel helper="Stored locally">Height</FieldLabel>
              <SegmentedToggle options={[{ label: 'cm', value: 'cm' }, { label: 'ft/in', value: 'ft' }]} value={heightUnit} onChange={syncHeightFromUnit} />
              {heightUnit === 'cm' ? (
                <input className="input-field mt-2" type="number" min="1" value={inputs.heightCm} onChange={(event) => setInputs((current) => ({ ...current, heightCm: event.target.value }))} />
              ) : (
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <input className="input-field" type="number" min="0" value={inputs.heightFt} onChange={(event) => setInputs((current) => ({ ...current, heightFt: event.target.value }))} placeholder="ft" />
                  <input className="input-field" type="number" min="0" value={inputs.heightIn} onChange={(event) => setInputs((current) => ({ ...current, heightIn: event.target.value }))} placeholder="in" />
                </div>
              )}
            </div>
            <div className="sm:col-span-2">
              <FieldLabel>Activity level</FieldLabel>
              <select className="input-field" value={inputs.activityLevel} onChange={(event) => setInputs((current) => ({ ...current, activityLevel: event.target.value }))}>
                {ACTIVITY_LEVELS.map((option) => (
                  <option key={option.id} value={option.id}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>
        </Panel>

        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <StatCard label="Mifflin-St Jeor BMR" value={formatCalories(mifflinBmr)} helper="Primary, recommended" tone="indigo" />
            <StatCard label="Harris-Benedict BMR" value={formatCalories(harrisBmr)} helper="Secondary, classic" tone="gray" />
            <StatCard label="Primary TDEE" value={formatCalories(mifflinTdee)} helper={activity.label} tone="green" />
            <StatCard label="Secondary TDEE" value={formatCalories(harrisTdee)} helper="Alternative estimate" tone="blue" />
          </div>

          <Panel>
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Calorie targets</h2>
              <Link to="/tools/macro-calculator" className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline">Plan macros next</Link>
            </div>

            <div className="mt-5 relative h-3 rounded-full bg-gray-100 dark:bg-gray-800">
              {targets.map((target) => {
                const left = scaleMax === scaleMin ? 0 : ((target.value - scaleMin) / (scaleMax - scaleMin)) * 100
                const colorClass = {
                  rose: 'bg-rose-500',
                  amber: 'bg-amber-500',
                  green: 'bg-green-500',
                  blue: 'bg-blue-500',
                  indigo: 'bg-indigo-500',
                }[target.tone]

                return <span key={target.label} className={`absolute top-1/2 h-5 w-1 -translate-y-1/2 rounded-full ${colorClass}`} style={{ left: `${left}%` }} />
              })}
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {targets.map((target) => (
                <StatCard key={target.label} label={target.label} value={formatCalories(target.value)} helper={target.helper} tone={target.tone} />
              ))}
            </div>
          </Panel>

          <Panel>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Macro suggestion at maintenance</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <StatCard label="Protein" value={`${Math.round(proteinLow)}-${Math.round(proteinHigh)} g`} helper="0.8-1.0 g per lb" tone="blue" />
              <StatCard label="Fat" value={`${Math.round(fatLow)}-${Math.round(fatHigh)} g`} helper="25-35% of calories" tone="amber" />
              <StatCard label="Carbs" value={`${Math.max(0, Math.round(carbLow))}-${Math.max(0, Math.round(carbHigh))} g`} helper="Calories remaining" tone="green" />
            </div>
          </Panel>
        </div>
      </div>
    </ToolLayout>
  )
}