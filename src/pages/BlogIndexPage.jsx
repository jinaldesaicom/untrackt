import { Link } from 'react-router-dom'
import { CalendarDays, Clock3, ArrowRight, Newspaper } from 'lucide-react'
import SEOHead from '../components/SEOHead.jsx'
import blogPosts from '../data/blogPosts.js'
import SponsorBanner from '../components/SponsorBanner.jsx'
import { getBlogEnhancement } from '../data/blogEnhancements.js'

const sortedPosts = [...blogPosts].sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))

const blogListJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: 'UnTrackt Blog',
  description: 'Privacy-first productivity and online tools insights from UnTrackt',
  url: 'https://untrackt.com/blog',
  blogPost: sortedPosts.map((post) => ({
    '@type': 'BlogPosting',
    headline: post.title,
    url: `https://untrackt.com/blog/${post.slug}`,
    image: `https://untrackt.com${getBlogEnhancement(post.slug)?.ogImage || '/og-image.svg'}`,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    description: post.description,
    author: {
      '@type': 'Organization',
      name: 'UnTrackt',
    },
  })),
}

export default function BlogIndexPage() {
  return (
    <div>
      <SEOHead
        title="UnTrackt Blog - Privacy, Productivity, and Better Online Tools"
        description="Read practical guides on privacy-first productivity, browser-only tools, and the hidden trade-offs behind free online utilities."
        path="/blog"
        keywords={[
          'privacy-first blog',
          'online tools privacy',
          'productivity methods',
          'browser-only tools',
          'untrackt blog',
        ]}
        jsonLd={blogListJsonLd}
      />

      <section className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-200 dark:border-indigo-700 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-200 text-xs font-semibold mb-4">
            <Newspaper className="w-3.5 h-3.5" />
            UnTrackt Blog
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-3">
            Privacy-first thinking for modern online tools
          </h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Research-informed articles on productivity systems, data minimization, and practical choices for safer digital workflows.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {sortedPosts.map((post) => (
            <article
              key={post.slug}
              className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
            >
              <h2 className="text-xl font-bold text-gray-900 dark:text-white leading-tight">
                <Link to={`/blog/${post.slug}`} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  {post.title}
                </Link>
              </h2>

              <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="w-3.5 h-3.5" />
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock3 className="w-3.5 h-3.5" />
                  {post.readingMinutes} min read
                </span>
              </div>

              <p className="mt-4 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{post.description}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                {post.keywords.slice(0, 3).map((keyword) => (
                  <span
                    key={keyword}
                    className="inline-flex rounded-full border border-gray-200 dark:border-gray-700 px-2.5 py-1 text-[11px] text-gray-500 dark:text-gray-400"
                  >
                    {keyword}
                  </span>
                ))}
              </div>

              <Link
                to={`/blog/${post.slug}`}
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Read article
                <ArrowRight className="w-4 h-4" />
              </Link>
            </article>
          ))}
        </div>

        <SponsorBanner />
      </section>
    </div>
  )
}
