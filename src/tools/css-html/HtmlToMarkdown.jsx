import { useState } from 'react'
import { Copy, Check, Eraser } from 'lucide-react'

export default function HtmlToMarkdown() {
  const [input, setInput] = useState('')
  const [copied, setCopied] = useState(false)

  const convert = (html) => {
    if (!html.trim()) return ''
    let md = html

    // Headings
    md = md.replace(/<h1[^>]*>(.*?)<\/h1>/gi, '# $1\n\n')
    md = md.replace(/<h2[^>]*>(.*?)<\/h2>/gi, '## $1\n\n')
    md = md.replace(/<h3[^>]*>(.*?)<\/h3>/gi, '### $1\n\n')
    md = md.replace(/<h4[^>]*>(.*?)<\/h4>/gi, '#### $1\n\n')
    md = md.replace(/<h5[^>]*>(.*?)<\/h5>/gi, '##### $1\n\n')
    md = md.replace(/<h6[^>]*>(.*?)<\/h6>/gi, '###### $1\n\n')

    // Bold & Italic
    md = md.replace(/<(strong|b)[^>]*>(.*?)<\/\1>/gi, '**$2**')
    md = md.replace(/<(em|i)[^>]*>(.*?)<\/\1>/gi, '*$2*')

    // Code
    md = md.replace(/<code[^>]*>(.*?)<\/code>/gi, '`$1`')
    md = md.replace(/<pre[^>]*>(.*?)<\/pre>/gis, '```\n$1\n```\n\n')

    // Links & Images
    md = md.replace(/<a[^>]*href=["']([^"']*)["'][^>]*>(.*?)<\/a>/gi, '[$2]($1)')
    md = md.replace(/<img[^>]*src=["']([^"']*)["'][^>]*alt=["']([^"']*)["'][^>]*\/?>/gi, '![$2]($1)')
    md = md.replace(/<img[^>]*src=["']([^"']*)["'][^>]*\/?>/gi, '![]($1)')

    // Lists
    md = md.replace(/<li[^>]*>(.*?)<\/li>/gi, '- $1\n')
    md = md.replace(/<\/?[ou]l[^>]*>/gi, '\n')

    // Paragraphs & breaks
    md = md.replace(/<p[^>]*>(.*?)<\/p>/gi, '$1\n\n')
    md = md.replace(/<br\s*\/?>/gi, '\n')

    // Horizontal rules
    md = md.replace(/<hr\s*\/?>/gi, '---\n\n')

    // Blockquotes
    md = md.replace(/<blockquote[^>]*>(.*?)<\/blockquote>/gis, (_, content) =>
      content.trim().split('\n').map(l => `> ${l.trim()}`).join('\n') + '\n\n'
    )

    // Strip remaining tags
    md = md.replace(/<[^>]+>/g, '')

    // Decode common entities
    md = md.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ')

    // Clean excessive newlines
    md = md.replace(/\n{3,}/g, '\n\n').trim()

    return md
  }

  const output = convert(input)

  const copy = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="space-y-5">
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
            placeholder="Paste HTML here..."
            className="w-full h-80 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-3 text-xs font-mono text-gray-700 dark:text-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-teal-500/30"
            spellCheck={false}
          />
        </div>

        {/* Output */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase">Markdown Output</span>
            <button onClick={copy} disabled={!output} className="flex items-center gap-1 text-xs text-teal-600 dark:text-teal-400 hover:underline disabled:opacity-40 disabled:no-underline">
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <div className="w-full h-80 bg-gray-900 rounded-xl p-3 overflow-auto">
            <pre className="text-xs text-green-400 font-mono whitespace-pre-wrap">{output || <span className="text-gray-600">Markdown output will appear here...</span>}</pre>
          </div>
        </div>
      </div>

      {/* Stats */}
      {input.trim() && (
        <div className="flex gap-4 text-xs text-gray-500 dark:text-gray-400">
          <span>Input: {input.length} chars</span>
          <span>Output: {output.length} chars</span>
        </div>
      )}
    </div>
  )
}
