import Header from './Header.jsx'
import Footer from './Footer.jsx'

export default function Layout({ children, theme, isDark }) {
  return (
    <div
      data-theme={theme}
      data-mode={isDark ? 'dark' : 'light'}
      className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 transition-colors duration-200"
    >
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}
