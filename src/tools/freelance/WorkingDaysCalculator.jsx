import { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'

function parseDate(str) {
  const [y, m, d] = str.split('-').map(Number)
  return new Date(y, m - 1, d)
}

function isWeekend(date) {
  const day = date.getDay()
  return day === 0 || day === 6
}

function calculateWorkingDays(start, end, excludeWeekends, holidays) {
  if (!start || !end || start > end) return null
  let working = 0
  let calendar = 0
  let weekendsExcluded = 0
  const current = new Date(start)
  const holidaySet = new Set(holidays.map((h) => h))

  while (current <= end) {
    calendar++
    const dayStr = current.toISOString().slice(0, 10)
    if (excludeWeekends && isWeekend(current)) {
      weekendsExcluded++
    } else if (holidaySet.has(dayStr)) {
      // holiday, skip
    } else {
      working++
    }
    current.setDate(current.getDate() + 1)
  }
  return { working, calendar, weekendsExcluded }
}

export default function WorkingDaysCalculator() {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [excludeWeekends, setExcludeWeekends] = useState(true)
  const [holidays, setHolidays] = useState([])
  const [holidayInput, setHolidayInput] = useState('')

  const addHoliday = () => {
    const val = holidayInput.trim()
    if (val && !holidays.includes(val)) {
      setHolidays((h) => [...h, val].sort())
      setHolidayInput('')
    }
  }

  const removeHoliday = (h) => setHolidays((hs) => hs.filter((x) => x !== h))

  const result = startDate && endDate ? calculateWorkingDays(
    parseDate(startDate),
    parseDate(endDate),
    excludeWeekends,
    holidays
  ) : null

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="input-field" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="input-field" />
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={excludeWeekends}
            onChange={(e) => setExcludeWeekends(e.target.checked)}
            className="w-4 h-4 rounded accent-indigo-600"
          />
          <span className="text-sm text-gray-700">Exclude weekends</span>
        </label>
      </div>

      {/* Custom holidays */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Add Public / Custom Holidays</label>
        <div className="flex gap-2">
          <input
            type="date"
            value={holidayInput}
            onChange={(e) => setHolidayInput(e.target.value)}
            className="input-field flex-1"
          />
          <button onClick={addHoliday} className="btn-secondary flex items-center gap-1.5">
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>
        {holidays.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {holidays.map((h) => (
              <span key={h} className="flex items-center gap-1.5 bg-gray-100 text-gray-700 text-xs px-2.5 py-1 rounded-full">
                {h}
                <button onClick={() => removeHoliday(h)} className="text-gray-400 hover:text-red-500">
                  <Trash2 className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Results */}
      {result ? (
        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-3xl font-bold text-indigo-700">{result.working}</p>
              <p className="text-xs text-gray-500 mt-1">Working Days</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-800">{result.calendar}</p>
              <p className="text-xs text-gray-500 mt-1">Calendar Days</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-400">{result.weekendsExcluded}</p>
              <p className="text-xs text-gray-500 mt-1">Weekends Excluded</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center text-sm text-gray-400">
          Select a start and end date to calculate working days.
        </div>
      )}
    </div>
  )
}
