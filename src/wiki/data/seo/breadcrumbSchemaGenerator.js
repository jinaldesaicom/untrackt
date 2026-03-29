export default {
  id: 'breadcrumb-schema-generator',
  title: 'Breadcrumb Schema Generator',
  description: 'Generate BreadcrumbList JSON-LD structured data to display breadcrumb navigation in search results.',
  content: {
    whatIs: {
      heading: 'What is the Breadcrumb Schema Generator?',
      body: 'The Breadcrumb Schema Generator creates BreadcrumbList structured data in JSON-LD format. This markup tells search engines about your site\'s hierarchical page structure, enabling breadcrumb trails to appear in search results. Breadcrumbs replace the plain URL in Google results with a structured path like "Home > Category > Page," improving user orientation and click-through rates.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Breadcrumb rich results replace the standard URL display in Google search results with a clear navigational path, making your listings more informative and clickable. This tool generates valid BreadcrumbList JSON-LD with proper item positioning and URLs, ensuring your breadcrumb structure is correctly interpreted by search engines without manual JSON coding.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Enter the breadcrumb items in order from the homepage to the current page.',
        'For each item, provide the page name and its full URL.',
        'Review the generated JSON-LD markup in the preview panel.',
        'Validate the output for correctness and completeness.',
        'Copy the JSON-LD code and add it to your page\'s <head> or <body> section.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Generates valid BreadcrumbList JSON-LD conforming to Schema.org specifications.',
        'Automatic position numbering for each breadcrumb item.',
        'Drag-and-drop reordering of breadcrumb levels.',
        'URL validation for each breadcrumb item.',
        'Preview of how breadcrumbs will appear in Google search results.',
        'Support for multiple breadcrumb paths on a single page.',
        'One-click copy of generated JSON-LD code.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Adding breadcrumb schema to e-commerce category and product pages.',
        'Implementing breadcrumb structured data for blog post navigation hierarchies.',
        'Creating breadcrumb markup for documentation sites with deep page structures.',
        'Enhancing search result appearance for multi-level informational websites.',
        'Adding breadcrumb schema to pages that already display visual breadcrumbs.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        {
          title: 'E-commerce Product Page',
          description: 'Generate breadcrumbs for "Home > Electronics > Headphones > Wireless Noise-Canceling" with each level linked to the appropriate category URL.'
        },
        {
          title: 'Blog Post Hierarchy',
          description: 'Create breadcrumb schema for "Home > Blog > SEO > How to Optimize Title Tags" to show the content category path in search results.'
        },
        {
          title: 'Documentation Page',
          description: 'Build breadcrumbs for "Docs > API Reference > Authentication > OAuth 2.0" to help users and search engines navigate a deep documentation structure.'
        },
        {
          title: 'Recipe Category',
          description: 'Generate "Home > Recipes > Dinner > Pasta Recipes > Spaghetti Carbonara" breadcrumbs for a recipe site with multiple category levels.'
        },
        {
          title: 'Service Area Page',
          description: 'Create breadcrumbs for "Home > Services > Web Design > Austin TX" to reinforce local service hierarchy in search results.'
        }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'BreadcrumbList', definition: 'A Schema.org type representing an ordered list of breadcrumb items that forms a navigational trail from the homepage to the current page.' },
        { term: 'ListItem', definition: 'A Schema.org type representing a single item in a breadcrumb trail, containing a name, URL, and position number.' },
        { term: 'Position', definition: 'A numeric value indicating the order of a breadcrumb item in the list, starting from 1 for the first item (usually the homepage).' },
        { term: 'Breadcrumb Trail', definition: 'A navigational path showing the page hierarchy, typically displayed as "Home > Category > Subcategory > Page."' },
        { term: 'JSON-LD', definition: 'JavaScript Object Notation for Linked Data--the format used to embed structured data in web pages via a <script> tag.' },
        { term: 'Rich Result', definition: 'An enhanced search result that displays structured information, such as breadcrumb paths, instead of plain URLs.' },
        { term: 'Hierarchical Navigation', definition: 'A navigation structure that organizes content in a tree-like hierarchy from broad categories to specific pages.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'Do breadcrumbs help with SEO rankings?', answer: 'Breadcrumb schema is not a direct ranking factor, but it improves how your pages appear in search results and helps search engines understand your site structure, which can positively influence crawling and user engagement.' },
        { question: 'Should the last breadcrumb item link to the current page?', answer: 'Google recommends including the current page as the last item. It can be linked or unlinked, but including it with a URL is the most complete implementation.' },
        { question: 'Can a page have multiple breadcrumb paths?', answer: 'Yes. If a page belongs to multiple categories, you can include multiple BreadcrumbList schemas on the same page, each representing a different navigational path.' },
        { question: 'Should breadcrumb schema match the visual breadcrumbs on the page?', answer: 'Yes. Google recommends that breadcrumb structured data accurately reflects the breadcrumbs visible on the page. Mismatches can lead to schema being ignored.' },
        { question: 'Do I need breadcrumb schema if I already have visual breadcrumbs?', answer: 'Visual breadcrumbs alone don\'t generate breadcrumb rich results. You need the JSON-LD structured data to trigger the enhanced display in search results.' },
        { question: 'How many levels of breadcrumbs should I include?', answer: 'Include all meaningful levels from the homepage to the current page. There\'s no hard limit, but keep it logical and useful--typically 3-5 levels.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Always start breadcrumbs with the homepage as position 1.',
        'Use absolute URLs for every breadcrumb item.',
        'Ensure the breadcrumb hierarchy matches the actual URL structure and visual navigation.',
        'Include the current page as the last item in the breadcrumb trail.',
        'Validate your markup with Google\'s Rich Results Test.',
        'Keep breadcrumb names concise and descriptive--match your actual navigation labels.',
        'Update breadcrumb schema when site structure changes or pages are moved.'
      ]
    }
  },
  relatedTools: ['schema-markup-generator', 'canonical-tag-generator', 'internal-link-analyzer'],
  seo: {
    metaTitle: 'Breadcrumb Schema Generator - BreadcrumbList JSON-LD Markup',
    metaDescription: 'Generate BreadcrumbList JSON-LD structured data for breadcrumb rich results in Google. Create valid navigation schema for your website hierarchy.',
    keywords: ['breadcrumb schema', 'BreadcrumbList', 'JSON-LD', 'navigation schema', 'breadcrumb rich results', 'structured data']
  }
};
