import { useState, useEffect } from 'react'
import { RefreshCw } from 'lucide-react'
import SEOHead from '../../components/SEOHead.jsx'
import CopyButton from '../../components/CopyButton.jsx'
import { getItem, setItem } from '../../utils/storage.js'

const FALLBACK_RATES = {
  'USD': 1, 'EUR': 0.92, 'GBP': 0.79, 'JPY': 149.50, 'AUD': 1.53,
  'CAD': 1.36, 'CHF': 0.88, 'CNY': 7.24, 'INR': 83.12, 'MXN': 17.05,
  'SGD': 1.34, 'HKD': 7.81, 'NZD': 1.65, 'SEK': 10.50, 'NOK': 10.70,
  'KRW': 1319.50, 'ZAR': 18.65, 'RUB': 100.50, 'TRY': 32.50, 'BRL': 4.97
}

const CACHE_KEY = 'untrackt:pref:currencyRates'
const CACHE_MAX_AGE = 24 * 60 * 60 * 1000 // 24 hours

function getCachedRates() {
  const cached = getItem(CACHE_KEY, null)
  if (!cached || !cached.rates || !cached.timestamp) return null
  if (Date.now() - cached.timestamp > CACHE_MAX_AGE) return null
  return cached
}

export default function CurrencyConverter() {
  const cached = getCachedRates()
  const [rates, setRates] = useState(cached?.rates || FALLBACK_RATES)
  const [amount, setAmount] = useState(100)
  const [fromCurrency, setFromCurrency] = useState('USD')
  const [toCurrency, setToCurrency] = useState('EUR')
  const [isLoading, setIsLoading] = useState(false)
  const [lastUpdate, setLastUpdate] = useState(cached ? new Date(cached.timestamp) : null)
  const [error, setError] = useState(cached ? null : null)

  useEffect(() => {
    if (!cached) fetchRates()
  }, [])

  const fetchRates = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await fetch('https://open.er-api.com/v6/latest/USD')
      if (response.ok) {
        const data = await response.json()
        if (data.rates) {
          setRates(data.rates)
          const now = new Date()
          setLastUpdate(now)
          setItem(CACHE_KEY, { rates: data.rates, timestamp: now.getTime() })
        }
      } else {
        setError('Using cached/offline rates')
      }
    } catch (err) {
      setError('Using cached/offline rates (API unavailable)')
    } finally {
      setIsLoading(false)
    }
  }

  const currencies = Object.keys(rates).sort()

  const convertedAmount = (amount * (rates[toCurrency] || 1)) / (rates[fromCurrency] || 1)

  const swap = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
  }

  const fmt = (v) => v.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 })

  return (
    <>
      <SEOHead
        title="Currency Converter | UnTrackt"
        description="Convert between 20+ currencies. Real-time rates from open.er-api.com with offline fallback."
        path="/tools/currency-converter"
        toolName="Currency Converter"
      />


      <div className="max-w-2xl">
        {error && (
          <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-900">
            ⚠️ {error} • Last update: {lastUpdate ? lastUpdate.toLocaleTimeString() : 'Never'}
          </div>
        )}

        <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-6">
          <div className="flex justify-between items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-900">Currency Converter</h1>
            <button
              onClick={fetchRates}
              disabled={isLoading}
              className="p-2 hover:bg-gray-100 rounded-lg transition-all disabled:opacity-50"
              title="Refresh rates"
            >
              <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-end">
            <div>
              <label className="label">From Currency</label>
              <select
                value={fromCurrency}
                onChange={e => setFromCurrency(e.target.value)}
                className="input-field"
              >
                {currencies.map(curr => <option key={curr} value={curr}>{curr}</option>)}
              </select>
            </div>

            <div>
              <label className="label">Amount</label>
              <input
                type="number"
                value={amount}
                onChange={e => setAmount(parseFloat(e.target.value) || 0)}
                className="input-field"
                min="0"
                step="0.01"
              />
            </div>

            <div>
              <label className="label">To Currency</label>
              <select
                value={toCurrency}
                onChange={e => setToCurrency(e.target.value)}
                className="input-field"
              >
                {currencies.map(curr => <option key={curr} value={curr}>{curr}</option>)}
              </select>
            </div>
          </div>

          <button
            onClick={swap}
            className="w-full btn-secondary"
          >
            ⇄ Swap Currencies
          </button>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-600 mb-1">{fromCurrency}</p>
              <p className="text-3xl font-bold text-blue-700">{amount.toFixed(2)}</p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <p className="text-sm text-green-600 mb-1">{toCurrency}</p>
              <p className="text-3xl font-bold text-green-700">{convertedAmount.toFixed(2)}</p>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm font-semibold text-gray-700 mb-2">Exchange Rate</p>
            <p className="text-lg text-gray-900">1 {fromCurrency} = {(rates[toCurrency] / rates[fromCurrency]).toFixed(4)} {toCurrency}</p>
            <p className="text-xs text-gray-600 mt-1">1 {toCurrency} = {(rates[fromCurrency] / rates[toCurrency]).toFixed(4)} {fromCurrency}</p>
          </div>

          <CopyButton text={`${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`} />
        </div>

        <div className="mt-6 bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="font-semibold text-lg text-gray-900 mb-4">Popular Conversions</h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            {[
              { from: 'USD', to: 'EUR' },
              { from: 'USD', to: 'GBP' },
              { from: 'USD', to: 'JPY' },
              { from: 'EUR', to: 'GBP' },
              { from: 'GBP', to: 'USD' },
              { from: 'USD', to: 'INR' }
            ].map(pair => {
              const converted = (100 * (rates[pair.to] || 1)) / (rates[pair.from] || 1)
              return (
                <div
                  key={`${pair.from}-${pair.to}`}
                  onClick={() => { setFromCurrency(pair.from); setToCurrency(pair.to); setAmount(100) }}
                  className="p-3 bg-gray-50 hover:bg-gray-100 rounded-lg cursor-pointer transition-all"
                >
                  <p className="text-xs text-gray-600">100 {pair.from}</p>
                  <p className="font-semibold text-gray-900">{converted.toFixed(2)} {pair.to}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
