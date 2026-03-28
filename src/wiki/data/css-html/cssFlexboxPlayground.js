export default {
  id: 'css-flexbox-playground',
  title: 'CSS Flexbox Playground',
  description: 'Interactive flexbox visualizer — toggle direction, wrap, justify, align, and gap to see the layout update live.',
  content: {
    whatIs: {
      heading: 'What is the CSS Flexbox Playground?',
      body: 'The CSS Flexbox Playground is an interactive tool for experimenting with CSS Flexbox layouts. Toggle flex-direction, flex-wrap, justify-content, align-items, align-content, and gap values, and watch child elements rearrange in real time. It generates copy-ready CSS for both the container and items, making it easy to nail down the exact layout you need.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Flexbox has many properties that interact in non-obvious ways. Reading documentation explains what each property does individually, but seeing them combine visually builds real understanding. This playground eliminates the edit-save-refresh cycle and helps both learners and experienced developers prototype layouts quickly.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Set the flex container properties: direction, wrap, justify-content, align-items.',
        'Add or remove child items to test different quantities.',
        'Adjust individual item properties: flex-grow, flex-shrink, flex-basis, order.',
        'Set gap values for spacing between items.',
        'Observe the live preview updating with each change.',
        'Copy the generated CSS for container and items.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Full container property controls: direction, wrap, justify-content, align-items, align-content.',
        'Per-item property controls: grow, shrink, basis, order, align-self.',
        'Adjustable gap for modern flex spacing.',
        'Add/remove child items dynamically.',
        'Live visual preview with responsive container.',
        'Generated CSS output for both container and items.',
        'Runs entirely in your browser.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Prototyping navigation bar layouts with flexbox.',
        'Centering elements horizontally and vertically.',
        'Creating responsive card grids without CSS Grid.',
        'Learning how flexbox properties interact.',
        'Debugging a flexbox layout by reproducing it visually.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Centered Content', description: 'justify-content: center; align-items: center — perfectly centers a single child in the container.' },
        { title: 'Space Between Nav', description: 'flex-direction: row; justify-content: space-between — logo on the left, nav on the right.' },
        { title: 'Wrapping Cards', description: 'flex-wrap: wrap; gap: 16px — cards flow to the next row when the container width is exceeded.' },
        { title: 'Sticky Footer', description: 'flex-direction: column; flex-grow on main content pushes the footer to the bottom.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Flex Container', definition: 'The parent element with display: flex that establishes a flex formatting context for its children.' },
        { term: 'Flex Item', definition: 'A direct child of a flex container that participates in the flex layout.' },
        { term: 'Main Axis', definition: 'The primary axis along which flex items are laid out, determined by flex-direction (row or column).' },
        { term: 'Cross Axis', definition: 'The axis perpendicular to the main axis.' },
        { term: 'flex-grow', definition: 'Determines how much a flex item should grow relative to other items when extra space is available.' },
        { term: 'flex-basis', definition: 'The initial size of a flex item before growing or shrinking is applied.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'When should I use Flexbox vs Grid?', answer: 'Use Flexbox for one-dimensional layouts (row OR column). Use Grid for two-dimensional layouts (rows AND columns simultaneously).' },
        { question: 'What is the difference between justify-content and align-items?', answer: 'justify-content aligns items along the main axis. align-items aligns items along the cross axis.' },
        { question: 'Does gap work with Flexbox?', answer: 'Yes. The gap property is supported in Flexbox in all modern browsers.' },
        { question: 'How do I make all items equal width?', answer: 'Set flex: 1 on all items so they grow equally to fill the container.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Use gap instead of margins for spacing between flex items.',
        'Prefer flex shorthand (flex: 1) over individual grow/shrink/basis properties for readability.',
        'Test layouts with different numbers of items to ensure they handle dynamic content.',
        'Use min-width: 0 on flex items to prevent content overflow.',
        'Combine flex-wrap with a flex-basis to create responsive layouts without media queries.',
        'Use align-self for individual item alignment exceptions.'
      ]
    }
  },
  relatedTools: ['css-grid-generator', 'css-box-shadow-generator', 'button-generator', 'css-units-converter'],
  seo: {
    metaTitle: 'CSS Flexbox Playground — Interactive Layout Visualizer | UnTrackt Wiki',
    metaDescription: 'Experiment with CSS Flexbox layouts interactively. Toggle direction, wrap, justify, align, and gap properties with live visual preview and copy-ready CSS.',
    keywords: ['css flexbox', 'flexbox playground', 'flexbox visualizer', 'flex layout', 'css layout tool', 'flexbox generator']
  }
};
