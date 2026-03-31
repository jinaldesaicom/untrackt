import { useState, useCallback } from 'react'
import {
  getGhStarsFavorites,
  addGhStarsFavorite,
  removeGhStarsFavorite,
} from '../utils/storage.js'

export default function useGithubStarsFavorites() {
  const [favorites, setFavorites] = useState(() => getGhStarsFavorites())

  const toggleFavorite = useCallback((id) => {
    if (!id) return
    setFavorites((prev) => {
      if (prev.includes(id)) {
        removeGhStarsFavorite(id)
        return prev.filter((i) => i !== id)
      }
      addGhStarsFavorite(id)
      return [...prev, id]
    })
  }, [])

  const isFavorite = useCallback((id) => favorites.includes(id), [favorites])

  return { favorites, toggleFavorite, isFavorite }
}
