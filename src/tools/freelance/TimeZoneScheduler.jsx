import { useState, useEffect } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import SEOHead from '../../components/SEOHead.jsx'
import CopyButton from '../../components/CopyButton.jsx'
import * as storage from '../../utils/storage.js'

const TIMEZONES = [
  'America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles',
  'America/Anchorage', 'Pacific/Honolulu',
  'UTC', 'Europe/London', 'Europe/Paris', 'Europe/Berlin', 'Europe/Amsterdam',
  'Asia/Dubai', 'Asia/Kolkata', 'Asia/Bangkok', 'Asia/Singapore', 'Asia/Hong_Kong',
  'Asia/Tokyo', 'Australia/Sydney', 'Australia/Melbourne', 'Pacific/Auckland',
]

export default function TimeZoneScheduler() {
  const [zones, setZones] = useState([
    { id: 1, timezone: 'America/New_York', workStart: 9, workEnd: 18 },
    { id: 2, timezone: 'Europe/London', workStart: 9, workEnd: 18 },
  ])
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])

  // Load from localStorage
  useEffect(() => {
    const saved = storage.getItem('timezone:zones')
    if (saved && Array.isArray(saved)) {
      setZones(saved)
    }
  }, [])

  // Save to localStorage
  useEffect(() => {
    storage.setItem('timezone:zones', zones)
  }, [zones])

  const addZone = () => {
    const newId = Math.max(...zones.map(z => z.id), 0) + 1
    setZones([...zones, { id: newId, timezone: 'UTC', workStart: 9, workEnd: 18 }])
  }

  const removeZone = (id) => {
    if (zones.length > 1) {
      setZones(zones.filter(z => z.id !== id))
    }
  }

  const updateZone = (id, field, value) => {
    setZones(zones.map(z => z.id === id ? { ...z, [field]: value } : z))
  }

  // Calculate times for all zones
  const getTimeInZone = (hour) => {
    const baseDate = new Date(`${selectedDate}T${String(hour).padStart(2, '0')}:00:00Z`)
    return baseDate
  }

  const getHourInZone = (utcHour, timezone) => {
    const date = new Date(`${selectedDate}T${String(utcHour).padStart(2, '0')}:00:00Z`)
    try {
      const formatter = new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        hour12: false,
        timeZone: timezone,
      })
      const parts = formatter.formatToParts(date)
      return parseInt(parts.find(p => p.type === 'hour')?.value || 0)
    } catch {
      return utcHour
    }
  }

  const isWorkingHour = (utcHour, timezone, workStart, workEnd) => {
    const hour = getHourInZone(utcHour, timezone)
    return hour >= workStart && hour < workEnd
  }

  // Find best meeting times (overlap)
  const findBestTimes = () => {
    const overlaps = []
    for (let startHour = 0; startHour < 24; startHour++) {
      let allWorking = true
      for (const zone of zones) {
        if (!isWorkingHour(startHour, zone.timezone, zone.workStart, zone.workEnd)) {
          allWorking = false
          break
        }
      }
      if (allWorking) {
        overlaps.push(startHour)
      }
    }
    return overlaps
  }

  const bestTimes = findBestTimes()

  const formatTime = (hour) => {
    return `${String(hour).padStart(2, '0')}:00 UTC`
  }

  const generateScheduleSummary = () => {
    const lines = [`Meeting Time Schedule for ${selectedDate}`, '']
    bestTimes.forEach(utcHour => {
      lines.push(`Suggested time: ${formatTime(utcHour)}`)
      zones.forEach(zone => {
        const hour = getHourInZone(utcHour, zone.timezone)
        lines.push(`  ${zone.timezone}: ${String(hour).padStart(2, '0')}:00`)
      })
      lines.push('')
    })
    return lines.join('\n')
  }

  return (
    <>
      <SEOHead
        title="Time Zone Scheduler | UnTrackt"
        description="Find the best meeting times across time zones. Shows working hours overlap for distributed teams. DST aware."
        path="/tools/timezone-scheduler"
        toolName="Time Zone Scheduler"
      />


      <div className="space-y-6">
        {/* Date Picker */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <label className="block text-sm font-medium text-gray-700 mb-2">Meeting Date</label>
          <input
            type="date"
            value={selectedDate}
            onChange={e => setSelectedDate(e.target.value)}
            className="input-field max-w-xs"
          />
        </div>

        {/* Zone Manager */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-lg text-gray-900">Time Zones</h2>
            <button onClick={addZone} disabled={zones.length >= 8} className="btn-secondary text-sm">
              <Plus className="w-4 h-4" />
              Add Zone
            </button>
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {zones.map((zone, idx) => (
              <div key={zone.id} className="p-4 bg-gray-50 rounded-lg space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs text-gray-600 block mb-1">Time Zone</label>
                    <select
                      value={zone.timezone}
                      onChange={e => updateZone(zone.id, 'timezone', e.target.value)}
                      className="input-field text-sm"
                    >
                      {TIMEZONES.map(tz => (
                        <option key={tz} value={tz}>{tz}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-gray-600 block mb-1">Work Start (hour)</label>
                    <input
                      type="number"
                      min="0"
                      max="23"
                      value={zone.workStart}
                      onChange={e => updateZone(zone.id, 'workStart', parseInt(e.target.value))}
                      className="input-field text-sm"
                    />
                  </div>
                  <div className="flex gap-2 items-end">
                    <div className="flex-1">
                      <label className="text-xs text-gray-600 block mb-1">Work End (hour)</label>
                      <input
                        type="number"
                        min="0"
                        max="23"
                        value={zone.workEnd}
                        onChange={e => updateZone(zone.id, 'workEnd', parseInt(e.target.value))}
                        className="input-field text-sm"
                      />
                    </div>
                    <button
                      onClick={() => removeZone(zone.id)}
                      disabled={zones.length === 1}
                      className="p-2 hover:bg-red-100 rounded disabled:opacity-50"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Best Meeting Times */}
        {bestTimes.length > 0 && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-6">
            <h2 className="font-semibold text-lg text-green-900 mb-4">✓ Best Meeting Times Found</h2>
            <div className="space-y-3">
              {bestTimes.slice(0, 5).map(utcHour => (
                <div key={utcHour} className="bg-white p-4 rounded-lg">
                  <p className="font-semibold text-gray-900 mb-2">{formatTime(utcHour)}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-auto gap-3 text-sm">
                    {zones.map(zone => {
                      const hour = getHourInZone(utcHour, zone.timezone)
                      return (
                        <div key={zone.id} className="text-gray-700">
                          <span className="font-medium">{zone.timezone}:</span> {String(hour).padStart(2, '0')}:00
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
            {bestTimes.length > 5 && <p className="text-sm text-green-700 mt-3">+ {bestTimes.length - 5} more options</p>}
            <CopyButton text={generateScheduleSummary()} label="Copy Full Schedule" className="w-full justify-center mt-4" />
          </div>
        )}

        {/* No Overlap */}
        {bestTimes.length === 0 && zones.length > 0 && (
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
            <p className="text-orange-900">
              ⚠️ No overlap found in working hours. Consider expanding working hours for one or more zones.
            </p>
          </div>
        )}

        {/* 24-Hour Timeline Grid */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 overflow-x-auto">
          <h2 className="font-semibold text-lg text-gray-900 mb-4">24-Hour Timeline</h2>
          <div className="min-w-max">
            {/* UTC Hours Header */}
            <div className="flex gap-0">
              <div className="w-20 text-xs font-semibold text-gray-600 border-b-2 border-gray-300 pb-2">UTC</div>
              {Array.from({ length: 24 }).map((_, i) => (
                <div key={i} className="w-12 text-center text-xs font-semibold text-gray-600 border-b-2 border-gray-300 pb-2">
                  {String(i).padStart(2, '0')}
                </div>
              ))}
            </div>

            {/* Zone rows */}
            {zones.map(zone => (
              <div key={zone.id} className="flex gap-0 mt-2">
                <div className="w-20 text-xs font-medium text-gray-700 truncate py-3">{zone.timezone.split('/')[1] || 'UTC'}</div>
                {Array.from({ length: 24 }).map((_, utcHour) => {
                  const isWorking = isWorkingHour(utcHour, zone.timezone, zone.workStart, zone.workEnd)
                  const isBest = bestTimes.includes(utcHour)
                  return (
                    <div
                      key={utcHour}
                      className={`w-12 h-10 flex items-center justify-center text-xs font-semibold border border-gray-200 ${
                        isBest ? 'bg-green-300 text-green-900' : isWorking ? 'bg-blue-100 text-blue-900' : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {getHourInZone(utcHour, zone.timezone).toString().padStart(2, '0')}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-4">
            <span className="inline-block w-3 h-3 bg-green-300 rounded mr-2 align-middle" /> Best overlap
            <span className="inline-block w-3 h-3 bg-blue-100 rounded mr-1 ml-3 align-middle" /> Working hours
          </p>
        </div>
      </div>
    </>
  )
}
