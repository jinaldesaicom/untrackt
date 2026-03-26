import { useMemo, useState } from 'react'
import { Copy, Check } from 'lucide-react'

const ALGORITHMS = ['MD5', 'SHA-1', 'SHA-256', 'SHA-512']

function toHex(buffer) {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

function md5(input) {
  function rotateLeft(value, bits) {
    return (value << bits) | (value >>> (32 - bits))
  }
  function addUnsigned(a, b) {
    return (a + b) >>> 0
  }
  function cmn(q, a, b, x, s, t) {
    return addUnsigned(rotateLeft(addUnsigned(addUnsigned(a, q), addUnsigned(x, t)), s), b)
  }
  function ff(a, b, c, d, x, s, t) { return cmn((b & c) | (~b & d), a, b, x, s, t) }
  function gg(a, b, c, d, x, s, t) { return cmn((b & d) | (c & ~d), a, b, x, s, t) }
  function hh(a, b, c, d, x, s, t) { return cmn(b ^ c ^ d, a, b, x, s, t) }
  function ii(a, b, c, d, x, s, t) { return cmn(c ^ (b | ~d), a, b, x, s, t) }

  const utf8 = new TextEncoder().encode(input)
  const words = []
  for (let i = 0; i < utf8.length; i += 1) {
    words[i >> 2] = (words[i >> 2] || 0) | (utf8[i] << ((i % 4) * 8))
  }
  words[utf8.length >> 2] = (words[utf8.length >> 2] || 0) | (0x80 << ((utf8.length % 4) * 8))
  words[(((utf8.length + 8) >> 6) + 1) * 16 - 2] = utf8.length * 8

  let a = 0x67452301
  let b = 0xefcdab89
  let c = 0x98badcfe
  let d = 0x10325476

  for (let i = 0; i < words.length; i += 16) {
    const aa = a
    const bb = b
    const cc = c
    const dd = d

    a = ff(a, b, c, d, words[i + 0] || 0, 7, 0xd76aa478)
    d = ff(d, a, b, c, words[i + 1] || 0, 12, 0xe8c7b756)
    c = ff(c, d, a, b, words[i + 2] || 0, 17, 0x242070db)
    b = ff(b, c, d, a, words[i + 3] || 0, 22, 0xc1bdceee)
    a = ff(a, b, c, d, words[i + 4] || 0, 7, 0xf57c0faf)
    d = ff(d, a, b, c, words[i + 5] || 0, 12, 0x4787c62a)
    c = ff(c, d, a, b, words[i + 6] || 0, 17, 0xa8304613)
    b = ff(b, c, d, a, words[i + 7] || 0, 22, 0xfd469501)
    a = ff(a, b, c, d, words[i + 8] || 0, 7, 0x698098d8)
    d = ff(d, a, b, c, words[i + 9] || 0, 12, 0x8b44f7af)
    c = ff(c, d, a, b, words[i + 10] || 0, 17, 0xffff5bb1)
    b = ff(b, c, d, a, words[i + 11] || 0, 22, 0x895cd7be)
    a = ff(a, b, c, d, words[i + 12] || 0, 7, 0x6b901122)
    d = ff(d, a, b, c, words[i + 13] || 0, 12, 0xfd987193)
    c = ff(c, d, a, b, words[i + 14] || 0, 17, 0xa679438e)
    b = ff(b, c, d, a, words[i + 15] || 0, 22, 0x49b40821)

    a = gg(a, b, c, d, words[i + 1] || 0, 5, 0xf61e2562)
    d = gg(d, a, b, c, words[i + 6] || 0, 9, 0xc040b340)
    c = gg(c, d, a, b, words[i + 11] || 0, 14, 0x265e5a51)
    b = gg(b, c, d, a, words[i + 0] || 0, 20, 0xe9b6c7aa)
    a = gg(a, b, c, d, words[i + 5] || 0, 5, 0xd62f105d)
    d = gg(d, a, b, c, words[i + 10] || 0, 9, 0x02441453)
    c = gg(c, d, a, b, words[i + 15] || 0, 14, 0xd8a1e681)
    b = gg(b, c, d, a, words[i + 4] || 0, 20, 0xe7d3fbc8)
    a = gg(a, b, c, d, words[i + 9] || 0, 5, 0x21e1cde6)
    d = gg(d, a, b, c, words[i + 14] || 0, 9, 0xc33707d6)
    c = gg(c, d, a, b, words[i + 3] || 0, 14, 0xf4d50d87)
    b = gg(b, c, d, a, words[i + 8] || 0, 20, 0x455a14ed)
    a = gg(a, b, c, d, words[i + 13] || 0, 5, 0xa9e3e905)
    d = gg(d, a, b, c, words[i + 2] || 0, 9, 0xfcefa3f8)
    c = gg(c, d, a, b, words[i + 7] || 0, 14, 0x676f02d9)
    b = gg(b, c, d, a, words[i + 12] || 0, 20, 0x8d2a4c8a)

    a = hh(a, b, c, d, words[i + 5] || 0, 4, 0xfffa3942)
    d = hh(d, a, b, c, words[i + 8] || 0, 11, 0x8771f681)
    c = hh(c, d, a, b, words[i + 11] || 0, 16, 0x6d9d6122)
    b = hh(b, c, d, a, words[i + 14] || 0, 23, 0xfde5380c)
    a = hh(a, b, c, d, words[i + 1] || 0, 4, 0xa4beea44)
    d = hh(d, a, b, c, words[i + 4] || 0, 11, 0x4bdecfa9)
    c = hh(c, d, a, b, words[i + 7] || 0, 16, 0xf6bb4b60)
    b = hh(b, c, d, a, words[i + 10] || 0, 23, 0xbebfbc70)
    a = hh(a, b, c, d, words[i + 13] || 0, 4, 0x289b7ec6)
    d = hh(d, a, b, c, words[i + 0] || 0, 11, 0xeaa127fa)
    c = hh(c, d, a, b, words[i + 3] || 0, 16, 0xd4ef3085)
    b = hh(b, c, d, a, words[i + 6] || 0, 23, 0x04881d05)
    a = hh(a, b, c, d, words[i + 9] || 0, 4, 0xd9d4d039)
    d = hh(d, a, b, c, words[i + 12] || 0, 11, 0xe6db99e5)
    c = hh(c, d, a, b, words[i + 15] || 0, 16, 0x1fa27cf8)
    b = hh(b, c, d, a, words[i + 2] || 0, 23, 0xc4ac5665)

    a = ii(a, b, c, d, words[i + 0] || 0, 6, 0xf4292244)
    d = ii(d, a, b, c, words[i + 7] || 0, 10, 0x432aff97)
    c = ii(c, d, a, b, words[i + 14] || 0, 15, 0xab9423a7)
    b = ii(b, c, d, a, words[i + 5] || 0, 21, 0xfc93a039)
    a = ii(a, b, c, d, words[i + 12] || 0, 6, 0x655b59c3)
    d = ii(d, a, b, c, words[i + 3] || 0, 10, 0x8f0ccc92)
    c = ii(c, d, a, b, words[i + 10] || 0, 15, 0xffeff47d)
    b = ii(b, c, d, a, words[i + 1] || 0, 21, 0x85845dd1)
    a = ii(a, b, c, d, words[i + 8] || 0, 6, 0x6fa87e4f)
    d = ii(d, a, b, c, words[i + 15] || 0, 10, 0xfe2ce6e0)
    c = ii(c, d, a, b, words[i + 6] || 0, 15, 0xa3014314)
    b = ii(b, c, d, a, words[i + 13] || 0, 21, 0x4e0811a1)
    a = ii(a, b, c, d, words[i + 4] || 0, 6, 0xf7537e82)
    d = ii(d, a, b, c, words[i + 11] || 0, 10, 0xbd3af235)
    c = ii(c, d, a, b, words[i + 2] || 0, 15, 0x2ad7d2bb)
    b = ii(b, c, d, a, words[i + 9] || 0, 21, 0xeb86d391)

    a = addUnsigned(a, aa)
    b = addUnsigned(b, bb)
    c = addUnsigned(c, cc)
    d = addUnsigned(d, dd)
  }

  return [a, b, c, d]
    .map((val) =>
      [val & 0xff, (val >>> 8) & 0xff, (val >>> 16) & 0xff, (val >>> 24) & 0xff]
        .map((b2) => b2.toString(16).padStart(2, '0'))
        .join(''),
    )
    .join('')
}

async function hashWithSubtle(algorithm, data) {
  const digest = await crypto.subtle.digest(algorithm, data)
  return toHex(digest)
}

async function hmacWithSubtle(algorithm, data, secret) {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: { name: algorithm } },
    false,
    ['sign'],
  )
  const sig = await crypto.subtle.sign('HMAC', key, data)
  return toHex(sig)
}

