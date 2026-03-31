import { useState, useCallback } from 'react'
import { getIpFavorites, addIpFavorite, removeIpFavorite } from '../utils/storage.js'

export function useInterviewPrepFavorites() {
  const [favorites, setFavorites] = useState(() => getIpFavorites())

  const toggleFavorite = useCallback((id) => {
    setFavorites((prev) => {
      if (prev.includes(id)) {
        removeIpFavorite(id)
        return prev.filter((i) => i !== id)
      }
      addIpFavorite(id)
      return [...prev, id]
    })
  }, [])

  const isFavorite = useCallback((id) => favorites.includes(id), [favorites])

  return { favorites, toggleFavorite, isFavorite }
}
