export default {
  id: 'text-to-uml',
  title: 'Text to UML Diagram',
  description: 'Generate UML sequence diagrams, class diagrams, and more from simple text descriptions using PlantUML-style syntax.',
  content: {
    whatIs: {
      heading: 'What is the Text to UML tool?',
      body: 'The Text to UML tool converts plain text descriptions into professional UML (Unified Modeling Language) diagrams. Using a simple, PlantUML-inspired syntax, you can define sequence diagrams, class diagrams, activity diagrams, and use case diagrams by writing human-readable text rather than manually placing shapes in a visual editor. The tool parses your text in real-time and renders a clean, standards-compliant UML diagram that you can export for documentation, presentations, and technical specifications.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'UML diagrams are essential for software design documentation, but creating them in visual editors is slow and maintenance-heavy. Every time a class changes or a new interaction is added, you must manually rearrange shapes and connections. With text-based UML, your diagrams are as easy to update as editing a text file -- change a line, and the diagram regenerates automatically. This approach also enables version control, code reviews for diagrams, and rapid iteration during design discussions.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Select the diagram type: sequence, class, activity, or use case.',
        'Write your diagram description using the PlantUML-style syntax in the text editor.',
        'View the rendered UML diagram in the preview panel as you type.',
        'Use the syntax reference panel for quick access to common diagram elements.',
        'Customize the appearance: theme, colors, font size, and layout direction.',
        'Export the diagram as SVG, PNG, or copy the text source for embedding in documentation.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Support for sequence diagrams, class diagrams, activity diagrams, and use case diagrams.',
        'Real-time rendering from PlantUML-style text syntax.',
        'Syntax highlighting and auto-completion in the text editor.',
        'Built-in syntax reference with examples for each diagram type.',
        'Customizable themes, colors, and diagram layout.',
        'Export as SVG, PNG, or copyable diagram source code.',
        'Zoom, pan, and fit-to-view controls for large diagrams.',
        'Client-side rendering -- no data sent to external servers.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Documenting API interactions with sequence diagrams for technical specifications.',
        'Modeling class relationships, inheritance, and composition for software design.',
        'Mapping out user flows and activity diagrams for feature planning.',
        'Creating use case diagrams for requirements gathering and stakeholder communication.',
        'Embedding UML diagrams in Markdown documentation (README, wikis, design docs).',
        'Rapid prototyping of system architecture during design meetings.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Sequence Diagram', description: 'Define "User -> Server: Login Request" and "Server -> Database: Validate" to create an authentication sequence diagram with message arrows.' },
        { title: 'Class Diagram', description: 'Define classes with attributes and methods, and use arrows for inheritance (--|>), composition (*--), and association (--).' },
        { title: 'Activity Diagram', description: 'Map out a user registration flow with start, actions, decision points, and end states using activity diagram syntax.' },
        { title: 'API Documentation', description: 'Model the request/response flow between a client, API gateway, authentication service, and database.' },
        { title: 'State Machine', description: 'Define states and transitions for a workflow: [*] --> Draft --> Review --> Approved --> [*].' },
        { title: 'Component Diagram', description: 'Show how frontend, backend, database, and external services relate in a system architecture.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'UML', definition: 'Unified Modeling Language -- a standardized visual modeling language for specifying, visualizing, and documenting software system artifacts.' },
        { term: 'Sequence Diagram', definition: 'A UML diagram showing how objects interact in a particular scenario by exchanging messages over time, read top-to-bottom.' },
        { term: 'Class Diagram', definition: 'A UML diagram showing classes, their attributes, methods, and the relationships (inheritance, composition, association) between them.' },
        { term: 'PlantUML', definition: 'A popular open-source text-based language for creating UML diagrams from plain text descriptions using a simple, intuitive syntax.' },
        { term: 'Lifeline', definition: 'A vertical dashed line in a sequence diagram representing the existence of a participant (object or actor) over time.' },
        { term: 'Message', definition: 'A horizontal arrow in a sequence diagram representing a communication (method call, request, signal) from one participant to another.' },
        { term: 'Actor', definition: 'An external entity (person, system) that interacts with the system being modeled, typically shown as a stick figure in use case diagrams.' },
        { term: 'Stereotype', definition: 'A UML extension mechanism that adds additional meaning to model elements, shown in double angle brackets like <<interface>> or <<abstract>>.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'Which UML diagram types are supported?', answer: 'The tool supports sequence diagrams, class diagrams, activity diagrams, use case diagrams, state diagrams, and component diagrams using PlantUML-style syntax.' },
        { question: 'Do I need to know PlantUML syntax?', answer: 'The syntax is beginner-friendly with a built-in reference panel and examples. Basic diagrams can be created with just a few lines of intuitive text like "User -> Server: Request".' },
        { question: 'Can I export diagrams for documentation?', answer: 'Yes. Export as SVG for scalable, high-quality diagrams in documentation, or PNG for embedding in presentations and wikis.' },
        { question: 'Is the rendering done locally?', answer: 'Yes. Diagram rendering happens entirely in your browser. No data is sent to external PlantUML servers.' },
        { question: 'Can I version-control my diagrams?', answer: 'Absolutely. Since diagrams are defined as text, you can store the source in git, review changes in pull requests, and track diagram evolution alongside code.' },
        { question: 'How complex can diagrams be?', answer: 'The tool handles diagrams with dozens of participants and hundreds of messages. For very large diagrams, use the zoom and fit-to-view controls for navigation.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Use sequence diagrams for interactions between components -- they are the most commonly used UML diagram type.',
        'Keep diagrams focused on a single scenario or use case rather than trying to show everything in one diagram.',
        'Use meaningful names for participants and messages that reflect the actual code or system components.',
        'Add notes and annotations to explain complex interactions or business rules.',
        'Store diagram source text alongside your code for easy maintenance and version control.',
        'Use the syntax reference to discover less common features like loops, alt blocks, and grouping.',
        'Export diagrams as SVG for high-quality rendering at any size in technical documentation.',
        'Start simple -- create a minimal diagram first, then add detail incrementally.'
      ]
    }
  },
  relatedTools: ['text-to-flowchart', 'markdown-previewer', 'json-formatter', 'text-diff-checker', 'lorem-ipsum-generator'],
  seo: {
    metaTitle: 'Text to UML Diagram - Generate UML from Text | UnTrackt Wiki',
    metaDescription: 'Generate UML sequence diagrams, class diagrams, and more from simple text descriptions. PlantUML-style syntax with real-time rendering and SVG export.',
    keywords: ['text to uml', 'uml generator', 'sequence diagram generator', 'class diagram generator', 'plantuml online', 'uml from text', 'uml diagram maker', 'uml tool']
  }
};
