import { useState, useEffect } from 'react'
import { Heart, X } from 'lucide-react'

const STORAGE_KEY = 'untrackt_sponsor_dismissed'

export default function SponsorBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      const dismissed = localStorage.getItem(STORAGE_KEY)
      if (!dismissed) setVisible(true)
    } catch {
      /* localStorage unavailable */
    }
  }, [])

  const dismiss = () => {
    setVisible(false)
    try {
      localStorage.setItem(STORAGE_KEY, '1')
    } catch {
      /* localStorage unavailable */
    }
  }

  if (!visible) return null

  return (
    <div className="mt-8 relative rounded-xl border border-pink-200 dark:border-pink-800/40 bg-pink-50/60 dark:bg-pink-950/20 px-4 py-3">
      <button
        onClick={dismiss}
        className="absolute top-2 right-2 p-1 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
        aria-label="Dismiss"
      >
        <X className="w-4 h-4" />
      </button>
      <p className="text-sm text-gray-700 dark:text-gray-300 pr-6">
        <Heart className="inline w-4 h-4 text-pink-500 mr-1 -mt-0.5" />
        UnTrackt is free forever. If it saved you time today{' '}
        <span aria-hidden="true">→</span>{' '}
        <a
          href="https://github.com/sponsors/jinaldesaicom"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-pink-600 dark:text-pink-400 hover:underline"
        >
          Support the project ❤️
        </a>
      </p>
    </div>
  )
}
