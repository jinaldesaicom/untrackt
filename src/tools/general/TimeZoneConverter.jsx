import { useState, useCallback, useMemo, useEffect, useRef } from 'react'
import { Plus, Trash2, Copy, Check, ArrowRightLeft } from 'lucide-react'

const ZONES = Intl.supportedValuesOf('timeZone')

const POPULAR_ZONES = [
  'UTC',
  'America/New_York',
  'America/Chicago',
  'America/Denver',
  'America/Los_Angeles',
  'Europe/London',
  'Europe/Paris',
  'Europe/Berlin',
  'Asia/Dubai',
  'Asia/Kolkata',
  'Asia/Shanghai',
  'Asia/Tokyo',
  'Asia/Singapore',
  'Australia/Sydney',
  'Pacific/Auckland',
]

function labelFor(tz) {
  const city = tz.replace(/_/g, ' ').split('/').pop()
  try {
    const abbr = new Intl.DateTimeFormat('en-US', { timeZone: tz, timeZoneName: 'short' })
      .formatToParts(new Date())
      .find((p) => p.type === 'timeZoneName')?.value || ''
    return `${city} (${abbr})`
  } catch {
    return city
  }
}

function formatOffset(tz, date) {
  try {
    const fmt = new Intl.DateTimeFormat('en-US', {
      timeZone: tz,
      timeZoneName: 'longOffset',
    })
    const parts = fmt.formatToParts(date)
    return parts.find((p) => p.type === 'timeZoneName')?.value || ''
  } catch {
    return ''
  }
}

function toLocalISO(date, tz) {
  const fmt = new Intl.DateTimeFormat('en-CA', {
    timeZone: tz,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
  const p = {}
  fmt.formatToParts(date).forEach((part) => { if (part.type !== 'literal') p[part.type] = part.value })
  return { date: `${p.year}-${p.month}-${p.day}`, time: `${p.hour}:${p.minute}` }
}

function formatDisplay(date, tz) {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: tz,
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  }).format(date)
}

function dayLabel(date, tz, refTz) {
  const refDate = new Intl.DateTimeFormat('en-CA', { timeZone: refTz, year: 'numeric', month: '2-digit', day: '2-digit' }).format(date)
  const tzDate = new Intl.DateTimeFormat('en-CA', { timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit' }).format(date)
  if (tzDate > refDate) return 'tomorrow'
  if (tzDate < refDate) return 'yesterday'
  return null
}

function useTick(intervalMs = 1000) {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), intervalMs)
    return () => clearInterval(id)
  }, [intervalMs])
  return now
}

function formatLiveClock(date, tz) {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: tz,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  }).format(date)
}

function formatLiveDate(date, tz) {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: tz,
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  }).format(date)
}

function CopyBtn({ text }) {
  const [copied, setCopied] = useState(false)
  const copy = () => { navigator.clipboard.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1500) }) }
  return (
    <button onClick={copy} title="Copy" className="text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
    </button>
  )
}

