import { Copy, Check } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import useToast from '../hooks/useToast.jsx'
import useAnnouncer from '../hooks/useAnnouncer.jsx'

export default function CopyButton({ text, label = 'Copy', className = '' }) {
  const [copied, setCopied] = useState(false)
  const timerRef = useRef(null)
  const { showToast } = useToast()
  const { announce, announceUrgent } = useAnnouncer()

  useEffect(() => {
    return () => clearTimeout(timerRef.current)
  }, [])

  const markCopied = () => {
    setCopied(true)
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setCopied(false), 2000)
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      markCopied()
      showToast({ message: 'Copied to clipboard!', type: 'success' })
      announce('Copied to clipboard')
    } catch {
      // Fallback for older browsers
      try {
        const textarea = document.createElement('textarea')
        textarea.value = text
        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand('copy')
        document.body.removeChild(textarea)
        markCopied()
        showToast({ message: 'Copied to clipboard!', type: 'success' })
        announce('Copied to clipboard')
      } catch {
        showToast({ message: 'Error copying to clipboard', type: 'error' })
        announceUrgent('Copy failed')
      }
    }
  }

  return (
    <button
      onClick={handleCopy}
      className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-medium text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors ${className}`}
    >
      {copied ? (
        <>
          <Check className="w-4 h-4 text-green-600" />
          Copied!
        </>
      ) : (
        <>
          <Copy className="w-4 h-4" />
          {label}
        </>
      )}
    </button>
  )
}
