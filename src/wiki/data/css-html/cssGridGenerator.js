export default {
  id: 'css-grid-generator',
  title: 'CSS Grid Generator',
  description: 'Visual grid layout builder — set columns, rows, and gaps, name areas, and copy the generated CSS.',
  content: {
    whatIs: {
      heading: 'What is the CSS Grid Generator?',
      body: 'The CSS Grid Generator is a visual tool for building CSS Grid layouts. Define the number of columns and rows, set their sizes (pixels, fractions, auto), adjust gaps, and optionally name grid areas. The live preview updates instantly, and you can copy the complete CSS for both the grid container and any named areas.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'CSS Grid syntax is powerful but verbose. Manually writing grid-template-columns, grid-template-rows, and grid-template-areas takes time and is error-prone. This visual builder lets you define the grid structure by clicking and dragging, producing clean CSS that you can paste directly into your project.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Set the number of columns and rows.',
        'Define column and row sizes (px, fr, auto, minmax).',
        'Adjust the column and row gap.',
        'Optionally name grid areas by clicking cells.',
        'Preview the grid layout with placeholder items.',
        'Copy the generated CSS grid declaration.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Column and row count with size definitions.',
        'Support for fr, px, %, auto, and minmax() units.',
        'Gap controls for both column and row gaps.',
        'Named grid areas via visual cell selection.',
        'Live preview with resizable container.',
        'Complete CSS output including grid-template-areas.',
        'Runs locally in your browser.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Designing page layouts with header, sidebar, content, and footer.',
        'Creating responsive image galleries with consistent spacing.',
        'Building dashboard layouts with multiple panels.',
        'Prototyping grid-based designs before coding.',
        'Learning CSS Grid concepts with visual feedback.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Holy Grail Layout', description: 'header spanning full width, sidebar + content + aside in the middle row, footer spanning full width — classic web layout.' },
        { title: '3-Column Card Grid', description: 'grid-template-columns: repeat(3, 1fr); gap: 24px — equal-width card columns with consistent spacing.' },
        { title: 'Dashboard Layout', description: 'Two-column sidebar layout with grid-template-columns: 250px 1fr and named areas for nav, main, and footer.' },
        { title: 'Auto-Fill Gallery', description: 'grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)) — responsive grid that adapts to container width.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Grid Container', definition: 'The element with display: grid that creates a grid formatting context for its children.' },
        { term: 'Grid Item', definition: 'A direct child of a grid container placed into grid cells.' },
        { term: 'fr (Fraction Unit)', definition: 'A flexible unit that distributes available space proportionally among grid tracks.' },
        { term: 'Grid Template Areas', definition: 'A CSS property for naming regions of the grid, making layout code more readable.' },
        { term: 'Gap', definition: 'The spacing between grid tracks (rows and columns), also called gutters.' },
        { term: 'minmax()', definition: 'A CSS function defining a size range for grid tracks — a minimum and maximum value.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'What is the difference between fr and %?', answer: 'fr distributes free space after fixed tracks are sized. Percentages are based on the container size and do not account for gaps.' },
        { question: 'Can I mix units in a grid definition?', answer: 'Yes. grid-template-columns: 200px 1fr 1fr uses a fixed first column and two flexible columns.' },
        { question: 'How do I make a grid responsive?', answer: 'Use auto-fill or auto-fit with minmax() to let the browser adjust the number of columns based on available space.' },
        { question: 'When should I use Grid vs Flexbox?', answer: 'Use Grid for two-dimensional layouts (rows and columns). Use Flexbox for one-dimensional layouts (row or column).' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Use fr units for flexible columns that share available space.',
        'Name grid areas for layout clarity — especially for page-level layouts.',
        'Use minmax() with auto-fill for responsive grids without media queries.',
        'Keep gaps consistent across your design system using CSS custom properties.',
        'Test grid layouts across screen sizes to ensure responsiveness.',
        'Use the Firefox or Chrome Grid Inspector to debug grid layouts in the browser.'
      ]
    }
  },
  relatedTools: ['css-flexbox-playground', 'css-box-shadow-generator', 'css-units-converter', 'button-generator'],
  seo: {
    metaTitle: 'CSS Grid Generator — Visual Layout Builder | UnTrackt Wiki',
    metaDescription: 'Build CSS Grid layouts visually with columns, rows, gaps, and named areas. Live preview and copy-ready CSS for responsive page layouts.',
    keywords: ['css grid generator', 'css grid layout', 'grid builder', 'grid template', 'css layout tool', 'grid areas']
  }
};
