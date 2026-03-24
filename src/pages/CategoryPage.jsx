import { useParams, Link } from 'react-router-dom'
import ToolGrid from '../components/ToolGrid.jsx'
import SEOHead from '../components/SEOHead.jsx'
import tools, { categories, categoryColorMap } from '../data/tools.js'
import categoryContent from '../data/categoryContent.js'
import { getIcon } from '../icons.js'

export default function CategoryPage() {
  const { categoryId } = useParams()
  const category = categories.find((c) => c.id === categoryId)
  const categoryTools = tools.filter((t) => t.category === categoryId)
  const colors = categoryColorMap[categoryId] || categoryColorMap['general']
  const content = categoryContent[categoryId]

  if (!category) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Category not found</h1>
        <Link to="/" className="text-indigo-600 dark:text-indigo-400 hover:underline">← Back to Home</Link>
      </div>
    )
  }

  const Icon = getIcon(category.icon)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <SEOHead
        title={`${category.name} Tools - Free & Private | UnTrackt`}
        description={content?.seoDescription || `Free ${category.name.toLowerCase()} tools that run in your browser. No sign-up, no tracking, no data stored on any server.`}
        path={`/category/${category.id}`}
      />

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-8">
        <Link to="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Home</Link>
        <span>/</span>
        <span className="text-gray-900 dark:text-gray-100 font-medium">{category.name}</span>
      </nav>

      {/* Header */}
      <div className="flex items-start gap-4 mb-8">
        <div className={`p-3 rounded-xl ${colors.bg} ${colors.darkBg} shrink-0`}>
          <Icon className={`w-8 h-8 ${colors.icon}`} />
        </div>
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">{category.name}</h1>
            <span className={`px-2.5 py-0.5 rounded-full text-sm font-medium text-white ${colors.pill}`}>
              {categoryTools.length} tools
            </span>
          </div>
          <p className="text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">{content?.description || category.description}</p>
          {content?.useCases?.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {content.useCases.slice(0, 4).map((useCase) => (
                <span key={useCase} className="px-3 py-1 rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-xs text-gray-600 dark:text-gray-300">
                  {useCase}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <ToolGrid tools={categoryTools} />
    </div>
  )
}
