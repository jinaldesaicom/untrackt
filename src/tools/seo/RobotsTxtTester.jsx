import { useState, useMemo, useCallback } from 'react'
import { Shield, ShieldOff, ChevronDown, Play, RotateCcw, Download as DownloadIcon, Copy, Check, AlertTriangle, CheckCircle2, XCircle, Info, Globe } from 'lucide-react'

// ── Common user agents ──────────────────────────────────────────────────────
const COMMON_AGENTS = [
  { value: 'Googlebot', label: 'Googlebot (Google Search)' },
  { value: 'Googlebot-Image', label: 'Googlebot-Image' },
  { value: 'Googlebot-News', label: 'Googlebot-News' },
  { value: 'Bingbot', label: 'Bingbot (Microsoft)' },
  { value: 'Yandex', label: 'YandexBot' },
  { value: 'Baiduspider', label: 'Baiduspider (Baidu)' },
  { value: 'DuckDuckBot', label: 'DuckDuckBot' },
  { value: 'Applebot', label: 'Applebot (Apple)' },
  { value: 'GPTBot', label: 'GPTBot (OpenAI)' },
  { value: 'ChatGPT-User', label: 'ChatGPT-User (OpenAI)' },
  { value: 'ClaudeBot', label: 'ClaudeBot (Anthropic)' },
  { value: 'Google-Extended', label: 'Google-Extended (AI)' },
  { value: 'Bytespider', label: 'Bytespider (ByteDance)' },
  { value: 'Facebookbot', label: 'Facebookbot (Meta)' },
  { value: '*', label: '* (All bots)' },
]

const SAMPLE_ROBOTS = `# Sample robots.txt
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /private/
Disallow: /tmp/

User-agent: GPTBot
Disallow: /

User-agent: Googlebot
Allow: /
Disallow: /no-google/

Sitemap: https://example.com/sitemap.xml`

// ── Parser (RFC 9309 compliant) ─────────────────────────────────────────────

