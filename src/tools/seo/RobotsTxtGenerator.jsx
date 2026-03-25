import { useMemo, useState } from 'react'
import CopyButton from '../../components/CopyButton.jsx'
import { Panel } from '../../components/ToolLayout.jsx'
import { downloadTextFile } from '../productivity/shared.jsx'
import { Field, ResultCard, SeoNote } from './shared.jsx'

const AGENT_OPTIONS = ['*', 'Googlebot', 'Bingbot', 'GPTBot', 'CCBot']

function createRule(userAgent = '*') {
  return {
    id: crypto.randomUUID(),
    userAgent,
    allowPaths: [''],
    disallowPaths: [''],
    crawlDelay: '',
  }
}

function toList(value) {
  return value.filter((entry) => entry.trim())
}

function buildRobots(rules, sitemapUrl) {
  const blocks = rules.map((rule) => {
    const lines = [`User-agent: ${rule.userAgent || '*'}`]
    toList(rule.allowPaths).forEach((path) => lines.push(`Allow: ${path}`))
    toList(rule.disallowPaths).forEach((path) => lines.push(`Disallow: ${path}`))
    if (rule.crawlDelay) lines.push(`Crawl-delay: ${rule.crawlDelay}`)
    return lines.join('\n')
  })

  if (sitemapUrl.trim()) {
    blocks.push(`Sitemap: ${sitemapUrl.trim()}`)
  }

  return blocks.join('\n\n')
}

