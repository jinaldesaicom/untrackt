import { useState, useEffect, useCallback } from 'react'
import { RefreshCw, Copy, Check } from 'lucide-react'

const CHARSET = {
  upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lower: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
}

function generatePassword(length, opts) {
  let chars = ''
  if (opts.upper) chars += CHARSET.upper
  if (opts.lower) chars += CHARSET.lower
  if (opts.numbers) chars += CHARSET.numbers
  if (opts.symbols) chars += CHARSET.symbols
  if (!chars) return ''

  const arr = new Uint32Array(length)
  crypto.getRandomValues(arr)
  return Array.from(arr).map((n) => chars[n % chars.length]).join('')
}

function getEntropy(length, opts) {
  let poolSize = 0
  if (opts.upper) poolSize += 26
  if (opts.lower) poolSize += 26
  if (opts.numbers) poolSize += 10
  if (opts.symbols) poolSize += 30
  return length * Math.log2(poolSize || 1)
}

function strengthLabel(entropy) {
  if (entropy < 40) return { label: 'Weak', color: 'bg-red-500', width: '25%' }
  if (entropy < 60) return { label: 'Fair', color: 'bg-amber-400', width: '50%' }
  if (entropy < 80) return { label: 'Strong', color: 'bg-blue-500', width: '75%' }
  return { label: 'Very Strong', color: 'bg-green-500', width: '100%' }
}

export default function PasswordGenerator() {
  const [length, setLength] = useState(16)
  const [opts, setOpts] = useState({ upper: true, lower: true, numbers: true, symbols: false })
  const [password, setPassword] = useState('')
  const [copied, setCopied] = useState(false)

  const regen = useCallback(() => {
    setPassword(generatePassword(length, opts))
  }, [length, opts])

  useEffect(() => { regen() }, [regen])

  const toggle = (key) => setOpts((o) => ({ ...o, [key]: !o[key] }))

  const copy = () => {
    navigator.clipboard.writeText(password).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const entropy = getEntropy(length, opts)
  const strength = strengthLabel(entropy)

  return (
    <div className="space-y-5">
      {/* Password display */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
        <div className="flex items-center gap-3">
          <code className="flex-1 font-mono text-xl text-gray-900 break-all select-all min-h-[2rem]">
            {password || <span className="text-gray-400 text-sm">Select at least one character type</span>}
          </code>
          <div className="flex items-center gap-1 shrink-0">
            <button onClick={copy} className="p-2 rounded-lg hover:bg-gray-200 transition-colors text-gray-500" title="Copy">
              {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
            </button>
            <button onClick={regen} className="p-2 rounded-lg hover:bg-gray-200 transition-colors text-gray-500" title="Regenerate">
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Strength meter */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs text-gray-500">Strength</span>
          <span className={`text-xs font-semibold ${strength.color.replace('bg-', 'text-')}`}>{strength.label}</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-300 ${strength.color}`}
            style={{ width: strength.width }}
          />
        </div>
        <p className="text-xs text-gray-400 mt-1">{Math.round(entropy)} bits of entropy</p>
      </div>

      {/* Length slider */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-sm font-medium text-gray-700">Length</label>
          <span className="text-sm font-semibold text-indigo-600 w-8 text-right">{length}</span>
        </div>
        <input
          type="range"
          min="8" max="64"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className="w-full accent-indigo-600"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-0.5">
          <span>8</span><span>64</span>
        </div>
      </div>

      {/* Checkboxes */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {Object.entries({ upper: 'Uppercase (A–Z)', lower: 'Lowercase (a–z)', numbers: 'Numbers (0–9)', symbols: 'Symbols (!@#…)' }).map(([key, label]) => (
          <label key={key} className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={opts[key]}
              onChange={() => toggle(key)}
              className="w-4 h-4 rounded accent-indigo-600"
            />
            <span className="text-sm text-gray-700">{label}</span>
          </label>
        ))}
      </div>
    </div>
  )
}
