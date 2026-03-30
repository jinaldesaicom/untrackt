export default {
  id: 'meta-tag-generator',
  title: 'Meta Tag Generator',
  description: 'Generate HTML meta tags, Open Graph tags, Twitter Cards, and JSON-LD structured data for optimal SEO and social media sharing.',
  content: {
    whatIs: {
      heading: 'What is the Meta Tag Generator?',
      body: 'The Meta Tag Generator creates the HTML meta tags that search engines and social platforms use to understand and display your web pages. It produces standard meta tags (title, description, robots, canonical), Open Graph tags for Facebook and LinkedIn, Twitter Card tags, and JSON-LD structured data for rich search results. Fill in a form and get correctly formatted HTML ready to paste into your page\'s <head> section.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Proper meta tags are critical for SEO, social sharing, and rich search results. Without them, search engines may misrepresent your content and social platforms will generate unattractive link previews. Writing meta tags by hand is error-prone--incorrect Open Graph properties or malformed JSON-LD will silently fail. This tool ensures correct syntax and comprehensive coverage across all platforms.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Enter your page title, description, and canonical URL in the basic fields.',
        'Upload or enter a URL for the Open Graph / social sharing image.',
        'Select your page type (article, website, product, etc.) for structured data.',
        'Fill optional fields: author, published date, keywords, locale.',
        'Preview the generated meta tags, Open Graph tags, Twitter Cards, and JSON-LD.',
        'Copy the complete HTML snippet and paste it into your page\'s <head> section.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Standard HTML meta tags: title, description, robots, viewport, charset, canonical.',
        'Open Graph tags: og:title, og:description, og:image, og:url, og:type, og:locale.',
        'Twitter Card tags: twitter:card, twitter:title, twitter:description, twitter:image, twitter:site.',
        'JSON-LD structured data for Article, WebSite, Product, FAQPage, and BreadcrumbList schemas.',
        'Character count indicators for title (50-60 chars) and description (150-160 chars).',
        'Social media preview showing how the page will appear when shared on Facebook, Twitter, and LinkedIn.',
        'Robots directive configuration: index/noindex, follow/nofollow, noarchive, nosnippet.',
        'One-click copy of the complete HTML meta tag block.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Setting up SEO-optimized meta tags for a new website or blog.',
        'Creating attractive social media link previews for marketing content.',
        'Generating JSON-LD structured data for rich search results (FAQ snippets, article cards).',
        'Configuring robots directives for pages that should or shouldn\'t be indexed.',
        'Auditing and regenerating meta tags for existing pages during an SEO overhaul.',
        'Producing Open Graph tags for landing pages in ad campaigns.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Blog post meta tags', description: 'Title: "10 CSS Tips for 2026", Description: "Learn 10 modern CSS techniques to improve your web design." → generates title tag, meta description, og:title, og:description, and Article JSON-LD.' },
        { title: 'Product page', description: 'Title: "Running Shoes Pro X", og:type: "product", with price and availability in JSON-LD Product schema for rich search results.' },
        { title: 'Twitter Card (large image)', description: 'twitter:card set to "summary_large_image" with a 1200×630 preview image for maximum visual impact when shared on Twitter/X.' },
        { title: 'FAQ page schema', description: 'JSON-LD FAQPage structured data with 5 question-answer pairs, enabling FAQ rich snippets in Google search results.' },
        { title: 'Noindex staging page', description: 'Robots meta set to "noindex, nofollow" for a staging or preview page that should not appear in search results.' },
        { title: 'Multilingual Open Graph', description: 'og:locale set to "fr_FR" with og:locale:alternate for "en_US" and "es_ES" for a French-language page with English and Spanish alternates.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Meta tag', definition: 'An HTML element in the <head> section that provides metadata about a web page to search engines and browsers.' },
        { term: 'Open Graph (OG)', definition: 'A protocol developed by Facebook that uses meta tags to control how web pages appear when shared on social media platforms.' },
        { term: 'Twitter Card', definition: 'Special meta tags that define how a page is previewed when its URL is shared on Twitter/X, supporting summary, large image, and player card types.' },
        { term: 'JSON-LD', definition: 'JavaScript Object Notation for Linked Data--a structured data format embedded in a <script> tag that search engines use for rich results.' },
        { term: 'Canonical URL', definition: 'The preferred URL for a page, specified via <link rel="canonical">, telling search engines which version to index when duplicate content exists.' },
        { term: 'Robots directive', definition: 'Meta tag instructions (index, noindex, follow, nofollow) that tell search engine crawlers how to handle a page.' },
        { term: 'Rich snippet', definition: 'Enhanced search results (FAQ answers, star ratings, product prices) powered by structured data like JSON-LD.' },
        { term: 'Schema.org', definition: 'A collaborative vocabulary (schema.org) used to define structured data types like Article, Product, FAQPage, and BreadcrumbList.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'What is the ideal meta title length?', answer: 'Keep titles between 50-60 characters to prevent truncation in search results. The tool shows a character counter to help you stay within limits.' },
        { question: 'What is the ideal meta description length?', answer: '150-160 characters for desktop and 120 characters for mobile. The tool provides real-time character counting for both.' },
        { question: 'Do I need both Open Graph and Twitter Card tags?', answer: 'Yes, for complete coverage. Twitter falls back to Open Graph tags if its own are missing, but specifying both ensures optimal display on each platform.' },
        { question: 'What is JSON-LD and do I need it?', answer: 'JSON-LD is structured data that enables rich search results like FAQ snippets and product cards. It is strongly recommended for SEO but not strictly required.' },
        { question: 'What image size should I use for Social sharing?', answer: '1200×630 pixels is the recommended size for Open Graph/Twitter Card images. Use JPEG or PNG format under 5 MB.' },
        { question: 'Should every page have unique meta tags?', answer: 'Yes. Duplicate meta titles and descriptions across pages confuse search engines and reduce each page\'s SEO effectiveness.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Write unique, keyword-rich meta titles (50-60 chars) and descriptions (150-160 chars) for every page.',
        'Always include a high-quality 1200×630 Open Graph image for attractive social media previews.',
        'Set a canonical URL on every page to prevent duplicate content issues.',
        'Use JSON-LD structured data (not Microdata) as recommended by Google for rich search results.',
        'Test your meta tags with Google\'s Rich Results Test and Facebook\'s Sharing Debugger before publishing.',
        'Use noindex,nofollow for staging, admin, and private pages to keep them out of search results.',
        'Include og:locale for multilingual sites so social platforms display the correct language.',
        'Update meta tags when page content changes significantly to keep search listings accurate.'
      ]
    }
  },
  relatedTools: ['text-to-slug', 'qr-code-generator', 'color-palette-generator', 'json-to-csv-converter'],
  seo: {
    metaTitle: 'Meta Tag Generator - SEO, Open Graph & Twitter Cards | Wiki | UnTrackt',
    metaDescription: 'Generate HTML meta tags, Open Graph, Twitter Cards, and JSON-LD structured data for optimal SEO and social sharing. Preview and copy ready-to-use HTML.',
    keywords: ['meta tag generator', 'Open Graph tags', 'Twitter Card', 'JSON-LD', 'SEO meta tags', 'structured data', 'rich snippets', 'social media tags', 'robots meta']
  }
};
