import { useState, useEffect, useRef } from 'react'
import { Play, Square } from 'lucide-react'

export default function MeetingCostCalculator() {
  const [attendees, setAttendees] = useState('8')
  const [salary, setSalary] = useState('75')
  const [duration, setDuration] = useState('60')
  const [running, setRunning] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const intervalRef = useRef(null)

  const hourlyTotal = (parseFloat(attendees) || 0) * (parseFloat(salary) || 0)
  const costPerSecond = hourlyTotal / 3600
  const costPerMinute = hourlyTotal / 60
  const plannedTotal = costPerMinute * (parseFloat(duration) || 0)

  const liveCost = elapsed * costPerSecond
  const isEmailWorthy = plannedTotal > 500

  const fmt = (n) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 })

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => setElapsed((e) => e + 1), 1000)
    } else {
      clearInterval(intervalRef.current)
    }
    return () => clearInterval(intervalRef.current)
  }, [running])

  const startStop = () => {
    if (running) {
      setRunning(false)
    } else {
      setElapsed(0)
      setRunning(true)
    }
  }

  const formatElapsed = (s) => {
    const m = Math.floor(s / 60)
    const secs = s % 60
    return `${String(m).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Number of Attendees</label>
          <input type="number" value={attendees} onChange={(e) => { setAttendees(e.target.value); setRunning(false); setElapsed(0) }} className="input-field" min="1" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Avg Hourly Salary ($)</label>
          <input type="number" value={salary} onChange={(e) => { setSalary(e.target.value); setRunning(false); setElapsed(0) }} className="input-field" min="0" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Planned Duration (min)</label>
          <input type="number" value={duration} onChange={(e) => { setDuration(e.target.value); setRunning(false); setElapsed(0) }} className="input-field" min="1" />
        </div>
      </div>

      {/* Live ticker */}
      <div className={`rounded-xl border-2 p-6 text-center transition-colors ${running ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50'}`}>
        {running ? (
          <>
            <p className="text-xs text-gray-500 mb-1">Meeting in progress — {formatElapsed(elapsed)}</p>
            <p className="text-5xl font-bold font-mono text-red-600 tabular-nums">{fmt(liveCost)}</p>
            <p className="text-sm text-gray-500 mt-2">and counting... 💸</p>
          </>
        ) : (
          <>
            <p className="text-xs text-gray-500 mb-1">Estimated meeting cost</p>
            <p className="text-5xl font-bold font-mono text-gray-800 tabular-nums">{fmt(plannedTotal)}</p>
            <p className="text-sm text-gray-500 mt-2">for {duration} minutes with {attendees} people</p>
          </>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <p className="text-xs text-gray-500 mb-1">Cost per Minute</p>
          <p className="text-xl font-bold text-gray-900">{fmt(costPerMinute)}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <p className="text-xs text-gray-500 mb-1">Total Planned Cost</p>
          <p className="text-xl font-bold text-gray-900">{fmt(plannedTotal)}</p>
        </div>
      </div>

      {isEmailWorthy && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-amber-800 text-sm font-medium flex items-start gap-2">
          <span>💡</span>
          <span>This meeting costs {fmt(plannedTotal)}. That could have been an email. 😅</span>
        </div>
      )}

      <div className="flex justify-center">
        <button
          onClick={startStop}
          className={`flex items-center gap-2 px-8 py-3 rounded-full font-semibold text-sm transition-colors ${
            running ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-indigo-600 text-white hover:bg-indigo-700'
          }`}
        >
          {running ? <Square className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          {running ? 'Stop Meeting' : 'Start Meeting Timer'}
        </button>
      </div>
    </div>
  )
}
