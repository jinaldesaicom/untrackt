import { useState, useCallback } from 'react'
import { getItem, setItem } from '../../utils/storage'
import { Zap, Monitor, Smartphone, AlertTriangle, CheckCircle2, XCircle, ChevronDown, ChevronRight, ExternalLink, Info, RotateCcw, Key, Eye, EyeOff } from 'lucide-react'

// ── Checklist data ──────────────────────────────────────────────────────────
const CATEGORIES = [
  {
    name: 'Core Web Vitals',
    items: [
      { id: 'lcp-images', label: 'Optimize Largest Contentful Paint (LCP) images', tip: 'Preload hero images, use appropriate formats (WebP/AVIF), set explicit width/height.' },
      { id: 'cls-layout', label: 'Minimize Cumulative Layout Shift (CLS)', tip: 'Set explicit dimensions on images/videos, avoid dynamically injected content above the fold.' },
      { id: 'fid-js', label: 'Reduce First Input Delay (FID) / Interaction to Next Paint (INP)', tip: 'Break long JS tasks, defer non-critical scripts, use web workers for heavy computation.' }
    ]
  },
  {
    name: 'Images & Media',
    items: [
      { id: 'img-format', label: 'Use modern image formats (WebP, AVIF)', tip: 'Convert PNG/JPEG to WebP or AVIF. Use <picture> with fallbacks.' },
      { id: 'img-lazy', label: 'Lazy-load below-fold images', tip: 'Add loading="lazy" to images below the fold. Don\'t lazy-load LCP images.' },
      { id: 'img-dimensions', label: 'Set explicit width/height on images', tip: 'Prevents layout shift. Use CSS aspect-ratio as alternative.' },
      { id: 'img-responsive', label: 'Serve responsive images (srcset)', tip: 'Provide multiple resolutions with srcset and sizes attributes.' },
      { id: 'video-poster', label: 'Add poster frames to videos', tip: 'Speeds up perceived load and improves LCP if video is hero.' }
    ]
  },
  {
    name: 'JavaScript',
    items: [
      { id: 'js-defer', label: 'Defer non-critical JavaScript', tip: 'Use defer or async attributes. Move non-essential scripts below the fold.' },
      { id: 'js-minify', label: 'Minify and compress JavaScript', tip: 'Use Terser/esbuild for minification. Enable gzip/Brotli compression.' },
      { id: 'js-split', label: 'Code-split and tree-shake', tip: 'Use dynamic imports for route-based splitting. Remove unused code.' },
      { id: 'js-third-party', label: 'Audit third-party scripts', tip: 'Remove unused trackers/widgets. Load third-party scripts after page load.' }
    ]
  },
  {
    name: 'CSS',
    items: [
      { id: 'css-critical', label: 'Inline critical CSS', tip: 'Extract above-fold CSS and inline it in <head>. Load rest asynchronously.' },
      { id: 'css-minify', label: 'Minify CSS and remove unused rules', tip: 'Use PurgeCSS or similar. Minify with cssnano.' },
      { id: 'css-fonts', label: 'Optimize web font loading', tip: 'Use font-display: swap, preload key fonts, subset to needed characters.' }
    ]
  },
  {
    name: 'Server & Network',
    items: [
      { id: 'server-compression', label: 'Enable Brotli/gzip compression', tip: 'Brotli gives ~15-20% better compression than gzip for text files.' },
      { id: 'server-cache', label: 'Set proper cache headers', tip: 'Static assets: Cache-Control: max-age=31536000, immutable. HTML: short TTL or no-cache.' },
      { id: 'server-cdn', label: 'Use a CDN for static assets', tip: 'Reduces latency by serving from edge locations near users.' },
      { id: 'server-http2', label: 'Enable HTTP/2 or HTTP/3', tip: 'Multiplexing, header compression, and server push improve load times.' },
      { id: 'server-preconnect', label: 'Preconnect to required origins', tip: 'Add <link rel="preconnect"> for critical third-party domains.' }
    ]
  },
  {
    name: 'HTML & Rendering',
    items: [
      { id: 'html-minify', label: 'Minify HTML', tip: 'Remove comments, whitespace. Most build tools handle this automatically.' },
      { id: 'html-preload', label: 'Preload critical resources', tip: 'Use <link rel="preload"> for fonts, hero images, critical JS/CSS.' },
      { id: 'html-ssr', label: 'Consider SSR/SSG for SPA content', tip: 'Server-side rendering improves Time to First Byte and crawlability.' },
      { id: 'html-meta-viewport', label: 'Include viewport meta tag', tip: 'Required for mobile rendering: <meta name="viewport" content="width=device-width, initial-scale=1">' }
    ]
  }
]

