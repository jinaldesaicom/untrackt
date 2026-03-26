import { createContext, createElement, useContext, useMemo, useState } from 'react'
import {
  addFavorite as persistAddFavorite,
  clearFavorites as persistClearFavorites,
  getFavorites as readFavorites,
  removeFavorite as persistRemoveFavorite,
} from '../utils/storage.js'

const FavoritesContext = createContext({
  favorites: [],
  toggleFavorite: () => {},
  isFavorite: () => false,
  clearFavorites: () => {},
})

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => readFavorites())

  const toggleFavorite = (toolId) => {
    if (!toolId) return false

    let added = false
    setFavorites((current) => {
      if (current.includes(toolId)) {
        persistRemoveFavorite(toolId)
        added = false
        return current.filter((id) => id !== toolId)
      }

      persistAddFavorite(toolId)
      added = true
      return [...current, toolId]
    })

    return added
  }

  const clearFavorites = () => {
    persistClearFavorites()
    setFavorites([])
  }

  const value = useMemo(() => ({
    favorites,
    toggleFavorite,
    isFavorite: (toolId) => favorites.includes(toolId),
    clearFavorites,
  }), [favorites])

  return createElement(FavoritesContext.Provider, { value }, children)
}

export function useFavorites() {
  return useContext(FavoritesContext)
}