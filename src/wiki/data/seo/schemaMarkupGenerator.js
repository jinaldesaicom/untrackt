export default {
  id: 'schema-markup-generator',
  title: 'Schema Markup Generator',
  description: 'Generate structured data markup in JSON-LD format to enable rich results in search engines.',
  content: {
    whatIs: {
      heading: 'What is the Schema Markup Generator?',
      body: 'The Schema Markup Generator creates Schema.org structured data in JSON-LD format that you can add to your web pages. This machine-readable data helps search engines understand your content and can enable rich results like star ratings, FAQ dropdowns, recipe cards, event listings, and more in search results.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Rich results powered by structured data can dramatically increase your visibility and click-through rates in search results. Pages with rich snippets stand out visually from standard listings. This tool makes generating valid, Google-compliant JSON-LD simple--no coding required--and validates your markup against Schema.org specifications before you deploy it.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Select the schema type you want to generate (e.g., Article, Product, FAQ, LocalBusiness).',
        'Fill in the required and optional fields for the selected schema type.',
        'Preview the generated JSON-LD markup in the output panel.',
        'Validate the markup against Google\'s Rich Results requirements.',
        'Copy the JSON-LD code and paste it into your page\'s <head> or <body> section.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Supports 20+ common schema types including Article, Product, FAQ, HowTo, LocalBusiness, Event, and more.',
        'Generates clean, minified or pretty-printed JSON-LD output.',
        'Validates markup against Google\'s Rich Results eligibility requirements.',
        'Nested schema support for complex structures like Product with Review and AggregateRating.',
        'Field-by-field guidance explaining what each property means.',
        'One-click copy of generated markup.',
        'Preview of how rich results may appear in Google search.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Adding FAQ schema to informational pages for dropdown rich results.',
        'Generating Product schema with reviews and pricing for e-commerce pages.',
        'Creating LocalBusiness markup for Google Maps and local search visibility.',
        'Adding Article schema to blog posts for enhanced news and article listings.',
        'Building HowTo schema for tutorial pages to display step-by-step rich results.',
        'Generating Event schema for concerts, webinars, and meetup pages.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        {
          title: 'FAQ Page Schema',
          description: 'Enter 5 questions and answers about your product, and the tool generates FAQPage JSON-LD that enables expandable FAQ dropdowns directly in Google search results.'
        },
        {
          title: 'Product with Reviews',
          description: 'Fill in product name, price, availability, and aggregate rating to generate Product schema that displays star ratings and price in search listings.'
        },
        {
          title: 'Local Business Listing',
          description: 'Enter your business name, address, phone, hours, and geo coordinates to generate LocalBusiness schema for improved visibility in local search and Google Maps.'
        },
        {
          title: 'Recipe Markup',
          description: 'Input recipe name, ingredients, steps, cooking time, and nutrition info to create Recipe schema that shows a rich card with image, rating, and cooking time in search results.'
        },
        {
          title: 'Article Schema',
          description: 'Generate Article or BlogPosting schema with author, date published, headline, and featured image for enhanced appearance in Google News and search results.'
        },
        {
          title: 'Event Listing',
          description: 'Create Event schema with event name, date, location, ticket URL, and performer to display event details directly in Google search results.'
        }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Schema.org', definition: 'A collaborative vocabulary project by Google, Bing, Yahoo, and Yandex that provides standardized types and properties for structured data markup.' },
        { term: 'JSON-LD', definition: 'JavaScript Object Notation for Linked Data--the recommended format for embedding structured data in web pages using a <script> tag.' },
        { term: 'Rich Results', definition: 'Enhanced search result listings that include additional visual elements like star ratings, images, prices, or FAQ dropdowns, powered by structured data.' },
        { term: 'Structured Data', definition: 'Standardized machine-readable data added to web pages that helps search engines understand and categorize page content.' },
        { term: '@type', definition: 'A JSON-LD property that specifies the Schema.org type of the entity being described, such as "Product," "Article," or "FAQPage."' },
        { term: '@context', definition: 'A JSON-LD property that defines the vocabulary being used, typically set to "https://schema.org" for web structured data.' },
        { term: 'Nested Schema', definition: 'When one schema type is embedded within another, such as a Review nested inside a Product schema.' },
        { term: 'Rich Results Test', definition: 'Google\'s official tool for validating structured data markup and previewing eligible rich result types.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'Does schema markup directly improve rankings?', answer: 'Google says structured data is not a direct ranking factor. However, rich results increase visibility and CTR, which can indirectly improve rankings and traffic.' },
        { question: 'Where should I place JSON-LD markup?', answer: 'Place the <script type="application/ld+json"> tag in the <head> section of your page, though Google can also process it in the <body>.' },
        { question: 'Can I have multiple schema types on one page?', answer: 'Yes. You can include multiple JSON-LD script blocks on a single page--for example, both Article and FAQPage schemas on a blog post with an FAQ section.' },
        { question: 'How do I validate my structured data?', answer: 'Use Google\'s Rich Results Test or Schema.org Validator to check for errors and see which rich result types your markup is eligible for.' },
        { question: 'Does every schema type produce rich results?', answer: 'No. Only certain schema types are eligible for rich results in Google, such as FAQ, Product, Recipe, Event, and HowTo. Others provide semantic understanding without visual enhancements.' },
        { question: 'Is JSON-LD the only structured data format?', answer: 'No. Microdata and RDFa are also supported, but Google recommends JSON-LD as the preferred format because it is easier to implement and maintain.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Use JSON-LD format--it\'s Google\'s recommended structured data format.',
        'Only markup content that is visible on the page; don\'t add schema for hidden content.',
        'Validate all markup with Google\'s Rich Results Test before deploying.',
        'Keep schema data accurate and up to date--misleading markup can result in manual penalties.',
        'Use the most specific schema type available (e.g., "SoftwareApplication" instead of generic "Product").',
        'Include all required properties for your chosen schema type to maximize rich result eligibility.',
        'Test multiple schema blocks together to ensure they don\'t conflict.',
        'Monitor rich result performance in Google Search Console\'s Enhancements reports.'
      ]
    }
  },
  relatedTools: ['breadcrumb-schema-generator', 'open-graph-previewer', 'title-tag-checker', 'hreflang-generator'],
  seo: {
    metaTitle: 'Schema Markup Generator - Create JSON-LD Structured Data',
    metaDescription: 'Generate valid Schema.org JSON-LD markup for rich results in Google. Support for FAQ, Product, Article, LocalBusiness, Event, and 20+ schema types.',
    keywords: ['schema markup generator', 'JSON-LD', 'structured data', 'rich results', 'Schema.org', 'FAQ schema', 'product schema']
  }
};
