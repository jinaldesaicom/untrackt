import { useState } from 'react'
import { Copy, Check, Eraser } from 'lucide-react'

export default function CssVariableExtractor() {
  const [input, setInput] = useState('')
  const [copied, setCopied] = useState(false)

  const extract = (css) => {
    if (!css.trim()) return []
    const varRegex = /--[\w-]+\s*:\s*[^;]+/g
    const matches = css.match(varRegex) || []
    return [...new Set(matches)].map(m => {
      const [name, ...valueParts] = m.split(':')
      return { name: name.trim(), value: valueParts.join(':').trim() }
    })
  }

  const variables = extract(input)

  const outputText = variables.map(v => `${v.name}: ${v.value};`).join('\n')
  const rootBlock = variables.length > 0
    ? `:root {\n${variables.map(v => `  ${v.name}: ${v.value};`).join('\n')}\n}`
    : ''

  const copy = () => {
    navigator.clipboard.writeText(rootBlock)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Input */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase">Input CSS</span>
            <button onClick={() => setInput('')} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-0.5"><Eraser className="w-3.5 h-3.5" /></button>
          </div>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Paste your CSS here..."
            className="w-full h-72 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-3 text-xs font-mono text-gray-700 dark:text-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-teal-500/30"
            spellCheck={false}
          />
        </div>

        {/* Output */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase">Extracted Variables ({variables.length})</span>
            <button onClick={copy} disabled={!variables.length} className="flex items-center gap-1 text-xs text-teal-600 dark:text-teal-400 hover:underline disabled:opacity-40 disabled:no-underline">
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied!' : 'Copy :root'}
            </button>
          </div>
          <div className="w-full h-72 bg-gray-900 rounded-xl p-3 overflow-auto">
            {variables.length > 0 ? (
              <pre className="text-xs text-green-400 font-mono whitespace-pre">{rootBlock}</pre>
            ) : (
              <span className="text-xs text-gray-600">Custom properties will appear here...</span>
            )}
          </div>
        </div>
      </div>

      {/* Variable table */}
      {variables.length > 0 && (
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-2">Variables Table</span>
          <div className="space-y-1 max-h-64 overflow-y-auto">
            {variables.map((v, i) => (
              <div key={i} className="flex items-center gap-3 rounded-lg bg-gray-50 dark:bg-gray-800 px-3 py-1.5 text-xs">
                <span className="font-mono text-teal-600 dark:text-teal-400 min-w-[140px]">{v.name}</span>
                <span className="text-gray-500 dark:text-gray-400">→</span>
                <span className="font-mono text-gray-700 dark:text-gray-300 flex-1">{v.value}</span>
                {/* Color swatch if value looks like a color */}
                {/^#[0-9a-fA-F]{3,8}$|^rgb|^hsl/.test(v.value) && (
                  <span className="w-4 h-4 rounded-sm border border-gray-300 dark:border-gray-600 shrink-0" style={{ backgroundColor: v.value }} />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
