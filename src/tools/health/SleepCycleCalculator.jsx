import { useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { ToolLayout } from '../../components/ToolLayout.jsx'

const CYCLE_MINUTES = 90
const FALL_ASLEEP_MINUTES = 14

function addMinutes(date, mins) {
  return new Date(date.getTime() + mins * 60000)
}

function subtractMinutes(date, mins) {
  return new Date(date.getTime() - mins * 60000)
}

function formatTime(date) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
}

function getSleepTimes(wakeTime) {
  const results = []
  for (let cycles = 6; cycles >= 3; cycles--) {
    const sleepNeeded = cycles * CYCLE_MINUTES + FALL_ASLEEP_MINUTES
    const bedtime = subtractMinutes(wakeTime, sleepNeeded)
    results.push({ bedtime, cycles, hours: (cycles * CYCLE_MINUTES / 60).toFixed(1) })
  }
  return results
}

function getWakeTimes(sleepTime) {
  const results = []
  const fallAsleepTime = addMinutes(sleepTime, FALL_ASLEEP_MINUTES)
  for (let cycles = 3; cycles <= 6; cycles++) {
    const wakeTime = addMinutes(fallAsleepTime, cycles * CYCLE_MINUTES)
    results.push({ wakeTime, cycles, hours: (cycles * CYCLE_MINUTES / 60).toFixed(1) })
  }
  return results
}

function timeInputToDate(timeStr) {
  const [h, m] = timeStr.split(':').map(Number)
  const d = new Date()
  d.setHours(h, m, 0, 0)
  return d
}

const now = new Date()
const defaultWake = `${String(7).padStart(2, '0')}:00`
const defaultSleep = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`

export default function SleepCycleCalculator() {
  const [mode, setMode] = useState('wakeup') // 'wakeup' | 'bedtime'
  const [timeVal, setTimeVal] = useState(mode === 'wakeup' ? defaultWake : defaultSleep)

  const switchMode = (m) => {
    setMode(m)
    setTimeVal(m === 'wakeup' ? defaultWake : defaultSleep)
  }

  const date = timeInputToDate(timeVal)

  const results = mode === 'wakeup' ? getSleepTimes(date) : getWakeTimes(date)

  return (
    <ToolLayout
      title="Sleep Cycle Calculator"
      description="Estimate better bedtimes or wake-up times using 90-minute sleep cycles and a small fall-asleep buffer."
      path="/tools/sleep-cycle-calculator"
      disclaimerType="health"
    >
    <div className="space-y-5">
      {/* Mode toggle */}
      <div className="flex rounded-xl border border-gray-200 overflow-hidden w-fit">
        <button
          onClick={() => switchMode('wakeup')}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors ${mode === 'wakeup' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
        >
          <Sun className="w-4 h-4" /> I want to wake up at…
        </button>
        <button
          onClick={() => switchMode('bedtime')}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors ${mode === 'bedtime' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
        >
          <Moon className="w-4 h-4" /> I'm going to sleep at…
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {mode === 'wakeup' ? 'Wake-up Time' : 'Bedtime'}
        </label>
        <input
          type="time"
          value={timeVal}
          onChange={(e) => setTimeVal(e.target.value)}
          className="input-field max-w-xs"
        />
      </div>

      {/* Results */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-700">
          {mode === 'wakeup'
            ? `Go to sleep at one of these times to wake at ${formatTime(date)}:`
            : `Best wake-up times if you sleep at ${formatTime(date)}:`}
        </p>
        {results.map((r, i) => {
          const isRecommended = r.cycles === 5 || r.cycles === 6
          const displayTime = mode === 'wakeup' ? formatTime(r.bedtime) : formatTime(r.wakeTime)
          return (
            <div
              key={i}
              className={`flex items-center justify-between rounded-xl border px-4 py-3 ${
                isRecommended
                  ? 'bg-indigo-50 border-indigo-200'
                  : 'bg-white border-gray-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <Moon className={`w-4 h-4 ${isRecommended ? 'text-indigo-500' : 'text-gray-400'}`} />
                <span className={`text-lg font-bold font-mono ${isRecommended ? 'text-indigo-700' : 'text-gray-700'}`}>
                  {displayTime}
                </span>
              </div>
              <div className="text-right">
                <span className="text-sm text-gray-600">{r.cycles} cycles · {r.hours} hrs</span>
                {isRecommended && (
                  <span className="ml-2 text-xs bg-indigo-600 text-white px-2 py-0.5 rounded-full">Recommended</span>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-800">
        <strong>Tip:</strong> Adults need 5–6 complete sleep cycles (7.5–9 hours). Each cycle is ~90 minutes. 
        These times account for ~14 minutes to fall asleep.
      </div>
    </div>
    </ToolLayout>
  )
}
