import { useState, useCallback } from 'react'
import {
  getCsFavorites,
  addCsFavorite,
  removeCsFavorite,
  isCsFavorite as checkFavorite,
} from '../utils/storage.js'

export default function useCheatsheetFavorites() {
  const [favorites, setFavorites] = useState(() => getCsFavorites())

  const toggleFavorite = useCallback((id) => {
    if (!id) return
    setFavorites((prev) => {
      if (prev.includes(id)) {
        removeCsFavorite(id)
        return prev.filter((i) => i !== id)
      }
      addCsFavorite(id)
      return [...prev, id]
    })
  }, [])

  const isFavorite = useCallback((id) => favorites.includes(id), [favorites])

  return { favorites, toggleFavorite, isFavorite }
}
