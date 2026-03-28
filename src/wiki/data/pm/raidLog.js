export default {
  id: 'raid-log',
  title: 'RAID Log',
  description: 'Track project Risks, Assumptions, Issues, and Dependencies in a structured RAID log with status and owners.',
  content: {
    whatIs: {
      heading: 'What is the RAID Log?',
      body: 'The RAID Log is a structured register for tracking four categories of project concerns: Risks (what might go wrong), Assumptions (what you\'re taking for granted), Issues (what has already gone wrong), and Dependencies (what you need from others). Each entry has an owner, status, priority, and mitigation or resolution plan.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Projects fail when risks are ignored, assumptions are untested, issues fester, and dependencies are untracked. A RAID log provides a single place to capture and monitor all of these, ensuring nothing falls through the cracks and stakeholders stay informed.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Add entries under the appropriate category (Risk, Assumption, Issue, or Dependency).',
        'Set priority (high, medium, low) and assign an owner.',
        'Add a description and mitigation/resolution plan.',
        'Update status regularly (open, in progress, resolved, closed).',
        'Review the RAID log in team meetings.',
        'Export for stakeholder reporting.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Four categorized sections: Risks, Assumptions, Issues, Dependencies.',
        'Priority levels (high, medium, low) with visual indicators.',
        'Owner assignment per entry.',
        'Status tracking (open, in progress, resolved, closed).',
        'Mitigation and resolution plan fields.',
        'Date opened and date resolved tracking.',
        'Export as CSV or printable report.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Managing project risks with documented mitigation plans.',
        'Tracking assumptions that need validation.',
        'Logging and resolving project issues as they arise.',
        'Monitoring external dependencies with other teams or vendors.',
        'Reporting project health based on open risks and issues.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Risk', description: 'Key developer may leave → Mitigation: cross-train the team, document key systems. Priority: High.' },
        { title: 'Assumption', description: 'API team will deliver v2 by March 15 → Action: confirm with API team lead weekly.' },
        { title: 'Issue', description: 'Third-party API downtime caused 2-day delay → Resolution: implement retry logic and request SLA.' },
        { title: 'Dependency', description: 'Design team must deliver mockups before development can start → Status: In Progress, Due: Feb 1.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Risk', definition: 'An uncertain event that, if it occurs, has a positive or negative effect on project objectives.' },
        { term: 'Assumption', definition: 'A factor considered true for planning purposes that has not been validated or confirmed.' },
        { term: 'Issue', definition: 'A current problem that is affecting the project and requires resolution.' },
        { term: 'Dependency', definition: 'A relationship where one task, deliverable, or decision relies on another to proceed.' },
        { term: 'Mitigation', definition: 'Actions taken to reduce the probability or impact of a risk.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'How often should I review the RAID log?', answer: 'Weekly at minimum. Review in every status meeting and update entries proactively.' },
        { question: 'What is the difference between a risk and an issue?', answer: 'A risk is something that might happen. An issue is something that has already happened and is currently affecting the project.' },
        { question: 'Who should own RAID items?', answer: 'Anyone on the team. The project manager facilitates the log, but individual entries should be owned by the person best positioned to manage them.' },
        { question: 'When should I close an entry?', answer: 'Risks: when the risk event has passed or been mitigated. Issues: when resolved. Assumptions: when validated or invalidated. Dependencies: when fulfilled.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Start the RAID log during project kickoff — don\'t wait for problems.',
        'Review the log in every team meeting to keep it current.',
        'Assign clear owners for every entry.',
        'Validate assumptions early — don\'t wait for them to become issues.',
        'Link RAID items to affected milestones or deliverables.',
        'Archive resolved items rather than deleting them for future reference.'
      ]
    }
  },
  relatedTools: ['risk-assessment-matrix', 'dependency-tracker', 'scope-change-log', 'action-item-tracker'],
  seo: {
    metaTitle: 'RAID Log — Risks, Assumptions, Issues, Dependencies | UnTrackt Wiki',
    metaDescription: 'Track project Risks, Assumptions, Issues, and Dependencies in a structured RAID log with priorities, owners, status, and resolution plans.',
    keywords: ['RAID log', 'risk management', 'project issues', 'project dependencies', 'assumptions tracking', 'RAID register']
  }
};
