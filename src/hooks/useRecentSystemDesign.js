import { useState, useCallback } from 'react'
import { getRecentSd, addRecentSd } from '../utils/storage.js'
import { systemDesignResources } from '../data/systemDesign.js'

export function useRecentSystemDesign() {
  const [recentIds, setRecentIds] = useState(() => getRecentSd())

  const addRecent = useCallback((id) => {
    addRecentSd(id)
    setRecentIds(getRecentSd())
  }, [])

  const recentResources = recentIds
    .map((id) => systemDesignResources.find((r) => r.id === id))
    .filter(Boolean)

  return { recentIds, addRecent, recentResources }
}
