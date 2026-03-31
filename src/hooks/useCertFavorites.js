import { useState, useCallback } from 'react'
import {
  getCertFavorites,
  addCertFavorite,
  removeCertFavorite,
} from '../utils/storage.js'

export default function useCertFavorites() {
  const [favorites, setFavorites] = useState(() => getCertFavorites())

  const toggleFavorite = useCallback((id) => {
    if (!id) return
    setFavorites((prev) => {
      if (prev.includes(id)) {
        removeCertFavorite(id)
        return prev.filter((i) => i !== id)
      }
      addCertFavorite(id)
      return [...prev, id]
    })
  }, [])

  const isFavorite = useCallback((id) => favorites.includes(id), [favorites])

  return { favorites, toggleFavorite, isFavorite }
}
