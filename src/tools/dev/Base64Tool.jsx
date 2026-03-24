import { useEffect, useState } from 'react'
import { Copy, Check } from 'lucide-react'

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

export default function Base64Tool() {
  const [mode, setMode] = useState('encode')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!input) {
      setOutput('')
      setError('')
      return
    }

    try {
      if (mode === 'encode') {
        setOutput(btoa(unescape(encodeURIComponent(input))))
      } else {
        setOutput(decodeURIComponent(escape(atob(input))))
      }
      setError('')
    } catch {
      setOutput('')
      setError('Invalid Base64 string. Please check your input.')
    }
  }, [input, mode])

  const handleInput = (val) => {
    setInput(val)
    setError('')
  }

  return (
    <div className="space-y-4">
      {/* Mode toggle */}
      <div className="flex rounded-lg border border-gray-200 overflow-hidden w-fit">
        {['encode', 'decode'].map((m) => (
          <button
            key={m}
            onClick={() => { setMode(m); setInput(''); setError('') }}
            className={`px-5 py-2 text-sm font-medium transition-colors capitalize ${
              mode === m ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {mode === 'encode' ? 'Plain Text Input' : 'Base64 Input'}
          </label>
          <textarea
            value={input}
            onChange={(e) => handleInput(e.target.value)}
            placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter Base64 to decode...'}
            className="textarea-field min-h-[180px]"
            spellCheck={false}
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-sm font-medium text-gray-700">
              {mode === 'encode' ? 'Base64 Output' : 'Decoded Text'}
            </label>
            {output && <CopyButton text={output} />}
          </div>
          {error ? (
            <div className="min-h-[180px] bg-red-50 border border-red-200 rounded-lg px-3 py-3 text-sm text-red-700 font-mono">
              {error}
            </div>
          ) : (
            <textarea
              readOnly
              value={output}
              placeholder="Output will appear here..."
              className="textarea-field min-h-[180px] bg-gray-50 text-indigo-800"
              spellCheck={false}
            />
          )}
        </div>
      </div>

      <button
        onClick={() => { setInput(''); setError('') }}
        className="btn-secondary"
      >
        Clear
      </button>
    </div>
  )
}
