export default {
  id: 'keyword-density-analyzer',
  title: 'Keyword Density Analyzer',
  description: 'Analyze keyword frequency and density in your content to optimize for search engines without over-stuffing.',
  content: {
    whatIs: {
      heading: 'What is the Keyword Density Analyzer?',
      body: 'The Keyword Density Analyzer examines your text content and calculates how frequently specific keywords and phrases appear relative to the total word count. It helps you strike the right balance between keyword optimization and natural, readable content by providing density percentages, frequency counts, and distribution insights for single words and multi-word phrases.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Keyword stuffing can trigger search engine penalties, while underusing keywords can leave ranking potential on the table. This tool gives you a data-driven view of your content\'s keyword profile so you can optimize strategically. It highlights over-optimized terms, suggests ideal density ranges, and helps ensure your content reads naturally while still signaling relevance to search engines.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Paste or type your content into the text area.',
        'Optionally enter target keywords you want to track specifically.',
        'Click "Analyze" to process the content.',
        'Review the density percentages, frequency counts, and word distribution chart.',
        'Adjust your content based on the recommendations and re-analyze.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Calculates density for single keywords (unigrams) and multi-word phrases (bigrams, trigrams).',
        'Highlights keywords that exceed recommended density thresholds.',
        'Displays total word count, unique word count, and average word length.',
        'Provides a visual frequency distribution chart for top keywords.',
        'Allows you to specify target keywords for focused tracking.',
        'Filters out common stop words for more meaningful analysis.',
        'Supports content in multiple languages.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Checking blog posts for keyword optimization before publishing.',
        'Auditing existing web pages to identify over-optimization.',
        'Comparing keyword density across competing articles.',
        'Ensuring product descriptions are optimized for target terms.',
        'Verifying that SEO copywriting guidelines are being followed.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        {
          title: 'Blog Post Optimization',
          description: 'Paste a 1,500-word blog post targeting "meal prep tips" and verify that the primary keyword appears at 1-2% density with natural placement throughout headings and body text.'
        },
        {
          title: 'Product Page Audit',
          description: 'Analyze an e-commerce product description to ensure the product name and key features appear frequently enough for relevance without reading as spammy.'
        },
        {
          title: 'Competitor Content Analysis',
          description: 'Copy a top-ranking competitor article into the tool to understand their keyword strategy and density patterns, then use those insights to improve your own content.'
        },
        {
          title: 'Landing Page Review',
          description: 'Check a PPC landing page to confirm that target keywords like "affordable web hosting" appear in the right proportion for both organic and paid search alignment.'
        },
        {
          title: 'Content Brief Validation',
          description: 'After a writer delivers a draft based on a content brief, use the analyzer to verify all required keywords meet the specified density targets before publishing.'
        }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Keyword Density', definition: 'The percentage of times a keyword appears in the text relative to the total word count.' },
        { term: 'Stop Words', definition: 'Common words like "the," "and," "is" that are typically filtered out of keyword analysis.' },
        { term: 'N-gram', definition: 'A contiguous sequence of n words from a text; unigrams are single words, bigrams are two-word phrases, and trigrams are three-word phrases.' },
        { term: 'Keyword Stuffing', definition: 'The practice of overloading content with keywords in an attempt to manipulate rankings, often resulting in penalties.' },
        { term: 'TF-IDF', definition: 'Term Frequency-Inverse Document Frequency, a statistical measure of how important a word is within a document relative to a collection of documents.' },
        { term: 'LSI Keywords', definition: 'Latent Semantic Indexing keywords are semantically related terms that help search engines understand content context.' },
        { term: 'Frequency Count', definition: 'The raw number of times a specific keyword or phrase appears in the content.' },
        { term: 'Content Relevance', definition: 'How closely the keywords and topics in your content match the search intent of a query.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'What is the ideal keyword density?', answer: 'Most SEO experts recommend a keyword density between 1% and 2% for primary keywords. However, there is no universal magic number--focus on writing naturally and ensuring keywords fit the context.' },
        { question: 'Does the tool count keywords in headings and alt text?', answer: 'The tool analyzes all text you paste into the input area. If you include heading text and alt text in your paste, they will be counted in the analysis.' },
        { question: 'Can I analyze multiple keywords at once?', answer: 'Yes. Enter your target keywords separated by commas, and the tool will track the density and frequency of each one individually.' },
        { question: 'Does high keyword density guarantee better rankings?', answer: 'No. Modern search engines use sophisticated algorithms that prioritize content quality, relevance, and user experience over raw keyword density. Over-optimization can actually hurt rankings.' },
        { question: 'Are stop words included in the word count?', answer: 'Yes, stop words are included in the total word count but are filtered from the keyword frequency list so you see only meaningful terms.' },
        { question: 'Can I use this for languages other than English?', answer: 'The tool counts word frequency for any language, though stop word filtering and phrase detection are optimized primarily for English.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Aim for a primary keyword density of 1-2% and use synonyms and related terms throughout.',
        'Always prioritize readability and user experience over hitting a specific density number.',
        'Use the tool after writing, not before--write naturally first, then optimize.',
        'Pay attention to bigrams and trigrams, as multi-word phrases often carry more ranking power.',
        'Check density in headings separately, since keywords in H1-H3 tags carry extra SEO weight.',
        'Compare your density against top-ranking pages for the same keyword to find benchmarks.',
        'Re-analyze after every round of edits to ensure changes haven\'t introduced over-optimization.',
        'Use LSI keywords to support your primary keyword without repeating the same term excessively.'
      ]
    }
  },
  relatedTools: ['title-tag-checker', 'meta-description-analyzer', 'reading-level-optimizer', 'seo-content-brief'],
  seo: {
    metaTitle: 'Keyword Density Analyzer - Check Keyword Frequency & Optimize Content',
    metaDescription: 'Analyze keyword density and frequency in your content. Avoid keyword stuffing, find optimization opportunities, and improve your SEO with data-driven insights.',
    keywords: ['keyword density', 'keyword frequency', 'content analysis', 'SEO optimization', 'keyword stuffing', 'keyword checker', 'content optimization']
  }
};
