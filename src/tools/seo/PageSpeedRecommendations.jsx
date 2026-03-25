import { useMemo } from 'react'
import { Panel } from '../../components/ToolLayout.jsx'
import { useStoredState } from '../productivity/shared.jsx'
import { ResultCard, SeoNote } from './shared.jsx'

const METRICS = [
  { id: 'lcp', label: 'Largest Contentful Paint', short: 'LCP', good: '< 2.5s', improve: '2.5s - 4s', poor: '> 4s', fix: 'Optimize the largest above-the-fold element, preload the hero image, and reduce render-blocking CSS/JS.' },
  { id: 'inp', label: 'Interaction to Next Paint', short: 'INP', good: '< 200ms', improve: '200ms - 500ms', poor: '> 500ms', fix: 'Reduce main-thread work, defer non-critical JavaScript, and keep input handlers fast.' },
  { id: 'cls', label: 'Cumulative Layout Shift', short: 'CLS', good: '< 0.1', improve: '0.1 - 0.25', poor: '> 0.25', fix: 'Reserve space for images, ads, embeds, and avoid injecting content above existing content.' },
]

const CHECKLIST = {
  Images: [
    ['img-1', 'Images have explicit width and height', 'Prevents layout shift', 'Add width and height attributes.', 'https://web.dev/optimize-cls/'],
    ['img-2', 'Images use WebP or AVIF', 'Shrinks transfer size', 'Export responsive WebP or AVIF assets.', 'https://web.dev/serve-images-webp/'],
    ['img-3', 'Images are lazy loaded', 'Saves initial bytes', 'Use loading="lazy" for below-the-fold images.', 'https://web.dev/browser-level-image-lazy-loading/'],
    ['img-4', 'Hero image is preloaded', 'Improves LCP', 'Add rel="preload" for the LCP image.', 'https://web.dev/preload-responsive-images/'],
    ['img-5', 'Images are appropriately sized', 'Avoids wasted bytes', 'Generate responsive image sizes.', 'https://web.dev/serve-responsive-images/'],
    ['img-6', 'Decorative images are compressed', 'Cuts rendering cost', 'Compress non-critical visuals aggressively.', 'https://web.dev/fast/#optimize-your-images'],
    ['img-7', 'SVGs are optimized', 'Reduces markup weight', 'Remove metadata and unused nodes.', 'https://web.dev/fast/#optimize-your-images'],
    ['img-8', 'Background images are minimized', 'Prevents oversized hero files', 'Use CSS gradients or smaller crops.', 'https://web.dev/lcp-lazy-loading/'],
    ['img-9', 'Image CDN or caching is configured', 'Speeds repeat visits', 'Add strong cache headers or CDN delivery.', 'https://web.dev/http-cache/'],
    ['img-10', 'Offscreen iframes use lazy loading', 'Defers heavy embeds', 'Set loading="lazy" on iframe embeds.', 'https://web.dev/iframe-lazy-loading/'],
  ],
  JavaScript: [
    ['js-1', 'Unused JavaScript is removed', 'Less JS improves INP and TBT', 'Code-split or delete unused bundles.', 'https://web.dev/reduce-javascript-payloads-with-code-splitting/'],
    ['js-2', 'Large libraries are deferred', 'Faster interactivity', 'Load non-critical bundles after initial render.', 'https://web.dev/optimize-javascript-loading/'],
    ['js-3', 'Third-party scripts are minimized', 'Reduces main-thread work', 'Audit tags and remove non-essential scripts.', 'https://web.dev/third-party-javascript/'],
    ['js-4', 'Long tasks are broken up', 'Improves responsiveness', 'Split expensive work into smaller chunks.', 'https://web.dev/optimize-long-tasks/'],
    ['js-5', 'Hydration work is controlled', 'Improves initial responsiveness', 'Hydrate only interactive islands when possible.', 'https://web.dev/learn/performance/code-split-javascript/'],
    ['js-6', 'Heavy work runs off the main thread', 'Improves INP', 'Use Web Workers for compute-heavy tasks.', 'https://web.dev/off-main-thread/'],
    ['js-7', 'Event handlers are efficient', 'Keeps interactions smooth', 'Avoid sync layout thrashing in handlers.', 'https://web.dev/avoid-large-complex-layouts-and-layout-thrashing/'],
    ['js-8', 'Production builds are minified', 'Cuts transfer size', 'Ship optimized bundles only.', 'https://web.dev/learn/performance/minification-hydration/'],
  ],
  CSS: [
    ['css-1', 'Critical CSS is prioritized', 'Improves first render', 'Inline or prioritize above-the-fold CSS.', 'https://web.dev/extract-critical-css/'],
    ['css-2', 'Unused CSS is removed', 'Reduces style work', 'Purge unused selectors in production.', 'https://web.dev/reduce-unused-css/'],
    ['css-3', 'Layout is stable', 'Prevents CLS', 'Set reserved dimensions and avoid shifting UI.', 'https://web.dev/optimize-cls/'],
    ['css-4', 'Animations avoid layout properties', 'Smoother rendering', 'Animate transform and opacity only.', 'https://web.dev/animations-guide/'],
    ['css-5', 'Fonts do not block rendering', 'Improves first paint', 'Use font-display: swap.', 'https://web.dev/font-best-practices/'],
    ['css-6', 'Large frameworks are trimmed', 'Less CSS to parse', 'Compile only the classes you use.', 'https://tailwindcss.com/docs/content-configuration'],
  ],
  Fonts: [
    ['font-1', 'Only necessary font weights load', 'Cuts payload size', 'Limit families and weights.', 'https://web.dev/font-best-practices/'],
    ['font-2', 'Fonts are subsetted', 'Sends fewer glyphs', 'Generate latin-only or locale-specific subsets.', 'https://web.dev/font-best-practices/'],
    ['font-3', 'font-display is set to swap', 'Avoids invisible text', 'Use font-display: swap.', 'https://web.dev/font-best-practices/'],
    ['font-4', 'Critical fonts are preloaded', 'Speeds important text rendering', 'Preload only the first-viewport fonts.', 'https://web.dev/preload-critical-assets/'],
    ['font-5', 'System font fallbacks are sensible', 'Improves perceived speed', 'Choose similar fallback metrics.', 'https://web.dev/learn/design/typography/'],
  ],
  'Server/Hosting': [
    ['srv-1', 'Compression is enabled', 'Shrinks HTML/CSS/JS', 'Enable Brotli or Gzip.', 'https://web.dev/reduce-network-payloads-using-text-compression/'],
    ['srv-2', 'TTFB is monitored', 'Affects every page load', 'Measure backend and edge latency regularly.', 'https://web.dev/ttfb/'],
    ['srv-3', 'Static assets are on a CDN', 'Speeds global delivery', 'Serve cacheable assets from edge nodes.', 'https://web.dev/content-delivery-networks/'],
    ['srv-4', 'Redirect chains are removed', 'Saves round trips', 'Link directly to final URLs.', 'https://web.dev/redirects/'],
    ['srv-5', 'HTTP/2 or HTTP/3 is available', 'Improves multiplexing', 'Use a host that supports modern protocols.', 'https://web.dev/performance-http2/'],
    ['srv-6', 'Origin response size is lean', 'Faster document delivery', 'Reduce HTML payload and expensive SSR output.', 'https://web.dev/transfer-size/'],
  ],
  Caching: [
    ['cache-1', 'Static assets have long cache headers', 'Improves repeat views', 'Set immutable caching for versioned files.', 'https://web.dev/http-cache/'],
    ['cache-2', 'Cache busting is versioned', 'Avoids stale assets', 'Fingerprint filenames in builds.', 'https://web.dev/http-cache/'],
    ['cache-3', 'Service worker caching is intentional', 'Improves offline and repeat use', 'Cache only the assets that should persist.', 'https://web.dev/service-worker-caching-and-http-caching/'],
    ['cache-4', 'HTML caching is tuned', 'Improves freshness without waste', 'Use shorter max-age or stale-while-revalidate for documents.', 'https://web.dev/http-cache/'],
    ['cache-5', 'Third-party assets are audited', 'External assets can defeat caching', 'Limit dependencies with poor cache policies.', 'https://web.dev/third-party-javascript/'],
  ],
}

