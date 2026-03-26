import { useEffect } from 'react'
import { CheckCircle2, Info, XCircle } from 'lucide-react'

const toneMap = {
  success: {
    wrapper: 'border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-100',
    icon: CheckCircle2,
  },
  error: {
    wrapper: 'border-rose-200 bg-rose-50 text-rose-900 dark:border-rose-700 dark:bg-rose-900/40 dark:text-rose-100',
    icon: XCircle,
  },
  info: {
    wrapper: 'border-indigo-200 bg-indigo-50 text-indigo-900 dark:border-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-100',
    icon: Info,
  },
}

export default function Toast({ toast, onDismiss }) {
  const tone = toneMap[toast.type] || toneMap.info
  const Icon = tone.icon

  useEffect(() => {
    const timer = window.setTimeout(onDismiss, toast.duration)
    return () => window.clearTimeout(timer)
  }, [onDismiss, toast.duration])

  return (
    <button
      type="button"
      onClick={onDismiss}
      role="alert"
      className={`w-full rounded-xl border px-3 py-2 text-left shadow-md transition-all animate-toast-in ${tone.wrapper}`}
    >
      <div className="flex items-start gap-2">
        <Icon className="mt-0.5 h-4 w-4 shrink-0" />
        <p className="text-sm font-medium leading-snug">{toast.message}</p>
      </div>
    </button>
  )
}
