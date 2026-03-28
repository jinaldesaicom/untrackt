export default {
  id: 'ceremony-timer',
  title: 'Ceremony Timer',
  description: 'Timebox agile ceremonies with presets for standup, retro, review, planning, and custom events.',
  content: {
    whatIs: {
      heading: 'What is the Ceremony Timer?',
      body: 'The Ceremony Timer is a timeboxing tool with presets tailored for agile ceremonies — daily standup (15 min), sprint review (60 min), retrospective (90 min), and sprint planning (2-4 hours). It provides a visual countdown, audio alerts, and phase tracking to help Scrum Masters keep meetings on schedule.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Agile ceremonies frequently run over time, consuming hours that could be spent on actual work. A visible countdown creates natural urgency and helps facilitators enforce timeboxes politely. Preset durations eliminate the need to look up recommended times for each ceremony.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Select a ceremony preset or set a custom duration.',
        'Click "Start" to begin the countdown.',
        'Monitor the visual timer displayed prominently.',
        'An audio alert sounds when time is up.',
        'Optionally extend the timer if the team needs more time.',
        'Track which ceremonies consistently run over for process improvement.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Preset durations for standup, review, retro, planning, and refinement.',
        'Custom timer with user-defined durations.',
        'Visual countdown with color changes as time runs low.',
        'Audio alerts at the halfway point and at zero.',
        'Pause, resume, and extend controls.',
        'Runs in-browser — works offline once loaded.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Keeping daily standups under 15 minutes.',
        'Timeboxing retrospective discussion phases.',
        'Running structured sprint planning with separate phases.',
        'Facilitating design sprints with timed activities.',
        'Any meeting where a visible countdown improves focus.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Daily Standup', description: 'Set to 15 minutes. Each of 6 members gets ~2 minutes. Alert at 1 minute remaining.' },
        { title: 'Retrospective Phases', description: 'Set 5-minute timers for brainstorming, 10 minutes for grouping, 15 minutes for action items.' },
        { title: 'Sprint Planning', description: 'Use a 2-hour timer with a halfway alert to check progress on story selection.' },
        { title: 'Custom Workshop', description: 'Set a 25-minute Pomodoro-style timer for focused small-group activities.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Timeboxing', definition: 'Allocating a fixed maximum time for an activity and stopping when the time expires, regardless of whether the activity is complete.' },
        { term: 'Ceremony', definition: 'A recurring agile meeting with a specific purpose — standup, planning, review, or retrospective.' },
        { term: 'Facilitation', definition: 'The act of guiding a meeting to achieve its objectives efficiently, often done by the Scrum Master.' },
        { term: 'Sprint Review', definition: 'A ceremony where the team demonstrates completed work to stakeholders and gathers feedback.' },
        { term: 'Retrospective', definition: 'A ceremony where the team reflects on the sprint process and identifies improvements.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'What are the recommended ceremony durations?', answer: 'Standup 15 min, Sprint Review 1 hour per week of sprint, Retro 45-90 min, Planning 2-4 hours for a 2-week sprint. Adjust based on your team.' },
        { question: 'Should I strictly stop when the timer reaches zero?', answer: 'Use it as a signal to wrap up. Occasionally extending by a few minutes is fine, but make it the exception.' },
        { question: 'Can I use this for non-agile meetings?', answer: 'Absolutely. The custom timer works for any meeting, workshop, or focused work session.' },
        { question: 'Does it work on mobile?', answer: 'Yes. The timer is responsive and works in any modern browser.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Make the timer visible to everyone — share your screen or display on a TV.',
        'Use the halfway alert to check if the meeting is on track.',
        'If a ceremony consistently runs over, discuss whether the format needs adjustment.',
        'Set expectations at the start: "We have 15 minutes — let\'s keep updates brief."',
        'Track which ceremonies need extensions to identify facilitation improvement areas.',
        'Use Pomodoro-style breaks for longer ceremonies to maintain energy.'
      ]
    }
  },
  relatedTools: ['daily-standup-template', 'retrospective-board', 'sprint-planner', 'pomodoro-timer'],
  seo: {
    metaTitle: 'Ceremony Timer — Timebox Agile Meetings | UnTrackt Wiki',
    metaDescription: 'Timebox agile ceremonies with preset durations for standups, retrospectives, reviews, and planning. Visual countdown with audio alerts.',
    keywords: ['ceremony timer', 'agile timebox', 'standup timer', 'retrospective timer', 'sprint meeting timer', 'scrum ceremonies']
  }
};
