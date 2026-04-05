import { Link, useParams } from 'react-router-dom'
import { CalendarDays, Clock3, ChevronLeft, Wrench, BookOpen, ShieldCheck, ArrowRight } from 'lucide-react'
import SEOHead from '../components/SEOHead.jsx'
import blogPosts, { getBlogPostBySlug } from '../data/blogPosts.js'
import { getBlogEnhancement } from '../data/blogEnhancements.js'
import SponsorBanner from '../components/SponsorBanner.jsx'
import NotFoundPage from './NotFoundPage.jsx'

const BASE_URL = 'https://untrackt.com'

const LINK_KIND_META = {
  tool: { icon: Wrench, label: 'Tool' },
  article: { icon: BookOpen, label: 'Article' },
  policy: { icon: ShieldCheck, label: 'Policy' },
}

function getRelatedPosts(currentSlug, enhancement) {
  if (enhancement?.relatedSlugs?.length) {
    return enhancement.relatedSlugs
      .map((relatedSlug) => blogPosts.find((post) => post.slug === relatedSlug))
      .filter(Boolean)
  }

  return blogPosts.filter((post) => post.slug !== currentSlug).slice(0, 3)
}

export default function BlogPostPage() {
  const { slug } = useParams()
  const post = getBlogPostBySlug(slug)

  if (!post) {
    return <NotFoundPage />
  }

  const enhancement = getBlogEnhancement(post.slug)
  const relatedPosts = getRelatedPosts(post.slug, enhancement)
  const ogImage = enhancement?.ogImage || '/og-image.svg'

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    mainEntityOfPage: `${BASE_URL}/blog/${post.slug}`,
    image: `${BASE_URL}${ogImage}`,
    author: {
      '@type': 'Organization',
      name: 'UnTrackt',
    },
    publisher: {
      '@type': 'Organization',
      name: 'UnTrackt',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/og-image.svg`,
      },
    },
    keywords: post.keywords.join(', '),
  }

  return (
    <div>
      <SEOHead
        title={`${post.title} | UnTrackt Blog`}
        description={post.description}
        path={`/blog/${post.slug}`}
        keywords={post.keywords}
        ogImage={`${BASE_URL}${ogImage}`}
        category="Blog"
        faqs={post.faqs}
        jsonLd={articleJsonLd}
        breadcrumbs={[
          { name: 'Home', url: BASE_URL },
          { name: 'Blog', url: `${BASE_URL}/blog` },
          { name: post.title, url: `${BASE_URL}/blog/${post.slug}` },
        ]}
      />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Link
          to="/blog"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline mb-5"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to blog
        </Link>

        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white leading-tight">
            {post.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="w-4 h-4" />
              Published {new Date(post.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock3 className="w-4 h-4" />
              {post.readingMinutes} min read
            </span>
          </div>

          <p className="mt-5 text-base text-gray-600 dark:text-gray-300 leading-relaxed">
            {post.description}
          </p>
        </header>

        <div className="prose dark:prose-invert prose-headings:tracking-tight max-w-none">
          {post.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}

          <h2>Quick summary</h2>
          <ul>
            {post.sections.slice(0, 3).map((section) => (
              <li key={section.heading}>{section.heading}</li>
            ))}
          </ul>
        </div>
      </article>

      {enhancement?.internalLinks?.length > 0 && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
          <div className="rounded-2xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50/70 dark:bg-indigo-950/20 p-6">
            <div className="flex items-center justify-between gap-4 mb-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Keep exploring this topic</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  These internal links deepen the privacy and productivity path behind this article.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {enhancement.internalLinks.map((item) => {
                const meta = LINK_KIND_META[item.kind] || LINK_KIND_META.article
                const Icon = meta.icon

                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="rounded-xl border border-white/70 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors"
                  >
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-400 mb-2">
                      <Icon className="w-3.5 h-3.5" />
                      {meta.label}
                    </div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white leading-snug">{item.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">{item.description}</p>
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-600 dark:text-indigo-400 mt-3">
                      Open
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {relatedPosts.length > 0 && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Related articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {relatedPosts.map((related) => (
              <Link
                key={related.slug}
                to={`/blog/${related.slug}`}
                className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors"
              >
                <p className="text-sm font-semibold text-gray-900 dark:text-white leading-snug">{related.title}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{related.readingMinutes} min read</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SponsorBanner />
      </div>
    </div>
  )
}
