export default {
  id: 'project-timeline-planner',
  title: 'Project Timeline Planner',
  description: 'Map out project phases on a visual timeline with date ranges, milestones, and color-coded categories.',
  content: {
    whatIs: {
      heading: 'What is the Project Timeline Planner?',
      body: 'The Project Timeline Planner provides a high-level visual overview of your project phases and milestones. Unlike a detailed Gantt chart, it focuses on communicating the big picture — major phases, key dates, and the overall project duration — making it ideal for executive summaries and stakeholder communication.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Stakeholders and executives often need a quick visual of the project timeline without the granularity of a full Gantt chart. This planner creates a clean, shareable timeline that communicates phases, milestones, and key dates at a glance.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Add project phases with start and end dates.',
        'Color-code phases by category or team.',
        'Add milestone markers for key dates.',
        'Adjust the timeline scale (weeks, months, quarters).',
        'Add labels and descriptions to phases.',
        'Export or share the timeline visual.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'High-level phase bars on a time axis.',
        'Color-coded categories for visual grouping.',
        'Milestone markers with labels.',
        'Zoomable time scale (weeks, months, quarters).',
        'Phase descriptions and tooltips.',
        'Today marker showing current position.',
        'Export as image for presentations.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Creating executive-level project overviews.',
        'Roadmap planning for product development.',
        'Communicating project timelines to clients.',
        'Planning multi-phase initiatives spanning months.',
        'Portfolio-level views of multiple projects on one timeline.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Product Launch', description: 'Four phases: Research (2 weeks), Development (8 weeks), Testing (3 weeks), Launch (1 week) with milestone at beta and go-live.' },
        { title: 'Quarterly Roadmap', description: 'Three parallel tracks (Platform, Features, Infrastructure) with quarterly milestones.' },
        { title: 'Annual Strategy', description: 'Four quarters with strategic initiatives mapped as phase bars and board meeting milestones.' },
        { title: 'Client Project', description: 'Discovery → Design → Build → Launch timeline shared with the client for expectations alignment.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Phase', definition: 'A major section of project work with a defined start and end date, grouping related activities.' },
        { term: 'Milestone', definition: 'A key date or event marking significant progress, such as a deliverable completion or decision point.' },
        { term: 'Roadmap', definition: 'A strategic plan showing the direction and milestones of a project or product over time.' },
        { term: 'Timeline Scale', definition: 'The time granularity displayed on the axis — days, weeks, months, or quarters.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'How is this different from a Gantt chart?', answer: 'A timeline planner shows high-level phases and milestones. A Gantt chart shows individual tasks with dependencies. Use the timeline for communication, the Gantt for detailed scheduling.' },
        { question: 'Can I show multiple projects?', answer: 'Yes. Add multiple project rows on the same timeline for a portfolio view.' },
        { question: 'How do I handle date changes?', answer: 'Drag phase bars to adjust dates, or edit start/end dates directly. The timeline updates automatically.' },
        { question: 'Can I share the timeline?', answer: 'Export as an image or PDF for presentations and stakeholder emails.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Keep the timeline at 5-10 phases maximum for clarity.',
        'Use color coding consistently (same color = same category/team).',
        'Include key milestones to highlight decision points.',
        'Update the timeline weekly for accurate stakeholder communication.',
        'Use the today marker to show where the project stands.',
        'Supplement with a detailed Gantt chart for the execution team.'
      ]
    }
  },
  relatedTools: ['gantt-chart-generator', 'milestone-tracker', 'project-status-report', 'project-health-dashboard'],
  seo: {
    metaTitle: 'Project Timeline Planner — Visual Phase Mapping | UnTrackt Wiki',
    metaDescription: 'Map project phases on a visual timeline with date ranges, milestones, and color-coded categories. Create executive-level project overviews.',
    keywords: ['project timeline', 'timeline planner', 'project phases', 'milestone timeline', 'project roadmap', 'visual timeline']
  }
};
