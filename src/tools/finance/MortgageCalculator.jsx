import { useState } from 'react'
import SEOHead from '../../components/SEOHead.jsx'
import DisclaimerCard from '../../components/DisclaimerCard.jsx'
import useDebounce from '../../hooks/useDebounce.js'

export default function MortgageCalculator() {
  const [inputs, setInputs] = useState({
    homePrice: 300000,
    downPaymentType: '%',
    downPaymentValue: 20,
    loanTerm: 30,
    interestRate: 6.5,
    propertyTax: 200,
    homeInsurance: 100,
    pmiRate: 0.5,
    hoaFees: 0,
  })
  const debouncedInputs = useDebounce(inputs, 300)

  const homePrice = parseFloat(debouncedInputs.homePrice) || 0
  const downPayment = debouncedInputs.downPaymentType === '%'
    ? homePrice * (parseFloat(debouncedInputs.downPaymentValue) / 100)
    : parseFloat(debouncedInputs.downPaymentValue) || 0
  const principal = homePrice - downPayment
  const monthlyRate = parseFloat(debouncedInputs.interestRate) / 100 / 12
  const numberOfPayments = parseFloat(debouncedInputs.loanTerm) * 12
  const monthlyPropertyTax = (parseFloat(debouncedInputs.propertyTax) || 0) / 12
  const monthlyInsurance = (parseFloat(debouncedInputs.homeInsurance) || 0) / 12
  const ltv = homePrice > 0 ? (principal / homePrice) * 100 : 0
  const monthlyPmi = ltv > 80 ? (principal * (parseFloat(debouncedInputs.pmiRate) / 100 / 12)) : 0
  const monthlyHoa = (parseFloat(debouncedInputs.hoaFees) || 0)

  const monthlyPI = monthlyRate === 0
    ? principal / numberOfPayments
    : (principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1)

  const monthlyPayment = monthlyPI + monthlyPropertyTax + monthlyInsurance + monthlyPmi + monthlyHoa
  const totalPayment = monthlyPayment * numberOfPayments
  const totalInterest = monthlyPI * numberOfPayments - principal

  // PMI removal date
  const pmiRemovalPayments = ltv > 80 ? Math.ceil((principal * 0.2) / (monthlyPI)) : 0
  const pmiRemovalDate = new Date()
  pmiRemovalDate.setMonth(pmiRemovalDate.getMonth() + pmiRemovalPayments)

  // Amortization
  const schedule = []
  let balance = principal
  let totalPrincipal = 0
  let totalInt = 0
  for (let year = 1; year <= Math.min(parseInt(debouncedInputs.loanTerm), 40); year++) {
    let yearPrincipal = 0
    let yearInterest = 0
    for (let m = 0; m < 12; m++) {
      const interestPayment = balance * monthlyRate
      const principalPayment = monthlyPI - interestPayment
      yearPrincipal += principalPayment
      yearInterest += interestPayment
      balance = Math.max(0, balance - principalPayment)
    }
    totalPrincipal += yearPrincipal
    totalInt += yearInterest
    schedule.push({ year, principal: yearPrincipal, interest: yearInterest, balance })
  }

  const fmt = (v) => v.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 })

  const pctPrincipal = totalPayment > 0 ? (principal / totalPayment) * 100 : 0
  const pctInterest = 100 - pctPrincipal

  return (
    <>
      <SEOHead
        title="Mortgage Calculator | UnTrackt"
        description="Calculate mortgage payments, amortization, PMI, property taxes. See total interest paid and when PMI drops off."
        path="/tools/mortgage-calculator"
        toolName="Mortgage Calculator"
      />

      <DisclaimerCard type="finance" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Home Price ($)</label>
              <input
                type="number"
                value={inputs.homePrice}
                onChange={e => setInputs({ ...inputs, homePrice: e.target.value })}
                className="input-field"
                min="0"
                step="1000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Down Payment</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={inputs.downPaymentValue}
                  onChange={e => setInputs({ ...inputs, downPaymentValue: e.target.value })}
                  className="input-field flex-1"
                  min="0"
                />
                <select
                  value={inputs.downPaymentType}
                  onChange={e => setInputs({ ...inputs, downPaymentType: e.target.value })}
                  className="input-field w-20"
                >
                  <option value="%">%</option>
                  <option value="$">$</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Loan Term (years)</label>
              <select
                value={inputs.loanTerm}
                onChange={e => setInputs({ ...inputs, loanTerm: e.target.value })}
                className="input-field"
              >
                {[10, 15, 20, 25, 30].map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Annual Interest Rate (%)</label>
              <input
                type="number"
                value={inputs.interestRate}
                onChange={e => setInputs({ ...inputs, interestRate: e.target.value })}
                className="input-field"
                min="0"
                step="0.1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Annual Property Tax ($)</label>
              <input
                type="number"
                value={inputs.propertyTax}
                onChange={e => setInputs({ ...inputs, propertyTax: e.target.value })}
                className="input-field"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Annual Home Insurance ($)</label>
              <input
                type="number"
                value={inputs.homeInsurance}
                onChange={e => setInputs({ ...inputs, homeInsurance: e.target.value })}
                className="input-field"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">PMI Rate (%)</label>
              <input
                type="number"
                value={inputs.pmiRate}
                onChange={e => setInputs({ ...inputs, pmiRate: e.target.value })}
                className="input-field"
                min="0"
                step="0.1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Monthly HOA Fees ($)</label>
              <input
                type="number"
                value={inputs.hoaFees}
                onChange={e => setInputs({ ...inputs, hoaFees: e.target.value })}
                className="input-field"
                min="0"
              />
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-2 space-y-6">
          {/* Payment Breakdown */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-xs text-blue-600 mb-1">Principal & Interest</p>
              <p className="text-2xl font-bold text-blue-700">{fmt(monthlyPI)}</p>
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
              <p className="text-xs text-orange-600 mb-1">Tax</p>
              <p className="text-2xl font-bold text-orange-700">{fmt(monthlyPropertyTax)}</p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <p className="text-xs text-green-600 mb-1">Insurance</p>
              <p className="text-2xl font-bold text-green-700">{fmt(monthlyInsurance)}</p>
            </div>
            {monthlyPmi > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="text-xs text-red-600 mb-1">PMI</p>
                <p className="text-2xl font-bold text-red-700">{fmt(monthlyPmi)}</p>
              </div>
            )}
            {monthlyHoa > 0 && (
              <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                <p className="text-xs text-purple-600 mb-1">HOA</p>
                <p className="text-2xl font-bold text-purple-700">{fmt(monthlyHoa)}</p>
              </div>
            )}
            <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 lg:col-span-1">
              <p className="text-xs text-indigo-600 mb-1">Total Monthly</p>
              <p className="text-2xl font-bold text-indigo-700">{fmt(monthlyPayment)}</p>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">Loan Summary</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600 mb-1">Home Price</p>
                <p className="font-semibold text-gray-900">{fmt(homePrice)}</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Down Payment</p>
                <p className="font-semibold text-gray-900">{fmt(downPayment)}</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Loan Amount</p>
                <p className="font-semibold text-gray-900">{fmt(principal)}</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Total Interest</p>
                <p className="font-semibold text-red-600">{fmt(totalInterest)}</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Total Paid</p>
                <p className="font-semibold text-gray-900">{fmt(totalPayment)}</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">LTV Ratio</p>
                <p className="font-semibold text-gray-900">{ltv.toFixed(1)}%</p>
              </div>
              {monthlyPmi > 0 && (
                <div>
                  <p className="text-gray-600 mb-1">PMI Drops Off</p>
                  <p className="font-semibold text-gray-900">{pmiRemovalDate.toLocaleDateString()}</p>
                </div>
              )}
            </div>
          </div>

          {/* Principal vs Interest */}
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">Principal vs Interest</h3>
            <div className="flex rounded-lg overflow-hidden h-8 mb-3">
              <div className="bg-blue-500" style={{ width: `${pctPrincipal}%` }} />
              <div className="bg-red-400" style={{ width: `${pctInterest}%` }} />
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-500" />
                <span>{pctPrincipal.toFixed(1)}% Principal ({fmt(principal)})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-400" />
                <span>{pctInterest.toFixed(1)}% Interest ({fmt(totalInterest)})</span>
              </div>
            </div>
          </div>

          {/* Amortization */}
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">Amortization Schedule (Year by Year)</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left px-3 py-2 font-semibold text-gray-700">Year</th>
                    <th className="text-right px-3 py-2 font-semibold text-gray-700">Principal</th>
                    <th className="text-right px-3 py-2 font-semibold text-gray-700">Interest</th>
                    <th className="text-right px-3 py-2 font-semibold text-gray-700">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {schedule.map((row, idx) => (
                    <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-3 py-2 text-gray-900 font-medium">{row.year}</td>
                      <td className="px-3 py-2 text-right text-gray-900">{fmt(row.principal)}</td>
                      <td className="px-3 py-2 text-right text-gray-900">{fmt(row.interest)}</td>
                      <td className="px-3 py-2 text-right text-gray-900 font-semibold">{fmt(row.balance)}</td>
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
