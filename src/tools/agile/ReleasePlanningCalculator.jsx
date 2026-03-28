import { useState, useEffect } from 'react'
import { getItem, setItem } from '../../utils/storage'

const STORAGE_KEY = 'untrackt_release_planning'

export default function ReleasePlanningCalculator() {
  const [totalPoints, setTotalPoints] = useState(() => getItem(STORAGE_KEY + '_total', 100))
  const [velocity, setVelocity] = useState(() => getItem(STORAGE_KEY + '_velocity', 25))
  const [sprintLength, setSprintLength] = useState(() => getItem(STORAGE_KEY + '_sprintLen', 14))
  const [startDate, setStartDate] = useState(() => getItem(STORAGE_KEY + '_start', new Date().toISOString().slice(0, 10)))
  const [buffer, setBuffer] = useState(() => getItem(STORAGE_KEY + '_buffer', 20))

  useEffect(() => {
    setItem(STORAGE_KEY + '_total', totalPoints)
    setItem(STORAGE_KEY + '_velocity', velocity)
    setItem(STORAGE_KEY + '_sprintLen', sprintLength)
    setItem(STORAGE_KEY + '_start', startDate)
    setItem(STORAGE_KEY + '_buffer', buffer)
  }, [totalPoints, velocity, sprintLength, startDate, buffer])

  const sprintsNeeded = velocity > 0 ? Math.ceil(totalPoints / velocity) : 0
  const sprintsWithBuffer = Math.ceil(sprintsNeeded * (1 + buffer / 100))
  const totalDays = sprintsWithBuffer * sprintLength

  const estimatedEnd = (() => {
    if (!startDate) return ''
    const d = new Date(startDate)
    d.setDate(d.getDate() + totalDays)
    return d.toISOString().slice(0, 10)
  })()

  const sprintBreakdown = Array.from({ length: sprintsWithBuffer }, (_, i) => {
    const remainingAtStart = Math.max(0, totalPoints - i * velocity)
    const pointsDone = Math.min(velocity, remainingAtStart)
    const remaining = Math.max(0, remainingAtStart - pointsDone)
    const sDate = new Date(startDate)
    sDate.setDate(sDate.getDate() + i * sprintLength)
    const eDate = new Date(sDate)
    eDate.setDate(eDate.getDate() + sprintLength - 1)
    return {
      num: i + 1,
      start: sDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      end: eDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      points: pointsDone,
      remaining,
      isBuffer: i >= sprintsNeeded,
    }
  })

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Total Story Points</label>
          <input type="number" min="1" value={totalPoints}
            onChange={e => setTotalPoints(Math.max(1, parseInt(e.target.value) || 1))}
            className="input-field text-sm" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Avg Velocity / Sprint</label>
          <input type="number" min="1" value={velocity}
            onChange={e => setVelocity(Math.max(1, parseInt(e.target.value) || 1))}
            className="input-field text-sm" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Sprint Length (days)</label>
          <input type="number" min="1" max="30" value={sprintLength}
            onChange={e => setSprintLength(Math.max(1, parseInt(e.target.value) || 1))}
            className="input-field text-sm" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Buffer %</label>
          <input type="number" min="0" max="100" value={buffer}
            onChange={e => setBuffer(Math.min(100, Math.max(0, parseInt(e.target.value) || 0)))}
            className="input-field text-sm" />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Start Date</label>
        <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)}
          className="input-field text-sm w-full sm:w-48" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="rounded-xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 p-3 text-center">
          <p className="text-xs text-indigo-600 dark:text-indigo-400">Sprints Needed</p>
          <p className="text-xl font-bold text-indigo-700 dark:text-indigo-300">{sprintsNeeded}</p>
        </div>
        <div className="rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-3 text-center">
          <p className="text-xs text-amber-600 dark:text-amber-400">With Buffer</p>
          <p className="text-xl font-bold text-amber-700 dark:text-amber-300">{sprintsWithBuffer}</p>
        </div>
        <div className="rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-3 text-center">
          <p className="text-xs text-green-600 dark:text-green-400">Total Days</p>
          <p className="text-xl font-bold text-green-700 dark:text-green-300">{totalDays}</p>
        </div>
        <div className="rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 p-3 text-center">
          <p className="text-xs text-rose-600 dark:text-rose-400">Est. Release</p>
          <p className="text-lg font-bold text-rose-700 dark:text-rose-300">
            {estimatedEnd ? new Date(estimatedEnd).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'}
          </p>
        </div>
      </div>

      {sprintBreakdown.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Sprint Breakdown</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                  <th className="pb-2 pr-2">Sprint</th>
                  <th className="pb-2 px-2">Dates</th>
                  <th className="pb-2 px-2 text-center">Points</th>
                  <th className="pb-2 px-2 text-center">Remaining</th>
                  <th className="pb-2 pl-2">Type</th>
                </tr>
              </thead>
              <tbody>
                {sprintBreakdown.map(s => (
                  <tr key={s.num} className={`border-b border-gray-100 dark:border-gray-800 ${s.isBuffer ? 'opacity-60' : ''}`}>
                    <td className="py-1.5 pr-2 font-medium text-gray-700 dark:text-gray-300">#{s.num}</td>
                    <td className="py-1.5 px-2 text-gray-500 dark:text-gray-400 text-xs">{s.start} – {s.end}</td>
                    <td className="py-1.5 px-2 text-center font-semibold text-indigo-600 dark:text-indigo-400">{s.points}</td>
                    <td className="py-1.5 px-2 text-center text-gray-500 dark:text-gray-400">{s.remaining}</td>
                    <td className="py-1.5 pl-2">
                      <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${s.isBuffer ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300' : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'}`}>
                        {s.isBuffer ? 'Buffer' : 'Planned'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
