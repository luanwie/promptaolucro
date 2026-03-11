import { useState, useEffect, createContext, useContext, useCallback } from 'react'

const ToastContext = createContext()

export function useToast() {
  return useContext(ToastContext)
}

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null)

  const showToast = useCallback((message) => {
    setToast(message)
  }, [])

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 2000)
      return () => clearTimeout(timer)
    }
  }, [toast])

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      {toast && (
        <div className="toast">
          <span className="toast-icon">✓</span>
          <span>{toast}</span>
        </div>
      )}
    </ToastContext.Provider>
  )
}
