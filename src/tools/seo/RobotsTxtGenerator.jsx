import { useState, useMemo, useCallback } from 'react'
import { Copy, Check, Download, Plus, Trash2, ChevronDown, ChevronRight, Shield, ShieldOff, Bot, Globe } from 'lucide-react'

const AI_BOTS = [
  { group: 'OpenAI', bots: [
    { agent: 'GPTBot', desc: 'Web crawler for training GPT models. Blocking also blocks ChatGPT-User.' },
    { agent: 'OAI-SearchBot', desc: 'Indexes web content for OpenAI\'s search features.' },
  ]},
  { group: 'Anthropic', bots: [
    { agent: 'ClaudeBot', desc: 'Crawls content for training Claude AI models.' },
    { agent: 'Claude-User', desc: 'Crawls based on user-requested tasks in Claude.' },
    { agent: 'Claude-SearchBot', desc: 'Used for Anthropic\'s web search capabilities.' },
  ]},
  { group: 'Google', bots: [
    { agent: 'Google-Extended', desc: 'Controls content usage in Google\'s generative AI. Does not affect search indexing.' },
    { agent: 'Google-CloudVertexBot', desc: 'Crawls for Google Cloud Vertex AI platform.' },
  ]},
  { group: 'Apple', bots: [
    { agent: 'Applebot-Extended', desc: 'Controls content usage in Apple Intelligence & AI features.' },
  ]},
  { group: 'Meta', bots: [
    { agent: 'Facebookbot', desc: 'Meta\'s crawler for link previews & AI training.' },
    { agent: 'Meta-ExternalAgent', desc: 'Meta crawler for indexing content & training AI.' },
    { agent: 'Meta-ExternalFetcher', desc: 'Fetches external content for Meta products.' },
  ]},
  { group: 'ByteDance / TikTok', bots: [
    { agent: 'Bytespider', desc: 'ByteDance\'s main web crawler for AI applications.' },
    { agent: 'TikTokSpider', desc: 'TikTok\'s crawler for content recommendation systems.' },
  ]},
  { group: 'Amazon', bots: [
    { agent: 'Amazonbot', desc: 'Amazon\'s crawler for search, recommendations & AI.' },
  ]},
  { group: 'Perplexity AI', bots: [
    { agent: 'PerplexityBot', desc: 'Collects data for Perplexity\'s AI search engine.' },
    { agent: 'Perplexity-User', desc: 'Crawls based on user requests. May ignore robots.txt.' },
  ]},
  { group: 'Common Crawl', bots: [
    { agent: 'CCBot', desc: 'Maintains open web crawl data used by many AI/LLM models.' },
  ]},
  { group: 'Cohere', bots: [
    { agent: 'cohere-ai', desc: 'Gathers data for Cohere\'s NLP language models.' },
    { agent: 'cohere-training-data-crawler', desc: 'Collects training data for Cohere\'s models.' },
  ]},
  { group: 'Diffbot', bots: [
    { agent: 'diffbot', desc: 'AI-powered web scraping and data extraction service.' },
  ]},
  { group: 'Huawei', bots: [
    { agent: 'Petalbot', desc: 'Huawei\'s Petal Search crawler for AI-driven search.' },
    { agent: 'PanguBot', desc: 'Crawls content for Huawei\'s PanGu multimodal LLM.' },
  ]},
  { group: 'DuckDuckGo', bots: [
    { agent: 'DuckAssistBot', desc: 'Powers DuckAssist AI-generated answers.' },
  ]},
  { group: 'Semrush', bots: [
    { agent: 'SemrushBot-OCOB', desc: 'ContentShake AI tool for content analysis.' },
  ]},
  { group: 'Omgili / Webz.io', bots: [
    { agent: 'Omgili', desc: 'Web monitoring and trend analysis service.' },
    { agent: 'Omgilibot', desc: 'Legacy Omgili crawler.' },
    { agent: 'webzio-extended', desc: 'Omgili\'s newer AI training crawler.' },
  ]},
  { group: 'Awario', bots: [
    { agent: 'AwarioBot', desc: 'Social listening and brand monitoring crawler.' },
    { agent: 'AwarioSmartBot', desc: 'Deeper analysis for AI-driven brand insights.' },
    { agent: 'AwarioRssBot', desc: 'RSS feed monitoring for trend analysis.' },
  ]},
  { group: 'Allen Institute for AI', bots: [
    { agent: 'AI2Bot', desc: 'Crawls for AI research and Semantic Scholar.' },
    { agent: 'AI2Bot-Dolma', desc: 'Collects data for the Dolma pretraining dataset.' },
  ]},
  { group: 'Other AI Bots', bots: [
    { agent: 'ImagesiftBot', desc: 'Collects image data for AI training.' },
    { agent: 'img2dataset', desc: 'Open-source tool for creating image datasets for ML.' },
    { agent: 'Youbot', desc: 'SuSea Inc. crawler for search & AI training.' },
    { agent: 'VelenPublicWebCrawler', desc: 'Velen/Hunter crawler for ML datasets.' },
    { agent: 'TurnitinBot', desc: 'Turnitin\'s crawler for plagiarism detection.' },
    { agent: 'Timpibot', desc: 'Timpi\'s decentralized search engine crawler.' },
    { agent: 'ICC-Crawler', desc: 'NICT\'s crawler for multilingual AI research.' },
    { agent: 'DataForSeoBot', desc: 'DataForSEO\'s crawler for SEO tools & AI.' },
    { agent: 'Kangaroo Bot', desc: 'Kangaroo LLM\'s training data crawler.' },
    { agent: 'Sentibot', desc: 'SentiOne\'s crawler for sentiment analysis AI.' },
    { agent: 'Meltwater', desc: 'Media intelligence and AI-driven analytics.' },
    { agent: 'Seekr', desc: 'AI content analysis for brand safety.' },
    { agent: 'peer39_crawler', desc: 'Peer39\'s AI contextual advertising analysis.' },
    { agent: 'Scrapy', desc: 'Open-source crawling framework used for AI training.' },
    { agent: 'Cotoyogi', desc: 'Japanese research crawler for AI model training.' },
    { agent: 'aiHitBot', desc: 'aiHitdata\'s AI/ML web data collection bot.' },
    { agent: 'Factset_spyderbot', desc: 'FactSet\'s AI solutions data crawler.' },
    { agent: 'FirecrawlAgent', desc: 'Converts web data to markdown for LLM apps.' },
  ]},
]

