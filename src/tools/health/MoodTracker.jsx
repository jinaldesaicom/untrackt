import { useState, useEffect, useMemo } from 'react'
import { getItem, setItem } from '../../utils/storage'
import { ChevronLeft, ChevronRight, CalendarDays, BarChart3, Trash2, Info, Pencil } from 'lucide-react'

const STORAGE_KEY = 'untrackt_mood_tracker'

const MOODS = [
  { value: 5, emoji: '😄', label: 'Great', color: 'bg-green-500', ring: 'ring-green-300 dark:ring-green-700', bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-400', bar: 'bg-green-400' },
  { value: 4, emoji: '🙂', label: 'Good', color: 'bg-emerald-400', ring: 'ring-emerald-300 dark:ring-emerald-700', bg: 'bg-emerald-100 dark:bg-emerald-900/30', text: 'text-emerald-700 dark:text-emerald-400', bar: 'bg-emerald-400' },
  { value: 3, emoji: '😐', label: 'Okay', color: 'bg-amber-400', ring: 'ring-amber-300 dark:ring-amber-700', bg: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-700 dark:text-amber-400', bar: 'bg-amber-400' },
  { value: 2, emoji: '😔', label: 'Low', color: 'bg-orange-400', ring: 'ring-orange-300 dark:ring-orange-700', bg: 'bg-orange-100 dark:bg-orange-900/30', text: 'text-orange-700 dark:text-orange-400', bar: 'bg-orange-400' },
  { value: 1, emoji: '😢', label: 'Bad', color: 'bg-red-400', ring: 'ring-red-300 dark:ring-red-700', bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-400', bar: 'bg-red-400' },
]

const ACTIVITIES = [
  { id: 'exercise', emoji: '🏃', label: 'Exercise' },
  { id: 'work', emoji: '💼', label: 'Work' },
  { id: 'social', emoji: '👥', label: 'Social' },
  { id: 'nature', emoji: '🌿', label: 'Nature' },
  { id: 'creative', emoji: '🎨', label: 'Creative' },
  { id: 'reading', emoji: '📚', label: 'Reading' },
  { id: 'music', emoji: '🎵', label: 'Music' },
  { id: 'cooking', emoji: '🍳', label: 'Cooking' },
  { id: 'meditation', emoji: '🧘', label: 'Meditation' },
  { id: 'gaming', emoji: '🎮', label: 'Gaming' },
  { id: 'travel', emoji: '✈️', label: 'Travel' },
  { id: 'shopping', emoji: '🛍️', label: 'Shopping' },
  { id: 'family', emoji: '👨‍👩‍👧', label: 'Family' },
  { id: 'sleep', emoji: '😴', label: 'Good Sleep' },
  { id: 'bad-sleep', emoji: '🥱', label: 'Bad Sleep' },
  { id: 'stress', emoji: '😰', label: 'Stress' },
]

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function getDateKey(date) { return date.toISOString().slice(0, 10) }
function getToday() { return new Date() }
function daysInMonth(y, m) { return new Date(y, m + 1, 0).getDate() }
function firstDayOfMonth(y, m) { return new Date(y, m, 1).getDay() }
function getMood(val) { return MOODS.find(m => m.value === val) }

export default function MoodTracker() {
  const [entries, setEntries] = useState(() => getItem(STORAGE_KEY, {}))
  const [selectedDate, setSelectedDate] = useState(getToday())
  const [view, setView] = useState('log')    // log | calendar | insights
  const [editNote, setEditNote] = useState(false)
  const [noteText, setNoteText] = useState('')

  const dateKey = getDateKey(selectedDate)
  const todayKey = getDateKey(getToday())
  const entry = entries[dateKey]
  const year = selectedDate.getFullYear()
  const month = selectedDate.getMonth()

  useEffect(() => { setItem(STORAGE_KEY, entries) }, [entries])

  // Sync note text when date/entry changes
  useEffect(() => { setNoteText(entry?.note || ''); setEditNote(false) }, [dateKey])

  const save = (patch) => {
    setEntries(prev => ({
      ...prev,
      [dateKey]: { ...prev[dateKey], ...patch }
    }))
  }

  const selectMood = (value) => save({ mood: value })

  const toggleActivity = (id) => {
    const current = entry?.activities || []
    const next = current.includes(id) ? current.filter(a => a !== id) : [...current, id]
    save({ activities: next })
  }

  const saveNote = () => {
    save({ note: noteText.trim() })
    setEditNote(false)
  }

  const deleteEntry = () => {
    setEntries(prev => {
      const next = { ...prev }
      delete next[dateKey]
      return next
    })
  }

  const navigateMonth = (delta) => {
    const d = new Date(selectedDate)
    d.setMonth(d.getMonth() + delta)
    setSelectedDate(d)
  }

  // Insights calculations
  const insightData = useMemo(() => {
    const allEntries = Object.entries(entries).filter(([, e]) => e.mood)
    if (allEntries.length === 0) return null

    const total = allEntries.length
    const avgMood = allEntries.reduce((sum, [, e]) => sum + e.mood, 0) / total

    // Distribution
    const dist = [0, 0, 0, 0, 0]
    allEntries.forEach(([, e]) => { dist[e.mood - 1]++ })

    // Recent 7 days
    const last7 = []
    for (let i = 6; i >= 0; i--) {
      const d = new Date(getToday())
      d.setDate(d.getDate() - i)
      const key = getDateKey(d)
      last7.push({ date: d, mood: entries[key]?.mood || null, day: d.toLocaleDateString('en-US', { weekday: 'short' }) })
    }

    // Current streak
    let streak = 0
    const d = new Date(getToday())
    while (entries[getDateKey(d)]?.mood) { streak++; d.setDate(d.getDate() - 1) }

    // Most common activities
    const actCount = {}
    allEntries.forEach(([, e]) => {
      (e.activities || []).forEach(a => { actCount[a] = (actCount[a] || 0) + 1 })
    })
    const topActivities = Object.entries(actCount).sort((a, b) => b[1] - a[1]).slice(0, 5)

    // Monthly trend (current month)
    const monthEntries = allEntries.filter(([k]) => k.startsWith(`${year}-${String(month + 1).padStart(2, '0')}`))
    const monthAvg = monthEntries.length ? (monthEntries.reduce((s, [, e]) => s + e.mood, 0) / monthEntries.length) : null

    return { total, avgMood, dist, last7, streak, topActivities, monthAvg, monthEntries: monthEntries.length }
  }, [entries, year, month])

  const VIEWS = [
    { id: 'log', label: 'Log Mood' },
    { id: 'calendar', label: 'Calendar' },
    { id: 'insights', label: 'Insights' },
  ]

  return (
    <div className="space-y-5">
      {/* View switcher */}
      <div className="flex gap-1 p-1 rounded-xl bg-gray-100 dark:bg-gray-800">
        {VIEWS.map(v => (
          <button
            key={v.id}
            onClick={() => setView(v.id)}
            className={`flex-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${view === v.id ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
          >
            {v.label}
          </button>
        ))}
      </div>

      {/* ── LOG MOOD VIEW ────────────────────────────────────────────────── */}
      {view === 'log' && (
        <>
          {/* Date selector */}
          <div className="flex items-center justify-between">
            <button onClick={() => { const d = new Date(selectedDate); d.setDate(d.getDate() - 1); setSelectedDate(d) }} className="btn-secondary p-2">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="text-center">
              <button onClick={() => setSelectedDate(getToday())} className="text-sm font-semibold text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </button>
              {dateKey === todayKey && <span className="block text-xs text-indigo-500">Today</span>}
            </div>
            <button onClick={() => { const d = new Date(selectedDate); d.setDate(d.getDate() + 1); setSelectedDate(d) }} disabled={dateKey === todayKey} className="btn-secondary p-2 disabled:opacity-30">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mood selection */}
          <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-5">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-4 text-center">How are you feeling?</p>
            <div className="flex justify-center gap-3 sm:gap-5">
              {MOODS.map(m => {
                const selected = entry?.mood === m.value
                return (
                  <button
                    key={m.value}
                    onClick={() => selectMood(m.value)}
                    className={`flex flex-col items-center gap-1.5 p-2.5 rounded-2xl transition-all ${selected ? `${m.bg} ring-2 ${m.ring} scale-110` : 'hover:bg-gray-50 dark:hover:bg-gray-800 hover:scale-105'}`}
                  >
                    <span className="text-3xl sm:text-4xl">{m.emoji}</span>
                    <span className={`text-xs font-medium ${selected ? m.text : 'text-gray-500 dark:text-gray-400'}`}>{m.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Activities */}
          {entry?.mood && (
            <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-3">What have you been up to?</p>
              <div className="flex flex-wrap gap-2">
                {ACTIVITIES.map(a => {
                  const active = (entry?.activities || []).includes(a.id)
                  return (
                    <button
                      key={a.id}
                      onClick={() => toggleActivity(a.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-colors border ${active ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-700' : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-700'}`}
                    >
                      <span className="text-sm">{a.emoji}</span>
                      {a.label}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Note */}
          {entry?.mood && (
            <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-200">Journal note</p>
                {entry?.note && !editNote && (
                  <button onClick={() => setEditNote(true)} className="text-xs text-gray-400 hover:text-indigo-500 flex items-center gap-1"><Pencil className="w-3 h-3" /> Edit</button>
                )}
              </div>
              {editNote || !entry?.note ? (
                <div className="space-y-2">
                  <textarea
                    value={noteText}
                    onChange={e => setNoteText(e.target.value)}
                    placeholder="How was your day? What's on your mind..."
                    rows={3}
                    maxLength={500}
                    className="textarea-field w-full text-sm resize-none"
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">{noteText.length}/500</span>
                    <div className="flex gap-2">
                      {editNote && <button onClick={() => { setNoteText(entry?.note || ''); setEditNote(false) }} className="btn-secondary text-xs">Cancel</button>}
                      <button onClick={saveNote} disabled={!noteText.trim()} className="btn-primary text-xs disabled:opacity-50">Save note</button>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-wrap">{entry.note}</p>
              )}
            </div>
          )}

          {/* Entry summary / delete */}
          {entry?.mood && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <span className="text-lg">{getMood(entry.mood)?.emoji}</span>
                <span>{getMood(entry.mood)?.label}</span>
                {(entry.activities || []).length > 0 && <span>· {entry.activities.length} activit{entry.activities.length === 1 ? 'y' : 'ies'}</span>}
                {entry.note && <span>· has note</span>}
              </div>
              <button onClick={deleteEntry} className="text-xs text-gray-400 hover:text-red-500 flex items-center gap-1"><Trash2 className="w-3 h-3" /> Delete entry</button>
            </div>
          )}

          {/* Empty state for day without entry */}
          {!entry?.mood && dateKey !== todayKey && (
            <div className="rounded-xl border border-dashed border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/30 p-6 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">No mood logged for this day.</p>
            </div>
          )}
        </>
      )}

      {/* ── CALENDAR VIEW ────────────────────────────────────────────────── */}
      {view === 'calendar' && (
        <>
          <div className="flex items-center justify-between">
            <button onClick={() => navigateMonth(-1)} className="btn-secondary p-2"><ChevronLeft className="w-4 h-4" /></button>
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white">{MONTH_NAMES[month]} {year}</h2>
            <button onClick={() => navigateMonth(1)} className="btn-secondary p-2"><ChevronRight className="w-4 h-4" /></button>
          </div>

          <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
            <div className="grid grid-cols-7 mb-2">
              {DAY_LABELS.map(d => <div key={d} className="text-center text-xs font-semibold text-gray-500 dark:text-gray-400 py-1">{d}</div>)}
            </div>
            {(() => {
              const total = daysInMonth(year, month)
              const offset = firstDayOfMonth(year, month)
              const cells = Array.from({ length: offset }, () => null).concat(Array.from({ length: total }, (_, i) => i + 1))
              while (cells.length % 7) cells.push(null)

              return (
                <div className="grid grid-cols-7 gap-1">
                  {cells.map((day, i) => {
                    if (!day) return <div key={`e${i}`} className="h-12" />
                    const key = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
                    const e = entries[key]
                    const mood = e?.mood ? getMood(e.mood) : null
                    const isToday = key === todayKey
                    const isSelected = key === dateKey
                    return (
                      <button
                        key={key}
                        onClick={() => { setSelectedDate(new Date(year, month, day)); setView('log') }}
                        className={`relative h-12 flex flex-col items-center justify-center rounded-lg transition-all
                          ${isSelected ? 'ring-2 ring-indigo-400 dark:ring-indigo-600' : ''}
                          ${isToday && !mood ? 'border border-indigo-200 dark:border-indigo-700' : ''}
                          ${mood ? `${mood.bg} hover:opacity-80` : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                      >
                        <span className={`text-xs ${mood ? mood.text + ' font-semibold' : isToday ? 'text-indigo-600 dark:text-indigo-400 font-semibold' : 'text-gray-600 dark:text-gray-400'}`}>{day}</span>
                        {mood && <span className="text-sm leading-none mt-0.5">{mood.emoji}</span>}
                      </button>
                    )
                  })}
                </div>
              )
            })()}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap justify-center gap-3">
            {MOODS.map(m => (
              <span key={m.value} className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                <span className={`w-3 h-3 rounded-full ${m.color}`} /> {m.label}
              </span>
            ))}
          </div>
        </>
      )}

      {/* ── INSIGHTS VIEW ────────────────────────────────────────────────── */}
      {view === 'insights' && (
        <>
          {!insightData ? (
            <div className="rounded-xl border border-dashed border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/30 p-8 text-center">
              <p className="text-3xl mb-2">📊</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Start logging your mood to see insights. The more you log, the more patterns you&apos;ll discover.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Stats row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-3 text-center">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{insightData.total}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Total entries</p>
                </div>
                <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-3 text-center">
                  <p className="text-2xl">{getMood(Math.round(insightData.avgMood))?.emoji}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Average mood ({insightData.avgMood.toFixed(1)})</p>
                </div>
                <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-3 text-center">
                  <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{insightData.streak}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Day streak 🔥</p>
                </div>
                <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-3 text-center">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{insightData.monthEntries}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">This month</p>
                </div>
              </div>

              {/* Last 7 days trend */}
              <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">Last 7 Days</h3>
                <div className="flex items-end justify-between gap-1 h-28">
                  {insightData.last7.map((d, i) => {
                    const mood = d.mood ? getMood(d.mood) : null
                    const height = d.mood ? `${(d.mood / 5) * 100}%` : '0%'
                    return (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <div className="w-full flex-1 flex items-end justify-center">
                          {mood ? (
                            <div className={`w-full max-w-8 rounded-t-lg ${mood.bar} transition-all duration-300`} style={{ height }} />
                          ) : (
                            <div className="w-full max-w-8 h-1 rounded bg-gray-200 dark:bg-gray-700" />
                          )}
                        </div>
                        {mood && <span className="text-sm">{mood.emoji}</span>}
                        <span className="text-[10px] text-gray-400">{d.day}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Mood distribution */}
              <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">Mood Distribution</h3>
                <div className="space-y-2">
                  {MOODS.map((m, i) => {
                    const count = insightData.dist[m.value - 1]
                    const pct = insightData.total > 0 ? (count / insightData.total) * 100 : 0
                    return (
                      <div key={m.value} className="flex items-center gap-3">
                        <span className="text-lg w-7 text-center">{m.emoji}</span>
                        <span className="text-xs w-10 text-gray-500 dark:text-gray-400">{m.label}</span>
                        <div className="flex-1 h-5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                          <div className={`h-full ${m.bar} rounded-full transition-all duration-500`} style={{ width: `${pct}%` }} />
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400 w-12 text-right">{count} ({pct.toFixed(0)}%)</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Top activities */}
              {insightData.topActivities.length > 0 && (
                <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">Top Activities</h3>
                  <div className="flex flex-wrap gap-2">
                    {insightData.topActivities.map(([id, count]) => {
                      const act = ACTIVITIES.find(a => a.id === id)
                      if (!act) return null
                      return (
                        <span key={id} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                          <span>{act.emoji}</span> {act.label} <span className="text-xs text-indigo-400">×{count}</span>
                        </span>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Monthly average */}
              {insightData.monthAvg !== null && (
                <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-200">{MONTH_NAMES[month]} Average</p>
                    <p className="text-xs text-gray-400">{insightData.monthEntries} entries this month</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{getMood(Math.round(insightData.monthAvg))?.emoji}</span>
                    <span className="text-lg font-bold text-gray-900 dark:text-white">{insightData.monthAvg.toFixed(1)}/5</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}

      {/* Privacy note */}
      <div className="flex items-start gap-2 text-xs text-gray-400 dark:text-gray-500">
        <Info className="w-3.5 h-3.5 mt-0.5 shrink-0" />
        <p>All mood data is stored locally in your browser. Nothing is sent to any server.</p>
      </div>
    </div>
  )
}
