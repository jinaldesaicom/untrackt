import { useState, useEffect, useMemo, useCallback } from 'react'
import { Plus, Trash2, Download, ChevronLeft, ChevronRight, TrendingUp, TrendingDown, DollarSign, PieChart, BarChart3, Filter, Tag, X, Edit2, Check, ArrowUpCircle, ArrowDownCircle, Scale, Calendar, RotateCcw } from 'lucide-react'
import SEOHead from '../../components/SEOHead.jsx'
import { getItem, setItem } from '../../utils/storage.js'
import { formatCurrency, getCurrencySymbol } from '../../utils/currency.js'

const STORAGE_KEY = 'untrackt_daily_expenses'

const DEFAULT_CATEGORIES = [
  { id: 'food', name: 'Food & Dining', color: '#f97316', icon: '🍔' },
  { id: 'transport', name: 'Transport', color: '#3b82f6', icon: '🚗' },
  { id: 'shopping', name: 'Shopping', color: '#a855f7', icon: '🛒' },
  { id: 'bills', name: 'Bills & Utilities', color: '#ef4444', icon: '📄' },
  { id: 'entertainment', name: 'Entertainment', color: '#ec4899', icon: '🎬' },
  { id: 'health', name: 'Health', color: '#10b981', icon: '💊' },
  { id: 'education', name: 'Education', color: '#6366f1', icon: '📚' },
  { id: 'groceries', name: 'Groceries', color: '#14b8a6', icon: '🥦' },
  { id: 'rent', name: 'Rent / Housing', color: '#f59e0b', icon: '🏠' },
  { id: 'subscriptions', name: 'Subscriptions', color: '#8b5cf6', icon: '📱' },
  { id: 'travel', name: 'Travel', color: '#06b6d4', icon: '✈️' },
  { id: 'personal', name: 'Personal Care', color: '#d946ef', icon: '💇' },
  { id: 'gifts', name: 'Gifts & Donations', color: '#f43f5e', icon: '🎁' },
  { id: 'other', name: 'Other', color: '#6b7280', icon: '📦' },
]

const DEFAULT_INCOME_SOURCES = [
  { id: 'salary', name: 'Salary', color: '#10b981', icon: '💰' },
  { id: 'freelance', name: 'Freelance', color: '#06b6d4', icon: '💻' },
  { id: 'investment', name: 'Investment Returns', color: '#8b5cf6', icon: '📈' },
  { id: 'rental', name: 'Rental Income', color: '#f59e0b', icon: '🏘️' },
  { id: 'business', name: 'Business', color: '#3b82f6', icon: '🏢' },
  { id: 'side-hustle', name: 'Side Hustle', color: '#ec4899', icon: '🔧' },
  { id: 'dividends', name: 'Dividends', color: '#7c3aed', icon: '🏦' },
  { id: 'interest', name: 'Interest', color: '#0ea5e9', icon: '🪙' },
  { id: 'pension', name: 'Pension', color: '#65a30d', icon: '🧓' },
  { id: 'commission', name: 'Commission', color: '#d946ef', icon: '🤝' },
  { id: 'bonus', name: 'Bonus', color: '#ea580c', icon: '🎯' },
  { id: 'royalties', name: 'Royalties', color: '#a855f7', icon: '📕' },
  { id: 'gift-income', name: 'Gifts Received', color: '#f43f5e', icon: '🎉' },
  { id: 'refund', name: 'Refund', color: '#14b8a6', icon: '↩️' },
  { id: 'other-income', name: 'Other', color: '#6b7280', icon: '💵' },
]

const VIEWS = [
  { id: 'log', label: 'Log' },
  { id: 'charts', label: 'Charts' },
  { id: 'trends', label: 'Trends' },
  { id: 'balance', label: 'Balance' },
  { id: 'categories', label: 'Categories' },
  { id: 'budget', label: 'Budget' },
]

function getToday() {
  return new Date().toISOString().slice(0, 10)
}

function getMonthKey(date) {
  return date.slice(0, 7)
}

