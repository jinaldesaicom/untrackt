import { useState, useEffect, useMemo, useCallback } from 'react'
import { Search, Download, Trash2, ChevronLeft, ChevronRight, Tag, X, Plus } from 'lucide-react'
import { getItem, setItem } from '../../utils/storage'

const STORAGE_KEY = 'untrackt_daily_journal'
const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const MONTH_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const VIEWS = [
  { id: 'write', label: 'Write' },
  { id: 'calendar', label: 'Calendar' },
  { id: 'search', label: 'Search' },
  { id: 'stats', label: 'Stats' },
]
const SUGGESTED_TAGS = ['personal', 'work', 'gratitude', 'goals', 'ideas', 'health', 'travel', 'learning', 'reflection', 'creative']

function getDateKey(date) { return date.toISOString().slice(0, 10) }
function getToday() { return new Date() }
function daysInMonth(y, m) { return new Date(y, m + 1, 0).getDate() }
function firstDayOfMonth(y, m) { return new Date(y, m, 1).getDay() }

function formatDateFull(key) {
  const [y, m, d] = key.split('-').map(Number)
  const date = new Date(y, m - 1, d)
  return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
}

function wordCount(text) {
  return text ? text.split(/\s+/).filter(Boolean).length : 0
}

export default function DailyJournal() {
  const [entries, setEntries] = useState(() => getItem(STORAGE_KEY, {}))
  const [selectedDate, setSelectedDate] = useState(getToday())
  const [view, setView] = useState('write')
  const [calMonth, setCalMonth] = useState(() => ({ year: getToday().getFullYear(), month: getToday().getMonth() }))
  const [searchQuery, setSearchQuery] = useState('')
  const [tagInput, setTagInput] = useState('')

  const dateKey = getDateKey(selectedDate)
  const todayKey = getDateKey(getToday())
  const entry = entries[dateKey] || null

  useEffect(() => { setItem(STORAGE_KEY, entries) }, [entries])

  const updateContent = useCallback((content) => {
    setEntries(prev => ({
      ...prev,
      [dateKey]: {
        ...(prev[dateKey] || { tags: [], createdAt: new Date().toISOString() }),
        content,
        updatedAt: new Date().toISOString(),
      }
    }))
  }, [dateKey])

  const addTag = useCallback((tag) => {
    const t = tag.trim().toLowerCase()
    if (!t) return
    setEntries(prev => {
      const current = prev[dateKey] || { content: '', tags: [], createdAt: new Date().toISOString() }
      if (current.tags.includes(t)) return prev
      return { ...prev, [dateKey]: { ...current, tags: [...current.tags, t], updatedAt: new Date().toISOString() } }
    })
    setTagInput('')
  }, [dateKey])

  const removeTag = useCallback((tag) => {
    setEntries(prev => {
      const current = prev[dateKey]
      if (!current) return prev
      return { ...prev, [dateKey]: { ...current, tags: current.tags.filter(t => t !== tag), updatedAt: new Date().toISOString() } }
    })
  }, [dateKey])

  const deleteEntry = useCallback((key) => {
    setEntries(prev => {
      const next = { ...prev }
      delete next[key]
      return next
    })
  }, [])

  // ── All tags used across entries ──
  const allTags = useMemo(() => {
    const tagSet = new Set()
    Object.values(entries).forEach(e => e.tags?.forEach(t => tagSet.add(t)))
    return [...tagSet].sort()
  }, [entries])

  // ── Search results ──
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return []
    const q = searchQuery.toLowerCase()
    return Object.entries(entries)
      .filter(([, e]) => e.content?.toLowerCase().includes(q) || e.tags?.some(t => t.includes(q)))
      .sort(([a], [b]) => b.localeCompare(a))
  }, [entries, searchQuery])

  // ── Stats ──
  const stats = useMemo(() => {
    const keys = Object.keys(entries).filter(k => entries[k].content?.trim()).sort()
    if (!keys.length) return { total: 0, totalWords: 0, currentStreak: 0, longestStreak: 0, avgWords: 0, tagCounts: {}, monthlyBreakdown: [] }

    let totalWords = 0
    const tagCounts = {}
    keys.forEach(k => {
      totalWords += wordCount(entries[k].content)
      entries[k].tags?.forEach(t => { tagCounts[t] = (tagCounts[t] || 0) + 1 })
    })

    // Streak calculation
    let currentStreak = 0
    let longestStreak = 0
    let streak = 0
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // Current streak: count back from today
    const d = new Date(today)
    while (true) {
      const k = getDateKey(d)
      if (entries[k]?.content?.trim()) {
        currentStreak++
        d.setDate(d.getDate() - 1)
      } else {
        break
      }
    }

    // Longest streak
    for (let i = 0; i < keys.length; i++) {
      if (i === 0) { streak = 1 }
      else {
        const prev = new Date(keys[i - 1])
        const curr = new Date(keys[i])
        const diff = (curr - prev) / (1000 * 60 * 60 * 24)
        streak = diff === 1 ? streak + 1 : 1
      }
      longestStreak = Math.max(longestStreak, streak)
    }

    // Monthly breakdown (last 6 months)
    const monthlyBreakdown = []
    for (let i = 5; i >= 0; i--) {
      const md = new Date(today.getFullYear(), today.getMonth() - i, 1)
      const prefix = `${md.getFullYear()}-${String(md.getMonth() + 1).padStart(2, '0')}`
      const count = keys.filter(k => k.startsWith(prefix)).length
      monthlyBreakdown.push({ label: MONTH_SHORT[md.getMonth()], count, days: daysInMonth(md.getFullYear(), md.getMonth()) })
    }

    return { total: keys.length, totalWords, currentStreak, longestStreak, avgWords: Math.round(totalWords / keys.length), tagCounts, monthlyBreakdown }
  }, [entries])

  // ── Export ──
  const exportEntries = useCallback(() => {
    const keys = Object.keys(entries).sort()
    if (!keys.length) return
    const lines = keys.map(k => {
      const e = entries[k]
      const tags = e.tags?.length ? `\nTags: ${e.tags.join(', ')}` : ''
      return `--- ${formatDateFull(k)} ---\n${e.content || '(empty)'}${tags}\nWords: ${wordCount(e.content)}\n`
    })
    const blob = new Blob([lines.join('\n')], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `journal-export-${todayKey}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }, [entries, todayKey])

  const goToDate = useCallback((date) => {
    setSelectedDate(date)
    setView('write')
  }, [])

  // ── Write View ──
  function WriteView() {
    const isToday = dateKey === todayKey
    return (
      <div className="space-y-4">
        {/* Date nav */}
        <div className="flex items-center justify-between">
          <button onClick={() => setSelectedDate(d => { const n = new Date(d); n.setDate(n.getDate() - 1); return n })} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" aria-label="Previous day">
            <ChevronLeft className="w-5 h-5 text-gray-500" />
          </button>
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-900 dark:text-white">{formatDateFull(dateKey)}</p>
            {!isToday && (
              <button onClick={() => setSelectedDate(getToday())} className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline mt-0.5">Go to Today</button>
            )}
            {isToday && <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium mt-0.5">Today</p>}
          </div>
          <button onClick={() => setSelectedDate(d => { const n = new Date(d); n.setDate(n.getDate() + 1); return n })} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" aria-label="Next day">
            <ChevronRight className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Editor */}
        <textarea
          value={entry?.content || ''}
          onChange={e => updateContent(e.target.value)}
          placeholder="Write freely about your day..."
          className="textarea-field w-full min-h-[280px] resize-y text-base leading-relaxed"
          autoFocus
        />

        {/* Word / char count */}
        <div className="flex items-center justify-between text-xs text-gray-400 dark:text-gray-500">
          <span>{wordCount(entry?.content)} words &middot; {entry?.content?.length || 0} characters</span>
          {entry?.updatedAt && <span>Last saved {new Date(entry.updatedAt).toLocaleTimeString()}</span>}
        </div>

        {/* Tags */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            <Tag className="w-4 h-4" />
            <span>Tags</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {(entry?.tags || []).map(tag => (
              <span key={tag} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300">
                {tag}
                <button onClick={() => removeTag(tag)} className="hover:text-red-500 transition-colors" aria-label={`Remove tag ${tag}`}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={tagInput}
              onChange={e => setTagInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTag(tagInput) } }}
              placeholder="Add a tag..."
              className="input-field flex-1 text-sm"
              maxLength={30}
            />
            <button onClick={() => addTag(tagInput)} disabled={!tagInput.trim()} className="btn-secondary text-sm px-3">
              <Plus className="w-4 h-4" />
            </button>
          </div>
          {/* Suggested tags */}
          {(!entry?.tags?.length || entry.tags.length < 3) && (
            <div className="flex flex-wrap gap-1">
              {SUGGESTED_TAGS.filter(t => !entry?.tags?.includes(t)).slice(0, 6).map(tag => (
                <button key={tag} onClick={() => addTag(tag)} className="px-2 py-0.5 rounded-full text-[11px] bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  + {tag}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Delete */}
        {entry?.content && (
          <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
            <button onClick={() => { if (window.confirm('Delete this journal entry?')) deleteEntry(dateKey) }} className="text-xs text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 flex items-center gap-1">
              <Trash2 className="w-3.5 h-3.5" /> Delete this entry
            </button>
          </div>
        )}
      </div>
    )
  }

  // ── Calendar View ──
  function CalendarView() {
    const { year, month } = calMonth
    const total = daysInMonth(year, month)
    const offset = firstDayOfMonth(year, month)
    const cells = Array.from({ length: offset }, () => null).concat(Array.from({ length: total }, (_, i) => i + 1))

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <button onClick={() => setCalMonth(p => { const d = new Date(p.year, p.month - 1, 1); return { year: d.getFullYear(), month: d.getMonth() } })} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <ChevronLeft className="w-5 h-5 text-gray-500" />
          </button>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{MONTH_NAMES[month]} {year}</h3>
          <button onClick={() => setCalMonth(p => { const d = new Date(p.year, p.month + 1, 1); return { year: d.getFullYear(), month: d.getMonth() } })} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <ChevronRight className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1">
          {DAY_LABELS.map(d => (
            <div key={d} className="text-center text-xs font-medium text-gray-400 dark:text-gray-500 pb-1">{d}</div>
          ))}
          {cells.map((day, i) => {
            if (!day) return <div key={`e${i}`} />
            const key = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
            const hasEntry = entries[key]?.content?.trim()
            const isToday = key === todayKey
            const isSelected = key === dateKey
            const wc = hasEntry ? wordCount(entries[key].content) : 0

            return (
              <button
                key={key}
                onClick={() => goToDate(new Date(year, month, day))}
                className={`relative flex flex-col items-center justify-center rounded-lg p-1.5 min-h-[52px] transition-colors
                  ${isSelected ? 'bg-indigo-600 text-white ring-2 ring-indigo-400' : isToday ? 'bg-indigo-50 dark:bg-indigo-900/30 ring-1 ring-indigo-300 dark:ring-indigo-700' : 'hover:bg-gray-50 dark:hover:bg-gray-800'}
                  ${hasEntry && !isSelected ? 'bg-green-50 dark:bg-green-900/20' : ''}`}
              >
                <span className={`text-sm font-medium ${isSelected ? 'text-white' : isToday ? 'text-indigo-700 dark:text-indigo-300' : 'text-gray-700 dark:text-gray-300'}`}>{day}</span>
                {hasEntry && (
                  <span className={`text-[9px] mt-0.5 ${isSelected ? 'text-indigo-200' : 'text-green-600 dark:text-green-400'}`}>{wc}w</span>
                )}
                {hasEntry && !isSelected && (
                  <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-green-500" />
                )}
              </button>
            )
          })}
        </div>

        {/* Monthly summary */}
        {(() => {
          const prefix = `${year}-${String(month + 1).padStart(2, '0')}`
          const monthEntries = Object.keys(entries).filter(k => k.startsWith(prefix) && entries[k].content?.trim())
          const monthWords = monthEntries.reduce((s, k) => s + wordCount(entries[k].content), 0)
          return (
            <div className="flex justify-center gap-6 text-xs text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-200 dark:border-gray-700">
              <span>{monthEntries.length} of {total} days</span>
              <span>{monthWords.toLocaleString()} words</span>
            </div>
          )
        })()}
      </div>
    )
  }

  // ── Search View ──
  function SearchView() {
    return (
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search entries by text or tag..."
            className="input-field w-full pl-10 text-sm"
            autoFocus
          />
        </div>

        {/* Tag filter chips */}
        {allTags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {allTags.map(tag => (
              <button key={tag} onClick={() => setSearchQuery(tag)} className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${searchQuery === tag ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/30'}`}>
                {tag}
              </button>
            ))}
          </div>
        )}

        {searchQuery.trim() && (
          <p className="text-xs text-gray-500 dark:text-gray-400">{searchResults.length} result{searchResults.length !== 1 ? 's' : ''} found</p>
        )}

        <div className="space-y-3 max-h-[420px] overflow-y-auto">
          {searchResults.map(([key, e]) => (
            <button key={key} onClick={() => goToDate(new Date(key + 'T00:00:00'))} className="w-full text-left rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-semibold text-gray-900 dark:text-white">{formatDateFull(key)}</span>
                <span className="text-[11px] text-gray-400">{wordCount(e.content)} words</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{e.content}</p>
              {e.tags?.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {e.tags.map(t => (
                    <span key={t} className="px-2 py-0.5 rounded-full text-[10px] bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">{t}</span>
                  ))}
                </div>
              )}
            </button>
          ))}
          {searchQuery.trim() && !searchResults.length && (
            <div className="text-center py-10">
              <Search className="w-10 h-10 mx-auto text-gray-300 dark:text-gray-600 mb-3" />
              <p className="text-sm text-gray-500 dark:text-gray-400">No entries match your search.</p>
            </div>
          )}
        </div>
      </div>
    )
  }

  // ── Stats View ──
  function StatsView() {
    if (!stats.total) {
      return (
        <div className="text-center py-16">
          <p className="text-gray-400 dark:text-gray-500 text-sm">Start writing to see your stats!</p>
        </div>
      )
    }

    const maxMonthly = Math.max(...stats.monthlyBreakdown.map(m => m.count), 1)
    const topTags = Object.entries(stats.tagCounts).sort((a, b) => b[1] - a[1]).slice(0, 10)
    const maxTag = topTags.length ? topTags[0][1] : 1

    return (
      <div className="space-y-6">
        {/* Summary cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Total Entries', value: stats.total },
            { label: 'Total Words', value: stats.totalWords.toLocaleString() },
            { label: 'Current Streak', value: `${stats.currentStreak}d` },
            { label: 'Longest Streak', value: `${stats.longestStreak}d` },
          ].map(({ label, value }) => (
            <div key={label} className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-3 text-center">
              <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{value}</p>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* Avg words */}
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Average Words per Entry</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.avgWords}</p>
        </div>

        {/* Monthly activity */}
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Monthly Activity (Last 6 Months)</p>
          <div className="flex items-end justify-between gap-2 h-32">
            {stats.monthlyBreakdown.map(({ label, count, days }) => (
              <div key={label} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[11px] font-medium text-gray-700 dark:text-gray-300">{count}</span>
                <div className="w-full rounded-t-md bg-indigo-500 dark:bg-indigo-400 transition-all" style={{ height: `${Math.max((count / maxMonthly) * 100, 4)}%` }} />
                <span className="text-[10px] text-gray-500 dark:text-gray-400">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top tags */}
        {topTags.length > 0 && (
          <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Top Tags</p>
            <div className="space-y-2">
              {topTags.map(([tag, count]) => (
                <div key={tag} className="flex items-center gap-3">
                  <span className="text-xs text-gray-600 dark:text-gray-400 w-20 truncate">{tag}</span>
                  <div className="flex-1 h-4 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                    <div className="h-full rounded-full bg-indigo-500 dark:bg-indigo-400 transition-all" style={{ width: `${(count / maxTag) * 100}%` }} />
                  </div>
                  <span className="text-[11px] text-gray-500 dark:text-gray-400 w-6 text-right">{count}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* View switcher */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex gap-1 p-1 rounded-xl bg-gray-100 dark:bg-gray-800">
          {VIEWS.map(v => (
            <button
              key={v.id}
              onClick={() => setView(v.id)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${view === v.id ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
            >
              {v.label}
            </button>
          ))}
        </div>
        <button onClick={exportEntries} className="btn-secondary text-xs flex items-center gap-1.5" title="Export all entries">
          <Download className="w-3.5 h-3.5" /> Export
        </button>
      </div>

      {/* View content */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-5">
        {view === 'write' && WriteView()}
        {view === 'calendar' && CalendarView()}
        {view === 'search' && SearchView()}
        {view === 'stats' && StatsView()}
      </div>

      {/* Privacy note */}
      <p className="text-center text-[11px] text-gray-400 dark:text-gray-500">All journal entries are stored locally in your browser. Nothing is sent to any server.</p>
    </div>
  )
}
