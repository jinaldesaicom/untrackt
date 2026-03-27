import { useState, useEffect, useMemo, useCallback } from 'react'
import { getItem, setItem } from '../../utils/storage'

const STORAGE_KEY = 'untrackt_daily_planner'
const HOURS = Array.from({ length: 16 }, (_, i) => i + 6) // 6 AM to 9 PM
const VIEWS = [
  { id: 'daily', label: 'Daily' },
  { id: 'monthly', label: 'Monthly' },
  { id: 'quarterly', label: 'Quarterly' },
  { id: 'yearly', label: 'Yearly' },
  { id: 'events', label: 'Events' },
]
const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const MONTH_FULL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function getDateKey(date) { return date.toISOString().slice(0, 10) }
function getToday() { return new Date() }
function addDays(date, n) { const d = new Date(date); d.setDate(d.getDate() + n); return d }
function addMonths(date, n) { const d = new Date(date); d.setMonth(d.getMonth() + n); return d }
function formatHour(h) { const ampm = h >= 12 ? 'PM' : 'AM'; return `${h % 12 || 12} ${ampm}` }
function formatDate(d) { return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) }

function daysInMonth(year, month) { return new Date(year, month + 1, 0).getDate() }
function firstDayOfMonth(year, month) { return new Date(year, month, 1).getDay() }

function getQuarterMonths(date) {
  const q = Math.floor(date.getMonth() / 3)
  return [q * 3, q * 3 + 1, q * 3 + 2]
}

