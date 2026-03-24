import { useMemo, useState } from 'react'

function detectBase(value) {
  if (value.startsWith('0x')) return 16
  if (value.startsWith('0b')) return 2
  if (value.startsWith('0o')) return 8
  return 10
}

function formatBinary(value, bitLength) {
  const padded = value.padStart(bitLength, '0')
  return padded.replace(/(.{4})/g, '$1 ').trim()
}

export default function NumberBaseConverter() {
  const [input, setInput] = useState('42')
  const [fromBase, setFromBase] = useState(10)
  const [toBase, setToBase] = useState(16)
  const [bitLength, setBitLength] = useState(8)

  const autoBase = useMemo(() => detectBase(input.trim().toLowerCase()), [input])

  const parsed = useMemo(() => {
    try {
      const trimmed = input.trim().toLowerCase()
      if (!trimmed) return null
      const normalized = trimmed.startsWith('0x') || trimmed.startsWith('0b') || trimmed.startsWith('0o') ? trimmed.slice(2) : trimmed
      const dec = parseInt(normalized, autoBase)
      if (Number.isNaN(dec)) return null
      return dec
    } catch {
      return null
    }
  }, [input, autoBase])

  const manual = useMemo(() => {
    try {
      const dec = parseInt(input.trim(), Number(fromBase))
      if (Number.isNaN(dec)) return ''
      return dec.toString(Number(toBase)).toUpperCase()
    } catch {
      return ''
    }
  }, [input, fromBase, toBase])

  return (
    <div className="space-y-4">
      <input value={input} onChange={(e) => setInput(e.target.value)} className="input-field" placeholder="0x2A, 0b101010, 0o52, 42" />
      <p className="text-sm text-gray-500">Detected base: {autoBase}</p>

      {parsed != null ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="rounded-lg border border-gray-200 p-3 bg-white flex justify-between"><span>Decimal</span><span className="font-mono">{parsed}</span></div>
          <div className="rounded-lg border border-gray-200 p-3 bg-white flex justify-between"><span>Binary</span><span className="font-mono">{formatBinary(parsed.toString(2), bitLength)}</span></div>
          <div className="rounded-lg border border-gray-200 p-3 bg-white flex justify-between"><span>Hexadecimal</span><span className="font-mono">{parsed.toString(16).toUpperCase()}</span></div>
          <div className="rounded-lg border border-gray-200 p-3 bg-white flex justify-between"><span>Octal</span><span className="font-mono">{parsed.toString(8)}</span></div>
        </div>
      ) : <p className="text-sm text-red-600">Invalid number input</p>}

      <div className="rounded-xl border border-gray-200 bg-white p-4 space-y-2">
        <h3 className="font-semibold">Manual Base Converter</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <input type="number" min="2" max="36" value={fromBase} onChange={(e) => setFromBase(Number(e.target.value))} className="input-field" />
          <input type="number" min="2" max="36" value={toBase} onChange={(e) => setToBase(Number(e.target.value))} className="input-field" />
          <input type="number" min="8" max="64" step="8" value={bitLength} onChange={(e) => setBitLength(Number(e.target.value))} className="input-field" />
        </div>
        <p className="font-mono text-sm">Converted: {manual || 'N/A'}</p>
      </div>
    </div>
  )
}
