import { useState } from 'react'
import { Copy, Check, Braces } from 'lucide-react'

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }
  return (
    <button onClick={handleCopy} className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-indigo-600 transition-colors">
      {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
      {copied ? 'Copied!' : 'Copy'}
    </button>
  )
}

export default function JsonFormatter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  const format = () => {
    try {
      const parsed = JSON.parse(input)
      setOutput(JSON.stringify(parsed, null, 2))
      setError('')
    } catch (e) {
      setError(e.message)
      setOutput('')
    }
  }

  const minify = () => {
    try {
      const parsed = JSON.parse(input)
      setOutput(JSON.stringify(parsed))
      setError('')
    } catch (e) {
      setError(e.message)
      setOutput('')
    }
  }

  const clear = () => {
    setInput('')
    setOutput('')
    setError('')
  }

  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-sm font-medium text-gray-700">Input JSON</label>
          <span className="text-xs text-gray-400">{input.length} chars</span>
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Paste your JSON here, e.g. {"name":"Alice","age":30}'
          className="textarea-field min-h-[200px]"
          spellCheck={false}
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <button onClick={format} className="btn-primary flex items-center gap-1.5">
          <Braces className="w-4 h-4" />
          Format & Validate
        </button>
        <button onClick={minify} className="btn-secondary">Minify</button>
        <button onClick={clear} className="btn-secondary">Clear</button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700 font-mono">
          <strong>Invalid JSON:</strong> {error}
        </div>
      )}

      {output && (
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-sm font-medium text-gray-700">Output</label>
            <CopyButton text={output} />
          </div>
          <textarea
            readOnly
            value={output}
            className="textarea-field min-h-[200px] bg-gray-50 text-green-700"
            spellCheck={false}
          />
        </div>
      )}
    </div>
  )
}
