export default {
  id: 'page-speed-recommendations',
  title: 'Page Speed Recommendations',
  description: 'Get actionable recommendations to improve page speed, Core Web Vitals, and Lighthouse performance scores.',
  content: {
    whatIs: {
      heading: 'What is the Page Speed Recommendations Tool?',
      body: 'The Page Speed Recommendations tool analyzes your page performance configuration and provides prioritized, actionable recommendations to improve loading speed, Core Web Vitals metrics, and overall Lighthouse performance scores. It covers image optimization, render-blocking resources, caching, JavaScript execution, layout shifts, and other factors that impact how fast your pages load and feel to users.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Page speed is a confirmed Google ranking factor, and Core Web Vitals (LCP, FID/INP, CLS) directly impact search rankings and user experience. Slow pages lead to higher bounce rates, lower conversions, and worse SEO performance. This tool translates complex performance audits into clear, prioritized action items you can implement immediately.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Enter your page URL or paste performance audit data.',
        'Review your Core Web Vitals scores: LCP, INP, and CLS.',
        'Browse the prioritized recommendations sorted by potential impact.',
        'Click on each recommendation for implementation details and code examples.',
        'Track improvements by re-analyzing after implementing changes.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Core Web Vitals assessment: LCP, INP (Interaction to Next Paint), and CLS.',
        'Prioritized recommendations sorted by performance impact.',
        'Specific code examples and implementation guidance for each fix.',
        'Image optimization analysis with format and sizing suggestions.',
        'Render-blocking resource identification.',
        'JavaScript bundle analysis and lazy-loading recommendations.',
        'Caching and compression configuration guidance.',
        'Mobile vs desktop performance comparison.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Diagnosing why a page has poor Lighthouse scores.',
        'Preparing for Google\'s Core Web Vitals ranking signals.',
        'Optimizing e-commerce pages for faster load times and better conversion rates.',
        'Identifying which performance fixes will have the biggest impact.',
        'Creating a performance improvement roadmap for development teams.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        {
          title: 'Image Optimization',
          description: 'Discover that unoptimized hero images are causing a 4.2s LCP. Get recommendations to serve WebP format, add responsive srcset attributes, and lazy-load below-the-fold images.'
        },
        {
          title: 'Render-Blocking CSS',
          description: 'Identify 3 render-blocking CSS files adding 1.5 seconds to page load. Get guidance on inlining critical CSS, deferring non-critical stylesheets, and using media queries.'
        },
        {
          title: 'Layout Shift Fix',
          description: 'Find that ads and images without explicit dimensions cause a CLS of 0.35. Get recommendations to set width/height attributes and reserve space for dynamic content.'
        },
        {
          title: 'JavaScript Reduction',
          description: 'Identify 800KB of unused JavaScript being loaded on every page. Get code-splitting and tree-shaking recommendations to reduce bundle size by 60%.'
        },
        {
          title: 'Caching Strategy',
          description: 'Discover that static assets are served without cache headers. Get Cache-Control configuration recommendations to enable browser caching and reduce repeat visit load times.'
        }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Core Web Vitals', definition: 'A set of Google metrics measuring real-world user experience: Largest Contentful Paint (loading), Interaction to Next Paint (interactivity), and Cumulative Layout Shift (visual stability).' },
        { term: 'LCP (Largest Contentful Paint)', definition: 'Measures how long it takes for the largest visible content element to render. Good scores are under 2.5 seconds.' },
        { term: 'INP (Interaction to Next Paint)', definition: 'Measures the latency of all user interactions throughout the page lifecycle. Good scores are under 200 milliseconds.' },
        { term: 'CLS (Cumulative Layout Shift)', definition: 'Measures unexpected layout movement of visible content. Good scores are under 0.1.' },
        { term: 'Lighthouse', definition: 'An open-source tool by Google that audits web page performance, accessibility, SEO, and best practices, generating scores from 0 to 100.' },
        { term: 'Render-Blocking Resource', definition: 'A CSS or JavaScript file that must be downloaded and processed before the browser can render the page, delaying first paint.' },
        { term: 'Lazy Loading', definition: 'A technique that defers loading of non-critical resources (images, scripts) until they are needed, improving initial page load speed.' },
        { term: 'Time to First Byte (TTFB)', definition: 'The time it takes for the browser to receive the first byte of response from the server, measuring server responsiveness.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'Is page speed a ranking factor?', answer: 'Yes. Google has confirmed that page speed and Core Web Vitals are ranking factors. While content relevance is still primary, faster pages have an advantage over slower competitors with similar content.' },
        { question: 'What is a good Lighthouse performance score?', answer: 'A score of 90-100 is considered good. 50-89 needs improvement, and below 50 is poor. Focus on Core Web Vitals metrics rather than just the overall score.' },
        { question: 'Should I optimize for mobile or desktop?', answer: 'Prioritize mobile. Google uses mobile-first indexing, and mobile performance is typically the ranking factor. Most users also browse on mobile devices.' },
        { question: 'How much does page speed affect conversions?', answer: 'Studies show that each additional second of load time reduces conversions by 7-20%. Amazon famously found that every 100ms of latency cost them 1% in sales.' },
        { question: 'What is the difference between lab and field data?', answer: 'Lab data (like Lighthouse) is collected in controlled conditions. Field data (like Chrome UX Report) comes from real users. Google uses field data for ranking, so both are important.' },
        { question: 'How often should I check page speed?', answer: 'Monitor continuously if possible, or at least monthly. Check after every deployment, content update, or third-party script addition that could affect performance.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Focus on Core Web Vitals (LCP under 2.5s, INP under 200ms, CLS under 0.1) as priority targets.',
        'Serve images in modern formats (WebP, AVIF) with responsive srcset attributes.',
        'Eliminate render-blocking CSS by inlining critical styles and deferring the rest.',
        'Lazy-load images, videos, and iframes below the fold.',
        'Set explicit width and height on images and ads to prevent layout shifts.',
        'Enable text compression (gzip/Brotli) and browser caching with proper Cache-Control headers.',
        'Code-split JavaScript bundles and defer non-critical scripts.',
        'Monitor real-user metrics via Chrome UX Report or web-vitals library, not just lab tests.'
      ]
    }
  },
  relatedTools: ['alt-text-analyzer', 'title-tag-checker', 'meta-description-analyzer'],
  seo: {
    metaTitle: 'Page Speed Recommendations - Improve Core Web Vitals & Performance',
    metaDescription: 'Get actionable page speed recommendations to improve LCP, INP, CLS, and Lighthouse scores. Optimize loading speed, images, scripts, and caching.',
    keywords: ['page speed', 'Core Web Vitals', 'Lighthouse', 'LCP', 'CLS', 'INP', 'performance optimization', 'web performance']
  }
};
