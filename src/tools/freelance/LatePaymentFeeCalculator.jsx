import { useState } from 'react'
import { Copy } from 'lucide-react'
import SEOHead from '../../components/SEOHead.jsx'
import CopyButton from '../../components/CopyButton.jsx'
import { formatCurrency, getCurrencySymbol } from '../../utils/currency.js'

export default function LatePaymentFeeCalculator() {
  const [invoice, setInvoice] = useState({
    amount: 5000,
    invoiceDate: new Date().toISOString().split('T')[0],
    paymentDate: new Date().toISOString().split('T')[0],
    feeType: 'daily',
    feeValue: 1.5,
    gracePeriod: 0,
    compound: false,
  })

  const invoiceDateObj = new Date(invoice.invoiceDate + 'T00:00:00')
  const paymentDateObj = new Date(invoice.paymentDate + 'T00:00:00')
  const daysOverdue = Math.max(0, Math.floor((paymentDateObj - invoiceDateObj) / (24 * 60 * 60 * 1000)) - parseFloat(invoice.gracePeriod))

  let lateFee = 0
  let totalOwed = parseFloat(invoice.amount) || 0

  if (daysOverdue > 0) {
    const feeValue = parseFloat(invoice.feeValue) || 0
    if (invoice.feeType === 'flat') {
      lateFee = feeValue
    } else if (invoice.feeType === 'daily') {
      lateFee = daysOverdue * feeValue
    } else if (invoice.feeType === 'monthly') {
      lateFee = (daysOverdue / 30) * feeValue
    } else if (invoice.feeType === 'annual') {
      const dailyRate = feeValue / 365
      if (invoice.compound) {
        lateFee = parseFloat(invoice.amount) * ((Math.pow(1 + dailyRate / 100, daysOverdue) - 1))
      } else {
        lateFee = calculateSimpleInterest(parseFloat(invoice.amount), dailyRate, daysOverdue)
      }
    }
    totalOwed = parseFloat(invoice.amount) + lateFee
  }

  function calculateSimpleInterest(principal, dailyRate, days) {
    return principal * (dailyRate / 100) * days
  }

  // Daily breakdown
  const dailyBreakdown = []
  let balance = parseFloat(invoice.amount)
  for (let i = 1; i <= Math.min(daysOverdue, 30); i++) {
    const dayFee =  invoice.feeType === 'daily'
      ? parseFloat(invoice.feeValue)
      : invoice.feeType === 'flat'
      ? 0
      : invoice.feeType === 'monthly'
      ? parseFloat(invoice.feeValue) / 30
      : (balance * (parseFloat(invoice.feeValue) / 365 / 100))

    balance += dayFee
    dailyBreakdown.push({ day: i, fee: dayFee, total: balance })
  }

  const reminderTemplate = generateReminder()

  function generateReminder() {
    const formatter = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    const invoiceDateFormatted = formatter.format(invoiceDateObj)
    const dueDate = new Date(invoiceDateObj.getTime() + 30 * 24 * 60 * 60 * 1000)
    const dueDateFormatted = formatter.format(dueDate)

    return `Dear Client,

This is a friendly reminder that your invoice is now ${daysOverdue} days overdue.

Invoice Details:
- Original Amount: ${formatCurrency((parseFloat(invoice.amount) || 0), { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
- Invoice Date: ${invoiceDateFormatted}
- Originally Due: ${dueDateFormatted}
- Current Late Fee: ${formatCurrency(lateFee, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
- Total Now Due: ${formatCurrency(totalOwed, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}

Please remit payment at your earliest convenience to avoid further late fees.

If payment has already been made, please disregard this message.

Thank you,`
  }

  const fmt = (v) => formatCurrency(v, { minimumFractionDigits: 2, maximumFractionDigits: 2 })

  return (
    <>
      <SEOHead
        title="Late Payment Fee Calculator | UnTrackt"
        description="Calculate late payment fees and interest. Generate payment reminders. Supports flat, daily, monthly, and annual rates."
        path="/tools/late-payment-fee-calculator"
        toolName="Late Payment Fee Calculator"
      />


      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-4">
            <h2 className="font-semibold text-lg text-gray-900">Invoice Details</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Invoice Amount ({getCurrencySymbol()})</label>
              <input
                type="number"
                value={invoice.amount}
                onChange={e => setInvoice({ ...invoice, amount: e.target.value })}
                className="input-field"
                min="0"
                step="0.01"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Invoice Date</label>
              <input
                type="date"
                value={invoice.invoiceDate}
                onChange={e => setInvoice({ ...invoice, invoiceDate: e.target.value })}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Payment Date</label>
              <input
                type="date"
                value={invoice.paymentDate}
                onChange={e => setInvoice({ ...invoice, paymentDate: e.target.value })}
                className="input-field"
              />
            </div>

            <button
              onClick={() => setInvoice({ ...invoice, paymentDate: new Date().toISOString().split('T')[0] })}
              className="btn-secondary w-full text-sm"
            >
              Use Today
            </button>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-4">
            <h2 className="font-semibold text-lg text-gray-900">Late Fee Settings</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fee Type</label>
              <select
                value={invoice.feeType}
                onChange={e => setInvoice({ ...invoice, feeType: e.target.value })}
                className="input-field"
              >
                <option value="flat">Flat Amount</option>
                <option value="daily">Daily Rate ({getCurrencySymbol()})</option>
                <option value="monthly">Monthly Rate ({getCurrencySymbol()})</option>
                <option value="annual">Annual Rate (%)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {invoice.feeType === 'flat' ? 'Fee Amount' : invoice.feeType === 'daily' ? `Daily Fee (${getCurrencySymbol()})` : invoice.feeType === 'monthly' ? `Monthly Fee (${getCurrencySymbol()})` : 'Annual Rate (%)'}
              </label>
              <input
                type="number"
                value={invoice.feeValue}
                onChange={e => setInvoice({ ...invoice, feeValue: e.target.value })}
                className="input-field"
                min="0"
                step="0.01"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Grace Period (days)</label>
              <input
                type="number"
                value={invoice.gracePeriod}
                onChange={e => setInvoice({ ...invoice, gracePeriod: e.target.value })}
                className="input-field"
                min="0"
              />
            </div>

            {invoice.feeType === 'annual' && (
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={invoice.compound}
                  onChange={e => setInvoice({ ...invoice, compound: e.target.checked })}
                  className="w-4 h-4"
                />
                <span className="text-sm text-gray-700">Compound Interest</span>
              </label>
            )}
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-2 space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
              <p className="text-xs text-orange-600 mb-1">Days Overdue</p>
              <p className="text-3xl font-bold text-orange-700">{daysOverdue}</p>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <p className="text-xs text-red-600 mb-1">Late Fee</p>
              <p className="text-2xl font-bold text-red-700">{fmt(lateFee)}</p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-xs text-blue-600 mb-1">Original Amount</p>
              <p className="text-2xl font-bold text-blue-700">{fmt(invoice.amount)}</p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <p className="text-xs text-green-600 mb-1">Total Now Due</p>
              <p className="text-2xl font-bold text-green-700">{fmt(totalOwed)}</p>
            </div>
          </div>

          {/* Daily Breakdown */}
          {dailyBreakdown.length > 0 && (
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">First 30 Days Breakdown</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left px-3 py-2 font-semibold text-gray-700">Day</th>
                      <th className="text-right px-3 py-2 font-semibold text-gray-700">Daily Fee</th>
                      <th className="text-right px-3 py-2 font-semibold text-gray-700">Total Due</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dailyBreakdown.map((row, idx) => (
                      <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="px-3 py-2 text-gray-900 font-medium">{row.day}</td>
                        <td className="px-3 py-2 text-right text-gray-900">{fmt(row.fee)}</td>
                        <td className="px-3 py-2 text-right text-gray-900 font-semibold">{fmt(row.total)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Payment Reminder */}
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">Payment Reminder Template</h3>
            <textarea
              value={reminderTemplate}
              readOnly
              className="input-field resize-none w-full"
              rows="10"
            />
            <div className="mt-3">
              <CopyButton text={reminderTemplate} label="Copy Reminder" className="w-full justify-center" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
