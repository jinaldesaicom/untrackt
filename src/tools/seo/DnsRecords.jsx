import { useState, useCallback } from 'react'
import { Copy, Check, Search, AlertTriangle, Shield, ShieldOff } from 'lucide-react'

const RECORD_TYPES = ['A', 'AAAA', 'CNAME', 'MX', 'TXT', 'NS', 'SOA', 'SRV', 'CAA', 'PTR']

const TYPE_COLORS = {
  A: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  AAAA: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300',
  CNAME: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
  MX: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  TXT: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
  NS: 'bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300',
  SOA: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300',
  SRV: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300',
  CAA: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
  PTR: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
}

const TYPE_NUM_TO_NAME = {
  1: 'A', 2: 'NS', 5: 'CNAME', 6: 'SOA', 12: 'PTR', 15: 'MX',
  16: 'TXT', 28: 'AAAA', 33: 'SRV', 257: 'CAA',
}

function extractHostname(input) {
  let s = input.trim()
  try { s = new URL(s.includes('://') ? s : `https://${s}`).hostname } catch { /* use as-is */ }
  return s.replace(/^www\./, '')
}

function formatTTL(seconds) {
  if (seconds < 60) return `${seconds}s`
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ${Math.floor((seconds % 3600) / 60)}m`
  return `${Math.floor(seconds / 86400)}d ${Math.floor((seconds % 86400) / 3600)}h`
}

async function queryDns(hostname, type) {
  const url = `https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(hostname)}&type=${encodeURIComponent(type)}`
  const res = await fetch(url, { headers: { accept: 'application/dns-json' } })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

function CopyBtn({ text }) {
  const [copied, setCopied] = useState(false)
  const copy = () => { navigator.clipboard.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1500) }) }
  return (
    <button onClick={copy} title="Copy" className="text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
    </button>
  )
}

export default function DnsRecords() {
  const [domain, setDomain] = useState('')
  const [selectedTypes, setSelectedTypes] = useState(['A', 'AAAA', 'CNAME', 'MX', 'TXT', 'NS'])
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const toggleType = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    )
  }

  const selectAll = () => setSelectedTypes([...RECORD_TYPES])
  const selectNone = () => setSelectedTypes([])

  const handleLookup = useCallback(async () => {
    const hostname = extractHostname(domain)
    if (!hostname || !hostname.includes('.')) {
      setError('Please enter a valid domain name.')
      return
    }
    if (selectedTypes.length === 0) {
      setError('Select at least one record type.')
      return
    }

    setLoading(true)
    setError('')
    setResults(null)

    const grouped = {}
    let dnssecVerified = false

    try {
      const queries = selectedTypes.map(async (type) => {
        try {
          const data = await queryDns(hostname, type)
          if (data.AD) dnssecVerified = true
          const typeName = type
          if (data.Answer && data.Answer.length > 0) {
            grouped[typeName] = data.Answer.map((a) => ({
              name: a.name,
              type: TYPE_NUM_TO_NAME[a.type] || String(a.type),
              ttl: a.TTL,
              data: a.data,
            }))
          } else if (data.Authority && data.Authority.length > 0) {
            // SOA often comes back in Authority section
            if (type === 'SOA') {
              grouped[typeName] = data.Authority.filter(
                (a) => (TYPE_NUM_TO_NAME[a.type] || String(a.type)) === 'SOA'
              ).map((a) => ({
                name: a.name,
                type: 'SOA',
                ttl: a.TTL,
                data: a.data,
              }))
              if (grouped[typeName].length === 0) delete grouped[typeName]
            }
          }
        } catch {
          // individual type query failed — skip silently
        }
      })

      await Promise.all(queries)

      if (Object.keys(grouped).length === 0) {
        setError(`No DNS records found for "${hostname}". Check the domain name and try again.`)
      } else {
        setResults({ hostname, records: grouped, dnssec: dnssecVerified, queriedAt: new Date() })
      }
    } catch {
      setError('DNS lookup failed. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }, [domain, selectedTypes])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleLookup()
  }

  const totalRecords = results
    ? Object.values(results.records).reduce((sum, arr) => sum + arr.length, 0)
    : 0

  return (
    <div className="space-y-5">
      {/* Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">
          Domain or URL
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g. example.com or https://example.com/page"
            className="input-field flex-1"
            spellCheck={false}
          />
          <button
            onClick={handleLookup}
            disabled={loading || !domain.trim()}
            className="btn-primary flex items-center gap-2 whitespace-nowrap"
          >
            <Search className="w-4 h-4" />
            {loading ? 'Querying…' : 'Lookup'}
          </button>
        </div>
      </div>

      {/* Record type selector */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Record types
          </label>
          <div className="flex gap-2 text-xs">
            <button onClick={selectAll} className="text-indigo-600 dark:text-indigo-400 hover:underline">All</button>
            <span className="text-gray-300 dark:text-gray-600">|</span>
            <button onClick={selectNone} className="text-indigo-600 dark:text-indigo-400 hover:underline">None</button>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {RECORD_TYPES.map((type) => (
            <button
              key={type}
              onClick={() => toggleType(type)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                selectedTypes.includes(type)
                  ? `${TYPE_COLORS[type]} border-current`
                  : 'bg-gray-50 dark:bg-gray-800 text-gray-400 dark:text-gray-500 border-gray-200 dark:border-gray-700'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-start gap-2 rounded-xl border border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-900/20 px-4 py-3 text-sm text-rose-700 dark:text-rose-300">
          <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Results */}
      {results && (
        <div className="space-y-4">
          {/* Summary bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 px-4 py-3">
            <div className="text-sm text-gray-700 dark:text-gray-200">
              <span className="font-semibold">{results.hostname}</span>
              <span className="text-gray-400 dark:text-gray-500 mx-2">·</span>
              <span>{totalRecords} record{totalRecords !== 1 ? 's' : ''} found</span>
              <span className="text-gray-400 dark:text-gray-500 mx-2">·</span>
              <span>{Object.keys(results.records).length} type{Object.keys(results.records).length !== 1 ? 's' : ''}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs">
              {results.dnssec ? (
                <span className="flex items-center gap-1 text-green-600 dark:text-green-400">
                  <Shield className="w-3.5 h-3.5" /> DNSSEC verified
                </span>
              ) : (
                <span className="flex items-center gap-1 text-gray-400 dark:text-gray-500">
                  <ShieldOff className="w-3.5 h-3.5" /> No DNSSEC
                </span>
              )}
            </div>
          </div>

          {/* Record groups */}
          {Object.entries(results.records).map(([type, records]) => (
            <div
              key={type}
              className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden"
            >
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80">
                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold ${TYPE_COLORS[type] || TYPE_COLORS.PTR}`}>
                  {type}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {records.length} record{records.length !== 1 ? 's' : ''}
                </span>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-xs text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-700">
                      <th className="px-4 py-2 font-medium">Name</th>
                      <th className="px-4 py-2 font-medium">TTL</th>
                      <th className="px-4 py-2 font-medium">Value</th>
                      <th className="px-4 py-2 w-8"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                    {records.map((r, i) => (
                      <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                        <td className="px-4 py-2.5 text-gray-700 dark:text-gray-200 font-mono text-xs whitespace-nowrap">
                          {r.name}
                        </td>
                        <td className="px-4 py-2.5 text-gray-500 dark:text-gray-400 whitespace-nowrap text-xs">
                          {formatTTL(r.ttl)}
                        </td>
                        <td className="px-4 py-2.5 text-gray-900 dark:text-gray-100 font-mono text-xs break-all max-w-md">
                          {r.data}
                        </td>
                        <td className="px-4 py-2.5">
                          <CopyBtn text={r.data} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}

          {/* Timestamp */}
          <p className="text-xs text-gray-400 dark:text-gray-500 text-right">
            Queried via Cloudflare DoH at {results.queriedAt.toLocaleTimeString()}
          </p>
        </div>
      )}
    </div>
  )
}
