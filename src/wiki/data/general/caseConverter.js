export default {
  id: 'case-converter',
  title: 'Case Converter',
  description: 'Convert text between camelCase, snake_case, kebab-case, PascalCase, UPPER CASE, lower case, Title Case, and Sentence case instantly.',
  content: {
    whatIs: {
      heading: 'What is the Case Converter?',
      body: 'The Case Converter transforms text between common casing formats used in programming, writing, and design. Paste any text and convert it to camelCase, PascalCase, snake_case, SCREAMING_SNAKE_CASE, kebab-case, UPPER CASE, lower case, Title Case, Sentence case, dot.case, path/case, or constant case. It handles multi-word input, existing cased strings, and mixed content intelligently.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Different programming languages and contexts require different naming conventions: JavaScript prefers camelCase, Python uses snake_case, CSS classes use kebab-case, and constants are often SCREAMING_SNAKE_CASE. Manually reformatting variable names, CSS classes, or headings is tedious and error-prone. This tool handles all conversions instantly and correctly.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Paste or type your text in the input field.',
        'Click the target case format button (camelCase, snake_case, kebab-case, etc.).',
        'View the converted text instantly in the output field.',
        'Copy the result with the copy button.',
        'Convert the same input to multiple formats by clicking different case buttons.',
        'Use the clear button to reset and enter new text.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Supports 12+ case formats: camelCase, PascalCase, snake_case, SCREAMING_SNAKE_CASE, kebab-case, UPPER, lower, Title Case, Sentence case, dot.case, path/case, constant case.',
        'Smart word boundary detection from spaces, underscores, hyphens, and camelCase transitions.',
        'Handles mixed-case input and preserves correct word splitting.',
        'Real-time conversion as you type for instant feedback.',
        'One-click copy to clipboard for each output format.',
        'Batch conversion showing all formats simultaneously for comparison.',
        'Handles acronyms and numbers intelligently (e.g., "XMLParser" → "xml_parser").',
        'Support for multi-line text with per-line conversion.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Converting variable names between JavaScript (camelCase) and Python (snake_case) conventions.',
        'Generating CSS class names in kebab-case from design specs written in Title Case.',
        'Creating database column names in snake_case from a spreadsheet with mixed-case headers.',
        'Converting constants to SCREAMING_SNAKE_CASE for configuration files.',
        'Reformatting filenames from Title Case to kebab-case for web-friendly URLs.',
        'Converting API response field names between different naming conventions.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'camelCase', description: '"user profile settings" → "userProfileSettings" -- standard for JavaScript/TypeScript variables and functions.' },
        { title: 'snake_case', description: '"User Profile Settings" → "user_profile_settings" -- standard for Python variables and database columns.' },
        { title: 'kebab-case', description: '"userProfileSettings" → "user-profile-settings" -- standard for CSS classes, URLs, and HTML attributes.' },
        { title: 'PascalCase', description: '"user profile settings" → "UserProfileSettings" -- standard for class names in JavaScript, C#, and Java.' },
        { title: 'SCREAMING_SNAKE_CASE', description: '"api base url" → "API_BASE_URL" -- standard for constants and environment variables.' },
        { title: 'Title Case', description: '"the quick brown fox" → "The Quick Brown Fox" -- standard for headings and titles in English.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'camelCase', definition: 'Naming convention where the first word is lowercase and subsequent words are capitalized with no separators: myVariableName.' },
        { term: 'PascalCase', definition: 'Like camelCase but with the first letter also capitalized: MyClassName. Also called UpperCamelCase.' },
        { term: 'snake_case', definition: 'Words are lowercase and separated by underscores: my_variable_name. Common in Python, Ruby, and SQL.' },
        { term: 'kebab-case', definition: 'Words are lowercase and separated by hyphens: my-css-class. Common in CSS, URLs, and HTML attributes.' },
        { term: 'SCREAMING_SNAKE_CASE', definition: 'All uppercase with underscores: MAX_RETRY_COUNT. Used for constants and environment variables.' },
        { term: 'Title Case', definition: 'The first letter of each major word is capitalized: "The Quick Brown Fox". Used in headings and titles.' },
        { term: 'Sentence case', definition: 'Only the first letter of the first word is capitalized: "The quick brown fox". Standard for body text and UI labels.' },
        { term: 'Word boundary', definition: 'The point where one word ends and another begins, detected by spaces, underscores, hyphens, or case transitions in camelCase.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'How does the tool detect word boundaries?', answer: 'It splits on spaces, underscores, hyphens, dots, and camelCase transitions (lowercase to uppercase). For example, "myVariableName" is split into ["my", "Variable", "Name"].' },
        { question: 'Does it handle acronyms correctly?', answer: 'Yes. "XMLHttpRequest" is intelligently split as "XML Http Request" rather than treating each uppercase letter as a separate word.' },
        { question: 'Can I convert multiple lines at once?', answer: 'Yes. Each line is converted independently, preserving line breaks in the output.' },
        { question: 'Which case should I use for JavaScript variables?', answer: 'Use camelCase for variables and functions, PascalCase for classes and React components, and SCREAMING_SNAKE_CASE for constants.' },
        { question: 'What about numbers in names?', answer: 'Numbers are kept with their adjacent word: "section2Header" → "section_2_header" in snake_case.' },
        { question: 'Does Title Case capitalize prepositions?', answer: 'This tool follows standard title case rules: small words like "the", "of", "and", "in" are lowercase unless they are the first or last word.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Follow your language\'s naming convention consistently: camelCase for JS, snake_case for Python, kebab-case for CSS.',
        'Use PascalCase for class and component names across all languages.',
        'Reserve SCREAMING_SNAKE_CASE for true constants and environment variables.',
        'Use kebab-case for URLs, file names, and CSS classes for maximum web compatibility.',
        'When converting from camelCase to snake_case, verify acronyms are handled correctly in your codebase.',
        'Apply Sentence case for UI labels and form field names for a clean, modern interface.',
        'Use the batch view to compare all formats side-by-side before choosing the right one.',
        'When renaming identifiers in code, use your IDE\'s rename refactoring tool after determining the correct case format here.'
      ]
    }
  },
  relatedTools: ['text-to-slug', 'word-frequency-counter', 'binary-text-converter', 'json-to-csv-converter'],
  seo: {
    metaTitle: 'Case Converter - camelCase, snake_case, kebab-case & More | Wiki | UnTrackt',
    metaDescription: 'Convert text between camelCase, snake_case, kebab-case, PascalCase, Title Case, and more. Smart word boundary detection with instant results.',
    keywords: ['case converter', 'camelCase', 'snake_case', 'kebab-case', 'PascalCase', 'text case', 'naming convention', 'title case', 'case transformation']
  }
};
