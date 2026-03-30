export default {
  id: 'mind-map',
  title: 'Mind Map',
  description: 'Visual mind mapping tool with unlimited depth, auto-layout, multiple maps, and SVG export.',
  content: {
    whatIs: {
      heading: 'What is the Mind Map Tool?',
      body: 'The Mind Map tool is a visual brainstorming and organization tool that lets you create branching diagrams from a central topic. Add child nodes, nest ideas to any depth, rearrange branches, and see your thoughts organized in a radial tree layout rendered as interactive SVG. You can manage multiple maps, customize branch colors, zoom and pan the canvas, and export your mind maps as SVG or Markdown.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Linear note-taking forces ideas into a sequential structure that does not match how the brain works. Mind maps mirror the associative, branching nature of thought--making it easier to capture ideas quickly, see connections, and organize complex topics. Research from the University of Nottingham shows that mind mapping improves memory retention by 10-15% compared to conventional notes, and helps with creative problem-solving by making relationships between concepts visible.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Start with a central topic--click the root node to edit its text.',
        'Add child nodes by selecting a node and clicking the + button or pressing Tab.',
        'Edit any node by double-clicking it or pressing Enter while selected.',
        'Delete nodes with the trash button or Delete key--children are removed with the parent.',
        'Zoom in/out with the zoom controls or mouse wheel, and pan by dragging the canvas.',
        'Create additional maps from the map manager, and switch between them.',
        'Export the current map as SVG for presentations or as Markdown for documentation.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Unlimited node depth for deeply nested idea hierarchies.',
        'Automatic radial tree layout with smooth curved branch connections.',
        'Multiple mind maps with a map manager for organizing different topics.',
        'Color-coded branches that auto-assign distinct colors per top-level branch.',
        'Interactive SVG canvas with zoom, pan, and node selection.',
        'Keyboard shortcuts: Tab (add child), Enter (edit), Delete (remove), arrow keys (navigate).',
        'Export as SVG image or Markdown text.',
        'Collapse/expand branches to focus on specific areas.',
        'Auto-save to local storage--maps persist across browser sessions.',
        'Print-ready output with the print button.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Brainstorming ideas for projects, articles, or product features.',
        'Organizing study notes around a central topic with subtopics.',
        'Planning project structures with tasks branching from major workstreams.',
        'Mapping out presentation outlines before building slides.',
        'Capturing meeting discussions in a visual, non-linear format.',
        'Breaking down complex problems into manageable sub-components.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Product Feature Map', description: 'Central topic: "Mobile App v2.0". Branches: Authentication, Dashboard, Notifications, Settings. Each branch has child nodes for specific features and sub-features.' },
        { title: 'Study Notes', description: 'Central topic: "World War II". Branches for Causes, Key Events, Major Figures, Aftermath. Sub-branches add depth: Causes → Economic → Great Depression, Treaty of Versailles.' },
        { title: 'Blog Post Planning', description: 'Central topic: "Remote Work Guide". Branches: Tools, Communication, Productivity, Work-Life Balance. Each branch lists 3-5 specific sub-points to cover in the article.' },
        { title: 'Meeting Recap', description: 'Central topic: "Q2 Planning Meeting". Branches for each agenda item with child nodes capturing decisions, action items, and owners.' },
        { title: 'Problem Decomposition', description: 'Central topic: "Why is the build slow?". Branches: Dependencies, Compilation, Tests, CI Config. Sub-branches explore specific causes under each area.' },
        { title: 'Personal Goal Setting', description: 'Central topic: "2026 Goals". Branches: Career, Health, Finance, Learning. Each has 2-3 child nodes with specific measurable targets.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Mind Map', definition: 'A diagram that visually organizes information around a central concept, with related ideas branching outward in a radial tree structure.' },
        { term: 'Root Node', definition: 'The central topic of the mind map from which all other nodes branch.' },
        { term: 'Child Node', definition: 'A node connected to a parent node, representing a sub-idea or detail related to the parent concept.' },
        { term: 'Branch', definition: 'A connected path from the root through parent and child nodes, representing a line of thought or topic area.' },
        { term: 'Radial Layout', definition: 'An automatic arrangement where branches spread outward from the center in a circular pattern, preventing overlap.' },
        { term: 'Collapse/Expand', definition: 'Hiding or showing the children of a node to simplify the view or focus on a specific branch.' },
        { term: 'SVG Export', definition: 'Saving the mind map as a Scalable Vector Graphics file that can be embedded in documents, slides, or web pages.' },
        { term: 'Map Manager', definition: 'The interface for creating, switching between, renaming, and deleting multiple mind maps.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'Is there a limit to how many nodes I can add?', answer: 'No hard limit. The tool handles hundreds of nodes comfortably. Very large maps (1,000+ nodes) may see slower rendering.' },
        { question: 'Can I have multiple mind maps?', answer: 'Yes. Use the map manager to create, rename, and switch between as many maps as you need.' },
        { question: 'Is my data saved automatically?', answer: 'Yes. Changes are auto-saved to your browser local storage. Your maps persist across sessions.' },
        { question: 'Can I export my mind map?', answer: 'Yes. Export as SVG for visual use in documents and presentations, or as Markdown for text-based documentation.' },
        { question: 'How do I navigate a large mind map?', answer: 'Use mouse wheel to zoom, drag to pan, and the Fit to View button to center the entire map. Collapse branches you are not focusing on.' },
        { question: 'Can I change branch colors?', answer: 'Colors are automatically assigned per top-level branch from a curated palette. The root node uses a neutral color.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Start with a clear, concise central topic--keep it to 2-5 words.',
        'Use short phrases for nodes rather than long sentences--mind maps are for structure, not prose.',
        'Limit top-level branches to 5-7 for readability; add depth with child nodes instead.',
        'Use the collapse feature to hide completed or less-relevant branches while focusing on active areas.',
        'Export as SVG before important meetings or presentations for a polished visual aid.',
        'Create separate maps for different projects or contexts rather than one giant map.',
        'Review and reorganize your mind map periodically--move nodes between branches as your understanding evolves.',
        'Use keyboard shortcuts (Tab, Enter, Delete, arrows) for the fastest workflow.'
      ]
    }
  },
  relatedTools: ['brain-dump-capture', 'eisenhower-matrix', 'project-scope-definer', 'kanban-board', 'decision-matrix'],
  seo: {
    metaTitle: 'Mind Map - Visual Brainstorming & Idea Organization | Wiki | UnTrackt',
    metaDescription: 'Create visual mind maps with unlimited depth, auto-layout, multiple maps, and SVG export. Free browser-based mind mapping tool for brainstorming and planning.',
    keywords: ['mind map', 'mind mapping', 'brainstorming', 'visual thinking', 'idea organization', 'concept map', 'diagram tool', 'SVG mind map']
  }
}
