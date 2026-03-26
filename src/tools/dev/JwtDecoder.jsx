import { useMemo, useState } from 'react'

function decodeBase64Url(value) {
  const normalized = value.replace(/-/g, '+').replace(/_/g, '/')
  const pad = normalized.length % 4
  const padded = pad ? normalized + '='.repeat(4 - pad) : normalized
  const decoded = atob(padded)
  return decodeURIComponent(
    Array.from(decoded)
      .map((char) => `%${char.charCodeAt(0).toString(16).padStart(2, '0')}`)
      .join(''),
  )
}

function formatDate(tsSeconds) {
  if (!tsSeconds) return 'No value'
  const date = new Date(tsSeconds * 1000)
  return date.toLocaleString(undefined, { dateStyle: 'long', timeStyle: 'short' })
}

function JsonPanel({ title, value }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <h3 className="text-sm font-semibold text-gray-900 mb-2">{title}</h3>
      <pre className="text-xs font-mono bg-gray-50 p-3 rounded-lg overflow-auto min-h-[140px]">
        {value}
      </pre>
    </div>
  )
}

export default function JwtDecoder() {
  const [token, setToken] = useState('')

  const decoded = useMemo(() => {
    if (!token.trim()) {
      return { header: '{}', payload: '{}', signature: '', error: '' }
    }
    try {
      const parts = token.trim().split('.')
      if (parts.length < 2) {
        return { header: '{}', payload: '{}', signature: '', error: 'JWT must contain header.payload.signature' }
      }

      const headerObj = JSON.parse(decodeBase64Url(parts[0]))
      const payloadObj = JSON.parse(decodeBase64Url(parts[1]))
      return {
        headerObj,
        payloadObj,
        header: JSON.stringify(headerObj, null, 2),
        payload: JSON.stringify(payloadObj, null, 2),
        signature: parts[2] || '',
        error: '',
      }
    } catch (err) {
      return { header: '{}', payload: '{}', signature: '', error: err.message || 'Unable to decode token' }
    }
  }, [token])

  const exp = decoded.payloadObj?.exp
  const iat = decoded.payloadObj?.iat
  const nowSec = Math.floor(Date.now() / 1000)
  const status = !exp ? 'No expiry' : exp < nowSec ? 'Expired' : 'Valid'

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
        Never paste production JWTs into online tools. This tool runs locally in your browser.
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">JWT Token</label>
        <textarea
          value={token}
          onChange={(e) => setToken(e.target.value)}
          className="textarea-field min-h-[130px] mt-1"
          placeholder="eyJhbGciOi..."
        />
        {decoded.error ? <p className="text-sm text-red-600 mt-1">{decoded.error}</p> : null}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <JsonPanel title="Header" value={decoded.header} />
        <JsonPanel title="Payload" value={decoded.payload} />
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-2">Signature</h3>
          <pre className="text-xs font-mono bg-gray-50 p-3 rounded-lg break-all whitespace-pre-wrap min-h-[140px]">{decoded.signature || 'N/A'}</pre>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <p><span className="font-semibold">Expires:</span> {exp ? formatDate(exp) : 'No expiry claim'}</p>
        <p><span className="font-semibold">Status:</span> {status}</p>
        <p><span className="font-semibold">Issued at:</span> {iat ? formatDate(iat) : 'No iat claim'}</p>
      </div>
    </div>
  )
}
