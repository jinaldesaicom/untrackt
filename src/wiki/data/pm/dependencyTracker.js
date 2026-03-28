export default {
  id: 'dependency-tracker',
  title: 'Dependency Tracker',
  description: 'Log and monitor project dependencies — track what you need from other teams, vendors, or systems and their status.',
  content: {
    whatIs: {
      heading: 'What is the Dependency Tracker?',
      body: 'The Dependency Tracker logs and monitors all external and internal dependencies your project relies on. Track what you need from other teams, vendors, or systems, who owns the delivery, when it\'s expected, and its current status. It helps ensure nothing your project depends on falls through the cracks.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Unmanaged dependencies are a leading cause of project delays. When your project waits on another team\'s deliverable and nobody is tracking it, delays cascade. This tool makes dependencies explicit, assigns ownership, and flags at-risk items before they become blockers.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Identify all external and internal dependencies.',
        'Log each dependency with a description and expected delivery date.',
        'Assign an owner responsible for tracking each dependency.',
        'Set the status: on track, at risk, blocked, or delivered.',
        'Link dependencies to the affected project tasks or milestones.',
        'Review and update the tracker regularly.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Dependency log with description, owner, and due date.',
        'Status tracking: on track, at risk, blocked, delivered.',
        'Impact field linking to affected tasks/milestones.',
        'Provider field (team, vendor, system).',
        'Due date tracking with overdue alerts.',
        'Notes field for communication history.',
        'Export as CSV or report.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Tracking API deliverables from another engineering team.',
        'Monitoring vendor deliveries for hardware or software.',
        'Tracking design deliverables needed before development.',
        'Managing cross-team dependencies in large organizations.',
        'Ensuring regulatory approvals are obtained before launch.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'API Dependency', description: 'Payment API v2 from Platform team — due March 1 — status: at risk (behind schedule).' },
        { title: 'Design Deliverable', description: 'Updated design system tokens from UX team — due Feb 15 — status: on track.' },
        { title: 'Vendor Delivery', description: 'Server hardware from Dell — due March 15 — status: delivered (arrived Feb 28).' },
        { title: 'Regulatory Approval', description: 'GDPR review from Legal — due April 1 — status: blocked (waiting on data mapping).' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Dependency', definition: 'A relationship where one deliverable or task relies on another being completed first.' },
        { term: 'External Dependency', definition: 'A dependency on something outside your team — another team, vendor, or third-party system.' },
        { term: 'Internal Dependency', definition: 'A dependency between tasks or teams within your project or organization.' },
        { term: 'Blocker', definition: 'A dependency that is actively preventing work from progressing.' },
        { term: 'Lead Time', definition: 'The time needed from requesting a dependency to receiving it.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'How do I identify dependencies?', answer: 'Ask: "What does my team need from outside our team to proceed?" for each major deliverable and phase.' },
        { question: 'Who should own a dependency?', answer: 'The person on your team who is the point of contact with the providing team or vendor.' },
        { question: 'What if a dependency is at risk?', answer: 'Escalate early. Communicate the impact to the providing team and explore alternatives or workarounds.' },
        { question: 'Should I track dependencies within my team?', answer: 'Focus on external dependencies. Internal task dependencies are better managed in your project schedule or Kanban board.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Identify dependencies during project planning, not mid-execution.',
        'Assign clear owners to every dependency on your side.',
        'Request earlier delivery dates than you actually need (build in buffer).',
        'Communicate regularly with dependency providers.',
        'Escalate at-risk dependencies before they become blockers.',
        'Link dependencies to affected milestones to show downstream impact.'
      ]
    }
  },
  relatedTools: ['raid-log', 'gantt-chart-generator', 'milestone-tracker', 'action-item-tracker'],
  seo: {
    metaTitle: 'Dependency Tracker — Monitor Project Dependencies | UnTrackt Wiki',
    metaDescription: 'Track project dependencies with owners, due dates, and status. Monitor what you need from teams, vendors, and systems to keep your project on track.',
    keywords: ['dependency tracker', 'project dependencies', 'dependency management', 'external dependencies', 'dependency log', 'blocker tracking']
  }
};
