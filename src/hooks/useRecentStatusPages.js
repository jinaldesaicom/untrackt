import { useState, useCallback, useMemo } from 'react'
import { getRecentStatusPages, addRecentStatusPage } from '../utils/storage.js'
import { getServiceById } from '../data/statusPages.js'

export default function useRecentStatusPages() {
  const [recentIds, setRecentIds] = useState(() => getRecentStatusPages())

  const addRecent = useCallback((id) => {
    if (!id) return
    addRecentStatusPage(id)
    setRecentIds(getRecentStatusPages())
  }, [])

  const recentServices = useMemo(
    () => recentIds.map(getServiceById).filter(Boolean),
    [recentIds],
  )

  return { recentIds, addRecent, recentServices }
}
