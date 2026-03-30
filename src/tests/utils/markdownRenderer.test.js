import { renderMarkdown } from '../../utils/markdownRenderer.js';

describe('markdownRenderer', () => {
  it('renders markdown to HTML', () => {
    const result = renderMarkdown('# Hello');
    expect(result).toContain('Hello');
  });

  it('handles empty input', () => {
    const result = renderMarkdown('');
    expect(result).toBeDefined();
  });
});
