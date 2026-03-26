import { useEffect, useMemo, useState } from 'react'

function formatRelative(date) {
  const delta = date.getTime() - Date.now()
  const abs = Math.abs(delta)
  const mins = Math.round(abs / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return delta < 0 ? `${mins} minutes ago` : `in ${mins} minutes`
  const hrs = Math.round(mins / 60)
  if (hrs < 24) return delta < 0 ? `${hrs} hours ago` : `in ${hrs} hours`
  const days = Math.round(hrs / 24)
  return delta < 0 ? `${days} days ago` : `in ${days} days`
}

function CopyRow({ label, value }) {
  return (
    <div className="rounded-lg border border-gray-200 p-3 bg-white flex items-start justify-between gap-3">
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="font-mono text-sm break-all">{value}</p>
      </div>
      <button className="btn-secondary" onClick={() => navigator.clipboard.writeText(value)}>Copy</button>
    </div>
  )
}

export default function UnixTimestampConverter() {
  const [input, setInput] = useState('')
  const [current, setCurrent] = useState(Math.floor(Date.now() / 1000))
  const [reverseDate, setReverseDate] = useState('')

  useEffect(() => {
    const id = setInterval(() => setCurrent(Math.floor(Date.now() / 1000)), 1000)
    return () => clearInterval(id)
  }, [])

  const parsedDate = useMemo(() => {
    if (!input.trim()) return null
    const numeric = Number(input.trim())
    if (Number.isNaN(numeric)) return null
    const ms = String(Math.abs(numeric)).length > 10 ? numeric : numeric * 1000
    const d = new Date(ms)
    return Number.isNaN(d.getTime()) ? null : d
  }, [input])

  const reverseTs = useMemo(() => {
    if (!reverseDate) return ''
    const d = new Date(reverseDate)
    if (Number.isNaN(d.getTime())) return ''
    return Math.floor(d.getTime() / 1000).toString()
  }, [reverseDate])

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-gray-200 bg-white p-4 flex flex-wrap gap-3 items-center justify-between">
        <p className="font-mono text-sm">Current Unix timestamp: {current}</p>
        <button className="btn-secondary" onClick={() => setInput(String(current))}>Use current timestamp</button>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">Unix timestamp (seconds or milliseconds)</label>
        <input value={input} onChange={(e) => setInput(e.target.value)} className="input-field mt-1" placeholder="1711270000 or 1711270000000" />
      </div>

      {parsedDate ? (
        <div className="space-y-2">
          <CopyRow label="Local Time" value={parsedDate.toLocaleString()} />
          <CopyRow label="UTC Time" value={parsedDate.toUTCString()} />
          <CopyRow label="ISO 8601" value={parsedDate.toISOString()} />
          <CopyRow label="Relative" value={formatRelative(parsedDate)} />
        </div>
      ) : (
        <p className="text-sm text-gray-500">Enter a timestamp to convert.</p>
      )}

      <div className="rounded-xl border border-gray-200 bg-white p-4 space-y-2">
        <h3 className="font-semibold text-gray-900">Reverse Mode</h3>
        <input type="datetime-local" value={reverseDate} onChange={(e) => setReverseDate(e.target.value)} className="input-field" />
        <CopyRow label="Unix (seconds)" value={reverseTs || 'N/A'} />
      </div>
    </div>
  )
}
