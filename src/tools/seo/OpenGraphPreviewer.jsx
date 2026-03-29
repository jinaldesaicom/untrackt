import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

function CopyBtn({ text }) {
  const [copied, setCopied] = useState(false)
  const copy = () => { navigator.clipboard.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1500) }) }
  return <button onClick={copy} className="btn-secondary flex items-center gap-1.5 text-xs">{copied ? <><Check className="w-3.5 h-3.5" /> Copied</> : <><Copy className="w-3.5 h-3.5" /> Copy</>}</button>
}

const CARD_TYPES = ['summary', 'summary_large_image', 'app', 'player']
const OG_TYPES = ['website', 'article', 'product', 'profile', 'music.song', 'video.movie']

export default function OpenGraphPreviewer() {
  const [ogTitle, setOgTitle] = useState('')
  const [ogDesc, setOgDesc] = useState('')
  const [ogImage, setOgImage] = useState('')
  const [ogUrl, setOgUrl] = useState('')
  const [ogSiteName, setOgSiteName] = useState('')
  const [ogType, setOgType] = useState('website')
  const [twitterCard, setTwitterCard] = useState('summary_large_image')
  const [twitterSite, setTwitterSite] = useState('')
  const [imgError, setImgError] = useState(false)

  const ogTags = `<meta property="og:title" content="${ogTitle || 'Page Title'}" />
<meta property="og:description" content="${ogDesc || 'Page description'}" />
<meta property="og:image" content="${ogImage || 'https://example.com/image.jpg'}" />
<meta property="og:url" content="${ogUrl || 'https://example.com'}" />
<meta property="og:site_name" content="${ogSiteName || 'Site Name'}" />
<meta property="og:type" content="${ogType}" />`

  const twitterTags = `<meta name="twitter:card" content="${twitterCard}" />
<meta name="twitter:title" content="${ogTitle || 'Page Title'}" />
<meta name="twitter:description" content="${ogDesc || 'Page description'}" />
<meta name="twitter:image" content="${ogImage || 'https://example.com/image.jpg'}" />${twitterSite ? `\n<meta name="twitter:site" content="${twitterSite}" />` : ''}`

  const allTags = `<!-- Open Graph -->\n${ogTags}\n\n<!-- Twitter Card -->\n${twitterTags}`

  const hostname = ogUrl ? (() => { try { return new URL(ogUrl.startsWith('http') ? ogUrl : `https://${ogUrl}`).hostname } catch { return 'example.com' } })() : 'example.com'

  const ImagePlaceholder = () => (
    <div className="w-full h-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400 text-sm">
      No image
    </div>
  )

  const PreviewImage = ({ className = '' }) => {
    if (!ogImage || imgError) return <ImagePlaceholder />
    return <img src={ogImage} alt="OG preview" className={`w-full h-full object-cover ${className}`} onError={() => setImgError(true)} />
  }

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-900/20 px-4 py-3 text-sm text-rose-700 dark:text-rose-300">
        This tool provides guidance and estimates only. SEO results depend on many factors outside this tool.
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">og:title</label>
          <input type="text" value={ogTitle} onChange={e => setOgTitle(e.target.value)} className="input-field" placeholder="Your page title" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">og:site_name</label>
          <input type="text" value={ogSiteName} onChange={e => setOgSiteName(e.target.value)} className="input-field" placeholder="Your Site Name" />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">og:description</label>
          <textarea value={ogDesc} onChange={e => setOgDesc(e.target.value)} className="textarea-field min-h-[60px]" placeholder="Description of your page" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">og:image URL</label>
          <input type="text" value={ogImage} onChange={e => { setOgImage(e.target.value); setImgError(false) }} className="input-field" placeholder="https://example.com/image.jpg" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">og:url</label>
          <input type="text" value={ogUrl} onChange={e => setOgUrl(e.target.value)} className="input-field" placeholder="https://example.com/page" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">og:type</label>
          <select value={ogType} onChange={e => setOgType(e.target.value)} className="input-field">
            {OG_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">twitter:card</label>
          <select value={twitterCard} onChange={e => setTwitterCard(e.target.value)} className="input-field">
            {CARD_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">twitter:site</label>
          <input type="text" value={twitterSite} onChange={e => setTwitterSite(e.target.value)} className="input-field" placeholder="@yourusername" />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Preview Cards</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Facebook/LinkedIn */}
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Facebook / LinkedIn</p>
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden shadow-sm">
              <div className="h-[200px] overflow-hidden"><PreviewImage /></div>
              <div className="p-3 border-t border-gray-200 dark:border-gray-700">
                <p className="text-[10px] uppercase text-gray-500 dark:text-gray-400 tracking-wide">{ogSiteName || hostname}</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white mt-0.5 line-clamp-1">{ogTitle || 'Page Title'}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">{ogDesc || 'Description appears here'}</p>
              </div>
            </div>
          </div>

          {/* Twitter */}
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Twitter (X)</p>
            <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden shadow-sm">
              {twitterCard === 'summary_large_image' ? (
                <>
                  <div className="h-[220px] overflow-hidden"><PreviewImage /></div>
                  <div className="p-3">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-1">{ogTitle || 'Page Title'}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">{ogDesc || 'Description appears here'}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{twitterSite || hostname}</p>
                  </div>
                </>
              ) : (
                <div className="flex">
                  <div className="w-32 h-32 shrink-0 overflow-hidden">
                    <PreviewImage />
                  </div>
                  <div className="p-3 flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2">{ogTitle || 'Page Title'}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">{ogDesc || 'Description'}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{twitterSite || hostname}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* iMessage / WhatsApp */}
          <div className="md:col-span-2">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">iMessage / WhatsApp</p>
            <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-3 flex items-center gap-3 max-w-sm">
              <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0">
                <PreviewImage />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-1">{ogTitle || 'Page Title'}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{hostname}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Generated Tags</h3>
          <CopyBtn text={allTags} />
        </div>
        <pre className="textarea-field min-h-[120px] whitespace-pre-wrap text-xs bg-gray-50 dark:bg-gray-800">{allTags}</pre>
      </div>
    </div>
  )
}
