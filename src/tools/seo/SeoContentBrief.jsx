import { useState, useMemo } from 'react'
import { Copy, Check, Eye, Code } from 'lucide-react'
import { renderMarkdown } from '../../utils/markdownRenderer'

function CopyBtn({ text }) {
  const [copied, setCopied] = useState(false)
  const copy = () => { navigator.clipboard.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1500) }) }
  return <button onClick={copy} className="btn-secondary flex items-center gap-1.5 text-xs">{copied ? <><Check className="w-3.5 h-3.5" /> Copied</> : <><Copy className="w-3.5 h-3.5" /> Copy</>}</button>
}

export default function SeoContentBrief() {
  const [keyword, setKeyword] = useState('')
  const [secondaryKeywords, setSecondaryKeywords] = useState('')
  const [topic, setTopic] = useState('')
  const [audience, setAudience] = useState('')
  const [intent, setIntent] = useState('informational')
  const [contentType, setContentType] = useState('blog-post')
  const [wordCountTarget, setWordCountTarget] = useState('1500')
  const [notes, setNotes] = useState('')
  const [previewMode, setPreviewMode] = useState('formatted')

  const brief = useMemo(() => {
    const sections = []

    sections.push('# SEO Content Brief')
    sections.push('')

    if (keyword) sections.push(`## Target Keyword\n**Primary:** ${keyword}`)
    if (secondaryKeywords.trim()) {
      const secs = secondaryKeywords.split(',').map(k => k.trim()).filter(Boolean)
      sections.push(`**Secondary:** ${secs.join(', ')}`)
    }
    sections.push('')

    if (topic) sections.push(`## Topic\n${topic}\n`)
    if (audience) sections.push(`## Target Audience\n${audience}\n`)

    sections.push(`## Search Intent\n${intent.charAt(0).toUpperCase() + intent.slice(1)}\n`)
    sections.push(`## Content Type\n${contentType.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}\n`)
    sections.push(`## Target Word Count\n${wordCountTarget} words\n`)

    // Suggested outline based on content type
    sections.push('## Suggested Outline')
    if (contentType === 'blog-post') {
      sections.push(`1. **Introduction** — Hook the reader, state the problem, mention "${keyword}"`)
      sections.push(`2. **What is ${keyword || '[topic]'}?** — Define the concept`)
      sections.push(`3. **Why it matters** — Benefits, stats, relevance`)
      sections.push(`4. **How to [action]** — Step-by-step guide or key points`)
      sections.push(`5. **Common mistakes** — What to avoid`)
      sections.push(`6. **Expert tips** — Advanced insights`)
      sections.push(`7. **Conclusion** — Summary + CTA`)
    } else if (contentType === 'landing-page') {
      sections.push(`1. **Hero** — Headline with "${keyword}", value proposition, CTA`)
      sections.push(`2. **Problem** — Pain points the audience faces`)
      sections.push(`3. **Solution** — How your product/service solves it`)
      sections.push(`4. **Features/Benefits** — Key selling points`)
      sections.push(`5. **Social proof** — Testimonials, case studies`)
      sections.push(`6. **FAQ** — Address common objections`)
      sections.push(`7. **Final CTA** — Strong close with clear next step`)
    } else if (contentType === 'product-page') {
      sections.push(`1. **Product title** — Include "${keyword}"`)
      sections.push(`2. **Product description** — Features, specs, use cases`)
      sections.push(`3. **Benefits** — Why choose this product`)
      sections.push(`4. **Specifications** — Technical details table`)
      sections.push(`5. **Reviews/ratings** — Social proof section`)
      sections.push(`6. **FAQ** — Product-specific questions`)
      sections.push(`7. **Related products** — Internal linking`)
    } else if (contentType === 'how-to-guide') {
      sections.push(`1. **Introduction** — What you'll learn, prerequisites`)
      sections.push(`2. **Step 1: [First step]** — Detailed instructions`)
      sections.push(`3. **Step 2: [Second step]** — Continue walkthrough`)
      sections.push(`4. **Step 3: [Third step]** — Add more steps as needed`)
      sections.push(`5. **Tips & troubleshooting** — Common issues and fixes`)
      sections.push(`6. **Summary** — Quick recap of all steps`)
    } else if (contentType === 'listicle') {
      sections.push(`1. **Introduction** — Why this list matters for "${keyword}"`)
      sections.push(`2. **Item 1** — Description, pros/cons, link`)
      sections.push(`3. **Item 2–N** — Repeat format`)
      sections.push(`4. **Comparison table** — Quick-reference summary`)
      sections.push(`5. **How to choose** — Buying/decision criteria`)
      sections.push(`6. **Conclusion** — Top pick + CTA`)
    } else {
      sections.push(`1. **Introduction** — Set context for "${keyword}"`)
      sections.push(`2. **Main content** — Core information`)
      sections.push(`3. **Conclusion** — Summary and next steps`)
    }
    sections.push('')

    // SEO Checklist
    sections.push('## SEO Checklist')
    sections.push(`- [ ] Include "${keyword}" in title tag (first 60 chars)`)
    sections.push(`- [ ] Include "${keyword}" in H1`)
    sections.push(`- [ ] Include "${keyword}" in meta description (120-160 chars)`)
    sections.push(`- [ ] Include "${keyword}" in first 100 words`)
    sections.push(`- [ ] Include "${keyword}" in URL slug`)
    sections.push('- [ ] Use H2/H3 subheadings with secondary keywords')
    sections.push('- [ ] Add alt text to all images')
    sections.push('- [ ] Include 3-5 internal links')
    sections.push('- [ ] Include 2-3 external authoritative links')
    sections.push('- [ ] Add schema markup (FAQ, HowTo, Article)')
    sections.push('- [ ] Optimize for featured snippets (lists, tables, definitions)')
    sections.push(`- [ ] Target word count: ${wordCountTarget}+`)
    sections.push('')

    if (notes.trim()) sections.push(`## Additional Notes\n${notes}\n`)

    return sections.join('\n')
  }, [keyword, secondaryKeywords, topic, audience, intent, contentType, wordCountTarget, notes])

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-900/20 px-4 py-3 text-sm text-rose-700 dark:text-rose-300">
        This tool provides guidance and estimates only. SEO results depend on many factors outside this tool.
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Primary Keyword</label>
            <input type="text" value={keyword} onChange={e => setKeyword(e.target.value)} className="input-field" placeholder="e.g. best project management tools" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Secondary Keywords <span className="font-normal text-gray-400">(comma-separated)</span></label>
            <input type="text" value={secondaryKeywords} onChange={e => setSecondaryKeywords(e.target.value)} className="input-field" placeholder="e.g. PM software, task management, team collaboration" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Topic / Working Title</label>
            <input type="text" value={topic} onChange={e => setTopic(e.target.value)} className="input-field" placeholder="e.g. Top 10 Project Management Tools for Remote Teams in 2025" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Target Audience</label>
            <input type="text" value={audience} onChange={e => setAudience(e.target.value)} className="input-field" placeholder="e.g. Remote team managers, startup founders" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Search Intent</label>
              <select value={intent} onChange={e => setIntent(e.target.value)} className="input-field">
                <option value="informational">Informational</option>
                <option value="commercial">Commercial</option>
                <option value="transactional">Transactional</option>
                <option value="navigational">Navigational</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Content Type</label>
              <select value={contentType} onChange={e => setContentType(e.target.value)} className="input-field">
                <option value="blog-post">Blog Post</option>
                <option value="landing-page">Landing Page</option>
                <option value="product-page">Product Page</option>
                <option value="how-to-guide">How-to Guide</option>
                <option value="listicle">Listicle</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Target Word Count</label>
            <input type="number" value={wordCountTarget} onChange={e => setWordCountTarget(e.target.value)} className="input-field w-32" min="100" step="100" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Additional Notes</label>
            <textarea value={notes} onChange={e => setNotes(e.target.value)} className="textarea-field min-h-[60px]" placeholder="Competitor URLs, specific angles, must-include topics…" />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Generated Brief</h3>
              <div className="flex gap-0.5 p-0.5 rounded-lg bg-gray-100 dark:bg-gray-800">
                <button onClick={() => setPreviewMode('formatted')} className={`p-1 rounded-md transition-colors ${previewMode === 'formatted' ? 'bg-white dark:bg-gray-700 shadow-sm text-indigo-600 dark:text-indigo-400' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`} title="Formatted"><Eye className="w-3.5 h-3.5" /></button>
                <button onClick={() => setPreviewMode('raw')} className={`p-1 rounded-md transition-colors ${previewMode === 'raw' ? 'bg-white dark:bg-gray-700 shadow-sm text-indigo-600 dark:text-indigo-400' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`} title="Raw Markdown"><Code className="w-3.5 h-3.5" /></button>
              </div>
            </div>
            <CopyBtn text={brief} />
          </div>
          {previewMode === 'raw' ? (
            <pre className="textarea-field min-h-[400px] whitespace-pre-wrap text-xs bg-gray-50 dark:bg-gray-800 overflow-y-auto">{brief}</pre>
          ) : (
            <div className="min-h-[400px] max-h-[600px] overflow-y-auto p-4 rounded-lg bg-gray-50 dark:bg-gray-800" dangerouslySetInnerHTML={{ __html: renderMarkdown(brief) }} />
          )}
        </div>
      </div>
    </div>
  )
}
