import { useState, useCallback } from 'react'
import { getRecentIp, addRecentIp } from '../utils/storage.js'
import { interviewPrepResources } from '../data/interviewPrep.js'

export function useRecentInterviewPrep() {
  const [recentIds, setRecentIds] = useState(() => getRecentIp())

  const addRecent = useCallback((id) => {
    addRecentIp(id)
    setRecentIds(getRecentIp())
  }, [])

  const recentResources = recentIds
    .map((id) => interviewPrepResources.find((r) => r.id === id))
    .filter(Boolean)

  return { recentIds, addRecent, recentResources }
}
