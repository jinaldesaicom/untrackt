import { useMemo, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { ChevronDown } from 'lucide-react'
import { richDescriptions } from '../data/toolDescriptions.js'

export default function ToolFAQ({ toolId }) {
  const [openIndex, setOpenIndex] = useState(0)
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

  return (
    <section aria-label="Frequently asked questions" className="mt-10">
      <Helmet>
        {schema ? <script type="application/ld+json">{JSON.stringify(schema)}</script> : null}
      </Helmet>
      <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Frequently asked questions</h2>
      <div className="space-y-3">
        {faqs.map((item, index) => {
          const open = openIndex === index
          return (
            <div key={item.q} className="rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
              <button
                type="button"
                onClick={() => setOpenIndex(open ? -1 : index)}
                className="flex w-full items-center justify-between gap-2 px-4 py-3 text-left"
                aria-expanded={open}
              >
                <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">{item.q}</span>
                <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${open ? 'rotate-180' : ''}`} />
              </button>
              {open ? <p className="px-4 pb-4 text-sm text-gray-600 dark:text-gray-300">{item.a}</p> : null}
            </div>
          )
        })}
      </div>
    </section>
  )
}
