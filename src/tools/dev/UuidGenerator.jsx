import { useState } from 'react'
import { RefreshCw, Copy, Check } from 'lucide-react'

function CopyButton({ text, small = false }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }
  return (
    <button
      onClick={handleCopy}
      className={`flex items-center gap-1 text-gray-400 hover:text-indigo-600 transition-colors ${small ? 'p-1' : ''}`}
      title="Copy"
    >
      {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
    </button>
  )
}

function generateUUID() {
  return crypto.randomUUID()
}

export default function UuidGenerator() {
  const [single, setSingle] = useState(generateUUID())
  const [bulk, setBulk] = useState([])
  const [showBulk, setShowBulk] = useState(false)

  const regenerate = () => {
    setSingle(generateUUID())
  }

  const generateBulk = () => {
    const list = Array.from({ length: 10 }, () => generateUUID())
    setBulk(list)
    setShowBulk(true)
  }

  return (
    <div className="space-y-6">
      {/* Single UUID */}
      <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 block">Generated UUID</label>
        <div className="flex items-center gap-3">
          <code className="flex-1 font-mono text-lg text-indigo-700 dark:text-indigo-300 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 break-all select-all">
            {single}
          </code>
          <CopyButton text={single} />
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button onClick={regenerate} className="btn-primary flex items-center gap-2">
          <RefreshCw className="w-4 h-4" />
          Generate New
        </button>
        <button onClick={generateBulk} className="btn-secondary">
          Generate 10 at Once
        </button>
      </div>

      {showBulk && bulk.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Bulk UUIDs</h3>
            <button
              onClick={() => navigator.clipboard.writeText(bulk.join('\n'))}
              className="text-xs text-indigo-600 hover:underline"
            >
              Copy All
            </button>
          </div>
          <div className="space-y-2">
            {bulk.map((uuid, i) => (
              <div key={i} className="flex items-center gap-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2">
                <span className="text-xs text-gray-400 w-5 shrink-0">{i + 1}.</span>
                <code className="flex-1 font-mono text-sm text-gray-800 dark:text-gray-200 select-all">{uuid}</code>
                <CopyButton text={uuid} small />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
