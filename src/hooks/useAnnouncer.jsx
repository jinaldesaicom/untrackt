import { createContext, useCallback, useContext, useMemo, useRef } from 'react'

const AnnouncerContext = createContext({
  announce: () => {},
  announceUrgent: () => {},
})

export function AnnouncerProvider({ children }) {
  const politeRef = useRef(null)
  const assertiveRef = useRef(null)

  const writeToRegion = useCallback((ref, message) => {
    if (!ref.current) return
    ref.current.textContent = ''
    window.requestAnimationFrame(() => {
      if (ref.current) {
        ref.current.textContent = message
      }
    })
  }, [])

  const announce = useCallback((message) => {
    if (!message) return
    writeToRegion(politeRef, message)
  }, [writeToRegion])

  const announceUrgent = useCallback((message) => {
    if (!message) return
    writeToRegion(assertiveRef, message)
  }, [writeToRegion])

  const value = useMemo(() => ({ announce, announceUrgent }), [announce, announceUrgent])

  return (
    <AnnouncerContext.Provider value={value}>
      {children}
      <div className="sr-only" aria-live="polite" aria-atomic="true" ref={politeRef} />
      <div className="sr-only" aria-live="assertive" aria-atomic="true" ref={assertiveRef} />
    </AnnouncerContext.Provider>
  )
}

export default function useAnnouncer() {
  return useContext(AnnouncerContext)
}
