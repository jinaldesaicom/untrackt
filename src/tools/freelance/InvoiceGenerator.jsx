import { useState, useEffect } from 'react'
import { Plus, Trash2, ChevronUp, ChevronDown } from 'lucide-react'
import SEOHead from '../../components/SEOHead.jsx'
import DisclaimerCard from '../../components/DisclaimerCard.jsx'
import PrintButton from '../../components/PrintButton.jsx'
import CopyButton from '../../components/CopyButton.jsx'
import * as storage from '../../utils/storage.js'

const CURRENCIES = {
  USD: '$',
  GBP: '£',
  EUR: '€',
  CAD: 'C$',
  AUD: 'A$',
  INR: '₹',
  JPY: '¥',
}

const TEMPLATE_KEY = 'invoice:template'
const LAST_NUMBER_KEY = 'invoice:lastNumber'

export default function InvoiceGenerator() {
  const [from, setFrom] = useState({
    name: '',
    address: '',
    email: '',
    phone: '',
    website: '',
  })

  const [to, setTo] = useState({
    name: '',
    address: '',
    email: '',
  })

  const [invoiceDetails, setInvoiceDetails] = useState({
    number: '1001',
    date: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    currency: 'USD',
  })

  const [lineItems, setLineItems] = useState([
    { id: 1, description: '', quantity: 1, rate: 0 },
  ])

  const [totals, setTotals] = useState({
    discountType: '%',
    discountValue: 0,
    taxRate: 10,
    taxLabel: 'Tax',
  })

  const [notes, setNotes] = useState({
    paymentTerms: '',
    message: '',
  })

  // Load template on mount
  useEffect(() => {
    const savedTemplate = storage.getItem(TEMPLATE_KEY)
    const lastNumber = storage.getItem(LAST_NUMBER_KEY, 1000)
    if (savedTemplate) {
      setFrom(savedTemplate)
    }
    setInvoiceDetails(prev => ({
      ...prev,
      number: String(lastNumber + 1),
    }))
  }, [])

  const currencySymbol = CURRENCIES[invoiceDetails.currency] || '$'

  // Calculate totals
  const subtotal = lineItems.reduce((sum, item) => {
    const qty = parseFloat(item.quantity) || 0
    const rate = parseFloat(item.rate) || 0
    return sum + qty * rate
  }, 0)

  const discount =
    totals.discountType === '%'
      ? (subtotal * (parseFloat(totals.discountValue) || 0)) / 100
      : parseFloat(totals.discountValue) || 0

  const taxableAmount = subtotal - discount
  const tax = (taxableAmount * (parseFloat(totals.taxRate) || 0)) / 100
  const total = taxableAmount + tax

  const fmt = (v) => v.toFixed(2)

  const updateLineItem = (id, field, value) => {
    setLineItems(lineItems.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    ))
  }

  const addLineItem = () => {
    const newId = Math.max(...lineItems.map(i => i.id), 0) + 1
    setLineItems([...lineItems, { id: newId, description: '', quantity: 1, rate: 0 }])
  }

  const removeLineItem = (id) => {
    if (lineItems.length > 1) {
      setLineItems(lineItems.filter(item => item.id !== id))
    }
  }

  const moveLineItem = (id, direction) => {
    const idx = lineItems.findIndex(item => item.id === id)
    if ((direction === 'up' && idx > 0) || (direction === 'down' && idx < lineItems.length - 1)) {
      const newItems = [...lineItems]
      const target = direction === 'up' ? idx - 1 : idx + 1
      ;[newItems[idx], newItems[target]] = [newItems[target], newItems[idx]]
      setLineItems(newItems)
    }
  }

  const saveTemplate = () => {
    storage.setItem(TEMPLATE_KEY, from)
    alert('Invoice template saved!')
  }

  const loadTemplate = () => {
    const template = storage.getItem(TEMPLATE_KEY)
    if (template) {
      setFrom(template)
      alert('Template loaded!')
    } else {
      alert('No saved template found')
    }
  }

  const clearAll = () => {
    if (confirm('Clear all invoice data?')) {
      setFrom({ name: '', address: '', email: '', phone: '', website: '' })
      setTo({ name: '', address: '', email: '' })
      setLineItems([{ id: 1, description: '', quantity: 1, rate: 0 }])
      setNotes({ paymentTerms: '', message: '' })
    }
  }

  const newInvoice = () => {
    const nextNumber = (parseInt(invoiceDetails.number) || 1000) + 1
    storage.setItem(LAST_NUMBER_KEY, nextNumber)
    setInvoiceDetails(prev => ({
      ...prev,
      number: String(nextNumber),
      date: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    }))
    setTo({ name: '', address: '', email: '' })
    setLineItems([{ id: 1, description: '', quantity: 1, rate: 0 }])
    setNotes({ paymentTerms: '', message: '' })
  }

  return (
    <>
      <SEOHead
        title="Invoice Generator | UnTrackt"
        description="Create professional invoices instantly. Add line items, calculate totals, print to PDF. Runs in your browser - no account needed."
        path="/tools/invoice-generator"
        toolName="Invoice Generator"
      />


      <div className="space-y-6">
        <div className="flex flex-wrap gap-2 mb-4">
          <PrintButton label="Print / Save as PDF" />
          <button onClick={saveTemplate} className="btn-secondary text-sm">
            Save Template
          </button>
          <button onClick={loadTemplate} className="btn-secondary text-sm">
            Load Template
          </button>
          <button onClick={newInvoice} className="btn-secondary text-sm">
            New Invoice
          </button>
          <button onClick={clearAll} className="btn-secondary text-sm">
            Clear
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form Section */}
          <div className="space-y-6">
            {/* FROM Section */}
            <div className="space-y-4 bg-white p-6 rounded-xl border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">From (Your Details)</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name / Business Name</label>
                <input
                  type="text"
                  value={from.name}
                  onChange={e => setFrom({ ...from, name: e.target.value })}
                  className="input-field"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <textarea
                  value={from.address}
                  onChange={e => setFrom({ ...from, address: e.target.value })}
                  className="input-field resize-none"
                  rows="2"
                  placeholder="Street address, city, state, zip"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={from.email}
                  onChange={e => setFrom({ ...from, email: e.target.value })}
                  className="input-field"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  value={from.phone}
                  onChange={e => setFrom({ ...from, phone: e.target.value })}
                  className="input-field"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Website (optional)</label>
                <input
                  type="url"
                  value={from.website}
                  onChange={e => setFrom({ ...from, website: e.target.value })}
                  className="input-field"
                  placeholder="https://yourwebsite.com"
                />
              </div>
            </div>

            {/* TO Section */}
            <div className="space-y-4 bg-white p-6 rounded-xl border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">To (Client Details)</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Client Name / Company</label>
                <input
                  type="text"
                  value={to.name}
                  onChange={e => setTo({ ...to, name: e.target.value })}
                  className="input-field"
                  placeholder="Client name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Client Address</label>
                <textarea
                  value={to.address}
                  onChange={e => setTo({ ...to, address: e.target.value })}
                  className="input-field resize-none"
                  rows="2"
                  placeholder="Street address, city, state, zip"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Client Email</label>
                <input
                  type="email"
                  value={to.email}
                  onChange={e => setTo({ ...to, email: e.target.value })}
                  className="input-field"
                  placeholder="client@email.com"
                />
              </div>
            </div>

            {/* Invoice Details */}
            <div className="space-y-4 bg-white p-6 rounded-xl border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Invoice Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Invoice Number</label>
                  <input
                    type="text"
                    value={invoiceDetails.number}
                    onChange={e => setInvoiceDetails({ ...invoiceDetails, number: e.target.value })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                  <select
                    value={invoiceDetails.currency}
                    onChange={e => setInvoiceDetails({ ...invoiceDetails, currency: e.target.value })}
                    className="input-field"
                  >
                    {Object.keys(CURRENCIES).map(curr => (
                      <option key={curr} value={curr}>
                        {curr} ({CURRENCIES[curr]})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Invoice Date</label>
                  <input
                    type="date"
                    value={invoiceDetails.date}
                    onChange={e => setInvoiceDetails({ ...invoiceDetails, date: e.target.value })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                  <input
                    type="date"
                    value={invoiceDetails.dueDate}
                    onChange={e => setInvoiceDetails({ ...invoiceDetails, dueDate: e.target.value })}
                    className="input-field"
                  />
                </div>
              </div>
            </div>

            {/* Line Items */}
            <div className="space-y-4 bg-white p-6 rounded-xl border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Line Items</h2>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {lineItems.map((item, idx) => (
                  <div key={item.id} className="flex gap-2 items-start">
                    <div className="flex-1">
                      <input
                        type="text"
                        value={item.description}
                        onChange={e => updateLineItem(item.id, 'description', e.target.value)}
                        className="input-field text-sm"
                        placeholder="Description"
                      />
                    </div>
                    <div className="w-20">
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={e => updateLineItem(item.id, 'quantity', e.target.value)}
                        className="input-field text-sm"
                        placeholder="Qty"
                        min="0"
                        step="0.01"
                      />
                    </div>
                    <div className="w-24">
                      <input
                        type="number"
                        value={item.rate}
                        onChange={e => updateLineItem(item.id, 'rate', e.target.value)}
                        className="input-field text-sm"
                        placeholder="Rate"
                        min="0"
                        step="0.01"
                      />
                    </div>
                    <div className="w-24 text-right">
                      <div className="text-sm font-medium text-gray-900">
                        {currencySymbol}{fmt((parseFloat(item.quantity) || 0) * (parseFloat(item.rate) || 0))}
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={() => moveLineItem(item.id, 'up')}
                        disabled={idx === 0}
                        className="p-1 hover:bg-gray-100 rounded disabled:opacity-50"
                        title="Move up"
                      >
                        <ChevronUp className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => moveLineItem(item.id, 'down')}
                        disabled={idx === lineItems.length - 1}
                        className="p-1 hover:bg-gray-100 rounded disabled:opacity-50"
                        title="Move down"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => removeLineItem(item.id)}
                        disabled={lineItems.length === 1}
                        className="p-1 hover:bg-red-100 rounded disabled:opacity-50"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={addLineItem} className="btn-secondary text-sm w-full">
                <Plus className="w-4 h-4" />
                Add Line Item
              </button>
            </div>

            {/* Totals */}
            <div className="space-y-4 bg-white p-6 rounded-xl border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Totals</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Discount</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={totals.discountValue}
                      onChange={e => setTotals({ ...totals, discountValue: e.target.value })}
                      className="input-field flex-1"
                      placeholder="0"
                      min="0"
                      step="0.01"
                    />
                    <select
                      value={totals.discountType}
                      onChange={e => setTotals({ ...totals, discountType: e.target.value })}
                      className="input-field w-16"
                    >
                      <option value="%">%</option>
                      <option value="flat">Flat</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {totals.taxLabel} Rate (%)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={totals.taxRate}
                      onChange={e => setTotals({ ...totals, taxRate: e.target.value })}
                      className="input-field flex-1"
                      placeholder="0"
                      min="0"
                      step="0.01"
                    />
                    <input
                      type="text"
                      value={totals.taxLabel}
                      onChange={e => setTotals({ ...totals, taxLabel: e.target.value })}
                      className="input-field w-20"
                      placeholder="Tax"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-4 bg-white p-6 rounded-xl border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Notes</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Terms</label>
                <textarea
                  value={notes.paymentTerms}
                  onChange={e => setNotes({ ...notes, paymentTerms: e.target.value })}
                  className="input-field resize-none"
                  rows="2"
                  placeholder="e.g., Due upon receipt"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  value={notes.message}
                  onChange={e => setNotes({ ...notes, message: e.target.value })}
                  className="input-field resize-none"
                  rows="2"
                  placeholder="Thank you for your business!"
                />
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="hidden lg:block print:block sticky top-6 h-fit">
            <div id="invoice-preview" className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm print:shadow-none print:border-0 print:p-0">
              <div className="space-y-6">
                {/* Header */}
                <div>
                  {from.name && <h1 className="text-3xl font-bold text-gray-900">{from.name}</h1>}
                  {from.address && <p className="text-sm text-gray-600 whitespace-pre-wrap">{from.address}</p>}
                  {from.email && <p className="text-sm text-gray-600">{from.email}</p>}
                  {from.phone && <p className="text-sm text-gray-600">{from.phone}</p>}
                  {from.website && <p className="text-sm text-blue-600">{from.website}</p>}
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <p className="text-4xl font-bold text-gray-900">INVOICE</p>
                </div>

                {/* Invoice details grid */}
                <div className="grid grid-cols-2 gap-6 text-sm">
                  <div>
                    <p className="text-gray-500 mb-1">Invoice Number</p>
                    <p className="font-semibold text-gray-900">{invoiceDetails.number}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-1">Invoice Date</p>
                    <p className="font-semibold text-gray-900">{invoiceDetails.date}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-1">Due Date</p>
                    <p className="font-semibold text-gray-900">{invoiceDetails.dueDate}</p>
                  </div>
                </div>

                {/* Bill to */}
                {to.name && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-xs text-gray-500 uppercase mb-2">Bill To</p>
                    <p className="font-semibold text-gray-900">{to.name}</p>
                    {to.address && <p className="text-sm text-gray-600 whitespace-pre-wrap">{to.address}</p>}
                    {to.email && <p className="text-sm text-gray-600">{to.email}</p>}
                  </div>
                )}

                {/* Line items table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b-2 border-gray-300">
                        <th className="text-left py-2 text-gray-700 font-semibold">Description</th>
                        <th className="text-right py-2 text-gray-700 font-semibold w-20">Qty</th>
                        <th className="text-right py-2 text-gray-700 font-semibold w-24">Rate</th>
                        <th className="text-right py-2 text-gray-700 font-semibold w-24">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {lineItems.map(item => (
                        <tr key={item.id} className="border-b border-gray-200">
                          <td className="py-2 text-gray-900">{item.description}</td>
                          <td className="text-right py-2 text-gray-900">
                            {(parseFloat(item.quantity) || 0).toFixed(2)}
                          </td>
                          <td className="text-right py-2 text-gray-900">
                            {currencySymbol}
                            {fmt(parseFloat(item.rate) || 0)}
                          </td>
                          <td className="text-right py-2 text-gray-900">
                            {currencySymbol}
                            {fmt((parseFloat(item.quantity) || 0) * (parseFloat(item.rate) || 0))}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Totals */}
                <div className="flex justify-end max-w-xs ml-auto">
                  <table className="w-full text-sm">
                    <tbody>
                      <tr className="border-b border-gray-200">
                        <td className="py-2 text-gray-700">Subtotal</td>
                        <td className="text-right py-2 text-gray-900 font-medium">
                          {currencySymbol}
                          {fmt(subtotal)}
                        </td>
                      </tr>
                      {discount > 0 && (
                        <tr className="border-b border-gray-200">
                          <td className="py-2 text-gray-700">Discount</td>
                          <td className="text-right py-2 text-gray-900 font-medium">
                            -{currencySymbol}
                            {fmt(discount)}
                          </td>
                        </tr>
                      )}
                      <tr className="border-b border-gray-200">
                        <td className="py-2 text-gray-700">
                          {totals.taxLabel} ({parseFloat(totals.taxRate) || 0}%)
                        </td>
                        <td className="text-right py-2 text-gray-900 font-medium">
                          {currencySymbol}
                          {fmt(tax)}
                        </td>
                      </tr>
                      <tr className="border-b-2 border-gray-300">
                        <td className="py-3 text-gray-900 font-bold">Total</td>
                        <td className="text-right py-3 text-gray-900 font-bold text-lg">
                          {currencySymbol}
                          {fmt(total)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Notes */}
                {(notes.paymentTerms || notes.message) && (
                  <div className="space-y-2 text-sm">
                    {notes.paymentTerms && (
                      <div>
                        <p className="text-gray-500 mb-1 font-semibold">Payment Terms</p>
                        <p className="text-gray-900 whitespace-pre-wrap">{notes.paymentTerms}</p>
                      </div>
                    )}
                    {notes.message && (
                      <div>
                        <p className="text-gray-900 italic">{notes.message}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile preview */}
        <div className="lg:hidden">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Invoice Preview</h2>
          <div className="bg-white p-8 rounded-xl border border-gray-200">
            <div className="space-y-6">
              <div>
                {from.name && <h1 className="text-2xl font-bold text-gray-900">{from.name}</h1>}
                {from.address && <p className="text-sm text-gray-600 whitespace-pre-wrap">{from.address}</p>}
                {from.email && <p className="text-sm text-gray-600">{from.email}</p>}
              </div>

              <p className="text-3xl font-bold text-gray-900">INVOICE</p>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500 mb-1">Invoice Number</p>
                  <p className="font-semibold text-gray-900">{invoiceDetails.number}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Due Date</p>
                  <p className="font-semibold text-gray-900">{invoiceDetails.dueDate}</p>
                </div>
              </div>

              {to.name && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs text-gray-500 uppercase mb-2">Bill To</p>
                  <p className="font-semibold text-gray-900">{to.name}</p>
                </div>
              )}

              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b-2 border-gray-300">
                    <th className="text-left py-2 text-gray-700">Description</th>
                    <th className="text-right py-2 text-gray-700">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {lineItems.map(item => (
                    <tr key={item.id} className="border-b border-gray-200">
                      <td className="py-2 text-gray-900">{item.description}</td>
                      <td className="text-right py-2 text-gray-900">
                        {currencySymbol}
                        {fmt((parseFloat(item.quantity) || 0) * (parseFloat(item.rate) || 0))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="space-y-1 border-t border-gray-200 pt-4 text-sm">
                <div className="flex justify-between">
                  <span>Total:</span>
                  <span className="font-bold">
                    {currencySymbol}
                    {fmt(total)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media print {
          body * { visibility: hidden; }
          #invoice-preview,
          #invoice-preview * { visibility: visible; }
          #invoice-preview {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            display: block !important;
            box-shadow: none !important;
            border: none !important;
            padding: 0 !important;
          }
        }
      `}</style>
    </>
  )
}
