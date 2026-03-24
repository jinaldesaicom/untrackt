import { useState } from 'react'
import useStoredPreference from '../../hooks/useStoredPreference.js'
import { ToolLayout, Panel, StatCard, SegmentedToggle, FieldLabel } from '../../components/ToolLayout.jsx'
import { cmToInches, feetInchesToCm, kgToLbs, lbsToKg, roundTo } from '../../utils/unitConverters.js'

const CLASSIFICATIONS = {
  male: [
    { label: 'Essential fat', min: 2, max: 5, color: 'bg-sky-500' },
    { label: 'Athletic', min: 6, max: 13, color: 'bg-blue-500' },
    { label: 'Fitness', min: 14, max: 17, color: 'bg-green-500' },
    { label: 'Average', min: 18, max: 24, color: 'bg-amber-500' },
    { label: 'Obese', min: 25, max: 40, color: 'bg-rose-500' },
  ],
  female: [
    { label: 'Essential fat', min: 10, max: 13, color: 'bg-sky-500' },
    { label: 'Athletic', min: 14, max: 20, color: 'bg-blue-500' },
    { label: 'Fitness', min: 21, max: 24, color: 'bg-green-500' },
    { label: 'Average', min: 25, max: 31, color: 'bg-amber-500' },
    { label: 'Obese', min: 32, max: 45, color: 'bg-rose-500' },
  ],
}

function getClassification(gender, value) {
  return CLASSIFICATIONS[gender].find((item) => value >= item.min && value <= item.max) || CLASSIFICATIONS[gender][CLASSIFICATIONS[gender].length - 1]
}

