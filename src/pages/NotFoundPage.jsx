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
        {/* Illustration: Lost wrench floating in space */}
        <div className="mx-auto mb-6 w-64 h-64 sm:w-72 sm:h-72 select-none" aria-hidden="true">
          <svg viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {/* Background circle glow */}
            <circle cx="150" cy="150" r="130" fill="url(#glow404)" opacity="0.15" />

            {/* Orbiting dots / stars */}
            <circle cx="60" cy="80" r="3" fill="#818cf8" opacity="0.6">
              <animate attributeName="opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx="240" cy="70" r="2" fill="#a5b4fc" opacity="0.5">
              <animate attributeName="opacity" values="0.5;1;0.5" dur="2.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="250" cy="200" r="2.5" fill="#818cf8" opacity="0.4">
              <animate attributeName="opacity" values="0.4;0.9;0.4" dur="4s" repeatCount="indefinite" />
            </circle>
            <circle cx="45" cy="210" r="2" fill="#c7d2fe" opacity="0.5">
              <animate attributeName="opacity" values="0.5;1;0.5" dur="3.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="190" cy="45" r="1.5" fill="#e0e7ff" opacity="0.7">
              <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="80" cy="250" r="2" fill="#a5b4fc" opacity="0.3">
              <animate attributeName="opacity" values="0.3;0.8;0.3" dur="3s" repeatCount="indefinite" />
            </circle>

            {/* Floating wrench — tilted, drifting */}
            <g transform="translate(150,150)" >
              <animateTransform attributeName="transform" type="translate" values="150,150;150,142;150,150" dur="4s" repeatCount="indefinite" />
              <g transform="rotate(-30)">
                {/* Wrench body */}
                <rect x="-8" y="-55" width="16" height="70" rx="8" fill="#6366f1" />
                {/* Wrench head top */}
                <path d="M-20,-55 Q-20,-75 0,-80 Q20,-75 20,-55 L12,-55 Q12,-65 0,-68 Q-12,-65 -12,-55 Z" fill="#6366f1" />
                {/* Wrench jaw opening */}
                <rect x="-4" y="-78" width="8" height="14" rx="2" fill="#e0e7ff" opacity="0.5" />
                {/* Wrench handle bottom detail */}
                <circle cx="0" cy="18" r="5" fill="#4f46e5" />
                <circle cx="0" cy="18" r="2.5" fill="#e0e7ff" opacity="0.4" />
                {/* Shine highlight */}
                <rect x="-3" y="-45" width="4" height="20" rx="2" fill="#a5b4fc" opacity="0.4" />
              </g>
            </g>

            {/* Question mark — floating beside wrench */}
            <g opacity="0.9">
              <animateTransform attributeName="transform" type="translate" values="0,0;0,-5;0,0" dur="3s" repeatCount="indefinite" />
              <text x="205" y="120" fontFamily="-apple-system, BlinkMacSystemFont, sans-serif" fontSize="48" fontWeight="800" fill="#818cf8">?</text>
            </g>

            {/* Small floating gear */}
            <g transform="translate(80,100)" opacity="0.3">
              <animateTransform attributeName="transform" type="rotate" values="0 80 100;360 80 100" dur="20s" repeatCount="indefinite" />
              <path d="M0,-12 L3,-4 L12,-4 L5,2 L7,11 L0,6 L-7,11 L-5,2 L-12,-4 L-3,-4 Z" fill="#6366f1" />
            </g>

            {/* Another small gear */}
            <g transform="translate(220,220)" opacity="0.25">
              <animateTransform attributeName="transform" type="rotate" values="360 220 220;0 220 220" dur="25s" repeatCount="indefinite" />
              <path d="M0,-10 L2.5,-3.5 L10,-3.5 L4,1.5 L6,9 L0,5 L-6,9 L-4,1.5 L-10,-3.5 L-2.5,-3.5 Z" fill="#818cf8" />
            </g>

            {/* 404 large watermark */}
            <text x="150" y="270" textAnchor="middle" fontFamily="-apple-system, BlinkMacSystemFont, sans-serif" fontSize="36" fontWeight="900" fill="#6366f1" opacity="0.12" letterSpacing="8">404</text>

            <defs>
              <radialGradient id="glow404" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
              </radialGradient>
            </defs>
          </svg>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">Oops! This tool drifted away</h1>
        <p className="mt-3 text-gray-500 dark:text-gray-400 max-w-md mx-auto">The page you're looking for doesn't exist or may have moved. Search for what you need or explore our tools below.</p>
        <div className="mx-auto mt-6 max-w-lg">
          <SearchBar large />
        </div>
        <Link to="/" className="btn-primary mt-6 inline-flex">Back to Home</Link>
      </div>

      <section className="mt-12">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Try one of these tools</h2>
        <ToolGrid tools={suggestions} />
      </section>
    </div>
  )
}
