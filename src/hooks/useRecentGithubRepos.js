import { useState, useCallback, useMemo } from 'react'
import { getRecentGhStars, addRecentGhStar } from '../utils/storage.js'
import { getRepoById } from '../data/githubStars.js'

export default function useRecentGithubRepos() {
  const [recentIds, setRecentIds] = useState(() => getRecentGhStars())

  const addRecent = useCallback((id) => {
    if (!id) return
    addRecentGhStar(id)
    setRecentIds(getRecentGhStars())
  }, [])

  const recentRepos = useMemo(
    () => recentIds.map(getRepoById).filter(Boolean),
    [recentIds],
  )

  return { recentIds, addRecent, recentRepos }
}
