export default {
  id: 'css-box-shadow-generator',
  title: 'CSS Box Shadow Generator',
  description: 'Visual builder for CSS box-shadow values — adjust offsets, blur, spread, color, and inset, then copy the CSS.',
  content: {
    whatIs: {
      heading: 'What is the CSS Box Shadow Generator?',
      body: 'The CSS Box Shadow Generator is a visual tool for creating box-shadow CSS values without writing code by hand. Adjust horizontal and vertical offsets, blur radius, spread radius, shadow color, and inset mode using intuitive sliders while watching the effect update in real time on a preview element. When the shadow looks right, copy the generated CSS with one click.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Crafting box shadows by trial-and-error in a code editor is slow and frustrating. This tool gives instant visual feedback, supports multiple layered shadows, and produces production-ready CSS. It saves designers and developers time by eliminating the guess-and-refresh cycle.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Adjust the horizontal offset (X) and vertical offset (Y) using sliders.',
        'Set the blur radius to control shadow softness.',
        'Set the spread radius to expand or contract the shadow.',
        'Pick a shadow color and adjust opacity.',
        'Toggle inset mode for inner shadows.',
        'Add additional shadow layers for depth effects.',
        'Copy the generated CSS to your clipboard.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Real-time visual preview of shadow changes.',
        'Individual control for X offset, Y offset, blur, spread, and color.',
        'Inset shadow toggle for inner shadow effects.',
        'Multiple shadow layers with independent settings.',
        'One-click CSS copy to clipboard.',
        'Preset shadow styles for quick starting points.',
        'Client-side only — no data leaves your browser.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Designing card and button shadow effects for UI components.',
        'Creating layered shadow effects for depth and elevation.',
        'Prototyping shadow styles before implementing in a design system.',
        'Generating consistent shadow values across a project.',
        'Learning how box-shadow parameters interact visually.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Subtle Card Shadow', description: '0 2px 8px rgba(0,0,0,0.1) — a light shadow for card elevation.' },
        { title: 'Material Design Elevation', description: 'Layered shadows: 0 1px 3px rgba(0,0,0,0.12) and 0 1px 2px rgba(0,0,0,0.24) for Material-style depth.' },
        { title: 'Inset Shadow', description: 'inset 0 2px 4px rgba(0,0,0,0.2) — creates a pressed/recessed button effect.' },
        { title: 'Colorful Glow', description: '0 0 20px rgba(99,102,241,0.5) — a purple glow effect around an element.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Box Shadow', definition: 'A CSS property that adds shadow effects around an element\'s frame, supporting multiple layers.' },
        { term: 'Offset', definition: 'The horizontal (X) and vertical (Y) displacement of the shadow from the element.' },
        { term: 'Blur Radius', definition: 'Controls the softness of the shadow — higher values produce a more diffused shadow.' },
        { term: 'Spread Radius', definition: 'Expands (positive) or contracts (negative) the shadow size relative to the element.' },
        { term: 'Inset', definition: 'A keyword that moves the shadow inside the element, creating an inner shadow effect.' },
        { term: 'RGBA', definition: 'A color format specifying red, green, blue, and alpha (opacity) channels.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'Can I have multiple shadows on one element?', answer: 'Yes. The tool supports adding multiple shadow layers that are comma-separated in the CSS output.' },
        { question: 'What is the performance impact of box shadows?', answer: 'Box shadows are GPU-accelerated in modern browsers, but very large blur radii or many layers on many elements can affect scrolling performance.' },
        { question: 'Does box-shadow work on all browsers?', answer: 'Yes. box-shadow is supported in all modern browsers including Chrome, Firefox, Safari, and Edge.' },
        { question: 'Can I animate box shadows?', answer: 'Yes, but animating large shadow changes can be performance-intensive. Consider using opacity transitions on a pseudo-element instead.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Use subtle shadows (low opacity, moderate blur) for a professional look.',
        'Layer multiple shadows for more realistic depth effects.',
        'Keep shadow direction consistent across your UI for visual coherence.',
        'Use CSS variables for shadow values to maintain consistency in design systems.',
        'Test shadows on both light and dark backgrounds.',
        'Prefer box-shadow over drop-shadow filter for rectangular elements.'
      ]
    }
  },
  relatedTools: ['glassmorphism-generator', 'neumorphism-generator', 'button-generator', 'css-border-radius-generator'],
  seo: {
    metaTitle: 'CSS Box Shadow Generator — Visual Shadow Builder | UnTrackt Wiki',
    metaDescription: 'Create CSS box-shadow values visually with controls for offset, blur, spread, color, and inset. Copy production-ready CSS with one click.',
    keywords: ['css box shadow', 'box shadow generator', 'css shadow', 'shadow builder', 'box-shadow tool', 'css visual editor']
  }
};
