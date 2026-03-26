import { useState } from 'react'
import SEOHead from '../../components/SEOHead.jsx'
import DisclaimerCard from '../../components/DisclaimerCard.jsx'
import * as storage from '../../utils/storage.js'

const TAX_BRACKETS = {
  US: {
    2024: {
      Single: [
        { min: 0, max: 11000, rate: 0.10 },
        { min: 11000, max: 44725, rate: 0.12 },
        { min: 44725, max: 95375, rate: 0.22 },
        { min: 95375, max: 182100, rate: 0.24 },
        { min: 182100, max: 231250, rate: 0.32 },
        { min: 231250, max: 578125, rate: 0.35 },
        { min: 578125, max: Infinity, rate: 0.37 },
      ],
      'Married Filing Jointly': [
        { min: 0, max: 22000, rate: 0.10 },
        { min: 22000, max: 89075, rate: 0.12 },
        { min: 89075, max: 190750, rate: 0.22 },
        { min: 190750, max: 364200, rate: 0.24 },
        { min: 364200, max: 462500, rate: 0.32 },
        { min: 462500, max: 693750, rate: 0.35 },
        { min: 693750, max: Infinity, rate: 0.37 },
      ],
    },
  },
  UK: {
    2024: {
      Standard: [
        { min: 0, max: 12570, rate: 0.0 },
        { min: 12570, max: 50270, rate: 0.20 },
        { min: 50270, max: 125140, rate: 0.40 },
        { min: 125140, max: Infinity, rate: 0.45 },
      ],
    },
  },
  Canada: {
    2024: {
      Federal: [
        { min: 0, max: 55867, rate: 0.15 },
        { min: 55867, max: 111733, rate: 0.205 },
        { min: 111733, max: 173205, rate: 0.26 },
        { min: 173205, max: 246752, rate: 0.29 },
        { min: 246752, max: Infinity, rate: 0.33 },
      ],
    },
  },
  Australia: {
    2024: {
      Standard: [
        { min: 0, max: 18200, rate: 0.0 },
        { min: 18200, max: 45000, rate: 0.19 },
        { min: 45000, max: 120000, rate: 0.325 },
        { min: 120000, max: 180000, rate: 0.37 },
        { min: 180000, max: Infinity, rate: 0.45 },
      ],
    },
  },
  India: {
    2024: {
      Standard: [
        { min: 0, max: 250000, rate: 0.0 },
        { min: 250000, max: 500000, rate: 0.05 },
        { min: 500000, max: 1000000, rate: 0.20 },
        { min: 1000000, max: Infinity, rate: 0.30 },
      ],
    },
  },
  Germany: {
    2024: {
      Standard: [
        { min: 0, max: 11604, rate: 0.0 },
        { min: 11604, max: 62810, rate: 0.42 },
        { min: 62810, max: Infinity, rate: 0.45 },
      ],
    },
  },
  France: {
    2024: {
      Standard: [
        { min: 0, max: 10084, rate: 0.0 },
        { min: 10084, max: 27746, rate: 0.11 },
        { min: 27746, max: 74517, rate: 0.30 },
        { min: 74517, max: 157806, rate: 0.41 },
        { min: 157806, max: Infinity, rate: 0.45 },
      ],
    },
  },
  Singapore: {
    2024: {
      Standard: [
        { min: 0, max: 20000, rate: 0.0 },
        { min: 20000, max: 30000, rate: 0.025 },
        { min: 30000, max: 40000, rate: 0.05 },
        { min: 40000, max: 80000, rate: 0.075 },
        { min: 80000, max: 120000, rate: 0.11 },
        { min: 120000, max: 160000, rate: 0.15 },
        { min: 160000, max: 200000, rate: 0.18 },
        { min: 200000, max: 320000, rate: 0.19 },
        { min: 320000, max: Infinity, rate: 0.22 },
      ],
    },
  },
}

