import React, { useMemo } from 'react'
import { SearchX } from 'lucide-react'
import ToolCard from './ToolCard.jsx'
import EmptyState from './EmptyState.jsx'

function ToolGrid({ tools }) {
  const visibleTools = useMemo(() => {
    if (!Array.isArray(tools)) return []
    return tools.filter(Boolean)
  }, [tools])

  if (visibleTools.length === 0) {
    return (
      <EmptyState
        icon={SearchX}
        title="No tools found"
        description="Try a different search term or browse another category."
      />
    )
  }

  const handleGridKeyDown = (event) => {
    const key = event.key
    if (!['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp', 'Enter', ' '].includes(key)) return

    const cards = Array.from(event.currentTarget.querySelectorAll('a[data-tool-card]'))
    const currentIndex = cards.indexOf(document.activeElement)
    if (currentIndex < 0) return

    const columns = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1
    let nextIndex = currentIndex

    if (key === 'ArrowRight') nextIndex = Math.min(currentIndex + 1, cards.length - 1)
    if (key === 'ArrowLeft') nextIndex = Math.max(currentIndex - 1, 0)
    if (key === 'ArrowDown') nextIndex = Math.min(currentIndex + columns, cards.length - 1)
    if (key === 'ArrowUp') nextIndex = Math.max(currentIndex - columns, 0)

    if (nextIndex !== currentIndex) {
      event.preventDefault()
      cards[nextIndex]?.focus()
      return
    }

    if ((key === 'Enter' || key === ' ') && document.activeElement?.click) {
      event.preventDefault()
      document.activeElement.click()
    }
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 [content-visibility:auto]" onKeyDown={handleGridKeyDown} role="status" aria-live="polite">
      {visibleTools.map((tool) => (
        <ToolCard key={tool.id} tool={tool} />
      ))}
    </div>
  )
}

export default React.memo(ToolGrid)
