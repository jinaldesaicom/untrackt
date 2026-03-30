import { findMatchingTools } from '../../utils/searchTools.js';

describe('searchTools', () => {
  it('returns results for a query', () => {
    const results = findMatchingTools('calculator', 10);
    expect(Array.isArray(results)).toBe(true);
  });

  it('returns empty array for empty query', () => {
    const results = findMatchingTools('', 10);
    expect(results).toEqual([]);
  });
});
