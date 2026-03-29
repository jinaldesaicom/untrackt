import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import useDebounce from './useDebounce.js'
import { searchTools, getPopularTools } from '../search/searchEngine.js'
import { addRecentSearch, getRecentSearches } from '../utils/storage.js'

export default function useSearch({ limit = 8, debounceMs = 150 } = {}) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [activeIndex, setActiveIndex] = useState(-1)
  const [open, setOpen] = useState(false)
  const [recentSearches, setRecentSearches] = useState(() => getRecentSearches())
  const inputRef = useRef(null)
  const containerRef = useRef(null)
  const navigate = useNavigate()
  const debouncedQuery = useDebounce(query, debounceMs)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const handleSlash = (e) => {
      if (e.key !== '/') return
      const tag = e.target?.tagName?.toLowerCase()
      if (tag === 'input' || tag === 'textarea' || e.target?.isContentEditable) return
      e.preventDefault()
      inputRef.current?.focus()
    }
    document.addEventListener('keydown', handleSlash)
    return () => document.removeEventListener('keydown', handleSlash)
  }, [])

  useEffect(() => {
    setActiveIndex(-1)
    if (debouncedQuery.trim().length < 1) {
      setResults([])
      return
    }
    const matches = searchTools(debouncedQuery, limit)
    setResults(matches)
    setOpen(true)
  }, [debouncedQuery, limit])

  const popular = useCallback(() => getPopularTools().slice(0, 6), [])

  const handleSelect = useCallback((tool) => {
    if (query.trim()) {
      addRecentSearch(query.trim())
      setRecentSearches(getRecentSearches())
    }
    setQuery('')
    setResults([])
    setOpen(false)
    navigate(tool.path)
  }, [query, navigate])

  const submitSearch = useCallback(() => {
    const trimmed = query.trim()
    if (!trimmed) return
    addRecentSearch(trimmed)
    setRecentSearches(getRecentSearches())
    setOpen(false)
    navigate(`/search?q=${encodeURIComponent(trimmed)}`)
  }, [query, navigate])

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter') {
      if (activeIndex >= 0 && results[activeIndex]) {
        e.preventDefault()
        handleSelect(results[activeIndex])
      } else {
        submitSearch()
      }
      return
    }
    if (!open) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((i) => Math.min(i + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((i) => Math.max(i - 1, -1))
    } else if (e.key === 'Escape') {
      setOpen(false)
      inputRef.current?.blur()
    } else if (e.key === 'Tab') {
      setOpen(false)
    }
  }, [open, activeIndex, results, handleSelect, submitSearch])

  const clearQuery = useCallback(() => {
    setQuery('')
    setResults([])
    setOpen(false)
    inputRef.current?.focus()
  }, [])

  return {
    query,
    setQuery,
    results,
    activeIndex,
    open,
    setOpen,
    recentSearches,
    inputRef,
    containerRef,
    handleSelect,
    submitSearch,
    handleKeyDown,
    clearQuery,
    popular,
  }
}
