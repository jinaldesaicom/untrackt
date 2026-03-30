export default {
  id: 'graph-plotter',
  title: 'Graph Plotter',
  description: 'Plot mathematical functions — enter equations and see them graphed on a coordinate plane with zoom and trace.',
  content: {
    whatIs: {
      heading: 'What is the Graph Plotter?',
      body: 'The Graph Plotter renders mathematical functions on an interactive coordinate plane. Enter one or more equations (y = f(x)) and see them plotted in real time. Zoom, pan, trace points along curves, find intersections, and identify key features like roots, maxima, and minima.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Visualizing functions is essential for understanding their behavior — where they cross zero, how fast they grow, and how multiple functions relate to each other. This tool provides instant graphing without installing any software, making it ideal for coursework, teaching, and exploration.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Enter a function like y = x^2 - 4 or y = sin(x).',
        'Add additional functions for comparison.',
        'Adjust the x and y axis range.',
        'Zoom and pan to explore the graph.',
        'Trace along curves to read specific values.',
        'Identify roots, maxima, and intersections.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Plot multiple functions simultaneously.',
        'Interactive zoom and pan.',
        'Point tracing along curves.',
        'Root and intersection finder.',
        'Color-coded function lines.',
        'Gridlines and axis labels.',
        'Custom axis ranges and scales.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Visualizing algebra and calculus functions.',
        'Comparing multiple functions graphically.',
        'Finding approximate roots and intersections visually.',
        'Exploring function transformations (shifts, stretches).',
        'Teaching and demonstrating mathematical concepts.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Parabola', description: 'y = x² — a U-shaped curve with vertex at the origin.' },
        { title: 'Sine Wave', description: 'y = sin(x) — oscillating between -1 and 1 with period 2π.' },
        { title: 'Intersection', description: 'Plot y = x and y = x² to find intersection points at (0,0) and (1,1).' },
        { title: 'Exponential vs Linear', description: 'Plot y = 2^x and y = 10x to see exponential growth overtaking linear.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Function', definition: 'A rule that assigns exactly one output value to each input value.' },
        { term: 'Root / Zero', definition: 'An x-value where the function equals zero (where the graph crosses the x-axis).' },
        { term: 'Domain', definition: 'The set of all valid input (x) values for a function.' },
        { term: 'Range', definition: 'The set of all possible output (y) values of a function.' },
        { term: 'Asymptote', definition: 'A line that the graph approaches but never reaches.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'What functions can I plot?', answer: 'Polynomials, trig functions, exponentials, logarithms, absolute value, and compositions like sin(x²).' },
        { question: 'Can I plot parametric or polar curves?', answer: 'The tool focuses on y = f(x) Cartesian functions.' },
        { question: 'How do I find exact intersection points?', answer: 'Use the trace tool to approximate, or solve algebraically using the Equation Solver.' },
        { question: 'Can I save or export graphs?', answer: 'Export the graph as an image for use in documents and presentations.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Start with a wide view, then zoom into areas of interest.',
        'Plot multiple related functions together for comparison.',
        'Use the trace tool to read exact coordinates.',
        'Adjust axis ranges to match the function\'s interesting domain and range.',
        'Color-code functions differently for clarity when plotting multiple.',
        'Use the graph to build intuition before doing algebraic analysis.'
      ]
    }
  },
  relatedTools: ['equation-solver', 'polynomial-calculator', 'trigonometry-calculator', 'calculus-reference-tool'],
  seo: {
    metaTitle: 'Graph Plotter — Plot Mathematical Functions | UnTrackt Wiki',
    metaDescription: 'Plot mathematical functions interactively. Enter equations, zoom, trace curves, find roots and intersections on a coordinate plane.',
    keywords: ['graph plotter', 'function plotter', 'plot equations', 'graphing calculator', 'math graph', 'function visualizer']
  }
};
