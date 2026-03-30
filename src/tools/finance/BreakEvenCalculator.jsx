import { useState } from 'react'
import SEOHead from '../../components/SEOHead.jsx'
import DisclaimerCard from '../../components/DisclaimerCard.jsx'
import { formatCurrency, getCurrencySymbol } from '../../utils/currency.js'

export default function BreakEvenCalculator() {
  const [mode, setMode] = useState('product')
  const [product, setProduct] = useState({
    fixed: 50000,
    variable: 25,
    price: 100,
  })
  const [investment, setInvestment] = useState({
    cost: 10000,
    monthly: 500,
    revenue: 1500,
  })

  if (mode === 'product') {
    const fixedCosts = parseFloat(product.fixed) || 0
    const varCost = parseFloat(product.variable) || 0
    const sellPrice = parseFloat(product.price) || 0
    const contribution = sellPrice - varCost

    const breakEvenUnits = contribution > 0 ? fixedCosts / contribution : 0
    const breakEvenRevenue = breakEvenUnits * sellPrice
    const contributionMargin = contribution / sellPrice

    const volumes = [0.25, 0.5, 0.75, 1, 1.25, 1.5]
    const profitTable = volumes.map(vol => ({
      volumePercent: vol * 100,
      units: breakEvenUnits * vol,
      revenue: breakEvenRevenue * vol,
      totalVariable: varCost * (breakEvenUnits * vol),
      profit: (breakEvenRevenue * vol + breakEvenRevenue - fixedCosts - varCost * (breakEvenUnits * vol)),
    }))

    const fmt = (v) => formatCurrency(v, { maximumFractionDigits: 2 })

    return (
      <>
        <SEOHead
          title="Break-Even Calculator | UnTrackt"
          description="Calculate break-even point for products and investments. Visualize revenue vs cost intersections."
          path="/tools/break-even-calculator"
          toolName="Break-Even Calculator"
        />

        <DisclaimerCard type="finance" />

        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-4">
              <h2 className="font-semibold text-lg text-gray-900">Product/Business Mode</h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fixed Costs ({getCurrencySymbol()})</label>
                <input
                  type="number"
                  value={product.fixed}
                  onChange={e => setProduct({ ...product, fixed: e.target.value })}
                  className="input-field"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Variable Cost per Unit ({getCurrencySymbol()})</label>
                <input
                  type="number"
                  value={product.variable}
                  onChange={e => setProduct({ ...product, variable: e.target.value })}
                  className="input-field"
                  min="0"
                  step="0.01"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Selling Price per Unit ({getCurrencySymbol()})</label>
                <input
                  type="number"
                  value={product.price}
                  onChange={e => setProduct({ ...product, price: e.target.value })}
                  className="input-field"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-3">
              <h3 className="font-semibold text-gray-900 mb-4">Results</h3>
              <div>
                <p className="text-sm text-gray-600 mb-1">Break-Even Units</p>
                <p className="text-3xl font-bold text-gray-900">{Math.round(breakEvenUnits).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Break-Even Revenue</p>
                <p className="text-2xl font-bold text-blue-600">{fmt(breakEvenRevenue)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Contribution Margin</p>
                <p className="text-2xl font-bold text-green-600">{(contributionMargin * 100).toFixed(1)}%</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Profit/Loss at Various Volumes</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                  <tr>
                    <th className="text-left px-3 py-2 font-semibold text-gray-700 dark:text-gray-200">Volume</th>
                    <th className="text-center px-3 py-2 font-semibold text-gray-700 dark:text-gray-200">Units</th>
                    <th className="text-right px-3 py-2 font-semibold text-gray-700 dark:text-gray-200">Revenue</th>
                    <th className="text-right px-3 py-2 font-semibold text-gray-700 dark:text-gray-200">Profit/Loss</th>
                  </tr>
                </thead>
                <tbody>
                  {profitTable.map((row, idx) => (
                    <tr key={idx} className={`border-b border-gray-100 dark:border-gray-800 ${row.profit < 0 ? 'bg-red-50 dark:bg-red-950/40' : 'bg-green-50 dark:bg-green-950/40'}`}>
                      <td className="px-3 py-2 text-gray-900 dark:text-gray-100 font-medium">{row.volumePercent.toFixed(0)}%</td>
                      <td className="px-3 py-2 text-center text-gray-900 dark:text-gray-100">{Math.round(row.units).toLocaleString()}</td>
                      <td className="px-3 py-2 text-right text-gray-900 dark:text-gray-100">{fmt(row.revenue)}</td>
                      <td className={`px-3 py-2 text-right font-semibold ${row.profit >= 0 ? 'text-green-600 dark:text-green-300' : 'text-red-600 dark:text-red-300'}`}>
                        {fmt(row.profit)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
    )
  } else {
    const purchasePrice = parseFloat(investment.cost) || 0
    const monthlyExpense = parseFloat(investment.monthly) || 0
    const monthlyRev = parseFloat(investment.revenue) || 0
    const monthlyProfit = monthlyRev - monthlyExpense
    const monthsToBreakEven = monthlyProfit > 0 ? purchasePrice / monthlyProfit : 0
    const totalBreakEven = purchasePrice

    const fmt = (v) => formatCurrency(v, { maximumFractionDigits: 2 })

    return (
      <>
        <SEOHead
          title="Break-Even Calculator | UnTrackt"
          description="Calculate break-even point for products and investments. Visualize revenue vs cost intersections."
          path="/tools/break-even-calculator"
          toolName="Break-Even Calculator"
        />

        <DisclaimerCard type="finance" />

        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-4">
              <h2 className="font-semibold text-lg text-gray-900">Investment Mode</h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Purchase Price ({getCurrencySymbol()})</label>
                <input
                  type="number"
                  value={investment.cost}
                  onChange={e => setInvestment({ ...investment, cost: e.target.value })}
                  className="input-field"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Costs ({getCurrencySymbol()})</label>
                <input
                  type="number"
                  value={investment.monthly}
                  onChange={e => setInvestment({ ...investment, monthly: e.target.value })}
                  className="input-field"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Revenue ({getCurrencySymbol()})</label>
                <input
                  type="number"
                  value={investment.revenue}
                  onChange={e => setInvestment({ ...investment, revenue: e.target.value })}
                  className="input-field"
                  min="0"
                />
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-3">
              <h3 className="font-semibold text-gray-900 mb-4">Results</h3>
              <div>
                <p className="text-sm text-gray-600 mb-1">Months to Break-Even</p>
                <p className="text-3xl font-bold text-gray-900">{monthsToBreakEven.toFixed(1)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Break-Even Amount</p>
                <p className="text-2xl font-bold text-blue-600">{fmt(totalBreakEven)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Monthly Profit</p>
                <p className={`text-2xl font-bold ${monthlyProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {fmt(monthlyProfit)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}
