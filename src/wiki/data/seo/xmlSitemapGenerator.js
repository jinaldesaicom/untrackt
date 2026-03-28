export default {
  id: 'xml-sitemap-generator',
  title: 'XML Sitemap Generator',
  description: 'Generate standards-compliant XML sitemaps to help search engines discover and index your website pages efficiently.',
  content: {
    whatIs: {
      heading: 'What is the XML Sitemap Generator?',
      body: 'The XML Sitemap Generator creates properly formatted XML sitemaps that list the URLs on your website along with optional metadata like last modification dates, change frequency, and priority. These sitemaps help search engine crawlers discover and index your pages more efficiently, especially for large sites or pages that are not easily found through internal linking.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Without a sitemap, search engines rely entirely on crawling links to discover your pages, which can miss orphaned content or new pages. An XML sitemap acts as a roadmap for crawlers, ensuring every important page is discoverable. This tool generates valid sitemaps instantly, saving you from manual XML editing and reducing the risk of formatting errors that would cause search engines to reject the file.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Enter your website URLs manually or paste a list of URLs.',
        'Set optional metadata for each URL: last modified date, change frequency, and priority.',
        'Choose the sitemap format (standard XML or sitemap index for large sites).',
        'Click "Generate" to create the sitemap.',
        'Preview the XML output, then copy or download the file.',
        'Upload the sitemap to your server root and reference it in your robots.txt.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Generates valid XML sitemaps conforming to the Sitemaps.org protocol.',
        'Supports optional lastmod, changefreq, and priority attributes.',
        'Handles sitemap index files for sites with more than 50,000 URLs.',
        'Validates URLs for proper formatting before inclusion.',
        'Bulk URL input via paste or comma/newline separated lists.',
        'Download as .xml file ready for server upload.',
        'Generates the corresponding robots.txt sitemap directive.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Creating initial sitemaps for new website launches.',
        'Generating sitemaps for static sites without CMS sitemap plugins.',
        'Building sitemap index files for large e-commerce catalogs.',
        'Producing sitemaps for specific site sections like a blog or product category.',
        'Creating temporary sitemaps during site migrations to guide crawlers to new URL structures.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        {
          title: 'Small Business Website',
          description: 'Enter 20-30 URLs for a local business site including the homepage, service pages, about page, and contact page. Set the homepage priority to 1.0 and service pages to 0.8.'
        },
        {
          title: 'Blog Sitemap',
          description: 'Paste a list of 200 blog post URLs with lastmod dates to generate a sitemap that helps search engines identify recently updated content.'
        },
        {
          title: 'E-commerce Sitemap Index',
          description: 'Generate a sitemap index file that references separate sitemaps for products, categories, and informational pages, each containing up to 50,000 URLs.'
        },
        {
          title: 'Site Migration',
          description: 'Create a sitemap of all new URLs after a domain migration to accelerate search engine discovery of the updated site structure.'
        },
        {
          title: 'Multilingual Sitemap',
          description: 'Generate sitemaps for each language version of a website, then combine them into a sitemap index for a coordinated international SEO strategy.'
        }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'XML Sitemap', definition: 'An XML file that lists URLs on a website along with metadata, helping search engines crawl the site more efficiently.' },
        { term: 'Sitemap Index', definition: 'An XML file that references multiple sitemap files, used when a site exceeds the 50,000 URL limit per individual sitemap.' },
        { term: 'lastmod', definition: 'An optional tag indicating the date a URL was last modified, helping search engines prioritize recrawling recently updated pages.' },
        { term: 'changefreq', definition: 'An optional hint to search engines about how frequently a page\'s content is expected to change (e.g., daily, weekly, monthly).' },
        { term: 'Priority', definition: 'A value from 0.0 to 1.0 that suggests the relative importance of a URL compared to other URLs on the same site.' },
        { term: 'Sitemaps Protocol', definition: 'The standard specification (sitemaps.org) that defines the format and rules for XML sitemaps accepted by major search engines.' },
        { term: 'Crawl Budget', definition: 'The number of pages a search engine allocates to crawl on your site within a given timeframe. Sitemaps help optimize how this budget is spent.' },
        { term: 'Orphan Page', definition: 'A page with no internal links pointing to it, making it discoverable only through a sitemap or direct URL entry.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'How many URLs can a single sitemap contain?', answer: 'A single XML sitemap can contain up to 50,000 URLs and must not exceed 50 MB uncompressed. For larger sites, use a sitemap index file.' },
        { question: 'Does having a sitemap guarantee indexing?', answer: 'No. A sitemap helps discovery but does not guarantee indexing. Search engines still evaluate page quality, crawlability, and other factors before indexing.' },
        { question: 'Where should I place my sitemap?', answer: 'Place it in your website\'s root directory (e.g., https://example.com/sitemap.xml) and reference it in your robots.txt file.' },
        { question: 'Should I include noindex pages in my sitemap?', answer: 'No. Only include pages you want indexed. Including noindex pages sends conflicting signals to search engines.' },
        { question: 'Does the priority value affect rankings?', answer: 'No. The priority value only indicates relative importance within your own site. Google has stated it largely ignores this attribute.' },
        { question: 'How often should I update my sitemap?', answer: 'Update your sitemap whenever you add, remove, or significantly modify pages. For dynamic sites, automate sitemap generation with each content change.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Only include canonical, indexable URLs in your sitemap.',
        'Reference your sitemap in robots.txt with the Sitemap directive.',
        'Use accurate lastmod dates--don\'t set them to the current date unless the page actually changed.',
        'Submit your sitemap through Google Search Console and Bing Webmaster Tools.',
        'Use a sitemap index file for sites with more than 50,000 URLs.',
        'Keep sitemaps under 50 MB uncompressed; use gzip compression for large files.',
        'Remove URLs that return 404, 301, or noindex from your sitemap.',
        'Validate your sitemap XML against the Sitemaps.org schema before submitting.'
      ]
    }
  },
  relatedTools: ['robots-txt-generator', 'canonical-tag-generator', 'hreflang-generator'],
  seo: {
    metaTitle: 'XML Sitemap Generator - Create Valid Sitemaps for Search Engines',
    metaDescription: 'Generate standards-compliant XML sitemaps with lastmod, priority, and changefreq. Help search engines discover and index all your website pages.',
    keywords: ['XML sitemap generator', 'sitemap creator', 'SEO sitemap', 'sitemap index', 'search engine indexing', 'website crawling']
  }
};
