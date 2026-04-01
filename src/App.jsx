import { Suspense, lazy, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import PageTransition from './components/PageTransition.jsx'
import { prefetchRoute, prefetchCategory } from './hooks/usePrefetchTool.js'
import { useTheme } from './hooks/useTheme.js'
const Home = lazy(() => import('./pages/Home.jsx'))
const CategoryPage = lazy(() => import('./pages/CategoryPage.jsx'))
const FavoritesPage = lazy(() => import('./pages/FavoritesPage.jsx'))
const MyStatsPage = lazy(() => import('./pages/MyStatsPage.jsx'))
const AboutPage = lazy(() => import('./pages/AboutPage.jsx'))
const PrivacyPage = lazy(() => import('./pages/PrivacyPage.jsx'))
const TermsPage = lazy(() => import('./pages/TermsPage.jsx'))
const SearchResultsPage = lazy(() => import('./pages/SearchResultsPage.jsx'))
const TagPage = lazy(() => import('./pages/TagPage.jsx'))
const SitemapPage = lazy(() => import('./pages/SitemapPage.jsx'))
const WikiIndexPage = lazy(() => import('./pages/WikiIndexPage.jsx'))
const WikiToolPage = lazy(() => import('./pages/WikiToolPage.jsx'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage.jsx'))
const ToolPage = lazy(() => import('./pages/ToolPage.jsx'))
const AiDirectoryPage = lazy(() => import('./pages/ai-directory/AiDirectoryPage.jsx'))
const AiToolDetailPage = lazy(() => import('./pages/ai-directory/AiToolDetailPage.jsx'))
const AiComparePage = lazy(() => import('./pages/ai-directory/AiComparePage.jsx'))
const StatusPagesDirectory = lazy(() => import('./pages/StatusPagesDirectory.jsx'))
const GitHubStarsDirectory = lazy(() => import('./pages/GitHubStarsDirectory.jsx'))
const AILearningDirectory = lazy(() => import('./pages/AILearningDirectory.jsx'))
const CloudCertificationsDirectory = lazy(() => import('./pages/CloudCertificationsDirectory.jsx'))
const SystemDesignDirectory = lazy(() => import('./pages/SystemDesignDirectory.jsx'))
const InterviewPrepDirectory = lazy(() => import('./pages/InterviewPrepDirectory.jsx'))
const CheatsheetsDirectory = lazy(() => import('./pages/CheatsheetsDirectory.jsx'))
const CheatsheetPage = lazy(() => import('./pages/CheatsheetPage.jsx'))

export default function App() {
  const { theme, isDark } = useTheme()
  const location = useLocation()

  useEffect(() => {
    const preload = () => {
      prefetchRoute('/')
      prefetchCategory()
    }
    if (typeof requestIdleCallback === 'function') {
      const id = requestIdleCallback(preload)
      return () => cancelIdleCallback(id)
    }
    const timer = setTimeout(preload, 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <Layout theme={theme} isDark={isDark}>
      <PageTransition key={location.pathname}>
        <Suspense fallback={<div className="min-h-[60vh]" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/my-stats" element={<MyStatsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/privacy-policy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/search" element={<SearchResultsPage />} />
            <Route path="/tags/:tag" element={<TagPage />} />
            <Route path="/sitemap" element={<SitemapPage />} />
            <Route path="/wiki" element={<WikiIndexPage />} />
            <Route path="/wiki/:toolId" element={<WikiToolPage />} />
            <Route path="/category/:categoryId" element={<CategoryPage />} />
            <Route path="/tools/:toolId" element={<ToolPage />} />
            <Route path="/ai-directory" element={<AiDirectoryPage />} />
            <Route path="/ai-directory/compare" element={<AiComparePage />} />
            <Route path="/ai-directory/:toolId" element={<AiToolDetailPage />} />
            <Route path="/status-pages" element={<StatusPagesDirectory />} />
            <Route path="/github-stars" element={<GitHubStarsDirectory />} />
            <Route path="/ai-learning" element={<AILearningDirectory />} />
            <Route path="/certifications" element={<CloudCertificationsDirectory />} />
            <Route path="/system-design" element={<SystemDesignDirectory />} />
            <Route path="/interview-prep" element={<InterviewPrepDirectory />} />
            <Route path="/cheatsheets" element={<CheatsheetsDirectory />} />
            <Route path="/cheatsheets/:sheetId" element={<CheatsheetPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </PageTransition>
    </Layout>
  )
}
