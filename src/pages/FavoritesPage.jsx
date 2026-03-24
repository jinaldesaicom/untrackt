import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import SEOHead from '../components/SEOHead.jsx'
import ToolGrid from '../components/ToolGrid.jsx'
import tools from '../data/tools.js'
import { useFavorites } from '../hooks/useFavorites.js'

export default function FavoritesPage() {
  const { favorites, clearFavorites } = useFavorites()

  const favoriteTools = favorites
    .map((id) => tools.find((tool) => tool.id === id))
    .filter(Boolean)

  const handleClearFavorites = () => {
    if (window.confirm('Clear all saved tools?')) {
      clearFavorites()
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <SEOHead
        title="Your Favorite Tools | UnTrackt"
        description="View and manage your favorite UnTrackt tools. Saved locally on your device with zero tracking."
        path="/favorites"
      />

      <div className="flex items-center justify-between gap-4 flex-wrap mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Your favorite tools</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Saved only on this device. No account required.</p>
        </div>
        {favoriteTools.length > 0 && (
          <button type="button" onClick={handleClearFavorites} className="btn-secondary">
            Clear all favorites
          </button>
        )}
      </div>

      {favoriteTools.length > 0 ? (
        <ToolGrid tools={favoriteTools} />
      ) : (
        <div className="rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-6 py-14 text-center">
          <Heart className="w-12 h-12 mx-auto text-rose-400 dark:text-rose-300 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">No saved tools yet</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-md mx-auto">
            Use the heart button on any tool card to pin it here for faster access.
          </p>
          <Link to="/" className="btn-primary inline-flex mt-6">
            Browse all tools
          </Link>
        </div>
      )}
    </div>
  )
}