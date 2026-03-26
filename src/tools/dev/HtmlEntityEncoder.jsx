import { useMemo, useState } from 'react'

const ENTITY_MAP = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
}

const COMMON = [
  ['&amp;', '&'], ['&lt;', '<'], ['&gt;', '>'], ['&quot;', '"'], ['&#39;', "'"],
  ['&nbsp;', ' '], ['&copy;', '©'], ['&reg;', '®'], ['&trade;', '™'], ['&hellip;', '…'],
  ['&mdash;', '—'], ['&ndash;', '–'], ['&euro;', '€'], ['&pound;', '£'], ['&yen;', '¥'],
  ['&sect;', '§'], ['&para;', '¶'], ['&bull;', '•'], ['&middot;', '·'], ['&raquo;', '»'],
]

function encodeHtml(value, numeric) {
  return Array.from(value)
    .map((ch) => {
      if (ENTITY_MAP[ch]) {
        return numeric ? `&#${ch.charCodeAt(0)};` : ENTITY_MAP[ch]
      }
      if (ch.charCodeAt(0) > 127) {
        return numeric ? `&#${ch.charCodeAt(0)};` : `&#${ch.charCodeAt(0)};`
      }
      return ch
    })
    .join('')
}

function decodeHtml(value) {
  const textarea = document.createElement('textarea')
  textarea.innerHTML = value
  return textarea.value
}

export default function HtmlEntityEncoder() {
  const [mode, setMode] = useState('encode')
  const [input, setInput] = useState('')
  const [numeric, setNumeric] = useState(false)

  const output = useMemo(() => (mode === 'encode' ? encodeHtml(input, numeric) : decodeHtml(input)), [mode, input, numeric])

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button onClick={() => setMode('encode')} className={mode === 'encode' ? 'btn-primary' : 'btn-secondary'}>Encode</button>
        <button onClick={() => setMode('decode')} className={mode === 'decode' ? 'btn-primary' : 'btn-secondary'}>Decode</button>
      </div>

      <label className="inline-flex items-center gap-2 text-sm text-gray-600">
        <input type="checkbox" checked={numeric} onChange={(e) => setNumeric(e.target.checked)} disabled={mode === 'decode'} />
        Use numeric entities
      </label>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <textarea value={input} onChange={(e) => setInput(e.target.value)} className="textarea-field min-h-[180px]" placeholder="Input" />
        <div>
          <textarea readOnly value={output} className="textarea-field min-h-[180px] bg-gray-50" />
          <button className="btn-secondary mt-2" onClick={() => navigator.clipboard.writeText(output)}>Copy output</button>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-4 overflow-x-auto">
        <h3 className="font-semibold text-gray-900 mb-2">Common Entities</h3>
        <table className="w-full text-sm">
          <thead>
            <tr><th className="text-left py-1">Entity</th><th className="text-left py-1">Character</th><th></th></tr>
          </thead>
          <tbody>
            {COMMON.map(([entity, char]) => (
              <tr key={entity} className="border-t border-gray-100">
                <td className="py-1 font-mono">{entity}</td>
                <td className="py-1">{char}</td>
                <td className="py-1 text-right"><button className="text-xs text-indigo-600" onClick={() => navigator.clipboard.writeText(entity)}>Copy</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
