export default {
  id: 'sprint-planner',
  title: 'Sprint Planner',
  description: 'Plan sprints with goal setting, story assignment, and capacity tracking to keep your agile team focused and aligned.',
  content: {
    whatIs: {
      heading: 'What is the Sprint Planner?',
      body: 'The Sprint Planner is a browser-based tool that helps agile teams plan their sprints by defining a sprint goal, selecting stories from a backlog, assigning them to team members, and tracking story point totals against team capacity. It provides an at-a-glance view of how the planned work fits within available capacity, making sprint planning meetings faster and more structured. Everything runs locally in your browser with no data sent to any server.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Sprint planning sessions often run over time because teams lack a clear visual of how stories stack up against capacity. This tool gives you instant feedback as you add or remove stories, shows remaining capacity, and helps the team commit to a realistic sprint goal. It replaces sticky notes and spreadsheets with a structured, shareable format.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Define the sprint name, start date, and end date.',
        'Set the sprint goal describing what the team aims to deliver.',
        'Add stories from your backlog with titles, descriptions, and story point estimates.',
        'Assign stories to team members based on availability.',
        'Monitor the capacity bar to ensure planned points do not exceed team capacity.',
        'Export or copy the sprint plan for sharing with stakeholders.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Sprint goal definition with clear success criteria.',
        'Story backlog with drag-and-drop prioritization.',
        'Capacity tracking bar showing planned vs. available points.',
        'Team member assignment per story.',
        'Automatic story point totals and remaining capacity calculation.',
        'Export sprint plan as text or JSON for documentation.',
        'Client-side processing — your data stays in your browser.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Running a sprint planning ceremony for a Scrum team.',
        'Quickly prototyping a sprint before entering stories in Jira or Azure DevOps.',
        'Teaching new team members how sprint planning works.',
        'Planning a personal sprint for solo projects using agile principles.',
        'Documenting sprint commitments for stakeholder communication.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Two-Week Sprint', description: 'Set up a 10-day sprint, add 8 stories totaling 34 points, and confirm the team\'s 40-point capacity is not exceeded.' },
        { title: 'Focused Sprint Goal', description: 'Define a goal like "Complete user authentication flow" and select only the stories that directly support it.' },
        { title: 'Capacity Check', description: 'Add stories until the capacity bar turns amber, signaling the team is nearing its limit.' },
        { title: 'Solo Sprint', description: 'Plan a one-week personal sprint with 5 tasks and 13 story points to stay focused.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Sprint', definition: 'A time-boxed iteration, typically 1-4 weeks, during which a team delivers a potentially shippable product increment.' },
        { term: 'Sprint Goal', definition: 'A short statement describing the single objective the team aims to achieve during the sprint.' },
        { term: 'Story Points', definition: 'A relative unit of measure for estimating the effort required to complete a user story.' },
        { term: 'Capacity', definition: 'The total amount of work a team can realistically complete in a sprint, measured in story points or hours.' },
        { term: 'Backlog', definition: 'An ordered list of all the work items (user stories, bugs, tasks) that need to be completed.' },
        { term: 'Sprint Commitment', definition: 'The set of backlog items the team agrees to deliver during the sprint.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'Is this a replacement for Jira or Azure DevOps?', answer: 'No. This is a lightweight planning aid for sprint planning meetings. Use it to draft plans before entering them in your project management tool.' },
        { question: 'Can multiple people use this at the same time?', answer: 'The tool runs locally in each person\'s browser. Share the exported plan for collaboration.' },
        { question: 'What happens to my data?', answer: 'All data stays in your browser\'s local storage. Nothing is sent to a server.' },
        { question: 'How do I set team capacity?', answer: 'Enter each team member\'s available days and the tool calculates total capacity based on the sprint duration and focus factor.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Always start with a clear sprint goal before selecting stories.',
        'Do not plan above 80-85% capacity to leave room for unexpected work.',
        'Break large stories into smaller ones that can be completed within a single sprint.',
        'Review the previous sprint\'s velocity to set realistic capacity targets.',
        'Include the whole team in sprint planning to improve estimate accuracy.',
        'Keep sprint goals focused — avoid trying to deliver too many unrelated items.'
      ]
    }
  },
  relatedTools: ['sprint-capacity-calculator', 'velocity-calculator', 'story-point-estimator', 'burndown-chart-generator'],
  seo: {
    metaTitle: 'Sprint Planner — Plan Sprints with Goals & Capacity Tracking | UnTrackt Wiki',
    metaDescription: 'Plan agile sprints with goal setting, story assignment, and capacity tracking. Visualize planned vs. available story points for realistic sprint commitments.',
    keywords: ['sprint planner', 'sprint planning', 'agile', 'scrum', 'capacity planning', 'story points', 'sprint goal']
  }
};
