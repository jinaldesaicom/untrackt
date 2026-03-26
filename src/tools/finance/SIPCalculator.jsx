import { useState } from 'react'
import SEOHead from '../../components/SEOHead.jsx'
import DisclaimerCard from '../../components/DisclaimerCard.jsx'

export default function SIPCalculator() {
  const [mode, setMode] = useState('sip')
  const [inputs, setInputs] = useState({
    monthlyAmount: 500,
    annualReturn: 12,
    duration: 10,
    stepUpRate: 0,
    lumpsumAmount: 100000,
  })

  const monthlyRate = parseFloat(inputs.annualReturn) / 100 / 12
  const months = parseInt(inputs.duration) * 12
  let totalInvested = 0
  let totalValue = 0

  if (mode === 'sip') {
    const monthlyAmt = parseFloat(inputs.monthlyAmount) || 0
    const stepUp = parseFloat(inputs.stepUpRate) / 100 || 0

    for (let i = 1; i <= months; i++) {
      const yearNum = Math.floor((i - 1) / 12)
      const monthAmount = monthlyAmt * Math.pow(1 + stepUp, yearNum)
      totalInvested += monthAmount
      totalValue = totalValue * (1 + monthlyRate) + monthAmount
    }
  } else {
    totalInvested = parseFloat(inputs.lumpsumAmount) || 0
    totalValue = totalInvested * Math.pow(1 + monthlyRate, months)
  }

  const returns = totalValue - totalInvested
  const annualizedReturn = (Math.pow(totalValue / totalInvested, 1 / inputs.duration) - 1) * 100

  // Year by year
  const yearlyData = []
  for (let year = 1; year <= parseInt(inputs.duration); year++) {
    let yearInvested = 0
    let yearValue = 0

    if (mode === 'sip') {
      const monthlyAmt = parseFloat(inputs.monthlyAmount) || 0
      const stepUp = parseFloat(inputs.stepUpRate) / 100 || 0
      for (let m = (year - 1) * 12 + 1; m <= year * 12; m++) {
        const yearNum = Math.floor((m - 1) / 12)
        const monthAmount = monthlyAmt * Math.pow(1 + stepUp, yearNum)
        yearInvested += monthAmount
      }
      yearValue = totalInvested * Math.pow(1 + monthlyRate, year * 12)
    } else {
      yearInvested = totalInvested
      yearValue = totalInvested * Math.pow(1 + monthlyRate, year * 12)
    }
    yearlyData.push({ year, invested: yearInvested, value: yearValue, returns: yearValue - yearInvested })
  }

  const fmt = (v) => v.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

  return (
    <>
      <SEOHead
        title="SIP Calculator | UnTrackt"
        description="Calculate Systematic Investment Plan or lumpsum investment growth. See year-by-year projections and total returns."
        path="/tools/sip-calculator"
        toolName="SIP Calculator"
      />

      <DisclaimerCard type="finance" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-4">
            <div className="flex gap-2">
              <button
                onClick={() => setMode('sip')}
                className={`flex-1 py-2 rounded-lg font-medium transition-colors ${mode === 'sip' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                SIP (Monthly)
              </button>
              <button
                onClick={() => setMode('lumpsum')}
                className={`flex-1 py-2 rounded-lg font-medium transition-colors ${mode === 'lumpsum' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                Lumpsum
              </button>
            </div>

            {mode === 'sip' ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Investment ($)</label>
                  <input
                    type="number"
                    value={inputs.monthlyAmount}
                    onChange={e => setInputs({ ...inputs, monthlyAmount: e.target.value })}
                    className="input-field"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Annual Step-up Rate (%)</label>
                  <input
                    type="number"
                    value={inputs.stepUpRate}
                    onChange={e => setInputs({ ...inputs, stepUpRate: e.target.value })}
                    className="input-field"
                    min="0"
                    step="0.5"
                  />
                </div>
              </>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Lumpsum Amount ($)</label>
                <input
                  type="number"
                  value={inputs.lumpsumAmount}
                  onChange={e => setInputs({ ...inputs, lumpsumAmount: e.target.value })}
                  className="input-field"
                  min="0"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Expected Annual Return (%)</label>
              <input
                type="number"
                value={inputs.annualReturn}
                onChange={e => setInputs({ ...inputs, annualReturn: e.target.value })}
                className="input-field"
                min="0"
                step="0.5"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Duration (years)</label>
              <input
                type="number"
                value={inputs.duration}
                onChange={e => setInputs({ ...inputs, duration: e.target.value })}
                className="input-field"
                min="1"
                max="50"
              />
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-xs text-blue-600 mb-1">Total Invested</p>
              <p className="text-2xl font-bold text-blue-700">{fmt(totalInvested)}</p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <p className="text-xs text-green-600 mb-1">Returns Earned</p>
              <p className="text-2xl font-bold text-green-700">{fmt(returns)}</p>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
              <p className="text-xs text-purple-600 mb-1">Total Value</p>
              <p className="text-2xl font-bold text-purple-700">{fmt(totalValue)}</p>
            </div>
          </div>

          {/* Year by year */}
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">Year-by-Year Growth</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left px-3 py-2 font-semibold text-gray-700">Year</th>
                    <th className="text-right px-3 py-2 font-semibold text-gray-700">Invested</th>
                    <th className="text-right px-3 py-2 font-semibold text-gray-700">Returns</th>
                    <th className="text-right px-3 py-2 font-semibold text-gray-700">Total Value</th>
                  </tr>
                </thead>
                <tbody>
                  {yearlyData.map((row, idx) => (
                    <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-3 py-2 text-gray-900 font-medium">{row.year}</td>
                      <td className="px-3 py-2 text-right text-gray-900">{fmt(row.invested)}</td>
                      <td className="px-3 py-2 text-right text-green-600">{fmt(row.returns)}</td>
                      <td className="px-3 py-2 text-right text-gray-900 font-semibold">{fmt(row.value)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Visual */}
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">Wealth Composition</h3>
            <div className="flex rounded-lg overflow-hidden h-8 mb-3">
              <div className="bg-blue-500" style={{ width: `${(totalInvested / totalValue) * 100}%` }} />
              <div className="bg-green-500" style={{ width: `${(returns / totalValue) * 100}%` }} />
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-500" />
                <span>{((totalInvested / totalValue) * 100).toFixed(1)}% Invested</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-green-500" />
                <span>{((returns / totalValue) * 100).toFixed(1)}% Returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
