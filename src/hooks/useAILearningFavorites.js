import { useState, useCallback } from 'react'
import {
  getAiLearningFavorites,
  addAiLearningFavorite,
  removeAiLearningFavorite,
} from '../utils/storage.js'

export default function useAILearningFavorites() {
  const [favorites, setFavorites] = useState(() => getAiLearningFavorites())

  const toggleFavorite = useCallback((id) => {
    if (!id) return
    setFavorites((prev) => {
      if (prev.includes(id)) {
        removeAiLearningFavorite(id)
        return prev.filter((i) => i !== id)
      }
      addAiLearningFavorite(id)
      return [...prev, id]
    })
  }, [])

  const isFavorite = useCallback((id) => favorites.includes(id), [favorites])

  return { favorites, toggleFavorite, isFavorite }
}
