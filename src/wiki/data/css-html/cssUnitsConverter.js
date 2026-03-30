export default {
  id: 'css-units-converter',
  title: 'CSS Units Converter',
  description: 'Convert between px, rem, em, vh, and vw — set a base font size and viewport dimensions for accurate results.',
  content: {
    whatIs: {
      heading: 'What is the CSS Units Converter?',
      body: 'The CSS Units Converter translates between common CSS length units — px, rem, em, vh, vw, and percentages. You set the base font size (for rem/em conversions) and viewport dimensions (for vh/vw), and the tool instantly shows equivalent values across all units. It takes the guesswork out of responsive design calculations.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Converting between CSS units by hand requires knowing the base font size, parent font size, and viewport dimensions. This tool makes all conversions instant and accurate, helping you switch between absolute and relative units confidently when building responsive layouts.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Set the root font size (default 16px for rem calculations).',
        'Set the viewport width and height (for vh/vw conversions).',
        'Enter a value in any unit (px, rem, em, vh, vw).',
        'View the equivalent values in all other units instantly.',
        'Copy the value you need for your CSS.',
        'Batch-convert multiple values by entering a list.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Converts between px, rem, em, vh, vw, and percentages.',
        'Configurable root font size for accurate rem/em calculations.',
        'Configurable viewport dimensions for vh/vw calculations.',
        'Instant two-way conversion as you type.',
        'Batch conversion for multiple values.',
        'Conversion reference table for quick lookups.',
        'Client-side only — no data shared.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Converting a designer\'s px values to rem for a responsive build.',
        'Calculating vh values for full-screen sections.',
        'Determining the em equivalent of pixel sizes for nested elements.',
        'Creating a spacing scale in rem from a pixel-based design system.',
        'Quick reference during code review when reading unfamiliar units.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'px to rem', description: '16px = 1rem (at 16px root). 24px = 1.5rem. 32px = 2rem.' },
        { title: '100vh Calculation', description: 'On a 900px tall viewport, 50vh = 450px.' },
        { title: 'vw for Typography', description: 'On a 1440px wide viewport, 5vw = 72px — useful for fluid headings.' },
        { title: 'Design Token Conversion', description: 'Convert an entire spacing scale (4, 8, 12, 16, 24, 32, 48, 64)px to rem in one batch.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'px (Pixel)', definition: 'An absolute CSS unit corresponding to one device pixel (or CSS pixel on high-DPI screens).' },
        { term: 'rem (Root Em)', definition: 'A relative unit based on the root element\'s (html) font size. 1rem = root font size.' },
        { term: 'em', definition: 'A relative unit based on the parent element\'s font size. Compounds when nested.' },
        { term: 'vh (Viewport Height)', definition: '1vh = 1% of the viewport height.' },
        { term: 'vw (Viewport Width)', definition: '1vw = 1% of the viewport width.' },
        { term: 'Root Font Size', definition: 'The font-size of the html element, used as the base for rem calculations. Default is 16px in most browsers.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'What root font size should I use?', answer: 'Most browsers default to 16px. Use that unless your project explicitly overrides the root font size.' },
        { question: 'What is the difference between em and rem?', answer: 'rem is always relative to the root font size. em is relative to the parent element\'s font size and compounds when nested.' },
        { question: 'Should I use px or rem?', answer: 'Use rem for values that should scale with user font preferences. Use px for values that should remain fixed (borders, shadows).' },
        { question: 'What about the mobile viewport vh issue?', answer: 'On mobile browsers, 100vh can be taller than the visible area due to the URL bar. Use dvh (dynamic vh) for accurate mobile calculations.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Use rem for font sizes and spacing to support user font preferences.',
        'Use px for borders, outlines, and values that should not scale.',
        'Use vw/vh for full-screen layouts, but test on mobile for the 100vh issue.',
        'Define a spacing scale in rem for consistent layouts.',
        'Avoid deeply nested em — use rem to prevent compounding issues.',
        'Use clamp() with vw for fluid typography that has min/max boundaries.'
      ]
    }
  },
  relatedTools: ['css-flexbox-playground', 'css-grid-generator', 'css-box-shadow-generator', 'unit-converter'],
  seo: {
    metaTitle: 'CSS Units Converter — px, rem, em, vh, vw | UnTrackt Wiki',
    metaDescription: 'Convert between CSS units: px, rem, em, vh, vw. Set base font size and viewport dimensions for accurate responsive design calculations.',
    keywords: ['css units converter', 'px to rem', 'rem to px', 'vh calculator', 'vw calculator', 'css unit conversion']
  }
};
