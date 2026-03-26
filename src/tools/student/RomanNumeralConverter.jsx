import { useMemo, useState } from 'react'

const MAP = [
  [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
  [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
  [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
]

function toRomanBasic(num) {
  let n = num
  let out = ''
  for (const [value, symbol] of MAP) {
    while (n >= value) {
      out += symbol
      n -= value
    }
  }
  return out
}

function addVinculum(text) {
  return text.split('').map((ch) => `${ch}\u0305`).join('')
}

function toRoman(num) {
  if (num < 1 || num > 3999999) return ''
  if (num <= 3999) return toRomanBasic(num)
  const high = Math.floor(num / 1000)
  const low = num % 1000
  return `${addVinculum(toRomanBasic(high))}${toRomanBasic(low)}`
}

function fromRomanBasic(str) {
  const values = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 }
  let total = 0
  for (let i = 0; i < str.length; i += 1) {
    const cur = values[str[i]] || 0
    const next = values[str[i + 1]] || 0
    if (cur < next) total -= cur
    else total += cur
  }
  return total
}

function fromRoman(input) {
  const normalized = input.toUpperCase().trim()
  if (!normalized) return null
  const plain = normalized.replace(/[\u0305]/g, '')
  if (!/^[IVXLCDM]+$/.test(plain)) return null
  return fromRomanBasic(plain)
}

export default function RomanNumeralConverter() {
  const [arabic, setArabic] = useState('2024')
  const [romanInput, setRomanInput] = useState('MMXXIV')

  const arabicToRoman = useMemo(() => toRoman(Number(arabic)), [arabic])
  const romanToArabic = useMemo(() => fromRoman(romanInput), [romanInput])
  const currentYearRoman = toRoman(new Date().getFullYear())

  const breakdown = useMemo(() => {
    const n = Number(arabic)
    if (!Number.isFinite(n) || n < 1 || n > 3999999) return ''
    let rest = n
    const chunks = []
    for (const [value, symbol] of MAP) {
      while (rest >= value) {
        chunks.push(`${symbol} (${value})`)
        rest -= value
      }
    }
    return `${n} = ${chunks.join(' + ')}`
  }, [arabic])

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium text-gray-700">Arabic to Roman</label>
        <input value={arabic} onChange={(e) => setArabic(e.target.value)} className="input-field mt-1" />
        <p className="font-mono text-lg mt-2">{arabicToRoman || 'Enter 1 to 3,999,999'}</p>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">Roman to Arabic</label>
        <input value={romanInput} onChange={(e) => setRomanInput(e.target.value)} className="input-field mt-1" />
        <p className="font-mono text-lg mt-2">{romanToArabic ?? 'Invalid Roman numeral'}</p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-4 text-sm text-gray-700 space-y-1">
        <p>{breakdown}</p>
        <p>Current year in Roman numerals: {currentYearRoman}</p>
        <p>Reference: I(1), V(5), X(10), L(50), C(100), D(500), M(1000), overline multiplies by 1000.</p>
      </div>
    </div>
  )
}
