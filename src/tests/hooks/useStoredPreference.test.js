import { renderHook, act } from '@testing-library/react';
import useStoredPreference from '../../hooks/useStoredPreference.js';

vi.mock('../../utils/storage', () => ({
  getPreference: vi.fn((_k, d) => d),
  setPreference: vi.fn(),
  getItem: vi.fn((_k, d) => d ?? null),
  setItem: vi.fn(), removeItem: vi.fn(),
}));

describe('useStoredPreference', () => {
  it('returns default value initially', () => {
    const { result } = renderHook(() => useStoredPreference('test-key', 'default'));
    expect(result.current[0]).toBe('default');
  });

  it('updates value via setter', () => {
    const { result } = renderHook(() => useStoredPreference('test-key', 'default'));
    act(() => result.current[1]('new-value'));
    expect(result.current[0]).toBe('new-value');
  });
});
