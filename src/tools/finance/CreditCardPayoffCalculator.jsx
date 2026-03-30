import { useState } from 'react'
import SEOHead from '../../components/SEOHead.jsx'
import DisclaimerCard from '../../components/DisclaimerCard.jsx'
import { formatCurrency } from '../../utils/currency.js'

export default function CreditCardPayoffCalculator() {
  const [inputs, setInputs] = useState({
    balance: 5000,
    rate: 18.5,
    minPayment: 150,
    extraPayment: 0
  })

  const calculate = () => {
    let balance = inputs.balance
    let rate = inputs.rate / 100 / 12
    let totalInterest = 0
    let months = 0
    let schedule = []

    while (balance > 0 && months < 600) {
      const interest = balance * rate
      const payment = Math.min(balance + interest, Math.max(inputs.minPayment + inputs.extraPayment, balance * 0.1 + interest))
      balance = Math.max(0, balance + interest - payment)
      totalInterest += interest
      months++

      if (months <= 12 || months % 12 === 0 || balance === 0) {
        schedule.push({
          month: months,
          payment: payment,
          interest: interest,
          principal: payment - interest,
          balance: balance
        })
      }
    }

    return { months, totalInterest, schedule, balance }
  }

  const result = calculate()
  const fmt = (v) => formatCurrency(v, { maximumFractionDigits: 0 })

  const comparePayment = (extra) => {
    let balance = inputs.balance
    let rate = inputs.rate / 100 / 12
    let months = 0
    let totalInterest = 0

    while (balance > 0 && months < 600) {
      const interest = balance * rate
      const payment = Math.min(balance + interest, Math.max(inputs.minPayment + extra, balance * 0.1 + interest))
      balance = Math.max(0, balance + interest - payment)
      totalInterest += interest
      months++
    }
    return { months, totalInterest }
  }

  const compare50 = comparePayment(50)
  const compare100 = comparePayment(100)
  const compare200 = comparePayment(200)

  return (
    <>
      <SEOHead
        title="Credit Card Payoff Calculator | UnTrackt"
        description="Calculate credit card payoff timeline, compare payment strategies, see detailed amortization schedule."
        path="/tools/credit-card-payoff"
        toolName="Credit Card Payoff Calculator"
      />

      <DisclaimerCard type="finance" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
            <h2 className="font-semibold text-lg text-gray-900">Balance & Rate</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Balance</label>
                <div className="flex gap-2">
                  <span className="text-2xl font-bold text-gray-900">${inputs.balance}</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="50000"
                  step="100"
                  value={inputs.balance}
                  onChange={e => setInputs({ ...inputs, balance: parseFloat(e.target.value) })}
                  className="w-full mt-2"
                />
              </div>
              <div>
                <label className="label">Interest Rate (%)</label>
                <div className="flex gap-2">
                  <span className="text-2xl font-bold text-gray-900">{inputs.rate.toFixed(1)}%</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="35"
                  step="0.1"
                  value={inputs.rate}
                  onChange={e => setInputs({ ...inputs, rate: parseFloat(e.target.value) })}
                  className="w-full mt-2"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Min Payment</label>
                <input
                  type="number"
                  value={inputs.minPayment}
                  onChange={e => setInputs({ ...inputs, minPayment: parseFloat(e.target.value) })}
                  className="input-field"
                  min="50"
                />
              </div>
              <div>
                <label className="label">Extra Payment</label>
                <input
                  type="number"
                  value={inputs.extraPayment}
                  onChange={e => setInputs({ ...inputs, extraPayment: parseFloat(e.target.value) })}
                  className="input-field"
                  min="0"
                />
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="font-semibold text-lg text-gray-900 mb-4">Payoff Schedule (First 12 Months)</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 px-2">Month</th>
                    <th className="text-right py-2 px-2">Payment</th>
                    <th className="text-right py-2 px-2">Interest</th>
                    <th className="text-right py-2 px-2">Principal</th>
                    <th className="text-right py-2 px-2">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {result.schedule.filter(s => s.month <= 12 || s.balance === 0).map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : ''}>
                      <td className="py-2 px-2">{row.month}</td>
                      <td className="text-right py-2 px-2">{fmt(row.payment)}</td>
                      <td className="text-right py-2 px-2 text-red-600">{fmt(row.interest)}</td>
                      <td className="text-right py-2 px-2 text-green-600">{fmt(row.principal)}</td>
                      <td className="text-right py-2 px-2 font-semibold">{fmt(row.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 sticky top-6 h-fit space-y-4">
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
            <p className="text-sm text-green-600 mb-1">PAYOFF TIME</p>
            <p className="text-4xl font-bold text-green-700 mb-2">{result.months} months</p>
            <p className="text-xs text-green-700">{Math.floor(result.months / 12)} years {result.months % 12} months</p>
          </div>

          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <p className="text-xs font-semibold text-orange-600 mb-1">TOTAL INTEREST</p>
            <p className="text-2xl font-bold text-orange-700">{fmt(result.totalInterest)}</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-2 text-sm">
            <p className="font-semibold text-gray-700 mb-2">Comparison</p>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between p-2 bg-gray-50 rounded">
                <span className="text-gray-600">Current</span>
                <span className="font-semibold">{result.months}mo / {fmt(result.totalInterest)}</span>
              </div>
              <div className="flex justify-between p-2 bg-blue-50 rounded">
                <span className="text-gray-600">+$50/mo extra</span>
                <span className="font-semibold">{compare50.months}mo / {fmt(compare50.totalInterest)}</span>
              </div>
              <div className="flex justify-between p-2 bg-blue-100 rounded">
                <span className="text-gray-600">+$100/mo extra</span>
                <span className="font-semibold">{compare100.months}mo / {fmt(compare100.totalInterest)}</span>
              </div>
              <div className="flex justify-between p-2 bg-green-100 rounded">
                <span className="text-gray-600">+$200/mo extra</span>
                <span className="font-semibold">{compare200.months}mo / {fmt(compare200.totalInterest)}</span>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 p-3 rounded-lg border border-amber-200 text-xs text-amber-900">
            <p className="font-semibold mb-1">💡 Payoff Strategy</p>
            <p>Extra payments reduce interest significantly. {compare50.months < result.months ? `Adding $50/mo saves ${fmt(result.totalInterest - compare50.totalInterest)} in interest.` : 'Even small extra payments help.'}</p>
          </div>
        </div>
      </div>
    </>
  )
}
