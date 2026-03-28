export default {
  id: 'title-tag-checker',
  title: 'Title Tag Checker',
  description: 'Evaluate and preview your title tags to ensure they are optimized for search engines and click-through rates.',
  content: {
    whatIs: {
      heading: 'What is the Title Tag Checker?',
      body: 'The Title Tag Checker analyzes your HTML title tags for length, keyword placement, and readability. It provides a real-time SERP preview showing exactly how your title will appear in Google search results, helping you craft titles that are both search-engine friendly and compelling to users.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Title tags are one of the most important on-page SEO elements. A well-optimized title tag improves rankings and directly influences click-through rates from search results. This tool helps you avoid common mistakes like truncation, missing keywords, and bland phrasing by showing exactly how your title appears to searchers before you publish.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Enter your proposed title tag in the input field.',
        'Optionally enter the page URL and meta description for a complete SERP preview.',
        'Review the character and pixel width counts to ensure your title won\'t be truncated.',
        'Check the keyword placement and readability score.',
        'Adjust your title based on the suggestions and preview the updated result.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Real-time Google SERP preview with accurate pixel-width truncation.',
        'Character count with warnings at 50 and 60 character thresholds.',
        'Pixel width calculation matching Google\'s actual rendering behavior.',
        'Keyword presence and position analysis within the title.',
        'Duplicate word and power word detection.',
        'Mobile and desktop SERP preview modes.',
        'Suggestions for improving click-through rate.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Previewing title tags for new blog posts before publishing.',
        'Auditing existing page titles during an SEO migration.',
        'A/B testing different title variations for click-through rate optimization.',
        'Ensuring title tags across a site follow consistent formatting standards.',
        'Checking that title tags include primary keywords near the beginning.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        {
          title: 'Blog Post Title',
          description: 'Enter "10 Best Meal Prep Containers for 2026 | Kitchen Guide" and verify it displays fully in the SERP preview without truncation at 58 characters.'
        },
        {
          title: 'E-commerce Product Page',
          description: 'Check "Buy Wireless Noise-Canceling Headphones - Free Shipping | AudioStore" to ensure the brand and key selling point are visible before truncation.'
        },
        {
          title: 'Homepage Title',
          description: 'Preview "Untrackt - Free Online Tools for SEO, Finance & Productivity" to confirm the brand name and primary categories appear in search results.'
        },
        {
          title: 'Local Business Page',
          description: 'Validate "Best Italian Restaurant in Austin TX - Reservations & Menu | Bella\'s" to check keyword placement and local intent signals.'
        },
        {
          title: 'Comparison Article',
          description: 'Test "Notion vs Obsidian: Which Note-Taking App Is Better in 2026?" to ensure the comparison keywords and year are prominent in the preview.'
        }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Title Tag', definition: 'The HTML <title> element that defines the title of a web page, displayed in browser tabs and search engine results.' },
        { term: 'SERP', definition: 'Search Engine Results Page--the page displayed by a search engine in response to a query.' },
        { term: 'Pixel Width', definition: 'The rendered width of text in pixels; Google truncates title tags at approximately 580-600 pixels on desktop.' },
        { term: 'Click-Through Rate (CTR)', definition: 'The percentage of users who click on a search result after seeing it on the SERP.' },
        { term: 'Truncation', definition: 'When a title tag is cut off with an ellipsis (…) in search results because it exceeds the display width.' },
        { term: 'Power Words', definition: 'Emotionally compelling words like "best," "proven," or "essential" that can increase click-through rates.' },
        { term: 'Brand Suffix', definition: 'The brand name appended to a title tag, typically after a pipe (|) or dash (-).' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'What is the ideal title tag length?', answer: 'Aim for 50-60 characters or under 580 pixels wide. Google may truncate titles longer than this, cutting off important information.' },
        { question: 'Should I include my brand name in every title?', answer: 'Generally yes, especially for brand recognition. Place it at the end after a separator (| or -) so the primary keyword appears first.' },
        { question: 'Does Google always use my title tag in results?', answer: 'Not always. Google may rewrite title tags if it determines a different title better matches the searcher\'s query. Well-optimized titles are rewritten less often.' },
        { question: 'Where should I place my primary keyword?', answer: 'Place your primary keyword as close to the beginning of the title tag as possible. Early keyword placement correlates with better rankings.' },
        { question: 'Can special characters affect my title tag?', answer: 'Some characters like pipes (|), dashes (-), and colons (:) are commonly used as separators. Avoid excessive special characters or emojis as they may be stripped by search engines.' },
        { question: 'How does the pixel width differ from character count?', answer: 'Characters have varying widths (e.g., "W" is wider than "i"). Pixel width reflects the actual rendered width, making it a more accurate predictor of truncation than character count alone.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Keep title tags between 50-60 characters to avoid truncation in search results.',
        'Place the primary keyword within the first 3-5 words of the title.',
        'Use power words like "best," "guide," or "how to" to boost click-through rates.',
        'Include a brand suffix separated by a pipe or dash at the end.',
        'Make every title tag unique across your website--no duplicates.',
        'Write for humans first, search engines second--titles should be compelling and clear.',
        'Use the SERP preview to check both desktop and mobile rendering.',
        'Avoid keyword stuffing or repeating the same word multiple times in one title.'
      ]
    }
  },
  relatedTools: ['meta-description-analyzer', 'keyword-density-analyzer', 'open-graph-previewer', 'seo-content-brief'],
  seo: {
    metaTitle: 'Title Tag Checker - Preview & Optimize Your SEO Titles',
    metaDescription: 'Check your title tags for length, keyword placement, and SERP appearance. Preview how titles display in Google search results and optimize for clicks.',
    keywords: ['title tag checker', 'SERP preview', 'title tag length', 'SEO title', 'Google search preview', 'title optimization']
  }
};
