import { useState } from 'react'
import { Copy, Check, Plus, Trash2 } from 'lucide-react'

function CopyBtn({ text }) {
  const [copied, setCopied] = useState(false)
  const copy = () => { navigator.clipboard.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1500) }) }
  return <button onClick={copy} className="btn-secondary flex items-center gap-1.5 text-xs">{copied ? <><Check className="w-3.5 h-3.5" /> Copied</> : <><Copy className="w-3.5 h-3.5" /> Copy</>}</button>
}

export default function BreadcrumbSchemaGenerator() {
  const [items, setItems] = useState([
    { name: 'Home', url: 'https://example.com' },
    { name: '', url: '' }
  ])

  const addItem = () => setItems(prev => [...prev, { name: '', url: '' }])
  const removeItem = (i) => setItems(prev => prev.filter((_, j) => j !== i))
  const updateItem = (i, key, val) => setItems(prev => { const n = [...prev]; n[i] = { ...n[i], [key]: val }; return n })

  const validItems = items.filter(i => i.name)
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: validItems.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      ...(item.url ? { item: item.url } : {})
    }))
  }
  const jsonStr = JSON.stringify(schema, null, 2)
  const scriptTag = `<script type="application/ld+json">\n${jsonStr}\n</script>`

  const htmlBreadcrumb = validItems.map((item, idx) => {
    if (idx === validItems.length - 1) return `<span>${item.name}</span>`
    return `<a href="${item.url}">${item.name}</a>`
  }).join(' › ')

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-900/20 px-4 py-3 text-sm text-rose-700 dark:text-rose-300">
        This tool provides guidance and estimates only. SEO results depend on many factors outside this tool.
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Breadcrumb Items</label>
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="text-xs text-gray-400 w-6 text-right">{i + 1}.</span>
            <input type="text" value={item.name} onChange={e => updateItem(i, 'name', e.target.value)} className="input-field text-xs w-40" placeholder="Name" />
            <input type="text" value={item.url} onChange={e => updateItem(i, 'url', e.target.value)} className="input-field text-xs flex-1" placeholder="URL (optional for last item)" />
            {items.length > 1 && <button onClick={() => removeItem(i)} className="text-red-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>}
          </div>
        ))}
        {items.length < 10 && <button onClick={addItem} className="btn-secondary text-xs flex items-center gap-1"><Plus className="w-3 h-3" /> Add level</button>}
      </div>

      {validItems.length > 0 && (
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
          <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">Preview</h3>
          <div className="text-sm text-gray-700 dark:text-gray-200">
            {validItems.map((item, idx) => (
              <span key={idx}>
                {idx > 0 && <span className="mx-1.5 text-gray-400">›</span>}
                {idx < validItems.length - 1 ? <span className="text-indigo-600 dark:text-indigo-400 underline">{item.name}</span> : <span className="font-medium">{item.name}</span>}
              </span>
            ))}
          </div>
        </div>
      )}

      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">JSON-LD</h3>
          <div className="flex gap-2">
            <CopyBtn text={jsonStr} />
            <CopyBtn text={scriptTag} />
          </div>
        </div>
        <pre className="textarea-field min-h-[100px] whitespace-pre-wrap text-xs bg-gray-50 dark:bg-gray-800 overflow-x-auto">{jsonStr}</pre>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">HTML Breadcrumb</h3>
          <CopyBtn text={htmlBreadcrumb} />
        </div>
        <pre className="textarea-field whitespace-pre-wrap text-xs bg-gray-50 dark:bg-gray-800 overflow-x-auto">{htmlBreadcrumb || '—'}</pre>
      </div>
    </div>
  )
}
