export default {
  id: 'robots-txt-tester',
  title: 'Robots.txt Tester',
  description: 'Test and validate your robots.txt rules to verify which URLs are allowed or blocked for specific crawlers.',
  content: {
    whatIs: {
      heading: 'What is the Robots.txt Tester?',
      body: 'The Robots.txt Tester lets you paste your robots.txt content and test it against specific URLs and user-agents to determine whether a crawler would be allowed or blocked from accessing each URL. It parses the directives, evaluates rule precedence, and highlights which specific rule matched, making it easy to debug complex configurations.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Robots.txt rule precedence can be tricky--a more specific Allow can override a broader Disallow, and the order of rules matters differently across search engines. This tool takes the guesswork out of debugging by showing you exactly which rule applies to each test URL, preventing accidental blocking of important pages or unintended crawling of private areas.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Paste your robots.txt content into the editor area.',
        'Enter one or more URLs you want to test.',
        'Select the user-agent to test against (e.g., Googlebot, Bingbot, or *).',
        'Click "Test" to evaluate each URL against the rules.',
        'Review the results showing allowed/blocked status and the matching rule for each URL.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Parses and validates robots.txt syntax with error highlighting.',
        'Tests multiple URLs at once against selected user-agents.',
        'Shows the specific rule that matched each tested URL.',
        'Supports wildcard (*) and end-of-URL ($) pattern matching.',
        'Highlights syntax errors and formatting issues in the robots.txt.',
        'Provides rule precedence explanation based on Google\'s specification.',
        'Side-by-side view of rules and test results.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Verifying that critical pages like the homepage and product pages are not accidentally blocked.',
        'Confirming that admin areas and staging content are properly disallowed.',
        'Debugging why specific pages are not being indexed by search engines.',
        'Validating robots.txt changes before deploying to production.',
        'Testing bot-specific rules to ensure crawl budget is allocated correctly.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        {
          title: 'Verify Homepage Access',
          description: 'Paste your robots.txt and test "/" against Googlebot to confirm the homepage is crawlable. The result shows "Allowed" with the matching rule highlighted.'
        },
        {
          title: 'Debug Blocked Product Page',
          description: 'If a product page isn\'t indexed, test its URL to discover it matches a broad "Disallow: /products?" rule intended only for filter parameters.'
        },
        {
          title: 'Wildcard Rule Testing',
          description: 'Test "Disallow: /*.pdf$" against URLs like "/docs/guide.pdf" and "/docs/guide.pdf?v=2" to verify the end-of-string anchor works as expected.'
        },
        {
          title: 'Multi-Bot Comparison',
          description: 'Test the same URL against Googlebot, Bingbot, and the wildcard (*) user-agent to see how different bots are treated by your rules.'
        },
        {
          title: 'Allow Override Verification',
          description: 'Confirm that "Allow: /wp-admin/admin-ajax.php" correctly overrides "Disallow: /wp-admin/" by testing both the admin directory and the AJAX endpoint.'
        }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'User-Agent', definition: 'The identifier string a crawler sends to identify itself. Robots.txt rules are matched to user-agents to apply specific directives per bot.' },
        { term: 'Allow', definition: 'A directive permitting a crawler to access a specific URL path, used to create exceptions within broader Disallow rules.' },
        { term: 'Disallow', definition: 'A directive instructing a crawler to not access a specific URL path or directory.' },
        { term: 'Rule Precedence', definition: 'The logic that determines which rule applies when multiple rules match a URL. Google uses the most specific (longest path) match.' },
        { term: 'Wildcard Pattern', definition: 'Using the asterisk (*) in a robots.txt path to match any sequence of characters in a URL.' },
        { term: 'End-of-URL Anchor ($)', definition: 'A special character in robots.txt that matches the end of a URL, preventing the rule from matching URLs with additional query parameters or paths.' },
        { term: 'Syntax Error', definition: 'A formatting mistake in the robots.txt file that may cause crawlers to misinterpret or ignore the intended rules.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'How does Google determine which rule wins?', answer: 'Google uses the most specific rule (longest matching path). If an Allow and Disallow rule are equally specific, the Allow rule takes precedence.' },
        { question: 'Does testing here guarantee search engines will behave the same way?', answer: 'This tool follows Google\'s published specification for robots.txt parsing. Other search engines may interpret rules slightly differently, especially around wildcards and crawl-delay.' },
        { question: 'Can I test against custom user-agents?', answer: 'Yes. You can type any user-agent string to test against, including custom crawler names used by SEO tools, AI crawlers, or internal bots.' },
        { question: 'What happens if my robots.txt has syntax errors?', answer: 'The tool highlights syntax errors and explains the issue. Crawlers typically ignore malformed lines, so syntax errors may cause rules to not work as intended.' },
        { question: 'Why is my page blocked even though I have an Allow rule?', answer: 'Check rule specificity. A longer Disallow path can override a shorter Allow path. The tool shows exactly which rule matched so you can adjust the paths.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Test every URL you care about before deploying robots.txt changes.',
        'Always test against multiple user-agents if you have bot-specific rules.',
        'Use the most specific paths possible to avoid unintended rule matches.',
        'Check for syntax errors--even a missing slash can change rule behavior.',
        'Test with query parameters to ensure filter URLs are handled correctly.',
        'After deploying, validate in Google Search Console\'s robots.txt tester for official confirmation.',
        'Document your robots.txt rules with comments so future edits are informed.'
      ]
    }
  },
  relatedTools: ['robots-txt-generator', 'xml-sitemap-generator', 'canonical-tag-generator'],
  seo: {
    metaTitle: 'Robots.txt Tester - Validate Crawl Rules & URL Access',
    metaDescription: 'Test your robots.txt rules against specific URLs and user-agents. Verify which pages are allowed or blocked and debug crawl directive issues.',
    keywords: ['robots.txt tester', 'robots.txt validator', 'crawl rules', 'user-agent testing', 'allow disallow', 'URL blocking']
  }
};
