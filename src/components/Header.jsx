import { Link } from 'react-router-dom'
import { Wrench } from 'lucide-react'
import SearchBar from './SearchBar.jsx'
import CategoryNav from './CategoryNav.jsx'

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 h-14">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="bg-indigo-600 p-1.5 rounded-lg">
              <Wrench className="w-4 h-4 text-white" />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-gray-900 text-lg tracking-tight">
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
        </div>

        {/* Mobile search */}
        <div className="sm:hidden pb-3">
          <SearchBar />
        </div>

        {/* Mobile category nav */}
        <div className="lg:hidden pb-2 -mx-4 px-4 overflow-x-auto">
          <CategoryNav />
        </div>
      </div>
    </header>
  )
}
