import { useState } from 'react'
import { ToolLayout, Panel, StatCard, SegmentedToggle, FieldLabel } from '../../components/ToolLayout.jsx'

const ZONES = [
  { label: 'Zone 1', name: 'Recovery / Easy', range: [0.5, 0.6], color: 'bg-sky-500', purpose: 'Recovery and warm-up work', activities: 'Easy walking, mobility, light cycling', time: '20-60 min' },
  { label: 'Zone 2', name: 'Fat burn / Aerobic', range: [0.6, 0.7], color: 'bg-blue-500', purpose: 'Aerobic base building', activities: 'Jogging, steady cycling, brisk hiking', time: '60-180 min' },
  { label: 'Zone 3', name: 'Aerobic / Endurance', range: [0.7, 0.8], color: 'bg-green-500', purpose: 'Tempo endurance and stamina', activities: 'Tempo runs, rowing, sustained efforts', time: '20-60 min' },
  { label: 'Zone 4', name: 'Anaerobic / Threshold', range: [0.8, 0.9], color: 'bg-amber-500', purpose: 'Threshold and lactate tolerance', activities: 'Hard intervals, race pace efforts', time: '10-30 min' },
  { label: 'Zone 5', name: 'Maximum / VO2 Max', range: [0.9, 1], color: 'bg-rose-500', purpose: 'Top-end power and VO2 max', activities: 'Sprints, maximal intervals', time: '2-10 min' },
]

function getMaxHeartRate(method, age, manualMax) {
  if (method === 'tanaka') return 208 - 0.7 * age
  if (method === 'manual') return Number(manualMax) || 0
  return 220 - age
}

export default function HeartRateZoneCalculator() {
  const [inputs, setInputs] = useState({ age: '32', resting: '60', method: 'estimated', manualMax: '185' })
  const age = Number(inputs.age)
  const restingHeartRate = Number(inputs.resting)
  const maxHeartRate = getMaxHeartRate(inputs.method, age, inputs.manualMax)
  const heartRateReserve = Math.max(0, maxHeartRate - restingHeartRate)
  const showKarvonen = restingHeartRate > 0

  return (
    <ToolLayout
      title="Heart Rate Zone Calculator"
      description="Calculate standard and Karvonen heart-rate training zones for aerobic base work, threshold sessions, and recovery."
      path="/tools/heart-rate-zone-calculator"
      disclaimerType="health"
    >
      <div className="grid gap-6 lg:grid-cols-[0.95fr,1.05fr]">
        <Panel>
          <div className="space-y-4">
            <div>
              <FieldLabel>Age</FieldLabel>
              <input className="input-field" type="number" min="10" max="100" value={inputs.age} onChange={(event) => setInputs((current) => ({ ...current, age: event.target.value }))} />
            </div>
            <div>
              <FieldLabel helper="Optional">Resting heart rate</FieldLabel>
              <input className="input-field" type="number" min="20" max="120" value={inputs.resting} onChange={(event) => setInputs((current) => ({ ...current, resting: event.target.value }))} />
            </div>
            <div>
              <FieldLabel>Max heart rate method</FieldLabel>
              <SegmentedToggle options={[{ label: '220-age', value: 'estimated' }, { label: 'Tanaka', value: 'tanaka' }, { label: 'Manual', value: 'manual' }]} value={inputs.method} onChange={(method) => setInputs((current) => ({ ...current, method }))} />
            </div>
            {inputs.method === 'manual' && (
              <div>
                <FieldLabel>Manual max HR</FieldLabel>
                <input className="input-field" type="number" min="50" max="250" value={inputs.manualMax} onChange={(event) => setInputs((current) => ({ ...current, manualMax: event.target.value }))} />
              </div>
            )}
          </div>
        </Panel>

        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <StatCard label="Estimated max HR" value={`${Math.round(maxHeartRate)} bpm`} helper={inputs.method === 'estimated' ? '220 - age' : inputs.method === 'tanaka' ? '208 - 0.7 × age' : 'Manual entry'} tone="indigo" />
            <StatCard label="Resting HR" value={`${Math.round(restingHeartRate)} bpm`} helper={showKarvonen ? 'Used for Karvonen zones' : 'Optional'} tone="blue" />
          </div>

          <Panel>
            <div className="flex h-5 rounded-full overflow-hidden">
              {ZONES.map((zone) => <div key={zone.label} className={zone.color} style={{ width: `${(zone.range[1] - zone.range[0]) * 100}%` }} />)}
            </div>
            <div className="mt-5 space-y-4">
              {ZONES.map((zone) => {
                const standardLow = Math.round(maxHeartRate * zone.range[0])
                const standardHigh = Math.round(maxHeartRate * zone.range[1])
                const karvonenLow = Math.round(restingHeartRate + heartRateReserve * zone.range[0])
                const karvonenHigh = Math.round(restingHeartRate + heartRateReserve * zone.range[1])

                return (
                  <div key={zone.label} className="rounded-2xl border border-gray-200 dark:border-gray-700 p-4">
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{zone.label} - {zone.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{Math.round(zone.range[0] * 100)}-{Math.round(zone.range[1] * 100)}% of max HR</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{standardLow}-{standardHigh} bpm</p>
                        {showKarvonen && <p className="text-xs text-indigo-600 dark:text-indigo-400">Karvonen: {karvonenLow}-{karvonenHigh} bpm</p>}
                      </div>
                    </div>
                    <div className="mt-3 grid gap-3 sm:grid-cols-3 text-sm text-gray-600 dark:text-gray-300">
                      <p><span className="font-medium text-gray-900 dark:text-gray-100">Purpose:</span> {zone.purpose}</p>
                      <p><span className="font-medium text-gray-900 dark:text-gray-100">Activities:</span> {zone.activities}</p>
                      <p><span className="font-medium text-gray-900 dark:text-gray-100">Weekly time:</span> {zone.time}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </Panel>
        </div>
      </div>
    </ToolLayout>
  )
}