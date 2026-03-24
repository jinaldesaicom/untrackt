export default function ToolSkeleton() {
  return (
    <div className="mt-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 animate-pulse">
      <div className="h-7 w-64 bg-gray-200 dark:bg-gray-700 rounded-md mb-4" />
      <div className="h-4 w-full bg-gray-100 dark:bg-gray-700 rounded mb-2" />
      <div className="h-4 w-5/6 bg-gray-100 dark:bg-gray-700 rounded mb-6" />

      <div className="space-y-3">
        <div className="h-10 w-full bg-gray-100 dark:bg-gray-700 rounded-lg" />
        <div className="h-10 w-full bg-gray-100 dark:bg-gray-700 rounded-lg" />
        <div className="h-28 w-full bg-gray-100 dark:bg-gray-700 rounded-lg" />
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="h-20 bg-gray-100 dark:bg-gray-700 rounded-lg" />
        <div className="h-20 bg-gray-100 dark:bg-gray-700 rounded-lg" />
      </div>
    </div>
  )
}