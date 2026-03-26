import React from 'react'
import { AlertTriangle } from 'lucide-react'
import { logError } from '../utils/errorReporter.js'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, errorMessage: '' }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, errorMessage: error?.message || 'Unknown error' }
  }

  componentDidCatch(error, info) {
    logError(error, { componentStack: info?.componentStack || '' })
  }

  render() {
    if (!this.state.hasError) {
      return this.props.children
    }

    const subject = encodeURIComponent('UnTrackt tool error report')
    const body = encodeURIComponent(`Error: ${this.state.errorMessage}`)

    return (
      <div className="panel-card my-8 border-rose-200 dark:border-rose-800">
        <div className="flex items-start gap-3">
          <AlertTriangle className="mt-1 h-5 w-5 text-rose-500" />
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Something went wrong with this tool</h2>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">This will not affect other tools. Try refreshing the page.</p>
            <a
              href={`mailto:support@untrackt.com?subject=${subject}&body=${body}`}
              className="mt-3 inline-flex text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-400"
            >
              Report an issue
            </a>
          </div>
        </div>
      </div>
    )
  }
}
