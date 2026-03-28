export default {
  id: 'css-gradient-generator',
  title: 'CSS Gradient Generator',
  description: 'Create beautiful CSS linear, radial, and conic gradients visually with a live preview and copy-ready CSS code output.',
  content: {
    whatIs: {
      heading: 'What is the CSS Gradient Generator?',
      body: 'The CSS Gradient Generator is a visual design tool that lets you create CSS gradients interactively and outputs production-ready CSS code. It supports linear-gradient, radial-gradient, and conic-gradient types, with full control over direction, color stops, positions, opacity, and blending. Instead of writing gradient syntax by hand -- which is verbose and easy to get wrong -- you can visually compose your gradient, see a live preview, and copy the exact CSS code with a single click.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'CSS gradient syntax is powerful but complex. Specifying angles, color stop positions, radial shapes, and conic rotations by hand requires trial and error. This tool provides a visual WYSIWYG editor with real-time preview, letting you drag color stops, adjust angles, and experiment with combinations until you achieve the perfect effect. The generated code is clean, cross-browser compatible, and ready to paste into your stylesheet.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Choose the gradient type: linear, radial, or conic.',
        'Set the gradient direction or angle using the angle selector or predefined directions.',
        'Add, remove, and position color stops by clicking on the gradient bar.',
        'Adjust colors with the color picker -- supports HEX, RGB, and HSL input.',
        'Fine-tune color stop positions by dragging them or entering exact percentages.',
        'Copy the generated CSS code from the output panel or export as an image.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Support for linear-gradient, radial-gradient, and conic-gradient.',
        'Visual angle/direction selector with preset options (to top, to right, 45deg, etc.).',
        'Drag-and-drop color stop positioning on an interactive gradient bar.',
        'Unlimited color stops with individual color picker and opacity control.',
        'Live preview that updates in real-time as you adjust settings.',
        'Generated CSS code with fallback for older browsers.',
        'Gradient presets library with popular design gradients to use as starting points.',
        'Export gradient as PNG or SVG image for use in design tools.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Creating hero section backgrounds with smooth color transitions.',
        'Designing button hover effects with gradient overlays.',
        'Building decorative dividers and section separators.',
        'Creating text gradients using background-clip for modern typography effects.',
        'Generating gradient overlays for images and cards.',
        'Prototyping design system color gradients before implementing them in code.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Sunset Gradient', description: 'Create a linear-gradient(135deg, #ff6b6b, #ffd93d, #6bcb77) for a vibrant sunset-inspired background.' },
        { title: 'Subtle Card Background', description: 'Use linear-gradient(to bottom right, #f8f9fa, #e9ecef) for a gentle, professional card background.' },
        { title: 'Radial Spotlight', description: 'Build a radial-gradient(circle at center, #ffffff, #000000) for a spotlight or vignette effect.' },
        { title: 'Rainbow Conic', description: 'Create a conic-gradient(from 0deg, red, orange, yellow, green, blue, violet, red) for a color wheel.' },
        { title: 'Text Gradient', description: 'Apply a gradient to text: background: linear-gradient(90deg, #667eea, #764ba2) with -webkit-background-clip: text.' },
        { title: 'Multi-Stop Button', description: 'Design a button gradient with multiple stops: linear-gradient(90deg, #4facfe 0%, #00f2fe 100%) for a modern feel.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'linear-gradient', definition: 'A CSS function that creates a gradient transitioning along a straight line, defined by a direction or angle.' },
        { term: 'radial-gradient', definition: 'A CSS function that creates a gradient radiating outward from a center point, forming circular or elliptical color transitions.' },
        { term: 'conic-gradient', definition: 'A CSS function that creates a gradient rotating around a center point, with color transitions occurring along the angular dimension.' },
        { term: 'Color Stop', definition: 'A point in a gradient where a specific color is defined. Gradients smoothly transition between adjacent color stops.' },
        { term: 'Gradient Direction', definition: 'The angle or keyword (to top, to bottom right, 135deg) that defines which direction a linear gradient flows.' },
        { term: 'Repeating Gradient', definition: 'A variant (repeating-linear-gradient, repeating-radial-gradient) that tiles the gradient pattern infinitely.' },
        { term: 'Color Interpolation', definition: 'The method used to calculate intermediate colors between stops. Modern CSS supports different color spaces for interpolation.' },
        { term: 'background-clip: text', definition: 'A CSS property that clips the background to the text content, enabling gradient text effects when combined with transparent text color.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'Are CSS gradients supported in all browsers?', answer: 'Linear and radial gradients have excellent browser support (98%+ globally). Conic gradients are supported in all modern browsers. The tool generates fallback solid colors for older browsers.' },
        { question: 'Can I use more than two colors?', answer: 'Yes. CSS gradients support unlimited color stops. This tool lets you add as many stops as you need and position each one precisely.' },
        { question: 'How do I make a gradient transparent?', answer: 'Use rgba or hsla color values with an alpha component, or use the "transparent" keyword as one of your color stops.' },
        { question: 'Can I animate CSS gradients?', answer: 'CSS gradients cannot be directly animated with transitions. Use @property to animate individual color values, or layer pseudo-elements with opacity transitions as an alternative.' },
        { question: 'What is the performance impact of gradients?', answer: 'CSS gradients are rendered by the GPU and have minimal performance impact. However, complex gradients with many stops may cause slight rendering overhead on low-end devices.' },
        { question: 'Can gradients replace images?', answer: 'For patterns, backgrounds, and decorative elements -- yes. Gradients are resolution-independent, load instantly (no HTTP request), and are often smaller than equivalent images.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Start with two colors and add more stops gradually -- most effective gradients use 2-3 colors.',
        'Use subtle gradients (low contrast between stops) for professional, modern backgrounds.',
        'Include a solid color fallback for the rare browsers that do not support gradients.',
        'Avoid harsh color transitions -- position stops with enough space for smooth blending.',
        'Use the conic-gradient for pie charts, color wheels, and angular design elements.',
        'Test gradients on both light and dark backgrounds to ensure readability of overlaid content.',
        'Combine gradients with backdrop-filter: blur() for modern glassmorphism effects.',
        'Keep performance in mind -- prefer CSS gradients over images for decorative backgrounds.'
      ]
    }
  },
  relatedTools: ['color-converter', 'svg-optimizer', 'css-gradient-generator', 'markdown-previewer', 'lorem-ipsum-generator'],
  seo: {
    metaTitle: 'CSS Gradient Generator - Create Linear, Radial & Conic Gradients | UnTrackt Wiki',
    metaDescription: 'Create CSS gradients visually with live preview. Supports linear, radial, and conic gradients with unlimited color stops and copy-ready CSS output.',
    keywords: ['css gradient generator', 'linear gradient', 'radial gradient', 'conic gradient', 'css gradient maker', 'gradient creator', 'css background gradient', 'gradient tool']
  }
};
