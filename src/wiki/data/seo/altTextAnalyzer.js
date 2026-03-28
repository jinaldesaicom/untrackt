export default {
  id: 'alt-text-analyzer',
  title: 'Alt Text Analyzer',
  description: 'Analyze and improve image alt text for better SEO, accessibility, and WCAG compliance.',
  content: {
    whatIs: {
      heading: 'What is the Alt Text Analyzer?',
      body: 'The Alt Text Analyzer evaluates image alt text for SEO effectiveness and accessibility compliance. It checks for descriptive quality, keyword relevance, appropriate length, and adherence to WCAG (Web Content Accessibility Guidelines) standards. The tool helps ensure your images are discoverable in image search and accessible to users relying on screen readers.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Alt text serves dual purposes: it makes images accessible to visually impaired users and helps search engines understand image content for image search rankings. Poor or missing alt text represents lost SEO opportunities and creates accessibility barriers. This tool audits your alt text against best practices and provides actionable suggestions for improvement.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Enter the alt text you want to analyze, or paste multiple alt text entries for bulk analysis.',
        'Optionally provide the target keyword for SEO relevance scoring.',
        'Click "Analyze" to evaluate each alt text entry.',
        'Review the scores for length, descriptiveness, keyword inclusion, and accessibility.',
        'Apply the suggestions to improve weak alt text and re-analyze.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Scores alt text on descriptiveness, length, and keyword relevance.',
        'WCAG 2.1 compliance checking for accessibility requirements.',
        'Detects common anti-patterns like "image of," "photo of," and filename-style alt text.',
        'Keyword presence analysis for SEO optimization.',
        'Bulk analysis mode for auditing multiple images at once.',
        'Character length recommendations with min/max guidance.',
        'Suggestions for rewriting weak or missing alt text.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Auditing alt text across an entire website for accessibility compliance.',
        'Optimizing product image alt text for e-commerce image search visibility.',
        'Ensuring blog post images have descriptive, keyword-relevant alt text.',
        'Preparing for WCAG compliance audits by checking all image descriptions.',
        'Training content teams on alt text best practices using the tool\'s feedback.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        {
          title: 'Product Image Optimization',
          description: 'Analyze "wireless headphones" vs "Black Sony WH-1000XM5 wireless noise-canceling headphones on a desk" to see how descriptive alt text scores higher for both SEO and accessibility.'
        },
        {
          title: 'Blog Featured Image',
          description: 'Evaluate "image1.jpg" (a common but poor alt text) versus "Person preparing healthy meal prep containers in a modern kitchen" to understand the scoring difference.'
        },
        {
          title: 'Decorative Image Detection',
          description: 'Enter blank alt text (alt="") for a decorative border image and confirm the tool correctly identifies it as properly implemented for a decorative element.'
        },
        {
          title: 'Infographic Description',
          description: 'Test "Chart showing 2026 SEO trends with voice search at 45%, AI content at 38%, and mobile-first indexing at 62%" to verify the alt text captures the data conveyed by the image.'
        },
        {
          title: 'Bulk E-commerce Audit',
          description: 'Paste 50 product image alt texts from a catalog page and identify which ones need improvement based on length, descriptiveness, and keyword scores.'
        }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Alt Text', definition: 'Alternative text--a text description added to an HTML image tag that describes the image content for screen readers and search engines.' },
        { term: 'WCAG', definition: 'Web Content Accessibility Guidelines--a set of standards for making web content accessible to people with disabilities, published by the W3C.' },
        { term: 'Screen Reader', definition: 'Assistive technology that reads web content aloud, relying on alt text to describe images to visually impaired users.' },
        { term: 'Decorative Image', definition: 'An image used purely for visual design purposes that conveys no meaningful content, which should have empty alt text (alt="").' },
        { term: 'Image SEO', definition: 'The practice of optimizing images and their metadata (alt text, file names, captions) to improve rankings in image search results.' },
        { term: 'Long Description', definition: 'An extended text description for complex images like charts or infographics, typically linked via longdesc attribute or adjacent text.' },
        { term: 'Keyword Stuffing', definition: 'Overloading alt text with keywords in an attempt to manipulate rankings, which violates both SEO and accessibility best practices.' },
        { term: 'Accessibility Audit', definition: 'A systematic review of a website to identify and fix barriers that prevent people with disabilities from accessing content.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'What is the ideal length for alt text?', answer: 'Aim for 50-150 characters. Alt text should be descriptive enough to convey the image content but concise enough that screen readers don\'t fatigue users with overly long descriptions.' },
        { question: 'Should every image have alt text?', answer: 'Every meaningful image should have descriptive alt text. Decorative images that don\'t convey content should have empty alt text (alt="") so screen readers skip them.' },
        { question: 'Should I include keywords in alt text?', answer: 'Yes, when relevant and natural. If the image genuinely relates to your target keyword, including it improves image SEO. Never force keywords into alt text where they don\'t fit.' },
        { question: 'Should I start alt text with "Image of" or "Photo of"?', answer: 'No. Screen readers already announce the element as an image. Starting with "Image of" or "Photo of" is redundant. Describe the content directly.' },
        { question: 'Does alt text affect page rankings?', answer: 'Alt text primarily affects image search rankings. It also contributes to overall page relevance signals and is a required accessibility element.' },
        { question: 'How does empty alt text differ from missing alt text?', answer: 'Empty alt text (alt="") tells screen readers to skip the image intentionally. Missing alt text (no alt attribute) causes screen readers to read the file name, creating a poor user experience.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Be specific and descriptive--describe what\'s actually in the image.',
        'Keep alt text under 150 characters for optimal screen reader experience.',
        'Don\'t start with "Image of" or "Photo of"--screen readers already identify the element.',
        'Use empty alt text (alt="") for purely decorative images.',
        'Include relevant keywords naturally, but never force or stuff them.',
        'For complex images like charts, provide a longer description in adjacent text or a linked page.',
        'Use different alt text for different images--never duplicate across images.',
        'Test your pages with a screen reader to hear how alt text sounds in context.'
      ]
    }
  },
  relatedTools: ['keyword-density-analyzer', 'reading-level-optimizer', 'seo-content-brief'],
  seo: {
    metaTitle: 'Alt Text Analyzer - Improve Image SEO & Accessibility',
    metaDescription: 'Analyze image alt text for SEO effectiveness and WCAG accessibility compliance. Get scoring, suggestions, and best practices for better alt text.',
    keywords: ['alt text analyzer', 'image SEO', 'accessibility', 'WCAG', 'alt attribute', 'screen reader', 'image optimization']
  }
};
