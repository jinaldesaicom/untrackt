import { useState, useEffect, useMemo, useRef } from 'react'
import { getItem, setItem } from '../../utils/storage'
import { Plus, Trash2, ChevronLeft, ChevronRight, Printer, Download, X, Pencil } from 'lucide-react'

const STORAGE_KEY = 'untrackt_symptom_journal'

const SEVERITY_LEVELS = [
  { value: 1, label: 'Mild', color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400', dot: 'bg-green-500' },
  { value: 2, label: 'Moderate', color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400', dot: 'bg-amber-500' },
  { value: 3, label: 'Severe', color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400', dot: 'bg-orange-500' },
  { value: 4, label: 'Very Severe', color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400', dot: 'bg-red-500' },
]

const COMMON_SYMPTOMS = [
  'Headache', 'Fatigue', 'Nausea', 'Dizziness', 'Back Pain', 'Joint Pain',
  'Chest Pain', 'Shortness of Breath', 'Cough', 'Sore Throat', 'Fever',
  'Chills', 'Muscle Aches', 'Stomach Pain', 'Bloating', 'Heartburn',
  'Insomnia', 'Anxiety', 'Brain Fog', 'Rash', 'Itching', 'Swelling',
  'Numbness', 'Tingling', 'Palpitations', 'Loss of Appetite',
]

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function dateKey(d) { return d.toISOString().slice(0, 10) }
function today() { return dateKey(new Date()) }
function formatDate(key) {
  const d = new Date(key + 'T12:00:00')
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })
}
function formatDateShort(key) {
  const d = new Date(key + 'T12:00:00')
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}
function daysInMonth(y, m) { return new Date(y, m + 1, 0).getDate() }
function firstDayOfMonth(y, m) { return new Date(y, m, 1).getDay() }
function getSeverity(val) { return SEVERITY_LEVELS.find((s) => s.value === val) }

export default function SymptomJournal() {
  const [entries, setEntries] = useState(() => getItem(STORAGE_KEY, {}))
  const [view, setView] = useState('log') // log | history | calendar
  const [selectedDate, setSelectedDate] = useState(today())

  // Form state
  const [symptom, setSymptom] = useState('')
  const [severity, setSeverity] = useState(2)
  const [timeOfDay, setTimeOfDay] = useState('morning')
  const [notes, setNotes] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)

  // Calendar state
  const [calMonth, setCalMonth] = useState(new Date().getMonth())
  const [calYear, setCalYear] = useState(new Date().getFullYear())

  // Export date range
  const [exportFrom, setExportFrom] = useState('')
  const [exportTo, setExportTo] = useState('')
  const [showExport, setShowExport] = useState(false)

  const printRef = useRef(null)

  useEffect(() => { setItem(STORAGE_KEY, entries) }, [entries])

  const currentEntry = entries[selectedDate] || []

  const filteredSuggestions = useMemo(() => {
    if (!symptom.trim()) return COMMON_SYMPTOMS
    const q = symptom.toLowerCase()
    return COMMON_SYMPTOMS.filter((s) => s.toLowerCase().includes(q))
  }, [symptom])

  const addSymptom = () => {
    const name = symptom.trim()
    if (!name) return
    const item = { id: Date.now(), symptom: name, severity, timeOfDay, notes: notes.trim(), timestamp: new Date().toISOString() }
    setEntries((prev) => ({
      ...prev,
      [selectedDate]: [...(prev[selectedDate] || []), item],
    }))
    setSymptom('')
    setSeverity(2)
    setNotes('')
  }

  const removeSymptom = (date, id) => {
    setEntries((prev) => {
      const updated = { ...prev }
      updated[date] = (updated[date] || []).filter((s) => s.id !== id)
      if (updated[date].length === 0) delete updated[date]
      return updated
    })
  }

  const clearDay = (date) => {
    setEntries((prev) => {
      const updated = { ...prev }
      delete updated[date]
      return updated
    })
  }

  // Sorted date keys descending
  const sortedDates = useMemo(() => Object.keys(entries).sort((a, b) => b.localeCompare(a)), [entries])
  const totalEntries = useMemo(() => Object.values(entries).reduce((sum, arr) => sum + arr.length, 0), [entries])

  // Most frequent symptoms
  const topSymptoms = useMemo(() => {
    const counts = {}
    Object.values(entries).forEach((arr) => arr.forEach((s) => {
      const key = s.symptom.toLowerCase()
      counts[key] = (counts[key] || { name: s.symptom, count: 0 })
      counts[key].count++
    }))
    return Object.values(counts).sort((a, b) => b.count - a.count).slice(0, 8)
  }, [entries])

  // Export to PDF via hidden iframe print
  const handleExport = () => {
    const from = exportFrom || sortedDates[sortedDates.length - 1] || today()
    const to = exportTo || today()
    const filtered = sortedDates.filter((d) => d >= from && d <= to)
    if (filtered.length === 0) return

    const html = buildPrintHtml(filtered, entries)
    const blob = new Blob([html], { type: 'text/html' })
    const url = URL.createObjectURL(blob)

    // Use a hidden iframe to avoid popup blockers
    let iframe = document.getElementById('symptom-journal-print-frame')
    if (iframe) iframe.remove()
    iframe = document.createElement('iframe')
    iframe.id = 'symptom-journal-print-frame'
    iframe.style.cssText = 'position:fixed;top:-10000px;left:-10000px;width:800px;height:600px'
    document.body.appendChild(iframe)
    iframe.src = url

    iframe.onload = () => {
      try {
        iframe.contentWindow.print()
      } catch {
        // Fallback: open in new tab
        window.open(url, '_blank')
      }
      setTimeout(() => { iframe.remove(); URL.revokeObjectURL(url) }, 5000)
    }
  }

  const prevMonth = () => {
    if (calMonth === 0) { setCalMonth(11); setCalYear((y) => y - 1) }
    else setCalMonth((m) => m - 1)
  }
  const nextMonth = () => {
    if (calMonth === 11) { setCalMonth(0); setCalYear((y) => y + 1) }
    else setCalMonth((m) => m + 1)
  }

  const calDays = daysInMonth(calYear, calMonth)
  const calStart = firstDayOfMonth(calYear, calMonth)

  return (
    <div className="space-y-5">
      {/* Privacy notice */}
      <div className="rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 px-4 py-3 text-sm text-blue-700 dark:text-blue-300">
        All data is stored locally in your browser. Nothing is sent to any server. Export as PDF for doctor visits.
      </div>

      {/* Tabs */}
      <div className="flex gap-1 rounded-xl bg-gray-100 dark:bg-gray-800 p-1">
        {[
          { key: 'log', label: 'Log Symptoms' },
          { key: 'history', label: 'History' },
          { key: 'calendar', label: 'Calendar' },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setView(t.key)}
            className={`flex-1 text-sm font-medium rounded-lg py-2 transition-colors ${
              view === t.key
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Stats bar */}
      {totalEntries > 0 && (
        <div className="flex flex-wrap items-center gap-3">
          <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2 text-sm">
            <span className="text-gray-500 dark:text-gray-400">Days logged: </span>
            <span className="font-semibold text-gray-900 dark:text-gray-100">{sortedDates.length}</span>
          </div>
          <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2 text-sm">
            <span className="text-gray-500 dark:text-gray-400">Total entries: </span>
            <span className="font-semibold text-gray-900 dark:text-gray-100">{totalEntries}</span>
          </div>
          {topSymptoms.length > 0 && (
            <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2 text-sm">
              <span className="text-gray-500 dark:text-gray-400">Most frequent: </span>
              <span className="font-semibold text-gray-900 dark:text-gray-100">{topSymptoms[0].name} ({topSymptoms[0].count}×)</span>
            </div>
          )}
          <button onClick={() => setShowExport(!showExport)} className="ml-auto btn-secondary text-xs flex items-center gap-1.5">
            <Printer className="w-3.5 h-3.5" /> Export PDF
          </button>
        </div>
      )}

      {/* Export panel (visible from any tab) */}
      {showExport && totalEntries > 0 && (
        <div className="rounded-xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950/30 p-4 space-y-3">
          <p className="text-sm font-medium text-indigo-700 dark:text-indigo-300">Select date range for PDF export</p>
          <p className="text-xs text-indigo-600/70 dark:text-indigo-400/70">Your browser's print dialog will open. Choose "Save as PDF" to download.</p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-indigo-600 dark:text-indigo-400 mb-1">From</label>
              <input type="date" value={exportFrom} onChange={(e) => setExportFrom(e.target.value)} className="input-field text-sm" />
            </div>
            <div>
              <label className="block text-xs text-indigo-600 dark:text-indigo-400 mb-1">To</label>
              <input type="date" value={exportTo} onChange={(e) => setExportTo(e.target.value)} className="input-field text-sm" />
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={handleExport} className="btn-primary text-xs flex items-center gap-1.5">
              <Download className="w-3.5 h-3.5" /> Generate & Print
            </button>
            <button onClick={() => setShowExport(false)} className="btn-secondary text-xs">Cancel</button>
          </div>
        </div>
      )}

      {/* LOG VIEW */}
      {view === 'log' && (
        <div className="space-y-4">
          {/* Date picker */}
          <div>
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              max={today()}
              className="input-field text-sm w-auto"
            />
          </div>

          {/* Symptom input */}
          <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 space-y-3">
            <div className="relative">
              <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Symptom</label>
              <input
                type="text"
                value={symptom}
                onChange={(e) => setSymptom(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                onKeyDown={(e) => { if (e.key === 'Enter') addSymptom() }}
                placeholder="e.g. Headache, Fatigue…"
                className="input-field text-sm"
              />
              {showSuggestions && filteredSuggestions.length > 0 && (
                <div className="absolute z-20 mt-1 w-full max-h-44 overflow-y-auto rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg">
                  {filteredSuggestions.map((s) => (
                    <button
                      key={s}
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => { setSymptom(s); setShowSuggestions(false) }}
                      className="w-full text-left px-3 py-2 text-sm hover:bg-indigo-50 dark:hover:bg-indigo-900/30 text-gray-700 dark:text-gray-200"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Severity */}
            <div>
              <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Severity</label>
              <div className="flex gap-2">
                {SEVERITY_LEVELS.map((s) => (
                  <button
                    key={s.value}
                    onClick={() => setSeverity(s.value)}
                    className={`flex-1 text-xs font-medium py-2 rounded-lg border transition-all ${
                      severity === s.value
                        ? `${s.color} border-current ring-1 ring-current/20`
                        : 'bg-gray-50 dark:bg-gray-700 text-gray-400 dark:text-gray-500 border-gray-200 dark:border-gray-600'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Time of day */}
            <div>
              <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Time of day</label>
              <div className="flex gap-2">
                {['morning', 'afternoon', 'evening', 'night'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTimeOfDay(t)}
                    className={`flex-1 text-xs font-medium py-2 rounded-lg border transition-all capitalize ${
                      timeOfDay === t
                        ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border-indigo-300 dark:border-indigo-700'
                        : 'bg-gray-50 dark:bg-gray-700 text-gray-400 dark:text-gray-500 border-gray-200 dark:border-gray-600'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Notes (optional)</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Triggers, context, what helped…"
                className="textarea-field text-sm min-h-[60px]"
                rows={2}
              />
            </div>

            <button
              onClick={addSymptom}
              disabled={!symptom.trim()}
              className="btn-primary w-full flex items-center justify-center gap-2 text-sm"
            >
              <Plus className="w-4 h-4" /> Log Symptom
            </button>
          </div>

          {/* Today's logged symptoms */}
          {currentEntry.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                {selectedDate === today() ? "Today's" : formatDate(selectedDate)} — {currentEntry.length} symptom{currentEntry.length !== 1 ? 's' : ''}
              </h3>
              {currentEntry.map((s) => (
                <SymptomCard key={s.id} item={s} onRemove={() => removeSymptom(selectedDate, s.id)} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* HISTORY VIEW */}
      {view === 'history' && (
        <div className="space-y-4">
          {sortedDates.length === 0 ? (
            <div className="text-center py-10 text-sm text-gray-400 dark:text-gray-500">
              No entries yet. Start logging symptoms to see your history.
            </div>
          ) : (
            sortedDates.map((date) => (
              <div key={date} className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2.5 bg-gray-50 dark:bg-gray-800/80 border-b border-gray-100 dark:border-gray-700">
                  <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">{formatDate(date)}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400 dark:text-gray-500">{entries[date].length} symptom{entries[date].length !== 1 ? 's' : ''}</span>
                    <button onClick={() => clearDay(date)} className="text-gray-400 hover:text-rose-500 dark:hover:text-rose-400 transition-colors" title="Delete day">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <div className="p-3 space-y-2">
                  {entries[date].map((s) => (
                    <SymptomCard key={s.id} item={s} onRemove={() => removeSymptom(date, s.id)} compact />
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* CALENDAR VIEW */}
      {view === 'calendar' && (
        <div className="space-y-4">
          <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
            <div className="flex items-center justify-between mb-4">
              <button onClick={prevMonth} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                {MONTH_NAMES[calMonth]} {calYear}
              </span>
              <button onClick={nextMonth} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center mb-1">
              {DAY_LABELS.map((d) => (
                <div key={d} className="text-[10px] font-medium text-gray-400 dark:text-gray-500 py-1">{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: calStart }).map((_, i) => <div key={`e${i}`} />)}
              {Array.from({ length: calDays }).map((_, i) => {
                const day = i + 1
                const key = `${calYear}-${String(calMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
                const count = (entries[key] || []).length
                const maxSev = count > 0 ? Math.max(...entries[key].map((s) => s.severity)) : 0
                const isToday = key === today()
                const sevObj = maxSev > 0 ? getSeverity(maxSev) : null
                return (
                  <button
                    key={day}
                    onClick={() => { setSelectedDate(key); setView('log') }}
                    className={`relative aspect-square rounded-lg text-xs flex flex-col items-center justify-center gap-0.5 transition-colors
                      ${isToday ? 'ring-2 ring-indigo-400 dark:ring-indigo-500' : ''}
                      ${count > 0 ? 'bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700' : 'hover:bg-gray-50 dark:hover:bg-gray-700/30'}
                      text-gray-700 dark:text-gray-200`}
                  >
                    <span>{day}</span>
                    {count > 0 && (
                      <span className={`w-1.5 h-1.5 rounded-full ${sevObj?.dot || 'bg-gray-300'}`} />
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-3 text-xs text-gray-500 dark:text-gray-400">
            {SEVERITY_LEVELS.map((s) => (
              <span key={s.value} className="flex items-center gap-1">
                <span className={`w-2 h-2 rounded-full ${s.dot}`} /> {s.label}
              </span>
            ))}
          </div>

          {/* Top symptoms */}
          {topSymptoms.length > 0 && (
            <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">Most Frequent Symptoms</h3>
              <div className="space-y-2">
                {topSymptoms.map((s) => {
                  const pct = topSymptoms[0].count > 0 ? (s.count / topSymptoms[0].count) * 100 : 0
                  return (
                    <div key={s.name} className="flex items-center gap-3">
                      <span className="text-sm text-gray-700 dark:text-gray-200 w-28 truncate">{s.name}</span>
                      <div className="flex-1 h-2 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
                        <div className="h-full rounded-full bg-indigo-500" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="text-xs text-gray-400 dark:text-gray-500 w-6 text-right">{s.count}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function SymptomCard({ item, onRemove, compact }) {
  const sev = getSeverity(item.severity)
  return (
    <div className={`flex items-start justify-between gap-3 rounded-lg border border-gray-100 dark:border-gray-700 ${compact ? 'px-3 py-2' : 'p-3'} bg-white dark:bg-gray-800`}>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`text-sm font-medium text-gray-900 dark:text-gray-100`}>{item.symptom}</span>
          <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${sev?.color || ''}`}>{sev?.label}</span>
          <span className="text-[10px] text-gray-400 dark:text-gray-500 capitalize">{item.timeOfDay}</span>
        </div>
        {item.notes && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{item.notes}</p>
        )}
      </div>
      <button onClick={onRemove} className="text-gray-300 hover:text-rose-500 dark:text-gray-600 dark:hover:text-rose-400 transition-colors flex-shrink-0 mt-0.5">
        <Trash2 className="w-3.5 h-3.5" />
      </button>
    </div>
  )
}

function esc(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

function buildPrintHtml(dates, entries) {
  const rows = dates.map((date) => {
    const items = entries[date] || []
    const itemRows = items.map((s) => {
      const sev = getSeverity(s.severity)
      return `<tr>
        <td style="padding:6px 10px;border-bottom:1px solid #e5e7eb">${esc(s.symptom)}</td>
        <td style="padding:6px 10px;border-bottom:1px solid #e5e7eb">${esc(sev?.label || '')}</td>
        <td style="padding:6px 10px;border-bottom:1px solid #e5e7eb;text-transform:capitalize">${esc(s.timeOfDay)}</td>
        <td style="padding:6px 10px;border-bottom:1px solid #e5e7eb;color:#6b7280;font-size:12px">${esc(s.notes || '—')}</td>
      </tr>`
    }).join('')
    return `<h3 style="margin:18px 0 6px;font-size:14px;color:#111">${esc(formatDate(date))} <span style="color:#9ca3af;font-weight:normal">(${items.length} symptom${items.length !== 1 ? 's' : ''})</span></h3>
      <table style="width:100%;border-collapse:collapse;font-size:13px;margin-bottom:10px">
        <thead><tr style="background:#f9fafb;text-align:left">
          <th style="padding:6px 10px;border-bottom:2px solid #e5e7eb;font-weight:600">Symptom</th>
          <th style="padding:6px 10px;border-bottom:2px solid #e5e7eb;font-weight:600">Severity</th>
          <th style="padding:6px 10px;border-bottom:2px solid #e5e7eb;font-weight:600">Time</th>
          <th style="padding:6px 10px;border-bottom:2px solid #e5e7eb;font-weight:600">Notes</th>
        </tr></thead>
        <tbody>${itemRows}</tbody>
      </table>`
  }).join('')

  return `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Symptom Journal Report</title>
    <style>body{font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;max-width:800px;margin:0 auto;padding:24px;color:#374151}
    @media print{body{padding:0}}</style></head><body>
    <h1 style="font-size:20px;margin-bottom:2px">Symptom Journal Report</h1>
    <p style="color:#6b7280;font-size:13px;margin-top:0">Generated ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} — ${dates.length} day${dates.length !== 1 ? 's' : ''}</p>
    <hr style="border:none;border-top:1px solid #e5e7eb;margin:12px 0">
    ${rows}
    <p style="margin-top:24px;font-size:11px;color:#9ca3af;text-align:center">Generated by UnTrackt Symptom Journal — data stored locally only</p>
    </body></html>`
}
