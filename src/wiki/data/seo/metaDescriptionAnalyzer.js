export default {
  id: 'meta-description-analyzer',
  title: 'Meta Description Analyzer',
  description: 'Craft and evaluate meta descriptions for optimal SERP display and click-through rates.',
  content: {
    whatIs: {
      heading: 'What is the Meta Description Analyzer?',
      body: 'The Meta Description Analyzer evaluates your meta descriptions for length, keyword inclusion, readability, and call-to-action effectiveness. It provides a live SERP preview and social media snippet preview so you can see exactly how your description will appear across platforms before publishing.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'While meta descriptions are not a direct ranking factor, they significantly impact click-through rates from search results. A well-crafted meta description acts as advertising copy for your page. This tool ensures your descriptions are the right length, include relevant keywords, and compel users to click through to your content.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Enter your meta description in the text area.',
        'Optionally enter the page title and URL for a complete SERP preview.',
        'Review the character count, keyword highlighting, and quality score.',
        'Check the social media preview to see how the description appears when shared.',
        'Refine your description based on the tool\'s suggestions and re-analyze.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Character count with warnings at 120 and 160 character thresholds.',
        'Real-time Google SERP preview for desktop and mobile.',
        'Social media snippet preview for Facebook and Twitter/X.',
        'Keyword presence detection and highlighting.',
        'Call-to-action phrase detection.',
        'Readability and sentiment analysis.',
        'Duplicate description detection across multiple inputs.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Writing meta descriptions for new pages and blog posts.',
        'Auditing and rewriting underperforming meta descriptions during site-wide SEO reviews.',
        'Previewing how pages will appear in search results before publishing.',
        'Ensuring meta descriptions are unique across all pages of a website.',
        'Optimizing descriptions for higher click-through rates on high-impression pages.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        {
          title: 'Blog Post Description',
          description: 'Analyze "Learn 15 proven meal prep tips that save time and money. Our step-by-step guide makes weekly meal planning easy for beginners. Start today!" to verify it\'s within 155 characters and includes a call to action.'
        },
        {
          title: 'Product Page Description',
          description: 'Check "Shop noise-canceling wireless headphones with 40-hour battery life. Free shipping on orders over $50. Read 2,000+ five-star reviews." for keyword relevance and compelling selling points.'
        },
        {
          title: 'Homepage Description',
          description: 'Evaluate "Untrackt offers 50+ free online tools for SEO, finance, and productivity. No sign-up required. Start optimizing your workflow today." for brand clarity and value proposition.'
        },
        {
          title: 'Service Page Description',
          description: 'Test "Professional web design services in Austin, TX. Custom responsive websites starting at $999. Free consultation--call us today!" for local SEO signals and CTA strength.'
        },
        {
          title: 'Category Page Description',
          description: 'Preview "Browse our collection of 200+ organic skincare products. Cruelty-free, vegan, and dermatologist-tested. Shop now with free returns." to ensure product category keywords and trust signals are included.'
        }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Meta Description', definition: 'An HTML meta tag that provides a brief summary of a web page, often displayed in search engine results below the title.' },
        { term: 'SERP Snippet', definition: 'The block of text shown for each result on a search engine results page, typically consisting of a title, URL, and description.' },
        { term: 'Click-Through Rate (CTR)', definition: 'The ratio of users who click on a specific link to the total number of users who see it in search results.' },
        { term: 'Call to Action (CTA)', definition: 'A phrase that encourages the reader to take a specific action, such as "Learn more," "Shop now," or "Get started."' },
        { term: 'Rich Snippet', definition: 'An enhanced search result that shows additional information like ratings, prices, or dates alongside the standard description.' },
        { term: 'Truncation', definition: 'When a meta description is cut off in search results, typically after 155-160 characters on desktop.' },
        { term: 'Sentiment', definition: 'The emotional tone of the description text--positive, negative, or neutral--which can influence user engagement.' },
        { term: 'Unique Description', definition: 'A meta description that is distinct from all other page descriptions on the same website, avoiding duplicate content issues.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'What is the ideal meta description length?', answer: 'Aim for 120-160 characters. Google typically displays up to 155-160 characters on desktop and about 120 characters on mobile before truncating.' },
        { question: 'Do meta descriptions affect rankings?', answer: 'Not directly. Google has stated that meta descriptions are not a ranking signal. However, a compelling description improves CTR, which can indirectly influence rankings.' },
        { question: 'Does Google always use my meta description?', answer: 'No. Google may generate its own snippet from page content if it determines your meta description doesn\'t match the search query well. Well-written, relevant descriptions are used more often.' },
        { question: 'Should I include keywords in my meta description?', answer: 'Yes. Keywords matching the search query are bolded in search results, making your listing more visually prominent and relevant to searchers.' },
        { question: 'Can I use HTML in meta descriptions?', answer: 'No. HTML tags are stripped from meta descriptions. Write in plain text only.' },
        { question: 'Should every page have a unique meta description?', answer: 'Yes. Duplicate meta descriptions across pages can confuse search engines and reduce the effectiveness of your SERP listings.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Keep descriptions between 120-160 characters to avoid truncation.',
        'Include the primary keyword naturally within the first sentence.',
        'Add a clear call to action to encourage clicks.',
        'Write unique descriptions for every page--never duplicate.',
        'Use active voice and action-oriented language.',
        'Include a value proposition or unique selling point.',
        'Avoid quotation marks, as Google may truncate at quote characters.',
        'Preview on both mobile and desktop since character limits differ.'
      ]
    }
  },
  relatedTools: ['title-tag-checker', 'open-graph-previewer', 'keyword-density-analyzer', 'seo-content-brief'],
  seo: {
    metaTitle: 'Meta Description Analyzer - Optimize SERP Snippets & CTR',
    metaDescription: 'Analyze and preview your meta descriptions for search engines and social media. Check length, keywords, and CTR effectiveness with live SERP previews.',
    keywords: ['meta description', 'SERP snippet', 'meta tag analyzer', 'SEO description', 'click-through rate', 'search preview']
  }
};
