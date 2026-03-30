import { DarkModeProvider, useDarkMode } from '../../utils/darkMode.js';

describe('darkMode', () => {
  it('exports DarkModeProvider', () => {
    expect(DarkModeProvider).toBeDefined();
  });

  it('exports useDarkMode', () => {
    expect(useDarkMode).toBeDefined();
  });
});
