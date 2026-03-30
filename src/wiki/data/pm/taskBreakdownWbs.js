export default {
  id: 'task-breakdown-wbs',
  title: 'Task Breakdown / WBS',
  description: 'Build a Work Breakdown Structure — decompose deliverables into packages, tasks, and subtasks in a visual tree.',
  content: {
    whatIs: {
      heading: 'What is the Task Breakdown / WBS Tool?',
      body: 'The Task Breakdown / WBS tool helps project managers decompose a project into a hierarchical Work Breakdown Structure. Start with a project goal, break it into deliverables, work packages, tasks, and subtasks in a visual tree. Each node can include effort estimates, owners, and status. Export the WBS as JSON, CSV, or a printable outline.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'A WBS is the foundation of project planning — you cannot estimate cost, time, or resources accurately without decomposing work first. This tool makes the decomposition process visual and structured, ensuring nothing is missed and the hierarchy is clear before you begin scheduling.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Enter the project name as the root node.',
        'Add top-level deliverables as child nodes.',
        'Break each deliverable into work packages.',
        'Decompose work packages into individual tasks.',
        'Add effort estimates and assignees to leaf tasks.',
        'Review the tree for completeness.',
        'Export or copy the WBS for scheduling tools.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Visual tree hierarchy with drag-and-drop reordering.',
        'Unlimited nesting depth for complex decomposition.',
        'Effort estimate fields on each node.',
        'Assignee/owner annotation per task.',
        'Status tracking (not started, in progress, complete).',
        'Export as JSON, CSV, or printable outline.',
        'Client-side — all data stays in your browser.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Decomposing a software project before sprint planning.',
        'Creating a WBS for a client proposal with clear deliverables.',
        'Breaking down event planning into manageable tasks.',
        'Estimating total project effort from bottom-up task estimates.',
        'Documenting project scope for stakeholder alignment.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Website Redesign', description: 'Root: Website Redesign → Deliverables: Design, Frontend, Backend, Testing → Work Packages under each.' },
        { title: 'Product Launch', description: 'Root: Product Launch → Marketing, Development, Operations, Support → Tasks under each.' },
        { title: 'Office Move', description: 'Root: Office Relocation → Planning, Physical Move, IT Setup, Communications → Subtasks.' },
        { title: 'Conference Planning', description: 'Root: Annual Conference → Venue, Speakers, Marketing, Logistics → Detailed task breakdown.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'WBS (Work Breakdown Structure)', definition: 'A hierarchical decomposition of the total scope of work to be carried out by the project team.' },
        { term: 'Deliverable', definition: 'A tangible or intangible output produced as a result of project work.' },
        { term: 'Work Package', definition: 'The lowest level of a WBS, representing a grouping of related tasks that can be estimated and assigned.' },
        { term: '100% Rule', definition: 'A WBS principle stating that child elements must represent 100% of the parent element\'s scope — nothing more, nothing less.' },
        { term: 'Decomposition', definition: 'The process of breaking project scope into smaller, more manageable components.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'How many levels deep should a WBS go?', answer: 'Typically 3-5 levels. Stop decomposing when tasks are small enough to estimate accurately (usually 1-5 days of effort).' },
        { question: 'Should the WBS include activities or only deliverables?', answer: 'Traditionally, a WBS is deliverable-oriented. However, activity-based WBS is common in software and agile contexts.' },
        { question: 'Can I convert a WBS to a Gantt chart?', answer: 'Yes. The WBS provides the task list. Add dependencies and durations to create a Gantt chart using the Gantt Chart Generator tool.' },
        { question: 'What is the difference between WBS and a task list?', answer: 'A WBS is hierarchical and scope-focused. A task list is a flat list of activities. The WBS ensures completeness through structured decomposition.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Follow the 100% rule — every level should completely represent the parent scope.',
        'Use noun phrases for deliverable-oriented WBS items.',
        'Decompose until tasks are estimable (1-5 day effort).',
        'Involve the team in WBS creation for more complete decomposition.',
        'Number WBS elements (1.0, 1.1, 1.1.1) for easy reference.',
        'Review the WBS with stakeholders before estimating to confirm scope.'
      ]
    }
  },
  relatedTools: ['gantt-chart-generator', 'project-timeline-planner', 'effort-estimation-calculator', 'milestone-tracker'],
  seo: {
    metaTitle: 'Task Breakdown / WBS — Work Breakdown Structure Builder | UnTrackt Wiki',
    metaDescription: 'Build a Work Breakdown Structure visually. Decompose projects into deliverables, work packages, and tasks with effort estimates and export options.',
    keywords: ['wbs', 'work breakdown structure', 'task breakdown', 'project decomposition', 'wbs builder', 'project planning']
  }
};
