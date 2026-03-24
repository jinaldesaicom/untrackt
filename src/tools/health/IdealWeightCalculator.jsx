import { useState } from 'react'
import useStoredPreference from '../../hooks/useStoredPreference.js'
import { ToolLayout, Panel, StatCard, SegmentedToggle, FieldLabel } from '../../components/ToolLayout.jsx'
import { cmToFeetInches, feetInchesToCm, kgToLbs, lbsToKg, roundTo } from '../../utils/unitConverters.js'

const FRAME_MULTIPLIER = { small: 0.94, medium: 1, large: 1.06 }

function valueForFormula(baseValue, frameSize) {
  return baseValue * FRAME_MULTIPLIER[frameSize]
}

export default function IdealWeightCalculator() {
  const [heightUnit, setHeightUnit] = useStoredPreference('health:idealWeight:heightUnit', 'cm')
  const [weightUnit, setWeightUnit] = useStoredPreference('health:idealWeight:weightUnit', 'kg')
  const [inputs, setInputs] = useState({
    gender: 'female',
    frameSize: 'medium',
    heightCm: '165',
    heightFt: '5',
    heightIn: '5',
    currentWeight: '',
  })

  const heightCm = heightUnit === 'cm' ? Number(inputs.heightCm) : feetInchesToCm(inputs.heightFt, inputs.heightIn)
  const heightInches = heightCm / 2.54
  const heightMeters = heightCm / 100
  const inchesOverFiveFeet = Math.max(0, heightInches - 60)
  const currentWeightKg = weightUnit === 'kg' ? Number(inputs.currentWeight) : lbsToKg(inputs.currentWeight)

  const formulas = [
    { label: 'Robinson', value: valueForFormula((inputs.gender === 'male' ? 52 : 49) + (inputs.gender === 'male' ? 1.9 : 1.7) * inchesOverFiveFeet, inputs.frameSize) },
    { label: 'Miller', value: valueForFormula((inputs.gender === 'male' ? 56.2 : 53.1) + (inputs.gender === 'male' ? 1.41 : 1.36) * inchesOverFiveFeet, inputs.frameSize) },
    { label: 'Devine', value: valueForFormula((inputs.gender === 'male' ? 50 : 45.5) + 2.3 * inchesOverFiveFeet, inputs.frameSize) },
    { label: 'Hamwi', value: valueForFormula((inputs.gender === 'male' ? 48 : 45.5) + (inputs.gender === 'male' ? 2.7 : 2.2) * inchesOverFiveFeet, inputs.frameSize) },
  ]

  const bmiRange = {
    low: 18.5 * heightMeters * heightMeters,
    high: 24.9 * heightMeters * heightMeters,
  }

  const formulaValues = formulas.map((formula) => formula.value)
  const idealLow = Math.min(...formulaValues, bmiRange.low)
  const idealHigh = Math.max(...formulaValues, bmiRange.high)
  const averageIdeal = [...formulaValues, (bmiRange.low + bmiRange.high) / 2].reduce((sum, value) => sum + value, 0) / 5

  const syncHeightUnit = (nextUnit) => {
    if (nextUnit === heightUnit) return
    if (nextUnit === 'ft') {
      const converted = cmToFeetInches(inputs.heightCm || 0)
      setInputs((current) => ({ ...current, heightFt: String(converted.feet), heightIn: String(roundTo(converted.inches, 1)) }))
    } else {
      setInputs((current) => ({ ...current, heightCm: String(roundTo(feetInchesToCm(current.heightFt || 0, current.heightIn || 0), 1)) }))
    }
    setHeightUnit(nextUnit)
  }

  const syncWeightUnit = (nextUnit) => {
    if (nextUnit === weightUnit) return
    setInputs((current) => ({
      ...current,
      currentWeight: current.currentWeight ? String(roundTo(nextUnit === 'kg' ? lbsToKg(current.currentWeight) : kgToLbs(current.currentWeight), 1)) : '',
    }))
    setWeightUnit(nextUnit)
  }

  const renderWeight = (weightKg) => weightUnit === 'kg'
    ? `${roundTo(weightKg, 1)} kg`
    : `${roundTo(kgToLbs(weightKg), 1)} lbs`

  let distanceMessage = ''
  if (currentWeightKg > 0) {
    if (currentWeightKg < idealLow) {
      distanceMessage = `You are ${renderWeight(idealLow - currentWeightKg)} below the ideal range.`
    } else if (currentWeightKg > idealHigh) {
      distanceMessage = `You are ${renderWeight(currentWeightKg - idealHigh)} above the ideal range.`
    } else {
      distanceMessage = 'You are currently within the broad guideline range.'
    }
  }

  return (
    <ToolLayout
      title="Ideal Weight Calculator"
      description="Compare Robinson, Miller, Devine, Hamwi, and BMI-based ideal weight guidance without sending any data anywhere."
      path="/tools/ideal-weight-calculator"
      disclaimerType="health"
    >
      <div className="grid gap-6 lg:grid-cols-[0.95fr,1.05fr]">
        <Panel>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <FieldLabel>Gender</FieldLabel>
              <select className="input-field" value={inputs.gender} onChange={(event) => setInputs((current) => ({ ...current, gender: event.target.value }))}>
                <option value="female">Female</option>
                <option value="male">Male</option>
              </select>
            </div>
            <div>
              <FieldLabel helper="Wrist guide in note">Frame size</FieldLabel>
              <select className="input-field" value={inputs.frameSize} onChange={(event) => setInputs((current) => ({ ...current, frameSize: event.target.value }))}>
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>
            <div>
              <FieldLabel>Height</FieldLabel>
              <SegmentedToggle options={[{ label: 'cm', value: 'cm' }, { label: 'ft/in', value: 'ft' }]} value={heightUnit} onChange={syncHeightUnit} />
              {heightUnit === 'cm' ? (
                <input className="input-field mt-2" type="number" min="1" value={inputs.heightCm} onChange={(event) => setInputs((current) => ({ ...current, heightCm: event.target.value }))} />
              ) : (
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <input className="input-field" type="number" min="0" value={inputs.heightFt} onChange={(event) => setInputs((current) => ({ ...current, heightFt: event.target.value }))} placeholder="ft" />
                  <input className="input-field" type="number" min="0" value={inputs.heightIn} onChange={(event) => setInputs((current) => ({ ...current, heightIn: event.target.value }))} placeholder="in" />
                </div>
              )}
            </div>
            <div>
              <FieldLabel helper="Optional">Current weight</FieldLabel>
              <SegmentedToggle options={[{ label: 'kg', value: 'kg' }, { label: 'lbs', value: 'lbs' }]} value={weightUnit} onChange={syncWeightUnit} />
              <input className="input-field mt-2" type="number" min="1" value={inputs.currentWeight} onChange={(event) => setInputs((current) => ({ ...current, currentWeight: event.target.value }))} />
            </div>
          </div>

          <div className="mt-5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 p-4 text-sm text-amber-900 dark:text-amber-200">
            Wrist circumference guide: small frames generally have slimmer wrists, medium frames sit in the middle, and large frames have broader wrists. Use this as a rough helper only.
          </div>
        </Panel>

        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {formulas.map((formula) => (
              <StatCard key={formula.label} label={formula.label} value={renderWeight(formula.value)} helper="Formula estimate" tone="blue" />
            ))}
            <StatCard label="BMI method" value={`${renderWeight(bmiRange.low)}-${renderWeight(bmiRange.high)}`} helper="BMI 18.5-24.9" tone="green" />
            <StatCard label="Average" value={renderWeight(averageIdeal)} helper="Across all methods" tone="indigo" />
            <StatCard label="Overall range" value={`${renderWeight(idealLow)}-${renderWeight(idealHigh)}`} helper="All methods combined" tone="gray" />
          </div>

          {distanceMessage && <Panel><p className="text-sm font-medium text-gray-900 dark:text-gray-100">{distanceMessage}</p></Panel>}

          <Panel>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Ideal weight is a guideline, not a health target. Muscle mass, bone density, and many other factors affect healthy weight.
            </p>
          </Panel>
        </div>
      </div>
    </ToolLayout>
  )
}