export default {
  id: 'hreflang-generator',
  title: 'Hreflang Tag Generator',
  description: 'Generate hreflang tags for multilingual and multi-regional websites to serve the right content to the right audience.',
  content: {
    whatIs: {
      heading: 'What is the Hreflang Tag Generator?',
      body: 'The Hreflang Tag Generator creates hreflang annotations that tell search engines which language and regional version of a page to show to users based on their location and language settings. It generates the correct link tags for HTML head, HTTP headers, or XML sitemap formats, ensuring international audiences see the appropriate version of your content.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Incorrect or missing hreflang tags cause search engines to show the wrong language version of your pages to users, leading to poor user experience, high bounce rates, and duplicate content issues across language versions. This tool ensures your hreflang tags use valid language and region codes, include proper self-referencing tags, and cover all required cross-references between page versions.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Enter the URL of the default or primary page version.',
        'Add language/region variations with their corresponding URLs and language-region codes.',
        'Optionally add an x-default URL for users whose language/region doesn\'t match any version.',
        'Select the output format: HTML link tags, HTTP headers, or XML sitemap annotations.',
        'Copy the generated hreflang code and implement it on your pages.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Supports all ISO 639-1 language codes and ISO 3166-1 Alpha 2 region codes.',
        'Generates output in HTML link tag, HTTP header, and XML sitemap formats.',
        'Automatic self-referencing tag inclusion for each language version.',
        'x-default fallback support for unmatched language/region combinations.',
        'Validation of language-region code combinations.',
        'Bulk entry for sites with many language versions.',
        'Cross-reference completeness checker ensuring all versions reference each other.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Setting up hreflang for a site with English, Spanish, and French versions.',
        'Differentiating between British English (en-GB) and American English (en-US) content.',
        'Implementing regional targeting for e-commerce sites with country-specific pricing.',
        'Configuring hreflang for sites using subdirectories (/en/, /fr/, /de/).',
        'Adding hreflang to XML sitemaps for sites where HTML head modifications are difficult.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        {
          title: 'Three-Language Website',
          description: 'Generate hreflang tags for English (en), Spanish (es), and French (fr) versions of a page, with the English version as x-default for unmatched regions.'
        },
        {
          title: 'Regional English Variants',
          description: 'Create hreflang tags that distinguish between US English (en-US), UK English (en-GB), and Australian English (en-AU) for a global brand website.'
        },
        {
          title: 'E-commerce Regional Pricing',
          description: 'Set up hreflang for a product page with region-specific versions: en-US (USD pricing), en-GB (GBP pricing), de-DE (EUR pricing), and ja-JP (JPY pricing).'
        },
        {
          title: 'XML Sitemap Implementation',
          description: 'Generate hreflang annotations in XML sitemap format for a CMS that doesn\'t support adding link tags to the HTML head directly.'
        },
        {
          title: 'Subdirectory-Based Languages',
          description: 'Create hreflang tags for example.com/en/, example.com/fr/, and example.com/es/ with proper self-references and cross-references.'
        }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'hreflang', definition: 'An HTML attribute that specifies the language and optional regional targeting of a page, used in <link rel="alternate"> tags.' },
        { term: 'x-default', definition: 'A special hreflang value indicating the fallback page for users whose language or region doesn\'t match any specified version.' },
        { term: 'ISO 639-1', definition: 'The international standard for two-letter language codes (e.g., "en" for English, "fr" for French, "de" for German).' },
        { term: 'ISO 3166-1 Alpha 2', definition: 'The international standard for two-letter country codes (e.g., "US" for United States, "GB" for United Kingdom).' },
        { term: 'Self-Referencing Tag', definition: 'An hreflang tag on a page that points to itself, required for proper implementation on every page in the set.' },
        { term: 'Return Tag', definition: 'The requirement that if page A links to page B with hreflang, page B must link back to page A. All pages must cross-reference each other.' },
        { term: 'Language-Region Code', definition: 'A combined code like "en-US" or "pt-BR" specifying both the language and the regional variant.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'Do I need hreflang if my site is only in one language?', answer: 'Generally no. Hreflang is only needed when you have multiple language or regional versions of the same content.' },
        { question: 'Does hreflang affect rankings?', answer: 'Hreflang doesn\'t boost rankings directly. It helps search engines serve the correct version to the right audience, reducing irrelevant traffic and improving user experience signals.' },
        { question: 'Do all pages need to reference each other?', answer: 'Yes. Hreflang requires bidirectional (return) tags. Every page in the set must have hreflang tags pointing to all other versions, including itself.' },
        { question: 'What is x-default and when should I use it?', answer: 'x-default specifies the fallback URL for users whose language/region doesn\'t match any defined version. Use it to direct unmatched users to a language selector or your primary language version.' },
        { question: 'Can I use hreflang with subdomains?', answer: 'Yes. Hreflang works with any URL structure: subdomains (en.example.com), subdirectories (example.com/en/), or separate domains (example.co.uk).' },
        { question: 'Where should I implement hreflang tags?', answer: 'You can implement them in the HTML <head> section, in HTTP headers (for non-HTML files like PDFs), or in the XML sitemap. Choose one method and be consistent.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Always include self-referencing hreflang tags on every page.',
        'Ensure bidirectional references--every page must link to all other language versions.',
        'Use x-default for a fallback or language-selector page.',
        'Use valid ISO 639-1 language codes and ISO 3166-1 region codes.',
        'Choose one implementation method (HTML, HTTP header, or sitemap) and use it consistently.',
        'Verify hreflang URLs return 200 status codes--don\'t link to redirected or error pages.',
        'Audit hreflang implementation regularly using Google Search Console\'s International Targeting report.',
        'Map hreflang tags to canonical URLs only--never point to non-canonical versions.'
      ]
    }
  },
  relatedTools: ['canonical-tag-generator', 'xml-sitemap-generator', 'schema-markup-generator'],
  seo: {
    metaTitle: 'Hreflang Tag Generator - Multilingual & International SEO Tags',
    metaDescription: 'Generate correct hreflang tags for multilingual and multi-regional websites. Support for HTML, HTTP headers, and XML sitemap formats.',
    keywords: ['hreflang generator', 'multilingual SEO', 'international SEO', 'hreflang tags', 'language targeting', 'regional SEO']
  }
};
