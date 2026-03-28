import { useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Tag } from 'lucide-react'
import SEOHead from '../components/SEOHead.jsx'
import ToolGrid from '../components/ToolGrid.jsx'
import TagCloud from '../components/TagCloud.jsx'
import { getToolsByTag } from '../search/searchEngine.js'

export default function TagPage() {
  const { tag } = useParams()
  const decodedTag = decodeURIComponent(tag || '')
  const tagTools = useMemo(() => getToolsByTag(decodedTag), [decodedTag])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <SEOHead
        title={`Tools tagged "${decodedTag}" | UnTrackt`}
        description={`Browse free browser-based tools tagged "${decodedTag}" on UnTrackt.`}
        path={`/tags/${encodeURIComponent(decodedTag)}`}
      />

      <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-8">
        <Link to="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Home</Link>
        <span>/</span>
        <span className="text-gray-900 dark:text-gray-100 font-medium">Tag: {decodedTag}</span>
      </nav>

      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 rounded-xl bg-indigo-100 dark:bg-indigo-900/30">
          <Tag className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            #{decodedTag}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {tagTools.length} tool{tagTools.length !== 1 ? 's' : ''} with this tag
          </p>
        </div>
      </div>

      <ToolGrid tools={tagTools} />

      <section className="mt-12">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Browse more tags</h2>
        <TagCloud limit={40} />
      </section>
    </div>
  )
}
