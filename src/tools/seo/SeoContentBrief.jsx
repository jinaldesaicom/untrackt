import { useEffect, useMemo, useState } from 'react'
import CopyButton from '../../components/CopyButton.jsx'
import { Panel } from '../../components/ToolLayout.jsx'
import { getItem, setItem } from '../../utils/storage.js'
import { downloadTextFile } from '../productivity/shared.jsx'
import { Field, ResultCard, SeoNote } from './shared.jsx'

const STORAGE_KEY = 'untrackt:seo:content-brief'

const CONTENT_RECOMMENDATIONS = {
  'Blog post': { sections: ['Introduction', 'Why it matters', 'Step-by-step guidance', 'Common mistakes', 'Examples', 'FAQ'], words: '1,200 to 2,000 words' },
  'Landing page': { sections: ['Hero promise', 'Pain points', 'Benefits', 'How it works', 'Proof', 'FAQ'], words: '700 to 1,200 words' },
  'Product page': { sections: ['Overview', 'Features', 'Benefits', 'Specifications', 'Use cases', 'FAQ'], words: '800 to 1,500 words' },
  'Category page': { sections: ['Category overview', 'Key subtopics', 'Buying guidance', 'Featured options', 'FAQ'], words: '900 to 1,600 words' },
  'How-to guide': { sections: ['Outcome', 'Requirements', 'Steps', 'Tips', 'Common errors', 'FAQ'], words: '1,200 to 2,200 words' },
  Listicle: { sections: ['Intro', 'Ranked list items', 'Comparison', 'Summary', 'FAQ'], words: '1,000 to 1,800 words' },
}

function buildBriefText(brief) {
  return [
    `Primary keyword: ${brief.keyword}`,
    `Secondary keywords: ${brief.secondaryKeywords.join(', ') || 'None'}`,
    `Audience: ${brief.audience}`,
    `Search intent: ${brief.intent}`,
    `Content type: ${brief.contentType}`,
    `Target length: ${brief.wordCount} words`,
    '',
    'Title suggestions:',
    ...brief.titles.map((title) => `- ${title}`),
    '',
    `Meta description suggestion: ${brief.metaDescription}`,
    '',
    'Recommended H2 sections:',
    ...brief.sections.map((section) => `- ${section}`),
    '',
    `CTA recommendation: ${brief.cta}`,
    `Word count guidance: ${brief.wordGuidance}`,
    `LSI keywords: ${brief.lsi.join(', ')}`,
    'Keyword placement: Title, H1, first 100 words, one H2, alt text, URL.',
    'Remember to add internal links to related pages and resources.',
  ].join('\n')
}

