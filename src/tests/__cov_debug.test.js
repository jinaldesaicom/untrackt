import { useDebounce } from '../hooks/useDebounce';
import ErrorBoundary from '../components/ErrorBoundary';

describe('cov debug', () => {
  it('has coverage', () => {
    useDebounce;
    ErrorBoundary;
    const vc = Object.keys(globalThis.__VITEST_COVERAGE__ || {});
    const ic = Object.keys(globalThis.__coverage__ || {});
    console.log('VITEST_COVERAGE:', vc.length, vc.slice(0, 3));
    console.log('ISTANBUL_COVERAGE:', ic.length, ic.slice(0, 3));
    // Look for ANY key pattern that might be coverage
    const allKeys = Object.keys(globalThis).filter(k => k.startsWith('__'));
    console.log('DUNDER_GLOBALS:', allKeys);
    expect(true).toBe(true);
  });
});