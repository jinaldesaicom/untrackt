import { Suspense, useEffect } from 'react'
import { Routes, Route, useParams, Link } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import CategoryPage from './pages/CategoryPage.jsx'
import FavoritesPage from './pages/FavoritesPage.jsx'
import DisclaimerBadge from './components/DisclaimerBadge.jsx'
import ToolCard from './components/ToolCard.jsx'
import ToolSkeleton from './components/ToolSkeleton.jsx'
import SEOHead from './components/SEOHead.jsx'
import tools, { categories, categoryColorMap } from './data/tools.js'
import { getIcon } from './icons.js'
import { addRecentTool } from './utils/storage.js'
import { useTheme } from './hooks/useTheme.js'

function ToolPage() {
  const { toolId } = useParams()
  const tool = tools.find((t) => t.id === toolId)

  useEffect(() => {
    if (tool?.id) {
      addRecentTool(tool.id)
    }
  }, [tool?.id])

  if (!tool) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Tool not found</h1>
        <Link to="/" className="text-indigo-600 dark:text-indigo-400 hover:underline">← Back to Home</Link>
      </div>
    )
  }

  const ToolComponent = tool.component
  const category = categories.find((c) => c.id === tool.category)
  const colors = categoryColorMap[tool.category]
  const Icon = getIcon(tool.icon)
  const relatedTools = tools.filter((t) => t.category === tool.category && t.id !== tool.id).slice(0, 3)

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <SEOHead
        title={`${tool.name} - Free Online Tool | UnTrackt`}
        description={`${tool.description} Free, private, runs in your browser. No data sent to any server.`}
        path={tool.path}
        toolName={tool.name}
        category={category?.name || tool.category}
      />

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6 flex-wrap">
        <Link to="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Home</Link>
        <span>/</span>
        <Link to={`/category/${tool.category}`} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
          {category?.name || tool.category}
        </Link>
        <span>/</span>
        <span className="text-gray-900 dark:text-gray-100 font-medium">{tool.name}</span>
      </nav>

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

      {/* Tool UI */}
      <Suspense fallback={<ToolSkeleton />}>
        <ToolComponent />
      </Suspense>

      {/* Related tools */}
      {relatedTools.length > 0 && (
        <div className="mt-14">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Other tools in {category?.name || tool.category}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedTools.map((t) => (
              <ToolCard key={t.id} tool={t} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function App() {
  const { theme, isDark } = useTheme()

  return (
    <Layout theme={theme} isDark={isDark}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/category/:categoryId" element={<CategoryPage />} />
        <Route path="/tools/:toolId" element={<ToolPage />} />
      </Routes>
    </Layout>
  )
}
