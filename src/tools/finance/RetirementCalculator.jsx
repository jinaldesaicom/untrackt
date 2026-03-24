import { useState } from 'react'
import SEOHead from '../../components/SEOHead.jsx'
import DisclaimerBadge from '../../components/DisclaimerBadge.jsx'
import DisclaimerCard from '../../components/DisclaimerCard.jsx'

export default function RetirementCalculator() {
  const [inputs, setInputs] = useState({
    currentAge: 35,
    retirementAge: 65,
    currentSavings: 100000,
    monthlyContribution: 500,
    preReturnRate: 7,
    postReturnRate: 4,
    monthlyExpenses: 4000,
    inflationRate: 3,
    lifeExpectancy: 85,
  })

  const yearsToRetirement = parseInt(inputs.retirementAge) - parseInt(inputs.currentAge)
  const monthlyPreReturn = parseFloat(inputs.preReturnRate) / 100 / 12
  const preRetirementMonths = yearsToRetirement * 12

  let savingsAtRetirement = parseFloat(inputs.currentSavings) || 0
  for (let i = 0; i < preRetirementMonths; i++) {
    savingsAtRetirement = savingsAtRetirement * (1 + monthlyPreReturn) + (parseFloat(inputs.monthlyContribution) || 0)
  }

  // Adjust for inflation
  const inflationFactor = Math.pow(1 + parseFloat(inputs.inflationRate) / 100, yearsToRetirement)
  const monthlyExpensesAdjusted = (parseFloat(inputs.monthlyExpenses) || 0) * inflationFactor

  // Monthly income from savings
  const monthlyPostReturn = parseFloat(inputs.postReturnRate) / 100 / 12
  const yearsInRetirement = parseInt(inputs.lifeExpectancy) - parseInt(inputs.retirementAge)
  const monthsInRetirement = yearsInRetirement * 12

  // Monthly withdrawal = expenses (assuming drawdown)
  let balance = savingsAtRetirement
  let totalMonths = 0
  for (let i = 0; i < monthsInRetirement; i++) {
    balance = balance * (1 + monthlyPostReturn) - monthlyExpensesAdjusted
    totalMonths++
    if (balance < 0) break
  }

  const willLastFullRetirement = balance >= 0
  const yearsWillLast = Math.floor(totalMonths / 12)
  const savingsGap = monthlyExpensesAdjusted * Math.max(0, monthsInRetirement - totalMonths)

  // Status
  const monthlyIncomeFromSavings = savingsAtRetirement > 0 ? (savingsAtRetirement * monthlyPostReturn) : 0
  let status = 'At Risk'
  if (balance >= monthlyExpensesAdjusted * 24) status = 'On Track'
  else if (balance >= 0) status = 'Needs Attention'

  const fmt = (v) => v.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

  // Projection table
  const projections = []
  let testBalance = savingsAtRetirement
  for (let year = 1; year <= yearsInRetirement; year++) {
    const age = parseInt(inputs.retirementAge) + year
    for (let m = 0; m < 12; m++) {
      testBalance = testBalance * (1 + monthlyPostReturn) - monthlyExpensesAdjusted
    }
    projections.push({
      age,
      year,
      balance: Math.max(0, testBalance),
      inflationAdjustedValue: Math.max(0, testBalance) / Math.pow(1 + parseFloat(inputs.inflationRate) / 100, year),
    })
  }

  return (
    <>
      <SEOHead
        title="Retirement Calculator | UnTrackt"
        description="Plan for retirement with projection of savings, withdrawal rates, and longevity. Calculate if you're on track."
        path="/tools/retirement-calculator"
        toolName="Retirement Calculator"
      />

      <DisclaimerBadge />
      <DisclaimerCard type="finance" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Age</label>
              <input
                type="number"
                value={inputs.currentAge}
                onChange={e => setInputs({ ...inputs, currentAge: e.target.value })}
                className="input-field"
                min="18"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Retirement Age</label>
              <input
                type="number"
                value={inputs.retirementAge}
                onChange={e => setInputs({ ...inputs, retirementAge: e.target.value })}
                className="input-field"
                min="50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Savings ($)</label>
              <input
                type="number"
                value={inputs.currentSavings}
                onChange={e => setInputs({ ...inputs, currentSavings: e.target.value })}
                className="input-field"
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Contribution ($)</label>
              <input
                type="number"
                value={inputs.monthlyContribution}
                onChange={e => setInputs({ ...inputs, monthlyContribution: e.target.value })}
                className="input-field"
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pre-Retirement Return (%)</label>
              <input
                type="number"
                value={inputs.preReturnRate}
                onChange={e => setInputs({ ...inputs, preReturnRate: e.target.value })}
                className="input-field"
                min="0"
                step="0.5"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Post-Retirement Return (%)</label>
              <input
                type="number"
                value={inputs.postReturnRate}
                onChange={e => setInputs({ ...inputs, postReturnRate: e.target.value })}
                className="input-field"
                min="0"
                step="0.5"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Expenses ($)</label>
              <input
                type="number"
                value={inputs.monthlyExpenses}
                onChange={e => setInputs({ ...inputs, monthlyExpenses: e.target.value })}
                className="input-field"
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Inflation Rate (%)</label>
              <input
                type="number"
                value={inputs.inflationRate}
                onChange={e => setInputs({ ...inputs, inflationRate: e.target.value })}
                className="input-field"
                min="0"
                step="0.5"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Life Expectancy</label>
              <input
                type="number"
                value={inputs.lifeExpectancy}
                onChange={e => setInputs({ ...inputs, lifeExpectancy: e.target.value })}
                className="input-field"
                min="65"
              />
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-2 space-y-6">
          {/* Status */}
          <div className={`p-6 rounded-xl border-2 ${
            status === 'On Track' ? 'bg-green-50 border-green-200' :
            status === 'Needs Attention' ? 'bg-yellow-50 border-yellow-200' :
            'bg-red-50 border-red-200'
          }`}>
            <p className="text-sm font-semibold mb-1">Retirement Status</p>
            <p className={`text-3xl font-bold ${
              status === 'On Track' ? 'text-green-700' :
              status === 'Needs Attention' ? 'text-yellow-700' :
              'text-red-700'
            }`}>
              {status}
            </p>
          </div>

          {/* Key Numbers */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-xs text-blue-600 mb-1">At Retirement</p>
              <p className="text-2xl font-bold text-blue-700">{fmt(savingsAtRetirement)}</p>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
              <p className="text-xs text-purple-600 mb-1">Years in Retirement</p>
              <p className="text-2xl font-bold text-purple-700">{yearsWillLast}</p>
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
              <p className="text-xs text-orange-600 mb-1">Monthly (Inflation Adj)</p>
              <p className="text-2xl font-bold text-orange-700">{fmt(monthlyExpensesAdjusted)}</p>
            </div>
          </div>

          {/* Projection Table */}
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">Retirement Projection</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left px-3 py-2 font-semibold text-gray-700">Age</th>
                    <th className="text-right px-3 py-2 font-semibold text-gray-700">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {projections.slice(0, 25).map((row, idx) => (
                    <tr key={idx} className={`border-b border-gray-100 ${row.balance < monthlyExpensesAdjusted * 12 ? 'bg-red-50' : ''}`}>
                      <td className="px-3 py-2 text-gray-900 font-medium">{row.age}</td>
                      <td className="px-3 py-2 text-right text-gray-900">{fmt(row.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
