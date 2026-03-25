import { useMemo, useState } from 'react'

const PRESETS = [
  { label: 'Email', pattern: '^[\\w.-]+@[\\w.-]+\\.[A-Za-z]{2,}$' },
  { label: 'URL', pattern: 'https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%_+.~#?&//=]*)' },
  { label: 'Phone', pattern: '^\\+?[0-9()\\-\\s]{7,20}$' },
  { label: 'Date (YYYY-MM-DD)', pattern: '^\\d{4}-\\d{2}-\\d{2}$' },
  { label: 'IP Address', pattern: '^(25[0-5]|2[0-4]\\d|1?\\d{1,2})(\\.(25[0-5]|2[0-4]\\d|1?\\d{1,2})){3}$' },
  { label: 'Hex Color', pattern: '^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$' },
]

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

export default function RegexTester() {
  const [pattern, setPattern] = useState('')
  const [flags, setFlags] = useState({ g: true, i: false, m: false, s: false })
  const [text, setText] = useState('')

  const flagString = `${flags.g ? 'g' : ''}${flags.i ? 'i' : ''}${flags.m ? 'm' : ''}${flags.s ? 's' : ''}`

  const result = useMemo(() => {
    if (!pattern) {
      return { error: '', matches: [], highlighted: escapeHtml(text) }
    }

    try {
      const regex = new RegExp(pattern, flagString || undefined)
      const source = text || ''
      const matches = []
      let highlighted = ''
      let lastIndex = 0

      if (!flags.g) {
        const one = source.match(regex)
        if (one && one.index != null) {
          matches.push({ value: one[0], index: one.index })
          highlighted += escapeHtml(source.slice(0, one.index))
          highlighted += `<mark class="bg-yellow-200 px-0.5 rounded">${escapeHtml(one[0])}</mark>`
          highlighted += escapeHtml(source.slice(one.index + one[0].length))
        } else {
          highlighted = escapeHtml(source)
        }
        return { error: '', matches, highlighted }
      }

      let hit
      while ((hit = regex.exec(source)) !== null) {
        matches.push({ value: hit[0], index: hit.index })
        const start = hit.index
        const end = start + hit[0].length
        highlighted += escapeHtml(source.slice(lastIndex, start))
        highlighted += `<mark class="bg-yellow-200 px-0.5 rounded">${escapeHtml(source.slice(start, end))}</mark>`
        lastIndex = end
        if (hit[0] === '') {
          regex.lastIndex += 1
        }
      }
      highlighted += escapeHtml(source.slice(lastIndex))

      return { error: '', matches, highlighted }
    } catch (err) {
      return { error: err.message || 'Invalid regular expression', matches: [], highlighted: escapeHtml(text) }
    }
  }, [pattern, flagString, text, flags.g])

  return (
    <div className="space-y-5">
      <div>
        <label className="text-sm font-medium text-gray-700">Pattern</label>
        <input
          value={pattern}
          onChange={(e) => setPattern(e.target.value)}
          placeholder="e.g. \\b\\w{4,}\\b"
          className={`input-field mt-1 ${result.error ? 'border-red-500 ring-red-200' : ''}`}
        />
        {result.error ? <p className="text-sm text-red-600 mt-1">{result.error}</p> : null}
      </div>

      <div>
        <span className="text-sm font-medium text-gray-700">Flags</span>
        <div className="mt-2 flex flex-wrap gap-2">
          {['g', 'i', 'm', 's'].map((flag) => (
            <label key={flag} className="inline-flex items-center gap-2 text-sm text-gray-600 bg-gray-100 rounded-lg px-3 py-1.5">
              <input
                type="checkbox"
                checked={flags[flag]}
                onChange={(e) => setFlags((prev) => ({ ...prev, [flag]: e.target.checked }))}
              />
              {flag}
            </label>
          ))}
        </div>
      </div>

      <div>
        <span className="text-sm font-medium text-gray-700">Common Patterns</span>
        <div className="mt-2 flex flex-wrap gap-2">
          {PRESETS.map((preset) => (
            <button
              key={preset.label}
              onClick={() => setPattern(preset.pattern)}
              className="btn-secondary"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">Test String</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="textarea-field min-h-[140px] mt-1"
          placeholder="Paste or type text to test matches"
        />
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-gray-900">Highlighted Matches</h3>
          <span className="text-sm text-gray-500">{result.matches.length} matches</span>
        </div>
        <pre
          className="whitespace-pre-wrap break-words font-mono text-sm bg-gray-50 rounded-lg p-3 min-h-[120px]"
          dangerouslySetInnerHTML={{ __html: result.highlighted }}
        />
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-4">
        <h3 className="font-semibold text-gray-900 mb-2">Match List</h3>
        {result.matches.length === 0 ? (
          <p className="text-sm text-gray-500">No matches yet.</p>
        ) : (
          <ul className="space-y-1 text-sm font-mono">
            {result.matches.map((match, idx) => (
              <li key={`${match.index}-${idx}`} className="bg-gray-50 rounded px-2 py-1">
                #{idx + 1} [{match.index}] {match.value}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
