export default {
  id: 'milestone-tracker',
  title: 'Milestone Tracker',
  description: 'Track key project milestones — log dates, statuses, owners, and view progress toward each milestone.',
  content: {
    whatIs: {
      heading: 'What is the Milestone Tracker?',
      body: 'The Milestone Tracker helps you define, monitor, and report on key project milestones. Log each milestone with its target date, actual completion date, owner, status, and notes. The tracker provides a clear overview of which milestones are on track, at risk, or overdue, keeping the project focused on its most important checkpoints.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Milestones are the critical checkpoints that define project progress. Without tracking them explicitly, teams lose sight of key deadlines. This tool provides a focused view of what matters most — the major deliverables and decision points — without getting lost in task-level details.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Add milestones with names, target dates, and owners.',
        'Set milestone status: on track, at risk, delayed, or complete.',
        'Add notes or blockers for at-risk milestones.',
        'Update actual completion dates as milestones are hit.',
        'View the milestone timeline and status summary.',
        'Export the milestone report for stakeholders.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Milestone list with target and actual dates.',
        'Status indicators: on track, at risk, delayed, complete.',
        'Owner assignment per milestone.',
        'Timeline view of upcoming and past milestones.',
        'Notes and blocker fields.',
        'Summary dashboard with milestone health.',
        'Export as CSV or printable report.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Tracking software release milestones (alpha, beta, GA).',
        'Monitoring deliverable due dates for client projects.',
        'Reporting project health based on milestone status.',
        'Tracking regulatory or compliance deadlines.',
        'Managing personal project goals and target dates.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Software Release', description: 'Milestones: Feature Freeze, Code Complete, Beta Release, RC, GA — each with target dates and status.' },
        { title: 'Construction Project', description: 'Foundation Complete, Framing Done, Inspection Passed, Occupancy Permit — tracked with actual vs. planned dates.' },
        { title: 'Marketing Launch', description: 'Content Ready, Assets Approved, Campaign Live, Post-Launch Review — with owner and status per milestone.' },
        { title: 'Compliance Filing', description: 'Document Prep, Internal Review, Submission, Approval — tracked against regulatory deadlines.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Milestone', definition: 'A significant event or checkpoint in a project, typically marking the completion of a major deliverable or phase.' },
        { term: 'Target Date', definition: 'The planned date for the milestone to be achieved.' },
        { term: 'Actual Date', definition: 'The date the milestone was actually completed.' },
        { term: 'Slippage', definition: 'The difference between the target date and actual completion date when a milestone is late.' },
        { term: 'Baseline', definition: 'The original approved plan against which progress is measured.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'How many milestones should a project have?', answer: 'Typically 5-15 milestones for a medium project. Too many dilutes their importance; too few provides insufficient checkpoints.' },
        { question: 'How is this different from task tracking?', answer: 'Milestones mark significant achievements, not individual work items. They answer "where are we?" rather than "what are we doing today?"' },
        { question: 'What makes a good milestone?', answer: 'A good milestone is specific, measurable, and marks a meaningful project achievement — not just a date on a calendar.' },
        { question: 'How often should I update milestones?', answer: 'Review milestone status weekly and update immediately when status changes.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Define milestones at the start of the project during planning.',
        'Make milestones specific and verifiable — avoid vague ones like "phase complete."',
        'Track baseline dates separately to measure slippage.',
        'Escalate at-risk milestones proactively rather than waiting for them to become delayed.',
        'Use milestones in status reports to communicate progress concisely.',
        'Celebrate completed milestones to maintain team momentum.'
      ]
    }
  },
  relatedTools: ['project-timeline-planner', 'gantt-chart-generator', 'project-status-report', 'project-health-dashboard'],
  seo: {
    metaTitle: 'Milestone Tracker — Monitor Key Project Milestones | UnTrackt Wiki',
    metaDescription: 'Track project milestones with target dates, actual dates, owners, and status. Monitor on-track, at-risk, and delayed milestones at a glance.',
    keywords: ['milestone tracker', 'project milestones', 'milestone management', 'project checkpoints', 'deadline tracking', 'milestone status']
  }
};
