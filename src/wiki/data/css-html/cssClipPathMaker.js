export default {
  id: 'css-clip-path-maker',
  title: 'CSS Clip Path Maker',
  description: 'Visual polygon clip-path builder — drag points or pick presets, see the shape update live, and copy the CSS.',
  content: {
    whatIs: {
      heading: 'What is the CSS Clip Path Maker?',
      body: 'The CSS Clip Path Maker lets you create clip-path values visually by dragging polygon points on a preview element. Choose from preset shapes (triangle, pentagon, hexagon, star, arrow) or create custom polygons by placing and moving points. The tool generates the clip-path CSS in real time for you to copy and use.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Writing clip-path polygon coordinates by hand is nearly impossible to do accurately. This visual tool lets you see the clipping shape as you build it, experiment with custom shapes, and get production-ready CSS without calculating coordinates manually.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Select a preset shape or start with a custom polygon.',
        'Drag points to adjust the shape.',
        'Add or remove points for more complex shapes.',
        'Preview the clipped element in real time.',
        'Switch between polygon(), circle(), ellipse(), and inset() shapes.',
        'Copy the generated clip-path CSS.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Drag-and-drop polygon point editing.',
        'Preset shapes: circle, ellipse, triangle, pentagon, hexagon, star, arrow.',
        'Support for polygon(), circle(), ellipse(), and inset() functions.',
        'Add/remove points for custom polygon shapes.',
        'Live preview of the clipped element.',
        'One-click CSS copy.',
        'Runs entirely in your browser.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Creating non-rectangular image masks.',
        'Building decorative section dividers with angled edges.',
        'Designing hero images with custom shapes.',
        'Creating interactive reveal effects with animated clip-paths.',
        'Building custom avatar shapes beyond circles.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Triangle', description: 'clip-path: polygon(50% 0%, 0% 100%, 100% 100%) — a simple equilateral triangle shape.' },
        { title: 'Diagonal Section', description: 'clip-path: polygon(0 0, 100% 0, 100% 80%, 0 100%) — creates an angled bottom edge for section dividers.' },
        { title: 'Hexagon Avatar', description: 'A six-point polygon creating a hexagonal profile image mask.' },
        { title: 'Star Shape', description: 'A ten-point polygon alternating between inner and outer radii for a star cutout.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'clip-path', definition: 'A CSS property that defines a clipping region, hiding portions of the element outside the defined shape.' },
        { term: 'polygon()', definition: 'A clip-path function defining a shape with a list of X,Y coordinate pairs.' },
        { term: 'circle()', definition: 'A clip-path function creating a circular clipping region with a radius and center position.' },
        { term: 'inset()', definition: 'A clip-path function creating a rectangular clipping region with optional rounded corners.' },
        { term: 'Coordinate Pair', definition: 'A percentage-based X,Y position within the element\'s bounding box.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'Does clip-path affect layout?', answer: 'No. The element retains its original box size. Only the visible area is clipped.' },
        { question: 'Can I animate clip-path?', answer: 'Yes, but the polygon must have the same number of points in both states for smooth transitions.' },
        { question: 'Is clip-path supported in all browsers?', answer: 'Yes. polygon(), circle(), and ellipse() are supported in all modern browsers.' },
        { question: 'Does clipping affect click events?', answer: 'By default, the full box receives events. Use pointer-events: none on clipped-out areas if needed.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Use percentage values for responsive clip-paths that scale with the element.',
        'Keep polygon point counts low for simpler, faster-rendering shapes.',
        'Use clip-path transitions for creative reveal and hover effects.',
        'Combine clip-path with background images for decorative hero sections.',
        'Test clipped images at different sizes to ensure the important content remains visible.',
        'Consider accessibility — ensure clipped content does not hide essential information.'
      ]
    }
  },
  relatedTools: ['css-border-radius-generator', 'css-filter-generator', 'css-animation-generator', 'css-box-shadow-generator'],
  seo: {
    metaTitle: 'CSS Clip Path Maker — Visual Polygon Builder | UnTrackt Wiki',
    metaDescription: 'Create CSS clip-path shapes visually by dragging points. Preset shapes, custom polygons, and real-time preview with copy-ready CSS.',
    keywords: ['css clip path', 'clip-path maker', 'polygon builder', 'css shapes', 'clip path generator', 'polygon clip path']
  }
};
