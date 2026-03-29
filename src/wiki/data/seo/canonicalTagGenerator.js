export default {
  id: 'canonical-tag-generator',
  title: 'Canonical Tag Generator',
  description: 'Generate rel="canonical" tags to resolve duplicate content issues and consolidate link equity.',
  content: {
    whatIs: {
      heading: 'What is the Canonical Tag Generator?',
      body: 'The Canonical Tag Generator creates rel="canonical" link tags that tell search engines which version of a page is the "master" or preferred version when multiple URLs serve identical or very similar content. It helps you specify the canonical URL for each page, ensuring search engines consolidate ranking signals to the right URL instead of splitting them across duplicates.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Duplicate content is one of the most common SEO issues--it occurs from URL parameters, www vs non-www, HTTP vs HTTPS, print versions, and CMS-generated variants. Without canonical tags, search engines may pick the wrong version to index or dilute ranking signals across duplicates. This tool generates correct canonical tags instantly and helps you plan a canonical strategy for your site.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Enter the preferred (canonical) URL for the page.',
        'Optionally enter the duplicate URL variants that should point to the canonical.',
        'Review the generated <link rel="canonical"> tag.',
        'Copy the tag and add it to the <head> section of each duplicate page.',
        'Verify the implementation by checking the page source.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Generates valid <link rel="canonical"> HTML tags.',
        'URL validation to ensure canonical URLs are properly formatted.',
        'Duplicate URL mapping to plan canonical relationships across multiple pages.',
        'Protocol and www normalization detection.',
        'Self-referencing canonical tag generation.',
        'HTTP header format output for non-HTML resources (PDFs, etc.).',
        'Bulk canonical tag generation for multiple page sets.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Resolving duplicate content from URL parameters (e.g., tracking parameters, sort filters).',
        'Canonicalizing HTTP to HTTPS or www to non-www URL variants.',
        'Consolidating paginated content series to a single "view-all" page.',
        'Setting canonical URLs for syndicated content published on multiple domains.',
        'Adding self-referencing canonical tags to all pages as a defensive best practice.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        {
          title: 'URL Parameter Cleanup',
          description: 'Set the canonical for "example.com/page?utm_source=newsletter" to "example.com/page" to prevent tracking parameters from creating duplicate indexed pages.'
        },
        {
          title: 'HTTPS Canonicalization',
          description: 'Generate a canonical tag pointing "http://example.com/page" to "https://example.com/page" to consolidate link equity on the secure version.'
        },
        {
          title: 'Product Variant Pages',
          description: 'Canonicalize color variant pages like "/shoes?color=red" and "/shoes?color=blue" to the main "/shoes" product page when content is substantially the same.'
        },
        {
          title: 'Syndicated Content',
          description: 'Add canonical tags on partner sites that republish your articles, pointing back to the original URL on your domain to protect your SEO equity.'
        },
        {
          title: 'Self-Referencing Canonicals',
          description: 'Generate self-referencing canonical tags for every page on your site as a defensive measure against unexpected URL duplicates.'
        },
        {
          title: 'Print Page Versions',
          description: 'Canonicalize "/article/print" back to "/article" to prevent print-friendly page versions from competing with the main article in search results.'
        }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Canonical URL', definition: 'The preferred version of a web page URL that search engines should index and assign ranking signals to.' },
        { term: 'rel="canonical"', definition: 'An HTML link attribute that specifies the canonical URL for a page, placed in the <head> section of the HTML document.' },
        { term: 'Duplicate Content', definition: 'Substantially similar or identical content accessible at multiple different URLs on the same or different domains.' },
        { term: 'Link Equity Consolidation', definition: 'The process of combining ranking signals from multiple duplicate URLs into a single canonical URL to maximize SEO value.' },
        { term: 'Self-Referencing Canonical', definition: 'A canonical tag on a page that points to itself, serving as a defensive measure against unexpected URL variations.' },
        { term: 'URL Parameters', definition: 'Query strings appended to URLs (e.g., ?sort=price&page=2) that can create duplicate content when the base page content remains the same.' },
        { term: 'Canonicalization', definition: 'The process of selecting and signaling the preferred URL when multiple URLs lead to the same or similar content.' },
        { term: 'Cross-Domain Canonical', definition: 'A canonical tag that points to a URL on a different domain, used for syndicated or republished content.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'Is canonical a directive or a hint?', answer: 'The canonical tag is a hint, not a directive. Search engines can choose to ignore it if they determine the canonical suggestion doesn\'t make sense, such as pointing to a non-existent page.' },
        { question: 'Should every page have a canonical tag?', answer: 'Yes, as a best practice. Self-referencing canonical tags are recommended on every page to prevent issues if duplicate URLs are accidentally created.' },
        { question: 'Can I canonical across different domains?', answer: 'Yes. Cross-domain canonical tags are supported and are useful for syndicated content. The target domain should host the original content.' },
        { question: 'What happens if I set the wrong canonical?', answer: 'If you canonical page A to page B, search engines may de-index page A and attribute its signals to page B. Incorrect canonicals can effectively remove pages from search results.' },
        { question: 'Should I use canonical or 301 redirect?', answer: 'Use a 301 redirect when the duplicate URL should permanently redirect users and search engines. Use canonical when both URLs need to remain accessible but only one should be indexed.' },
        { question: 'Can I combine canonical tags with noindex?', answer: 'This sends conflicting signals. If you use canonical, the pointed-to page should be indexable. If you want a page de-indexed, use noindex instead of canonical.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Add self-referencing canonical tags to every indexable page.',
        'Use absolute URLs--never relative URLs--in canonical tags.',
        'Ensure the canonical URL returns a 200 status code and is indexable.',
        'Don\'t mix canonical tags with noindex on the same page.',
        'Canonical URLs should match the URL in your XML sitemap.',
        'Use 301 redirects for permanent duplicates; canonical tags for pages that must remain accessible.',
        'Audit canonical tags regularly--migrations and CMS updates can break them.',
        'Keep canonical URLs consistent with HTTPS and www/non-www preferences.'
      ]
    }
  },
  relatedTools: ['robots-txt-generator', 'xml-sitemap-generator', 'hreflang-generator'],
  seo: {
    metaTitle: 'Canonical Tag Generator - Fix Duplicate Content & Consolidate SEO',
    metaDescription: 'Generate rel="canonical" tags to resolve duplicate content issues. Consolidate link equity and tell search engines which page version to index.',
    keywords: ['canonical tag', 'rel canonical', 'duplicate content', 'canonical URL', 'link equity', 'SEO canonicalization']
  }
};
