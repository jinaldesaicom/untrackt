import SEOHead from '../components/SEOHead.jsx'
import tools from '../data/tools.js'

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 prose dark:prose-invert prose-headings:tracking-tight">
      <SEOHead
        title="About UnTrackt | Free Browser Tools"
        description="Why UnTrackt exists, how it works, and our privacy-first mission."
        path="/about"
      />

      <h1>About UnTrackt</h1>
      <p>UnTrackt is a privacy-focused tool suite with 88+ free browser tools. Every core feature is built to run on your device with zero accounts and zero tracking.</p>

      <h2>What is UnTrackt?</h2>
      <p>UnTrackt is a collection of practical tools for developers, students, freelancers, finance workflows, health estimates, and daily utility tasks.</p>

      <h2>Why we built it</h2>
      <p>Most online tools are overloaded with analytics scripts, intrusive popups, and account walls. We built UnTrackt as a clean alternative: fast, private, and useful.</p>

      <h2>How it works</h2>
      <p>In plain terms: you open the app, run a tool, and results are computed in your browser. Preferences are optionally stored in localStorage on your own device.</p>

      <svg viewBox="0 0 720 220" role="img" aria-label="UnTrackt browser-only architecture" className="w-full rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
        <rect x="20" y="40" width="180" height="70" rx="10" fill="#e0e7ff" />
        <text x="110" y="82" textAnchor="middle" fill="#312e81" fontSize="16" fontWeight="700">Your Browser</text>

        <rect x="270" y="30" width="190" height="90" rx="10" fill="#c7d2fe" />
        <text x="365" y="72" textAnchor="middle" fill="#1e1b4b" fontSize="16" fontWeight="700">UnTrackt App</text>

        <rect x="520" y="38" width="180" height="74" rx="10" fill="#d1fae5" />
        <text x="610" y="70" textAnchor="middle" fill="#064e3b" fontSize="14" fontWeight="700">Your Device Storage</text>
        <text x="610" y="90" textAnchor="middle" fill="#065f46" fontSize="12">localStorage only</text>

        <line x1="200" y1="74" x2="270" y2="74" stroke="#4338ca" strokeWidth="3" markerEnd="url(#arrow)" />
        <line x1="460" y1="74" x2="520" y2="74" stroke="#4338ca" strokeWidth="3" markerEnd="url(#arrow)" />

        <text x="30" y="170" fill="#7f1d1d" fontSize="13">✕ No server connection (except currency rates)</text>
        <text x="30" y="192" fill="#7f1d1d" fontSize="13">✕ No database</text>
        <text x="30" y="214" fill="#7f1d1d" fontSize="13">✕ No tracking</text>

        <defs>
          <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 z" fill="#4338ca" />
          </marker>
        </defs>
      </svg>

      <h2>The privacy promise</h2>
      <ul>
        <li>We never require an account.</li>
        <li>We never use analytics trackers or pixels.</li>
        <li>We never sell user data.</li>
        <li>We never send tool inputs to a backend.</li>
      </ul>

      <h2>Open source</h2>
      <p>UnTrackt is open source so anyone can review how data is handled and verify the browser-only model.</p>

      <h2>Tool count</h2>
      <p>Current tool count: <strong>{tools.length}</strong> tools.</p>

      <h2>Built with</h2>
      <p>React, Vite, Tailwind CSS, and Cloudflare Pages.</p>
    </div>
  )
}