// ── Mini month grid for monthly/quarterly/yearly ────────────────────────────
function MiniMonth({ year, month, allPlans, todayKey, onDayClick, selectedKey, compact }) {
  const total = daysInMonth(year, month)
  const offset = firstDayOfMonth(year, month)
  const cells = Array.from({ length: offset }, () => null).concat(Array.from({ length: total }, (_, i) => i + 1))

  return (
    <div>
      {!compact && (
        <div className="grid grid-cols-7 mb-1">
          {DAY_LABELS.map(d => <div key={d} className="text-center text-[10px] font-medium text-gray-400 dark:text-gray-500">{d}</div>)}
        </div>
      )}
      <div className="grid grid-cols-7 gap-px">
        {cells.map((day, i) => {
          if (!day) return <div key={`e${i}`} />
          const key = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
          const hasEvent = allPlans[key] && Object.values(allPlans[key]).some(v => v && v.trim())
          const isToday = key === todayKey
          const isSelected = key === selectedKey
          return (
            <button
              key={key}
              onClick={() => onDayClick(new Date(year, month, day))}
              className={`relative flex items-center justify-center rounded-md transition-colors ${compact ? 'w-6 h-6 text-[10px]' : 'w-8 h-8 text-xs'}
                ${isSelected ? 'bg-indigo-600 text-white font-bold' : isToday ? 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 font-semibold' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
            >
              {day}
              {hasEvent && !isSelected && <span className={`absolute bottom-0.5 w-1 h-1 rounded-full ${isToday ? 'bg-indigo-500' : 'bg-indigo-400 dark:bg-indigo-500'}`} />}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ── Main Component ──────────────────────────────────────────────────────────
export default function DailyPlanner() {
  const [currentDate, setCurrentDate] = useState(getToday())
  const [view, setView] = useState('daily')
  const dateKey = getDateKey(currentDate)
  const todayKey = getDateKey(getToday())
  const [allPlans, setAllPlans] = useState(() => getItem(STORAGE_KEY, {}))

  useEffect(() => { setItem(STORAGE_KEY, allPlans) }, [allPlans])

  const dayPlan = allPlans[dateKey] || {}

  const updateSlot = (hour, text) => {
    setAllPlans(prev => ({
      ...prev,
      [dateKey]: { ...prev[dateKey], [hour]: text }
    }))
  }

  const weekDays = useMemo(() => {
    const start = new Date(currentDate)
    start.setDate(start.getDate() - start.getDay())
    return Array.from({ length: 7 }, (_, i) => addDays(start, i))
  }, [currentDate])

  const filledSlots = Object.values(dayPlan).filter(v => v && v.trim()).length
  const isToday = dateKey === todayKey

  const goToDay = useCallback((d) => { setCurrentDate(d); setView('daily') }, [])

  // Events: collect all days that have entries
  const allEvents = useMemo(() => {
    const entries = []
    for (const [key, slots] of Object.entries(allPlans)) {
      for (const [hour, text] of Object.entries(slots)) {
        if (text && text.trim()) entries.push({ date: key, hour: Number(hour), text: text.trim() })
      }
    }
    return entries.sort((a, b) => a.date === b.date ? a.hour - b.hour : a.date.localeCompare(b.date))
  }, [allPlans])

  // Group events by date for events view
  const eventsByDate = useMemo(() => {
    const map = {}
    for (const e of allEvents) {
      if (!map[e.date]) map[e.date] = []
      map[e.date].push(e)
    }
    return Object.entries(map).sort(([a], [b]) => a.localeCompare(b))
  }, [allEvents])

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  return (
    <div className="space-y-4">
      {/* View switcher */}
      <div className="flex gap-1 p-1 rounded-xl bg-gray-100 dark:bg-gray-800 overflow-x-auto">
        {VIEWS.map(v => (
          <button
            key={v.id}
            onClick={() => setView(v.id)}
            className={`flex-1 min-w-0 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${view === v.id ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
          >
            {v.label}
          </button>
        ))}
      </div>

      {/* ── DAILY VIEW ───────────────────────────────────────────────────── */}
      {view === 'daily' && (
        <>
          <div className="flex items-center gap-1 overflow-x-auto pb-1">
            {weekDays.map(day => {
              const key = getDateKey(day)
              const active = key === dateKey
              const today = key === todayKey
              return (
                <button key={key} onClick={() => setCurrentDate(day)}
                  className={`flex flex-col items-center px-3 py-2 rounded-lg text-xs transition-colors ${active ? 'bg-indigo-600 text-white' : today ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800' : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:border-indigo-300'}`}>
                  <span className="font-medium">{day.toLocaleDateString('en-US', { weekday: 'short' })}</span>
                  <span className="text-lg font-bold">{day.getDate()}</span>
                </button>
              )
            })}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button onClick={() => setCurrentDate(addDays(currentDate, -7))} className="btn-secondary text-xs">← Week</button>
              <button onClick={() => setCurrentDate(getToday())} className="btn-secondary text-xs">Today</button>
              <button onClick={() => setCurrentDate(addDays(currentDate, 7))} className="btn-secondary text-xs">Week →</button>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {filledSlots} of {HOURS.length} slots planned
            </div>
          </div>

          <h2 className="text-sm font-semibold text-gray-900 dark:text-white">{formatDate(currentDate)} {isToday && <span className="text-indigo-500 text-xs font-normal ml-1">(Today)</span>}</h2>

          <div className="space-y-px rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            {HOURS.map(hour => {
              const now = new Date()
              const isCurrent = isToday && now.getHours() === hour
              return (
                <div key={hour} className={`flex items-stretch ${isCurrent ? 'bg-indigo-50 dark:bg-indigo-900/20' : 'bg-white dark:bg-gray-900'}`}>
                  <div className="w-16 flex-shrink-0 px-2 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 border-r border-gray-100 dark:border-gray-800 flex items-center">
                    {formatHour(hour)}
                    {isCurrent && <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 ml-1 animate-pulse" />}
                  </div>
                  <input type="text" value={dayPlan[hour] || ''} onChange={e => updateSlot(hour, e.target.value)} placeholder="—"
                    className="flex-1 px-3 py-2 text-sm bg-transparent text-gray-800 dark:text-gray-200 outline-none placeholder-gray-300 dark:placeholder-gray-700 border-b border-gray-50 dark:border-gray-800 focus:bg-indigo-50/50 dark:focus:bg-indigo-900/10" />
                </div>
              )
            })}
          </div>
        </>
      )}

      {/* ── MONTHLY VIEW ─────────────────────────────────────────────────── */}
      {view === 'monthly' && (
        <>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button onClick={() => setCurrentDate(addMonths(currentDate, -1))} className="btn-secondary text-xs">← Month</button>
              <button onClick={() => setCurrentDate(getToday())} className="btn-secondary text-xs">Today</button>
              <button onClick={() => setCurrentDate(addMonths(currentDate, 1))} className="btn-secondary text-xs">Month →</button>
            </div>
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white">{MONTH_FULL[month]} {year}</h2>
          </div>

          <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
            <div className="grid grid-cols-7 mb-2">
              {DAY_LABELS.map(d => <div key={d} className="text-center text-xs font-semibold text-gray-500 dark:text-gray-400 py-1">{d}</div>)}
            </div>
            {(() => {
              const total = daysInMonth(year, month)
              const offset = firstDayOfMonth(year, month)
              const cells = Array.from({ length: offset }, () => null).concat(Array.from({ length: total }, (_, i) => i + 1))
              // pad to full weeks
              while (cells.length % 7) cells.push(null)

              return (
                <div className="grid grid-cols-7 gap-1">
                  {cells.map((day, i) => {
                    if (!day) return <div key={`e${i}`} className="h-10" />
                    const key = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
                    const hasEvent = allPlans[key] && Object.values(allPlans[key]).some(v => v && v.trim())
                    const eventCount = hasEvent ? Object.values(allPlans[key]).filter(v => v && v.trim()).length : 0
                    const today = key === todayKey
                    const selected = key === dateKey
                    return (
                      <button
                        key={key}
                        onClick={() => goToDay(new Date(year, month, day))}
                        className={`relative h-10 flex flex-col items-center justify-center rounded-lg text-sm transition-colors
                          ${selected ? 'bg-indigo-600 text-white font-bold' : today ? 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 font-semibold border border-indigo-200 dark:border-indigo-700' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                      >
                        {day}
                        {hasEvent && (
                          <span className={`absolute bottom-0.5 text-[8px] leading-none font-bold ${selected ? 'text-indigo-200' : 'text-indigo-500'}`}>{eventCount}</span>
                        )}
                      </button>
                    )
                  })}
                </div>
              )
            })()}
          </div>
        </>
      )}

      {/* ── QUARTERLY VIEW ───────────────────────────────────────────────── */}
      {view === 'quarterly' && (
        <>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button onClick={() => setCurrentDate(addMonths(currentDate, -3))} className="btn-secondary text-xs">← Qtr</button>
              <button onClick={() => setCurrentDate(getToday())} className="btn-secondary text-xs">Today</button>
              <button onClick={() => setCurrentDate(addMonths(currentDate, 3))} className="btn-secondary text-xs">Qtr →</button>
            </div>
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white">Q{Math.floor(month / 3) + 1} {year}</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {getQuarterMonths(currentDate).map(m => (
              <div key={m} className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-3">
                <h3 className="text-xs font-semibold text-gray-700 dark:text-gray-200 mb-2 text-center">{MONTH_FULL[m]} {year}</h3>
                <MiniMonth year={year} month={m} allPlans={allPlans} todayKey={todayKey} onDayClick={goToDay} selectedKey={dateKey} compact={false} />
              </div>
            ))}
          </div>
        </>
      )}

      {/* ── YEARLY VIEW ──────────────────────────────────────────────────── */}
      {view === 'yearly' && (
        <>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button onClick={() => setCurrentDate(new Date(year - 1, month, 1))} className="btn-secondary text-xs">← Year</button>
              <button onClick={() => setCurrentDate(getToday())} className="btn-secondary text-xs">Today</button>
              <button onClick={() => setCurrentDate(new Date(year + 1, month, 1))} className="btn-secondary text-xs">Year →</button>
            </div>
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white">{year}</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {Array.from({ length: 12 }, (_, m) => (
              <div key={m} className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-2.5">
                <h3 className="text-[11px] font-semibold text-gray-600 dark:text-gray-300 mb-1.5 text-center">{MONTH_NAMES[m]}</h3>
                <MiniMonth year={year} month={m} allPlans={allPlans} todayKey={todayKey} onDayClick={goToDay} selectedKey={dateKey} compact />
              </div>
            ))}
          </div>
        </>
      )}

      {/* ── EVENTS VIEW ──────────────────────────────────────────────────── */}
      {view === 'events' && (
        <>
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white">All Planned Events</h2>
            <span className="text-xs text-gray-400">{allEvents.length} event{allEvents.length !== 1 ? 's' : ''} across {eventsByDate.length} day{eventsByDate.length !== 1 ? 's' : ''}</span>
          </div>

          {eventsByDate.length === 0 ? (
            <div className="rounded-xl border border-dashed border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/30 p-8 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">No events yet. Switch to the <button onClick={() => setView('daily')} className="text-indigo-500 hover:underline">Daily</button> view to add entries.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {eventsByDate.map(([date, events]) => {
                const d = new Date(date + 'T00:00:00')
                const today = date === todayKey
                const past = date < todayKey
                return (
                  <div key={date} className={`rounded-xl border bg-white dark:bg-gray-900 overflow-hidden ${today ? 'border-indigo-300 dark:border-indigo-700' : 'border-gray-200 dark:border-gray-700'}`}>
                    <button
                      onClick={() => goToDay(d)}
                      className={`w-full flex items-center justify-between px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors ${today ? 'bg-indigo-50 dark:bg-indigo-900/20' : ''}`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-semibold ${past ? 'text-gray-400 dark:text-gray-500' : 'text-gray-900 dark:text-white'}`}>
                          {d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                        {today && <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 font-medium">Today</span>}
                      </div>
                      <span className="text-xs text-gray-400">{events.length} item{events.length !== 1 ? 's' : ''} →</span>
                    </button>
                    <div className="border-t border-gray-100 dark:border-gray-800">
                      {events.map((ev, i) => (
                        <div key={i} className="flex items-center px-4 py-1.5 text-sm border-b border-gray-50 dark:border-gray-800 last:border-0">
                          <span className="w-14 shrink-0 text-xs font-medium text-gray-400 dark:text-gray-500">{formatHour(ev.hour)}</span>
                          <span className={`flex-1 ${past ? 'text-gray-400 dark:text-gray-500' : 'text-gray-700 dark:text-gray-300'}`}>{ev.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </>
      )}
    </div>
  )
}
