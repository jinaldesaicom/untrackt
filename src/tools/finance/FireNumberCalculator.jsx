import { useState } from 'react'

export default function FireNumberCalculator() {
  const [expenses, setExpenses] = useState('40000')
  const [returnRate, setReturnRate] = useState('7')
  const [withdrawalRate, setWithdrawalRate] = useState('4')
  const [currentSavings, setCurrentSavings] = useState('50000')
  const [monthlySavings, setMonthlySavings] = useState('1500')

  const annualExpenses = parseFloat(expenses) || 0
  const r = (parseFloat(returnRate) || 0) / 100
  const wr = (parseFloat(withdrawalRate) || 4) / 100
  const savings = parseFloat(currentSavings) || 0
  const monthly = parseFloat(monthlySavings) || 0
  const annual = monthly * 12

  const fireNumber = wr > 0 ? annualExpenses / wr : 0
  const needed = Math.max(0, fireNumber - savings)

  // Years to FIRE: compound grows savings + contributions
  let yearsToFire = null
  if (fireNumber > 0 && r > 0 && annual > 0) {
    // FV = PV*(1+r)^t + PMT*((1+r)^t - 1)/r = fireNumber
    // solve numerically
    let balance = savings
    let years = 0
    while (balance < fireNumber && years < 200) {
      balance = balance * (1 + r) + annual
      years++
    }
    yearsToFire = balance >= fireNumber ? years : null
  } else if (annual === 0 && r > 0 && savings > 0) {
    yearsToFire = savings >= fireNumber ? 0 : null
  }

  const fmt = (n) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

  return (
    <div className="space-y-5">
      {/* FIRE explanation */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-sm text-emerald-800">
        <strong>What is FIRE?</strong> Financial Independence, Retire Early (FIRE) is the goal of saving and investing aggressively
        so your investment returns cover your living expenses — freeing you from relying on a job.
        Your FIRE Number is how much you need invested to live off returns indefinitely.
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Annual Expenses ($)</label>
          <input type="number" value={expenses} onChange={(e) => setExpenses(e.target.value)} className="input-field" min="0" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Expected Return Rate (%)</label>
          <input type="number" value={returnRate} onChange={(e) => setReturnRate(e.target.value)} className="input-field" min="0" step="0.5" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Safe Withdrawal Rate (%)</label>
          <input type="number" value={withdrawalRate} onChange={(e) => setWithdrawalRate(e.target.value)} className="input-field" min="0.1" step="0.5" />
          <p className="text-xs text-gray-400 mt-0.5">Typically 3–4%. The "4% rule" is a common benchmark.</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Current Savings ($)</label>
          <input type="number" value={currentSavings} onChange={(e) => setCurrentSavings(e.target.value)} className="input-field" min="0" />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Savings ($)</label>
          <input type="number" value={monthlySavings} onChange={(e) => setMonthlySavings(e.target.value)} className="input-field" min="0" />
        </div>
      </div>

      {/* Results */}
      {fireNumber > 0 && (
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center">
              <p className="text-xs text-emerald-700 mb-1">FIRE Number</p>
              <p className="text-2xl font-bold text-emerald-700">{fmt(fireNumber)}</p>
              <p className="text-xs text-gray-500 mt-0.5">Your target portfolio</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-500 mb-1">Still Needed</p>
              <p className="text-2xl font-bold text-gray-900">{fmt(needed)}</p>
              <p className="text-xs text-gray-500 mt-0.5">Gap to close</p>
            </div>
            <div className={`rounded-xl border p-4 text-center ${yearsToFire !== null ? 'bg-indigo-50 border-indigo-200' : 'bg-gray-50 border-gray-200'}`}>
              <p className={`text-xs mb-1 ${yearsToFire !== null ? 'text-indigo-700' : 'text-gray-500'}`}>Years to FIRE</p>
              <p className={`text-2xl font-bold ${yearsToFire !== null ? 'text-indigo-700' : 'text-gray-400'}`}>
                {yearsToFire !== null ? yearsToFire : '—'}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">At current savings rate</p>
            </div>
          </div>

          {/* Progress bar */}
          {fireNumber > 0 && (
            <div>
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Progress to FIRE</span>
                <span>{Math.min(100, Math.round((savings / fireNumber) * 100))}%</span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (savings / fireNumber) * 100)}%` }}
                />
              </div>
            </div>
          )}

          <p className="text-xs text-gray-400 text-center">
            Illustrative only. Returns assumed constant — real markets vary. Consult a financial advisor.
          </p>
        </div>
      )}
    </div>
  )
}
