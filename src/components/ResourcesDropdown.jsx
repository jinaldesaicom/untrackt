import { memo, useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'

const resources = [
  {
    to: '/ai-directory',
    emoji: '🤖',
    name: 'AI Directory',
    description: 'Browse 200+ AI tools and services',
    color: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-50 dark:bg-blue-900/30',
  },
  {
    to: '/status-pages',
    emoji: '📡',
    name: 'Status Pages',
    description: '200+ official service status pages',
    color: 'text-indigo-600 dark:text-indigo-400',
    bg: 'bg-indigo-50 dark:bg-indigo-900/30',
  },
  {
    to: '/github-stars',
    emoji: '⭐',
    name: 'GitHub Stars',
    description: '200+ most-starred GitHub repositories',
    color: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-50 dark:bg-amber-900/30',
  },
  {
    to: '/ai-learning',
    emoji: '🧠',
    name: 'AI Learning',
    description: '150+ AI courses, tutorials, and books',
    color: 'text-purple-600 dark:text-purple-400',
    bg: 'bg-purple-50 dark:bg-purple-900/30',
  },
  {
    to: '/certifications',
    emoji: '🎓',
    name: 'Certifications',
    description: '100+ cloud certification exam guides',
    color: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-50 dark:bg-emerald-900/30',
  },
  {
    to: '/system-design',
    emoji: '🏗️',
    name: 'System Design',
    description: '100+ system design learning resources',
    color: 'text-violet-600 dark:text-violet-400',
    bg: 'bg-violet-50 dark:bg-violet-900/30',
  },
  {
    to: '/interview-prep',
    emoji: '💼',
    name: 'Interview Prep',
    description: '100+ DSA, behavioral & coding resources',
    color: 'text-rose-600 dark:text-rose-400',
    bg: 'bg-rose-50 dark:bg-rose-900/30',
  },
]

function ResourcesDropdown() {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const close = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        aria-expanded={open}
        aria-haspopup="true"
      >
        <span>📚</span>
        Resources
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-2 w-72 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl p-2 z-50">
          {resources.map((r) => (
            <Link
              key={r.to}
              to={r.to}
              onClick={() => setOpen(false)}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group"
            >
              <span className={`text-xl p-2 rounded-lg ${r.bg} shrink-0`}>{r.emoji}</span>
              <div className="min-w-0">
                <span className={`font-semibold text-sm ${r.color} group-hover:underline`}>{r.name}</span>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{r.description}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default memo(ResourcesDropdown)
