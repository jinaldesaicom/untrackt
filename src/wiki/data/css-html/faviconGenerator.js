export default {
  id: 'favicon-generator',
  title: 'Favicon Generator',
  description: 'Upload an SVG or PNG and generate all standard favicon sizes as a downloadable ZIP with the HTML link tags.',
  content: {
    whatIs: {
      heading: 'What is the Favicon Generator?',
      body: 'The Favicon Generator takes a source image (SVG or PNG) and produces all the favicon sizes needed for modern browsers, devices, and platforms — including 16x16, 32x32, 48x48, 180x180 (Apple Touch), 192x192, and 512x512 (Android). It generates a downloadable ZIP with all sizes and provides the HTML <link> tags to paste into your site\'s <head>.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Each browser and operating system expects favicons in different sizes and formats. Manually resizing an image and writing the correct link tags is tedious and error-prone. This tool generates everything from a single source image, ensuring your site looks polished in browser tabs, bookmarks, and home screen shortcuts.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Upload an SVG or high-resolution PNG (at least 512x512).',
        'Preview the generated favicons at different sizes.',
        'Download the ZIP containing all favicon files.',
        'Copy the generated HTML <link> tags.',
        'Place the favicon files in your site\'s public/root directory.',
        'Paste the link tags into your site\'s <head> section.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Generates all standard sizes: 16x16, 32x32, 48x48, 180x180, 192x192, 512x512.',
        'Supports SVG and PNG source input.',
        'Downloadable ZIP with all favicon files.',
        'Generated HTML <link> tags ready to paste.',
        'Preview at each size to verify quality.',
        'All processing happens in your browser — images stay private.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Setting up favicons for a new website.',
        'Updating favicons during a rebrand.',
        'Generating Apple Touch icons for iOS home screen shortcuts.',
        'Creating Android manifest icons for PWA support.',
        'Ensuring favicon coverage across all browsers and platforms.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'SVG Logo', description: 'Upload your logo SVG and get crisp favicons at all sizes since SVG scales perfectly.' },
        { title: 'PNG Icon', description: 'Upload a 512x512 PNG icon and get all smaller sizes auto-generated with quality downscaling.' },
        { title: 'PWA Icons', description: 'Get 192x192 and 512x512 PNGs required for the web app manifest.' },
        { title: 'Apple Touch Icon', description: 'Get the 180x180 apple-touch-icon for iOS Safari bookmarks and home screen.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Favicon', definition: 'A small icon associated with a website, displayed in browser tabs, bookmarks, and other UI elements.' },
        { term: 'Apple Touch Icon', definition: 'A 180x180 PNG used by iOS Safari for home screen shortcuts and bookmarks.' },
        { term: 'Web App Manifest', definition: 'A JSON file (manifest.json) defining PWA metadata including icon sizes for Android home screen.' },
        { term: 'ICO Format', definition: 'A legacy icon format supporting multiple sizes in a single file, used by older browsers.' },
        { term: 'SVG Favicon', definition: 'A scalable vector favicon supported by modern browsers, adapting to any size without quality loss.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'What source size should I use?', answer: 'Use at least 512x512 pixels or an SVG. Smaller sources may look blurry when upscaled.' },
        { question: 'Do I still need .ico files?', answer: 'For maximum compatibility, include a favicon.ico. Most modern browsers use the PNG or SVG versions.' },
        { question: 'Where do I put the favicon files?', answer: 'Place them in your site\'s root directory (public/ or /) and add the link tags to your HTML <head>.' },
        { question: 'Is my image uploaded to a server?', answer: 'No. All generation happens in your browser. Your image never leaves your device.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Start with an SVG for the sharpest results at all sizes.',
        'Test small sizes (16x16, 32x32) to ensure the icon is recognizable.',
        'Keep the design simple — complex details are lost at small sizes.',
        'Use contrasting colors so the favicon is visible against both light and dark browser themes.',
        'Include both favicon.ico and PNG versions for maximum compatibility.',
        'Add the web app manifest icons for PWA support on Android.'
      ]
    }
  },
  relatedTools: ['meta-tag-generator', 'button-generator', 'glassmorphism-generator', 'open-graph-previewer'],
  seo: {
    metaTitle: 'Favicon Generator — All Sizes from One Image | UnTrackt Wiki',
    metaDescription: 'Generate all standard favicon sizes from a single SVG or PNG. Download a ZIP with icons and HTML link tags for browsers, iOS, and Android.',
    keywords: ['favicon generator', 'favicon sizes', 'generate favicon', 'apple touch icon', 'web app icon', 'favicon maker']
  }
};
