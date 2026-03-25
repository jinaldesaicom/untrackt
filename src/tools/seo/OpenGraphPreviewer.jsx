import { useMemo, useState } from 'react'
import CopyButton from '../../components/CopyButton.jsx'
import { Panel } from '../../components/ToolLayout.jsx'
import { Field, ResultCard, SeoNote } from './shared.jsx'

function escapeHtml(value) {
  return String(value || '').replaceAll('"', '&quot;')
}

export default function OpenGraphPreviewer() {
  const [values, setValues] = useState({
    title: 'Your content title here',
    description: 'A compelling description for your page, article, or product.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200',
    url: 'https://untrackt.com/example',
    siteName: 'UnTrackt',
    type: 'website',
    twitterCard: 'summary_large_image',
    twitterSite: '@untrackt',
  })
  const [imageFailed, setImageFailed] = useState(false)

  const generated = useMemo(() => {
    const openGraph = [
      `<meta property="og:title" content="${escapeHtml(values.title)}" />`,
      `<meta property="og:description" content="${escapeHtml(values.description)}" />`,
      `<meta property="og:image" content="${escapeHtml(values.image)}" />`,
      `<meta property="og:url" content="${escapeHtml(values.url)}" />`,
      `<meta property="og:site_name" content="${escapeHtml(values.siteName)}" />`,
      `<meta property="og:type" content="${escapeHtml(values.type)}" />`,
    ].join('\n')

    const twitter = [
      `<meta name="twitter:card" content="${escapeHtml(values.twitterCard)}" />`,
      `<meta name="twitter:title" content="${escapeHtml(values.title)}" />`,
      `<meta name="twitter:description" content="${escapeHtml(values.description)}" />`,
      `<meta name="twitter:image" content="${escapeHtml(values.image)}" />`,
      `<meta name="twitter:site" content="${escapeHtml(values.twitterSite)}" />`,
    ].join('\n')

    return {
      openGraph,
      twitter,
      all: `${openGraph}\n${twitter}`,
    }
  }, [values])

  return (
    <div className="space-y-6">
      <SeoNote />

      <div className="grid gap-6 xl:grid-cols-[0.95fr,1.05fr]">
        <Panel>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="og:title" className="sm:col-span-2">
              <input className="input-field" value={values.title} onChange={(event) => setValues((current) => ({ ...current, title: event.target.value }))} />
            </Field>
            <Field label="og:description" className="sm:col-span-2">
              <textarea className="textarea-field min-h-[120px]" value={values.description} onChange={(event) => setValues((current) => ({ ...current, description: event.target.value }))} />
            </Field>
            <Field label="og:image URL" className="sm:col-span-2">
              <input className="input-field" value={values.image} onChange={(event) => { setImageFailed(false); setValues((current) => ({ ...current, image: event.target.value })) }} />
            </Field>
            <Field label="og:url" className="sm:col-span-2">
              <input className="input-field" value={values.url} onChange={(event) => setValues((current) => ({ ...current, url: event.target.value }))} />
            </Field>
            <Field label="og:site_name">
              <input className="input-field" value={values.siteName} onChange={(event) => setValues((current) => ({ ...current, siteName: event.target.value }))} />
            </Field>
            <Field label="og:type">
              <select className="input-field" value={values.type} onChange={(event) => setValues((current) => ({ ...current, type: event.target.value }))}>
                <option value="website">website</option>
                <option value="article">article</option>
                <option value="product">product</option>
              </select>
            </Field>
            <Field label="twitter:card">
              <select className="input-field" value={values.twitterCard} onChange={(event) => setValues((current) => ({ ...current, twitterCard: event.target.value }))}>
                <option value="summary_large_image">summary_large_image</option>
                <option value="summary">summary</option>
              </select>
            </Field>
            <Field label="twitter:site">
              <input className="input-field" value={values.twitterSite} onChange={(event) => setValues((current) => ({ ...current, twitterSite: event.target.value }))} />
            </Field>
          </div>
        </Panel>

        <div className="space-y-6">
          <ResultCard title="Generated tags" actions={<div className="flex flex-wrap gap-2"><CopyButton text={generated.openGraph} label="Copy OG" /><CopyButton text={generated.twitter} label="Copy Twitter" /><CopyButton text={generated.all} label="Copy all" /></div>}>
            <div className="grid gap-4 lg:grid-cols-2">
              <textarea className="textarea-field min-h-[220px] font-mono text-xs" readOnly value={generated.openGraph} />
              <textarea className="textarea-field min-h-[220px] font-mono text-xs" readOnly value={generated.twitter} />
            </div>
          </ResultCard>

          <ResultCard title="Live preview cards">
            <div className="grid gap-4 lg:grid-cols-2">
              <div className="overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700">
                <div className="h-40 bg-gray-100 dark:bg-gray-800">
                  {!imageFailed && values.image ? <img src={values.image} alt="Open Graph preview" className="h-full w-full object-cover" onError={() => setImageFailed(true)} /> : <div className="flex h-full items-center justify-center text-sm text-gray-500 dark:text-gray-400">OG Image placeholder</div>}
                </div>
                <div className="border-t border-gray-200 p-4 dark:border-gray-700">
                  <p className="text-xs uppercase tracking-[0.16em] text-gray-500 dark:text-gray-400">{values.siteName || 'SITE NAME'}</p>
                  <p className="mt-2 font-semibold text-gray-900 dark:text-gray-100">{values.title}</p>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{values.description}</p>
                </div>
              </div>

              <div className="overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700">
                <div className="h-40 bg-slate-100 dark:bg-slate-800">
                  {!imageFailed && values.image ? <img src={values.image} alt="Twitter preview" className="h-full w-full object-cover" onError={() => setImageFailed(true)} /> : <div className="flex h-full items-center justify-center text-sm text-gray-500 dark:text-gray-400">Large image area</div>}
                </div>
                <div className="border-t border-gray-200 p-4 dark:border-gray-700">
                  <p className="font-semibold text-gray-900 dark:text-gray-100">{values.title}</p>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{values.description}</p>
                  <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">{values.twitterSite}</p>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-200 p-4 dark:border-gray-700 lg:col-span-2">
                <p className="text-xs uppercase tracking-[0.16em] text-gray-500 dark:text-gray-400">iMessage / WhatsApp</p>
                <div className="mt-3 flex items-center gap-4 rounded-2xl bg-gray-50 p-3 dark:bg-gray-900">
                  <div className="h-16 w-16 overflow-hidden rounded-xl bg-gray-200 dark:bg-gray-800">
                    {!imageFailed && values.image ? <img src={values.image} alt="Link preview" className="h-full w-full object-cover" onError={() => setImageFailed(true)} /> : null}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">{values.title}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{new URL(values.url, 'https://untrackt.com').hostname}</p>
                  </div>
                </div>
              </div>
            </div>
          </ResultCard>
        </div>
      </div>
    </div>
  )
}
