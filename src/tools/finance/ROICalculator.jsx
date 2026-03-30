import { useState } from 'react'
import SEOHead from '../../components/SEOHead.jsx'
import DisclaimerCard from '../../components/DisclaimerCard.jsx'
import { formatCurrency } from '../../utils/currency.js'

export default function ROICalculator() {
  const [mode, setMode] = useState('basic')
  const [basicInputs, setBasicInputs] = useState({ investment: 10000, returns: 2000 })
  const [realEstateInputs, setRealEstateInputs] = useState({ purchasePrice: 300000, downPayment: 60000, annualRent: 36000, annualExpenses: 6000, appreciation: 3 })
  const [marketingInputs, setMarketingInputs] = useState({ marketingCost: 5000, revenue: 50000, previousRevenue: 40000 })

  const fmt = (v) => formatCurrency(v, { maximumFractionDigits: 0 })
  const pct = (v) => v.toFixed(2)

  const basicROI = (basicInputs.returns / basicInputs.investment) * 100
  const basicAnnual = basicROI / 1

  const realEstateEquity = realEstateInputs.downPayment
  const realEstateAnnualCF = realEstateInputs.annualRent - realEstateInputs.annualExpenses
  const realEstateCashOnCash = (realEstateAnnualCF / realEstateEquity) * 100
  const realEstateCapRate = ((realEstateAnnualCF) / realEstateInputs.purchasePrice) * 100

  const incrementalRevenue = marketingInputs.revenue - marketingInputs.previousRevenue
  const marketingROI = ((incrementalRevenue - marketingInputs.marketingCost) / marketingInputs.marketingCost) * 100
  const marketingPayback = marketingInputs.marketingCost / Math.max(1, incrementalRevenue / 12)

  return (
    <>
      <SEOHead
        title="ROI Calculator | UnTrackt"
        description="Calculate return on investment. Basic ROI, real estate CAP rate & cash-on-cash return, marketing ROI."
        path="/tools/roi-calculator"
        toolName="ROI Calculator"
      />

      <DisclaimerCard type="finance" />

      <div className="max-w-2xl">
        <div className="flex gap-2 mb-6">
          {[
            { value: 'basic', label: 'Basic ROI' },
            { value: 'realestate', label: 'Real Estate' },
            { value: 'marketing', label: 'Marketing ROI' }
          ].map(opt => (
            <button
              key={opt.value}
              onClick={() => setMode(opt.value)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                mode === opt.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {mode === 'basic' && (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
              <h2 className="font-semibold text-lg text-gray-900">Basic ROI Calculation</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Initial Investment</label>
                  <input
                    type="number"
                    value={basicInputs.investment}
                    onChange={e => setBasicInputs({ ...basicInputs, investment: parseFloat(e.target.value) })}
                    className="input-field"
                    min="0"
                  />
                </div>
                <div>
                  <label className="label">Net Returns/Profits</label>
                  <input
                    type="number"
                    value={basicInputs.returns}
                    onChange={e => setBasicInputs({ ...basicInputs, returns: parseFloat(e.target.value) })}
                    className="input-field"
                    min="0"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
                <p className="text-sm text-green-600 mb-1">ROI</p>
                <p className="text-4xl font-bold text-green-700">{pct(basicROI)}%</p>
              </div>
              <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                <p className="text-sm text-blue-600 mb-1">Total Value</p>
                <p className="text-4xl font-bold text-blue-700">{fmt(basicInputs.investment + basicInputs.returns)}</p>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <p className="text-sm font-semibold text-gray-700 mb-2">Formula</p>
              <p className="text-xs text-gray-600 font-mono">ROI = (Net Returns / Initial Investment) × 100</p>
              <p className="text-xs text-gray-600 font-mono mt-1">ROI = ({fmt(basicInputs.returns)} / {fmt(basicInputs.investment)}) × 100 = {pct(basicROI)}%</p>
            </div>
          </div>
        )}

        {mode === 'realestate' && (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
              <h2 className="font-semibold text-lg text-gray-900">Real Estate ROI</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Property Purchase Price</label>
                  <input
                    type="number"
                    value={realEstateInputs.purchasePrice}
                    onChange={e => setRealEstateInputs({ ...realEstateInputs, purchasePrice: parseFloat(e.target.value) })}
                    className="input-field"
                    min="0"
                  />
                </div>
                <div>
                  <label className="label">Down Payment</label>
                  <input
                    type="number"
                    value={realEstateInputs.downPayment}
                    onChange={e => setRealEstateInputs({ ...realEstateInputs, downPayment: parseFloat(e.target.value) })}
                    className="input-field"
                    min="0"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="label">Annual Rental Income</label>
                  <input
                    type="number"
                    value={realEstateInputs.annualRent}
                    onChange={e => setRealEstateInputs({ ...realEstateInputs, annualRent: parseFloat(e.target.value) })}
                    className="input-field"
                    min="0"
                  />
                </div>
                <div>
                  <label className="label">Annual Expenses</label>
                  <input
                    type="number"
                    value={realEstateInputs.annualExpenses}
                    onChange={e => setRealEstateInputs({ ...realEstateInputs, annualExpenses: parseFloat(e.target.value) })}
                    className="input-field"
                    min="0"
                  />
                </div>
                <div>
                  <label className="label">Annual Appreciation %</label>
                  <input
                    type="number"
                    value={realEstateInputs.appreciation}
                    onChange={e => setRealEstateInputs({ ...realEstateInputs, appreciation: parseFloat(e.target.value) })}
                    className="input-field"
                    min="0"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
                <p className="text-sm text-green-600 mb-1">Cash-on-Cash ROI</p>
                <p className="text-4xl font-bold text-green-700">{pct(realEstateCashOnCash)}%</p>
                <p className="text-xs text-green-700 mt-1">Annual CF / Down Payment</p>
              </div>
              <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                <p className="text-sm text-blue-600 mb-1">CAP Rate</p>
                <p className="text-4xl font-bold text-blue-700">{pct(realEstateCapRate)}%</p>
                <p className="text-xs text-blue-700 mt-1">NOI / Purchase Price</p>
              </div>
              <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
                <p className="text-sm text-purple-600 mb-1">Annual Cash Flow</p>
                <p className="text-2xl font-bold text-purple-700">{fmt(realEstateAnnualCF)}</p>
                <p className="text-xs text-purple-700 mt-1">Income - Expenses</p>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4 text-sm space-y-2">
              <p className="font-semibold text-gray-700">Key Metrics</p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div><span className="text-gray-600">Purchase Price:</span> <span className="font-semibold">{fmt(realEstateInputs.purchasePrice)}</span></div>
                <div><span className="text-gray-600">Down Payment:</span> <span className="font-semibold">{fmt(realEstateInputs.downPayment)}</span></div>
                <div><span className="text-gray-600">Loan Amount:</span> <span className="font-semibold">{fmt(realEstateInputs.purchasePrice - realEstateInputs.downPayment)}</span></div>
                <div><span className="text-gray-600">LTV Ratio:</span> <span className="font-semibold">{pct((realEstateInputs.purchasePrice - realEstateInputs.downPayment) / realEstateInputs.purchasePrice * 100)}%</span></div>
              </div>
            </div>
          </div>
        )}

        {mode === 'marketing' && (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
              <h2 className="font-semibold text-lg text-gray-900">Marketing ROI</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Marketing Spend</label>
                  <input
                    type="number"
                    value={marketingInputs.marketingCost}
                    onChange={e => setMarketingInputs({ ...marketingInputs, marketingCost: parseFloat(e.target.value) })}
                    className="input-field"
                    min="0"
                  />
                </div>
                <div>
                  <label className="label">Revenue from Campaign</label>
                  <input
                    type="number"
                    value={marketingInputs.revenue}
                    onChange={e => setMarketingInputs({ ...marketingInputs, revenue: parseFloat(e.target.value) })}
                    className="input-field"
                    min="0"
                  />
                </div>
              </div>
              <div>
                <label className="label">Revenue Without Campaign (Baseline)</label>
                <input
                  type="number"
                  value={marketingInputs.previousRevenue}
                  onChange={e => setMarketingInputs({ ...marketingInputs, previousRevenue: parseFloat(e.target.value) })}
                  className="input-field"
                  min="0"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
                <p className="text-sm text-green-600 mb-1">Marketing ROI</p>
                <p className="text-4xl font-bold text-green-700">{pct(marketingROI)}%</p>
              </div>
              <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                <p className="text-sm text-blue-600 mb-1">Incremental Revenue</p>
                <p className="text-2xl font-bold text-blue-700">{fmt(incrementalRevenue)}</p>
              </div>
              <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
                <p className="text-sm text-purple-600 mb-1">Payback Period</p>
                <p className="text-2xl font-bold text-purple-700">{marketingPayback.toFixed(1)} months</p>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4 text-sm space-y-2">
              <p className="font-semibold text-gray-700">Breakdown</p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div><span className="text-gray-600">Marketing Cost:</span> <span className="font-semibold">{fmt(marketingInputs.marketingCost)}</span></div>
                <div><span className="text-gray-600">Incremental Revenue:</span> <span className="font-semibold">{fmt(incrementalRevenue)}</span></div>
                <div><span className="text-gray-600">Net Profit:</span> <span className="font-semibold text-green-600">{fmt(incrementalRevenue - marketingInputs.marketingCost)}</span></div>
                <div><span className="text-gray-600">ROI Ratio:</span> <span className="font-semibold">{(incrementalRevenue / marketingInputs.marketingCost).toFixed(2)}:1</span></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
