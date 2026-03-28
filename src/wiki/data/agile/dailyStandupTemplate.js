export default {
  id: 'daily-standup-template',
  title: 'Daily Standup Template',
  description: 'Structured template for daily standups with yesterday/today/blockers format to keep meetings focused.',
  content: {
    whatIs: {
      heading: 'What is the Daily Standup Template?',
      body: 'The Daily Standup Template provides a structured format for daily Scrum meetings. Each team member records what they did yesterday, what they plan to do today, and any blockers they are facing. The tool keeps a history of updates and makes it easy to spot patterns like recurring blockers or stalled work items.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Daily standups often drift into long status reports or unstructured conversations. This template enforces the three-question format, keeps each person\'s update concise, and creates a searchable log of daily progress. It helps distributed teams stay synchronized and gives the Scrum Master a quick view of blockers needing attention.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Add each team member\'s name.',
        'For each person, fill in yesterday\'s accomplishments, today\'s plan, and any blockers.',
        'Review the standup summary to spot blockers and dependencies.',
        'Save or export the standup notes for the team record.',
        'Use the history view to track recurring issues over time.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Structured yesterday/today/blockers format per team member.',
        'Standup history with date filtering and search.',
        'Blocker highlighting for quick Scrum Master review.',
        'Export standup notes as text or Markdown.',
        'Team member roster saved across sessions.',
        'Client-side storage — your standup data stays private.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Running a structured 15-minute daily standup.',
        'Async standups for distributed teams across time zones.',
        'Reviewing blocker trends during retrospectives.',
        'Onboarding new team members to the standup format.',
        'Maintaining a standup log for project documentation.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Standard Standup', description: 'Five team members each provide a 2-3 line update — total meeting time under 10 minutes.' },
        { title: 'Async Standup', description: 'Remote team members fill in their updates by 9 AM; the Scrum Master reviews and flags blockers.' },
        { title: 'Recurring Blocker', description: 'The history view reveals the same "waiting for design review" blocker appearing 4 days in a row.' },
        { title: 'Sprint Start', description: 'Day 1 updates show everyone picked up their first sprint stories with no blockers.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Daily Standup', definition: 'A short daily meeting (15 minutes max) where team members synchronize their work and surface blockers.' },
        { term: 'Blocker', definition: 'An impediment preventing a team member from making progress on their current work.' },
        { term: 'Three Questions', definition: 'The standard standup format: What did I do yesterday? What will I do today? What is blocking me?' },
        { term: 'Timeboxing', definition: 'Limiting the standup to a fixed time (typically 15 minutes) to keep the meeting brief and focused.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'How long should each person\'s update be?', answer: 'Each person should speak for 1-2 minutes maximum. Detailed discussions should happen after the standup.' },
        { question: 'What if someone has no blockers?', answer: 'That is perfectly fine — just note "no blockers" and move on.' },
        { question: 'Can I use this for async standups?', answer: 'Yes. Have each team member fill in their update at a set time, and review the collected updates asynchronously.' },
        { question: 'Should the standup replace a project status meeting?', answer: 'No. The standup is for team synchronization, not for status reporting to management.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Keep standups to 15 minutes or less — take discussions offline.',
        'Focus on work items, not on what meetings you attended.',
        'Flag blockers immediately — do not wait until the standup to raise urgent issues.',
        'The Scrum Master should track blockers and follow up on resolution.',
        'Rotate who speaks first to prevent the same person always setting the agenda.',
        'Review standup history during retrospectives to identify systemic issues.'
      ]
    }
  },
  relatedTools: ['ceremony-timer', 'impediment-log', 'retrospective-board', 'sprint-planner'],
  seo: {
    metaTitle: 'Daily Standup Template — Structured Standup Notes | UnTrackt Wiki',
    metaDescription: 'Run focused daily standups with a structured yesterday/today/blockers template. Track standup history and identify recurring blockers.',
    keywords: ['daily standup', 'standup template', 'scrum meeting', 'three questions', 'blockers', 'agile standup']
  }
};
