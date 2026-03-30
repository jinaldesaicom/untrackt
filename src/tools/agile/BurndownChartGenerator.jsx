import { useState, useEffect } from 'react'
import { Plus, Trash2, Download } from 'lucide-react'
import { getItem, setItem } from '../../utils/storage'

const STORAGE_KEY = 'untrackt_burndown_chart'

export default function BurndownChartGenerator() {
  const [totalPoints, setTotalPoints] = useState(() => getItem(STORAGE_KEY + '_total', 50))
  const [sprintDays, setSprintDays] = useState(() => getItem(STORAGE_KEY + '_days', 10))
  const [dailyData, setDailyData] = useState(() => getItem(STORAGE_KEY + '_data', []))

  useEffect(() => {
    setItem(STORAGE_KEY + '_total', totalPoints)
    setItem(STORAGE_KEY + '_days', sprintDays)
    setItem(STORAGE_KEY + '_data', dailyData)
  }, [totalPoints, sprintDays, dailyData])

  useEffect(() => {
    if (dailyData.length === 0 && sprintDays > 0) {
      setDailyData(Array.from({ length: sprintDays }, (_, i) => ({
        day: i + 1,
        remaining: '',
      })))
    }
  }, [])

  const regenerateDays = () => {
    setDailyData(Array.from({ length: sprintDays }, (_, i) => ({
      day: i + 1,
      remaining: dailyData[i]?.remaining ?? '',
    })))
  }

  const updateDay = (idx, val) => {
    setDailyData(prev => prev.map((d, i) => i === idx ? { ...d, remaining: val } : d))
  }

  const idealLine = dailyData.map((_, i) => {
    return Math.round(totalPoints - (totalPoints / sprintDays) * (i + 1))
  })

  const chartHeight = 200
  const chartWidth = 600
  const padLeft = 40
  const padBottom = 30
  const padTop = 10
  const padRight = 20
  const innerW = chartWidth - padLeft - padRight
  const innerH = chartHeight - padTop - padBottom
  const maxY = totalPoints

  const xStep = dailyData.length > 1 ? innerW / (dailyData.length - 1) : innerW

  const idealPoints = idealLine.map((v, i) => {
    const x = padLeft + (i * xStep)
    const y = padTop + innerH - (v / maxY) * innerH
    return `${x},${y}`
  })
  const idealPath = `${padLeft},${padTop + innerH - (totalPoints / maxY) * innerH} ` + idealPoints.join(' ')

  const actualEntries = dailyData.filter(d => d.remaining !== '' && d.remaining !== undefined)
  const actualPoints = actualEntries.map(d => {
    const idx = d.day - 1
    const x = padLeft + (idx * xStep)
    const val = Math.max(0, Math.min(totalPoints, parseInt(d.remaining) || 0))
    const y = padTop + innerH - (val / maxY) * innerH
    return { x, y, val, day: d.day }
  })
  const actualPath = actualPoints.length > 0
    ? [{ x: padLeft, y: padTop + innerH - (totalPoints / maxY) * innerH }, ...actualPoints]
        .map(p => `${p.x},${p.y}`).join(' ')
    : ''

  const exportCSV = () => {
    const rows = [['Day', 'Ideal Remaining', 'Actual Remaining']]
    dailyData.forEach((d, i) => {
      rows.push([d.day, idealLine[i], d.remaining || ''])
    })
    const csv = rows.map(r => r.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'burndown-chart.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-3 items-end">
        <div>
          <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Total Story Points</label>
          <input type="number" min="1" value={totalPoints}
            onChange={e => setTotalPoints(Math.max(1, parseInt(e.target.value) || 1))}
            className="input-field text-sm w-28" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Sprint Days</label>
          <input type="number" min="1" max="30" value={sprintDays}
            onChange={e => setSprintDays(Math.max(1, parseInt(e.target.value) || 1))}
            className="input-field text-sm w-20" />
        </div>
        <button onClick={regenerateDays} className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-xs text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800">
          Update Days
        </button>
        <button onClick={exportCSV} className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-xs text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center gap-1">
          <Download className="w-3 h-3" /> Export CSV
        </button>
      </div>

      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
        <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">Burndown Chart</h3>
        <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full" style={{ maxHeight: '280px' }}>
          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map(frac => {
            const y = padTop + innerH - frac * innerH
            return (
              <g key={frac}>
                <line x1={padLeft} y1={y} x2={chartWidth - padRight} y2={y} stroke="currentColor" className="text-gray-200 dark:text-gray-700" strokeWidth="0.5" />
                <text x={padLeft - 5} y={y + 3} textAnchor="end" className="text-[9px] fill-gray-400">{Math.round(frac * maxY)}</text>
              </g>
            )
          })}
          {/* X axis labels */}
          {dailyData.map((d, i) => {
            const x = padLeft + i * xStep
            return <text key={i} x={x} y={chartHeight - 5} textAnchor="middle" className="text-[9px] fill-gray-400">D{d.day}</text>
          })}
          {/* Ideal line */}
          <polyline points={idealPath} fill="none" stroke="#a5b4fc" strokeWidth="2" strokeDasharray="6 3" />
          {/* Actual line */}
          {actualPath && <polyline points={actualPath} fill="none" stroke="#6366f1" strokeWidth="2.5" />}
          {/* Actual dots */}
          {actualPoints.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r="4" fill="#6366f1" stroke="white" strokeWidth="1.5" />
          ))}
        </svg>
        <div className="flex items-center gap-4 mt-2 justify-center">
          <span className="flex items-center gap-1 text-[10px] text-gray-500">
            <span className="w-4 h-0.5 bg-indigo-300 inline-block" style={{ borderTop: '2px dashed #a5b4fc' }} /> Ideal
          </span>
          <span className="flex items-center gap-1 text-[10px] text-gray-500">
            <span className="w-4 h-0.5 bg-indigo-500 inline-block" /> Actual
          </span>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Daily Remaining Points</h3>
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
          {dailyData.map((d, i) => (
            <div key={i} className="text-center">
              <label className="block text-[10px] text-gray-400 mb-0.5">Day {d.day}</label>
              <input type="number" min="0" max={totalPoints} value={d.remaining}
                onChange={e => updateDay(i, e.target.value)}
                className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-1 py-1 text-xs text-center"
                placeholder={String(idealLine[i])} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
