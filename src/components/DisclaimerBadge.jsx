import { ShieldCheck } from 'lucide-react'

export default function DisclaimerBadge() {
  return (
    <div className="flex items-start gap-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl px-4 py-3 text-sm text-green-800 dark:text-green-300 mb-6">
      <ShieldCheck className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
      <span>
        <strong>100% private.</strong> This tool runs entirely in your browser. No data is sent to any server. Nothing is stored or shared.
      </span>
    </div>
  )
}
