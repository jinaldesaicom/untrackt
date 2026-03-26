import { useState } from 'react'
import SEOHead from '../../components/SEOHead.jsx'
import DisclaimerCard from '../../components/DisclaimerCard.jsx'

export default function RuleOf72Calculator() {
  const [mode, setMode] = useState('yearsToDo uble')
  const [rate, setRate] = useState(7)
  const [years, setYears] = useState(10.3)

  const ruleOf72Rate = 72 / parseFloat(years) || 0
  const actualRate = (Math.pow(2, 1 / parseFloat(years)) - 1) * 100 || 0

  const ruleOf72Years = 72 / parseFloat(rate) || 0
  const actualYears = Math.log(2) / Math.log(1 + parseFloat(rate) / 100)

  const comparisonRates = [1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 20]

  return (
    <>
      <SEOHead
        title="Rule of 72 Calculator | UnTrackt"
        description="Estimate how long money takes to double using the Rule of 72. See actual vs estimated calculations."
        path="/tools/rule-of-72-calculator"
        toolName="Rule of 72 Calculator"
      />

      <DisclaimerCard type="finance" />

      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Mode 1: Years to Double */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-4">
            <h2 className="font-semibold text-lg text-gray-900">How long to double?</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Annual Rate (%)</label>
              <input
                type="number"
                value={rate}
                onChange={e => setRate(e.target.value)}
                className="input-field"
                min="0"
                step="0.5"
              />
            </div>

            <div className="space-y-3 bg-blue-50 p-4 rounded-lg">
              <div>
                <p className="text-sm text-blue-600 mb-1">Rule of 72 Estimate</p>
                <p className="text-3xl font-bold text-blue-700">{ruleOf72Years.toFixed(1)} years</p>
              </div>
              <div>
                <p className="text-sm text-purple-600 mb-1">Actual Calculation</p>
                <p className="text-3xl font-bold text-purple-700">{actualYears.toFixed(1)} years</p>
              </div>
              <div className="text-xs text-gray-600 pt-2 border-t border-blue-200">
                Difference: {Math.abs(ruleOf72Years - actualYears).toFixed(1)} years
              </div>
            </div>
          </div>

          {/* Mode 2: Rate to double in X years */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-4">
            <h2 className="font-semibold text-lg text-gray-900">What rate to double in X years?</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Years</label>
              <input
                type="number"
                value={years}
                onChange={e => setYears(e.target.value)}
                className="input-field"
                min="1"
                step="0.5"
              />
            </div>

            <div className="space-y-3 bg-green-50 p-4 rounded-lg">
              <div>
                <p className="text-sm text-green-600 mb-1">Rule of 72 Estimate</p>
                <p className="text-3xl font-bold text-green-700">{ruleOf72Rate.toFixed(2)}%</p>
              </div>
              <div>
                <p className="text-sm text-emerald-600 mb-1">Actual Calculation</p>
                <p className="text-3xl font-bold text-emerald-700">{actualRate.toFixed(2)}%</p>
              </div>
              <div className="text-xs text-gray-600 pt-2 border-t border-green-200">
                Difference: {Math.abs(ruleOf72Rate - actualRate).toFixed(2)}%
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="font-semibold text-lg text-gray-900 mb-4">Common Rates: Years to Double</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-4 py-2 font-semibold text-gray-700">Annual Rate</th>
                  <th className="text-center px-4 py-2 font-semibold text-gray-700">Rule of 72</th>
                  <th className="text-center px-4 py-2 font-semibold text-gray-700">Actual</th>
                  <th className="text-center px-4 py-2 font-semibold text-gray-700">Difference</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRates.map(rate => {
                  const rule = 72 / rate
                  const actual = Math.log(2) / Math.log(1 + rate / 100)
                  return (
                    <tr key={rate} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-2 text-gray-900 font-medium">{rate}%</td>
                      <td className="px-4 py-2 text-center text-gray-900">{rule.toFixed(2)} years</td>
                      <td className="px-4 py-2 text-center text-gray-900">{actual.toFixed(2)} years</td>
                      <td className="px-4 py-2 text-center text-orange-600 font-semibold">{Math.abs(rule - actual).toFixed(2)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Education */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="font-semibold text-blue-900 mb-3">About the Rule of 72</h3>
          <p className="text-blue-900 text-sm mb-3">
            The Rule of 72 is a quick way to estimate how long it takes for money to double at a given interest rate.
          </p>
          <p className="text-blue-900 dark:text-blue-100 text-sm mb-3 font-mono bg-white dark:bg-gray-900/60 p-3 rounded">
            Years to double = 72 ÷ Annual Rate (%)
          </p>
          <p className="text-blue-900 text-sm">
            The rule is most accurate for rates between 5% and 10%. For very high or very low rates, the actual calculation differs more from the estimate.
          </p>
        </div>
      </div>
    </>
  )
}
