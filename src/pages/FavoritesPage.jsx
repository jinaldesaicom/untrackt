import { Heart } from 'lucide-react'
import SEOHead from '../components/SEOHead.jsx'
import ToolGrid from '../components/ToolGrid.jsx'
import EmptyState from '../components/EmptyState.jsx'
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
        <EmptyState
          icon={Heart}
          title="No saved tools yet"
          description="Use the heart button on any tool card to pin it here for faster access."
          action={{ label: 'Browse all tools', onClick: () => (window.location.href = '/') }}
        />
      )}
    </div>
  )
}