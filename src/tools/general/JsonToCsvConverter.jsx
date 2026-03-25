import { useMemo, useState } from 'react'
import CopyButton from '../../components/CopyButton.jsx'
import { ToolLayout, Panel, SegmentedToggle, FieldLabel } from '../../components/ToolLayout.jsx'

function toCsv(rows, delimiter, includeHeader, quoteMode) {
  if (!rows.length) return ''
  const columns = Array.from(rows.reduce((set, row) => {
    Object.keys(row).forEach((key) => set.add(key))
    return set
  }, new Set()))

  const formatValue = (value) => {
    const stringValue = value == null ? '' : String(value)
    const shouldQuote = quoteMode === 'all' || (quoteMode === 'strings' && Number.isNaN(Number(stringValue))) || stringValue.includes(delimiter) || stringValue.includes('"')
    return shouldQuote ? `"${stringValue.replaceAll('"', '""')}"` : stringValue
  }

  const lines = includeHeader ? [columns.join(delimiter)] : []
  rows.forEach((row) => lines.push(columns.map((column) => formatValue(row[column])).join(delimiter)))
  return lines.join('\n')
}

function parseCsv(input, delimiter, firstRowHeaders) {
  const lines = input.split(/\r?\n/).filter(Boolean)
  if (!lines.length) return []
  const headers = firstRowHeaders ? lines[0].split(delimiter).map((cell) => cell.trim()) : lines[0].split(delimiter).map((_, index) => `column_${index + 1}`)
  const contentLines = firstRowHeaders ? lines.slice(1) : lines
  return contentLines.map((line) => {
    const cells = line.split(delimiter)
    return headers.reduce((row, header, index) => ({ ...row, [header]: cells[index] ?? '' }), {})
  })
}

export default function JsonToCsvConverter() {
  const [mode, setMode] = useState('jsonToCsv')
  const [input, setInput] = useState('[{"name":"Ada","score":98},{"name":"Grace","score":95}]')
  const [delimiter, setDelimiter] = useState(',')
  const [includeHeader, setIncludeHeader] = useState(true)
  const [quoteMode, setQuoteMode] = useState('strings')
  const [firstRowHeaders, setFirstRowHeaders] = useState(true)
  const [prettyPrint, setPrettyPrint] = useState(true)

  const { output, rows, error } = useMemo(() => {
    try {
      if (mode === 'jsonToCsv') {
        const parsed = JSON.parse(input)
        if (!Array.isArray(parsed)) throw new Error('JSON must be an array of objects.')
        return { output: toCsv(parsed, delimiter, includeHeader, quoteMode), rows: parsed, error: '' }
      }
      const parsedRows = parseCsv(input, delimiter, firstRowHeaders)
      return { output: JSON.stringify(parsedRows, null, prettyPrint ? 2 : 0), rows: parsedRows, error: '' }
    } catch (caughtError) {
      return { output: '', rows: [], error: caughtError.message }
    }
  }, [mode, input, delimiter, includeHeader, quoteMode, firstRowHeaders, prettyPrint])

  return (
    <ToolLayout
      title="JSON to CSV Converter"
      description="Convert JSON arrays to CSV and CSV back to JSON, with formatting options, validation, preview, and download."
      path="/tools/json-to-csv-converter"
    >
      <Panel>
        <SegmentedToggle options={[{ label: 'JSON → CSV', value: 'jsonToCsv' }, { label: 'CSV → JSON', value: 'csvToJson' }]} value={mode} onChange={setMode} />
      </Panel>

      <div className="grid gap-6 lg:grid-cols-[0.95fr,1.05fr]">
        <Panel>
          <div className="space-y-4">
            <div><FieldLabel>Input</FieldLabel><textarea className="textarea-field min-h-[260px]" value={input} onChange={(event) => setInput(event.target.value)} /></div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <FieldLabel>Delimiter</FieldLabel>
                <select className="input-field" value={delimiter} onChange={(event) => setDelimiter(event.target.value)}>
                  <option value=",">Comma</option>
                  <option value=";">Semicolon</option>
                  <option value="\t">Tab</option>
                </select>
              </div>
              {mode === 'jsonToCsv' ? (
                <div className="flex items-end gap-2"><button type="button" className={`btn-secondary ${includeHeader ? '!bg-indigo-600 !text-white' : ''}`} onClick={() => setIncludeHeader((current) => !current)}>Include header row</button><button type="button" className="btn-secondary" onClick={() => setQuoteMode((current) => current === 'all' ? 'strings' : 'all')}>Quote {quoteMode === 'all' ? 'all values' : 'strings only'}</button></div>
              ) : (
                <div className="flex items-end gap-2"><button type="button" className={`btn-secondary ${firstRowHeaders ? '!bg-indigo-600 !text-white' : ''}`} onClick={() => setFirstRowHeaders((current) => !current)}>First row as headers</button><button type="button" className={`btn-secondary ${prettyPrint ? '!bg-indigo-600 !text-white' : ''}`} onClick={() => setPrettyPrint((current) => !current)}>Pretty print</button></div>
              )}
            </div>
          </div>
        </Panel>
        <Panel>
          {error ? <p className="text-sm text-rose-600 dark:text-rose-400">{error}</p> : (
            <>
              <div className="flex items-center justify-between gap-3">
                <p className="font-semibold text-gray-900 dark:text-gray-100">Output</p>
                <div className="flex gap-2">
                  <CopyButton text={output} label="Copy output" />
                  {mode === 'jsonToCsv' && <button type="button" className="btn-secondary" onClick={() => {
                    const blob = new Blob([output], { type: 'text/csv;charset=utf-8' })
                    const url = URL.createObjectURL(blob)
                    const anchor = document.createElement('a')
                    anchor.href = url
                    anchor.download = 'converted.csv'
                    anchor.click()
                    URL.revokeObjectURL(url)
                  }}>Download CSV</button>}
                </div>
              </div>
              <textarea className="textarea-field min-h-[220px] mt-4" readOnly value={output} />
              <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">Rows: {rows.length} · Columns: {rows.length ? Object.keys(rows[0]).length : 0}</p>
            </>
          )}
        </Panel>
      </div>
    </ToolLayout>
  )
}