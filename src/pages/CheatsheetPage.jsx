import { useMemo, useState, useRef, useEffect, useCallback } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { ArrowLeft, Search, X, Copy, Check, Printer, Heart, Terminal, ChevronUp } from 'lucide-react'
import SEOHead from '../components/SEOHead.jsx'
import { categoryColorMap } from '../components/cheatsheets/CheatsheetCategoryTabs.jsx'
import useCheatsheetFavorites from '../hooks/useCheatsheetFavorites.js'
import useRecentCheatsheets from '../hooks/useRecentCheatsheets.js'
import useToast from '../hooks/useToast.jsx'
import SponsorBanner from '../components/SponsorBanner.jsx'
import {
  getCheatsheetById,
  cheatsheetCategories,
  getCheatsheetsByCategory,
} from '../data/cheatsheets.js'

function CopyBtn({ text, small }) {
  const [copied, setCopied] = useState(false)
  const timer = useRef(null)

  useEffect(() => () => clearTimeout(timer.current), [])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = text
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    setCopied(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={copy}
      aria-label={copied ? 'Copied' : 'Copy to clipboard'}
      className={`shrink-0 rounded-md transition-colors ${
        small
          ? 'p-1 text-gray-400 hover:text-indigo-500 hover:bg-gray-100 dark:hover:bg-gray-700'
          : 'px-2.5 py-1.5 text-xs font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
      }`}
    >
      {copied ? (
        <Check className={small ? 'w-3.5 h-3.5 text-green-500' : 'w-3.5 h-3.5 text-green-500 inline mr-1'} />
      ) : (
        <Copy className={small ? 'w-3.5 h-3.5' : 'w-3.5 h-3.5 inline mr-1'} />
      )}
      {!small && (copied ? 'Copied!' : 'Copy section')}
    </button>
  )
}

