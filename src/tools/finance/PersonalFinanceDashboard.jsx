import { useState, useMemo } from 'react'
import { TrendingUp, TrendingDown, DollarSign, PiggyBank, ArrowRight, ChevronLeft, ChevronRight, BarChart3, PieChart, Target, AlertTriangle } from 'lucide-react'
import { Link } from 'react-router-dom'
import SEOHead from '../../components/SEOHead.jsx'
import { getItem } from '../../utils/storage.js'
import { formatCurrency, getCurrencySymbol } from '../../utils/currency.js'

const EXPENSE_STORAGE_KEY = 'untrackt_daily_expenses'

function getToday() {
  return new Date().toISOString().slice(0, 10)
}

function getMonthKey(date) {
  return date.slice(0, 7)
}

function getMonthLabel(ym) {
  const [y, m] = ym.split('-')
  return new Date(parseInt(y), parseInt(m) - 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

function getDaysInMonth(ym) {
  const [y, m] = ym.split('-')
  return new Date(parseInt(y), parseInt(m), 0).getDate()
}

const fmt = (v) => formatCurrency(v, { maximumFractionDigits: 0 })
const fmt2 = (v) => formatCurrency(v, { minimumFractionDigits: 2, maximumFractionDigits: 2 })

export default function PersonalFinanceDashboard() {
  const [selectedMonth, setSelectedMonth] = useState(getToday().slice(0, 7))
  const [view, setView] = useState('overview')

  const data = useMemo(() => {
    const saved = getItem(EXPENSE_STORAGE_KEY, null)
    if (saved) {
      return {
        expenses: saved.expenses || [],
        incomes: saved.incomes || [],
        categories: saved.categories || [],
        incomeSources: saved.incomeSources || [],
        monthlyBudget: saved.monthlyBudget || 0,
        categoryBudgets: saved.categoryBudgets || {},
      }
    }
    return { expenses: [], incomes: [], categories: [], incomeSources: [], monthlyBudget: 0, categoryBudgets: {} }
  }, [selectedMonth]) // re-read on month change in case data was updated

  const hasData = data.expenses.length > 0 || data.incomes.length > 0

  // ─── Monthly computations ────────────────────────────────
  const monthExpenses = useMemo(() =>
    data.expenses.filter(e => getMonthKey(e.date) === selectedMonth),
    [data.expenses, selectedMonth]
  )
  const monthIncomes = useMemo(() =>
    data.incomes.filter(e => getMonthKey(e.date) === selectedMonth),
    [data.incomes, selectedMonth]
  )

  const totalExpenses = useMemo(() => monthExpenses.reduce((s, e) => s + e.amount, 0), [monthExpenses])
  const totalIncome = useMemo(() => monthIncomes.reduce((s, e) => s + e.amount, 0), [monthIncomes])
  const netCashFlow = totalIncome - totalExpenses
  const savingsRate = totalIncome > 0 ? (netCashFlow / totalIncome) * 100 : 0

  // ─── Daily spending for the month ──────────────────────────
  const dailySpending = useMemo(() => {
    const days = getDaysInMonth(selectedMonth)
    const result = []
    for (let d = 1; d <= days; d++) {
      const dateStr = `${selectedMonth}-${String(d).padStart(2, '0')}`
      const dayExp = data.expenses.filter(e => e.date === dateStr).reduce((s, e) => s + e.amount, 0)
      const dayInc = data.incomes.filter(e => e.date === dateStr).reduce((s, e) => s + e.amount, 0)
      result.push({ day: d, expenses: dayExp, income: dayInc })
    }
    return result
  }, [data.expenses, data.incomes, selectedMonth])

  // ─── Category breakdown ────────────────────────────────────
  const categoryBreakdown = useMemo(() => {
    const map = {}
    monthExpenses.forEach(e => {
      map[e.category] = (map[e.category] || 0) + e.amount
    })
    return Object.entries(map)
      .map(([catId, total]) => {
        const cat = data.categories.find(c => c.id === catId) || { name: catId, color: '#6b7280', icon: '📦' }
        return { ...cat, catId, total, percent: totalExpenses > 0 ? (total / totalExpenses) * 100 : 0 }
      })
      .sort((a, b) => b.total - a.total)
  }, [monthExpenses, totalExpenses, data.categories])

  // ─── Income source breakdown ───────────────────────────────
  const incomeBreakdown = useMemo(() => {
    const map = {}
    monthIncomes.forEach(e => {
      map[e.source] = (map[e.source] || 0) + e.amount
    })
    return Object.entries(map)
      .map(([srcId, total]) => {
        const src = data.incomeSources.find(s => s.id === srcId) || { name: srcId, color: '#10b981', icon: '💵' }
        return { ...src, srcId, total, percent: totalIncome > 0 ? (total / totalIncome) * 100 : 0 }
      })
      .sort((a, b) => b.total - a.total)
  }, [monthIncomes, totalIncome, data.incomeSources])

  // ─── 6-month trend ─────────────────────────────────────────
  const trendData = useMemo(() => {
    const months = []
    const [sy, sm] = selectedMonth.split('-').map(Number)
    for (let i = 5; i >= 0; i--) {
      let m = sm - i
      let y = sy
      while (m <= 0) { m += 12; y-- }
      const key = `${y}-${String(m).padStart(2, '0')}`
      const expTotal = data.expenses.filter(e => getMonthKey(e.date) === key).reduce((s, e) => s + e.amount, 0)
      const incTotal = data.incomes.filter(e => getMonthKey(e.date) === key).reduce((s, e) => s + e.amount, 0)
      const net = incTotal - expTotal
      const rate = incTotal > 0 ? (net / incTotal) * 100 : 0
      months.push({ key, label: new Date(y, m - 1).toLocaleDateString('en-US', { month: 'short' }), expenses: expTotal, income: incTotal, net, savingsRate: rate })
    }
    return months
  }, [data.expenses, data.incomes, selectedMonth])

  const maxTrendValue = useMemo(() => Math.max(...trendData.map(m => Math.max(m.expenses, m.income)), 1), [trendData])

  // ─── Budget vs Actual ──────────────────────────────────────
  const budgetUsed = data.monthlyBudget > 0 ? (totalExpenses / data.monthlyBudget) * 100 : 0

  // ─── Projected month-end ───────────────────────────────────
  const projected = useMemo(() => {
    const today = getToday()
    const currentMonth = getMonthKey(today)
    if (selectedMonth !== currentMonth) return { expenses: totalExpenses, income: totalIncome }
    const dayOfMonth = parseInt(today.slice(8, 10))
    if (dayOfMonth === 0) return { expenses: 0, income: 0 }
    const daysInMonth = getDaysInMonth(selectedMonth)
    return {
      expenses: (totalExpenses / dayOfMonth) * daysInMonth,
      income: (totalIncome / dayOfMonth) * daysInMonth,
    }
  }, [totalExpenses, totalIncome, selectedMonth])

  // ─── Top spending days ─────────────────────────────────────
  const topSpendingDays = useMemo(() =>
    [...dailySpending].filter(d => d.expenses > 0).sort((a, b) => b.expenses - a.expenses).slice(0, 5),
    [dailySpending]
  )

  // ─── Month navigation ─────────────────────────────────────
  const navigateMonth = (direction) => {
    const [y, m] = selectedMonth.split('-').map(Number)
    let newM = m + direction
    let newY = y
    if (newM > 12) { newM = 1; newY++ }
    if (newM < 1) { newM = 12; newY-- }
    setSelectedMonth(`${newY}-${String(newM).padStart(2, '0')}`)
  }

  // ─── Cash flow rating ─────────────────────────────────────
  const getHealthStatus = () => {
    if (!hasData) return { label: 'No Data', color: 'gray', advice: 'Start tracking in the Daily Expense Tracker to see insights here.' }
    if (savingsRate >= 30) return { label: 'Excellent', color: 'green', advice: 'Great job! You\'re saving more than 30% of your income.' }
    if (savingsRate >= 15) return { label: 'Good', color: 'blue', advice: 'Solid savings rate. Aim for 30%+ to accelerate your goals.' }
    if (savingsRate >= 0) return { label: 'Fair', color: 'yellow', advice: 'You\'re spending most of your income. Look for areas to cut.' }
    return { label: 'Negative', color: 'red', advice: 'You\'re spending more than you earn. Review your expenses urgently.' }
  }

  const health = getHealthStatus()

  const VIEWS = [
    { id: 'overview', label: 'Overview' },
    { id: 'cashflow', label: 'Cash Flow' },
    { id: 'savings', label: 'Savings' },
    { id: 'trends', label: 'Trends' },
  ]

  return (
    <>
      <SEOHead
        title="Personal Finance Dashboard | UnTrackt"
        description="Get a complete overview of your income vs expenses, net cash flow, and savings rate. Powered by your Daily Expense Tracker data."
        path="/tools/personal-finance-dashboard"
        toolName="Personal Finance Dashboard"
      />

      <div className="space-y-6">
        {/* Month navigation + view tabs */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button onClick={() => navigateMonth(-1)} className="p-2 hover:bg-gray-100 rounded-lg" aria-label="Previous month">
              <ChevronLeft size={18} />
            </button>
            <h2 className="text-lg font-semibold text-gray-900 min-w-[180px] text-center">{getMonthLabel(selectedMonth)}</h2>
            <button onClick={() => navigateMonth(1)} className="p-2 hover:bg-gray-100 rounded-lg" aria-label="Next month">
              <ChevronRight size={18} />
            </button>
          </div>
          <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
            {VIEWS.map(v => (
              <button
                key={v.id}
                onClick={() => setView(v.id)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${view === v.id ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>

        {/* No data state */}
        {!hasData && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-8 text-center">
            <AlertTriangle className="mx-auto mb-3 text-amber-500" size={32} />
            <h3 className="font-semibold text-gray-900 mb-2">No Data Yet</h3>
            <p className="text-sm text-gray-600 mb-4">This dashboard reads data from the Daily Expense Tracker. Start logging your income and expenses there to see insights here.</p>
            <Link to="/tools/daily-expense-tracker" className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
              Open Expense Tracker <ArrowRight size={16} />
            </Link>
          </div>
        )}

        {hasData && view === 'overview' && (
          <>
            {/* KPI cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp size={14} className="text-green-600" />
                  <p className="text-xs text-green-600 font-medium">Total Income</p>
                </div>
                <p className="text-xl font-bold text-green-700">{fmt(totalIncome)}</p>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingDown size={14} className="text-red-600" />
                  <p className="text-xs text-red-600 font-medium">Total Expenses</p>
                </div>
                <p className="text-xl font-bold text-red-700">{fmt(totalExpenses)}</p>
              </div>
              <div className={`border rounded-xl p-4 ${netCashFlow >= 0 ? 'bg-blue-50 border-blue-200' : 'bg-orange-50 border-orange-200'}`}>
                <div className="flex items-center gap-2 mb-1">
                  <DollarSign size={14} className={netCashFlow >= 0 ? 'text-blue-600' : 'text-orange-600'} />
                  <p className={`text-xs font-medium ${netCashFlow >= 0 ? 'text-blue-600' : 'text-orange-600'}`}>Net Cash Flow</p>
                </div>
                <p className={`text-xl font-bold ${netCashFlow >= 0 ? 'text-blue-700' : 'text-orange-700'}`}>{fmt(netCashFlow)}</p>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-1">
                  <PiggyBank size={14} className="text-purple-600" />
                  <p className="text-xs text-purple-600 font-medium">Savings Rate</p>
                </div>
                <p className="text-xl font-bold text-purple-700">{savingsRate.toFixed(1)}%</p>
              </div>
            </div>

            {/* Health indicator */}
            <div className={`border rounded-xl p-4 ${
              health.color === 'green' ? 'bg-green-50 border-green-200' :
              health.color === 'blue' ? 'bg-blue-50 border-blue-200' :
              health.color === 'yellow' ? 'bg-yellow-50 border-yellow-200' :
              'bg-red-50 border-red-200'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-900">Financial Health: <span className={
                    health.color === 'green' ? 'text-green-700' :
                    health.color === 'blue' ? 'text-blue-700' :
                    health.color === 'yellow' ? 'text-yellow-700' :
                    'text-red-700'
                  }>{health.label}</span></p>
                  <p className="text-xs text-gray-600 mt-1">{health.advice}</p>
                </div>
              </div>
            </div>

            {/* Income vs Expense bar */}
            {totalIncome > 0 || totalExpenses > 0 ? (
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Income vs Expenses</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-green-700 font-medium">Income</span>
                      <span className="text-green-700 font-semibold">{fmt(totalIncome)}</span>
                    </div>
                    <div className="h-6 bg-gray-100 rounded-lg overflow-hidden">
                      <div className="h-full bg-green-500 rounded-lg transition-all" style={{ width: `${Math.min(100, totalIncome > 0 ? (totalIncome / Math.max(totalIncome, totalExpenses)) * 100 : 0)}%` }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-red-700 font-medium">Expenses</span>
                      <span className="text-red-700 font-semibold">{fmt(totalExpenses)}</span>
                    </div>
                    <div className="h-6 bg-gray-100 rounded-lg overflow-hidden">
                      <div className="h-full bg-red-500 rounded-lg transition-all" style={{ width: `${Math.min(100, totalExpenses > 0 ? (totalExpenses / Math.max(totalIncome, totalExpenses)) * 100 : 0)}%` }} />
                    </div>
                  </div>
                </div>
                {data.monthlyBudget > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Budget Usage</span>
                      <span className={`font-semibold ${budgetUsed > 100 ? 'text-red-600' : budgetUsed > 80 ? 'text-yellow-600' : 'text-green-600'}`}>
                        {budgetUsed.toFixed(0)}% of {fmt(data.monthlyBudget)}
                      </span>
                    </div>
                    <div className="h-3 bg-gray-100 rounded-lg overflow-hidden">
                      <div
                        className={`h-full rounded-lg transition-all ${budgetUsed > 100 ? 'bg-red-500' : budgetUsed > 80 ? 'bg-yellow-500' : 'bg-green-500'}`}
                        style={{ width: `${Math.min(100, budgetUsed)}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            ) : null}

            {/* Quick breakdown row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Top expense categories */}
              {categoryBreakdown.length > 0 && (
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Top Spending Categories</h3>
                  <div className="space-y-3">
                    {categoryBreakdown.slice(0, 6).map((cat) => (
                      <div key={cat.catId}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-700">{cat.icon} {cat.name}</span>
                          <span className="text-gray-900 font-medium">{fmt(cat.total)} ({cat.percent.toFixed(0)}%)</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full rounded-full transition-all" style={{ width: `${cat.percent}%`, backgroundColor: cat.color }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Income sources */}
              {incomeBreakdown.length > 0 && (
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Income Sources</h3>
                  <div className="space-y-3">
                    {incomeBreakdown.map((src) => (
                      <div key={src.srcId}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-700">{src.icon} {src.name}</span>
                          <span className="text-gray-900 font-medium">{fmt(src.total)} ({src.percent.toFixed(0)}%)</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full rounded-full transition-all" style={{ width: `${src.percent}%`, backgroundColor: src.color }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Link to Expense Tracker */}
            <div className="text-center">
              <Link to="/tools/daily-expense-tracker" className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium">
                Open Daily Expense Tracker to add entries <ArrowRight size={14} />
              </Link>
            </div>
          </>
        )}

        {hasData && view === 'cashflow' && (
          <>
            {/* Cash flow detail */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="bg-green-50 border border-green-200 rounded-xl p-5">
                <p className="text-xs text-green-600 font-medium mb-1">Money In</p>
                <p className="text-2xl font-bold text-green-700">{fmt(totalIncome)}</p>
                <p className="text-xs text-green-600 mt-2">{monthIncomes.length} transaction{monthIncomes.length !== 1 ? 's' : ''}</p>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-xl p-5">
                <p className="text-xs text-red-600 font-medium mb-1">Money Out</p>
                <p className="text-2xl font-bold text-red-700">{fmt(totalExpenses)}</p>
                <p className="text-xs text-red-600 mt-2">{monthExpenses.length} transaction{monthExpenses.length !== 1 ? 's' : ''}</p>
              </div>
              <div className={`border rounded-xl p-5 ${netCashFlow >= 0 ? 'bg-blue-50 border-blue-200' : 'bg-orange-50 border-orange-200'}`}>
                <p className={`text-xs font-medium mb-1 ${netCashFlow >= 0 ? 'text-blue-600' : 'text-orange-600'}`}>Net Cash Flow</p>
                <p className={`text-2xl font-bold ${netCashFlow >= 0 ? 'text-blue-700' : 'text-orange-700'}`}>{fmt(netCashFlow)}</p>
                <p className={`text-xs mt-2 ${netCashFlow >= 0 ? 'text-blue-600' : 'text-orange-600'}`}>
                  {netCashFlow >= 0 ? 'Surplus' : 'Deficit'}
                </p>
              </div>
            </div>

            {/* Projected month-end */}
            {getMonthKey(getToday()) === selectedMonth && (
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Projected Month-End</h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Projected Income</p>
                    <p className="text-lg font-bold text-green-700">{fmt(projected.income)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Projected Expenses</p>
                    <p className="text-lg font-bold text-red-700">{fmt(projected.expenses)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Projected Net</p>
                    <p className={`text-lg font-bold ${projected.income - projected.expenses >= 0 ? 'text-blue-700' : 'text-orange-700'}`}>
                      {fmt(projected.income - projected.expenses)}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Daily cash flow chart */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Daily Cash Flow</h3>
              <div className="overflow-x-auto">
                <div className="flex items-end gap-1 min-w-[500px]" style={{ height: 160 }}>
                  {dailySpending.map((d) => {
                    const maxVal = Math.max(...dailySpending.map(x => Math.max(x.expenses, x.income)), 1)
                    const expH = maxVal > 0 ? (d.expenses / maxVal) * 140 : 0
                    const incH = maxVal > 0 ? (d.income / maxVal) * 140 : 0
                    return (
                      <div key={d.day} className="flex-1 flex flex-col items-center gap-0.5" title={`Day ${d.day}: In ${fmt2(d.income)}, Out ${fmt2(d.expenses)}`}>
                        <div className="w-full flex gap-0.5 items-end" style={{ height: 140 }}>
                          <div className="flex-1 bg-green-400 rounded-t transition-all" style={{ height: Math.max(incH, d.income > 0 ? 2 : 0) }} />
                          <div className="flex-1 bg-red-400 rounded-t transition-all" style={{ height: Math.max(expH, d.expenses > 0 ? 2 : 0) }} />
                        </div>
                        <span className="text-[9px] text-gray-400">{d.day}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                <span className="flex items-center gap-1"><span className="w-3 h-2 bg-green-400 rounded" /> Income</span>
                <span className="flex items-center gap-1"><span className="w-3 h-2 bg-red-400 rounded" /> Expenses</span>
              </div>
            </div>

            {/* Top spending days */}
            {topSpendingDays.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Top Spending Days</h3>
                <div className="space-y-2">
                  {topSpendingDays.map((d) => (
                    <div key={d.day} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                      <span className="text-sm text-gray-700 font-medium">{selectedMonth}-{String(d.day).padStart(2, '0')}</span>
                      <span className="text-sm font-semibold text-red-700">{fmt2(d.expenses)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {hasData && view === 'savings' && (
          <>
            {/* Savings rate gauge */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
              <h3 className="font-semibold text-gray-900 mb-2">Current Savings Rate</h3>
              <div className="relative w-48 h-48 mx-auto mb-4">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#f3f4f6" strokeWidth="10" />
                  <circle
                    cx="50" cy="50" r="40" fill="none"
                    stroke={savingsRate >= 30 ? '#22c55e' : savingsRate >= 15 ? '#3b82f6' : savingsRate >= 0 ? '#eab308' : '#ef4444'}
                    strokeWidth="10"
                    strokeDasharray={`${Math.max(0, Math.min(100, savingsRate)) * 2.51} 251`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold text-gray-900">{savingsRate.toFixed(1)}%</span>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                You saved <span className="font-semibold">{fmt(Math.max(0, netCashFlow))}</span> out of <span className="font-semibold">{fmt(totalIncome)}</span> income this month.
              </p>
            </div>

            {/* Savings benchmarks */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Savings Rate Benchmarks</h3>
              <div className="space-y-3">
                {[
                  { label: 'Basic Safety Net', target: 10, color: 'yellow' },
                  { label: 'Comfortable Saving', target: 20, color: 'blue' },
                  { label: 'Aggressive / FIRE', target: 30, color: 'green' },
                  { label: 'Extreme Saver', target: 50, color: 'purple' },
                ].map(b => (
                  <div key={b.target}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700">{b.label} ({b.target}%)</span>
                      <span className={`text-sm font-semibold ${savingsRate >= b.target ? 'text-green-600' : 'text-gray-400'}`}>
                        {savingsRate >= b.target ? '✓ Achieved' : `Need ${fmt(totalIncome * b.target / 100 - Math.max(0, netCashFlow))} more`}
                      </span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${savingsRate >= b.target ? 'bg-green-500' : 'bg-gray-300'}`}
                        style={{ width: `${Math.min(100, (savingsRate / b.target) * 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Monthly savings trend */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Savings Rate Trend (6 Months)</h3>
              <div className="overflow-x-auto">
                <div className="flex items-end gap-3 min-w-[400px]" style={{ height: 180 }}>
                  {trendData.map((m) => {
                    const rate = m.savingsRate
                    const h = Math.max(0, Math.min(rate, 100)) * 1.5
                    return (
                      <div key={m.key} className="flex-1 flex flex-col items-center" title={`${m.label}: ${rate.toFixed(1)}% savings rate`}>
                        <span className="text-[10px] text-gray-500 mb-1">{rate.toFixed(0)}%</span>
                        <div className="w-full bg-gray-100 rounded-t" style={{ height: 150 }}>
                          <div
                            className={`w-full rounded-t transition-all ${rate >= 30 ? 'bg-green-500' : rate >= 15 ? 'bg-blue-500' : rate >= 0 ? 'bg-yellow-500' : 'bg-red-500'}`}
                            style={{ height: Math.max(h, rate > 0 ? 4 : 0), marginTop: 150 - Math.max(h, rate > 0 ? 4 : 0) }}
                          />
                        </div>
                        <span className="text-xs text-gray-500 mt-1">{m.label}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </>
        )}

        {hasData && view === 'trends' && (
          <>
            {/* 6-month income vs expense chart */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-4">6-Month Income vs Expenses</h3>
              <div className="overflow-x-auto">
                <div className="flex items-end gap-3 min-w-[400px]" style={{ height: 200 }}>
                  {trendData.map((m) => {
                    const incH = maxTrendValue > 0 ? (m.income / maxTrendValue) * 170 : 0
                    const expH = maxTrendValue > 0 ? (m.expenses / maxTrendValue) * 170 : 0
                    return (
                      <div key={m.key} className="flex-1 flex flex-col items-center">
                        <div className="w-full flex gap-1 items-end" style={{ height: 170 }}>
                          <div className="flex-1 bg-green-400 rounded-t transition-all" style={{ height: Math.max(incH, m.income > 0 ? 4 : 0) }} title={`Income: ${fmt(m.income)}`} />
                          <div className="flex-1 bg-red-400 rounded-t transition-all" style={{ height: Math.max(expH, m.expenses > 0 ? 4 : 0) }} title={`Expenses: ${fmt(m.expenses)}`} />
                        </div>
                        <span className="text-xs text-gray-500 mt-1">{m.label}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                <span className="flex items-center gap-1"><span className="w-3 h-2 bg-green-400 rounded" /> Income</span>
                <span className="flex items-center gap-1"><span className="w-3 h-2 bg-red-400 rounded" /> Expenses</span>
              </div>
            </div>

            {/* Net cash flow trend */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Net Cash Flow Trend</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left px-3 py-2 font-semibold text-gray-700">Month</th>
                      <th className="text-right px-3 py-2 font-semibold text-gray-700">Income</th>
                      <th className="text-right px-3 py-2 font-semibold text-gray-700">Expenses</th>
                      <th className="text-right px-3 py-2 font-semibold text-gray-700">Net</th>
                      <th className="text-right px-3 py-2 font-semibold text-gray-700">Savings %</th>
                    </tr>
                  </thead>
                  <tbody>
                    {trendData.map((m) => (
                      <tr key={m.key} className={`border-b border-gray-100 ${m.key === selectedMonth ? 'bg-blue-50' : 'hover:bg-gray-50'}`}>
                        <td className="px-3 py-2 text-gray-900 font-medium">{m.label}</td>
                        <td className="px-3 py-2 text-right text-green-700">{fmt(m.income)}</td>
                        <td className="px-3 py-2 text-right text-red-700">{fmt(m.expenses)}</td>
                        <td className={`px-3 py-2 text-right font-semibold ${m.net >= 0 ? 'text-blue-700' : 'text-orange-700'}`}>{fmt(m.net)}</td>
                        <td className={`px-3 py-2 text-right ${m.savingsRate >= 20 ? 'text-green-600' : m.savingsRate >= 0 ? 'text-gray-600' : 'text-red-600'}`}>
                          {m.savingsRate.toFixed(1)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Expense category trends */}
            {categoryBreakdown.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Category Spending This Month</h3>
                <div className="space-y-2">
                  {categoryBreakdown.map((cat) => (
                    <div key={cat.catId} className="flex items-center justify-between py-1.5 border-b border-gray-100 last:border-0">
                      <span className="text-sm text-gray-700">{cat.icon} {cat.name}</span>
                      <div className="text-right">
                        <span className="text-sm font-semibold text-gray-900">{fmt(cat.total)}</span>
                        <span className="text-xs text-gray-500 ml-2">{cat.percent.toFixed(0)}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  )
}
