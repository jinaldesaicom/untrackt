import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import SEOHead from '../components/SEOHead.jsx'
import Breadcrumb from '../components/Breadcrumb.jsx'
import tools, { categories, categoryColorMap } from '../data/tools.js'
import { getIcon } from '../icons.js'
import { getWikiEntry } from '../wiki/data/index.js'
import {
  BookOpen,
  Lightbulb,
  ListChecks,
  Sparkles,
  Target,
  FileText,
  MessageCircleQuestion,
  Award,
  ChevronRight,
  ArrowLeft,
  ExternalLink,
  Hash,
} from 'lucide-react'

const sectionIcons = {
  whatIs: BookOpen,
  whyUse: Lightbulb,
  howToUse: ListChecks,
  features: Sparkles,
  useCases: Target,
  examples: FileText,
  terminology: Hash,
  faqs: MessageCircleQuestion,
  bestPractices: Award,
}

const sectionColors = {
  whatIs: 'from-blue-500 to-blue-600',
  whyUse: 'from-amber-500 to-orange-500',
  howToUse: 'from-emerald-500 to-teal-500',
  features: 'from-violet-500 to-purple-500',
  useCases: 'from-rose-500 to-pink-500',
  examples: 'from-cyan-500 to-blue-500',
  terminology: 'from-indigo-500 to-violet-500',
  faqs: 'from-teal-500 to-emerald-500',
  bestPractices: 'from-orange-500 to-amber-500',
}

