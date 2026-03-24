import { BarChart3, Eraser } from 'lucide-react'
import SEOHead from '../components/SEOHead.jsx'
import EmptyState from '../components/EmptyState.jsx'
import tools, { categories } from '../data/tools.js'
import {
  clearAllStats,
  getAllStats,
  getMostUsedTools,
  getRecentVisits,
  getStreak,
  getTotalVisits,
} from '../utils/localStats.js'
import { clearAllUntracktStorage, clearFavorites } from '../utils/storage.js'
import { clearErrorLog, getErrorLog } from '../utils/errorReporter.js'

function getFavoriteCategory(mostUsed) {
  const categoryCount = {}
  mostUsed.forEach((item) => {
    const tool = tools.find((candidate) => candidate.id === item.toolId)
    if (!tool) return
    categoryCount[tool.category] = (categoryCount[tool.category] || 0) + item.visits
  })

  const best = Object.entries(categoryCount).sort((a, b) => b[1] - a[1])[0]
  if (!best) return 'None yet'
  return categories.find((cat) => cat.id === best[0])?.name || best[0]
}

function getHeatmapDays(daily) {
  const cells = []
  const now = new Date()
  for (let i = 83; i >= 0; i -= 1) {
    const date = new Date(now)
    date.setDate(now.getDate() - i)
    const key = date.toISOString().slice(0, 10)
    const count = daily[key] || 0
    let level = 0
    if (count >= 6) level = 4
    else if (count >= 4) level = 3
    else if (count >= 2) level = 2
    else if (count >= 1) level = 1
    cells.push({ key, count, level })
  }
  return cells
}