const ALL_AI_AGENTS = AI_BOTS.flatMap(g => g.bots.map(b => b.agent))

const SEARCH_BOTS = [
  { group: 'Google Search', bots: [
    { agent: 'Googlebot', desc: 'Google\'s main web crawler for Search, Discover, and all Search features.' },
    { agent: 'Googlebot-Image', desc: 'Google Images crawler. Affects image results in Search.' },
    { agent: 'Googlebot-Video', desc: 'Google Video crawler for video-related search features.' },
    { agent: 'Googlebot-News', desc: 'Google News crawler for news.google.com and the News app.' },
    { agent: 'Storebot-Google', desc: 'Google Shopping crawler for product listings.' },
    { agent: 'Google-InspectionTool', desc: 'Used by Search Console URL inspection & Rich Result Test.' },
    { agent: 'GoogleOther', desc: 'Generic Google crawler for R&D. No effect on Search.' },
    { agent: 'GoogleOther-Image', desc: 'GoogleOther variant for fetching image URLs.' },
    { agent: 'GoogleOther-Video', desc: 'GoogleOther variant for fetching video URLs.' },
  ]},
  { group: 'Google Ads & Services', bots: [
    { agent: 'AdsBot-Google', desc: 'Checks Google Ads landing page quality.' },
    { agent: 'AdsBot-Google-Mobile', desc: 'Mobile version of AdBot for Ads quality checks.' },
    { agent: 'Mediapartners-Google', desc: 'Google AdSense crawler for serving relevant ads.' },
    { agent: 'APIs-Google', desc: 'Delivers push notifications via Google APIs.' },
    { agent: 'Google-Safety', desc: 'Abuse-specific crawler (malware, etc). Ignores robots.txt.' },
  ]},
  { group: 'Bing / Microsoft', bots: [
    { agent: 'bingbot', desc: 'Bing\'s main web crawler for search indexing.' },
    { agent: 'adidxbot', desc: 'Bing Ads crawler for ad quality control.' },
    { agent: 'BingPreview', desc: 'Generates page snapshots/previews for Bing.' },
    { agent: 'MicrosoftPreview', desc: 'Generates page previews for Microsoft products.' },
  ]},
  { group: 'Yahoo', bots: [
    { agent: 'Slurp', desc: 'Yahoo\'s main web crawler for search indexing.' },
  ]},
  { group: 'Yandex', bots: [
    { agent: 'YandexBot', desc: 'Yandex\'s main search crawler.' },
    { agent: 'YandexImages', desc: 'Yandex image search crawler.' },
    { agent: 'YandexVideo', desc: 'Yandex video search crawler.' },
    { agent: 'YandexMedia', desc: 'Yandex multimedia content crawler.' },
    { agent: 'YandexBlogs', desc: 'Yandex blog search crawler.' },
    { agent: 'YandexNews', desc: 'Yandex news aggregation crawler.' },
    { agent: 'YandexPagechecker', desc: 'Yandex structured data validator.' },
    { agent: 'YandexMetrika', desc: 'Yandex analytics (Metrika) bot.' },
  ]},
  { group: 'Baidu', bots: [
    { agent: 'Baiduspider', desc: 'Baidu\'s main search crawler (China).' },
    { agent: 'Baiduspider-image', desc: 'Baidu image search crawler.' },
    { agent: 'Baiduspider-video', desc: 'Baidu video search crawler.' },
    { agent: 'Baiduspider-news', desc: 'Baidu news search crawler.' },
  ]},
  { group: 'DuckDuckGo', bots: [
    { agent: 'DuckDuckBot', desc: 'DuckDuckGo\'s main search crawler.' },
  ]},
  { group: 'Apple', bots: [
    { agent: 'Applebot', desc: 'Apple\'s web crawler for Siri and Spotlight Suggestions.' },
  ]},
  { group: 'Other Search & SEO Bots', bots: [
    { agent: 'Sogou', desc: 'Sogou search engine crawler (China).' },
    { agent: 'SeznamBot', desc: 'Seznam search engine crawler (Czech Republic).' },
    { agent: 'NaverBot', desc: 'Naver search engine crawler (South Korea).' },
    { agent: 'AhrefsBot', desc: 'Ahrefs SEO tool backlink & content crawler.' },
    { agent: 'SemrushBot', desc: 'Semrush SEO tool crawler for site analysis.' },
    { agent: 'MJ12bot', desc: 'Majestic SEO backlink crawler.' },
    { agent: 'DotBot', desc: 'Moz/SEOmoz\'s web crawler.' },
    { agent: 'rogerbot', desc: 'Moz\'s crawler for link and page data.' },
    { agent: 'archive.org_bot', desc: 'Internet Archive / Wayback Machine crawler.' },
    { agent: 'ia_archiver', desc: 'Internet Archive legacy crawler.' },
    { agent: 'Twitterbot', desc: 'Twitter/X link preview crawler for cards.' },
    { agent: 'LinkedInBot', desc: 'LinkedIn link preview and content crawler.' },
    { agent: 'Pinterest', desc: 'Pinterest content discovery crawler.' },
    { agent: 'WhatsApp', desc: 'WhatsApp link preview crawler.' },
    { agent: 'TelegramBot', desc: 'Telegram link preview crawler.' },
    { agent: 'Discordbot', desc: 'Discord link preview and embed crawler.' },
    { agent: 'Slackbot', desc: 'Slack link preview and unfurl crawler.' },
  ]},
]

