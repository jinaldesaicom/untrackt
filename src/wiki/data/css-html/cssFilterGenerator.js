export default {
  id: 'css-filter-generator',
  title: 'CSS Filter Generator',
  description: 'Adjust blur, brightness, contrast, grayscale, hue-rotate, and more with sliders for live preview and CSS output.',
  content: {
    whatIs: {
      heading: 'What is the CSS Filter Generator?',
      body: 'The CSS Filter Generator provides slider controls for all CSS filter functions — blur, brightness, contrast, grayscale, hue-rotate, invert, opacity, saturate, sepia, and drop-shadow. Adjust multiple filters simultaneously on a preview element and copy the generated filter CSS with one click.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'CSS filters are powerful but hard to fine-tune by editing numeric values. This visual tool lets you see the combined effect of multiple filters instantly, making it fast to create the exact look you want for images, backgrounds, or UI elements.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Use sliders to adjust each filter value (blur, brightness, contrast, etc.).',
        'See the combined effect on the live preview.',
        'Stack multiple filters for complex effects.',
        'Reset individual filters or all at once.',
        'Copy the generated CSS filter property.',
        'Apply to images, backgrounds, or overlay elements in your project.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'All 10 CSS filter functions with slider controls.',
        'Live preview on a sample image or custom uploaded image.',
        'Combined filter output in a single CSS declaration.',
        'Individual reset buttons per filter.',
        'One-click CSS copy.',
        'No server — everything runs in your browser.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Creating desaturated or sepia image effects for backgrounds.',
        'Adjusting brightness and contrast on hero images.',
        'Building hover effects that transition filter values.',
        'Applying blur effects to background overlays.',
        'Prototyping image treatments for design mockups.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Grayscale Background', description: 'filter: grayscale(100%) — converts a color image to black and white.' },
        { title: 'Blurred Overlay', description: 'filter: blur(8px) brightness(0.7) — creates a frosted dark overlay effect.' },
        { title: 'Vintage Photo', description: 'filter: sepia(60%) contrast(110%) saturate(80%) — warm vintage tone.' },
        { title: 'Hover Color Shift', description: 'filter: hue-rotate(90deg) on hover — shifts all colors by 90 degrees.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'CSS Filter', definition: 'A CSS property that applies graphical effects like blur, color shift, and brightness adjustment to an element.' },
        { term: 'blur()', definition: 'Applies a Gaussian blur to the element. Values in pixels.' },
        { term: 'brightness()', definition: 'Adjusts the brightness. 1 is normal, 0 is black, >1 is brighter.' },
        { term: 'hue-rotate()', definition: 'Rotates the hue of all colors by a degree value on the color wheel.' },
        { term: 'drop-shadow()', definition: 'Applies a shadow that follows the element\'s alpha channel, unlike box-shadow which follows the box.' },
        { term: 'Filter Stack', definition: 'Multiple filter functions applied in sequence, processed left to right.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'Does filter order matter?', answer: 'Yes. Filters are applied left to right. blur() then brightness() gives a different result than brightness() then blur().' },
        { question: 'Are CSS filters performant?', answer: 'Simple filters are GPU-accelerated. Large blur radii on many elements can impact performance.' },
        { question: 'What is the difference between filter and backdrop-filter?', answer: 'filter applies to the element itself. backdrop-filter applies to the area behind the element.' },
        { question: 'Can I animate filters?', answer: 'Yes. CSS filters can be smoothly transitioned or animated for hover effects and interactions.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Use filters sparingly — subtle treatments look more professional.',
        'Combine filters for unique effects (sepia + contrast = vintage).',
        'Test filter effects across different images to ensure consistency.',
        'Use transitions on filter for smooth hover effects.',
        'Consider backdrop-filter for glass effects on overlays.',
        'Provide fallbacks or use @supports for older browser compatibility.'
      ]
    }
  },
  relatedTools: ['css-animation-generator', 'css-box-shadow-generator', 'glassmorphism-generator', 'css-clip-path-maker'],
  seo: {
    metaTitle: 'CSS Filter Generator — Visual Filter Effect Builder | UnTrackt Wiki',
    metaDescription: 'Adjust CSS filter effects with sliders for blur, brightness, contrast, grayscale, hue-rotate, and more. Live preview and one-click CSS copy.',
    keywords: ['css filter generator', 'css filters', 'blur', 'brightness', 'contrast', 'filter effects', 'css image effects']
  }
};
