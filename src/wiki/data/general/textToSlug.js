export default {
  id: 'text-to-slug',
  title: 'Text to Slug Converter',
  description: 'Convert any text into clean, SEO-friendly URL slugs with transliteration, custom separators, and real-time preview.',
  content: {
    whatIs: {
      heading: 'What is the Text to Slug Converter?',
      body: 'The Text to Slug Converter transforms any text string into a URL-safe, SEO-friendly slug. It lowercases, removes special characters, replaces spaces with hyphens (or custom separators), transliterates accented characters to their ASCII equivalents, and trims trailing separators. The result is a clean, readable URL segment like "how-to-build-a-website" from "How to Build a Website!".'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Clean URLs improve SEO, user experience, and shareability. Search engines prefer descriptive, keyword-rich slugs over random IDs or query strings. Manual slug creation is error-prone--you might forget to handle accented characters, double hyphens, or trailing punctuation. This tool handles all edge cases automatically and consistently.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Type or paste your text (article title, product name, page heading) in the input field.',
        'View the generated slug in real-time below the input.',
        'Optionally change the separator from hyphen (-) to underscore (_) or a custom character.',
        'Toggle transliteration to convert accented characters (é→e, ñ→n, ü→u) or keep them URL-encoded.',
        'Set a maximum slug length if your CMS or framework has URL limits.',
        'Copy the slug to your clipboard with one click.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Real-time slug generation as you type.',
        'Automatic lowercasing and special character removal.',
        'Transliteration of accented/diacritical characters (é→e, ñ→n, ü→u, ø→o).',
        'Configurable separator: hyphen (-), underscore (_), or custom.',
        'Consecutive separator collapsing (no double hyphens).',
        'Leading and trailing separator trimming.',
        'Optional maximum length with intelligent word-boundary truncation.',
        'Support for CJK characters via romanization options.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Generating URL slugs for blog posts and articles from their titles.',
        'Creating SEO-friendly product URLs for e-commerce sites.',
        'Building file names from user-provided titles in CMS systems.',
        'Generating anchor IDs for headings in documentation pages.',
        'Creating consistent naming for image and asset files.',
        'Producing API-friendly identifiers from human-readable labels.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Basic title', description: '"How to Build a Website" → "how-to-build-a-website"' },
        { title: 'Accented characters', description: '"Café Résumé" → "cafe-resume" (with transliteration enabled)' },
        { title: 'Special characters removed', description: '"What\'s New in 2026?!" → "whats-new-in-2026"' },
        { title: 'Consecutive spaces collapsed', description: '"Hello    World" → "hello-world" (multiple spaces become a single hyphen)' },
        { title: 'Underscore separator', description: '"user profile page" → "user_profile_page" (with underscore separator selected)' },
        { title: 'Length-limited slug', description: '"This Is a Very Long Article Title About Something Interesting" → "this-is-a-very-long-article" (truncated at 30 characters on a word boundary)' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Slug', definition: 'The URL-safe portion of a web address that identifies a page in human-readable form, typically derived from the page title.' },
        { term: 'Transliteration', definition: 'Converting characters from one script or diacritical form to their closest ASCII equivalent (e.g., ü→u, ñ→n).' },
        { term: 'URL encoding', definition: 'Replacing unsafe characters with percent-encoded values (e.g., space → %20). Slugs avoid this by using only safe characters.' },
        { term: 'SEO-friendly URL', definition: 'A clean, descriptive URL that includes relevant keywords and is easy for search engines and users to understand.' },
        { term: 'Separator', definition: 'The character used to replace spaces in a slug. Hyphens (-) are the most common and recommended for URLs.' },
        { term: 'Permalink', definition: 'A permanent URL for a piece of content, often containing a slug derived from the content title.' },
        { term: 'Canonical URL', definition: 'The preferred version of a URL that search engines should index, often containing the clean slug version.' },
        { term: 'CMS (Content Management System)', definition: 'Software like WordPress or Strapi that often auto-generates slugs from content titles for URL creation.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'Should I use hyphens or underscores in slugs?', answer: 'Hyphens are recommended by Google for URL word separation. Search engines treat hyphens as word separators but underscores as word joiners.' },
        { question: 'How long should a slug be?', answer: 'Keep slugs under 60 characters for best SEO results. Use the max-length feature with word-boundary truncation to enforce limits.' },
        { question: 'What happens to accented characters?', answer: 'With transliteration enabled, accented characters are converted to their closest ASCII equivalents (é→e, ñ→n). Without it, they are removed or URL-encoded.' },
        { question: 'Are numbers allowed in slugs?', answer: 'Yes. Numbers are URL-safe and often useful for dates, versions, or list items (e.g., "top-10-tips-2026").' },
        { question: 'Should I include stop words like "the" and "a"?', answer: 'For short slugs, removing stop words is fine. For longer titles, keeping them maintains readability. Prioritize clarity over brevity.' },
        { question: 'Can I use this for file naming?', answer: 'Yes. Switch to underscore separator for file systems that handle hyphens inconsistently, or keep hyphens for web-focused naming.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Use hyphens as separators for web URLs--Google recommends them over underscores.',
        'Keep slugs concise and keyword-rich: "best-running-shoes-2026" is better than "the-ultimate-guide-to-finding-the-best-running-shoes-in-2026".',
        'Always transliterate accented characters to ensure maximum compatibility across browsers and systems.',
        'Set a maximum length (50-60 characters) to keep URLs clean and within search engine display limits.',
        'Avoid changing slugs after publication--it breaks existing links and harms SEO unless you set up 301 redirects.',
        'Test generated slugs by pasting them into a browser address bar to verify they resolve correctly.',
        'For multilingual sites, consider separate slug generation per locale rather than transliterating everything to English.',
        'Use consistent slug conventions across your entire site for a professional and predictable URL structure.'
      ]
    }
  },
  relatedTools: ['case-converter', 'meta-tag-generator', 'word-frequency-counter', 'json-to-csv-converter'],
  seo: {
    metaTitle: 'Text to Slug Converter - Generate SEO-Friendly URL Slugs | Wiki | UnTrackt',
    metaDescription: 'Convert any text into clean, SEO-friendly URL slugs with transliteration, custom separators, and length limits. Real-time preview and one-click copy.',
    keywords: ['text to slug', 'slug generator', 'URL slug', 'SEO-friendly URL', 'slug converter', 'permalink generator', 'URL formatter', 'transliteration']
  }
};
