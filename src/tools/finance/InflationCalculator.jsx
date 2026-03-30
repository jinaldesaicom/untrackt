import { useState } from 'react'
import SEOHead from '../../components/SEOHead.jsx'
import { calculateInflation, calculateFutureValue, getAvailableYears } from '../../data/inflationData.js'
import { formatCurrency, getCurrencySymbol } from '../../utils/currency.js'

export default function InflationCalculator() {
  const [mode, setMode] = useState('pastToPresent')
  const [amount, setAmount] = useState(1000)
  const [fromYear, setFromYear] = useState(2000)
  const [toYear, setToYear] = useState(2024)
  const [inflationRate, setInflationRate] = useState(3)

  const availableYears = getAvailableYears()

  if (mode === 'pastToPresent') {
    const result = calculateInflation(parseFloat(amount), parseInt(fromYear), parseInt(toYear))

    const yearData = []
    for (let y = fromYear; y <= toYear; y++) {
      const res = calculateInflation(parseFloat(amount), fromYear, y)
      if (res) yearData.push({ year: y, value: res.adjustedAmount })
    }

    return (
      <>
        <SEOHead
          title="Inflation Calculator | UnTrackt"
          description="Calculate what past money is worth today using historical CPI data. See purchasing power changes."
          path="/tools/inflation-calculator"
          toolName="Inflation Calculator"
        />


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-4">
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => setMode('pastToPresent')}
                  className={`flex-1 py-2 rounded-lg font-medium ${mode === 'pastToPresent' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
                >
                  Past → Now
                </button>
                <button
                  onClick={() => setMode('futureValue')}
                  className={`flex-1 py-2 rounded-lg font-medium ${mode === 'futureValue' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
                >
                  Future
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount ({getCurrencySymbol()})</label>
                <input
                  type="number"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  className="input-field"
                  min="0"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">From Year</label>
                  <select
                    value={fromYear}
                    onChange={e => setFromYear(e.target.value)}
                    className="input-field text-sm"
                  >
                    {availableYears.slice(0, 50).map(y => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">To Year</label>
                  <select
                    value={toYear}
                    onChange={e => setToYear(e.target.value)}
                    className="input-field text-sm"
                  >
                    {availableYears.slice(-20).map(y => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            {result && (
              <>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 min-w-0">
                    <p className="text-xs text-blue-600 mb-1">Original Amount</p>
                    <p className="text-xl sm:text-2xl font-bold text-blue-700 break-all leading-tight">{formatCurrency(parseFloat(amount), { minimumFractionDigits: 2 })}</p>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4 min-w-0">
                    <p className="text-xs text-green-600 mb-1">Adjusted Value</p>
                    <p className="text-xl sm:text-2xl font-bold text-green-700 break-all leading-tight">{formatCurrency(result.adjustedAmount, { minimumFractionDigits: 2 })}</p>
                  </div>
                  <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                    <p className="text-xs text-orange-600 mb-1">Cumulative Inflation</p>
                    <p className="text-2xl font-bold text-orange-700">{result.inflationPercent.toFixed(1)}%</p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-4">Year-by-Year Adjustment</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="text-left px-3 py-2 font-semibold text-gray-700">Year</th>
                          <th className="text-right px-3 py-2 font-semibold text-gray-700">Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        {yearData.map((row, idx) => (
                          <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="px-3 py-2 text-gray-900 font-medium">{row.year}</td>
                            <td className="px-3 py-2 text-right text-gray-900">{formatCurrency(row.value, { minimumFractionDigits: 2 })}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </>
    )
  } else {
    const futureVal = calculateFutureValue(parseFloat(amount), parseInt(toYear), parseFloat(inflationRate))

    return (
      <>
        <SEOHead
          title="Inflation Calculator | UnTrackt"
          description="Calculate what past money is worth today using historical CPI data. See purchasing power changes."
          path="/tools/inflation-calculator"
          toolName="Inflation Calculator"
        />


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-4">
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => setMode('pastToPresent')}
                  className={`flex-1 py-2 rounded-lg font-medium ${mode === 'pastToPresent' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
                >
                  Past → Now
                </button>
                <button
                  onClick={() => setMode('futureValue')}
                  className={`flex-1 py-2 rounded-lg font-medium ${mode === 'futureValue' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
                >
                  Future
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount ({getCurrencySymbol()})</label>
                <input
                  type="number"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  className="input-field"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Years Into Future</label>
                <input
                  type="number"
                  value={toYear}
                  onChange={e => setToYear(e.target.value)}
                  className="input-field"
                  min="1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Annual Inflation Rate (%)</label>
                <input
                  type="number"
                  value={inflationRate}
                  onChange={e => setInflationRate(e.target.value)}
                  className="input-field"
                  min="0"
                  step="0.5"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 min-w-0">
                <p className="text-xs text-blue-600 mb-1">Current Amount</p>
                <p className="text-xl sm:text-2xl font-bold text-blue-700 break-all leading-tight">{formatCurrency(parseFloat(amount), { minimumFractionDigits: 2 })}</p>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 min-w-0">
                <p className="text-xs text-red-600 mb-1">Future Spending Power</p>
                <p className="text-xl sm:text-2xl font-bold text-red-700 break-all leading-tight">{formatCurrency(futureVal, { minimumFractionDigits: 2 })}</p>
              </div>
            </div>

            <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 text-sm text-amber-900">
              <p>To maintain today's purchasing power in {toYear} years at {inflationRate}% inflation, you'll need {formatCurrency(futureVal, { minimumFractionDigits: 2 })}.</p>
            </div>
          </div>
        </div>
      </>
    )
  }
}