function parseRobotsTxt(content) {
  const groups = []
  const sitemaps = []
  let currentGroup = null

  for (const rawLine of content.split('\n')) {
    const line = rawLine.replace(/#.*$/, '').trim()
    if (!line) continue

    const match = line.match(/^([\w][\w-]*):\s*(.*)$/i)
    if (!match) continue

    const [, directive, value] = match
    const dir = directive.toLowerCase()
    const val = value.trim()

    if (dir === 'user-agent') {
      if (!currentGroup || currentGroup.rules.length > 0) {
        currentGroup = { agents: [], rules: [], lineStart: rawLine }
        groups.push(currentGroup)
      }
      currentGroup.agents.push(val)
    } else if (dir === 'allow' || dir === 'disallow') {
      if (!currentGroup) {
        currentGroup = { agents: ['*'], rules: [], lineStart: '' }
        groups.push(currentGroup)
      }
      currentGroup.rules.push({ type: dir, path: val, raw: rawLine.trim() })
    } else if (dir === 'sitemap') {
      sitemaps.push(val)
    }
  }

  return { groups, sitemaps }
}

function patternToRegex(pattern) {
  let regexStr = '^'
  for (let i = 0; i < pattern.length; i++) {
    const ch = pattern[i]
    if (ch === '*') {
      regexStr += '.*'
    } else if (ch === '$' && i === pattern.length - 1) {
      regexStr += '$'
    } else {
      regexStr += ch.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    }
  }
  return regexStr
}

function pathMatches(pattern, urlPath) {
  if (!pattern) return false
  try {
    return new RegExp(patternToRegex(pattern)).test(urlPath)
  } catch {
    return urlPath.startsWith(pattern)
  }
}

function testUrlAgainstRobots(groups, userAgent, urlPath) {
  const ua = userAgent.toLowerCase()

  // Find the most specific user-agent group match
  let matchedGroup = null
  let wildcardGroup = null

  for (const group of groups) {
    for (const agent of group.agents) {
      const agentLower = agent.toLowerCase()
      if (agentLower === '*') {
        wildcardGroup = group
      } else if (ua === agentLower || ua.includes(agentLower) || agentLower.includes(ua)) {
        matchedGroup = group
      }
    }
  }

  const group = matchedGroup || wildcardGroup
  if (!group) return { allowed: true, matchedRule: null, matchedGroup: null, reason: 'No matching user-agent group found — URL is allowed by default.' }

  // Find the most specific path match (RFC 9309: longest match wins, Allow beats Disallow on tie)
  let bestRule = null
  let bestLen = -1

  for (const rule of group.rules) {
    if (rule.type === 'disallow' && !rule.path) continue // empty Disallow = allow all
    if (pathMatches(rule.path, urlPath)) {
      const specificity = rule.path.replace(/\*/g, '').length
      if (specificity > bestLen || (specificity === bestLen && rule.type === 'allow')) {
        bestRule = rule
        bestLen = specificity
      }
    }
  }

  if (!bestRule) {
    return { allowed: true, matchedRule: null, matchedGroup: group, reason: 'No path rules match this URL — allowed by default.' }
  }

  const matchedAgentDisplay = matchedGroup
    ? group.agents.find(a => a.toLowerCase() !== '*') || group.agents[0]
    : '* (wildcard)'

  return {
    allowed: bestRule.type === 'allow',
    matchedRule: bestRule,
    matchedGroup: group,
    matchedAgent: matchedAgentDisplay,
    reason: `Matched rule: ${bestRule.type === 'allow' ? 'Allow' : 'Disallow'}: ${bestRule.path || '(empty)'}`,
  }
}

// ── Syntax validation ───────────────────────────────────────────────────────

function validateRobotsTxt(content) {
  const warnings = []
  const lines = content.split('\n')
  let hasUserAgent = false

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].replace(/#.*$/, '').trim()
    if (!line) continue

    const match = line.match(/^([\w][\w-]*):\s*(.*)$/i)
    if (!match) {
      warnings.push({ line: i + 1, text: lines[i].trim(), msg: 'Invalid syntax — expected "Directive: value" format.' })
      continue
    }

    const [, directive, value] = match
    const dir = directive.toLowerCase()
    const val = value.trim()

    const validDirectives = ['user-agent', 'allow', 'disallow', 'sitemap', 'crawl-delay', 'host']
    if (!validDirectives.includes(dir)) {
      warnings.push({ line: i + 1, text: lines[i].trim(), msg: `Unknown directive "${directive}". Common directives: User-agent, Allow, Disallow, Sitemap.` })
    }

    if ((dir === 'allow' || dir === 'disallow') && !hasUserAgent) {
      warnings.push({ line: i + 1, text: lines[i].trim(), msg: `"${directive}" appears before any User-agent directive. Rules must be inside a User-agent group.` })
    }

    if (dir === 'user-agent') {
      hasUserAgent = true
      if (!val) warnings.push({ line: i + 1, text: lines[i].trim(), msg: 'User-agent value is empty.' })
    }

    if (dir === 'disallow' && val && !val.startsWith('/') && !val.startsWith('*')) {
      warnings.push({ line: i + 1, text: lines[i].trim(), msg: 'Disallow path should start with "/" or "*".' })
    }

    if (dir === 'allow' && val && !val.startsWith('/') && !val.startsWith('*')) {
      warnings.push({ line: i + 1, text: lines[i].trim(), msg: 'Allow path should start with "/" or "*".' })
    }
  }

  return warnings
}

// ── Copy button ─────────────────────────────────────────────────────────────
function CopyBtn({ text }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }
  return (
    <button onClick={handleCopy} className="btn-secondary text-xs flex items-center gap-1">
      {copied ? <><Check className="w-3 h-3" /> Copied</> : <><Copy className="w-3 h-3" /> Copy</>}
    </button>
  )
}

