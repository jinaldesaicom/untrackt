export default {
  id: 'glassmorphism-generator',
  title: 'Glassmorphism Generator',
  description: 'Create a frosted-glass CSS effect — adjust transparency, blur, and border to get a trendy glassmorphism card.',
  content: {
    whatIs: {
      heading: 'What is the Glassmorphism Generator?',
      body: 'The Glassmorphism Generator creates the popular frosted-glass CSS effect using backdrop-filter, semi-transparent backgrounds, and subtle borders. Adjust blur intensity, background opacity, border thickness, and border-radius while previewing the effect on a colorful background. Copy the complete CSS with one click.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'The glassmorphism effect involves multiple CSS properties that need to be tuned together — backdrop-filter blur, background color with alpha, border with low opacity, and box-shadow. This visual builder lets you dial in the exact look without guessing values.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Set the background color and opacity for the glass panel.',
        'Adjust the backdrop-filter blur intensity.',
        'Configure the border color, opacity, and width.',
        'Set border-radius for rounded corners.',
        'Add a subtle box-shadow for depth.',
        'Preview against the colorful background.',
        'Copy the generated CSS.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Backdrop-filter blur with adjustable intensity.',
        'Semi-transparent background with color and opacity control.',
        'Border with independent opacity control.',
        'Box-shadow for added depth.',
        'Live preview on a colorful gradient background.',
        'Complete CSS output including vendor prefixes.',
        'Client-side only.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Designing modern card components with glass effects.',
        'Creating overlay panels and modals with frosted backgrounds.',
        'Building navigation bars with translucent backgrounds.',
        'Prototyping modern UI designs following glassmorphism trends.',
        'Adding depth to hero sections with glass-style content panels.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Glass Card', description: 'background: rgba(255,255,255,0.15), backdrop-filter: blur(12px), border: 1px solid rgba(255,255,255,0.2).' },
        { title: 'Dark Glass', description: 'background: rgba(0,0,0,0.3), backdrop-filter: blur(20px) — works well on bright backgrounds.' },
        { title: 'Light Overlay', description: 'Subtle blur(6px) with 90% white background — barely visible glass effect for light themes.' },
        { title: 'Nav Bar', description: 'A fixed top navigation with glass effect that content scrolls behind.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Glassmorphism', definition: 'A UI design trend using frosted-glass effects with transparency, blur, and subtle borders.' },
        { term: 'backdrop-filter', definition: 'A CSS property that applies graphical effects (like blur) to the area behind the element.' },
        { term: 'Alpha Channel', definition: 'The transparency component of a color value, controlling how opaque or transparent the color appears.' },
        { term: 'Frosted Glass', definition: 'A visual effect where the background behind an element is blurred, creating a glass-like appearance.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'Does backdrop-filter work in all browsers?', answer: 'Yes, in all modern browsers. Safari may require the -webkit- prefix in some older versions.' },
        { question: 'Is glassmorphism accessible?', answer: 'Be careful with text contrast. The blurred background can make text hard to read. Ensure sufficient color contrast ratios.' },
        { question: 'Does it affect performance?', answer: 'backdrop-filter with large blur values can be GPU-intensive. Use it selectively, not on dozens of overlapping elements.' },
        { question: 'What makes a good background for glassmorphism?', answer: 'Colorful gradients or images work best because the blur effect is most visible when there is varied content behind the glass panel.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Use glassmorphism sparingly — one or two glass panels per page is usually enough.',
        'Ensure text on glass panels has sufficient contrast for readability.',
        'Add a subtle border to define the glass panel\'s edges.',
        'Test the effect on different backgrounds to ensure it looks good in all contexts.',
        'Provide a solid-color fallback for browsers that do not support backdrop-filter.',
        'Combine with subtle box-shadow for added depth and realism.'
      ]
    }
  },
  relatedTools: ['neumorphism-generator', 'css-box-shadow-generator', 'css-filter-generator', 'button-generator'],
  seo: {
    metaTitle: 'Glassmorphism Generator — Frosted Glass CSS Effect | UnTrackt Wiki',
    metaDescription: 'Create frosted-glass CSS effects with adjustable blur, transparency, and borders. Preview glassmorphism on colorful backgrounds and copy the CSS.',
    keywords: ['glassmorphism', 'frosted glass css', 'backdrop-filter', 'glass effect', 'glassmorphism generator', 'css glass']
  }
};