const ALL_SEARCH_AGENTS = SEARCH_BOTS.flatMap(g => g.bots.map(b => b.agent))

const PRESETS = {
  'block-all-ai': { label: 'Block all AI bots', isAiPreset: true },
  'block-all-except-google': { label: 'Block all except Google', rules: [{ agent: '*', disallow: ['/'], allow: [], delay: '' }, { agent: 'Googlebot', disallow: [], allow: ['/'], delay: '' }] },
  'allow-all': { label: 'Allow everything', rules: [{ agent: '*', disallow: [], allow: ['/'], delay: '' }] },
  'block-admin': { label: 'Block /admin and /private', rules: [{ agent: '*', disallow: ['/admin/', '/private/'], allow: [], delay: '' }] },
}

function CopyBtn({ text }) {
  const [copied, setCopied] = useState(false)
  const copy = () => { navigator.clipboard.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1500) }) }
  return <button onClick={copy} className="btn-secondary flex items-center gap-1.5 text-xs">{copied ? <><Check className="w-3.5 h-3.5" /> Copied</> : <><Copy className="w-3.5 h-3.5" /> Copy</>}</button>
}

const emptyRule = () => ({ agent: '*', disallow: [''], allow: [''], delay: '' })

export default function RobotsTxtGenerator() {
  const [rules, setRules] = useState([{ agent: '*', disallow: [], allow: ['/'], delay: '' }])
  const [sitemapUrl, setSitemapUrl] = useState('')
  const [blockedAiBots, setBlockedAiBots] = useState(new Set())
  const [blockedSearchBots, setBlockedSearchBots] = useState(new Set())
  const [expandedGroups, setExpandedGroups] = useState(new Set())
  const [aiSectionOpen, setAiSectionOpen] = useState(false)
  const [searchSectionOpen, setSearchSectionOpen] = useState(false)

  const makeToggleBot = useCallback((setter) => (agent) => {
    setter(prev => {
      const next = new Set(prev)
      if (next.has(agent)) next.delete(agent)
      else next.add(agent)
      return next
    })
  }, [])

  const toggleAiBot = useMemo(() => makeToggleBot(setBlockedAiBots), [makeToggleBot])
  const toggleSearchBot = useMemo(() => makeToggleBot(setBlockedSearchBots), [makeToggleBot])

  const makeToggleGroup = useCallback((botList, blockedSet, setter) => (group) => {
    const bots = botList.find(g => g.group === group)?.bots || []
    const agents = bots.map(b => b.agent)
    const allBlocked = agents.every(a => blockedSet.has(a))
    setter(prev => {
      const next = new Set(prev)
      agents.forEach(a => allBlocked ? next.delete(a) : next.add(a))
      return next
    })
  }, [])

  const toggleAiGroup = useMemo(() => makeToggleGroup(AI_BOTS, blockedAiBots, setBlockedAiBots), [makeToggleGroup, blockedAiBots])
  const toggleSearchGroup = useMemo(() => makeToggleGroup(SEARCH_BOTS, blockedSearchBots, setBlockedSearchBots), [makeToggleGroup, blockedSearchBots])

  const toggleExpandGroup = useCallback((group) => {
    setExpandedGroups(prev => {
      const next = new Set(prev)
      if (next.has(group)) next.delete(group)
      else next.add(group)
      return next
    })
  }, [])

  const blockAllAi = useCallback(() => setBlockedAiBots(new Set(ALL_AI_AGENTS)), [])
  const unblockAllAi = useCallback(() => setBlockedAiBots(new Set()), [])
  const blockAllSearch = useCallback(() => setBlockedSearchBots(new Set(ALL_SEARCH_AGENTS)), [])
  const unblockAllSearch = useCallback(() => setBlockedSearchBots(new Set()), [])

  const updateRule = (idx, field, value) => {
    const next = [...rules]
    next[idx] = { ...next[idx], [field]: value }
    setRules(next)
  }

  const addPath = (idx, type) => {
    const next = [...rules]
    next[idx] = { ...next[idx], [type]: [...next[idx][type], ''] }
    setRules(next)
  }

  const updatePath = (ruleIdx, type, pathIdx, value) => {
    const next = [...rules]
    const paths = [...next[ruleIdx][type]]
    paths[pathIdx] = value
    next[ruleIdx] = { ...next[ruleIdx], [type]: paths }
    setRules(next)
  }

  const removePath = (ruleIdx, type, pathIdx) => {
    const next = [...rules]
    next[ruleIdx] = { ...next[ruleIdx], [type]: next[ruleIdx][type].filter((_, i) => i !== pathIdx) }
    setRules(next)
  }

  const applyPreset = (key) => {
    const preset = PRESETS[key]
    if (preset.isAiPreset) {
      blockAllAi()
    } else {
      setRules(preset.rules.map(r => ({ ...r })))
    }
  }

  const output = useMemo(() => {
    const lines = []
    rules.forEach((rule, i) => {
      if (i > 0) lines.push('')
      lines.push(`User-agent: ${rule.agent}`)
      rule.allow.forEach(p => { if (p) lines.push(`Allow: ${p}`) })
      rule.disallow.forEach(p => { if (p) lines.push(`Disallow: ${p}`) })
      if (rule.delay) lines.push(`Crawl-delay: ${rule.delay}`)
    })
    if (blockedAiBots.size > 0) {
      lines.push('')
      lines.push('# Block AI/LLM crawlers')
      for (const group of AI_BOTS) {
        const blocked = group.bots.filter(b => blockedAiBots.has(b.agent))
        if (blocked.length > 0) {
          blocked.forEach(b => lines.push(`User-agent: ${b.agent}`))
        }
      }
      lines.push('Disallow: /')
    }
    if (blockedSearchBots.size > 0) {
      lines.push('')
      lines.push('# Block search engine / web crawlers')
      for (const group of SEARCH_BOTS) {
        const blocked = group.bots.filter(b => blockedSearchBots.has(b.agent))
        if (blocked.length > 0) {
          blocked.forEach(b => lines.push(`User-agent: ${b.agent}`))
        }
      }
      lines.push('Disallow: /')
    }
    if (sitemapUrl.trim()) {
      lines.push('')
      lines.push(`Sitemap: ${sitemapUrl.trim()}`)
    }
    return lines.join('\n')
  }, [rules, sitemapUrl, blockedAiBots, blockedSearchBots])

  const warnings = useMemo(() => {
    const w = []
    rules.forEach(rule => {
      rule.disallow.forEach(p => {
        if (p && !p.startsWith('/')) w.push(`"${p}" should start with /`)
      })
      rule.allow.forEach(p => {
        if (p && !p.startsWith('/')) w.push(`"${p}" should start with /`)
      })
    })
    return w
  }, [rules])

  const downloadFile = () => {
    const blob = new Blob([output], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'robots.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-900/20 px-4 py-3 text-sm text-rose-700 dark:text-rose-300">
        This tool provides guidance and estimates only. SEO results depend on many factors outside this tool.
      </div>

      <div>
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Quick Presets</h3>
        <div className="flex flex-wrap gap-2">
          {Object.entries(PRESETS).map(([key, preset]) => (
            <button key={key} onClick={() => applyPreset(key)} className="btn-secondary text-xs">{preset.label}</button>
          ))}
        </div>
      </div>

      {/* AI Bot Rules Section */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <button type="button" onClick={() => setAiSectionOpen(v => !v)} className="w-full flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-xl">
          <div className="flex items-center gap-2">
            {aiSectionOpen ? <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" /> : <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />}
            <Bot className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">AI / LLM Bot Rules</h3>
            {blockedAiBots.size > 0 && (
              <span className="text-xs bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-2 py-0.5 rounded-full font-medium">
                {blockedAiBots.size} blocked
              </span>
            )}
          </div>
          <span className="text-xs text-gray-400 dark:text-gray-500">{AI_BOTS.reduce((s, g) => s + g.bots.length, 0)} bots</span>
        </button>
        {aiSectionOpen && (
        <div className="px-4 pb-4 space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-500 dark:text-gray-400">Select AI bots to block from crawling your site. Selected bots will be added to the generated robots.txt with <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">Disallow: /</code></p>
          <div className="flex gap-2 shrink-0 ml-3">
            <button onClick={blockAllAi} className="text-xs flex items-center gap-1 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 font-medium">
              <Shield className="w-3.5 h-3.5" /> Block all
            </button>
            <button onClick={unblockAllAi} className="text-xs flex items-center gap-1 text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 font-medium">
              <ShieldOff className="w-3.5 h-3.5" /> Allow all
            </button>
          </div>
        </div>

        <div className="space-y-1">
          {AI_BOTS.map(group => {
            const groupAgents = group.bots.map(b => b.agent)
            const blockedCount = groupAgents.filter(a => blockedAiBots.has(a)).length
            const allBlocked = blockedCount === group.bots.length
            const someBlocked = blockedCount > 0 && !allBlocked
            const isExpanded = expandedGroups.has(group.group)

            return (
              <div key={group.group} className="rounded-lg border border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg" onClick={() => toggleExpandGroup(group.group)}>
                  {isExpanded ? <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" /> : <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />}
                  <label className="flex items-center gap-2 cursor-pointer flex-1 min-w-0" onClick={e => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={allBlocked}
                      ref={el => { if (el) el.indeterminate = someBlocked }}
                      onChange={() => toggleAiGroup(group.group)}
                      className="rounded border-gray-300 dark:border-gray-600 text-indigo-600 focus:ring-indigo-500 shrink-0"
                    />
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">{group.group}</span>
                  </label>
                  <span className="text-xs text-gray-400 dark:text-gray-500 shrink-0">
                    {blockedCount > 0 ? <span className="text-red-500 dark:text-red-400">{blockedCount}/{group.bots.length} blocked</span> : `${group.bots.length} bot${group.bots.length > 1 ? 's' : ''}`}
                  </span>
                </div>
                {isExpanded && (
                  <div className="px-3 pb-2 pt-1 space-y-1 ml-6 border-t border-gray-100 dark:border-gray-800">
                    {group.bots.map(bot => (
                      <label key={bot.agent} className="flex items-start gap-2 cursor-pointer py-1 group/bot">
                        <input
                          type="checkbox"
                          checked={blockedAiBots.has(bot.agent)}
                          onChange={() => toggleAiBot(bot.agent)}
                          className="mt-0.5 rounded border-gray-300 dark:border-gray-600 text-indigo-600 focus:ring-indigo-500 shrink-0"
                        />
                        <div className="min-w-0">
                          <span className="text-sm text-gray-800 dark:text-gray-200 font-mono">{bot.agent}</span>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{bot.desc}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
        </div>
        )}
      </div>

      {/* Search Engine & Web Crawler Rules Section */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <button type="button" onClick={() => setSearchSectionOpen(v => !v)} className="w-full flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-xl">
          <div className="flex items-center gap-2">
            {searchSectionOpen ? <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" /> : <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />}
            <Globe className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Search Engine & Web Crawlers</h3>
            {blockedSearchBots.size > 0 && (
              <span className="text-xs bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-2 py-0.5 rounded-full font-medium">
                {blockedSearchBots.size} blocked
              </span>
            )}
          </div>
          <span className="text-xs text-gray-400 dark:text-gray-500">{SEARCH_BOTS.reduce((s, g) => s + g.bots.length, 0)} bots</span>
        </button>
        {searchSectionOpen && (
        <div className="px-4 pb-4 space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-500 dark:text-gray-400">Select search engine or web crawlers to block. <span className="text-amber-600 dark:text-amber-400 font-medium">Warning:</span> Blocking search bots will affect your site's visibility in those search engines.</p>
          <div className="flex gap-2 shrink-0 ml-3">
            <button onClick={blockAllSearch} className="text-xs flex items-center gap-1 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 font-medium">
              <Shield className="w-3.5 h-3.5" /> Block all
            </button>
            <button onClick={unblockAllSearch} className="text-xs flex items-center gap-1 text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 font-medium">
              <ShieldOff className="w-3.5 h-3.5" /> Allow all
            </button>
          </div>
        </div>

        <div className="space-y-1">
          {SEARCH_BOTS.map(group => {
            const groupAgents = group.bots.map(b => b.agent)
            const blockedCount = groupAgents.filter(a => blockedSearchBots.has(a)).length
            const allBlocked = blockedCount === group.bots.length
            const someBlocked = blockedCount > 0 && !allBlocked
            const isExpanded = expandedGroups.has('search:' + group.group)

            return (
              <div key={group.group} className="rounded-lg border border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg" onClick={() => toggleExpandGroup('search:' + group.group)}>
                  {isExpanded ? <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" /> : <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />}
                  <label className="flex items-center gap-2 cursor-pointer flex-1 min-w-0" onClick={e => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={allBlocked}
                      ref={el => { if (el) el.indeterminate = someBlocked }}
                      onChange={() => toggleSearchGroup(group.group)}
                      className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 shrink-0"
                    />
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">{group.group}</span>
                  </label>
                  <span className="text-xs text-gray-400 dark:text-gray-500 shrink-0">
                    {blockedCount > 0 ? <span className="text-red-500 dark:text-red-400">{blockedCount}/{group.bots.length} blocked</span> : `${group.bots.length} bot${group.bots.length > 1 ? 's' : ''}`}
                  </span>
                </div>
                {isExpanded && (
                  <div className="px-3 pb-2 pt-1 space-y-1 ml-6 border-t border-gray-100 dark:border-gray-800">
                    {group.bots.map(bot => (
                      <label key={bot.agent} className="flex items-start gap-2 cursor-pointer py-1">
                        <input
                          type="checkbox"
                          checked={blockedSearchBots.has(bot.agent)}
                          onChange={() => toggleSearchBot(bot.agent)}
                          className="mt-0.5 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 shrink-0"
                        />
                        <div className="min-w-0">
                          <span className="text-sm text-gray-800 dark:text-gray-200 font-mono">{bot.agent}</span>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{bot.desc}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
        </div>
        )}
      </div>

      <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Custom User-Agent Rules</h3>

      {rules.map((rule, rIdx) => (
        <div key={rIdx} className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Rule #{rIdx + 1}</h4>
            {rules.length > 1 && (
              <button onClick={() => setRules(rules.filter((_, i) => i !== rIdx))} className="text-red-500 hover:text-red-700 dark:text-red-400 text-xs flex items-center gap-1">
                <Trash2 className="w-3 h-3" /> Remove
              </button>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">User-agent</label>
            <input type="text" value={rule.agent} onChange={e => updateRule(rIdx, 'agent', e.target.value)} className="input-field" placeholder="* (all robots)" />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-medium text-gray-600 dark:text-gray-400">Disallow paths</label>
              <button onClick={() => addPath(rIdx, 'disallow')} className="text-xs text-indigo-600 dark:text-indigo-400 flex items-center gap-0.5"><Plus className="w-3 h-3" /> Add</button>
            </div>
            {rule.disallow.map((p, pIdx) => (
              <div key={pIdx} className="flex items-center gap-2 mb-1">
                <input type="text" value={p} onChange={e => updatePath(rIdx, 'disallow', pIdx, e.target.value)} className="input-field" placeholder="/admin/" />
                <button onClick={() => removePath(rIdx, 'disallow', pIdx)} className="text-red-400 hover:text-red-600"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            ))}
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-medium text-gray-600 dark:text-gray-400">Allow paths</label>
              <button onClick={() => addPath(rIdx, 'allow')} className="text-xs text-indigo-600 dark:text-indigo-400 flex items-center gap-0.5"><Plus className="w-3 h-3" /> Add</button>
            </div>
            {rule.allow.map((p, pIdx) => (
              <div key={pIdx} className="flex items-center gap-2 mb-1">
                <input type="text" value={p} onChange={e => updatePath(rIdx, 'allow', pIdx, e.target.value)} className="input-field" placeholder="/" />
                <button onClick={() => removePath(rIdx, 'allow', pIdx)} className="text-red-400 hover:text-red-600"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            ))}
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Crawl delay (seconds, optional)</label>
            <input type="number" value={rule.delay} onChange={e => updateRule(rIdx, 'delay', e.target.value)} className="input-field w-32" placeholder="10" min="0" />
          </div>
        </div>
      ))}

      <button onClick={() => setRules([...rules, emptyRule()])} className="btn-secondary flex items-center gap-1.5">
        <Plus className="w-4 h-4" /> Add user-agent rule
      </button>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">Sitemap URL (optional)</label>
        <input type="text" value={sitemapUrl} onChange={e => setSitemapUrl(e.target.value)} className="input-field" placeholder="https://example.com/sitemap.xml" />
      </div>

      {warnings.length > 0 && (
        <div className="rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 px-4 py-3 text-sm text-amber-700 dark:text-amber-300">
          <p className="font-semibold">Warnings:</p>
          {warnings.map((w, i) => <p key={i}>• {w}</p>)}
        </div>
      )}

      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Generated robots.txt</h3>
          <div className="flex gap-2">
            <CopyBtn text={output} />
            <button onClick={downloadFile} className="btn-secondary flex items-center gap-1.5 text-xs"><Download className="w-3.5 h-3.5" /> Download</button>
          </div>
        </div>
        <pre className="textarea-field min-h-[120px] whitespace-pre-wrap bg-gray-50 dark:bg-gray-800">{output}</pre>
      </div>

      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">What each directive does</h3>
        <dl className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
          <div><dt className="font-medium text-gray-800 dark:text-gray-200">User-agent</dt><dd>Which search engine bot this rule applies to. Use * for all bots.</dd></div>
          <div><dt className="font-medium text-gray-800 dark:text-gray-200">Disallow</dt><dd>Tells the bot not to crawl the specified path.</dd></div>
          <div><dt className="font-medium text-gray-800 dark:text-gray-200">Allow</dt><dd>Overrides a Disallow for a specific sub-path.</dd></div>
          <div><dt className="font-medium text-gray-800 dark:text-gray-200">Crawl-delay</dt><dd>Asks the bot to wait N seconds between requests (not all bots honor this).</dd></div>
          <div><dt className="font-medium text-gray-800 dark:text-gray-200">Sitemap</dt><dd>Tells bots where to find your XML sitemap for better indexing.</dd></div>
        </dl>
      </div>
    </div>
  )
}
