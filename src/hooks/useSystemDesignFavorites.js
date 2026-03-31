import { useState, useCallback } from 'react'
import { getSdFavorites, addSdFavorite, removeSdFavorite } from '../utils/storage.js'

export function useSystemDesignFavorites() {
  const [favorites, setFavorites] = useState(() => getSdFavorites())

  const toggleFavorite = useCallback((id) => {
    setFavorites((prev) => {
      if (prev.includes(id)) {
        removeSdFavorite(id)
        return prev.filter((i) => i !== id)
      }
      addSdFavorite(id)
      return [...prev, id]
    })
  }, [])

  const isFavorite = useCallback((id) => favorites.includes(id), [favorites])

  return { favorites, toggleFavorite, isFavorite }
}
