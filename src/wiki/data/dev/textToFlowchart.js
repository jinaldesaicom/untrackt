export default {
  id: 'text-to-flowchart',
  title: 'Text to Flowchart',
  description: 'Convert plain text outlines and indented lists into visual flowcharts, org charts, and tree diagrams instantly.',
  content: {
    whatIs: {
      heading: 'What is the Text to Flowchart tool?',
      body: 'The Text to Flowchart tool transforms plain text descriptions, indented lists, and structured outlines into visual flowcharts, organizational charts, and tree diagrams. Instead of manually placing shapes and drawing connections in a diagramming application, you simply type your content with indentation to define hierarchy and relationships. The tool parses the text structure and generates a clean, professional-looking diagram that can be exported as SVG, PNG, or copied as code for further editing.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Creating diagrams in visual editors is time-consuming and tedious -- dragging shapes, aligning connections, and resizing elements takes far longer than simply writing the content. This tool lets you think in text and see diagrams instantly. It is perfect for rapid prototyping, brainstorming, documentation, and communicating hierarchical structures without the overhead of dedicated diagramming software.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Type or paste your text outline in the editor, using indentation to define hierarchy.',
        'Each indented line becomes a child node of the line above it.',
        'Select the diagram type: flowchart, org chart, tree, or mind map.',
        'Customize the appearance: colors, shapes, layout direction, and connector style.',
        'View the generated diagram in the preview panel in real-time.',
        'Export the diagram as SVG, PNG, or copy the diagram code for use in other tools.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Convert indented text to flowcharts, org charts, and tree diagrams.',
        'Real-time preview that updates as you type.',
        'Multiple layout directions: top-down, left-right, bottom-up, and radial.',
        'Customizable node shapes, colors, and connector styles.',
        'Auto-layout with collision avoidance for clean, readable diagrams.',
        'Export as SVG (scalable), PNG (raster), or clipboard-friendly code.',
        'Support for special syntax: decision nodes, start/end markers, and annotations.',
        'Zoom, pan, and fit-to-screen controls for large diagrams.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Visualizing project structures and file hierarchies as tree diagrams.',
        'Creating organizational charts for teams and reporting structures.',
        'Mapping out decision flows for business processes and user journeys.',
        'Quickly sketching algorithm flowcharts during coding and design sessions.',
        'Documenting API endpoint hierarchies and navigation structures.',
        'Creating presentation diagrams from simple text outlines.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'File Tree', description: 'Indent folder and file names to create a visual project file tree, showing the hierarchy of directories and files.' },
        { title: 'Org Chart', description: 'Type "CEO" at the top, indent "CTO" and "CFO" below, then further indent department heads to create an organizational chart.' },
        { title: 'Decision Flow', description: 'Map out a user login flow: Start → Enter Credentials → [Valid?] → Yes: Dashboard / No: Error → Retry.' },
        { title: 'Navigation Structure', description: 'Outline a website navigation menu as indented text to visualize the page hierarchy and information architecture.' },
        { title: 'Algorithm Steps', description: 'Describe a sorting algorithm as indented steps, with conditional branches shown as decision nodes.' },
        { title: 'Mind Map', description: 'Start with a central topic and add indented subtopics to generate a radial mind map for brainstorming sessions.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Flowchart', definition: 'A diagram that represents a workflow or process using standardized shapes (rectangles for steps, diamonds for decisions, ovals for start/end).' },
        { term: 'Node', definition: 'A single element in a diagram -- a shape containing text that represents a step, entity, or concept.' },
        { term: 'Edge', definition: 'A connection line between two nodes representing a relationship, flow direction, or dependency.' },
        { term: 'Org Chart', definition: 'An organizational chart -- a hierarchical diagram showing the structure of an organization, team, or reporting relationships.' },
        { term: 'Tree Diagram', definition: 'A hierarchical diagram where each node has zero or more child nodes, branching outward from a single root node.' },
        { term: 'Indentation', definition: 'The use of spaces or tabs at the beginning of a line to indicate hierarchy level -- deeper indentation means deeper nesting in the diagram.' },
        { term: 'Layout Direction', definition: 'The primary direction of the diagram flow: top-to-bottom (TB), left-to-right (LR), bottom-to-top (BT), or right-to-left (RL).' },
        { term: 'Auto-Layout', definition: 'An algorithm that automatically positions and spaces nodes to create a clean, readable diagram without manual arrangement.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'What determines the hierarchy?', answer: 'Indentation levels determine parent-child relationships. Each level of indentation (2 spaces or 1 tab) creates a new child level under the parent line above.' },
        { question: 'Can I create decision branches?', answer: 'Yes. Use special syntax like [?] or brackets to mark decision nodes. Child nodes with "Yes:" and "No:" prefixes create branching paths.' },
        { question: 'What export formats are available?', answer: 'Export as SVG for scalable vector graphics, PNG for raster images, or copy the underlying diagram code (Mermaid, DOT) for use in other tools.' },
        { question: 'How large can diagrams be?', answer: 'The tool handles diagrams with hundreds of nodes. Very large diagrams may require zooming and panning for navigation.' },
        { question: 'Can I customize colors and shapes?', answer: 'Yes. You can set custom colors for nodes and edges, choose shape types (rectangle, circle, diamond, oval), and adjust connector styles (solid, dashed, arrow type).' },
        { question: 'Is this the same as Mermaid.js?', answer: 'This tool provides a simpler, text-based input format focused on indentation. The output can be exported in Mermaid-compatible syntax if you need to embed it in Markdown documentation.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Use consistent indentation (prefer 2 spaces per level) for clean, predictable diagram output.',
        'Keep node text concise -- long labels make diagrams cluttered and hard to read.',
        'Use top-down layout for process flows and left-right layout for timelines and hierarchies.',
        'Break complex diagrams into smaller sub-diagrams for clarity.',
        'Use decision nodes sparingly -- too many branches make flowcharts hard to follow.',
        'Export as SVG for documentation and presentations -- it scales perfectly at any size.',
        'Review the auto-layout output and adjust the layout direction if the default does not work well for your content.',
        'Color-code different categories or departments in org charts for visual clarity.'
      ]
    }
  },
  relatedTools: ['text-to-uml', 'markdown-previewer', 'lorem-ipsum-generator', 'text-diff-checker', 'json-formatter'],
  seo: {
    metaTitle: 'Text to Flowchart - Generate Diagrams from Text | UnTrackt Wiki',
    metaDescription: 'Convert plain text outlines into visual flowcharts, org charts, and tree diagrams. Type with indentation and get instant, exportable diagrams.',
    keywords: ['text to flowchart', 'flowchart generator', 'text to diagram', 'org chart generator', 'tree diagram', 'diagram from text', 'flowchart maker', 'indentation to diagram']
  }
};
