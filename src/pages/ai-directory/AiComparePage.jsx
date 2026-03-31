import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ArrowLeft, ExternalLink, Check, X } from 'lucide-react'
import SEOHead from '../../components/SEOHead.jsx'
import { getAiToolById, aiCategories } from '../../data/ai-directory/index.js'

const pricingColors = {
  free: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300',
  freemium: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
  paid: 'bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300',
  'open-source': 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300',
}

const pricingLabels = {
  free: 'Free',
  freemium: 'Freemium',
  paid: 'Paid',
  'open-source': 'Open Source',
}

export default function AiComparePage() {
  const [searchParams] = useSearchParams()
  const toolIds = (searchParams.get('tools') || '').split(',').filter(Boolean)
  const tools = useMemo(() => toolIds.map(getAiToolById).filter(Boolean), [toolIds.join(',')])

  if (tools.length < 2) {
    return (
      <div className="max-w-3xl mx-auto text-center py-20">
        <SEOHead title="Compare AI Tools" path="/ai-directory/compare" noindex />
        <p className="text-6xl mb-4">⚖️</p>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Select tools to compare</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          Select at least 2 tools from the directory to see a side-by-side comparison.
        </p>
        <Link
          to="/ai-directory"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700"
        >
          <ArrowLeft size={16} />
          Back to Directory
        </Link>
      </div>
    )
  }

  const maxFeatures = Math.max(...tools.map((t) => t.features?.length || 0))
  const maxPros = Math.max(...tools.map((t) => t.pros?.length || 0))
  const maxCons = Math.max(...tools.map((t) => t.cons?.length || 0))

  return (
    <>
      <SEOHead
        title={`Compare: ${tools.map((t) => t.name).join(' vs ')} — AI Tools Directory`}
        description={`Side-by-side comparison of ${tools.map((t) => t.name).join(', ')}`}
        path="/ai-directory/compare"
        noindex
      />

      <div className="max-w-6xl mx-auto">
        <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
          <Link to="/ai-directory" className="hover:text-blue-600 dark:hover:text-blue-400">
            AI Directory
          </Link>
          <span>/</span>
          <span className="text-gray-900 dark:text-white font-medium">Compare</span>
        </nav>

        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          {tools.map((t) => t.name).join(' vs ')}
        </h1>

        {/* Comparison table */}
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800">
                <th className="py-4 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 w-36">
                  Feature
                </th>
                {tools.map((tool) => (
                  <th key={tool.id} className="py-4 px-4 text-center">
                    <Link to={`/ai-directory/${tool.id}`} className="inline-flex flex-col items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400">
                      <span className="text-2xl">{tool.emoji}</span>
                      <span className="font-semibold text-gray-900 dark:text-white text-sm">{tool.name}</span>
                    </Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {/* Description */}
              <tr className="bg-white dark:bg-gray-800/50">
                <td className="py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400">Description</td>
                {tools.map((t) => (
                  <td key={t.id} className="py-3 px-4 text-sm text-gray-700 dark:text-gray-300 text-left">
                    {t.description}
                  </td>
                ))}
              </tr>

              {/* Pricing */}
              <tr className="bg-gray-50/50 dark:bg-gray-800">
                <td className="py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400">Pricing</td>
                {tools.map((t) => (
                  <td key={t.id} className="py-3 px-4 text-left">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${pricingColors[t.pricing]}`}>
                      {pricingLabels[t.pricing]}
                    </span>
                  </td>
                ))}
              </tr>

              {/* Pricing details */}
              <tr className="bg-white dark:bg-gray-800/50">
                <td className="py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400">Pricing Details</td>
                {tools.map((t) => (
                  <td key={t.id} className="py-3 px-4 text-xs text-gray-600 dark:text-gray-400 text-left">
                    {t.pricingDetails}
                  </td>
                ))}
              </tr>

              {/* Platform */}
              <tr className="bg-gray-50/50 dark:bg-gray-800">
                <td className="py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400">Platform</td>
                {tools.map((t) => (
                  <td key={t.id} className="py-3 px-4 text-left">
                    <div className="flex flex-wrap gap-1 justify-start">
                      {t.platform?.map((p) => (
                        <span key={p} className="px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                          {p.charAt(0).toUpperCase() + p.slice(1)}
                        </span>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Category */}
              <tr className="bg-white dark:bg-gray-800/50">
                <td className="py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400">Category</td>
                {tools.map((t) => {
                  const cat = aiCategories.find((c) => c.id === t.category)
                  return (
                    <td key={t.id} className="py-3 px-4 text-sm text-gray-700 dark:text-gray-300 text-left">
                      {cat ? `${cat.emoji} ${cat.name}` : t.category}
                    </td>
                  )
                })}
              </tr>

              {/* Key Features */}
              <tr className="bg-gray-50/50 dark:bg-gray-800">
                <td className="py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 align-top">Key Features</td>
                {tools.map((t) => (
                  <td key={t.id} className="py-3 px-4 align-top">
                    <ul className="space-y-1.5">
                      {t.features?.map((f, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-xs text-gray-700 dark:text-gray-300">
                          <Check size={12} className="text-green-500 mt-0.5 flex-shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>

              {/* Pros */}
              <tr className="bg-white dark:bg-gray-800/50">
                <td className="py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 align-top">Pros</td>
                {tools.map((t) => (
                  <td key={t.id} className="py-3 px-4 align-top">
                    <ul className="space-y-1.5">
                      {t.pros?.map((p, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-xs text-gray-700 dark:text-gray-300">
                          <Check size={12} className="text-green-500 mt-0.5 flex-shrink-0" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>

              {/* Cons */}
              <tr className="bg-gray-50/50 dark:bg-gray-800">
                <td className="py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 align-top">Cons</td>
                {tools.map((t) => (
                  <td key={t.id} className="py-3 px-4 align-top">
                    <ul className="space-y-1.5">
                      {t.cons?.map((c, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-xs text-gray-700 dark:text-gray-300">
                          <X size={12} className="text-red-400 mt-0.5 flex-shrink-0" />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>

              {/* Visit */}
              <tr className="bg-white dark:bg-gray-800/50">
                <td className="py-4 px-4 text-xs font-medium text-gray-500 dark:text-gray-400">Website</td>
                {tools.map((t) => (
                  <td key={t.id} className="py-4 px-4 text-left">
                    <a
                      href={t.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-medium hover:bg-blue-700"
                    >
                      Visit {t.name} <ExternalLink size={12} />
                    </a>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Back link */}
        <div className="text-center pt-8 pb-4">
          <Link
            to="/ai-directory"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
          >
            <ArrowLeft size={16} />
            Back to AI Directory
          </Link>
        </div>
      </div>
    </>
  )
}
