import { renderHook, act } from '@testing-library/react';
import useToast from '../../hooks/useToast.jsx';
import { ToastProvider } from '../../hooks/useToast.jsx';
import React from 'react';

const wrapper = ({ children }) => React.createElement(ToastProvider, null, children);

describe('useToast', () => {
  it('returns toast functions', () => {
    const { result } = renderHook(() => useToast(), { wrapper });
    expect(result.current).toBeDefined();
  });
});
