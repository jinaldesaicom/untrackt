// Deep tests for storage.js - covers getRecentSearches, addRecentSearch, theme, favorites
import '../../tests/__mocks__/storageMock.js'
import * as storage from '../../utils/storage.js'
import localStorageMock from '../__mocks__/storageMock.js'

describe('storage – extended coverage', () => {
  beforeEach(() => {
    localStorageMock.clear()
    vi.clearAllMocks()
  })

  describe('getRecentSearches / addRecentSearch', () => {
    it('returns empty array by default', () => {
      expect(storage.getRecentSearches()).toEqual([])
    })

    it('returns stored searches', () => {
      window.localStorage.setItem('untrackt:recentSearches', JSON.stringify(['json', 'csv']))
      expect(storage.getRecentSearches()).toEqual(['json', 'csv'])
    })

    it('caps at 3 and deduplicates', () => {
      window.localStorage.setItem('untrackt:recentSearches', JSON.stringify(['a', 'b', 'c']))
      storage.addRecentSearch('d')
      expect(storage.getRecentSearches()).toEqual(['d', 'a', 'b'])
    })

    it('deduplicates existing', () => {
      window.localStorage.setItem('untrackt:recentSearches', JSON.stringify(['a', 'b', 'c']))
      storage.addRecentSearch('b')
      expect(storage.getRecentSearches()).toEqual(['b', 'a', 'c'])
    })

    it('ignores empty strings and falsy values', () => {
      storage.addRecentSearch('')
      storage.addRecentSearch(null)
      storage.addRecentSearch(undefined)
      expect(storage.getRecentSearches()).toEqual([])
    })

    it('returns empty array for non-array stored value', () => {
      window.localStorage.setItem('untrackt:recentSearches', JSON.stringify('not-array'))
      expect(storage.getRecentSearches()).toEqual([])
    })
  })

  describe('theme', () => {
    it('returns system as default theme', () => {
      expect(storage.getTheme()).toBe('system')
    })

    it('gets and sets valid themes', () => {
      storage.setTheme('dark')
      expect(storage.getTheme()).toBe('dark')
      storage.setTheme('light')
      expect(storage.getTheme()).toBe('light')
    })

    it('rejects invalid theme values', () => {
      storage.setTheme('neon')
      // Should not have stored anything
      expect(storage.getTheme()).toBe('system')
    })

    it('returns system for corrupted stored value', () => {
      window.localStorage.setItem('untrackt:theme', JSON.stringify('invalid'))
      expect(storage.getTheme()).toBe('system')
    })
  })

  describe('favorites', () => {
    it('returns empty array by default', () => {
      expect(storage.getFavorites()).toEqual([])
    })

    it('adds a favorite', () => {
      const result = storage.addFavorite('json-formatter')
      expect(result).toEqual(['json-formatter'])
    })

    it('does not duplicate favorites', () => {
      storage.addFavorite('json-formatter')
      const result = storage.addFavorite('json-formatter')
      expect(result).toEqual(['json-formatter'])
    })

    it('ignores falsy toolId for addFavorite', () => {
      const result = storage.addFavorite('')
      expect(result).toEqual([])
    })

    it('removes a favorite', () => {
      storage.addFavorite('a')
      storage.addFavorite('b')
      const result = storage.removeFavorite('a')
      expect(result).toEqual(['b'])
    })

    it('checks isFavorite', () => {
      storage.addFavorite('a')
      expect(storage.isFavorite('a')).toBe(true)
      expect(storage.isFavorite('b')).toBe(false)
    })

    it('toggleFavorite adds and removes', () => {
      storage.toggleFavorite('x')
      expect(storage.isFavorite('x')).toBe(true)
      storage.toggleFavorite('x')
      expect(storage.isFavorite('x')).toBe(false)
    })

    it('clears all favorites', () => {
      storage.addFavorite('a')
      storage.addFavorite('b')
      const result = storage.clearFavorites()
      expect(result).toEqual([])
      expect(storage.getFavorites()).toEqual([])
    })

    it('filters falsy values from stored favorites', () => {
      window.localStorage.setItem('untrackt:favorites', JSON.stringify([null, '', 'real', 0, false]))
      expect(storage.getFavorites()).toEqual(['real'])
    })

    it('returns empty array for non-array stored value', () => {
      window.localStorage.setItem('untrackt:favorites', JSON.stringify('not-array'))
      expect(storage.getFavorites()).toEqual([])
    })
  })

  describe('clearAllUntracktStorage', () => {
    it('removes only untrackt: keys', () => {
      // The mock's Object.keys doesn't expose stored keys, so we override
      // window.localStorage temporarily with a real map-like object.
      const realStore = {}
      const fakeLS = {
        getItem: vi.fn((k) => realStore[k] ?? null),
        setItem: vi.fn((k, v) => { realStore[k] = v }),
        removeItem: vi.fn((k) => { delete realStore[k] }),
        clear: vi.fn(() => { Object.keys(realStore).forEach(k => delete realStore[k]) }),
      }
      // Make Object.keys return stored keys
      Object.defineProperty(window, 'localStorage', { value: new Proxy(fakeLS, {
        ownKeys: () => Object.keys(realStore),
        getOwnPropertyDescriptor: (_, k) => realStore.hasOwnProperty(k)
          ? { configurable: true, enumerable: true, value: realStore[k] }
          : Object.getOwnPropertyDescriptor(fakeLS, k),
      }), configurable: true })

      window.localStorage.setItem('untrackt:theme', JSON.stringify('dark'))
      window.localStorage.setItem('untrackt:favorites', JSON.stringify(['a']))
      window.localStorage.setItem('other-app', JSON.stringify('keep'))
      storage.clearAllUntracktStorage()
      expect(window.localStorage.getItem('untrackt:theme')).toBeNull()
      expect(window.localStorage.getItem('untrackt:favorites')).toBeNull()
      expect(window.localStorage.getItem('other-app')).not.toBeNull()

      // Restore the original mock
      Object.defineProperty(window, 'localStorage', { value: localStorageMock, configurable: true })
    })
  })

  describe('addRecentTool edge cases', () => {
    it('ignores falsy toolId', () => {
      storage.addRecentTool('')
      storage.addRecentTool(null)
      expect(storage.getRecentTools()).toEqual([])
    })

    it('handles non-array stored recent tools', () => {
      window.localStorage.setItem('untrackt:recentTools', JSON.stringify('bad'))
      expect(storage.getRecentTools()).toEqual([])
    })
  })
})
