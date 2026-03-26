import { useState } from 'react'
import { ToolLayout, Panel, StatCard, FieldLabel } from '../../components/ToolLayout.jsx'

function classifyPressure(systolic, diastolic) {
  if (systolic > 180 || diastolic > 120) {
    return { label: 'Hypertensive Crisis', tone: 'rose', meaning: 'These readings are in a dangerous emergency range.', action: 'Seek emergency care immediately.' }
  }
  if (systolic < 90 || diastolic < 60) {
    return { label: 'Low BP', tone: 'blue', meaning: 'Your reading is below the typical adult reference range.', action: 'If you feel faint, dizzy, or unwell, contact a doctor.' }
  }
  if (systolic >= 140 || diastolic >= 90) {
    return { label: 'High BP Stage 2', tone: 'rose', meaning: 'This is clearly above the standard treatment threshold.', action: 'Consult a doctor promptly.' }
  }
  if ((systolic >= 130 && systolic <= 139) || (diastolic >= 80 && diastolic <= 89)) {
    return { label: 'High BP Stage 1', tone: 'amber', meaning: 'This is above normal and may need follow-up care.', action: 'Consult a doctor.' }
  }
  if (systolic >= 120 && systolic <= 129 && diastolic < 80) {
    return { label: 'Elevated', tone: 'amber', meaning: 'Your systolic pressure is above ideal, but not yet hypertension.', action: 'Lifestyle changes are recommended.' }
  }
  return { label: 'Normal', tone: 'green', meaning: 'Your reading is within the normal adult range.', action: 'Maintain a healthy lifestyle.' }
}

export default function BloodPressureClassifier() {
  const [readings, setReadings] = useState([{ systolic: '118', diastolic: '76' }])

  const validReadings = readings.filter((reading) => Number(reading.systolic) > 0 && Number(reading.diastolic) > 0)
  const averageSystolic = validReadings.length ? validReadings.reduce((sum, reading) => sum + Number(reading.systolic), 0) / validReadings.length : 0
  const averageDiastolic = validReadings.length ? validReadings.reduce((sum, reading) => sum + Number(reading.diastolic), 0) / validReadings.length : 0
  const classification = classifyPressure(averageSystolic, averageDiastolic)
  const hasCrisisReading = validReadings.some((reading) => Number(reading.systolic) > 180 || Number(reading.diastolic) > 120)
  const variation = validReadings.length > 1
    ? `Variation across readings: ${Math.max(...validReadings.map((reading) => Number(reading.systolic))) - Math.min(...validReadings.map((reading) => Number(reading.systolic)))} systolic / ${Math.max(...validReadings.map((reading) => Number(reading.diastolic))) - Math.min(...validReadings.map((reading) => Number(reading.diastolic)))} diastolic.`
    : 'Single reading shown.'

  const gaugePosition = Math.min(100, Math.max(0, ((averageSystolic - 80) / 120) * 100))

  return (
    <ToolLayout
      title="Blood Pressure Classifier"
      description="Classify a blood pressure reading or the average of multiple readings using AHA guidance, with plain-English actions and warnings."
      path="/tools/blood-pressure-classifier"
      disclaimerType="health"
    >
      {hasCrisisReading && (
        <div className="rounded-2xl border border-rose-300 dark:border-rose-700 bg-rose-50 dark:bg-rose-950/40 px-5 py-4 text-rose-800 dark:text-rose-200 font-semibold">
          These values may indicate a hypertensive crisis. Seek immediate medical attention.
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[0.95fr,1.05fr]">
        <Panel>
          <div className="space-y-4">
            {readings.map((reading, index) => (
              <div key={index} className="grid gap-3 sm:grid-cols-[1fr,1fr,auto] items-end">
                <div>
                  <FieldLabel>Systolic</FieldLabel>
                  <input className="input-field" type="number" min="0" value={reading.systolic} onChange={(event) => setReadings((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, systolic: event.target.value } : item))} />
                </div>
                <div>
                  <FieldLabel>Diastolic</FieldLabel>
                  <input className="input-field" type="number" min="0" value={reading.diastolic} onChange={(event) => setReadings((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, diastolic: event.target.value } : item))} />
                </div>
                <button type="button" className="btn-secondary" disabled={readings.length === 1} onClick={() => setReadings((current) => current.filter((_, itemIndex) => itemIndex !== index))}>Remove</button>
              </div>
            ))}
            <button type="button" className="btn-primary" disabled={readings.length >= 7} onClick={() => setReadings((current) => [...current, { systolic: '', diastolic: '' }])}>Add reading</button>
          </div>
        </Panel>

        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <StatCard label="Average systolic" value={`${Math.round(averageSystolic)} mmHg`} helper="Across entered readings" tone="blue" />
            <StatCard label="Average diastolic" value={`${Math.round(averageDiastolic)} mmHg`} helper="Across entered readings" tone="indigo" />
            <StatCard label="Classification" value={classification.label} helper={classification.meaning} tone={classification.tone} className="sm:col-span-2" />
          </div>

          <Panel>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Recommended action</h2>
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">{classification.action}</p>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{variation}</p>
          </Panel>

          <Panel>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Blood pressure gauge</h2>
            <svg viewBox="0 0 320 120" className="mt-4 w-full">
              <path d="M40 90 A120 120 0 0 1 280 90" fill="none" stroke="#e5e7eb" strokeWidth="16" strokeLinecap="round" />
              <path d="M40 90 A120 120 0 0 1 120 20" fill="none" stroke="#10b981" strokeWidth="16" strokeLinecap="round" />
              <path d="M120 20 A120 120 0 0 1 200 20" fill="none" stroke="#f59e0b" strokeWidth="16" strokeLinecap="round" />
              <path d="M200 20 A120 120 0 0 1 280 90" fill="none" stroke="#f43f5e" strokeWidth="16" strokeLinecap="round" />
              <line x1="160" y1="90" x2={80 + gaugePosition * 1.6} y2={20 + Math.abs(50 - gaugePosition) * 1.2} stroke="#111827" strokeWidth="6" strokeLinecap="round" />
              <circle cx="160" cy="90" r="10" fill="#111827" />
            </svg>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Reading position is based on average systolic pressure and is intended as a simple visual reference.</p>
          </Panel>
        </div>
      </div>
    </ToolLayout>
  )
}