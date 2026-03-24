import { Link } from 'react-router-dom'
import { ShieldCheck, Wrench } from 'lucide-react'
import { categories } from '../data/tools.js'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div className="max-w-xs">
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-indigo-600 p-1.5 rounded-lg">
                <Wrench className="w-4 h-4 text-white" />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-gray-900 text-lg">UnTrackt</span>
                <span className="beta-badge">Beta</span>
              </div>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Free, private, and always in your browser. No accounts. No servers. No nonsense.
            </p>
            <div className="flex items-center gap-1.5 mt-3 text-green-600 text-xs font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>No tracking. No cookies. No accounts. Ever.</span>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3">Categories</h3>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-1.5">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link to={`/category/${cat.id}`} className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} UnTrackt — All tools run 100% in your browser. Built with React + Vite.
        </div>
      </div>
    </footer>
  )
}
