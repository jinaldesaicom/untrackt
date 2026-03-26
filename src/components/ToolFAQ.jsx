import { memo, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { ChevronDown, ChevronsUpDown } from 'lucide-react'
import { richDescriptions } from '../data/toolDescriptions.js'

function ToolFAQ({ toolId }) {
  const [openIndex, setOpenIndex] = useState(0)
  const [allExpanded, setAllExpanded] = useState(false)
  const faqs = richDescriptions[toolId]?.faqs || []

  const schema = useMemo(() => {
    if (!faqs.length) return null
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.a,
        },
      })),
    }
  }, [faqs])

  if (!faqs.length) return null

  const toggleAll = () => {
    setAllExpanded((prev) => !prev)
    setOpenIndex(-1)
  }

  const isOpen = (index) => allExpanded || openIndex === index

  const handleToggle = (index) => {
    if (allExpanded) {
      setAllExpanded(false)
      setOpenIndex(index)
      return
    }
    setOpenIndex(openIndex === index ? -1 : index)
  }

  const handleKeyDown = (e, index) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      const next = index < faqs.length - 1 ? index + 1 : 0
      document.getElementById(`faq-btn-${toolId}-${next}`)?.focus()
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const prev = index > 0 ? index - 1 : faqs.length - 1
      document.getElementById(`faq-btn-${toolId}-${prev}`)?.focus()
    } else if (e.key === 'Home') {
      e.preventDefault()
      document.getElementById(`faq-btn-${toolId}-0`)?.focus()
    } else if (e.key === 'End') {
      e.preventDefault()
      document.getElementById(`faq-btn-${toolId}-${faqs.length - 1}`)?.focus()
    }
  }

  return (
    <section aria-label="Frequently asked questions" className="mt-10">
      <Helmet>
        {schema ? <script type="application/ld+json">{JSON.stringify(schema)}</script> : null}
      </Helmet>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Frequently asked questions</h2>
        {faqs.length > 1 && (
          <button
            type="button"
            onClick={toggleAll}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors"
          >
            <ChevronsUpDown className="h-3.5 w-3.5" />
            {allExpanded ? 'Collapse all' : 'Expand all'}
          </button>
        )}
      </div>
      <div className="space-y-3" role="list">
        {faqs.map((item, index) => {
          const open = isOpen(index)
          return (
            <div key={item.q} className="rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900" role="listitem">
              <button
                id={`faq-btn-${toolId}-${index}`}
                type="button"
                onClick={() => handleToggle(index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="flex w-full items-center justify-between gap-2 px-4 py-3 text-left"
                aria-expanded={open}
                aria-controls={`faq-panel-${toolId}-${index}`}
              >
                <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">{item.q}</span>
                <ChevronDown className={`h-4 w-4 shrink-0 text-gray-500 transition-transform ${open ? 'rotate-180' : ''}`} />
              </button>
              {open ? <p id={`faq-panel-${toolId}-${index}`} className="px-4 pb-4 text-sm text-gray-600 dark:text-gray-300">{item.a}</p> : null}
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default memo(ToolFAQ)
