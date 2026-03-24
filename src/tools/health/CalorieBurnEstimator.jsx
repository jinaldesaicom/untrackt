import { useMemo, useState } from 'react'
import { MET_ACTIVITIES } from '../../data/healthData.js'
import useStoredPreference from '../../hooks/useStoredPreference.js'
import { ToolLayout, Panel, StatCard, SegmentedToggle, FieldLabel } from '../../components/ToolLayout.jsx'
import { kgToLbs, lbsToKg, roundTo } from '../../utils/unitConverters.js'

const FOOD_COMPARISONS = [
  { label: 'apples', calories: 95 },
  { label: 'Mars bars', calories: 230 },
  { label: 'slices of pizza', calories: 285 },
  { label: 'cappuccinos', calories: 120 },
]

const FLAT_ACTIVITIES = Object.entries(MET_ACTIVITIES).flatMap(([group, items]) => items.map(([label, met]) => ({ group, label, met })))

export default function CalorieBurnEstimator() {
  const [weightUnit, setWeightUnit] = useStoredPreference('health:calorieBurn:weightUnit', 'kg')
  const [inputs, setInputs] = useState({ weight: '70', activity: 'Running', duration: '45' })

  const activity = FLAT_ACTIVITIES.find((item) => item.label === inputs.activity) || FLAT_ACTIVITIES[0]
  const weightKg = weightUnit === 'kg' ? Number(inputs.weight) : lbsToKg(inputs.weight)
  const durationHours = Number(inputs.duration) / 60
  const caloriesBurned = activity.met * weightKg * durationHours
  const fatBurnedGrams = (caloriesBurned / 7700) * 1000

  const comparisons = useMemo(() => FOOD_COMPARISONS.map((food) => ({ label: food.label, count: caloriesBurned / food.calories })), [caloriesBurned])

  return (
    <ToolLayout
      title="Calorie Burn Estimator"
      description="Estimate calories burned from MET values across cardio, sports, strength, and daily activities."
      path="/tools/calorie-burn-estimator"
      disclaimerType="health"
    >
      <div className="grid gap-6 lg:grid-cols-[0.95fr,1.05fr]">
        <Panel>
          <div className="space-y-4">
            <div>
              <FieldLabel>Weight</FieldLabel>
              <SegmentedToggle options={[{ label: 'kg', value: 'kg' }, { label: 'lbs', value: 'lbs' }]} value={weightUnit} onChange={setWeightUnit} />
              <input className="input-field mt-2" type="number" min="1" value={inputs.weight} onChange={(event) => setInputs((current) => ({ ...current, weight: event.target.value }))} />
            </div>
            <div>
              <FieldLabel>Activity</FieldLabel>
              <select className="input-field" value={inputs.activity} onChange={(event) => setInputs((current) => ({ ...current, activity: event.target.value }))}>
                {Object.entries(MET_ACTIVITIES).map(([group, items]) => (
                  <optgroup key={group} label={group}>
                    {items.map(([label]) => <option key={label} value={label}>{label}</option>)}
                  </optgroup>
                ))}
              </select>
            </div>
            <div>
              <FieldLabel>Duration (minutes)</FieldLabel>
              <input className="input-field" type="number" min="1" value={inputs.duration} onChange={(event) => setInputs((current) => ({ ...current, duration: event.target.value }))} />
            </div>
          </div>
        </Panel>

        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard label="Calories burned" value={`${Math.round(caloriesBurned)} kcal`} helper={`${activity.label} · MET ${activity.met}`} tone="indigo" />
            <StatCard label="Fat burned" value={`${Math.round(fatBurnedGrams)} g`} helper="Calories ÷ 7700 × 1000" tone="amber" />
            <StatCard label="Weekly calories" value={`${Math.round(caloriesBurned * 7)} kcal`} helper="If repeated daily" tone="blue" />
            <StatCard label="Weekly fat" value={`${Math.round(fatBurnedGrams * 7)} g`} helper="If repeated daily" tone="green" />
          </div>

          <Panel>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Food comparisons</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {comparisons.map((comparison) => (
                <div key={comparison.label} className="rounded-2xl border border-gray-200 dark:border-gray-700 p-4 text-sm text-gray-600 dark:text-gray-300">
                  ≈ {roundTo(comparison.count, 1)} {comparison.label}
                </div>
              ))}
            </div>
          </Panel>

          <Panel>
            <p className="text-sm text-gray-600 dark:text-gray-300">Current weight is {weightUnit === 'kg' ? `${inputs.weight} kg` : `${inputs.weight} lbs`} ({roundTo(weightUnit === 'kg' ? kgToLbs(inputs.weight) : lbsToKg(inputs.weight), 1)} {weightUnit === 'kg' ? 'lbs' : 'kg'}).</p>
          </Panel>
        </div>
      </div>
    </ToolLayout>
  )
}