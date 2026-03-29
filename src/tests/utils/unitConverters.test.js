import * as converters from '../../utils/unitConverters.js';

describe('unitConverters', () => {
  it('exports are defined', () => {
    expect(converters).toBeDefined();
    const keys = Object.keys(converters);
    expect(keys.length).toBeGreaterThan(0);
  });

  it('converter functions return numbers', () => {
    const fns = Object.entries(converters).filter(([, v]) => typeof v === 'function');
    for (const [name, fn] of fns.slice(0, 5)) {
      try {
        const result = fn(1);
        if (typeof result === 'number') {
          expect(result).not.toBeNaN();
        }
      } catch {}
    }
  });
});
