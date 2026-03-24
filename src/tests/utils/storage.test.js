import '../../tests/__mocks__/storageMock.js'
import * as storage from '../../utils/storage.js'
import localStorageMock from '../__mocks__/storageMock.js'

describe('storage utility', () => {
  beforeEach(() => {
    localStorageMock.clear()
    vi.clearAllMocks()
  })

  it('returns default values, parses stored data, and serializes writes', () => {
    expect(storage.getItem('missing', 'fallback')).toBe('fallback')

    window.localStorage.setItem('profile', JSON.stringify({ theme: 'dark' }))
    expect(storage.getItem('profile', {})).toEqual({ theme: 'dark' })

    storage.setItem('settings', { density: 'compact' })
    expect(window.localStorage.setItem).toHaveBeenLastCalledWith('settings', JSON.stringify({ density: 'compact' }))
  })

  it('removes keys and reads recent tools with sane defaults', () => {
    window.localStorage.setItem('temp', JSON.stringify(true))
    storage.removeItem('temp')
    expect(window.localStorage.removeItem).toHaveBeenCalledWith('temp')

    expect(storage.getRecentTools()).toEqual([])

    window.localStorage.setItem('untrackt:recentTools', JSON.stringify(['jwt-decoder', 'regex-tester']))
    expect(storage.getRecentTools()).toEqual(['jwt-decoder', 'regex-tester'])
  })

  it('prepends recent tools, deduplicates them, and caps the list at six', () => {
    window.localStorage.setItem(
      'untrackt:recentTools',
      JSON.stringify(['one', 'two', 'three', 'four', 'five', 'six'])
    )

    storage.addRecentTool('three')
    expect(storage.getRecentTools()).toEqual(['three', 'one', 'two', 'four', 'five', 'six'])

    storage.addRecentTool('seven')
    expect(storage.getRecentTools()).toEqual(['seven', 'three', 'one', 'two', 'four', 'five'])
  })

  it('gets and sets preference keys with the expected prefix', () => {
    expect(storage.getPreference('layout', 'grid')).toBe('grid')

    storage.setPreference('layout', 'list')
    expect(window.localStorage.setItem).toHaveBeenCalledWith('untrackt:pref:layout', JSON.stringify('list'))
  })

  it('fails silently and never throws when localStorage methods throw', () => {
    window.localStorage.getItem.mockImplementationOnce(() => {
      throw new Error('blocked')
    })
    window.localStorage.setItem.mockImplementationOnce(() => {
      throw new Error('blocked')
    })
    window.localStorage.removeItem.mockImplementationOnce(() => {
      throw new Error('blocked')
    })

    expect(() => storage.getItem('broken', 'safe')).not.toThrow()
    expect(storage.getItem('broken', 'safe')).toBe('safe')
    expect(() => storage.setItem('broken', { ok: true })).not.toThrow()
    expect(storage.setItem('broken', { ok: true })).toBeFalsy()
    expect(() => storage.removeItem('broken')).not.toThrow()
    expect(() => storage.getRecentTools()).not.toThrow()
    expect(() => storage.addRecentTool('tool')).not.toThrow()
    expect(() => storage.getPreference('pref', 'value')).not.toThrow()
    expect(() => storage.setPreference('pref', 'value')).not.toThrow()
  })
})