const STORAGE_KEY = 'untrackt_pagespeed_checks'

// ── Helpers ─────────────────────────────────────────────────────────────────
function scoreColor(score) {
  if (score >= 90) return { ring: 'text-green-500', label: 'text-green-700 dark:text-green-400' }
  if (score >= 50) return { ring: 'text-amber-500', label: 'text-amber-700 dark:text-amber-400' }
  return { ring: 'text-red-500', label: 'text-red-700 dark:text-red-400' }
}

function scoreLabel(score) {
  if (score >= 90) return 'Good'
  if (score >= 50) return 'Needs Work'
  return 'Poor'
}

function formatMs(ms) {
  if (ms >= 1000) return `${(ms / 1000).toFixed(1)} s`
  return `${Math.round(ms)} ms`
}

function metricRating(id, value) {
  const thresholds = {
    'first-contentful-paint': [1800, 3000],
    'largest-contentful-paint': [2500, 4000],
    'total-blocking-time': [200, 600],
    'cumulative-layout-shift': [0.1, 0.25],
    'speed-index': [3400, 5800],
    'interactive': [3800, 7300],
  }
  const t = thresholds[id]
  if (!t) return 'average'
  if (value <= t[0]) return 'good'
  if (value <= t[1]) return 'average'
  return 'poor'
}

function ratingColor(rating) {
  if (rating === 'good') return 'text-green-600 dark:text-green-400'
  if (rating === 'average') return 'text-amber-600 dark:text-amber-400'
  return 'text-red-600 dark:text-red-400'
}

function ratingBg(rating) {
  if (rating === 'good') return 'bg-green-100 dark:bg-green-900/30'
  if (rating === 'average') return 'bg-amber-100 dark:bg-amber-900/30'
  return 'bg-red-100 dark:bg-red-900/30'
}

function ratingDot(rating) {
  if (rating === 'good') return 'bg-green-500'
  if (rating === 'average') return 'bg-amber-500'
  return 'bg-red-500'
}

// ── Score Ring ───────────────────────────────────────────────────────────────
function ScoreRing({ score, size = 120 }) {
  const s = Math.round(score * 100)
  const radius = (size - 12) / 2
  const circ = 2 * Math.PI * radius
  const offset = circ - (s / 100) * circ
  const c = scoreColor(s)

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="absolute transform -rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="currentColor" strokeWidth="8" fill="none" className="text-gray-200 dark:text-gray-700" />
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="currentColor" strokeWidth="8" fill="none" strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" className={`${c.ring} transition-all duration-700`} />
      </svg>
      <div className="flex flex-col items-center">
        <span className={`text-3xl font-bold ${c.label}`}>{s}</span>
        <span className="text-xs text-gray-500 dark:text-gray-400">{scoreLabel(s)}</span>
      </div>
    </div>
  )
}

// ── Metric card ─────────────────────────────────────────────────────────────
function MetricCard({ label, value, displayValue, id }) {
  const rating = metricRating(id, value)
  return (
    <div className={`rounded-xl border border-gray-200 dark:border-gray-700 p-3 text-center ${ratingBg(rating)}`}>
      <div className="flex items-center justify-center gap-1.5 mb-1">
        <span className={`w-2 h-2 rounded-full ${ratingDot(rating)}`} />
        <span className="text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wide">{label}</span>
      </div>
      <p className={`text-xl font-bold ${ratingColor(rating)}`}>{displayValue}</p>
    </div>
  )
}

