import { Link } from 'react-router-dom'
import { Wrench, Moon, Sun } from 'lucide-react'
import SearchBar from './SearchBar.jsx'
import CategoryNav from './CategoryNav.jsx'
import { useDarkMode } from '../utils/darkMode.js'

export default function Header() {
  const { isDark, toggle } = useDarkMode()
  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 h-14">
          {/* Logo */}
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

          {/* Search */}
          <div className="flex-1 max-w-sm hidden sm:block">
            <SearchBar />
          </div>

          {/* Category Nav */}
          <div className="hidden lg:flex items-center ml-auto">
            <CategoryNav />
          </div>

          {/* Dark mode toggle */}
          <button
            onClick={toggle}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="shrink-0 p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile search */}
        <div className="sm:hidden pb-3">
          <SearchBar />
        </div>

        {/* Mobile category nav */}
        <div className="lg:hidden pb-2 -mx-4 px-4 overflow-x-auto no-scrollbar">
          <CategoryNav mobile />
        </div>
      </div>
    </header>
  )
}
