import { useState, useCallback, useMemo } from 'react'
import { getRecentCerts, addRecentCert } from '../utils/storage.js'
import { getCertById } from '../data/cloudCertifications.js'

export default function useRecentCerts() {
  const [recentIds, setRecentIds] = useState(() => getRecentCerts())

  const addRecent = useCallback((id) => {
    if (!id) return
    addRecentCert(id)
    setRecentIds(getRecentCerts())
  }, [])

  const recentCerts = useMemo(
    () => recentIds.map(getCertById).filter(Boolean),
    [recentIds],
  )

  return { recentIds, addRecent, recentCerts }
}
