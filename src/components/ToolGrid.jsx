import ToolCard from './ToolCard.jsx'

export default function ToolGrid({ tools }) {
  if (!tools || tools.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        <p className="text-lg">No tools found.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {tools.map((tool) => (
        <ToolCard key={tool.id} tool={tool} />
      ))}
    </div>
  )
}
