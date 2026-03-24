import { useState } from 'react'
import { Link } from 'react-router-dom'
import useDebounce from '../../hooks/useDebounce.js'
import { ToolLayout, Panel, StatCard, SegmentedToggle, FieldLabel } from '../../components/ToolLayout.jsx'

const DIET_STYLES = {
  balanced: { protein: 0.3, fat: 0.3, carbs: 0.4, label: 'Balanced' },
  highProtein: { protein: 0.4, fat: 0.25, carbs: 0.35, label: 'High protein' },
  lowCarb: { protein: 0.35, fat: 0.4, carbs: 0.25, label: 'Low carb' },
  keto: { protein: 0.25, fat: 0.7, carbs: 0.05, label: 'Ketogenic' },
  highCarb: { protein: 0.25, fat: 0.2, carbs: 0.55, label: 'High carb' },
}

const GOAL_OFFSETS = {
  lose: -500,
  maintain: 0,
  gain: 250,
}

export default function MacroCalculator() {
  const [inputs, setInputs] = useState({ tdee: '', goal: 'maintain', dietStyle: 'balanced', meals: 3 })
  const debouncedInputs = useDebounce(inputs, 300)

  const calories = Math.max(0, Number(debouncedInputs.tdee) + GOAL_OFFSETS[debouncedInputs.goal])
  const ratios = DIET_STYLES[debouncedInputs.dietStyle]
  const proteinCalories = calories * ratios.protein
  const fatCalories = calories * ratios.fat
  const carbCalories = calories * ratios.carbs
  const proteinGrams = proteinCalories / 4
  const fatGrams = fatCalories / 9
  const carbGrams = carbCalories / 4
  const perMealDivisor = Number(debouncedInputs.meals) || 1
  const donutStyle = {
    background: `conic-gradient(#4f46e5 0 ${ratios.protein * 100}%, #f59e0b ${ratios.protein * 100}% ${(ratios.protein + ratios.fat) * 100}%, #10b981 ${(ratios.protein + ratios.fat) * 100}% 100%)`,
  }

  return (
    <ToolLayout
      title="Macro Calculator"
      description="Turn your TDEE into protein, fat, and carb targets with different diet styles and per-meal breakdowns."
      path="/tools/macro-calculator"
      disclaimerType="health"
    >
      <div className="grid gap-6 lg:grid-cols-[0.95fr,1.05fr]">
        <Panel>
          <div className="space-y-4">
            <div>
              <FieldLabel helper={<Link to="/tools/tdee-calculator" className="text-indigo-600 dark:text-indigo-400 hover:underline">Calculate TDEE first</Link>}>TDEE</FieldLabel>
              <input className="input-field" type="number" min="0" placeholder="Enter your TDEE" value={inputs.tdee} onChange={(event) => setInputs((current) => ({ ...current, tdee: event.target.value }))} />
            </div>
            <div>
              <FieldLabel>Goal</FieldLabel>
              <SegmentedToggle options={[{ label: 'Lose fat', value: 'lose' }, { label: 'Maintain', value: 'maintain' }, { label: 'Gain muscle', value: 'gain' }]} value={inputs.goal} onChange={(goal) => setInputs((current) => ({ ...current, goal }))} />
            </div>
            <div>
              <FieldLabel>Diet style</FieldLabel>
              <select className="input-field" value={inputs.dietStyle} onChange={(event) => setInputs((current) => ({ ...current, dietStyle: event.target.value }))}>
                {Object.entries(DIET_STYLES).map(([value, config]) => <option key={value} value={value}>{config.label}</option>)}
              </select>
            </div>
            <div>
              <FieldLabel helper={`${inputs.meals} meals per day`}>Meals per day</FieldLabel>
              <input className="w-full accent-indigo-600" type="range" min="1" max="6" value={inputs.meals} onChange={(event) => setInputs((current) => ({ ...current, meals: Number(event.target.value) }))} />
            </div>
          </div>
        </Panel>

        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard label="Daily calories" value={`${Math.round(calories)} kcal`} helper="After goal adjustment" tone="indigo" className="xl:col-span-1" />
            <StatCard label="Protein" value={`${Math.round(proteinGrams)} g`} helper={`${Math.round(proteinCalories)} kcal`} tone="blue" />
            <StatCard label="Fat" value={`${Math.round(fatGrams)} g`} helper={`${Math.round(fatCalories)} kcal`} tone="amber" />
            <StatCard label="Carbs" value={`${Math.round(carbGrams)} g`} helper={`${Math.round(carbCalories)} kcal`} tone="green" />
          </div>

          <Panel>
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="relative h-48 w-48 rounded-full" style={donutStyle}>
                <div className="absolute inset-6 rounded-full bg-white dark:bg-gray-900 flex items-center justify-center text-center">
                  <div>
                    <p className="text-xs uppercase tracking-[0.16em] text-gray-500 dark:text-gray-400">Style</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-gray-100">{ratios.label}</p>
                  </div>
                </div>
              </div>
              <div className="flex-1 grid gap-3 sm:grid-cols-3 w-full">
                <StatCard label="Protein" value={`${Math.round(ratios.protein * 100)}%`} helper="4 kcal per gram" tone="blue" />
                <StatCard label="Fat" value={`${Math.round(ratios.fat * 100)}%`} helper="9 kcal per gram" tone="amber" />
                <StatCard label="Carbs" value={`${Math.round(ratios.carbs * 100)}%`} helper="4 kcal per gram" tone="green" />
              </div>
            </div>
          </Panel>

          <Panel>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Per meal breakdown</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <StatCard label="Protein per meal" value={`${Math.round(proteinGrams / perMealDivisor)} g`} helper={`${Math.round(proteinCalories / perMealDivisor)} kcal`} tone="blue" />
              <StatCard label="Fat per meal" value={`${Math.round(fatGrams / perMealDivisor)} g`} helper={`${Math.round(fatCalories / perMealDivisor)} kcal`} tone="amber" />
              <StatCard label="Carbs per meal" value={`${Math.round(carbGrams / perMealDivisor)} g`} helper={`${Math.round(carbCalories / perMealDivisor)} kcal`} tone="green" />
            </div>
          </Panel>
        </div>
      </div>
    </ToolLayout>
  )
}