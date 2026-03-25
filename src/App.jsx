import { Suspense, useEffect } from 'react'
import { Routes, Route, useParams, useLocation } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import CategoryPage from './pages/CategoryPage.jsx'
import FavoritesPage from './pages/FavoritesPage.jsx'
import MyStatsPage from './pages/MyStatsPage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import PrivacyPage from './pages/PrivacyPage.jsx'
import TermsPage from './pages/TermsPage.jsx'
import SearchResultsPage from './pages/SearchResultsPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import DisclaimerBadge from './components/DisclaimerBadge.jsx'
import RelatedTools from './components/RelatedTools.jsx'
import ToolFAQ from './components/ToolFAQ.jsx'
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

function ToolPage() {
  const { toolId } = useParams()
  const tool = tools.find((t) => t.id === toolId)

  useEffect(() => {
    if (tool?.id) {
      addRecentTool(tool.id)
      recordToolVisit(tool.id)
    }
  }, [tool?.id])

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

      {/* Tool title */}
      <div className="flex items-start gap-3 mb-5">
        <div className={`p-2.5 rounded-xl ${colors.bg} ${colors.darkBg} shrink-0`}>
          <Icon className={`w-6 h-6 ${colors.icon}`} />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{tool.name}</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-0.5">{tool.description}</p>
        </div>
      </div>

      {/* Disclaimer */}
      <DisclaimerBadge />

      <ErrorBoundary>
        <Suspense fallback={<ToolSkeleton />}>
          <ToolComponent />
        </Suspense>
      </ErrorBoundary>

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
          <Route path="/category/:categoryId" element={<CategoryPage />} />
          <Route path="/tools/:toolId" element={<ToolPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </PageTransition>
    </Layout>
  )
}
