import { useState } from 'react'

export default function HourlyRateCalculator() {
  const [income, setIncome] = useState('80000')
  const [vacation, setVacation] = useState('4')
  const [hoursPerWeek, setHoursPerWeek] = useState('40')
  const [expenses, setExpenses] = useState('5000')
  const [taxRate, setTaxRate] = useState('25')

  const calculate = () => {
    const annualIncome = parseFloat(income) || 0
    const vacationWeeks = parseFloat(vacation) || 0
    const hours = parseFloat(hoursPerWeek) || 40
    const annualExpenses = parseFloat(expenses) || 0
    const tax = (parseFloat(taxRate) || 0) / 100

    const workWeeks = 52 - vacationWeeks
    const billableHours = workWeeks * hours
    const totalNeeded = annualIncome + annualExpenses
    const minimum = totalNeeded / billableHours
    const recommended = minimum * 1.3
    const effectiveAfterTax = minimum * (1 - tax)

    return { minimum, recommended, effectiveAfterTax, billableHours, totalNeeded }
  }

  const r = calculate()
  const fmt = (n) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 })

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Annual Income Goal ($)</label>
          <input type="number" value={income} onChange={(e) => setIncome(e.target.value)} className="input-field" min="0" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Weeks Vacation per Year</label>
          <input type="number" value={vacation} onChange={(e) => setVacation(e.target.value)} className="input-field" min="0" max="52" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Hours Worked per Week</label>
          <input type="number" value={hoursPerWeek} onChange={(e) => setHoursPerWeek(e.target.value)} className="input-field" min="1" max="80" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Annual Business Expenses ($)</label>
          <input type="number" value={expenses} onChange={(e) => setExpenses(e.target.value)} className="input-field" min="0" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tax Rate (%)</label>
          <input type="number" value={taxRate} onChange={(e) => setTaxRate(e.target.value)} className="input-field" min="0" max="100" />
        </div>
      </div>

      {/* Results */}
      <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5 space-y-4">
        <h3 className="text-sm font-semibold text-gray-800 mb-2">Calculation Results</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-indigo-100 p-4 text-center">
            <p className="text-xs text-gray-500 mb-1">Minimum Hourly Rate</p>
            <p className="text-2xl font-bold text-indigo-700">{fmt(r.minimum)}</p>
          </div>
          <div className="bg-indigo-600 rounded-xl border border-indigo-700 p-4 text-center">
            <p className="text-xs text-indigo-200 mb-1">Recommended Rate (+30%)</p>
            <p className="text-2xl font-bold text-white">{fmt(r.recommended)}</p>
          </div>
          <div className="bg-white rounded-xl border border-indigo-100 p-4 text-center">
            <p className="text-xs text-gray-500 mb-1">Effective After Tax</p>
            <p className="text-2xl font-bold text-gray-700">{fmt(r.effectiveAfterTax)}</p>
          </div>
        </div>

        <div className="border-t border-indigo-100 pt-4 grid grid-cols-2 gap-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Billable hours/year</span>
            <span className="font-medium text-gray-900">{r.billableHours.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Total needed/year</span>
            <span className="font-medium text-gray-900">{fmt(r.totalNeeded)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
