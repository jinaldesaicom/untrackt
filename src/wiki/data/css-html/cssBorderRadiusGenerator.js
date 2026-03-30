export default {
  id: 'css-border-radius-generator',
  title: 'CSS Border Radius Generator',
  description: 'Visual corner builder — independently adjust each corner radius and preview the shape in real time.',
  content: {
    whatIs: {
      heading: 'What is the CSS Border Radius Generator?',
      body: 'The CSS Border Radius Generator lets you visually control the border-radius of each corner of an element independently. Drag sliders or enter values for top-left, top-right, bottom-right, and bottom-left corners, and watch the shape update in real time. It supports both simple circular radii and the advanced slash notation for elliptical corners.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'The border-radius shorthand can be confusing, especially with four different values or the slash syntax for elliptical corners. This visual tool lets you see exactly what each value does, experiment freely, and copy the resulting CSS without memorizing the syntax.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Adjust each corner radius using sliders or direct input.',
        'Toggle between uniform radius (all corners the same) and independent corners.',
        'Enable elliptical mode to set separate horizontal and vertical radii.',
        'Preview the shape on the live preview element.',
        'Copy the generated border-radius CSS.',
        'Paste into your stylesheet.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Independent control for all four corners.',
        'Uniform mode for quick equal-corner rounding.',
        'Elliptical corner support (horizontal/vertical radii).',
        'Real-time shape preview.',
        'Shorthand and longhand CSS output.',
        'Pixel and percentage unit support.',
        'One-click copy to clipboard.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Rounding corners on cards, buttons, and containers.',
        'Creating organic blob shapes with asymmetric radii.',
        'Designing pill-shaped buttons with 50% border-radius.',
        'Building custom shape elements for creative layouts.',
        'Learning how the border-radius shorthand syntax works.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Rounded Card', description: 'border-radius: 8px — uniform corner rounding for a standard card component.' },
        { title: 'Pill Button', description: 'border-radius: 9999px — creates a fully rounded pill shape on any element.' },
        { title: 'Organic Shape', description: 'border-radius: 30% 70% 70% 30% / 30% 30% 70% 70% — creates a blob-like organic shape.' },
        { title: 'Chat Bubble', description: 'border-radius: 18px 18px 18px 4px — three rounded corners with one sharp corner.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Border Radius', definition: 'A CSS property that rounds the corners of an element\'s outer border edge.' },
        { term: 'Shorthand', definition: 'A single border-radius declaration that sets all four corners at once using 1-4 values.' },
        { term: 'Elliptical Radius', definition: 'Using the slash (/) notation to set different horizontal and vertical radii per corner.' },
        { term: 'Pixel (px)', definition: 'An absolute unit for border-radius values, producing consistent corner sizes.' },
        { term: 'Percentage (%)', definition: 'A relative unit where 50% creates a circle on a square element.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'What does the slash (/) do in border-radius?', answer: 'It separates horizontal radii from vertical radii, creating elliptical corners instead of circular ones.' },
        { question: 'How do I make a perfect circle?', answer: 'Set border-radius: 50% on a square element (equal width and height).' },
        { question: 'Does border-radius affect the element\'s content?', answer: 'The content is clipped to the border shape if overflow: hidden is set. Otherwise, content can extend beyond rounded corners.' },
        { question: 'Is border-radius supported in all browsers?', answer: 'Yes. It is supported in all modern browsers. No vendor prefixes needed.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Use consistent border-radius values across your design system for visual harmony.',
        'Use CSS custom properties (--radius-sm, --radius-lg) for easy maintenance.',
        'Use percentage values when you want the radius to scale with element size.',
        'Test rounded corners with content inside to ensure nothing looks clipped.',
        'Combine with overflow: hidden to create image masks with rounded shapes.',
        'Start with subtle rounding (4-8px) for a professional look.'
      ]
    }
  },
  relatedTools: ['css-box-shadow-generator', 'css-clip-path-maker', 'button-generator', 'glassmorphism-generator'],
  seo: {
    metaTitle: 'CSS Border Radius Generator — Visual Corner Builder | UnTrackt Wiki',
    metaDescription: 'Build CSS border-radius values visually with independent corner control and elliptical support. Preview shapes in real time and copy the CSS.',
    keywords: ['css border radius', 'border radius generator', 'rounded corners', 'css corners', 'border-radius tool', 'elliptical radius']
  }
};
