import { useState } from 'react'

const FREQ_OPTIONS = [
  { label: 'Daily (365×/year)', n: 365 },
  { label: 'Monthly (12×/year)', n: 12 },
  { label: 'Quarterly (4×/year)', n: 4 },
  { label: 'Yearly (1×/year)', n: 1 },
]

export default function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState('10000')
  const [rate, setRate] = useState('7')
  const [freq, setFreq] = useState(12)
  const [years, setYears] = useState('20')
  const [monthly, setMonthly] = useState('200')
  const [showAll, setShowAll] = useState(false)

  const P = parseFloat(principal) || 0
  const r = (parseFloat(rate) || 0) / 100
  const n = freq
  const t = parseFloat(years) || 0
  const m = parseFloat(monthly) || 0

  const rows = []
  for (let y = 1; y <= Math.min(t, 100); y++) {
    const compounded = P * Math.pow(1 + r / n, n * y)
    const contribFV = m > 0 ? m * 12 * ((Math.pow(1 + r / n, n * y) - 1) / (r / n)) * (n / 12) : 0
    const totalBalance = compounded + contribFV
    const totalContrib = P + m * 12 * y
    const interest = totalBalance - totalContrib
    rows.push({ year: y, balance: totalBalance, contributed: totalContrib, interest })
  }

  const final = rows[rows.length - 1] || { balance: P, contributed: P, interest: 0 }
  const fmt = (n) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
  const displayRows = showAll ? rows : rows.slice(0, 12)

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Principal ($)</label>
          <input type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} className="input-field" min="0" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Annual Interest Rate (%)</label>
          <input type="number" value={rate} onChange={(e) => setRate(e.target.value)} className="input-field" min="0" step="0.1" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Compounding Frequency</label>
          <select value={freq} onChange={(e) => setFreq(Number(e.target.value))} className="input-field">
            {FREQ_OPTIONS.map((f) => (
              <option key={f.n} value={f.n}>{f.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Duration (years)</label>
          <input type="number" value={years} onChange={(e) => setYears(e.target.value)} className="input-field" min="1" max="100" />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Contribution ($)</label>
          <input type="number" value={monthly} onChange={(e) => setMonthly(e.target.value)} className="input-field" min="0" />
        </div>
      </div>

      {/* Summary */}
      {t > 0 && (
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-green-50 border border-green-100 rounded-xl p-4 text-center">
              <p className="text-xs text-green-700 mb-1">Final Balance</p>
              <p className="text-xl font-bold text-green-700">{fmt(final.balance)}</p>
            </div>
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-center">
              <p className="text-xs text-blue-700 mb-1">Total Invested</p>
              <p className="text-xl font-bold text-blue-700">{fmt(final.contributed)}</p>
            </div>
            <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 text-center">
              <p className="text-xs text-emerald-700 mb-1">Interest Earned</p>
              <p className="text-xl font-bold text-emerald-700">{fmt(final.interest)}</p>
            </div>
          </div>

          {/* Year-by-year table */}
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-4 py-2 font-medium text-gray-600">Year</th>
                  <th className="text-right px-4 py-2 font-medium text-gray-600">Balance</th>
                  <th className="text-right px-4 py-2 font-medium text-gray-600">Contributed</th>
                  <th className="text-right px-4 py-2 font-medium text-gray-600">Interest</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {displayRows.map((row) => (
                  <tr key={row.year} className="hover:bg-gray-50">
                    <td className="px-4 py-2 text-gray-700">Year {row.year}</td>
                    <td className="px-4 py-2 text-right font-medium text-green-700">{fmt(row.balance)}</td>
                    <td className="px-4 py-2 text-right text-gray-600">{fmt(row.contributed)}</td>
                    <td className="px-4 py-2 text-right text-emerald-600">{fmt(row.interest)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {rows.length > 12 && (
            <button onClick={() => setShowAll((s) => !s)} className="text-sm text-indigo-600 hover:underline font-medium">
              {showAll ? 'Show less' : `Show all ${rows.length} years`}
            </button>
          )}

          <p className="text-xs text-gray-400 text-center">For educational purposes only. Not financial advice.</p>
        </div>
      )}
    </div>
  )
}
