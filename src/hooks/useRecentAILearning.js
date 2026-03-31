import { useState, useCallback, useMemo } from 'react'
import { getRecentAiLearning, addRecentAiLearning } from '../utils/storage.js'
import { getResourceById } from '../data/aiLearning.js'

export default function useRecentAILearning() {
  const [recentIds, setRecentIds] = useState(() => getRecentAiLearning())

  const addRecent = useCallback((id) => {
    if (!id) return
    addRecentAiLearning(id)
    setRecentIds(getRecentAiLearning())
  }, [])

  const recentResources = useMemo(
    () => recentIds.map(getResourceById).filter(Boolean),
    [recentIds],
  )

  return { recentIds, addRecent, recentResources }
}