export default function RobotsTxtGenerator() {
  const [rules, setRules] = useState([createRule('*')])
  const [sitemapUrl, setSitemapUrl] = useState('https://untrackt.com/sitemap.xml')
  const [customAgent, setCustomAgent] = useState('')

  const output = useMemo(() => buildRobots(rules, sitemapUrl), [rules, sitemapUrl])
  const validation = useMemo(() => {
    const warnings = []
    rules.forEach((rule) => {
      ;[...toList(rule.allowPaths), ...toList(rule.disallowPaths)].forEach((path) => {
        if (!path.startsWith('/')) {
          warnings.push(`${rule.userAgent}: path "${path}" should usually start with /.`)
        }
      })
    })
    if (sitemapUrl && !/^https?:\/\//.test(sitemapUrl)) {
      warnings.push('Sitemap URL should be absolute.')
    }
    return warnings
  }, [rules, sitemapUrl])

  const applyPreset = (preset) => {
    if (preset === 'allow-all') {
      setRules([createRule('*')])
      return
    }
    if (preset === 'block-ai') {
      setRules([
        { ...createRule('GPTBot'), disallowPaths: ['/'] },
        { ...createRule('CCBot'), disallowPaths: ['/'] },
      ])
      return
    }
    if (preset === 'google-only') {
      setRules([
        { ...createRule('Googlebot') },
        { ...createRule('*'), disallowPaths: ['/'] },
      ])
      return
    }
    if (preset === 'block-private') {
      setRules([{ ...createRule('*'), disallowPaths: ['/admin', '/private'] }])
    }
  }

  return (
    <div className="space-y-6">
      <SeoNote />

      <Panel>
        <div className="flex flex-wrap gap-2">
          <button type="button" className="btn-secondary" onClick={() => applyPreset('allow-all')}>Allow everything</button>
          <button type="button" className="btn-secondary" onClick={() => applyPreset('block-ai')}>Block AI crawlers</button>
          <button type="button" className="btn-secondary" onClick={() => applyPreset('google-only')}>Block all except Google</button>
          <button type="button" className="btn-secondary" onClick={() => applyPreset('block-private')}>Block /admin and /private</button>
        </div>
      </Panel>

      <div className="grid gap-6 xl:grid-cols-[1fr,1fr]">
        <div className="space-y-6">
          <Panel>
            <div className="flex flex-wrap items-end gap-3">
              <div className="flex-1 min-w-[220px]">
                <Field label="Add custom user-agent">
                  <input className="input-field" value={customAgent} onChange={(event) => setCustomAgent(event.target.value)} placeholder="ExampleBot" />
                </Field>
              </div>
              <button
                type="button"
                className="btn-primary"
                onClick={() => {
                  if (!customAgent.trim()) return
                  setRules((current) => [...current, createRule(customAgent.trim())])
                  setCustomAgent('')
                }}
              >
                Add user-agent
              </button>
            </div>
          </Panel>

          {rules.map((rule, index) => (
            <Panel key={rule.id}>
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Rule set {index + 1}</h2>
                {rules.length > 1 ? (
                  <button type="button" className="btn-secondary" onClick={() => setRules((current) => current.filter((entry) => entry.id !== rule.id))}>Remove</button>
                ) : null}
              </div>
              <div className="mt-4 grid gap-4">
                <Field label="User-agent">
                  <select
                    className="input-field"
                    value={rule.userAgent}
                    onChange={(event) => setRules((current) => current.map((entry) => entry.id === rule.id ? { ...entry, userAgent: event.target.value } : entry))}
                  >
                    {[...AGENT_OPTIONS, rule.userAgent].filter((value, position, array) => array.indexOf(value) === position).map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </Field>
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Allow paths">
                    <textarea
                      className="textarea-field min-h-[120px]"
                      value={rule.allowPaths.join('\n')}
                      onChange={(event) => setRules((current) => current.map((entry) => entry.id === rule.id ? { ...entry, allowPaths: event.target.value.split('\n') } : entry))}
                      placeholder="/blog\n/assets"
                    />
                  </Field>
                  <Field label="Disallow paths">
                    <textarea
                      className="textarea-field min-h-[120px]"
                      value={rule.disallowPaths.join('\n')}
                      onChange={(event) => setRules((current) => current.map((entry) => entry.id === rule.id ? { ...entry, disallowPaths: event.target.value.split('\n') } : entry))}
                      placeholder="/admin\n/private"
                    />
                  </Field>
                </div>
                <Field label="Crawl delay (seconds)">
                  <input className="input-field" type="number" min="" value={rule.crawlDelay} onChange={(event) => setRules((current) => current.map((entry) => entry.id === rule.id ? { ...entry, crawlDelay: event.target.value } : entry))} />
                </Field>
              </div>
            </Panel>
          ))}

          <Panel>
            <Field label="Sitemap URL">
              <input className="input-field" value={sitemapUrl} onChange={(event) => setSitemapUrl(event.target.value)} placeholder="https://example.com/sitemap.xml" />
            </Field>
          </Panel>
        </div>

        <div className="space-y-6">
          <ResultCard
            title="Generated robots.txt"
            actions={
              <div className="flex flex-wrap gap-2">
                <CopyButton text={output} label="Copy" />
                <button type="button" className="btn-secondary" onClick={() => downloadTextFile('robots.txt', output)}>Download</button>
              </div>
            }
          >
            <textarea className="textarea-field min-h-[280px] font-mono text-xs" readOnly value={output} />
          </ResultCard>

          <ResultCard title="Validation">
            {validation.length > 0 ? (
              <ul className="space-y-2 text-sm text-amber-700 dark:text-amber-300">
                {validation.map((warning) => <li key={warning}>{warning}</li>)}
              </ul>
            ) : (
              <p className="text-sm text-green-700 dark:text-green-300">No obvious syntax issues found.</p>
            )}
          </ResultCard>

          <ResultCard title="What the directives mean">
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <li><strong>User-agent</strong>: which crawler the block applies to.</li>
              <li><strong>Allow</strong>: paths the crawler may access.</li>
              <li><strong>Disallow</strong>: paths the crawler should avoid.</li>
              <li><strong>Crawl-delay</strong>: a hint to slow request rate.</li>
              <li><strong>Sitemap</strong>: where search engines can find your sitemap.</li>
            </ul>
          </ResultCard>
        </div>
      </div>
    </div>
  )
}