export default function WikiToolPage() {
  const { toolId } = useParams()
  const [wiki, setWiki] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeSection, setActiveSection] = useState('')

  const tool = tools.find((t) => t.id === toolId)
  const category = categories.find((c) => c.id === tool?.category)
  const colors = categoryColorMap[tool?.category] || {}

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    getWikiEntry(toolId).then((data) => {
      if (!cancelled) {
        setWiki(data)
        setLoading(false)
      }
    })
    return () => { cancelled = true }
  }, [toolId])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
    )
    const sections = document.querySelectorAll('[data-wiki-section]')
    sections.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [wiki])

  if (!tool) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <BookOpen className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
        <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Wiki article not found</h1>
        <Link to="/wiki" className="text-emerald-600 dark:text-emerald-400 hover:underline text-sm">← Back to Wiki</Link>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="animate-pulse space-y-6">
          <div className="h-32 rounded-2xl bg-gray-200 dark:bg-gray-700" />
          <div className="h-6 w-2/3 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-4 w-5/6 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-40 rounded-xl bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>
    )
  }

  if (!wiki) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <BookOpen className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
        <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No wiki entry available</h1>
        <Link to="/wiki" className="text-emerald-600 dark:text-emerald-400 hover:underline text-sm">← Back to Wiki</Link>
      </div>
    )
  }

  const Icon = getIcon(tool.icon)
  const content = wiki.content
  const sectionKeys = Object.keys(content).filter((k) => content[k])

  const relatedToolObjects = (wiki.relatedTools || [])
    .map((id) => tools.find((t) => t.id === id))
    .filter(Boolean)

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <SEOHead
        title={wiki.seo?.metaTitle || `${wiki.title} - Wiki | UnTrackt`}
        description={wiki.seo?.metaDescription || wiki.description}
        path={`/wiki/${tool.id}`}
        keywords={wiki.seo?.keywords}
        breadcrumbs={[
          { name: 'Home', url: 'https://untrackt.com' },
          { name: 'Wiki', url: 'https://untrackt.com/wiki' },
          { name: wiki.title, url: `https://untrackt.com/wiki/${tool.id}` },
        ]}
      />

      {/* Back link */}
      <div className="mb-4">
        <Link to="/wiki" className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
          <ArrowLeft className="w-4 h-4" /> All Wiki Guides
        </Link>
      </div>

      <div className="flex gap-8">
        {/* Sidebar TOC — desktop only */}
        <aside className="hidden lg:block w-56 shrink-0">
          <div className="sticky top-24 space-y-1">
            <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">On this page</p>
            {sectionKeys.map((key) => {
              const heading = content[key]?.heading || key
              const isActive = activeSection === `wiki-${key}`
              return (
                <a
                  key={key}
                  href={`#wiki-${key}`}
                  className={`block text-xs py-1.5 px-2 rounded-md transition-colors ${
                    isActive
                      ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 font-semibold'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  {heading}
                </a>
              )
            })}
            <hr className="border-gray-200 dark:border-gray-700 my-3" />
            <Link
              to={tool.path}
              className="flex items-center gap-1.5 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline px-2"
            >
              Open Tool <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Hero card */}
          <div className={`relative overflow-hidden rounded-2xl ${colors.bg} ${colors.darkBg} border ${colors.border} ${colors.darkBorder} p-6 sm:p-8 mb-8`}>
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-xl bg-white/80 dark:bg-black/20 shrink-0`}>
                <Icon className={`w-7 h-7 ${colors.icon}`} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className={`text-xs px-2 py-0.5 rounded-full text-white ${colors.pill} font-semibold`}>
                    {category?.name}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">Wiki Guide</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                  {wiki.title}
                </h1>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl">
                  {wiki.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Link
                    to={tool.path}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm"
                  >
                    Try This Tool <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile TOC */}
          <details className="lg:hidden mb-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 overflow-hidden">
            <summary className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer select-none">
              <ListChecks className="w-4 h-4 text-emerald-500" /> Table of Contents
            </summary>
            <div className="px-4 pb-3 space-y-1">
              {sectionKeys.map((key) => (
                <a
                  key={key}
                  href={`#wiki-${key}`}
                  className="block text-xs py-1 text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  {content[key]?.heading || key}
                </a>
              ))}
            </div>
          </details>

          {/* Sections */}
          <div className="space-y-8">
            {/* What Is */}
            {content.whatIs && (
              <SectionCard id="wiki-whatIs" sectionKey="whatIs" heading={content.whatIs.heading}>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{content.whatIs.body}</p>
              </SectionCard>
            )}

            {/* Why Use */}
            {content.whyUse && (
              <SectionCard id="wiki-whyUse" sectionKey="whyUse" heading={content.whyUse.heading}>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{content.whyUse.body}</p>
              </SectionCard>
            )}

            {/* How to Use */}
            {content.howToUse && (
              <SectionCard id="wiki-howToUse" sectionKey="howToUse" heading={content.howToUse.heading}>
                <ol className="space-y-3">
                  {content.howToUse.steps.map((step, i) => (
                    <li key={i} className="flex gap-3 text-sm">
                      <span className="shrink-0 w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center justify-center">
                        {i + 1}
                      </span>
                      <span className="text-gray-600 dark:text-gray-300 leading-relaxed pt-0.5">{step}</span>
                    </li>
                  ))}
                </ol>
              </SectionCard>
            )}

            {/* Features */}
            {content.features && (
              <SectionCard id="wiki-features" sectionKey="features" heading={content.features.heading}>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {content.features.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <Sparkles className="w-3.5 h-3.5 text-violet-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </SectionCard>
            )}

            {/* Use Cases */}
            {content.useCases && (
              <SectionCard id="wiki-useCases" sectionKey="useCases" heading={content.useCases.heading}>
                <ul className="space-y-2">
                  {content.useCases.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <Target className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </SectionCard>
            )}

            {/* Examples */}
            {content.examples && (
              <SectionCard id="wiki-examples" sectionKey="examples" heading={content.examples.heading}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {content.examples.items.map((ex, i) => (
                    <div key={i} className="rounded-lg border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/40 p-3.5">
                      <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">{ex.title}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{ex.description}</p>
                    </div>
                  ))}
                </div>
              </SectionCard>
            )}

            {/* Terminology */}
            {content.terminology && (
              <SectionCard id="wiki-terminology" sectionKey="terminology" heading={content.terminology.heading}>
                <dl className="space-y-3">
                  {content.terminology.terms.map((t, i) => (
                    <div key={i} className="rounded-lg border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/40 p-3.5">
                      <dt className="text-sm font-semibold text-gray-800 dark:text-gray-200">{t.term}</dt>
                      <dd className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed">{t.definition}</dd>
                    </div>
                  ))}
                </dl>
              </SectionCard>
            )}

            {/* FAQs */}
            {content.faqs && (
              <SectionCard id="wiki-faqs" sectionKey="faqs" heading={content.faqs.heading}>
                <div className="space-y-3">
                  {content.faqs.items.map((faq, i) => (
                    <details key={i} className="group rounded-lg border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/40 overflow-hidden">
                      <summary className="flex items-center justify-between px-4 py-3 cursor-pointer select-none text-sm font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700/30 transition-colors">
                        {faq.question}
                        <ChevronRight className="w-4 h-4 text-gray-400 group-open:rotate-90 transition-transform shrink-0" />
                      </summary>
                      <div className="px-4 pb-3 text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                        {faq.answer}
                      </div>
                    </details>
                  ))}
                </div>
              </SectionCard>
            )}

            {/* Best Practices */}
            {content.bestPractices && (
              <SectionCard id="wiki-bestPractices" sectionKey="bestPractices" heading={content.bestPractices.heading}>
                <ul className="space-y-2">
                  {content.bestPractices.items.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <Award className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </SectionCard>
            )}
          </div>

          {/* Related Tools */}
          {relatedToolObjects.length > 0 && (
            <section className="mt-10">
              <h2 className="text-base font-bold text-gray-900 dark:text-white mb-4">Related Wiki Guides</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {relatedToolObjects.map((rt) => {
                  const RIcon = getIcon(rt.icon)
                  const rc = categoryColorMap[rt.category] || {}
                  return (
                    <Link
                      key={rt.id}
                      to={`/wiki/${rt.id}`}
                      className="group flex items-center gap-3 p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 hover:border-emerald-300 dark:hover:border-emerald-600 hover:shadow-md transition-all"
                    >
                      <div className={`p-1.5 rounded-lg ${rc.bg} ${rc.darkBg} shrink-0`}>
                        <RIcon className={`w-3.5 h-3.5 ${rc.icon}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 dark:text-gray-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 truncate transition-colors">
                          {rt.name}
                        </p>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-gray-300 dark:text-gray-600 shrink-0" />
                    </Link>
                  )
                })}
              </div>
            </section>
          )}

          {/* CTA */}
          <div className="mt-10 rounded-xl border border-gray-200 dark:border-gray-700 bg-gradient-to-r from-indigo-50 to-violet-50 dark:from-indigo-900/20 dark:to-violet-900/20 p-6 text-center">
            <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">Ready to try it?</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              All tools run privately in your browser. No sign-ups, no tracking.
            </p>
            <Link
              to={tool.path}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm"
            >
              Open {tool.name} <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

function SectionCard({ id, sectionKey, heading, children }) {
  const SIcon = sectionIcons[sectionKey] || BookOpen
  const gradient = sectionColors[sectionKey] || 'from-gray-500 to-gray-600'

  return (
    <section
      id={id}
      data-wiki-section
      className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 overflow-hidden scroll-mt-24"
    >
      <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-gray-100 dark:border-gray-700/50">
        <div className={`p-1.5 rounded-lg bg-gradient-to-br ${gradient} shrink-0`}>
          <SIcon className="w-3.5 h-3.5 text-white" />
        </div>
        <h2 className="text-base font-bold text-gray-900 dark:text-white">{heading}</h2>
      </div>
      <div className="p-5">{children}</div>
    </section>
  )
}