// ── Audit Item ──────────────────────────────────────────────────────────────
function AuditItem({ audit }) {
  const [open, setOpen] = useState(false)
  const impact = audit.score === null ? 'info' : audit.score >= 0.9 ? 'pass' : audit.score >= 0.5 ? 'average' : 'fail'

  const Icon = impact === 'pass' ? CheckCircle2 : impact === 'fail' ? XCircle : impact === 'average' ? AlertTriangle : Info
  const iconColor = impact === 'pass' ? 'text-green-500' : impact === 'fail' ? 'text-red-500' : impact === 'average' ? 'text-amber-500' : 'text-blue-500'

  return (
    <div className="rounded-lg border border-gray-100 dark:border-gray-800">
      <button onClick={() => setOpen(!open)} className="w-full flex items-start gap-3 px-3 py-2.5 text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg">
        <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${iconColor}`} />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{audit.title}</p>
          {audit.displayValue && <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{audit.displayValue}</p>}
        </div>
        {open ? <ChevronDown className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" /> : <ChevronRight className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />}
      </button>
      {open && audit.description && (
        <div className="px-3 pb-3 ml-7">
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{audit.description.replace(/\[.*?\]\(.*?\)/g, '').replace(/`/g, '')}</p>
        </div>
      )}
    </div>
  )
}