function getMonthName(ym) {
  const [y, m] = ym.split('-')
  return new Date(parseInt(y), parseInt(m) - 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

function getDaysInMonth(ym) {
  const [y, m] = ym.split('-')
  return new Date(parseInt(y), parseInt(m), 0).getDate()
}

function fmt(v) {
  return formatCurrency(v, { minimumFractionDigits: 2 })
}

function fmtShort(v) {
  const sym = getCurrencySymbol()
  if (Math.abs(v) >= 1000) return (v < 0 ? '-' : '') + sym + (Math.abs(v) / 1000).toFixed(1) + 'k'
  return sym + v.toFixed(0)
}

export default function DailyExpenseTracker() {
  const [data, setData] = useState(() => {
    const saved = getItem(STORAGE_KEY, null)
    if (saved) {
      return { expenses: saved.expenses || [], incomes: saved.incomes || [], categories: saved.categories || DEFAULT_CATEGORIES, incomeSources: saved.incomeSources || DEFAULT_INCOME_SOURCES, monthlyBudget: saved.monthlyBudget || 0, categoryBudgets: saved.categoryBudgets || {}, yearlyBudget: saved.yearlyBudget || 0, yearlyCategoryBudgets: saved.yearlyCategoryBudgets || {}, carryForwardEnabled: saved.carryForwardEnabled || false }
    }
    return { expenses: [], incomes: [], categories: DEFAULT_CATEGORIES, incomeSources: DEFAULT_INCOME_SOURCES, monthlyBudget: 0, categoryBudgets: {}, yearlyBudget: 0, yearlyCategoryBudgets: {}, carryForwardEnabled: false }
  })
  const [view, setView] = useState('log')
  const [logTab, setLogTab] = useState('expenses')
  const [selectedMonth, setSelectedMonth] = useState(getToday().slice(0, 7))
  const [filterCategory, setFilterCategory] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)
  const [showCategoryManager, setShowCategoryManager] = useState(false)
  const [showIncomeSourceManager, setShowIncomeSourceManager] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [form, setForm] = useState({ amount: '', description: '', category: 'food', date: getToday() })
  const [incomeForm, setIncomeForm] = useState({ amount: '', description: '', source: 'salary', date: getToday() })
  const [newCat, setNewCat] = useState({ name: '', color: '#6366f1', icon: '📌' })
  const [newSource, setNewSource] = useState({ name: '', color: '#10b981', icon: '💵' })
  const [budgetTab, setBudgetTab] = useState('monthly')

  const categories = data.categories || DEFAULT_CATEGORIES
  const incomeSources = data.incomeSources || DEFAULT_INCOME_SOURCES

  useEffect(() => {
    setItem(STORAGE_KEY, data)
  }, [data])

  // ─── Expense computations ──────────────────────────────────
  const monthExpenses = useMemo(() => {
    let filtered = data.expenses.filter(e => getMonthKey(e.date) === selectedMonth)
    if (filterCategory && logTab === 'expenses') filtered = filtered.filter(e => e.category === filterCategory)
    return filtered.sort((a, b) => b.date.localeCompare(a.date) || b.id - a.id)
  }, [data.expenses, selectedMonth, filterCategory, logTab])

  const allMonthExpenses = useMemo(() => {
    return data.expenses.filter(e => getMonthKey(e.date) === selectedMonth)
  }, [data.expenses, selectedMonth])

  const monthTotal = useMemo(() => allMonthExpenses.reduce((s, e) => s + e.amount, 0), [allMonthExpenses])

  const categoryBreakdown = useMemo(() => {
    const map = {}
    allMonthExpenses.forEach(e => {
      map[e.category] = (map[e.category] || 0) + e.amount
    })
    return Object.entries(map)
      .map(([catId, total]) => {
        const cat = categories.find(c => c.id === catId) || { name: catId, color: '#6b7280', icon: '📦' }
        return { ...cat, total, percent: monthTotal > 0 ? (total / monthTotal) * 100 : 0 }
      })
      .sort((a, b) => b.total - a.total)
  }, [allMonthExpenses, monthTotal, categories])

  const todayExpenses = useMemo(() => {
    const today = getToday()
    return data.expenses.filter(e => e.date === today).reduce((s, e) => s + e.amount, 0)
  }, [data.expenses])

  const dailyAvg = useMemo(() => {
    if (allMonthExpenses.length === 0) return 0
    const uniqueDays = new Set(allMonthExpenses.map(e => e.date)).size
    return monthTotal / uniqueDays
  }, [allMonthExpenses, monthTotal])

  const projectedMonthly = useMemo(() => {
    const daysInMonth = getDaysInMonth(selectedMonth)
    const today = getToday()
    const currentMonth = getMonthKey(today)
    if (selectedMonth !== currentMonth) return monthTotal
    const dayOfMonth = parseInt(today.slice(8, 10))
    if (dayOfMonth === 0) return 0
    return (monthTotal / dayOfMonth) * daysInMonth
  }, [monthTotal, selectedMonth])

  // ─── Income computations ───────────────────────────────────
  const monthIncomes = useMemo(() => {
    let filtered = data.incomes.filter(e => getMonthKey(e.date) === selectedMonth)
    if (filterCategory && logTab === 'income') filtered = filtered.filter(e => e.source === filterCategory)
    return filtered.sort((a, b) => b.date.localeCompare(a.date) || b.id - a.id)
  }, [data.incomes, selectedMonth, filterCategory, logTab])

  const allMonthIncomes = useMemo(() => {
    return data.incomes.filter(e => getMonthKey(e.date) === selectedMonth)
  }, [data.incomes, selectedMonth])

  const monthIncomeTotal = useMemo(() => allMonthIncomes.reduce((s, e) => s + e.amount, 0), [allMonthIncomes])

  const todayIncome = useMemo(() => {
    const today = getToday()
    return data.incomes.filter(e => e.date === today).reduce((s, e) => s + e.amount, 0)
  }, [data.incomes])

  const incomeBreakdown = useMemo(() => {
    const map = {}
    allMonthIncomes.forEach(e => {
      map[e.source] = (map[e.source] || 0) + e.amount
    })
    return Object.entries(map)
      .map(([srcId, total]) => {
        const src = incomeSources.find(s => s.id === srcId) || { name: srcId, color: '#6b7280', icon: '💵' }
        return { ...src, total, percent: monthIncomeTotal > 0 ? (total / monthIncomeTotal) * 100 : 0 }
      })
      .sort((a, b) => b.total - a.total)
  }, [allMonthIncomes, monthIncomeTotal, incomeSources])

  // ─── Carry Forward ─────────────────────────────────────────
  const carryForwardBalance = useMemo(() => {
    if (!data.carryForwardEnabled) return 0
    const [y, m] = selectedMonth.split('-').map(Number)
    let prevM = m - 1, prevY = y
    if (prevM < 1) { prevM = 12; prevY-- }
    const prevKey = `${prevY}-${String(prevM).padStart(2, '0')}`
    const prevInc = data.incomes.filter(e => getMonthKey(e.date) === prevKey).reduce((s, e) => s + e.amount, 0)
    const prevExp = data.expenses.filter(e => getMonthKey(e.date) === prevKey).reduce((s, e) => s + e.amount, 0)
    return Math.max(0, prevInc - prevExp)
  }, [data.expenses, data.incomes, selectedMonth, data.carryForwardEnabled])

  const effectiveMonthIncome = monthIncomeTotal + carryForwardBalance

  // ─── Net / Balance ─────────────────────────────────────────
  const netBalance = effectiveMonthIncome - monthTotal
  const savingsRate = effectiveMonthIncome > 0 ? (netBalance / effectiveMonthIncome) * 100 : 0

  // ─── Yearly computations ───────────────────────────────────
  const selectedYear = selectedMonth.slice(0, 4)

  const yearlyExpenseTotal = useMemo(() => {
    return data.expenses.filter(e => e.date.startsWith(selectedYear)).reduce((s, e) => s + e.amount, 0)
  }, [data.expenses, selectedYear])

  const yearlyIncomeTotal = useMemo(() => {
    return data.incomes.filter(e => e.date.startsWith(selectedYear)).reduce((s, e) => s + e.amount, 0)
  }, [data.incomes, selectedYear])

  const yearlyCategorySpend = useMemo(() => {
    const map = {}
    data.expenses.filter(e => e.date.startsWith(selectedYear)).forEach(e => {
      map[e.category] = (map[e.category] || 0) + e.amount
    })
    return map
  }, [data.expenses, selectedYear])

  // ─── Trend data (6 months, includes income) ────────────────
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
      months.push({ key, label: new Date(y, m - 1).toLocaleDateString('en-US', { month: 'short' }), expenses: expTotal, income: incTotal, net: incTotal - expTotal })
    }
    return months
  }, [data.expenses, data.incomes, selectedMonth])

  const avgMonthly = useMemo(() => {
    const filled = trendData.filter(m => m.expenses > 0)
    if (filled.length === 0) return 0
    return filled.reduce((s, m) => s + m.expenses, 0) / filled.length
  }, [trendData])

  const nextMonthPrediction = useMemo(() => {
    const filled = trendData.filter(m => m.expenses > 0)
    if (filled.length < 2) return avgMonthly
    const n = filled.length
    const xMean = (n - 1) / 2
    const yMean = filled.reduce((s, m) => s + m.expenses, 0) / n
    let num = 0, den = 0
    filled.forEach((m, i) => {
      num += (i - xMean) * (m.expenses - yMean)
      den += (i - xMean) ** 2
    })
    const slope = den !== 0 ? num / den : 0
    return Math.max(0, yMean + slope * (n - xMean))
  }, [trendData, avgMonthly])

  const dailySpendingData = useMemo(() => {
    const days = getDaysInMonth(selectedMonth)
    const result = []
    for (let d = 1; d <= days; d++) {
      const dateStr = `${selectedMonth}-${String(d).padStart(2, '0')}`
      const total = data.expenses.filter(e => e.date === dateStr).reduce((s, e) => s + e.amount, 0)
      result.push({ day: d, total })
    }
    return result
  }, [data.expenses, selectedMonth])

  const maxDailySpend = useMemo(() => Math.max(...dailySpendingData.map(d => d.total), 1), [dailySpendingData])

  // ─── Handlers ──────────────────────────────────────────────
  const handleAddExpense = useCallback(() => {
    const amount = parseFloat(form.amount)
    if (!amount || amount <= 0 || !form.date) return
    if (editingItem) {
      setData(prev => ({
        ...prev,
        expenses: prev.expenses.map(e => e.id === editingItem.id
          ? { ...e, amount, description: form.description.trim(), category: form.category, date: form.date }
          : e)
      }))
      setEditingItem(null)
    } else {
      const expense = { id: Date.now(), amount, description: form.description.trim(), category: form.category, date: form.date }
      setData(prev => ({ ...prev, expenses: [...prev.expenses, expense] }))
    }
    setForm({ amount: '', description: '', category: form.category, date: form.date })
    setShowAddForm(false)
  }, [form, editingItem])

  const handleAddIncome = useCallback(() => {
    const amount = parseFloat(incomeForm.amount)
    if (!amount || amount <= 0 || !incomeForm.date) return
    if (editingItem) {
      setData(prev => ({
        ...prev,
        incomes: prev.incomes.map(e => e.id === editingItem.id
          ? { ...e, amount, description: incomeForm.description.trim(), source: incomeForm.source, date: incomeForm.date }
          : e)
      }))
      setEditingItem(null)
    } else {
      const income = { id: Date.now(), amount, description: incomeForm.description.trim(), source: incomeForm.source, date: incomeForm.date }
      setData(prev => ({ ...prev, incomes: [...prev.incomes, income] }))
    }
    setIncomeForm({ amount: '', description: '', source: incomeForm.source, date: incomeForm.date })
    setShowAddForm(false)
  }, [incomeForm, editingItem])

  const handleEditExpense = useCallback((expense) => {
    setEditingItem(expense)
    setForm({ amount: String(expense.amount), description: expense.description, category: expense.category, date: expense.date })
    setLogTab('expenses')
    setShowAddForm(true)
  }, [])

  const handleEditIncome = useCallback((income) => {
    setEditingItem(income)
    setIncomeForm({ amount: String(income.amount), description: income.description, source: income.source, date: income.date })
    setLogTab('income')
    setShowAddForm(true)
  }, [])

  const handleDeleteExpense = useCallback((id) => {
    setData(prev => ({ ...prev, expenses: prev.expenses.filter(e => e.id !== id) }))
  }, [])

  const handleDeleteIncome = useCallback((id) => {
    setData(prev => ({ ...prev, incomes: prev.incomes.filter(e => e.id !== id) }))
  }, [])

  const handleAddCategory = useCallback(() => {
    if (!newCat.name.trim()) return
    const id = newCat.name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-')
    if (categories.some(c => c.id === id)) return
    setData(prev => ({ ...prev, categories: [...prev.categories, { id, name: newCat.name.trim(), color: newCat.color, icon: newCat.icon }] }))
    setNewCat({ name: '', color: '#6366f1', icon: '📌' })
  }, [newCat, categories])

  const handleRemoveCategory = useCallback((catId) => {
    if (DEFAULT_CATEGORIES.some(c => c.id === catId)) return
    setData(prev => ({
      ...prev,
      categories: prev.categories.filter(c => c.id !== catId),
      expenses: prev.expenses.map(e => e.category === catId ? { ...e, category: 'other' } : e)
    }))
  }, [])

  const handleAddIncomeSource = useCallback(() => {
    if (!newSource.name.trim()) return
    const id = newSource.name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-')
    if (incomeSources.some(s => s.id === id)) return
    setData(prev => ({ ...prev, incomeSources: [...prev.incomeSources, { id, name: newSource.name.trim(), color: newSource.color, icon: newSource.icon }] }))
    setNewSource({ name: '', color: '#10b981', icon: '💵' })
  }, [newSource, incomeSources])

  const handleRemoveIncomeSource = useCallback((srcId) => {
    if (DEFAULT_INCOME_SOURCES.some(s => s.id === srcId)) return
    setData(prev => ({
      ...prev,
      incomeSources: prev.incomeSources.filter(s => s.id !== srcId),
      incomes: prev.incomes.map(e => e.source === srcId ? { ...e, source: 'other-income' } : e)
    }))
  }, [])

  const handleExportCSV = useCallback(() => {
    const rows = [['Date', 'Type', 'Amount', 'Category/Source', 'Description']]
    const allEntries = [
      ...data.expenses.map(e => ({ ...e, type: 'Expense', catName: (categories.find(c => c.id === e.category) || {}).name || e.category })),
      ...data.incomes.map(e => ({ ...e, type: 'Income', catName: (incomeSources.find(s => s.id === e.source) || {}).name || e.source })),
    ].sort((a, b) => a.date.localeCompare(b.date))
    allEntries.forEach(e => {
      rows.push([e.date, e.type, e.amount.toFixed(2), e.catName, e.description])
    })
    rows.push([])
    rows.push(['', '', '', 'Total Income', data.incomes.reduce((s, e) => s + e.amount, 0).toFixed(2)])
    rows.push(['', '', '', 'Total Expenses', data.expenses.reduce((s, e) => s + e.amount, 0).toFixed(2)])
    rows.push(['', '', '', 'Net Balance', (data.incomes.reduce((s, e) => s + e.amount, 0) - data.expenses.reduce((s, e) => s + e.amount, 0)).toFixed(2)])
    const csv = rows.map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `finance-${selectedMonth}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }, [data.expenses, data.incomes, categories, incomeSources, selectedMonth])

  const navigateMonth = (dir) => {
    const [y, m] = selectedMonth.split('-').map(Number)
    let nm = m + dir, ny = y
    if (nm > 12) { nm = 1; ny++ }
    if (nm < 1) { nm = 12; ny-- }
    setSelectedMonth(`${ny}-${String(nm).padStart(2, '0')}`)
  }

  const handleBudgetChange = (val) => {
    const budget = parseFloat(val) || 0
    setData(prev => ({ ...prev, monthlyBudget: budget }))
  }

  const handleCategoryBudget = (catId, val) => {
    const budget = parseFloat(val) || 0
    setData(prev => ({ ...prev, categoryBudgets: { ...prev.categoryBudgets, [catId]: budget } }))
  }

  const handleYearlyBudget = (val) => {
    const budget = parseFloat(val) || 0
    setData(prev => ({ ...prev, yearlyBudget: budget }))
  }

  const handleYearlyCategoryBudget = (catId, val) => {
    const budget = parseFloat(val) || 0
    setData(prev => ({ ...prev, yearlyCategoryBudgets: { ...prev.yearlyCategoryBudgets, [catId]: budget } }))
  }

  const toggleCarryForward = () => {
    setData(prev => ({ ...prev, carryForwardEnabled: !prev.carryForwardEnabled }))
  }

  const getCat = (catId) => categories.find(c => c.id === catId) || { name: catId, color: '#6b7280', icon: '📦' }
  const getSrc = (srcId) => incomeSources.find(s => s.id === srcId) || { name: srcId, color: '#6b7280', icon: '💵' }

  const budgetPercent = data.monthlyBudget > 0 ? Math.min(100, (monthTotal / data.monthlyBudget) * 100) : 0
  const budgetColor = budgetPercent > 90 ? '#ef4444' : budgetPercent > 70 ? '#f59e0b' : '#10b981'

  // ─── Donut chart helper ────────────────────────────────────
  function renderDonut(breakdown, centerAmount, centerLabel, size = 160) {
    if (breakdown.length === 0) return null
    const cx = size / 2, cy = size / 2, r = size * 0.35, stroke = size * 0.12
    let cumulative = 0
    const segments = breakdown.map(cat => {
      const start = cumulative
      cumulative += cat.percent
      return { ...cat, start, end: cumulative }
    })
    return (
      <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-[200px] mx-auto">
        {segments.map((seg, i) => {
          const startAngle = (seg.start / 100) * 360 - 90
          const endAngle = (seg.end / 100) * 360 - 90
          const largeArc = seg.percent > 50 ? 1 : 0
          const x1 = cx + r * Math.cos((startAngle * Math.PI) / 180)
          const y1 = cy + r * Math.sin((startAngle * Math.PI) / 180)
          const x2 = cx + r * Math.cos((endAngle * Math.PI) / 180)
          const y2 = cy + r * Math.sin((endAngle * Math.PI) / 180)
          const d = `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`
          return <path key={i} d={d} fill="none" stroke={seg.color} strokeWidth={stroke} strokeLinecap="butt" />
        })}
        <text x={cx} y={cy - 6} textAnchor="middle" className="fill-gray-800 dark:fill-gray-200" fontSize="16" fontWeight="bold">
          {fmtShort(centerAmount)}
        </text>
        <text x={cx} y={cy + 12} textAnchor="middle" className="fill-gray-500 dark:fill-gray-400" fontSize="10">
          {centerLabel}
        </text>
      </svg>
    )
  }

  // ─── LOG VIEW ──────────────────────────────────────────────
  function renderLog() {
    return (
      <div className="space-y-3">
        {/* Expense / Income toggle */}
        <div className="flex gap-1 p-1 rounded-lg bg-gray-100 dark:bg-gray-800 w-fit">
          <button
            onClick={() => { setLogTab('expenses'); setFilterCategory(''); setShowAddForm(false); setEditingItem(null) }}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${logTab === 'expenses' ? 'bg-white dark:bg-gray-700 text-red-600 dark:text-red-400 shadow-sm' : 'text-gray-500 dark:text-gray-400'}`}
          >
            <ArrowDownCircle className="w-3.5 h-3.5 inline mr-1 -mt-0.5" /> Expenses
          </button>
          <button
            onClick={() => { setLogTab('income'); setFilterCategory(''); setShowAddForm(false); setEditingItem(null) }}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${logTab === 'income' ? 'bg-white dark:bg-gray-700 text-green-600 dark:text-green-400 shadow-sm' : 'text-gray-500 dark:text-gray-400'}`}
          >
            <ArrowUpCircle className="w-3.5 h-3.5 inline mr-1 -mt-0.5" /> Income
          </button>
        </div>

        {logTab === 'expenses' ? renderExpenseLog() : renderIncomeLog()}
      </div>
    )
  }

  function renderExpenseLog() {
    return (
      <div className="space-y-3">
        {/* Filter bar */}
        <div className="flex flex-wrap items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)} className="input-field text-sm py-1.5 w-auto">
            <option value="">All categories</option>
            {categories.map(c => <option key={c.id} value={c.id}>{c.icon} {c.name}</option>)}
          </select>
          {filterCategory && (
            <button onClick={() => setFilterCategory('')} className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
              <X className="w-4 h-4" />
            </button>
          )}
          <span className="ml-auto text-sm text-gray-500 dark:text-gray-400">{monthExpenses.length} entries</span>
        </div>

        {/* Add / Edit form */}
        {showAddForm && logTab === 'expenses' && (
          <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/50 rounded-xl p-4 space-y-3">
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
              {editingItem ? 'Edit Expense' : 'Add Expense'}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Amount ($)</label>
                <input type="number" value={form.amount} onChange={e => setForm(f => ({ ...f, amount: e.target.value }))} className="input-field text-sm" placeholder="0.00" min="0" step="0.01" autoFocus />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Category</label>
                <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className="input-field text-sm">
                  {categories.map(c => <option key={c.id} value={c.id}>{c.icon} {c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Date</label>
                <input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} className="input-field text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Description</label>
                <input type="text" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} className="input-field text-sm" placeholder="Optional note" />
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={handleAddExpense} className="btn-primary text-sm inline-flex items-center gap-1.5">
                <Check className="w-4 h-4" /> {editingItem ? 'Update' : 'Add'}
              </button>
              <button onClick={() => { setShowAddForm(false); setEditingItem(null); setForm({ amount: '', description: '', category: 'food', date: getToday() }) }} className="btn-secondary text-sm">Cancel</button>
            </div>
          </div>
        )}

        {!showAddForm && (
          <button onClick={() => { setEditingItem(null); setForm({ amount: '', description: '', category: 'food', date: getToday() }); setShowAddForm(true) }} className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded-lg font-medium inline-flex items-center gap-1.5 transition-colors">
            <Plus className="w-4 h-4" /> Add Expense
          </button>
        )}

        {/* Expense list */}
        {monthExpenses.length === 0 ? (
          <div className="text-center py-12 text-gray-400 dark:text-gray-500">
            <DollarSign className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">No expenses this month{filterCategory ? ' for this category' : ''}.</p>
          </div>
        ) : (
          (() => {
            const grouped = {}
            monthExpenses.forEach(e => { (grouped[e.date] = grouped[e.date] || []).push(e) })
            return Object.entries(grouped).map(([date, exps]) => (
              <div key={date} className="space-y-1">
                <div className="flex justify-between items-center px-1 pt-2">
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                    {new Date(date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                  </span>
                  <span className="text-xs font-semibold text-red-600 dark:text-red-400">
                    -{fmt(exps.reduce((s, e) => s + e.amount, 0))}
                  </span>
                </div>
                {exps.map(e => {
                  const cat = getCat(e.category)
                  return (
                    <div key={e.id} className="flex items-center gap-3 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg px-3 py-2 group">
                      <span className="text-lg" title={cat.name}>{cat.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{e.description || cat.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{cat.name}</p>
                      </div>
                      <span className="text-sm font-semibold text-red-600 dark:text-red-400">-{fmt(e.amount)}</span>
                      <div className="flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => handleEditExpense(e)} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded" aria-label="Edit"><Edit2 className="w-3.5 h-3.5 text-gray-400" /></button>
                        <button onClick={() => handleDeleteExpense(e.id)} className="p-1 hover:bg-red-50 dark:hover:bg-red-900/30 rounded" aria-label="Delete"><Trash2 className="w-3.5 h-3.5 text-red-400" /></button>
                      </div>
                    </div>
                  )
                })}
              </div>
            ))
          })()
        )}
      </div>
    )
  }

  function renderIncomeLog() {
    return (
      <div className="space-y-3">
        {/* Filter bar */}
        <div className="flex flex-wrap items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)} className="input-field text-sm py-1.5 w-auto">
            <option value="">All sources</option>
            {incomeSources.map(s => <option key={s.id} value={s.id}>{s.icon} {s.name}</option>)}
          </select>
          {filterCategory && (
            <button onClick={() => setFilterCategory('')} className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
              <X className="w-4 h-4" />
            </button>
          )}
          <span className="ml-auto text-sm text-gray-500 dark:text-gray-400">{monthIncomes.length} entries</span>
        </div>

        {/* Add / Edit income form */}
        {showAddForm && logTab === 'income' && (
          <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/50 rounded-xl p-4 space-y-3">
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
              {editingItem ? 'Edit Income' : 'Add Income'}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Amount ($)</label>
                <input type="number" value={incomeForm.amount} onChange={e => setIncomeForm(f => ({ ...f, amount: e.target.value }))} className="input-field text-sm" placeholder="0.00" min="0" step="0.01" autoFocus />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Source</label>
                <select value={incomeForm.source} onChange={e => setIncomeForm(f => ({ ...f, source: e.target.value }))} className="input-field text-sm">
                  {incomeSources.map(s => <option key={s.id} value={s.id}>{s.icon} {s.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Date</label>
                <input type="date" value={incomeForm.date} onChange={e => setIncomeForm(f => ({ ...f, date: e.target.value }))} className="input-field text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Description</label>
                <input type="text" value={incomeForm.description} onChange={e => setIncomeForm(f => ({ ...f, description: e.target.value }))} className="input-field text-sm" placeholder="Optional note" />
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={handleAddIncome} className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-lg font-medium inline-flex items-center gap-1.5 transition-colors">
                <Check className="w-4 h-4" /> {editingItem ? 'Update' : 'Add'}
              </button>
              <button onClick={() => { setShowAddForm(false); setEditingItem(null); setIncomeForm({ amount: '', description: '', source: 'salary', date: getToday() }) }} className="btn-secondary text-sm">Cancel</button>
            </div>
          </div>
        )}

        {!showAddForm && (
          <button onClick={() => { setEditingItem(null); setIncomeForm({ amount: '', description: '', source: 'salary', date: getToday() }); setShowAddForm(true) }} className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-lg font-medium inline-flex items-center gap-1.5 transition-colors">
            <Plus className="w-4 h-4" /> Add Income
          </button>
        )}

        {/* Income list */}
        {monthIncomes.length === 0 ? (
          <div className="text-center py-12 text-gray-400 dark:text-gray-500">
            <ArrowUpCircle className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">No income this month{filterCategory ? ' for this source' : ''}.</p>
          </div>
        ) : (
          (() => {
            const grouped = {}
            monthIncomes.forEach(e => { (grouped[e.date] = grouped[e.date] || []).push(e) })
            return Object.entries(grouped).map(([date, items]) => (
              <div key={date} className="space-y-1">
                <div className="flex justify-between items-center px-1 pt-2">
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                    {new Date(date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                  </span>
                  <span className="text-xs font-semibold text-green-600 dark:text-green-400">
                    +{fmt(items.reduce((s, e) => s + e.amount, 0))}
                  </span>
                </div>
                {items.map(e => {
                  const src = getSrc(e.source)
                  return (
                    <div key={e.id} className="flex items-center gap-3 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg px-3 py-2 group">
                      <span className="text-lg" title={src.name}>{src.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{e.description || src.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{src.name}</p>
                      </div>
                      <span className="text-sm font-semibold text-green-600 dark:text-green-400">+{fmt(e.amount)}</span>
                      <div className="flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => handleEditIncome(e)} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded" aria-label="Edit"><Edit2 className="w-3.5 h-3.5 text-gray-400" /></button>
                        <button onClick={() => handleDeleteIncome(e.id)} className="p-1 hover:bg-red-50 dark:hover:bg-red-900/30 rounded" aria-label="Delete"><Trash2 className="w-3.5 h-3.5 text-red-400" /></button>
                      </div>
                    </div>
                  )
                })}
              </div>
            ))
          })()
        )}
      </div>
    )
  }

  // ─── CHARTS VIEW ───────────────────────────────────────────
  function renderCharts() {
    return (
      <div className="space-y-6">
        {/* Income vs Expense summary bar */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Income vs Expenses</h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-green-600 dark:text-green-400 font-medium">Income</span>
                <span className="font-semibold text-gray-900 dark:text-white">{fmt(monthIncomeTotal)}</span>
              </div>
              <div className="w-full h-3 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-green-500 transition-all" style={{ width: `${monthIncomeTotal > 0 && (monthIncomeTotal + monthTotal) > 0 ? (monthIncomeTotal / (monthIncomeTotal + monthTotal)) * 100 : 0}%` }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-red-600 dark:text-red-400 font-medium">Expenses</span>
                <span className="font-semibold text-gray-900 dark:text-white">{fmt(monthTotal)}</span>
              </div>
              <div className="w-full h-3 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-red-500 transition-all" style={{ width: `${monthTotal > 0 && (monthIncomeTotal + monthTotal) > 0 ? (monthTotal / (monthIncomeTotal + monthTotal)) * 100 : 0}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Donut charts side by side */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Spending by Category</h3>
            {categoryBreakdown.length > 0 ? renderDonut(categoryBreakdown, monthTotal, 'expenses') : (
              <p className="text-sm text-gray-400 text-center py-8">No expenses this month</p>
            )}
            <div className="space-y-1.5 mt-3">
              {categoryBreakdown.map(cat => (
                <div key={cat.id} className="flex items-center gap-2">
                  <span className="text-xs">{cat.icon}</span>
                  <div className="flex-1">
                    <div className="flex justify-between text-xs mb-0.5">
                      <span className="text-gray-700 dark:text-gray-300">{cat.name}</span>
                      <span className="font-medium text-gray-900 dark:text-white">{fmt(cat.total)}</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{ width: `${cat.percent}%`, backgroundColor: cat.color }} />
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 w-8 text-right">{cat.percent.toFixed(0)}%</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Income by Source</h3>
            {incomeBreakdown.length > 0 ? renderDonut(incomeBreakdown, monthIncomeTotal, 'income') : (
              <p className="text-sm text-gray-400 text-center py-8">No income this month</p>
            )}
            <div className="space-y-1.5 mt-3">
              {incomeBreakdown.map(src => (
                <div key={src.id} className="flex items-center gap-2">
                  <span className="text-xs">{src.icon}</span>
                  <div className="flex-1">
                    <div className="flex justify-between text-xs mb-0.5">
                      <span className="text-gray-700 dark:text-gray-300">{src.name}</span>
                      <span className="font-medium text-gray-900 dark:text-white">{fmt(src.total)}</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{ width: `${src.percent}%`, backgroundColor: src.color }} />
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 w-8 text-right">{src.percent.toFixed(0)}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Daily spending bar chart */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Daily Spending</h3>
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 overflow-x-auto">
            <svg viewBox={`0 0 ${Math.max(dailySpendingData.length * 20, 300)} 140`} className="w-full min-w-[400px]" preserveAspectRatio="xMinYMid meet">
              {[0, 0.25, 0.5, 0.75, 1].map(frac => (
                <g key={frac}>
                  <line x1="30" y1={10 + (1 - frac) * 100} x2={dailySpendingData.length * 20 + 10} y2={10 + (1 - frac) * 100} stroke="currentColor" className="text-gray-200 dark:text-gray-700" strokeWidth="0.5" />
                  <text x="26" y={14 + (1 - frac) * 100} textAnchor="end" className="fill-gray-400" fontSize="7">{fmtShort(maxDailySpend * frac)}</text>
                </g>
              ))}
              {dailySpendingData.map((d, i) => {
                const barH = d.total > 0 ? (d.total / maxDailySpend) * 100 : 0
                const x = 34 + i * 20
                return (
                  <g key={d.day}>
                    <rect x={x} y={110 - barH} width="14" height={barH} rx="2" fill={d.total > 0 ? '#6366f1' : '#e5e7eb'} className={d.total === 0 ? 'dark:fill-gray-700' : ''} opacity={d.total > 0 ? 0.85 : 0.3} />
                    {d.day % 5 === 1 && <text x={x + 7} y="125" textAnchor="middle" className="fill-gray-400" fontSize="7">{d.day}</text>}
                  </g>
                )
              })}
              {dailyAvg > 0 && (
                <line x1="30" y1={110 - (dailyAvg / maxDailySpend) * 100} x2={dailySpendingData.length * 20 + 10} y2={110 - (dailyAvg / maxDailySpend) * 100} stroke="#f59e0b" strokeWidth="1" strokeDasharray="4 3" />
              )}
            </svg>
            {dailyAvg > 0 && (
              <div className="flex items-center gap-2 mt-2 text-xs text-gray-500 dark:text-gray-400">
                <span className="w-4 h-0.5 bg-amber-500 inline-block" style={{ borderTop: '1px dashed #f59e0b' }} />
                Daily avg: {fmt(dailyAvg)}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // ─── TRENDS VIEW ───────────────────────────────────────────
  function renderTrends() {
    const maxTrend = Math.max(...trendData.map(m => Math.max(m.expenses, m.income)), 1)
    return (
      <div className="space-y-6">
        {/* 6-month income vs expense grouped bars */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">6-Month Income vs Expenses</h3>
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
            <svg viewBox="0 0 420 170" className="w-full">
              {trendData.map((m, i) => {
                const incH = m.income > 0 ? (m.income / maxTrend) * 110 : 0
                const expH = m.expenses > 0 ? (m.expenses / maxTrend) * 110 : 0
                const x = 30 + i * 65
                const isCurrent = m.key === selectedMonth
                return (
                  <g key={m.key}>
                    <rect x={x} y={125 - incH} width="18" height={incH} rx="3" fill="#10b981" opacity={isCurrent ? 0.9 : 0.5} />
                    <rect x={x + 22} y={125 - expH} width="18" height={expH} rx="3" fill="#ef4444" opacity={isCurrent ? 0.9 : 0.5} />
                    <text x={x + 20} y="142" textAnchor="middle" className="fill-gray-500 dark:fill-gray-400" fontSize="9">{m.label}</text>
                    {(m.income > 0 || m.expenses > 0) && (
                      <text x={x + 20} y="155" textAnchor="middle" className={m.net >= 0 ? 'fill-green-600 dark:fill-green-400' : 'fill-red-600 dark:fill-red-400'} fontSize="7" fontWeight="500">
                        {m.net >= 0 ? '+' : ''}{fmtShort(m.net)}
                      </text>
                    )}
                  </g>
                )
              })}
            </svg>
            <div className="flex items-center gap-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-green-500 inline-block" /> Income</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-red-500 inline-block" /> Expenses</span>
            </div>
          </div>
        </div>

        {/* Predictions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 border border-indigo-200 dark:border-indigo-800 rounded-xl p-4">
            <p className="text-xs font-medium text-indigo-600 dark:text-indigo-400 mb-1">Projected Expenses This Month</p>
            <p className="text-2xl font-bold text-indigo-900 dark:text-indigo-200">{fmt(projectedMonthly)}</p>
            <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-1">
              Based on daily avg of {fmt(dailyAvg)}/day × {getDaysInMonth(selectedMonth)} days
            </p>
          </div>
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl p-4">
            <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400 mb-1">Next Month Expense Prediction</p>
            <p className="text-2xl font-bold text-emerald-900 dark:text-emerald-200">{fmt(nextMonthPrediction)}</p>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">
              Linear trend from {trendData.filter(m => m.expenses > 0).length} months of data
            </p>
          </div>
        </div>

        {/* Top categories MoM comparison */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Top Spending Categories (This Month vs Previous)</h3>
          {(() => {
            const [py, pm] = selectedMonth.split('-').map(Number)
            let prevM = pm - 1, prevY = py
            if (prevM < 1) { prevM = 12; prevY-- }
            const prevKey = `${prevY}-${String(prevM).padStart(2, '0')}`
            const prevExpenses = data.expenses.filter(e => getMonthKey(e.date) === prevKey)
            const prevTotal = {}
            prevExpenses.forEach(e => { prevTotal[e.category] = (prevTotal[e.category] || 0) + e.amount })

            return categoryBreakdown.slice(0, 5).map(cat => {
              const prev = prevTotal[cat.id] || 0
              const change = prev > 0 ? ((cat.total - prev) / prev) * 100 : 0
              return (
                <div key={cat.id} className="flex items-center gap-3 py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
                  <span className="text-lg">{cat.icon}</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{cat.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {fmt(cat.total)} this month {prev > 0 && `• ${fmt(prev)} last month`}
                    </p>
                  </div>
                  {prev > 0 && (
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${change > 0 ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'}`}>
                      {change > 0 ? '↑' : '↓'} {Math.abs(change).toFixed(0)}%
                    </span>
                  )}
                </div>
              )
            })
          })()}
        </div>
      </div>
    )
  }

  // ─── BALANCE VIEW ──────────────────────────────────────────
  function renderBalance() {
    const expenseRatio = effectiveMonthIncome > 0 ? (monthTotal / effectiveMonthIncome) * 100 : 0
    const yBudgetPct = data.yearlyBudget > 0 ? Math.min(100, (yearlyExpenseTotal / data.yearlyBudget) * 100) : 0
    const yBudgetColor = yBudgetPct > 90 ? '#ef4444' : yBudgetPct > 70 ? '#f59e0b' : '#10b981'
    const catBudgetsWithData = categories.filter(c => (data.categoryBudgets[c.id] || 0) > 0)
    const yCatBudgetsWithData = categories.filter(c => (data.yearlyCategoryBudgets[c.id] || 0) > 0)

    return (
      <div className="space-y-6">
        {/* Balance sheet header */}
        <div className={`rounded-xl p-5 border ${netBalance >= 0 ? 'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border-green-200 dark:border-green-800' : 'bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-950/30 dark:to-rose-950/30 border-red-200 dark:border-red-800'}`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Net Balance</span>
            <Scale className="w-5 h-5 text-gray-400" />
          </div>
          <p className={`text-3xl font-bold ${netBalance >= 0 ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
            {netBalance >= 0 ? '+' : ''}{fmt(netBalance)}
          </p>
          {effectiveMonthIncome > 0 && (
            <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">
              Savings rate: <span className={`font-semibold ${savingsRate >= 20 ? 'text-green-600 dark:text-green-400' : savingsRate >= 0 ? 'text-amber-600 dark:text-amber-400' : 'text-red-600 dark:text-red-400'}`}>{savingsRate.toFixed(1)}%</span>
              {savingsRate >= 20 && ' — Great job!'}
              {savingsRate >= 0 && savingsRate < 20 && ' — Aim for 20%+'}
              {savingsRate < 0 && ' — Spending exceeds income'}
            </p>
          )}
          {carryForwardBalance > 0 && (
            <p className="text-xs mt-1.5 text-blue-600 dark:text-blue-400 flex items-center gap-1">
              <RotateCcw className="w-3 h-3" /> Includes {fmt(carryForwardBalance)} carried forward from last month
            </p>
          )}
        </div>

        {/* Balance sheet table */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
          {/* Income section */}
          <div className="border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between px-4 py-3 bg-green-50 dark:bg-green-950/20">
              <span className="text-sm font-semibold text-green-800 dark:text-green-300 flex items-center gap-2">
                <ArrowUpCircle className="w-4 h-4" /> Income
              </span>
              <span className="text-sm font-bold text-green-700 dark:text-green-300">{fmt(effectiveMonthIncome)}</span>
            </div>
            {incomeBreakdown.length > 0 ? incomeBreakdown.map(src => (
              <div key={src.id} className="flex items-center justify-between px-4 py-2 border-t border-gray-100 dark:border-gray-700/50">
                <span className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <span>{src.icon}</span> {src.name}
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{fmt(src.total)}</span>
              </div>
            )) : (
              <div className="px-4 py-3 text-sm text-gray-400 dark:text-gray-500">No income recorded</div>
            )}
            {carryForwardBalance > 0 && (
              <div className="flex items-center justify-between px-4 py-2 border-t border-blue-100 dark:border-blue-800/30 bg-blue-50/50 dark:bg-blue-950/10">
                <span className="text-sm text-blue-700 dark:text-blue-300 flex items-center gap-2">
                  <RotateCcw className="w-3.5 h-3.5" /> Carried Forward
                </span>
                <span className="text-sm font-medium text-blue-700 dark:text-blue-300">{fmt(carryForwardBalance)}</span>
              </div>
            )}
          </div>

          {/* Expense section */}
          <div className="border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between px-4 py-3 bg-red-50 dark:bg-red-950/20">
              <span className="text-sm font-semibold text-red-800 dark:text-red-300 flex items-center gap-2">
                <ArrowDownCircle className="w-4 h-4" /> Expenses
              </span>
              <span className="text-sm font-bold text-red-700 dark:text-red-300">{fmt(monthTotal)}</span>
            </div>
            {categoryBreakdown.length > 0 ? categoryBreakdown.map(cat => {
              const catBudget = data.categoryBudgets[cat.id] || 0
              const catPct = catBudget > 0 ? Math.min(100, (cat.total / catBudget) * 100) : 0
              const catColor = catPct > 90 ? '#ef4444' : catPct > 70 ? '#f59e0b' : '#10b981'
              return (
                <div key={cat.id} className="border-t border-gray-100 dark:border-gray-700/50">
                  <div className="flex items-center justify-between px-4 py-2">
                    <span className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2">
                      <span>{cat.icon}</span> {cat.name}
                      <span className="text-xs text-gray-400">({cat.percent.toFixed(0)}%)</span>
                    </span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{fmt(cat.total)}</span>
                  </div>
                  {catBudget > 0 && (
                    <div className="px-4 pb-2 -mt-1">
                      <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all" style={{ width: `${catPct}%`, backgroundColor: catColor }} />
                      </div>
                      <p className="text-[10px] mt-0.5" style={{ color: catColor }}>
                        {catPct.toFixed(0)}% of {fmt(catBudget)} budget
                      </p>
                    </div>
                  )}
                </div>
              )
            }) : (
              <div className="px-4 py-3 text-sm text-gray-400 dark:text-gray-500">No expenses recorded</div>
            )}
          </div>

          {/* Net row */}
          <div className={`flex items-center justify-between px-4 py-3 font-bold ${netBalance >= 0 ? 'bg-green-50 dark:bg-green-950/20 text-green-800 dark:text-green-300' : 'bg-red-50 dark:bg-red-950/20 text-red-800 dark:text-red-300'}`}>
            <span className="text-sm flex items-center gap-2">
              <Scale className="w-4 h-4" /> Net Balance
            </span>
            <span className="text-sm">{netBalance >= 0 ? '+' : ''}{fmt(netBalance)}</span>
          </div>
        </div>

        {/* Category budget status (only if any set) */}
        {catBudgetsWithData.length > 0 && (
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Category Budget Status (Monthly)</h3>
            <div className="space-y-2.5">
              {catBudgetsWithData.map(cat => {
                const spent = allMonthExpenses.filter(e => e.category === cat.id).reduce((s, e) => s + e.amount, 0)
                const budget = data.categoryBudgets[cat.id]
                const pct = Math.min(100, (spent / budget) * 100)
                const col = pct > 90 ? '#ef4444' : pct > 70 ? '#f59e0b' : '#10b981'
                return (
                  <div key={cat.id}>
                    <div className="flex items-center justify-between text-xs mb-0.5">
                      <span className="text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                        <span>{cat.icon}</span> {cat.name}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400">{fmt(spent)} / {fmt(budget)}</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: col }} />
                    </div>
                    {pct > 90 && <p className="text-[10px] text-red-500 mt-0.5">{pct >= 100 ? 'Over budget!' : 'Near budget limit'}</p>}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Expense-to-Income gauge */}
        {effectiveMonthIncome > 0 && (
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Expense-to-Income Ratio</h3>
            <div className="flex items-end gap-4">
              <div className="flex-1">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-500 dark:text-gray-400">0%</span>
                  <span className={`font-bold ${expenseRatio <= 70 ? 'text-green-600' : expenseRatio <= 90 ? 'text-amber-600' : 'text-red-600'}`}>{expenseRatio.toFixed(0)}%</span>
                  <span className="text-gray-500 dark:text-gray-400">100%+</span>
                </div>
                <div className="w-full h-4 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden relative">
                  <div className="absolute inset-y-0 left-0 w-[70%] bg-green-100 dark:bg-green-900/20 rounded-l-full" />
                  <div className="absolute inset-y-0 left-[70%] w-[20%] bg-amber-100 dark:bg-amber-900/20" />
                  <div className="absolute inset-y-0 left-[90%] right-0 bg-red-100 dark:bg-red-900/20 rounded-r-full" />
                  <div className="absolute inset-y-0 left-0 rounded-full transition-all" style={{
                    width: `${Math.min(100, expenseRatio)}%`,
                    backgroundColor: expenseRatio <= 70 ? '#10b981' : expenseRatio <= 90 ? '#f59e0b' : '#ef4444'
                  }} />
                </div>
                <div className="flex justify-between text-xs mt-1 text-gray-400">
                  <span>Healthy</span>
                  <span>Caution</span>
                  <span>Over</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Monthly budget section */}
        {data.monthlyBudget > 0 && (
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Monthly Budget Status</h3>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-500 dark:text-gray-400">Spent: {fmt(monthTotal)}</span>
              <span className="text-gray-500 dark:text-gray-400">Budget: {fmt(data.monthlyBudget)}</span>
            </div>
            <div className="w-full h-3 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all" style={{ width: `${budgetPercent}%`, backgroundColor: budgetColor }} />
            </div>
            <p className="text-xs mt-1" style={{ color: budgetColor }}>
              {budgetPercent.toFixed(0)}% used • {fmt(Math.max(0, data.monthlyBudget - monthTotal))} remaining
            </p>
          </div>
        )}

        {/* Yearly budget section */}
        {(data.yearlyBudget > 0 || yCatBudgetsWithData.length > 0) && (
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
              <Calendar className="w-4 h-4" /> Yearly Budget Status ({selectedYear})
            </h3>
            {data.yearlyBudget > 0 && (
              <div className="mb-4">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-500 dark:text-gray-400">YTD Spent: {fmt(yearlyExpenseTotal)}</span>
                  <span className="text-gray-500 dark:text-gray-400">Budget: {fmt(data.yearlyBudget)}</span>
                </div>
                <div className="w-full h-3 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{ width: `${yBudgetPct}%`, backgroundColor: yBudgetColor }} />
                </div>
                <p className="text-xs mt-1" style={{ color: yBudgetColor }}>
                  {yBudgetPct.toFixed(0)}% used • {fmt(Math.max(0, data.yearlyBudget - yearlyExpenseTotal))} remaining
                </p>
              </div>
            )}
            {yCatBudgetsWithData.length > 0 && (
              <div className="space-y-2.5">
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">By Category</p>
                {yCatBudgetsWithData.map(cat => {
                  const spent = yearlyCategorySpend[cat.id] || 0
                  const budget = data.yearlyCategoryBudgets[cat.id]
                  const pct = Math.min(100, (spent / budget) * 100)
                  const col = pct > 90 ? '#ef4444' : pct > 70 ? '#f59e0b' : '#10b981'
                  return (
                    <div key={cat.id}>
                      <div className="flex items-center justify-between text-xs mb-0.5">
                        <span className="text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                          <span>{cat.icon}</span> {cat.name}
                        </span>
                        <span className="text-gray-500 dark:text-gray-400">{fmt(spent)} / {fmt(budget)}</span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: col }} />
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}
      </div>
    )
  }

  // ─── CATEGORIES VIEW ───────────────────────────────────────
  function renderCategories() {
    return (
      <div className="space-y-6">
        {/* Expense categories */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Expense Categories</h3>
            <button onClick={() => { setShowCategoryManager(!showCategoryManager); setShowIncomeSourceManager(false) }} className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline">
              {showCategoryManager ? 'Close' : 'Add New'}
            </button>
          </div>
          {showCategoryManager && (
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 space-y-3 mb-4">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Name</label>
                  <input type="text" value={newCat.name} onChange={e => setNewCat(c => ({ ...c, name: e.target.value }))} className="input-field text-sm" placeholder="Category name" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Emoji Icon</label>
                  <input type="text" value={newCat.icon} onChange={e => setNewCat(c => ({ ...c, icon: e.target.value }))} className="input-field text-sm" placeholder="📌" maxLength={4} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Color</label>
                  <input type="color" value={newCat.color} onChange={e => setNewCat(c => ({ ...c, color: e.target.value }))} className="w-full h-[38px] rounded-lg border border-gray-300 dark:border-gray-600 cursor-pointer" />
                </div>
              </div>
              <button onClick={handleAddCategory} className="btn-primary text-sm inline-flex items-center gap-1.5">
                <Plus className="w-4 h-4" /> Add Category
              </button>
            </div>
          )}
          <div className="space-y-2">
            {categories.map(cat => {
              const spent = allMonthExpenses.filter(e => e.category === cat.id).reduce((s, e) => s + e.amount, 0)
              const count = allMonthExpenses.filter(e => e.category === cat.id).length
              const isCustom = !DEFAULT_CATEGORIES.some(c => c.id === cat.id)
              return (
                <div key={cat.id} className="flex items-center gap-3 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg px-3 py-2.5">
                  <span className="text-lg">{cat.icon}</span>
                  <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: cat.color }} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{cat.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{count} {count === 1 ? 'entry' : 'entries'} • {fmt(spent)}</p>
                  </div>
                  {isCustom && (
                    <button onClick={() => handleRemoveCategory(cat.id)} className="p-1 hover:bg-red-50 dark:hover:bg-red-900/30 rounded" aria-label="Remove category"><Trash2 className="w-4 h-4 text-red-400" /></button>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Income sources */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Income Sources</h3>
            <button onClick={() => { setShowIncomeSourceManager(!showIncomeSourceManager); setShowCategoryManager(false) }} className="text-xs text-green-600 dark:text-green-400 hover:underline">
              {showIncomeSourceManager ? 'Close' : 'Add New'}
            </button>
          </div>
          {showIncomeSourceManager && (
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 space-y-3 mb-4">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Name</label>
                  <input type="text" value={newSource.name} onChange={e => setNewSource(s => ({ ...s, name: e.target.value }))} className="input-field text-sm" placeholder="Source name" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Emoji Icon</label>
                  <input type="text" value={newSource.icon} onChange={e => setNewSource(s => ({ ...s, icon: e.target.value }))} className="input-field text-sm" placeholder="💵" maxLength={4} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Color</label>
                  <input type="color" value={newSource.color} onChange={e => setNewSource(s => ({ ...s, color: e.target.value }))} className="w-full h-[38px] rounded-lg border border-gray-300 dark:border-gray-600 cursor-pointer" />
                </div>
              </div>
              <button onClick={handleAddIncomeSource} className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-lg font-medium inline-flex items-center gap-1.5 transition-colors">
                <Plus className="w-4 h-4" /> Add Source
              </button>
            </div>
          )}
          <div className="space-y-2">
            {incomeSources.map(src => {
              const earned = allMonthIncomes.filter(e => e.source === src.id).reduce((s, e) => s + e.amount, 0)
              const count = allMonthIncomes.filter(e => e.source === src.id).length
              const isCustom = !DEFAULT_INCOME_SOURCES.some(s => s.id === src.id)
              return (
                <div key={src.id} className="flex items-center gap-3 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg px-3 py-2.5">
                  <span className="text-lg">{src.icon}</span>
                  <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: src.color }} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{src.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{count} {count === 1 ? 'entry' : 'entries'} • {fmt(earned)}</p>
                  </div>
                  {isCustom && (
                    <button onClick={() => handleRemoveIncomeSource(src.id)} className="p-1 hover:bg-red-50 dark:hover:bg-red-900/30 rounded" aria-label="Remove source"><Trash2 className="w-4 h-4 text-red-400" /></button>
                  )}
                </div>
              )
            })}
          </div>
        </div>

      </div>
    )
  }

  // ─── BUDGET VIEW ───────────────────────────────────────────
  function renderBudget() {
    return (
      <div className="space-y-6">
        {/* Budget Settings */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Budget Settings</h3>

          {/* Monthly / Yearly toggle */}
          <div className="flex gap-1 p-1 rounded-lg bg-gray-100 dark:bg-gray-800 w-fit mb-4">
            <button
              onClick={() => setBudgetTab('monthly')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${budgetTab === 'monthly' ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400'}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBudgetTab('yearly')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${budgetTab === 'yearly' ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400'}`}
            >
              Yearly
            </button>
          </div>

          {budgetTab === 'monthly' && (
            <div className="space-y-4">
              {/* Overall monthly budget */}
              <div>
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Overall Monthly Budget</label>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 text-sm">$</span>
                  <input type="number" value={data.monthlyBudget || ''} onChange={e => handleBudgetChange(e.target.value)} className="input-field text-sm w-40" placeholder="e.g. 2000" min="0" />
                </div>
                {data.monthlyBudget > 0 && (
                  <div className="mt-2">
                    <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{ width: `${budgetPercent}%`, backgroundColor: budgetColor }} />
                    </div>
                    <p className="text-[10px] mt-0.5" style={{ color: budgetColor }}>
                      {fmt(monthTotal)} / {fmt(data.monthlyBudget)} ({budgetPercent.toFixed(0)}%)
                    </p>
                  </div>
                )}
              </div>

              {/* Per-category monthly budgets */}
              <div>
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Category Budgets (Monthly)</label>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {categories.map(cat => {
                    const spent = allMonthExpenses.filter(e => e.category === cat.id).reduce((s, e) => s + e.amount, 0)
                    const budget = data.categoryBudgets[cat.id] || 0
                    const pct = budget > 0 ? Math.min(100, (spent / budget) * 100) : 0
                    const col = pct > 90 ? '#ef4444' : pct > 70 ? '#f59e0b' : '#10b981'
                    return (
                      <div key={cat.id} className="flex items-center gap-2">
                        <span className="text-sm flex-shrink-0">{cat.icon}</span>
                        <span className="text-xs text-gray-700 dark:text-gray-300 w-28 truncate flex-shrink-0">{cat.name}</span>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <span className="text-gray-400 text-xs">$</span>
                          <input
                            type="number"
                            value={data.categoryBudgets[cat.id] || ''}
                            onChange={e => handleCategoryBudget(cat.id, e.target.value)}
                            className="input-field text-xs w-24 py-1"
                            placeholder="0"
                            min="0"
                          />
                        </div>
                        {budget > 0 && (
                          <div className="flex-1 min-w-0">
                            <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                              <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: col }} />
                            </div>
                            <p className="text-[9px] text-gray-400 mt-0.5">{fmt(spent)} spent</p>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          {budgetTab === 'yearly' && (
            <div className="space-y-4">
              {/* Overall yearly budget */}
              <div>
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Overall Yearly Budget ({selectedYear})</label>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 text-sm">$</span>
                  <input type="number" value={data.yearlyBudget || ''} onChange={e => handleYearlyBudget(e.target.value)} className="input-field text-sm w-40" placeholder="e.g. 24000" min="0" />
                </div>
                {data.yearlyBudget > 0 && (() => {
                  const pct = Math.min(100, (yearlyExpenseTotal / data.yearlyBudget) * 100)
                  const col = pct > 90 ? '#ef4444' : pct > 70 ? '#f59e0b' : '#10b981'
                  return (
                    <div className="mt-2">
                      <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: col }} />
                      </div>
                      <p className="text-[10px] mt-0.5" style={{ color: col }}>
                        {fmt(yearlyExpenseTotal)} / {fmt(data.yearlyBudget)} ({pct.toFixed(0)}%)
                      </p>
                    </div>
                  )
                })()}
              </div>

              {/* Per-category yearly budgets */}
              <div>
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Category Budgets (Yearly {selectedYear})</label>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {categories.map(cat => {
                    const spent = yearlyCategorySpend[cat.id] || 0
                    const budget = data.yearlyCategoryBudgets[cat.id] || 0
                    const pct = budget > 0 ? Math.min(100, (spent / budget) * 100) : 0
                    const col = pct > 90 ? '#ef4444' : pct > 70 ? '#f59e0b' : '#10b981'
                    return (
                      <div key={cat.id} className="flex items-center gap-2">
                        <span className="text-sm flex-shrink-0">{cat.icon}</span>
                        <span className="text-xs text-gray-700 dark:text-gray-300 w-28 truncate flex-shrink-0">{cat.name}</span>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <span className="text-gray-400 text-xs">$</span>
                          <input
                            type="number"
                            value={data.yearlyCategoryBudgets[cat.id] || ''}
                            onChange={e => handleYearlyCategoryBudget(cat.id, e.target.value)}
                            className="input-field text-xs w-24 py-1"
                            placeholder="0"
                            min="0"
                          />
                        </div>
                        {budget > 0 && (
                          <div className="flex-1 min-w-0">
                            <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                              <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: col }} />
                            </div>
                            <p className="text-[9px] text-gray-400 mt-0.5">{fmt(spent)} YTD</p>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Carry Forward */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <RotateCcw className="w-4 h-4" /> Carry Forward Income Balance
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                When enabled, leftover income from the previous month is added to the current month's available balance.
              </p>
            </div>
            <button
              onClick={toggleCarryForward}
              className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${data.carryForwardEnabled ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`}
              aria-label="Toggle carry forward"
            >
              <span className={`absolute left-0 top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${data.carryForwardEnabled ? 'translate-x-[22px]' : 'translate-x-0.5'}`} />
            </button>
          </div>
          {data.carryForwardEnabled && carryForwardBalance > 0 && (
            <div className="mt-3 p-2.5 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800/50 rounded-lg">
              <p className="text-xs text-blue-700 dark:text-blue-300 flex items-center gap-1.5">
                <RotateCcw className="w-3 h-3" />
                <span className="font-semibold">{fmt(carryForwardBalance)}</span> carried forward from last month into {getMonthName(selectedMonth)}
              </p>
            </div>
          )}
          {data.carryForwardEnabled && carryForwardBalance === 0 && (
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">No surplus from previous month to carry forward.</p>
          )}
        </div>
      </div>
    )
  }

  // ─── MAIN RENDER ───────────────────────────────────────────
  return (
    <>
      <SEOHead
        title="Daily Expense Tracker | UnTrackt"
        description="Track daily expenses and income, visualize spending by category, and see your balance sheet. All data stays in your browser."
        path="/tools/daily-expense-tracker"
        toolName="Daily Expense Tracker"
      />

      {/* Month navigator + summary strip */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => navigateMonth(-1)} className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg" aria-label="Previous month">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">{getMonthName(selectedMonth)}</h2>
          <button onClick={() => navigateMonth(1)} className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg" aria-label="Next month">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <div className="text-center">
            <p className="text-xs text-green-600 dark:text-green-400">Income</p>
            <p className="text-lg font-bold text-green-700 dark:text-green-300">{fmt(monthIncomeTotal)}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-red-600 dark:text-red-400">Expenses</p>
            <p className="text-lg font-bold text-red-700 dark:text-red-300">{fmt(monthTotal)}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">Net Balance</p>
            <p className={`text-lg font-bold ${netBalance >= 0 ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
              {netBalance >= 0 ? '+' : ''}{fmt(netBalance)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">Today</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              <span className="text-green-600 dark:text-green-400 text-sm">+{fmt(todayIncome)}</span>
              {' / '}
              <span className="text-red-600 dark:text-red-400 text-sm">-{fmt(todayExpenses)}</span>
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {data.monthlyBudget > 0 ? 'Budget Left' : 'Savings Rate'}
            </p>
            <p className={`text-lg font-bold ${data.monthlyBudget > 0 && monthTotal > data.monthlyBudget ? 'text-red-600 dark:text-red-400' : savingsRate >= 0 ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
              {data.monthlyBudget > 0 ? fmt(Math.max(0, data.monthlyBudget - monthTotal)) : (monthIncomeTotal > 0 ? `${savingsRate.toFixed(0)}%` : '—')}
            </p>
          </div>
        </div>

        {/* Budget bar (compact) */}
        {data.monthlyBudget > 0 && (
          <div className="mt-3">
            <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all" style={{ width: `${budgetPercent}%`, backgroundColor: budgetColor }} />
            </div>
          </div>
        )}
      </div>

      {/* View tabs */}
      <div className="flex gap-1 p-1 rounded-xl bg-gray-100 dark:bg-gray-800 mb-6 overflow-x-auto">
        {VIEWS.map(v => (
          <button
            key={v.id}
            onClick={() => setView(v.id)}
            className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              view === v.id
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            {v.label}
          </button>
        ))}
      </div>

      {/* View content */}
      {view === 'log' && renderLog()}
      {view === 'charts' && renderCharts()}
      {view === 'trends' && renderTrends()}
      {view === 'balance' && renderBalance()}
      {view === 'categories' && renderCategories()}
      {view === 'budget' && renderBudget()}

      {/* Export */}
      {(data.expenses.length > 0 || data.incomes.length > 0) && (
        <div className="mt-6 flex justify-end">
          <button onClick={handleExportCSV} className="btn-secondary text-sm inline-flex items-center gap-1.5">
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>
      )}
    </>
  )
}
