import { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import SEOHead from '../../components/SEOHead.jsx'
import DisclaimerCard from '../../components/DisclaimerCard.jsx'

export default function SavingsGoalCalculator() {
  const [goals, setGoals] = useState([
    { id: 1, name: 'Emergency Fund', target: 10000, current: 2000, deadline: '2025-12-31' }
  ])

  const addGoal = () => setGoals([...goals, { id: Math.max(...goals.map(g => g.id), 0) + 1, name: '', target: 0, current: 0, deadline: '' }])
  const removeGoal = (id) => setGoals(goals.filter(g => g.id !== id))
  const updateGoal = (id, field, value) => setGoals(goals.map(g => g.id === id ? { ...g, [field]: value } : g))

  const fmt = (v) => v.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

  const getProgress = (goal) => {
    if (!goal.deadline) return 0
    const today = new Date()
    const deadline = new Date(goal.deadline)
    const start = new Date(2024, 0, 1)
    const totalDays = (deadline - start) / (1000 * 60 * 60 * 24)
    const elapsedDays = (today - start) / (1000 * 60 * 60 * 24)
    return Math.min(100, Math.max(0, (elapsedDays / totalDays) * 100))
  }

  const getRemainingDays = (deadline) => {
    if (!deadline) return null
    const today = new Date()
    const target = new Date(deadline)
    const days = Math.ceil((target - today) / (1000 * 60 * 60 * 24))
    return days
  }

  const getMonthlyNeeded = (goal) => {
    const remaining = Math.max(0, goal.target - goal.current)
    const days = getRemainingDays(goal.deadline)
    if (!days || days <= 0) return remaining
    const months = days / 30
    return remaining / months
  }

  const getTotalProgress = () => {
    const totalTarget = goals.reduce((s, g) => s + parseFloat(g.target) || 0, 0)
    const totalCurrent = goals.reduce((s, g) => s + parseFloat(g.current) || 0, 0)
    if (totalTarget === 0) return 0
    return (totalCurrent / totalTarget) * 100
  }

  const totalMonthlyNeeded = goals.reduce((s, g) => s + getMonthlyNeeded(g), 0)

  return (
    <>
      <SEOHead
        title="Savings Goal Calculator | UnTrackt"
        description="Track multiple savings goals, monitor progress toward targets, calculate monthly savings needed."
        path="/tools/savings-goal-calculator"
        toolName="Savings Goal Calculator"
      />

      <DisclaimerCard type="finance" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {goals.map(goal => {
            const progress = (goal.current / goal.target) * 100
            const remaining = Math.max(0, goal.target - goal.current)
            const days = getRemainingDays(goal.deadline)
            const monthly = getMonthlyNeeded(goal)

            return (
              <div key={goal.id} className="border border-gray-200 rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-start gap-2">
                  <input
                    type="text"
                    value={goal.name}
                    onChange={e => updateGoal(goal.id, 'name', e.target.value)}
                    placeholder="Goal name"
                    className="input-field flex-1"
                  />
                  <button onClick={() => removeGoal(goal.id)} className="p-2 hover:bg-red-100 rounded"><Trash2 className="w-4 h-4 text-red-600" /></button>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-xs font-semibold text-gray-600">Target</label>
                    <input
                      type="number"
                      value={goal.target}
                      onChange={e => updateGoal(goal.id, 'target', e.target.value)}
                      className="input-field"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-600">Saved</label>
                    <input
                      type="number"
                      value={goal.current}
                      onChange={e => updateGoal(goal.id, 'current', e.target.value)}
                      className="input-field"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-600">Deadline</label>
                    <input
                      type="date"
                      value={goal.deadline}
                      onChange={e => updateGoal(goal.id, 'deadline', e.target.value)}
                      className="input-field"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-600">{fmt(goal.current)} of {fmt(goal.target)}</span>
                    <span className="font-semibold">{progress.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${Math.min(100, progress)}%` }}></div>
                  </div>
                </div>

                {days && days > 0 && (
                  <div className="grid grid-cols-2 gap-2 text-xs bg-gray-50 p-2 rounded">
                    <div><span className="text-gray-600">Days Left:</span> <span className="font-semibold">{days}</span></div>
                    <div><span className="text-gray-600">Need/Month:</span> <span className="font-semibold">{fmt(monthly)}</span></div>
                    <div className="col-span-2"><span className="text-gray-600">Remaining:</span> <span className="font-semibold text-red-600">{fmt(remaining)}</span></div>
                  </div>
                )}
              </div>
            )
          })}
          <button onClick={addGoal} className="btn-secondary"><Plus className="w-4 h-4" /> Add Goal</button>
        </div>

        <div className="sticky top-6 h-fit space-y-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
            <p className="text-sm text-blue-600 mb-1">OVERALL PROGRESS</p>
            <p className="text-4xl font-bold text-blue-700 mb-2">{getTotalProgress().toFixed(1)}%</p>
            <div className="w-full bg-blue-200 rounded-full h-3">
              <div className="bg-blue-600 h-3 rounded-full" style={{ width: `${Math.min(100, getTotalProgress())}%` }}></div>
            </div>
          </div>

          <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
            <p className="text-xs font-semibold text-amber-600 mb-1">TOTAL MONTHLY NEEDED</p>
            <p className="text-2xl font-bold text-amber-700">{fmt(totalMonthlyNeeded)}</p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200 text-sm">
            <p className="font-semibold text-gray-700 mb-2">Goals ({goals.length})</p>
            <div className="space-y-1 text-xs">
              {goals.map(g => <div key={g.id} className="flex justify-between"><span className="text-gray-600 truncate">{g.name || 'Goal'}</span><span className="font-semibold">{((g.current / g.target) * 100).toFixed(0)}%</span></div>)}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
