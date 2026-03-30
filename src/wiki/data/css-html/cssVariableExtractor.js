export default {
  id: 'css-variable-extractor',
  title: 'CSS Variable Extractor',
  description: 'Paste CSS and extract all custom properties (--var) into a clean list. Copy or download the variable declarations.',
  content: {
    whatIs: {
      heading: 'What is the CSS Variable Extractor?',
      body: 'The CSS Variable Extractor scans a CSS stylesheet and identifies all custom properties (CSS variables) defined with the -- prefix. It extracts them into a clean, organized list showing each variable name and its value, making it easy to audit, document, or migrate design tokens from an existing stylesheet.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Large stylesheets can have dozens of CSS custom properties scattered across multiple files. This tool collects them all into one view, helping you identify duplicates, spot inconsistencies, and create a centralized design token reference from an existing codebase.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Paste your CSS into the input area.',
        'Click "Extract" to find all custom properties.',
        'View the extracted variables with their names and values.',
        'Sort or group variables by prefix or category.',
        'Copy the variable list or download as a file.',
        'Use the extracted list to build or audit your design token system.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Extracts all --custom-property declarations from CSS.',
        'Shows variable name and assigned value.',
        'Groups variables by prefix (e.g., --color-*, --spacing-*).',
        'Duplicate detection highlighting.',
        'Copy as :root block or as a flat list.',
        'Download extracted variables as CSS or JSON.',
        'Client-side processing — your CSS stays private.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Auditing CSS variables in a large codebase.',
        'Extracting design tokens from an existing stylesheet for migration.',
        'Creating documentation for a design system\'s variable catalog.',
        'Identifying duplicate or unused variables.',
        'Reviewing variable naming conventions for consistency.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Color Extraction', description: 'From a 2000-line stylesheet, extract 45 color variables grouped under --color-* prefix.' },
        { title: 'Spacing Audit', description: 'Extract --spacing-xs through --spacing-3xl and verify the scale is consistent.' },
        { title: 'Duplicate Detection', description: 'Find that --primary-color is defined in both :root and .dark-theme with different values.' },
        { title: 'Token Migration', description: 'Extract all variables as JSON for import into a design token management tool.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'CSS Custom Property', definition: 'A property defined with a -- prefix that stores a value for reuse throughout a stylesheet, also called a CSS variable.' },
        { term: 'var()', definition: 'The CSS function used to reference a custom property value.' },
        { term: 'Design Token', definition: 'A named value representing a design decision (color, spacing, typography) used across a design system.' },
        { term: ':root', definition: 'A CSS pseudo-class that matches the document root element, commonly used to define global custom properties.' },
        { term: 'Cascade', definition: 'The mechanism by which CSS determines property values when multiple declarations apply, including custom properties.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'Does it find variables inside media queries?', answer: 'Yes. The extractor scans all blocks including @media, @supports, and nested selectors.' },
        { question: 'Can it detect unused variables?', answer: 'It lists all declared variables. Cross-reference with var() usage in your codebase to find unused ones.' },
        { question: 'Does it handle Sass or Less variables?', answer: 'No. This tool extracts CSS custom properties (--) only. Sass ($var) and Less (@var) are not CSS custom properties.' },
        { question: 'What output formats are available?', answer: 'You can copy as a :root CSS block, a flat list, or download as JSON.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Use consistent naming conventions: --category-name-variant (e.g., --color-primary-500).',
        'Define all global variables in :root for clarity.',
        'Audit variables regularly to remove unused or duplicate declarations.',
        'Group variables by category (colors, spacing, typography, shadows) in your stylesheet.',
        'Use the extracted list to create or update your design system documentation.',
        'Export as JSON when integrating with design token tools or component libraries.'
      ]
    }
  },
  relatedTools: ['html-formatter-beautifier', 'color-converter', 'color-palette-generator', 'css-units-converter'],
  seo: {
    metaTitle: 'CSS Variable Extractor — Extract Custom Properties | UnTrackt Wiki',
    metaDescription: 'Extract all CSS custom properties (--variables) from a stylesheet into an organized list. Audit, document, and export design tokens.',
    keywords: ['css variable extractor', 'css custom properties', 'design tokens', 'extract css variables', 'css audit', 'css variables list']
  }
};
