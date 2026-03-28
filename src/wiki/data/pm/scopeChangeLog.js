export default {
  id: 'scope-change-log',
  title: 'Scope Change Log',
  description: 'Document scope changes with impact analysis — log change requests, assess cost/schedule impact, and track approvals.',
  content: {
    whatIs: {
      heading: 'What is the Scope Change Log?',
      body: 'The Scope Change Log documents every scope change request throughout a project. Each entry captures what changed, why, the estimated impact on cost and schedule, the approval status, and who approved it. It provides an audit trail and prevents scope creep by making every change explicit and assessed.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Scope creep is the silent project killer. When changes happen without documentation or impact analysis, budgets overrun and timelines slip. This log ensures every change is visible, assessed, approved (or rejected), and tracked — protecting both the project team and stakeholders.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Log the change request with a description of what is being changed.',
        'Document the reason or business justification.',
        'Assess the impact on scope, schedule, and cost.',
        'Submit for approval to the change authority (PM, sponsor, or CCB).',
        'Record the approval or rejection decision.',
        'Update the project plan if approved.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Change request entry with description and justification.',
        'Impact assessment fields: scope, schedule, cost.',
        'Approval workflow: submitted, under review, approved, rejected.',
        'Requester and approver tracking.',
        'Date fields: requested, assessed, decided.',
        'Running total of approved scope changes.',
        'Export as CSV or audit report.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Documenting client-requested feature additions.',
        'Tracking regulatory changes that affect project scope.',
        'Recording technical scope changes discovered during development.',
        'Managing stakeholder expectations with formal change documentation.',
        'Providing an audit trail for project post-mortems.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Feature Addition', description: 'Client requests "Export to PDF" — Impact: +40 hours, +$4K, +1 week — Approved with budget increase.' },
        { title: 'Scope Reduction', description: 'Team recommends removing advanced analytics from MVP — Saves 80 hours, -$8K, -2 weeks — Approved.' },
        { title: 'Technical Change', description: 'Database migration from MySQL to PostgreSQL — Impact: +20 hours, +$2K, no schedule change — Approved.' },
        { title: 'Rejected Change', description: 'Marketing requests animated landing page — Impact: +60 hours, +$6K — Rejected: not aligned with project goals.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Scope Change', definition: 'Any modification to the agreed-upon project scope, whether an addition, removal, or modification of deliverables.' },
        { term: 'Change Request', definition: 'A formal proposal to modify the project scope, schedule, or cost from the approved baseline.' },
        { term: 'Impact Analysis', definition: 'An assessment of how a proposed change affects the project\'s scope, schedule, cost, risk, and quality.' },
        { term: 'Change Control Board (CCB)', definition: 'A group of stakeholders authorized to review and approve or reject change requests.' },
        { term: 'Scope Creep', definition: 'Uncontrolled growth in project scope without approvals or adjustments to time and cost.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'What qualifies as a scope change?', answer: 'Anything that modifies the agreed deliverables, features, requirements, or boundaries of the project.' },
        { question: 'Who can submit a change request?', answer: 'Anyone — team members, stakeholders, clients. The decision authority is what matters.' },
        { question: 'Is every scope change bad?', answer: 'No. Some changes improve the project outcome. The key is that every change is documented, assessed, and approved before implementation.' },
        { question: 'What if a change is urgent?', answer: 'Document it as quickly as possible. Emergency changes should still be assessed and formally approved, even retroactively.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Establish a change control process at project kickoff.',
        'Document every change, no matter how small.',
        'Always assess impact before approving.',
        'Communicate approved changes to the entire team.',
        'Update the project plan and budget to reflect approved changes.',
        'Review the change log in lessons learned to understand scope evolution.'
      ]
    }
  },
  relatedTools: ['raid-log', 'project-status-report', 'cost-estimator', 'effort-estimation-calculator'],
  seo: {
    metaTitle: 'Scope Change Log — Track and Assess Scope Changes | UnTrackt Wiki',
    metaDescription: 'Document project scope changes with impact analysis, approval tracking, and audit trails. Prevent scope creep with formal change management.',
    keywords: ['scope change log', 'change management', 'scope creep', 'change request', 'scope control', 'change control']
  }
};
