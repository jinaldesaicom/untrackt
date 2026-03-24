import { useState } from 'react'

export default function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState('250000')
  const [annualRate, setAnnualRate] = useState('6.5')
  const [termMonths, setTermMonths] = useState('360')
  const [showAll, setShowAll] = useState(false)

  const P = parseFloat(loanAmount) || 0
  const annualR = parseFloat(annualRate) || 0
  const r = annualR / 100 / 12
  const n = parseInt(termMonths) || 1

  const emi = r === 0 ? P / n : (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
  const totalPayment = emi * n
  const totalInterest = totalPayment - P

  const fmt = (v) => v.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 })

  // Amortization table
  const schedule = []
  let balance = P
  for (let i = 1; i <= n && i <= 360; i++) {
    const interestPayment = balance * r
    const principalPayment = emi - interestPayment
    balance = Math.max(0, balance - principalPayment)
    schedule.push({ month: i, emi, principal: principalPayment, interest: interestPayment, balance })
  }

  const displayRows = showAll ? schedule : schedule.slice(0, 12)

  const pctPrincipal = totalPayment > 0 ? (P / totalPayment) * 100 : 0
  const pctInterest = 100 - pctPrincipal

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Loan Amount ($)</label>
          <input type="number" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} className="input-field" min="0" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Annual Interest Rate (%)</label>
          <input type="number" value={annualRate} onChange={(e) => setAnnualRate(e.target.value)} className="input-field" min="0" step="0.1" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Loan Term (months)</label>
          <input type="number" value={termMonths} onChange={(e) => setTermMonths(e.target.value)} className="input-field" min="1" max="600" />
        </div>
      </div>

      {P > 0 && (
        <div className="space-y-4">
          {/* Summary */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 text-center">
              <p className="text-xs text-indigo-600 mb-1">Monthly EMI</p>
              <p className="text-2xl font-bold text-indigo-700">{fmt(emi)}</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-500 mb-1">Total Payment</p>
              <p className="text-xl font-bold text-gray-900">{fmt(totalPayment)}</p>
            </div>
            <div className="bg-red-50 border border-red-100 rounded-xl p-4 text-center">
              <p className="text-xs text-red-600 mb-1">Total Interest</p>
              <p className="text-xl font-bold text-red-600">{fmt(totalInterest)}</p>
            </div>
          </div>

          {/* Donut-style split bar */}
          <div>
            <div className="flex items-center justify-between text-xs text-gray-600 mb-1.5">
              <span>Principal vs Interest split</span>
            </div>
            <div className="flex rounded-full overflow-hidden h-5">
              <div
                className="bg-indigo-500 flex items-center justify-center text-white text-xs font-medium"
                style={{ width: `${pctPrincipal}%` }}
              >
                {pctPrincipal >= 15 ? `${Math.round(pctPrincipal)}%` : ''}
              </div>
              <div
                className="bg-red-400 flex items-center justify-center text-white text-xs font-medium"
                style={{ width: `${pctInterest}%` }}
              >
                {pctInterest >= 15 ? `${Math.round(pctInterest)}%` : ''}
              </div>
            </div>
            <div className="flex gap-4 mt-1.5 text-xs text-gray-500">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-indigo-500 inline-block" /> Principal</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-red-400 inline-block" /> Interest</span>
            </div>
          </div>

          {/* Amortization table */}
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-4 py-2 font-medium text-gray-600">Month</th>
                  <th className="text-right px-4 py-2 font-medium text-gray-600">EMI</th>
                  <th className="text-right px-4 py-2 font-medium text-gray-600">Principal</th>
                  <th className="text-right px-4 py-2 font-medium text-gray-600">Interest</th>
                  <th className="text-right px-4 py-2 font-medium text-gray-600">Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {displayRows.map((row) => (
                  <tr key={row.month} className="hover:bg-gray-50">
                    <td className="px-4 py-2 text-gray-700">{row.month}</td>
                    <td className="px-4 py-2 text-right text-gray-900">{fmt(row.emi)}</td>
                    <td className="px-4 py-2 text-right text-indigo-700">{fmt(row.principal)}</td>
                    <td className="px-4 py-2 text-right text-red-500">{fmt(row.interest)}</td>
                    <td className="px-4 py-2 text-right text-gray-600">{fmt(row.balance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {schedule.length > 12 && (
            <button onClick={() => setShowAll((s) => !s)} className="text-sm text-indigo-600 hover:underline font-medium">
              {showAll ? 'Show first 12 months' : `Show all ${schedule.length} months`}
            </button>
          )}
        </div>
      )}
    </div>
  )
}
