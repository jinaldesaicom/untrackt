import { useState } from 'react'
import { Copy, Check, Eraser } from 'lucide-react'

export default function HtmlFormatterBeautifier() {
  const [input, setInput] = useState('')
  const [indent, setIndent] = useState(2)
  const [copied, setCopied] = useState(false)

  const formatHtml = (html) => {
    if (!html.trim()) return ''
    let formatted = ''
    let level = 0
    const pad = () => ' '.repeat(level * indent)

    // Normalize whitespace between tags
    const normalized = html.replace(/>\s+</g, '><').trim()
    const tokens = normalized.split(/(<[^>]+>)/g).filter(Boolean)

    const voidElements = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr'])

    for (const token of tokens) {
      if (token.startsWith('</')) {
        // Closing tag
        level = Math.max(0, level - 1)
        formatted += pad() + token + '\n'
      } else if (token.startsWith('<')) {
        const tagMatch = token.match(/^<(\w+)/)
        const tagName = tagMatch ? tagMatch[1].toLowerCase() : ''
        const selfClosing = token.endsWith('/>') || voidElements.has(tagName)
        formatted += pad() + token + '\n'
        if (!selfClosing) level++
      } else {
        const text = token.trim()
        if (text) formatted += pad() + text + '\n'
      }
    }
    return formatted.trimEnd()
  }

  const output = formatHtml(input)

  const copy = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="space-y-5">
      {/* Indent control */}
      <div className="flex items-center gap-3">
        <label className="text-sm text-gray-600 dark:text-gray-400">Indent:</label>
        {[2, 4].map(n => (
          <button key={n} onClick={() => setIndent(n)} className={`px-3 py-1 text-xs rounded-full border transition-colors ${indent === n ? 'bg-teal-500 text-white border-teal-500' : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'}`}>
            {n} spaces
          </button>
        ))}
        <button onClick={() => setIndent(0)} className={`px-3 py-1 text-xs rounded-full border transition-colors ${indent === 0 ? 'bg-teal-500 text-white border-teal-500' : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'}`}>
          Tab
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Input */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase">Input HTML</span>
            <button onClick={() => setInput('')} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-0.5"><Eraser className="w-3.5 h-3.5" /></button>
          </div>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Paste your messy HTML here..."
            className="w-full h-72 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-3 text-xs font-mono text-gray-700 dark:text-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-teal-500/30"
            spellCheck={false}
          />
        </div>

        {/* Output */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase">Formatted HTML</span>
            <button onClick={copy} disabled={!output} className="flex items-center gap-1 text-xs text-teal-600 dark:text-teal-400 hover:underline disabled:opacity-40 disabled:no-underline">
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <div className="w-full h-72 bg-gray-900 rounded-xl p-3 overflow-auto">
            <pre className="text-xs text-green-400 font-mono whitespace-pre">{output || <span className="text-gray-600">Formatted output will appear here...</span>}</pre>
          </div>
        </div>
      </div>

      {/* Stats */}
      {input.trim() && (
        <div className="flex gap-4 text-xs text-gray-500 dark:text-gray-400">
          <span>Input: {input.length} chars</span>
          <span>Output: {output.length} chars</span>
          <span>Lines: {output.split('\n').length}</span>
        </div>
      )}
    </div>
  )
}
