import { useState, useEffect, useMemo } from 'react'
import { getItem, setItem } from '../../utils/storage'

const STORAGE_KEY = 'untrackt_weekly_review'

const SECTIONS = [
  { key: 'wins', label: 'Wins & Accomplishments', placeholder: 'What went well this week?' },
  { key: 'challenges', label: 'Challenges', placeholder: 'What was difficult? What blocked progress?' },
  { key: 'lessons', label: 'Lessons Learned', placeholder: 'What did you learn? What would you do differently?' },
  { key: 'gratitude', label: 'Gratitude', placeholder: 'What are you grateful for this week?' },
  { key: 'nextWeek', label: 'Next Week Priorities', placeholder: 'Top 3-5 priorities for next week' },
  { key: 'habits', label: 'Habit Check-in', placeholder: 'How did your habits go? Any to add/remove?' },
]

function getWeekKey(date) {
  const d = new Date(date)
  d.setDate(d.getDate() - d.getDay() + 1) // Monday
  return d.toISOString().slice(0, 10)
}

function getWeekLabel(key) {
  const d = new Date(key)
  const end = new Date(d)
  end.setDate(end.getDate() + 6)
  return `${d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
}

export default function WeeklyReviewTemplate() {
  const [reviews, setReviews] = useState(() => getItem(STORAGE_KEY, {}))
  const [currentWeek, setCurrentWeek] = useState(getWeekKey(new Date()))

  useEffect(() => { setItem(STORAGE_KEY, reviews) }, [reviews])

  const review = reviews[currentWeek] || {}
  const updateField = (key, val) => {
    setReviews(prev => ({
      ...prev,
      [currentWeek]: { ...prev[currentWeek], [key]: val, updatedAt: new Date().toISOString() }
    }))
  }

  const weekKeys = useMemo(() => {
    const keys = new Set(Object.keys(reviews))
    keys.add(currentWeek)
    // Add 12 weeks back
    for (let i = 0; i < 12; i++) {
      const d = new Date()
      d.setDate(d.getDate() - (i * 7))
      keys.add(getWeekKey(d))
    }
    return [...keys].sort().reverse()
  }, [reviews, currentWeek])

  const completeness = SECTIONS.filter(s => review[s.key]?.trim()).length
  const pct = Math.round((completeness / SECTIONS.length) * 100)
  const ratingVal = review.rating || 0

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 overflow-x-auto pb-1">
        {weekKeys.slice(0, 12).map(key => (
          <button key={key} onClick={() => setCurrentWeek(key)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs border transition-colors ${currentWeek === key ? 'bg-indigo-600 text-white border-indigo-600' : reviews[key] ? 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700' : 'bg-gray-50 dark:bg-gray-800 text-gray-400 border-gray-100 dark:border-gray-800'}`}>
            {getWeekLabel(key)}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
          Week of {getWeekLabel(currentWeek)}
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400">{completeness}/{SECTIONS.length} sections</span>
          <div className="w-16 h-1.5 rounded-full bg-gray-100 dark:bg-gray-800">
            <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${pct}%` }} />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Week Rating</label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map(n => (
            <button key={n} onClick={() => updateField('rating', n)}
              className={`w-8 h-8 rounded-full text-sm font-bold transition-colors ${ratingVal >= n ? 'bg-indigo-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-400'}`}>
              {n}
            </button>
          ))}
          <span className="text-xs text-gray-400 ml-2 self-center">{ratingVal > 0 ? `${ratingVal}/5` : 'Rate your week'}</span>
        </div>
      </div>

      <div className="space-y-4">
        {SECTIONS.map(section => (
          <div key={section.key}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">{section.label}</label>
            <textarea value={review[section.key] || ''} onChange={e => updateField(section.key, e.target.value)}
              className="textarea-field min-h-[80px]" placeholder={section.placeholder} />
          </div>
        ))}
      </div>
    </div>
  )
}
