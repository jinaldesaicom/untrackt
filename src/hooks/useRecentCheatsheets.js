import { useState, useCallback, useMemo } from 'react'
import { getRecentCs, addRecentCs } from '../utils/storage.js'
import { getCheatsheetById } from '../data/cheatsheets.js'

export default function useRecentCheatsheets() {
  const [recentIds, setRecentIds] = useState(() => getRecentCs())

  const addRecent = useCallback((id) => {
    if (!id) return
    addRecentCs(id)
    setRecentIds(getRecentCs())
  }, [])

  const recentSheets = useMemo(
    () => recentIds.map(getCheatsheetById).filter(Boolean),
    [recentIds],
  )

  return { recentIds, addRecent, recentSheets }
}
