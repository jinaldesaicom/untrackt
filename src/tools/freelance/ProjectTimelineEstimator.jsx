import { useState } from 'react'
import { Plus, Trash2, ChevronUp, ChevronDown } from 'lucide-react'
import SEOHead from '../../components/SEOHead.jsx'
import CopyButton from '../../components/CopyButton.jsx'

export default function ProjectTimelineEstimator() {
  const [tasks, setTasks] = useState([
    { id: 1, name: '', duration: 5, durationType: 'days', dependencies: [], assignee: '', startDate: null, endDate: null }
  ])
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0])
  const [workingHoursPerDay, setWorkingHoursPerDay] = useState(8)
  const [excludeWeekends, setExcludeWeekends] = useState(true)

  const calculateTaskDates = () => {
    const tasks_with_dates = tasks.map(task => ({ ...task }))
    let currentDate = new Date(startDate)

    tasks_with_dates.forEach((task, idx) => {
      // Find max end date from dependencies
      let latestDependencyEnd = currentDate
      if (task.dependencies.length > 0) {
        task.dependencies.forEach(depId => {
          const depTask = tasks_with_dates.find(t => t.id === depId)
          if (depTask && depTask.endDate) {
            const depEnd = new Date(depTask.endDate)
            if (depEnd > latestDependencyEnd) {
              latestDependencyEnd = depEnd
            }
          }
        })
      }

      task.startDate = latestDependencyEnd
      const durationMs = (task.durationType === 'hours')
        ? (parseFloat(task.duration) || 0) * 60 * 60 * 1000
        : (parseFloat(task.duration) || 0) * 24 * 60 * 60 * 1000

      let endDate = new Date(latestDependencyEnd.getTime() + durationMs)
      if (excludeWeekends) {
        let workDays = 0
        const dayMs = 24 * 60 * 60 * 1000
        while (workDays < (parseFloat(task.duration) || 0)) {
          endDate = new Date(endDate.getTime() + dayMs)
          const dayOfWeek = endDate.getDay()
          if (dayOfWeek !== 0 && dayOfWeek !== 6) {
            workDays++
          }
        }
      }

      task.endDate = endDate
    })

    return tasks_with_dates
  }

  const tasksWithDates = calculateTaskDates()
  const lastEndDate = tasksWithDates.length > 0 ? tasksWithDates[tasksWithDates.length - 1]?.endDate : new Date(startDate)
  const projectDuration = Math.ceil((lastEndDate - new Date(startDate)) / (24 * 60 * 60 * 1000))

  const findCriticalPath = () => {
    const withDates = tasksWithDates
    let criticality = new Map()
    withDates.forEach(t => criticality.set(t.id, 0))

    withDates.forEach(task => {
      if (task.dependencies.length === 0) {
        criticality.set(task.id, Math.ceil((new Date(task.endDate) - new Date(startDate)) / (24 * 60 * 60 * 1000)))
      }
    })

    withDates.forEach(task => {
      if (task.dependencies.length > 0) {
        const maxDepCriticality = Math.max(...task.dependencies.map(dep => criticality.get(dep) || 0))
        criticality.set(task.id, maxDepCriticality + Math.ceil((new Date(task.endDate) - new Date(task.startDate)) / (24 * 60 * 60 * 1000)))
      }
    })

    const maxCriticality = Math.max(...Array.from(criticality.values()))
    return Array.from(criticality.entries())
      .filter(([_, v]) => v === maxCriticality)
      .map(([k, _]) => k)
  }

  const criticalPath = findCriticalPath()

  const updateTask = (id, field, value) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, [field]: value } : task))
  }

  const addTask = () => {
    const newId = Math.max(...tasks.map(t => t.id), 0) + 1
    setTasks([...tasks, { id: newId, name: '', duration: 5, durationType: 'days', dependencies: [], assignee: '', startDate: null, endDate: null }])
  }

  const removeTask = (id) => {
    if (tasks.length > 1) {
      setTasks(tasks.filter(t => t.id !== id).map(t => ({
        ...t,
        dependencies: t.dependencies.filter(dep => dep !== id)
      })))
    }
  }

  const moveTask = (id, direction) => {
    const idx = tasks.findIndex(t => t.id === id)
    if ((direction === 'up' && idx > 0) || (direction === 'down' && idx < tasks.length - 1)) {
      const newTasks = [...tasks]
      const target = direction === 'up' ? idx - 1 : idx + 1
      ;[newTasks[idx], newTasks[target]] = [newTasks[target], newTasks[idx]]
      setTasks(newTasks)
    }
  }

  const generateSummary = () => {
    const lines = [
      `Project Timeline Summary`,
      `Start Date: ${startDate}`,
      `End Date: ${lastEndDate.toISOString().split('T')[0]}`,
      `Total Duration: ${projectDuration} days`,
      ``,
      `Tasks:`,
    ]

    tasksWithDates.forEach(task => {
      if (task.name) {
        const duration = `${task.duration} ${task.durationType}`
        const start = task.startDate.toISOString().split('T')[0]
        const end = task.endDate.toISOString().split('T')[0]
        const isCritical = criticalPath.includes(task.id) ? ' [CRITICAL PATH]' : ''
        lines.push(`- ${task.name}: ${duration} (${start} to ${end})${isCritical}`)
      }
    })

    return lines.join('\n')
  }

  const timelineStart = new Date(startDate)
  const timelineEnd = lastEndDate
  const totalDays = Math.ceil((timelineEnd - timelineStart) / (24 * 60 * 60 * 1000))

  return (
    <>
      <SEOHead
        title="Project Timeline Estimator | UnTrackt"
        description="Estimate project timelines with task dependencies. Create Gantt charts, calculate critical paths, export summaries. Browser-based."
        path="/tools/project-timeline-estimator"
        toolName="Project Timeline Estimator"
      />


      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Project Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Working Hours per Day</label>
              <input
                type="number"
                value={workingHoursPerDay}
                onChange={e => setWorkingHoursPerDay(parseFloat(e.target.value) || 8)}
                className="input-field"
                min="1"
                max="24"
              />
            </div>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={excludeWeekends}
                onChange={e => setExcludeWeekends(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm text-gray-700">Exclude weekends</span>
            </label>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-3">
            <h3 className="font-semibold text-gray-900">Summary</h3>
            <div>
              <p className="text-sm text-gray-600">Project Duration</p>
              <p className="text-2xl font-bold text-gray-900">{projectDuration} days</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">End Date</p>
              <p className="text-lg font-semibold text-gray-900">{timelineEnd.toISOString().split('T')[0]}</p>
            </div>
            <CopyButton text={generateSummary()} label="Copy Summary" className="w-full justify-center" />
          </div>
        </div>

        {/* Tasks and Gantt */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tasks Manager */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-4">
            <h2 className="font-semibold text-gray-900">Tasks</h2>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {tasks.map((task, idx) => (
                <div key={task.id} className="p-3 bg-gray-50 rounded-lg space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs text-gray-600 block mb-1">Task Name</label>
                      <input
                        type="text"
                        value={task.name}
                        onChange={e => updateTask(task.id, 'name', e.target.value)}
                        className="input-field text-sm"
                        placeholder="Task name"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-600 block mb-1">Assignee</label>
                      <input
                        type="text"
                        value={task.assignee}
                        onChange={e => updateTask(task.id, 'assignee', e.target.value)}
                        className="input-field text-sm"
                        placeholder="Name"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs text-gray-600 block mb-1">Duration</label>
                      <input
                        type="number"
                        value={task.duration}
                        onChange={e => updateTask(task.id, 'duration', e.target.value)}
                        className="input-field text-sm"
                        min="1"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-600 block mb-1">Type</label>
                      <select
                        value={task.durationType}
                        onChange={e => updateTask(task.id, 'durationType', e.target.value)}
                        className="input-field text-sm"
                      >
                        <option value="days">Days</option>
                        <option value="hours">Hours</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-gray-600 block mb-1">Dependencies</label>
                    <select
                      multiple
                      value={task.dependencies}
                      onChange={e => updateTask(task.id, 'dependencies', Array.from(e.target.selectedOptions, o => parseInt(o.value)))}
                      className="input-field text-sm"
                      size="2"
                    >
                      {tasks.filter(t => t.id !== task.id && t.name).map(t => (
                        <option key={t.id} value={t.id}>{t.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex gap-1 justify-end">
                    <button onClick={() => moveTask(task.id, 'up')} disabled={idx === 0} className="p-1 hover:bg-gray-200 rounded disabled:opacity-50">
                      <ChevronUp className="w-4 h-4" />
                    </button>
                    <button onClick={() => moveTask(task.id, 'down')} disabled={idx === tasks.length - 1} className="p-1 hover:bg-gray-200 rounded disabled:opacity-50">
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    <button onClick={() => removeTask(task.id)} disabled={tasks.length === 1} className="p-1 hover:bg-red-100 rounded disabled:opacity-50">
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={addTask} className="btn-secondary w-full">
              <Plus className="w-4 h-4" />
              Add Task
            </button>
          </div>

          {/* Gantt Chart */}
          {totalDays > 0 && (
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h2 className="font-semibold text-gray-900 mb-4">Timeline Visualization</h2>
              <div className="overflow-x-auto">
                <svg width={Math.max(800, totalDays * 40)} height={tasks.length * 50 + 60} className="min-w-full">
                  {/* Timeline header */}
                  <text x="150" y="20" className="text-xs font-semibold" fill="#666">
                    Days
                  </text>
                  {Array.from({ length: Math.ceil(totalDays / 5) + 1 }).map((_, i) => {
                    const day = i * 5
                    const x = 150 + day * 40 / 5
                    return (
                      <g key={`day-${i}`}>
                        <line x1={x} y1="30" x2={x} y2="35" stroke="#ddd" strokeWidth="1" />
                        <text x={x} y="50" className="text-xs" fill="#999" textAnchor="middle">
                          {day}
                        </text>
                      </g>
                    )
                  })}

                  {/* Task bars */}
                  {tasksWithDates.map((task, idx) => {
                    if (!task.name) return null
                    const taskStart = task.startDate || timelineStart
                    const taskDayStart = (new Date(taskStart) - timelineStart) / (24 * 60 * 60 * 1000)
                    const taskDayDuration = (new Date(task.endDate) - new Date(taskStart)) / (24 * 60 * 60 * 1000)

                    const isCritical = criticalPath.includes(task.id)
                    const color = isCritical ? '#ef4444' : '#3b82f6'
                    const barX = 150 + taskDayStart * (40 / 5)
                    const barWidth = Math.max(taskDayDuration * (40 / 5), 2)
                    const barY = 60 + idx * 50

                    return (
                      <g key={`task-${task.id}`}>
                        <rect x={barX} y={barY} width={barWidth} height="40" fill={color} rx="3" />
                        <text
                          x={barX + barWidth / 2}
                          y={barY + 25}
                          className="text-xs font-semibold"
                          fill="white"
                          textAnchor="middle"
                          pointerEvents="none"
                        >
                          {task.name}
                        </text>
                      </g>
                    )
                  })}

                  {/* Task labels on left */}
                  {tasksWithDates.map((task, idx) => {
                    if (!task.name) return null
                    const barY = 60 + idx * 50
                    return (
                      <text key={`label-${task.id}`} x="5" y={barY + 25} className="text-xs" fill="#333" dominantBaseline="middle">
                        {task.name}
                      </text>
                    )
                  })}
                </svg>
              </div>
              <p className="text-xs text-gray-600 mt-2">
                <span className="inline-block w-3 h-3 bg-red-500 rounded mr-1 align-middle" /> Critical Path
              </p>
            </div>
          )}

          {/* Detailed Timeline Table */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 overflow-x-auto">
            <h2 className="font-semibold text-gray-900 mb-4">Detailed Timeline</h2>
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-3 py-2 font-semibold text-gray-700">Task</th>
                  <th className="text-center px-3 py-2 font-semibold text-gray-700">Duration</th>
                  <th className="text-left px-3 py-2 font-semibold text-gray-700">Start</th>
                  <th className="text-left px-3 py-2 font-semibold text-gray-700">End</th>
                  <th className="text-left px-3 py-2 font-semibold text-gray-700">Assignee</th>
                </tr>
              </thead>
              <tbody>
                {tasksWithDates.filter(task => task.name).map((task, idx, namedTasks) => {
                  const isCritical = criticalPath.includes(task.id)
                  const bgClass = isCritical && idx !== namedTasks.length - 1 ? 'bg-red-50' : ''
                  return (
                    <tr key={task.id} className={`border-b border-gray-200 ${bgClass}`}>
                      <td className="px-3 py-2 text-gray-900 font-medium">{task.name}</td>
                      <td className="px-3 py-2 text-center text-gray-900">{task.duration} {task.durationType}</td>
                      <td className="px-3 py-2 text-gray-900">{new Date(task.startDate).toISOString().split('T')[0]}</td>
                      <td className="px-3 py-2 text-gray-900">{new Date(task.endDate).toISOString().split('T')[0]}</td>
                      <td className="px-3 py-2 text-gray-700">{task.assignee || '-'}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}
