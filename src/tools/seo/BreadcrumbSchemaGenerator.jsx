import { useMemo, useState } from 'react'
import CopyButton from '../../components/CopyButton.jsx'
import { Panel } from '../../components/ToolLayout.jsx'
import { Field, ResultCard, SeoNote } from './shared.jsx'

function createItem(name = '', url = '') {
  return { id: crypto.randomUUID(), name, url }
}

const PRESETS = {
  blog: [createItem('Home', 'https://untrackt.com'), createItem('Blog', 'https://untrackt.com/blog'), createItem('Category', 'https://untrackt.com/blog/category'), createItem('Post', 'https://untrackt.com/blog/post')],
  ecommerce: [createItem('Home', 'https://untrackt.com'), createItem('Category', 'https://untrackt.com/category'), createItem('Product', 'https://untrackt.com/product')],
  docs: [createItem('Home', 'https://untrackt.com'), createItem('Docs', 'https://untrackt.com/docs'), createItem('Section', 'https://untrackt.com/docs/section'), createItem('Page', 'https://untrackt.com/docs/page')],
}

export default function BreadcrumbSchemaGenerator() {
  const [baseUrl, setBaseUrl] = useState('')
  const [items, setItems] = useState([createItem('Home', 'https://untrackt.com'), createItem('SEO Tools', '/category/seo'), createItem('Breadcrumb Schema Generator', '/tools/breadcrumb-schema-generator')])
  const [dragId, setDragId] = useState(null)

  const normalizedItems = useMemo(() => items.map((item) => ({ ...item, resolvedUrl: item.url.startsWith('/') && baseUrl ? `${baseUrl.replace(/\/$/, '')}${item.url}` : item.url })), [baseUrl, items])
  const jsonLd = useMemo(() => JSON.stringify({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: normalizedItems.map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.name, item: item.resolvedUrl })) }, null, 2), [normalizedItems])
  const html = useMemo(() => normalizedItems.map((item, index) => `<li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem"><a itemProp="item" href="${item.resolvedUrl}"><span itemProp="name">${item.name}</span></a><meta itemProp="position" content="${index + 1}" /></li>`).join('\n'), [normalizedItems])

  return (
    <div className="space-y-6">
      <SeoNote />
      <Panel>
        <div className="flex flex-wrap gap-2">
          <button type="button" className="btn-secondary" onClick={() => setItems(PRESETS.blog.map((item) => ({ ...item, id: crypto.randomUUID() })))}>Blog post preset</button>
          <button type="button" className="btn-secondary" onClick={() => setItems(PRESETS.ecommerce.map((item) => ({ ...item, id: crypto.randomUUID() })))}>E-commerce preset</button>
          <button type="button" className="btn-secondary" onClick={() => setItems(PRESETS.docs.map((item) => ({ ...item, id: crypto.randomUUID() })))}>Documentation preset</button>
        </div>
      </Panel>

      <div className="grid gap-6 xl:grid-cols-[1fr,1fr]">
        <Panel>
          <div className="space-y-4">
            <Field label="Base URL prefix">
              <input className="input-field" value={baseUrl} onChange={(event) => setBaseUrl(event.target.value)} placeholder="https://example.com" />
            </Field>
            {items.map((item, index) => (
              <div
                key={item.id}
                draggable
                onDragStart={() => setDragId(item.id)}
                onDragOver={(event) => event.preventDefault()}
                onDrop={() => {
                  if (!dragId || dragId === item.id) return
                  const next = [...items]
                  const fromIndex = next.findIndex((entry) => entry.id === dragId)
                  const toIndex = next.findIndex((entry) => entry.id === item.id)
                  const [moved] = next.splice(fromIndex, 1)
                  next.splice(toIndex, 0, moved)
                  setItems(next)
                  setDragId(null)
                }}
                className="grid gap-3 rounded-2xl border border-gray-200 p-4 dark:border-gray-700 md:grid-cols-[1fr,1fr,auto,auto]"
              >
                <input className="input-field" value={item.name} onChange={(event) => setItems((current) => current.map((entry) => entry.id === item.id ? { ...entry, name: event.target.value } : entry))} placeholder="Name" />
                <input className="input-field" value={item.url} onChange={(event) => setItems((current) => current.map((entry) => entry.id === item.id ? { ...entry, url: event.target.value } : entry))} placeholder="URL or /relative-path" />
                <button type="button" className="btn-secondary" onClick={() => setItems((current) => current.length === 1 ? current : current.filter((entry) => entry.id !== item.id))}>Remove</button>
                <span className="self-center text-xs text-gray-500 dark:text-gray-400">Drag</span>
              </div>
            ))}
            <button type="button" className="btn-primary" onClick={() => setItems((current) => [...current, createItem('', '')])}>Add item</button>
          </div>
        </Panel>

        <div className="space-y-6">
          <ResultCard title="Visual preview">
            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-700 dark:text-gray-200">
              {normalizedItems.map((item, index) => (
                <span key={item.id} className="inline-flex items-center gap-2">
                  <span>{item.name || `Item ${index + 1}`}</span>
                  {index < normalizedItems.length - 1 ? <span className="text-gray-400">&gt;</span> : null}
                </span>
              ))}
            </div>
          </ResultCard>
          <ResultCard title="BreadcrumbList JSON-LD" actions={<CopyButton text={jsonLd} label="Copy JSON-LD" />}>
            <textarea className="textarea-field min-h-[220px] font-mono text-xs" readOnly value={jsonLd} />
          </ResultCard>
          <ResultCard title="Breadcrumb HTML" actions={<CopyButton text={html} label="Copy HTML" />}>
            <textarea className="textarea-field min-h-[180px] font-mono text-xs" readOnly value={html} />
          </ResultCard>
        </div>
      </div>
    </div>
  )
}
