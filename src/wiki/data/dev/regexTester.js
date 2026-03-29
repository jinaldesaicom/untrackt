export default {
  id: 'regex-tester',
  title: 'Regex Tester',
  description: 'Test, debug, and visualize regular expressions in real-time with match highlighting, capture group extraction, and flag support.',
  content: {
    whatIs: {
      heading: 'What is the Regex Tester?',
      body: 'The Regex Tester is an interactive tool for writing, testing, and debugging regular expressions (regex) in real-time. As you type your pattern, the tool highlights all matches in your test string, displays capture groups, shows match indices, and explains each part of your expression. It supports all JavaScript regex features including flags, lookaheads, lookbehinds, named groups, and Unicode property escapes. This tool eliminates the trial-and-error cycle of regex development by giving you instant visual feedback.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Regular expressions are notoriously difficult to write and debug. A small mistake -- like a misplaced quantifier or forgotten escape -- can cause subtle bugs that are hard to track down. This tool provides real-time match visualization, detailed capture group inspection, and plain-English explanations of your pattern, helping you build correct regex patterns faster and with confidence.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Enter your regular expression pattern in the pattern input field.',
        'Set flags (g, i, m, s, u, y) using the flag toggles.',
        'Paste or type your test string in the text area below.',
        'View highlighted matches in real-time as you type the pattern.',
        'Inspect capture groups, named groups, and match indices in the results panel.',
        'Use the pattern explanation feature to understand each part of your regex.',
        'Copy the final regex pattern or its JavaScript code equivalent.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Real-time match highlighting as you type your pattern.',
        'Full support for JavaScript regex flags: g, i, m, s, u, y.',
        'Capture group extraction with numbered and named group display.',
        'Pattern explanation that breaks down each element in plain English.',
        'Match count and index display for each occurrence.',
        'Replace mode for testing string replacement patterns with backreferences.',
        'Quick-insert reference for common patterns (email, URL, date, etc.).',
        'Shareable URL that encodes your pattern and test string for collaboration.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Validating user input patterns like email addresses, phone numbers, or postal codes.',
        'Extracting structured data from log files, CSV rows, or unstructured text.',
        'Building search-and-replace patterns for code refactoring.',
        'Testing patterns for URL routing in web frameworks.',
        'Debugging regex that produces unexpected matches or misses expected ones.',
        'Learning regular expression syntax with instant visual feedback.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Email Validation', description: 'Test the pattern /^[\\w.-]+@[\\w.-]+\\.[a-zA-Z]{2,}$/ against a list of email addresses to verify which ones match.' },
        { title: 'Extract Dates', description: 'Use /(\\d{4})-(\\d{2})-(\\d{2})/ with the global flag to extract all ISO dates and inspect year, month, and day capture groups.' },
        { title: 'Named Groups', description: 'Try /(?<protocol>https?):\\/\\/(?<domain>[\\w.-]+)/ to extract protocol and domain from URLs using named capture groups.' },
        { title: 'Lookahead Assertion', description: 'Test /\\d+(?= dollars)/ to match numbers only when followed by " dollars" without including the word in the match.' },
        { title: 'Replace with Backreferences', description: 'Use pattern /(\\w+), (\\w+)/ with replacement "$2 $1" to swap "Last, First" names to "First Last".' },
        { title: 'Non-Greedy Matching', description: 'Compare /<.+>/ (greedy) vs /<.+?>/ (non-greedy) against HTML to see the difference in match behavior.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Regular Expression (Regex)', definition: 'A sequence of characters defining a search pattern, used for string matching, extraction, and replacement.' },
        { term: 'Pattern', definition: 'The regex string itself -- the sequence of characters and metacharacters that defines what to match.' },
        { term: 'Flags', definition: 'Modifiers that change regex behavior: g (global), i (case-insensitive), m (multiline), s (dotAll), u (unicode), y (sticky).' },
        { term: 'Capture Group', definition: 'A portion of the pattern enclosed in parentheses () that captures the matched text for later reference or extraction.' },
        { term: 'Quantifier', definition: 'A metacharacter that specifies how many times the preceding element should match: * (0+), + (1+), ? (0-1), {n,m} (range).' },
        { term: 'Anchor', definition: 'A metacharacter that matches a position rather than a character: ^ (start of string), $ (end of string), \\b (word boundary).' },
        { term: 'Lookahead', definition: 'A zero-width assertion that matches a pattern only if it is (or is not) followed by another pattern, without consuming characters.' },
        { term: 'Character Class', definition: 'A set of characters enclosed in square brackets [] that matches any single character from the set, e.g., [a-zA-Z0-9].' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'Which regex flavor does this tool use?', answer: 'This tool uses JavaScript\'s built-in RegExp engine, which supports ECMAScript 2024 features including lookbehinds, named groups, and Unicode property escapes.' },
        { question: 'Why does my regex match differently here than in Python?', answer: 'Different languages use different regex engines. JavaScript lacks some features like atomic groups and possessive quantifiers. Always test patterns in the target language\'s engine.' },
        { question: 'What does the "g" flag do?', answer: 'The global (g) flag finds all matches in the string rather than stopping after the first match. Without it, only the first occurrence is matched.' },
        { question: 'How do I match a literal dot or bracket?', answer: 'Escape special characters with a backslash: \\. for a literal dot, \\[ for a literal bracket, \\\\ for a literal backslash.' },
        { question: 'Can I test replace patterns?', answer: 'Yes. Switch to Replace mode to enter a replacement string with backreferences ($1, $2, or $<name>) and see the result applied to your test string.' },
        { question: 'Is there a way to share my regex?', answer: 'Yes. The tool generates a shareable URL that encodes your pattern, flags, and test string, so you can share it with teammates.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Start with a simple pattern and incrementally add complexity -- test after each change.',
        'Use non-greedy quantifiers (+?, *?) when you want the shortest possible match.',
        'Prefer named capture groups (?<name>...) over numbered groups for readable, maintainable patterns.',
        'Anchor your patterns with ^ and $ when validating entire strings to avoid partial matches.',
        'Use character classes [a-z] instead of the dot (.) when you know the exact set of valid characters.',
        'Test your regex with edge cases: empty strings, special characters, very long inputs, and Unicode text.',
        'Avoid catastrophic backtracking by minimizing nested quantifiers like (a+)+ which cause exponential performance.',
        'Document complex regex patterns with comments or named groups for future maintainability.'
      ]
    }
  },
  relatedTools: ['text-diff-checker', 'json-formatter', 'url-encoder-decoder', 'html-entity-encoder', 'markdown-previewer'],
  seo: {
    metaTitle: 'Regex Tester - Test & Debug Regular Expressions Online | UnTrackt Wiki',
    metaDescription: 'Test and debug regular expressions in real-time with match highlighting, capture groups, and pattern explanations. Supports all JavaScript regex features.',
    keywords: ['regex tester', 'regular expression tester', 'regex debugger', 'regex online', 'test regex', 'regex match', 'regex capture groups', 'regex flags']
  }
};
