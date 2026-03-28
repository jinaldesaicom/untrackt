export default {
  id: 'story-mapping-tool',
  title: 'Story Mapping Tool',
  description: 'Create user story maps to visualize product features and plan release slicing across user activities.',
  content: {
    whatIs: {
      heading: 'What is the Story Mapping Tool?',
      body: 'The Story Mapping Tool lets you organize user stories visually along two axes: user activities (horizontal) and priority/detail (vertical). The top row shows the user\'s journey through the product, while rows beneath contain increasingly detailed stories. Horizontal slices represent potential releases, making it easy to plan minimum viable products and incremental delivery.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'A flat backlog loses context. Story mapping restores the big picture by arranging stories along the user journey, making it obvious when a critical activity has no stories or when low-priority work is crowding out essentials. It is the best technique for release planning because you can literally draw a line across the map to define an MVP.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Define the user activities across the top (e.g., Browse, Search, Purchase, Review).',
        'Under each activity, add user stories from high to low priority.',
        'Drag stories to reorder priority within each activity.',
        'Draw horizontal release lines to define MVP and subsequent releases.',
        'Review the map for gaps — activities with no stories above the release line.',
        'Export the map for team discussion and planning.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Two-dimensional map with activities (columns) and priority (rows).',
        'Drag-and-drop story arrangement.',
        'Release line slicing for MVP and incremental delivery planning.',
        'Color-coded stories by status or category.',
        'Activity grouping for large products.',
        'Export as image or JSON for sharing.',
        'Client-side only — all data stays in your browser.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Defining the MVP for a new product by slicing the story map.',
        'Identifying gaps in backlog coverage across user activities.',
        'Release planning workshops with the product team.',
        'Onboarding new team members to the product\'s feature landscape.',
        'Prioritization discussions with stakeholders.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'E-Commerce MVP', description: 'Activities: Browse, Search, Cart, Checkout, Account. MVP line includes basic browse, search, cart, and checkout — account management deferred to Release 2.' },
        { title: 'SaaS Onboarding', description: 'Activities: Signup, Setup, First Use, Explore, Upgrade. MVP covers signup through first use; explore and upgrade are Release 2.' },
        { title: 'Gap Detection', description: 'The map reveals the "Error Handling" activity has no stories above the release line — team adds critical error stories to MVP.' },
        { title: 'Feature Prioritization', description: 'Stakeholders move a "Social Sharing" activity below the first release line after seeing it is not essential for launch.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Story Map', definition: 'A two-dimensional arrangement of user stories showing user activities horizontally and priority vertically.' },
        { term: 'Activity', definition: 'A high-level task or goal the user performs, forming the top row of the story map.' },
        { term: 'Backbone', definition: 'The top row of activities representing the user\'s end-to-end journey through the product.' },
        { term: 'Walking Skeleton', definition: 'The thinnest possible end-to-end slice through the story map that makes the product minimally functional.' },
        { term: 'Release Slice', definition: 'A horizontal line across the map defining which stories are included in a particular release.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'How is a story map different from a flat backlog?', answer: 'A flat backlog is a prioritized list. A story map adds a second dimension (user activities) that preserves context and makes gaps visible.' },
        { question: 'Who should participate in story mapping?', answer: 'The Product Owner, developers, designers, and any stakeholder who understands the user journey.' },
        { question: 'How often should I update the story map?', answer: 'Review it during major planning events (quarterly planning, release planning). Keep it alive as the source of truth for the product backlog.' },
        { question: 'Can I use this with Scrum and Kanban?', answer: 'Yes. Story mapping is framework-agnostic. It is a product discovery and planning technique, not a delivery methodology.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Start with the user journey, not with a list of features.',
        'Keep the backbone to 5-10 activities to maintain clarity.',
        'Slice releases as thin as possible — deliver value early and often.',
        'Use color coding to distinguish story status and categories.',
        'Review the map with real users or user research to validate the journey.',
        'Treat the map as a living document, not a one-time exercise.'
      ]
    }
  },
  relatedTools: ['user-story-builder', 'epic-breakdown-assistant', 'sprint-planner', 'release-planning-calculator'],
  seo: {
    metaTitle: 'Story Mapping Tool — Visualize Features & Plan Releases | UnTrackt Wiki',
    metaDescription: 'Create user story maps to visualize product features across user activities. Plan MVP and release slicing with a drag-and-drop story map.',
    keywords: ['story mapping', 'user story map', 'mvp planning', 'release slicing', 'product backlog', 'agile story map']
  }
};
