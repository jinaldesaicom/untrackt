import { Suspense, useEffect, useCallback } from 'react'
import { Routes, Route, useParams, useLocation, Link } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import CategoryPage from './pages/CategoryPage.jsx'
import FavoritesPage from './pages/FavoritesPage.jsx'
import MyStatsPage from './pages/MyStatsPage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import PrivacyPage from './pages/PrivacyPage.jsx'
import TermsPage from './pages/TermsPage.jsx'
import SearchResultsPage from './pages/SearchResultsPage.jsx'
import TagPage from './pages/TagPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import DisclaimerBadge from './components/DisclaimerBadge.jsx'
import RelatedTools from './components/RelatedTools.jsx'
import ToolFAQ from './components/ToolFAQ.jsx'
import ToolGuide from './components/ToolGuide.jsx'
import ToolSkeleton from './components/ToolSkeleton.jsx'
import SEOHead from './components/SEOHead.jsx'
import Breadcrumb from './components/Breadcrumb.jsx'
import PageTransition from './components/PageTransition.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import tools, { categories, categoryColorMap } from './data/tools.js'
import { richDescriptions } from './data/toolDescriptions.js'
import { getIcon } from './icons.js'
import { addRecentTool } from './utils/storage.js'
import { recordToolVisit } from './utils/localStats.js'
import { useTheme } from './hooks/useTheme.js'
import { Share2, Tag } from 'lucide-react'

function ToolPage() {
  const { toolId } = useParams()
  const tool = tools.find((t) => t.id === toolId)

  useEffect(() => {
    if (tool?.id) {
      addRecentTool(tool.id)
      recordToolVisit(tool.id)
    }
  }, [tool?.id])

  const handleShare = useCallback(() => {
    const url = window.location.href
    if (navigator.share) {
      navigator.share({ title: tool?.name, text: tool?.description, url }).catch(() => {})
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(url).catch(() => {})
    }
  }, [tool])

  if (!tool) {
    return <NotFoundPage />
  }

  const ToolComponent = tool.component
  const category = categories.find((c) => c.id === tool.category)
  const colors = categoryColorMap[tool.category]
  const Icon = getIcon(tool.icon)
  const richContent = richDescriptions[tool.id]

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <SEOHead
        title={`${tool.name} - Free Online Tool | UnTrackt`}
        description={richContent?.shortDescription || `${tool.description} Free, private, runs in your browser. No data sent to any server.`}
        path={tool.path}
        toolName={tool.name}
        category={category?.name || tool.category}
        ogImage={`https://untrackt.com/og-${tool.category}.svg`}
        faqs={richContent?.faqs}
      />

      <Breadcrumb category={tool.category} toolName={tool.name} toolPath={tool.path} />

      {/* Tool title + share */}
      <div className="flex items-start gap-3 mb-3">
        <div className={`p-2.5 rounded-xl ${colors.bg} ${colors.darkBg} shrink-0`}>
          <Icon className={`w-6 h-6 ${colors.icon}`} />
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{tool.name}</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-0.5">{tool.description}</p>
        </div>
        <button
          onClick={handleShare}
          className="shrink-0 p-2 rounded-lg text-gray-400 hover:text-indigo-600 hover:bg-gray-100 dark:hover:text-indigo-400 dark:hover:bg-gray-800 transition-colors"
          aria-label="Share this tool"
          title="Share"
        >
          <Share2 className="w-5 h-5" />
        </button>
      </div>

      {/* Metadata bar */}
      <div className="flex flex-wrap items-center gap-2 mb-5 text-xs">
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-white ${colors.pill}`}>
          {category?.name || tool.category}
        </span>
        {tool.subcategory && (
          <span className="px-2 py-0.5 rounded-full border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 capitalize">
            {tool.subcategory}
          </span>
        )}
        {tool.isNew && (
          <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300 font-semibold">New</span>
        )}
        {tool.isPopular && (
          <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300 font-semibold">Popular</span>
        )}
        {tool.tags?.slice(0, 5).map((t) => (
          <Link key={t} to={`/tags/${encodeURIComponent(t)}`} className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors">
            <Tag className="w-3 h-3" /> {t}
          </Link>
        ))}
      </div>

      {/* Disclaimer */}
      <DisclaimerBadge />

      <ErrorBoundary>
        <Suspense fallback={<ToolSkeleton />}>
          <ToolComponent />
        </Suspense>
      </ErrorBoundary>

      <ToolGuide toolId={tool.id} />

      {richContent?.longDescription ? (
        <section aria-label="Tool details" className="mt-8 rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">About this tool</h2>
          <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300">{richContent.longDescription}</p>
        </section>
      ) : null}

      <RelatedTools currentToolId={tool.id} category={tool.category} />
      <ToolFAQ toolId={tool.id} />
    </div>
  )
}

export default function App() {
  const { theme, isDark } = useTheme()
  const location = useLocation()

  return (
    <Layout theme={theme} isDark={isDark}>
      <PageTransition key={location.pathname}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/my-stats" element={<MyStatsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/tags/:tag" element={<TagPage />} />
          <Route path="/category/:categoryId" element={<CategoryPage />} />
          <Route path="/tools/:toolId" element={<ToolPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </PageTransition>
    </Layout>
  )
}
