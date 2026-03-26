import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import Toast from '../components/Toast.jsx'

const ToastContext = createContext({
  showToast: () => {},
})

let toastId = 0

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const dismissToast = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id))
  }, [])

  const showToast = useCallback(({ message, type = 'info', duration = 3000 }) => {
    if (!message) return

    toastId += 1
    const id = toastId
    setToasts((current) => [...current.slice(-2), { id, message, type, duration }])
  }, [])

  const value = useMemo(() => ({ showToast }), [showToast])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed bottom-4 right-4 z-[70] flex w-[92vw] max-w-sm flex-col gap-2">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            toast={toast}
            onDismiss={() => dismissToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export default function useToast() {
  return useContext(ToastContext)
}
