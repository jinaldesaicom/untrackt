export default {
  id: 'kanban-board',
  title: 'Kanban Board',
  description: 'Visualize your workflow with customizable columns, drag-and-drop cards, and agile task management.',
  content: {
    whatIs: {
      heading: 'What is the Kanban Board?',
      body: 'The Kanban Board is a visual project management tool based on the Kanban method. It organizes tasks into columns representing stages of a workflow--typically "To Do," "In Progress," and "Done." You move cards between columns as work progresses, giving you a clear, real-time view of where everything stands.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Kanban boards make workflows visible, limit work in progress, and help you identify bottlenecks. By seeing all tasks at a glance, you can balance workload, spot blockers early, and maintain a steady flow of completed work. The Kanban method is used by teams at companies like Toyota, Spotify, and Microsoft for exactly these reasons.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Start with the default columns (To Do, In Progress, Done) or customize them to fit your workflow.',
        'Click "Add Card" in any column to create a new task card.',
        'Write a title and optional description for the card.',
        'Drag and drop cards between columns as work progresses.',
        'Add labels or color tags to categorize cards.',
        'Archive or delete completed cards to keep the board clean.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Customizable columns to match any workflow',
        'Drag-and-drop cards between columns',
        'Card labels and color-coded categories',
        'Card descriptions for additional detail',
        'Work-in-progress limits per column',
        'Persistent board state saved locally',
        'Add, edit, archive, and delete cards easily'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Managing software development sprints and feature backlogs',
        'Tracking content creation workflows from ideation to publication',
        'Organizing personal projects with clear stages',
        'Managing hiring pipelines: applied, interviewed, offered, hired',
        'Planning events with stages like research, booking, and execution',
        'Tracking bug reports through triage, fix, and verification stages'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Software Sprint Board', description: 'Columns for Backlog, In Development, Code Review, Testing, and Done to track features through each development stage.' },
        { title: 'Content Pipeline', description: 'Columns for Ideas, Drafting, Editing, Ready to Publish, and Published to manage blog posts or social media content.' },
        { title: 'Job Application Tracker', description: 'Track applications through Applied, Phone Screen, Interview, Offer, and Decision columns.' },
        { title: 'Home Renovation Project', description: 'Organize tasks into Planning, Purchasing, In Progress, and Completed for a room-by-room renovation.' },
        { title: 'Weekly Household Chores', description: 'Columns for To Do, In Progress, and Done that reset weekly for recurring household tasks.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Kanban', definition: 'A Japanese word meaning "visual signal." The Kanban method uses visual boards to manage and optimize workflow.' },
        { term: 'Column', definition: 'A vertical section of the board representing a stage in your workflow.' },
        { term: 'Card', definition: 'A single task or work item displayed on the board that moves between columns.' },
        { term: 'WIP Limit', definition: 'Work-in-Progress limit--a cap on the number of items allowed in a column at one time to prevent overload.' },
        { term: 'Swimlane', definition: 'A horizontal row used to categorize cards by project, priority, or team member.' },
        { term: 'Backlog', definition: 'A column or list of tasks that have been identified but not yet started.' },
        { term: 'Bottleneck', definition: 'A stage in the workflow where tasks accumulate, indicating a slowdown or constraint.' },
        { term: 'Throughput', definition: 'The number of tasks completed within a given time period, measuring productivity flow.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'How many columns can I create?', answer: 'You can create as many columns as your workflow requires. Common setups use 3 to 6 columns.' },
        { question: 'Can I set WIP limits?', answer: 'Yes. You can set a maximum number of cards per column to enforce work-in-progress limits.' },
        { question: 'Is the board saved automatically?', answer: 'Yes. All cards, columns, and positions are saved in local storage automatically.' },
        { question: 'Can I add details to a card?', answer: 'Yes. Each card supports a title and description where you can add additional context.' },
        { question: 'How do I reorder cards within a column?', answer: 'Drag a card up or down within its column to reorder it by priority.' },
        { question: 'Can I use this for team projects?', answer: 'The board works locally for personal use. For team collaboration, consider using it as a personal view alongside your team tools.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Start simple with three columns (To Do, In Progress, Done) and add more only when needed.',
        'Set WIP limits to avoid multitasking--focus on finishing tasks before starting new ones.',
        'Write clear, specific card titles that describe the outcome, not just the activity.',
        'Move cards as soon as status changes to keep the board accurate and useful.',
        'Review the board daily to identify stuck cards and address blockers.',
        'Use labels or colors consistently to categorize cards by type, priority, or owner.',
        'Archive completed cards regularly to reduce visual noise and maintain focus.',
        'Limit your backlog to prevent it from becoming an overwhelming wish list.'
      ]
    }
  },
  relatedTools: ['todo-list', 'daily-planner', 'okr-planner', 'project-scope-definer'],
  seo: {
    metaTitle: 'Kanban Board - Visual Workflow & Task Management | Untrackt',
    metaDescription: 'Organize tasks in a visual Kanban board with customizable columns and drag-and-drop cards. Track workflow, limit WIP, and boost productivity.',
    keywords: ['kanban board', 'task management', 'agile board', 'workflow management', 'drag and drop tasks', 'project management', 'kanban method']
  }
};
