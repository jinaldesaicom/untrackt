export default {
  id: 'time-blocking-planner',
  title: 'Time Blocking Planner',
  description: 'Plan your day in time blocks — drag tasks into hourly slots, color-code by category, and track how your time is allocated.',
  content: {
    whatIs: {
      heading: 'What is the Time Blocking Planner?',
      body: 'The Time Blocking Planner lets you plan your day by assigning tasks to specific time slots. Drag tasks into hourly blocks, color-code them by category (meetings, deep work, admin, breaks), and see how your time is distributed. It helps you be intentional about your schedule rather than reactive.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Without a plan, your day fills up with reactive tasks and interruptions. Time blocking forces you to be deliberate about what you work on and when, ensuring high-priority work gets dedicated, protected time on your calendar.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Set your working hours (start and end time).',
        'Add tasks from your to-do list.',
        'Drag tasks into time slots on the daily view.',
        'Color-code blocks by category.',
        'Add buffer time between blocks for transitions.',
        'Review the day\'s allocation and adjust as needed.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Hourly time grid for the day.',
        'Drag-and-drop task assignment to time slots.',
        'Color-coded categories.',
        'Time allocation summary (% deep work, meetings, admin).',
        'Buffer/break time blocks.',
        'Daily and weekly views.',
        'Local storage — your schedule stays private.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Planning focused deep work sessions in the morning.',
        'Batching meetings into afternoon blocks.',
        'Allocating time for project management tasks.',
        'Ensuring adequate break time throughout the day.',
        'Balancing multiple projects with dedicated time blocks.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Developer Day', description: '9-12 Deep Work (coding), 12-1 Lunch, 1-2 Meetings, 2-4 Deep Work, 4-5 Code Review & Email.' },
        { title: 'Manager Day', description: '9-10 Planning, 10-12 1:1 Meetings, 12-1 Lunch, 1-3 Strategy Work, 3-5 Team Meetings.' },
        { title: 'Freelancer Day', description: '8-10 Client A, 10-11 Admin, 11-1 Client B, 1-2 Lunch, 2-4 Client C, 4-5 Marketing.' },
        { title: 'Student Day', description: '8-10 Lecture, 10-12 Study Block, 12-1 Lunch, 1-3 Lab Work, 3-5 Assignment Time.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Time Blocking', definition: 'A time management technique where every part of the day is assigned a specific task or activity.' },
        { term: 'Deep Work', definition: 'Focused, uninterrupted work on cognitively demanding tasks, as defined by Cal Newport.' },
        { term: 'Time Boxing', definition: 'Allocating a fixed time period to a task and stopping when the time is up, whether finished or not.' },
        { term: 'Buffer Time', definition: 'Short gaps between blocks to handle transitions, unexpected tasks, or bio breaks.' },
        { term: 'Task Batching', definition: 'Grouping similar tasks into a single time block to reduce context switching.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'What if my plan gets disrupted?', answer: 'Adjust and re-block the remaining time. The goal is not rigid adherence but intentional time use.' },
        { question: 'How detailed should time blocks be?', answer: '30-60 minute blocks work best. Smaller blocks create overhead; larger blocks lack structure.' },
        { question: 'Should I block personal time too?', answer: 'Yes. Blocking breaks, lunch, and personal time ensures they actually happen.' },
        { question: 'How is this different from a calendar?', answer: 'A calendar shows events. Time blocking plans how you spend the time between events.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Schedule your most important work during your peak energy hours.',
        'Batch similar tasks (emails, calls, admin) into dedicated blocks.',
        'Include buffer time (15-30 min) between blocks for transitions.',
        'Plan the next day\'s blocks the evening before.',
        'Start with fewer blocks and add structure gradually.',
        'Protect deep work blocks — decline meetings during those times.'
      ]
    }
  },
  relatedTools: ['workload-calculator', 'effort-estimation-calculator', 'checklist-builder', 'action-item-tracker'],
  seo: {
    metaTitle: 'Time Blocking Planner — Plan Your Day in Time Blocks | UnTrackt Wiki',
    metaDescription: 'Plan your day by assigning tasks to time blocks. Color-code categories, track time allocation, and protect deep work with intentional scheduling.',
    keywords: ['time blocking', 'time management', 'daily planner', 'time blocks', 'schedule planner', 'deep work planning']
  }
};
