import { useEffect, useState } from 'react'
import { getPreference, setPreference } from '../utils/storage.js'

export default function useStoredPreference(key, defaultValue) {
  const [value, setValue] = useState(() => getPreference(key, defaultValue))

  useEffect(() => {
    setPreference(key, value)
  }, [key, value])

  return [value, setValue]
}