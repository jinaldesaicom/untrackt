import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { categories } from '../data/tools.js'

const BASE_URL = 'https://untrackt.com'

export default function Breadcrumb({ category, toolName, toolPath }) {
  const categoryInfo = categories.find((item) => item.id === category)
  const categoryLabel = categoryInfo?.name || category

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
      {
        '@type': 'ListItem',
        position: 2,
        name: categoryLabel,
        item: `${BASE_URL}/category/${category}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: toolName,
        item: `${BASE_URL}${toolPath}`,
      },
    ],
  }

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400" aria-label="Breadcrumb">
        <Link to="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">Home</Link>
        <span>/</span>
        <Link to={`/category/${category}`} className="hover:text-indigo-600 dark:hover:text-indigo-400">{categoryLabel}</Link>
        <span>/</span>
        <span className="font-medium text-gray-900 dark:text-gray-100">{toolName}</span>
      </nav>
    </>
  )
}
