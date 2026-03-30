export default {
  id: 'html-formatter-beautifier',
  title: 'HTML Formatter / Beautifier',
  description: 'Paste messy HTML and get it formatted with proper indentation, syntax highlighting, and consistent whitespace.',
  content: {
    whatIs: {
      heading: 'What is the HTML Formatter / Beautifier?',
      body: 'The HTML Formatter / Beautifier takes messy, minified, or poorly indented HTML and transforms it into a cleanly formatted, readable structure. It applies consistent indentation, proper line breaks, and optional syntax highlighting so you can quickly read, edit, and debug HTML code.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Minified HTML from build tools, CMS exports, or email templates is nearly impossible to read. This formatter makes it human-readable instantly, helping you find structural issues, missing tags, and nesting errors that would be invisible in a wall of compressed markup.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Paste your messy or minified HTML into the input area.',
        'Choose indentation style (2 spaces, 4 spaces, or tabs).',
        'Click "Format" to beautify the HTML.',
        'Review the formatted output with syntax highlighting.',
        'Copy the formatted HTML to your clipboard.',
        'Optionally minify the output back into a single line.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Auto-indentation with configurable indent size.',
        'Syntax highlighting for tags, attributes, and content.',
        'Line-by-line view with line numbers.',
        'Minify option for compressing HTML back to a single line.',
        'Handles malformed HTML gracefully.',
        'One-click copy to clipboard.',
        'Client-side processing — your HTML never leaves your browser.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Formatting minified HTML from build outputs for debugging.',
        'Cleaning up CMS-generated HTML for editing.',
        'Preparing HTML snippets for documentation or tutorials.',
        'Formatting email template HTML for readability.',
        'Quick inspection of HTML structure from View Source.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Minified HTML', description: 'Input: <div><ul><li>A</li><li>B</li></ul></div> → Output: properly indented with each tag on its own line.' },
        { title: 'Email Template', description: 'Paste a complex nested table email template and get readable, indented output.' },
        { title: 'CMS Cleanup', description: 'Format messy WordPress output with extra spans and divs to see the actual structure.' },
        { title: 'Quick Minify', description: 'Take a 100-line HTML snippet and compress it to a single line for inline use.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Beautify', definition: 'The process of adding consistent indentation, line breaks, and whitespace to code for readability.' },
        { term: 'Minify', definition: 'The process of removing all unnecessary whitespace and line breaks to reduce file size.' },
        { term: 'Indentation', definition: 'Whitespace added at the beginning of lines to visually represent nesting depth.' },
        { term: 'Syntax Highlighting', definition: 'Color-coding different parts of the code (tags, attributes, values) for visual clarity.' },
        { term: 'Nesting', definition: 'The hierarchical structure of HTML where elements contain other elements.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'Does formatting change the HTML behavior?', answer: 'No. Whitespace formatting does not affect how the HTML renders in a browser (with rare exceptions inside <pre> or white-space: pre).' },
        { question: 'Can it handle invalid HTML?', answer: 'The tool handles common malformations gracefully but may not perfectly format severely broken markup.' },
        { question: 'What indent size should I use?', answer: '2 spaces is most common in modern web development. Choose what your team uses for consistency.' },
        { question: 'Is my HTML sent to a server?', answer: 'No. All formatting is done in your browser using JavaScript.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Use consistent indentation across your project.',
        'Format HTML before reviewing to catch structural issues.',
        'Minify production HTML to reduce page load times.',
        'Use formatter output to validate proper tag nesting.',
        'Configure your editor\'s auto-formatter to match the style you prefer.',
        'Keep HTML semantic — formatting makes structural problems more visible.'
      ]
    }
  },
  relatedTools: ['html-to-markdown', 'json-formatter', 'css-variable-extractor', 'markdown-previewer'],
  seo: {
    metaTitle: 'HTML Formatter / Beautifier — Format & Prettify HTML | UnTrackt Wiki',
    metaDescription: 'Format messy or minified HTML with proper indentation and syntax highlighting. Beautify HTML instantly in your browser with one click.',
    keywords: ['html formatter', 'html beautifier', 'prettify html', 'html indentation', 'format html online', 'html cleanup']
  }
};
