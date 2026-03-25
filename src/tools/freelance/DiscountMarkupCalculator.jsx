import { useState } from 'react'
import SEOHead from '../../components/SEOHead.jsx'
import CopyButton from '../../components/CopyButton.jsx'

export default function DiscountMarkupCalculator() {
  const [activeTab, setActiveTab] = useState('discount')

  // Discount Calculator
  const [discount, setDiscount] = useState({ originalPrice: 100, discountMethod: 'percent', discountValue: 20 })
  const discountSalePrice = discount.discountMethod === 'percent'
    ? discount.originalPrice * (1 - parseFloat(discount.discountValue) / 100)
    : discount.originalPrice - (parseFloat(discount.discountValue) || 0)
  const discountSavings = discount.originalPrice - discountSalePrice

  // Markup Calculator
  const [markup, setMarkup] = useState({ costPrice: 50, markupMethod: 'percent', markupValue: 30 })
  const markupSellingPrice = markup.markupMethod === 'percent'
    ? markup.costPrice * (1 + parseFloat(markup.markupValue) / 100)
    : markup.costPrice + (parseFloat(markup.markupValue) || 0)
  const markupProfit = markupSellingPrice - markup.costPrice

  // Profit Margin Calculator
  const [margin, setMargin] = useState({ revenue: 1000, cost: 700, marginMode: 'calculate' })
  const marginGain = margin.revenue - margin.cost
  const marginPercent = margin.revenue > 0 ? (marginGain / margin.revenue) * 100 : 0

  // Bulk Discount Table
  const [bulkPrice, setBulkPrice] = useState(100)
  const discounts = [5, 10, 15, 20, 25, 30]

  const fmt = (v) => v.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 })

  const tabs = [
    { id: 'discount', label: 'Discount Calculator' },
    { id: 'markup', label: 'Markup Calculator' },
    { id: 'margin', label: 'Profit Margin' },
    { id: 'bulk', label: 'Bulk Discount Table' },
  ]

  return (
    <>
      <SEOHead
        title="Discount & Markup Calculator | UnTrackt"
        description="Calculate discounts, markups, profit margins, and bulk pricing instantly. Live calculations as you type."
        path="/tools/discount-markup-calculator"
        toolName="Discount & Markup Calculator"
      />


      <div className="space-y-6">
        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto border-b border-gray-200">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Discount Calculator */}
        {activeTab === 'discount' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-4">
              <h2 className="font-semibold text-lg text-gray-900">Discount Calculator</h2>

              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Original Price ($)</label>
                  <input
                    type="number"
                    value={discount.originalPrice}
                    onChange={e => setDiscount({ ...discount, originalPrice: parseFloat(e.target.value) || 0 })}
                    className="input-field"
                    min="0"
                    step="0.01"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Discount</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={discount.discountValue}
                      onChange={e => setDiscount({ ...discount, discountValue: e.target.value })}
                      className="input-field flex-1"
                      min="0"
                      step="0.01"
                    />
                    <select
                      value={discount.discountMethod}
                      onChange={e => setDiscount({ ...discount, discountMethod: e.target.value })}
                      className="input-field w-24"
                    >
                      <option value="percent">%</option>
                      <option value="flat">Amt</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Original Price:</span>
                    <span className="font-semibold text-gray-900">{fmt(discount.originalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-orange-600">
                    <span>Discount:</span>
                    <span className="font-semibold">-{fmt(discount.originalPrice - discountSalePrice)}</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-200 pt-2">
                    <span className="font-semibold text-gray-900">Sale Price:</span>
                    <span className="text-lg font-bold text-green-600">{fmt(discountSalePrice)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>You Save:</span>
                    <span className="font-semibold">{fmt(discountSavings)}</span>
                  </div>
                </div>
              </div>

              <CopyButton text={`Original: ${fmt(discount.originalPrice)}, Discount: -${fmt(discount.originalPrice - discountSalePrice)}, Sale Price: ${fmt(discountSalePrice)}`} className="w-full justify-center" />
            </div>

            <div className="bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 rounded-xl p-6 space-y-4">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">Formula</h3>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg font-mono text-sm text-gray-700 dark:text-gray-200 space-y-2">
                {discount.discountMethod === 'percent' ? (
                  <>
                    <p>Sale Price = Original × (1 - Discount%)</p>
                    <p className="text-xs text-gray-600 dark:text-gray-300">= ${discount.originalPrice} × (1 - {discount.discountValue}%)</p>
                  </>
                ) : (
                  <>
                    <p>Sale Price = Original - Discount Amount</p>
                    <p className="text-xs text-gray-600 dark:text-gray-300">= ${discount.originalPrice} - ${discount.discountValue}</p>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Markup Calculator */}
        {activeTab === 'markup' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-4">
              <h2 className="font-semibold text-lg text-gray-900">Markup Calculator</h2>

              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cost Price ($)</label>
                  <input
                    type="number"
                    value={markup.costPrice}
                    onChange={e => setMarkup({ ...markup, costPrice: parseFloat(e.target.value) || 0 })}
                    className="input-field"
                    min="0"
                    step="0.01"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Markup</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={markup.markupValue}
                      onChange={e => setMarkup({ ...markup, markupValue: e.target.value })}
                      className="input-field flex-1"
                      min="0"
                      step="0.01"
                    />
                    <select
                      value={markup.markupMethod}
                      onChange={e => setMarkup({ ...markup, markupMethod: e.target.value })}
                      className="input-field w-24"
                    >
                      <option value="percent">%</option>
                      <option value="flat">Amt</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cost Price:</span>
                    <span className="font-semibold text-gray-900">{fmt(markup.costPrice)}</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>Markup:</span>
                    <span className="font-semibold">+{fmt(markupProfit)}</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-200 pt-2">
                    <span className="font-semibold text-gray-900">Selling Price:</span>
                    <span className="text-lg font-bold text-green-600">{fmt(markupSellingPrice)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Profit:</span>
                    <span className="font-semibold">{fmt(markupProfit)}</span>
                  </div>
                </div>
              </div>

              <CopyButton text={`Cost: ${fmt(markup.costPrice)}, Markup: +${fmt(markupProfit)}, Selling Price: ${fmt(markupSellingPrice)}`} className="w-full justify-center" />
            </div>

            <div className="bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-900 rounded-xl p-6 space-y-4">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">Formula</h3>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg font-mono text-sm text-gray-700 dark:text-gray-200 space-y-2">
                {markup.markupMethod === 'percent' ? (
                  <>
                    <p>Selling = Cost × (1 + Markup%)</p>
                    <p className="text-xs text-gray-600 dark:text-gray-300">= ${markup.costPrice} × (1 + {markup.markupValue}%)</p>
                  </>
                ) : (
                  <>
                    <p>Selling = Cost + Markup Amount</p>
                    <p className="text-xs text-gray-600 dark:text-gray-300">= ${markup.costPrice} + ${markup.markupValue}</p>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Profit Margin Calculator */}
        {activeTab === 'margin' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-4">
              <h2 className="font-semibold text-lg text-gray-900">Profit Margin Calculator</h2>

              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Revenue ($)</label>
                  <input
                    type="number"
                    value={margin.revenue}
                    onChange={e => setMargin({ ...margin, revenue: parseFloat(e.target.value) || 0 })}
                    className="input-field"
                    min="0"
                    step="0.01"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cost ($)</label>
                  <input
                    type="number"
                    value={margin.cost}
                    onChange={e => setMargin({ ...margin, cost: parseFloat(e.target.value) || 0 })}
                    className="input-field"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Revenue:</span>
                    <span className="font-semibold text-gray-900">{fmt(margin.revenue)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Cost:</span>
                    <span className="font-semibold">{fmt(margin.cost)}</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-200 pt-2">
                    <span className="font-semibold text-gray-900">Gross Profit:</span>
                    <span className="text-lg font-bold text-green-600">{fmt(marginGain)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Margin %:</span>
                    <span className="font-semibold text-lg">{marginPercent.toFixed(2)}%</span>
                  </div>
                </div>
              </div>

              <CopyButton text={`Revenue: ${fmt(margin.revenue)}, Cost: ${fmt(margin.cost)}, Profit: ${fmt(marginGain)}, Margin: ${marginPercent.toFixed(2)}%`} className="w-full justify-center" />
            </div>

            <div className="bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900 rounded-xl p-6 space-y-4">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">Formula</h3>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg font-mono text-sm text-gray-700 dark:text-gray-200 space-y-2">
                <p>Gross Margin % = (Revenue - Cost) / Revenue × 100</p>
                <p className="text-xs text-gray-600 dark:text-gray-300">= (${margin.revenue} - ${margin.cost}) / ${margin.revenue} × 100</p>
                <p className="text-xs text-gray-600 dark:text-gray-300">= {marginPercent.toFixed(2)}%</p>
              </div>
            </div>
          </div>
        )}

        {/* Bulk Discount Table */}
        {activeTab === 'bulk' && (
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h2 className="font-semibold text-lg text-gray-900 mb-4">Bulk Discount Table Generator</h2>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Enter Price ($)</label>
                <input
                  type="number"
                  value={bulkPrice}
                  onChange={e => setBulkPrice(parseFloat(e.target.value) || 0)}
                  className="input-field max-w-xs"
                  min="0"
                  step="0.01"
                />
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b-2 border-gray-300">
                    <tr>
                      <th className="text-left px-4 py-3 font-semibold text-gray-700">Discount</th>
                      <th className="text-right px-4 py-3 font-semibold text-gray-700">Original Price</th>
                      <th className="text-right px-4 py-3 font-semibold text-gray-700">Discount Amount</th>
                      <th className="text-right px-4 py-3 font-semibold text-gray-700">Sale Price</th>
                      <th className="text-right px-4 py-3 font-semibold text-gray-700">You Save</th>
                    </tr>
                  </thead>
                  <tbody>
                    {discounts.map((disc, idx) => {
                      const discAmt = bulkPrice * (disc / 100)
                      const salePrice = bulkPrice - discAmt
                      return (
                        <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                          <td className="px-4 py-3 font-semibold text-gray-900">{disc}%</td>
                          <td className="px-4 py-3 text-right text-gray-900">{fmt(bulkPrice)}</td>
                          <td className="px-4 py-3 text-right text-orange-600 font-semibold">-{fmt(discAmt)}</td>
                          <td className="px-4 py-3 text-right text-gray-900 font-bold">{fmt(salePrice)}</td>
                          <td className="px-4 py-3 text-right text-green-600 font-semibold">{fmt(discAmt)}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