export default function CheatsheetPage() {
  const { sheetId } = useParams()
  const sheet = useMemo(() => getCheatsheetById(sheetId), [sheetId])
  const { toggleFavorite, isFavorite } = useCheatsheetFavorites()
  const { addRecent } = useRecentCheatsheets()
  const { showToast } = useToast()
  const [filter, setFilter] = useState('')
  const searchRef = useRef(null)

  // Track as recently visited
  useEffect(() => {
    if (sheet) addRecent(sheet.id)
  }, [sheet, addRecent])

  // Keyboard shortcut: "/" to focus search
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === '/' && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) {
        e.preventDefault()
        searchRef.current?.focus()
      }
      if (e.key === 'Escape' && document.activeElement === searchRef.current) {
        setFilter('')
        searchRef.current?.blur()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  const filteredSections = useMemo(() => {
    if (!sheet) return []
    if (!filter.trim()) return sheet.sections
    const q = filter.toLowerCase()
    return sheet.sections
      .map((s) => ({
        ...s,
        commands: s.commands.filter(
          (c) => c.command.toLowerCase().includes(q) || c.description.toLowerCase().includes(q),
        ),
      }))
      .filter((s) => s.commands.length > 0)
  }, [sheet, filter])

  const totalFiltered = useMemo(
    () => filteredSections.reduce((a, s) => a + s.commands.length, 0),
    [filteredSections],
  )

  const handleCopyAll = useCallback(() => {
    if (!sheet) return
    const text = sheet.sections
      .map((s) => `# ${s.title}\n${s.commands.map((c) => `${c.command}  # ${c.description}`).join('\n')}`)
      .join('\n\n')
    navigator.clipboard.writeText(text).then(() => {
      showToast({ message: 'Copied all commands!', type: 'success' })
    })
  }, [sheet, showToast])

  const handlePrint = useCallback(() => {
    setTimeout(() => window.print(), 100)
  }, [])

  if (!sheet) return <Navigate to="/cheatsheets" replace />

  const colors = categoryColorMap[sheet.category] || categoryColorMap.languages
  const categoryLabel = cheatsheetCategories.find((c) => c.id === sheet.category)?.name || sheet.category
  const commandCount = sheet.sections.reduce((a, s) => a + s.commands.length, 0)
  const related = getCheatsheetsByCategory(sheet.category).filter((s) => s.id !== sheet.id).slice(0, 4)
  const fav = isFavorite(sheet.id)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `${sheet.name} Cheatsheet`,
    description: sheet.description,
    step: sheet.sections.flatMap((s) =>
      s.commands.map((c) => ({
        '@type': 'HowToStep',
        name: c.description,
        text: c.command,
      })),
    ),
  }

  return (
    <div>
      <SEOHead
        title={`${sheet.name} Cheatsheet — ${commandCount} Essential Commands | UnTrackt`}
        description={`${sheet.name} cheatsheet with ${commandCount} essential commands. ${sheet.description}. Copy commands instantly.`}
        path={`/cheatsheets/${sheet.id}`}
        jsonLd={jsonLd}
      />

      {/* Header */}
      <section className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 print:border-0">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
          <Link
            to="/cheatsheets"
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 mb-4 print:hidden"
          >
            <ArrowLeft className="w-4 h-4" />
            All Cheatsheets
          </Link>

          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl" aria-hidden="true">{sheet.emoji}</span>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                  {sheet.name}
                </h1>
              </div>
              <p className="text-gray-500 dark:text-gray-400 mb-3">{sheet.description}</p>
              <div className="flex flex-wrap items-center gap-2">
                <span className={`inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full ${colors.bg} ${colors.text}`}>
                  {categoryLabel}
                </span>
                <span className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
                  <Terminal className="w-3 h-3" />
                  {commandCount} commands · {sheet.sections.length} sections
                </span>
              </div>
            </div>

            <button
              onClick={() => toggleFavorite(sheet.id)}
              aria-label={fav ? 'Remove from favorites' : 'Add to favorites'}
              className={`shrink-0 p-2 rounded-lg transition-colors print:hidden ${
                fav
                  ? 'text-red-500 bg-red-50 dark:bg-red-900/30'
                  : 'text-gray-400 hover:text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <Heart className={`w-5 h-5 ${fav ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Actions bar */}
          <div className="mt-4 flex flex-wrap items-center gap-2 print:hidden">
            <button
              onClick={handleCopyAll}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <Copy className="w-3.5 h-3.5" />
              Copy All
            </button>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              Print / PDF
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search within cheatsheet */}
        <div className="mb-6 print:hidden">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              ref={searchRef}
              type="text"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder='Filter commands...  Press "/"'
              aria-label="Filter commands"
              className="w-full pl-9 pr-9 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            />
            {filter && (
              <button
                onClick={() => setFilter('')}
                aria-label="Clear filter"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 rounded text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          {filter && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              {totalFiltered} command{totalFiltered !== 1 ? 's' : ''} matching &ldquo;{filter}&rdquo;
            </p>
          )}
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {filteredSections.map((section) => {
            const sectionText = section.commands.map((c) => `${c.command}  # ${c.description}`).join('\n')
            return (
              <section key={section.title}>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{section.title}</h2>
                  <CopyBtn text={sectionText} />
                </div>
                <div className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                  {section.commands.map((cmd, i) => (
                    <div
                      key={i}
                      className={`flex items-start gap-3 px-4 py-3 group hover:bg-indigo-50/50 dark:hover:bg-indigo-900/10 transition-colors ${
                        i > 0 ? 'border-t border-gray-100 dark:border-gray-700/50' : ''
                      }`}
                    >
                      <code className="flex-1 text-sm font-mono text-gray-900 dark:text-gray-100 break-all whitespace-pre-wrap">
                        {cmd.command}
                      </code>
                      <span className="hidden sm:block text-xs text-gray-500 dark:text-gray-400 mt-0.5 min-w-[140px] text-right">
                        {cmd.description}
                      </span>
                      <CopyBtn text={cmd.command} small />
                      <span className="sm:hidden text-xs text-gray-400 dark:text-gray-500 block mt-1 basis-full">
                        {cmd.description}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )
          })}
        </div>

        {filteredSections.length === 0 && filter && (
          <p className="text-center text-gray-500 dark:text-gray-400 py-12">
            No commands match &ldquo;{filter}&rdquo;
          </p>
        )}

        {/* Related cheatsheets */}
        {related.length > 0 && (
          <section className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800 print:hidden">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
              More {categoryLabel} Cheatsheets
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {related.map((r) => (
                <Link
                  key={r.id}
                  to={`/cheatsheets/${r.id}`}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-indigo-200 dark:hover:border-indigo-700 hover:shadow-sm transition-all group"
                >
                  <span className="text-lg shrink-0">{r.emoji}</span>
                  <div className="min-w-0 flex-1">
                    <span className="font-medium text-sm text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 truncate block">
                      {r.name}
                    </span>
                    <span className="text-xs text-gray-400">{r.sections.reduce((a, s) => a + s.commands.length, 0)} commands</span>
                  </div>
                  <Terminal className="w-3.5 h-3.5 text-gray-400 group-hover:text-indigo-500 shrink-0" />
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Back to top */}
        <div className="mt-8 text-center print:hidden">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-1.5 text-sm text-gray-400 dark:text-gray-500 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
          >
            <ChevronUp className="w-4 h-4" />
            Back to top
          </button>
        </div>

        {/* Print-only trademark */}
        <div className="print-trademark hidden mt-8 pt-4 border-t border-gray-300 text-center text-xs text-gray-500">
          untrackt.com — Free developer cheatsheets
        </div>

        <SponsorBanner />
      </div>
    </div>
  )
}
