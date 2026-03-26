export default function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-6 py-14 text-center">
      {Icon ? <Icon className="mx-auto mb-4 h-12 w-12 text-gray-400 dark:text-gray-500" /> : null}
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-gray-500 dark:text-gray-400">{description}</p>
      {action ? (
        <button type="button" onClick={action.onClick} className="btn-primary mt-6 inline-flex">
          {action.label}
        </button>
      ) : null}
    </div>
  )
}