function ZoneSearch({ value, onChange, zones, placeholder }) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    if (!search) return POPULAR_ZONES
    const q = search.toLowerCase()
    return zones.filter((z) => z.toLowerCase().includes(q)).slice(0, 30)
  }, [search, zones])

  const select = (tz) => {
    onChange(tz)
    setSearch('')
    setOpen(false)
  }

  return (
    <div className="relative">
      <input
        type="text"
        value={open ? search : value}
        onChange={(e) => { setSearch(e.target.value); if (!open) setOpen(true) }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 200)}
        placeholder={placeholder || 'Search time zone…'}
        className="input-field font-mono text-sm"
        spellCheck={false}
      />
      {open && (
        <div className="absolute z-20 mt-1 w-full max-h-56 overflow-y-auto rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg">
          {filtered.length === 0 && (
            <div className="px-3 py-2 text-sm text-gray-400">No matches</div>
          )}
          {filtered.map((tz) => (
            <button
              key={tz}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => select(tz)}
              className="w-full text-left px-3 py-2 text-sm hover:bg-indigo-50 dark:hover:bg-indigo-900/30 text-gray-700 dark:text-gray-200 flex items-center justify-between"
            >
              <span className="font-mono">{tz}</span>
              <span className="text-xs text-gray-400 dark:text-gray-500">{formatOffset(tz, new Date())}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

let nextId = 3

export default function TimeZoneConverter() {
  const localTz = Intl.DateTimeFormat().resolvedOptions().timeZone
  const [sourceZone, setSourceZone] = useState(localTz)
  const tick = useTick(1000)

  const now = new Date()
  const local = toLocalISO(now, localTz)
  const [dateStr, setDateStr] = useState(local.date)
  const [timeStr, setTimeStr] = useState(local.time)

  const [zones, setZones] = useState([
    { id: 1, tz: 'UTC' },
    { id: 2, tz: 'America/New_York' },
  ])

  // Build the reference Date from dateStr + timeStr in sourceZone
  const refDate = useMemo(() => {
    try {
      // Build an ISO string, parse it in the context of sourceZone
      const dtStr = `${dateStr}T${timeStr}:00`
      // Use a formatter round-trip to get absolute time
      const guess = new Date(dtStr + 'Z')
      const offset = calcOffsetMs(sourceZone, guess)
      return new Date(guess.getTime() - offset)
    } catch {
      return new Date()
    }
  }, [dateStr, timeStr, sourceZone])

  const setNow = () => {
    const n = new Date()
    const l = toLocalISO(n, sourceZone)
    setDateStr(l.date)
    setTimeStr(l.time)
  }

  const addZone = () => {
    setZones((prev) => [...prev, { id: nextId++, tz: 'Europe/London' }])
  }

  const removeZone = (id) => {
    setZones((prev) => prev.filter((z) => z.id !== id))
  }

  const updateZone = (id, tz) => {
    setZones((prev) => prev.map((z) => (z.id === id ? { ...z, tz } : z)))
  }

  const copyAll = () => {
    const lines = zones.map((z) => `${z.tz}: ${formatDisplay(refDate, z.tz)}`).join('\n')
    navigator.clipboard.writeText(`Source: ${sourceZone} — ${dateStr} ${timeStr}\n\n${lines}`)
  }

  return (
    <div className="space-y-5">
      {/* Source input */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <ArrowRightLeft className="w-4 h-4 text-indigo-500" />
            Source Time
          </h3>
          <button onClick={setNow} className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline">
            Now
          </button>
        </div>

        {/* Live clock for source zone */}
        <div className="flex items-center gap-3 rounded-lg bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900 px-3 py-2">
          <span className="text-2xl font-bold tabular-nums text-indigo-700 dark:text-indigo-300 tracking-tight">
            {formatLiveClock(tick, sourceZone)}
          </span>
          <span className="text-xs text-indigo-500 dark:text-indigo-400">
            {formatLiveDate(tick, sourceZone)}
          </span>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Time zone</label>
          <ZoneSearch value={sourceZone} onChange={setSourceZone} zones={ZONES} placeholder="Source time zone…" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Date</label>
            <input
              type="date"
              value={dateStr}
              onChange={(e) => setDateStr(e.target.value)}
              className="input-field text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Time</label>
            <input
              type="time"
              value={timeStr}
              onChange={(e) => setTimeStr(e.target.value)}
              className="input-field text-sm"
            />
          </div>
        </div>
      </div>

      {/* Target zones */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            Converted Times
          </h3>
          <div className="flex items-center gap-2">
            <button onClick={copyAll} className="btn-secondary text-xs flex items-center gap-1.5">
              <Copy className="w-3.5 h-3.5" /> Copy all
            </button>
            <button onClick={addZone} className="btn-primary text-xs flex items-center gap-1.5">
              <Plus className="w-3.5 h-3.5" /> Add zone
            </button>
          </div>
        </div>

        {zones.length === 0 && (
          <div className="text-center py-8 text-sm text-gray-400 dark:text-gray-500">
            Add a time zone to see converted times.
          </div>
        )}

        <div className="grid gap-3">
          {zones.map((z) => {
            const display = formatDisplay(refDate, z.tz)
            const offset = formatOffset(z.tz, refDate)
            const day = dayLabel(refDate, z.tz, sourceZone)
            return (
              <div
                key={z.id}
                className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex-1 min-w-0">
                    <ZoneSearch value={z.tz} onChange={(tz) => updateZone(z.id, tz)} zones={ZONES} />
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0 mt-1.5">
                    <CopyBtn text={`${z.tz}: ${display}`} />
                    <button
                      onClick={() => removeZone(z.id)}
                      className="text-gray-400 hover:text-rose-500 dark:hover:text-rose-400 transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                {/* Live clock */}
                <div className="flex items-center gap-3 mb-2 rounded-lg bg-gray-50 dark:bg-gray-700/40 px-3 py-2">
                  <span className="text-xl font-bold tabular-nums text-gray-900 dark:text-gray-100 tracking-tight">
                    {formatLiveClock(tick, z.tz)}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {formatLiveDate(tick, z.tz)}
                  </span>
                  <span className="ml-auto text-xs font-mono text-gray-400 dark:text-gray-500">
                    {offset}
                  </span>
                </div>

                {/* Converted time */}
                <div className="flex items-baseline justify-between gap-3">
                  <p className="text-sm text-gray-600 dark:text-gray-300 tabular-nums">
                    <span className="text-xs text-gray-400 dark:text-gray-500 mr-1.5">Converted:</span>
                    {display}
                    {day && (
                      <span className="ml-2 text-xs font-normal text-amber-600 dark:text-amber-400">
                        ({day})
                      </span>
                    )}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

/** Calculate offset in ms for a timezone at a given instant */
function calcOffsetMs(tz, date) {
  const utcStr = date.toLocaleString('en-US', { timeZone: 'UTC' })
  const tzStr = date.toLocaleString('en-US', { timeZone: tz })
  return new Date(tzStr).getTime() - new Date(utcStr).getTime()
}
