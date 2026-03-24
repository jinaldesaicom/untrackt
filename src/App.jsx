import { Suspense, lazy } from 'react'
import { Routes, Route, useParams, Link } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import CategoryPage from './pages/CategoryPage.jsx'
import DisclaimerBadge from './components/DisclaimerBadge.jsx'
import ToolCard from './components/ToolCard.jsx'
import tools, { categories, categoryColorMap } from './data/tools.js'
import { getIcon } from './icons.js'

function ToolSuspenseFallback() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 text-center">
      <div className="inline-block w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      <p className="text-gray-500 mt-3 text-sm">Loading tool...</p>
    </div>
  )
}

function ToolPage() {
  const { toolId } = useParams()
  const tool = tools.find((t) => t.id === toolId)

  if (!tool) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Tool not found</h1>
        <Link to="/" className="text-indigo-600 hover:underline">← Back to Home</Link>
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
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6 flex-wrap">
        <Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link>
        <span>/</span>
        <Link to={`/category/${tool.category}`} className="hover:text-indigo-600 transition-colors">
          {category?.name || tool.category}
        </Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">{tool.name}</span>
      </nav>

      {/* Tool title */}
      <div className="flex items-start gap-3 mb-5">
        <div className={`p-2.5 rounded-xl ${colors.bg} shrink-0`}>
          <Icon className={`w-6 h-6 ${colors.icon}`} />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">{tool.name}</h1>
          <p className="text-gray-500 text-sm mt-0.5">{tool.description}</p>
        </div>
      </div>

      {/* Disclaimer */}
      <DisclaimerBadge />

      {/* Tool UI */}
      <Suspense fallback={<ToolSuspenseFallback />}>
        <ToolComponent />
      </Suspense>

      {/* Related tools */}
      {relatedTools.length > 0 && (
        <div className="mt-14">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
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
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:categoryId" element={<CategoryPage />} />
        <Route path="/tools/:toolId" element={<ToolPage />} />
      </Routes>
    </Layout>
  )
}