// ── Main Component ──────────────────────────────────────────────────────────
export default function PageSpeedRecommendations() {
  const [url, setUrl] = useState('')
  const [strategy, setStrategy] = useState('mobile')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)
  const [tab, setTab] = useState('analyzer')
  const [apiKey, setApiKey] = useState(() => getItem('untrackt_psi_api_key', ''))
  const [showApiKey, setShowApiKey] = useState(false)
  const [showApiKeyInput, setShowApiKeyInput] = useState(false)

  const saveApiKey = (val) => {
    setApiKey(val)
    setItem('untrackt_psi_api_key', val)
  }

  // Checklist state
  const [checked, setChecked] = useState(() => getItem(STORAGE_KEY, {}))
  const [expandedCat, setExpandedCat] = useState(null)

  const toggleCheck = (id) => {
    const next = { ...checked, [id]: !checked[id] }
    setChecked(next)
    setItem(STORAGE_KEY, next)
  }

  const resetChecklist = () => {
    setChecked({})
    setItem(STORAGE_KEY, {})
  }

  const allItems = CATEGORIES.flatMap(c => c.items)
  const totalChecked = allItems.filter(i => checked[i.id]).length
  const pct = allItems.length > 0 ? Math.round((totalChecked / allItems.length) * 100) : 0

  const analyze = useCallback(async () => {
    let testUrl = url.trim()
    if (!testUrl) return
    if (!/^https?:\/\//i.test(testUrl)) testUrl = 'https://' + testUrl

    try { new URL(testUrl) } catch { setError('Please enter a valid URL.'); return }

    setLoading(true)
    setError('')
    setResult(null)

    try {
      const keyParam = apiKey.trim() ? `&key=${encodeURIComponent(apiKey.trim())}` : ''
      const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(testUrl)}&strategy=${strategy}&category=performance${keyParam}`
      const resp = await fetch(apiUrl)
      if (!resp.ok) {
        const body = await resp.json().catch(() => ({}))
        const apiMsg = body?.error?.message || ''
        if (resp.status === 429 || apiMsg.toLowerCase().includes('quota')) {
          throw { type: 'quota' }
        }
        if (resp.status === 500) {
          throw { type: 'server', url: testUrl }
        }
        throw new Error(apiMsg || `API returned ${resp.status}`)
      }
      const data = await resp.json()
      setResult(data)
    } catch (err) {
      if (err?.type === 'quota') {
        setError(apiKey.trim()
          ? 'API quota exceeded even with your key. Your key may be invalid or its daily limit is reached. Check your key in the Google API Console.'
          : 'Google\'s shared API quota has been exceeded. Add your own free API key below to get 25,000 queries/day.')
        setShowApiKeyInput(true)
      } else if (err?.type === 'server') {
        setError(`Google\'s Lighthouse couldn\'t analyze ${err.url}. The site may be unreachable, too slow, or blocking crawlers. Try again in a minute, or test a different URL.`)
      } else {
        setError(err.message || 'Failed to analyze. Please check the URL and try again.')
      }
    } finally {
      setLoading(false)
    }
  }, [url, strategy, apiKey])

  // Extract results
  const lhr = result?.lighthouseResult
  const perfScore = lhr?.categories?.performance?.score
  const audits = lhr?.audits || {}

  const metrics = [
    { id: 'first-contentful-paint', key: 'first-contentful-paint', label: 'FCP', format: v => formatMs(v) },
    { id: 'largest-contentful-paint', key: 'largest-contentful-paint', label: 'LCP', format: v => formatMs(v) },
    { id: 'total-blocking-time', key: 'total-blocking-time', label: 'TBT', format: v => formatMs(v) },
    { id: 'cumulative-layout-shift', key: 'cumulative-layout-shift', label: 'CLS', format: v => v.toFixed(3) },
    { id: 'speed-index', key: 'speed-index', label: 'Speed Index', format: v => formatMs(v) },
    { id: 'interactive', key: 'interactive', label: 'TTI', format: v => formatMs(v) },
  ]

  const opportunities = Object.values(audits).filter(a =>
    a.details?.type === 'opportunity' && a.score !== null && a.score < 0.9
  ).sort((a, b) => (a.score || 0) - (b.score || 0))

  const diagnostics = Object.values(audits).filter(a =>
    a.details?.type === 'table' && a.score !== null && a.score < 0.9 &&
    !opportunities.find(o => o.id === a.id)
  ).sort((a, b) => (a.score || 0) - (b.score || 0))

  const passed = Object.values(audits).filter(a =>
    a.score !== null && a.score >= 0.9 && a.group
  )

  return (
    <div className="space-y-5">
      {/* Tab switcher */}
      <div className="flex gap-1 p-1 rounded-xl bg-gray-100 dark:bg-gray-800">
        <button onClick={() => setTab('analyzer')} className={`flex-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${tab === 'analyzer' ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}>
          <span className="flex items-center justify-center gap-2"><Zap className="w-4 h-4" /> Live Analysis</span>
        </button>
        <button onClick={() => setTab('checklist')} className={`flex-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${tab === 'checklist' ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}>
          <span className="flex items-center justify-center gap-2"><CheckCircle2 className="w-4 h-4" /> Optimization Checklist</span>
        </button>
      </div>

      {tab === 'analyzer' && (
        <>
          {/* Privacy notice */}
          <div className="rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 px-4 py-3 text-sm text-blue-700 dark:text-blue-300 flex items-start gap-2">
            <Info className="w-4 h-4 mt-0.5 shrink-0" />
            <p>This tool calls Google&apos;s free PageSpeed Insights API directly from your browser. No data is sent to or stored by UnTrackt. <a href="https://developers.google.com/speed/docs/insights/v5/about" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">Learn more</a></p>
          </div>

          {/* API Key section */}
          <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
            <button onClick={() => setShowApiKeyInput(!showApiKeyInput)} className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
              <div className="flex items-center gap-2">
                <Key className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">API Key</span>
                {apiKey.trim() && <span className="text-xs px-1.5 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">Active</span>}
                {!apiKey.trim() && <span className="text-xs text-gray-400">Optional — avoids shared quota limits</span>}
              </div>
              {showApiKeyInput ? <ChevronDown className="w-4 h-4 text-gray-400" /> : <ChevronRight className="w-4 h-4 text-gray-400" />}
            </button>
            {showApiKeyInput && (
              <div className="px-4 pb-3 space-y-2">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type={showApiKey ? 'text' : 'password'}
                      value={apiKey}
                      onChange={e => saveApiKey(e.target.value)}
                      placeholder="Paste your Google API key here"
                      className="input-field w-full pr-10"
                    />
                    <button onClick={() => setShowApiKey(!showApiKey)} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                      {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {apiKey.trim() && <button onClick={() => saveApiKey('')} className="btn-secondary text-xs px-3">Clear</button>}
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Get a free key: <a href="https://developers.google.com/speed/docs/insights/v5/get-started#APIKey" target="_blank" rel="noopener noreferrer" className="text-indigo-500 hover:underline">Google API Console</a> → Create project → Enable PageSpeed Insights API → Create API key. Gives you 25,000 queries/day. Your key is stored only in your browser&apos;s local storage.
                </p>
              </div>
            )}
          </div>

          {/* URL Input */}
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">Website URL</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={url}
                  onChange={e => setUrl(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && !loading && analyze()}
                  placeholder="https://example.com"
                  className="input-field flex-1"
                />
                <button
                  onClick={analyze}
                  disabled={loading || !url.trim()}
                  className="btn-primary px-5 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <><svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg> Analyzing...</>
                  ) : (
                    <><Zap className="w-4 h-4" /> Analyze</>
                  )}
                </button>
              </div>
            </div>

            <div className="flex gap-2">
              <button onClick={() => setStrategy('mobile')} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${strategy === 'mobile' ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800' : 'text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'}`}>
                <Smartphone className="w-3.5 h-3.5" /> Mobile
              </button>
              <button onClick={() => setStrategy('desktop')} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${strategy === 'desktop' ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800' : 'text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'}`}>
                <Monitor className="w-3.5 h-3.5" /> Desktop
              </button>
            </div>
          </div>

          {/* Loading skeleton */}
          {loading && (
            <div className="space-y-4">
              <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 flex flex-col items-center gap-3">
                <div className="w-28 h-28 rounded-full border-4 border-gray-200 dark:border-gray-700 animate-pulse" />
                <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                <p className="text-sm text-gray-500 dark:text-gray-400">Analyzing with Google Lighthouse... This can take 15–30 seconds.</p>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="h-20 rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse" />)}
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 px-4 py-3 text-sm text-red-700 dark:text-red-300 flex items-start gap-2">
              <XCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <p>{error}</p>
            </div>
          )}

          {/* Results */}
          {result && !loading && lhr && (
            <div className="space-y-5">
              {/* Performance Score */}
              <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <ScoreRing score={perfScore} />
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Performance Score</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Tested on <span className="font-medium">{strategy === 'mobile' ? 'Mobile' : 'Desktop'}</span> via Google Lighthouse
                    </p>
                    {lhr.finalUrl && (
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 truncate">{lhr.finalUrl}</p>
                    )}
                    <div className="flex flex-wrap gap-3 mt-3 justify-center sm:justify-start">
                      <span className="flex items-center gap-1.5 text-xs text-gray-500"><span className="w-2.5 h-2.5 rounded-full bg-green-500" /> 90–100 Good</span>
                      <span className="flex items-center gap-1.5 text-xs text-gray-500"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> 50–89 Needs Work</span>
                      <span className="flex items-center gap-1.5 text-xs text-gray-500"><span className="w-2.5 h-2.5 rounded-full bg-red-500" /> 0–49 Poor</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Core Web Vitals Metrics */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Core Metrics</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  {metrics.map(m => {
                    const a = audits[m.key]
                    if (!a) return null
                    return (
                      <MetricCard
                        key={m.id}
                        id={m.id}
                        label={m.label}
                        value={a.numericValue || 0}
                        displayValue={m.format(a.numericValue || 0)}
                      />
                    )
                  })}
                </div>
              </div>

              {/* Metric legend */}
              <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 px-4 py-3">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2 text-xs text-gray-500 dark:text-gray-400">
                  <div><span className="font-medium text-gray-700 dark:text-gray-300">FCP</span> — First Contentful Paint</div>
                  <div><span className="font-medium text-gray-700 dark:text-gray-300">LCP</span> — Largest Contentful Paint</div>
                  <div><span className="font-medium text-gray-700 dark:text-gray-300">TBT</span> — Total Blocking Time</div>
                  <div><span className="font-medium text-gray-700 dark:text-gray-300">CLS</span> — Cumulative Layout Shift</div>
                  <div><span className="font-medium text-gray-700 dark:text-gray-300">SI</span> — Speed Index</div>
                  <div><span className="font-medium text-gray-700 dark:text-gray-300">TTI</span> — Time to Interactive</div>
                </div>
              </div>

              {/* Opportunities */}
              {opportunities.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Opportunities</h3>
                    <span className="text-xs text-gray-400">({opportunities.length} items that could improve load time)</span>
                  </div>
                  <div className="space-y-1">
                    {opportunities.map(a => <AuditItem key={a.id} audit={a} />)}
                  </div>
                </div>
              )}

              {/* Diagnostics */}
              {diagnostics.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Info className="w-4 h-4 text-blue-500" />
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Diagnostics</h3>
                    <span className="text-xs text-gray-400">({diagnostics.length} additional insights)</span>
                  </div>
                  <div className="space-y-1">
                    {diagnostics.map(a => <AuditItem key={a.id} audit={a} />)}
                  </div>
                </div>
              )}

              {/* Passed audits */}
              {passed.length > 0 && (
                <details className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                  <summary className="flex items-center gap-2 px-4 py-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 text-sm font-medium text-gray-700 dark:text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    Passed Audits ({passed.length})
                  </summary>
                  <div className="px-4 pb-3 space-y-1">
                    {passed.map(a => (
                      <div key={a.id} className="flex items-center gap-2 py-1.5 text-sm text-gray-600 dark:text-gray-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-400 shrink-0" />
                        {a.title}
                      </div>
                    ))}
                  </div>
                </details>
              )}

              {/* Full report link */}
              <div className="text-center">
                <a
                  href={`https://pagespeed.web.dev/analysis?url=${encodeURIComponent(lhr.finalUrl || url)}&form_factor=${strategy}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  View full report on PageSpeed Insights <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}

          {/* Empty state */}
          {!result && !loading && !error && (
            <div className="rounded-xl border border-dashed border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/30 p-8 text-center">
              <Zap className="w-10 h-10 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
              <p className="text-sm text-gray-500 dark:text-gray-400">Enter a URL above and click <strong>Analyze</strong> to get real Lighthouse performance scores, Core Web Vitals, and actionable recommendations.</p>
            </div>
          )}
        </>
      )}

      {tab === 'checklist' && (
        <>
          <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-200">Optimization Progress</p>
                <p className="text-xs text-gray-500">{totalChecked} of {allItems.length} recommendations completed</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{pct}%</span>
                <button onClick={resetChecklist} className="btn-secondary text-xs flex items-center gap-1"><RotateCcw className="w-3 h-3" /> Reset</button>
              </div>
            </div>
            <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-500 rounded-full transition-all duration-300" style={{ width: `${pct}%` }} />
            </div>
          </div>

          <div className="space-y-3">
            {CATEGORIES.map((cat) => {
              const catChecked = cat.items.filter(i => checked[i.id]).length
              const isExpanded = expandedCat === cat.name
              return (
                <div key={cat.name} className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
                  <button onClick={() => setExpandedCat(isExpanded ? null : cat.name)} className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{cat.name}</span>
                      <span className={`text-xs px-1.5 py-0.5 rounded-full ${catChecked === cat.items.length ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'text-gray-400'}`}>
                        {catChecked}/{cat.items.length}
                      </span>
                    </div>
                    {isExpanded ? <ChevronDown className="w-4 h-4 text-gray-400" /> : <ChevronRight className="w-4 h-4 text-gray-400" />}
                  </button>
                  {isExpanded && (
                    <div className="px-4 pb-3 space-y-2">
                      {cat.items.map(item => (
                        <label key={item.id} className="flex items-start gap-3 group cursor-pointer">
                          <input type="checkbox" checked={!!checked[item.id]} onChange={() => toggleCheck(item.id)} className="mt-0.5 rounded border-gray-300 dark:border-gray-600 text-indigo-600 focus:ring-indigo-500" />
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm ${checked[item.id] ? 'line-through text-gray-400' : 'text-gray-700 dark:text-gray-200'}`}>{item.label}</p>
                            <p className="text-xs text-gray-400 mt-0.5">{item.tip}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}
