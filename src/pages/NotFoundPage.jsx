import { Link } from 'react-router-dom'
import SearchBar from '../components/SearchBar.jsx'
import SEOHead from '../components/SEOHead.jsx'
import ToolGrid from '../components/ToolGrid.jsx'
import tools from '../data/tools.js'

function pickRandomTools(count = 3) {
  return [...tools].sort(() => Math.random() - 0.5).slice(0, count)
}

export default function NotFoundPage() {
  const suggestions = pickRandomTools(3)

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <SEOHead
        title="404 - Tool Not Found | UnTrackt"
        description="The requested page could not be found."
        path="/404"
        noindex
      />

      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">404 - Tool Not Found</h1>
        <p className="mt-3 text-gray-500 dark:text-gray-400">The page you requested does not exist, but you can quickly find tools below.</p>
        <div className="mx-auto mt-6 max-w-lg">
          <SearchBar large />
        </div>
        <Link to="/" className="btn-primary mt-6 inline-flex">Go to home</Link>
      </div>

      <section className="mt-10">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Try one of these tools</h2>
        <ToolGrid tools={suggestions} />
      </section>
    </div>
  )
}
