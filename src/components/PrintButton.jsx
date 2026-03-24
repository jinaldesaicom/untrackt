import { Printer } from 'lucide-react'
import { useState } from 'react'

export default function PrintButton({ label = 'Print / Save as PDF', printTargetId, className = '' }) {
  const [isPreparing, setIsPreparing] = useState(false)

  const handlePrint = () => {
    setIsPreparing(true)
    setTimeout(() => {
      window.print()
      setIsPreparing(false)
    }, 100)
  }

  return (
    <button
      onClick={handlePrint}
      disabled={isPreparing}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white font-medium text-sm hover:bg-blue-700 disabled:bg-gray-400 transition-colors ${className}`}
    >
      <Printer className="w-4 h-4" />
      {isPreparing ? 'Preparing PDF...' : label}
    </button>
  )
}