export default function TaxBracketEstimator() {
  const [country, setCountry] = useState('US')
  const [filingStatus, setFilingStatus] = useState('Single')
  const [income, setIncome] = useState(75000)

  const savedCountry = storage.getItem('tax:preferredCountry', country)
  if (savedCountry !== country) {
    storage.setItem('tax:preferredCountry', country)
  }

  const brackets = country in TAX_BRACKETS ? (TAX_BRACKETS[country]['2024'][filingStatus] || Object.values(TAX_BRACKETS[country]['2024'])[0]) : []

  let totalTax = 0
  let marginalRate = 0
  const bracketBreakdown = []

  brackets.forEach(bracket => {
    if (income > bracket.min) {
      const incomeInBracket = Math.min(income, bracket.max) - bracket.min
      const taxInBracket = incomeInBracket * bracket.rate
      totalTax += taxInBracket
      marginalRate = bracket.rate
      bracketBreakdown.push({
        min: bracket.min,
        max: bracket.max,
        rate: bracket.rate,
        incomeInBracket,
        taxInBracket,
      })
    }
  })

  const effectiveRate = income > 0 ? (totalTax / income) * 100 : 0
  const takeHome = income - totalTax
  const takeHomeMonthly = takeHome / 12
  const takeHomeWeekly = takeHome / 52

  const availableFiling = country in TAX_BRACKETS ? Object.keys(TAX_BRACKETS[country]['2024']) : ['Standard']

  return (
    <>
      <SEOHead
        title="Tax Bracket Estimator | UnTrackt"
        description="Estimate taxes and take-home pay across multiple countries. View tax brackets, effective rates, marginal rates. Educational estimates only."
        path="/tools/tax-bracket-estimator"
        toolName="Tax Bracket Estimator"
      />

      <DisclaimerCard type="finance" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
              <select
                value={country}
                onChange={e => {
                  setCountry(e.target.value)
                  setFilingStatus(Object.keys(TAX_BRACKETS[e.target.value]['2024'])[0])
                }}
                className="input-field"
              >
                {Object.keys(TAX_BRACKETS).map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Filing Status</label>
              <select
                value={filingStatus}
                onChange={e => setFilingStatus(e.target.value)}
                className="input-field"
              >
                {availableFiling.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gross Annual Income</label>
              <input
                type="number"
                value={income}
                onChange={e => setIncome(parseFloat(e.target.value) || 0)}
                className="input-field"
                min="0"
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-3">
            <h3 className="font-semibold text-gray-900">Key Metrics</h3>
            <div>
              <p className="text-xs text-gray-600">Effective Tax Rate</p>
              <p className="text-2xl font-bold text-gray-900">{effectiveRate.toFixed(2)}%</p>
            </div>
            <div>
              <p className="text-xs text-gray-600">Marginal Tax Rate</p>
              <p className="text-2xl font-bold text-gray-900">{(marginalRate * 100).toFixed(2)}%</p>
            </div>
            <div>
              <p className="text-xs text-gray-600">Estimated Tax Owed</p>
              <p className="text-2xl font-bold text-red-600">${totalTax.toLocaleString('en-US', { maximumFractionDigits: 2 })}</p>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-2 space-y-6">
          {/* Take Home */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <p className="text-xs text-green-600 mb-1">Annual Take-Home</p>
              <p className="text-2xl font-bold text-green-700">${takeHome.toLocaleString('en-US', { maximumFractionDigits: 2 })}</p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-xs text-blue-600 mb-1">Monthly Take-Home</p>
              <p className="text-2xl font-bold text-blue-700">${takeHomeMonthly.toLocaleString('en-US', { maximumFractionDigits: 2 })}</p>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
              <p className="text-xs text-purple-600 mb-1">Weekly Take-Home</p>
              <p className="text-2xl font-bold text-purple-700">${takeHomeWeekly.toLocaleString('en-US', { maximumFractionDigits: 2 })}</p>
            </div>
          </div>

          {/* Bracket Breakdown */}
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">Tax Bracket Breakdown</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left px-3 py-2 font-semibold text-gray-700">Bracket Range</th>
                    <th className="text-center px-3 py-2 font-semibold text-gray-700">Rate</th>
                    <th className="text-right px-3 py-2 font-semibold text-gray-700">Income in Bracket</th>
                    <th className="text-right px-3 py-2 font-semibold text-gray-700">Tax</th>
                  </tr>
                </thead>
                <tbody>
                  {bracketBreakdown.map((bracket, idx) => (
                    <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-3 py-2 text-gray-900">
                        ${bracket.min.toLocaleString()} - ${bracket.max === Infinity ? '∞' : bracket.max.toLocaleString()}
                      </td>
                      <td className="px-3 py-2 text-center text-gray-900 font-medium">{(bracket.rate * 100).toFixed(2)}%</td>
                      <td className="px-3 py-2 text-right text-gray-900">${bracket.incomeInBracket.toLocaleString('en-US', { maximumFractionDigits: 2 })}</td>
                      <td className="px-3 py-2 text-right text-gray-900 font-medium">${bracket.taxInBracket.toLocaleString('en-US', { maximumFractionDigits: 2 })}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Visual */}
          {income > 0 && (
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">Income Breakdown</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-600">Gross Income vs Tax</span>
                </div>
                <div className="flex rounded-lg overflow-hidden h-10">
                  <div
                    className="bg-green-500 flex items-center justify-center text-white text-sm font-semibold"
                    style={{ width: `${(takeHome / income) * 100}%` }}
                  >
                    Take-home {((takeHome / income) * 100).toFixed(0)}%
                  </div>
                  <div
                    className="bg-red-500 flex items-center justify-center text-white text-sm font-semibold"
                    style={{ width: `${(totalTax / income) * 100}%` }}
                  >
                    Tax {((totalTax / income) * 100).toFixed(0)}%
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs mt-2">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded bg-green-500" />
                    <span className="text-gray-600">Take-home: ${takeHome.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded bg-red-500" />
                    <span className="text-gray-600">Taxes: ${totalTax.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-900">
            <p className="font-semibold mb-1">Tax rates are approximate estimates for 2024/2025.</p>
            <p>Consult your country's official tax authority or a tax professional for accurate figures.</p>
          </div>
        </div>
      </div>
    </>
  )
}
