import { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import SEOHead from '../../components/SEOHead.jsx'
import DisclaimerBadge from '../../components/DisclaimerBadge.jsx'

export default function ClientProfitabilityEstimator() {
  const [clients, setClients] = useState([])

  const addClient = () => {
    const newId = Math.max(...clients.map(c => c.id), 0) + 1
    setClients([...clients, {
      id: newId,
      name: '',
      revenue: 0,
      hoursPerMonth: 10,
      overhead: 20,
      revisionsRounds: 2,
      timePerRevision: 2,
      stressFactor: 3,
    }])
  }

  const updateClient = (id, field, value) => {
    setClients(clients.map(c => c.id === id ? { ...c, [field]: value } : c))
  }

  const removeClient = (id) => {
    setClients(clients.filter(c => c.id !== id))
  }

  const calculateMetrics = (client) => {
    const totalHours = parseFloat(client.hoursPerMonth) + (parseFloat(client.revisionsRounds) * parseFloat(client.timePerRevision))
    const overhead = (parseFloat(client.revenue) * (parseFloat(client.overhead) / 100)) / totalHours
    const effectiveRate = parseFloat(client.revenue) / totalHours
    const profitScore = Math.round(
      (effectiveRate / 100) *
      (100 - parseFloat(client.stressFactor) * 10) *
      (100 - parseFloat(client.overhead)) / 100
    )
    return {
      totalHours,
      effectiveRate: Math.max(0, effectiveRate),
      profitScore: Math.max(0, Math.min(100, profitScore)),
    }
  }

  const getScoreColor = (score) => {
    if (score >= 70) return 'text-green-600'
    if (score >= 40) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreBg = (score) => {
    if (score >= 70) return 'bg-green-50'
    if (score >= 40) return 'bg-yellow-50'
    return 'bg-red-50'
  }

  const sortedClients = clients
    .map(c => ({ ...c, metrics: calculateMetrics(c) }))
    .sort((a, b) => b.metrics.profitScore - a.metrics.profitScore)

  const fmt = (v) => v.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 })

  return (
    <>
      <SEOHead
        title="Client Profitability Estimator | UnTrackt"
        description="Evaluate which clients are worth keeping. Calculate hourly rates, profitability scores, and compare client value. Freelancer tool."
        path="/tools/client-profitability-estimator"
        toolName="Client Profitability Estimator"
      />

      <DisclaimerBadge />

      <div className="space-y-6">
        <button onClick={addClient} disabled={clients.length >= 10} className="btn-primary">
          <Plus className="w-4 h-4" />
          Add Client
        </button>

        {clients.length === 0 ? (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-12 text-center">
            <p className="text-blue-900">Click "Add Client" to start tracking client profitability.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input cards */}
            <div className="lg:col-span-2 space-y-4">
              {clients.map(client => (
                <div key={client.id} className="bg-white p-6 rounded-xl border border-gray-200">
                  <div className="flex justify-between items-start mb-4">
                    <input
                      type="text"
                      value={client.name}
                      onChange={e => updateClient(client.id, 'name', e.target.value)}
                      className="input-field text-lg font-semibold"
                      placeholder="Client name"
                    />
                    <button
                      onClick={() => removeClient(client.id)}
                      className="p-2 hover:bg-red-100 rounded-lg text-red-600"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div>
                      <label className="text-xs text-gray-600 block mb-1">Monthly Revenue ($)</label>
                      <input
                        type="number"
                        value={client.revenue}
                        onChange={e => updateClient(client.id, 'revenue', e.target.value)}
                        className="input-field text-sm"
                        min="0"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-600 block mb-1">Hours/Month</label>
                      <input
                        type="number"
                        value={client.hoursPerMonth}
                        onChange={e => updateClient(client.id, 'hoursPerMonth', e.target.value)}
                        className="input-field text-sm"
                        min="0"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-600 block mb-1">Revisions</label>
                      <input
                        type="number"
                        value={client.revisionsRounds}
                        onChange={e => updateClient(client.id, 'revisionsRounds', e.target.value)}
                        className="input-field text-sm"
                        min="0"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-600 block mb-1">Time/Revision (hrs)</label>
                      <input
                        type="number"
                        value={client.timePerRevision}
                        onChange={e => updateClient(client.id, 'timePerRevision', e.target.value)}
                        className="input-field text-sm"
                        min="0"
                        step="0.5"
                      />
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-gray-600 block mb-2">Overhead Allocation (%)</label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={client.overhead}
                        onChange={e => updateClient(client.id, 'overhead', e.target.value)}
                        className="w-full"
                      />
                      <p className="text-xs text-gray-600 mt-1">{client.overhead}%</p>
                    </div>
                    <div>
                      <label className="text-xs text-gray-600 block mb-2">Stress Factor (1-5)</label>
                      <input
                        type="range"
                        min="1"
                        max="5"
                        value={client.stressFactor}
                        onChange={e => updateClient(client.id, 'stressFactor', e.target.value)}
                        className="w-full"
                      />
                      <p className="text-xs text-gray-600 mt-1">
                        {client.stressFactor == 1 ? 'Easy' : client.stressFactor <= 3 ? 'Moderate' : 'Nightmare'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Comparison */}
            {sortedClients.length > 0 && (
              <div className="lg:col-span-2">
                <h2 className="font-semibold text-lg text-gray-900 mb-4">Client Comparison</h2>
                <div className="space-y-3">
                  {sortedClients.map((client, idx) => {
                    const isBest = idx === 0
                    const isWorst = idx === sortedClients.length - 1 && sortedClients.length > 1 && client.metrics.profitScore < 40
                    return (
                      <div
                        key={client.id}
                        className={`p-4 rounded-xl border-2 ${
                          isBest ? 'border-green-500 bg-green-50' :
                          isWorst ? 'border-red-500 bg-red-50' :
                          'border-gray-200 bg-white'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-semibold text-gray-900">{client.name || 'Unnamed Client'}</h3>
                            {isBest && <p className="text-xs text-green-600 font-semibold">⭐ Your Best Client</p>}
                            {isWorst && <p className="text-xs text-red-600 font-semibold">⚠️ Needs Attention</p>}
                          </div>
                          <div className={`text-right ${getScoreColor(client.metrics.profitScore)}`}>
                            <p className="text-sm font-medium">Profitability</p>
                            <p className="text-2xl font-bold">{client.metrics.profitScore}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Effective Rate</p>
                            <p className="font-semibold text-gray-900">{fmt(client.metrics.effectiveRate)}/hr</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Total Hours</p>
                            <p className="font-semibold text-gray-900">{client.metrics.totalHours.toFixed(1)}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Monthly Revenue</p>
                            <p className="font-semibold text-gray-900">{fmt(client.revenue)}</p>
                          </div>
                        </div>

                        {/* Indicator bar */}
                        <div className={`mt-3 h-3 rounded-full overflow-hidden ${getScoreBg(client.metrics.profitScore)}`}>
                          <div
                            className={`h-full ${
                              client.metrics.profitScore >= 70 ? 'bg-green-500' :
                              client.metrics.profitScore >= 40 ? 'bg-yellow-500' :
                              'bg-red-500'
                            }`}
                            style={{ width: `${Math.min(client.metrics.profitScore, 100)}%` }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  )
}
