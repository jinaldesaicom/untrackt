import { memo, useEffect } from 'react'
import { X } from 'lucide-react'
import SearchBar from './SearchBar.jsx'

function MobileSearchOverlay({ open, onClose }) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 bg-white dark:bg-gray-900 flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <span className="font-semibold text-gray-900 dark:text-white">Search</span>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500"
          aria-label="Close search"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="p-4">
        <SearchBar large />
      </div>
    </div>
  )
}

export default memo(MobileSearchOverlay)