export default function BodyFatCalculator() {
  const [activeTab, setActiveTab] = useState('navy')
  const [measurementUnit, setMeasurementUnit] = useStoredPreference('health:bodyFat:measurementUnit', 'cm')
  const [weightUnit, setWeightUnit] = useStoredPreference('health:bodyFat:weightUnit', 'kg')
  const [gender, setGender] = useState('male')
  const [navyInputs, setNavyInputs] = useState({ height: '175', neck: '38', waist: '82', hip: '95', weight: '72', age: '30' })
  const [bmiInputs, setBmiInputs] = useState({ heightFt: '5', heightIn: '9', heightCm: '175', weight: '72', age: '30' })

  const measurementMultiplier = measurementUnit === 'cm' ? 1 : 2.54
  const navyHeightInches = cmToInches(Number(navyInputs.height) * (measurementUnit === 'cm' ? 1 : 2.54))
  const navyNeckInches = Number(navyInputs.neck) * (measurementUnit === 'cm' ? 1 / 2.54 : 1)
  const navyWaistInches = Number(navyInputs.waist) * (measurementUnit === 'cm' ? 1 / 2.54 : 1)
  const navyHipInches = Number(navyInputs.hip) * (measurementUnit === 'cm' ? 1 / 2.54 : 1)
  const navyWeightKg = weightUnit === 'kg' ? Number(navyInputs.weight) : lbsToKg(navyInputs.weight)

  const navyBodyFat = gender === 'male'
    ? 495 / (1.0324 - 0.19077 * Math.log10(Math.max(1, navyWaistInches - navyNeckInches)) + 0.15456 * Math.log10(Math.max(1, navyHeightInches))) - 450
    : 495 / (1.29579 - 0.35004 * Math.log10(Math.max(1, navyWaistInches + navyHipInches - navyNeckInches)) + 0.221 * Math.log10(Math.max(1, navyHeightInches))) - 450

  const bmiHeightCm = measurementUnit === 'cm'
    ? Number(bmiInputs.heightCm)
    : feetInchesToCm(bmiInputs.heightFt, bmiInputs.heightIn)
  const bmiWeightKg = weightUnit === 'kg' ? Number(bmiInputs.weight) : lbsToKg(bmiInputs.weight)
  const bmiValue = bmiHeightCm > 0 ? bmiWeightKg / ((bmiHeightCm / 100) ** 2) : 0
  const bmiBodyFat = 1.2 * bmiValue + 0.23 * Number(bmiInputs.age || 0) - 10.8 * (gender === 'male' ? 1 : 0) - 5.4

  const bodyFat = activeTab === 'navy' ? navyBodyFat : bmiBodyFat
  const bodyWeightKg = activeTab === 'navy' ? navyWeightKg : bmiWeightKg
  const fatMassKg = Math.max(0, bodyWeightKg * (bodyFat / 100))
  const leanMassKg = Math.max(0, bodyWeightKg - fatMassKg)
  const classification = getClassification(gender, bodyFat)

  const renderMass = (valueKg) => weightUnit === 'kg' ? `${roundTo(valueKg, 1)} kg` : `${roundTo(kgToLbs(valueKg), 1)} lbs`
  const maxRange = CLASSIFICATIONS[gender][CLASSIFICATIONS[gender].length - 1].max
  const indicatorPosition = Math.min(100, Math.max(0, (bodyFat / maxRange) * 100))

  return (
    <ToolLayout
      title="Body Fat Calculator"
      description="Estimate body fat with the US Navy method or a BMI-based method, including fat mass, lean mass, and classification."
      path="/tools/body-fat-calculator"
      disclaimerType="health"
    >
      <Panel>
        <div className="flex flex-wrap items-center gap-3 justify-between">
          <SegmentedToggle options={[{ label: 'US Navy method', value: 'navy' }, { label: 'BMI method', value: 'bmi' }]} value={activeTab} onChange={setActiveTab} />
          <div className="flex flex-wrap gap-2">
            <SegmentedToggle options={[{ label: 'cm / kg', value: 'cm' }, { label: 'in / lbs', value: 'in' }]} value={measurementUnit} onChange={setMeasurementUnit} />
            <SegmentedToggle options={[{ label: 'Male', value: 'male' }, { label: 'Female', value: 'female' }]} value={gender} onChange={setGender} />
          </div>
        </div>

        {activeTab === 'navy' ? (
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {['height', 'neck', 'waist', ...(gender === 'female' ? ['hip'] : []), 'weight', 'age'].map((field) => (
              <div key={field}>
                <FieldLabel>{field.charAt(0).toUpperCase() + field.slice(1)}</FieldLabel>
                <input className="input-field" type="number" min="0" value={navyInputs[field]} onChange={(event) => setNavyInputs((current) => ({ ...current, [field]: event.target.value }))} />
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {measurementUnit === 'cm' ? (
              <div>
                <FieldLabel>Height (cm)</FieldLabel>
                <input className="input-field" type="number" min="0" value={bmiInputs.heightCm} onChange={(event) => setBmiInputs((current) => ({ ...current, heightCm: event.target.value }))} />
              </div>
            ) : (
              <>
                <div>
                  <FieldLabel>Height (ft)</FieldLabel>
                  <input className="input-field" type="number" min="0" value={bmiInputs.heightFt} onChange={(event) => setBmiInputs((current) => ({ ...current, heightFt: event.target.value }))} />
                </div>
                <div>
                  <FieldLabel>Height (in)</FieldLabel>
                  <input className="input-field" type="number" min="0" value={bmiInputs.heightIn} onChange={(event) => setBmiInputs((current) => ({ ...current, heightIn: event.target.value }))} />
                </div>
              </>
            )}
            <div>
              <FieldLabel>Weight</FieldLabel>
              <input className="input-field" type="number" min="0" value={bmiInputs.weight} onChange={(event) => setBmiInputs((current) => ({ ...current, weight: event.target.value }))} />
            </div>
            <div>
              <FieldLabel>Age</FieldLabel>
              <input className="input-field" type="number" min="0" value={bmiInputs.age} onChange={(event) => setBmiInputs((current) => ({ ...current, age: event.target.value }))} />
            </div>
          </div>
        )}
      </Panel>

      <div className="grid gap-6 lg:grid-cols-[1fr,0.95fr]">
        <Panel>
          <div className="grid gap-4 sm:grid-cols-2">
            <StatCard label="Body fat" value={`${roundTo(bodyFat, 1)}%`} helper={activeTab === 'navy' ? 'US Navy estimate' : 'BMI-based estimate'} tone="indigo" />
            <StatCard label="Classification" value={classification.label} helper={`${classification.min}-${classification.max}% range`} tone="green" />
            <StatCard label="Fat mass" value={renderMass(fatMassKg)} helper="Estimated body fat mass" tone="amber" />
            <StatCard label="Lean mass" value={renderMass(leanMassKg)} helper="Estimated fat-free mass" tone="blue" />
          </div>

          <div className="mt-6">
            <div className="flex rounded-full overflow-hidden h-4">
              {CLASSIFICATIONS[gender].map((range) => (
                <div key={range.label} className={range.color} style={{ width: `${((range.max - range.min) / maxRange) * 100}%` }} />
              ))}
            </div>
            <div className="relative h-6">
              <span className="absolute top-0 h-6 w-1 rounded-full bg-gray-900 dark:bg-gray-100" style={{ left: `${indicatorPosition}%` }} />
            </div>
            <div className="mt-2 grid gap-2 sm:grid-cols-2 lg:grid-cols-3 text-xs text-gray-600 dark:text-gray-300">
              {CLASSIFICATIONS[gender].map((range) => (
                <div key={range.label} className="flex items-center gap-2">
                  <span className={`h-3 w-3 rounded-full ${range.color}`} />
                  <span>{range.label}: {range.min}-{range.max}%</span>
                </div>
              ))}
            </div>
          </div>
        </Panel>

        <Panel>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">How to measure</h2>
          <ul className="mt-4 space-y-3 text-sm text-gray-600 dark:text-gray-300">
            <li>Neck: measure just below the larynx with the tape level around the neck.</li>
            <li>Waist: measure at the narrowest point or at the navel if that is easier to reproduce consistently.</li>
            <li>Hip: for women, measure at the widest point of the hips and glutes.</li>
            <li>Height: stand tall against a wall without shoes for the most repeatable estimate.</li>
            <li>BMI method: useful as a quick fallback, but it is generally less accurate than circumference-based estimates.</li>
          </ul>
        </Panel>
      </div>
    </ToolLayout>
  )
}