// ── Main component ──────────────────────────────────────────────────────────
export default function RobotsTxtTester() {
  const [robotsTxt, setRobotsTxt] = useState('')
  const [testUrl, setTestUrl] = useState('')
  const [userAgent, setUserAgent] = useState('Googlebot')
  const [customAgent, setCustomAgent] = useState('')
  const [fetchUrl, setFetchUrl] = useState('')
  const [fetching, setFetching] = useState(false)
  const [fetchError, setFetchError] = useState('')
  const [testResult, setTestResult] = useState(null)
  const [showDropdown, setShowDropdown] = useState(false)

  const effectiveAgent = userAgent === '__custom__' ? customAgent.trim() : userAgent

  // Parse & validate
  const { groups, sitemaps } = useMemo(() => robotsTxt.trim() ? parseRobotsTxt(robotsTxt) : { groups: [], sitemaps: [] }, [robotsTxt])
  const warnings = useMemo(() => robotsTxt.trim() ? validateRobotsTxt(robotsTxt) : [], [robotsTxt])

  const stats = useMemo(() => {
    const agents = new Set()
    let allowCount = 0
    let disallowCount = 0
    for (const g of groups) {
      g.agents.forEach(a => agents.add(a))
      for (const r of g.rules) {
        if (r.type === 'allow') allowCount++
        else if (r.type === 'disallow' && r.path) disallowCount++
      }
    }
    return { agents: agents.size, allows: allowCount, disallows: disallowCount, sitemaps: sitemaps.length }
  }, [groups, sitemaps])

  // Fetch robots.txt
  const fetchRobotsTxt = useCallback(async () => {
    let base = fetchUrl.trim()
    if (!base) return
    if (!/^https?:\/\//i.test(base)) base = 'https://' + base

    try { new URL(base) } catch { setFetchError('Please enter a valid URL.'); return }

    // Normalize to root + /robots.txt
    const urlObj = new URL(base)
    const robotsUrl = `${urlObj.origin}/robots.txt`

    setFetching(true)
    setFetchError('')

    try {
      const resp = await fetch(robotsUrl)
      if (!resp.ok) {
        if (resp.status === 404) {
          setFetchError(`No robots.txt found at ${urlObj.origin} (404). The site may not have one.`)
        } else {
          setFetchError(`Server returned ${resp.status}. The file may not be accessible.`)
        }
        return
      }
      const contentType = resp.headers.get('content-type') || ''
      const text = await resp.text()

      // Basic sanity check — if it looks like HTML, it's probably not a real robots.txt
      if (contentType.includes('text/html') || text.trimStart().startsWith('<!')) {
        setFetchError('The server returned HTML instead of a robots.txt file. It may be redirecting or the file may not exist.')
        return
      }

      setRobotsTxt(text)
      setTestResult(null)
    } catch {
      setFetchError('Could not fetch robots.txt. The site may block cross-origin requests (CORS). Try copying the file content manually.')
    } finally {
      setFetching(false)
    }
  }, [fetchUrl])

  // Run test
  const runTest = useCallback(() => {
    if (!robotsTxt.trim()) return
    if (!effectiveAgent) return

    let path = testUrl.trim() || '/'
    // If user entered a full URL, extract the path
    if (/^https?:\/\//i.test(path)) {
      try { path = new URL(path).pathname + new URL(path).search } catch { /* keep as-is */ }
    }
    if (!path.startsWith('/')) path = '/' + path

    const result = testUrlAgainstRobots(groups, effectiveAgent, path)
    setTestResult({ ...result, testedPath: path, testedAgent: effectiveAgent })
  }, [robotsTxt, testUrl, effectiveAgent, groups])

  const reset = () => {
    setRobotsTxt('')
    setTestUrl('')
    setFetchUrl('')
    setFetchError('')
    setTestResult(null)
  }

  const loadSample = () => {
    setRobotsTxt(SAMPLE_ROBOTS)
    setTestResult(null)
  }

  // Line numbers for highlight
  const matchingLineIdx = useMemo(() => {
    if (!testResult?.matchedRule?.raw || !robotsTxt) return -1
    const lines = robotsTxt.split('\n')
    return lines.findIndex(l => l.trim() === testResult.matchedRule.raw)
  }, [testResult, robotsTxt])

  return (
    <div className="space-y-5">
      {/* Info banner */}
      <div className="rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 px-4 py-3 text-sm text-blue-700 dark:text-blue-300 flex items-start gap-2">
        <Info className="w-4 h-4 mt-0.5 shrink-0" />
        <p>Test how search engines and bots interpret your robots.txt directives. Parsing follows <a href="https://www.rfc-editor.org/rfc/rfc9309.html" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">RFC 9309</a>. Everything runs in your browser — no data is sent anywhere.</p>
      </div>

      {/* Fetch section */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 space-y-3">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Fetch robots.txt from a website</label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={fetchUrl}
              onChange={e => { setFetchUrl(e.target.value); setFetchError('') }}
              onKeyDown={e => e.key === 'Enter' && !fetching && fetchRobotsTxt()}
              placeholder="example.com"
              className="input-field w-full pl-9"
            />
          </div>
          <button onClick={fetchRobotsTxt} disabled={fetching || !fetchUrl.trim()} className="btn-primary px-4 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
            {fetching ? (
              <><svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg> Fetching...</>
            ) : (
              <><DownloadIcon className="w-4 h-4" /> Fetch</>
            )}
          </button>
        </div>
        {fetchError && (
          <p className="text-xs text-amber-600 dark:text-amber-400 flex items-start gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
            {fetchError}
          </p>
        )}
        <p className="text-xs text-gray-400">Or paste your robots.txt content below. <button onClick={loadSample} className="text-indigo-500 hover:underline">Load sample</button></p>
      </div>

      {/* robots.txt editor */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-100 dark:border-gray-800">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-200">robots.txt</span>
          <div className="flex items-center gap-2">
            {robotsTxt.trim() && <CopyBtn text={robotsTxt} />}
            {robotsTxt.trim() && (
              <button onClick={reset} className="btn-secondary text-xs flex items-center gap-1">
                <RotateCcw className="w-3 h-3" /> Clear
              </button>
            )}
          </div>
        </div>
        <div className="relative">
          <textarea
            value={robotsTxt}
            onChange={e => { setRobotsTxt(e.target.value); setTestResult(null) }}
            placeholder={`Paste your robots.txt content here...\n\nUser-agent: *\nDisallow: /admin/\nAllow: /`}
            rows={14}
            spellCheck={false}
            className="textarea-field w-full font-mono text-sm resize-y rounded-none border-0 focus:ring-0"
          />
        </div>
      </div>

      {/* Stats bar */}
      {robotsTxt.trim() && (
        <div className="flex flex-wrap gap-3">
          <span className="text-xs px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
            {stats.agents} user-agent{stats.agents !== 1 ? 's' : ''}
          </span>
          <span className="text-xs px-2.5 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
            {stats.allows} allow rule{stats.allows !== 1 ? 's' : ''}
          </span>
          <span className="text-xs px-2.5 py-1 rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400">
            {stats.disallows} disallow rule{stats.disallows !== 1 ? 's' : ''}
          </span>
          {stats.sitemaps > 0 && (
            <span className="text-xs px-2.5 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400">
              {stats.sitemaps} sitemap{stats.sitemaps !== 1 ? 's' : ''}
            </span>
          )}
        </div>
      )}

      {/* Warnings */}
      {warnings.length > 0 && (
        <div className="rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 p-4 space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium text-amber-700 dark:text-amber-400">
            <AlertTriangle className="w-4 h-4" />
            Syntax Warnings ({warnings.length})
          </div>
          <div className="space-y-1.5 max-h-40 overflow-y-auto">
            {warnings.map((w, i) => (
              <div key={i} className="text-xs text-amber-600 dark:text-amber-400">
                <span className="font-mono text-amber-500">Line {w.line}:</span> {w.msg}
                {w.text && <span className="block font-mono text-amber-400/70 truncate ml-4">→ {w.text}</span>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Test section */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 space-y-4">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-200">Test a URL</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">URL path to test</label>
            <input
              type="text"
              value={testUrl}
              onChange={e => setTestUrl(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && runTest()}
              placeholder="/admin/dashboard or https://example.com/page"
              className="input-field w-full"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">User-Agent</label>
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="input-field w-full text-left flex items-center justify-between"
              >
                <span className={effectiveAgent ? 'text-gray-900 dark:text-white' : 'text-gray-400'}>
                  {userAgent === '__custom__' ? (customAgent || 'Enter custom agent...') : userAgent}
                </span>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
              </button>
              {showDropdown && (
                <div className="absolute z-20 mt-1 w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-lg max-h-60 overflow-y-auto">
                  {COMMON_AGENTS.map(a => (
                    <button
                      key={a.value}
                      onClick={() => { setUserAgent(a.value); setShowDropdown(false) }}
                      className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-800 ${userAgent === a.value ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 font-medium' : 'text-gray-700 dark:text-gray-300'}`}
                    >
                      <span className="font-mono text-xs">{a.value}</span>
                      <span className="text-gray-400 ml-2 text-xs">{a.label !== a.value ? a.label.replace(a.value + ' ', '') : ''}</span>
                    </button>
                  ))}
                  <button
                    onClick={() => { setUserAgent('__custom__'); setShowDropdown(false) }}
                    className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-800 border-t border-gray-100 dark:border-gray-800 ${userAgent === '__custom__' ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 font-medium' : 'text-gray-700 dark:text-gray-300'}`}
                  >
                    Custom user-agent...
                  </button>
                </div>
              )}
            </div>
            {userAgent === '__custom__' && (
              <input
                type="text"
                value={customAgent}
                onChange={e => setCustomAgent(e.target.value)}
                placeholder="MyCustomBot"
                className="input-field w-full mt-2"
                autoFocus
              />
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={runTest}
            disabled={!robotsTxt.trim() || !effectiveAgent}
            className="btn-primary px-5 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Play className="w-4 h-4" /> Test
          </button>
          {testResult && (
            <button onClick={() => setTestResult(null)} className="btn-secondary text-sm flex items-center gap-1.5">
              <RotateCcw className="w-3.5 h-3.5" /> Clear Result
            </button>
          )}
        </div>
      </div>

      {/* Result */}
      {testResult && (
        <div className={`rounded-xl border-2 p-5 ${testResult.allowed ? 'border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/20' : 'border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20'}`}>
          <div className="flex items-start gap-4">
            <div className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 ${testResult.allowed ? 'bg-green-100 dark:bg-green-800/40' : 'bg-red-100 dark:bg-red-800/40'}`}>
              {testResult.allowed
                ? <CheckCircle2 className="w-7 h-7 text-green-600 dark:text-green-400" />
                : <XCircle className="w-7 h-7 text-red-600 dark:text-red-400" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-lg font-bold ${testResult.allowed ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>
                  {testResult.allowed ? 'ALLOWED' : 'BLOCKED'}
                </span>
                {testResult.allowed
                  ? <Shield className="w-5 h-5 text-green-500" />
                  : <ShieldOff className="w-5 h-5 text-red-500" />}
              </div>
              <div className="space-y-1.5">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-medium">URL:</span>{' '}
                  <code className="font-mono text-xs bg-white/60 dark:bg-black/20 px-1.5 py-0.5 rounded">{testResult.testedPath}</code>
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-medium">User-Agent:</span>{' '}
                  <code className="font-mono text-xs bg-white/60 dark:bg-black/20 px-1.5 py-0.5 rounded">{testResult.testedAgent}</code>
                  {testResult.matchedAgent && testResult.matchedAgent !== testResult.testedAgent && (
                    <span className="text-xs text-gray-500 ml-2">(matched group: {testResult.matchedAgent})</span>
                  )}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{testResult.reason}</p>
                {testResult.matchedRule && matchingLineIdx >= 0 && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Matching line {matchingLineIdx + 1}: <code className="font-mono bg-white/60 dark:bg-black/20 px-1.5 py-0.5 rounded">{testResult.matchedRule.raw}</code>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Batch test */}
      <BatchTester groups={groups} />

      {/* Empty state */}
      {!robotsTxt.trim() && !testResult && (
        <div className="rounded-xl border border-dashed border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/30 p-8 text-center">
          <Shield className="w-10 h-10 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
          <p className="text-sm text-gray-500 dark:text-gray-400">Fetch a website&apos;s robots.txt or paste one above to start testing.</p>
          <button onClick={loadSample} className="mt-3 text-sm text-indigo-500 hover:underline">Load a sample robots.txt</button>
        </div>
      )}
    </div>
  )
}

// ── Batch tester sub-component ──────────────────────────────────────────────
function BatchTester({ groups }) {
  const [open, setOpen] = useState(false)
  const [batchInput, setBatchInput] = useState('')
  const [batchResults, setBatchResults] = useState(null)

  const runBatch = () => {
    if (!batchInput.trim() || groups.length === 0) return

    const lines = batchInput.split('\n').filter(l => l.trim())
    const results = lines.map(line => {
      const parts = line.split(',').map(s => s.trim())
      const urlPath = parts[0] || '/'
      const agent = parts[1] || 'Googlebot'

      let path = urlPath
      if (/^https?:\/\//i.test(path)) {
        try { path = new URL(path).pathname + new URL(path).search } catch { /* keep as-is */ }
      }
      if (!path.startsWith('/')) path = '/' + path

      const result = testUrlAgainstRobots(groups, agent, path)
      return { url: path, agent, ...result }
    })

    setBatchResults(results)
  }

  if (groups.length === 0) return null

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Batch Test</span>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="px-4 pb-4 space-y-3 border-t border-gray-100 dark:border-gray-800">
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">Enter one URL per line. Optionally add a comma and user-agent. Default agent: Googlebot.</p>
          <textarea
            value={batchInput}
            onChange={e => setBatchInput(e.target.value)}
            placeholder={`/admin/\n/public/page.html, GPTBot\n/private/secret, Bingbot\nhttps://example.com/blog`}
            rows={5}
            spellCheck={false}
            className="textarea-field w-full font-mono text-sm resize-y"
          />
          <button onClick={runBatch} disabled={!batchInput.trim()} className="btn-primary text-sm px-4 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
            <Play className="w-3.5 h-3.5" /> Run Batch Test
          </button>

          {batchResults && (
            <div className="space-y-1.5 mt-2">
              {batchResults.map((r, i) => (
                <div key={i} className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm ${r.allowed ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'}`}>
                  {r.allowed
                    ? <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                    : <XCircle className="w-4 h-4 text-red-500 shrink-0" />}
                  <code className="font-mono text-xs flex-1 truncate">{r.url}</code>
                  <span className="text-xs text-gray-400 shrink-0">{r.agent}</span>
                  <span className={`text-xs font-medium shrink-0 ${r.allowed ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {r.allowed ? 'Allowed' : 'Blocked'}
                  </span>
                </div>
              ))}
              <p className="text-xs text-gray-400 mt-1">
                {batchResults.filter(r => r.allowed).length} allowed, {batchResults.filter(r => !r.allowed).length} blocked out of {batchResults.length}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
