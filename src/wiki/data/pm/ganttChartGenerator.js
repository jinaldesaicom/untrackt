export default {
  id: 'gantt-chart-generator',
  title: 'Gantt Chart Generator',
  description: 'Create a visual project timeline — add tasks with start/end dates, dependencies, and milestones on a Gantt bar chart.',
  content: {
    whatIs: {
      heading: 'What is the Gantt Chart Generator?',
      body: 'The Gantt Chart Generator creates visual project timelines as horizontal bar charts. Add tasks with start dates, end dates, durations, dependencies, and assignees. Tasks appear as bars along a time axis, making it easy to see the project schedule, identify overlaps, and spot the critical path.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'A Gantt chart is one of the most effective ways to communicate a project schedule. This tool lets you build one quickly without expensive software, share it as an image or export the data, and adjust the plan as things change.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Add tasks with names, start dates, and end dates or durations.',
        'Set dependencies between tasks (finish-to-start, etc.).',
        'Group tasks under phases or milestones.',
        'Add milestone markers for key dates.',
        'Assign team members to tasks.',
        'View the Gantt chart and adjust the timeline.',
        'Export as image, PDF, or CSV.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Horizontal bar chart timeline view.',
        'Task dependencies (FS, SS, FF, SF).',
        'Milestone markers on the timeline.',
        'Task grouping by phase.',
        'Progress percentage per task.',
        'Zoom controls for different time scales (days, weeks, months).',
        'Export as image or data file.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Planning a software development project with sprint phases.',
        'Creating a project schedule for stakeholder presentations.',
        'Tracking construction or event timelines.',
        'Visualizing task overlaps and resource conflicts.',
        'Identifying the critical path through the project.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Software Project', description: 'Phases: Requirements → Design → Development → Testing → Launch, with dependencies linking each phase.' },
        { title: 'Marketing Campaign', description: 'Parallel tracks: Content Creation, Design, Ad Setup, and Launch — with milestones at review and go-live.' },
        { title: 'Office Renovation', description: 'Sequential tasks: Permits → Demolition → Construction → Finishing → Move-in, with duration bars.' },
        { title: 'Product Roadmap', description: 'Quarterly milestones with feature development bars spanning multiple weeks.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Gantt Chart', definition: 'A bar chart showing tasks on a time axis, named after Henry Gantt who popularized it in the 1910s.' },
        { term: 'Dependency', definition: 'A relationship between tasks where one task cannot start or finish until another task reaches a certain state.' },
        { term: 'Critical Path', definition: 'The longest sequence of dependent tasks that determines the minimum project duration.' },
        { term: 'Milestone', definition: 'A significant point or event in a project timeline, often marking the completion of a major phase.' },
        { term: 'Lead/Lag', definition: 'The amount of time a dependent task can start before (lead) or must wait after (lag) its predecessor.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'What is the critical path?', answer: 'The longest chain of dependent tasks. Any delay on the critical path delays the entire project.' },
        { question: 'Can I track actual vs. planned progress?', answer: 'Yes. Add progress percentages to tasks to compare actual progress against the scheduled bars.' },
        { question: 'How do I handle parallel tasks?', answer: 'Tasks without dependencies can overlap on the timeline. The chart shows them as parallel bars.' },
        { question: 'What dependency types are supported?', answer: 'Finish-to-Start (FS), Start-to-Start (SS), Finish-to-Finish (FF), and Start-to-Finish (SF).' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Start with a WBS to define tasks before building the Gantt chart.',
        'Keep tasks at a consistent level of detail (not too granular, not too broad).',
        'Identify the critical path and monitor it closely.',
        'Update the chart regularly to reflect actual progress.',
        'Use milestones to mark key decision points and deliverables.',
        'Add buffer time for tasks with high uncertainty.'
      ]
    }
  },
  relatedTools: ['project-timeline-planner', 'task-breakdown-wbs', 'milestone-tracker', 'dependency-tracker'],
  seo: {
    metaTitle: 'Gantt Chart Generator — Visual Project Timeline | UnTrackt Wiki',
    metaDescription: 'Create Gantt charts with tasks, dependencies, milestones, and progress tracking. Visualize project schedules and identify the critical path.',
    keywords: ['gantt chart', 'project timeline', 'gantt generator', 'project schedule', 'task dependencies', 'critical path']
  }
};
