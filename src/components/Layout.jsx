import Header from './Header.jsx'
import Footer from './Footer.jsx'
import BackToTop from './BackToTop.jsx'

export default function Layout({ children, theme, isDark }) {
  return (
    <div
      data-theme={theme}
      data-mode={isDark ? 'dark' : 'light'}
      className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 transition-colors duration-200"
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-indigo-600 text-white px-4 py-2 rounded z-50"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
      <BackToTop />
    </div>
  )
}