const TOOLS = [
  ['Google PageSpeed Insights', 'Tests Core Web Vitals and Lighthouse metrics', 'Free browser and field/lab performance data', 'https://pagespeed.web.dev/'],
  ['Google Search Console', 'Tracks field performance and indexing', 'Free for verified properties', 'https://search.google.com/search-console/about'],
  ['WebPageTest', 'Advanced multi-step synthetic testing', 'Free test runs with filmstrips and waterfalls', 'https://www.webpagetest.org/'],
  ['GTmetrix', 'Lighthouse-based speed reports', 'Free tier with saved reports and test regions', 'https://gtmetrix.com/'],
]

export default function PageSpeedRecommendations() {
  const [checkedState, setCheckedState] = useStoredState('untrackt:seo:page-speed-checklist', {})

  const allItems = Object.values(CHECKLIST).flat()
  const completed = allItems.filter(([id]) => checkedState[id]).length
  const completion = allItems.length ? Math.round((completed / allItems.length) * 100) : 0
  const level = completion <= 30 ? 'Basic' : completion <= 60 ? 'Intermediate' : completion <= 85 ? 'Advanced' : 'Optimal'

  const toggle = (id) => setCheckedState((current) => ({ ...current, [id]: !current[id] }))
  const countsBySection = useMemo(() => Object.fromEntries(Object.entries(CHECKLIST).map(([section, items]) => [section, items.filter(([id]) => checkedState[id]).length])), [checkedState])

  return (
    <div className="space-y-6">
      <SeoNote />
      <Panel className="border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30">
        <p className="text-sm text-amber-900 dark:text-amber-200">This is a reference checklist. Use the tools below to test your actual page performance.</p>
      </Panel>

      <div className="grid gap-6 xl:grid-cols-[0.9fr,1.1fr]">
        <div className="space-y-6">
          <ResultCard title="Core Web Vitals explainer">
            <div className="space-y-4">
              {METRICS.map((metric) => (
                <div key={metric.id} className="rounded-2xl border border-gray-200 p-4 dark:border-gray-700">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-semibold text-gray-900 dark:text-gray-100">{metric.short} · {metric.label}</p>
                    <div className="flex gap-1 text-xs font-medium">
                      <span className="rounded-full bg-green-100 px-2 py-1 text-green-700 dark:bg-green-950/40 dark:text-green-300">{metric.good}</span>
                      <span className="rounded-full bg-amber-100 px-2 py-1 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300">{metric.improve}</span>
                      <span className="rounded-full bg-rose-100 px-2 py-1 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300">{metric.poor}</span>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{metric.fix}</p>
                </div>
              ))}
            </div>
          </ResultCard>
          <ResultCard title="Static testing tools directory">
            <div className="space-y-3">
              {TOOLS.map(([name, tests, tier, href]) => (
                <a key={name} href={href} target="_blank" rel="noreferrer" className="block rounded-2xl border border-gray-200 p-4 hover:border-indigo-300 dark:border-gray-700 dark:hover:border-indigo-700">
                  <p className="font-semibold text-gray-900 dark:text-gray-100">{name}</p>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{tests}</p>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{tier}</p>
                </a>
              ))}
            </div>
          </ResultCard>
        </div>

        <div className="space-y-6">
          <ResultCard title="Self-audit checklist">
            <div className="rounded-2xl border border-gray-200 p-4 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-300">{completed}/{allItems.length} optimizations complete</p>
              <div className="mt-3 h-3 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
                <div className="h-full bg-indigo-600" style={{ width: `${completion}%` }} />
              </div>
              <p className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">Score: {level}</p>
            </div>
            <div className="space-y-5">
              {Object.entries(CHECKLIST).map(([section, items]) => (
                <div key={section} className="rounded-2xl border border-gray-200 p-4 dark:border-gray-700">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">{section}</h3>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{countsBySection[section]}/{items.length}</span>
                  </div>
                  <div className="mt-3 space-y-3">
                    {items.map(([id, label, why, how, link]) => (
                      <label key={id} className="block rounded-xl bg-gray-50 p-3 dark:bg-gray-900">
                        <div className="flex items-start gap-3">
                          <input type="checkbox" checked={Boolean(checkedState[id])} onChange={() => toggle(id)} className="mt-1 h-4 w-4 rounded border-gray-300 text-indigo-600" />
                          <div>
                            <p className="font-medium text-gray-900 dark:text-gray-100">{label}</p>
                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">Why it matters: {why}</p>
                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">How to implement: {how} <a href={link} target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline dark:text-indigo-400">Official docs</a></p>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ResultCard>
        </div>
      </div>
    </div>
  )
}
