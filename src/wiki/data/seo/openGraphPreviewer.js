export default {
  id: 'open-graph-previewer',
  title: 'Open Graph Previewer',
  description: 'Preview and validate how your pages appear when shared on social media platforms like Facebook, Twitter/X, and LinkedIn.',
  content: {
    whatIs: {
      heading: 'What is the Open Graph Previewer?',
      body: 'The Open Graph Previewer lets you enter Open Graph and Twitter Card meta tags and instantly see how your page will look when shared on Facebook, Twitter/X, LinkedIn, and other social platforms. It validates your tags against platform specifications and highlights missing or incorrectly formatted properties so you can optimize your social sharing appearance before publishing.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'When someone shares your link on social media, the platform pulls Open Graph tags to generate the preview card. Without proper tags, your content may display a broken image, a generic title, or no description at all. This tool lets you preview and fix social sharing cards before anyone sees them, ensuring your content looks professional and compelling everywhere it\'s shared.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Enter your Open Graph tags (og:title, og:description, og:image, og:url).',
        'Optionally add Twitter Card tags (twitter:card, twitter:title, twitter:image).',
        'Select the platform to preview: Facebook, Twitter/X, LinkedIn, or all.',
        'Review the rendered preview cards for each platform.',
        'Fix any validation warnings and re-preview until all platforms look correct.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Real-time preview cards for Facebook, Twitter/X, LinkedIn, and Discord.',
        'Validates all required and recommended Open Graph properties.',
        'Twitter Card preview supporting summary, summary_large_image, and player types.',
        'Image dimension and file size recommendations per platform.',
        'Missing tag detection with specific fix suggestions.',
        'Side-by-side comparison of desktop and mobile social previews.',
        'Copy-ready meta tag code generation.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Previewing blog post sharing cards before publishing.',
        'Validating product page social previews for e-commerce sites.',
        'Ensuring consistent branding across all social media platforms.',
        'Debugging why shared links show wrong images or descriptions.',
        'Generating correct meta tag code for pages that lack Open Graph tags.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        {
          title: 'Blog Post Preview',
          description: 'Enter og:title "10 Best Meal Prep Tips", og:description, and a featured image URL to preview the Facebook and Twitter/X sharing cards and verify the image isn\'t cropped awkwardly.'
        },
        {
          title: 'Product Launch Page',
          description: 'Preview a product launch page\'s social card with a promotional image sized at 1200×630 pixels to ensure it displays perfectly as a large summary card on Twitter/X.'
        },
        {
          title: 'Event Promotion',
          description: 'Validate an event page\'s Open Graph tags to confirm the event name, date description, and venue image appear correctly when shared in Facebook groups.'
        },
        {
          title: 'Homepage Branding',
          description: 'Test your homepage\'s Open Graph tags to ensure your brand logo, tagline, and site description create a professional impression when the URL is shared.'
        },
        {
          title: 'Video Content Card',
          description: 'Preview a twitter:card type "player" for a page with embedded video to verify the video thumbnail and play button render correctly on Twitter/X.'
        }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Open Graph Protocol', definition: 'A set of meta tags originally created by Facebook that control how content appears when shared on social media platforms.' },
        { term: 'og:title', definition: 'The Open Graph tag that sets the title displayed in social sharing previews.' },
        { term: 'og:image', definition: 'The Open Graph tag specifying the image URL displayed in social sharing cards. Recommended size is 1200×630 pixels.' },
        { term: 'Twitter Card', definition: 'Twitter-specific meta tags that control how content appears when shared on Twitter/X, including summary, large image, and player card types.' },
        { term: 'Summary Large Image', definition: 'A Twitter Card type that displays a large, prominent image above the title and description in the shared link preview.' },
        { term: 'og:description', definition: 'The Open Graph tag providing a brief description of the page content, displayed below the title in social previews.' },
        { term: 'Social Card', definition: 'The visual preview block (image, title, description, URL) generated by social platforms when a link is shared.' },
        { term: 'Fallback Tags', definition: 'When platform-specific tags are missing, platforms fall back to standard Open Graph tags or page title/description.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'What image size should I use for Open Graph?', answer: 'Use 1200×630 pixels for the best results across all platforms. This is the recommended size for Facebook and works well as a Twitter summary_large_image.' },
        { question: 'Do I need both Open Graph and Twitter Card tags?', answer: 'Twitter will fall back to Open Graph tags if Twitter Card tags are absent. However, using both gives you more control over platform-specific appearances.' },
        { question: 'Why does my shared link show the wrong image?', answer: 'Social platforms cache Open Graph data. After updating tags, use Facebook\'s Sharing Debugger or Twitter Card Validator to clear the cache and re-scrape your page.' },
        { question: 'Can I use different images for different platforms?', answer: 'Yes. Use og:image for Facebook/LinkedIn and twitter:image for Twitter/X to specify different images optimized for each platform\'s display dimensions.' },
        { question: 'What happens if I don\'t have Open Graph tags?', answer: 'Platforms will attempt to generate a preview from your page\'s title tag, meta description, and the first suitable image found, which often produces poor results.' },
        { question: 'Does Open Graph affect SEO rankings?', answer: 'Not directly. Open Graph tags influence social sharing appearance and click-through rates from social platforms, which can indirectly drive traffic and engagement.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Always include og:title, og:description, og:image, and og:url as the minimum required tags.',
        'Use images sized 1200×630 pixels for optimal display across all platforms.',
        'Keep og:title under 60 characters and og:description under 155 characters.',
        'Use absolute URLs for og:image, not relative paths.',
        'Add twitter:card with value "summary_large_image" for prominent image displays.',
        'Test previews on all target platforms before publishing.',
        'Clear social platform caches after updating Open Graph tags.',
        'Set og:type to "article" for blog posts and "website" for homepages.'
      ]
    }
  },
  relatedTools: ['title-tag-checker', 'meta-description-analyzer', 'schema-markup-generator'],
  seo: {
    metaTitle: 'Open Graph Previewer - Preview Social Media Sharing Cards',
    metaDescription: 'Preview and validate Open Graph and Twitter Card tags. See how your pages look when shared on Facebook, Twitter/X, LinkedIn, and more.',
    keywords: ['Open Graph previewer', 'social media preview', 'Twitter Card', 'og tags', 'Facebook sharing', 'social card validator']
  }
};