export default function HashGenerator() {
  const [text, setText] = useState('')
  const [algorithm, setAlgorithm] = useState('SHA-256')
  const [hmacMode, setHmacMode] = useState(false)
  const [secret, setSecret] = useState('')
  const [hash, setHash] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [fileName, setFileName] = useState('')

  const inputBuffer = useMemo(() => new TextEncoder().encode(text), [text])

  const generate = async (buffer = inputBuffer) => {
    try {
      setError('')
      if (algorithm === 'MD5') {
        if (hmacMode) {
          setError('HMAC mode for MD5 is intentionally not supported in this tool.')
          setHash('')
          return
        }
        const source = buffer instanceof Uint8Array ? new TextDecoder().decode(buffer) : text
        setHash(md5(source))
        return
      }
      const algo = algorithm
      const result = hmacMode
        ? await hmacWithSubtle(algo, buffer, secret)
        : await hashWithSubtle(algo, buffer)
      setHash(result)
    } catch (err) {
      setError(err.message || 'Unable to generate hash')
      setHash('')
    }
  }

  const onFile = async (file) => {
    if (!file) return
    const buffer = await file.arrayBuffer()
    setFileName(file.name)
    generate(new Uint8Array(buffer))
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {ALGORITHMS.map((algo) => (
          <button
            key={algo}
            onClick={() => setAlgorithm(algo)}
            className={algo === algorithm ? 'btn-primary' : 'btn-secondary'}
          >
            {algo}
          </button>
        ))}
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="textarea-field min-h-[120px]"
        placeholder="Enter text to hash"
      />

      <label className="inline-flex items-center gap-2 text-sm text-gray-700">
        <input type="checkbox" checked={hmacMode} onChange={(e) => setHmacMode(e.target.checked)} disabled={algorithm === 'MD5'} />
        HMAC mode
      </label>

      {hmacMode ? (
        <input
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
          className="input-field"
          placeholder="Secret key"
        />
      ) : null}

      <div className="flex flex-wrap gap-2">
        <button onClick={() => generate()} className="btn-primary">Generate Hash</button>
        <label className="btn-secondary cursor-pointer">
          Hash File
          <input type="file" className="hidden" onChange={(e) => onFile(e.target.files?.[0])} />
        </label>
      </div>

      {fileName ? <p className="text-xs text-gray-500">File mode: {fileName}</p> : null}

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-gray-900">Output</h3>
          <button
            className="text-sm text-gray-600 hover:text-indigo-600 inline-flex items-center gap-1"
            onClick={() => {
              navigator.clipboard.writeText(hash || '')
              setCopied(true)
              setTimeout(() => setCopied(false), 1500)
            }}
            disabled={!hash}
          >
            {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
        <pre className="font-mono text-lg break-all">{hash || 'Generate a hash to see result.'}</pre>
      </div>
    </div>
  )
}
