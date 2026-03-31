import { useState, useCallback } from 'react'
import {
  getStatusFavorites,
  addStatusFavorite,
  removeStatusFavorite,
  isStatusFavorite as checkFavorite,
} from '../utils/storage.js'

export default function useStatusFavorites() {
  const [favorites, setFavorites] = useState(() => getStatusFavorites())

  const toggleFavorite = useCallback((id) => {
    if (!id) return
    setFavorites((prev) => {
      if (prev.includes(id)) {
        removeStatusFavorite(id)
        return prev.filter((i) => i !== id)
      }
      addStatusFavorite(id)
      return [...prev, id]
    })
  }, [])

  const isFavorite = useCallback((id) => favorites.includes(id), [favorites])

  return { favorites, toggleFavorite, isFavorite }
}
