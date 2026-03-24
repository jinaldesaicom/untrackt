import { useState } from 'react'
import { Plus, Trash2, PieChart } from 'lucide-react'
import SEOHead from '../../components/SEOHead.jsx'
import DisclaimerBadge from '../../components/DisclaimerBadge.jsx'

export default function NetWorthSnapshot() {
  const [assets, setAssets] = useState([{ id: 1, category: 'Cash & Savings', label: '', value: 0 }])
  const [liabilities, setLiabilities] = useState([{ id: 1, category: 'Mortgage', label: '', value: 0 }])

  const addAsset = () => setAssets([...assets, { id: Math.max(...assets.map(a => a.id), 0) + 1, category: 'Other Assets', label: '', value: 0 }])
  const addLiability = () => setLiabilities([...liabilities, { id: Math.max(...liabilities.map(l => l.id), 0) + 1, category: 'Other Debt', label: '', value: 0 }])

  const updateAsset = (id, field, value) => setAssets(assets.map(a => a.id === id ? { ...a, [field]: value } : a))
  const updateLiability = (id, field, value) => setLiabilities(liabilities.map(l => l.id === id ? { ...l, [field]: value } : l))

  const removeAsset = (id) => setAssets(assets.filter(a => a.id !== id))
  const removeLiability = (id) => setLiabilities(liabilities.filter(l => l.id !== id))

  const totalAssets = assets.reduce((sum, a) => sum + (parseFloat(a.value) || 0), 0)
  const totalLiabilities = liabilities.reduce((sum, l) => sum + (parseFloat(l.value) || 0), 0)
  const netWorth = totalAssets - totalLiabilities

  const fmt = (v) => v.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

  const assetCategories = ['Cash & Savings', 'Investments', 'Real Estate', 'Vehicles', 'Other Assets']
  const liabilityCategories = ['Mortgage', 'Student Loans', 'Car Loans', 'Credit Cards', 'Other Debt']

  return (
    <>
      <SEOHead
        title="Net Worth Snapshot | UnTrackt"
        description="Calculate your net worth with assets and liabilities. View your net worth composition. Session data only - no storage."
        path="/tools/net-worth-snapshot"
        toolName="Net Worth Snapshot"
      />

      <DisclaimerBadge />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <p className="font-semibold text-amber-900 mb-1">⚠️ Privacy Notice</p>
            <p className="text-sm text-amber-900">Your data exists only in this browser tab. It is NOT saved anywhere. Refreshing or closing the page will clear everything.</p>
          </div>

          <div className="space-y-4">
            <h2 className="font-semibold text-lg text-gray-900">Assets</h2>
            <div className="space-y-2">
              {assets.map(asset => (
                <div key={asset.id} className="flex gap-2 items-end">
                  <select value={asset.category} onChange={e => updateAsset(asset.id, 'category', e.target.value)} className="input-field flex-1 text-sm">
                    {assetCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                  <input type="text" value={asset.label} onChange={e => updateAsset(asset.id, 'label', e.target.value)} className="input-field flex-1 text-sm" placeholder="Label (optional)" />
                  <input type="number" value={asset.value} onChange={e => updateAsset(asset.id, 'value', e.target.value)} className="input-field w-32 text-sm" min="0" />
                  <button onClick={() => removeAsset(asset.id)} className="p-2 hover:bg-red-100 rounded"><Trash2 className="w-4 h-4 text-red-600" /></button>
                </div>
              ))}
            </div>
            <button onClick={addAsset} className="btn-secondary text-sm"><Plus className="w-4 h-4" /> Add Asset</button>
          </div>

          <div className="space-y-4">
            <h2 className="font-semibold text-lg text-gray-900">Liabilities</h2>
            <div className="space-y-2">
              {liabilities.map(liability => (
                <div key={liability.id} className="flex gap-2 items-end">
                  <select value={liability.category} onChange={e => updateLiability(liability.id, 'category', e.target.value)} className="input-field flex-1 text-sm">
                    {liabilityCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                  <input type="text" value={liability.label} onChange={e => updateLiability(liability.id, 'label', e.target.value)} className="input-field flex-1 text-sm" placeholder="Label (optional)" />
                  <input type="number" value={liability.value} onChange={e => updateLiability(liability.id, 'value', e.target.value)} className="input-field w-32 text-sm" min="0" />
                  <button onClick={() => removeLiability(liability.id)} className="p-2 hover:bg-red-100 rounded"><Trash2 className="w-4 h-4 text-red-600" /></button>
                </div>
              ))}
            </div>
            <button onClick={addLiability} className="btn-secondary text-sm"><Plus className="w-4 h-4" /> Add Liability</button>
          </div>
        </div>

        <div className="lg:col-span-1 sticky top-6 h-fit space-y-4">
          <div className={`p-6 rounded-xl border-2 text-center ${netWorth >= 0 ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
            <p className="text-sm text-gray-600 mb-1">NET WORTH</p>
            <p className={`text-4xl font-bold ${netWorth >= 0 ? 'text-green-700' : 'text-red-700'}`}>{fmt(netWorth)}</p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <p className="text-xs text-blue-600 mb-1">Total Assets</p>
              <p className="text-xl font-bold text-blue-700">{fmt(totalAssets)}</p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg text-center">
              <p className="text-xs text-red-600 mb-1">Total Liabilities</p>
              <p className="text-xl font-bold text-red-700">{fmt(totalLiabilities)}</p>
            </div>
          </div>

          {totalAssets > 0 && (
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <p className="text-sm font-semibold text-gray-700 mb-2">Asset Breakdown</p>
              <div className="space-y-1 text-xs">
                {assetCategories.map(cat => {
                  const sum = assets.filter(a => a.category === cat).reduce((s, a) => s + (parseFloat(a.value) || 0), 0)
                  if (sum === 0) return null
                  return <div key={cat} className="flex justify-between"><span className="text-gray-600">{cat}</span><span className="font-semibold">{((sum / totalAssets) * 100).toFixed(1)}%</span></div>
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
