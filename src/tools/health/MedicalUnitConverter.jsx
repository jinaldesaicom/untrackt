import { useState } from 'react'
import CopyButton from '../../components/CopyButton.jsx'
import { ToolLayout, Panel, StatCard, SegmentedToggle, FieldLabel } from '../../components/ToolLayout.jsx'
import { cmToFeetInches, feetInchesToCm, kgToLbs, lbsToKg, roundTo } from '../../utils/unitConverters.js'

function cholesterolFactor(type) {
  return type === 'triglycerides' ? 0.01129 : 0.02586
}

export default function MedicalUnitConverter() {
  const [tab, setTab] = useState('glucose')
  const [glucoseMg, setGlucoseMg] = useState('95')
  const [cholesterolType, setCholesterolType] = useState('total')
  const [cholesterolMg, setCholesterolMg] = useState('180')
  const [hba1cPercent, setHba1cPercent] = useState('5.7')
  const [temperatureC, setTemperatureC] = useState('37')
  const [weightKg, setWeightKg] = useState('70')
  const [heightCm, setHeightCm] = useState('175')

  const glucoseMmol = Number(glucoseMg) / 18.0182
  const cholesterolMmol = Number(cholesterolMg) * cholesterolFactor(cholesterolType)
  const hba1cMmol = (Number(hba1cPercent) - 2.15) * 10.929
  const temperatureF = Number(temperatureC) * 1.8 + 32
  const weightLbs = kgToLbs(weightKg)
  const stone = Math.floor(weightLbs / 14)
  const remainingPounds = weightLbs - stone * 14
  const feetAndInches = cmToFeetInches(heightCm)
  const meters = Number(heightCm) / 100

  const glucoseState = Number(glucoseMg) >= 126 ? 'Diabetic range' : Number(glucoseMg) >= 100 ? 'Pre-diabetic range' : 'Normal fasting range'
  const hba1cState = Number(hba1cPercent) >= 6.5 ? 'Diabetes range' : Number(hba1cPercent) >= 5.7 ? 'Pre-diabetes range' : 'Normal range'
  const tempState = Number(temperatureC) >= 39 ? 'High fever' : Number(temperatureC) >= 37.8 ? 'Fever' : Number(temperatureC) < 35 ? 'Hypothermia' : 'Normal body temperature'

  return (
    <ToolLayout
      title="Medical Unit Converter"
      description="Convert common medical measurements such as glucose, cholesterol, HbA1c, temperature, weight, and height in real time."
      path="/tools/medical-unit-converter"
      disclaimerType="health"
    >
      <div className="rounded-2xl border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/30 px-5 py-4 text-amber-900 dark:text-amber-200 text-sm font-medium">
        Reference ranges vary by laboratory and individual. Always interpret results with your healthcare provider.
      </div>

      <Panel>
        <SegmentedToggle
          options={[
            { label: 'Blood glucose', value: 'glucose' },
            { label: 'Cholesterol', value: 'cholesterol' },
            { label: 'HbA1c', value: 'hba1c' },
            { label: 'Temperature', value: 'temperature' },
            { label: 'Weight', value: 'weight' },
            { label: 'Height', value: 'height' },
          ]}
          value={tab}
          onChange={setTab}
          className="flex-wrap"
        />
      </Panel>

      {tab === 'glucose' && (
        <div className="grid gap-6 lg:grid-cols-[0.9fr,1.1fr]">
          <Panel>
            <FieldLabel>Blood glucose (mg/dL)</FieldLabel>
            <input className="input-field" type="number" min="0" value={glucoseMg} onChange={(event) => setGlucoseMg(event.target.value)} />
          </Panel>
          <Panel>
            <div className="grid gap-4 sm:grid-cols-2">
              <StatCard label="mmol/L" value={roundTo(glucoseMmol, 2)} helper={glucoseState} tone="blue" />
              <div className="rounded-2xl border border-gray-200 dark:border-gray-700 p-4">
                <CopyButton text={String(roundTo(glucoseMmol, 2))} label="Copy result" />
                <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">Normal fasting: 70-100 mg/dL · Pre-diabetic: 100-125 mg/dL · Diabetic: ≥126 mg/dL</p>
              </div>
            </div>
          </Panel>
        </div>
      )}

      {tab === 'cholesterol' && (
        <div className="grid gap-6 lg:grid-cols-[0.9fr,1.1fr]">
          <Panel>
            <div className="space-y-4">
              <div>
                <FieldLabel>Measurement type</FieldLabel>
                <select className="input-field" value={cholesterolType} onChange={(event) => setCholesterolType(event.target.value)}>
                  <option value="total">Total cholesterol</option>
                  <option value="ldl">LDL</option>
                  <option value="hdl">HDL</option>
                  <option value="triglycerides">Triglycerides</option>
                </select>
              </div>
              <div>
                <FieldLabel>mg/dL</FieldLabel>
                <input className="input-field" type="number" min="0" value={cholesterolMg} onChange={(event) => setCholesterolMg(event.target.value)} />
              </div>
            </div>
          </Panel>
          <Panel>
            <StatCard label="mmol/L" value={roundTo(cholesterolMmol, 2)} helper="Converted value" tone="indigo" />
            <div className="mt-4">
              <CopyButton text={String(roundTo(cholesterolMmol, 2))} label="Copy result" />
            </div>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">Reference ranges vary by marker. In general, lower LDL and triglycerides are preferred, while higher HDL is often favorable.</p>
          </Panel>
        </div>
      )}

      {tab === 'hba1c' && (
        <div className="grid gap-6 lg:grid-cols-[0.9fr,1.1fr]">
          <Panel>
            <FieldLabel>HbA1c (%)</FieldLabel>
            <input className="input-field" type="number" step="0.1" min="0" value={hba1cPercent} onChange={(event) => setHba1cPercent(event.target.value)} />
          </Panel>
          <Panel>
            <StatCard label="mmol/mol" value={roundTo(hba1cMmol, 1)} helper={hba1cState} tone="green" />
            <div className="mt-4">
              <CopyButton text={String(roundTo(hba1cMmol, 1))} label="Copy result" />
            </div>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">Normal is typically below 42 mmol/mol or below 6%.</p>
          </Panel>
        </div>
      )}

      {tab === 'temperature' && (
        <div className="grid gap-6 lg:grid-cols-[0.9fr,1.1fr]">
          <Panel>
            <FieldLabel>Temperature (°C)</FieldLabel>
            <input className="input-field" type="number" step="0.1" value={temperatureC} onChange={(event) => setTemperatureC(event.target.value)} />
          </Panel>
          <Panel>
            <StatCard label="Temperature (°F)" value={roundTo(temperatureF, 1)} helper={tempState} tone="amber" />
            <div className="mt-4">
              <CopyButton text={String(roundTo(temperatureF, 1))} label="Copy result" />
            </div>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">Reference guide: hypothermia below 35°C, normal around 36.1-37.2°C, fever above 37.8°C.</p>
          </Panel>
        </div>
      )}

      {tab === 'weight' && (
        <div className="grid gap-6 lg:grid-cols-[0.9fr,1.1fr]">
          <Panel>
            <FieldLabel>Weight (kg)</FieldLabel>
            <input className="input-field" type="number" step="0.1" value={weightKg} onChange={(event) => setWeightKg(event.target.value)} />
          </Panel>
          <Panel>
            <div className="grid gap-4 sm:grid-cols-2">
              <StatCard label="Pounds" value={roundTo(weightLbs, 1)} helper="kg ↔ lbs" tone="blue" />
              <StatCard label="Stone + pounds" value={`${stone} st ${roundTo(remainingPounds, 1)} lb`} helper="UK format" tone="indigo" />
              <StatCard label="Baby weight" value={`${Math.round(Number(weightKg) * 1000)} g`} helper={`${roundTo(Number(weightKg) * 35.274, 1)} oz`} tone="green" className="sm:col-span-2" />
            </div>
          </Panel>
        </div>
      )}

      {tab === 'height' && (
        <div className="grid gap-6 lg:grid-cols-[0.9fr,1.1fr]">
          <Panel>
            <FieldLabel>Height (cm)</FieldLabel>
            <input className="input-field" type="number" step="0.1" value={heightCm} onChange={(event) => setHeightCm(event.target.value)} />
          </Panel>
          <Panel>
            <div className="grid gap-4 sm:grid-cols-2">
              <StatCard label="Feet + inches" value={`${feetAndInches.feet} ft ${roundTo(feetAndInches.inches, 1)} in`} helper="Imperial" tone="blue" />
              <StatCard label="Meters" value={roundTo(meters, 2)} helper="Metric" tone="green" />
              <div className="sm:col-span-2">
                <CopyButton text={`${feetAndInches.feet} ft ${roundTo(feetAndInches.inches, 1)} in`} label="Copy imperial height" />
              </div>
            </div>
          </Panel>
        </div>
      )}
    </ToolLayout>
  )
}