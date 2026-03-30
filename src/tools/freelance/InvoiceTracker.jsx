import { useState, useMemo } from 'react'
import {
  FileText, Plus, Trash2, Check, Clock, AlertTriangle, Search,
  ChevronLeft, ChevronRight, Filter, Download, ArrowRight, Edit2, X
} from 'lucide-react'
import { Link } from 'react-router-dom'
import SEOHead from '../../components/SEOHead.jsx'
import { getItem, setItem } from '../../utils/storage.js'

const STORAGE_KEY = 'untrackt_invoices'

const STATUS_OPTIONS = [
  { value: 'draft', label: 'Draft', color: 'gray', icon: FileText },
  { value: 'sent', label: 'Sent', color: 'blue', icon: Clock },
  { value: 'paid', label: 'Paid', color: 'green', icon: Check },
  { value: 'overdue', label: 'Overdue', color: 'red', icon: AlertTriangle },
]

const CURRENCIES = { USD: '$', GBP: '£', EUR: '€', CAD: 'C$', AUD: 'A$', INR: '₹', JPY: '¥' }

function getToday() {
  return new Date().toISOString().slice(0, 10)
}

function getMonthKey(date) {
  return date ? date.slice(0, 7) : ''
}

function getMonthLabel(ym) {
  const [y, m] = ym.split('-')
  return new Date(parseInt(y), parseInt(m) - 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

function fmt(amount, currency = 'USD') {
  const sym = CURRENCIES[currency] || '$'
  const num = Number(amount) || 0
  return `${sym}${num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

function isOverdue(invoice) {
  return invoice.status === 'sent' && invoice.dueDate && invoice.dueDate < getToday()
}

export default function InvoiceTracker() {
  const [invoices, setInvoices] = useState(() => getItem(STORAGE_KEY, []))
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedMonth, setSelectedMonth] = useState(getToday().slice(0, 7))
  const [view, setView] = useState('list')
  const [editingId, setEditingId] = useState(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newInvoice, setNewInvoice] = useState({
    number: '', client: '', email: '', amount: '', currency: 'USD',
    date: getToday(), dueDate: '', status: 'sent', notes: '',
  })

  // Persist on change
  const save = (updated) => {
    setInvoices(updated)
    setItem(STORAGE_KEY, updated)
  }

  // Auto-detect overdue invoices
  const processedInvoices = useMemo(() =>
    invoices.map(inv => ({
      ...inv,
      status: isOverdue(inv) ? 'overdue' : inv.status,
    })),
    [invoices]
  )

  // Filtered list
  const filteredInvoices = useMemo(() => {
    let list = processedInvoices
    if (statusFilter !== 'all') {
      list = list.filter(inv => inv.status === statusFilter)
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      list = list.filter(inv =>
        (inv.client || '').toLowerCase().includes(q) ||
        (inv.number || '').toLowerCase().includes(q) ||
        (inv.email || '').toLowerCase().includes(q)
      )
    }
    return list.sort((a, b) => (b.date || '').localeCompare(a.date || ''))
  }, [processedInvoices, statusFilter, searchQuery])

  // Stats
  const stats = useMemo(() => {
    const all = processedInvoices
    const total = all.reduce((s, i) => s + (parseFloat(i.amount) || 0), 0)
    const paid = all.filter(i => i.status === 'paid')
    const paidTotal = paid.reduce((s, i) => s + (parseFloat(i.amount) || 0), 0)
    const overdue = all.filter(i => i.status === 'overdue')
    const overdueTotal = overdue.reduce((s, i) => s + (parseFloat(i.amount) || 0), 0)
    const pending = all.filter(i => i.status === 'sent')
    const pendingTotal = pending.reduce((s, i) => s + (parseFloat(i.amount) || 0), 0)
    return {
      count: all.length,
      total,
      paidCount: paid.length, paidTotal,
      overdueCount: overdue.length, overdueTotal,
      pendingCount: pending.length, pendingTotal,
    }
  }, [processedInvoices])

  // Monthly summary
  const monthlySummary = useMemo(() => {
    const months = new Map()
    processedInvoices.forEach(inv => {
      const mk = getMonthKey(inv.date)
      if (!mk) return
      if (!months.has(mk)) months.set(mk, { invoiced: 0, paid: 0, count: 0 })
      const m = months.get(mk)
      m.invoiced += parseFloat(inv.amount) || 0
      m.count++
      if (inv.status === 'paid') m.paid += parseFloat(inv.amount) || 0
    })
    return [...months.entries()]
      .sort((a, b) => b[0].localeCompare(a[0]))
      .slice(0, 12)
      .map(([key, data]) => ({ key, label: getMonthLabel(key), ...data }))
  }, [processedInvoices])

  // Add invoice
  const handleAdd = () => {
    if (!newInvoice.client || !newInvoice.amount) return
    const inv = {
      id: Date.now().toString(),
      number: newInvoice.number || `INV-${Date.now().toString().slice(-6)}`,
      client: newInvoice.client,
      email: newInvoice.email,
      amount: parseFloat(newInvoice.amount) || 0,
      currency: newInvoice.currency,
      date: newInvoice.date,
      dueDate: newInvoice.dueDate,
      status: newInvoice.status,
      notes: newInvoice.notes,
      lineItems: [],
      createdAt: new Date().toISOString(),
    }
    save([...invoices, inv])
    setNewInvoice({ number: '', client: '', email: '', amount: '', currency: 'USD', date: getToday(), dueDate: '', status: 'sent', notes: '' })
    setShowAddForm(false)
  }

  // Update status
  const updateStatus = (id, status) => {
    save(invoices.map(inv => inv.id === id ? { ...inv, status } : inv))
  }

  // Delete invoice
  const deleteInvoice = (id) => {
    save(invoices.filter(inv => inv.id !== id))
    if (editingId === id) setEditingId(null)
  }

  // Export CSV
  const exportCSV = () => {
    const headers = ['Number', 'Client', 'Email', 'Amount', 'Currency', 'Date', 'Due Date', 'Status']
    const rows = filteredInvoices.map(inv => [
      inv.number, inv.client, inv.email, inv.amount, inv.currency, inv.date, inv.dueDate, inv.status,
    ])
    const csv = [headers, ...rows].map(r => r.map(c => `"${String(c || '').replace(/"/g, '""')}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `invoices-${getToday()}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const VIEWS = [
    { id: 'list', label: 'Invoices' },
    { id: 'summary', label: 'Revenue' },
  ]

  const statusBadge = (status) => {
    const s = STATUS_OPTIONS.find(o => o.value === status) || STATUS_OPTIONS[0]
    const colors = {
      gray: 'bg-gray-100 text-gray-700',
      blue: 'bg-blue-100 text-blue-700',
      green: 'bg-green-100 text-green-700',
      red: 'bg-red-100 text-red-700',
    }
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${colors[s.color]}`}>
        <s.icon size={12} />
        {s.label}
      </span>
    )
  }

  return (
    <>
      <SEOHead
        title="Invoice Tracker | UnTrackt"
        description="Track all your invoices, monitor payment status, spot overdue payments, and see monthly revenue summaries. Syncs with Invoice Generator."
        path="/tools/invoice-tracker"
        toolName="Invoice Tracker"
      />

      <div className="space-y-6">
        {/* Header controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
            {VIEWS.map(v => (
              <button
                key={v.id}
                onClick={() => setView(v.id)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${view === v.id ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
              >
                {v.label}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
            >
              <Plus size={14} /> Add Invoice
            </button>
            {invoices.length > 0 && (
              <button
                onClick={exportCSV}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200"
              >
                <Download size={14} /> Export CSV
              </button>
            )}
          </div>
        </div>

        {/* Add invoice form */}
        {showAddForm && (
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Add Invoice</h3>
              <button onClick={() => setShowAddForm(false)} className="p-1 hover:bg-gray-100 rounded"><X size={18} /></button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Invoice Number</label>
                <input type="text" value={newInvoice.number} onChange={e => setNewInvoice(p => ({ ...p, number: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="INV-001" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Client Name *</label>
                <input type="text" value={newInvoice.client} onChange={e => setNewInvoice(p => ({ ...p, client: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="Client name" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Client Email</label>
                <input type="email" value={newInvoice.email} onChange={e => setNewInvoice(p => ({ ...p, email: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="email@example.com" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Amount *</label>
                <input type="number" min="0" step="0.01" value={newInvoice.amount} onChange={e => setNewInvoice(p => ({ ...p, amount: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="0.00" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Currency</label>
                <select value={newInvoice.currency} onChange={e => setNewInvoice(p => ({ ...p, currency: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                  {Object.keys(CURRENCIES).map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Status</label>
                <select value={newInvoice.status} onChange={e => setNewInvoice(p => ({ ...p, status: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                  {STATUS_OPTIONS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Invoice Date</label>
                <input type="date" value={newInvoice.date} onChange={e => setNewInvoice(p => ({ ...p, date: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Due Date</label>
                <input type="date" value={newInvoice.dueDate} onChange={e => setNewInvoice(p => ({ ...p, dueDate: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Notes</label>
                <input type="text" value={newInvoice.notes} onChange={e => setNewInvoice(p => ({ ...p, notes: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="Optional notes" />
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button onClick={handleAdd} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                Save Invoice
              </button>
            </div>
          </div>
        )}

        {/* Stats cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <p className="text-xs text-gray-500 font-medium mb-1">Total Invoiced</p>
            <p className="text-xl font-bold text-gray-900">{fmt(stats.total)}</p>
            <p className="text-xs text-gray-500 mt-1">{stats.count} invoice{stats.count !== 1 ? 's' : ''}</p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <p className="text-xs text-green-600 font-medium mb-1">Paid</p>
            <p className="text-xl font-bold text-green-700">{fmt(stats.paidTotal)}</p>
            <p className="text-xs text-green-600 mt-1">{stats.paidCount} invoice{stats.paidCount !== 1 ? 's' : ''}</p>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <p className="text-xs text-blue-600 font-medium mb-1">Pending</p>
            <p className="text-xl font-bold text-blue-700">{fmt(stats.pendingTotal)}</p>
            <p className="text-xs text-blue-600 mt-1">{stats.pendingCount} invoice{stats.pendingCount !== 1 ? 's' : ''}</p>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="text-xs text-red-600 font-medium mb-1">Overdue</p>
            <p className="text-xl font-bold text-red-700">{fmt(stats.overdueTotal)}</p>
            <p className="text-xs text-red-600 mt-1">{stats.overdueCount} invoice{stats.overdueCount !== 1 ? 's' : ''}</p>
          </div>
        </div>

        {/* Overdue alert */}
        {stats.overdueCount > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
            <AlertTriangle className="text-red-500 flex-shrink-0 mt-0.5" size={18} />
            <div>
              <p className="text-sm font-semibold text-red-800">
                {stats.overdueCount} overdue invoice{stats.overdueCount !== 1 ? 's' : ''} totalling {fmt(stats.overdueTotal)}
              </p>
              <p className="text-xs text-red-700 mt-1">Follow up with these clients to secure payment.</p>
            </div>
          </div>
        )}

        {view === 'list' && (
          <>
            {/* Search and filter */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search by client, number, or email..."
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>
              <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
                <button onClick={() => setStatusFilter('all')}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${statusFilter === 'all' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}>
                  All
                </button>
                {STATUS_OPTIONS.map(s => (
                  <button key={s.value} onClick={() => setStatusFilter(s.value)}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${statusFilter === s.value ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}>
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Invoice list */}
            {filteredInvoices.length === 0 ? (
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center">
                <FileText className="mx-auto mb-3 text-gray-400" size={32} />
                <h3 className="font-semibold text-gray-900 mb-2">
                  {invoices.length === 0 ? 'No Invoices Yet' : 'No Matching Invoices'}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {invoices.length === 0
                    ? 'Add an invoice manually or create one in the Invoice Generator — it will appear here automatically.'
                    : 'Try changing your search or filter.'}
                </p>
                {invoices.length === 0 && (
                  <Link to="/tools/invoice-generator" className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium">
                    Open Invoice Generator <ArrowRight size={14} />
                  </Link>
                )}
              </div>
            ) : (
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="text-left px-4 py-3 font-semibold text-gray-700">#</th>
                        <th className="text-left px-4 py-3 font-semibold text-gray-700">Client</th>
                        <th className="text-right px-4 py-3 font-semibold text-gray-700">Amount</th>
                        <th className="text-left px-4 py-3 font-semibold text-gray-700">Date</th>
                        <th className="text-left px-4 py-3 font-semibold text-gray-700">Due</th>
                        <th className="text-left px-4 py-3 font-semibold text-gray-700">Status</th>
                        <th className="text-right px-4 py-3 font-semibold text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredInvoices.map(inv => (
                        <tr key={inv.id} className={`border-b border-gray-100 hover:bg-gray-50 ${inv.status === 'overdue' ? 'bg-red-50/50' : ''}`}>
                          <td className="px-4 py-3 text-gray-900 font-medium">{inv.number}</td>
                          <td className="px-4 py-3">
                            <p className="text-gray-900">{inv.client}</p>
                            {inv.email && <p className="text-xs text-gray-500">{inv.email}</p>}
                          </td>
                          <td className="px-4 py-3 text-right font-semibold text-gray-900">
                            {fmt(inv.amount, inv.currency)}
                          </td>
                          <td className="px-4 py-3 text-gray-600">{inv.date}</td>
                          <td className={`px-4 py-3 ${inv.status === 'overdue' ? 'text-red-600 font-medium' : 'text-gray-600'}`}>
                            {inv.dueDate || '—'}
                          </td>
                          <td className="px-4 py-3">{statusBadge(inv.status)}</td>
                          <td className="px-4 py-3 text-right">
                            <div className="flex items-center justify-end gap-1">
                              {inv.status !== 'paid' && (
                                <button
                                  onClick={() => updateStatus(inv.id, 'paid')}
                                  className="p-1.5 text-green-600 hover:bg-green-50 rounded" title="Mark as Paid"
                                >
                                  <Check size={14} />
                                </button>
                              )}
                              {inv.status === 'paid' && (
                                <button
                                  onClick={() => updateStatus(inv.id, 'sent')}
                                  className="p-1.5 text-blue-600 hover:bg-blue-50 rounded" title="Mark as Sent"
                                >
                                  <Clock size={14} />
                                </button>
                              )}
                              <button
                                onClick={() => deleteInvoice(inv.id)}
                                className="p-1.5 text-red-600 hover:bg-red-50 rounded" title="Delete"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}

        {view === 'summary' && (
          <>
            {/* Monthly revenue chart */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Monthly Revenue</h3>
              {monthlySummary.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-8">No invoice data yet.</p>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <div className="flex items-end gap-3 min-w-[400px]" style={{ height: 200 }}>
                      {monthlySummary.slice(0, 6).reverse().map((m) => {
                        const maxVal = Math.max(...monthlySummary.slice(0, 6).map(x => x.invoiced), 1)
                        const invH = (m.invoiced / maxVal) * 170
                        const paidH = (m.paid / maxVal) * 170
                        return (
                          <div key={m.key} className="flex-1 flex flex-col items-center">
                            <div className="w-full flex gap-1 items-end" style={{ height: 170 }}>
                              <div className="flex-1 bg-blue-300 rounded-t transition-all" style={{ height: Math.max(invH, m.invoiced > 0 ? 4 : 0) }} title={`Invoiced: ${fmt(m.invoiced)}`} />
                              <div className="flex-1 bg-green-400 rounded-t transition-all" style={{ height: Math.max(paidH, m.paid > 0 ? 4 : 0) }} title={`Paid: ${fmt(m.paid)}`} />
                            </div>
                            <span className="text-xs text-gray-500 mt-1">{m.label.split(' ')[0].slice(0, 3)}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1"><span className="w-3 h-2 bg-blue-300 rounded" /> Invoiced</span>
                    <span className="flex items-center gap-1"><span className="w-3 h-2 bg-green-400 rounded" /> Paid</span>
                  </div>
                </>
              )}
            </div>

            {/* Monthly breakdown table */}
            {monthlySummary.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left px-4 py-3 font-semibold text-gray-700">Month</th>
                      <th className="text-right px-4 py-3 font-semibold text-gray-700">Invoices</th>
                      <th className="text-right px-4 py-3 font-semibold text-gray-700">Invoiced</th>
                      <th className="text-right px-4 py-3 font-semibold text-gray-700">Paid</th>
                      <th className="text-right px-4 py-3 font-semibold text-gray-700">Collection %</th>
                    </tr>
                  </thead>
                  <tbody>
                    {monthlySummary.map(m => (
                      <tr key={m.key} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="px-4 py-3 text-gray-900 font-medium">{m.label}</td>
                        <td className="px-4 py-3 text-right text-gray-600">{m.count}</td>
                        <td className="px-4 py-3 text-right text-gray-900 font-medium">{fmt(m.invoiced)}</td>
                        <td className="px-4 py-3 text-right text-green-700 font-medium">{fmt(m.paid)}</td>
                        <td className="px-4 py-3 text-right">
                          <span className={`font-medium ${m.invoiced > 0 && (m.paid / m.invoiced) >= 0.8 ? 'text-green-600' : 'text-amber-600'}`}>
                            {m.invoiced > 0 ? ((m.paid / m.invoiced) * 100).toFixed(0) : 0}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Link to Invoice Generator */}
            <div className="text-center">
              <Link to="/tools/invoice-generator" className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium">
                Create a new invoice in Invoice Generator <ArrowRight size={14} />
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  )
}
