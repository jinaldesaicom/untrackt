export default {
  id: 'robots-txt-generator',
  title: 'Robots.txt Generator',
  description: 'Generate properly formatted robots.txt files to control how search engine crawlers access your website.',
  content: {
    whatIs: {
      heading: 'What is the Robots.txt Generator?',
      body: 'The Robots.txt Generator helps you create a properly formatted robots.txt file that instructs search engine crawlers which parts of your website to crawl and which to skip. It provides an intuitive interface for defining user-agent rules, allow/disallow directives, crawl-delay settings, and sitemap references without needing to write the syntax manually.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'A misconfigured robots.txt file can accidentally block search engines from crawling important pages or allow access to sensitive areas. This tool eliminates syntax errors, ensures proper formatting, and guides you through common configurations for different CMS platforms and web server setups so your crawl directives work exactly as intended.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Select the user-agent(s) you want to create rules for (e.g., Googlebot, Bingbot, or all bots).',
        'Add Allow and Disallow directives for specific paths or directories.',
        'Optionally set a crawl-delay value for specific bots.',
        'Add your XML sitemap URL to reference it in the file.',
        'Preview the generated robots.txt output and copy or download it.',
        'Upload the file to the root directory of your website.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Visual rule builder with add/remove for multiple user-agent blocks.',
        'Pre-built templates for common CMS platforms (WordPress, Shopify, etc.).',
        'Syntax validation to prevent formatting errors.',
        'Sitemap URL inclusion with multiple sitemap support.',
        'Crawl-delay configuration per user-agent.',
        'Real-time preview of the generated robots.txt output.',
        'One-click copy and download functionality.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Setting up robots.txt for a new website launch.',
        'Blocking admin, login, or staging directories from search engines.',
        'Preventing crawling of duplicate content, filters, or search result pages.',
        'Directing all bots to your XML sitemap.',
        'Creating bot-specific rules to manage crawl budgets on large sites.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        {
          title: 'Basic Allow All',
          description: 'Generate a simple robots.txt that allows all crawlers to access all pages, with a sitemap reference: "User-agent: * / Allow: / / Sitemap: https://example.com/sitemap.xml".'
        },
        {
          title: 'WordPress Configuration',
          description: 'Use the WordPress template to block /wp-admin/ while allowing /wp-admin/admin-ajax.php, and disallow crawling of /wp-includes/ and tag archives.'
        },
        {
          title: 'E-commerce Filtering',
          description: 'Block faceted navigation paths like /products?color= and /products?sort= to prevent search engines from indexing thousands of duplicate filter pages.'
        },
        {
          title: 'Staging Site Protection',
          description: 'Generate a robots.txt that disallows all crawlers from the entire staging subdomain to prevent search engines from indexing development content.'
        },
        {
          title: 'Bot-Specific Crawl Delay',
          description: 'Set a crawl-delay of 10 seconds for aggressive bots like AhrefsBot while allowing Googlebot to crawl at full speed with no delay.'
        }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'robots.txt', definition: 'A plain text file placed in a website\'s root directory that provides crawling instructions to web robots and search engine crawlers.' },
        { term: 'User-Agent', definition: 'A directive that specifies which crawler or bot the following rules apply to. An asterisk (*) targets all bots.' },
        { term: 'Disallow', definition: 'A directive that tells crawlers not to access a specific URL path or directory.' },
        { term: 'Allow', definition: 'A directive that permits crawling of a specific path, often used to override a broader Disallow rule.' },
        { term: 'Crawl-Delay', definition: 'A directive that requests crawlers wait a specified number of seconds between successive requests. Not respected by all bots.' },
        { term: 'Sitemap Directive', definition: 'A line in robots.txt that points crawlers to the XML sitemap URL for more efficient discovery of pages.' },
        { term: 'Crawl Budget', definition: 'The number of pages a search engine will crawl on your site within a given timeframe, influenced by site size and server performance.' },
        { term: 'Wildcard (*)', definition: 'A pattern-matching character used in robots.txt paths to match any sequence of characters in a URL.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'Where should I place the robots.txt file?', answer: 'It must be in the root directory of your domain, accessible at https://yourdomain.com/robots.txt. Subdomains need their own separate robots.txt files.' },
        { question: 'Does robots.txt block pages from appearing in search results?', answer: 'No. Robots.txt prevents crawling but not indexing. Pages blocked by robots.txt can still appear in search results if other pages link to them. Use a "noindex" meta tag to prevent indexing.' },
        { question: 'Can I use robots.txt to hide sensitive content?', answer: 'No. Robots.txt is publicly accessible and is not a security measure. Use authentication, firewalls, or server-level access controls to protect sensitive content.' },
        { question: 'Do all search engines respect robots.txt?', answer: 'Major search engines like Google, Bing, and Yahoo respect robots.txt. However, malicious bots and some lesser-known crawlers may ignore it entirely.' },
        { question: 'How long does it take for changes to take effect?', answer: 'Search engines typically re-fetch robots.txt every few hours to a few days. You can use Google Search Console to submit an updated robots.txt immediately.' },
        { question: 'Can I test my robots.txt before deploying?', answer: 'Yes. Use the Robots.txt Tester tool to validate your rules against specific URLs and user-agents before uploading.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Always include a Sitemap directive pointing to your XML sitemap.',
        'Never use robots.txt as a security measure--it is publicly readable.',
        'Test your robots.txt with a tester tool before deploying to production.',
        'Be specific with Disallow paths--overly broad rules can block important content.',
        'Use the Allow directive to create exceptions within Disallow rules.',
        'Keep the file simple and well-organized with comments for each section.',
        'Check for robots.txt errors in Google Search Console regularly.',
        'Remember that subdomains require separate robots.txt files.'
      ]
    }
  },
  relatedTools: ['robots-txt-tester', 'xml-sitemap-generator', 'canonical-tag-generator'],
  seo: {
    metaTitle: 'Robots.txt Generator - Create Crawl Directives for Search Engines',
    metaDescription: 'Generate properly formatted robots.txt files with user-agent rules, allow/disallow directives, and sitemap references. Control how search engines crawl your site.',
    keywords: ['robots.txt generator', 'crawl directives', 'search engine crawler', 'user-agent rules', 'disallow directive', 'sitemap reference']
  }
};
