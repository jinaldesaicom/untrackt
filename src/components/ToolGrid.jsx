import React, { useMemo } from 'react'
import ToolCard from './ToolCard.jsx'

function ToolGrid({ tools }) {
  const visibleTools = useMemo(() => {
    if (!Array.isArray(tools)) return []
    return tools.filter(Boolean)
  }, [tools])

  if (visibleTools.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400 dark:text-gray-500">
        <p className="text-lg">No tools found.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {visibleTools.map((tool) => (
        <ToolCard key={tool.id} tool={tool} />
      ))}
    </div>
  )
}

export default React.memo(ToolGrid)
