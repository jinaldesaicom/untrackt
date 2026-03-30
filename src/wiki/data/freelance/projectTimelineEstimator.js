export default {
  id: 'project-timeline-estimator',
  title: 'Project Timeline Estimator',
  description:
    'Plan and visualize project schedules with task dependencies, milestones, and critical path analysis for accurate delivery estimates.',
  content: {
    whatIs: {
      heading: 'What is the Project Timeline Estimator?',
      body: 'The Project Timeline Estimator is a lightweight project planning tool that helps freelancers and small teams break work into tasks, define dependencies, assign durations, and generate a realistic delivery schedule. It identifies the critical path--the longest chain of dependent tasks--so you know exactly which activities drive your deadline. Whether you are quoting a new client or managing an active engagement, this tool turns rough estimates into a structured, defensible timeline.',
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Underestimating project timelines is one of the most common and costly mistakes freelancers make. It leads to missed deadlines, scope creep, burnout, and damaged client relationships. This tool forces you to think through every phase of a project, surface hidden dependencies, and add appropriate buffers. The visual timeline view makes it easy to communicate schedules to clients and stakeholders, reducing back-and-forth about when deliverables will arrive.',
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'List all tasks or phases required to complete the project.',
        'Estimate the duration of each task in hours or days.',
        'Define dependencies--which tasks must finish before others can start.',
        'Mark key milestones such as client reviews, approvals, or payment gates.',
        'Run the estimator to generate the timeline and identify the critical path.',
        'Add buffer time to high-risk tasks and review the final projected delivery date.',
      ],
    },
    features: {
      heading: 'Key Features',
      items: [
        'Task dependency mapping with finish-to-start, start-to-start, and finish-to-finish relationships.',
        'Critical path highlighting to identify schedule-driving tasks.',
        'Milestone markers for key deliverables and client checkpoints.',
        'Buffer and contingency time settings per task or for the entire project.',
        'Visual Gantt-style timeline view for presentations and proposals.',
        'Drag-and-drop task reordering and duration adjustment.',
        'Export timeline as image or PDF for client-facing documentation.',
      ],
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Estimating delivery dates during the proposal and scoping phase.',
        'Creating a shared project schedule for clients to track progress.',
        'Identifying bottleneck tasks that could delay the entire project.',
        'Comparing optimistic, realistic, and pessimistic timeline scenarios.',
        'Coordinating handoffs between multiple freelancers or subcontractors.',
      ],
    },
    examples: {
      heading: 'Examples',
      items: [
        {
          title: 'Website Redesign',
          description:
            'Discovery (3 days) → Wireframing (5 days) → Design (8 days) → Client Review (3 days) → Development (12 days) → QA (4 days) → Launch (1 day). Total: 36 working days. Critical path runs through Design and Development.',
        },
        {
          title: 'Brand Identity Package',
          description:
            'Research (2 days), Mood Board (2 days), Logo Concepts (5 days), Revisions (3 days), Collateral Design (4 days), Style Guide (3 days). With dependencies, the critical path is 19 days.',
        },
        {
          title: 'Mobile App MVP',
          description:
            'Requirements (5 days) → API Design (4 days) → UI Design (6 days, parallel with API) → Front-End Dev (15 days) → Back-End Dev (12 days, parallel) → Integration (5 days) → Testing (7 days) → Deployment (2 days). Critical path: 39 days.',
        },
        {
          title: 'Content Marketing Campaign',
          description:
            'Strategy (3 days) → Content Calendar (2 days) → Writing (10 days) → Editing (4 days) → Graphics (5 days, parallel with Editing) → Publishing (2 days). Critical path: 21 days.',
        },
        {
          title: 'E-Commerce Store Setup',
          description:
            'Platform Selection (2 days) → Theme Customization (5 days) → Product Upload (4 days, parallel) → Payment Integration (3 days) → Testing (3 days) → Go-Live (1 day). Total critical path: 14 days.',
        },
        {
          title: 'Three-Point Estimate',
          description:
            'For a copywriting project: Optimistic (8 days), Most Likely (12 days), Pessimistic (20 days). The PERT estimate is (8 + 4×12 + 20) / 6 ≈ 12.7 days.',
        },
      ],
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        {
          term: 'Critical Path',
          definition:
            'The longest sequence of dependent tasks that determines the minimum project duration. Any delay on the critical path delays the entire project.',
        },
        {
          term: 'Dependency',
          definition:
            'A relationship between tasks where one must complete (or start) before another can begin.',
        },
        {
          term: 'Milestone',
          definition:
            'A significant checkpoint in the project timeline, such as a deliverable handoff or client approval.',
        },
        {
          term: 'Buffer (Contingency)',
          definition:
            'Extra time added to a task or project to absorb unexpected delays without pushing the deadline.',
        },
        {
          term: 'Gantt Chart',
          definition:
            'A horizontal bar chart that visualizes tasks along a timeline, showing start dates, end dates, and dependencies.',
        },
        {
          term: 'PERT Estimate',
          definition:
            'A weighted average of optimistic, most likely, and pessimistic time estimates used to produce a realistic duration.',
        },
        {
          term: 'Scope Creep',
          definition:
            'The gradual expansion of a project beyond its original requirements, often the leading cause of timeline overruns.',
        },
        {
          term: 'Parallel Tasks',
          definition:
            'Tasks that can be performed simultaneously because they have no dependency on each other.',
        },
      ],
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        {
          question: 'How much buffer should I add?',
          answer:
            'A common rule of thumb is 15-25 % of the estimated duration. For high-uncertainty tasks, consider even more. The buffer should reflect your confidence level in the estimate.',
        },
        {
          question: 'Can I assign tasks to different team members?',
          answer:
            'Yes. Each task can be tagged with an assignee, which helps visualize workload distribution and identify over-allocated resources.',
        },
        {
          question: 'What if the client adds new requirements mid-project?',
          answer:
            'Update the task list and re-run the estimator. The new critical path will show how the addition impacts the delivery date, which you can share with the client.',
        },
        {
          question: 'Is this suitable for large enterprise projects?',
          answer:
            'The tool is optimized for freelancers and small teams. For complex enterprise projects with hundreds of tasks, dedicated project management software may be more appropriate.',
        },
        {
          question: 'Can I save and revisit my timeline?',
          answer:
            'Yes. Timelines are saved to your browser\'s local storage and can also be exported for sharing or archiving.',
        },
      ],
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Break large tasks into subtasks of 1-3 days for more accurate estimation.',
        'Always identify the critical path before committing to a deadline.',
        'Use three-point estimates (optimistic, likely, pessimistic) for uncertain tasks.',
        'Build client review and approval cycles into the timeline as explicit tasks with durations.',
        'Communicate the timeline visually--clients understand Gantt charts better than spreadsheets.',
        'Revisit and update the timeline weekly during active projects.',
        'Document assumptions behind each estimate so scope changes can be traced.',
        'Never pad individual tasks secretly; use an explicit project-level buffer instead.',
      ],
    },
  },
  relatedTools: [
    'working-days-calculator',
    'hourly-rate-calculator',
    'proposal-builder',
    'meeting-cost-calculator',
    'invoice-generator',
  ],
  seo: {
    metaTitle: 'Project Timeline Estimator for Freelancers - Wiki | UnTrackt',
    metaDescription:
      'Plan project timelines with task dependencies, critical path analysis, and milestone tracking. Deliver freelance projects on time with accurate estimates.',
    keywords: [
      'project timeline estimator',
      'freelance project planning',
      'critical path',
      'Gantt chart',
      'task dependencies',
      'project scheduling',
      'milestone tracking',
      'delivery estimate',
    ],
  },
};
