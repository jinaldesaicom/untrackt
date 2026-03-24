import { useMemo, useState } from 'react'

const PRESETS = {
  '@hourly': '0 * * * *',
  '@daily': '0 0 * * *',
  '@weekly': '0 0 * * 0',
  '@monthly': '0 0 1 * *',
  '@yearly': '0 0 1 1 *',
}

const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

function parseField(field, min, max) {
  const values = new Set()
  const segments = field.split(',')

  for (const seg of segments) {
    if (seg === '*') {
      for (let i = min; i <= max; i += 1) values.add(i)
      continue
    }

    const [rangePart, stepPart] = seg.split('/')
    const step = stepPart ? Number(stepPart) : 1
    if (!Number.isFinite(step) || step < 1) throw new Error(`Invalid step in "${field}"`)

    if (rangePart === '*') {
      for (let i = min; i <= max; i += step) values.add(i)
      continue
    }

    if (rangePart.includes('-')) {
      const [start, end] = rangePart.split('-').map(Number)
      if (Number.isNaN(start) || Number.isNaN(end) || start < min || end > max || start > end) {
        throw new Error(`Invalid range in "${field}"`)
      }
      for (let i = start; i <= end; i += step) values.add(i)
      continue
    }

    const single = Number(rangePart)
    if (Number.isNaN(single) || single < min || single > max) throw new Error(`Invalid value in "${field}"`)
    values.add(single)
  }

  return values
}

function describeCron(parts) {
  const [minute, hour, day, month, weekday] = parts
  if (minute !== '*' && hour !== '*' && weekday === '*') {
    return `At ${hour.padStart(2, '0')}:${minute.padStart(2, '0')} every day`
  }
  if (minute === '0' && hour === '*' && day === '*' && month === '*' && weekday === '*') {
    return 'At minute 0 of every hour'
  }
  if (weekday !== '*') {
    return `Runs on ${weekday.split(',').map((d) => WEEKDAYS[Number(d)] || d).join(', ')} at ${hour === '*' ? 'every hour' : `${hour.padStart(2, '0')}:${minute === '*' ? '00' : minute.padStart(2, '0')}`}`
  }
  return 'Custom cron schedule'
}

function parseCron(expr) {
  const normalized = PRESETS[expr] || expr
  const parts = normalized.trim().split(/\s+/)
  if (parts.length !== 5 && parts.length !== 6) throw new Error('Use 5 or 6 cron fields')

  const withSeconds = parts.length === 6
  const offset = withSeconds ? 1 : 0

  const minuteSet = parseField(parts[offset + 0], 0, 59)
  const hourSet = parseField(parts[offset + 1], 0, 23)
  const daySet = parseField(parts[offset + 2], 1, 31)
  const monthSet = parseField(parts[offset + 3], 1, 12)
  const weekdaySet = parseField(parts[offset + 4], 0, 6)

  return {
    normalized: withSeconds ? parts.slice(1).join(' ') : normalized,
    minuteSet,
    hourSet,
    daySet,
    monthSet,
    weekdaySet,
    parts: withSeconds ? parts.slice(1) : parts,
  }
}

function nextRuns(parsed, count = 5) {
  const out = []
  const cursor = new Date()
  cursor.setSeconds(0, 0)
  for (let i = 0; i < 525600 && out.length < count; i += 1) {
    cursor.setMinutes(cursor.getMinutes() + 1)
    if (
      parsed.minuteSet.has(cursor.getMinutes()) &&
      parsed.hourSet.has(cursor.getHours()) &&
      parsed.daySet.has(cursor.getDate()) &&
      parsed.monthSet.has(cursor.getMonth() + 1) &&
      parsed.weekdaySet.has(cursor.getDay())
    ) {
      out.push(new Date(cursor))
    }
  }
  return out
}

export default function CronParser() {
  const [expr, setExpr] = useState('0 9 * * 1')

  const computed = useMemo(() => {
    try {
      const parsed = parseCron(expr)
      return {
        parsed,
        description: describeCron(parsed.parts),
        next: nextRuns(parsed),
        error: '',
      }
    } catch (err) {
      return { parsed: null, description: '', next: [], error: err.message || 'Invalid cron expression' }
    }
  }, [expr])

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {Object.entries(PRESETS).map(([label, value]) => (
          <button key={label} className="btn-secondary" onClick={() => setExpr(value)}>{label}</button>
        ))}
      </div>

      <input value={expr} onChange={(e) => setExpr(e.target.value)} className="input-field" placeholder="0 9 * * 1" />
      {computed.error ? <p className="text-sm text-red-600">{computed.error}</p> : null}

      {computed.parsed ? (
        <>
          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <h3 className="font-semibold text-gray-900">Plain English</h3>
            <p className="text-sm text-gray-600 mt-1">{computed.description}</p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Next 5 Runs</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              {computed.next.map((run, idx) => (
                <li key={idx}>{run.toLocaleString()}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-4 overflow-x-auto">
            <h3 className="font-semibold text-gray-900 mb-2">Field Breakdown</h3>
            <table className="w-full text-sm">
              <tbody>
                <tr><td className="py-1 pr-3 font-medium">Minute</td><td>{computed.parsed.parts[0]}</td></tr>
                <tr><td className="py-1 pr-3 font-medium">Hour</td><td>{computed.parsed.parts[1]}</td></tr>
                <tr><td className="py-1 pr-3 font-medium">Day</td><td>{computed.parsed.parts[2]}</td></tr>
                <tr><td className="py-1 pr-3 font-medium">Month</td><td>{computed.parsed.parts[3]} ({MONTHS.join(', ')})</td></tr>
                <tr><td className="py-1 pr-3 font-medium">Weekday</td><td>{computed.parsed.parts[4]} ({WEEKDAYS.join(', ')})</td></tr>
              </tbody>
            </table>
          </div>
        </>
      ) : null}
    </div>
  )
}
