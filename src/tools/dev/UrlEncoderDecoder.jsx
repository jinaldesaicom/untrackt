import { useEffect, useMemo, useState } from 'react'

export default function UrlEncoderDecoder() {
  const [mode, setMode] = useState('encode')
  const [input, setInput] = useState('')
  const [componentMode, setComponentMode] = useState(true)
  const [queryRows, setQueryRows] = useState([])

  const output = useMemo(() => {
    try {
      if (mode === 'encode') return componentMode ? encodeURIComponent(input) : encodeURI(input)
      if (mode === 'decode') return decodeURIComponent(input)
      return ''
    } catch {
      return 'Invalid input for selected mode.'
    }
  }, [mode, input, componentMode])

  const parsed = useMemo(() => {
    if (mode !== 'parse') return null
    try {
      return new URL(input)
    } catch {
      return null
    }
  }, [mode, input])

  useEffect(() => {
    if (!parsed) {
      return
    }
    setQueryRows(Array.from(parsed.searchParams.entries()))
  }, [parsed])

  const rebuilt = useMemo(() => {
    if (!parsed) return ''
    const u = new URL(parsed.toString())
    u.search = ''
    queryRows.forEach(([k, v]) => {
      if (k) u.searchParams.append(k, v)
    })
    return u.toString()
  }, [parsed, queryRows])

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {['encode', 'decode', 'parse'].map((m) => (
          <button key={m} onClick={() => setMode(m)} className={mode === m ? 'btn-primary' : 'btn-secondary'}>{m === 'parse' ? 'Parse URL' : m[0].toUpperCase() + m.slice(1)}</button>
        ))}
      </div>

      {mode !== 'parse' ? (
        <label className="inline-flex items-center gap-2 text-sm text-gray-600">
          <input type="checkbox" checked={componentMode} onChange={(e) => setComponentMode(e.target.checked)} />
          {componentMode ? 'encodeURIComponent' : 'encodeURI'} behavior
        </label>
      ) : null}

      <textarea value={input} onChange={(e) => setInput(e.target.value)} className="textarea-field min-h-[140px]" placeholder="Enter text or URL" />

      {mode !== 'parse' ? (
        <>
          <textarea readOnly value={output} className="textarea-field min-h-[140px] bg-gray-50" />
          <button className="btn-secondary" onClick={() => navigator.clipboard.writeText(output)}>Copy output</button>
        </>
      ) : (
        parsed ? (
          <div className="rounded-xl border border-gray-200 bg-white p-4 space-y-2">
            <p><strong>Protocol:</strong> {parsed.protocol}</p>
            <p><strong>Host:</strong> {parsed.hostname}</p>
            <p><strong>Port:</strong> {parsed.port || 'default'}</p>
            <p><strong>Pathname:</strong> {parsed.pathname}</p>
            <p><strong>Hash:</strong> {parsed.hash || '(none)'}</p>
            <div>
              <h3 className="font-semibold">Query Params</h3>
              <div className="space-y-2 mt-2">
                {queryRows.map((row, idx) => (
                  <div key={idx} className="grid grid-cols-2 gap-2">
                    <input className="input-field" value={row[0]} onChange={(e) => setQueryRows((prev) => prev.map((r, i) => i === idx ? [e.target.value, r[1]] : r))} />
                    <input className="input-field" value={row[1]} onChange={(e) => setQueryRows((prev) => prev.map((r, i) => i === idx ? [r[0], e.target.value] : r))} />
                  </div>
                ))}
                <button className="btn-secondary" onClick={() => setQueryRows((prev) => [...prev, ['', '']])}>Add query param</button>
              </div>
            </div>
            <textarea readOnly value={rebuilt} className="textarea-field min-h-[100px] bg-gray-50" />
            <button className="btn-secondary" onClick={() => navigator.clipboard.writeText(rebuilt)}>Copy rebuilt URL</button>
          </div>
        ) : <p className="text-sm text-red-600">Enter a valid URL to parse.</p>
      )}
    </div>
  )
}
