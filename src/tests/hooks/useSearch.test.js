import { renderHook, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import useSearch from '../../hooks/useSearch.js';

const wrapper = ({ children }) => React.createElement(MemoryRouter, null, children);

describe('useSearch', () => {
  it('returns search state', () => {
    const { result } = renderHook(() => useSearch(), { wrapper });
    expect(result.current).toBeDefined();
    expect(result.current.query).toBe('');
    expect(result.current.results).toEqual([]);
  });
});
