import { useState } from 'react'
import SEOHead from '../../components/SEOHead.jsx'
import DisclaimerCard from '../../components/DisclaimerCard.jsx'

export default function EmergencyFundCalculator() {
  const [expenses, setExpenses] = useState([
    { id: 1, category: 'Housing', label: 'Rent/Mortgage', amount: 1500 },
    { id: 2, category: 'Utilities', label: 'Electric, Water, Gas', amount: 200 },
    { id: 3, category: 'Food', label: 'Groceries', amount: 600 },
    { id: 4, category: 'Insurance', label: 'Health Insurance', amount: 300 }
  ])
  const [months, setMonths] = useState(6)
  const [currentSavings, setCurrentSavings] = useState(0)

  const addExpense = () => setExpenses([...expenses, { id: Math.max(...expenses.map(e => e.id), 0) + 1, category: 'Other', label: '', amount: 0 }])
  const removeExpense = (id) => setExpenses(expenses.filter(e => e.id !== id))
  const updateExpense = (id, field, value) => setExpenses(expenses.map(e => e.id === id ? { ...e, [field]: value } : e))

  const monthlyEssentials = expenses.reduce((sum, e) => sum + (parseFloat(e.amount) || 0), 0)
  const targetFund = monthlyEssentials * months
  const shortfall = Math.max(0, targetFund - currentSavings)
  const isComplete = currentSavings >= targetFund
  const percentComplete = Math.min(100, (currentSavings / targetFund) * 100)

  const fmt = (v) => v.toLocaleString('en-US', { style: 'currency', maximumFractionDigits: 0 })

  const savingsRates = [100, 250, 500, 1000]
  const getSavingsPlan = (monthlyRate) => {
    if (shortfall <= 0) return 0
    return Math.ceil(shortfall / monthlyRate)
  }

  const categories = ['Housing', 'Utilities', 'Food', 'Transportation', 'Insurance', 'Medical', 'Debt', 'Other']

  return (
    <>
      <SEOHead
        title="Emergency Fund Calculator | UnTrackt"
        description="Calculate how much you need for an emergency fund. Track monthly essentials and set savings goals."
        path="/tools/emergency-fund-calculator"
        toolName="Emergency Fund Calculator"
      />

      <DisclaimerCard type="finance" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
            <h2 className="font-semibold text-lg text-gray-900">Monthly Essentials</h2>
            <div className="space-y-2">
              {expenses.map(expense => (
                <div key={expense.id} className="flex gap-2 items-end">
                  <select
                    value={expense.category}
                    onChange={e => updateExpense(expense.id, 'category', e.target.value)}
                    className="input-field flex-1 text-sm"
                  >
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                  <input
                    type="text"
                    value={expense.label}
                    onChange={e => updateExpense(expense.id, 'label', e.target.value)}
                    placeholder="Description"
                    className="input-field flex-1 text-sm"
                  />
                  <input
                    type="number"
                    value={expense.amount}
                    onChange={e => updateExpense(expense.id, 'amount', e.target.value)}
                    className="input-field w-32 text-sm"
                    min="0"
                  />
                  <button
                    onClick={() => removeExpense(expense.id)}
                    className="px-3 py-2 text-red-600 hover:bg-red-50 rounded text-sm"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
            <button onClick={addExpense} className="btn-secondary text-sm">+ Add Expense</button>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
            <h2 className="font-semibold text-lg text-gray-900">Target Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="label">Emergency Fund Coverage (months)</label>
                <div className="flex gap-2">
                  {[3, 6, 9, 12].map(m => (
                    <button
                      key={m}
                      onClick={() => setMonths(m)}
                      className={`flex-1 py-2 rounded-lg font-semibold transition-all ${
                        months === m ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {m}mo
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="label">Current Savings</label>
                <input
                  type="number"
                  value={currentSavings}
                  onChange={e => setCurrentSavings(parseFloat(e.target.value) || 0)}
                  className="input-field"
                  min="0"
                />
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-3">
            <h2 className="font-semibold text-lg text-gray-900">Savings Plans</h2>
            <div className="grid grid-cols-2 gap-3">
              {savingsRates.map(rate => (
                <div key={rate} className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">Save {fmt(rate)}/month</p>
                  <p className="text-2xl font-bold text-gray-900">{getSavingsPlan(rate)} months</p>
                  <p className="text-xs text-gray-500 mt-1">{(getSavingsPlan(rate) * 12).toFixed(1)} years</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 sticky top-6 h-fit space-y-4">
          <div className={`p-6 rounded-xl border-2 text-center ${
            isComplete
              ? 'bg-green-50 border-green-200'
              : 'bg-orange-50 border-orange-200'
          }`}>
            <p className={`text-sm font-semibold mb-1 ${isComplete ? 'text-green-600' : 'text-orange-600'}`}>
              {isComplete ? '✓ GOAL REACHED' : 'TARGET FUND'}
            </p>
            <p className={`text-4xl font-bold ${isComplete ? 'text-green-700' : 'text-orange-700'}`}>
              {fmt(targetFund)}
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm font-semibold text-gray-700">Progress</p>
              <p className="text-sm font-bold text-gray-900">{percentComplete.toFixed(1)}%</p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all ${isComplete ? 'bg-green-600' : 'bg-blue-600'}`}
                style={{ width: `${percentComplete}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-blue-600">Current Saved</span>
              <span className="font-bold text-blue-700">{fmt(currentSavings)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-600">Monthly Essentials</span>
              <span className="font-bold text-blue-700">{fmt(monthlyEssentials)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-600">Coverage Duration</span>
              <span className="font-bold text-blue-700">{months} months</span>
            </div>
          </div>

          {shortfall > 0 && (
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <p className="text-xs font-semibold text-red-600 mb-1">SHORTFALL</p>
              <p className="text-2xl font-bold text-red-700">{fmt(shortfall)}</p>
              <p className="text-xs text-red-700 mt-2">Save {fmt(shortfall / 6)}/month for 6 months to reach goal</p>
            </div>
          )}

          <div className="bg-amber-50 p-3 rounded-lg border border-amber-200 text-xs text-amber-900">
            <p className="font-semibold mb-1">💡 Expert Tip</p>
            <p>Most financial advisors recommend 3-6 months of essential expenses. Start with 3 months, then build to 6-12 months as income increases.</p>
          </div>
        </div>
      </div>
    </>
  )
}
