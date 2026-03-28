export default {
  id: 'impediment-log',
  title: 'Impediment Log',
  description: 'Track and manage team impediments with priority, owner assignment, and resolution status.',
  content: {
    whatIs: {
      heading: 'What is the Impediment Log?',
      body: 'The Impediment Log is a tracking tool for recording, prioritizing, and resolving blockers that prevent the team from making progress. Each impediment is logged with a description, priority level, assigned owner, and status. It provides a single view of all open and resolved blockers, helping the Scrum Master ensure nothing falls through the cracks.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Blockers mentioned in standups are often forgotten by the afternoon. An impediment log creates accountability by assigning owners and tracking resolution. Over time, the log reveals systemic issues — like frequent environment problems or dependency delays — that the team can address at the organizational level.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Log a new impediment with a title and description.',
        'Set the priority (critical, high, medium, low).',
        'Assign an owner responsible for driving resolution.',
        'Update the status as progress is made (open, in progress, resolved).',
        'Review open impediments daily and discuss stale items.',
        'Close resolved impediments and document the resolution.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Impediment logging with title, description, and category.',
        'Priority levels with visual indicators.',
        'Owner assignment for resolution accountability.',
        'Status tracking (open, in progress, resolved, closed).',
        'Date tracking showing how long impediments remain open.',
        'Filter and search across open and historical items.',
        'Export log for retrospective analysis.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Tracking blockers raised during daily standups.',
        'Documenting dependency delays with external teams.',
        'Logging environment or tooling issues that slow the team.',
        'Providing data for retrospectives about systemic impediments.',
        'Escalating long-standing blockers to management.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Environment Down', description: 'Staging environment is unreachable — critical priority, assigned to DevOps lead, resolved in 4 hours.' },
        { title: 'Dependency Delay', description: 'Waiting on API spec from partner team — high priority, assigned to tech lead for escalation.' },
        { title: 'License Expiry', description: 'CI tool license expired — medium priority, assigned to Scrum Master for procurement follow-up.' },
        { title: 'Recurring Issue', description: 'Test database resets weekly, causing lost test data — logged for systemic fix in the next sprint.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Impediment', definition: 'Any obstacle or blocker that prevents the team from completing their sprint work effectively.' },
        { term: 'Blocker', definition: 'A critical impediment that completely halts progress on one or more work items.' },
        { term: 'Resolution', definition: 'The action or outcome that removes the impediment and allows work to resume.' },
        { term: 'Escalation', definition: 'Raising an impediment to management or another team when the Scrum team cannot resolve it independently.' },
        { term: 'Systemic Issue', definition: 'A recurring impediment that requires organizational change rather than a one-time fix.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'Who is responsible for resolving impediments?', answer: 'The Scrum Master owns the impediment log and is accountable for facilitating resolution, but the actual fix may be done by anyone.' },
        { question: 'How long should an impediment stay open?', answer: 'Aim to resolve impediments within 1-2 days. Items open longer than a sprint should be escalated.' },
        { question: 'Should I log every small issue?', answer: 'Log items that actually block or slow work. Minor annoyances are better handled in the retrospective.' },
        { question: 'How does this differ from a bug tracker?', answer: 'An impediment log tracks process and organizational blockers, not code defects. Bugs belong in your issue tracker.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Review the impediment log at every standup — not just when new items are added.',
        'Assign every impediment an owner — unowned items rarely get resolved.',
        'Track the age of open impediments to create urgency.',
        'Use categories to identify patterns (environment, dependencies, tooling, process).',
        'Review resolved impediments during retrospectives to confirm the root cause was addressed.',
        'Escalate early rather than letting blockers fester.'
      ]
    }
  },
  relatedTools: ['daily-standup-template', 'retrospective-board', 'raid-log', 'action-item-tracker'],
  seo: {
    metaTitle: 'Impediment Log — Track & Resolve Agile Blockers | UnTrackt Wiki',
    metaDescription: 'Track team impediments with priority, owners, and resolution status. Identify systemic blockers and keep your agile team unblocked.',
    keywords: ['impediment log', 'blocker tracker', 'agile impediments', 'scrum blockers', 'impediment tracking', 'team blockers']
  }
};
