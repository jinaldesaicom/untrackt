import { memo, useState } from 'react'
import { BookOpen, ChevronDown } from 'lucide-react'
import { richDescriptions } from '../data/toolDescriptions.js'

function ToolGuide({ toolId }) {
  const [expanded, setExpanded] = useState(false)
  const [openIndex, setOpenIndex] = useState(0)
  const guide = richDescriptions[toolId]?.guide

  if (!guide || !guide.length) return null

  return (
    <section aria-label="Tool guide" className="mt-8">
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
        aria-expanded={expanded}
      >
        <BookOpen className="h-4 w-4 text-indigo-500" />
        {expanded ? 'Hide guide' : 'Learn more about this tool'}
      </button>

      {expanded && (
        <div className="mt-4 rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900 overflow-hidden">
          {guide.map((section, index) => {
            const open = openIndex === index
            return (
              <div key={section.title} className={index > 0 ? 'border-t border-gray-100 dark:border-gray-800' : ''}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? -1 : index)}
                  className="flex w-full items-center justify-between gap-2 px-5 py-3.5 text-left"
                  aria-expanded={open}
                >
                  <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">{section.title}</span>
                  <ChevronDown className={`h-4 w-4 shrink-0 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} />
                </button>
                {open && (
                  <div className="px-5 pb-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300 space-y-2">
                    {section.body.split('\n').map((line, i) => {
                      const trimmed = line.trim()
                      if (!trimmed) return null
                      if (trimmed.startsWith('• ') || trimmed.startsWith('- ')) {
                        return <li key={i} className="ml-4 list-disc">{trimmed.slice(2)}</li>
                      }
                      return <p key={i}>{trimmed}</p>
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}

export default memo(ToolGuide)
