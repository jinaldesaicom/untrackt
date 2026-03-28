export default {
  id: 'internal-link-analyzer',
  title: 'Internal Link Analyzer',
  description: 'Analyze internal linking structures, anchor text distribution, and link equity flow across your website pages.',
  content: {
    whatIs: {
      heading: 'What is the Internal Link Analyzer?',
      body: 'The Internal Link Analyzer examines the internal links on a web page or set of pages to evaluate anchor text usage, link distribution, and navigation structure. It identifies orphan pages with no internal links, over-linked pages, and opportunities to improve link equity flow by adding strategic internal links between related content.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Internal links are a powerful SEO lever that directly influence how search engines discover, crawl, and rank your pages. A well-structured internal linking strategy distributes link equity effectively, helps search engines understand content relationships, and guides users through your site. This tool reveals gaps and opportunities in your linking strategy that are hard to spot manually.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Enter the URL or paste the HTML content of the page you want to analyze.',
        'The tool will extract and list all internal links found on the page.',
        'Review the anchor text analysis for variety, keyword usage, and descriptiveness.',
        'Check for orphan pages, broken links, and excessive link counts.',
        'Use the recommendations to add, remove, or update internal links.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Extracts and categorizes all internal links from page content.',
        'Anchor text analysis with keyword and descriptiveness scoring.',
        'Identifies orphan pages that lack internal links pointing to them.',
        'Detects broken internal links returning 404 or other error codes.',
        'Link count per page with recommendations for optimal ranges.',
        'Nofollow vs. dofollow link distribution analysis.',
        'Suggestions for strategic internal link opportunities based on content relevance.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Auditing blog posts to ensure they link to related content and pillar pages.',
        'Identifying orphan product pages in an e-commerce catalog that need internal links.',
        'Evaluating anchor text diversity to avoid over-optimization penalties.',
        'Finding broken internal links after a site redesign or URL structure change.',
        'Building topic cluster strategies by mapping internal link relationships.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        {
          title: 'Blog Post Audit',
          description: 'Analyze a pillar post on "SEO Basics" to verify it links to all 10 supporting cluster posts and that those posts link back, creating a strong topic cluster.'
        },
        {
          title: 'Anchor Text Diversity',
          description: 'Review a page\'s outgoing links and discover that 80% use "click here" as anchor text, then improve them with descriptive, keyword-relevant anchors.'
        },
        {
          title: 'Orphan Page Discovery',
          description: 'Input your site\'s full URL list and identify 15 product pages that have zero internal links pointing to them, then plan strategic link placements.'
        },
        {
          title: 'Post-Migration Link Check',
          description: 'After migrating to a new URL structure, analyze key pages to catch internal links still pointing to old URLs that now return 404 errors.'
        },
        {
          title: 'Link Equity Distribution',
          description: 'Analyze links from your homepage to understand how link equity flows to category pages and whether important pages receive sufficient internal link support.'
        }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Internal Link', definition: 'A hyperlink that points from one page to another page on the same website domain.' },
        { term: 'Anchor Text', definition: 'The clickable text displayed in a hyperlink, providing context to both users and search engines about the linked page\'s content.' },
        { term: 'Link Equity', definition: 'The SEO value or authority passed from one page to another through hyperlinks, also informally called "link juice."' },
        { term: 'Orphan Page', definition: 'A page that has no internal links pointing to it from other pages on the same site, making it difficult for search engines to discover.' },
        { term: 'Topic Cluster', definition: 'An SEO content strategy where a pillar page covers a broad topic and links to related cluster pages that address specific subtopics.' },
        { term: 'Nofollow', definition: 'A link attribute (rel="nofollow") that tells search engines not to pass link equity through the link.' },
        { term: 'Dofollow', definition: 'A standard link without a nofollow attribute, allowing search engines to follow the link and pass equity to the target page.' },
        { term: 'Crawl Depth', definition: 'The number of clicks required to reach a page from the homepage. Lower crawl depth generally means higher crawl priority.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'How many internal links should a page have?', answer: 'There\'s no strict limit, but aim for a reasonable number based on content length--typically 3-10 contextual links per 1,000 words plus navigation links. Quality and relevance matter more than quantity.' },
        { question: 'Does anchor text matter for internal links?', answer: 'Yes. Use descriptive, keyword-relevant anchor text for internal links. This helps search engines understand what the linked page is about. Avoid generic text like "click here."' },
        { question: 'What are orphan pages and why are they bad?', answer: 'Orphan pages have no internal links pointing to them. Search engines may not discover them, and they receive no link equity from the rest of your site. Always link to every important page.' },
        { question: 'Should I use nofollow on internal links?', answer: 'Generally, no. Nofollow on internal links prevents link equity from flowing to the target page. Use it only in specific cases like user-generated content or login pages.' },
        { question: 'How does internal linking differ from external linking?', answer: 'Internal links connect pages within the same domain, distributing your own site\'s authority. External links point to other domains and pass some of your authority to those sites.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Use descriptive, keyword-relevant anchor text instead of generic phrases.',
        'Link from high-authority pages to important pages that need a ranking boost.',
        'Keep important pages within 3 clicks of the homepage.',
        'Regularly audit for and fix broken internal links.',
        'Build topic clusters with a pillar page linking to and from all cluster pages.',
        'Avoid excessive links on a single page--prioritize relevance over volume.',
        'Don\'t use nofollow on internal links unless absolutely necessary.',
        'Add internal links to new content and update old content with links to new pages.'
      ]
    }
  },
  relatedTools: ['keyword-density-analyzer', 'breadcrumb-schema-generator', 'canonical-tag-generator'],
  seo: {
    metaTitle: 'Internal Link Analyzer - Audit Links, Anchor Text & Link Equity',
    metaDescription: 'Analyze internal linking structures, anchor text distribution, and orphan pages. Optimize link equity flow and improve your site\'s SEO architecture.',
    keywords: ['internal link analyzer', 'anchor text', 'link equity', 'orphan pages', 'internal linking', 'SEO audit', 'link analysis']
  }
};