export default function MyStatsPage() {
  const allStats = getAllStats()
  const mostUsed = getMostUsedTools(5)
  const recent = getRecentVisits(10)
  const streak = getStreak()
  const totalVisits = getTotalVisits()
  const toolsUsed = Object.keys(allStats.tools || {}).length
  const mostUsedToolId = mostUsed[0]?.toolId
  const mostUsedTool = tools.find((tool) => tool.id === mostUsedToolId)
  const dailyCells = getHeatmapDays(allStats.daily || {})
  const errors = getErrorLog()

  const handleClearStats = () => {
    if (window.confirm('Clear your local usage stats?')) {
      clearAllStats()
      window.location.reload()
    }
  }

  const handleClearFavorites = () => {
    if (window.confirm('Clear your saved favorites?')) {
      clearFavorites()
      window.location.reload()
    }
  }

  const handleClearPreferences = () => {
    if (!window.confirm('Clear all local preferences and logs?')) return

    clearAllUntracktStorage()
    clearErrorLog()
    window.location.reload()
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <SEOHead
        title="My Usage Stats | UnTrackt"
        description="Your personal UnTrackt usage dashboard stored locally on your device."
        path="/my-stats"
        noindex
      />

      <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">My usage stats</h1>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        All data is stored locally on your device only. Nothing is ever sent to any server.
      </p>

      {toolsUsed === 0 ? (
        <div className="mt-8">
          <EmptyState
            icon={BarChart3}
            title="No local stats yet"
            description="Use a few tools and your personal dashboard will appear here."
          />
        </div>
      ) : (
        <>
          <section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-label="Stats overview">
            <div className="panel-card"><p className="text-xs text-gray-500 dark:text-gray-400">Total tools used</p><p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">{toolsUsed}</p></div>
            <div className="panel-card"><p className="text-xs text-gray-500 dark:text-gray-400">Favorite category</p><p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">{getFavoriteCategory(mostUsed)}</p></div>
            <div className="panel-card"><p className="text-xs text-gray-500 dark:text-gray-400">Current streak</p><p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">{streak} day{streak === 1 ? '' : 's'}</p></div>
            <div className="panel-card"><p className="text-xs text-gray-500 dark:text-gray-400">Most used tool</p><p className="mt-1 text-base font-bold text-gray-900 dark:text-white">{mostUsedTool?.name || 'N/A'}</p></div>
          </section>

          <section className="mt-8" aria-label="Most used tools">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Your most used tools</h2>
            <div className="mt-4 space-y-3">
              {mostUsed.map((item) => {
                const tool = tools.find((candidate) => candidate.id === item.toolId)
                const max = mostUsed[0]?.visits || 1
                const width = Math.round((item.visits / max) * 100)
                return (
                  <div key={item.toolId} className="panel-card">
                    <div className="flex items-center justify-between gap-2 text-sm">
                      <span className="font-semibold text-gray-900 dark:text-gray-100">{tool?.name || item.toolId}</span>
                      <span className="text-gray-500 dark:text-gray-400">{item.visits} visits</span>
                    </div>
                    <svg viewBox="0 0 100 8" className="mt-2 h-2 w-full" role="img" aria-label={`${tool?.name || item.toolId} usage bar`}>
                      <rect x="0" y="0" width="100" height="8" rx="4" fill="currentColor" className="text-gray-200 dark:text-gray-700" />
                      <rect x="0" y="0" width={width} height="8" rx="4" fill="currentColor" className="text-indigo-500" />
                    </svg>
                  </div>
                )
              })}
            </div>
          </section>

          <section className="mt-8" aria-label="Recently visited tools">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recently visited</h2>
            <div className="mt-4 panel-card">
              <ul className="space-y-2 text-sm">
                {recent.map((entry) => {
                  const tool = tools.find((candidate) => candidate.id === entry.toolId)
                  return (
                    <li key={`${entry.toolId}-${entry.timestamp}`} className="flex items-center justify-between gap-2">
                      <span className="font-medium text-gray-900 dark:text-gray-100">{tool?.name || entry.toolId}</span>
                      <span className="text-gray-500 dark:text-gray-400">{new Date(entry.timestamp).toLocaleString()}</span>
                    </li>
                  )
                })}
              </ul>
            </div>
          </section>

          <section className="mt-8" aria-label="Usage heatmap">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Usage heatmap</h2>
            <div className="mt-4 panel-card overflow-x-auto">
              <div className="grid grid-flow-col grid-rows-7 gap-1 min-w-[520px]">
                {dailyCells.map((cell) => (
                  <div
                    key={cell.key}
                    title={`${cell.key}: ${cell.count} visits`}
                    className={`h-3 w-3 rounded-sm ${
                      cell.level === 0 ? 'bg-gray-200 dark:bg-gray-700' :
                      cell.level === 1 ? 'bg-indigo-200 dark:bg-indigo-800' :
                      cell.level === 2 ? 'bg-indigo-400 dark:bg-indigo-600' :
                      cell.level === 3 ? 'bg-indigo-500 dark:bg-indigo-500' : 'bg-indigo-700 dark:bg-indigo-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      <section className="mt-8 panel-card" aria-label="Error log">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Local error log</h2>
        {errors.length === 0 ? (
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">No local errors recorded.</p>
        ) : (
          <ul className="mt-3 space-y-2 text-xs text-gray-600 dark:text-gray-300">
            {errors.map((entry, index) => (
              <li key={`${entry.timestamp}-${index}`} className="rounded-lg border border-gray-200 p-2 dark:border-gray-700">
                <p className="font-medium">{entry.message}</p>
                <p className="mt-1 opacity-80">{new Date(entry.timestamp).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-8 panel-card" aria-label="Clear local data">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Clear my data</h2>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          All data is stored locally on your device only. Nothing is ever sent to any server.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <button type="button" className="btn-secondary" onClick={handleClearStats}>Clear usage stats</button>
          <button type="button" className="btn-secondary" onClick={handleClearFavorites}>Clear favorites</button>
          <button type="button" className="btn-secondary" onClick={handleClearPreferences}>
            <Eraser className="mr-2 inline h-4 w-4" />
            Clear all preferences
          </button>
        </div>
        <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">Total visits recorded locally: {totalVisits}</p>
      </section>
    </div>
  )
}
