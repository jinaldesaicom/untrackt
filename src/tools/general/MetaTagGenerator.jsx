import { useMemo, useState } from 'react'
import CopyButton from '../../components/CopyButton.jsx'
import { ToolLayout, Panel, FieldLabel } from '../../components/ToolLayout.jsx'

export default function MetaTagGenerator() {
  const [inputs, setInputs] = useState({
    title: 'UnTrackt - Free Browser Tools',
    description: 'Privacy-focused browser tools that run locally with zero tracking.',
    url: 'https://untrackt.com/example',
    siteName: 'UnTrackt',
    pageType: 'website',
    imageUrl: 'https://untrackt.com/og-image.png',
    twitterHandle: '@untrackt',
    keywords: 'tools, privacy, browser',
    author: 'UnTrackt',
    robotsIndex: 'index',
    robotsFollow: 'follow',
  })

  const outputs = useMemo(() => {
    const robots = `${inputs.robotsIndex}, ${inputs.robotsFollow}`
    const basic = `<title>${inputs.title}</title>\n<meta name="description" content="${inputs.description}" />\n<meta name="keywords" content="${inputs.keywords}" />\n<meta name="author" content="${inputs.author}" />\n<meta name="robots" content="${robots}" />\n<link rel="canonical" href="${inputs.url}" />`
    const openGraph = `<meta property="og:title" content="${inputs.title}" />\n<meta property="og:description" content="${inputs.description}" />\n<meta property="og:url" content="${inputs.url}" />\n<meta property="og:site_name" content="${inputs.siteName}" />\n<meta property="og:type" content="${inputs.pageType}" />\n<meta property="og:image" content="${inputs.imageUrl}" />`
    const twitter = `<meta name="twitter:card" content="summary_large_image" />\n<meta name="twitter:title" content="${inputs.title}" />\n<meta name="twitter:description" content="${inputs.description}" />\n<meta name="twitter:image" content="${inputs.imageUrl}" />\n<meta name="twitter:site" content="${inputs.twitterHandle}" />`
    const schema = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': inputs.pageType === 'article' ? 'Article' : 'WebPage',
      headline: inputs.title,
      description: inputs.description,
      url: inputs.url,
      image: inputs.imageUrl,
      author: inputs.author,
      publisher: { '@type': 'Organization', name: inputs.siteName },
    }, null, 2)
    return { basic, openGraph, twitter, schema, all: [basic, openGraph, twitter, `<script type="application/ld+json">\n${schema}\n</script>`].join('\n\n') }
  }, [inputs])

  return (
    <ToolLayout
      title="Meta Tag Generator"
      description="Generate core SEO meta tags, Open Graph, Twitter cards, and JSON-LD with live character warnings and previews."
      path="/tools/meta-tag-generator"
    >
      <div className="grid gap-6 lg:grid-cols-[0.95fr,1.05fr]">
        <Panel>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ['Page title', 'title'],
              ['Canonical URL', 'url'],
              ['Site name', 'siteName'],
              ['Page type', 'pageType'],
              ['Image URL', 'imageUrl'],
              ['Twitter handle', 'twitterHandle'],
              ['Keywords', 'keywords'],
              ['Author', 'author'],
            ].map(([label, key]) => (
              <div key={key} className={key === 'keywords' || key === 'author' ? 'sm:col-span-2' : ''}>
                <FieldLabel helper={key === 'title' ? `${inputs.title.length}/60` : undefined}>{label}</FieldLabel>
                {key === 'pageType' ? (
                  <select className="input-field" value={inputs.pageType} onChange={(event) => setInputs((current) => ({ ...current, pageType: event.target.value }))}>
                    <option value="website">Website</option>
                    <option value="article">Article</option>
                    <option value="product">Product</option>
                    <option value="profile">Profile</option>
                  </select>
                ) : (
                  <input className="input-field" value={inputs[key]} onChange={(event) => setInputs((current) => ({ ...current, [key]: event.target.value }))} />
                )}
              </div>
            ))}
            <div className="sm:col-span-2">
              <FieldLabel helper={`${inputs.description.length}/160`}>Meta description</FieldLabel>
              <textarea className="textarea-field min-h-[120px]" value={inputs.description} onChange={(event) => setInputs((current) => ({ ...current, description: event.target.value }))} />
            </div>
            <div className="sm:col-span-2 flex flex-wrap gap-2">
              <button type="button" className={`btn-secondary ${inputs.robotsIndex === 'index' ? '!bg-indigo-600 !text-white' : ''}`} onClick={() => setInputs((current) => ({ ...current, robotsIndex: current.robotsIndex === 'index' ? 'noindex' : 'index' }))}>{inputs.robotsIndex}</button>
              <button type="button" className={`btn-secondary ${inputs.robotsFollow === 'follow' ? '!bg-indigo-600 !text-white' : ''}`} onClick={() => setInputs((current) => ({ ...current, robotsFollow: current.robotsFollow === 'follow' ? 'nofollow' : 'follow' }))}>{inputs.robotsFollow}</button>
            </div>
          </div>
        </Panel>

        <div className="space-y-6">
          <Panel>
            <div className="flex items-center justify-between gap-3 mb-4">
              <p className="font-semibold text-gray-900 dark:text-gray-100">Basic meta tags</p>
              <CopyButton text={outputs.basic} label="Copy" />
            </div>
            <textarea className="textarea-field min-h-[140px]" readOnly value={outputs.basic} />
          </Panel>
          <Panel>
            <div className="flex items-center justify-between gap-3 mb-4">
              <p className="font-semibold text-gray-900 dark:text-gray-100">Open Graph</p>
              <CopyButton text={outputs.openGraph} label="Copy" />
            </div>
            <textarea className="textarea-field min-h-[160px]" readOnly value={outputs.openGraph} />
          </Panel>
          <Panel>
            <div className="flex items-center justify-between gap-3 mb-4">
              <p className="font-semibold text-gray-900 dark:text-gray-100">Twitter Card</p>
              <CopyButton text={outputs.twitter} label="Copy" />
            </div>
            <textarea className="textarea-field min-h-[140px]" readOnly value={outputs.twitter} />
          </Panel>
          <Panel>
            <div className="flex items-center justify-between gap-3 mb-4">
              <p className="font-semibold text-gray-900 dark:text-gray-100">JSON-LD</p>
              <div className="flex gap-2"><CopyButton text={outputs.schema} label="Copy schema" /><CopyButton text={outputs.all} label="Copy all" /></div>
            </div>
            <textarea className="textarea-field min-h-[180px]" readOnly value={outputs.schema} />
          </Panel>
          <Panel>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Live previews</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-gray-200 dark:border-gray-700 p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-gray-500 dark:text-gray-400">Google preview</p>
                <p className="mt-3 text-blue-700 dark:text-blue-300 text-lg leading-snug">{inputs.title}</p>
                <p className="text-xs text-green-700 dark:text-green-400">{inputs.url}</p>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{inputs.description}</p>
              </div>
              <div className="rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="h-28 bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-sm text-gray-500 dark:text-gray-400">OG image preview</div>
                <div className="p-4">
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{inputs.title}</p>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{inputs.description}</p>
                  <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">{inputs.siteName}</p>
                </div>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2 text-sm">
              {inputs.title.length > 60 && <span className="text-amber-600 dark:text-amber-400">Title is longer than 60 characters.</span>}
              {inputs.title.length < 30 && <span className="text-blue-600 dark:text-blue-400">Title could be more descriptive.</span>}
              {inputs.description.length > 160 && <span className="text-amber-600 dark:text-amber-400">Description is longer than 160 characters.</span>}
            </div>
          </Panel>
        </div>
      </div>
    </ToolLayout>
  )
}