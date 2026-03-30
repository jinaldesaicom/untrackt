export default {
  id: 'html-to-markdown',
  title: 'HTML to Markdown Converter',
  description: 'Paste HTML and get clean Markdown output — converts headings, lists, links, images, bold, italic, and code.',
  content: {
    whatIs: {
      heading: 'What is the HTML to Markdown Converter?',
      body: 'The HTML to Markdown Converter takes HTML markup and transforms it into clean, readable Markdown syntax. It handles headings (h1-h6), paragraphs, bold, italic, links, images, ordered and unordered lists, code blocks, blockquotes, and tables — producing Markdown that is ready for README files, documentation, or any Markdown-based platform.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'When migrating content from websites, CMS platforms, or email templates to Markdown-based systems (GitHub, Notion, static site generators), manually converting HTML is tedious. This tool automates the conversion, preserving structure and formatting while stripping unnecessary HTML cruft.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Paste your HTML into the input area.',
        'View the converted Markdown output instantly.',
        'Review the conversion for accuracy.',
        'Adjust conversion settings (e.g., heading style, list markers).',
        'Copy the Markdown to your clipboard.',
        'Preview the Markdown rendering if needed.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Converts headings, paragraphs, lists, links, images, bold, italic, and code.',
        'Table conversion to Markdown table syntax.',
        'Code block detection with language hints.',
        'Configurable heading style (ATX # or Setext underline).',
        'Configurable list marker (-, *, or 1.).',
        'Clean output stripping unnecessary whitespace and tags.',
        'Browser-based — no data shared externally.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Migrating blog posts from WordPress to a static site generator.',
        'Converting web page content to Markdown documentation.',
        'Cleaning up HTML email templates into readable Markdown.',
        'Creating README files from existing HTML documentation.',
        'Converting Confluence or wiki HTML to Markdown for GitHub repos.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Headings', description: '<h2>Title</h2> → ## Title' },
        { title: 'Links', description: '<a href="https://example.com">Click here</a> → [Click here](https://example.com)' },
        { title: 'Unordered List', description: '<ul><li>Item 1</li><li>Item 2</li></ul> → - Item 1\\n- Item 2' },
        { title: 'Bold & Italic', description: '<strong>bold</strong> and <em>italic</em> → **bold** and *italic*' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Markdown', definition: 'A lightweight markup language for creating formatted text using a plain-text editor.' },
        { term: 'ATX Headings', definition: 'Markdown heading style using # symbols (# H1, ## H2, ### H3).' },
        { term: 'Setext Headings', definition: 'Markdown heading style using underlines (= for H1, - for H2).' },
        { term: 'GFM (GitHub Flavored Markdown)', definition: 'An extended version of Markdown with tables, task lists, and strikethrough support.' },
        { term: 'Front Matter', definition: 'YAML metadata at the top of a Markdown file, used by static site generators.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'Does it handle complex HTML?', answer: 'It handles standard semantic HTML well. Complex CSS-based layouts or JavaScript-generated content may not convert meaningfully.' },
        { question: 'What about inline styles?', answer: 'Inline styles are stripped since Markdown does not support CSS styling.' },
        { question: 'Can it handle tables?', answer: 'Yes. HTML tables are converted to GFM-style Markdown tables with header rows and alignment.' },
        { question: 'What if the HTML contains scripts?', answer: 'Script and style tags are stripped from the output for clean, content-only Markdown.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Clean up the HTML before converting — remove unnecessary wrappers and inline styles.',
        'Review the converted output for formatting accuracy, especially tables and nested lists.',
        'Use ATX-style headings (#) for consistency with GitHub and modern Markdown tools.',
        'Convert in smaller chunks for complex pages to catch conversion issues.',
        'Add front matter manually after conversion if needed for static site generators.',
        'Test the converted Markdown in a previewer before publishing.'
      ]
    }
  },
  relatedTools: ['html-formatter-beautifier', 'markdown-previewer', 'css-variable-extractor', 'json-formatter'],
  seo: {
    metaTitle: 'HTML to Markdown Converter — Convert HTML to Markdown | UnTrackt Wiki',
    metaDescription: 'Convert HTML to clean Markdown with support for headings, lists, links, images, tables, and code blocks. Migrate content to Markdown platforms.',
    keywords: ['html to markdown', 'html converter', 'markdown converter', 'html to md', 'convert html markdown', 'content migration']
  }
};
