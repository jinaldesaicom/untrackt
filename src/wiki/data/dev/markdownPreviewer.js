export default {
  id: 'markdown-previewer',
  title: 'Markdown Previewer',
  description: 'Write Markdown and preview the rendered HTML output in real-time with support for CommonMark, GFM tables, task lists, and syntax highlighting.',
  content: {
    whatIs: {
      heading: 'What is the Markdown Previewer?',
      body: 'The Markdown Previewer is a live editor that renders Markdown syntax into formatted HTML as you type. Markdown is a lightweight markup language that uses simple text formatting conventions -- like # for headings, ** for bold, and - for lists -- to produce structured documents. This tool supports the CommonMark specification and GitHub Flavored Markdown (GFM) extensions including tables, task lists, strikethrough, and fenced code blocks with syntax highlighting. It is perfect for writing README files, documentation, blog posts, and technical notes.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Markdown is the standard format for documentation, README files, wikis, and technical writing. However, many editors do not show you the rendered output as you write, forcing you to guess how your formatting will look. This tool provides instant visual feedback -- see the rendered HTML side-by-side with your Markdown source -- so you can write with confidence, catch formatting errors early, and iterate on your content faster.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Type or paste Markdown into the left editor panel.',
        'View the rendered HTML output in the right preview panel in real-time.',
        'Use the toolbar for quick insertion of headings, bold, italic, links, images, and code blocks.',
        'Toggle between split view (editor + preview) and full preview mode.',
        'Switch themes for the preview: light, dark, or GitHub-style.',
        'Export the rendered output as HTML or copy the raw Markdown.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Real-time rendering of Markdown to HTML as you type.',
        'Full CommonMark and GitHub Flavored Markdown (GFM) support.',
        'Syntax highlighting for fenced code blocks in 100+ languages.',
        'GFM tables, task lists, strikethrough, and autolinks.',
        'Split view: Markdown editor on the left, rendered preview on the right.',
        'Scroll synchronization between editor and preview panels.',
        'Toolbar for quick Markdown formatting shortcuts.',
        'Export as HTML or copy rendered output for use in web pages.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Writing and previewing GitHub README.md files before committing.',
        'Drafting technical documentation and API guides in Markdown format.',
        'Previewing blog posts written in Markdown before publishing.',
        'Creating formatted notes and meeting minutes with structured headings and lists.',
        'Testing Markdown table rendering and alignment.',
        'Learning Markdown syntax with instant visual feedback.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Heading Hierarchy', description: 'Use # through ###### to create heading levels and see the rendered hierarchy with appropriate sizing and spacing.' },
        { title: 'Code Block with Syntax Highlighting', description: 'Wrap code in ```javascript ... ``` to see syntax-highlighted JavaScript with proper coloring and formatting.' },
        { title: 'GFM Table', description: 'Create a table with | column headers | and --- separators to see a fully rendered, aligned HTML table.' },
        { title: 'Task List', description: 'Use - [ ] and - [x] to create interactive task lists with checkboxes, perfect for project tracking documents.' },
        { title: 'Embedded Image', description: 'Use ![alt text](url) syntax to embed and preview images directly in your Markdown document.' },
        { title: 'Nested Lists', description: 'Create multi-level bulleted and numbered lists with proper indentation to visualize document hierarchy.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Markdown', definition: 'A lightweight markup language created by John Gruber in 2004, designed to be easy to read and write in plain text and convertible to HTML.' },
        { term: 'CommonMark', definition: 'A strongly specified, standardized version of Markdown that resolves ambiguities in the original Markdown specification.' },
        { term: 'GitHub Flavored Markdown (GFM)', definition: 'GitHub\'s extension of CommonMark that adds tables, task lists, strikethrough, autolinks, and fenced code blocks.' },
        { term: 'Headings', definition: 'Lines starting with # symbols that create hierarchical document structure. # is h1 (largest), ###### is h6 (smallest).' },
        { term: 'Fenced Code Block', definition: 'A block of code enclosed in triple backticks (```) with an optional language identifier for syntax highlighting.' },
        { term: 'Inline Code', definition: 'Text wrapped in single backticks (`) rendered in a monospace font, used for code references within a paragraph.' },
        { term: 'Table', definition: 'A GFM feature that renders tabular data using pipe (|) characters for columns and dashes (-) for the header separator row.' },
        { term: 'Front Matter', definition: 'YAML metadata at the top of a Markdown file (between --- delimiters) used by static site generators for page configuration.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'Which Markdown specification is supported?', answer: 'This tool supports CommonMark with GitHub Flavored Markdown (GFM) extensions, covering the vast majority of Markdown features used on GitHub, GitLab, and modern documentation platforms.' },
        { question: 'Can I preview Markdown with embedded HTML?', answer: 'Yes. Inline HTML is supported per the Markdown specification -- you can mix HTML tags with Markdown syntax and see the combined output.' },
        { question: 'Is syntax highlighting available for code blocks?', answer: 'Yes. Fenced code blocks with a language identifier (e.g., ```python) render with full syntax highlighting for over 100 programming languages.' },
        { question: 'Can I export the rendered HTML?', answer: 'Yes. Click the export button to download the rendered output as an HTML file, or copy the raw HTML markup to your clipboard.' },
        { question: 'Does the tool support LaTeX math?', answer: 'LaTeX math rendering depends on the Markdown flavor. This tool supports GFM-compatible math using $ for inline and $$ for block equations where enabled.' },
        { question: 'Is my content saved?', answer: 'Content is stored temporarily in your browser for the current session. Use the export or copy feature to save your work permanently.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Use heading levels semantically -- start with # for the document title and use ## through #### for subsections.',
        'Specify the language in fenced code blocks (```js, ```python) for proper syntax highlighting.',
        'Use reference-style links [text][id] for documents with many URLs to improve source readability.',
        'Add alt text to images (![descriptive text](url)) for accessibility and SEO.',
        'Preview tables carefully -- column alignment requires matching pipe count and proper separator rows.',
        'Keep paragraphs separated by blank lines to ensure proper rendering.',
        'Use task lists for actionable items in project documentation and meeting notes.',
        'Test your Markdown rendering on the target platform (GitHub, GitLab, etc.) as rendering may differ slightly.'
      ]
    }
  },
  relatedTools: ['text-diff-checker', 'json-formatter', 'lorem-ipsum-generator', 'html-entity-encoder', 'regex-tester'],
  seo: {
    metaTitle: 'Markdown Previewer - Live Markdown to HTML Preview | UnTrackt Wiki',
    metaDescription: 'Write Markdown and preview rendered HTML in real-time. Supports CommonMark, GFM tables, task lists, code highlighting, and export to HTML.',
    keywords: ['markdown previewer', 'markdown editor', 'markdown to html', 'live markdown preview', 'gfm preview', 'markdown renderer', 'commonmark editor', 'markdown online']
  }
};
