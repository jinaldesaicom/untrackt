import { memo } from 'react'
import { Link } from 'react-router-dom'
import { Wrench, Moon, Sun, Monitor, Heart, BarChart3 } from 'lucide-react'
import SearchBar from './SearchBar.jsx'
import CategoryNav from './CategoryNav.jsx'
import { useTheme } from '../hooks/useTheme.js'
import { useFavorites } from '../hooks/useFavorites.js'

const THEME_ORDER = ['light', 'dark', 'system']
const THEME_META = {
  light: { label: 'light', icon: Sun },
  dark: { label: 'dark', icon: Moon },
  system: { label: 'system', icon: Monitor },
}

const ThemeToggle = memo(function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const themeIndex = THEME_ORDER.indexOf(theme)
  const nextTheme = THEME_ORDER[(themeIndex + 1) % THEME_ORDER.length]
  const ThemeIcon = THEME_META[theme].icon

  return (
    <button
      onClick={() => setTheme(nextTheme)}
      aria-label={`Switch to ${nextTheme} mode`}
      title={`Theme: ${THEME_META[theme].label}. Click to switch to ${nextTheme}.`}
      className="shrink-0 p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800 transition-colors duration-200"
    >
      <ThemeIcon className="w-5 h-5" />
    </button>
  )
})

const FavoritesLink = memo(function FavoritesLink() {
  const { favorites } = useFavorites()

  return (
    <Link
      to="/favorites"
      className="relative shrink-0 p-2 rounded-lg text-gray-500 hover:text-rose-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-rose-300 dark:hover:bg-gray-800 transition-colors duration-200"
      aria-label={`View favorite tools (${favorites.length})`}
      title={`Favorite tools (${favorites.length})`}
    >
      <Heart className="w-5 h-5" />
      {favorites.length > 0 && (
        <span className="absolute -top-1 -right-1 min-w-[1.1rem] h-[1.1rem] px-1 rounded-full bg-rose-500 text-[10px] leading-[1.1rem] text-white text-center font-semibold">
          {favorites.length > 99 ? '99+' : favorites.length}
        </span>
      )}
    </Link>
  )
})

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 transition-colors duration-200 backdrop-blur supports-[backdrop-filter]:bg-white/90 supports-[backdrop-filter]:dark:bg-gray-900/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 h-14">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="bg-indigo-600 p-1.5 rounded-lg">
              <Wrench className="w-4 h-4 text-white" />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-gray-900 dark:text-white text-lg tracking-tight">
                UnTrackt
              </span>
              <span className="beta-badge">Beta</span>
            </div>
          </Link>

          <div className="flex-1 max-w-sm hidden sm:block">
            <SearchBar />
          </div>

          <div className="hidden lg:flex items-center ml-auto">
            <CategoryNav />
          </div>

          <Link
            to="/my-stats"
            className="relative shrink-0 p-2 rounded-lg text-gray-500 hover:text-indigo-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-indigo-300 dark:hover:bg-gray-800 transition-colors duration-200"
            aria-label="My Stats"
            title="My Stats"
          >
            <BarChart3 className="w-5 h-5" />
          </Link>

          <FavoritesLink />
          <ThemeToggle />
        </div>

        <div className="sm:hidden pb-3">
          <SearchBar />
        </div>

        <div className="lg:hidden pb-2 -mx-4 px-4 overflow-x-auto no-scrollbar">
          <CategoryNav mobile />
        </div>
      </div>
    </header>
  )
}