export default function SeoContentBrief() {
  const [form, setForm] = useState(() => getItem(STORAGE_KEY, {
    keyword: '',
    secondaryKeywords: '',
    audience: '',
    intent: 'Informational',
    contentType: 'Blog post',
    wordCount: 1500,
    competitors: ['', '', ''],
  }))

  useEffect(() => {
    setItem(STORAGE_KEY, form)
  }, [form])

  const brief = useMemo(() => {
    const secondaryKeywords = form.secondaryKeywords.split(',').map((item) => item.trim()).filter(Boolean).slice(0, 5)
    const recommendation = CONTENT_RECOMMENDATIONS[form.contentType]
    const keyword = form.keyword || 'your topic'
    const titles = [
      `${keyword}: ${form.contentType} guide for ${form.audience || 'your audience'}`,
      `How to win with ${keyword} in a ${form.contentType.toLowerCase()}`,
      `${keyword} explained: what to include, rank for, and publish`,
    ]
    const metaDescription = `Plan a ${form.contentType.toLowerCase()} for ${keyword} with clear sections, strong intent match, and a private browser-based brief builder.`
    const sections = recommendation.sections.slice(0, form.contentType === 'Landing page' ? 6 : 8)
    const lsi = secondaryKeywords.length > 0 ? secondaryKeywords : [keyword, `${keyword} tips`, `${keyword} strategy`, `${keyword} examples`]
    const ctaMap = {
      Informational: 'Invite the reader to learn more or explore a related guide.',
      Navigational: 'Help the reader reach the right destination quickly.',
      Transactional: 'Use a direct conversion-focused CTA such as get started or buy now.',
      Commercial: 'Encourage comparison, demo requests, or trials.',
    }
    return {
      keyword,
      secondaryKeywords,
      titles,
      metaDescription,
      sections,
      lsi,
      cta: ctaMap[form.intent],
      wordGuidance: recommendation.words,
    }
  }, [form])

  const briefText = useMemo(() => buildBriefText({ ...brief, audience: form.audience, intent: form.intent, contentType: form.contentType, wordCount: form.wordCount }), [brief, form])

  return (
    <div className="space-y-6">
      <SeoNote />
      <div className="grid gap-6 xl:grid-cols-[0.95fr,1.05fr]">
        <Panel>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Target keyword" className="sm:col-span-2"><input className="input-field" value={form.keyword} onChange={(event) => setForm((current) => ({ ...current, keyword: event.target.value }))} /></Field>
            <Field label="Secondary keywords" className="sm:col-span-2"><input className="input-field" value={form.secondaryKeywords} onChange={(event) => setForm((current) => ({ ...current, secondaryKeywords: event.target.value }))} placeholder="Comma-separated, up to 5" /></Field>
            <Field label="Target audience" className="sm:col-span-2"><textarea className="textarea-field min-h-[110px]" value={form.audience} onChange={(event) => setForm((current) => ({ ...current, audience: event.target.value }))} /></Field>
            <Field label="Search intent"><select className="input-field" value={form.intent} onChange={(event) => setForm((current) => ({ ...current, intent: event.target.value }))}><option>Informational</option><option>Navigational</option><option>Transactional</option><option>Commercial</option></select></Field>
            <Field label="Content type"><select className="input-field" value={form.contentType} onChange={(event) => setForm((current) => ({ ...current, contentType: event.target.value }))}>{Object.keys(CONTENT_RECOMMENDATIONS).map((type) => <option key={type}>{type}</option>)}</select></Field>
            <Field label="Target word count" className="sm:col-span-2">
              <input className="w-full" type="range" min="500" max="5000" step="100" value={form.wordCount} onChange={(event) => setForm((current) => ({ ...current, wordCount: Number(event.target.value) }))} />
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{form.wordCount} words · recommended range: {brief.wordGuidance}</p>
            </Field>
            <div className="sm:col-span-2 space-y-3">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-200">Competitor URLs to beat</p>
              {form.competitors.map((competitor, index) => <input key={index} className="input-field" value={competitor} onChange={(event) => setForm((current) => ({ ...current, competitors: current.competitors.map((entry, entryIndex) => entryIndex === index ? event.target.value : entry) }))} placeholder={`Competitor URL ${index + 1}`} />)}
            </div>
          </div>
        </Panel>

        <div className="space-y-6">
          <ResultCard title="Generated brief output" actions={<div className="flex flex-wrap gap-2"><CopyButton text={briefText} label="Copy brief" /><button type="button" className="btn-secondary" onClick={() => downloadTextFile('seo-content-brief.txt', briefText)}>Download .txt</button></div>}>
            <div className="space-y-4 text-sm text-gray-600 dark:text-gray-300">
              <div>
                <p className="font-semibold text-gray-900 dark:text-gray-100">Title suggestions</p>
                <ul className="mt-2 space-y-2">{brief.titles.map((title) => <li key={title}>{title}</li>)}</ul>
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-gray-100">Meta description suggestion</p>
                <p className="mt-2">{brief.metaDescription}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-gray-100">Recommended H2 sections</p>
                <ul className="mt-2 space-y-2">{brief.sections.map((section) => <li key={section}>{section}</li>)}</ul>
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-gray-100">Keyword placement guide</p>
                <p className="mt-2">Title ✓ · H1 ✓ · First 100 words ✓ · H2 ✓ · Alt text ✓ · URL ✓</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-gray-100">LSI keywords</p>
                <p className="mt-2">{brief.lsi.join(', ')}</p>
              </div>
              <p><strong>CTA recommendation:</strong> {brief.cta}</p>
              <p><strong>Internal linking reminder:</strong> Add links to supporting resources, comparison pages, and adjacent topics.</p>
            </div>
          </ResultCard>
        </div>
      </div>
    </div>
  )
}
